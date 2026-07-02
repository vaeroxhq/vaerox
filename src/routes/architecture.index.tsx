import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ADRS, DIAGRAMS, type AdrStatus } from "@/lib/architecture-data";
import { PageHeader, Toolbar, SectionShell, StageDot } from "@/components/section/section-bits";
import { OpsTag } from "@/components/ops/ops-tag";

const FILTERS = ["All", "Accepted", "Proposed", "Superseded", "Deprecated", "Draft"] as const;

export const Route = createFileRoute("/architecture/")({
  head: () => ({
    meta: [
      { title: "Architecture — Vareox" },
      {
        name: "description",
        content: "Architecture Decision Records, system diagrams, sequence and dependency graphs.",
      },
      { property: "og:title", content: "Architecture — Vareox" },
      {
        property: "og:description",
        content: "Architecture Decision Records, system diagrams, sequence and dependency graphs.",
      },
    ],
  }),
  component: ArchitecturePage,
});

function ArchitecturePage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const adrs = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ADRS.filter((a) => filter === "All" || a.status === filter)
      .filter((a) => {
        if (!needle) return true;
        return (
          a.title.toLowerCase().includes(needle) ||
          a.number.includes(needle) ||
          a.owner.toLowerCase().includes(needle) ||
          a.systems.join(" ").toLowerCase().includes(needle)
        );
      })
      .sort((a, b) => b.decisionDate.localeCompare(a.decisionDate));
  }, [q, filter]);

  const accepted = ADRS.filter((a) => a.status === "Accepted").length;
  const proposed = ADRS.filter((a) => a.status === "Proposed").length;

  return (
    <SectionShell>
      <PageHeader
        section="§ · Architecture"
        title="Decisions, diagrams, dependencies."
        summary="The architecture spine of the platform: every consequential decision recorded, every system diagrammed, every dependency traceable to the ADR that shaped it."
        meta={[
          { label: "ADRs", value: ADRS.length.toString().padStart(2, "0") },
          { label: "Accepted", value: accepted.toString().padStart(2, "0") },
          { label: "Proposed", value: proposed.toString().padStart(2, "0") },
          { label: "Diagrams", value: DIAGRAMS.length.toString().padStart(2, "0") },
        ]}
      />

      {/* ── ADR Repository ─────────────────────────────────── */}
      <SectionHeading
        kicker="§ 01"
        title="Decision records"
        caption="Filterable · sortable · linked"
      />

      <Toolbar
        query={q}
        onQuery={setQ}
        placeholder="Search ADRs · number · owner · system"
        filters={[...FILTERS]}
        activeFilter={filter}
        onFilter={(f) => setFilter(f as (typeof FILTERS)[number])}
        count={adrs.length}
      />

      <div className="hairline border-t-0 bg-canvas">
        <div className="hidden md:grid grid-cols-[80px_1fr_140px_140px_180px_180px_100px] gap-4 px-4 py-3 hairline-b">
          {["ADR", "Title", "Status", "Decision", "Owner", "Systems", "Review"].map((h) => (
            <span
              key={h}
              className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70"
            >
              {h}
            </span>
          ))}
        </div>
        <ul>
          {adrs.map((a) => (
            <li key={a.number} className="hairline-b last:border-b-0">
              <Link
                to="/architecture/$adr"
                params={{ adr: a.slug }}
                className="group card-hover hover:card-hover-on bg-canvas grid grid-cols-2 md:grid-cols-[80px_1fr_140px_140px_180px_180px_100px] gap-4 px-4 py-4 items-baseline"
              >
                <span className="font-mono text-[11px] text-text-2 tabular">ADR·{a.number}</span>
                <span className="col-span-2 md:col-span-1 font-display text-[15px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.01em]">
                  {a.title}
                </span>
                <AdrStatusPill status={a.status} />
                <span className="font-mono text-[11px] text-text-3 tabular">{a.decisionDate}</span>
                <span className="font-mono text-[11px] text-text-2">
                  {a.owner} · <span className="text-text-3">{a.team}</span>
                </span>
                <span className="font-mono text-[11px] text-text-3 truncate">
                  {a.systems.join(" · ")}
                </span>
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
                  {a.review}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── ADR Timeline ───────────────────────────────────── */}
      <SectionHeading kicker="§ 02" title="Decision timeline" caption="Chronological · reverse" />
      <AdrTimeline />

      {/* ── Diagrams ───────────────────────────────────────── */}
      <SectionHeading
        kicker="§ 03"
        title="Diagram catalog"
        caption="System · sequence · deployment · data flow · network · schema · API · dependency"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-1 hairline">
        {DIAGRAMS.map((d) => (
          <Link
            key={d.slug}
            to="/architecture/diagrams/$slug"
            params={{ slug: d.slug }}
            className="group card-hover hover:card-hover-on bg-canvas px-5 pt-5 pb-4 flex flex-col"
          >
            <header className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
                {d.kind}
              </span>
              <span className="font-mono text-[10px] text-text-3 tabular">{d.updated}</span>
            </header>
            <div className="hairline-t mt-4" />
            <h3 className="font-display text-[17px] mt-5 text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.015em]">
              {d.title}
            </h3>
            <p className="mt-2 text-[13px] text-text-2 leading-[1.55]">{d.summary}</p>

            {/* mini blueprint — hairline glyph, not decoration */}
            <DiagramGlyph nodes={d.nodes} />

            <dl className="mt-4 pt-4 hairline-t grid grid-cols-2 gap-y-2 gap-x-4">
              <Meta label="Nodes" value={d.nodes.toString()} />
              <Meta label="Systems" value={d.systems.length.toString()} />
              <Meta label="Scope" value={d.systems.join(" · ")} className="col-span-2" />
            </dl>
            <div className="mt-4 pt-4 hairline-t flex items-center justify-between">
              <OpsTag label="VERSIONED" />
              <span className="font-mono text-[11px] text-text-3">Open →</span>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}

function AdrStatusPill({ status }: { status: AdrStatus }) {
  const tone =
    status === "Accepted"
      ? "success"
      : status === "Proposed"
        ? "info"
        : status === "Draft"
          ? "warning"
          : "muted";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
      <StageDot tone={tone as "success" | "warning" | "info" | "muted"} />
      {status}
    </span>
  );
}

function SectionHeading({
  kicker,
  title,
  caption,
}: {
  kicker: string;
  title: string;
  caption: string;
}) {
  return (
    <div className="mt-16 mb-6 flex items-baseline justify-between gap-4">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          {kicker}
        </span>
        <h2 className="font-display text-[22px] text-text-1 tracking-[-0.018em]">{title}</h2>
      </div>
      <span className="hidden md:inline font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {caption}
      </span>
    </div>
  );
}

function Meta({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline justify-between gap-3 ${className}`}>
      <dt className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </dt>
      <dd className="font-mono text-[11px] text-text-2 tabular truncate">{value}</dd>
    </div>
  );
}

function DiagramGlyph({ nodes }: { nodes: number }) {
  // Deterministic hairline glyph that scales with node count.
  const cols = Math.min(8, Math.max(4, Math.round(Math.sqrt(nodes))));
  const rows = Math.ceil(Math.min(nodes, 16) / cols);
  return (
    <div
      aria-hidden="true"
      className="mt-5 hairline p-2 grid gap-1 bg-canvas"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <span
          key={i}
          className="block h-[6px] border border-line-2"
          style={{ opacity: i < Math.min(nodes, cols * rows) ? 0.9 : 0.25 }}
        />
      ))}
    </div>
  );
}

function AdrTimeline() {
  const sorted = [...ADRS].sort((a, b) => a.decisionDate.localeCompare(b.decisionDate));
  return (
    <ol className="hairline bg-canvas">
      {sorted.map((a, i) => (
        <li
          key={a.number}
          className={`grid grid-cols-[80px_100px_1fr_120px] gap-4 items-baseline px-4 py-3 ${
            i < sorted.length - 1 ? "hairline-b" : ""
          }`}
        >
          <span className="font-mono text-[11px] text-text-3 tabular">{a.decisionDate}</span>
          <span className="font-mono text-[11px] text-text-2 tabular">ADR·{a.number}</span>
          <Link
            to="/architecture/$adr"
            params={{ adr: a.slug }}
            className="font-display text-[14px] text-text-2 hover:text-text-1 transition-micro tracking-[-0.005em] truncate"
          >
            {a.title}
          </Link>
          <span className="text-right">
            <AdrStatusPill status={a.status} />
          </span>
        </li>
      ))}
    </ol>
  );
}
