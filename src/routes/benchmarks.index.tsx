import { createFileRoute, Link } from "@tanstack/react-router";
import { BENCHMARKS, type Benchmark } from "@/lib/benchmarks-data";
import { PageHeader, SectionShell, StageDot } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

export const Route = createFileRoute("/benchmarks/")({
  head: () => ({
    meta: [
      { title: "Engineering Validation — VÆRØX" },
      {
        name: "description",
        content:
          "Experimental results, architecture validation, and implementation notes collected while building the systems inside the VÆRØX Engineering Lab. Every record is either measured, reproducible, or explicitly marked as a design target.",
      },
      { property: "og:title", content: "Engineering Validation — VÆRØX" },
      {
        property: "og:description",
        content:
          "Architecture validation, prototype measurements and stated design targets — no fabricated production metrics.",
      },
    ],
  }),
  component: ValidationPage,
});

function ValidationPage() {
  const measured = BENCHMARKS.filter((b) => b.status === "Prototype measured").length;
  const targets = BENCHMARKS.filter((b) => b.status === "Target" || b.status === "Not yet measured").length;
  const inProgress = BENCHMARKS.filter((b) => b.status === "In progress").length;

  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Engineering Validation" }]} />
      <PageHeader
        section="§ · Engineering Validation"
        title="What has actually been measured, and what is still a design target."
        summary="Experimental results, architecture validation, implementation notes and reproducible measurements collected while building the systems inside the VÆRØX Engineering Lab. Nothing on this page implies operating production infrastructure — every record is either measured on a defined workload, a stated design target, or explicitly marked ‘not yet measured’."
        meta={[
          { label: "Records",           value: BENCHMARKS.length.toString().padStart(2, "0") },
          { label: "Prototype measured", value: measured.toString() },
          { label: "In progress",       value: inProgress.toString() },
          { label: "Targets only",      value: targets.toString() },
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
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{b.code}</span>
              <StatusChip status={b.status} />
            </header>
            <h3 className="mt-3 font-display text-[19px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.015em]">
              {b.title}
            </h3>
            <p className="mt-2 text-[13px] text-text-3">{b.focus}</p>

            <dl className="mt-5 hairline-t pt-4 grid grid-cols-2 gap-4">
              <KV k="Phase" v={b.phase} />
              <KV k="System" v={b.system} />
              <div className="col-span-2">
                <dt className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.18em] opacity-70">Design goal</dt>
                <dd className="mt-1 text-[13px] text-text-2 leading-[1.55]">{b.goal}</dd>
              </div>
            </dl>

            <div className="mt-4 pt-4 hairline-t flex items-center justify-between">
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Updated {b.updated}</span>
              <span className="font-mono text-[10px] text-text-3 tabular">→</span>
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
      <dt className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.18em] opacity-70">{k}</dt>
      <dd className="mt-1 font-mono text-[12px] text-text-1 tabular">{v}</dd>
    </div>
  );
}

function StatusChip({ status }: { status: Benchmark["status"] }) {
  const tone =
    status === "Prototype measured" ? ("info" as const)
    : status === "In progress"      ? ("warning" as const)
    : status === "Target"           ? ("muted" as const)
    :                                  ("muted" as const);
  return (
    <span className="inline-flex items-center gap-1.5">
      <StageDot tone={tone} />
      <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{status}</span>
    </span>
  );
}
