import { Link } from "@tanstack/react-router";

type Entry = { title: string; href: string; kicker?: string };

/**
 * PrevNext — hairline strip at document foot. Either side may be
 * absent; the strip still renders with a spacer to preserve rhythm.
 */
export function PrevNext({ prev, next }: { prev?: Entry | null; next?: Entry | null }) {
  return (
    <nav
      aria-label="Document navigation"
      className="mt-16 hairline-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 hairline"
    >
      <Side entry={prev} align="left" />
      <Side entry={next} align="right" />
    </nav>
  );
}

function Side({ entry, align }: { entry: Entry | undefined | null; align: "left" | "right" }) {
  if (!entry) {
    return <div aria-hidden="true" className="bg-canvas px-5 py-6" />;
  }
  const label = align === "left" ? "← Previous" : "Next →";
  const alignCls = align === "right" ? "text-right" : "text-left";
  return (
    <Link
      to={entry.href}
      className={`group card-hover hover:card-hover-on bg-canvas px-5 py-6 ${alignCls}`}
    >
      <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
        {label}
        {entry.kicker && <span className="ml-3 opacity-60">{entry.kicker}</span>}
      </span>
      <div className="mt-2 font-display text-[16px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.015em]">
        {entry.title}
      </div>
    </Link>
  );
}
