import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/services-data";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const FEATURED = [
  "custom-software",
  "ai-agents",
  "saas-product",
  "full-stack-web",
  "workflow-automation",
  "internal-tools",
  "dashboards",
  "backend-platforms",
  "rag-systems",
  "chatbots",
  "ml-systems",
  "cloud-infra",
];

/**
 * ServicesPreview — the studio's service surface at a glance. Links into
 * the full /services index for depth.
 *
 * Desktop Layout: Locked to 4 columns (grid-cols-4) on all desktops (1024px+)
 * This maintains visual composition across all desktop resolutions.
 * Tablet (640-1023px): 2 columns
 * Mobile (<640px): 1 column
 *
 * Animation: On hover:
 * - Lift 2px (translateY: 0 → -2px)
 * - Background + border transition
 * - Arrow moves 3px right
 * Duration: 200ms, easing: ease-out
 *
 * Scroll reveal: Fades and slides up when scrolled into view (once only)
 */
export function ServicesPreview() {
  const ref = useScrollReveal();
  const items = FEATURED.map((slug) => SERVICES.find((s) => s.slug === slug)).filter(
    Boolean,
  ) as typeof SERVICES;

  return (
    <section ref={ref} className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-line-1 hairline">
        {items.map((s) => (
          <a
            key={s.slug}
            href={`/services/${s.slug}`}
            className="bg-canvas px-4 py-4 group block animate-card-hover-elevation hover:bg-surface hover:text-text-1 cursor-pointer relative"
          >
            <header className="flex items-baseline justify-between">
              <span className="text-overline text-text-3">{s.code}</span>
              <span className="font-mono text-metadata text-text-3 transition-transform transition-ui group-hover:translate-x-[3px]">
                →
              </span>
            </header>
            <h3 className="mt-3 text-heading-s text-text-2 group-hover:text-text-1 transition-micro">
              {s.name}
            </h3>
            <p className="mt-2 text-caption text-text-3">{s.tagline}</p>
          </a>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-overline text-text-3">
          {SERVICES.length.toString().padStart(2, "0")} services in total
        </span>
        <Link
          to="/services"
          className="text-button text-text-1 hover:opacity-70 active:opacity-50 transition-micro"
        >
          All services →
        </Link>
      </div>
    </section>
  );
}
