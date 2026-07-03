import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DiamondGlyph, CornerFramed, MetaCell } from "./primitives";
import { SystemStatus } from "./system-status";
import { AgentNetwork } from "./agent-network";

/**
 * Hero — studio positioning. Three destinations, not seven.
 * Everything else lives in the nav.
 *
 * Animation: Staggered entrance sequence (logo → metadata → heading → description → buttons)
 * Duration: ~600ms total, with 60–80ms stagger between elements
 */
export function Hero() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <AgentNetwork />

      {/* Corner calibration marks */}
      <div className="absolute top-8 left-0 w-4 h-4 border-t border-l border-line-2 opacity-50 hidden lg:block" />
      <div className="absolute top-8 right-0 w-4 h-4 border-t border-r border-line-2 opacity-50 hidden lg:block" />

      <div className="flex items-center gap-3 mb-14 animate-hero-logo">
        <DiamondGlyph />
        <span className="text-label text-text-3">§01 · AI Systems Engineering</span>
      </div>

      <h1 className="text-display-xl max-w-[1040px] animate-hero-heading text-balance">
        Autonomous intelligence,
        <br />
        <span className="text-text-2">engineered end-to-end.</span>
      </h1>

      <p className="mt-12 max-w-[720px] text-text-2 text-body-m animate-hero-description">
        VÆRØX is an AI systems engineering company. We build autonomous agents, neural reasoning
        pipelines, and scalable execution environments for enterprise infrastructure.
      </p>

      <SystemStatus />

      <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 animate-hero-buttons relative z-10">
        <Button
          asChild
          variant="ghost"
          className="text-text-1 animate-button-cta-hover active:opacity-50 hover:opacity-70"
        >
          <Link to="/contact">Initialize Session [Terminal] →</Link>
        </Button>
        <Button asChild variant="ghost" className="animate-button-cta-hover">
          <Link to="/services">System Capabilities [Docs] →</Link>
        </Button>
        <Button asChild variant="ghost" className="animate-button-cta-hover">
          <Link to="/projects">Execution Logs [Data] →</Link>
        </Button>
      </div>

      <div className="mt-24 max-w-[720px]">
        <div className="hairline-t" />
        <div className="hairline-t mt-[3px]" />
      </div>

      <CornerFramed className="mt-8">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
          <MetaCell label="System" value="Vaerox Kernel" />
          <MetaCell label="Type" value="Autonomous OS" />
          <MetaCell label="Status" value="Active / Routing" />
          <MetaCell label="Uptime" value="99.999%" />
        </dl>
      </CornerFramed>
    </section>
  );
}
