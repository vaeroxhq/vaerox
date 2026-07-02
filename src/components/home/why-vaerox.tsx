import { WHY_POINTS } from "@/lib/why-vaerox-data";

export function WhyVaerox() {
  return (
    <section className="mt-10 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-1 hairline">
        {WHY_POINTS.slice(0, 9).map((p) => (
          <article key={p.code} className="bg-canvas px-5 pt-5 pb-6 transition-ui hover:bg-surface">
            <header className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] tabular">§{p.code}</span>
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Standard</span>
            </header>
            <div className="hairline-t mt-4" />
            <h3 className="font-display text-[17px] mt-5 tracking-[-0.018em]">{p.title}</h3>
            <p className="mt-2 text-[13px] text-text-2 leading-[1.6]">{p.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end">
        <a href="/engineering" className="font-mono text-[11px] text-text-1 uppercase tracking-[0.14em] hover:opacity-70 transition-micro">
          Full standards →
        </a>
      </div>
    </section>
  );
}
