export type SystemStage = "Building" | "Prototype" | "Research" | "Production" | "Archived";
export type SystemHealth = "Healthy" | "Degraded" | "Down" | "Nominal";

export type SystemEntry = {
  slug: string;
  name: string;
  owner: string;
  stage: SystemStage;
  health: SystemHealth;
  lastDeploy: string; // ISO — semantically "last updated"
  stack: string[];
  docsPath: string;
  summary: string;
  purpose: string;
};

/**
 * Canonical roster — the nine engineering systems built inside the
 * VÆRØX Independent Engineering Lab. Every system is authored,
 * maintained, and signed by VÆRØX. Stages are honest:
 * "Building" and "Prototype" dominate. Nothing here is claimed as
 * live production infrastructure unless it genuinely is.
 */
export const SYSTEMS: SystemEntry[] = [
  {
    slug: "vestra",
    name: "VESTRA",
    owner: "VÆRØX",
    stage: "Building",
    health: "Nominal",
    lastDeploy: "2026-06-28",
    stack: ["Python", "FastAPI", "PostgreSQL", "LangGraph", "OpenAI"],
    docsPath: "/systems/vestra",
    summary: "AI Wealth Operating System — a personal finance and portfolio agent.",
    purpose:
      "Design and implementation of an AI-native wealth platform: portfolio state, goal planning, and conversational agents grounded in the user's own financial data.",
  },
  {
    slug: "quantedge",
    name: "QuantEdge AI",
    owner: "VÆRØX",
    stage: "Building",
    health: "Nominal",
    lastDeploy: "2026-06-24",
    stack: ["Python", "NumPy", "Pandas", "DuckDB", "PyTorch"],
    docsPath: "/systems/quantedge",
    summary: "Quantitative research platform for backtesting and factor modeling.",
    purpose:
      "Walk-forward validation, factor modeling, risk decomposition, and strategy evaluation across equities and derivatives — designed as a reproducible research environment, not a live trading system.",
  },
  {
    slug: "marketpulse",
    name: "MarketPulse",
    owner: "VÆRØX",
    stage: "Prototype",
    health: "Nominal",
    lastDeploy: "2026-06-19",
    stack: ["Python", "FastAPI", "PostgreSQL", "OpenAI", "Redis"],
    docsPath: "/systems/marketpulse",
    summary: "Financial intelligence platform — news classification and sentiment.",
    purpose:
      "News ingestion, LLM-based classification, and sentiment scoring for equities and macro events, with an emphasis on prompt evaluation methodology and cost control.",
  },
  {
    slug: "aegis-ops",
    name: "AEGIS OPS",
    owner: "VÆRØX",
    stage: "Building",
    health: "Nominal",
    lastDeploy: "2026-06-30",
    stack: ["Python", "LangGraph", "PostgreSQL", "OpenSearch"],
    docsPath: "/systems/aegis-ops",
    summary: "Security & DFIR platform for triage, fraud, and threat workflows.",
    purpose:
      "DFIR triage, threat-intelligence ingestion, and fraud-scoring workflows composed as LangGraph agents over SIEM-shaped data.",
  },
  {
    slug: "leadpulse",
    name: "LeadPulse",
    owner: "VÆRØX",
    stage: "Prototype",
    health: "Nominal",
    lastDeploy: "2026-06-14",
    stack: ["Python", "FastAPI", "PostgreSQL", "OpenAI"],
    docsPath: "/systems/leadpulse",
    summary: "Revenue intelligence platform — pipeline scoring and outreach.",
    purpose:
      "Lead qualification, account signals, and outreach drafting for B2B revenue teams. Focus on evaluation of LLM-generated messaging, not just message generation.",
  },
  {
    slug: "cloudcostiq",
    name: "CloudCostIQ",
    owner: "VÆRØX",
    stage: "Building",
    health: "Nominal",
    lastDeploy: "2026-06-22",
    stack: ["Python", "DuckDB", "React", "AWS SDK"],
    docsPath: "/systems/cloudcostiq",
    summary: "Enterprise FinOps platform — cost attribution and forecasting.",
    purpose:
      "Ingests cloud billing exports, attributes cost by team and workload, and forecasts monthly spend with explainable drivers. Cost-model methodology documented alongside every chart.",
  },
  {
    slug: "axiom",
    name: "Axiom",
    owner: "VÆRØX",
    stage: "Prototype",
    health: "Nominal",
    lastDeploy: "2026-06-08",
    stack: ["TypeScript", "Node", "PostgreSQL", "Temporal"],
    docsPath: "/systems/axiom",
    summary: "Workflow orchestration platform for internal tooling.",
    purpose:
      "Durable, developer-first workflow orchestration for AI-assisted internal tools. Designed around explicit step contracts and replay, not opaque autonomous agents.",
  },
  {
    slug: "supply-chain-twin",
    name: "Supply Chain Digital Twin",
    owner: "VÆRØX",
    stage: "Research",
    health: "Nominal",
    lastDeploy: "2026-05-30",
    stack: ["Python", "SimPy", "NetworkX", "PyTorch"],
    docsPath: "/systems/supply-chain-twin",
    summary: "Discrete-event simulation platform for supply-chain scenarios.",
    purpose:
      "Discrete-event simulation of multi-tier supply chains for stress testing, inventory policy, and disruption analysis — with a focus on model validation against known analytical baselines.",
  },
  {
    slug: "pitwall-ai",
    name: "PitWall AI",
    owner: "VÆRØX",
    stage: "Research",
    health: "Nominal",
    lastDeploy: "2026-06-04",
    stack: ["Python", "PyTorch", "Pandas"],
    docsPath: "/systems/pitwall-ai",
    summary: "Race strategy simulation and lap-time modeling platform.",
    purpose:
      "Monte-Carlo race strategy simulation, tire-degradation modeling, and pit-stop optimization over publicly available race data.",
  },
];
