/**
 * Engineering evidence — per-system and per-project supporting facts.
 * Rebuilt for the canonical roster. Numbers are conservative,
 * repository-scale estimates for a single-maintainer lab, not
 * inflated production metrics.
 */

export type EvidenceVersion = {
  tag: string;
  at: string;
  headline: string;
  detail: string;
};

export type EvidenceTradeoff = {
  choice: string;
  over: string;
  because: string;
};

export type EvidenceLimitation = {
  title: string;
  detail: string;
  kind: "current" | "scaling" | "future" | "research" | "experimental";
};

export type EvidenceFailure = {
  at: string;
  title: string;
  detail: string;
  lesson: string;
};

export type EvidenceMetric = {
  label: string;
  value: string;
};

export type SystemEvidence = {
  loc: number;
  files: number;
  languages: { name: string; share: number }[];
  runtime: string;
  storage?: string;
  queue?: string;
  database?: string;
  dependencies: number;
  repoAgeMonths: number;
  architectureRevisions: number;
  adrRefs: string[];
  benchmarkRefs: string[];
  incidentRefs: string[];
  tradeoffs: EvidenceTradeoff[];
  limitations: EvidenceLimitation[];
  evolution: EvidenceVersion[];
  failures: EvidenceFailure[];
  docsCoverage: number;
  additionalMetrics?: EvidenceMetric[];
};

export type ProjectEvidence = {
  loc: number;
  languages: { name: string; share: number }[];
  linkedSystem?: string;
  adrRefs: string[];
  benchmarkRefs: string[];
  incidentRefs: string[];
  researchRefs: string[];
  tradeoffs: EvidenceTradeoff[];
  limitations: EvidenceLimitation[];
  evolution: EvidenceVersion[];
  failures: EvidenceFailure[];
  additionalMetrics?: EvidenceMetric[];
};

const py = { name: "Python", share: 0.82 };
const ts = { name: "TypeScript", share: 0.65 };

export const SYSTEM_EVIDENCE: Record<string, SystemEvidence> = {
  vestra: {
    loc: 18_400,
    files: 214,
    languages: [py, { name: "TypeScript", share: 0.12 }, { name: "SQL", share: 0.06 }],
    runtime: "Python 3.12 · FastAPI 0.115 · LangGraph 0.2",
    database: "PostgreSQL 16",
    storage: "Local disk",
    queue: "In-process",
    dependencies: 42,
    repoAgeMonths: 8,
    architectureRevisions: 3,
    docsCoverage: 0.62,
    adrRefs: ["vestra-agent-boundary"],
    benchmarkRefs: ["vestra-agent-latency"],
    incidentRefs: [],
    tradeoffs: [
      {
        choice: "FastAPI + LangGraph",
        over: "custom agent framework",
        because:
          "Standard LangGraph primitives cover 90% of the graph; the remaining 10% would have been a maintenance tax on a solo project.",
      },
      {
        choice: "Typed tool contracts",
        over: "free-form tool calls",
        because: "Made turn traces replayable and enabled the parallel-tool-call optimisation.",
      },
    ],
    limitations: [
      {
        kind: "current",
        title: "Synthetic portfolios only",
        detail:
          "Live account integrations are not implemented. All evaluation is against synthetic 12-account portfolios.",
      },
      {
        kind: "future",
        title: "Multi-step planning turns",
        detail:
          "Median latency for multi-step planning turns is above target; batching plan expansion is planned.",
      },
    ],
    evolution: [
      {
        tag: "v0.1",
        at: "2025-11-20",
        headline: "Portfolio ingestion",
        detail: "Read-only portfolio state and a first pass at a summary turn.",
      },
      {
        tag: "v0.3",
        at: "2026-03-10",
        headline: "Tool contracts",
        detail: "Introduced typed tool contracts and replayable turn traces.",
      },
      {
        tag: "v0.4",
        at: "2026-06-24",
        headline: "Parallel tool calls",
        detail: "Parallel tool-call optimisation dropped median turn latency to 1.95 s (VAL-01).",
      },
    ],
    failures: [],
    additionalMetrics: [
      { label: "Tool contracts", value: "14" },
      { label: "Prompt versions", value: "23" },
    ],
  },
  quantedge: {
    loc: 22_800,
    files: 268,
    languages: [py, { name: "SQL", share: 0.11 }, { name: "Jupyter", share: 0.07 }],
    runtime: "Python 3.12 · DuckDB 1.1 · PyTorch 2.4",
    database: "DuckDB (local)",
    storage: "Parquet on local disk",
    dependencies: 51,
    repoAgeMonths: 10,
    architectureRevisions: 4,
    docsCoverage: 0.71,
    adrRefs: ["quantedge-analytics-core"],
    benchmarkRefs: ["quantedge-walkforward"],
    incidentRefs: [],
    tradeoffs: [
      {
        choice: "DuckDB",
        over: "Postgres",
        because:
          "Operational cost of a full database was unjustified for a solo research environment; DuckDB moved the analytics into a query engine without asking for a service.",
      },
      {
        choice: "DSL over notebooks",
        over: "notebook-only workflow",
        because:
          "Strategy definitions need to be reviewable and reproducible; notebooks alone drift.",
      },
    ],
    limitations: [
      {
        kind: "scaling",
        title: "Reference-dataset scale",
        detail:
          "Not validated at 10× the current reference dataset. When I get there, the measurement will be published.",
      },
      {
        kind: "current",
        title: "Equity data only",
        detail: "Derivatives and cross-asset factor models are on the roadmap, not implemented.",
      },
    ],
    evolution: [
      {
        tag: "v0.1",
        at: "2025-09-14",
        headline: "Pandas walk-forward",
        detail: "First walk-forward runner over pandas. I/O bound.",
      },
      {
        tag: "v0.2",
        at: "2026-02-02",
        headline: "DuckDB analytics core",
        detail:
          "Adopted DuckDB (ADR·011); walk-forward dropped from 145 s to 71 s after factor caching.",
      },
    ],
    failures: [],
  },
  marketpulse: {
    loc: 14_200,
    files: 172,
    languages: [py, { name: "SQL", share: 0.09 }],
    runtime: "Python 3.12 · FastAPI 0.115 · Redis 7",
    database: "PostgreSQL 16",
    storage: "Object store (news bodies)",
    dependencies: 36,
    repoAgeMonths: 9,
    architectureRevisions: 3,
    docsCoverage: 0.66,
    adrRefs: ["marketpulse-prompt-versioning"],
    benchmarkRefs: ["marketpulse-classifier-eval"],
    incidentRefs: [],
    tradeoffs: [
      {
        choice: "Held-out eval as merge gate",
        over: "spot-checking via chat UI",
        because: "Spot checks are selection-biased; a held-out set forces honest deltas.",
      },
    ],
    limitations: [
      {
        kind: "current",
        title: "English-only headlines",
        detail:
          "Classification is not evaluated on non-English news; extending the eval set is planned.",
      },
    ],
    evolution: [
      {
        tag: "v0.4",
        at: "2026-01-15",
        headline: "First classifier",
        detail: "Single-shot prompt over an internal 400-item labelled set.",
      },
      {
        tag: "v0.6",
        at: "2026-06-19",
        headline: "Chain-of-tags",
        detail: "Chain-of-tags prompting reached 0.88 macro-F1 on the 1.2K held-out set (VAL-03).",
      },
    ],
    failures: [],
  },
  "aegis-ops": {
    loc: 21_100,
    files: 258,
    languages: [py, { name: "TypeScript", share: 0.14 }],
    runtime: "Python 3.12 · LangGraph 0.2 · OpenSearch 2",
    database: "PostgreSQL 16",
    storage: "OpenSearch indices",
    dependencies: 47,
    repoAgeMonths: 6,
    architectureRevisions: 2,
    docsCoverage: 0.58,
    adrRefs: ["aegis-workflow-substrate"],
    benchmarkRefs: ["aegis-triage-workflow"],
    incidentRefs: [],
    tradeoffs: [
      {
        choice: "LangGraph for the workflow layer",
        over: "custom state machine",
        because:
          "Reinventing branching, retries, and observability was the biggest bug source in the earlier prototype.",
      },
      {
        choice: "Tool logic outside graph nodes",
        over: "LLM calls inside nodes",
        because: "Keeps vendor coupling small and testing sane.",
      },
    ],
    limitations: [
      {
        kind: "current",
        title: "Cold-cache latency",
        detail:
          "Median triage latency is above target on a cold retrieval cache; warm cache meets it.",
      },
      {
        kind: "current",
        title: "Synthetic SIEM traces only",
        detail: "No live SIEM integrations yet.",
      },
    ],
    evolution: [
      {
        tag: "v0.1",
        at: "2026-02-11",
        headline: "First triage prototype",
        detail: "Hand-rolled state machine over synthetic alerts.",
      },
      {
        tag: "v0.3",
        at: "2026-06-27",
        headline: "LangGraph rewrite",
        detail: "Rebuilt on LangGraph (ADR·018); warm-cache median reached 5.2 s (VAL-04).",
      },
    ],
    failures: [],
  },
  leadpulse: {
    loc: 12_800,
    files: 156,
    languages: [py, { name: "TypeScript", share: 0.16 }],
    runtime: "Python 3.12 · FastAPI 0.115",
    database: "PostgreSQL 16",
    dependencies: 34,
    repoAgeMonths: 7,
    architectureRevisions: 2,
    docsCoverage: 0.63,
    adrRefs: ["leadpulse-human-in-loop"],
    benchmarkRefs: ["leadpulse-scoring-precision"],
    incidentRefs: [],
    tradeoffs: [
      {
        choice: "Human review before send",
        over: "auto-send above a confidence threshold",
        because:
          "The failure mode is reputational and asymmetric; no confidence score justifies it.",
      },
    ],
    limitations: [
      {
        kind: "current",
        title: "SMB segment underperforms",
        detail: "Precision@50 is well below target on SMB; feature set is too sparse.",
      },
      {
        kind: "current",
        title: "Synthetic pipelines only",
        detail: "No live pipeline integrations yet.",
      },
    ],
    evolution: [
      {
        tag: "v0.2",
        at: "2026-05-14",
        headline: "Baseline scoring",
        detail: "Baseline model at 0.62 Precision@50 on synthetic pipelines.",
      },
      {
        tag: "v0.3",
        at: "2026-06-12",
        headline: "Intent features",
        detail: "Adding intent signals raised enterprise segment Precision@50 to 0.71 (VAL-05).",
      },
    ],
    failures: [],
  },
  cloudcostiq: {
    loc: 16_900,
    files: 198,
    languages: [py, ts],
    runtime: "Python 3.12 · DuckDB 1.1 · React 19",
    database: "DuckDB (local)",
    storage: "Parquet on local disk",
    dependencies: 45,
    repoAgeMonths: 5,
    architectureRevisions: 2,
    docsCoverage: 0.69,
    adrRefs: ["cloudcostiq-forecast-explainability"],
    benchmarkRefs: ["cloudcostiq-forecast-error"],
    incidentRefs: [],
    tradeoffs: [
      {
        choice: "Driver-decomposed forecast model",
        over: "opaque ensemble",
        because: "Forecasts must be explainable; the modelling constraint is welcome.",
      },
    ],
    limitations: [
      {
        kind: "current",
        title: "Synthetic CUR exports",
        detail:
          "Attribution is validated on synthetic AWS-shaped exports; other clouds not covered yet.",
      },
      {
        kind: "scaling",
        title: "Per-service error",
        detail:
          "Aggregate MAPE within target; per-service error on bursty services is much higher.",
      },
    ],
    evolution: [
      {
        tag: "v0.2",
        at: "2026-05-28",
        headline: "Baseline forecast",
        detail: "Baseline seasonal model at 11% MAPE.",
      },
      {
        tag: "v0.3",
        at: "2026-06-22",
        headline: "Driver decomposition",
        detail: "Explainable driver model reached 7% MAPE (VAL-06).",
      },
    ],
    failures: [],
  },
  axiom: {
    loc: 11_400,
    files: 148,
    languages: [ts, { name: "SQL", share: 0.08 }],
    runtime: "Node 22 · Temporal 1.24 · PostgreSQL 16",
    database: "PostgreSQL 16",
    dependencies: 38,
    repoAgeMonths: 4,
    architectureRevisions: 3,
    docsCoverage: 0.55,
    adrRefs: ["axiom-deterministic-replay"],
    benchmarkRefs: ["axiom-replay-determinism"],
    incidentRefs: [],
    tradeoffs: [
      {
        choice: "Explicit determinism contracts",
        over: "best-effort replay",
        because: "Silent divergence between run and replay is worse than an honest failure.",
      },
    ],
    limitations: [
      {
        kind: "current",
        title: "Third-party non-determinism",
        detail: "Some third-party libraries fail determinism contracts and are quarantined.",
      },
      { kind: "current", title: "Small pattern library", detail: "14 workflow patterns; growing." },
    ],
    evolution: [
      {
        tag: "v0.1",
        at: "2026-05-01",
        headline: "Runtime skeleton",
        detail: "Workflow runtime with 6 of 14 patterns replaying deterministically.",
      },
      {
        tag: "v0.2",
        at: "2026-06-08",
        headline: "Contract layer",
        detail:
          "Explicit determinism contracts brought 11 of 14 patterns to bit-identical replay (VAL-07).",
      },
    ],
    failures: [],
  },
  "supply-chain-twin": {
    loc: 9_800,
    files: 116,
    languages: [py],
    runtime: "Python 3.12 · SimPy 4 · NetworkX 3",
    storage: "Parquet on local disk",
    dependencies: 28,
    repoAgeMonths: 3,
    architectureRevisions: 1,
    docsCoverage: 0.72,
    adrRefs: [],
    benchmarkRefs: ["supply-chain-baseline"],
    incidentRefs: [],
    tradeoffs: [
      {
        choice: "Validate against analytical baselines first",
        over: "trust the simulator on custom scenarios",
        because:
          "A sim that can't reproduce M/M/1 can't credibly tell you about a custom scenario.",
      },
    ],
    limitations: [
      {
        kind: "research",
        title: "Custom scenarios unvalidated",
        detail: "Multi-tier custom scenarios are marked unvalidated on every scenario page.",
      },
    ],
    evolution: [
      {
        tag: "v0.1",
        at: "2026-05-30",
        headline: "Validated core",
        detail:
          "Simulator matches M/M/1 and Little's law within 1.4% across the utilisation sweep (VAL-08).",
      },
    ],
    failures: [],
  },
  "pitwall-ai": {
    loc: 7_400,
    files: 92,
    languages: [py],
    runtime: "Python 3.12 · PyTorch 2.4 · Pandas 2.2",
    storage: "Parquet on local disk",
    dependencies: 24,
    repoAgeMonths: 3,
    architectureRevisions: 2,
    docsCoverage: 0.6,
    adrRefs: [],
    benchmarkRefs: ["pitwall-strategy-sim"],
    incidentRefs: [],
    tradeoffs: [
      {
        choice: "Per-track degradation curves",
        over: "single global degradation curve",
        because: "Global curves under-predicted wear on high-degradation tracks.",
      },
    ],
    limitations: [
      {
        kind: "research",
        title: "No weather or safety-car dynamics",
        detail: "Simulator does not model weather; safety-car probability was added but is coarse.",
      },
    ],
    evolution: [
      {
        tag: "v0.1",
        at: "2026-05-14",
        headline: "First simulator",
        detail: "Baseline Monte-Carlo strategy runner at 3.1 median position error.",
      },
      {
        tag: "v0.2",
        at: "2026-06-04",
        headline: "Safety-car probability",
        detail: "Adding safety-car probability shrank tail error to 2.4 (VAL-09).",
      },
    ],
    failures: [],
  },
};

export const PROJECT_EVIDENCE: Record<string, ProjectEvidence> = Object.fromEntries(
  Object.entries(SYSTEM_EVIDENCE).map(([slug, ev]) => [
    slug,
    {
      loc: ev.loc,
      languages: ev.languages,
      linkedSystem: slug,
      adrRefs: ev.adrRefs,
      benchmarkRefs: ev.benchmarkRefs,
      incidentRefs: [],
      researchRefs: [],
      tradeoffs: ev.tradeoffs,
      limitations: ev.limitations,
      evolution: ev.evolution,
      failures: ev.failures,
      additionalMetrics: ev.additionalMetrics,
    },
  ]),
);

export function getSystemEvidence(slug: string): SystemEvidence | undefined {
  return SYSTEM_EVIDENCE[slug];
}

export function getProjectEvidence(slug: string): ProjectEvidence | undefined {
  return PROJECT_EVIDENCE[slug];
}
