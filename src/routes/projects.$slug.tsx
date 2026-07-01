import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PROJECTS } from "@/lib/projects-data";
import { SYSTEMS } from "@/lib/systems-data";
import { getProjectEvidence } from "@/lib/evidence-data";
import { PageHeader, SectionShell, StageDot } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { RelatedRail } from "@/components/doc/related-rail";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { PrevNext } from "@/components/doc/prev-next";
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

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const p = PROJECTS.find((x) => x.slug === params.slug);
    const title = p ? `${p.name} — Projects — VÆRØX` : "Project — VÆRØX";
    const description = p?.description ?? "Project case study.";
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
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader section="§ · Projects" title="Project not found." summary="No project matches that identifier." />
      <Link to="/projects" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1">← Back to projects</Link>
    </SectionShell>
  ),
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  const ev = getProjectEvidence(p.slug);
  const linkedSystem = ev?.linkedSystem
    ? SYSTEMS.find((s) => s.slug === ev.linkedSystem)
    : undefined;

  const tone =
    p.stage === "Production" ? ("success" as const)
    : p.stage === "Prototype" ? ("warning" as const)
    : p.stage === "Research" ? ("info" as const)
    : ("muted" as const);

  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const prev = PROJECTS[idx - 1];
  const next = PROJECTS[idx + 1];

  const engineeringMetrics = ev
    ? [
        { label: "LOC", value: ev.loc.toLocaleString() },
        { label: "Primary language", value: ev.languages[0]?.name ?? "—" },
        { label: "ADRs referenced", value: String(ev.adrRefs.length) },
        { label: "Benchmarks", value: String(ev.benchmarkRefs.length) },
        { label: "Incidents linked", value: String(ev.incidentRefs.length) },
        { label: "Design revisions", value: String(ev.evolution.length) },
      ]
    : [];

  return (
    <SectionShell>
      <Breadcrumbs items={[
        { label: "VÆRØX", to: "/" },
        { label: "Projects", to: "/projects" },
        { label: p.name },
      ]} />

      <PageHeader
        section={`§ · Projects / ${p.slug}`}
        title={p.name}
        summary={p.description}
        meta={[
          { label: "Stage",    value: p.stage },
          { label: "Started",  value: p.started },
          { label: "Updated",  value: p.updated },
          { label: "Timeline", value: p.timeline },
        ]}
      />

      <div className="mb-6 flex items-center gap-3">
        <StageDot tone={tone} />
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{p.stage}</span>
        {linkedSystem && (
          <>
            <span className="font-mono text-[10px] text-text-3 opacity-60">·</span>
            <Link
              to="/systems/$slug"
              params={{ slug: linkedSystem.slug }}
              className="font-mono text-[10px] text-text-2 hover:text-text-1 uppercase tracking-[0.14em] transition-micro"
            >
              Runs as system · {linkedSystem.name}
            </Link>
          </>
        )}
      </div>

      <DocShell rail={<RelatedRail kind="project" id={p.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Role">
            <p className="text-[15px] text-text-2 leading-[1.7]">{p.role}</p>
          </DocBlock>

          <DocBlock heading="Architecture">
            <p className="text-[15px] text-text-2 leading-[1.7] font-mono text-[13px] tabular">{p.architecture}</p>
          </DocBlock>

          <DocBlock heading="Stack">
            <ul className="grid grid-cols-2 gap-px bg-line-1 hairline">
              {p.stack.map((s: string) => (
                <li key={s} className="bg-canvas px-4 py-3 font-mono text-[12px] text-text-1 tabular">{s}</li>
              ))}
            </ul>
          </DocBlock>

          <DocBlock heading="Outcome">
            <p className="text-[15px] text-text-2 leading-[1.7]">{p.outcome}</p>
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
        prev={prev ? { title: prev.name, href: `/projects/${prev.slug}`, kicker: "PRJ" } : null}
        next={next ? { title: next.name, href: `/projects/${next.slug}`, kicker: "PRJ" } : null}
      />
    </SectionShell>
  );
}
