import { PRINCIPLES } from "@/lib/home-data";

/**
 * Engineering Principles — documentation-style entries laid out as a
 * two-column hairline grid. No decoration, no marketing tone.
 */
export function EngineeringPrinciples() {
  return (
    <section className="mt-10 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-1 hairline">
        {PRINCIPLES.map((p) => (
          <article
            key={p.index}
            className="bg-canvas px-5 pt-5 pb-6 transition-ui hover:bg-surface"
          >
            <header className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] tabular">
                §{p.index}
              </span>
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
                Principle
              </span>
            </header>
            <div className="hairline-t mt-4" />
            <h3 className="font-display text-[18px] mt-5 tracking-[-0.018em]">{p.title}</h3>
            <p className="mt-2 text-[13px] text-text-2 leading-[1.6]">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
