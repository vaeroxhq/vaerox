export type ProjectStage = "Production" | "Prototype" | "Research" | "Archived";

export type ProjectEntry = {
  slug: string;
  name: string;
  description: string;
  stage: ProjectStage;
  architecture: string;
  stack: string[];
  timeline: string; // human range
  started: string; // ISO
  updated: string; // ISO
  role: string;
  outcome: string;
};

export const PROJECTS: ProjectEntry[] = [
  {
    slug: "helix-inference",
    name: "Helix Inference",
    description:
      "Expert-parallel serving runtime for mixture-of-experts models with per-tenant isolation and speculative decoding.",
    stage: "Production",
    architecture: "Sharded expert workers · router · KV cache tier · gRPC edge",
    stack: ["Rust", "CUDA", "NCCL", "gRPC"],
    timeline: "2025-Q3 → present",
    started: "2025-08-04",
    updated: "2026-06-30",
    role: "Serving runtime for internal LLM workloads",
    outcome:
      "Median TTFT held under 180ms at p95 concurrency of 512 across mixed-tenant traffic on H100 nodes.",
  },
  {
    slug: "atlas-control-plane",
    name: "Atlas Control Plane",
    description:
      "Declarative multi-region control plane reconciling workload specs into per-region Kubernetes state.",
    stage: "Production",
    architecture: "Spec API · reconcilers · region shards · policy engine",
    stack: ["Go", "Kubernetes", "Postgres", "OPA"],
    timeline: "2025-Q1 → present",
    started: "2025-02-12",
    updated: "2026-06-25",
    role: "Platform substrate for internal services",
    outcome:
      "Reduced cross-region drift incidents from weekly to zero over two release cycles.",
  },
  {
    slug: "meridian-eval",
    name: "Meridian Eval",
    description:
      "Reproducible evaluation harness for agentic and retrieval systems at scale, with deterministic replay.",
    stage: "Prototype",
    architecture: "Task registry · runner pool · trace store · scoring DAG",
    stack: ["Python", "DuckDB", "Ray"],
    timeline: "2026-Q1 → present",
    started: "2026-01-19",
    updated: "2026-06-11",
    role: "Internal evaluation framework for agent research",
    outcome:
      "Cut end-to-end suite runtime from 6h to 42m through partitioned task graphs and cached tool responses.",
  },
  {
    slug: "orbit-observability",
    name: "Orbit Observability",
    description:
      "Trace-first telemetry pipeline with tail-based sampling and cardinality budget enforcement.",
    stage: "Production",
    architecture: "OTel collectors · sampler · aggregator · columnar store",
    stack: ["Rust", "ClickHouse", "OpenTelemetry"],
    timeline: "2024-Q4 → present",
    started: "2024-11-03",
    updated: "2026-05-30",
    role: "Primary observability substrate",
    outcome:
      "Held storage write amplification below 1.4× while retaining 100% of anomalous traces.",
  },
  {
    slug: "parity-consensus",
    name: "Parity Consensus",
    description:
      "Experimental leaderless consensus protocol for geo-distributed metadata under partial partitions.",
    stage: "Research",
    architecture: "Quorum planes · vector clocks · reconciliation log",
    stack: ["Rust", "TLA+"],
    timeline: "2026-Q2 → present",
    started: "2026-04-02",
    updated: "2026-05-19",
    role: "Research prototype for metadata layer",
    outcome:
      "Model-checked liveness properties under adversarial network schedules across 12 configurations.",
  },
  {
    slug: "signal-router",
    name: "Signal Router",
    description:
      "High-throughput event router with backpressure-aware fan-out over io_uring.",
    stage: "Prototype",
    architecture: "Ingress ring · dispatcher · per-subscriber credit ledger",
    stack: ["Zig", "io_uring"],
    timeline: "2026-Q1 → present",
    started: "2026-03-04",
    updated: "2026-05-04",
    role: "Candidate replacement for legacy event bus",
    outcome:
      "Sustained 2.1M events/s on a single node with bounded producer memory under artificial slow consumers.",
  },
  {
    slug: "marketpulse",
    name: "MarketPulse",
    description:
      "Tick-level market data ingestion, normalization, and distribution pipeline.",
    stage: "Production",
    architecture: "Venue adapters · normalizer · stream broker · bar builder",
    stack: ["Rust", "ClickHouse", "Redpanda"],
    timeline: "2024-Q2 → present",
    started: "2024-05-11",
    updated: "2026-06-28",
    role: "Market data substrate for signals",
    outcome:
      "Venue-to-consumer p99 latency stabilized under 4ms across the full trading session.",
  },
  {
    slug: "vigil",
    name: "Vigil",
    description:
      "Kernel-level anomaly detection for multi-tenant compute nodes using eBPF probes.",
    stage: "Research",
    architecture: "eBPF probes · per-workload baseline · anomaly scorer",
    stack: ["Zig", "eBPF", "Prometheus"],
    timeline: "2026-Q2 → present",
    started: "2026-04-15",
    updated: "2026-06-14",
    role: "Research prototype for host security telemetry",
    outcome:
      "Detected 3 unseen noisy-neighbor patterns during shadow deployment without SLO impact.",
  },
];
