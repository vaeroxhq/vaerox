import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { INCIDENTS } from "@/lib/incidents-data";
import { ADRS } from "@/lib/architecture-data";
import { JOURNAL } from "@/lib/journal-data";
import { RESEARCH } from "@/lib/research-data";
import { BENCHMARKS } from "@/lib/benchmarks-data";
import { PROJECTS } from "@/lib/projects-data";
import { SYSTEMS } from "@/lib/systems-data";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline — VÆRØX" },
      { name: "description", content: "Unified engineering timeline: architecture decisions, research, validation, projects, and journal entries." },
    ],
  }),
  component: TimelinePage,
});

type Kind = "ADR" | "Research" | "Validation" | "Project" | "Journal";

type Event = {
  date: string;   // ISO date
  kind: Kind;
  title: string;
  href: string;
  kicker: string;
  meta?: string;
  system?: string;
};

function buildEvents(): Event[] {
  const events: Event[] = [];
  for (const a of ADRS) {
    events.push({
      date: a.decisionDate, kind: "ADR", title: a.title,
      href: `/architecture/${a.slug}`, kicker: `ADR·${a.number}`,
      meta: a.status, system: a.systems[0],
    });
  }

  for (const r of RESEARCH) {
    events.push({
      date: r.published, kind: "Research", title: r.title,
      href: `/research/${r.slug}`, kicker: "RES",
      meta: r.category,
    });
  }
  for (const b of BENCHMARKS) {
    const latest = b.runs[b.runs.length - 1];
    events.push({
      date: latest?.date ?? b.updated,
      kind: "Benchmark",
      title: `${b.title} · ${b.status.toLowerCase()}`,
      href: `/benchmarks/${b.slug}`, kicker: b.code,
      meta: latest?.build ?? b.phase, system: b.system,
    });
  }

  for (const p of PROJECTS) {
    events.push({
      date: p.started, kind: "Project", title: `${p.name} started`,
      href: `/projects/${p.slug}`, kicker: "PRJ",
      meta: p.stage, system: p.name,
    });
  }
  for (const j of JOURNAL) {
    events.push({
      date: j.date, kind: "Journal", title: j.title,
      href: `/journal/${j.slug}`, kicker: "LOG",
      meta: j.category,
    });
  }
  return events.sort((a, b) => b.date.localeCompare(a.date));
}

const KIND_ORDER: Kind[] = ["Deploy", "ADR", "Incident", "Research", "Benchmark", "Project", "Journal"];

function TimelinePage() {
  const events = useMemo(buildEvents, []);
  const [kindFilter, setKindFilter] = useState<Set<Kind>>(new Set());
  const [systemFilter, setSystemFilter] = useState<string>("All");
  const [yearFilter, setYearFilter] = useState<string>("All");

  const systems = useMemo(() => {
    const set = new Set<string>();
    for (const e of events) if (e.system) set.add(e.system);
    return ["All", ...Array.from(set).sort()];
  }, [events]);

  const years = useMemo(() => {
    const set = new Set<string>();
    for (const e of events) set.add(e.date.slice(0, 4));
    return ["All", ...Array.from(set).sort().reverse()];
  }, [events]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (kindFilter.size && !kindFilter.has(e.kind)) return false;
      if (systemFilter !== "All" && e.system !== systemFilter) return false;
      if (yearFilter !== "All" && !e.date.startsWith(yearFilter)) return false;
      return true;
    });
  }, [events, kindFilter, systemFilter, yearFilter]);

  const grouped = useMemo(() => {
    const m = new Map<string, Event[]>();
    for (const e of filtered) {
      const month = e.date.slice(0, 7);
      if (!m.has(month)) m.set(month, []);
      m.get(month)!.push(e);
    }
    return m;
  }, [filtered]);

  const toggle = (k: Kind) => setKindFilter((prev) => {
    const n = new Set(prev);
    if (n.has(k)) n.delete(k); else n.add(k);
    return n;
  });

  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Timeline" }]} />
      <PageHeader
        section="§ · Timeline"
        title="Engineering timeline."
        summary="Every deployment, decision, incident, benchmark, and release, interleaved in reverse chronological order. Filter by kind, system, and year."
        meta={[
          { label: "Events",   value: events.length.toString().padStart(3, "0") },
          { label: "Filtered", value: filtered.length.toString().padStart(3, "0") },
          { label: "Systems",  value: (systems.length - 1).toString().padStart(2, "0") },
          { label: "Years",    value: (years.length - 1).toString().padStart(2, "0") },
        ]}
      />

      <div className="hairline bg-canvas mb-8">
        <div className="flex flex-wrap">
          {KIND_ORDER.map((k) => {
            const on = kindFilter.has(k);
            return (
              <button
                key={k}
                onClick={() => toggle(k)}
                className={`px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] border-r border-line-1 transition-micro ${
                  on ? "text-text-1 bg-surface-2" : "text-text-3 hover:text-text-1"
                }`}
              >
                {k}
              </button>
            );
          })}
        </div>
        <div className="hairline-t grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1">
          <label className="bg-canvas flex items-center gap-3 px-4 py-3">
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">System</span>
            <select
              value={systemFilter}
              onChange={(e) => setSystemFilter(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none font-mono text-[11px] text-text-1 tabular"
            >
              {systems.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="bg-canvas flex items-center gap-3 px-4 py-3">
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">Year</span>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none font-mono text-[11px] text-text-1 tabular"
            >
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </label>
        </div>
      </div>

      {/* Grouped list */}
      <div className="space-y-10">
        {[...grouped.entries()].map(([month, rows]) => (
          <section key={month}>
            <header className="hairline-b pb-2 mb-4 flex items-baseline justify-between">
              <h2 className="font-mono text-[11px] text-text-1 uppercase tracking-[0.18em] tabular">
                {month}
              </h2>
              <span className="font-mono text-[10px] text-text-3 tabular">
                {rows.length.toString().padStart(2, "0")} events
              </span>
            </header>
            <ol className="hairline bg-canvas divide-y divide-line-1">
              {rows.map((e, i) => (
                <li key={`${e.date}-${e.kicker}-${i}`}>
                  <Link
                    to={e.href}
                    className="grid grid-cols-[84px_90px_1fr_auto] gap-4 items-baseline px-4 py-3 hover:bg-surface-2 transition-micro"
                  >
                    <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.16em] tabular">
                      {e.date}
                    </span>
                    <span className="font-mono text-[10px] text-text-2 uppercase tracking-[0.14em]">
                      {e.kind}
                    </span>
                    <div className="min-w-0">
                      <div className="font-display text-[14px] text-text-1 tracking-[-0.01em] truncate">
                        {e.title}
                      </div>
                      <div className="font-mono text-[10px] text-text-3 mt-1 truncate">
                        {e.kicker}{e.meta ? ` · ${e.meta}` : ""}{e.system ? ` · ${e.system}` : ""}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-text-3">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
        {grouped.size === 0 && (
          <div className="hairline bg-canvas p-8 font-mono text-[12px] text-text-3 uppercase tracking-[0.14em]">
            No events match the current filters.
          </div>
        )}
      </div>
    </SectionShell>
  );
}
