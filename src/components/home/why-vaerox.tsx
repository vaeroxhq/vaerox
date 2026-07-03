import { Link } from "@tanstack/react-router";
import { WHY_POINTS } from "@/lib/why-vaerox-data";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/**
 * Why Vaerox — engineering standards section
 *
 * Desktop Layout: Locked to 3 columns (grid-cols-3) on all desktops (1024px+)
 * This maintains visual composition across all desktop resolutions.
 * Tablet (640-1023px): 2 columns
 * Mobile (<640px): 1 column
 *
 * Animation: Fades and slides up when scrolled into view (once only)
 */
export function WhyVaerox() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-1 hairline">
        {WHY_POINTS.slice(0, 9).map((p) => (
          <article
            key={p.code}
            className="bg-canvas px-4 py-4 animate-card-hover-elevation hover:bg-surface hover:text-text-1 cursor-pointer"
          >
            <header className="flex items-baseline justify-between">
              <span className="text-label text-text-3 tabular">§{p.code}</span>
              <span className="text-overline text-text-3">Standard</span>
            </header>
            <div className="hairline-t mt-4" />
            <h3 className="text-heading-s mt-4">{p.title}</h3>
            <p className="mt-2 text-body-s text-text-2">{p.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end">
        <Link
          to="/engineering"
          className="text-button text-text-1 hover:opacity-70 active:opacity-50 transition-micro"
        >
          Full standards →
        </Link>
      </div>
    </section>
  );
}
