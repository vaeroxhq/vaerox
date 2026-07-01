/**
 * VÆRØX primary mark — official raster master.
 *
 * The uploaded PNG at src/assets/vaerox-mark.png is the immutable production
 * asset. Do NOT reconstruct, redraw, approximate, or "improve" this mark in
 * SVG. Every lockup, favicon, watermark, and nav instance must render the
 * exact uploaded file. When a vector master is provided, swap the asset
 * pointer only — do not regenerate geometry.
 */
import markAsset from "@/assets/vaerox-mark.png.asset.json";

export function VaeroxMark({
  size = 32,
  className = "",
  title = "VÆRØX",
}: {
  size?: number;
  className?: string;
  strokeWidth?: number; // accepted for API compatibility; ignored (raster master)
  title?: string;
}) {
  return (
    <img
      src={markAsset.url}
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
      <VaeroxMark size={markSize} />
      <span
        aria-hidden="true"
        className="inline-block bg-line-2"
        style={{ width: 1, height: markSize * 0.82 }}
      />
      <span className="font-display text-[15px] md:text-[16px] font-medium tracking-[0.14em]">
        VÆRØX
      </span>
    </span>
  );
}
