import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { JOURNAL, type JournalCategory } from "@/lib/journal-data";
import { PageHeader, Toolbar, SectionShell } from "@/components/section/section-bits";

const FILTERS: (JournalCategory | "All")[] = [
  "All",
  "Engineering Notes",
  "Architecture",
  "Design Decision",
  "Research",
  "Evaluation",
  "Development Log",
  "Post-Mortem",
];

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Vaerox" },
      {
        name: "description",
        content:
          "Chronological engineering feed — architecture notes, design decisions, evaluations, and development logs from Vaerox.",
      },
      { property: "og:title", content: "Journal — Vaerox" },
      {
        property: "og:description",
        content:
          "Chronological engineering feed — architecture notes, design decisions, evaluations, and development logs from Vaerox.",
      },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const entries = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return JOURNAL.filter((e) => filter === "All" || e.category === filter)
      .filter((e) => {
        if (!needle) return true;
        return (
          e.title.toLowerCase().includes(needle) ||
          e.summary.toLowerCase().includes(needle) ||
          e.tags.join(" ").toLowerCase().includes(needle) ||
          e.author.toLowerCase().includes(needle)
        );
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [q, filter]);

  const published = JOURNAL.filter((e) => e.status === "Published").length;
  const draft = JOURNAL.filter((e) => e.status !== "Published").length;

  return (
    <SectionShell>
      <PageHeader
        section="§ · Journal"
        title="Engineering notebook."
        summary="Chronological notes, design decisions, and long-form essays from the VÆRØX maintainer. Written in the order they happened. Written to be re-read."
        meta={[
          { label: "Entries", value: JOURNAL.length.toString().padStart(2, "0") },
          { label: "Published", value: published.toString().padStart(2, "0") },
          { label: "Drafts", value: draft.toString().padStart(2, "0") },
          { label: "Latest", value: entries[0]?.date ?? "—" },
        ]}
      />

      <Toolbar
        query={q}
        onQuery={setQ}
        placeholder="Search journal · title · tag · author"
        filters={[...FILTERS]}
        activeFilter={filter}
        onFilter={(f) => setFilter(f as (typeof FILTERS)[number])}
        count={entries.length}
      />

      <ul className="hairline border-t-0">
        {entries.map((e) => (
          <li key={e.slug} className="hairline-b last:border-b-0">
            <Link
              to="/journal/$slug"
              params={{ slug: e.slug }}
              className="group card-hover hover:card-hover-on bg-canvas grid grid-cols-12 gap-4 px-5 py-5 items-baseline"
            >
              <span className="col-span-3 md:col-span-2 text-metadata text-text-3 tracking-[0.02em]">
                {e.date}
              </span>

              <div className="col-span-9 md:col-span-7">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-overline text-text-3">{e.category}</span>
                  <span className="font-mono text-overline text-text-3 opacity-50">·</span>
                  <span className="text-metadata text-text-3">{e.revision}</span>
                  {e.status !== "Published" && (
                    <>
                      <span className="font-mono text-overline text-text-3 opacity-50">·</span>
                      <span className="font-mono text-overline text-warning uppercase tracking-[0.14em]">
                        {e.status}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="font-display text-heading-m text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.014em]">
                  {e.title}
                </h3>
                <p className="mt-2 text-body-s text-text-2 leading-[1.55] max-w-[720px]">
                  {e.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-overline text-text-3">
                  {e.tags.map((t) => (
                    <span key={t}>· {t}</span>
                  ))}
                </div>
              </div>

              <div className="col-span-6 md:col-span-2 text-label text-text-2 tabular">
                {e.author}
              </div>
              <div className="col-span-6 md:col-span-1 text-right text-metadata text-text-3">
                {e.readingMinutes}m
                <span className="ml-3 inline-block transition-transform transition-ui group-hover:translate-x-[4px]">
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
