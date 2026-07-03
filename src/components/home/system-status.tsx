import { useEffect, useState } from "react";

/**
 * SystemStatus — VÆRØX Engineering Terminal Feed
 * Simulates a subtle initialization sequence to establish the "OS" identity.
 */
export function SystemStatus() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    // Skip animation if reduced motion preferred
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLines([
        "[SYS.INIT] VÆRØX KERNEL LOADED",
        "[ORCHESTRATOR] AGENT POOL: READY",
        "[ROUTING] NEURAL PATHWAYS: OPTIMIZED",
      ]);
      return;
    }

    const sequence = [
      "[SYS.INIT] BOOT SEQUENCE INITIATED",
      "[MEM.ALLOC] 0x00F82A RESERVE... OK",
      "[NET.BIND] LISTENING ON PORT 443",
      "[ORCHESTRATOR] STARTING AGENT SUPERVISOR",
      "[MODELS] LOADING EMBEDDINGS (DIM=1536)",
      "[ROUTING] VECTOR SEARCH ONLINE",
      "[VÆRØX] SYSTEMS NOMINAL.",
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < sequence.length) {
        setLines((prev) => [...prev, sequence[current]]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 max-w-[600px] border border-line-2 bg-canvas/50 backdrop-blur-md p-4 animate-hero-description relative">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-text-3 opacity-50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-text-3 opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-text-3 opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-text-3 opacity-50" />

      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-line-1">
        <span className="dot text-success animate-pulse" />
        <span className="text-overline text-text-3 tracking-[0.2em]">Live Execution Feed</span>
      </div>
      <div className="font-mono text-[10px] leading-relaxed text-text-2 tabular-nums">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-4 opacity-80">
            <span className="text-text-3 w-12 text-right">
              {(i * 14).toString().padStart(4, "0")}ms
            </span>
            <span>{line}</span>
          </div>
        ))}
        {lines.length < 7 && (
          <div className="flex gap-4 opacity-50">
            <span className="text-text-3 w-12 text-right">....ms</span>
            <span className="animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
