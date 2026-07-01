/**
 * Benchmarks — measured, dated, methodological. Every entry is a
 * standing benchmark with a defined workload, hardware, and history.
 * Numbers are not aspirational.
 */

export type BenchmarkUnit = "ms" | "µs" | "events/s" | "req/s" | "MB/s" | "%";

export type BenchmarkRun = {
  date: string;      // ISO
  value: number;     // primary metric value
  build: string;     // e.g. "helix@1.9.4"
  note?: string;
};

export type Benchmark = {
  slug: string;
  code: string;                // BNCH-01
  title: string;
  metric: string;              // e.g. "first-token latency P95"
  unit: BenchmarkUnit;
  lowerIsBetter: boolean;
  system: string;              // system slug
  owner: string;
  updated: string;             // ISO
  cadence: "Nightly" | "Weekly" | "Per release" | "Quarterly";
  hardware: string;
  dataset: string;
  methodology: string[];       // paragraphs
  budget?: number;             // SLO/budget line
  runs: BenchmarkRun[];        // chronological
  relatedSystems: string[];
  relatedAdrs: string[];
  relatedIncidents: string[];  // incident slugs
};

export const BENCHMARKS: Benchmark[] = [
  {
    slug: "helix-first-token",
    code: "BNCH-01",
    title: "Helix · first-token latency (P95)",
    metric: "first-token latency, P95",
    unit: "ms",
    lowerIsBetter: true,
    system: "helix",
    owner: "Inference",
    updated: "2026-06-28",
    cadence: "Nightly",
    hardware: "8× H100 80GB, NVLink switch, dedicated pool. Load generator on separate rack.",
    dataset: "Mixed-tenant enterprise workload · 512 concurrent · 60/40 short/long prompt.",
    methodology: [
      "Closed-loop generator holds concurrency at 512. Warmup 5 minutes; measurement window 30 minutes.",
      "First-token latency measured from request admit at gateway to first output token at streaming boundary.",
      "P95 aggregated across 10-minute windows; median of window P95s reported.",
    ],
    budget: 150,
    runs: [
      { date: "2025-Q3", value: 210, build: "helix@1.7.1", note: "Pre-gRPC framing rework." },
      { date: "2025-11-14", value: 152, build: "helix@1.8.2", note: "Structured batching landed." },
      { date: "2026-01-30", value: 128, build: "helix@1.9.0" },
      { date: "2026-03-11", value: 122, build: "helix@1.9.2" },
      { date: "2026-05-21", value: 411, build: "helix@1.9.4", note: "Driver 570.86 regression (see INC-2026-041)." },
      { date: "2026-05-22", value: 121, build: "helix@1.9.4", note: "Post-rollback." },
      { date: "2026-06-15", value: 118, build: "helix@1.9.7" },
      { date: "2026-06-28", value: 116, build: "helix@1.9.9" },
    ],
    relatedSystems: ["helix"],
    relatedAdrs: ["grpc-framing"],
    relatedIncidents: ["helix-p99-driver-regression", "helix-kv-cache-thrash"],
  },
  {
    slug: "helix-streaming-throughput",
    code: "BNCH-02",
    title: "Helix · streaming throughput (tokens/s per H100)",
    metric: "tokens/s per H100",
    unit: "req/s",
    lowerIsBetter: false,
    system: "helix",
    owner: "Inference",
    updated: "2026-06-24",
    cadence: "Per release",
    hardware: "1× H100 80GB. Isolated pool. NCCL disabled — single-device measurement.",
    dataset: "Long-context (16K prompt, 2K decode) · 1 tenant · continuous stream.",
    methodology: [
      "Open-loop generator; 5 min warmup, 20 min sample.",
      "Tokens/s computed as decoded tokens ÷ wall time. Reported as median of five runs.",
    ],
    runs: [
      { date: "2025-08-01", value: 88,  build: "helix@1.6.0" },
      { date: "2025-12-10", value: 132, build: "helix@1.8.0" },
      { date: "2026-03-11", value: 156, build: "helix@1.9.2" },
      { date: "2026-06-24", value: 171, build: "helix@1.9.9" },
    ],
    relatedSystems: ["helix"],
    relatedAdrs: ["grpc-framing"],
    relatedIncidents: ["helix-p99-driver-regression"],
  },
  {
    slug: "atlas-control-plane-p95",
    code: "BNCH-03",
    title: "Atlas · control-plane P95 latency",
    metric: "control-plane RPC P95",
    unit: "ms",
    lowerIsBetter: true,
    system: "atlas",
    owner: "Platform",
    updated: "2026-06-25",
    cadence: "Per release",
    hardware: "3-region deployment, 6 metadata nodes/region, 32-core control nodes.",
    dataset: "Synthetic control-plane trace, 40% reads / 30% writes / 30% list.",
    methodology: [
      "Closed-loop; 200 clients per region.",
      "P95 across all RPC verbs; per-verb P95 tracked separately in dashboards.",
    ],
    budget: 80,
    runs: [
      { date: "2025-05-02", value: 91, build: "atlas@3.1"  },
      { date: "2025-10-14", value: 72, build: "atlas@3.4"  },
      { date: "2026-02-14", value: 84, build: "atlas@3.6",  note: "Regressed after eu-west-2 remediation." },
      { date: "2026-04-19", value: 61, build: "atlas@3.7" },
      { date: "2026-06-25", value: 42, build: "atlas@3.8"  },
    ],
    relatedSystems: ["atlas"],
    relatedAdrs: ["region-failover", "consensus-model"],
    relatedIncidents: ["eu-west-2-region-failover", "atlas-scheduler-cascading-retry", "atlas-quota-controller-flap"],
  },
  {
    slug: "orbit-ingest-throughput",
    code: "BNCH-04",
    title: "Orbit · ingest throughput (spans/s per collector)",
    metric: "spans/s per collector",
    unit: "events/s",
    lowerIsBetter: false,
    system: "orbit",
    owner: "Observability",
    updated: "2026-06-19",
    cadence: "Weekly",
    hardware: "16-core collector node · 64 GB RAM · dedicated NIC.",
    dataset: "Synthetic OTel span mix modeled on production; 3.2 KB average span.",
    methodology: [
      "Open-loop; sustained rate held for 15 minutes.",
      "Reported value is the highest sustained rate at which buffer high-watermark remained ≤ 60%.",
    ],
    runs: [
      { date: "2025-06-10", value:  240_000, build: "orbit@2.0" },
      { date: "2025-11-01", value:  310_000, build: "orbit@2.1" },
      { date: "2025-11-19", value:  278_000, build: "orbit@2.1", note: "During INC-2025-093 buffer overrun." },
      { date: "2026-02-14", value:  360_000, build: "orbit@2.2" },
      { date: "2026-06-19", value:  412_000, build: "orbit@2.3" },
    ],
    relatedSystems: ["orbit"],
    relatedAdrs: ["trace-sampling"],
    relatedIncidents: ["orbit-tail-buffer-overrun"],
  },
  {
    slug: "orbit-query-p95",
    code: "BNCH-05",
    title: "Orbit · trace query P95",
    metric: "trace query P95",
    unit: "ms",
    lowerIsBetter: true,
    system: "orbit",
    owner: "Observability",
    updated: "2026-06-14",
    cadence: "Weekly",
    hardware: "3-node ClickHouse cluster, 128GB RAM per node.",
    dataset: "Point + span-search + range-query mix from analyst dashboards.",
    methodology: [
      "Query mix replayed at 40 QPS; 20-min sample.",
      "P95 across all query classes; class-level breakdown in dashboard.",
    ],
    budget: 350,
    runs: [
      { date: "2025-08-01", value: 812, build: "orbit@2.0" },
      { date: "2025-12-15", value: 402, build: "orbit@2.1" },
      { date: "2026-04-02", value: 310, build: "orbit@2.2" },
      { date: "2026-06-14", value: 268, build: "orbit@2.3" },
    ],
    relatedSystems: ["orbit"],
    relatedAdrs: ["trace-sampling"],
    relatedIncidents: [],
  },
  {
    slug: "signal-router-fanout",
    code: "BNCH-06",
    title: "Signal Router · fan-out throughput (events/s per core)",
    metric: "events/s per core",
    unit: "events/s",
    lowerIsBetter: false,
    system: "signal-router",
    owner: "Edge Infra",
    updated: "2026-06-08",
    cadence: "Per release",
    hardware: "Single-socket 6.6 kernel · 1× 64-core Sapphire Rapids · Mellanox 200G NIC.",
    dataset: "1 KB events, 32 fan-out subscribers per publisher.",
    methodology: [
      "Sustained publish rate; measurement window 10 min.",
      "Reported value is per-core throughput at 90% CPU utilization.",
    ],
    runs: [
      { date: "2025-06-04", value:    380_000, build: "signal@0.4 (epoll)" },
      { date: "2025-10-11", value:  1_120_000, build: "signal@0.6 (io_uring)" },
      { date: "2026-01-14", value:  1_320_000, build: "signal@0.7" },
      { date: "2026-06-08", value:  1_412_000, build: "signal@0.8" },
    ],
    relatedSystems: ["signal-router"],
    relatedAdrs: ["io-uring-router"],
    relatedIncidents: ["signal-router-sq-underprovisioned"],
  },
  {
    slug: "helix-cost-per-mtok",
    code: "BNCH-07",
    title: "Helix · cost per million output tokens",
    metric: "USD per 1M output tokens",
    unit: "req/s",
    lowerIsBetter: true,
    system: "helix",
    owner: "Inference",
    updated: "2026-06-01",
    cadence: "Quarterly",
    hardware: "H100 fleet economics: purchase amortization + energy + interconnect.",
    dataset: "Rolling 90-day production mix; excludes free-tier traffic.",
    methodology: [
      "Fleet cost ÷ delivered output tokens over 90 days.",
      "Excludes control-plane cost, KV cache eviction cost, and idle capacity below 60% util.",
    ],
    runs: [
      { date: "2025-Q3", value: 1.74, build: "fleet-2025q3" },
      { date: "2025-Q4", value: 1.42, build: "fleet-2025q4" },
      { date: "2026-Q1", value: 1.09, build: "fleet-2026q1" },
      { date: "2026-Q2", value: 0.91, build: "fleet-2026q2" },
    ],
    relatedSystems: ["helix"],
    relatedAdrs: ["grpc-framing"],
    relatedIncidents: [],
  },
  {
    slug: "atlas-reconcile-loop",
    code: "BNCH-08",
    title: "Atlas · reconcile loop end-to-end",
    metric: "spec → placement wall time",
    unit: "ms",
    lowerIsBetter: true,
    system: "atlas",
    owner: "Platform",
    updated: "2026-06-11",
    cadence: "Per release",
    hardware: "Reference 3-region deployment, 1200 workloads.",
    dataset: "Spec change of 10% of workloads; measured until all placements stable.",
    methodology: [
      "Spec change applied at t=0. Timer stops when 100% of placements report ready.",
      "Reported value is P95 over 20 trials.",
    ],
    runs: [
      { date: "2025-05-02", value: 4_100, build: "atlas@3.1" },
      { date: "2025-10-14", value: 2_900, build: "atlas@3.4" },
      { date: "2026-04-19", value: 1_920, build: "atlas@3.7" },
      { date: "2026-06-11", value: 1_640, build: "atlas@3.8" },
    ],
    relatedSystems: ["atlas"],
    relatedAdrs: ["region-failover"],
    relatedIncidents: [],
  },
  {
    slug: "marketpulse-tick-latency",
    code: "BNCH-09",
    title: "MarketPulse · venue-to-consumer P99",
    metric: "venue → consumer P99",
    unit: "µs",
    lowerIsBetter: true,
    system: "marketpulse",
    owner: "Market Data",
    updated: "2026-06-28",
    cadence: "Per release",
    hardware: "Colocation rack; kernel-bypass NIC; dedicated cores.",
    dataset: "Full trading session replay; 3 venues.",
    methodology: [
      "Timestamped at venue tap and at consumer entrypoint; wall clock disciplined via PTP.",
      "P99 across full session; reported per-venue and aggregated.",
    ],
    runs: [
      { date: "2025-06-10", value: 6_200, build: "mp@4.1" },
      { date: "2025-12-04", value: 4_400, build: "mp@4.3" },
      { date: "2026-06-28", value: 3_800, build: "mp@4.5" },
    ],
    relatedSystems: ["marketpulse"],
    relatedAdrs: [],
    relatedIncidents: ["marketpulse-venue-adapter-drift"],
  },
  {
    slug: "meridian-suite-runtime",
    code: "BNCH-10",
    title: "Meridian · full suite runtime",
    metric: "end-to-end suite runtime",
    unit: "ms",
    lowerIsBetter: true,
    system: "meridian-eval",
    owner: "Research Infra",
    updated: "2026-06-11",
    cadence: "Weekly",
    hardware: "Ray cluster, 128 workers, DuckDB store.",
    dataset: "Canonical benchmark suite (retrieval + agentic + long-horizon).",
    methodology: [
      "Cold-cache run; every task from scratch.",
      "Reported as wall time from suite kickoff to full results ingestion.",
    ],
    runs: [
      { date: "2026-02-01", value: 21_600_000, build: "meridian@0.2" }, // 6h
      { date: "2026-04-14", value:  9_000_000, build: "meridian@0.4" }, // 2.5h
      { date: "2026-06-11", value:  2_520_000, build: "meridian@0.6" }, // 42m
    ],
    relatedSystems: ["meridian-eval"],
    relatedAdrs: ["eval-harness"],
    relatedIncidents: [],
  },
];

export function benchmarkFormatValue(b: Benchmark, v: number): string {
  if (b.unit === "events/s" || b.unit === "req/s") {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(0)}k`;
    return v.toString();
  }
  if (b.unit === "ms" && v >= 1000) return `${(v / 1000).toFixed(2)}s`;
  if (b.unit === "µs") return `${v.toLocaleString()}µs`;
  return `${v}${b.unit === "%" ? "%" : ""}`;
}
