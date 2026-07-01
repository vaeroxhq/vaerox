import { DiamondGlyph, CornerFramed, MetaCell } from "./primitives";

/**
 * Hero — introduction. Copy positions VÆRØX truthfully as an
 * independent engineering laboratory maintained by one engineer.
 */
export function Hero() {
  return (
    <section className="relative pt-28 md:pt-40 lg:pt-48 pb-24 md:pb-32">
      <div className="flex items-center gap-3 mb-14">
        <DiamondGlyph />
        <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
          §01 · Introduction
        </span>
      </div>

      <h1 className="font-display text-[52px] md:text-[80px] lg:text-[96px] leading-[0.98] tracking-[-0.032em] max-w-[980px]">
        An independent
        <br />
        <span className="text-text-2">engineering laboratory.</span>
      </h1>

      <p className="mt-12 max-w-[640px] text-text-2 text-[15px] leading-[1.65]">
        VÆRØX is a public engineering lab, written and maintained by one engineer.
        It documents architecture exploration for enterprise AI, distributed
        platforms, and low-latency infrastructure — the reference implementations,
        the decisions behind them, and the write-ups that explain why. Every
        artifact on this site is authored, dated, and signed by the same person.
      </p>

      <div className="mt-20 max-w-[640px]">
        <div className="hairline-t" />
        <div className="hairline-t mt-[3px]" />
      </div>

      <CornerFramed className="mt-8">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
          <MetaCell label="Maintainer" value="Solo" />
          <MetaCell label="License" value="Public" />
          <MetaCell label="Cadence" value="Async" />
          <MetaCell label="Updated" value="2026-07-01" />
        </dl>
      </CornerFramed>
    </section>
  );
}
