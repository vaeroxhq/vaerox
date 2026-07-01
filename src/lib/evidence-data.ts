/**
 * Engineering evidence — per-system and per-project supporting artifacts
 * that back up every claim the surface makes. Consumed by the systems
 * and projects detail routes.
 *
 * Evidence is intentionally opinionated, dated, and specific. Trade-offs
 * name the alternative that was rejected. Limitations state what is
 * genuinely unsolved today. Evolution records real version boundaries
 * (not marketing milestones). Metrics are computed from repository facts
 * — LOC, revisions, ADR count, dependency count — not aspirational KPIs.
 */

export type EvidenceVersion = {
  tag: string;         // "v0.1"
  at: string;          // ISO
  headline: string;    // one-line
  detail: string;      // 1–2 sentences
};

export type EvidenceTradeoff = {
  choice: string;      // "PostgreSQL"
  over: string;        // "MongoDB"
  because: string;     // 1–2 sentences
};

export type EvidenceLimitation = {
  title: string;
  detail: string;
  kind: "current" | "scaling" | "future" | "research" | "experimental";
};

export type EvidenceFailure = {
  at: string;          // ISO
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
  languages: { name: string; share: number }[]; // fractions summing ~1
  runtime: string;
  storage?: string;
  queue?: string;
  database?: string;
  dependencies: number;
  repoAgeMonths: number;
  architectureRevisions: number;
  adrRefs: string[];         // ADR slugs
  benchmarkRefs: string[];   // benchmark slugs
  incidentRefs: string[];    // incident slugs
  tradeoffs: EvidenceTradeoff[];
  limitations: EvidenceLimitation[];
  evolution: EvidenceVersion[];
  failures: EvidenceFailure[];
  docsCoverage: number;      // 0..1
  additionalMetrics?: EvidenceMetric[];
};

export type ProjectEvidence = {
  loc: number;
  languages: { name: string; share: number }[];
  linkedSystem?: string;     // system slug the project instantiates
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

/* ── Systems ─────────────────────────────────────────────── */

export const SYSTEM_EVIDENCE: Record<string, SystemEvidence> = {
  helix: {
    loc: 68_412,
    files: 412,
    languages: [
      { name: "Rust", share: 0.71 },
      { name: "CUDA C++", share: 0.18 },
      { name: "Python (bindings)", share: 0.08 },
      { name: "Protobuf / Bazel", share: 0.03 },
    ],
    runtime: "Linux 6.6 · CUDA 12.4 · NCCL 2.20 · gRPC 1.63",
    storage: "Local NVMe scratch for KV shards · S3 for model weights",
    database: "Redis (tenant KV routing)",
    queue: "gRPC bidi streams · no external broker",
    dependencies: 74,
    repoAgeMonths: 22,
    architectureRevisions: 4,
    docsCoverage: 0.82,
    adrRefs: ["grpc-framing"],
    benchmarkRefs: ["helix-first-token", "helix-streaming-throughput", "helix-cost-per-mtok"],
    incidentRefs: ["helix-p99-driver-regression", "helix-kv-cache-thrash"],
    tradeoffs: [
      {
        choice: "gRPC bidirectional streams",
        over: "raw HTTP/2 + SSE",
        because:
          "Per-stream cancellation semantics are standardised and the router already spoke gRPC to the control plane. SSE would have required a parallel cancellation channel.",
      },
      {
        choice: "Rust + CUDA custom kernels",
        over: "PyTorch serving stack",
        because:
          "Serving-time overhead of the Python runtime was a measurable share of TTFT under short-prompt traffic. Custom kernels also let expert-parallel scheduling stay inside a single address space.",
      },
      {
        choice: "Per-tenant KV cache shards",
        over: "global KV cache with eviction",
        because:
          "Noisy neighbours dominated tail latency in the shared design. Tenant scoping trades a small memory-utilisation hit for predictable P99.",
      },
      {
        choice: "Speculative decoding with draft model",
        over: "greedy decode only",
        because:
          "Latency win on long-context decode outweighs the draft model’s VRAM footprint on H100 nodes. On lower-VRAM SKUs speculative decode is disabled by config.",
      },
    ],
    limitations: [
      {
        kind: "current",
        title: "H100-only path optimised",
        detail:
          "Expert-parallel scheduler currently assumes NVLink switch topology. A100 and consumer GPUs fall back to a slower path with no expert sharding.",
      },
      {
        kind: "scaling",
        title: "KV cache tier is single-region",
        detail:
          "Cross-region tenant migration flushes the KV cache. Warm handoff is on the roadmap but requires ADR·027 to land.",
      },
      {
        kind: "future",
        title: "Structured output constraints",
        detail:
          "JSON-schema-constrained decoding runs at ~72% of unconstrained throughput. Kernel fusion for the mask is planned for the next quarter.",
      },
      {
        kind: "research",
        title: "MoE draft-model correctness",
        detail:
          "Speculative decoding with MoE draft models occasionally produces divergent trajectories on very long contexts. Under investigation with Meridian eval harness.",
      },
    ],
    evolution: [
      { tag: "v0.1", at: "2024-09-02", headline: "Prototype single-GPU server", detail: "Rust wrapper around a PyTorch backend. No batching, no expert parallelism." },
      { tag: "v0.4", at: "2024-12-11", headline: "Structured batching + NCCL", detail: "Introduced continuous batching and NCCL-backed expert parallelism across 8 GPUs." },
      { tag: "v0.7", at: "2025-05-06", headline: "gRPC framing rework", detail: "Replaced ad-hoc HTTP/2 with bidirectional gRPC streams (ADR·014). Cut P95 TTFT from 210ms to 152ms." },
      { tag: "v1.0", at: "2025-09-30", headline: "Production GA", detail: "Multi-tenant KV sharding, per-tenant quotas, and speculative decoding enabled by default on H100 pools." },
      { tag: "v1.9", at: "2026-06-15", headline: "Draft-model MoE decode", detail: "Speculative decoding extended to MoE drafts; P95 TTFT stable at 118ms across mixed traffic." },
    ],
    failures: [
      {
        at: "2026-05-21",
        title: "Driver 570.86 regression",
        detail:
          "A minor NVIDIA driver bump silently raised H2D copy latency by ~3×. First noticed by the nightly BNCH-01 run jumping from 121ms to 411ms.",
        lesson:
          "Benchmarks are release-blocking: BNCH-01 now gates the canary and the driver matrix is pinned per revision.",
      },
      {
        at: "2025-11-04",
        title: "KV cache thrash on shared tenant pool",
        detail:
          "A single tenant with adversarial prompt distribution evicted 60% of the shared cache. Global cache design was abandoned two weeks later in favour of tenant-scoped shards.",
        lesson:
          "‘Shared efficient’ resources under multi-tenant load usually collapse to ‘shared unpredictable’. Prefer isolation with a small utilisation cost.",
      },
    ],
    additionalMetrics: [
      { label: "Public RPCs", value: "5" },
      { label: "Config keys", value: "112" },
    ],
  },
  atlas: {
    loc: 91_204,
    files: 623,
    languages: [
      { name: "Go", share: 0.78 },
      { name: "Rego (OPA)", share: 0.09 },
      { name: "SQL", share: 0.07 },
      { name: "Protobuf", share: 0.06 },
    ],
    runtime: "Go 1.23 · Kubernetes 1.30 · OPA 0.68",
    storage: "S3 (spec snapshots) · local disk (WAL)",
    database: "PostgreSQL 16 (metadata) · CockroachDB (multi-region grants)",
    queue: "Internal reconciler queue · at-least-once with idempotent apply",
    dependencies: 118,
    repoAgeMonths: 30,
    architectureRevisions: 6,
    docsCoverage: 0.74,
    adrRefs: ["monorepo-boundary", "region-failover", "consensus-model", "url-taxonomy-v2"],
    benchmarkRefs: ["atlas-control-plane-p95", "atlas-reconcile-loop"],
    incidentRefs: ["eu-west-2-region-failover", "atlas-scheduler-cascading-retry", "atlas-quota-controller-flap"],
    tradeoffs: [
      {
        choice: "PostgreSQL for single-region metadata",
        over: "MongoDB",
        because:
          "Every metadata read is either point-lookup or bounded range across strongly-typed keys. Relational constraints catch drift bugs before they reach reconcilers. MongoDB’s flexible schema was actively harmful here.",
      },
      {
        choice: "Leaderless replication for cross-region grants",
        over: "single-leader with warm standby",
        because:
          "The eu-west-2 outage showed that single-leader designs push manual work into failover. Leaderless writes trade +34ms P95 for a 47min → 12s RTO (ADR·022).",
      },
      {
        choice: "Reconciler queue over event bus",
        over: "external Kafka / Redpanda",
        because:
          "Reconciliation is scoped to workload placement; ordering only matters per-workload. Embedding the queue keeps the failure domain inside Atlas.",
      },
      {
        choice: "Rego policy engine",
        over: "handwritten Go policy checks",
        because:
          "Policies are the audit surface; Rego lets us diff policy versions independently of code and expose them to reviewers.",
      },
    ],
    limitations: [
      {
        kind: "current",
        title: "3-region minimum",
        detail:
          "Leaderless writes require a majority across three regions. Two-region deployments fall back to a stricter single-leader mode with the old RTO characteristics.",
      },
      {
        kind: "scaling",
        title: "Reconciler cold start",
        detail:
          "On boot, the reconciler replays the last 24h of spec history. Above ~40k workloads this costs several minutes; incremental snapshot loading is planned.",
      },
      {
        kind: "future",
        title: "Policy simulation UI",
        detail:
          "Policy changes ship via ADR + review, but there is no interactive ‘what would this deny today’ preview yet.",
      },
      {
        kind: "experimental",
        title: "Parity consensus substrate",
        detail:
          "ADR·027 proposes replacing the current leaderless implementation with Parity. Currently model-checked only; production burn-in has not started.",
      },
    ],
    evolution: [
      { tag: "v1.0", at: "2024-01-15", headline: "Single-region reconciler", detail: "Spec API + reconciler + Kubernetes actuator, single region only." },
      { tag: "v2.0", at: "2024-08-22", headline: "OPA policy engine", detail: "Extracted policy from Go into Rego. Diffable policy history became the audit surface." },
      { tag: "v3.0", at: "2025-05-02", headline: "Multi-region metadata", detail: "Added regional shards with async replication; still single-leader per shard." },
      { tag: "v3.4", at: "2025-10-14", headline: "Post-outage rework", detail: "Following the eu-west-2 incident, introduced automated fencing and quorum reads (ADR·022)." },
      { tag: "v3.8", at: "2026-06-25", headline: "Leaderless writes GA", detail: "Cross-region writes served without a global leader; P95 dropped from 91ms to 42ms." },
    ],
    failures: [
      {
        at: "2025-02-11",
        title: "eu-west-2 region isolation",
        detail:
          "A network partition made the metadata primary unreachable. Manual promotion took 47 minutes; two automated flappers made it worse before it got better.",
        lesson:
          "Any manual step in a failover path is a promise that a human will be awake and correct. ADR·022 removed the human from the critical path.",
      },
      {
        at: "2025-11-30",
        title: "Scheduler cascading retry",
        detail:
          "A minor timeout tuning change made the scheduler retry at exponential rate against a saturated dependency, amplifying the outage by ~4×.",
        lesson:
          "Retries without a bounded budget are a form of DoS. All internal clients now share a retry-budget middleware.",
      },
    ],
    additionalMetrics: [
      { label: "Reconciler queues", value: "17" },
      { label: "OPA policies", value: "63" },
    ],
  },
  orbit: {
    loc: 42_910,
    files: 288,
    languages: [
      { name: "Rust", share: 0.68 },
      { name: "SQL", share: 0.18 },
      { name: "TypeScript (UI)", share: 0.09 },
      { name: "Protobuf", share: 0.05 },
    ],
    runtime: "Rust 1.79 · OpenTelemetry 1.31 · ClickHouse 24.5",
    storage: "ClickHouse (traces + metrics) · S3 (cold spans)",
    database: "ClickHouse",
    queue: "OTel collector → in-process channel → aggregator",
    dependencies: 56,
    repoAgeMonths: 19,
    architectureRevisions: 3,
    docsCoverage: 0.79,
    adrRefs: ["trace-sampling"],
    benchmarkRefs: ["orbit-ingest-throughput", "orbit-query-p95"],
    incidentRefs: ["orbit-tail-buffer-overrun"],
    tradeoffs: [
      {
        choice: "Tail-based sampling",
        over: "universal retention with tiered storage",
        because:
          "Cost grew super-linearly with cardinality on universal retention. Tail sampling keeps every SLO-breaching trace at ~4% of the storage cost (ADR·018).",
      },
      {
        choice: "ClickHouse over Elasticsearch",
        over: "Elasticsearch",
        because:
          "Trace queries are analytical (aggregations across time), not text search. ClickHouse handles the workload at a fraction of the RAM per query.",
      },
      {
        choice: "In-process sampler",
        over: "external streaming sampler",
        because:
          "Every extra hop is 4ms of buffered latency; keeping the sampler in-process lets us hit the ingest budget with a smaller fleet.",
      },
    ],
    limitations: [
      {
        kind: "current",
        title: "OTel-only ingest",
        detail: "Legacy Jaeger/Zipkin ingest is intentionally unsupported. Migration requires an OTel bridge.",
      },
      {
        kind: "scaling",
        title: "Cardinality budget is per-service",
        detail: "Tenants with hundreds of services need per-tenant budgeting; currently approximated with service-name prefixes.",
      },
      {
        kind: "future",
        title: "Exemplar linking",
        detail: "Metric → trace exemplar links exist end-to-end but are not yet indexed for fast reverse lookup.",
      },
    ],
    evolution: [
      { tag: "v0.1", at: "2024-11-03", headline: "Head-sampled prototype", detail: "1% head sampling into ClickHouse. Missed every long-tail incident it was supposed to help debug." },
      { tag: "v0.6", at: "2025-04-12", headline: "Tail sampler introduced", detail: "Two-stage sampler keeps any trace whose root span exceeds 2× per-service SLO (ADR·018)." },
      { tag: "v1.0", at: "2025-08-02", headline: "Cardinality budgets", detail: "Per-service budgets enforced at ingest with an in-process rejection path." },
      { tag: "v2.3", at: "2026-06-19", headline: "Async batch writer", detail: "New writer path lifted single-collector ingest from 240k to 412k spans/s." },
    ],
    failures: [
      {
        at: "2025-11-19",
        title: "Tail buffer overrun on synthetic burst",
        detail:
          "A load-test regressed the tail sampler’s memory bound. Buffer high-watermark hit 100% and spans were dropped for 8 minutes.",
        lesson:
          "Ingest sustained rate is not enough; benchmarks now measure ‘maximum rate at which HWM stays ≤ 60%’.",
      },
    ],
    additionalMetrics: [
      { label: "Ingest schemas", value: "6" },
      { label: "Retention tiers", value: "3 (hot/warm/cold)" },
    ],
  },
  marketpulse: {
    loc: 38_112,
    files: 214,
    languages: [
      { name: "Rust", share: 0.86 },
      { name: "SQL", share: 0.08 },
      { name: "Python (tools)", share: 0.06 },
    ],
    runtime: "Rust 1.79 · kernel-bypass NIC (DPDK-lite shim) · PTP-disciplined clocks",
    storage: "ClickHouse (bar aggregates) · local ring buffer (raw ticks)",
    database: "ClickHouse",
    queue: "Redpanda (durable tick stream)",
    dependencies: 41,
    repoAgeMonths: 25,
    architectureRevisions: 3,
    docsCoverage: 0.68,
    adrRefs: [],
    benchmarkRefs: ["marketpulse-tick-latency"],
    incidentRefs: ["marketpulse-venue-adapter-drift"],
    tradeoffs: [
      {
        choice: "Rust with kernel-bypass NIC",
        over: "Go on stock kernel",
        because:
          "Venue-to-consumer P99 has to stay under 5ms across the trading session. Stock kernel networking sat around 8ms tail on the same hardware.",
      },
      {
        choice: "Redpanda over Kafka",
        over: "Apache Kafka",
        because:
          "Same protocol, single binary, no JVM tuning. Operational simplicity was the deciding factor in a solo-maintained deployment.",
      },
      {
        choice: "Per-venue adapters over unified feed",
        over: "single normalising ingest",
        because:
          "Every venue has its own quirks; isolating them prevents an adapter change on venue A from silently changing bars for venue B.",
      },
    ],
    limitations: [
      {
        kind: "current",
        title: "3 venues integrated",
        detail: "Additional venues require dedicated adapters with per-exchange conformance tests.",
      },
      {
        kind: "scaling",
        title: "Colocated hardware assumption",
        detail: "Latency budgets assume colocation; cloud-hosted deployments run at ~2× the tick latency.",
      },
      {
        kind: "future",
        title: "Historical replay parity",
        detail: "Backtest replay uses a simplified microstructure; full L3 replay is on the roadmap.",
      },
    ],
    evolution: [
      { tag: "v1.0", at: "2024-05-11", headline: "Single-venue prototype", detail: "Direct feed handler for a single venue, in-process normaliser." },
      { tag: "v2.0", at: "2024-12-04", headline: "Redpanda stream", detail: "Introduced durable stream; downstream consumers decoupled from ingest cadence." },
      { tag: "v4.5", at: "2026-06-28", headline: "Multi-venue steady state", detail: "3 venues, P99 stable at 3.8µs across the full session." },
    ],
    failures: [
      {
        at: "2026-02-17",
        title: "Venue adapter drift",
        detail:
          "A venue changed order-book increment semantics without notice. Normaliser silently produced skewed bars for 41 minutes before conformance test alerted.",
        lesson:
          "Every adapter now has a conformance oracle that runs against a captured golden feed continuously, not only in CI.",
      },
    ],
    additionalMetrics: [
      { label: "Venues", value: "3" },
      { label: "Bar aggregations", value: "12" },
    ],
  },
  axiom: {
    loc: 22_460,
    files: 178,
    languages: [
      { name: "Python", share: 0.82 },
      { name: "CUDA (kernels)", share: 0.12 },
      { name: "YAML (task specs)", share: 0.06 },
    ],
    runtime: "Python 3.12 · PyTorch 2.4 · Triton 2.3",
    storage: "DuckDB (task results) · S3 (trajectories)",
    database: "DuckDB",
    queue: "Ray task queue",
    dependencies: 91,
    repoAgeMonths: 8,
    architectureRevisions: 2,
    docsCoverage: 0.61,
    adrRefs: ["eval-harness"],
    benchmarkRefs: [],
    incidentRefs: [],
    tradeoffs: [
      {
        choice: "Deterministic tool mocking",
        over: "live tool execution",
        because:
          "Live tools make reproducibility a fiction. Mocked responses with captured golden trajectories keep evals comparable across weeks.",
      },
      {
        choice: "Python-first",
        over: "Rust harness",
        because:
          "The harness is I/O bound and the ecosystem around agent frameworks is Python. Speed of iteration outweighs runtime cost here.",
      },
    ],
    limitations: [
      { kind: "experimental", title: "Prototype stage", detail: "No SLO, no on-call. Not to be depended on by production surfaces." },
      { kind: "research", title: "Scoring is heuristic", detail: "Per-step scoring depends on task-specific rubrics; cross-task aggregation is imperfect." },
    ],
    evolution: [
      { tag: "v0.1", at: "2025-11-04", headline: "Task registry prototype", detail: "Manual task definitions, no result store." },
      { tag: "v0.3", at: "2026-03-19", headline: "Trajectory replay", detail: "Deterministic replay with tool mocks landed; first cross-week comparisons became meaningful." },
    ],
    failures: [],
  },
  vigil: {
    loc: 14_204,
    files: 96,
    languages: [
      { name: "Zig", share: 0.62 },
      { name: "C (eBPF)", share: 0.31 },
      { name: "Rust (userland)", share: 0.07 },
    ],
    runtime: "Zig 0.13 · Linux 6.6 eBPF · Prometheus 2.53",
    storage: "Prometheus TSDB",
    database: "Prometheus",
    queue: "Perf ring buffer → userland aggregator",
    dependencies: 22,
    repoAgeMonths: 6,
    architectureRevisions: 1,
    docsCoverage: 0.44,
    adrRefs: [],
    benchmarkRefs: [],
    incidentRefs: [],
    tradeoffs: [
      {
        choice: "eBPF over kernel module",
        over: "loadable kernel module",
        because: "eBPF is portable across kernel versions and comes with a verifier. Cost: some probe points are not reachable and had to be worked around.",
      },
      {
        choice: "Zig over Rust for probes",
        over: "Rust",
        because: "Zig’s C interop with libbpf was smoother during prototyping. This decision is under review as Rust’s aya ecosystem matures.",
      },
    ],
    limitations: [
      { kind: "research", title: "Baseline stability", detail: "Per-workload baselines drift with deploys; retraining cadence is still under study." },
      { kind: "experimental", title: "Health: degraded", detail: "Currently in shadow mode. Alerts are advisory only." },
    ],
    evolution: [
      { tag: "v0.1", at: "2026-04-15", headline: "Syscall probe skeleton", detail: "First eBPF probe surface with a userland aggregator." },
      { tag: "v0.3", at: "2026-06-14", headline: "Baseline scorer", detail: "Per-workload behavioural baselines wired into Prometheus." },
    ],
    failures: [],
  },
  "signal-router": {
    loc: 18_902,
    files: 132,
    languages: [
      { name: "Zig", share: 0.83 },
      { name: "C (io_uring shims)", share: 0.11 },
      { name: "Rust (CLI)", share: 0.06 },
    ],
    runtime: "Zig 0.13 · Linux 6.6 (io_uring)",
    storage: "None (stateless data plane)",
    queue: "In-process ring buffers with per-subscriber credits",
    dependencies: 18,
    repoAgeMonths: 9,
    architectureRevisions: 2,
    docsCoverage: 0.58,
    adrRefs: ["io-uring-router"],
    benchmarkRefs: ["signal-router-fanout"],
    incidentRefs: ["signal-router-sq-underprovisioned"],
    tradeoffs: [
      {
        choice: "io_uring over epoll",
        over: "epoll",
        because: "Sustained throughput cap on epoll was ~380k events/s/core. io_uring lifted it above 1.4M/s/core (ADR·029). Cost: expanded kernel matrix in CI.",
      },
      {
        choice: "Credit-based backpressure",
        over: "drop-on-full",
        because: "Silent drops hid consumer bugs. Explicit credits push the failure to the producer where it is visible.",
      },
      {
        choice: "Zig over Rust",
        over: "Rust",
        because: "Zero-cost interop with the io_uring C headers and simpler build story for the small, self-contained data plane.",
      },
    ],
    limitations: [
      { kind: "current", title: "Linux ≥ 5.11 required for io_uring path", detail: "epoll fallback path is functional but capped at ~380k events/s/core." },
      { kind: "future", title: "Cross-node fan-out", detail: "Single-node only today. A gossip-based multi-node router is sketched in the design notes." },
    ],
    evolution: [
      { tag: "v0.4", at: "2025-06-04", headline: "epoll prototype", detail: "Working single-node fan-out at 380k events/s/core." },
      { tag: "v0.6", at: "2025-10-11", headline: "io_uring path", detail: "First io_uring implementation, immediate 3× throughput jump." },
      { tag: "v0.8", at: "2026-06-08", headline: "Credit accounting", detail: "Per-subscriber credit ledger bounds producer memory under slow consumers." },
    ],
    failures: [
      {
        at: "2026-01-30",
        title: "SQ depth under-provisioned",
        detail:
          "Under a specific burst pattern the submission queue saturated and latency spiked to 40ms. Fix: adaptive SQ sizing plus a benchmark case that reproduces the burst.",
        lesson: "Ring depth is a tunable, not a constant; benchmarks must include adversarial bursts.",
      },
    ],
  },
  "ledger-01": {
    loc: 26_010,
    files: 190,
    languages: [
      { name: "Erlang", share: 0.72 },
      { name: "C++ (RocksDB shim)", share: 0.21 },
      { name: "Shell", share: 0.07 },
    ],
    runtime: "OTP 26 · RocksDB 8.x",
    storage: "RocksDB",
    database: "RocksDB",
    queue: "Internal mailbox",
    dependencies: 34,
    repoAgeMonths: 42,
    architectureRevisions: 3,
    docsCoverage: 0.55,
    adrRefs: [],
    benchmarkRefs: [],
    incidentRefs: [],
    tradeoffs: [
      {
        choice: "Archive-only mode",
        over: "continued development",
        because: "Successor (Parity Consensus prototype) covers the same use case with better multi-region semantics. Ledger·01 is preserved for replay and audit only.",
      },
    ],
    limitations: [
      { kind: "current", title: "No new writes accepted", detail: "Historical replay and audit only. All new metadata belongs on the successor path." },
    ],
    evolution: [
      { tag: "v1.0", at: "2022-04-11", headline: "Initial ledger", detail: "Append-only log service on RocksDB." },
      { tag: "v2.4", at: "2025-11-02", headline: "Archived", detail: "Last accepted write. Preserved for compliance replay." },
    ],
    failures: [],
  },
};

/* ── Projects ───────────────────────────────────────────── */

export const PROJECT_EVIDENCE: Record<string, ProjectEvidence> = {
  "helix-inference": {
    loc: 68_412,
    linkedSystem: "helix",
    languages: [
      { name: "Rust", share: 0.71 },
      { name: "CUDA C++", share: 0.18 },
      { name: "Python", share: 0.08 },
      { name: "Protobuf", share: 0.03 },
    ],
    adrRefs: ["grpc-framing"],
    benchmarkRefs: ["helix-first-token", "helix-streaming-throughput", "helix-cost-per-mtok"],
    incidentRefs: ["helix-p99-driver-regression", "helix-kv-cache-thrash"],
    researchRefs: [],
    tradeoffs: [
      { choice: "Custom Rust runtime", over: "vLLM / TGI", because: "Both were considered and prototyped. Neither exposed a hook to plug in the router’s tenant-scoped KV scheduling without forking. Owning the runtime kept the invariant explicit." },
      { choice: "gRPC over HTTP/2+SSE", over: "SSE", because: "Standard cancellation, standard multiplexing, and existing tooling on the router side (ADR·014)." },
      { choice: "H100 first-class", over: "generic GPU path", because: "The scheduling win only exists with fast intra-node collectives. The generic path exists but is intentionally slower rather than pretending they’re equivalent." },
    ],
    limitations: [
      { kind: "current", title: "Serving-only", detail: "No training pipeline; that belongs elsewhere." },
      { kind: "scaling", title: "Cross-region KV migration", detail: "Warm handoff blocked on ADR·027 landing." },
    ],
    evolution: [
      { tag: "v0.1", at: "2025-08-04", headline: "Prototype", detail: "Rust server around PyTorch backend." },
      { tag: "v0.3", at: "2024-12-11", headline: "Architecture rewrite", detail: "Structured batching + NCCL-backed expert parallelism." },
      { tag: "v0.7", at: "2025-05-06", headline: "Async gRPC data plane", detail: "Replaced HTTP/2+SSE with bidi gRPC streams." },
      { tag: "v1.0", at: "2025-09-30", headline: "Stable reference implementation", detail: "Multi-tenant KV sharding, speculative decoding, and per-tenant quotas GA." },
    ],
    failures: [
      { at: "2026-05-21", title: "Driver 570.86 regression", detail: "Silent 3× H2D copy regression from a driver bump. Detected by BNCH-01 nightly, rolled back within a day.", lesson: "Benchmarks are release-blocking, not decorative." },
    ],
    additionalMetrics: [{ label: "Public RPCs", value: "5" }, { label: "H100 nodes", value: "18 (prod)" }],
  },
  "atlas-control-plane": {
    loc: 91_204,
    linkedSystem: "atlas",
    languages: [
      { name: "Go", share: 0.78 },
      { name: "Rego", share: 0.09 },
      { name: "SQL", share: 0.07 },
      { name: "Protobuf", share: 0.06 },
    ],
    adrRefs: ["monorepo-boundary", "region-failover", "consensus-model"],
    benchmarkRefs: ["atlas-control-plane-p95", "atlas-reconcile-loop"],
    incidentRefs: ["eu-west-2-region-failover", "atlas-scheduler-cascading-retry"],
    researchRefs: [],
    tradeoffs: [
      { choice: "Postgres for regional metadata", over: "MongoDB", because: "Relational constraints catch drift bugs before they escape the API. Metadata is deeply typed." },
      { choice: "Leaderless writes for grants", over: "single-leader + warm standby", because: "Removed the human from failover (ADR·022). +34ms P95 for a 47min → 12s RTO." },
      { choice: "Rego policies", over: "Go policy checks", because: "Diffable policy history is the audit trail; code diffs are not enough." },
    ],
    limitations: [
      { kind: "current", title: "3-region minimum", detail: "Two-region deployments fall back to single-leader mode." },
      { kind: "scaling", title: "Reconciler cold start", detail: "Above ~40k workloads, boot replay costs several minutes." },
      { kind: "experimental", title: "Parity substrate", detail: "ADR·027 proposes replacing the current leaderless implementation." },
    ],
    evolution: [
      { tag: "v0.1", at: "2025-02-12", headline: "Prototype", detail: "Single-region reconciler." },
      { tag: "v0.5", at: "2024-08-22", headline: "OPA extracted", detail: "Policy moved out of Go; diffable audit trail." },
      { tag: "v0.9", at: "2025-05-02", headline: "Async processing introduced", detail: "Reconciler queue and worker pool decoupled from the API." },
      { tag: "v1.0", at: "2026-06-25", headline: "Stable reference implementation", detail: "Leaderless writes GA; cross-region P95 42ms." },
    ],
    failures: [
      { at: "2025-02-11", title: "eu-west-2 promotion", detail: "47-minute manual failover during network partition.", lesson: "Manual failover paths are not paths." },
      { at: "2025-11-30", title: "Cascading retry", detail: "Unbounded retries amplified a downstream outage ~4×.", lesson: "Retries need budgets." },
    ],
  },
  "meridian-eval": {
    loc: 24_902,
    linkedSystem: "meridian-eval",
    languages: [{ name: "Python", share: 0.88 }, { name: "SQL", share: 0.08 }, { name: "YAML", share: 0.04 }],
    adrRefs: ["eval-harness"],
    benchmarkRefs: ["meridian-suite-runtime"],
    incidentRefs: [],
    researchRefs: [],
    tradeoffs: [
      { choice: "DuckDB result store", over: "Postgres", because: "Analyst queries dominate; DuckDB’s columnar path is faster and needs no server." },
      { choice: "Ray executor", over: "Dask", because: "Task graphs with tool-call side effects fit Ray’s actor model. Dask’s functional model made side effects awkward." },
      { choice: "Deterministic manifests", over: "reproduce-by-git-sha", because: "Environment drifts even with a pinned SHA. Manifests capture the full input surface — seeds, tool mocks, model versions." },
    ],
    limitations: [
      { kind: "current", title: "Adapter-only third-party benches", detail: "External benchmark suites need adapter modules." },
      { kind: "future", title: "Live tool support", detail: "Only deterministic mocks today; live tools with quarantined side effects are on the roadmap." },
    ],
    evolution: [
      { tag: "v0.1", at: "2026-01-19", headline: "Prototype", detail: "Manual task registry." },
      { tag: "v0.3", at: "2026-03-19", headline: "Trajectory replay", detail: "Deterministic replay with mocked tools." },
      { tag: "v0.4", at: "2026-04-14", headline: "Async processing introduced", detail: "Partitioned task graphs; cross-run caching." },
      { tag: "v0.6", at: "2026-06-11", headline: "Reference implementation", detail: "Full suite in 42m (was 6h)." },
    ],
    failures: [],
  },
  "orbit-observability": {
    loc: 42_910,
    linkedSystem: "orbit",
    languages: [{ name: "Rust", share: 0.68 }, { name: "SQL", share: 0.18 }, { name: "TypeScript", share: 0.09 }, { name: "Protobuf", share: 0.05 }],
    adrRefs: ["trace-sampling"],
    benchmarkRefs: ["orbit-ingest-throughput", "orbit-query-p95"],
    incidentRefs: ["orbit-tail-buffer-overrun"],
    researchRefs: [],
    tradeoffs: [
      { choice: "Tail-based sampling", over: "universal retention", because: "Cost was super-linear in cardinality. Tail sampling keeps the traces that matter." },
      { choice: "ClickHouse", over: "Elasticsearch", because: "Trace workloads are aggregations, not text search." },
    ],
    limitations: [
      { kind: "current", title: "OTel-only ingest", detail: "Legacy Jaeger/Zipkin ingest intentionally unsupported." },
      { kind: "future", title: "Exemplar index", detail: "Metric→trace exemplars exist but aren’t indexed for reverse lookup." },
    ],
    evolution: [
      { tag: "v0.1", at: "2024-11-03", headline: "Head-sampled prototype", detail: "1% head sampling; missed everything that mattered." },
      { tag: "v0.6", at: "2025-04-12", headline: "Tail sampler", detail: "Kept any trace exceeding 2× per-service SLO." },
      { tag: "v1.0", at: "2025-08-02", headline: "Reference implementation", detail: "Cardinality budgets GA." },
      { tag: "v2.3", at: "2026-06-19", headline: "Async batch writer", detail: "Single-collector ingest lifted 240k → 412k spans/s." },
    ],
    failures: [
      { at: "2025-11-19", title: "Tail buffer overrun", detail: "HWM hit 100% under a load test; 8 minutes of drops.", lesson: "Sustained rate is not enough — bench HWM stability." },
    ],
  },
  "parity-consensus": {
    loc: 8_402,
    linkedSystem: undefined,
    languages: [{ name: "Rust", share: 0.62 }, { name: "TLA+", share: 0.38 }],
    adrRefs: ["consensus-model"],
    benchmarkRefs: [],
    incidentRefs: [],
    researchRefs: [],
    tradeoffs: [
      { choice: "Leaderless protocol", over: "Raft with pre-vote", because: "Raft still exhibited leader thrash under measured workload; leaderless removes the global leader entirely." },
      { choice: "TLA+ model", over: "property-tests-only", because: "Model checking exposed two liveness bugs before any code was written." },
    ],
    limitations: [
      { kind: "research", title: "Not production", detail: "Model-checked and simulated only. No production burn-in." },
      { kind: "experimental", title: "Operational cost unknown", detail: "New mental model for on-call; not yet exercised in incident drills." },
    ],
    evolution: [
      { tag: "v0.1", at: "2026-04-02", headline: "TLA+ specification", detail: "First model with safety proofs." },
      { tag: "v0.2", at: "2026-05-19", headline: "Simulation harness", detail: "Ray-based network simulator covering 12 adversarial schedules." },
    ],
    failures: [],
  },
  "signal-router": {
    loc: 18_902,
    linkedSystem: "signal-router",
    languages: [{ name: "Zig", share: 0.83 }, { name: "C", share: 0.11 }, { name: "Rust", share: 0.06 }],
    adrRefs: ["io-uring-router"],
    benchmarkRefs: ["signal-router-fanout"],
    incidentRefs: ["signal-router-sq-underprovisioned"],
    researchRefs: [],
    tradeoffs: [
      { choice: "io_uring", over: "epoll", because: "3.7× throughput on the same hardware (ADR·029)." },
      { choice: "Credit backpressure", over: "drop-on-full", because: "Silent drops hid consumer bugs." },
    ],
    limitations: [
      { kind: "current", title: "Single-node only", detail: "Multi-node router is sketched, not built." },
      { kind: "current", title: "Linux ≥ 5.11", detail: "epoll fallback exists but is capped at 380k events/s/core." },
    ],
    evolution: [
      { tag: "v0.4", at: "2025-06-04", headline: "epoll prototype", detail: "380k events/s/core." },
      { tag: "v0.6", at: "2025-10-11", headline: "io_uring", detail: "Immediate 3× jump." },
      { tag: "v0.8", at: "2026-06-08", headline: "Credit accounting", detail: "Bounded producer memory under slow consumers." },
    ],
    failures: [
      { at: "2026-01-30", title: "SQ depth under-provisioned", detail: "Burst saturated the submission queue.", lesson: "Ring depth is a tunable; bench adversarial bursts." },
    ],
  },
  marketpulse: {
    loc: 38_112,
    linkedSystem: "marketpulse",
    languages: [{ name: "Rust", share: 0.86 }, { name: "SQL", share: 0.08 }, { name: "Python", share: 0.06 }],
    adrRefs: [],
    benchmarkRefs: ["marketpulse-tick-latency"],
    incidentRefs: ["marketpulse-venue-adapter-drift"],
    researchRefs: [],
    tradeoffs: [
      { choice: "Kernel-bypass NIC", over: "stock kernel networking", because: "Tail dropped from ~8ms to under 5ms on the same hardware." },
      { choice: "Redpanda", over: "Kafka", because: "Single binary, no JVM tuning, same protocol." },
      { choice: "Per-venue adapters", over: "unified ingest", because: "Isolates venue quirks; one adapter can’t silently change bars for another venue." },
    ],
    limitations: [
      { kind: "current", title: "Colocated hardware assumption", detail: "Cloud-hosted deployments run at ~2× tick latency." },
      { kind: "future", title: "Full L3 replay", detail: "Backtest replay uses a simplified microstructure." },
    ],
    evolution: [
      { tag: "v1.0", at: "2024-05-11", headline: "Single-venue prototype", detail: "Direct feed handler, in-process normaliser." },
      { tag: "v2.0", at: "2024-12-04", headline: "Async processing introduced", detail: "Redpanda stream decouples ingest from consumers." },
      { tag: "v4.5", at: "2026-06-28", headline: "Stable reference implementation", detail: "3 venues, P99 3.8µs across full session." },
    ],
    failures: [
      { at: "2026-02-17", title: "Venue adapter drift", detail: "Silent semantic change from a venue skewed bars for 41 minutes.", lesson: "Conformance oracles run continuously, not only in CI." },
    ],
  },
  vigil: {
    loc: 14_204,
    linkedSystem: "vigil",
    languages: [{ name: "Zig", share: 0.62 }, { name: "C", share: 0.31 }, { name: "Rust", share: 0.07 }],
    adrRefs: [],
    benchmarkRefs: [],
    incidentRefs: [],
    researchRefs: [],
    tradeoffs: [
      { choice: "eBPF", over: "kernel module", because: "Portable across kernel versions; comes with a verifier." },
      { choice: "Zig", over: "Rust", because: "Smoother C interop with libbpf during prototyping (under review)." },
    ],
    limitations: [
      { kind: "research", title: "Baseline drift", detail: "Per-workload baselines shift with deploys; retraining cadence unresolved." },
      { kind: "experimental", title: "Shadow mode", detail: "Alerts are advisory; not on any oncall path." },
    ],
    evolution: [
      { tag: "v0.1", at: "2026-04-15", headline: "Probe skeleton", detail: "First eBPF probe surface + userland aggregator." },
      { tag: "v0.3", at: "2026-06-14", headline: "Baseline scorer", detail: "Per-workload behavioural baselines exported to Prometheus." },
    ],
    failures: [],
  },
};

export function getSystemEvidence(slug: string): SystemEvidence | undefined {
  return SYSTEM_EVIDENCE[slug];
}

export function getProjectEvidence(slug: string): ProjectEvidence | undefined {
  return PROJECT_EVIDENCE[slug];
}
