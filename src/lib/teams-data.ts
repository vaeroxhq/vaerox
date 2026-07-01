/**
 * Surfaces of the lab.
 *
 * VÆRØX is not organized into teams — it is maintained by a single engineer.
 * The concept of a "surface" here is a filing structure: each entry is an
 * area of practice that the lab explores, documents, and exercises through
 * canonical reference implementations. Every surface is maintained by the
 * same person.
 *
 * The shape of `Team` is preserved so existing consumers (routes, graph
 * relations, filters) continue to work. `memberSlugs` is intentionally
 * empty; `lead` always points to the single maintainer. `systemsOwned` and
 * `currentProjects` only reference canonical projects that exist in the
 * roster today.
 */
export type Team = {
  slug: string;
  name: string;
  charter: string;
  lead: string;
  established: string;
  memberSlugs: string[];
  systemsOwned: string[];
  currentProjects: string[];
  responsibilities: string[];
  onCall: string;
};

const MAINT = "maintainer";
const NOT_APPLICABLE = "Not applicable — the lab is pre-production. Issues are triaged as they surface.";

export const TEAMS: Team[] = [
  {
    slug: "agents",
    name: "Agent Systems",
    charter: "Design of long-running LLM agents — plan graphs, tool contracts, memory boundaries, human review checkpoints.",
    lead: MAINT,
    established: "2024-11",
    memberSlugs: [],
    systemsOwned: ["vestra", "aegis-ops", "leadpulse"],
    currentProjects: ["vestra", "aegis-ops", "leadpulse"],
    responsibilities: [
      "Plan-graph design and step contracts",
      "Tool schema authoring and versioning",
      "Prompt evaluation and regression harnesses",
      "Human-in-the-loop review boundaries",
    ],
    onCall: NOT_APPLICABLE,
  },
  {
    slug: "market-data",
    name: "Market Data & Analytics",
    charter: "Ingestion, normalization, and evaluation of market and financial data — venue adapters, clock discipline, walk-forward evaluation.",
    lead: MAINT,
    established: "2024-08",
    memberSlugs: [],
    systemsOwned: ["marketpulse", "quantedge"],
    currentProjects: ["marketpulse", "quantedge"],
    responsibilities: [
      "News corpus and sentiment evaluation contracts",
      "Walk-forward backtest methodology for QuantEdge",
      "Held-out eval sets and prompt-version regression",
      "Normalized tick and event stream design",
    ],
    onCall: NOT_APPLICABLE,
  },
  {
    slug: "finops",
    name: "FinOps & Forecasting",
    charter: "Driver-decomposed cost forecasting and cloud spend intelligence — honest error bounds, explainable projections.",
    lead: MAINT,
    established: "2025-02",
    memberSlugs: [],
    systemsOwned: ["cloudcostiq"],
    currentProjects: ["cloudcostiq"],
    responsibilities: [
      "Cost driver decomposition methodology",
      "Forecast confidence-band construction",
      "Billing export ingestion and taxonomy",
      "Explainability of forecast deltas",
    ],
    onCall: NOT_APPLICABLE,
  },
  {
    slug: "workflows",
    name: "Workflow Runtime",
    charter: "Durable execution and determinism contracts for multi-step engineering workflows.",
    lead: MAINT,
    established: "2025-01",
    memberSlugs: [],
    systemsOwned: ["axiom"],
    currentProjects: ["axiom"],
    responsibilities: [
      "Determinism contracts for LangGraph runs",
      "Step-replay and audit-trail design",
      "Backpressure and retry semantics",
    ],
    onCall: NOT_APPLICABLE,
  },
  {
    slug: "simulation",
    name: "Simulation & Digital Twins",
    charter: "Discrete-event and physics-informed simulation for supply chain and motorsport strategy.",
    lead: MAINT,
    established: "2025-04",
    memberSlugs: [],
    systemsOwned: ["supply-chain-twin", "pitwall-ai"],
    currentProjects: ["supply-chain-twin", "pitwall-ai"],
    responsibilities: [
      "Baseline validation before optimization",
      "Discrete-event simulator design",
      "Tire and pit-strategy modeling",
      "Sensitivity analysis methodology",
    ],
    onCall: NOT_APPLICABLE,
  },
  {
    slug: "research",
    name: "Public Research",
    charter: "Reproducible evaluation harnesses, methodology write-ups, and reading notes that back the lab's technical claims.",
    lead: MAINT,
    established: "2024-09",
    memberSlugs: [],
    systemsOwned: [],
    currentProjects: [],
    responsibilities: [
      "Evaluation-harness design",
      "Dataset provenance and licensing hygiene",
      "Methodology critique and replication",
    ],
    onCall: NOT_APPLICABLE,
  },
  {
    slug: "performance",
    name: "Performance",
    charter: "Benchmark methodology, reproducibility rules, and the numbers cited across the site.",
    lead: MAINT,
    established: "2024-10",
    memberSlugs: [],
    systemsOwned: [],
    currentProjects: [],
    responsibilities: [
      "Benchmark methodology and hardware documentation",
      "Regression rules for published numbers",
      "Reproduction scripts and raw data",
    ],
    onCall: NOT_APPLICABLE,
  },
  {
    slug: "devex",
    name: "Developer Experience",
    charter: "The build graph, CI conventions, ADR tooling, and the daily loop the lab itself runs on.",
    lead: MAINT,
    established: "2024-06",
    memberSlugs: [],
    systemsOwned: [],
    currentProjects: [],
    responsibilities: [
      "Build graph and incremental correctness",
      "CI wall-time budget",
      "ADR and RFC tooling",
    ],
    onCall: NOT_APPLICABLE,
  },
];

const teamIndex = new Map<string, Team>();
for (const t of TEAMS) teamIndex.set(t.slug, t);

export function getTeam(slug: string): Team | undefined {
  return teamIndex.get(slug);
}
