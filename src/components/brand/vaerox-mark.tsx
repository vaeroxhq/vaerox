/**
 * VÆRØX primary mark — SVG reconstruction.
 * Geometry: 45°-rotated square frame + 4-fold rotational pinwheel of
 * interlocking hooks rendered as parallel double-strokes.
 * All angles 45°/90°. Uniform stroke. Monochrome (currentColor).
 */
export function VaeroxMark({
  size = 32,
  className,
  strokeWidth,
  title = "VÆRØX",
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
  title?: string;
}) {
  const sw = strokeWidth ?? Math.max(2, Math.round(size / 16));
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Outer diamond — rotated square frame */}
      <path d="M50 4 L96 50 L50 96 L4 50 Z" />

      {/* 4-fold rotational pinwheel of interlocking hooks (double stroke) */}
      <g>
        {[0, 90, 180, 270].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 50 50)`}>
            {/* Outer hook stroke */}
            <path d="M30 22 L30 42 L50 42" />
            {/* Inner parallel hook stroke, offset inward */}
            <path d="M38 30 L38 50 L58 50" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/**
 * Wordmark lockup — Symbol + hairline divider + VÆRØX wordmark.
 * Proportions tuned for premium engineering identity at nav scale.
 */
export function VaeroxLockup({
  markSize = 22,
  className = "",
}: {
  markSize?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-text-1 ${className}`}
      aria-label="VÆRØX"
    >
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
