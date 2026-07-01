/**
 * Incidents — canonical post-incident register. Every entry is
 * paired with a review document; nothing on this list is a draft.
 *
 * IDs follow INC-YYYY-NNN. Newest first.
 */

export type Severity = "SEV-1" | "SEV-2" | "SEV-3";
export type IncidentStatus = "Resolved" | "Monitoring" | "Investigating" | "Root cause identified";

export type TimelineEntry = { at: string; note: string };
export type ActionItem = { id: string; owner: string; due: string; done: boolean; title: string };

export type Incident = {
  id: string;                 // INC-2026-041
  slug: string;               // atlas-scheduler-cascading-retry
  title: string;
  severity: Severity;
  status: IncidentStatus;
  openedAt: string;           // ISO datetime UTC
  resolvedAt: string;         // ISO datetime UTC
  mtta: string;               // human, e.g. "3m 40s"
  mttr: string;               // e.g. "42m"
  commander: string;
  systemsAffected: string[];  // system slugs
  customerImpact: string;
  summary: string;
  detection: string;
  rootCause: string;
  contributingFactors: string[];
  timeline: TimelineEntry[];
  fiveWhys: string[];
  actionItems: ActionItem[];
  relatedAdrs: string[];      // adr slugs
  relatedJournal: string[];   // journal slugs
  relatedBenchmarks: string[];
};

export const INCIDENTS: Incident[] = [
  {
    id: "INC-2026-041",
    slug: "helix-p99-driver-regression",
    title: "Helix P99 regression after CUDA driver bump on H100 fleet",
    severity: "SEV-2",
    status: "Resolved",
    openedAt: "2026-05-21T08:12:00Z",
    resolvedAt: "2026-05-21T11:47:00Z",
    mtta: "4m 12s",
    mttr: "3h 35m",
    commander: "Maintainer",
    systemsAffected: ["helix"],
    customerImpact: "Elevated first-token latency on H100 pool; two enterprise tenants breached SLO for ~90 minutes. No data loss, no failed requests.",
    summary:
      "A routine CUDA driver update changed the default behavior of the async block allocator. Median latency was unchanged but p99 first-token grew 3.4×. Rollback isolated to the Helix H100 pool restored SLO within one canary window.",
    detection:
      "Orbit SLO burn alert on `helix.first_token.p99` at 08:12 UTC, three minutes after the promotion of driver build 570.86 to the H100 pool.",
    rootCause:
      "The new allocator default reused freed blocks more aggressively, which was faster on average but triggered occasional large defragmenting allocations at request boundaries. The tail moved; the median did not.",
    contributingFactors: [
      "Canary SLO gate only inspected median latency; the tail-gate SLO check was not wired into the H100 pool.",
      "The driver release notes mentioned allocator changes only in the footnotes.",
      "The H100 pool did not have a shadow of the previous driver running in parallel for A/B comparison.",
    ],
    timeline: [
      { at: "08:09 UTC", note: "Driver 570.86 promoted to H100 pool by release pipeline." },
      { at: "08:12 UTC", note: "SLO burn alert on first_token.p99 fires. On-call pages IC." },
      { at: "08:16 UTC", note: "IC declares SEV-2. Freeze on H100 pool deploys." },
      { at: "08:41 UTC", note: "Bisection isolates driver bump as change under test." },
      { at: "09:20 UTC", note: "Reproduction confirmed in staging on a single H100 node." },
      { at: "10:04 UTC", note: "Allocator hint patch prepared; requires config-only rollback." },
      { at: "10:37 UTC", note: "Rollback promoted to 10% of H100 pool. SLO recovers on rolled hosts." },
      { at: "11:47 UTC", note: "Rollback at 100%. SLO green across pool. Incident closed." },
    ],
    fiveWhys: [
      "Why did p99 spike? Allocator produced sporadic large allocations at request boundaries.",
      "Why did the allocator change? Driver 570.86 changed the default reuse strategy.",
      "Why didn't canary catch it? Canary gate only inspected median latency for this pool.",
      "Why only median? The tail gate was disabled during a prior migration and never re-enabled.",
      "Why did no one notice? No lint rule enforced tail gate on any GPU pool release.",
    ],
    actionItems: [
      { id: "AI-041.1", owner: "Inference", due: "2026-06-02", done: true,  title: "Re-enable tail-latency canary gate on all GPU pools." },
      { id: "AI-041.2", owner: "Release Eng", due: "2026-06-10", done: true,  title: "Add CI lint: GPU pool releases must reference an active tail gate." },
      { id: "AI-041.3", owner: "Inference", due: "2026-06-24", done: true,  title: "Ship shadow driver comparison harness for H100 pool." },
      { id: "AI-041.4", owner: "Inference", due: "2026-07-15", done: false, title: "Upstream reproduction to driver vendor; track allocator hint API." },
    ],
    relatedAdrs: ["grpc-framing"],
    relatedJournal: ["helix-p99-regression"],
    relatedBenchmarks: ["helix-first-token", "helix-streaming-throughput"],
  },
  {
    id: "INC-2026-034",
    slug: "atlas-scheduler-cascading-retry",
    title: "Atlas scheduler cascading retry storm",
    severity: "SEV-2",
    status: "Resolved",
    openedAt: "2026-04-10T15:03:00Z",
    resolvedAt: "2026-04-10T15:39:00Z",
    mtta: "2m 50s",
    mttr: "36m",
    commander: "Maintainer",
    systemsAffected: ["atlas"],
    customerImpact: "Control-plane API elevated error rate (~7%) for 22 minutes. Data plane unaffected. No workload reschedules lost.",
    summary:
      "A transient DNS blip caused a small fraction of scheduler calls to fail. The scheduler retried without jitter and without a per-caller budget, amplifying resolver load and prolonging the failure window until manual budget was imposed.",
    detection: "Rate-of-errors alert on `atlas.scheduler.rpc.error_ratio` at 15:03 UTC.",
    rootCause:
      "Scheduler retry policy inherited a legacy default: `max_attempts=6`, `backoff=fixed(200ms)`, no jitter, no outstanding-retries budget. Under resolver degradation this became a synchronized retry train.",
    contributingFactors: [
      "Retry policy hadn't been re-audited since the scheduler migrated off the legacy control plane.",
      "The resolver-level circuit breaker had a threshold set high enough that the retry storm stayed below it.",
    ],
    timeline: [
      { at: "15:00 UTC", note: "Regional resolver briefly degrades (~4% NXDOMAIN)." },
      { at: "15:03 UTC", note: "Scheduler error ratio alert fires. On-call pages IC." },
      { at: "15:07 UTC", note: "IC declares SEV-2." },
      { at: "15:14 UTC", note: "Retry topology diagram reveals synchronized retry pattern." },
      { at: "15:22 UTC", note: "Manual retry budget applied via runtime flag." },
      { at: "15:39 UTC", note: "Error ratio recovers to baseline. Incident closed." },
    ],
    fiveWhys: [
      "Why did a small DNS blip escalate? Retries multiplied resolver load.",
      "Why did retries multiply? No per-caller retry budget.",
      "Why no budget? Legacy default policy carried over from prior control plane.",
      "Why did no one catch the legacy default? No CI rule flagged unbounded retry call sites.",
      "Why no CI rule? Retry topology was not a first-class artifact.",
    ],
    actionItems: [
      { id: "AI-034.1", owner: "Platform", due: "2026-04-24", done: true,  title: "Ship retry topology extraction at CI time; block on unbounded call sites." },
      { id: "AI-034.2", owner: "Platform", due: "2026-04-30", done: true,  title: "Reset scheduler retry defaults to bounded exponential w/ jitter." },
      { id: "AI-034.3", owner: "SRE",      due: "2026-05-08", done: true,  title: "Add resolver-side circuit breaker at lower threshold for control plane." },
    ],
    relatedAdrs: [],
    relatedJournal: ["atlas-scheduler-incident"],
    relatedBenchmarks: ["atlas-control-plane-p95"],
  },
  {
    id: "INC-2026-018",
    slug: "eu-west-2-region-failover",
    title: "eu-west-2 metadata quorum loss and failover",
    severity: "SEV-1",
    status: "Resolved",
    openedAt: "2026-02-14T09:14:00Z",
    resolvedAt: "2026-02-14T10:01:00Z",
    mtta: "3m 40s",
    mttr: "47m",
    commander: "Maintainer",
    systemsAffected: ["atlas"],
    customerImpact: "Control-plane operations (workload create, quota update, placement change) unavailable in eu-west-2 for 47 minutes. Data plane and existing workloads unaffected.",
    summary:
      "The eu-west-2 metadata leader failed to renew its lease. The standby failed to promote because a stale quorum-table entry — left over from an incomplete 2024 migration — caused the pre-vote check to short-circuit. Manual promotion restored service.",
    detection: "Quorum-loss alert at 09:14 UTC, followed by control-plane 5xx spike.",
    rootCause:
      "Stale entry from the ADR·007 migration blocked automated promotion. The migration playbook required manual cleanup that the runbook did not surface.",
    contributingFactors: [
      "Migration guide and runbook diverged after the ADR·007 migration.",
      "Pre-vote failure was logged at INFO, not WARN, and did not page.",
      "Failover drill in 2025 exercised the promotion path but skipped the pre-vote step under a test-only flag.",
    ],
    timeline: [
      { at: "09:14 UTC", note: "Lease renewal fails on eu-west-2 metadata leader." },
      { at: "09:18 UTC", note: "IC declares SEV-1. Incident channel opened." },
      { at: "09:26 UTC", note: "Automated promotion attempts fail (pre-vote rejection)." },
      { at: "09:42 UTC", note: "Stale quorum-table entry identified in postmortem replay." },
      { at: "09:55 UTC", note: "Manual entry cleanup + forced promotion executed." },
      { at: "10:01 UTC", note: "Control plane recovered. Incident closed. Post-mortem scheduled." },
    ],
    fiveWhys: [
      "Why did control plane go down? Standby did not promote.",
      "Why did it not promote? Pre-vote rejected due to stale quorum entry.",
      "Why was the entry stale? Migration playbook required manual cleanup.",
      "Why was cleanup manual? ADR·007 migration was authored before automated fencing existed.",
      "Why did no runbook catch it? Runbook and migration guide were owned by different teams and drifted.",
    ],
    actionItems: [
      { id: "AI-018.1", owner: "Platform",     due: "2026-03-15", done: true, title: "Author ADR·022 · automated fencing and forced promotion path." },
      { id: "AI-018.2", owner: "Platform",     due: "2026-03-30", done: true, title: "Reject ADRs whose migrations leave manual cleanup steps." },
      { id: "AI-018.3", owner: "SRE",          due: "2026-04-10", done: true, title: "Promote pre-vote rejection log to WARN + page." },
      { id: "AI-018.4", owner: "Distributed",  due: "2026-06-30", done: false, title: "Ship ADR·027 (leaderless) shadow deployment." },
    ],
    relatedAdrs: ["region-failover", "consensus-model", "url-taxonomy"],
    relatedJournal: ["region-failover-postmortem"],
    relatedBenchmarks: ["atlas-control-plane-p95"],
  },
  {
    id: "INC-2025-093",
    slug: "orbit-tail-buffer-overrun",
    title: "Orbit collector tail-buffer overrun during traffic surge",
    severity: "SEV-3",
    status: "Resolved",
    openedAt: "2025-11-19T22:41:00Z",
    resolvedAt: "2025-11-19T23:12:00Z",
    mtta: "6m 05s",
    mttr: "31m",
    commander: "Maintainer",
    systemsAffected: ["orbit"],
    customerImpact: "~0.4% of traces dropped at ingest for 27 minutes during peak. No customer-facing alerts affected; dropped traces were replayed from durable buffer post-recovery.",
    summary:
      "A tail-based sampler buffer was sized against last quarter's peak. A live event pushed sustained fan-out 2.3× above that peak; the buffer spilled and ingest degraded until autoscale caught up.",
    detection: "Collector buffer high-watermark alert at 22:41 UTC.",
    rootCause: "Buffer sizing was a static config, not a function of measured fan-out. Autoscale was reactive rather than predictive.",
    contributingFactors: [
      "Buffer sizing config had not been reviewed since ADR·018 landed.",
      "No load-test in the release pipeline reproduced above-peak conditions.",
    ],
    timeline: [
      { at: "22:38 UTC", note: "Fan-out begins climbing during scheduled event." },
      { at: "22:41 UTC", note: "Buffer high-watermark alert. On-call responds." },
      { at: "22:53 UTC", note: "Buffer size increased via runtime config; collectors restart in rolling fashion." },
      { at: "23:12 UTC", note: "Buffers stable. Dropped traces replayed from durable log." },
    ],
    fiveWhys: [
      "Why did traces drop? Collector buffer spilled.",
      "Why did it spill? Buffer smaller than sustained fan-out.",
      "Why was buffer too small? Static sizing based on prior peak.",
      "Why static? Autoscale wasn't wired to buffer pressure.",
      "Why not wired? Deferred during ADR·018 landing; never revisited.",
    ],
    actionItems: [
      { id: "AI-093.1", owner: "Observability", due: "2025-12-10", done: true, title: "Autoscale collectors on buffer-pressure signal." },
      { id: "AI-093.2", owner: "Observability", due: "2025-12-20", done: true, title: "Above-peak load-test in release pipeline." },
    ],
    relatedAdrs: ["trace-sampling"],
    relatedJournal: ["cardinality-budgets", "orbit-trace-sampling"],
    relatedBenchmarks: ["orbit-ingest-throughput"],
  },
  {
    id: "INC-2025-071",
    slug: "signal-router-sq-underprovisioned",
    title: "Signal Router SQ depth underprovisioned after io_uring migration",
    severity: "SEV-3",
    status: "Resolved",
    openedAt: "2025-09-30T14:22:00Z",
    resolvedAt: "2025-09-30T14:58:00Z",
    mtta: "5m 10s",
    mttr: "36m",
    commander: "Maintainer",
    systemsAffected: ["signal-router"],
    customerImpact: "Elevated event-fan-out latency (~14ms P99 vs 2ms baseline) for 27 minutes on a single subscriber cohort. No event loss.",
    summary:
      "Post-io_uring migration, submission-queue depth was tuned against average load. A burst-of-bursts pattern from a batch-import tenant produced spurious backpressure. Runtime SQ resize restored baseline.",
    detection: "Subscriber-lag alert at 14:22 UTC.",
    rootCause: "SQ sized against average load; burst-of-bursts exceeded queue depth.",
    contributingFactors: [
      "io_uring tuning guide was still in draft; SQ sizing rule was informal.",
    ],
    timeline: [
      { at: "14:20 UTC", note: "Batch-import tenant begins hourly burst." },
      { at: "14:22 UTC", note: "Subscriber-lag alert fires." },
      { at: "14:35 UTC", note: "SQ resize applied. Rolling restart of dispatchers." },
      { at: "14:58 UTC", note: "Lag returns to baseline. Incident closed." },
    ],
    fiveWhys: [
      "Why did latency rise? Backpressure at SQ.",
      "Why was SQ backpressured? Depth < burst-of-bursts.",
      "Why sized against average? Tuning guide was informal.",
      "Why informal? io_uring adoption ADR·029 was recent.",
      "Why not caught in load-test? Load-test workload was steady-state.",
    ],
    actionItems: [
      { id: "AI-071.1", owner: "Edge Infra", due: "2025-10-15", done: true, title: "Publish io_uring SQ sizing guide; codify burst-of-bursts rule." },
      { id: "AI-071.2", owner: "Edge Infra", due: "2025-10-30", done: true, title: "Add bursty-tenant load-test to router release pipeline." },
    ],
    relatedAdrs: ["io-uring-router"],
    relatedJournal: ["signal-router-io-uring"],
    relatedBenchmarks: ["signal-router-fanout"],
  },
  {
    id: "INC-2025-042",
    slug: "helix-kv-cache-thrash",
    title: "Helix KV cache thrash under mixed-tenant traffic",
    severity: "SEV-2",
    status: "Resolved",
    openedAt: "2025-07-08T18:11:00Z",
    resolvedAt: "2025-07-08T19:47:00Z",
    mtta: "3m 55s",
    mttr: "1h 36m",
    commander: "Maintainer",
    systemsAffected: ["helix"],
    customerImpact: "Enterprise pool p95 first-token grew from 118ms → 340ms for 90 minutes. Two tenants breached SLO.",
    summary:
      "Two long-context tenants collided on the same shard, exceeding the KV-cache admission ceiling. Cache thrashed; eviction rate spiked and structured batching stalled.",
    detection: "KV cache hit-rate alert at 18:11 UTC.",
    rootCause: "Placement policy did not account for context-length as a KV footprint proxy; long-context tenants clustered on the same shard.",
    contributingFactors: [
      "Context length was not a scheduling dimension in the placement API.",
      "Alert on tenant-affinity was absent.",
    ],
    timeline: [
      { at: "18:11 UTC", note: "KV cache hit-rate drops on shard 07." },
      { at: "18:19 UTC", note: "IC declares SEV-2." },
      { at: "18:44 UTC", note: "Manual tenant migration off shard 07." },
      { at: "19:15 UTC", note: "Placement hint patched to include context-length weight." },
      { at: "19:47 UTC", note: "SLO recovers across affected pool. Incident closed." },
    ],
    fiveWhys: [
      "Why did p95 grow? KV cache thrash.",
      "Why did cache thrash? Two long-context tenants on one shard.",
      "Why collided? Placement did not weight context length.",
      "Why not weighted? Context length wasn't a placement dimension.",
      "Why wasn't it? KV footprint wasn't first-class in placement API.",
    ],
    actionItems: [
      { id: "AI-042.1", owner: "Inference", due: "2025-07-30", done: true, title: "Add context-length weight to placement policy." },
      { id: "AI-042.2", owner: "Inference", due: "2025-08-15", done: true, title: "Ship tenant-affinity alert on KV footprint concentration." },
      { id: "AI-042.3", owner: "Platform",  due: "2025-08-30", done: true, title: "Expose KV footprint as placement dimension in Atlas API." },
    ],
    relatedAdrs: ["grpc-framing"],
    relatedJournal: ["moe-routing-collapse", "helix-p99-regression"],
    relatedBenchmarks: ["helix-first-token"],
  },
  {
    id: "INC-2024-057",
    slug: "atlas-quota-controller-flap",
    title: "Atlas quota controller flap after reconciler upgrade",
    severity: "SEV-3",
    status: "Resolved",
    openedAt: "2024-12-11T11:03:00Z",
    resolvedAt: "2024-12-11T11:29:00Z",
    mtta: "2m 40s",
    mttr: "26m",
    commander: "Maintainer",
    systemsAffected: ["atlas"],
    customerImpact: "Quota-denied errors on a small fraction (~1.2%) of control-plane calls for 22 minutes.",
    summary:
      "New reconciler emitted quota-token revocations twice per interval under a specific race with the ceiling controller. Rollback restored steady-state.",
    detection: "Quota-denied error-ratio alert at 11:03 UTC.",
    rootCause: "Reconciler didn't debounce revocation events; race with ceiling controller caused double revocation.",
    contributingFactors: [
      "Unit tests covered steady-state; not the reconcile-during-ceiling-change race.",
    ],
    timeline: [
      { at: "11:03 UTC", note: "Quota-denied error alert." },
      { at: "11:16 UTC", note: "Rollback initiated on reconciler." },
      { at: "11:29 UTC", note: "Error ratio returns to baseline." },
    ],
    fiveWhys: [
      "Why quota-denied errors? Revocations double-emitted.",
      "Why? Reconciler race with ceiling controller.",
      "Why race? Reconciler didn't debounce.",
      "Why no debounce? Assumed at-most-once emit by ceiling controller.",
      "Why assumed? Documentation implied it; source did not guarantee it.",
    ],
    actionItems: [
      { id: "AI-057.1", owner: "Platform", due: "2024-12-30", done: true, title: "Reconciler debounce + emit-once contract on ceiling controller." },
    ],
    relatedAdrs: [],
    relatedJournal: ["tenant-quotas-controller"],
    relatedBenchmarks: ["atlas-control-plane-p95"],
  },
  {
    id: "INC-2024-014",
    slug: "marketpulse-venue-adapter-drift",
    title: "MarketPulse venue adapter time-drift on session open",
    severity: "SEV-2",
    status: "Resolved",
    openedAt: "2024-06-04T13:29:00Z",
    resolvedAt: "2024-06-04T14:12:00Z",
    mtta: "4m 30s",
    mttr: "43m",
    commander: "Maintainer",
    systemsAffected: ["marketpulse"],
    customerImpact: "Tick timestamps drifted by up to 42ms for one venue for 38 minutes. Signals downstream flagged the drift and quarantined affected bars.",
    summary:
      "Adapter's monotonic clock advanced faster than the venue's exchange clock during session open. Bar builder detected the drift, quarantined the affected window, and paged.",
    detection: "Downstream drift-guard alert at 13:29 UTC.",
    rootCause: "Adapter used host monotonic clock without periodic re-sync against venue timestamps.",
    contributingFactors: [
      "Session-open produced a burst that starved the sync goroutine.",
    ],
    timeline: [
      { at: "13:29 UTC", note: "Drift-guard alert fires." },
      { at: "13:44 UTC", note: "Sync goroutine priority raised via runtime config." },
      { at: "14:12 UTC", note: "Drift within tolerance. Quarantined bars re-ingested." },
    ],
    fiveWhys: [
      "Why did timestamps drift? Adapter clock outpaced venue clock.",
      "Why? No periodic sync ran during burst.",
      "Why no sync? Goroutine starved by ingest workers.",
      "Why starved? Default scheduling priority was inherited.",
      "Why inherited? Adapter was ported from prototype without priority audit.",
    ],
    actionItems: [
      { id: "AI-014.1", owner: "Market Data", due: "2024-06-20", done: true, title: "Periodic clock sync at bounded interval; dedicated goroutine priority." },
      { id: "AI-014.2", owner: "Market Data", due: "2024-07-01", done: true, title: "Session-open drift regression test." },
    ],
    relatedAdrs: [],
    relatedJournal: [],
    relatedBenchmarks: ["marketpulse-tick-latency"],
  },
];
