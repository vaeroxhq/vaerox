export type SystemStage = "Production" | "Prototype" | "Research" | "Archived";
export type SystemHealth = "Healthy" | "Degraded" | "Down" | "Nominal";

export type SystemEntry = {
  slug: string;
  name: string;
  owner: string;
  stage: SystemStage;
  health: SystemHealth;
  lastDeploy: string; // ISO
  stack: string[];
  docsPath: string;
  summary: string;
  purpose: string;
};

export const SYSTEMS: SystemEntry[] = [
  {
    slug: "marketpulse",
    name: "MarketPulse",
    owner: "Quant Platform",
    stage: "Production",
    health: "Healthy",
    lastDeploy: "2026-06-28",
    stack: ["Rust", "ClickHouse", "Redpanda"],
    docsPath: "/systems/marketpulse",
    summary: "Tick-level market data ingestion and normalization pipeline.",
    purpose:
      "Continuous ingestion of consolidated market data across venues, producing normalized tick and bar streams for downstream signals with strict end-to-end latency budgets.",
  },
  {
    slug: "axiom",
    name: "Axiom",
    owner: "AI Systems",
    stage: "Prototype",
    health: "Nominal",
    lastDeploy: "2026-06-22",
    stack: ["Python", "PyTorch", "Triton"],
    docsPath: "/systems/axiom",
    summary: "Reasoning-oriented evaluation harness for agentic workflows.",
    purpose:
      "Deterministic replay of agent trajectories with tool mocking, tokenized cost accounting, and per-step scoring against curated task suites.",
  },
  {
    slug: "vigil",
    name: "Vigil",
    owner: "Infrastructure",
    stage: "Research",
    health: "Degraded",
    lastDeploy: "2026-06-14",
    stack: ["Zig", "eBPF", "Prometheus"],
    docsPath: "/systems/vigil",
    summary: "Kernel-level anomaly detection for multi-tenant compute nodes.",
    purpose:
      "Low-overhead syscall and scheduler probes fused into per-workload behavioral baselines, surfacing deviations before they reach SLO burn.",
  },
  {
    slug: "helix",
    name: "Helix Inference",
    owner: "AI Systems",
    stage: "Production",
    health: "Healthy",
    lastDeploy: "2026-06-30",
    stack: ["Rust", "CUDA", "gRPC"],
    docsPath: "/systems/helix",
    summary: "Low-latency serving layer for mixture-of-experts models.",
    purpose:
      "Expert-parallel scheduler with tenant-scoped KV caches, structured batching, and speculative decoding integration for MoE serving.",
  },
  {
    slug: "atlas",
    name: "Atlas Control Plane",
    owner: "Platform",
    stage: "Production",
    health: "Healthy",
    lastDeploy: "2026-06-25",
    stack: ["Go", "Kubernetes", "Postgres"],
    docsPath: "/systems/atlas",
    summary: "Declarative provisioning across regions with tenant isolation.",
    purpose:
      "Reconciles workload specifications into per-region Kubernetes state, mediating quotas, network policies, and cross-region failover.",
  },
  {
    slug: "orbit",
    name: "Orbit Observability",
    owner: "Infrastructure",
    stage: "Production",
    health: "Nominal",
    lastDeploy: "2026-06-19",
    stack: ["Rust", "ClickHouse", "OpenTelemetry"],
    docsPath: "/systems/orbit",
    summary: "Trace-first telemetry with sampled cardinality control.",
    purpose:
      "Ingests OTel traces and metrics with adaptive tail-based sampling, enforcing cardinality budgets before write amplification reaches storage.",
  },
  {
    slug: "signal-router",
    name: "Signal Router",
    owner: "Platform",
    stage: "Prototype",
    health: "Nominal",
    lastDeploy: "2026-06-08",
    stack: ["Zig", "io_uring"],
    docsPath: "/systems/signal-router",
    summary: "High-throughput event router with backpressure-aware fan-out.",
    purpose:
      "Zero-copy event fan-out over io_uring with per-subscriber credit accounting to bound producer memory under slow consumers.",
  },
  {
    slug: "ledger-01",
    name: "Ledger·01",
    owner: "Infrastructure",
    stage: "Archived",
    health: "Nominal",
    lastDeploy: "2025-11-02",
    stack: ["Erlang", "RocksDB"],
    docsPath: "/systems/ledger-01",
    summary: "Legacy append-only ledger, retired in favor of Parity.",
    purpose:
      "Archived append-only log service preserved for historical replay and audit; no new writes accepted since 2025-11.",
  },
];
