import psutil
import time
import json
from datetime import datetime

def find_ollama_process():
    for p in psutil.process_iter(['name', 'cmdline']):
        cmd = " ".join(p.info.get("cmdline", []))
        if "ollama serve" in cmd:
            return p
    raise RuntimeError("Ollama process not found")

class ModelPerformanceTracker:
    def __init__(self):
        self.ollama = find_ollama_process()
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
        
        cpu = self.ollama.cpu_percent(interval=0.0)
        mem = self.ollama.memory_info().rss
        io = self.ollama.io_counters()

        self.samples.append({
            "timestamp": time.perf_counter(),
            "cpu_percent": cpu,
            "memory_bytes": mem,
            "read_bytes": io.read_bytes,
            "write_bytes": io.write_bytes
        })

    def summary(self):
        if not self.samples:
            return {}
        
        return {
            "cpu_avg": sum(s["cpu_percent"] for s in self.samples) / len(self.samples),
            "cpu_peak": max(s["cpu_percent"] for s in self.samples),
            "mem_peak": max(s["memory_bytes"] for s in self.samples),
            "disk_read_total": self.samples[-1]["read_bytes"] - self.samples[0]["read_bytes"],
            "disk_write_total": self.samples[-1]["write_bytes"] - self.samples[0]["write_bytes"],
            "total_inference_time": self.total_time,
            "sample_count": len(self.samples)
        }