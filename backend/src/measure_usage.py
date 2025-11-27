import psutil
import time
import json
from datetime import datetime

def find_ollama_process():
    ollama_serve = None
    Runner_Processes = []
    for process in psutil.process_iter(["pid", "name", "cmdline"]):
        try:
            name = (process.info.get("name") or "").lower()
            cmd = " ".join(process.info.get("cmdline") or []).lower()

            if "ollama" in name and "serve" in cmd:
                ollama_serve = process

            if (
                "ollama" in name and
                "runner" in cmd
            ):
                Runner_Processes.append(process)

        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    return ollama_serve, Runner_Processes

class ModelPerformanceTracker:
    def __init__(self):
        self.ollama_serve, self.ollama_runners = find_ollama_process()
        self.sample_interval = 0.2
        self.last_sample_time = 0
        self.samples = []
        self.running = False

    def start(self):
        self.running = True
        self.start_time = time.perf_counter()

    def stop(self):
        self.running = False
        self.total_time = time.perf_counter() - self.start_time

    def sample(self):
        """Collect CPU, RAM, and I/O stats without blocking anything."""
        if not self.running:
            return
        
        now = time.perf_counter()

        if now - self.last_sample_time < self.sample_interval:
            return
        self.last_sample_time = now

        _, self.ollama_runners = find_ollama_process()

        cpu = self.ollama_serve.cpu_percent(interval=0.0)
        mem = self.ollama_serve.memory_info().rss
        io_read = self.ollama_serve.io_counters().read_bytes
        io_write = self.ollama_serve.io_counters().write_bytes

        runner_cpu = 0
        runner_mem = 0
        runner_io_write = 0
        runner_io_read = 0

        for process in self.ollama_runners:
            runner_cpu = runner_cpu + process.cpu_percent(interval=0.0)
            runner_mem = runner_mem + process.memory_info().rss
            runner_io_write = runner_io_write + process.io_counters().write_bytes
            runner_io_read = runner_io_read + process.io_counters().read_bytes

        self.samples.append({
            "timestamp": time.perf_counter(),
            "cpu_percent": cpu + runner_cpu,
            "memory_bytes": mem + runner_mem,
            "read_bytes": io_read,
            "write_bytes": io_write
        })

    def summary(self):
        if not self.samples:
            return {}
        
        print("Serve PID:", self.ollama_serve.pid if self.ollama_serve else None)
        print("Runner PIDs:", [r.pid for r in self.ollama_runners])

        return {
            "cpu_avg": sum(s["cpu_percent"] for s in self.samples) / len(self.samples),
            "cpu_peak": max(s["cpu_percent"] for s in self.samples),
            "mem_peak": max(s["memory_bytes"] for s in self.samples),
            "disk_read_total": self.samples[-1]["read_bytes"] - self.samples[0]["read_bytes"],
            "disk_write_total": self.samples[-1]["write_bytes"] - self.samples[0]["write_bytes"],
            "total_inference_time": self.total_time,
            "sample_count": len(self.samples)
        }