import { VaeroxMark } from "@/components/brand/vaerox-mark";

/**
 * Blueprint overlay — the right side reads as an engineering drawing.
 * Guides, intersections, coordinate marks, revision tags. Everything is
 * aria-hidden, pointer-events-none, ≤ 5% opacity. Desktop only.
 * 
 * Scaling Strategy: REDUCED from previous 50vw/25vw to maintain visual consistency
 * across all desktop resolutions (1366–3440px). Decorative elements should NOT
 * drift visually as viewport changes.
 * 
 * Circle: ~20–25% of viewport width (not 50vw), clamped tightly
 * Mark: ~10–12% of viewport width (not 25vw)
 * Offset: Subtle scaling only
 * 
 * Result: Blueprint graphics remain visually anchored to Screenshot A composition.
 */
export function BlueprintOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden lg:block select-none"
      style={{
        "--blueprint-circle-size": "clamp(500px, 20vw, 700px)",
        "--blueprint-mark-size": "clamp(250px, 10vw, 350px)",
        "--blueprint-offset-top": "clamp(120px, 6vh, 180px)",
        "--blueprint-offset-right": "clamp(-100px, -2vw, -120px)",
      } as React.CSSProperties}
    >
      <svg
        className="absolute inset-y-0 right-0 h-full w-[62%] text-text-3"
        style={{ opacity: 0.03 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="vx-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M64 0H0V64" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vx-grid)" />
      </svg>

      <svg
        className="absolute text-text-2 animate-float-subtle"
        style={{
          top: "var(--blueprint-offset-top)",
          right: "var(--blueprint-offset-right)",
          width: "var(--blueprint-circle-size)",
          height: "var(--blueprint-circle-size)",
          opacity: 0.03,
        }}
        viewBox="0 0 880 880"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="440" cy="440" r="200" />
          <circle cx="440" cy="440" r="320" />
          <circle cx="440" cy="440" r="420" strokeDasharray="2 6" />
          <line x1="0" y1="440" x2="880" y2="440" strokeDasharray="1 8" />
          <line x1="440" y1="0" x2="440" y2="880" strokeDasharray="1 8" />
          <line x1="140" y1="140" x2="740" y2="740" strokeDasharray="1 8" />
          <line x1="740" y1="140" x2="140" y2="740" strokeDasharray="1 8" />
        </g>
      </svg>

      <div
        className="absolute"
        style={{
          top: "clamp(280px, 18vh, 360px)",
          right: "clamp(100px, 6vw, 200px)",
          opacity: 0.03,
        }}
      >
        <VaeroxMark size={parseInt(getComputedStyle(document.documentElement).getPropertyValue("--blueprint-mark-size")?.replace("px", "") || "300")} />
      </div>

      <div
        className="absolute right-6 top-40 flex flex-col gap-8 font-mono text-[9px] text-text-3 uppercase tracking-[0.14em] tabular"
        style={{ opacity: 0.03 }}
      >
        {["y·000", "y·080", "y·160", "y·240", "y·320", "y·400", "y·480"].map((t) => (
          <span key={t} className="flex items-center gap-2">
            <span className="inline-block h-px w-2 bg-line-2" />
            {t}
          </span>
        ))}
      </div>

      <div
        className="absolute right-6 bottom-40 flex flex-col items-end gap-1 font-mono text-[9px] text-text-3 uppercase tracking-[0.14em] tabular"
        style={{ opacity: 0.02 }}
      >
        <span>rev · 001</span>
        <span>sheet · 01/01</span>
        <span>scale · 1:1</span>
      </div>
    </div>
  );
}
