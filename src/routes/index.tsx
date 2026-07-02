import { createFileRoute } from "@tanstack/react-router";
import { BlueprintOverlay } from "@/components/home/blueprint-overlay";
import { Hero } from "@/components/home/hero";
import { ServicesPreview } from "@/components/home/services-preview";
import { ProjectGrid } from "@/components/home/project-grid";
import { WhyVaerox } from "@/components/home/why-vaerox";
import { CtaBlock } from "@/components/home/cta-block";
import { SectionRule } from "@/components/home/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VÆRØX — AI & Software Engineering Studio" },
      {
        name: "description",
        content:
          "VÆRØX is an independent AI & software engineering studio. We design, build and maintain modern software systems — AI agents, SaaS products, internal tools, backend platforms, and workflow automation.",
      },
      { property: "og:title", content: "VÆRØX — AI & Software Engineering Studio" },
      {
        property: "og:description",
        content:
          "Modern software systems, engineered end-to-end.",
      },
    ],
  }),
  component: Index,
});

/**
 * Home — five sections, each with a distinct purpose.
 * Hero (identity) → Services (what) → Projects (what we've built)
 * → Why (standards) → Contact (start).
 * Industries, engagements, principles, graph, and notes previews
 * were removed because they duplicate their own pages.
 */
function Index() {
  return (
    <div className="bg-canvas text-text-1 relative overflow-hidden">
      <BlueprintOverlay />
      <div className="relative w-shell mx-auto px-6 md:px-10 lg:px-16">
        <Hero />

        <SectionRule label="§02 · Services" />
        <ServicesPreview />

        <SectionRule label="§03 · Projects" />
        <ProjectGrid />

        <SectionRule label="§04 · Standards" />
        <WhyVaerox />

        <SectionRule label="§05 · Contact" />
        <CtaBlock />
      </div>
    </div>
  );
}
