import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PROJECTS } from "@/lib/projects-data";

import { getDossier } from "@/lib/dossiers-data";
import { getDossierExtras } from "@/lib/dossier-extras";
import { ADRS, DIAGRAMS } from "@/lib/architecture-data";
import { JOURNAL } from "@/lib/journal-data";
import { RESEARCH } from "@/lib/research-data";
import { APIS } from "@/lib/apis-data";
import { BENCHMARKS } from "@/lib/benchmarks-data";
import { PageHeader, SectionShell, StageDot } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { RelatedRail } from "@/components/doc/related-rail";
import { DocShell } from "@/components/doc/doc-shell";
import { PrevNext } from "@/components/doc/prev-next";
import {
  ExecutiveSummary,
  ProblemStatement,
  SystemArchitecture,
  TechnicalStack,
  EngineeringDecisions,
  DevelopmentTimeline,
  ValidationSection,
  DocumentationSection,
  FutureWorkSection,
  PhaseChecklist,
  ProjectLinksStrip,
  EngineeringMetrics,
  ChallengesLessons,
} from "@/components/doc/dossier-blocks";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const p = PROJECTS.find((x) => x.slug === params.slug);
    const title = p ? `${p.name} — Engineering Dossier — VÆRØX` : "Project — VÆRØX";
    const description = p?.description ?? "Project engineering dossier.";
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
  const dossier = getDossier(p.slug);
  const extras = getDossierExtras(p.slug);
  

  const tone =
    p.stage === "Production" ? ("success" as const)
    : p.stage === "Prototype" ? ("warning" as const)
    : p.stage === "Research" ? ("info" as const)
    : ("muted" as const);

  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const prev = PROJECTS[idx - 1];
  const next = PROJECTS[idx + 1];

  // Auto-resolve cross-links from other data sources
  const adrs = ADRS.filter((a) => a.systems.includes(p.slug));
  const diagrams = DIAGRAMS.filter((d) => d.systems.includes(p.slug));
  const journal = JOURNAL.filter((j) => j.tags.includes(p.slug));
  const research = RESEARCH.filter((r) => r.tags.includes(p.slug));
  const apis = APIS.filter((a) => a.system === p.slug);
  const validations = BENCHMARKS.filter((b) => b.system === p.slug);

  const docGroups = [
    { heading: "Architecture Decision Records", items: adrs.map((a) => ({ label: a.title, to: `/architecture/${a.slug}` })) },
    { heading: "Architecture diagrams", items: diagrams.map((d) => ({ label: d.title, to: `/architecture/diagrams/${d.slug}` })) },
    { heading: "Related journal entries", items: journal.map((j) => ({ label: j.title, to: `/journal/${j.slug}` })) },
    { heading: "Related research", items: research.map((r) => ({ label: r.title, to: `/research/${r.slug}` })) },
    { heading: "Related APIs", items: apis.map((a) => ({ label: a.name, to: `/api/${a.slug}` })) },
    { heading: "Engineering validation", items: validations.map((b) => ({ label: b.title, to: `/benchmarks/${b.slug}` })) },
  ];

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
          { label: "Stage",    value: dossier?.timeline.currentPhase ?? p.stage },
          { label: "Started",  value: p.started },
          { label: "Updated",  value: p.updated },
          { label: "Timeline", value: p.timeline },
        ]}
      />

      <div className="mb-6 flex items-center gap-3">
        <StageDot tone={tone} />
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          {dossier?.timeline.currentPhase ?? p.stage}
        </span>
      </div>

      {dossier && (
        <div className="grid grid-cols-1 gap-4 mb-8">
          <PhaseChecklist progress={dossier.progress} />
          <EngineeringMetrics dossier={dossier} extras={extras} updated={p.updated} />
          <ProjectLinksStrip links={dossier.links} />
        </div>
      )}

      <DocShell rail={<RelatedRail kind="project" id={p.slug} />}>
        <article className="max-w-[820px]">
          {dossier ? (
            <>
              <ExecutiveSummary s={dossier.summary} />
              <ProblemStatement p={dossier.problem} />
              <SystemArchitecture a={dossier.architecture} />
              <TechnicalStack s={dossier.stack} />
              <EngineeringDecisions items={dossier.decisions} />
              <DevelopmentTimeline t={dossier.timeline} />
              <ValidationSection v={dossier.validation} />
              <DocumentationSection groups={docGroups} />
              <FutureWorkSection items={dossier.future} />
              <ChallengesLessons extras={extras} />
            </>
          ) : (
            <p className="text-text-2 text-[14px]">Engineering dossier is being drafted for this project.</p>
          )}
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.name, href: `/projects/${prev.slug}`, kicker: "PRJ" } : null}
        next={next ? { title: next.name, href: `/projects/${next.slug}`, kicker: "PRJ" } : null}
      />
    </SectionShell>
  );
}
