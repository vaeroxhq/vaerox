import { PROJECTS, type Project, type ProjectStatus } from "@/lib/home-data";

/**
 * Featured Systems — monochrome cards, hairline borders, mono metadata.
 * Data-shape mirrors the future content pipeline; swap in a loader later.
 */
export function ProjectGrid() {
  return (
    <section className="mt-10 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-1 hairline">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { index, name, description, status, stack, updated } = project;
  return (
    <article className="group bg-canvas px-5 pt-5 pb-4 transition-ui hover:bg-surface relative flex flex-col">
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

      <h3 className="font-display text-[22px] mt-6 tracking-[-0.022em]">{name}</h3>
      <p className="mt-2 text-[13px] text-text-2 leading-[1.55]">{description}</p>

      <dl className="mt-6 pt-4 hairline-t grid grid-cols-2 gap-y-2 gap-x-4">
        <Meta label="Stack" value={stack.join(" · ")} className="col-span-2" />
        <Meta label="Updated" value={updated} />
        <Meta label="Status" value={status} />
      </dl>

      <div className="mt-6 pt-4 hairline-t flex items-center justify-between">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
          Case study
        </span>
        <a
          href={`/projects#${project.slug}`}
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] transition-micro hover:text-text-1"
        >
          View →
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
        : "text-info";
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
      <dt className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </dt>
      <dd className="font-mono text-[11px] text-text-2 tabular truncate">{value}</dd>
    </div>
  );
}
