import type { OpsTag as OpsTagName } from "@/lib/home-data";

/**
 * OpsTag — 10px mono uppercase label used sparingly to convey
 * operational state (LIVE, SIGNED, INDEXED, …). No color; a small
 * leading tick keeps them legible on dark and light surfaces.
 */
export function OpsTag({ label }: { label: OpsTagName | string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] text-text-3 uppercase tracking-[0.18em]">
      <span
        aria-hidden="true"
        className="inline-block h-[6px] w-[6px] border border-line-3"
      />
      {label}
    </span>
  );
}
