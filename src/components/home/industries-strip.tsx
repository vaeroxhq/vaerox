import { INDUSTRIES } from "@/lib/industries-data";

/**
 * IndustriesStrip — sector coverage at a glance. Links into /industries.
 */
export function IndustriesStrip() {
  return (
    <section className="mt-10 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-1 hairline">
        {INDUSTRIES.map((ind) => (
          <a
            key={ind.slug}
            href="/industries"
            className="bg-canvas px-5 pt-5 pb-5 group transition-ui hover:bg-surface"
          >
            <header className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{ind.code}</span>
              <span className="font-mono text-[10px] text-text-3">→</span>
            </header>
            <h3 className="mt-3 font-display text-[17px] text-text-2 group-hover:text-text-1 tracking-[-0.015em] transition-micro">
              {ind.name}
            </h3>
            <p className="mt-2 text-[12.5px] text-text-3 leading-[1.55]">{ind.summary}</p>
          </a>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end">
        <a href="/industries" className="font-mono text-[11px] text-text-1 uppercase tracking-[0.14em] hover:opacity-70 transition-micro">
          All industries →
        </a>
      </div>
    </section>
  );
}
