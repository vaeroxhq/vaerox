import { createFileRoute } from "@tanstack/react-router";
import { WHY_POINTS } from "@/lib/why-vaerox-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { CtaBlock } from "@/components/home/cta-block";

export const Route = createFileRoute("/why")({
  head: () => ({
    meta: [
      { title: "Why VÆRØX — AI & Software Engineering Studio" },
      {
        name: "description",
        content:
          "Why teams engage VÆRØX: architecture-first engineering, production-quality code, AI-native development, transparent delivery, and documentation that makes software maintainable.",
      },
      { property: "og:title", content: "Why VÆRØX" },
      { property: "og:description", content: "The engineering standards that back the studio's work." },
    ],
  }),
  component: WhyPage,
});

function WhyPage() {
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Why VÆRØX" }]} />
      <PageHeader
        section="§ · Why VÆRØX"
        title="How the studio works."
        summary="Nine standards that shape every project. Each one is testable against the rest of this site — the ADRs, the Handbook, the Architecture diagrams, the Journal, and the case studies."
        meta={[
          { label: "Standards", value: WHY_POINTS.length.toString().padStart(2, "0") },
          { label: "Discipline", value: "Documented" },
          { label: "Delivery",  value: "Incremental" },
          { label: "Handover",  value: "Included" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-1 hairline">
        {WHY_POINTS.map((p) => (
          <article key={p.code} className="bg-canvas px-5 pt-5 pb-6">
            <header className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] tabular">§{p.code}</span>
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Standard</span>
            </header>
            <div className="hairline-t mt-4" />
            <h3 className="font-display text-[18px] mt-5 tracking-[-0.018em]">{p.title}</h3>
            <p className="mt-2 text-[13px] text-text-2 leading-[1.6]">{p.body}</p>
          </article>
        ))}
      </div>

      <CtaBlock />
    </SectionShell>
  );
}
