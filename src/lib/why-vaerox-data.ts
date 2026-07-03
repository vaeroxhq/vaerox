/**
 * Why VÆRØX — the reasons that back the studio's positioning.
 * Each point is testable against the rest of the site.
 */
export type WhyPoint = { code: string; title: string; body: string };

export const WHY_POINTS: WhyPoint[] = [
  {
    code: "01",
    title: "Deterministic State",
    body: "Every system mutation and milestone is logged in public version control. No black boxes. All logic paths are strictly defined before execution.",
  },
  {
    code: "02",
    title: "Zero-Trust Execution",
    body: "LLMs are treated as unreliable components. Versioned, evaluated, and sandboxed. Prompts are code. Retrieval accuracy is rigorously measured.",
  },
  {
    code: "03",
    title: "Idempotent Integration",
    body: "Systems designed for clean handovers and compounding architectural value over years. Fixed-scope modules optimize for seamless deployment cycles.",
  },
  {
    code: "04",
    title: "Production Observability",
    body: "Telemetry and event streams built in from day one. Migrations are reversible. Tests validate edge cases. Code written for the long term.",
  },
  {
    code: "05",
    title: "Architecture Protocols",
    body: "System diagrams, ADRs, and runbooks ship with the core framework. Trade-offs are explicitly modeled and recorded in the architectural registry.",
  },
  {
    code: "06",
    title: "Scalable Topology",
    body: "Nodes designed to survive traffic spikes and dataset scaling. Boundaries drawn logically before horizontal partitioning is required.",
  },
];
