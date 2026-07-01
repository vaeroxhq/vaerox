import { createFileRoute } from "@tanstack/react-router";
import { BlueprintOverlay } from "@/components/home/blueprint-overlay";
import { Hero } from "@/components/home/hero";
import { ProjectGrid } from "@/components/home/project-grid";
import { EngineeringPrinciples } from "@/components/home/engineering-principles";
import { KnowledgeGraphPreview } from "@/components/home/knowledge-graph-preview";
import { RecentNotes } from "@/components/home/recent-notes";
import { OperationsStrip } from "@/components/home/operations-strip";
import { SectionRule } from "@/components/home/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VÆRØX — Independent AI Engineering Studio" },
      {
        name: "description",
        content:
          "VÆRØX is an independent AI engineering studio designing and shipping intelligent software — AI agents, LLM applications, RAG systems, MCP servers, workflow automation, and production-grade backend platforms.",
      },
      { property: "og:title", content: "VÆRØX — Independent AI Engineering Studio" },
      { property: "og:description", content: "AI systems. Software engineering. Automation." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-canvas text-text-1 relative overflow-hidden">
      <BlueprintOverlay />
      <div className="relative w-shell mx-auto px-6 md:px-10 lg:px-16">
        <Hero />

        <SectionRule label="§02 · Featured Systems" />
        <ProjectGrid />

        <SectionRule label="§03 · Operations" />
        <OperationsStrip />

        <SectionRule label="§04 · Engineering Principles" />
        <EngineeringPrinciples />

        <SectionRule label="§05 · Knowledge Graph" />
        <KnowledgeGraphPreview />

        <SectionRule label="§06 · Recent Notes" />
        <RecentNotes />
      </div>
    </div>
  );
}

