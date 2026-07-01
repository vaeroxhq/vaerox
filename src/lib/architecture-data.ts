/**
 * Architecture Decision Records — the canonical spine of the
 * engineering architecture. Every ADR has enough metadata to feel
 * like it lives inside a real repository.
 */

export type AdrStatus = "Accepted" | "Proposed" | "Superseded" | "Deprecated" | "Draft";
export type ReviewStatus = "Signed off" | "In review" | "Awaiting owner" | "Archived";

export type Adr = {
  number: string;             // "014"
  slug: string;               // "grpc-framing"
  title: string;
  status: AdrStatus;
  decisionDate: string;       // ISO
  owner: string;
  team: string;
  systems: string[];          // affected systems (slugs / names)
  review: ReviewStatus;
  supersedes?: string;
  supersededBy?: string;
  context: string;
  decision: string;
  consequences: string[];
  alternatives: { name: string; rejectedBecause: string }[];
  references: { label: string; href: string }[];
};

export const ADRS: Adr[] = [
  {
    number: "001",
    slug: "monorepo-boundary",
    title: "Monorepo boundary and workspace layout",
    status: "Accepted",
    decisionDate: "2023-11-04",
    owner: "Maintainer",
    team: "Platform",
    systems: ["Atlas Control Plane"],
    review: "Signed off",
    context:
      "Historic split between platform and inference repos caused duplicated release tooling and drift in CI conventions. A single boundary was needed before onboarding external contributors.",
    decision:
      "Consolidate all production systems into a single monorepo with workspace-scoped packages. Release trains remain per-system; tooling is shared.",
    consequences: [
      "One CI graph; per-package cache keys.",
      "Cross-cutting refactors become atomic.",
      "Repository size grows ~4x; requires sparse-checkout guidance.",
    ],
    alternatives: [
      { name: "Multi-repo with a meta tool", rejectedBecause: "Adds a coordination layer without solving drift." },
      { name: "Repo per system + shared libs package", rejectedBecause: "Publish latency for internal libraries dominated." },
    ],
    references: [
      { label: "RFC · workspace boundaries", href: "#" },
      { label: "Post: monorepo migration", href: "#" },
    ],
  },
  {
    number: "014",
    slug: "grpc-framing",
    title: "gRPC framing for Helix inference RPCs",
    status: "Accepted",
    decisionDate: "2025-04-19",
    owner: "Maintainer",
    team: "Inference",
    systems: ["Helix Inference", "Signal Router"],
    review: "Signed off",
    context:
      "Request/response framing over HTTP/2 was inconsistent between the router and the model server. Streaming completions occasionally stalled behind head-of-line blocking under bursty tenants.",
    decision:
      "Adopt gRPC bidirectional streams with per-request logical framing and independent flow control per model shard. Prefer length-delimited frames over reused Protobuf envelopes.",
    consequences: [
      "P95 first-token latency reduced from 210ms → 118ms on H100 nodes.",
      "Client SDKs must implement backpressure explicitly.",
      "Legacy HTTP/1.1 endpoints deprecated by 2025-Q4.",
    ],
    alternatives: [
      { name: "Raw HTTP/2 with server-sent events", rejectedBecause: "No standard cancellation semantics per stream." },
      { name: "WebSockets", rejectedBecause: "No mature server-side routing per shard." },
    ],
    references: [
      { label: "Benchmark · framing overhead", href: "#" },
      { label: "Design note · flow control", href: "#" },
    ],
  },
  {
    number: "018",
    slug: "trace-sampling",
    title: "Tail-latency-aware trace sampling in Orbit",
    status: "Accepted",
    decisionDate: "2025-08-02",
    owner: "Maintainer",
    team: "Observability",
    systems: ["Orbit Observability"],
    review: "Signed off",
    context:
      "Head-sampling missed the traces that mattered most for capacity planning: the long tail. Storage cost prohibited universal retention.",
    decision:
      "Deploy a two-stage sampler: probabilistic head sampling at 1% + tail sampler that retains any trace whose root span exceeds the per-service SLO by 2x.",
    consequences: [
      "Storage growth flat vs. prior quarter despite 3x traffic.",
      "Every SLO breach is investigable with full trace context.",
      "Sampler introduces ~4ms of buffered latency at the collector.",
    ],
    alternatives: [
      { name: "Universal retention with tiered storage", rejectedBecause: "Cost grew super-linearly with cardinality." },
      { name: "Reservoir sampling only", rejectedBecause: "Under-represented the tail we care about." },
    ],
    references: [{ label: "Post: Cardinality Budgets", href: "/journal#cardinality-budgets" }],
  },
  {
    number: "022",
    slug: "region-failover",
    title: "Multi-region failover model for Atlas metadata",
    status: "Accepted",
    decisionDate: "2025-10-11",
    owner: "Maintainer",
    team: "Platform",
    systems: ["Atlas Control Plane"],
    review: "Signed off",
    context:
      "Following the eu-west-2 outage, single-region metadata masters became the primary risk to platform availability. Recovery required manual promotion and took 47 minutes.",
    decision:
      "Move Atlas metadata to a leaderless replication model with quorum reads scoped to the caller region; writes require majority across three regions.",
    consequences: [
      "Cross-region write latency: +34ms P95.",
      "RTO: 47 min → 12 sec under automated fencing.",
      "Requires ADR·027 (consensus model) to land before GA.",
    ],
    alternatives: [
      { name: "Warm standby with async replication", rejectedBecause: "RPO of ~5s was unacceptable for tenant grants." },
      { name: "Global Spanner-style ordering", rejectedBecause: "Latency budget for interactive control-plane calls." },
    ],
    references: [{ label: "Post-mortem · eu-west-2", href: "/journal#region-failover-postmortem" }],
  },
  {
    number: "027",
    slug: "consensus-model",
    title: "Leaderless consensus for platform metadata",
    status: "Proposed",
    decisionDate: "2026-02-28",
    owner: "Maintainer",
    team: "Distributed Systems",
    systems: ["Parity Consensus", "Atlas Control Plane"],
    review: "In review",
    context:
      "ADR·022 requires a consensus substrate that tolerates asymmetric partitions and slow followers without leader thrash. Existing Raft implementations exhibited pathological leader churn under our workload.",
    decision:
      "Adopt Parity, an in-house leaderless protocol with epoch-based conflict resolution. Model checked in TLA+; property tests run in Ray simulation.",
    consequences: [
      "Removes a global leader; every replica accepts writes for its scope.",
      "Convergence latency bounded by 2·rtt under normal conditions.",
      "Operational complexity: new mental model for on-call.",
    ],
    alternatives: [
      { name: "Raft with pre-vote", rejectedBecause: "Did not eliminate thrash under measured workload." },
      { name: "Paxos family (EPaxos)", rejectedBecause: "Conflict rate too high on our access patterns." },
    ],
    references: [{ label: "TLA+ model", href: "#" }, { label: "Simulation report", href: "#" }],
  },
  {
    number: "029",
    slug: "io-uring-router",
    title: "io_uring adoption for Signal Router",
    status: "Accepted",
    decisionDate: "2026-01-14",
    owner: "Maintainer",
    team: "Edge Infra",
    systems: ["Signal Router"],
    review: "Signed off",
    context:
      "Router was epoll-bound at ~380k events/sec/core. Fan-out to per-tenant queues added a syscall per hop.",
    decision:
      "Move data plane to io_uring with submission-queue polling; retain epoll fallback under kernels < 5.11.",
    consequences: [
      "Throughput: 380k → 1.4M events/sec/core on Linux 6.6.",
      "Backpressure surface shifts to SQ depth; requires new tuning guidance.",
      "Kernel matrix in CI expanded from 3 to 5 versions.",
    ],
    alternatives: [
      { name: "DPDK userspace stack", rejectedBecause: "Ops burden and NIC coupling outweighed the gain." },
    ],
    references: [{ label: "Post: io_uring backpressure", href: "/journal#signal-router-io-uring" }],
  },
  {
    number: "031",
    slug: "eval-harness",
    title: "Reproducible evaluation harness",
    status: "Proposed",
    decisionDate: "2026-04-02",
    owner: "Maintainer",
    team: "Research Infra",
    systems: ["Meridian Eval"],
    review: "Awaiting owner",
    context:
      "Evaluation runs were reproducible in principle and flaky in practice. Two teams shipped incompatible harnesses.",
    decision:
      "Standardise on Meridian: DuckDB result store, Ray executor, deterministic seed/manifest pair per run.",
    consequences: [
      "One canonical results schema across research and product.",
      "Historic runs must be re-ingested; migration script in flight.",
      "Third-party benchmarks require adapter modules.",
    ],
    alternatives: [
      { name: "Extend existing lm-eval fork", rejectedBecause: "Coupling to a single provider's harness cadence." },
    ],
    references: [{ label: "ADR·031 · full text", href: "#" }],
  },
  {
    number: "007",
    slug: "url-taxonomy",
    title: "URL taxonomy and route stability",
    status: "Superseded",
    decisionDate: "2024-06-08",
    owner: "Maintainer",
    team: "Platform",
    systems: ["vaerox.dev"],
    review: "Archived",
    supersededBy: "020",
    context: "Early URL structure conflated systems and projects.",
    decision: "Separate /systems from /projects; /research and /adr become first-class.",
    consequences: ["Stable URLs for external references.", "Redirect table required for legacy paths."],
    alternatives: [],
    references: [],
  },
  {
    number: "020",
    slug: "url-taxonomy-v2",
    title: "URL taxonomy v2 · handbook layout",
    status: "Accepted",
    decisionDate: "2025-09-30",
    owner: "Maintainer",
    team: "Platform",
    systems: ["vaerox.dev"],
    review: "Signed off",
    supersedes: "007",
    context: "Handbook, journal, and graph surfaces needed first-class routes.",
    decision: "Adopt /architecture, /engineering, /journal, /graph as canonical sections.",
    consequences: ["URLs remain stable across content model evolution."],
    alternatives: [{ name: "Flat /docs/*", rejectedBecause: "Precludes per-section metadata." }],
    references: [],
  },
];

/* Diagram catalog — the architecture page renders these as
 * hairline "diagram cells" pointing at their canonical location.
 * Text labels only; no raster images. */

export type DiagramKind =
  | "System"
  | "Sequence"
  | "Deployment"
  | "Data flow"
  | "Network"
  | "Schema"
  | "API"
  | "Dependency";

export type Diagram = {
  slug: string;
  kind: DiagramKind;
  title: string;
  summary: string;
  systems: string[];
  updated: string;
  nodes: number; // node count in the underlying graph
};

export const DIAGRAMS: Diagram[] = [
  { slug: "helix-serving-topology",  kind: "System",     title: "Helix serving topology",           summary: "Router → shard leader → expert workers, per-tenant isolation domains.", systems: ["Helix Inference"], updated: "2026-06-22", nodes: 24 },
  { slug: "atlas-control-plane",     kind: "System",     title: "Atlas control plane",              summary: "Reconciliation loop across region controllers with quorum metadata.",     systems: ["Atlas Control Plane"], updated: "2026-06-10", nodes: 31 },
  { slug: "inference-request-seq",   kind: "Sequence",   title: "Inference request lifecycle",      summary: "Client → gateway → router → shard → expert → streamed response.",       systems: ["Helix Inference", "Signal Router"], updated: "2026-05-28", nodes: 14 },
  { slug: "region-failover-seq",     kind: "Sequence",   title: "Region failover promotion",        summary: "Detector → quorum vote → fence → promote → drain replication.",         systems: ["Atlas Control Plane"], updated: "2026-04-11", nodes: 11 },
  { slug: "prod-deployment",         kind: "Deployment", title: "Production deployment topology",   summary: "3 regions · 12 zones · 234 nodes · pinned model shards.",               systems: ["Helix Inference", "Atlas Control Plane"], updated: "2026-06-18", nodes: 42 },
  { slug: "telemetry-dataflow",      kind: "Data flow",  title: "Telemetry pipeline",               summary: "OTel collector → tail sampler → ClickHouse → query fanout.",             systems: ["Orbit Observability"], updated: "2026-05-05", nodes: 18 },
  { slug: "eval-dataflow",           kind: "Data flow",  title: "Evaluation harness data flow",     summary: "Manifest → Ray executor → DuckDB store → comparison report.",           systems: ["Meridian Eval"], updated: "2026-04-02", nodes: 12 },
  { slug: "network-topology",        kind: "Network",    title: "Inter-region network topology",    summary: "Dual-plane fabric with per-tenant egress classes.",                     systems: ["Atlas Control Plane"], updated: "2026-03-30", nodes: 20 },
  { slug: "atlas-schema",            kind: "Schema",     title: "Atlas metadata schema",            summary: "tenants · grants · workloads · placements · revisions.",                systems: ["Atlas Control Plane"], updated: "2026-06-01", nodes:  9 },
  { slug: "orbit-schema",            kind: "Schema",     title: "Orbit trace store schema",         summary: "traces · spans · resource · service_meta.",                             systems: ["Orbit Observability"], updated: "2026-05-14", nodes:  7 },
  { slug: "inference-api",           kind: "API",        title: "Inference API surface",            summary: "5 RPCs · streaming completions · batch scoring.",                       systems: ["Helix Inference"], updated: "2026-06-20", nodes:  8 },
  { slug: "atlas-api",               kind: "API",        title: "Atlas control API",                summary: "22 RPCs across tenants, workloads, placements, and revisions.",         systems: ["Atlas Control Plane"], updated: "2026-06-05", nodes: 22 },
  { slug: "service-deps",            kind: "Dependency", title: "Service dependency graph",         summary: "Cross-system fanout with SLO propagation weights.",                     systems: ["Helix Inference", "Atlas Control Plane", "Orbit Observability"], updated: "2026-06-24", nodes: 28 },
];
