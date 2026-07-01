import { createFileRoute } from "@tanstack/react-router";

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
    <main className="mx-auto max-w-[960px] px-6 py-12">
      <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.18em] mb-3">INC · Incidents</div>
      <h1 className="text-3xl font-medium tracking-tight text-text-1 mb-3">No production incidents recorded</h1>
      <p className="text-text-2 max-w-[640px] mb-8">
        Every VÆRØX system is currently in Building, Prototype, or Research stage.
      </p>
      <div className="border border-hairline p-6 font-mono text-[13px] leading-[1.7] text-text-3">
        Because nothing runs in production, there are no genuine incidents to publish. Engineering challenges, tradeoffs, and lessons learned are documented on the individual system pages and in Development Logs under Future Systems.
      </div>
    </main>
  );
}
