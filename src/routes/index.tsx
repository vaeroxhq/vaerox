import { createFileRoute } from "@tanstack/react-router";
import { BlueprintOverlay } from "@/components/home/blueprint-overlay";
import { Hero } from "@/components/home/hero";
import { DomainGrid } from "@/components/home/domain-grid";
import { SectionRule } from "@/components/home/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VÆRØX — Engineering Systems" },
      {
        name: "description",
        content:
          "VÆRØX is an engineering organization building enterprise AI, platform, and distributed systems in public.",
      },
    ],
  }),
  component: Index,
});

/**
 * Phase 2 — Layout & Navigation Foundation.
 * Homepage composes reusable modules. No visual changes beyond:
 * (1) tightened hero measure, (2) hairline hierarchy inside domain cards.
 * Nav logo bump and shell primitives live in their own modules.
 */
function Index() {
  return (
    <div className="bg-canvas text-text-1 relative overflow-hidden">
      <BlueprintOverlay />
      <div className="relative w-shell mx-auto px-6 md:px-10 lg:px-16">
        <Hero />
        <SectionRule label="§02 · Structure" />
        <DomainGrid />
      </div>
    </div>
  );
}
