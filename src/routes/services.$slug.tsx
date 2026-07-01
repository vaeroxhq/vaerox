import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SERVICES, findService, type Service } from "@/lib/services-data";
import { PROJECTS } from "@/lib/projects-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): Service => {
    const svc = findService(params.slug);
    if (!svc) throw notFound();
    return svc;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Services — VÆRØX` },
          { name: "description", content: loaderData.overview },
          { property: "og:title", content: `${loaderData.name} — VÆRØX` },
          { property: "og:description", content: loaderData.tagline },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SectionShell>
      <div className="pt-24 font-mono text-[12px] text-text-3">Service not found.</div>
    </SectionShell>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const s = Route.useLoaderData();
  const projects = PROJECTS.filter((p) => s.relatedProjects.includes(p.slug));

  return (
    <SectionShell>
      <Breadcrumbs
        items={[
          { label: "VÆRØX", to: "/" },
          { label: "Services", to: "/services" },
          { label: s.name },
        ]}
      />

      <PageHeader
        section={`§ · Services / ${s.code}`}
        title={s.name}
        summary={s.overview}
        meta={[
          { label: "Code",     value: s.code },
          { label: "Projects", value: s.relatedProjects.length.toString().padStart(2, "0") },
          { label: "Stack",    value: s.technologies.length.toString().padStart(2, "0") },
          { label: "Model",    value: "Studio" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-px bg-line-1 hairline">
        <div className="bg-canvas p-6 space-y-8">
          <section>
            <h2 className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-3">Approach</h2>
            <p className="text-[14.5px] text-text-2 leading-[1.75] max-w-[640px]">{s.approach}</p>
          </section>

          <section>
            <h2 className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-3">Implementation examples</h2>
            <ul className="hairline bg-canvas">
              {s.examples.map((ex, i, arr) => (
                <li key={ex} className={`px-4 py-3 text-[13.5px] text-text-2 ${i < arr.length - 1 ? "hairline-b" : ""}`}>
                  {ex}
                </li>
              ))}
            </ul>
          </section>

          {projects.length > 0 && (
            <section>
              <h2 className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-3">Related projects</h2>
              <ul className="hairline bg-canvas">
                {projects.map((p, i, arr) => (
                  <li key={p.slug} className={i < arr.length - 1 ? "hairline-b" : ""}>
                    <Link
                      to="/projects/$slug"
                      params={{ slug: p.slug }}
                      className="group card-hover hover:card-hover-on grid grid-cols-[1fr_120px] gap-4 px-4 py-3 items-baseline"
                    >
                      <div>
                        <div className="font-display text-[14.5px] text-text-1 tracking-[-0.008em]">{p.name}</div>
                        <div className="mt-1 text-[12.5px] text-text-3">{p.description}</div>
                      </div>
                      <span className="text-right font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] group-hover:text-text-1 transition-micro">{p.stage} →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="bg-canvas p-6 space-y-6">
          <div>
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">Technologies</div>
            <div className="mt-3 flex flex-col gap-1.5">
              {s.technologies.map((t) => (
                <span key={t} className="font-mono text-[12px] text-text-1 tabular">{t}</span>
              ))}
            </div>
          </div>
          <div className="hairline-t pt-6">
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">Talk to VÆRØX</div>
            <a href="/contact" className="mt-3 block font-mono text-[13px] text-text-1 underline decoration-line-3 underline-offset-4 hover:decoration-text-2">
              Start a conversation →
            </a>
          </div>
        </aside>
      </div>

      <div className="hairline-t mt-16 pt-8 flex items-center justify-between">
        <Link to="/services" className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] hover:text-text-1 transition-micro">← All services</Link>
        <span className="font-mono text-[10px] text-text-3 tabular">{SERVICES.findIndex((x) => x.slug === s.slug) + 1} / {SERVICES.length}</span>
      </div>
    </SectionShell>
  );
}
