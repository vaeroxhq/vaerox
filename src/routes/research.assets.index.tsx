import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DATASETS, DATASET_CATEGORIES, type Dataset, type DatasetCategory } from "@/lib/datasets-data";
import { PageHeader, Toolbar, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

const FILTERS: (DatasetCategory | "All")[] = ["All", ...DATASET_CATEGORIES];

export const Route = createFileRoute("/research/assets/")({
  head: () => ({
    meta: [
      { title: "Datasets — Research — VÆRØX" },
      {
        name: "description",
        content:
          "Canonical registry of datasets the lab has evaluated, prepared, or built pipelines around — medical, agricultural, industrial, remote sensing, and computer vision.",
      },
      { property: "og:title", content: "Datasets — Research — VÆRØX" },
      {
        property: "og:description",
        content:
          "Datasets and research assets across medical imaging, agriculture, industrial vision, remote sensing, and computer vision.",
      },
    ],
  }),
  component: DatasetsIndex,
});

function DatasetsIndex() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return DATASETS.filter((d) => filter === "All" || d.category === filter).filter((d) => {
      if (!needle) return true;
      return (
        d.name.toLowerCase().includes(needle) ||
        d.purpose.toLowerCase().includes(needle) ||
        d.domain.toLowerCase().includes(needle) ||
        d.tags.join(" ").toLowerCase().includes(needle) ||
        d.skills.join(" ").toLowerCase().includes(needle) ||
        d.tasks.join(" ").toLowerCase().includes(needle)
      );
    });
  }, [q, filter]);

  return (
    <SectionShell>
      <Breadcrumbs
        items={[
          { label: "VÆRØX", to: "/" },
          { label: "Research", to: "/research" },
          { label: "Datasets" },
        ]}
      />

      <PageHeader
        section="§ · Research / Datasets"
        title="Datasets & research assets."
        summary="Datasets the lab has evaluated, prepared labels for, built challenge pipelines around, or baselined. Each entry records domain, task, source, purpose, annotation types, skills demonstrated, and cross-references to related research."
        meta={[
          { label: "Assets",     value: DATASETS.length.toString().padStart(2, "0") },
          { label: "Domains",    value: new Set(DATASETS.map((d) => d.domain)).size.toString().padStart(2, "0") },
          { label: "Categories", value: DATASET_CATEGORIES.length.toString().padStart(2, "0") },
          {
            label: "Baselined",
            value: DATASETS.filter((d) => d.status === "Baselined" || d.status === "Instrumented")
              .length.toString()
              .padStart(2, "0"),
          },
        ]}
      />

      <Toolbar
        query={q}
        onQuery={setQ}
        placeholder="Search names, domains, tasks, skills, tags…"
        filters={FILTERS as unknown as string[]}
        activeFilter={filter}
        onFilter={(v) => setFilter(v as (typeof FILTERS)[number])}
        count={items.length}
      />

      <ul className="mt-6 hairline bg-canvas divide-y" style={{ borderColor: "var(--line-1)" }}>
        {items.map((d) => (
          <li key={d.slug}>
            <DatasetRow entry={d} />
          </li>
        ))}
        {items.length === 0 && (
          <li className="bg-canvas px-4 py-10 text-center font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
            No datasets match the current filter.
          </li>
        )}
      </ul>
    </SectionShell>
  );
}

function DatasetRow({ entry: d }: { entry: Dataset }) {
  return (
    <Link
      to="/research/datasets/$dataset"
      params={{ dataset: d.slug }}
      className="group block bg-canvas p-6 transition-micro hover:bg-surface"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
              {d.category}
            </span>
            <span className="font-mono text-[10px] text-text-3 opacity-60">·</span>
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
              {d.status}
            </span>
          </div>
          <h2 className="font-display text-[22px] mt-3 tracking-[-0.02em] transition-ui group-hover:-translate-y-[1px]">
            {d.name}
          </h2>
          <p className="mt-3 text-[14px] text-text-2 leading-[1.65] max-w-[68ch]">{d.purpose}</p>

          <ul className="mt-4 flex items-center gap-2 flex-wrap">
            {d.tags.map((t) => (
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
          <dl className="grid grid-cols-2 md:grid-cols-1 gap-y-3 gap-x-4">
            <Field label="Domain"  value={d.domain} />
            <Field label="Task"    value={d.tasks[0]} />
            <Field label="Size"    value={d.size ?? "—"} />
            <Field label="Updated" value={d.updated} />
          </dl>
          <div className="mt-4 font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] group-hover:text-text-1">
            Open →
          </div>
        </aside>
      </div>
    </Link>
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
