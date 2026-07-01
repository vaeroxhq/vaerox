import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { JOURNAL } from "@/lib/journal-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
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
        { title: e ? `${e.title} — VÆRØX Journal` : "Journal — VÆRØX" },
        { name: "description", content: (e?.summary ?? "").slice(0, 160) },
        { property: "og:title", content: e?.title ?? "Journal — VÆRØX" },
        { property: "og:description", content: (e?.summary ?? "").slice(0, 160) },
      ],
    };
  },
  component: EntryPage,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader section="§ · Journal" title="Entry not found." summary="This journal entry could not be located." />
      <Link to="/journal" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1">← Back to journal</Link>
    </SectionShell>
  ),
});

function EntryPage() {
  const { entry } = Route.useLoaderData();
  return (
    <SectionShell>
      <PageHeader
        section={`§ · Journal · ${entry.category}`}
        title={entry.title}
        summary={entry.summary}
        meta={[
          { label: "Date",     value: entry.date },
          { label: "Author",   value: entry.author },
          { label: "Reading",  value: `${entry.readingMinutes} min` },
          { label: "Revision", value: entry.revision },
        ]}
      />

      <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <OpsTag label={entry.status === "Published" ? "PUBLIC" : "DRAFT"} />
        <OpsTag label="VERSIONED" />
        <span className="font-mono text-[10px] text-text-3 opacity-60">·</span>
        {entry.tags.map((t) => (
          <span key={t} className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">· {t}</span>
        ))}
      </div>

      <article className="max-w-[720px] space-y-5">
        {entry.body.map((p, i) => (
          <p key={i} className="text-[16px] text-text-2 leading-[1.75]">{p}</p>
        ))}
      </article>

      <div className="mt-16 hairline-t pt-6 flex items-center justify-between">
        <Link to="/journal" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1 transition-micro">
          ← All entries
        </Link>
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{entry.category} · {entry.revision}</span>
      </div>
    </SectionShell>
  );
}
