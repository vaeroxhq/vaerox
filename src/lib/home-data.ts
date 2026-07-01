/**
 * Static seed data for the homepage. Shape mirrors what a future
 * content pipeline (MDX / CMS / DB) will emit — components stay
 * data-driven so the swap is mechanical.
 */

export type ProjectStatus = "Production" | "Prototype" | "Research";

export type Project = {
  slug: string;
  index: string;
  name: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  updated: string; // ISO date
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
  },
  {
    slug: "atlas-control-plane",
    index: "P·002",
    name: "Atlas Control Plane",
    description: "Declarative multi-tenant platform for provisioning workloads across regions.",
    status: "Production",
    stack: ["Go", "Kubernetes", "Postgres"],
    updated: "2026-06-18",
  },
  {
    slug: "meridian-eval",
    index: "P·003",
    name: "Meridian Eval",
    description: "Reproducible evaluation harness for agentic and retrieval systems at scale.",
    status: "Prototype",
    stack: ["Python", "DuckDB", "Ray"],
    updated: "2026-06-11",
  },
  {
    slug: "orbit-observability",
    index: "P·004",
    name: "Orbit Observability",
    description: "Trace-first telemetry pipeline with sampled cardinality control.",
    status: "Production",
    stack: ["Rust", "ClickHouse", "OTel"],
    updated: "2026-05-30",
  },
  {
    slug: "parity-consensus",
    index: "P·005",
    name: "Parity Consensus",
    description: "Experimental leaderless consensus protocol for geo-distributed metadata.",
    status: "Research",
    stack: ["Rust", "TLA+"],
    updated: "2026-05-19",
  },
  {
    slug: "signal-router",
    index: "P·006",
    name: "Signal Router",
    description: "High-throughput event router with backpressure-aware fan-out.",
    status: "Prototype",
    stack: ["Zig", "io_uring"],
    updated: "2026-05-04",
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
    body: "Architecture decisions, incident reviews, and post-mortems are written to be re-read.",
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

export type GraphNodeKind = "project" | "architecture" | "research" | "adr";

export type GraphNode = {
  id: string;
  kind: GraphNodeKind;
  label: string;
  x: number; // 0..1000 viewbox
  y: number; // 0..500
};

export type GraphEdge = { from: string; to: string };

export const GRAPH_NODES: GraphNode[] = [
  { id: "p-helix", kind: "project", label: "Helix Inference", x: 160, y: 130 },
  { id: "p-atlas", kind: "project", label: "Atlas Control Plane", x: 160, y: 370 },
  { id: "p-orbit", kind: "project", label: "Orbit Observability", x: 500, y: 250 },
  { id: "a-serving", kind: "architecture", label: "Serving Topology", x: 380, y: 90 },
  { id: "a-tenant", kind: "architecture", label: "Tenant Isolation", x: 380, y: 410 },
  { id: "r-moe", kind: "research", label: "MoE Routing", x: 720, y: 110 },
  { id: "r-cardinality", kind: "research", label: "Cardinality Bounds", x: 720, y: 250 },
  { id: "adr-014", kind: "adr", label: "ADR·014 · gRPC Framing", x: 880, y: 180 },
  { id: "adr-022", kind: "adr", label: "ADR·022 · Region Failover", x: 880, y: 370 },
];

export const GRAPH_EDGES: GraphEdge[] = [
  { from: "p-helix", to: "a-serving" },
  { from: "p-atlas", to: "a-tenant" },
  { from: "p-orbit", to: "a-serving" },
  { from: "p-orbit", to: "a-tenant" },
  { from: "a-serving", to: "r-moe" },
  { from: "a-serving", to: "r-cardinality" },
  { from: "a-tenant", to: "adr-022" },
  { from: "r-moe", to: "adr-014" },
  { from: "r-cardinality", to: "adr-014" },
  { from: "a-serving", to: "adr-014" },
];

export type Note = {
  slug: string;
  date: string;
  title: string;
  category: "Infra" | "AI Systems" | "Platform" | "Post-mortem" | "Research";
  readingMinutes: number;
};

export const NOTES: Note[] = [
  {
    slug: "cardinality-budgets",
    date: "2026-06-27",
    title: "Cardinality Budgets Under Fan-out",
    category: "Infra",
    readingMinutes: 9,
  },
  {
    slug: "moe-routing-collapse",
    date: "2026-06-20",
    title: "Routing Collapse in Sparse MoE Serving",
    category: "AI Systems",
    readingMinutes: 12,
  },
  {
    slug: "region-failover-postmortem",
    date: "2026-06-12",
    title: "Region Failover · Post-mortem",
    category: "Post-mortem",
    readingMinutes: 7,
  },
  {
    slug: "tenant-quotas-controller",
    date: "2026-06-04",
    title: "Tenant Quotas as a Controller",
    category: "Platform",
    readingMinutes: 6,
  },
];
