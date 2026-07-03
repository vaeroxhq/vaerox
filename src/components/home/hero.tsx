import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
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
        <span className="text-label text-text-3">§01 · AI &amp; Software Engineering Studio</span>
      </div>

      <h1 className="text-display-xl max-w-[1040px] animate-hero-heading text-balance">
        Modern software,
        <br />
        <span className="text-text-2">engineered end-to-end.</span>
      </h1>

      <p className="mt-12 max-w-[720px] text-text-2 text-body-m animate-hero-description">
        VÆRØX is an independent AI &amp; software engineering studio. We design, build and maintain
        modern software systems — AI agents, SaaS products, internal tools, backend platforms, and
        workflow automation — for startups, growing businesses and enterprise teams.
      </p>

      <div className="mt-8 flex flex-col gap-4 animate-hero-description">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <span className="text-body-s text-text-3">AI Agents</span>
          <span className="text-body-s text-text-3">Custom Software</span>
          <span className="text-body-s text-text-3">Internal Platforms</span>
          <span className="text-body-s text-text-3">SaaS Products</span>
          <span className="text-body-s text-text-3">Automation</span>
          <span className="text-body-s text-text-3">Infrastructure</span>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 animate-hero-buttons">
        <Button
          asChild
          variant="ghost"
          className="text-text-1 animate-button-cta-hover active:opacity-50 hover:opacity-70"
        >
          <Link to="/contact">Discuss your project →</Link>
        </Button>
        <Button asChild variant="ghost" className="animate-button-cta-hover">
          <Link to="/services">View services →</Link>
        </Button>
        <Button asChild variant="ghost" className="animate-button-cta-hover">
          <Link to="/projects">Case studies →</Link>
        </Button>
      </div>

      <div className="mt-24 max-w-[720px]">
        <div className="hairline-t" />
        <div className="hairline-t mt-[3px]" />
      </div>

      <CornerFramed className="mt-8">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
          <MetaCell label="Studio" value="Vaerox" />
          <MetaCell label="Model" value="Independent" />
          <MetaCell label="Clients" value="Startup → Enterprise" />
          <MetaCell label="Contact" value="vaeroxhq@gmail.com" />
        </dl>
      </CornerFramed>
    </section>
  );
}
