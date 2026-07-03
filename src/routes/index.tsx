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
      {
        title: "Vaerox — AI & Software Engineering Studio | Production AI Agents & Custom Software",
      },
      {
        name: "description",
        content:
          "Vaerox is an independent AI & software engineering studio building production-grade AI agents, SaaS products, internal tools, backend platforms, and workflow automation for startups, SMBs, and enterprises. Based in IST timezone, remote worldwide, typical response within 24 hours.",
      },
      { property: "og:title", content: "Vaerox — AI & Software Engineering Studio" },
      {
        property: "og:description",
        content:
          "Modern software systems, engineered end-to-end. AI agents, SaaS, internal tools, backend platforms, automation.",
      },
      { name: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Vaerox — AI & Software Engineering Studio" },
      {
        name: "keywords",
        content:
          "AI agents, LLM applications, custom software, SaaS development, backend engineering, workflow automation, AI engineering studio",
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
 *
 * Layout: Adaptive container scales 90vw (clamped 1024–1280px) for
 * visual consistency across all desktop resolutions (1366–3440px).
 * Padding is fixed at px-8 for all desktops, only adjusts on tablet/mobile.
 *
 * Strategy: Not a fluid layout. Each resolution should look like a perfectly
 * scaled version of Screenshot A (2560×1600). Typography uses reduced vw% to
 * minimize scaling differences across desktop resolutions.
 */
function Index() {
  return (
    <div className="bg-canvas text-text-1 relative overflow-hidden">
      <BlueprintOverlay />
      <div className="relative w-adaptive mx-auto px-8 md:px-10 lg:px-8">
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
