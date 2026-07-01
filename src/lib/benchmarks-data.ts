/**
 * Engineering Validation — architecture validation, prototype
 * evaluation, and reproducible measurements collected while building
 * the systems inside the VÆRØX Engineering Lab.
 *
 * Every entry is either measured on a defined workload, a stated
 * design target, or explicitly marked "Not yet measured". Nothing
 * here implies operating production infrastructure.
 */

export type ValidationStatus =
  | "Target"
  | "Prototype measured"
  | "In progress"
  | "Not yet measured";

export type ValidationPhase =
  | "Concept"
  | "Research"
  | "Architecture"
  | "Prototype"
  | "Reference implementation"
  | "Experimental"
  | "Completed";

export type BenchmarkRun = {
  date: string;
  value: number;
  build: string;
  note?: string;
};

export type Benchmark = {
  slug: string;
  code: string;
  title: string;
  system: string;           // canonical system slug
  focus: string;
  phase: ValidationPhase;
  status: ValidationStatus;
  goal: string;
  updated: string;
  methodology: string[];
  findings: string[];
  runs: BenchmarkRun[];
  relatedSystems: string[];
  relatedAdrs: string[];
  relatedIncidents: string[];
};

export const BENCHMARKS: Benchmark[] = [
  {
    slug: "vestra-agent-latency",
    code: "VAL-01",
    title: "VESTRA · agent turn latency",
    system: "vestra",
    focus: "End-to-end latency of a portfolio-grounded agent turn on the local prototype.",
    phase: "Prototype",
    status: "Prototype measured",
    goal: "Sub-2 s median for portfolio-summary turns on the local prototype with a warm context.",
    updated: "2026-06-24",
    methodology: [
      "Runs on a single developer workstation against a synthetic 12-account portfolio.",
      "Turn latency = user submit → last streamed token, LLM cache disabled.",
      "Not a claim about production behaviour under real users.",
    ],
    findings: [
      "Tool-call latency dominates. Batching parallel tool calls cut median turn time by ~40%.",
      "Portfolio-summary turns comfortably under target; multi-step planning turns still above.",
    ],
    runs: [
      { date: "2026-05-18", value: 3400, build: "vestra@0.3.1", note: "Sequential tool calls." },
      { date: "2026-06-24", value: 1950, build: "vestra@0.4.0", note: "Parallel tool calls, streaming." },
    ],
    relatedSystems: ["vestra"],
    relatedAdrs: [],
    relatedIncidents: [],
  },
  {
    slug: "quantedge-walkforward",
    code: "VAL-02",
    title: "QuantEdge · walk-forward runner throughput",
    system: "quantedge",
    focus: "Wall-clock time to walk-forward evaluate a factor model across a 10-year window.",
    phase: "Reference implementation",
    status: "Prototype measured",
    goal: "Full 10-year walk-forward for a 3-factor equity model in under 90 s on the reference dataset.",
    updated: "2026-06-18",
    methodology: [
      "DuckDB analytics core over the local reference dataset (~4M rows).",
      "Walk-forward window: quarterly refit, weekly evaluation.",
      "Sharpe and drawdown methodology described alongside the code, not just the numbers.",
    ],
    findings: [
      "Refit dominates. Caching the pre-computed factor exposures keeps refit near-linear in window count.",
      "DuckDB out-of-core reads negligible at this dataset size; behaviour at 10× is unmeasured.",
    ],
    runs: [
      { date: "2026-05-11", value: 145, build: "qe@0.2.4" },
      { date: "2026-06-18", value: 71, build: "qe@0.3.0", note: "Cached factor exposures." },
    ],
    relatedSystems: ["quantedge"],
    relatedAdrs: [],
    relatedIncidents: [],
  },
  {
    slug: "marketpulse-classifier-eval",
    code: "VAL-03",
    title: "MarketPulse · news-classifier accuracy",
    system: "marketpulse",
    focus: "Accuracy of the LLM classification prompt on a held-out labelled news set.",
    phase: "Prototype",
    status: "Prototype measured",
    goal: "≥ 0.88 macro-F1 on the internal 1.2K held-out set, per-tag cost under $0.002.",
    updated: "2026-06-19",
    methodology: [
      "1,200 hand-labelled headlines across 8 tags. Held-out from prompt iteration.",
      "Cost is measured per tag using the vendor's published pricing at run time.",
      "Prompt versions live in the repo; every eval run pins a prompt hash.",
    ],
    findings: [
      "Chain-of-tags prompting beat single-shot classification by 4 F1 points at equal cost.",
      "A cheaper model gets within 1 F1 point at half the cost on the majority classes.",
    ],
    runs: [
      { date: "2026-05-05", value: 84, build: "mp@0.5.2", note: "Single-shot baseline · F1×100." },
      { date: "2026-06-19", value: 88, build: "mp@0.6.0", note: "Chain-of-tags · F1×100." },
    ],
    relatedSystems: ["marketpulse"],
    relatedAdrs: [],
    relatedIncidents: [],
  },
  {
    slug: "aegis-triage-workflow",
    code: "VAL-04",
    title: "AEGIS OPS · triage workflow completion time",
    system: "aegis-ops",
    focus: "End-to-end LangGraph workflow time for the standard triage playbook on synthetic alerts.",
    phase: "Prototype",
    status: "Prototype measured",
    goal: "Under 6 s median for the standard triage playbook against synthetic SIEM alerts.",
    updated: "2026-06-27",
    methodology: [
      "Synthetic alert corpus of 500 events across 5 shapes.",
      "Workflow latency = ingest → final analyst-facing summary.",
      "LLM calls hit the real API; retrieval hits a local OpenSearch instance.",
    ],
    findings: [
      "Retrieval calls dominate on unseen alert shapes. Prewarming the retrieval cache brings median under target.",
      "Cold-start (fresh cache) still above target; captured as a known limitation.",
    ],
    runs: [
      { date: "2026-05-30", value: 9.4, build: "aegis@0.2.1", note: "Cold cache." },
      { date: "2026-06-27", value: 5.2, build: "aegis@0.3.0", note: "Warm cache." },
    ],
    relatedSystems: ["aegis-ops"],
    relatedAdrs: [],
    relatedIncidents: [],
  },
  {
    slug: "leadpulse-scoring-precision",
    code: "VAL-05",
    title: "LeadPulse · scoring precision at k",
    system: "leadpulse",
    focus: "Precision@50 of the lead-scoring prototype against a labelled synthetic pipeline.",
    phase: "Prototype",
    status: "Prototype measured",
    goal: "Precision@50 ≥ 0.70 on the synthetic pipeline, calibrated per segment.",
    updated: "2026-06-12",
    methodology: [
      "Synthetic pipeline of 2,000 accounts with hand-labelled ground truth.",
      "Precision@50 evaluated per segment (SMB / mid-market / enterprise).",
      "Not validated on real B2B pipelines yet.",
    ],
    findings: [
      "Enterprise segment above target; SMB well below — feature set is too sparse.",
      "Adding intent signals disproportionately helped enterprise, made SMB noisier.",
    ],
    runs: [
      { date: "2026-05-14", value: 62, build: "lp@0.2.0", note: "Baseline model · P@50×100." },
      { date: "2026-06-12", value: 71, build: "lp@0.3.0", note: "Intent features · P@50×100." },
    ],
    relatedSystems: ["leadpulse"],
    relatedAdrs: [],
    relatedIncidents: [],
  },
  {
    slug: "cloudcostiq-forecast-error",
    code: "VAL-06",
    title: "CloudCostIQ · forecast MAPE",
    system: "cloudcostiq",
    focus: "Mean absolute percentage error of the monthly cost forecast on synthetic billing exports.",
    phase: "Prototype",
    status: "Prototype measured",
    goal: "≤ 8% MAPE on 30-day forward forecast for synthetic multi-account exports.",
    updated: "2026-06-22",
    methodology: [
      "Synthetic CUR-shaped exports covering 8 accounts and 6 services over 18 months.",
      "Rolling-origin evaluation; forecast horizon = 30 days.",
      "Error bounds published alongside every headline number.",
    ],
    findings: [
      "Aggregate MAPE within target; per-service error is much higher on bursty services.",
      "Explainability of drivers is at least as valuable as the point estimate.",
    ],
    runs: [
      { date: "2026-05-28", value: 11, build: "ccq@0.2.2", note: "Baseline seasonal." },
      { date: "2026-06-22", value: 7, build: "ccq@0.3.0", note: "Driver-decomposed model." },
    ],
    relatedSystems: ["cloudcostiq"],
    relatedAdrs: [],
    relatedIncidents: [],
  },
  {
    slug: "axiom-replay-determinism",
    code: "VAL-07",
    title: "Axiom · deterministic replay coverage",
    system: "axiom",
    focus: "Fraction of prototype workflow patterns that replay bit-identically after 100 runs.",
    phase: "Prototype",
    status: "In progress",
    goal: "100% deterministic replay across the initial workflow pattern library.",
    updated: "2026-06-08",
    methodology: [
      "Each pattern executed 100 times with recorded IO; replays diffed against the first run.",
      "Non-determinism attributed to specific step contracts; contracts iterated.",
    ],
    findings: [
      "Time-dependent and network-dependent steps needed explicit determinism contracts.",
      "Currently 11 of 14 patterns replay bit-identically; remaining 3 tracked as open issues.",
    ],
    runs: [
      { date: "2026-05-01", value: 6, build: "axiom@0.1.0", note: "Patterns passing (of 14)." },
      { date: "2026-06-08", value: 11, build: "axiom@0.2.0" },
    ],
    relatedSystems: ["axiom"],
    relatedAdrs: [],
    relatedIncidents: [],
  },
  {
    slug: "supply-chain-baseline",
    code: "VAL-08",
    title: "Supply Chain Twin · validation against analytical baselines",
    system: "supply-chain-twin",
    focus: "Deviation of simulation outputs from M/M/1 and Little's-law baselines.",
    phase: "Research",
    status: "Prototype measured",
    goal: "Deviation < 2% on standard queueing baselines before trusting any custom scenario.",
    updated: "2026-05-30",
    methodology: [
      "Compare mean queue length and wait time from the simulator against closed-form M/M/1 solutions.",
      "Validate throughput against Little's law across a sweep of utilization values.",
    ],
    findings: [
      "Within 1.4% across the utilization sweep. Confidence intervals published.",
      "Custom multi-tier scenarios remain unvalidated; explicitly noted on every scenario page.",
    ],
    runs: [
      { date: "2026-05-30", value: 1.4, build: "sct@0.1.0", note: "Max % deviation." },
    ],
    relatedSystems: ["supply-chain-twin"],
    relatedAdrs: [],
    relatedIncidents: [],
  },
  {
    slug: "pitwall-strategy-sim",
    code: "VAL-09",
    title: "PitWall AI · strategy simulator error",
    system: "pitwall-ai",
    focus: "Predicted vs. actual finishing position across a rolling window of races.",
    phase: "Research",
    status: "In progress",
    goal: "Median absolute position error ≤ 2 places on the rolling evaluation set.",
    updated: "2026-06-04",
    methodology: [
      "Simulator seeded from qualifying and historical degradation curves.",
      "Rolling window of 12 races; evaluation is honest about missing weather and safety-car dynamics.",
    ],
    findings: [
      "Tire-degradation model is the biggest error source on high-deg tracks.",
      "Adding safety-car probability shrinks tail error meaningfully.",
    ],
    runs: [
      { date: "2026-05-14", value: 3.1, build: "pw@0.1.0" },
      { date: "2026-06-04", value: 2.4, build: "pw@0.2.0", note: "Safety-car probability added." },
    ],
    relatedSystems: ["pitwall-ai"],
    relatedAdrs: [],
    relatedIncidents: [],
  },
];
