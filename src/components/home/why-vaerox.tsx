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
        {WHY_POINTS.slice(0, 9).map((p, i) => (
          <article
            key={p.code}
            className="group bg-canvas px-4 py-4 animate-card-hover-elevation hover:bg-surface hover:text-text-1 cursor-pointer"
          >
            <header className="flex items-baseline justify-between">
              <span className="text-label text-text-3 tabular">§{p.code}</span>
              <span className="text-overline text-text-3">Standard</span>
            </header>
            <EngineeringGraphic index={i} />
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

function EngineeringGraphic({ index }: { index: number }) {
  const type = index % 3;
  return (
    <div className="mt-6 h-12 w-full flex items-end opacity-40 group-hover:opacity-100 transition-opacity duration-300">
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 40"
        stroke="currentColor"
        fill="none"
      >
        {type === 0 && (
          <g strokeWidth="0.5">
            <polyline points="0,30 20,20 40,35 60,15 80,25 100,5" strokeDasharray="1 2" />
            <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            <circle cx="60" cy="15" r="1.5" fill="currentColor" />
            <circle cx="100" cy="5" r="1.5" fill="currentColor" />
          </g>
        )}
        {type === 1 && (
          <g strokeWidth="0.5">
            <rect x="0" y="10" width="10" height="20" />
            <line x1="10" y1="20" x2="30" y2="20" />
            <rect x="30" y="0" width="10" height="15" />
            <rect x="30" y="25" width="10" height="15" />
            <line x1="40" y1="7.5" x2="60" y2="7.5" strokeDasharray="1 2" />
            <line x1="40" y1="32.5" x2="60" y2="32.5" strokeDasharray="1 2" />
            <rect x="60" y="10" width="10" height="20" />
          </g>
        )}
        {type === 2 && (
          <g strokeWidth="0.5">
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={i}
                x1={i * 5}
                y1={40}
                x2={i * 5}
                y2={40 - Math.random() * 25 - 5}
                opacity={Math.random()}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
