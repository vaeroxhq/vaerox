import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RESEARCH } from "@/lib/research-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { RelatedRail } from "@/components/doc/related-rail";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { PrevNext } from "@/components/doc/prev-next";

export const Route = createFileRoute("/research/$slug")({
  head: ({ params }) => {
    const r = RESEARCH.find((x) => x.slug === params.slug);
    const title = r ? `${r.title} — Research — Vareox` : "Research — Vareox";
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
  const sorted = [...RESEARCH].sort((a, b) => b.published.localeCompare(a.published));
  const idx = sorted.findIndex((x) => x.slug === r.slug);
  const prev = sorted[idx + 1];
  const next = sorted[idx - 1];

  return (
    <SectionShell>
      <Breadcrumbs
        items={[
          { label: "Vareox", to: "/" },
          { label: "Research", to: "/research" },
          { label: r.category },
        ]}
      />

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

      <DocShell rail={<RelatedRail kind="research" id={r.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Abstract">
            <p className="text-[15px] text-text-2 leading-[1.75]">{r.abstract}</p>
          </DocBlock>
          <DocBlock heading="Tags">
            <ul className="flex items-center gap-2 flex-wrap">
              {r.tags.map((t: string) => (
                <li
                  key={t}
                  className="hairline px-2 py-[2px] font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </DocBlock>
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.title, href: `/research/${prev.slug}`, kicker: "RES" } : null}
        next={next ? { title: next.title, href: `/research/${next.slug}`, kicker: "RES" } : null}
      />
    </SectionShell>
  );
}
