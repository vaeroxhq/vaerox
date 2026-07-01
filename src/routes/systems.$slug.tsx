import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SYSTEMS } from "@/lib/systems-data";
import { getSystemEvidence } from "@/lib/evidence-data";
import { PageHeader, SectionShell, StageDot } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { RelatedRail } from "@/components/doc/related-rail";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { PrevNext } from "@/components/doc/prev-next";
import { OpsTag } from "@/components/ops/ops-tag";
import {
  AdrRefsBlock,
  BenchmarkRefsBlock,
  EvolutionBlock,
  FailuresBlock,
  IncidentRefsBlock,
  LanguageBreakdown,
  LimitationsBlock,
  MetricsGrid,
  TradeoffsBlock,
} from "@/components/doc/evidence-blocks";

export const Route = createFileRoute("/systems/$slug")({
  head: ({ params }) => {
    const s = SYSTEMS.find((x) => x.slug === params.slug);
    const title = s ? `${s.name} — Systems — VÆRØX` : "System — VÆRØX";
    const description = s?.summary ?? "System documentation.";
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
    const system = SYSTEMS.find((s) => s.slug === params.slug);
    if (!system) throw notFound();
    return { system };
  },
  component: SystemDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader section="§ · Systems" title="System not found." summary="No system matches that identifier." />
      <Link to="/systems" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1">← Back to registry</Link>
    </SectionShell>
  ),
});

function SystemDetail() {
  const { system: s } = Route.useLoaderData();
  const ev = getSystemEvidence(s.slug);
  const tone =
    s.stage === "Production" ? ("success" as const)
    : s.stage === "Prototype" ? ("warning" as const)
    : s.stage === "Research" ? ("info" as const)
    : ("muted" as const);

  const idx = SYSTEMS.findIndex((x) => x.slug === s.slug);
  const prev = SYSTEMS[idx - 1];
  const next = SYSTEMS[idx + 1];

  const engineeringMetrics = ev
    ? [
        { label: "LOC", value: ev.loc.toLocaleString() },
        { label: "Files", value: ev.files.toLocaleString() },
        { label: "Repository age", value: `${ev.repoAgeMonths} months` },
        { label: "Architecture revisions", value: String(ev.architectureRevisions) },
        { label: "ADRs referenced", value: String(ev.adrRefs.length) },
        { label: "Benchmarks", value: String(ev.benchmarkRefs.length) },
        { label: "Dependencies", value: String(ev.dependencies) },
        { label: "Docs coverage", value: `${Math.round(ev.docsCoverage * 100)}%` },
      ]
    : [];

  return (
    <SectionShell>
      <Breadcrumbs items={[
        { label: "VÆRØX", to: "/" },
        { label: "Systems", to: "/systems" },
        { label: s.name },
      ]} />

      <PageHeader
        section={`§ · Systems / ${s.slug}`}
        title={s.name}
        summary={s.summary}
        meta={[
          { label: "Maintainer", value: "Mayank Sharma" },
          { label: "Stage",      value: s.stage },
          { label: "Primary",    value: s.stack[0] ?? "—" },
          { label: "Updated",    value: s.lastDeploy },
        ]}
      />

      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
        <StageDot tone={tone} />
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{s.stage}</span>
        <OpsTag label="DOCUMENTED" />
        <OpsTag label="VERSIONED" />
      </div>


      <DocShell rail={<RelatedRail kind="system" id={s.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Purpose">
            <p className="text-[15px] text-text-2 leading-[1.7]">{s.purpose}</p>
          </DocBlock>

          <DocBlock heading="Runtime & infrastructure">
            <div className="hairline bg-canvas">
              <KV k="Primary language" v={s.stack[0] ?? "—"} />
              {ev?.runtime && <KV k="Runtime" v={ev.runtime} />}
              {ev?.database && <KV k="Database" v={ev.database} />}
              {ev?.storage && <KV k="Storage" v={ev.storage} />}
              {ev?.queue && <KV k="Queue" v={ev.queue} />}
              <KV k="Docs path" v={s.docsPath} />
              <KV k="Repository" v={`vaerox/${s.slug}`} last />
            </div>
          </DocBlock>

          <DocBlock heading="Stack">
            <div className="hairline bg-canvas">
              {s.stack.map((t: string, i: number) => (
                <div key={t} className={`px-4 py-3 flex items-baseline justify-between ${i < s.stack.length - 1 ? "hairline-b" : ""}`}>
                  <span className="font-mono text-[12px] text-text-1 tabular">{t}</span>
                  <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">runtime · {i === 0 ? "primary" : "supporting"}</span>
                </div>
              ))}
            </div>
          </DocBlock>

          {ev && <LanguageBreakdown langs={ev.languages} />}

          {ev && <MetricsGrid columns={engineeringMetrics} extra={ev.additionalMetrics} />}

          {ev && <EvolutionBlock items={ev.evolution} />}

          {ev && <TradeoffsBlock items={ev.tradeoffs} />}

          {ev && <AdrRefsBlock slugs={ev.adrRefs} />}

          {ev && <BenchmarkRefsBlock slugs={ev.benchmarkRefs} />}

          {ev && <IncidentRefsBlock slugs={ev.incidentRefs} />}

          {ev && <FailuresBlock items={ev.failures} />}

          {ev && <LimitationsBlock items={ev.limitations} />}
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.name, href: `/systems/${prev.slug}`, kicker: "SYS" } : null}
        next={next ? { title: next.name, href: `/systems/${next.slug}`, kicker: "SYS" } : null}
      />
    </SectionShell>
  );
}

function KV({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <div className={`grid grid-cols-[160px_1fr] items-baseline gap-6 px-4 py-3 ${last ? "" : "hairline-b"}`}>
      <dt className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">{k}</dt>
      <dd className="font-mono text-[12px] text-text-1 tabular">{v}</dd>
    </div>
  );
}
