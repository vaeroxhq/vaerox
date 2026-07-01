import { DiamondGlyph, CornerFramed, MetaCell } from "./primitives";

/**
 * CtaBlock — conversion surface reused across client-facing pages. Same
 * visual language as the rest of the site; no marketing gloss.
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

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-end pb-8">
        <div>
          <h2 className="font-display text-[32px] md:text-[44px] leading-[1.02] tracking-[-0.024em] max-w-[720px]">
            Build something worth documenting.
          </h2>
          <p className="mt-5 max-w-[560px] text-[14px] text-text-2 leading-[1.65]">
            An MVP, a rebuild, a production AI system, a stubborn workflow that
            needs to be automated — or a discovery call to figure out which
            one you actually need. Written proposal inside a week.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="/contact" className="font-mono text-[11px] text-text-1 uppercase tracking-[0.14em] hover:opacity-70 transition-micro">
            Book a discovery call →
          </a>
          <a href="/engagements" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1 transition-micro">
            Engagement models →
          </a>
          <a href="/services" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1 transition-micro">
            Services →
          </a>
        </div>
      </div>

      <CornerFramed>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
          <MetaCell label="Email"    value="hello@vaerox.dev" />
          <MetaCell label="Response" value="Within a week" />
          <MetaCell label="Proposal" value="Written" />
          <MetaCell label="Model"    value="Fixed / Capped" />
        </dl>
      </CornerFramed>
    </section>
  );
}
