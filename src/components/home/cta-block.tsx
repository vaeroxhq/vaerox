import { Link } from "@tanstack/react-router";
import { DiamondGlyph } from "./primitives";

/**
 * CtaBlock — final section on the home page. One destination.
 * Identity metadata is intentionally not repeated here — the footer
 * is the single source for that.
 */
export function CtaBlock() {
  return (
    <section className="mt-20 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <DiamondGlyph />
        <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
          § · Start a conversation
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end pb-8">
        <div>
          <h2 className="font-display text-[32px] md:text-[44px] leading-[1.02] tracking-[-0.024em] max-w-[720px]">
            Build something worth documenting.
          </h2>
          <p className="mt-5 max-w-[560px] text-[14px] text-text-2 leading-[1.65]">
            An MVP, a rebuild, a production AI system, or a stubborn workflow
            that needs to be automated. Written proposal inside a week.
          </p>
        </div>

        <Link to="/contact" className="font-mono text-[11px] text-text-1 uppercase tracking-[0.14em] hover:opacity-70 transition-micro">
          Book a discovery call →
        </Link>
      </div>
    </section>
  );
}
