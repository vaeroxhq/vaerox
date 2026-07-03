import { createFileRoute, Link } from "@tanstack/react-router";
import { BENCHMARKS, type Benchmark } from "@/lib/benchmarks-data";
import { PageHeader, SectionShell, StageDot } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

export const Route = createFileRoute("/benchmarks/")({
  head: () => ({
    meta: [
      { title: "Engineering Validation & Benchmarks — Vaerox" },
      {
        name: "description",
        content:
          "Architecture validation, prototype benchmarks, and implementation measurements from the Vaerox Engineering Studio. Every record is either measured on a defined workload, reproducible, or explicitly marked as a design target.",
      },
      { property: "og:title", content: "Engineering Validation & Benchmarks — Vaerox" },
      {
        property: "og:description",
        content:
          "Prototype benchmarks and architecture validation — every record is measured, reproducible, or a stated design target.",
      },
    ],
  }),
  component: ValidationPage,
});

function ValidationPage() {
  const measured = BENCHMARKS.filter((b) => b.status === "Prototype measured").length;
  const targets = BENCHMARKS.filter(
    (b) => b.status === "Target" || b.status === "Not yet measured",
  ).length;
  const inProgress = BENCHMARKS.filter((b) => b.status === "In progress").length;

  return (
    <SectionShell>
      <Breadcrumbs
        items={[{ label: "Vaerox", to: "/" }, { label: "Engineering Validation & Benchmarks" }]}
      />
      <PageHeader
        section="§ · Engineering Validation & Benchmarks"
        title="What has been measured, and what is still a design target."
        summary="Prototype benchmarks, architecture validation, and reproducible measurements collected while building the systems inside the VÆRØX Engineering Studio. Every record cites its workload, hardware, and dataset — or is explicitly marked as a design target."
        meta={[
          { label: "Records", value: BENCHMARKS.length.toString().padStart(2, "0") },
          { label: "Prototype measured", value: measured.toString() },
          { label: "In progress", value: inProgress.toString() },
          { label: "Targets only", value: targets.toString() },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 hairline">
        {BENCHMARKS.map((b) => (
          <Link
            key={b.slug}
            to="/benchmarks/$slug"
            params={{ slug: b.slug }}
            className="group card-hover hover:card-hover-on bg-canvas p-5 flex flex-col"
          >
            <header className="flex items-baseline justify-between">
              <span className="text-overline text-text-3">{b.code}</span>
              <StatusChip status={b.status} />
            </header>
            <h3 className="mt-3 text-heading-m">{b.title}</h3>
            <p className="mt-2 text-body-s text-text-3">{b.focus}</p>

            <dl className="mt-5 hairline-t pt-4 grid grid-cols-2 gap-4">
              <KV k="Phase" v={b.phase} />
              <KV k="System" v={b.system} />
              <div className="col-span-2">
                <dt className="text-metadata text-text-3 opacity-70">Design goal</dt>
                <dd className="mt-1 text-body-s text-text-2 leading-[1.55]">{b.goal}</dd>
              </div>
            </dl>

            <div className="mt-4 pt-4 hairline-t flex items-center justify-between">
              <span className="text-overline text-text-3">Updated {b.updated}</span>
              <span className="text-metadata text-text-3">→</span>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-metadata text-text-3 opacity-70">{k}</dt>
      <dd className="mt-1 text-label text-text-1 tabular">{v}</dd>
    </div>
  );
}

function StatusChip({ status }: { status: Benchmark["status"] }) {
  const tone =
    status === "Prototype measured"
      ? ("info" as const)
      : status === "In progress"
        ? ("warning" as const)
        : status === "Target"
          ? ("muted" as const)
          : ("muted" as const);
  return (
    <span className="inline-flex items-center gap-1.5">
      <StageDot tone={tone} />
      <span className="text-overline text-text-3">{status}</span>
    </span>
  );
}
