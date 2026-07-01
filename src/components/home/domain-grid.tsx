type Domain = { index: string; title: string; note: string };

const DOMAINS: Domain[] = [
  { index: "01", title: "Enterprise AI", note: "Model serving, evals, agent runtimes." },
  { index: "02", title: "Platform", note: "Multi-tenant control planes, IaC." },
  { index: "03", title: "Infrastructure", note: "Distributed storage, observability." },
];

export function DomainGrid() {
  return (
    <section className="mt-10 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-1 hairline">
        {DOMAINS.map((d) => (
          <DomainCell key={d.index} {...d} />
        ))}
      </div>
    </section>
  );
}

function DomainCell({ index, title, note }: Domain) {
  return (
    <article className="group bg-canvas px-5 pt-5 pb-4 transition-ui hover:bg-surface relative">
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 h-3 w-3 border-t border-r border-line-2"
      />

      {/* Header row */}
      <header className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] tabular">
          {index}
        </span>
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          Domain
        </span>
      </header>

      {/* Hairline separator beneath the index — hierarchy */}
      <div className="hairline-t mt-4" />

      {/* Title + note */}
      <h3 className="font-display text-[22px] mt-6 tracking-[-0.022em]">{title}</h3>
      <p className="mt-2 text-[13px] text-text-2 leading-[1.55]">{note}</p>

      {/* Metadata rail — engineering density. Placeholders until wired. */}
      <dl className="mt-6 pt-4 hairline-t grid grid-cols-2 gap-y-2 gap-x-4">
        <ModuleMeta label="Status" value="—" />
        <ModuleMeta label="Verified" value="—" />
        <ModuleMeta label="Tech" value="—" />
        <ModuleMeta label="Docs" value="—" />
        <ModuleMeta label="Updated" value="—" className="col-span-2" />
      </dl>
    </article>
  );
}

function ModuleMeta({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline justify-between gap-3 ${className}`}>
      <dt className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </dt>
      <dd className="font-mono text-[11px] text-text-2 tabular">{value}</dd>
    </div>
  );
}
