import { DiamondGlyph, CornerFramed, MetaCell } from "./primitives";

/**
 * Hero — studio positioning. VÆRØX is an independent AI engineering studio
 * that designs and builds intelligent software. The maintainer's name lives
 * on the About page, not here.
 */
export function Hero() {
  return (
    <section className="relative pt-28 md:pt-40 lg:pt-48 pb-24 md:pb-32">
      <div className="flex items-center gap-3 mb-14">
        <DiamondGlyph />
        <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
          §01 · Studio
        </span>
      </div>

      <h1 className="font-display text-[52px] md:text-[80px] lg:text-[96px] leading-[0.98] tracking-[-0.032em] max-w-[980px]">
        AI systems.
        <br />
        <span className="text-text-2">Software engineering.</span>
        <br />
        <span className="text-text-2">Automation.</span>
      </h1>

      <p className="mt-12 max-w-[680px] text-text-2 text-[15px] leading-[1.65]">
        VÆRØX is an independent AI engineering studio that designs and ships
        intelligent software — AI agents, LLM applications, RAG systems,
        MCP servers, workflow automation, and production-grade backend
        platforms. Every project on this site is engineered, documented, and
        maintained under the same discipline the studio brings to client work.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href="/services"
          className="font-mono text-[11px] text-text-1 uppercase tracking-[0.14em] hover:opacity-70 transition-micro"
        >
          Services →
        </a>
        <a
          href="/case-studies"
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1 transition-micro"
        >
          Case studies →
        </a>
        <a
          href="/capabilities"
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1 transition-micro"
        >
          Capabilities →
        </a>
        <a
          href="/contact"
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1 transition-micro"
        >
          Start a conversation →
        </a>
      </div>

      <div className="mt-20 max-w-[640px]">
        <div className="hairline-t" />
        <div className="hairline-t mt-[3px]" />
      </div>

      <CornerFramed className="mt-8">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
          <MetaCell label="Studio" value="VÆRØX" />
          <MetaCell label="Model" value="Independent" />
          <MetaCell label="Cadence" value="Async" />
          <MetaCell label="Updated" value="2026-07-01" />
        </dl>
      </CornerFramed>
    </section>
  );
}
