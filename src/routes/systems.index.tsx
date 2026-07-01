import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SYSTEMS, type SystemEntry, type SystemStage } from "@/lib/systems-data";
import { FUTURE_SYSTEMS } from "@/lib/future-systems-data";
import { PageHeader, Toolbar, SectionShell, StageDot } from "@/components/section/section-bits";

const FILTERS: (SystemStage | "All")[] = ["All", "Production", "Prototype", "Research", "Archived"];

export const Route = createFileRoute("/systems/")({
  head: () => ({
    meta: [
      { title: "Systems — VÆRØX" },
      {
        name: "description",
        content: "Production systems registry — owner, stage, health, deploy, stack, docs.",
      },
      { property: "og:title", content: "Systems — VÆRØX" },
      {
        property: "og:description",
        content: "Production systems registry — owner, stage, health, deploy, stack, docs.",
      },
    ],
  }),
  component: SystemsPage,
});

function stageTone(stage: SystemStage) {
  return stage === "Production"
    ? ("success" as const)
    : stage === "Prototype"
      ? ("warning" as const)
      : stage === "Research"
        ? ("info" as const)
        : ("muted" as const);
}

function healthTone(h: SystemEntry["health"]) {
  return h === "Healthy"
    ? ("success" as const)
    : h === "Nominal"
      ? ("info" as const)
      : h === "Degraded"
        ? ("warning" as const)
        : ("muted" as const);
}

function SystemsPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return SYSTEMS.filter((s) => filter === "All" || s.stage === filter).filter((s) => {
      if (!needle) return true;
      return (
        s.name.toLowerCase().includes(needle) ||
        s.owner.toLowerCase().includes(needle) ||
        s.summary.toLowerCase().includes(needle) ||
        s.stack.join(" ").toLowerCase().includes(needle)
      );
    });
  }, [q, filter]);

  return (
    <SectionShell>
      <PageHeader
        section="§ · Systems"
        title="Systems maintained in the lab."
        summary="Reference implementations built and operated inside the VÆRØX lab. Each row links to the system's docs, ADRs, and measurements. No external SLA — systems run to exercise the architecture they describe."
        meta={[
          { label: "Systems", value: SYSTEMS.length.toString().padStart(2, "0") },
          {
            label: "Production",
            value: SYSTEMS.filter((s) => s.stage === "Production").length.toString().padStart(2, "0"),
          },
          {
            label: "Prototype",
            value: SYSTEMS.filter((s) => s.stage === "Prototype").length.toString().padStart(2, "0"),
          },
          {
            label: "Research",
            value: SYSTEMS.filter((s) => s.stage === "Research").length.toString().padStart(2, "0"),
          },
        ]}
      />

      <Toolbar
        query={q}
        onQuery={setQ}
        placeholder="Filter by name, owner, stack…"
        filters={FILTERS as unknown as string[]}
        activeFilter={filter}
        onFilter={(v) => setFilter(v as (typeof FILTERS)[number])}
        count={rows.length}
      />

      {/* Table */}
      <div className="mt-6 hairline bg-canvas">
        <div className="hidden md:grid grid-cols-[1.4fr_1fr_0.8fr_0.9fr_0.9fr_1.4fr_0.7fr] gap-px bg-line-1 hairline-b">
          {["System", "Owner", "Stage", "Health", "Last Deploy", "Stack", "Docs"].map((h) => (
            <div
              key={h}
              className="bg-canvas px-4 py-2.5 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70"
            >
              {h}
            </div>
          ))}
        </div>

        <ul className="divide-y" style={{ borderColor: "var(--line-1)" }}>
          {rows.map((s) => (
            <li key={s.slug}>
              <Link
                to="/systems/$slug"
                params={{ slug: s.slug }}
                className="group bg-canvas grid md:grid-cols-[1.4fr_1fr_0.8fr_0.9fr_0.9fr_1.4fr_0.7fr] grid-cols-2 gap-x-4 gap-y-1 px-4 py-3 transition-micro hover:bg-surface"
              >
                <Cell mono={false}>
                  <span className="font-display text-[15px] text-text-1 tracking-[-0.01em]">
                    {s.name}
                  </span>
                  <span className="md:hidden ml-2 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
                    {s.owner}
                  </span>
                </Cell>
                <Cell className="hidden md:flex">{s.owner}</Cell>
                <Cell>
                  <span className="inline-flex items-center gap-2">
                    <StageDot tone={stageTone(s.stage)} />
                    <span>{s.stage}</span>
                  </span>
                </Cell>
                <Cell>
                  <span className="inline-flex items-center gap-2">
                    <StageDot tone={healthTone(s.health)} />
                    <span>{s.health}</span>
                  </span>
                </Cell>
                <Cell>{s.lastDeploy}</Cell>
                <Cell className="hidden md:flex truncate">{s.stack.join(" · ")}</Cell>
                <Cell className="justify-end">
                  <span className="font-mono text-[11px] text-text-2 group-hover:text-text-1">
                    Open →
                  </span>
                </Cell>
              </Link>
            </li>
          ))}
          {rows.length === 0 && (
            <li className="bg-canvas px-4 py-10 text-center font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
              No systems match the current filter.
            </li>
          )}
        </ul>
      </div>
    </SectionShell>
  );
}

function Cell({
  children,
  className = "",
  mono = true,
}: {
  children: React.ReactNode;
  className?: string;
  mono?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline ${
        mono ? "font-mono text-[12px] text-text-2 tabular" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
