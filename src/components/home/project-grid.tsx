import { PROJECTS, type Project, type ProjectStatus } from "@/lib/home-data";
import { OpsTag } from "@/components/ops/ops-tag";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/**
 * Featured Systems — monochrome cards, hairline borders, mono metadata.
 *
 * Animation: On hover:
 * - Lift 2px (translateY: 0 → -2px)
 * - Border brightens (opacity change)
 * - Background changes slightly
 * - Arrow moves 3px right (translateX: 0 → 3px)
 * Duration: 200ms, easing: ease-out
 *
 * Scroll reveal: Fades and slides up when scrolled into view (once only)
 */
export function ProjectGrid() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="mt-10 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-1 hairline">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const {
    index,
    name,
    description,
    status,
    stack,
    updated,
    owner,
    runtime,
    language,
    repository,
    adr,
    p95,
    availability,
    nodes,
    commits,
    lastDeploy,
    tags,
  } = project;

  return (
    <article className="group card-hover hover:card-hover-on bg-canvas px-4 py-4 relative flex flex-col transition-all duration-200 ease-out hover:translate-y-[-2px]">
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 h-3 w-3 border-t border-r border-line-2"
      />

      <header className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] tabular">
          {index}
        </span>
        <StatusPill status={status} />
      </header>

      <div className="hairline-t mt-4" />

      <h3 className="font-display font-medium text-[17px] mt-4 tracking-[-0.022em] text-text-2 transition-micro group-hover:text-text-1">
        {name}
      </h3>
      <p className="mt-2 text-[13px] text-text-2 leading-[1.55]">{description}</p>

      {/* Engineering metadata rail */}
      <dl className="mt-6 pt-4 hairline-t grid grid-cols-2 gap-y-2 gap-x-4">
        <Meta label="Owner" value={owner} />
        <Meta label="ADR" value={`·${adr}`} />
        <Meta label="Runtime" value={runtime} />
        <Meta label="Language" value={language} />
        <Meta label="P95" value={p95} />
        <Meta label="Availability" value={availability} />
        <Meta label="Nodes" value={nodes.toLocaleString()} />
        <Meta label="Commits" value={commits.toLocaleString()} />
        <Meta label="Repo" value={repository} />
        <Meta label="Last deploy" value={lastDeploy} />
        <Meta label="Stack" value={stack.join(" · ")} className="col-span-2" />
        <Meta label="Updated" value={updated} className="col-span-2" />
      </dl>

      {tags.length > 0 && (
        <div className="mt-4 pt-4 hairline-t flex flex-wrap gap-x-4 gap-y-2">
          {tags.map((t) => (
            <OpsTag key={t} label={t} />
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 hairline-t flex items-center justify-between">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          Case study
        </span>
        <a
          href={`/projects/${project.slug}`}
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] transition-micro group-hover:text-text-1 active:opacity-50"
        >
          <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]">
            View →
          </span>
        </a>
      </div>
    </article>
  );
}

function StatusPill({ status }: { status: ProjectStatus }) {
  const tone =
    status === "Production"
      ? "text-success"
      : status === "Prototype"
        ? "text-warning"
        : status === "Research"
          ? "text-info"
          : "text-text-3";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
      <span className={`dot ${tone}`} aria-hidden="true" />
      {status}
    </span>
  );
}

function Meta({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline justify-between gap-3 ${className}`}>
      <dt className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{label}</dt>
      <dd className="font-mono text-[11px] text-text-2 tabular truncate">{value}</dd>
    </div>
  );
}
