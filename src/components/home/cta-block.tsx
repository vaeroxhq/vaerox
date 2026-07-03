import { Link } from "@tanstack/react-router";
import { DiamondGlyph } from "./primitives";

/**
 * CtaBlock — final section on the home page. One destination.
 * Identity metadata is intentionally not repeated here — the footer
 * is the single source for that.
 *
 * Typography: Uses adaptive clamp() sizing to maintain visual consistency
 * across desktop resolutions while remaining responsive to tablet/mobile.
 */
export function CtaBlock() {
  return (
    <section className="relative">
      <div className="flex items-center gap-3 mb-6">
        <DiamondGlyph />
        <span className="text-label text-text-3">§ · Start a conversation</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end pb-8">
        <div>
          <h2 className="font-display text-2xl-adaptive max-w-[720px]">
            Build something worth documenting.
          </h2>
          <p className="mt-5 max-w-[560px] text-body-m text-text-2">
            An MVP, a rebuild, a production AI system, or a stubborn workflow that needs to be
            automated. Written proposal inside a week.
          </p>
        </div>

        <Link
          to="/contact"
          className="text-button text-text-1 animate-button-cta-hover hover:opacity-70 active:opacity-50 transition-micro"
        >
          Book a discovery call →
        </Link>
      </div>
    </section>
  );
}
