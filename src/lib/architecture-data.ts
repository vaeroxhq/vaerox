/**
 * Architecture Decision Records — decisions taken while designing and
 * building the canonical VÆRØX systems. Every ADR references a real
 * system by canonical slug. Nothing here claims production behaviour
 * unless the underlying system is genuinely deployed.
 */

export type AdrStatus = "Accepted" | "Proposed" | "Superseded" | "Deprecated" | "Draft";
export type ReviewStatus = "Signed off" | "In review" | "Awaiting owner" | "Archived";

export type Adr = {
  number: string;
  slug: string;
  title: string;
  status: AdrStatus;
  decisionDate: string;
  owner: string;
  team: string;
  systems: string[];          // canonical system slugs
  review: ReviewStatus;
  supersedes?: string;
  supersededBy?: string;
  context: string;
  decision: string;
  consequences: string[];
  alternatives: { name: string; rejectedBecause: string }[];
  references: { label: string; href: string }[];
};

export const ADRS: Adr[] = [
  {
    number: "001",
    slug: "monorepo-boundary",
    title: "Monorepo boundary and workspace layout",
    status: "Accepted",
    decisionDate: "2025-11-04",
    owner: "Mayank Sharma",
    team: "Lab",
    systems: ["vestra", "quantedge", "marketpulse"],
    review: "Signed off",
    context:
      "The early split between VESTRA, QuantEdge, and MarketPulse repositories caused duplicated tooling and inconsistent CI. A single boundary was needed before adding more systems.",
    decision:
      "Consolidate the lab's systems into a single monorepo with workspace-scoped packages. Release trains remain per-system; tooling is shared.",
    consequences: [
      "One CI graph; per-package cache keys.",
      "Cross-cutting refactors become atomic.",
      "Repository size grows; sparse-checkout guidance documented.",
    ],
    alternatives: [
      { name: "Multi-repo with a meta tool", rejectedBecause: "Added a coordination layer without solving drift." },
    ],
    references: [],
  },
  {
    number: "005",
    slug: "vestra-agent-boundary",
    title: "VESTRA · agent / tool boundary",
    status: "Accepted",
    decisionDate: "2026-01-18",
    owner: "Mayank Sharma",
    team: "VESTRA",
    systems: ["vestra"],
    review: "Signed off",
    context:
      "Early VESTRA versions blurred model reasoning with tool execution, making failures hard to isolate. Debugging a wrong number in the portfolio summary required re-running the whole turn.",
    decision:
      "Enforce an explicit tool contract: every tool call has a typed signature, is logged with input/output, and is replayable. The agent may not reach around a tool.",
    consequences: [
      "Turn traces are inspectable step by step.",
      "Adding a tool now requires writing a schema and a test — a real cost.",
      "Enabled the parallel-tool-call optimisation captured in VAL-01.",
    ],
    alternatives: [
      { name: "Free-form tool calls with post-hoc logging", rejectedBecause: "Failures could not be reproduced deterministically." },
    ],
    references: [],
  },
  {
    number: "007",
    slug: "url-taxonomy-v2",
    title: "URL taxonomy · handbook layout",
    status: "Accepted",
    decisionDate: "2026-02-14",
    owner: "Mayank Sharma",
    team: "Lab",
    systems: ["vestra", "quantedge", "marketpulse", "aegis-ops", "leadpulse", "cloudcostiq", "axiom", "supply-chain-twin", "pitwall-ai"],
    review: "Signed off",
    context:
      "The site needed stable URLs before any deep linking or external references.",
    decision:
      "Adopt /systems, /projects, /architecture, /research, /journal, /benchmarks, /graph as canonical sections. URL structure is the sitemap.",
    consequences: ["URLs remain stable across content-model evolution."],
    alternatives: [{ name: "Flat /docs/*", rejectedBecause: "Precludes per-section metadata." }],
    references: [],
  },
  {
    number: "011",
    slug: "quantedge-analytics-core",
    title: "QuantEdge · DuckDB as the analytics core",
    status: "Accepted",
    decisionDate: "2026-02-02",
    owner: "Mayank Sharma",
    team: "QuantEdge",
    systems: ["quantedge"],
    review: "Signed off",
    context:
      "The walk-forward runner was I/O-bound in pandas. Pushing filters and joins into a query engine was the obvious next step, but a full Postgres was overkill for a single-workstation research environment.",
    decision:
      "Adopt DuckDB as the analytics core for reference-dataset scale. Preserve a pandas fallback for exploratory work.",
    consequences: [
      "Walk-forward runtime dropped substantially (see VAL-02).",
      "Reference dataset must fit the disk of the developer workstation. Called out as a known limitation.",
      "Not validated at 10× dataset size.",
    ],
    alternatives: [
      { name: "Postgres + read replicas", rejectedBecause: "Operational cost too high for a solo research tool." },
      { name: "Stay on pandas", rejectedBecause: "Refit time dominated iteration speed." },
    ],
    references: [],
  },
  {
    number: "014",
    slug: "marketpulse-prompt-versioning",
    title: "MarketPulse · prompt versioning and evaluation contract",
    status: "Accepted",
    decisionDate: "2026-03-11",
    owner: "Mayank Sharma",
    team: "MarketPulse",
    systems: ["marketpulse"],
    review: "Signed off",
    context:
      "Prompt iteration was drifting the classifier without an anchor. A prompt change looked fine on ten hand-picked examples and quietly regressed on the tail.",
    decision:
      "Every prompt version is committed with a hash and evaluated against the held-out 1,200-item set before merge. No prompt merges without a delta report.",
    consequences: [
      "Slower prompt iteration; caught two regressions that would have shipped.",
      "Held-out set becomes a maintained artifact, not an afterthought.",
    ],
    alternatives: [
      { name: "Spot-check via chat UI", rejectedBecause: "Selection bias made every change look like an improvement." },
    ],
    references: [],
  },
  {
    number: "018",
    slug: "aegis-workflow-substrate",
    title: "AEGIS OPS · LangGraph as the workflow substrate",
    status: "Accepted",
    decisionDate: "2026-04-04",
    owner: "Mayank Sharma",
    team: "AEGIS",
    systems: ["aegis-ops"],
    review: "Signed off",
    context:
      "Triage workflows kept growing branches for analyst decisions, retries, and human-in-the-loop steps. A hand-rolled state machine was becoming the biggest source of bugs.",
    decision:
      "Adopt LangGraph as the workflow substrate for AEGIS OPS. Wrap every LLM step with a typed contract and explicit retry policy.",
    consequences: [
      "Workflow graphs are inspectable in one place.",
      "Vendor coupling — mitigated by keeping tool logic outside LangGraph nodes.",
    ],
    alternatives: [
      { name: "Custom state machine", rejectedBecause: "Reinvents observability, retry, and branching primitives." },
    ],
    references: [],
  },
  {
    number: "022",
    slug: "leadpulse-human-in-loop",
    title: "LeadPulse · human-in-the-loop for outreach drafting",
    status: "Accepted",
    decisionDate: "2026-04-25",
    owner: "Mayank Sharma",
    team: "LeadPulse",
    systems: ["leadpulse"],
    review: "Signed off",
    context:
      "Sending LLM-drafted outreach without review is a reputational risk to any team that uses it. The prototype must respect that constraint.",
    decision:
      "All drafted outreach goes through a review UI before send. Auto-send is not an option, even for high-confidence segments.",
    consequences: [
      "Review is a real throughput constraint; captured on the LeadPulse page.",
      "Product boundary is explicit and defensible.",
    ],
    alternatives: [
      { name: "Auto-send above a confidence threshold", rejectedBecause: "No confidence score justifies the failure mode." },
    ],
    references: [],
  },
  {
    number: "025",
    slug: "cloudcostiq-forecast-explainability",
    title: "CloudCostIQ · forecasts must be explainable",
    status: "Accepted",
    decisionDate: "2026-05-14",
    owner: "Mayank Sharma",
    team: "CloudCostIQ",
    systems: ["cloudcostiq"],
    review: "Signed off",
    context:
      "A monthly cost forecast without a driver decomposition is a number nobody can act on. Early prototypes reported point estimates without attribution.",
    decision:
      "Every forecast surface includes the top drivers with signed contribution and an error bound. Point estimates are never rendered alone.",
    consequences: [
      "UI is denser; users get something they can argue with.",
      "Modelling constraint: the model must be decomposable, ruling out opaque ensembles.",
    ],
    alternatives: [
      { name: "Point estimate with a tooltip", rejectedBecause: "Buries the information users need most." },
    ],
    references: [],
  },
  {
    number: "029",
    slug: "axiom-deterministic-replay",
    title: "Axiom · deterministic replay as a first-class contract",
    status: "Proposed",
    decisionDate: "2026-05-30",
    owner: "Mayank Sharma",
    team: "Axiom",
    systems: ["axiom"],
    review: "In review",
    context:
      "Workflows that don't replay bit-identically are workflows you can't safely debug. Non-determinism was accreting through time, network, and randomness.",
    decision:
      "Introduce explicit determinism contracts per step: time reads, network reads, and RNG are wrapped and recorded. Non-deterministic steps must declare themselves.",
    consequences: [
      "Replay coverage tracked as a first-class metric (see VAL-07).",
      "Some third-party libraries fail contracts — reported as a known limitation.",
    ],
    alternatives: [
      { name: "Best-effort replay", rejectedBecause: "Silent divergence is worse than an honest failure." },
    ],
    references: [],
  },
];

/* Diagram catalog — hairline "diagram cells" pointing at their
 * canonical location. Text labels only; no raster images. */

export type DiagramKind =
  | "System"
  | "Sequence"
  | "Deployment"
  | "Data flow"
  | "Network"
  | "Schema"
  | "API"
  | "Dependency";

export type Diagram = {
  slug: string;
  kind: DiagramKind;
  title: string;
  summary: string;
  systems: string[];
  updated: string;
  nodes: number;
};

export const DIAGRAMS: Diagram[] = [
  { slug: "vestra-agent-loop",        kind: "System",     title: "VESTRA agent loop",                summary: "User turn → planner → tool contracts → portfolio store → streamed response.", systems: ["vestra"], updated: "2026-06-24", nodes: 12 },
  { slug: "vestra-portfolio-schema",  kind: "Schema",     title: "VESTRA portfolio schema",          summary: "accounts · holdings · goals · plan_nodes.", systems: ["vestra"], updated: "2026-05-30", nodes: 9 },
  { slug: "quantedge-runner-flow",    kind: "Data flow",  title: "QuantEdge walk-forward runner",     summary: "Strategy DSL → refit windows → DuckDB analytics core → report.", systems: ["quantedge"], updated: "2026-06-18", nodes: 11 },
  { slug: "marketpulse-classifier",   kind: "Data flow",  title: "MarketPulse classifier pipeline",   summary: "News source → normalizer → classifier prompt → sentiment store → held-out eval.", systems: ["marketpulse"], updated: "2026-06-19", nodes: 10 },
  { slug: "aegis-triage-graph",       kind: "Sequence",   title: "AEGIS triage workflow",             summary: "Alert → enrichment → LangGraph branches → analyst summary.", systems: ["aegis-ops"], updated: "2026-06-27", nodes: 14 },
  { slug: "leadpulse-scoring",        kind: "Data flow",  title: "LeadPulse scoring pipeline",        summary: "Signals → feature builder → model → segment calibration → review UI.", systems: ["leadpulse"], updated: "2026-06-12", nodes: 9 },
  { slug: "cloudcostiq-attribution",  kind: "Data flow",  title: "CloudCostIQ attribution",           summary: "Billing export → normalizer → attribution rules → rollup store → forecast.", systems: ["cloudcostiq"], updated: "2026-06-22", nodes: 12 },
  { slug: "axiom-runtime",            kind: "System",     title: "Axiom workflow runtime",            summary: "Workflow spec → step scheduler → contract layer → durable log → replay.", systems: ["axiom"], updated: "2026-06-08", nodes: 11 },
  { slug: "supply-chain-model",       kind: "System",     title: "Supply Chain Twin model",           summary: "Suppliers → tiers → distribution → SimPy events → validation harness.", systems: ["supply-chain-twin"], updated: "2026-05-30", nodes: 13 },
  { slug: "pitwall-strategy",         kind: "System",     title: "PitWall AI strategy sim",           summary: "Qualifying → tire model → stint planner → Monte-Carlo runner → outcome distribution.", systems: ["pitwall-ai"], updated: "2026-06-04", nodes: 10 },
];
