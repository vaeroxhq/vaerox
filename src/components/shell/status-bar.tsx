/**
 * Persistent identity strip — sits below the top nav.
 *
 * Intentionally free of fabricated operational metrics. VÆRØX is an
 * independent engineering laboratory, not a production platform, and
 * this strip states the identity honestly: who maintains it, what it
 * is, and when the site was last updated.
 */
export function StatusBar() {
  return (
    <div className="hairline-b bg-canvas">
      <div className="w-shell mx-auto px-6 md:px-10 lg:px-16">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
          <Cell label="Studio" value="VÆRØX" />
          <Cell label="Discipline" value="AI Engineering" />
          <Cell label="Status" value="Available for engagements" />
          <Cell label="Updated" value="2026-07-01" />
        </dl>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas px-4 py-2.5 flex items-baseline justify-between gap-3">
      <dt className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </dt>
      <dd className="font-mono text-[11px] text-text-2 tabular truncate">{value}</dd>
    </div>
  );
}
