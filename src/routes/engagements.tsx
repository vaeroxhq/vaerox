import { createFileRoute } from "@tanstack/react-router";
import { ENGAGEMENTS } from "@/lib/engagements-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { CtaBlock } from "@/components/home/cta-block";

export const Route = createFileRoute("/engagements")({
  head: () => ({
    meta: [
      { title: "Engagement Models — VÆRØX" },
      {
        name: "description",
        content:
          "How to work with VÆRØX: MVP development, fixed-scope projects, long-term product engineering, fractional engineering, technical consulting, AI strategy, and legacy modernization.",
      },
      { property: "og:title", content: "Engagement Models — VÆRØX" },
      { property: "og:description", content: "Ways to engage the studio — fixed, retained, fractional, advisory." },
    ],
  }),
  component: EngagementsPage,
});

function EngagementsPage() {
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Engagements" }]} />
      <PageHeader
        section="§ · Engagement Models"
        title="How to work with the studio."
        summary="Fixed-scope projects, MVPs, long-term product engineering, fractional capacity, and short advisory engagements — chosen to match the shape of the work, not the shape of a template contract."
        meta={[
          { label: "Models",   value: ENGAGEMENTS.length.toString().padStart(2, "0") },
          { label: "Duration", value: "1 week → 9 months" },
          { label: "Terms",    value: "Fixed or capped" },
          { label: "Start",    value: "Discovery call" },
        ]}
      />

      <div className="hairline bg-canvas">
        {ENGAGEMENTS.map((e, i, arr) => (
          <article
            key={e.slug}
            className={`grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 px-5 py-6 ${i < arr.length - 1 ? "hairline-b" : ""}`}
          >
            <header>
              <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{e.code}</div>
              <h3 className="mt-2 font-display text-[22px] text-text-1 tracking-[-0.015em]">{e.name}</h3>
              <dl className="mt-4 space-y-2">
                <div>
                  <dt className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.18em] opacity-70">Duration</dt>
                  <dd className="font-mono text-[12px] text-text-2 mt-0.5 tabular">{e.duration}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.18em] opacity-70">Terms</dt>
                  <dd className="font-mono text-[12px] text-text-2 mt-0.5 tabular">{e.pricing}</dd>
                </div>
              </dl>
            </header>

            <div>
              <p className="text-[13.5px] text-text-2 leading-[1.65]">{e.summary}</p>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.18em] opacity-70">Ideal for</div>
                  <ul className="mt-2 space-y-1">
                    {e.idealFor.map((x) => <li key={x} className="text-[12.5px] text-text-2 leading-[1.55]">— {x}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.18em] opacity-70">Deliverables</div>
                  <ul className="mt-2 space-y-1">
                    {e.deliverables.map((x) => <li key={x} className="text-[12.5px] text-text-2 leading-[1.55]">— {x}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <CtaBlock />
    </SectionShell>
  );
}
