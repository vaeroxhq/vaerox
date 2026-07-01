/**
 * Future Systems — the long-term engineering roadmap of the VAERØX
 * Engineering Lab. Every entry is honestly labeled: nothing here is
 * marked "Production". Statuses reflect actual maturity — Building,
 * Architecture, Research, Planned, or Concept.
 *
 * Cross-references target existing systems, projects, and research
 * assets by slug. Dangling refs are ignored by the graph.
 */

export type FutureStatus =
  | "Building"
  | "Architecture"
  | "Research"
  | "Planned"
  | "Concept";

export type FutureCategory =
  | "Agent Infrastructure"
  | "Infrastructure"
  | "AI Evaluation"
  | "Distributed Systems"
  | "Storage Infrastructure"
  | "Machine Learning Platform"
  | "LLM Engineering"
  | "AI Benchmarking"
  | "AI Infrastructure"
  | "Financial Intelligence";

export type Milestone = { label: string; status: "done" | "current" | "next" | "later" };

export type FutureSystem = {
  slug: string;
  name: string;
  status: FutureStatus;
  category: FutureCategory;
  progress: number;          // 0..100
  updated: string;           // ISO
  description: string;
  vision: string;
  motivation: string;
  futureFeatures: string[];
  plannedStack: string[];
  architectureSketch: string[];   // bullet placeholders for future diagrams
  milestones: Milestone[];
  relatedSystems: string[];       // system slugs
  relatedProjects: string[];      // project slugs
  relatedDatasets: string[];      // dataset slugs
  relatedResearch: string[];      // research slugs
  tags: string[];
};

const NYD = "Not Yet Documented.";

export const FUTURE_SYSTEMS: FutureSystem[] = [
  {
    slug: "helix",
    name: "Helix",
    status: "Building",
    category: "Agent Infrastructure",
    progress: 32,
    updated: "2026-06-24",
    description:
      "A modular agent runtime for building production-grade AI systems.",
    vision:
      "Provide the foundational runtime used across all future VAERØX AI products — one execution layer, one memory model, one approval story.",
    motivation:
      "Every planned AI product needs the same primitives: tool execution, memory, scheduling, and human approval. Building them once, as a runtime, avoids reinventing them per product.",
    futureFeatures: [
      "Multi-agent orchestration",
      "MCP integration",
      "Tool execution",
      "Memory management",
      "Human approval workflows",
      "Scheduling",
      "Agent observability",
      "Workflow execution",
      "Long-term memory",
      "Multi-model routing",
    ],
    plannedStack: ["Python", "FastAPI", "Redis", "PostgreSQL", "LangGraph", "Docker", "Kubernetes"],
    architectureSketch: [
      "Runtime kernel (tool exec, memory, scheduler)",
      "Approval plane (human-in-the-loop workflows)",
      "Model router (multi-provider, cost-aware)",
      "Observability sidecar (traces, spans, replay)",
    ],
    milestones: [
      { label: "Kernel prototype",             status: "done" },
      { label: "Tool execution + MCP bridge",  status: "current" },
      { label: "Approval workflows",           status: "next" },
      { label: "Long-term memory backend",     status: "later" },
      { label: "Multi-model routing GA",       status: "later" },
    ],
    relatedSystems: [],
    relatedProjects: [],
    relatedDatasets: [],
    relatedResearch: [],
    tags: ["Agents", "Runtime", "MCP", "Orchestration"],
  },
  {
    slug: "atlas",
    name: "Atlas",
    status: "Architecture",
    category: "Infrastructure",
    progress: 18,
    updated: "2026-06-10",
    description:
      "Infrastructure control plane responsible for managing deployments, Kubernetes clusters, cloud infrastructure and operational resources.",
    vision:
      "A single control plane the lab uses to deploy, observe, and roll back every VAERØX system — declarative, auditable, region-aware.",
    motivation:
      "Ad-hoc kubectl and console clicks do not scale to a growing surface area. Atlas centralises deployment intent and policy.",
    futureFeatures: [
      "Kubernetes management",
      "Multi-region deployments",
      "Secrets management",
      "Configuration management",
      "Infrastructure inventory",
      "Policy engine",
      "Cluster health",
      "Deployment automation",
    ],
    plannedStack: ["Go", "Kubernetes API", "Terraform", "Vault", "PostgreSQL"],
    architectureSketch: [
      "Inventory service (clusters, regions, workloads)",
      "Policy engine (OPA-style rules)",
      "Deployment orchestrator (progressive delivery)",
      "Secrets broker (short-lived credentials)",
    ],
    milestones: [
      { label: "Architecture doc + ADRs",   status: "current" },
      { label: "Inventory + read-only UI",  status: "next" },
      { label: "Deployment orchestrator",   status: "later" },
      { label: "Policy engine GA",          status: "later" },
    ],
    relatedSystems: [],
    relatedProjects: [],
    relatedDatasets: [],
    relatedResearch: [],
    tags: ["Infra", "Control Plane", "Kubernetes", "Policy"],
  },
  {
    slug: "meridian",
    name: "Meridian",
    status: "Research",
    category: "AI Evaluation",
    progress: 12,
    updated: "2026-05-30",
    description:
      "Evaluation framework for AI models, RAG systems and autonomous agents.",
    vision:
      "The default place to run, compare, and regress evaluations across every VAERØX AI system — with honest metrics and reproducible datasets.",
    motivation:
      "Evaluation is the flywheel for model and agent quality. Without a shared framework, every product invents its own scoreboard.",
    futureFeatures: [
      "Prompt evaluation",
      "Hallucination detection",
      "Model comparison",
      "Regression testing",
      "Dataset evaluation",
      "Safety testing",
      "Agent evaluation",
      "Benchmark generation",
    ],
    plannedStack: ["Python", "pytest", "Pydantic", "PostgreSQL", "DuckDB"],
    architectureSketch: [
      "Eval runner (prompt · agent · RAG modes)",
      "Metric registry (per-task graders)",
      "Regression store (historical runs, diffs)",
      "Dataset adapter (Research Assets → eval)",
    ],
    milestones: [
      { label: "Metric registry spec",       status: "current" },
      { label: "Prompt eval runner",         status: "next" },
      { label: "Agent eval runner",          status: "later" },
      { label: "Regression dashboards",      status: "later" },
    ],
    relatedSystems: [],
    relatedProjects: [],
    relatedDatasets: ["lmod-cataract-1k", "paddy-disease", "cloth-object-geometry"],
    relatedResearch: [],
    tags: ["Evaluation", "RAG", "Agents", "Regression"],
  },
  {
    slug: "signal-router",
    name: "Signal Router",
    status: "Building",
    category: "Distributed Systems",
    progress: 41,
    updated: "2026-06-27",
    description:
      "Event routing infrastructure powering asynchronous communication across VAERØX products.",
    vision:
      "One boring, well-instrumented event bus every VAERØX service can rely on — with replay, DLQs, and idempotency baked in.",
    motivation:
      "Async communication between products is currently ad-hoc. A shared router removes per-service Kafka setups and reduces the failure surface.",
    futureFeatures: [
      "Kafka",
      "Redis Streams",
      "Event replay",
      "Queue monitoring",
      "Dead-letter queues",
      "Webhooks",
      "Event sourcing",
    ],
    plannedStack: ["Go", "Kafka", "Redis Streams", "PostgreSQL", "OpenTelemetry"],
    architectureSketch: [
      "Producer SDK (typed schemas, idempotency keys)",
      "Router core (Kafka + Redis Streams backends)",
      "Replay + DLQ console",
      "Webhook egress with retries",
    ],
    milestones: [
      { label: "Router core prototype",   status: "done" },
      { label: "Producer SDK",            status: "current" },
      { label: "Replay + DLQ console",    status: "next" },
      { label: "Webhook egress GA",       status: "later" },
    ],
    relatedSystems: ["marketpulse"],
    relatedProjects: ["marketpulse"],
    relatedDatasets: [],
    relatedResearch: [],
    tags: ["Events", "Kafka", "Streams", "Async"],
  },
  {
    slug: "nimbus",
    name: "Nimbus",
    status: "Architecture",
    category: "Storage Infrastructure",
    progress: 22,
    updated: "2026-06-05",
    description:
      "Unified storage platform for caching, vector search, object storage and artifact management.",
    vision:
      "One storage plane every VAERØX system consumes — cache, blob, and vector — without each team picking its own backend.",
    motivation:
      "Storage sprawl is a common tax on small labs. Nimbus consolidates the common denominators behind a single surface.",
    futureFeatures: [
      "Redis",
      "Object storage",
      "pgvector",
      "Qdrant",
      "FAISS",
      "Blob storage",
      "Cache layer",
    ],
    plannedStack: ["Go", "Redis", "S3-compatible object store", "pgvector", "Qdrant"],
    architectureSketch: [
      "Uniform client SDK (cache · blob · vector)",
      "Backend adapters (Redis, S3, pgvector, Qdrant, FAISS)",
      "Artifact catalog (content-addressed)",
    ],
    milestones: [
      { label: "Architecture + backend survey", status: "current" },
      { label: "Cache + blob adapters",         status: "next" },
      { label: "Vector adapter",                status: "later" },
      { label: "Artifact catalog",              status: "later" },
    ],
    relatedSystems: [],
    relatedProjects: [],
    relatedDatasets: [],
    relatedResearch: [],
    tags: ["Storage", "Cache", "Vector", "Blob"],
  },
  {
    slug: "dataforge",
    name: "DataForge",
    status: "Building",
    category: "Machine Learning Platform",
    progress: 28,
    updated: "2026-06-20",
    description:
      "Dataset engineering platform for creating, validating, versioning and benchmarking datasets.",
    vision:
      "The tool the lab uses to turn raw corpora into Research Assets — with versioning, validation, and challenge-ready splits.",
    motivation:
      "Every Research Asset in the lab was hand-instrumented. DataForge is the productised version of that workflow.",
    futureFeatures: [
      "Dataset versioning",
      "Annotation pipelines",
      "Validation engine",
      "Data quality",
      "Challenge creation",
      "Benchmark datasets",
      "Synthetic data",
    ],
    plannedStack: ["Python", "DuckDB", "Parquet", "PostgreSQL", "Prefect"],
    architectureSketch: [
      "Dataset registry (versions, splits, provenance)",
      "Validation engine (schema · leakage · balance)",
      "Challenge builder (prepare.py / grade.py generators)",
      "Synthetic data adapters",
    ],
    milestones: [
      { label: "Registry schema",           status: "current" },
      { label: "Validation engine",         status: "next" },
      { label: "Challenge builder",         status: "later" },
      { label: "Synthetic data adapters",   status: "later" },
    ],
    relatedSystems: [],
    relatedProjects: [],
    relatedDatasets: [
      "lmod-cataract-1k",
      "paddy-disease",
      "wireseg-36k",
      "bigearthnet",
      "cloth-object-geometry",
    ],
    relatedResearch: [],
    tags: ["Datasets", "Validation", "Challenges", "Synthetic"],
  },
  {
    slug: "promptlab",
    name: "PromptLab",
    status: "Planned",
    category: "LLM Engineering",
    progress: 5,
    updated: "2026-05-14",
    description:
      "Prompt engineering platform for experimentation, evaluation, versioning and collaboration.",
    vision:
      "A workbench for prompts — versioned, evaluated, cost-tracked — that plugs directly into Meridian for regression testing.",
    motivation:
      "Prompts drift silently. Treating them like code (versioning, tests, cost accounting) is the only way to keep quality steady.",
    futureFeatures: [
      "Prompt versioning",
      "Evaluation",
      "A/B testing",
      "Dataset linkage",
      "Cost tracking",
      "Model comparison",
    ],
    plannedStack: ["TypeScript", "Next.js", "PostgreSQL"],
    architectureSketch: [
      "Prompt registry (versions, tags, owners)",
      "Eval bridge (Meridian runners)",
      "A/B router (traffic split, cost ledger)",
    ],
    milestones: [
      { label: "Product brief",         status: "current" },
      { label: "Prompt registry v0",    status: "next" },
      { label: "Meridian eval bridge",  status: "later" },
      { label: "A/B routing",           status: "later" },
    ],
    relatedSystems: [],
    relatedProjects: [],
    relatedDatasets: [],
    relatedResearch: [],
    tags: ["Prompts", "Evaluation", "A/B", "Cost"],
  },
  {
    slug: "agentbench",
    name: "AgentBench",
    status: "Research",
    category: "AI Benchmarking",
    progress: 8,
    updated: "2026-05-02",
    description:
      "Evaluation platform for measuring planning, reasoning, memory, tool usage and multi-agent collaboration.",
    vision:
      "A dedicated bench for agents — reproducible tasks, honest scoring, and comparable runs across model families.",
    motivation: NYD,
    futureFeatures: [
      "Task library (planning · reasoning · memory · tools)",
      "Multi-agent scenarios",
      "Reproducible run harness",
      "Leaderboard with methodology notes",
    ],
    plannedStack: ["Python", "Meridian (runner)", "PostgreSQL"],
    architectureSketch: [
      "Task library (versioned scenarios)",
      "Agent harness (Helix-compatible)",
      "Scoring service (methodology-first)",
    ],
    milestones: [
      { label: "Scope + task taxonomy",   status: "current" },
      { label: "Reference task set",      status: "next" },
      { label: "Reproducible harness",    status: "later" },
    ],
    relatedSystems: [],
    relatedProjects: [],
    relatedDatasets: [],
    relatedResearch: [],
    tags: ["Agents", "Benchmark", "Reasoning", "Tools"],
  },
  {
    slug: "vectorhub",
    name: "VectorHub",
    status: "Architecture",
    category: "AI Infrastructure",
    progress: 16,
    updated: "2026-06-01",
    description:
      "Unified vector database abstraction supporting multiple embedding backends.",
    vision:
      "One vector API for every VAERØX product — pluggable backends, hybrid search, and clean migration paths.",
    motivation:
      "Vector DB choice is a moving target. VectorHub lets products defer that choice without paying for it later.",
    futureFeatures: ["pgvector", "Pinecone", "Qdrant", "Milvus", "FAISS", "Hybrid search"],
    plannedStack: ["Go", "pgvector", "Qdrant", "Milvus", "FAISS"],
    architectureSketch: [
      "Unified client SDK (search · upsert · filter)",
      "Backend adapters (pgvector, Pinecone, Qdrant, Milvus, FAISS)",
      "Hybrid search (BM25 + vector)",
    ],
    milestones: [
      { label: "Architecture doc",       status: "current" },
      { label: "pgvector + Qdrant adapters", status: "next" },
      { label: "Hybrid search",          status: "later" },
    ],
    relatedSystems: [],
    relatedProjects: [],
    relatedDatasets: [],
    relatedResearch: [],
    tags: ["Vector", "Search", "Hybrid", "AI"],
  },
  {
    slug: "fingraph",
    name: "FinGraph",
    status: "Concept",
    category: "Financial Intelligence",
    progress: 2,
    updated: "2026-04-22",
    description:
      "Financial knowledge graph connecting companies, news, filings, market events and relationships.",
    vision:
      "A graph the lab can query to reason about market structure — entities, filings, events, and their connections.",
    motivation: NYD,
    futureFeatures: [
      "Entity registry (companies, funds, people)",
      "Filings ingestion",
      "News + event linkage",
      "Graph query API",
    ],
    plannedStack: ["Python", "PostgreSQL", "Neo4j (candidate)"],
    architectureSketch: [
      "Entity ingestion pipeline",
      "Event/news linker",
      "Graph query API",
    ],
    milestones: [
      { label: "Concept doc",   status: "current" },
      { label: "Entity model",  status: "next" },
      { label: "Pipeline v0",   status: "later" },
    ],
    relatedSystems: ["marketpulse"],
    relatedProjects: ["marketpulse"],
    relatedDatasets: [],
    relatedResearch: [],
    tags: ["Finance", "Graph", "Events", "Entities"],
  },
];

export const FUTURE_STATUSES: FutureStatus[] = [
  "Building",
  "Architecture",
  "Research",
  "Planned",
  "Concept",
];

export function findFutureSystem(slug: string): FutureSystem | undefined {
  return FUTURE_SYSTEMS.find((f) => f.slug === slug);
}
