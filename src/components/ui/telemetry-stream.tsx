import { useEffect, useState } from "react";

export function TelemetryStream() {
  const [metrics, setMetrics] = useState({ cpu: "0.00", mem: "0.00", net: "0.00" });

  useEffect(() => {
    // Generate subtle fluctuations
    const interval = setInterval(() => {
      setMetrics({
        cpu: (Math.random() * 5 + 2).toFixed(2),
        mem: (Math.random() * 2 + 64).toFixed(2),
        net: (Math.random() * 10 + 40).toFixed(2),
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-6 w-full border-b border-line-2 bg-canvas flex items-center justify-between px-4 tabular-nums text-[10px] text-text-3 font-mono tracking-widest overflow-hidden">
      <div className="flex gap-8">
        <span className="flex items-center gap-2">
          <span className="dot bg-success animate-pulse" />
          VÆRØX_OS [v1.0.0]
        </span>
        <span className="hidden sm:inline">SYS_STATE: ONLINE</span>
      </div>
      <div className="flex gap-6 opacity-70">
        <span>CPU: {metrics.cpu}%</span>
        <span>MEM: {metrics.mem}GB</span>
        <span className="hidden md:inline">NET: {metrics.net}MB/s</span>
        <span className="hidden lg:inline">POOL: 1024 AGENTS</span>
      </div>
    </div>
  );
}
