import type { ReactNode } from "react";

/**
 * DocShell — 2-column grid (body + related rail) used by every
 * detail page. Rail collapses below the article on narrow viewports.
 */
export function DocShell({ children, rail }: { children: ReactNode; rail?: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
      <div className="min-w-0">{children}</div>
      <div className="lg:pt-0">{rail}</div>
    </div>
  );
}

export function DocBlock({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-mono text-[10px] text-text-3 uppercase tracking-[0.18em] mb-3">{heading}</h2>
      <div className="hairline-t pt-4">{children}</div>
    </section>
  );
}
