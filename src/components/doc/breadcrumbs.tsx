import { Link } from "@tanstack/react-router";

export type Crumb = { label: string; to?: string };

/**
 * Breadcrumbs — mono, 10px, uppercase. Present on every detail page.
 * The final crumb is inert; prior crumbs are links.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center flex-wrap gap-x-2 gap-y-1 pt-8 pb-4 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]"
    >
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${i}-${c.label}`} className="inline-flex items-center gap-2">
            {c.to && !isLast ? (
              <Link
                to={c.to}
                className="hover:text-text-1 transition-micro"
              >
                {c.label}
              </Link>
            ) : (
              <span className={isLast ? "text-text-2" : ""}>{c.label}</span>
            )}
            {!isLast && <span aria-hidden="true" className="opacity-50">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
