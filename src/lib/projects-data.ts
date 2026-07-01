export type ProjectStage = "Building" | "Prototype" | "Research" | "Production" | "Archived";

export type ProjectEntry = {
  slug: string;
  name: string;
  description: string;
  stage: ProjectStage;
  architecture: string;
  stack: string[];
  timeline: string;
  started: string;
  updated: string;
  role: string;
  outcome: string;
};

/**
 * Projects mirror the canonical Systems roster 1:1 by slug. Each entry
 * is the build write-up view of the same system. Nothing here claims
 * production deployment unless it is genuinely deployed.
 */
export const PROJECTS: ProjectEntry[] = [
  {
    slug: "vestra",
    name: "VESTRA",
    description:
      "Building an AI-native wealth operating system: portfolio ingestion, goal planning, and grounded conversational agents.",
    stage: "Building",
    architecture: "FastAPI service · LangGraph agents · Postgres portfolio store · React web client",
    stack: ["Python", "FastAPI", "PostgreSQL", "LangGraph", "React"],
    timeline: "2025-Q4 → present",
    started: "2025-11-02",
    updated: "2026-06-28",
    role: "Solo build — architecture, backend, agent orchestration, and UI",
    outcome:
      "Portfolio ingestion, plan graph, and conversational agent prototype running end-to-end against synthetic accounts. Live account integrations planned; see the VESTRA page.",
  },
  {
    slug: "quantedge",
    name: "QuantEdge AI",
    description:
      "Quantitative research platform — walk-forward backtests, factor models, risk decomposition. Not a live trading engine.",
    stage: "Building",
    architecture: "DuckDB analytics core · strategy DSL · walk-forward runner · notebook interface",
    stack: ["Python", "DuckDB", "NumPy", "Pandas", "PyTorch"],
    timeline: "2025-Q3 → present",
    started: "2025-09-14",
    updated: "2026-06-24",
    role: "Solo build — research infrastructure and evaluation methodology",
    outcome:
      "Reproducible walk-forward evaluation over multi-year equity data, with documented Sharpe / drawdown methodology. Factor-model library iterating.",
  },
  {
    slug: "marketpulse",
    name: "MarketPulse",
    description:
      "News ingestion and LLM-based classification for equities and macro events, with explicit prompt-evaluation methodology.",
    stage: "Prototype",
    architecture: "News ingestion workers · classification pipeline · sentiment store · evaluation harness",
    stack: ["Python", "FastAPI", "PostgreSQL", "OpenAI"],
    timeline: "2025-Q4 → present",
    started: "2025-10-08",
    updated: "2026-06-19",
    role: "Solo build — data engineering, prompt design, evaluation",
    outcome:
      "Classification prototype running against a rolling news corpus; per-prompt cost and accuracy tracked in the Engineering Validation records.",
  },
  {
    slug: "aegis-ops",
    name: "AEGIS OPS",
    description:
      "Security and DFIR workflow platform — triage, threat intel, and fraud scoring composed as LangGraph agents.",
    stage: "Building",
    architecture: "SIEM adapters · LangGraph workflow layer · alert store · analyst UI",
    stack: ["Python", "LangGraph", "PostgreSQL", "OpenSearch"],
    timeline: "2026-Q1 → present",
    started: "2026-01-20",
    updated: "2026-06-30",
    role: "Solo build — architecture, workflow design, and evaluation",
    outcome:
      "Triage workflow prototype running against synthetic SIEM traces; fraud-scoring pipeline in evaluation.",
  },
  {
    slug: "leadpulse",
    name: "LeadPulse",
    description:
      "Revenue intelligence — lead qualification, account signals, and LLM-drafted outreach with human-in-the-loop review.",
    stage: "Prototype",
    architecture: "Signal ingestion · scoring service · drafting agent · review UI",
    stack: ["Python", "FastAPI", "PostgreSQL", "OpenAI"],
    timeline: "2025-Q4 → present",
    started: "2025-12-01",
    updated: "2026-06-14",
    role: "Solo build — signals, scoring, and drafting evaluation",
    outcome:
      "Scoring prototype against synthetic pipelines; drafting evaluation methodology published in the Journal.",
  },
  {
    slug: "cloudcostiq",
    name: "CloudCostIQ",
    description:
      "FinOps platform — attribution, forecasting, and explainable spend drivers over cloud billing exports.",
    stage: "Building",
    architecture: "Billing ingest · attribution engine · forecast model · React dashboard",
    stack: ["Python", "DuckDB", "React", "AWS SDK"],
    timeline: "2026-Q1 → present",
    started: "2026-02-10",
    updated: "2026-06-22",
    role: "Solo build — data model, forecasting, and UI",
    outcome:
      "Attribution engine running over synthetic CUR exports; forecast model documented with error bounds.",
  },
  {
    slug: "axiom",
    name: "Axiom",
    description:
      "Durable workflow orchestration for AI-assisted internal tooling with explicit step contracts and replay.",
    stage: "Prototype",
    architecture: "Workflow definition DSL · Temporal-style runtime · step contract layer",
    stack: ["TypeScript", "Node", "PostgreSQL", "Temporal"],
    timeline: "2026-Q1 → present",
    started: "2026-03-04",
    updated: "2026-06-08",
    role: "Solo build — runtime design and contract layer",
    outcome:
      "Prototype runtime with deterministic replay over a small library of workflow patterns; still exploring API surface.",
  },
  {
    slug: "supply-chain-twin",
    name: "Supply Chain Digital Twin",
    description:
      "Discrete-event simulation of multi-tier supply chains with model validation against analytical baselines.",
    stage: "Research",
    architecture: "SimPy simulation core · scenario library · validation harness",
    stack: ["Python", "SimPy", "NetworkX", "PyTorch"],
    timeline: "2026-Q2 → present",
    started: "2026-04-02",
    updated: "2026-05-30",
    role: "Solo build — simulation modeling and validation",
    outcome:
      "Simulation core validated against M/M/1 and Little's law baselines; scenario library growing.",
  },
  {
    slug: "pitwall-ai",
    name: "PitWall AI",
    description:
      "Monte-Carlo race strategy simulation and tire-degradation modeling over public race data.",
    stage: "Research",
    architecture: "Data ingestion · degradation model · Monte-Carlo strategy runner",
    stack: ["Python", "PyTorch", "Pandas"],
    timeline: "2026-Q2 → present",
    started: "2026-04-19",
    updated: "2026-06-04",
    role: "Solo build — modeling and evaluation",
    outcome:
      "Degradation model fit to a rolling window of races; strategy simulator prototype documented in the Journal.",
  },
];
