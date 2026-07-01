import { createFileRoute } from "@tanstack/react-router";
import { CAPABILITIES } from "@/lib/capabilities-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

export const Route = createFileRoute("/capabilities")({
  head: () => ({
    meta: [
      { title: "Capabilities — VÆRØX" },
      {
        name: "description",
        content:
          "The stack VÆRØX ships in: Python, TypeScript, FastAPI, PostgreSQL, LangGraph, OpenAI, Anthropic, Gemini, PyTorch, DuckDB, Redis, React, AWS.",
      },
      { property: "og:title", content: "Capabilities — VÆRØX" },
      { property: "og:description", content: "The technology stack the studio ships in." },
    ],
  }),
  component: CapabilitiesPage,
});

function CapabilitiesPage() {
  const total = CAPABILITIES.reduce((n, g) => n + g.items.length, 0);
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Capabilities" }]} />
      <PageHeader
        section="§ · Capabilities"
        title="The stack we ship in."
        summary="These are the languages, runtimes, and platforms VÆRØX writes production code in. Each entry appears here because it is used inside a canonical system, not because it looks good on a slide."
        meta={[
          { label: "Groups", value: CAPABILITIES.length.toString().padStart(2, "0") },
          { label: "Tools",  value: total.toString().padStart(2, "0") },
          { label: "Model",  value: "Studio" },
          { label: "Cloud",  value: "AWS · Cloudflare" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 hairline">
        {CAPABILITIES.map((g) => (
          <section key={g.code} className="bg-canvas p-5">
            <header className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{g.code}</span>
              <span className="font-mono text-[10px] text-text-3 tabular">{g.items.length.toString().padStart(2, "0")}</span>
            </header>
            <h3 className="mt-3 font-display text-[19px] text-text-1 tracking-[-0.015em]">{g.name}</h3>
            <p className="mt-2 text-[13px] text-text-3">{g.summary}</p>
            <ul className="mt-5 hairline-t pt-4 divide-y divide-line-1">
              {g.items.map((it) => (
                <li key={it.name} className="py-2.5 grid grid-cols-[140px_1fr] gap-4 items-baseline">
                  <span className="font-mono text-[12.5px] text-text-1 tabular">{it.name}</span>
                  <span className="text-[13px] text-text-2">{it.note}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SectionShell>
  );
}
