import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  FUTURE_SYSTEMS,
  findFutureSystem,
  type FutureSystem,
  type Milestone,
} from "@/lib/future-systems-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { RelatedRail } from "@/components/doc/related-rail";
import { PrevNext } from "@/components/doc/prev-next";

export const Route = createFileRoute("/systems/future/$slug")({
  head: ({ params }) => {
    const f = findFutureSystem(params.slug);
    const title = f ? `${f.name} — Future Systems — VÆRØX` : "Future System — VÆRØX";
    const description = f?.description ?? "Future system on the VÆRØX roadmap.";
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
    const future = findFutureSystem(params.slug);
    if (!future) throw notFound();
    return { future };
  },
  component: FutureDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader
        section="§ · Systems / Future"
        title="Future system not found."
        summary="No planned system matches that identifier."
      />
      <Link
        to="/systems/future"
        className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1"
      >
        ← Back to future systems
      </Link>
    </SectionShell>
  ),
});

function FutureDetail() {
  const { future: f } = Route.useLoaderData() as { future: FutureSystem };
  const sorted = [...FUTURE_SYSTEMS].sort((a, b) => b.updated.localeCompare(a.updated));
  const idx = sorted.findIndex((x) => x.slug === f.slug);
  const prev = sorted[idx + 1];
  const next = sorted[idx - 1];

  return (
    <SectionShell>
      <Breadcrumbs
        items={[
          { label: "VÆRØX", to: "/" },
          { label: "Systems", to: "/systems" },
          { label: "Future", to: "/systems/future" },
          { label: f.name },
        ]}
      />

      <PageHeader
        section={`§ · Systems / Future / ${f.category}`}
        title={f.name}
        summary={f.description}
        meta={[
          { label: "Status",   value: f.status },
          { label: "Category", value: f.category },
          { label: "Progress", value: `${f.progress.toString().padStart(2, "0")}%` },
          { label: "Updated",  value: f.updated },
        ]}
      />

      <DocShell rail={<RelatedRail kind="future" id={f.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Progress">
            <ProgressStrip value={f.progress} status={f.status} />
          </DocBlock>

          <DocBlock heading="Vision">
            <p className="text-[15px] text-text-2 leading-[1.75]">{f.vision}</p>
          </DocBlock>

          <DocBlock heading="Motivation">
            <p className="text-[15px] text-text-2 leading-[1.75]">{f.motivation}</p>
          </DocBlock>

          <DocBlock heading="Future features">
            <KVList items={f.futureFeatures} />
          </DocBlock>

          <DocBlock heading="Planned technology stack">
            <ChipList items={f.plannedStack} />
          </DocBlock>

          <DocBlock heading="Architecture (placeholder)">
            <div className="hairline bg-canvas p-5">
              <p className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] mb-3 opacity-70">
                Diagram — not yet drawn
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0">
                {f.architectureSketch.map((s, i) => (
                  <li
                    key={s}
                    className={`grid grid-cols-[32px_1fr] items-baseline gap-3 py-2 ${
                      i < f.architectureSketch.length - 1 ? "hairline-b md:border-b-0" : ""
                    }`}
                  >
                    <span className="font-mono text-[10px] text-text-3 tabular">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-[13.5px] text-text-2 leading-[1.55]">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </DocBlock>

          <DocBlock heading="Future milestones">
            <ol className="hairline bg-canvas">
              {f.milestones.map((m, i) => (
                <li
                  key={m.label}
                  className={`grid grid-cols-[80px_20px_1fr] items-baseline gap-3 px-4 py-2.5 ${
                    i < f.milestones.length - 1 ? "hairline-b" : ""
                  }`}
                >
                  <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
                    {milestoneLabel(m)}
                  </span>
                  <span aria-hidden className="font-mono text-[10px] text-text-3 opacity-60">
                    {milestoneGlyph(m)}
                  </span>
                  <span className="text-[13.5px] text-text-2 leading-[1.55]">{m.label}</span>
                </li>
              ))}
            </ol>
          </DocBlock>

          {(f.relatedSystems.length + f.relatedProjects.length + f.relatedDatasets.length) > 0 && (
            <DocBlock heading="Related existing systems">
              <KVList
                items={[
                  ...f.relatedSystems.map((s) => `System · ${s}`),
                  ...f.relatedProjects.map((p) => `Project · ${p}`),
                  ...f.relatedDatasets.map((d) => `Dataset · ${d}`),
                ]}
              />
            </DocBlock>
          )}

          <DocBlock heading="Tags">
            <ChipList items={f.tags} />
          </DocBlock>
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.name, href: `/systems/future/${prev.slug}`, kicker: "FUT" } : null}
        next={next ? { title: next.name, href: `/systems/future/${next.slug}`, kicker: "FUT" } : null}
      />
    </SectionShell>
  );
}

function ProgressStrip({ value, status }: { value: number; status: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="hairline bg-canvas p-4">
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          {status}
        </span>
        <span className="font-mono text-[11px] text-text-2 tabular">
          {v.toString().padStart(2, "0")}%
        </span>
      </div>
      <div className="relative h-[6px] hairline bg-canvas overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[var(--text-2)]"
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}

function milestoneLabel(m: Milestone) {
  return m.status === "done"
    ? "Done"
    : m.status === "current"
      ? "In progress"
      : m.status === "next"
        ? "Next"
        : "Later";
}

function milestoneGlyph(m: Milestone) {
  return m.status === "done" ? "■" : m.status === "current" ? "◆" : m.status === "next" ? "▲" : "·";
}

function KVList({ items }: { items: string[] }) {
  return (
    <ul className="hairline bg-canvas">
      {items.map((v, i) => (
        <li
          key={v + i}
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

function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="flex items-center gap-2 flex-wrap">
      {items.map((s) => (
        <li
          key={s}
          className="hairline px-2 py-[2px] font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}
