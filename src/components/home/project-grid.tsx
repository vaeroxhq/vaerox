import { PROJECTS, type Project, type ProjectStatus } from "@/lib/home-data";
import { OpsTag } from "@/components/ops/ops-tag";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/**
 * Featured Systems — monochrome cards, hairline borders, mono metadata.
 *
 * Desktop Layout: Locked to 3 columns (grid-cols-3) on all desktops (1024px+)
 * This maintains visual composition across all desktop resolutions.
 * Tablet (640-1023px): 2 columns
 * Mobile (<640px): 1 column
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
    <section ref={ref} className="relative">
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
    <article className="group animate-card-hover-elevation card-hover hover:card-hover-on bg-canvas px-4 py-4 relative flex flex-col cursor-pointer">
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 h-3 w-3 border-t border-r border-line-2"
      />

      <header className="flex items-baseline justify-between">
        <span className="text-label text-text-3 tabular">{index}</span>
        <StatusPill status={status} />
      </header>

      <div className="hairline-t mt-4" />

      <h3 className="text-heading-s mt-4 text-text-2 transition-micro group-hover:text-text-1">
        {name}
      </h3>
      <p className="mt-2 text-body-s text-text-2">{description}</p>

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
        <span className="text-overline text-text-3">Case study</span>
        <a
          href={`/projects/${project.slug}`}
          className="text-button text-text-2 transition-micro group-hover:text-text-1 active:opacity-50"
        >
          <span className="inline-block transition-transform transition-ui group-hover:translate-x-[3px]">
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
    <span className="inline-flex items-center gap-2 text-overline text-text-3">
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
      <dt className="text-overline text-text-3">{label}</dt>
      <dd className="text-label text-text-2 tabular truncate">{value}</dd>
    </div>
  );
}
