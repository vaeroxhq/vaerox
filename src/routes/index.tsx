import { createFileRoute } from "@tanstack/react-router";
import { BlueprintOverlay } from "@/components/home/blueprint-overlay";
import { Hero } from "@/components/home/hero";
import { ServicesPreview } from "@/components/home/services-preview";
import { IndustriesStrip } from "@/components/home/industries-strip";
import { ProjectGrid } from "@/components/home/project-grid";
import { WhyVaerox } from "@/components/home/why-vaerox";
import { EngagementsPreview } from "@/components/home/engagements-preview";
import { EngineeringPrinciples } from "@/components/home/engineering-principles";
import { KnowledgeGraphPreview } from "@/components/home/knowledge-graph-preview";
import { RecentNotes } from "@/components/home/recent-notes";
import { CtaBlock } from "@/components/home/cta-block";
import { SectionRule } from "@/components/home/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VÆRØX — AI & Software Engineering Studio" },
      {
        name: "description",
        content:
          "VÆRØX is an independent AI & software engineering studio. We design, build, deploy and maintain modern software systems — AI agents, SaaS products, internal tools, dashboards, backend platforms, and workflow automation — for startups, growing businesses and enterprise teams.",
      },
      { property: "og:title", content: "VÆRØX — AI & Software Engineering Studio" },
      {
        property: "og:description",
        content:
          "Modern software systems, engineered end-to-end. AI, automation, backend, and full-stack for startups, SMBs, and enterprise teams.",
      },
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

        <SectionRule label="§02 · Services" />
        <ServicesPreview />

        <SectionRule label="§03 · Industries" />
        <IndustriesStrip />

        <SectionRule label="§04 · Case Studies" />
        <ProjectGrid />

        <SectionRule label="§05 · Why VÆRØX" />
        <WhyVaerox />

        <SectionRule label="§06 · Engagement Models" />
        <EngagementsPreview />

        <SectionRule label="§07 · Engineering Principles" />
        <EngineeringPrinciples />

        <SectionRule label="§08 · Knowledge Graph" />
        <KnowledgeGraphPreview />

        <SectionRule label="§09 · Recent Notes" />
        <RecentNotes />

        <SectionRule label="§10 · Contact" />
        <CtaBlock />
      </div>
    </div>
  );
}
