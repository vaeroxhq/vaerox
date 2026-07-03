import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { JOURNAL, type JournalEntry } from "@/lib/journal-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { RelatedRail } from "@/components/doc/related-rail";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { PrevNext } from "@/components/doc/prev-next";
import { OpsTag } from "@/components/ops/ops-tag";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const entry = JOURNAL.find((j) => j.slug === params.slug);
    if (!entry) throw notFound();
    return { entry };
  },
  head: ({ loaderData }) => {
    const e = loaderData?.entry;
    return {
      meta: [
        { title: e ? `${e.title} — Vaerox Journal` : "Journal — Vaerox" },
        { name: "description", content: (e?.summary ?? "").slice(0, 160) },
        { property: "og:title", content: e?.title ?? "Journal — Vaerox" },
        { property: "og:description", content: (e?.summary ?? "").slice(0, 160) },
      ],
    };
  },
  component: EntryPage,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader
        section="§ · Journal"
        title="Entry not found."
        summary="This journal entry could not be located."
      />
      <Link
        to="/journal"
        className="text-label text-text-2 uppercase tracking-[0.14em] hover:text-text-1"
      >
        ← Back to journal
      </Link>
    </SectionShell>
  ),
});

function EntryPage() {
  const { entry } = Route.useLoaderData() as { entry: JournalEntry };
  const sorted = [...JOURNAL].sort((a, b) => b.date.localeCompare(a.date));
  const idx = sorted.findIndex((x) => x.slug === entry.slug);
  const prev = sorted[idx + 1];
  const next = sorted[idx - 1];

  return (
    <SectionShell>
      <Breadcrumbs
        items={[
          { label: "VÆRØX", to: "/" },
          { label: "Journal", to: "/journal" },
          { label: entry.category },
        ]}
      />

      <PageHeader
        section={`§ · Journal · ${entry.category}`}
        title={entry.title}
        summary={entry.summary}
        meta={[
          { label: "Date", value: entry.date },
          { label: "Author", value: entry.author },
          { label: "Reading", value: `${entry.readingMinutes} min` },
          { label: "Revision", value: entry.revision },
        ]}
      />

      <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <OpsTag label={entry.status === "Published" ? "PUBLIC" : "DRAFT"} />
        <OpsTag label="VERSIONED" />
        <span className="text-metadata text-text-3 opacity-60">·</span>
        {entry.tags.map((t) => (
          <span key={t} className="text-overline text-text-3">
            · {t}
          </span>
        ))}
      </div>

      <DocShell rail={<RelatedRail kind="journal" id={entry.slug} />}>
        <article className="max-w-[720px]">
          <DocBlock heading="Entry">
            <div className="space-y-5">
              {entry.body.map((p, i) => (
                <p key={i} className="text-heading-s text-text-2 leading-[1.75]">
                  {p}
                </p>
              ))}
            </div>
          </DocBlock>
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.title, href: `/journal/${prev.slug}`, kicker: "LOG" } : null}
        next={next ? { title: next.title, href: `/journal/${next.slug}`, kicker: "LOG" } : null}
      />
    </SectionShell>
  );
}
