import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, SectionShell, StageDot } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { SYSTEMS } from "@/lib/systems-data";
import { PROJECTS } from "@/lib/projects-data";
import { TEAMS } from "@/lib/teams-data";
import { relationCount } from "@/lib/graph";

export const Route = createFileRoute("/explorer")({
  head: () => ({
    meta: [
      { title: "Explorer — VÆRØX" },
      { name: "description", content: "Faceted browser across systems and projects: filter by team, runtime, stage, and criticality." },
    ],
  }),
  component: ExplorerPage,
});

type Row = {
  key: string;
  slug: string;
  kind: "System" | "Project";
  name: string;
  summary: string;
  href: string;
  team: string;
  runtime: string;
  language: string;
  infra: string;
  stage: string;
  status: string;
  criticality: "Tier-1" | "Tier-2" | "Tier-3";
  region: string;
  updated: string;
  links: number;
};

const TIER_BY_STAGE: Record<string, Row["criticality"]> = {
  Production: "Tier-1", Prototype: "Tier-2", Research: "Tier-3", Archived: "Tier-3",
};
const REGIONS = ["us-east", "us-west", "eu-central", "eu-north", "ap-south"];
const INFRA_BY_LANG: Record<string, string> = {
  Rust: "bare-metal · k8s", Go: "k8s", Python: "k8s · ray", Zig: "bare-metal",
  Erlang: "vm-cluster", TypeScript: "edge-workers",
};

function buildRows(): Row[] {
  const rows: Row[] = [];
  SYSTEMS.forEach((s, i) => {
    const lang = s.stack[0];
    rows.push({
      key: `sys:${s.slug}`, slug: s.slug, kind: "System", name: s.name,
      summary: s.summary, href: `/systems/${s.slug}`,
      team: s.owner, runtime: s.stack[0], language: lang,
      infra: INFRA_BY_LANG[lang] ?? "k8s",
      stage: s.stage, status: s.health,
      criticality: TIER_BY_STAGE[s.stage] ?? "Tier-3",
      region: REGIONS[i % REGIONS.length],
      updated: s.lastDeploy,
      links: relationCount("system", s.slug),
    });
  });
  PROJECTS.forEach((p, i) => {
    const lang = p.stack[0];
    rows.push({
      key: `prj:${p.slug}`, slug: p.slug, kind: "Project", name: p.name,
      summary: p.description, href: `/projects/${p.slug}`,
      team: p.role, runtime: p.stack[0], language: lang,
      infra: INFRA_BY_LANG[lang] ?? "k8s",
      stage: p.stage, status: p.stage,
      criticality: TIER_BY_STAGE[p.stage] ?? "Tier-3",
      region: REGIONS[(i + 2) % REGIONS.length],
      updated: p.updated,
      links: relationCount("project", p.slug),
    });
  });
  return rows;
}

function ExplorerPage() {
  const all = useMemo(buildRows, []);
  const [f, setF] = useState({
    kind: "All", team: "All", language: "All", infra: "All",
    stage: "All", tier: "All", region: "All", q: "",
  });

  const facet = (key: keyof Row) => {
    const set = new Set<string>();
    for (const r of all) set.add(String(r[key]));
    return ["All", ...Array.from(set).sort()];
  };

  const teams = useMemo(() => {
    const set = new Set<string>(TEAMS.map((t) => t.name));
    for (const r of all) set.add(r.team);
    return ["All", ...Array.from(set).sort()];
  }, [all]);

  const rows = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    return all.filter((r) =>
      (f.kind === "All" || r.kind === f.kind) &&
      (f.team === "All" || r.team === f.team) &&
      (f.language === "All" || r.language === f.language) &&
      (f.infra === "All" || r.infra === f.infra) &&
      (f.stage === "All" || r.stage === f.stage) &&
      (f.tier === "All" || r.criticality === f.tier) &&
      (f.region === "All" || r.region === f.region) &&
      (!q || (r.name.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q)))
    );
  }, [all, f]);

  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Explorer" }]} />
      <PageHeader
        section="§ · Explorer"
        title="Engineering explorer."
        summary="Faceted browser across every system and project in the platform. Filter instantly by team, runtime, infrastructure, stage, criticality, and region."
        meta={[
          { label: "Records", value: all.length.toString().padStart(3, "0") },
          { label: "Shown",   value: rows.length.toString().padStart(3, "0") },
          { label: "Facets",  value: "07" },
          { label: "Kind",    value: f.kind === "All" ? "System + Project" : f.kind },
        ]}
      />

      <div className="hairline bg-canvas mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-line-1">
          <Facet label="Kind"       value={f.kind}     options={["All", "System", "Project"]} onChange={(v) => setF({ ...f, kind: v })} />
          <Facet label="Team"       value={f.team}     options={teams} onChange={(v) => setF({ ...f, team: v })} />
          <Facet label="Runtime"    value={f.language} options={facet("language")} onChange={(v) => setF({ ...f, language: v })} />
          <Facet label="Infra"      value={f.infra}    options={facet("infra")} onChange={(v) => setF({ ...f, infra: v })} />
          <Facet label="Stage"      value={f.stage}    options={facet("stage")} onChange={(v) => setF({ ...f, stage: v })} />
          <Facet label="Criticality" value={f.tier}    options={["All", "Tier-1", "Tier-2", "Tier-3"]} onChange={(v) => setF({ ...f, tier: v })} />
          <Facet label="Region"     value={f.region}   options={facet("region")} onChange={(v) => setF({ ...f, region: v })} />
        </div>
        <label className="hairline-t flex items-center gap-3 px-4 py-3">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">Query</span>
          <input
            value={f.q}
            onChange={(e) => setF({ ...f, q: e.target.value })}
            placeholder="Filter by name or summary…"
            className="flex-1 bg-transparent border-0 outline-none font-mono text-[12px] text-text-1 placeholder:text-text-3 tabular"
          />
          <button
            onClick={() => setF({ kind: "All", team: "All", language: "All", infra: "All", stage: "All", tier: "All", region: "All", q: "" })}
            className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] hover:text-text-1"
          >
            Reset
          </button>
        </label>
      </div>

      {/* Results table */}
      <div className="hairline bg-canvas">
        <div className="grid grid-cols-[70px_1fr_120px_100px_90px_90px_60px] gap-4 px-4 py-2 hairline-b font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] tabular">
          <span>Kind</span>
          <span>Name</span>
          <span>Team</span>
          <span>Runtime</span>
          <span>Stage</span>
          <span>Region</span>
          <span className="text-right">Links</span>
        </div>
        {rows.map((r) => {
          const tone: "success" | "warning" | "info" | "muted" =
            r.stage === "Production" ? "success" : r.stage === "Prototype" ? "warning" : r.stage === "Research" ? "info" : "muted";
          return (
            <Link
              key={r.key} to={r.href}
              className="grid grid-cols-[70px_1fr_120px_100px_90px_90px_60px] gap-4 px-4 py-3 items-baseline hover:bg-surface-2 transition-micro border-b border-line-1 last:border-0"
            >
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.16em]">{r.kind}</span>
              <div className="min-w-0">
                <div className="font-display text-[13px] text-text-1 tracking-[-0.01em] truncate">{r.name}</div>
                <div className="font-mono text-[10px] text-text-3 mt-0.5 truncate">{r.summary}</div>
              </div>
              <span className="font-mono text-[10px] text-text-2 truncate">{r.team}</span>
              <span className="font-mono text-[10px] text-text-2 tabular">{r.runtime}</span>
              <span className="flex items-center gap-2 font-mono text-[10px] text-text-2 uppercase tracking-[0.14em]">
                <StageDot tone={tone} />{r.stage}
              </span>
              <span className="font-mono text-[10px] text-text-3 tabular">{r.region}</span>
              <span className="font-mono text-[10px] text-text-2 tabular text-right">{r.links.toString().padStart(2, "0")}</span>
            </Link>
          );
        })}
        {rows.length === 0 && (
          <div className="px-4 py-8 font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
            No records match the current facets.
          </div>
        )}
      </div>
    </SectionShell>
  );
}

function Facet({
  label, value, options, onChange,
}: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="bg-canvas px-3 py-2">
      <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-transparent border-0 outline-none font-mono text-[11px] text-text-1 tabular truncate"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
