/**
 * Static seed data for the homepage. Shape mirrors what a future
 * content pipeline (MDX / CMS / DB) will emit — components stay
 * data-driven so the swap is mechanical.
 */

export type ProjectStatus = "Production" | "Prototype" | "Research" | "Archived";

export type OpsTag = "LIVE" | "SYNCED" | "INDEXED" | "VERIFIED" | "PUBLIC" | "READ ONLY" | "SIGNED" | "VERSIONED";

export type Project = {
  slug: string;
  index: string;
  name: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  updated: string;      // ISO date
  /* engineering metadata */
  owner: string;
  runtime: string;
  language: string;
  repository: "Public" | "Internal";
  adr: string;          // e.g. "014"
  commits: number;
  p95: string;          // e.g. "118ms"
  availability: string; // e.g. "99.98%"
  nodes: number;
  lastDeploy: string;   // relative, e.g. "12h ago"
  tags: OpsTag[];
};

export const PROJECTS: Project[] = [
  {
    slug: "helix-inference",
    index: "P·001",
    name: "Helix Inference",
    description: "Low-latency serving layer for mixture-of-experts models with per-tenant isolation.",
    status: "Production",
    stack: ["Rust", "CUDA", "gRPC"],
    updated: "2026-06-24",
    owner: "Inference Team",
    runtime: "Kubernetes",
    language: "Rust",
    repository: "Public",
    adr: "014",
    commits: 4218,
    p95: "118ms",
    availability: "99.98%",
    nodes: 128,
    lastDeploy: "12h ago",
    tags: ["LIVE", "SIGNED", "VERIFIED"],
  },
  {
    slug: "atlas-control-plane",
    index: "P·002",
    name: "Atlas Control Plane",
    description: "Declarative multi-tenant platform for provisioning workloads across regions.",
    status: "Production",
    stack: ["Go", "Kubernetes", "Postgres"],
    updated: "2026-06-18",
    owner: "Platform Team",
    runtime: "Kubernetes",
    language: "Go",
    repository: "Public",
    adr: "022",
    commits: 7841,
    p95: "42ms",
    availability: "99.995%",
    nodes: 64,
    lastDeploy: "2d ago",
    tags: ["LIVE", "SYNCED"],
  },
  {
    slug: "meridian-eval",
    index: "P·003",
    name: "Meridian Eval",
    description: "Reproducible evaluation harness for agentic and retrieval systems at scale.",
    status: "Prototype",
    stack: ["Python", "DuckDB", "Ray"],
    updated: "2026-06-11",
    owner: "Research Infra",
    runtime: "Ray Cluster",
    language: "Python",
    repository: "Internal",
    adr: "031",
    commits: 942,
    p95: "—",
    availability: "—",
    nodes: 24,
    lastDeploy: "6d ago",
    tags: ["VERSIONED", "INDEXED"],
  },
  {
    slug: "orbit-observability",
    index: "P·004",
    name: "Orbit Observability",
    description: "Trace-first telemetry pipeline with sampled cardinality control.",
    status: "Production",
    stack: ["Rust", "ClickHouse", "OTel"],
    updated: "2026-05-30",
    owner: "Observability",
    runtime: "Bare metal",
    language: "Rust",
    repository: "Public",
    adr: "018",
    commits: 3120,
    p95: "9ms",
    availability: "99.99%",
    nodes: 42,
    lastDeploy: "18h ago",
    tags: ["LIVE", "INDEXED"],
  },
  {
    slug: "parity-consensus",
    index: "P·005",
    name: "Parity Consensus",
    description: "Experimental leaderless consensus protocol for geo-distributed metadata.",
    status: "Research",
    stack: ["Rust", "TLA+"],
    updated: "2026-05-19",
    owner: "Distributed Systems",
    runtime: "Simulation",
    language: "Rust",
    repository: "Internal",
    adr: "027",
    commits: 412,
    p95: "—",
    availability: "—",
    nodes: 5,
    lastDeploy: "3w ago",
    tags: ["VERSIONED", "READ ONLY"],
  },
  {
    slug: "signal-router",
    index: "P·006",
    name: "Signal Router",
    description: "High-throughput event router with backpressure-aware fan-out.",
    status: "Prototype",
    stack: ["Zig", "io_uring"],
    updated: "2026-05-04",
    owner: "Edge Infra",
    runtime: "Linux 6.6",
    language: "Zig",
    repository: "Public",
    adr: "029",
    commits: 1247,
    p95: "0.4ms",
    availability: "—",
    nodes: 8,
    lastDeploy: "5d ago",
    tags: ["SIGNED", "PUBLIC"],
  },
];

export type Principle = { index: string; title: string; body: string };

export const PRINCIPLES: Principle[] = [
  { index: "01", title: "Engineering over Marketing", body: "Artifacts are chosen for technical accuracy first. No hero copy stands in for a benchmark." },
  { index: "02", title: "Systems Thinking",           body: "Every module is documented in the context of the system it belongs to, not in isolation." },
  { index: "03", title: "Measured Performance",       body: "Numbers are cited with methodology, hardware, and workload. Absent methodology, absent claim." },
  { index: "04", title: "Public Documentation",       body: "Architecture decisions, incident reviews, and post-mortems are written to be re-read." },
  { index: "05", title: "Architecture First",         body: "Design records precede implementation. Trade-offs are named before code is written." },
  { index: "06", title: "Long-term Maintainability",  body: "Interfaces, taxonomies, and URLs are chosen to remain stable for years, not quarters." },
];

/* ── Knowledge Graph ──────────────────────────────────────── */

export type GraphNodeKind = "project" | "architecture" | "research" | "adr" | "infra" | "dataset";

export type GraphNode = {
  id: string;
  kind: GraphNodeKind;
  label: string;
  x: number; // 0..1000 viewbox
  y: number; // 0..500
};

export type GraphEdge = { from: string; to: string };

export const GRAPH_NODES: GraphNode[] = [
  /* Projects (left column) */
  { id: "p-helix",   kind: "project", label: "Helix Inference",       x:  90, y:  90 },
  { id: "p-atlas",   kind: "project", label: "Atlas Control Plane",   x:  90, y: 200 },
  { id: "p-orbit",   kind: "project", label: "Orbit Observability",   x:  90, y: 310 },
  { id: "p-signal",  kind: "project", label: "Signal Router",         x:  90, y: 420 },

  /* Infrastructure (mid-left) */
  { id: "i-infra",   kind: "infra", label: "Infrastructure",          x: 300, y:  60 },
  { id: "i-inference", kind: "infra", label: "Inference",             x: 300, y: 150 },
  { id: "i-storage", kind: "infra", label: "Storage",                 x: 300, y: 240 },
  { id: "i-routing", kind: "infra", label: "Routing",                 x: 300, y: 330 },
  { id: "i-monitor", kind: "infra", label: "Monitoring",              x: 300, y: 420 },

  /* Architecture (center) */
  { id: "a-serving", kind: "architecture", label: "Serving Topology", x: 510, y: 110 },
  { id: "a-tenant",  kind: "architecture", label: "Tenant Isolation", x: 510, y: 230 },
  { id: "a-telemetry", kind: "architecture", label: "Telemetry Plane", x: 510, y: 350 },

  /* Datasets / research (right-center) */
  { id: "d-bench",   kind: "dataset", label: "Benchmark Suite",       x: 720, y:  80 },
  { id: "d-eval",    kind: "dataset", label: "Evaluation Sets",       x: 720, y: 180 },
  { id: "d-agents",  kind: "dataset", label: "Agents Corpus",         x: 720, y: 280 },
  { id: "r-moe",     kind: "research", label: "MoE Routing",          x: 720, y: 380 },
  { id: "r-cardinality", kind: "research", label: "Cardinality Bounds", x: 720, y: 460 },

  /* ADRs (right) */
  { id: "adr-014", kind: "adr", label: "ADR·014 · gRPC Framing",      x: 910, y: 130 },
  { id: "adr-018", kind: "adr", label: "ADR·018 · Trace Sampling",    x: 910, y: 230 },
  { id: "adr-022", kind: "adr", label: "ADR·022 · Region Failover",   x: 910, y: 330 },
  { id: "adr-027", kind: "adr", label: "ADR·027 · Consensus Model",   x: 910, y: 430 },
];

export const GRAPH_EDGES: GraphEdge[] = [
  /* projects → infra */
  { from: "p-helix",  to: "i-inference" },
  { from: "p-helix",  to: "i-routing" },
  { from: "p-atlas",  to: "i-infra" },
  { from: "p-atlas",  to: "i-storage" },
  { from: "p-orbit",  to: "i-monitor" },
  { from: "p-signal", to: "i-routing" },
  { from: "p-signal", to: "i-inference" },

  /* infra → architecture */
  { from: "i-inference", to: "a-serving" },
  { from: "i-routing",   to: "a-serving" },
  { from: "i-storage",   to: "a-tenant" },
  { from: "i-infra",     to: "a-tenant" },
  { from: "i-monitor",   to: "a-telemetry" },

  /* architecture → research / datasets */
  { from: "a-serving",   to: "r-moe" },
  { from: "a-serving",   to: "d-bench" },
  { from: "a-tenant",    to: "d-eval" },
  { from: "a-telemetry", to: "r-cardinality" },
  { from: "a-telemetry", to: "d-agents" },

  /* → ADRs */
  { from: "a-serving",   to: "adr-014" },
  { from: "a-telemetry", to: "adr-018" },
  { from: "a-tenant",    to: "adr-022" },
  { from: "r-moe",       to: "adr-014" },
  { from: "r-cardinality", to: "adr-018" },
  { from: "d-eval",      to: "adr-027" },
];

/* ── Recent notes ─────────────────────────────────────────── */

export type NoteCategory =
  | "ADR"
  | "Post-mortem"
  | "Benchmark"
  | "Architecture"
  | "Research"
  | "Infrastructure"
  | "Evaluation"
  | "Observability"
  | "Incident"
  | "Performance";

export type Note = {
  slug: string;
  date: string;
  title: string;
  category: NoteCategory;
  readingMinutes: number;
};

export const NOTES: Note[] = [
  { slug: "cardinality-budgets",          date: "2026-06-27", title: "Cardinality Budgets Under Fan-out",              category: "Observability",  readingMinutes:  9 },
  { slug: "moe-routing-collapse",         date: "2026-06-20", title: "Routing Collapse in Sparse MoE Serving",         category: "Research",       readingMinutes: 12 },
  { slug: "region-failover-postmortem",   date: "2026-06-12", title: "eu-west-2 Region Failover · Post-mortem",        category: "Post-mortem",    readingMinutes:  7 },
  { slug: "tenant-quotas-controller",     date: "2026-06-04", title: "Tenant Quotas as a Controller",                  category: "Architecture",   readingMinutes:  6 },
  { slug: "adr-027-consensus-model",      date: "2026-05-29", title: "ADR·027 · Leaderless Consensus for Metadata",    category: "ADR",            readingMinutes: 11 },
  { slug: "helix-p99-regression",         date: "2026-05-21", title: "Helix P99 Regression on H100 Nodes",             category: "Performance",    readingMinutes:  8 },
  { slug: "orbit-trace-sampling",         date: "2026-05-14", title: "Tail-Latency-Aware Trace Sampling in Orbit",     category: "Observability",  readingMinutes:  9 },
  { slug: "bench-suite-2026-q2",          date: "2026-05-06", title: "Benchmark Suite · 2026 Q2 Release",              category: "Benchmark",      readingMinutes:  5 },
  { slug: "signal-router-io-uring",       date: "2026-04-28", title: "io_uring Backpressure in Signal Router",         category: "Infrastructure", readingMinutes: 10 },
  { slug: "agent-eval-methodology",       date: "2026-04-19", title: "Agent Evaluation · Methodology and Pitfalls",    category: "Evaluation",     readingMinutes: 14 },
  { slug: "atlas-scheduler-incident",     date: "2026-04-10", title: "Atlas Scheduler · Cascading Retry Incident",     category: "Incident",       readingMinutes:  6 },
  { slug: "adr-031-eval-harness",         date: "2026-04-02", title: "ADR·031 · Reproducible Eval Harness",            category: "ADR",            readingMinutes:  8 },
];
