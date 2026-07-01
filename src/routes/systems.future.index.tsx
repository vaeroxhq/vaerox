import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  FUTURE_SYSTEMS,
  FUTURE_STATUSES,
  type FutureStatus,
  type FutureSystem,
} from "@/lib/future-systems-data";
import { PageHeader, Toolbar, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

const FILTERS: (FutureStatus | "All")[] = ["All", ...FUTURE_STATUSES];

export const Route = createFileRoute("/systems/future/")({
  head: () => ({
    meta: [
      { title: "Roadmap — VÆRØX" },
      {
        name: "description",
        content:
          "The VÆRØX studio roadmap: systems currently being designed, researched, or built. Every entry is honestly labelled — Building, Architecture, Research, Planned, or Concept. Nothing is marked as production.",
      },
      { property: "og:title", content: "Roadmap — VÆRØX" },
      {
        property: "og:description",
        content:
          "What VÆRØX is planning to build next — Building, Architecture, Research, Planned, Concept.",
      },
    ],
  }),
  component: FutureSystemsIndex,
});

function FutureSystemsIndex() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return FUTURE_SYSTEMS.filter((f) => filter === "All" || f.status === filter).filter((f) => {
      if (!needle) return true;
      return (
        f.name.toLowerCase().includes(needle) ||
        f.description.toLowerCase().includes(needle) ||
        f.category.toLowerCase().includes(needle) ||
        f.tags.join(" ").toLowerCase().includes(needle) ||
        f.plannedStack.join(" ").toLowerCase().includes(needle)
      );
    });
  }, [q, filter]);

  return (
    <SectionShell>
      <Breadcrumbs
        items={[
          { label: "VÆRØX", to: "/" },
          { label: "Roadmap" },
        ]}
      />

      <PageHeader
        section="§ · Roadmap"
        title="What we are planning to build."
        summary="The VÆRØX studio roadmap. These systems are currently being designed, researched, or actively built. Every entry is honestly labelled — Building, Architecture, Research, Planned, or Concept. Nothing here is marked as production."
        meta={[
          { label: "Systems",  value: FUTURE_SYSTEMS.length.toString().padStart(2, "0") },
          { label: "Building", value: FUTURE_SYSTEMS.filter((f) => f.status === "Building").length.toString().padStart(2, "0") },
          { label: "Arch.",    value: FUTURE_SYSTEMS.filter((f) => f.status === "Architecture").length.toString().padStart(2, "0") },
          { label: "Planned",  value: FUTURE_SYSTEMS.filter((f) => f.status === "Planned" || f.status === "Concept").length.toString().padStart(2, "0") },
        ]}
      />

      <Toolbar
        query={q}
        onQuery={setQ}
        placeholder="Search names, categories, tags, planned stack…"
        filters={FILTERS as unknown as string[]}
        activeFilter={filter}
        onFilter={(v) => setFilter(v as (typeof FILTERS)[number])}
        count={items.length}
      />

      <ul className="mt-6 hairline bg-canvas divide-y" style={{ borderColor: "var(--line-1)" }}>
        {items.map((f) => (
          <li key={f.slug}>
            <FutureRow entry={f} />
          </li>
        ))}
        {items.length === 0 && (
          <li className="bg-canvas px-4 py-10 text-center font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
            No future systems match the current filter.
          </li>
        )}
      </ul>
    </SectionShell>
  );
}

function FutureRow({ entry: f }: { entry: FutureSystem }) {
  return (
    <Link
      to="/systems/future/$slug"
      params={{ slug: f.slug }}
      className="group block bg-canvas p-6 transition-micro hover:bg-surface"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
              {f.category}
            </span>
            <span className="font-mono text-[10px] text-text-3 opacity-60">·</span>
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
              {f.status}
            </span>
          </div>
          <h2 className="font-display text-[22px] mt-3 tracking-[-0.02em] transition-ui group-hover:-translate-y-[1px]">
            {f.name}
          </h2>
          <p className="mt-3 text-[14px] text-text-2 leading-[1.65] max-w-[68ch]">{f.description}</p>

          <ul className="mt-4 flex items-center gap-2 flex-wrap">
            {f.tags.map((t) => (
              <li
                key={t}
                className="hairline px-2 py-[2px] font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <aside className="md:border-l md:pl-6" style={{ borderColor: "var(--line-1)" }}>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
                Progress
              </span>
              <span className="font-mono text-[10px] text-text-2 tabular">
                {f.progress.toString().padStart(2, "0")}%
              </span>
            </div>
            <ProgressBar value={f.progress} />
          </div>
          <dl className="mt-4 grid grid-cols-2 md:grid-cols-1 gap-y-3 gap-x-4">
            <Field label="Status"    value={f.status} />
            <Field label="Category"  value={f.category} />
            <Field label="Updated"   value={f.updated} />
          </dl>
          <div className="mt-4 font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] group-hover:text-text-1">
            Open →
          </div>
        </aside>
      </div>
    </Link>
  );
}

function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="mt-2 relative h-[6px] hairline bg-canvas overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-[var(--text-2)]"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-[12px] text-text-2 tabular">{value}</dd>
    </div>
  );
}
