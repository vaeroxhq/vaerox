export type ResearchStatus = "Published" | "Preprint" | "In Review" | "Working Draft";
export type ResearchCategory =
  | "Distributed Inference"
  | "Quantitative Evaluation"
  | "Observability"
  | "Benchmarking"
  | "Systems Design";

export type ResearchEntry = {
  slug: string;
  title: string;
  category: ResearchCategory;
  readingMinutes: number;
  published: string; // ISO
  status: ResearchStatus;
  abstract: string;
  tags: string[];
  authors: string[];
};

export const RESEARCH: ResearchEntry[] = [
  {
    slug: "routing-collapse-sparse-moe",
    title: "Routing Collapse in Sparse MoE Serving",
    category: "Distributed Inference",
    readingMinutes: 14,
    published: "2026-06-20",
    status: "Preprint",
    abstract:
      "We characterize a class of degenerate router states in production mixture-of-experts serving where per-expert utilization collapses under bursty, tenant-skewed traffic. A lightweight entropy floor restores balance without retraining.",
    tags: ["MoE", "Serving", "Routing", "Load Balancing"],
    authors: ["Maintainer"],
  },
  {
    slug: "cardinality-budgets-fanout",
    title: "Cardinality Budgets Under Fan-out",
    category: "Observability",
    readingMinutes: 9,
    published: "2026-06-27",
    status: "Published",
    abstract:
      "A control-theoretic treatment of label cardinality growth in trace-first pipelines. We derive an admission policy that bounds write amplification while retaining anomalous spans with high probability.",
    tags: ["Tracing", "Sampling", "Storage"],
    authors: ["Maintainer"],
  },
  {
    slug: "deterministic-agent-replay",
    title: "Deterministic Replay for Agentic Evaluation",
    category: "Quantitative Evaluation",
    readingMinutes: 17,
    published: "2026-06-06",
    status: "Preprint",
    abstract:
      "Agentic pipelines resist reproducibility due to non-deterministic tools and time. We describe a replay substrate that captures tool boundaries and clock reads, enabling bit-exact re-execution across model revisions.",
    tags: ["Agents", "Evaluation", "Reproducibility"],
    authors: ["Maintainer"],
  },
  {
    slug: "workload-classes-h100",
    title: "A Workload Taxonomy for H100 Inference",
    category: "Benchmarking",
    readingMinutes: 11,
    published: "2026-05-22",
    status: "Published",
    abstract:
      "We propose a compact taxonomy of inference workloads on H100-class accelerators, calibrated against arithmetic intensity and KV-cache pressure, and publish reference benchmarks for each class.",
    tags: ["Benchmarks", "GPU", "Inference"],
    authors: ["Maintainer"],
  },
  {
    slug: "leaderless-metadata",
    title: "Leaderless Metadata Under Partial Partitions",
    category: "Systems Design",
    readingMinutes: 21,
    published: "2026-05-08",
    status: "Working Draft",
    abstract:
      "A design study of a leaderless metadata plane targeting geo-distributed deployments. We contrast latency and staleness envelopes against Raft-based baselines under partial and asymmetric partitions.",
    tags: ["Consensus", "Metadata", "Geo-distribution"],
    authors: ["Maintainer"],
  },
  {
    slug: "tail-sampling-tradeoffs",
    title: "Tail-based Sampling: Retention vs. Recall",
    category: "Observability",
    readingMinutes: 8,
    published: "2026-04-30",
    status: "Published",
    abstract:
      "We quantify the retention/recall trade-off in tail-based trace sampling under production traffic and propose a two-stage sampler that decouples anomaly detection from long-tail retention.",
    tags: ["Sampling", "Tracing"],
    authors: ["Maintainer"],
  },
  {
    slug: "structured-batching",
    title: "Structured Batching for Multi-tenant LLMs",
    category: "Distributed Inference",
    readingMinutes: 12,
    published: "2026-04-14",
    status: "Published",
    abstract:
      "Structured batching groups requests by decode phase and tenant KV footprint. We report throughput gains of 1.6–2.3× on mixed-tenant traffic without SLO regression.",
    tags: ["Batching", "LLM", "Serving"],
    authors: ["Maintainer"],
  },
  {
    slug: "eval-suite-drift",
    title: "Drift in Long-lived Evaluation Suites",
    category: "Quantitative Evaluation",
    readingMinutes: 10,
    published: "2026-03-27",
    status: "In Review",
    abstract:
      "Evaluation suites drift as models specialize to their contours. We introduce a drift metric and propose rotation policies that preserve comparability across model generations.",
    tags: ["Evaluation", "Drift", "Methodology"],
    authors: ["Maintainer"],
  },
];
