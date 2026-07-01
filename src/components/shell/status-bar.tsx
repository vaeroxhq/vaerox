/**
 * Persistent engineering status strip — sits below the top nav.
 * Pure typography + hairlines; tabular monospace values.
 */
export function StatusBar() {
  return (
    <div className="hairline-b bg-canvas">
      <div className="w-shell mx-auto px-6 md:px-10 lg:px-16">
        <dl className="grid grid-cols-2 md:grid-cols-5 gap-px bg-line-1">
          <StatusCell label="Status">
            <span className="inline-flex items-center gap-2">
              <span className="dot text-success" aria-hidden="true" />
              <span className="tabular">Nominal</span>
            </span>
          </StatusCell>
          <StatusCell label="Build" value="v0.1.0" />
          <StatusCell label="Region" value="EU · Global" />
          <StatusCell label="Updated" value="2026-07-01" />
          <StatusCell label="Revision" value="001" />
        </dl>
      </div>
    </div>
  );
}

function StatusCell({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-canvas px-4 py-2.5 flex items-baseline justify-between gap-3">
      <dt className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </dt>
      <dd className="font-mono text-[11px] text-text-2 tabular">{children ?? value}</dd>
    </div>
  );
}
