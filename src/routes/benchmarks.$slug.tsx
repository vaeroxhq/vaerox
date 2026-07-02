import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BENCHMARKS, benchmarkFormatValue, type Benchmark } from "@/lib/benchmarks-data";
import { PageHeader, SectionShell, StageDot } from "@/components/section/section-bits";
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
    const title = b ? `${b.code} · ${b.title} — Vareox` : "Engineering validation — Vareox";
    return {
      meta: [
        { title },
        { name: "description", content: (b?.focus ?? "").slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: (b?.focus ?? "").slice(0, 160) },
      ],
    };
  },
  component: ValidationDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader
        section="§ · Engineering Validation"
        title="Record not found."
        summary="No validation record matches that identifier."
      />
      <Link
        to="/benchmarks"
        className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1"
      >
        ← All validation records
      </Link>
    </SectionShell>
  ),
});

function ValidationDetail() {
  const { b } = Route.useLoaderData() as { b: Benchmark };
  const sorted = [...BENCHMARKS].sort((x, y) => x.code.localeCompare(y.code));
  const idx = sorted.findIndex((x) => x.slug === b.slug);
  const prev = sorted[idx - 1];
  const next = sorted[idx + 1];

  const tone =
    b.status === "Prototype measured"
      ? ("info" as const)
      : b.status === "In progress"
        ? ("warning" as const)
        : ("muted" as const);

  return (
    <SectionShell>
      <Breadcrumbs
        items={[
          { label: "VÆRØX", to: "/" },
          { label: "Engineering Validation", to: "/benchmarks" },
          { label: b.code },
        ]}
      />

      <PageHeader
        section={`§ · Engineering Validation · ${b.code}`}
        title={b.title}
        summary={b.focus}
        meta={[
          { label: "Phase", value: b.phase },
          { label: "Status", value: b.status },
          { label: "System", value: b.system },
          { label: "Updated", value: b.updated },
        ]}
      />

      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
        <StageDot tone={tone} />
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          {b.status}
        </span>
      </div>

      <DocShell rail={<RelatedRail kind="benchmark" id={b.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Design goal">
            <p className="text-[15px] text-text-2 leading-[1.7]">{b.goal}</p>
          </DocBlock>

          <DocBlock heading="Methodology">
            <ul className="space-y-3">
              {b.methodology.map((p, i) => (
                <li key={i} className="text-[15px] text-text-2 leading-[1.7]">
                  {p}
                </li>
              ))}
            </ul>
          </DocBlock>

          <DocBlock heading="Findings">
            <ul className="space-y-3">
              {b.findings.map((p, i) => (
                <li key={i} className="text-[15px] text-text-2 leading-[1.7]">
                  {p}
                </li>
              ))}
            </ul>
          </DocBlock>

          <DocBlock heading="Prototype checkpoints">
            {b.runs.length === 0 ? (
              <p className="text-[15px] text-text-3 leading-[1.7] italic">
                Not yet measured. The harness for this record is still being built — this section
                will populate as prototype checkpoints are recorded.
              </p>
            ) : (
              <div className="hairline bg-canvas">
                <div className="hidden md:grid grid-cols-[110px_1fr_180px_120px] gap-4 px-4 py-2 hairline-b">
                  {["Date", "Build", "Note", "Value"].map((h) => (
                    <span
                      key={h}
                      className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                {[...b.runs].reverse().map((r, i, arr) => (
                  <div
                    key={i}
                    className={`grid grid-cols-2 md:grid-cols-[110px_1fr_180px_120px] gap-4 px-4 py-2 items-baseline ${i < arr.length - 1 ? "hairline-b" : ""}`}
                  >
                    <span className="font-mono text-[11px] text-text-3 tabular">{r.date}</span>
                    <span className="font-mono text-[11px] text-text-2 tabular">{r.build}</span>
                    <span className="font-mono text-[11px] text-text-3 truncate">
                      {r.note ?? "—"}
                    </span>
                    <span className="font-mono text-[13px] text-text-1 tabular text-right">
                      {benchmarkFormatValue(b, r.value)}
                    </span>
                  </div>
                ))}
                <div className="hairline-t px-4 py-2 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
                  Checkpoints reflect prototype hardware, not production infrastructure.
                </div>
              </div>
            )}
          </DocBlock>
        </article>
      </DocShell>

      <PrevNext
        prev={
          prev ? { title: prev.title, href: `/benchmarks/${prev.slug}`, kicker: prev.code } : null
        }
        next={
          next ? { title: next.title, href: `/benchmarks/${next.slug}`, kicker: next.code } : null
        }
      />
    </SectionShell>
  );
}
