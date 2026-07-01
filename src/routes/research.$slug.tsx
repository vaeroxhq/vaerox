import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RESEARCH } from "@/lib/research-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";

export const Route = createFileRoute("/research/$slug")({
  head: ({ params }) => {
    const r = RESEARCH.find((x) => x.slug === params.slug);
    const title = r ? `${r.title} — Research — VÆRØX` : "Research — VÆRØX";
    const description = r?.abstract ?? "Research publication.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    const entry = RESEARCH.find((r) => r.slug === params.slug);
    if (!entry) throw notFound();
    return { entry };
  },
  component: ResearchDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader
        section="§ · Research"
        title="Publication not found."
        summary="No publication matches that identifier."
      />
      <Link
        to="/research"
        className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1"
      >
        ← Back to archive
      </Link>
    </SectionShell>
  ),
});

function ResearchDetail() {
  const { entry: r } = Route.useLoaderData();

  return (
    <SectionShell>
      <PageHeader
        section={`§ · Research / ${r.category}`}
        title={r.title}
        summary={r.abstract}
        meta={[
          { label: "Status", value: r.status },
          { label: "Published", value: r.published },
          { label: "Reading", value: `${r.readingMinutes}m` },
          { label: "Authors", value: r.authors.join(", ") },
        ]}
      />

      <div className="mt-4 hairline bg-canvas p-6">
        <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
          Tags
        </div>
        <ul className="mt-3 flex items-center gap-2 flex-wrap">
          {r.tags.map((t) => (
            <li
              key={t}
              className="hairline px-2 py-[2px] font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Link
          to="/research"
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1"
        >
          ← Back to archive
        </Link>
      </div>
    </SectionShell>
  );
}
