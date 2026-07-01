import { createFileRoute, Link } from "@tanstack/react-router";
import { BENCHMARKS, benchmarkFormatValue } from "@/lib/benchmarks-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

export const Route = createFileRoute("/benchmarks/")({
  head: () => ({
    meta: [
      { title: "Benchmarks — VÆRØX" },
      { name: "description", content: "Standing performance benchmarks. Every entry has a defined workload, hardware, methodology, and history." },
      { property: "og:title", content: "Benchmarks — VÆRØX" },
      { property: "og:description", content: "Standing performance benchmarks. Every entry has a defined workload, hardware, methodology, and history." },
    ],
  }),
  component: BenchmarksPage,
});

function BenchmarksPage() {
  const latest = BENCHMARKS.map((b) => b.updated).sort().at(-1) ?? "—";
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Benchmarks" }]} />
      <PageHeader
        section="§ · Benchmarks"
        title="Numbers with methodology attached."
        summary="Every benchmark on this page is a standing measurement, run on the cadence shown, against a defined workload and hardware. Absent methodology, absent claim."
        meta={[
          { label: "Benchmarks", value: BENCHMARKS.length.toString().padStart(2, "0") },
          { label: "Systems",    value: new Set(BENCHMARKS.map((b) => b.system)).size.toString() },
          { label: "Latest run", value: latest },
          { label: "Cadence",    value: "Nightly · Weekly · Per release" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 hairline">
        {BENCHMARKS.map((b) => {
          const latestRun = b.runs.at(-1);
          const first = b.runs[0];
          const delta =
            latestRun && first
              ? b.lowerIsBetter
                ? ((first.value - latestRun.value) / first.value) * 100
                : ((latestRun.value - first.value) / first.value) * 100
              : 0;
          return (
            <Link
              key={b.slug}
              to="/benchmarks/$slug"
              params={{ slug: b.slug }}
              className="group card-hover hover:card-hover-on bg-canvas p-5 flex flex-col"
            >
              <header className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{b.code}</span>
                <span className="font-mono text-[10px] text-text-3 tabular">{b.cadence}</span>
              </header>
              <h3 className="mt-3 font-display text-[19px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.015em]">
                {b.title}
              </h3>
              <p className="mt-2 text-[13px] text-text-3">{b.metric}</p>

              <div className="mt-5 hairline-t pt-4 grid grid-cols-3 gap-4">
                <Metric label="Latest" value={latestRun ? benchmarkFormatValue(b, latestRun.value) : "—"} />
                <Metric label="Budget" value={b.budget ? benchmarkFormatValue(b, b.budget) : "—"} />
                <Metric
                  label={b.lowerIsBetter ? "Improvement" : "Growth"}
                  value={`${delta >= 0 ? "+" : ""}${delta.toFixed(0)}%`}
                />
              </div>

              <Sparkline b={b} />

              <div className="mt-4 pt-4 hairline-t flex items-center justify-between">
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{b.owner} · {b.system}</span>
                <span className="font-mono text-[10px] text-text-3 tabular">{b.updated} →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </SectionShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.18em] opacity-70">{label}</div>
      <div className="mt-1 font-mono text-[15px] text-text-1 tabular tracking-[-0.005em]">{value}</div>
    </div>
  );
}

function Sparkline({ b }: { b: typeof BENCHMARKS[number] }) {
  const values = b.runs.map((r) => r.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const w = 260;
  const h = 42;
  const span = max - min || 1;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1 || 1)) * w;
    const y = h - ((v - min) / span) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="mt-4 w-full h-[42px] hairline bg-canvas"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-text-2"
      />
      {values.map((_, i) => {
        const x = (i / (values.length - 1 || 1)) * w;
        const y = h - ((values[i] - min) / span) * h;
        return <circle key={i} cx={x} cy={y} r="1.5" className="fill-text-3" />;
      })}
    </svg>
  );
}
