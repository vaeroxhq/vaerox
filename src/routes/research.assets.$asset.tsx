import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DATASETS, findDataset, NYD, type Dataset } from "@/lib/datasets-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { RelatedRail } from "@/components/doc/related-rail";
import { PrevNext } from "@/components/doc/prev-next";

export const Route = createFileRoute("/research/assets/$asset")({
  head: ({ params }) => {
    const d = findDataset(params.asset);
    const title = d ? `${d.name} — Research Assets — VÆRØX` : "Research Asset — VÆRØX";
    const description = d?.overview ?? d?.purpose ?? "Research asset.";
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
    const dataset = findDataset(params.asset);
    if (!dataset) throw notFound();
    return { dataset };
  },
  component: AssetDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader
        section="§ · Research / Assets"
        title="Asset not found."
        summary="No research asset matches that identifier."
      />
      <Link
        to="/research/assets"
        className="text-label text-text-2 uppercase tracking-[0.14em] hover:text-text-1"
      >
        ← Back to research assets
      </Link>
    </SectionShell>
  ),
});

function AssetDetail() {
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
          { label: "Assets", to: "/research/assets" },
          { label: d.category },
        ]}
      />

      <PageHeader
        section={`§ · Research / Assets / ${d.category}`}
        title={d.name}
        summary={d.overview}
        meta={[
          { label: "Domain", value: d.domain },
          { label: "Task", value: d.tasks[0] },
          { label: "Status", value: d.status },
          { label: "Updated", value: d.updated },
        ]}
      />

      <DocShell rail={<RelatedRail kind="dataset" id={d.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Overview">
            <p className="text-body-m text-text-2">{d.overview}</p>
          </DocBlock>

          <DocBlock heading="Engineering metadata">
            <MetaGrid
              items={[
                { label: "Domain", value: d.domain },
                { label: "Task", value: d.tasks.join(" · ") },
                { label: "Source", value: d.source },
                { label: "Size", value: d.size ?? NYD },
                { label: "Research status", value: d.status },
                { label: "Current stage", value: d.currentStage },
                { label: "Difficulty", value: d.difficulty },
                { label: "Category", value: d.category },
                { label: "Updated", value: d.updated },
              ]}
            />
          </DocBlock>

          <DocBlock heading="Purpose">
            <p className="text-body-m text-text-2">{d.purpose}</p>
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
                  <span className="text-metadata text-text-3">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-body-s text-text-2">{w}</span>
                </li>
              ))}
            </ol>
          </DocBlock>

          <DocBlock heading="Skills demonstrated">
            <ChipList items={d.skills} />
          </DocBlock>

          <DocBlock heading="Engineering notes">
            <p className="text-body-m text-text-2">{d.engineeringNotes}</p>
          </DocBlock>

          <DocBlock heading="Research notes">
            {d.researchNotes.length > 0 ? <KVList items={d.researchNotes} /> : <NotDocumented />}
          </DocBlock>

          <DocBlock heading="Related technologies">
            {d.relatedTechnologies.length > 0 ? (
              <ChipList items={d.relatedTechnologies} />
            ) : (
              <NotDocumented />
            )}
          </DocBlock>

          <DocBlock heading="Related papers">
            {d.relatedPapers.length > 0 && d.relatedPapers.some((p) => p !== NYD) ? (
              <KVList items={d.relatedPapers} />
            ) : (
              <NotDocumented />
            )}
          </DocBlock>

          <DocBlock heading="Future work">
            {d.futureWork.length > 0 ? (
              <ol className="hairline bg-canvas">
                {d.futureWork.map((w, i) => (
                  <li
                    key={w}
                    className={`grid grid-cols-[48px_1fr] items-baseline gap-4 px-4 py-2.5 ${
                      i < d.futureWork.length - 1 ? "hairline-b" : ""
                    }`}
                  >
                    <span className="text-metadata text-text-3">
                      →{(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-body-s text-text-2">{w}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <NotDocumented />
            )}
          </DocBlock>

          <DocBlock heading="Tags">
            <ChipList items={d.tags} />
          </DocBlock>
        </article>
      </DocShell>

      <PrevNext
        prev={
          prev ? { title: prev.name, href: `/research/assets/${prev.slug}`, kicker: "AST" } : null
        }
        next={
          next ? { title: next.name, href: `/research/assets/${next.slug}`, kicker: "AST" } : null
        }
      />
    </SectionShell>
  );
}

function KVList({ items }: { items: string[] }) {
  return (
    <ul className="hairline bg-canvas">
      {items.map((v, i) => (
        <li
          key={v + i}
          className={`px-4 py-2.5 font-mono text-caption text-text-2 tabular-nums ${
            i < items.length - 1 ? "hairline-b" : ""
          }`}
        >
          {v}
        </li>
      ))}
    </ul>
  );
}

function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="flex items-center gap-2 flex-wrap">
      {items.map((s) => (
        <li key={s} className="hairline px-2 py-[2px] text-overline text-text-3">
          {s}
        </li>
      ))}
    </ul>
  );
}

function MetaGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="hairline bg-canvas grid grid-cols-1 md:grid-cols-2">
      {items.map((it, i) => (
        <div
          key={it.label}
          className={`grid grid-cols-[140px_1fr] gap-4 px-4 py-2.5 ${
            i < items.length - 1 ? "hairline-b" : ""
          }`}
        >
          <dt className="text-overline text-text-3 opacity-70 self-center">{it.label}</dt>
          <dd className="font-mono text-caption text-text-2 tabular-nums">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function NotDocumented() {
  return <p className="text-label text-text-3 uppercase tracking-[0.14em]">{NYD}</p>;
}
