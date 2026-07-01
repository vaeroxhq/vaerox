import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PROJECTS, type ProjectEntry, type ProjectStage } from "@/lib/projects-data";
import { PageHeader, Toolbar, SectionShell, StageDot } from "@/components/section/section-bits";

const FILTERS: (ProjectStage | "All")[] = ["All", "Production", "Prototype", "Research", "Archived"];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — VÆRØX" },
      {
        name: "description",
        content: "Engineering projects — architecture, stack, timeline, outcomes.",
      },
      { property: "og:title", content: "Projects — VÆRØX" },
      {
        property: "og:description",
        content: "Engineering projects — architecture, stack, timeline, outcomes.",
      },
    ],
  }),
  component: ProjectsPage,
});

function stageTone(stage: ProjectStage) {
  return stage === "Production"
    ? ("success" as const)
    : stage === "Prototype"
      ? ("warning" as const)
      : stage === "Research"
        ? ("info" as const)
        : ("muted" as const);
}

function ProjectsPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PROJECTS.filter((p) => filter === "All" || p.stage === filter).filter((p) => {
      if (!needle) return true;
      return (
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.stack.join(" ").toLowerCase().includes(needle) ||
        p.architecture.toLowerCase().includes(needle)
      );
    });
  }, [q, filter]);

  return (
    <SectionShell>
      <PageHeader
        section="§ · Projects"
        title="Engineering builds."
        summary="Case studies of the lab's reference implementations, prototypes, and research builds. Each card links to a long-form write-up: the problem, the architecture, the measurements, and what changed."
        meta={[
          { label: "Projects", value: PROJECTS.length.toString().padStart(2, "0") },
          {
            label: "Production",
            value: PROJECTS.filter((p) => p.stage === "Production").length.toString().padStart(2, "0"),
          },
          {
            label: "Prototype",
            value: PROJECTS.filter((p) => p.stage === "Prototype").length.toString().padStart(2, "0"),
          },
          {
            label: "Research",
            value: PROJECTS.filter((p) => p.stage === "Research").length.toString().padStart(2, "0"),
          },
        ]}
      />

      <Toolbar
        query={q}
        onQuery={setQ}
        placeholder="Filter by name, stack, architecture…"
        filters={FILTERS as unknown as string[]}
        activeFilter={filter}
        onFilter={(v) => setFilter(v as (typeof FILTERS)[number])}
        count={items.length}
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-px bg-line-1 hairline">
        {items.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
        {items.length === 0 && (
          <div className="bg-canvas px-4 py-10 text-center font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] lg:col-span-2">
            No projects match the current filter.
          </div>
        )}
      </div>
    </SectionShell>
  );
}

function ProjectCard({ project: p }: { project: ProjectEntry }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      className="group relative bg-canvas p-6 transition-ui hover:bg-surface flex flex-col"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 h-3 w-3 border-t border-r border-line-2"
      />
      <header className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] tabular">
          {p.slug}
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          <StageDot tone={stageTone(p.stage)} />
          {p.stage}
        </span>
      </header>

      <div className="hairline-t mt-4" />

      <h2 className="font-display text-[26px] mt-6 tracking-[-0.024em] transition-ui group-hover:-translate-y-[1px]">
        {p.name}
      </h2>
      <p className="mt-3 text-[14px] text-text-2 leading-[1.6] max-w-[52ch]">{p.description}</p>

      <dl className="mt-6 pt-4 hairline-t grid grid-cols-2 gap-y-2 gap-x-4">
        <Meta label="Architecture" value={p.architecture} className="col-span-2" />
        <Meta label="Stack" value={p.stack.join(" · ")} className="col-span-2" />
        <Meta label="Timeline" value={p.timeline} />
        <Meta label="Updated" value={p.updated} />
      </dl>

      <div className="mt-6 pt-4 hairline-t flex items-center justify-between">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
          Case study
        </span>
        <span className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] transition-micro group-hover:text-text-1 group-hover:translate-x-[2px]">
          Open →
        </span>
      </div>
    </Link>
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
      <dd className="font-mono text-[11px] text-text-2 tabular truncate text-right">{value}</dd>
    </div>
  );
}
