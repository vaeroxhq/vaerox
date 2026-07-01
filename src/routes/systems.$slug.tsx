import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SYSTEMS } from "@/lib/systems-data";
import { PageHeader, SectionShell, StageDot } from "@/components/section/section-bits";

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
      <PageHeader
        section="§ · Systems"
        title="System not found."
        summary="No system matches that identifier."
      />
      <Link
        to="/systems"
        className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1"
      >
        ← Back to registry
      </Link>
    </SectionShell>
  ),
});

function SystemDetail() {
  const { system: s } = Route.useLoaderData();
  const tone =
    s.stage === "Production"
      ? ("success" as const)
      : s.stage === "Prototype"
        ? ("warning" as const)
        : s.stage === "Research"
          ? ("info" as const)
          : ("muted" as const);

  return (
    <SectionShell>
      <PageHeader
        section={`§ · Systems / ${s.slug}`}
        title={s.name}
        summary={s.summary}
        meta={[
          { label: "Owner", value: s.owner },
          { label: "Stage", value: s.stage },
          { label: "Health", value: s.health },
          { label: "Last Deploy", value: s.lastDeploy },
        ]}
      />

      <div className="mt-4 hairline bg-canvas p-6">
        <div className="flex items-center gap-3 mb-4">
          <StageDot tone={tone} />
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
            Purpose
          </span>
        </div>
        <p className="text-[15px] text-text-2 leading-[1.7] max-w-[720px]">{s.purpose}</p>

        <div className="hairline-t mt-8 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetaBlock label="Stack" value={s.stack.join(" · ")} />
          <MetaBlock label="Docs" value={s.docsPath} />
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/systems"
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1"
        >
          ← Back to registry
        </Link>
      </div>
    </SectionShell>
  );
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </div>
      <div className="mt-2 font-mono text-[13px] text-text-1 tabular">{value}</div>
    </div>
  );
}
