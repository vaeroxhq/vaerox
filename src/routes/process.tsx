import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

const STEPS: [string, string, string][] = [
  ["01", "Scoping conversation",
    "A short async or live conversation to understand what you're trying to build, who it's for, and where the hard part actually lives. Nothing is signed yet."],
  ["02", "Written proposal",
    "A short technical brief: the problem as understood, the proposed architecture, the risks, the milestones, and a fixed cost or capped time-and-materials estimate. Delivered inside a week."],
  ["03", "Prototype",
    "The riskiest piece gets built first — the retrieval quality, the agent behavior, the workflow contract — so that the rest of the work is executed against a proven core, not a hypothesis."],
  ["04", "Build",
    "Incremental delivery against explicit milestones. Weekly written updates. Everything under version control from day one. Nothing is hidden until the end."],
  ["05", "Evaluation",
    "Every AI surface ships with an evaluation harness. Every backend surface ships with health checks and observability. Numbers are measured, not promised."],
  ["06", "Handover",
    "Documentation, runbooks, ADRs, and a walkthrough — written for the engineer who inherits the code, not for the person who signed the contract."],
];

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — VÆRØX" },
      {
        name: "description",
        content:
          "How VÆRØX engages: scoping, proposal, prototype, build, evaluation, handover. Written, incremental, documented.",
      },
      { property: "og:title", content: "Process — VÆRØX" },
      { property: "og:description", content: "Six steps from first conversation to handover." },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Process" }]} />
      <PageHeader
        section="§ · Process"
        title="How the studio engages."
        summary="Six steps from first conversation to production handover. The work is written, incremental, and documented — the same discipline the rest of this site reflects."
        meta={[
          { label: "Steps",    value: STEPS.length.toString().padStart(2, "0") },
          { label: "Cadence",  value: "Weekly" },
          { label: "Contract", value: "Fixed or capped T&M" },
          { label: "Delivery", value: "Incremental" },
        ]}
      />

      <ol className="hairline bg-canvas">
        {STEPS.map(([n, t, b], i, arr) => (
          <li key={n} className={`grid grid-cols-[64px_1fr] gap-6 px-5 py-6 ${i < arr.length - 1 ? "hairline-b" : ""}`}>
            <span className="font-mono text-[11px] text-text-3 tabular pt-1">{n}</span>
            <div>
              <div className="font-display text-[17px] text-text-1 tracking-[-0.01em]">{t}</div>
              <p className="mt-2 text-[13.5px] text-text-2 leading-[1.65] max-w-[640px]">{b}</p>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
