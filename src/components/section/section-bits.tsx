import type { ReactNode } from "react";

/**
 * Shared page header used across the Systems / Projects / Research surfaces.
 * Same typography as the homepage, denser scale.
 */
export function PageHeader({
  section,
  title,
  summary,
  meta,
}: {
  section: string;
  title: string;
  summary: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <header className="pt-20 md:pt-24 pb-10">
      <div className="flex items-center gap-3 mb-8">
        <span
          aria-hidden="true"
          className="inline-block h-[8px] w-[8px] rotate-45 border border-line-3"
        />
        <span className="text-overline text-text-3">{section}</span>
      </div>

      <h1 className="text-display-xl max-w-[820px] text-balance">{title}</h1>

      <div className="mt-4 flex items-center gap-4 text-overline text-text-3 tabular opacity-60">
        <span>MEM.ALLOC · 0x00A1</span>
        <span className="inline-block w-px h-3 bg-line-2" />
        <span>SYS.STATE · ONLINE</span>
      </div>

      <p className="mt-6 max-w-[620px] text-text-2 text-body-m">{summary}</p>

      {meta && meta.length > 0 && (
        <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1 hairline">
          {meta.map((m) => (
            <div key={m.label} className="bg-canvas px-4 pt-3 pb-4">
              <dt className="text-overline text-text-3 opacity-70">{m.label}</dt>
              <dd className="text-mono-lg text-text-1 mt-2 tabular tracking-[-0.005em]">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}

/**
 * Toolbar — search input on the left, filter chips on the right.
 * Purely presentational; parent owns state.
 */
export function Toolbar({
  query,
  onQuery,
  placeholder,
  filters,
  activeFilter,
  onFilter,
  count,
}: {
  query: string;
  onQuery: (v: string) => void;
  placeholder: string;
  filters: string[];
  activeFilter: string;
  onFilter: (v: string) => void;
  count: number;
}) {
  return (
    <div className="hairline bg-canvas">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-px bg-line-1">
        <label className="bg-canvas flex items-center gap-3 px-4 py-3">
          <span className="text-overline text-text-3 opacity-70">Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-0 outline-none text-code text-text-1 placeholder:text-text-3 tabular"
          />
          <span className="text-metadata text-text-3 opacity-70 tabular">
            {count.toString().padStart(2, "0")} results
          </span>
        </label>

        <div className="bg-canvas flex items-center overflow-x-auto">
          {filters.map((f) => {
            const active = f === activeFilter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => onFilter(f)}
                className={`relative h-full px-4 py-3 text-nav transition-micro whitespace-nowrap ${
                  active ? "text-text-1" : "text-text-3 hover:text-text-1"
                }`}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute left-3 right-3 top-0 h-px bg-text-1"
                  />
                )}
                {f}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SectionShell({ children }: { children: ReactNode }) {
  return <div className="w-shell mx-auto px-6 md:px-10 lg:px-16 pb-24">{children}</div>;
}

export function StageDot({ tone }: { tone: "success" | "warning" | "info" | "muted" }) {
  const cls =
    tone === "success"
      ? "text-success"
      : tone === "warning"
        ? "text-warning"
        : tone === "info"
          ? "text-info"
          : "text-text-3";
  return <span className={`dot ${cls}`} aria-hidden="true" />;
}
