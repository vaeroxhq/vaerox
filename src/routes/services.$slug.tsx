import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SERVICES, findService, type Service } from "@/lib/services-data";
import { PROJECTS } from "@/lib/projects-data";
import { getServiceExtras } from "@/lib/service-extras";
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
          { title: `${loaderData.name} — Services — Vareox` },
          { name: "description", content: loaderData.overview },
          { property: "og:title", content: `${loaderData.name} — Vareox` },
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

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-3">
        {heading}
      </h2>
      {children}
    </section>
  );
}

function Bulleted({ items, prefix }: { items: string[]; prefix: string }) {
  return (
    <ul className="hairline bg-canvas">
      {items.map((it, i, arr) => (
        <li
          key={i}
          className={`px-4 py-3 grid grid-cols-[28px_1fr] gap-3 items-start ${i < arr.length - 1 ? "hairline-b" : ""}`}
        >
          <span className="font-mono text-[10px] text-text-3 tabular pt-0.5">
            {prefix}-{String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[13.5px] text-text-2 leading-[1.55]">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function ServiceDetail() {
  const s = Route.useLoaderData() as Service;
  const projects = PROJECTS.filter((p) => s.relatedProjects.includes(p.slug));
  const ex = getServiceExtras(s.slug);

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
          { label: "Code", value: s.code },
          { label: "Projects", value: s.relatedProjects.length.toString().padStart(2, "0") },
          { label: "Stack", value: s.technologies.length.toString().padStart(2, "0") },
          { label: "Timeline", value: ex.typicalTimeline.split(".")[0] },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-px bg-line-1 hairline">
        <div className="bg-canvas p-6 space-y-8">
          <Block heading="Approach">
            <p className="text-[14.5px] text-text-2 leading-[1.75] max-w-[640px]">{s.approach}</p>
          </Block>

          <Block heading="Problems solved">
            <Bulleted items={ex.problemsSolved} prefix="PS" />
          </Block>

          <Block heading="Ideal clients">
            <Bulleted items={ex.idealClients} prefix="IC" />
          </Block>

          <Block heading="Deliverables">
            <Bulleted items={ex.deliverables} prefix="DL" />
          </Block>

          <Block heading="Implementation examples">
            <ul className="hairline bg-canvas">
              {s.examples.map((exi, i, arr) => (
                <li
                  key={exi}
                  className={`px-4 py-3 text-[13.5px] text-text-2 ${i < arr.length - 1 ? "hairline-b" : ""}`}
                >
                  {exi}
                </li>
              ))}
            </ul>
          </Block>

          {projects.length > 0 && (
            <Block heading="Related projects">
              <ul className="hairline bg-canvas">
                {projects.map((p, i, arr) => (
                  <li key={p.slug} className={i < arr.length - 1 ? "hairline-b" : ""}>
                    <Link
                      to="/projects/$slug"
                      params={{ slug: p.slug }}
                      className="group card-hover hover:card-hover-on grid grid-cols-[1fr_120px] gap-4 px-4 py-3 items-baseline"
                    >
                      <div>
                        <div className="font-display text-[14.5px] text-text-1 tracking-[-0.008em]">
                          {p.name}
                        </div>
                        <div className="mt-1 text-[12.5px] text-text-3">{p.description}</div>
                      </div>
                      <span className="text-right font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] group-hover:text-text-1 transition-micro">
                        {p.stage} →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block heading="Frequently asked">
            <dl className="hairline bg-canvas">
              {ex.faqs.map((f, i, arr) => (
                <div
                  key={f.q}
                  className={`grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 px-4 py-4 ${i < arr.length - 1 ? "hairline-b" : ""}`}
                >
                  <dt className="font-display text-[13.5px] text-text-1 tracking-[-0.005em]">
                    {f.q}
                  </dt>
                  <dd className="text-[13px] text-text-2 leading-[1.65]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </Block>
        </div>

        <aside className="bg-canvas p-6 space-y-6">
          <div>
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
              Typical timeline
            </div>
            <p className="mt-2 text-[12.5px] text-text-2 leading-[1.6]">{ex.typicalTimeline}</p>
          </div>
          <div className="hairline-t pt-6">
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
              Technologies
            </div>
            <div className="mt-3 flex flex-col gap-1.5">
              {s.technologies.map((t) => (
                <span key={t} className="font-mono text-[12px] text-text-1 tabular">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="hairline-t pt-6">
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
              Talk to VÆRØX
            </div>
            <a
              href="/contact"
              className="mt-3 block font-mono text-[13px] text-text-1 underline decoration-line-3 underline-offset-4 hover:decoration-text-2"
            >
              Start a conversation →
            </a>
            <a
              href="/work"
              className="mt-2 block font-mono text-[12px] text-text-2 hover:text-text-1 transition-micro"
            >
              See what we build →
            </a>
          </div>
        </aside>
      </div>

      <div className="hairline-t mt-16 pt-8 flex items-center justify-between">
        <Link
          to="/services"
          className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] hover:text-text-1 transition-micro"
        >
          ← All services
        </Link>
        <span className="font-mono text-[10px] text-text-3 tabular">
          {SERVICES.findIndex((x) => x.slug === s.slug) + 1} / {SERVICES.length}
        </span>
      </div>
    </SectionShell>
  );
}
