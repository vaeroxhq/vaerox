import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PROJECTS } from "@/lib/projects-data";
import { PageHeader, SectionShell, StageDot } from "@/components/section/section-bits";

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
      <PageHeader
        section="§ · Projects"
        title="Project not found."
        summary="No project matches that identifier."
      />
      <Link
        to="/projects"
        className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1"
      >
        ← Back to projects
      </Link>
    </SectionShell>
  ),
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  const tone =
    p.stage === "Production"
      ? ("success" as const)
      : p.stage === "Prototype"
        ? ("warning" as const)
        : p.stage === "Research"
          ? ("info" as const)
          : ("muted" as const);

  return (
    <SectionShell>
      <PageHeader
        section={`§ · Projects / ${p.slug}`}
        title={p.name}
        summary={p.description}
        meta={[
          { label: "Stage", value: p.stage },
          { label: "Started", value: p.started },
          { label: "Updated", value: p.updated },
          { label: "Timeline", value: p.timeline },
        ]}
      />

      <div className="mt-4 hairline bg-canvas p-6">
        <div className="flex items-center gap-3 mb-4">
          <StageDot tone={tone} />
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
            Role
          </span>
        </div>
        <p className="text-[15px] text-text-2 leading-[1.7] max-w-[720px]">{p.role}</p>

        <div className="hairline-t mt-8 pt-6">
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
            Architecture
          </div>
          <div className="mt-2 font-mono text-[13px] text-text-1 tabular">{p.architecture}</div>
        </div>

        <div className="hairline-t mt-6 pt-6">
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
            Stack
          </div>
          <div className="mt-2 font-mono text-[13px] text-text-1 tabular">{p.stack.join(" · ")}</div>
        </div>

        <div className="hairline-t mt-6 pt-6">
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
            Outcome
          </div>
          <p className="mt-2 text-[14px] text-text-2 leading-[1.65] max-w-[720px]">{p.outcome}</p>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/projects"
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1"
        >
          ← Back to projects
        </Link>
      </div>
    </SectionShell>
  );
}
