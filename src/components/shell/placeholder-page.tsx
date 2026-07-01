/**
 * Reusable placeholder page — inherits the shell.
 * Uses the same typographic system as the homepage hero,
 * scaled down. Content will replace this per-route in later phases.
 */
export function PlaceholderPage({
  section,
  title,
  summary,
}: {
  section: string;
  title: string;
  summary: string;
}) {
  return (
    <div className="w-shell mx-auto px-6 md:px-10 lg:px-16">
      <section className="pt-20 md:pt-28 pb-24">
        <div className="flex items-center gap-3 mb-10">
          <span
            aria-hidden="true"
            className="inline-block h-[8px] w-[8px] rotate-45 border border-line-3"
          />
          <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
            {section}
          </span>
        </div>

        <h1 className="font-display text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.028em] max-w-[760px]">
          {title}
        </h1>

        <p className="mt-8 max-w-[560px] text-text-2 text-[15px] leading-[1.65]">{summary}</p>

        <div className="mt-14 max-w-[560px]">
          <div className="hairline-t" />
          <div className="hairline-t mt-[3px]" />
        </div>

        <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1 hairline">
          <MetaCell label="Status" value="Scaffolded" />
          <MetaCell label="Entries" value="—" />
          <MetaCell label="Updated" value="—" />
          <MetaCell label="Owner" value="—" />
        </dl>
      </section>
    </div>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas px-4 pt-3 pb-4">
      <dt className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </dt>
      <dd className="font-mono text-[15px] text-text-1 mt-2 tabular tracking-[-0.005em]">
        {value}
      </dd>
    </div>
  );
}
