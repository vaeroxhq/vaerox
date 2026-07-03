import { Link } from "@tanstack/react-router";
import { DiamondGlyph, CornerFramed, MetaCell } from "./primitives";

/**
 * Hero — studio positioning. Three destinations, not seven.
 * Everything else lives in the nav.
 *
 * Animation: Staggered entrance sequence (logo → metadata → heading → description → buttons)
 * Duration: ~600ms total, with 60–80ms stagger between elements
 */
export function Hero() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="flex items-center gap-3 mb-14 animate-hero-logo">
        <DiamondGlyph />
        <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
          §01 · AI &amp; Software Engineering Studio
        </span>
      </div>

      <h1 className="text-display-adaptive max-w-[1040px] animate-hero-heading">
        Modern software,
        <br />
        <span className="text-text-2">engineered end-to-end.</span>
      </h1>

      <p className="mt-12 max-w-[700px] text-text-2 text-md-adaptive leading-[1.65] animate-hero-description">
        VÆRØX is an independent AI &amp; software engineering studio. We design, build and maintain
        modern software systems — AI agents, SaaS products, internal tools, backend platforms, and
        workflow automation — for startups, growing businesses and enterprise teams.
      </p>

      <div className="mt-8 flex flex-col gap-4 animate-hero-description">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <span className="text-[12px] text-text-3">AI Agents</span>
          <span className="text-[12px] text-text-3">Custom Software</span>
          <span className="text-[12px] text-text-3">Internal Platforms</span>
          <span className="text-[12px] text-text-3">SaaS Products</span>
          <span className="text-[12px] text-text-3">Automation</span>
          <span className="text-[12px] text-text-3">Infrastructure</span>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 animate-hero-buttons">
        <Link
          to="/contact"
          className="font-mono text-[11px] text-text-1 uppercase tracking-[0.14em] animate-button-cta-hover hover:opacity-70 active:opacity-50 transition-micro"
        >
          Discuss your project →
        </Link>
        <Link
          to="/services"
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] animate-button-cta-hover hover:text-text-1 transition-micro"
        >
          View services →
        </Link>
        <Link
          to="/projects"
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] animate-button-cta-hover hover:text-text-1 transition-micro"
        >
          Case studies →
        </Link>
      </div>

      <div className="mt-20 max-w-[640px]">
        <div className="hairline-t" />
        <div className="hairline-t mt-[3px]" />
      </div>

      <CornerFramed className="mt-8">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
          <MetaCell label="Studio" value="Vareox" />
          <MetaCell label="Model" value="Independent" />
          <MetaCell label="Clients" value="Startup → Enterprise" />
          <MetaCell label="Contact" value="vaeroxhq@gmail.com" />
        </dl>
      </CornerFramed>
    </section>
  );
}
