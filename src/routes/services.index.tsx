import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/services-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Vaerox" },
      {
        name: "description",
        content:
          "What Vaerox builds: AI agents, LLM applications, RAG systems, MCP servers, workflow automation, backend platforms, internal tools, computer vision, and data engineering.",
      },
      { property: "og:title", content: "Services — Vaerox" },
      {
        property: "og:description",
        content:
          "AI engineering studio services — agents, automation, MCP, RAG, backend platforms, internal tools.",
      },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "Vaerox", to: "/" }, { label: "Services" }]} />
      <PageHeader
        section="§ · Services"
        title="What VÆRØX builds."
        summary="An independent AI & software engineering studio designing and shipping modern systems for startups, growing businesses, and enterprise teams — AI agents, SaaS products, internal tools, dashboards, backend platforms, and workflow automation. Every service links to the projects, research, and architecture behind it."
        meta={[
          { label: "Services", value: SERVICES.length.toString().padStart(2, "0") },
          { label: "Clients", value: "Startup → Enterprise" },
          { label: "Model", value: "Studio" },
          { label: "Contact", value: "vaeroxhq@gmail.com" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 hairline">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            to="/services/$slug"
            params={{ slug: s.slug }}
            className="group animate-card-hover-elevation card-hover hover:card-hover-on bg-canvas p-5 flex flex-col cursor-pointer"
          >
            <header className="flex items-baseline justify-between">
              <span className="text-overline text-text-3">{s.code}</span>
              <span className="text-metadata text-text-3 transition-transform transition-ui group-hover:translate-x-[3px]">
                →
              </span>
            </header>
            <h3 className="mt-3 text-heading-m">{s.name}</h3>
            <p className="mt-2 text-body-s text-text-3">{s.tagline}</p>

            <div className="mt-5 hairline-t pt-4">
              <div className="text-metadata text-text-3 opacity-70">Stack</div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {s.technologies.slice(0, 6).map((t) => (
                  <span key={t} className="text-label text-text-2 tabular">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
