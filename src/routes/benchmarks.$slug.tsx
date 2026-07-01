import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BENCHMARKS, benchmarkFormatValue, type Benchmark } from "@/lib/benchmarks-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { RelatedRail } from "@/components/doc/related-rail";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { PrevNext } from "@/components/doc/prev-next";

export const Route = createFileRoute("/benchmarks/$slug")({
  loader: ({ params }) => {
    const b = BENCHMARKS.find((x) => x.slug === params.slug);
    if (!b) throw notFound();
    return { b };
  },
  head: ({ loaderData }) => {
    const b = loaderData?.b;
    const title = b ? `${b.code} · ${b.title} — VÆRØX` : "Benchmark — VÆRØX";
    return { meta: [
      { title },
      { name: "description", content: (b?.metric ?? "").slice(0, 160) },
      { property: "og:title", content: title },
      { property: "og:description", content: (b?.metric ?? "").slice(0, 160) },
    ] };
  },
  component: BenchmarkDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader section="§ · Benchmarks" title="Benchmark not found." summary="No benchmark matches that identifier." />
      <Link to="/benchmarks" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1">← All benchmarks</Link>
    </SectionShell>
  ),
});

function BenchmarkDetail() {
  const { b } = Route.useLoaderData() as { b: Benchmark };
  const sorted = [...BENCHMARKS].sort((x, y) => x.code.localeCompare(y.code));
  const idx = sorted.findIndex((x) => x.slug === b.slug);
  const prev = sorted[idx - 1];
  const next = sorted[idx + 1];
  const latest = b.runs.at(-1);

  return (
    <SectionShell>
      <Breadcrumbs items={[
        { label: "VÆRØX", to: "/" },
        { label: "Benchmarks", to: "/benchmarks" },
        { label: b.code },
      ]} />

      <PageHeader
        section={`§ · Benchmark · ${b.code}`}
        title={b.title}
        summary={`${b.metric} — ${b.cadence.toLowerCase()} against ${b.dataset}`}
        meta={[
          { label: "Latest",   value: latest ? benchmarkFormatValue(b, latest.value) : "—" },
          { label: "Budget",   value: b.budget ? benchmarkFormatValue(b, b.budget) : "—" },
          { label: "Cadence",  value: b.cadence },
          { label: "Updated",  value: b.updated },
        ]}
      />

      <DocShell rail={<RelatedRail kind="benchmark" id={b.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Methodology">
            <ul className="space-y-3">
              {b.methodology.map((p, i) => (
                <li key={i} className="text-[15px] text-text-2 leading-[1.7]">{p}</li>
              ))}
            </ul>
          </DocBlock>

          <DocBlock heading="Hardware">
            <p className="text-[15px] text-text-2 leading-[1.7]">{b.hardware}</p>
          </DocBlock>

          <DocBlock heading="Dataset">
            <p className="text-[15px] text-text-2 leading-[1.7]">{b.dataset}</p>
          </DocBlock>

          <DocBlock heading="History">
            <div className="hairline bg-canvas">
              <div className="p-5">
                <BigChart b={b} />
              </div>
              <div className="hairline-t">
                <div className="hidden md:grid grid-cols-[110px_1fr_140px_120px] gap-4 px-4 py-2 hairline-b">
                  {["Date", "Build", "Note", "Value"].map((h) => (
                    <span key={h} className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">{h}</span>
                  ))}
                </div>
                {[...b.runs].reverse().map((r, i, arr) => (
                  <div key={i} className={`grid grid-cols-2 md:grid-cols-[110px_1fr_140px_120px] gap-4 px-4 py-2 items-baseline ${i < arr.length - 1 ? "hairline-b" : ""}`}>
                    <span className="font-mono text-[11px] text-text-3 tabular">{r.date}</span>
                    <span className="font-mono text-[11px] text-text-2 tabular">{r.build}</span>
                    <span className="font-mono text-[11px] text-text-3 truncate">{r.note ?? "—"}</span>
                    <span className="font-mono text-[13px] text-text-1 tabular text-right">{benchmarkFormatValue(b, r.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </DocBlock>
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.title, href: `/benchmarks/${prev.slug}`, kicker: prev.code } : null}
        next={next ? { title: next.title, href: `/benchmarks/${next.slug}`, kicker: next.code } : null}
      />
    </SectionShell>
  );
}

function BigChart({ b }: { b: Benchmark }) {
  const values = b.runs.map((r) => r.value);
  const min = Math.min(...values, b.budget ?? Infinity);
  const max = Math.max(...values, b.budget ?? -Infinity);
  const span = max - min || 1;
  const w = 720;
  const h = 180;
  const path = values.map((v, i) => {
    const x = (i / (values.length - 1 || 1)) * w;
    const y = h - ((v - min) / span) * h;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  const budgetY = b.budget != null ? h - ((b.budget - min) / span) * h : null;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[180px] hairline bg-canvas" aria-hidden="true">
      {/* horizontal gridlines */}
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={0} x2={w} y1={h * f} y2={h * f} stroke="currentColor" strokeWidth="0.5" className="text-line-1" />
      ))}
      {budgetY != null && (
        <line x1={0} x2={w} y1={budgetY} y2={budgetY} stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-warning" />
      )}
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.25" className="text-text-1" />
      {values.map((v, i) => {
        const x = (i / (values.length - 1 || 1)) * w;
        const y = h - ((v - min) / span) * h;
        return <circle key={i} cx={x} cy={y} r="2.5" className="fill-text-1" />;
      })}
    </svg>
  );
}
