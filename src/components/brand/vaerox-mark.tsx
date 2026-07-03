/**
 * VÆRØX primary mark — official raster master.
 *
 * The PNG at /public/vaerox-mark.png is the immutable production asset.
 * Do NOT reconstruct, redraw, approximate, or "improve" this mark in SVG.
 * Every lockup, favicon, watermark, and nav instance must render the exact file.
 * When a vector master is provided, swap the asset pointer only — do not regenerate geometry.
 */

export function VaeroxMark({
  size = 32,
  className = "",
  title = "VÆRØX",
}: {
  size?: number | string;
  className?: string;
  strokeWidth?: number; // accepted for API compatibility; ignored (raster master)
  title?: string;
}) {
  return (
    <img
      src="/vaerox-mark.png"
      width={size}
      height={size}
      alt={title}
      draggable={false}
      className={`block select-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/**
 * Wordmark lockup — Symbol + hairline divider + VÆRØX wordmark.
 */
export function VaeroxLockup({
  markSize = 22,
  className = "",
}: {
  markSize?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 text-text-1 ${className}`} aria-label="VÆRØX">
      <VaeroxMark size={markSize} aria-hidden="true" />
      <span
        aria-hidden="true"
        className="inline-block bg-line-2 mt-[1px]"
        style={{ width: 1, height: markSize * 0.82 }}
      />
      <span
        className="font-display text-body-m md:text-heading-s font-medium tracking-[0.14em] mt-[1px]"
        aria-hidden="true"
      >
        VÆRØX
      </span>
    </span>
  );
}
