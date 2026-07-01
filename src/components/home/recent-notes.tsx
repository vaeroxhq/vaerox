import { NOTES } from "@/lib/home-data";

/**
 * Recent Engineering Notes — dense list, mono metadata, hairline rows.
 */
export function RecentNotes() {
  return (
    <section className="mt-10 mb-24 hairline">
      <ul className="divide-y" style={{ borderColor: "var(--line-1)" }}>
        {NOTES.map((n) => (
          <li key={n.slug}>
            <a
              href={`/journal#${n.slug}`}
              className="group bg-canvas grid grid-cols-12 items-baseline gap-4 px-5 py-4 transition-micro hover:bg-surface"
            >
              <span className="col-span-3 md:col-span-2 font-mono text-[11px] text-text-3 tabular tracking-[0.02em]">
                {n.date}
              </span>
              <span className="col-span-9 md:col-span-7 font-display text-[15px] text-text-1 tracking-[-0.01em]">
                {n.title}
              </span>
              <span className="col-span-6 md:col-span-2 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
                {n.category}
              </span>
              <span className="col-span-6 md:col-span-1 text-right font-mono text-[11px] text-text-2 tabular">
                {n.readingMinutes}m
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
