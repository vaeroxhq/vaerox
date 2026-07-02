import { Link } from "@tanstack/react-router";
import { WHY_POINTS } from "@/lib/why-vaerox-data";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/**
 * Why Vaerox — engineering standards section
 * Animation: Fades and slides up when scrolled into view (once only)
 */
export function WhyVaerox() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="mt-10 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-1 hairline">
        {WHY_POINTS.slice(0, 9).map((p) => (
          <article
            key={p.code}
            className="bg-canvas px-4 py-4 transition-all duration-200 ease-out hover:bg-surface hover:text-text-1 hover:translate-y-[-2px]"
          >
            <header className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] tabular">
                §{p.code}
              </span>
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
                Standard
              </span>
            </header>
            <div className="hairline-t mt-4" />
            <h3 className="font-display font-medium text-[17px] mt-4 tracking-[-0.018em]">
              {p.title}
            </h3>
            <p className="mt-2 text-[13px] text-text-2 leading-[1.6]">{p.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end">
        <Link
          to="/engineering"
          className="font-mono text-[11px] text-text-1 uppercase tracking-[0.14em] hover:opacity-70 active:opacity-50 transition-micro"
        >
          Full standards →
        </Link>
      </div>
    </section>
  );
}
