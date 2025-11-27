import psutil
import time
import json
from typing import Optional, Dict, Any


def find_ollama_serve_process() -> psutil.Process:
    """
    Find the real 'ollama serve' process.
    This is the process that actually performs inference.
    """
    for p in psutil.process_iter(["pid", "name", "cmdline"]):
        try:
            name = (p.info.get("name") or "").lower()
            cmdline_list = p.info.get("cmdline") or []
            cmd = " ".join(cmdline_list).lower()

            # We want the long-running server, not 'ollama run ...'
            if "ollama" in name and "serve" in cmd:
                # Optional: debug print
                print("Tracking Ollama process:")
                print("  name:", name)
                print("  pid:", p.pid)
                print("  cmd:", cmd)
                return p

        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    raise RuntimeError("Could not find 'ollama serve' process. "
                       "Is Ollama running as a service?")


class ModelPerformanceTracker:
    """
    Tracks CPU, RAM, and disk usage for the 'ollama serve' process
    during a single model inference.

    Usage:
        tracker = ModelPerformanceTracker()
        tracker.start()
        # ... during streaming: tracker.sample()
        tracker.stop()
        perf = tracker.summary()
    """

    def __init__(self, sample_interval: float = 0.1) -> None:
        """
        :param sample_interval: minimum seconds between samples
        """
        self.sample_interval = sample_interval
        self.ollama: Optional[psutil.Process] = None
        self.samples: list[Dict[str, Any]] = []
        self.running: bool = False
        self.start_time: float = 0.0
        self.total_time: float = 0.0
        self.last_sample_time: float = 0.0

        self.baseline_read_bytes: Optional[int] = None
        self.baseline_write_bytes: Optional[int] = None

    def start(self) -> None:
        """Attach to ollama serve and begin tracking."""
        self.ollama = find_ollama_serve_process()
        self.samples.clear()
        self.running = True
        self.start_time = time.perf_counter()
        self.last_sample_time = self.start_time

        # Baseline disk I/O
        try:
            io = self.ollama.io_counters()
            self.baseline_read_bytes = io.read_bytes
            self.baseline_write_bytes = io.write_bytes
        except (psutil.AccessDenied, AttributeError):
            self.baseline_read_bytes = None
            self.baseline_write_bytes = None

    def stop(self) -> None:
        """Stop tracking and compute total inference time."""
        if not self.running:
            return
        self.running = False
        self.total_time = time.perf_counter() - self.start_time

    def sample(self) -> None:
        """
        Take a non-blocking sample of CPU, memory, and disk I/O.
        Call this periodically during streaming.
        """
        if not self.running or self.ollama is None:
            return

        now = time.perf_counter()
        if now - self.last_sample_time < self.sample_interval:
            return  # too soon, skip

        self.last_sample_time = now

        # CPU
        try:
            cpu = self.ollama.cpu_percent(interval=0.0)
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            cpu = None

        # Memory (RSS)
        try:
            mem = self.ollama.memory_info().rss
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            mem = None

        # Disk I/O
        read_bytes = write_bytes = None
        try:
            io = self.ollama.io_counters()
            read_bytes = io.read_bytes
            write_bytes = io.write_bytes
        except (psutil.NoSuchProcess, psutil.AccessDenied, AttributeError):
            pass

        self.samples.append(
            {
                "timestamp": now,
                "cpu_percent": cpu,
                "mem_bytes": mem,
                "read_bytes": read_bytes,
                "write_bytes": write_bytes,
            }
        )

    def summary(self) -> Dict[str, Any]:
        """
        Produce a summary dict of the tracked performance.
        Does NOT include ttft (you add that externally).
        """
        if not self.samples:
            return {
                "cpu_avg": None,
                "cpu_peak": None,
                "mem_peak": None,
                "disk_read_total": None,
                "disk_write_total": None,
                "total_inference_time": self.total_time,
                "sample_count": 0,
            }

        # Filter out None CPU samples
        cpu_values = [s["cpu_percent"] for s in self.samples if s["cpu_percent"] is not None]
        if cpu_values:
            cpu_avg = sum(cpu_values) / len(cpu_values)
            cpu_peak = max(cpu_values)
        else:
            cpu_avg = None
            cpu_peak = None

        # Memory peak
        mem_values = [s["mem_bytes"] for s in self.samples if s["mem_bytes"] is not None]
        mem_peak = max(mem_values) if mem_values else None

        # Disk deltas (if we had baselines and valid samples)
        final_read = None
        final_write = None
        for s in reversed(self.samples):
            if s["read_bytes"] is not None and final_read is None:
                final_read = s["read_bytes"]
            if s["write_bytes"] is not None and final_write is None:
                final_write = s["write_bytes"]
            if final_read is not None and final_write is not None:
                break

        if (
            self.baseline_read_bytes is not None
            and final_read is not None
        ):
            disk_read_total = final_read - self.baseline_read_bytes
        else:
            disk_read_total = None

        if (
            self.baseline_write_bytes is not None
            and final_write is not None
        ):
            disk_write_total = final_write - self.baseline_write_bytes
        else:
            disk_write_total = None

        return {
            "cpu_avg": cpu_avg,
            "cpu_peak": cpu_peak,
            "mem_peak": mem_peak,
            "disk_read_total": disk_read_total,
            "disk_write_total": disk_write_total,
            "total_inference_time": self.total_time,
            "sample_count": len(self.samples),
        }


def save_performance_json(perf: Dict[str, Any], path: str = "Data/output.json") -> None:
    """Optional helper to save the performance dict to JSON."""
    with open(path, "w") as f:
        json.dump(perf, f, indent=4)
