/**
 * Static seed data for the homepage. Rebuilt for the canonical
 * roster: nine real systems, honest stages, no fabricated production
 * metrics.
 */

export type ProjectStatus = "Building" | "Prototype" | "Research" | "Production" | "Archived";

export type OpsTag = "PUBLIC" | "READ ONLY" | "SIGNED" | "VERSIONED";

export type Project = {
  slug: string;
  index: string;
  name: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  updated: string;
  owner: string;
  runtime: string;
  language: string;
  repository: "Public" | "Internal";
  adr: string;
  commits: number;
  p95: string;
  availability: string;
  nodes: number;
  lastDeploy: string;
  tags: OpsTag[];
};

export const PROJECTS: Project[] = [
  {
    slug: "vestra",
    index: "P·001",
    name: "VESTRA",
    description: "AI Wealth Operating System — portfolio agent, plan graph, tool contracts.",
    status: "Building",
    stack: ["Python", "FastAPI", "LangGraph"],
    updated: "2026-06-24",
    owner: "VÆRØX",
    runtime: "Docker · local",
    language: "Python",
    repository: "Internal",
    adr: "005",
    commits: 612,
    p95: "—",
    availability: "—",
    nodes: 1,
    lastDeploy: "—",
    tags: ["VERSIONED"],
  },
  {
    slug: "quantedge",
    index: "P·002",
    name: "QuantEdge AI",
    description: "Quantitative research platform — walk-forward evaluation over factor strategies.",
    status: "Building",
    stack: ["Python", "DuckDB", "PyTorch"],
    updated: "2026-06-18",
    owner: "VÆRØX",
    runtime: "Local",
    language: "Python",
    repository: "Internal",
    adr: "011",
    commits: 894,
    p95: "—",
    availability: "—",
    nodes: 1,
    lastDeploy: "—",
    tags: ["VERSIONED"],
  },
  {
    slug: "marketpulse",
    index: "P·003",
    name: "MarketPulse",
    description: "News classification and sentiment platform with a held-out evaluation contract.",
    status: "Prototype",
    stack: ["Python", "FastAPI", "OpenAI"],
    updated: "2026-06-19",
    owner: "VÆRØX",
    runtime: "Docker · local",
    language: "Python",
    repository: "Internal",
    adr: "014",
    commits: 481,
    p95: "—",
    availability: "—",
    nodes: 1,
    lastDeploy: "—",
    tags: ["VERSIONED"],
  },
  {
    slug: "aegis-ops",
    index: "P·004",
    name: "AEGIS OPS",
    description:
      "Security and DFIR workflows composed as LangGraph agents over synthetic SIEM traces.",
    status: "Building",
    stack: ["Python", "LangGraph", "OpenSearch"],
    updated: "2026-06-27",
    owner: "VÆRØX",
    runtime: "Docker · local",
    language: "Python",
    repository: "Internal",
    adr: "018",
    commits: 703,
    p95: "—",
    availability: "—",
    nodes: 1,
    lastDeploy: "—",
    tags: ["VERSIONED"],
  },
  {
    slug: "leadpulse",
    index: "P·005",
    name: "LeadPulse",
    description: "Revenue intelligence — lead scoring and LLM-drafted outreach with human review.",
    status: "Prototype",
    stack: ["Python", "FastAPI", "OpenAI"],
    updated: "2026-06-12",
    owner: "VÆRØX",
    runtime: "Local",
    language: "Python",
    repository: "Internal",
    adr: "022",
    commits: 388,
    p95: "—",
    availability: "—",
    nodes: 1,
    lastDeploy: "—",
    tags: ["VERSIONED"],
  },
  {
    slug: "cloudcostiq",
    index: "P·006",
    name: "CloudCostIQ",
    description: "FinOps platform — driver-decomposed forecasts with honest error bounds.",
    status: "Building",
    stack: ["Python", "DuckDB", "React"],
    updated: "2026-06-22",
    owner: "VÆRØX",
    runtime: "Local",
    language: "Python",
    repository: "Internal",
    adr: "025",
    commits: 512,
    p95: "—",
    availability: "—",
    nodes: 1,
    lastDeploy: "—",
    tags: ["VERSIONED"],
  },
];

export type Principle = { index: string; title: string; body: string };

export const PRINCIPLES: Principle[] = [
  {
    index: "01",
    title: "Engineering over Marketing",
    body: "Artifacts are chosen for technical accuracy first. No hero copy stands in for a benchmark.",
  },
  {
    index: "02",
    title: "Systems Thinking",
    body: "Every module is documented in the context of the system it belongs to, not in isolation.",
  },
  {
    index: "03",
    title: "Measured Performance",
    body: "Numbers are cited with methodology, hardware, and workload. Absent methodology, absent claim.",
  },
  {
    index: "04",
    title: "Public Documentation",
    body: "Architecture decisions, tradeoffs, and development logs are written to be re-read.",
  },
  {
    index: "05",
    title: "Architecture First",
    body: "Design records precede implementation. Trade-offs are named before code is written.",
  },
  {
    index: "06",
    title: "Long-term Maintainability",
    body: "Interfaces, taxonomies, and URLs are chosen to remain stable for years, not quarters.",
  },
];

/* ── Knowledge Graph (homepage preview) ──────────────────── */

export type GraphNodeKind = "project" | "architecture" | "research" | "adr" | "infra" | "dataset";

export type GraphNode = {
  id: string;
  kind: GraphNodeKind;
  label: string;
  x: number;
  y: number;
};

export type GraphEdge = { from: string; to: string };

export const GRAPH_NODES: GraphNode[] = [
  { id: "p-vestra", kind: "project", label: "VESTRA", x: 90, y: 60 },
  { id: "p-quantedge", kind: "project", label: "QuantEdge AI", x: 90, y: 140 },
  { id: "p-marketpulse", kind: "project", label: "MarketPulse", x: 90, y: 220 },
  { id: "p-aegis", kind: "project", label: "AEGIS OPS", x: 90, y: 300 },
  { id: "p-leadpulse", kind: "project", label: "LeadPulse", x: 90, y: 380 },
  { id: "p-ccq", kind: "project", label: "CloudCostIQ", x: 90, y: 460 },

  { id: "i-agents", kind: "infra", label: "Agent Layer", x: 300, y: 90 },
  { id: "i-analytics", kind: "infra", label: "Analytics Core", x: 300, y: 200 },
  { id: "i-workflows", kind: "infra", label: "Workflow Runtime", x: 300, y: 310 },
  { id: "i-storage", kind: "infra", label: "Data Storage", x: 300, y: 420 },

  { id: "a-contracts", kind: "architecture", label: "Tool Contracts", x: 510, y: 120 },
  { id: "a-eval", kind: "architecture", label: "Held-out Eval", x: 510, y: 240 },
  { id: "a-explain", kind: "architecture", label: "Explainability", x: 510, y: 360 },

  { id: "d-portfolios", kind: "dataset", label: "Portfolios (synth)", x: 720, y: 100 },
  { id: "d-news", kind: "dataset", label: "News Corpus", x: 720, y: 200 },
  { id: "d-billing", kind: "dataset", label: "Billing Exports", x: 720, y: 300 },
  { id: "r-agent-eval", kind: "research", label: "Agent Eval", x: 720, y: 400 },

  { id: "adr-005", kind: "adr", label: "ADR·005 · Tool Contracts", x: 910, y: 130 },
  { id: "adr-011", kind: "adr", label: "ADR·011 · DuckDB Core", x: 910, y: 230 },
  { id: "adr-014", kind: "adr", label: "ADR·014 · Prompt Versioning", x: 910, y: 330 },
  { id: "adr-025", kind: "adr", label: "ADR·025 · Explainable Forecasts", x: 910, y: 430 },
];

export const GRAPH_EDGES: GraphEdge[] = [
  { from: "p-vestra", to: "i-agents" },
  { from: "p-vestra", to: "d-portfolios" },
  { from: "p-quantedge", to: "i-analytics" },
  { from: "p-marketpulse", to: "i-agents" },
  { from: "p-marketpulse", to: "d-news" },
  { from: "p-aegis", to: "i-workflows" },
  { from: "p-leadpulse", to: "i-agents" },
  { from: "p-ccq", to: "i-analytics" },
  { from: "p-ccq", to: "d-billing" },

  { from: "i-agents", to: "a-contracts" },
  { from: "i-agents", to: "a-eval" },
  { from: "i-analytics", to: "a-explain" },
  { from: "i-workflows", to: "a-contracts" },

  { from: "a-contracts", to: "adr-005" },
  { from: "a-eval", to: "adr-014" },
  { from: "a-explain", to: "adr-025" },
  { from: "i-analytics", to: "adr-011" },
  { from: "a-eval", to: "r-agent-eval" },
];

/* ── Recent notes ─────────────────────────────────────────── */

export type NoteCategory =
  | "ADR"
  | "Architecture"
  | "Research"
  | "Evaluation"
  | "Design Decision"
  | "Development Log"
  | "Engineering Notes";

export type Note = {
  slug: string;
  date: string;
  title: string;
  category: NoteCategory;
  readingMinutes: number;
};

export const NOTES: Note[] = [
  {
    slug: "aegis-langgraph-notes",
    date: "2026-06-27",
    title: "AEGIS OPS: what I learned building triage on LangGraph",
    category: "Development Log",
    readingMinutes: 9,
  },
  {
    slug: "vestra-tool-contracts",
    date: "2026-06-24",
    title: "Why VESTRA enforces a strict tool contract",
    category: "Design Decision",
    readingMinutes: 7,
  },
  {
    slug: "cloudcostiq-explainable-forecast",
    date: "2026-06-22",
    title: "CloudCostIQ: forecasts are worthless without drivers",
    category: "Design Decision",
    readingMinutes: 6,
  },
  {
    slug: "marketpulse-prompt-eval",
    date: "2026-06-19",
    title: "MarketPulse: prompt versions get evaluated before merge",
    category: "Evaluation",
    readingMinutes: 8,
  },
  {
    slug: "quantedge-duckdb-decision",
    date: "2026-06-18",
    title: "QuantEdge: why DuckDB is the analytics core",
    category: "Architecture",
    readingMinutes: 6,
  },
  {
    slug: "leadpulse-human-in-loop",
    date: "2026-06-12",
    title: "LeadPulse: why I refused to build auto-send",
    category: "Design Decision",
    readingMinutes: 5,
  },
  {
    slug: "axiom-determinism-contracts",
    date: "2026-06-08",
    title: "Axiom: making determinism a first-class contract",
    category: "Engineering Notes",
    readingMinutes: 7,
  },
  {
    slug: "pitwall-strategy-log",
    date: "2026-06-04",
    title: "PitWall AI: what the tire model got wrong",
    category: "Development Log",
    readingMinutes: 6,
  },
  {
    slug: "supply-chain-baselines",
    date: "2026-05-30",
    title: "Supply Chain Twin: validate against baselines first",
    category: "Research",
    readingMinutes: 5,
  },
];
