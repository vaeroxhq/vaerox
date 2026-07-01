import { createFileRoute, Link } from "@tanstack/react-router";
import { PROJECTS } from "@/lib/projects-data";
import { DOSSIERS } from "@/lib/dossiers-data";
import { SERVICES } from "@/lib/services-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

/**
 * Technologies — the cross-index. For every technology used anywhere in
 * the canonical corpus, list the projects using it and the services it
 * powers. Grouping is by domain so the surface reads as a capabilities
 * page, not a résumé.
 */

type Category =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "AI · LLM"
  | "Databases"
  | "Infrastructure"
  | "Data · Analytics"
  | "ML · Vision";

const CATEGORY_ORDER: Category[] = [
  "Languages",
  "Frontend",
  "Backend",
  "AI · LLM",
  "Databases",
  "Data · Analytics",
  "ML · Vision",
  "Infrastructure",
];

// Manual classification — canonical names only. Anything unlisted lands
// in "Infrastructure" by default so nothing disappears.
const CATEGORY_MAP: Record<string, Category> = {
  Python: "Languages",
  TypeScript: "Languages",
  SQL: "Languages",

  React: "Frontend",
  Vite: "Frontend",
  "TanStack Start": "Frontend",
  Tailwind: "Frontend",
  Recharts: "Frontend",

  FastAPI: "Backend",
  Node: "Backend",
  LangGraph: "Backend",
  Temporal: "Backend",
  Pydantic: "Backend",
  Zod: "Backend",

  OpenAI: "AI · LLM",
  Anthropic: "AI · LLM",
  Gemini: "AI · LLM",
  "OpenAI (GPT-class)": "AI · LLM",
  "Anthropic (Claude-class)": "AI · LLM",
  MCP: "AI · LLM",
  pgvector: "AI · LLM",

  PostgreSQL: "Databases",
  OpenSearch: "Databases",
  Redis: "Databases",
  DuckDB: "Databases",

  Parquet: "Data · Analytics",
  Pandas: "Data · Analytics",
  NumPy: "Data · Analytics",
  Jupyter: "Data · Analytics",
  statsmodels: "Data · Analytics",
  dbt: "Data · Analytics",

  PyTorch: "ML · Vision",
  "scikit-learn": "ML · Vision",
  ONNX: "ML · Vision",
  OpenCV: "ML · Vision",
  SimPy: "ML · Vision",
  NetworkX: "ML · Vision",

  Docker: "Infrastructure",
  AWS: "Infrastructure",
  Cloudflare: "Infrastructure",
  GitHub: "Infrastructure",
  Linux: "Infrastructure",
  "GitHub Actions": "Infrastructure",
  Terraform: "Infrastructure",
  Bash: "Infrastructure",
  "AWS SDK": "Infrastructure",
  Stripe: "Infrastructure",
  Motion: "Frontend",
  "MCP SDK": "AI · LLM",
};

type TechUsage = {
  name: string;
  category: Category;
  projects: string[]; // project slugs
  services: string[]; // service slugs
};

function buildIndex(): Record<Category, TechUsage[]> {
  const seen = new Map<string, TechUsage>();

  // Walk dossiers first (canonical stack + badges)
  for (const d of Object.values(DOSSIERS)) {
    const items = new Set<string>([
      ...d.badges,
      ...d.stack.languages,
      ...d.stack.frameworks,
      ...d.stack.infrastructure,
      ...d.stack.databases,
      ...d.stack.models,
    ]);
    for (const raw of items) {
      const name = raw.trim();
      if (!name) continue;
      const cat = CATEGORY_MAP[name] ?? "Infrastructure";
      const rec = seen.get(name) ?? { name, category: cat, projects: [], services: [] };
      if (!rec.projects.includes(d.slug)) rec.projects.push(d.slug);
      seen.set(name, rec);
    }
  }

  // Walk services technologies
  for (const s of SERVICES) {
    for (const raw of s.technologies) {
      const name = raw.trim();
      if (!name) continue;
      const cat = CATEGORY_MAP[name] ?? "Infrastructure";
      const rec = seen.get(name) ?? { name, category: cat, projects: [], services: [] };
      if (!rec.services.includes(s.slug)) rec.services.push(s.slug);
      seen.set(name, rec);
    }
  }

  const grouped = {} as Record<Category, TechUsage[]>;
  for (const c of CATEGORY_ORDER) grouped[c] = [];
  for (const rec of seen.values()) {
    (grouped[rec.category] ??= []).push(rec);
  }
  for (const c of CATEGORY_ORDER) {
    grouped[c].sort((a, b) => (b.projects.length + b.services.length) - (a.projects.length + a.services.length) || a.name.localeCompare(b.name));
  }
  return grouped;
}

export const Route = createFileRoute("/technologies")({
  head: () => ({
    meta: [
      { title: "Technologies — VÆRØX" },
      {
        name: "description",
        content:
          "Cross-index of every technology used across VÆRØX systems — languages, frameworks, LLMs, databases, infrastructure — with the projects and services each one powers.",
      },
      { property: "og:title", content: "Technologies — VÆRØX" },
      { property: "og:description", content: "The complete technology matrix behind VÆRØX systems." },
    ],
  }),
  component: TechnologiesPage,
});

function TechnologiesPage() {
  const grouped = buildIndex();
  const projMap = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));
  const svcMap = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
  const total = CATEGORY_ORDER.reduce((n, c) => n + grouped[c].length, 0);

  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Technologies" }]} />
      <PageHeader
        section="§ · Technology Matrix"
        title="Every tool, every project, every service."
        summary="A reverse index of the VÆRØX stack. For each technology, the projects that use it and the services it powers. If it isn't listed, VÆRØX doesn't ship production code in it."
        meta={[
          { label: "Categories",   value: CATEGORY_ORDER.length.toString().padStart(2, "0") },
          { label: "Technologies", value: total.toString().padStart(2, "0") },
          { label: "Projects",     value: PROJECTS.length.toString().padStart(2, "0") },
          { label: "Services",     value: SERVICES.length.toString().padStart(2, "0") },
        ]}
      />

      <div className="space-y-10">
        {CATEGORY_ORDER.map((cat) => {
          const items = grouped[cat];
          if (!items.length) return null;
          return (
            <section key={cat}>
              <header className="hairline-t pt-4 mb-4 flex items-baseline justify-between">
                <h2 className="font-display text-[20px] text-text-1 tracking-[-0.01em]">{cat}</h2>
                <span className="font-mono text-[10px] text-text-3 tabular">{items.length.toString().padStart(2, "0")}</span>
              </header>
              <ul className="hairline bg-canvas">
                {items.map((it, i, arr) => (
                  <li key={it.name} className={`px-5 py-4 grid grid-cols-1 md:grid-cols-[160px_1fr_1fr] gap-4 items-baseline ${i < arr.length - 1 ? "hairline-b" : ""}`}>
                    <span className="font-mono text-[13px] text-text-1 tabular">{it.name}</span>
                    <div>
                      <div className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.14em] mb-1.5">Projects</div>
                      {it.projects.length ? (
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {it.projects.map((slug) => {
                            const p = projMap[slug];
                            if (!p) return <span key={slug} className="font-mono text-[11px] text-text-3">{slug}</span>;
                            return (
                              <Link
                                key={slug}
                                to="/projects/$slug"
                                params={{ slug }}
                                className="font-mono text-[11.5px] text-text-2 hover:text-text-1 underline decoration-line-3 underline-offset-4"
                              >
                                {p.name}
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="font-mono text-[11px] text-text-3">—</span>
                      )}
                    </div>
                    <div>
                      <div className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.14em] mb-1.5">Services</div>
                      {it.services.length ? (
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {it.services.map((slug) => {
                            const s = svcMap[slug];
                            if (!s) return null;
                            return (
                              <Link
                                key={slug}
                                to="/services/$slug"
                                params={{ slug }}
                                className="font-mono text-[11.5px] text-text-2 hover:text-text-1 underline decoration-line-3 underline-offset-4"
                              >
                                {s.name}
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="font-mono text-[11px] text-text-3">—</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </SectionShell>
  );
}
