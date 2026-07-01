/**
 * Engineering Validation — architecture validation, prototype evaluation,
 * and reproducible measurements collected while building the systems inside
 * the VÆRØX Engineering Lab.
 *
 * Every entry is either measured on a defined workload, a stated design
 * target, or explicitly marked "Not yet measured". Nothing on this file
 * implies operating production infrastructure.
 *
 * The historical `Benchmark` / `BenchmarkRun` names are preserved so the
 * rest of the site (graph, timeline, related rail) continues to link
 * correctly — the semantics have shifted from "standing production
 * measurement" to "engineering validation record".
 */

export type ValidationStatus =
  | "Target"                // stated design goal, nothing measured yet
  | "Prototype measured"    // measurement exists but on a prototype, not a production workload
  | "In progress"           // methodology drafted, measurement partial
  | "Not yet measured";     // deliberately empty — honest gap

export type ValidationPhase =
  | "Concept"
  | "Research"
  | "Architecture"
  | "Prototype"
  | "Reference implementation"
  | "Experimental"
  | "Completed";

// Kept for backwards compatibility with consumers that iterate `runs`.
// A "run" here is a prototype checkpoint, not a production benchmark run.
export type BenchmarkRun = {
  date: string;
  value: number;
  build: string;   // e.g. "helix@proto-04"
  note?: string;
};

export type Benchmark = {
  slug: string;
  code: string;                       // VAL-01
  title: string;
  system: string;                     // system slug
  focus: string;                      // one-line: what's being validated
  phase: ValidationPhase;
  status: ValidationStatus;
  goal: string;                       // stated design target, in words
  updated: string;                    // ISO
  methodology: string[];              // paragraphs — how it would/does get measured
  findings: string[];                 // honest observations from work done so far
  runs: BenchmarkRun[];               // prototype checkpoints; may be empty
  relatedSystems: string[];
  relatedAdrs: string[];
  relatedIncidents: string[];
};

export const BENCHMARKS: Benchmark[] = [
  {
    slug: "helix-first-token",
    code: "VAL-01",
    title: "Helix · first-token latency",
    system: "helix",
    focus: "Time from request admit to first streamed token on a single-GPU prototype.",
    phase: "Prototype",
    status: "Prototype measured",
    goal: "Sub-150 ms first-token on a single H100 with a 2 K prompt at concurrency 8.",
    updated: "2026-06-28",
    methodology: [
      "Prototype runs on a single H100 workstation — not a production fleet.",
      "Closed-loop generator holds concurrency at 8, warms up for 60 s, samples for 5 min.",
      "First-token latency is measured from HTTP admit to the first streamed SSE token.",
    ],
    findings: [
      "Structured batching keeps first-token latency stable up to concurrency 8; above that the prototype scheduler starves the smallest requests.",
      "Framing overhead was the dominant cost until the gRPC path was replaced with a length-prefixed binary frame.",
    ],
    runs: [
      { date: "2026-04-14", value: 380, build: "helix@proto-02", note: "Naïve batching baseline." },
      { date: "2026-05-21", value: 210, build: "helix@proto-03", note: "Structured batching." },
      { date: "2026-06-28", value: 172, build: "helix@proto-04", note: "Framing rework." },
    ],
    relatedSystems: ["helix"],
    relatedAdrs: ["grpc-framing"],
    relatedIncidents: [],
  },
  {
    slug: "atlas-control-plane",
    code: "VAL-02",
    title: "Atlas · control-plane reconciliation",
    system: "atlas",
    focus: "Time from spec change to placement decision on a single-cluster prototype.",
    phase: "Architecture",
    status: "In progress",
    goal: "Reconcile a 10 %-workload spec change in under 2 s on a single-cluster reference deployment.",
    updated: "2026-06-25",
    methodology: [
      "Reference deployment is a single kind cluster with a synthetic workload set of 200 pods.",
      "Spec change applied at t=0; timer stops when every affected placement reports ready.",
      "Multi-region behaviour is out of scope for this validation — see roadmap.",
    ],
    findings: [
      "Reconciliation is dominated by watch-cache warm-up on cold start; steady-state is well within target.",
      "The retry controller flaps under contended list-watch — captured as a known limitation on the Atlas page.",
    ],
    runs: [],
    relatedSystems: ["atlas"],
    relatedAdrs: ["region-failover", "consensus-model"],
    relatedIncidents: [],
  },
  {
    slug: "orbit-ingest-throughput",
    code: "VAL-03",
    title: "Orbit · ingest throughput",
    system: "orbit",
    focus: "Sustained span ingest rate per collector on commodity hardware.",
    phase: "Prototype",
    status: "Prototype measured",
    goal: "Sustain 100 k spans/s on a single 8-core collector with buffer high-watermark under 60 %.",
    updated: "2026-06-19",
    methodology: [
      "Single collector on an 8-core workstation, dedicated NIC, synthetic OTel span mix at 3.2 KB average.",
      "Open-loop generator; reported value is the highest sustained rate before buffer high-watermark exceeds 60 %.",
    ],
    findings: [
      "Batching at the wire boundary matters more than the encoding path; JSON vs protobuf is <5 % at this scale.",
      "Sampled cardinality control has to be a first-class ingest concern — bolted on later it always leaks.",
    ],
    runs: [
      { date: "2026-05-10", value: 72_000, build: "orbit@proto-01" },
      { date: "2026-06-19", value: 118_000, build: "orbit@proto-02", note: "Sustained above target on prototype hardware." },
    ],
    relatedSystems: ["orbit"],
    relatedAdrs: ["trace-sampling"],
    relatedIncidents: [],
  },
  {
    slug: "orbit-query",
    code: "VAL-04",
    title: "Orbit · trace query latency",
    system: "orbit",
    focus: "Interactive query latency against a local ClickHouse instance.",
    phase: "Architecture",
    status: "Not yet measured",
    goal: "Sub-500 ms P95 for typical analyst queries on a 24 h prototype dataset.",
    updated: "2026-06-14",
    methodology: [
      "Planned harness: replay a captured query mix at 20 QPS against a single-node ClickHouse; measure P95 per query class.",
      "Dataset generation script exists; harness is not yet wired end-to-end.",
    ],
    findings: [
      "Not yet measured — this record exists so the design target is on the record while the harness is being built.",
    ],
    runs: [],
    relatedSystems: ["orbit"],
    relatedAdrs: ["trace-sampling"],
    relatedIncidents: [],
  },
  {
    slug: "signal-router-fanout",
    code: "VAL-05",
    title: "Signal Router · fan-out throughput",
    system: "signal-router",
    focus: "Per-core event fan-out rate on an io_uring prototype.",
    phase: "Prototype",
    status: "Prototype measured",
    goal: "Design target: ≥ 500 k events/s per core at 1 KB events, 32 subscribers.",
    updated: "2026-06-08",
    methodology: [
      "Single-socket Linux 6.6 workstation; one publisher, 32 subscribers, 1 KB events.",
      "Sustained publish rate; measurement window 10 minutes; per-core throughput reported at 90 % CPU utilisation.",
    ],
    findings: [
      "The move from epoll to io_uring was the largest single step; further gains have come from batching submissions rather than any protocol change.",
      "Submission-queue depth was under-provisioned on the first prototype — captured as an experimental note on the Signal Router page.",
    ],
    runs: [
      { date: "2025-10-11", value: 620_000, build: "signal@proto-01 (epoll)" },
      { date: "2026-06-08", value: 940_000, build: "signal@proto-02 (io_uring)" },
    ],
    relatedSystems: ["signal-router"],
    relatedAdrs: ["io-uring-router"],
    relatedIncidents: [],
  },
  {
    slug: "meridian-suite-runtime",
    code: "VAL-06",
    title: "Meridian · evaluation suite runtime",
    system: "meridian-eval",
    focus: "End-to-end wall time of the canonical evaluation suite on a laptop-scale Ray cluster.",
    phase: "Research",
    status: "In progress",
    goal: "Complete the canonical evaluation suite in under 60 minutes on a 4-worker Ray cluster.",
    updated: "2026-06-11",
    methodology: [
      "Cold-cache run; every task from scratch. Ray cluster is 4 local workers, DuckDB store on local disk.",
      "Reported as wall time from suite kickoff to full results ingestion.",
    ],
    findings: [
      "The suite is currently retrieval-bound; the agentic tasks are cheap once the retrieval cache is warm.",
      "Cold-cache runs are dominated by dataset shuffling, not model calls.",
    ],
    runs: [
      { date: "2026-04-14", value: 9_000_000, build: "meridian@proto-01", note: "≈ 2 h 30 m." },
      { date: "2026-06-11", value: 4_500_000, build: "meridian@proto-02", note: "≈ 75 m." },
    ],
    relatedSystems: ["meridian-eval"],
    relatedAdrs: ["eval-harness"],
    relatedIncidents: [],
  },
  {
    slug: "marketpulse-tick-latency",
    code: "VAL-07",
    title: "MarketPulse · venue-to-consumer latency",
    system: "marketpulse",
    focus: "End-to-end latency from venue tap to consumer entrypoint on a replay harness.",
    phase: "Architecture",
    status: "Not yet measured",
    goal: "Design target: sub-5 ms P99 on a colocated deployment; not applicable to the current replay harness.",
    updated: "2026-06-28",
    methodology: [
      "Planned methodology: PTP-disciplined wall clock; timestamped at venue tap and at consumer entrypoint; P99 across full session; per-venue and aggregated.",
      "The current work is on the replay harness — no colocated hardware is in scope for this lab.",
    ],
    findings: [
      "Not yet measured. The record exists to make the design target explicit and to link to the venue-adapter dataset engineering.",
    ],
    runs: [],
    relatedSystems: ["marketpulse"],
    relatedAdrs: [],
    relatedIncidents: [],
  },
];

/**
 * Formats a checkpoint value from a validation record's run history.
 * These are prototype numbers, not production metrics — the calling
 * component is responsible for framing them as such.
 */
export function benchmarkFormatValue(_b: Benchmark, v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}k`;
  return v.toString();
}
