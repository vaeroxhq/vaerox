import { Link } from "@tanstack/react-router";
import { BENCHMARKS } from "@/lib/benchmarks-data";
import { JOURNAL } from "@/lib/journal-data";

/**
 * OperationsStrip — homepage module surfacing two engineering feeds:
 * latest validation records and recent journal entries. VÆRØX has no
 * production incidents; nothing on this strip pretends otherwise.
 */
export function OperationsStrip() {
  const journal = [...JOURNAL].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const benchmarks = [...BENCHMARKS].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-line-1 hairline">
      <section className="bg-canvas">
        <header className="px-4 py-3 hairline-b flex items-baseline justify-between">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">Latest journal entries</span>
          <Link to="/journal" className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] hover:text-text-1 transition-micro">All →</Link>
        </header>
        <ul>
          {journal.map((j) => (
            <li key={j.slug} className="hairline-b last:border-b-0">
              <Link to="/journal/$slug" params={{ slug: j.slug }} className="group card-hover hover:card-hover-on grid grid-cols-[96px_1fr_120px] gap-3 px-4 py-3 items-baseline">
                <span className="font-mono text-[11px] text-text-2 tabular">{j.date}</span>
                <span className="font-display text-[13px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.005em] truncate">{j.title}</span>
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] text-right truncate">{j.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-canvas">
        <header className="px-4 py-3 hairline-b flex items-baseline justify-between">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">Latest engineering validation</span>
          <Link to="/benchmarks" className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] hover:text-text-1 transition-micro">All →</Link>
        </header>
        <ul>
          {benchmarks.map((b) => (
            <li key={b.slug} className="hairline-b last:border-b-0">
              <Link to="/benchmarks/$slug" params={{ slug: b.slug }} className="group card-hover hover:card-hover-on grid grid-cols-[80px_1fr_140px] gap-3 px-4 py-3 items-baseline">
                <span className="font-mono text-[11px] text-text-2 tabular">{b.code}</span>
                <span className="font-display text-[13px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.005em] truncate">{b.title}</span>
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] text-right truncate">{b.status}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
