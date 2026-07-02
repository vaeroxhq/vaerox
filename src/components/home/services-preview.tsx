import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/services-data";

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
 */
export function ServicesPreview() {
  const items = FEATURED.map((slug) => SERVICES.find((s) => s.slug === slug)).filter(Boolean) as typeof SERVICES;

  return (
    <section className="mt-10 mb-24">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-line-1 hairline">
        {items.map((s) => (
          <a
            key={s.slug}
            href={`/services/${s.slug}`}
            className="bg-canvas px-4 py-4 group block transition-ui hover:bg-surface"
          >
            <header className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{s.code}</span>
              <span className="font-mono text-[10px] text-text-3">→</span>
            </header>
            <h3 className="mt-3 font-display font-medium text-[17px] text-text-2 group-hover:text-text-1 tracking-[-0.012em] transition-micro">
              {s.name}
            </h3>
            <p className="mt-2 text-[11.5px] text-text-3 leading-[1.5]">{s.tagline}</p>
          </a>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          {SERVICES.length.toString().padStart(2, "0")} services in total
        </span>
        <Link to="/services" className="font-mono text-[11px] text-text-1 uppercase tracking-[0.14em] hover:opacity-70 active:opacity-50 transition-micro">
          All services →
        </Link>
      </div>
    </section>
  );
}
