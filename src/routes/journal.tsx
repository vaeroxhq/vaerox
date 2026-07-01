import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { JOURNAL, type JournalCategory } from "@/lib/journal-data";
import { PageHeader, Toolbar, SectionShell } from "@/components/section/section-bits";

const FILTERS: (JournalCategory | "All")[] = [
  "All",
  "Incident Review",
  "Post-Mortem",
  "Architecture",
  "Research",
  "Benchmark",
  "Performance",
  "Observability",
  "Infrastructure",
  "Engineering Notes",
  "Release Notes",
];

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — VÆRØX" },
      { name: "description", content: "Chronological engineering feed — incident reviews, benchmarks, architecture notes, and research from VÆRØX." },
      { property: "og:title", content: "Journal — VÆRØX" },
      { property: "og:description", content: "Chronological engineering feed — incident reviews, benchmarks, architecture notes, and research from VÆRØX." },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const entries = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return JOURNAL
      .filter((e) => filter === "All" || e.category === filter)
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
        title="Engineering feed."
        summary="Chronological notes, incident reviews, and long-form essays from the VÆRØX engineering team. Written to be re-read. Versioned. Attributed."
        meta={[
          { label: "Entries",   value: JOURNAL.length.toString().padStart(2, "0") },
          { label: "Published", value: published.toString().padStart(2, "0") },
          { label: "Drafts",    value: draft.toString().padStart(2, "0") },
          { label: "Latest",    value: entries[0]?.date ?? "—" },
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
              <span className="col-span-3 md:col-span-2 font-mono text-[11px] text-text-3 tabular tracking-[0.02em]">
                {e.date}
              </span>

              <div className="col-span-9 md:col-span-7">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{e.category}</span>
                  <span className="font-mono text-[10px] text-text-3 opacity-50">·</span>
                  <span className="font-mono text-[10px] text-text-3 tabular">{e.revision}</span>
                  {e.status !== "Published" && (
                    <>
                      <span className="font-mono text-[10px] text-text-3 opacity-50">·</span>
                      <span className="font-mono text-[10px] text-warning uppercase tracking-[0.14em]">{e.status}</span>
                    </>
                  )}
                </div>
                <h3 className="font-display text-[18px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.014em]">
                  {e.title}
                </h3>
                <p className="mt-2 text-[13px] text-text-2 leading-[1.55] max-w-[720px]">{e.summary}</p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
                  {e.tags.map((t) => (
                    <span key={t}>· {t}</span>
                  ))}
                </div>
              </div>

              <div className="col-span-6 md:col-span-2 font-mono text-[11px] text-text-2 tabular">
                {e.author}
              </div>
              <div className="col-span-6 md:col-span-1 text-right font-mono text-[11px] text-text-3 tabular">
                {e.readingMinutes}m
                <span className="ml-3 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[4px]">→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
