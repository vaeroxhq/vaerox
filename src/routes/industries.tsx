import { createFileRoute, Link } from "@tanstack/react-router";
import { INDUSTRIES } from "@/lib/industries-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { CtaBlock } from "@/components/home/cta-block";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — VÆRØX" },
      {
        name: "description",
        content:
          "Industries VÆRØX builds software for: FinTech, healthcare, cybersecurity, manufacturing, supply chain, B2B SaaS, cloud & DevOps, professional services, real-time systems, and research labs.",
      },
      { property: "og:title", content: "Industries — VÆRØX" },
      { property: "og:description", content: "Sectors we design and build software systems for." },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Industries" }]} />
      <PageHeader
        section="§ · Industries"
        title="Industries we build for."
        summary="VÆRØX designs and ships software across sectors where engineering discipline matters — from FinTech and healthcare to manufacturing, cybersecurity, and B2B SaaS. Every entry links to the services and projects that back it."
        meta={[
          { label: "Sectors",  value: INDUSTRIES.length.toString().padStart(2, "0") },
          { label: "Clients",  value: "Startup → Enterprise" },
          { label: "Model",    value: "Studio" },
          { label: "Contact",  value: "hello@vaerox.dev" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 hairline">
        {INDUSTRIES.map((ind) => (
          <article key={ind.slug} className="bg-canvas p-5 flex flex-col">
            <header className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{ind.code}</span>
              <span className="font-mono text-[10px] text-text-3">{ind.systems.length} system types</span>
            </header>
            <h3 className="mt-3 font-display text-[20px] text-text-1 tracking-[-0.015em]">{ind.name}</h3>
            <p className="mt-2 text-[13px] text-text-2 leading-[1.6]">{ind.summary}</p>

            <div className="mt-5 hairline-t pt-4">
              <div className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.18em] opacity-70">Systems we build</div>
              <ul className="mt-2 space-y-1">
                {ind.systems.map((s) => (
                  <li key={s} className="text-[12.5px] text-text-2 leading-[1.55]">— {s}</li>
                ))}
              </ul>
            </div>

            {(ind.relatedServices.length > 0 || ind.relatedProjects.length > 0) && (
              <div className="mt-5 hairline-t pt-4 flex flex-wrap gap-x-4 gap-y-2">
                {ind.relatedServices.slice(0, 4).map((s) => (
                  <Link key={s} to="/services/$slug" params={{ slug: s }} className="font-mono text-[10.5px] text-text-3 uppercase tracking-[0.12em] hover:text-text-1 transition-micro">
                    ↳ {s.replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <CtaBlock />
    </SectionShell>
  );
}
