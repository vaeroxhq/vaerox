import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DIAGRAMS } from "@/lib/architecture-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { PrevNext } from "@/components/doc/prev-next";
import { OpsTag } from "@/components/ops/ops-tag";

export const Route = createFileRoute("/architecture/diagrams/$slug")({
  loader: ({ params }) => {
    const d = DIAGRAMS.find((x) => x.slug === params.slug);
    if (!d) throw notFound();
    return { d };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.d;
    return {
      meta: [
        { title: d ? `${d.title} — Diagram — VÆRØX` : "Diagram — VÆRØX" },
        { name: "description", content: (d?.summary ?? "").slice(0, 160) },
        { property: "og:title", content: d?.title ?? "Diagram — VÆRØX" },
        { property: "og:description", content: (d?.summary ?? "").slice(0, 160) },
      ],
    };
  },
  component: DiagramDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader section="§ · Architecture" title="Diagram not found." summary="No diagram matches that identifier." />
      <Link to="/architecture" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1">← Back to architecture</Link>
    </SectionShell>
  ),
});

function DiagramDetail() {
  const { d } = Route.useLoaderData();
  const idx = DIAGRAMS.findIndex((x) => x.slug === d.slug);
  const prev = DIAGRAMS[idx - 1];
  const next = DIAGRAMS[idx + 1];

  return (
    <SectionShell>
      <Breadcrumbs items={[
        { label: "VÆRØX", to: "/" },
        { label: "Architecture", to: "/architecture" },
        { label: "Diagrams" },
        { label: d.title },
      ]} />

      <PageHeader
        section={`§ · Diagram · ${d.kind}`}
        title={d.title}
        summary={d.summary}
        meta={[
          { label: "Kind",    value: d.kind },
          { label: "Nodes",   value: d.nodes.toString().padStart(2, "0") },
          { label: "Updated", value: d.updated },
          { label: "Systems", value: d.systems.length.toString() },
        ]}
      />

      <div className="mb-6 flex items-center gap-3">
        <OpsTag label="VERSIONED" />
        <OpsTag label="SIGNED" />
      </div>

      <DocShell rail={
        <aside className="hairline bg-canvas h-fit sticky top-24">
          <div className="px-4 py-3 hairline-b">
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">Systems in scope</span>
          </div>
          <ul>
            {d.systems.map((s: string) => (
              <li key={s} className="px-4 py-3 hairline-b last:border-b-0 font-mono text-[12px] text-text-2">{s}</li>
            ))}
          </ul>
        </aside>
      }>
        <article className="max-w-[820px]">
          <DocBlock heading="Diagram">
            <DiagramCanvas nodes={d.nodes} />
            <p className="mt-3 font-mono text-[11px] text-text-3 tracking-[0.06em]">
              Interactive viewer with pan/zoom, dependency highlighting, and component drill-down ships in the next
              architecture release. This is the canonical structural render.
            </p>
          </DocBlock>
          <DocBlock heading="Structure">
            <p className="text-[15px] text-text-2 leading-[1.7]">{d.summary}</p>
          </DocBlock>
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.title, href: `/architecture/diagrams/${prev.slug}`, kicker: prev.kind } : null}
        next={next ? { title: next.title, href: `/architecture/diagrams/${next.slug}`, kicker: next.kind } : null}
      />
    </SectionShell>
  );
}

function DiagramCanvas({ nodes }: { nodes: number }) {
  const cols = Math.min(8, Math.max(4, Math.round(Math.sqrt(nodes))));
  const rows = Math.ceil(nodes / cols);
  return (
    <div className="hairline bg-canvas p-6">
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div
            key={i}
            className={`hairline aspect-[3/2] flex items-center justify-center font-mono text-[10px] text-text-3 tabular ${i < nodes ? "" : "opacity-30"}`}
          >
            {i < nodes ? `n${(i + 1).toString().padStart(2, "0")}` : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
