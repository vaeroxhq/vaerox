import { Link } from "@tanstack/react-router";
import { INCIDENTS } from "@/lib/incidents-data";
import { BENCHMARKS, benchmarkFormatValue } from "@/lib/benchmarks-data";
import { StageDot } from "@/components/section/section-bits";

/**
 * OperationsStrip — homepage module surfacing the two most operational
 * feeds: recent incidents and latest benchmark movements. Every row is
 * a link into its detail page.
 */
export function OperationsStrip() {
  const incidents = [...INCIDENTS].sort((a, b) => b.openedAt.localeCompare(a.openedAt)).slice(0, 5);
  const benchmarks = [...BENCHMARKS].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-line-1 hairline">
      <section className="bg-canvas">
        <header className="px-4 py-3 hairline-b flex items-baseline justify-between">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">Recent incidents</span>
          <Link to="/incidents" className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] hover:text-text-1 transition-micro">All →</Link>
        </header>
        <ul>
          {incidents.map((i) => {
            const tone: "warning" | "info" = i.severity === "SEV-1" ? "warning" : i.severity === "SEV-2" ? "warning" : "info";
            return (
              <li key={i.id} className="hairline-b last:border-b-0">
                <Link to="/incidents/$id" params={{ id: i.slug }} className="group card-hover hover:card-hover-on grid grid-cols-[96px_1fr_60px_70px] gap-3 px-4 py-3 items-baseline">
                  <span className="font-mono text-[11px] text-text-2 tabular">{i.id}</span>
                  <span className="font-display text-[13px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.005em] truncate">{i.title}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
                    <StageDot tone={tone} />
                    {i.severity}
                  </span>
                  <span className="font-mono text-[10px] text-text-3 tabular text-right">{i.mttr}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-canvas">
        <header className="px-4 py-3 hairline-b flex items-baseline justify-between">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">Latest benchmarks</span>
          <Link to="/benchmarks" className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] hover:text-text-1 transition-micro">All →</Link>
        </header>
        <ul>
          {benchmarks.map((b) => {
            const last = b.runs.at(-1);
            return (
              <li key={b.slug} className="hairline-b last:border-b-0">
                <Link to="/benchmarks/$slug" params={{ slug: b.slug }} className="group card-hover hover:card-hover-on grid grid-cols-[80px_1fr_100px] gap-3 px-4 py-3 items-baseline">
                  <span className="font-mono text-[11px] text-text-2 tabular">{b.code}</span>
                  <span className="font-display text-[13px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.005em] truncate">{b.title}</span>
                  <span className="font-mono text-[12px] text-text-1 tabular text-right">{last ? benchmarkFormatValue(b, last.value) : "—"}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
