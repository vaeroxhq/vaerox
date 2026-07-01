import { ENGAGEMENTS } from "@/lib/engagements-data";

export function EngagementsPreview() {
  return (
    <section className="mt-10 mb-24">
      <div className="hairline bg-canvas">
        {ENGAGEMENTS.map((e, i, arr) => (
          <a
            key={e.slug}
            href="/engagements"
            className={`grid grid-cols-1 md:grid-cols-[80px_1fr_auto_auto] gap-6 px-5 py-5 items-baseline group transition-ui hover:bg-surface ${i < arr.length - 1 ? "hairline-b" : ""}`}
          >
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{e.code}</span>
            <div>
              <h3 className="font-display text-[17px] text-text-2 group-hover:text-text-1 tracking-[-0.015em] transition-micro">{e.name}</h3>
              <p className="mt-1 text-[12.5px] text-text-3 leading-[1.55] max-w-[720px]">{e.summary}</p>
            </div>
            <span className="font-mono text-[11px] text-text-3 tabular hidden md:inline">{e.duration}</span>
            <span className="font-mono text-[11px] text-text-3 tabular hidden md:inline">{e.pricing}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
