import { createFileRoute } from "@tanstack/react-router";
import { BlueprintOverlay } from "@/components/home/blueprint-overlay";
import { Hero } from "@/components/home/hero";
import { ProjectGrid } from "@/components/home/project-grid";
import { EngineeringPrinciples } from "@/components/home/engineering-principles";
import { KnowledgeGraphPreview } from "@/components/home/knowledge-graph-preview";
import { RecentNotes } from "@/components/home/recent-notes";
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
 * Phase 3 — Engineering Surface.
 * Homepage composed from data-driven modules. Visual language locked;
 * this pass adds functional sections (projects, principles, graph, notes)
 * and wires them to the command palette.
 */
function Index() {
  return (
    <div className="bg-canvas text-text-1 relative overflow-hidden">
      <BlueprintOverlay />
      <div className="relative w-shell mx-auto px-6 md:px-10 lg:px-16">
        <Hero />

        <SectionRule label="§02 · Featured Systems" />
        <ProjectGrid />

        <SectionRule label="§03 · Engineering Principles" />
        <EngineeringPrinciples />

        <SectionRule label="§04 · Knowledge Graph" />
        <KnowledgeGraphPreview />

        <SectionRule label="§05 · Recent Notes" />
        <RecentNotes />
      </div>
    </div>
  );
}
