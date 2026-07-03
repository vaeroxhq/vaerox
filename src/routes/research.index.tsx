import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { RESEARCH, type ResearchCategory, type ResearchEntry } from "@/lib/research-data";
import { DATASETS } from "@/lib/datasets-data";
import { PageHeader, Toolbar, SectionShell } from "@/components/section/section-bits";

const FILTERS: (ResearchCategory | "All")[] = [
  "All",
  "Medical AI",
  "Agricultural AI",
  "Financial AI",
  "Computer Vision",
  "Remote Sensing",
  "LLM Evaluation",
  "Systems Design",
  "Quantitative Evaluation",
];

export const Route = createFileRoute("/research/")({
  head: () => ({
    meta: [
      { title: "Research — Vaerox" },
      {
        name: "description",
        content: "Publication archive — papers, preprints, working drafts, and dataset assets.",
      },
      { property: "og:title", content: "Research — Vaerox" },
      {
        property: "og:description",
        content: "Publication archive — papers, preprints, working drafts, and dataset assets.",
      },
    ],
  }),
  component: ResearchIndex,
});

function ResearchIndex() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return RESEARCH.filter((r) => filter === "All" || r.category === filter).filter((r) => {
      if (!needle) return true;
      return (
        r.title.toLowerCase().includes(needle) ||
        r.abstract.toLowerCase().includes(needle) ||
        r.tags.join(" ").toLowerCase().includes(needle) ||
        r.authors.join(" ").toLowerCase().includes(needle)
      );
    });
  }, [q, filter]);

  return (
    <SectionShell>
      <PageHeader
        section="§ · Research"
        title="Publication archive."
        summary="Preprints, published papers, working drafts, and dataset assets from VÆRØX engineering research. Filterable by category and searchable across abstracts."
        meta={[
          { label: "Publications", value: RESEARCH.length.toString().padStart(2, "0") },
          { label: "Datasets", value: DATASETS.length.toString().padStart(2, "0") },
          {
            label: "Preprint",
            value: RESEARCH.filter((r) => r.status === "Preprint")
              .length.toString()
              .padStart(2, "0"),
          },
          {
            label: "Drafts",
            value: RESEARCH.filter((r) => r.status === "Working Draft" || r.status === "In Review")
              .length.toString()
              .padStart(2, "0"),
          },
        ]}
      />

      <Link
        to="/research/assets"
        className="group block hairline bg-canvas p-5 mb-6 transition-micro hover:bg-surface"
      >
        <div className="flex items-baseline justify-between gap-6 flex-wrap">
          <div className="min-w-0">
            <div className="text-overline text-text-3 opacity-70">§ · Research / Assets</div>
            <div className="mt-2 text-heading-m">Research Assets</div>
            <p className="mt-2 text-body-s text-text-2 max-w-[68ch]">
              Canonical registry of datasets, evaluation corpora, annotation pipelines, and
              benchmark resources across medical imaging, agriculture, industrial vision, remote
              sensing, and general computer vision.
            </p>
          </div>
          <div className="text-label text-text-2 uppercase tracking-[0.14em] group-hover:text-text-1">
            Browse {DATASETS.length.toString().padStart(2, "0")} →
          </div>
        </div>
      </Link>

      <Toolbar
        query={q}
        onQuery={setQ}
        placeholder="Search titles, tags, abstracts, authors…"
        filters={FILTERS as unknown as string[]}
        activeFilter={filter}
        onFilter={(v) => setFilter(v as (typeof FILTERS)[number])}
        count={items.length}
      />

      <ul className="mt-6 hairline bg-canvas divide-y" style={{ borderColor: "var(--line-1)" }}>
        {items.map((r) => (
          <li key={r.slug}>
            <PublicationRow entry={r} />
          </li>
        ))}
        {items.length === 0 && (
          <li className="bg-canvas px-4 py-10 text-center text-label text-text-3 uppercase tracking-[0.14em]">
            No publications match the current filter.
          </li>
        )}
      </ul>
    </SectionShell>
  );
}

function PublicationRow({ entry: r }: { entry: ResearchEntry }) {
  return (
    <Link
      to="/research/$slug"
      params={{ slug: r.slug }}
      className="group block bg-canvas p-6 transition-micro hover:bg-surface"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-overline text-text-3">{r.category}</span>
            <span className="text-metadata text-text-3 opacity-60">·</span>
            <span className="text-overline text-text-3">{r.status}</span>
          </div>
          <h2 className="text-heading-l transition-ui group-hover:-translate-y-[1px]">{r.title}</h2>
          <p className="mt-3 text-body-m text-text-2 max-w-[68ch]">{r.abstract}</p>

          <ul className="mt-4 flex items-center gap-2 flex-wrap">
            {r.tags.map((t) => (
              <li key={t} className="hairline px-2 py-[2px] text-overline text-text-3">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <aside className="md:border-l md:pl-6" style={{ borderColor: "var(--line-1)" }}>
          <dl className="grid grid-cols-2 md:grid-cols-1 gap-y-3 gap-x-4">
            <Field label="Published" value={r.published} />
            <Field label="Reading" value={`${r.readingMinutes}m`} />
            <Field label="Authors" value={r.authors.join(", ")} />
          </dl>
          <div className="mt-4 text-label text-text-2 uppercase tracking-[0.14em] group-hover:text-text-1">
            Read →
          </div>
        </aside>
      </div>
    </Link>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-overline text-text-3 opacity-70">{label}</dt>
      <dd className="mt-1 text-label text-text-2 tabular">{value}</dd>
    </div>
  );
}
