import { createFileRoute, Link } from "@tanstack/react-router";
import { WORK_QUESTIONS } from "@/lib/work-data";
import { SERVICES } from "@/lib/services-data";
import { PROJECTS } from "@/lib/projects-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — What VÆRØX builds for you — VÆRØX" },
      {
        name: "description",
        content:
          "Business-framed index of what VÆRØX builds: AI agents, workflow automation, SaaS MVPs, internal tools, dashboards, FinTech prototypes, modernisation, computer vision, FinOps, and retrieval systems — mapped to real projects and services.",
      },
      { property: "og:title", content: "Work — VÆRØX" },
      { property: "og:description", content: "What we build, framed as the question you're actually asking." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const svcMap = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
  const projMap = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));

  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Work" }]} />
      <PageHeader
        section="§ · Work"
        title="What are you trying to build?"
        summary="Ten questions VÆRØX hears most often, answered by the services and projects behind them. Every question links to the real work — architecture, code, evaluation — that shows the answer."
        meta={[
          { label: "Questions", value: WORK_QUESTIONS.length.toString().padStart(2, "0") },
          { label: "Services",  value: SERVICES.length.toString().padStart(2, "0") },
          { label: "Projects",  value: PROJECTS.length.toString().padStart(2, "0") },
          { label: "Model",     value: "Studio" },
        ]}
      />

      <ol className="hairline bg-canvas">
        {WORK_QUESTIONS.map((w, i, arr) => (
          <li key={w.code} className={`p-6 ${i < arr.length - 1 ? "hairline-b" : ""}`}>
            <div className="grid grid-cols-[80px_1fr] gap-6 items-baseline">
              <span className="font-mono text-[11px] text-text-3 tabular uppercase tracking-[0.1em]">{w.code}</span>
              <div>
                <h2 className="font-display text-[22px] md:text-[26px] text-text-1 tracking-[-0.015em] leading-[1.15]">{w.question}</h2>
                <p className="mt-3 max-w-[720px] text-[14px] text-text-2 leading-[1.7]">{w.answer}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 hairline">
                  <div className="bg-canvas p-4">
                    <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-2">What you get</div>
                    <ul className="space-y-1.5">
                      {w.outcomes.map((o, j) => (
                        <li key={j} className="text-[12.5px] text-text-2 leading-[1.55]">— {o}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-canvas p-4 space-y-3">
                    <div>
                      <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-2">Related services</div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {w.relatedServices.map((slug) => {
                          const s = svcMap[slug];
                          if (!s) return null;
                          return (
                            <Link
                              key={slug}
                              to="/services/$slug"
                              params={{ slug }}
                              className="font-mono text-[11px] text-text-2 hover:text-text-1 underline decoration-line-3 underline-offset-4"
                            >
                              {s.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    {w.relatedProjects.length > 0 && (
                      <div>
                        <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-2">Reference projects</div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {w.relatedProjects.map((slug) => {
                            const p = projMap[slug];
                            if (!p) return null;
                            return (
                              <Link
                                key={slug}
                                to="/projects/$slug"
                                params={{ slug }}
                                className="font-mono text-[11px] text-text-2 hover:text-text-1 underline decoration-line-3 underline-offset-4"
                              >
                                {p.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-2">Industries</div>
                      <div className="flex flex-wrap gap-1">
                        {w.industries.map((ind) => (
                          <span key={ind} className="hairline px-2 py-0.5 font-mono text-[10px] text-text-2 uppercase tracking-[0.1em]">{ind}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <a href="/contact" className="font-mono text-[11px] text-text-1 uppercase tracking-[0.14em] hover:opacity-70 transition-micro">
                    Talk to us about this →
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
