import { createFileRoute } from "@tanstack/react-router";
import { DocShell } from "@/components/doc/doc-shell";

export const Route = createFileRoute("/incidents/")({
  head: () => ({
    meta: [
      { title: "Incidents — VÆRØX" },
      { name: "description", content: "No production incidents. VÆRØX systems are pre-production; engineering challenges are documented on the relevant system pages." },
    ],
  }),
  component: IncidentsIndex,
});

function IncidentsIndex() {
  return (
    <DocShell
      kicker="INC"
      title="Incidents"
      lede="No production incidents recorded."
      updated="2026-07-01"
      owner="Mayank Sharma"
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Incidents" }]}
    >
      <div className="mt-8 border border-hairline p-6 font-mono text-[13px] leading-[1.7] text-text-3">
        <p className="mb-3 text-text-1">Every VÆRØX system is currently in Building, Prototype, or Research stage.</p>
        <p>Because nothing runs in production, there are no genuine incidents to publish. Engineering challenges, tradeoffs, and lessons learned are documented on the individual system pages and in Development Logs under Future Systems.</p>
      </div>
    </DocShell>
  );
}
