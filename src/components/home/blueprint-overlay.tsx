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
      style={
        {
          "--blueprint-circle-size": "clamp(500px, 20vw, 700px)",
          "--blueprint-mark-size": "clamp(250px, 10vw, 350px)",
          "--blueprint-offset-top": "clamp(120px, 6vh, 180px)",
          "--blueprint-offset-right": "clamp(-100px, -2vw, -120px)",
        } as React.CSSProperties
      }
    >
      <svg
        className="absolute inset-y-0 right-0 h-full w-[62%]"
        style={{ color: "var(--bg-grid-color)", opacity: "var(--bg-grid-opacity)" }}
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
        className="absolute animate-float-subtle"
        style={{
          top: "var(--blueprint-offset-top)",
          right: "var(--blueprint-offset-right)",
          width: "var(--blueprint-circle-size)",
          height: "var(--blueprint-circle-size)",
          color: "var(--bg-circle-color)",
          opacity: "var(--bg-circle-opacity)",
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

      {/* Right side balance anchor */}
      <svg
        className="absolute animate-float-subtle"
        style={{
          top: "clamp(480px, 45vh, 600px)",
          right: "clamp(40px, 3vw, 100px)",
          width: "clamp(200px, 12vw, 300px)",
          height: "clamp(200px, 12vw, 300px)",
          color: "var(--bg-circle-color)",
          opacity: "var(--bg-circle-opacity)",
          animationDelay: "1s",
        }}
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="200" cy="200" r="100" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="180" />
          <line x1="0" y1="200" x2="400" y2="200" strokeDasharray="1 6" />
          <line x1="200" y1="0" x2="200" y2="400" strokeDasharray="1 6" />
        </g>
      </svg>

      <div
        className="absolute"
        style={{
          top: "clamp(280px, 18vh, 360px)",
          right: "clamp(120px, 8vw, 220px)",
          color: "var(--bg-watermark-color)",
          opacity: "var(--bg-watermark-opacity)",
        }}
      >
        <VaeroxMark size="var(--blueprint-mark-size)" />
      </div>

      <div
        className="absolute right-6 top-40 flex flex-col gap-8 text-metadata tabular"
        style={{ color: "var(--bg-coords-color)", opacity: "var(--bg-coords-opacity)" }}
      >
        {["y·000", "y·080", "y·160", "y·240", "y·320", "y·400", "y·480"].map((t) => (
          <span key={t} className="flex items-center gap-2">
            <span className="inline-block h-px w-2 bg-line-2" />
            {t}
          </span>
        ))}
      </div>

      <div
        className="absolute right-6 bottom-40 flex flex-col items-end gap-1 text-metadata tabular"
        style={{ color: "var(--bg-coords-color)", opacity: "var(--bg-coords-opacity)" }}
      >
        <span>rev · 001</span>
        <span>sheet · 01/01</span>
        <span>scale · 1:1</span>
      </div>
    </div>
  );
}
