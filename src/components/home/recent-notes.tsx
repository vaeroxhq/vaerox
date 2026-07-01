import { NOTES } from "@/lib/home-data";

/**
 * Recent Engineering Notes — dense list, mono metadata, hairline rows.
 * Restrained hover: brighter title, faint row surface, "→" nudges right.
 */
export function RecentNotes() {
  return (
    <section className="mt-10 mb-24 hairline reveal">
      <ul className="divide-y" style={{ borderColor: "var(--line-1)" }}>
        {NOTES.map((n) => (
          <li key={n.slug}>
            <a
              href={`/journal#${n.slug}`}
              className="group card-hover hover:card-hover-on bg-canvas grid grid-cols-12 items-baseline gap-4 px-5 py-4"
            >
              <span className="col-span-3 md:col-span-2 font-mono text-[11px] text-text-3 tabular tracking-[0.02em]">
                {n.date}
              </span>
              <span className="col-span-9 md:col-span-6 font-display text-[15px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.01em]">
                {n.title}
              </span>
              <span className="col-span-6 md:col-span-2 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
                {n.category}
              </span>
              <span className="col-span-4 md:col-span-1 text-right font-mono text-[11px] text-text-2 tabular">
                {n.readingMinutes}m
              </span>
              <span className="col-span-2 md:col-span-1 text-right font-mono text-[11px] text-text-3 tabular">
                <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[4px]">
                  →
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
