import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DATASETS, findDataset, type Dataset } from "@/lib/datasets-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { RelatedRail } from "@/components/doc/related-rail";
import { PrevNext } from "@/components/doc/prev-next";

export const Route = createFileRoute("/research/datasets/$dataset")({
  head: ({ params }) => {
    const d = findDataset(params.dataset);
    const title = d ? `${d.name} — Datasets — VÆRØX` : "Dataset — VÆRØX";
    const description = d?.purpose ?? "Dataset asset.";
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
    const dataset = findDataset(params.dataset);
    if (!dataset) throw notFound();
    return { dataset };
  },
  component: DatasetDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader
        section="§ · Research / Datasets"
        title="Dataset not found."
        summary="No dataset matches that identifier."
      />
      <Link
        to="/research/datasets"
        className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1"
      >
        ← Back to datasets
      </Link>
    </SectionShell>
  ),
});

function DatasetDetail() {
  const { dataset: d } = Route.useLoaderData() as { dataset: Dataset };
  const sorted = [...DATASETS].sort((a, b) => b.updated.localeCompare(a.updated));
  const idx = sorted.findIndex((x) => x.slug === d.slug);
  const prev = sorted[idx + 1];
  const next = sorted[idx - 1];

  return (
    <SectionShell>
      <Breadcrumbs
        items={[
          { label: "VÆRØX", to: "/" },
          { label: "Research", to: "/research" },
          { label: "Datasets", to: "/research/datasets" },
          { label: d.category },
        ]}
      />

      <PageHeader
        section={`§ · Research / Datasets / ${d.category}`}
        title={d.name}
        summary={d.purpose}
        meta={[
          { label: "Domain",  value: d.domain },
          { label: "Task",    value: d.tasks[0] },
          { label: "Status",  value: d.status },
          { label: "Updated", value: d.updated },
        ]}
      />

      <DocShell rail={<RelatedRail kind="dataset" id={d.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Source">
            <p className="font-mono text-[13px] text-text-2 tabular">{d.source}</p>
          </DocBlock>

          {d.size && (
            <DocBlock heading="Dataset size">
              <p className="font-mono text-[13px] text-text-2 tabular">{d.size}</p>
            </DocBlock>
          )}

          <DocBlock heading="Purpose">
            <p className="text-[15px] text-text-2 leading-[1.75]">{d.purpose}</p>
          </DocBlock>

          <DocBlock heading="Tasks">
            <KVList items={d.tasks} />
          </DocBlock>

          <DocBlock heading="Annotation types">
            <KVList items={d.annotationTypes} />
          </DocBlock>

          <DocBlock heading="Work performed">
            <ol className="hairline bg-canvas">
              {d.workPerformed.map((w, i) => (
                <li
                  key={w}
                  className={`grid grid-cols-[48px_1fr] items-baseline gap-4 px-4 py-2.5 ${
                    i < d.workPerformed.length - 1 ? "hairline-b" : ""
                  }`}
                >
                  <span className="font-mono text-[10px] text-text-3 tabular">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-[13.5px] text-text-2 leading-[1.6]">{w}</span>
                </li>
              ))}
            </ol>
          </DocBlock>

          <DocBlock heading="Skills demonstrated">
            <ul className="flex items-center gap-2 flex-wrap">
              {d.skills.map((s) => (
                <li
                  key={s}
                  className="hairline px-2 py-[2px] font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </DocBlock>

          <DocBlock heading="Tags">
            <ul className="flex items-center gap-2 flex-wrap">
              {d.tags.map((t) => (
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
        prev={prev ? { title: prev.name, href: `/research/datasets/${prev.slug}`, kicker: "DAT" } : null}
        next={next ? { title: next.name, href: `/research/datasets/${next.slug}`, kicker: "DAT" } : null}
      />
    </SectionShell>
  );
}

function KVList({ items }: { items: string[] }) {
  return (
    <ul className="hairline bg-canvas">
      {items.map((v, i) => (
        <li
          key={v}
          className={`px-4 py-2.5 font-mono text-[12.5px] text-text-2 tabular ${
            i < items.length - 1 ? "hairline-b" : ""
          }`}
        >
          {v}
        </li>
      ))}
    </ul>
  );
}
