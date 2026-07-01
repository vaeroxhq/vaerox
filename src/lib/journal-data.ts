/**
 * Journal — chronological engineering feed. Each entry has enough
 * metadata to feel like a real content pipeline is behind it.
 */

export type JournalCategory =
  | "Incident Review"
  | "Benchmark"
  | "Architecture"
  | "Research"
  | "Performance"
  | "Post-Mortem"
  | "Engineering Notes"
  | "Release Notes"
  | "Observability"
  | "Infrastructure";

export type JournalStatus = "Published" | "Draft" | "Working note";

export type JournalEntry = {
  slug: string;
  date: string;         // ISO
  title: string;
  category: JournalCategory;
  tags: string[];
  revision: string;     // "r.03"
  author: string;
  status: JournalStatus;
  readingMinutes: number;
  summary: string;      // dek
  body: string[];       // paragraph list
};

export const JOURNAL: JournalEntry[] = [
  {
    slug: "cardinality-budgets",
    date: "2026-06-27",
    title: "Cardinality budgets under fan-out",
    category: "Observability",
    tags: ["orbit", "metrics", "cardinality"],
    revision: "r.04",
    author: "S. Kaur",
    status: "Published",
    readingMinutes: 9,
    summary:
      "Why we started rejecting label combinations at ingest, and how a strict per-service cardinality budget kept our storage cost flat across a 3x traffic quarter.",
    body: [
      "The instinct when cardinality explodes is to buy more storage. We did the opposite: we made cardinality a budgeted resource, owned by the service team, enforced at the collector.",
      "The mechanism is simple. Every service declares a cardinality ceiling in its manifest. The collector maintains a sketch per service and refuses new label combinations once the ceiling is reached. Rejected series produce a well-known counter that the owning team can alert on.",
      "The interesting part is what the budget forces. Teams stop adding user IDs as labels. They stop adding trace IDs. They start thinking about which dimensions matter for aggregation and which belong in traces or logs. Storage cost, unsurprisingly, went flat.",
    ],
  },
  {
    slug: "moe-routing-collapse",
    date: "2026-06-20",
    title: "Routing collapse in sparse MoE serving",
    category: "Research",
    tags: ["helix", "moe", "inference"],
    revision: "r.02",
    author: "M. Aro",
    status: "Published",
    readingMinutes: 12,
    summary:
      "A note on how a subtle interaction between load-aware routing and expert warm-up caused all traffic to collapse onto two experts under bursty tenants.",
    body: [
      "Under steady load, the router distributed requests across experts as expected. Under bursty load — the kind produced by a tenant retrying a failed batch — 87% of traffic collapsed onto two experts within 400 milliseconds.",
      "The root cause was a load-aware routing heuristic that treated cold experts as unhealthy. Warmup latency looked like elevated tail latency, which the router interpreted as backpressure, which caused it to route away from the cold experts, which kept them cold.",
      "The fix was to distinguish cold latency from congested latency in the health signal. The larger lesson is that any feedback loop between routing and health has to model warmup explicitly.",
    ],
  },
  {
    slug: "region-failover-postmortem",
    date: "2026-06-12",
    title: "eu-west-2 region failover · post-mortem",
    category: "Post-Mortem",
    tags: ["atlas", "sev-1", "failover"],
    revision: "r.06",
    author: "R. Halden",
    status: "Published",
    readingMinutes: 7,
    summary:
      "eu-west-2 control-plane lost quorum for 47 minutes. Customer-facing impact was limited to control-plane operations; data plane remained healthy. Full timeline and remediation.",
    body: [
      "At 09:14 UTC, the eu-west-2 metadata leader failed to renew its lease. The standby did not promote because a stale entry in the quorum table caused the pre-vote check to fail. Customer control-plane operations degraded for 47 minutes; the data plane was unaffected.",
      "The stale entry was left over from an incomplete migration in ADR·007. The migration guide called for the entry to be removed manually; the runbook did not.",
      "Remediation: (1) ADR·022 introduces automated fencing and shortens RTO to 12 seconds under this failure mode; (2) migrations that leave manual cleanup steps are now rejected at ADR review.",
    ],
  },
  {
    slug: "tenant-quotas-controller",
    date: "2026-06-04",
    title: "Tenant quotas as a controller",
    category: "Architecture",
    tags: ["atlas", "control-plane", "multitenancy"],
    revision: "r.01",
    author: "L. Voss",
    status: "Published",
    readingMinutes: 6,
    summary:
      "We rewrote the tenant quota system as a reconciliation loop rather than a synchronous check. Consequences, mostly good, one bad.",
    body: [
      "The synchronous quota check lived in the request path and coupled every control-plane call to the freshness of the quota table. It was correct, but it made the p99 of the control plane bimodal.",
      "The reconciliation model moves quota enforcement out of the request path. Requests admit against a locally cached ceiling; a controller reconciles usage against the ceiling every few seconds and revokes tokens when needed.",
      "The trade-off is that we can be briefly over quota. In practice the overshoot is bounded by the reconciliation interval and small compared to the tenant ceiling. The p99 of the control plane is now unimodal.",
    ],
  },
  {
    slug: "adr-027-consensus-model",
    date: "2026-05-29",
    title: "ADR·027 · Leaderless consensus for metadata",
    category: "Architecture",
    tags: ["parity", "consensus", "adr"],
    revision: "r.03",
    author: "J. Odeh",
    status: "Published",
    readingMinutes: 11,
    summary:
      "The design record for Parity, a leaderless consensus protocol tuned for platform metadata under asymmetric partitions and heterogeneous replica speeds.",
    body: [
      "Raft, as we ran it, produced leader churn under a specific workload: bursty writes to a small set of keys with a follower on a congested link. Pre-vote helped, but the workload was pathological for any leader-based protocol.",
      "Parity is leaderless. Every replica accepts writes within its scope and resolves conflicts using an epoch-based ordering. Correctness is checked in TLA+; liveness is probed in Ray simulation.",
      "The ADR is proposed, not accepted. The open question is operational: leaderless protocols invert the on-call mental model. We are running a shadow deployment for the next quarter before promoting it.",
    ],
  },
  {
    slug: "helix-p99-regression",
    date: "2026-05-21",
    title: "Helix P99 regression on H100 nodes",
    category: "Performance",
    tags: ["helix", "cuda", "p99"],
    revision: "r.02",
    author: "M. Aro",
    status: "Published",
    readingMinutes: 8,
    summary:
      "A p99 first-token regression traced to a CUDA driver update that changed the default async allocator behavior. Reproduction, bisection, and workaround.",
    body: [
      "The regression appeared after a driver bump and only on H100 nodes. Median latency was unchanged; p99 grew by 3.4x.",
      "Bisection pointed at the async allocator. The new default reused blocks more aggressively, which was faster on average but produced occasional large allocations at request boundaries.",
      "We reverted to the previous allocator policy for Helix nodes only and filed the finding upstream. Long-term fix will come when the allocator hint API stabilizes.",
    ],
  },
  {
    slug: "orbit-trace-sampling",
    date: "2026-05-14",
    title: "Tail-latency-aware trace sampling in Orbit",
    category: "Observability",
    tags: ["orbit", "tracing", "sampling"],
    revision: "r.02",
    author: "S. Kaur",
    status: "Published",
    readingMinutes: 9,
    summary: "The implementation notes behind ADR·018. Where the sampler lives, how it interacts with the collector, and what it cost.",
    body: [
      "The sampler runs at the collector, not at the SDK. This is deliberate: SDK-side samplers can't see the tail without buffering, and buffering at the SDK is a memory hazard on constrained services.",
      "The collector buffers spans for a short window (a few seconds) and applies the sampling decision at trace root completion. Traces that exceed 2x their service SLO are retained in full.",
      "The cost is roughly 4ms of buffered latency at the collector and 6% additional CPU. In exchange, every SLO breach is investigable.",
    ],
  },
  {
    slug: "bench-suite-2026-q2",
    date: "2026-05-06",
    title: "Benchmark suite · 2026 Q2 release",
    category: "Benchmark",
    tags: ["meridian", "benchmarks"],
    revision: "r.01",
    author: "N. Bercovici",
    status: "Published",
    readingMinutes: 5,
    summary:
      "The Q2 release of the internal benchmark suite adds three retrieval workloads, two agentic workloads, and deprecates the legacy summarisation set.",
    body: [
      "Q2 adds retrieval-augmented workloads at 4k, 16k, and 64k context sizes; two agentic workloads with tool-use budgets; and a long-horizon planning eval.",
      "The legacy summarisation set is deprecated. It was insensitive to the model changes we care about and produced comparison charts that were more decorative than diagnostic.",
      "All Q1 runs have been re-ingested against the Q2 schema; historical comparisons remain valid.",
    ],
  },
  {
    slug: "signal-router-io-uring",
    date: "2026-04-28",
    title: "io_uring backpressure in Signal Router",
    category: "Infrastructure",
    tags: ["signal", "io_uring", "backpressure"],
    revision: "r.03",
    author: "K. Ito",
    status: "Published",
    readingMinutes: 10,
    summary:
      "Moving Signal Router from epoll to io_uring took throughput from 380k to 1.4M events/sec/core. The interesting part was rewriting backpressure.",
    body: [
      "Throughput was the headline; backpressure was the story. Under epoll, backpressure was expressed through the socket buffer and the event loop's ability to drain it. Under io_uring, backpressure moves to the submission queue depth.",
      "This changes the tuning surface. A too-shallow SQ produces spurious backpressure under bursty load; a too-deep SQ delays failure signaling when a downstream is genuinely unhealthy.",
      "The tuning guide is now part of the router runbook. The short version: size the SQ to two times the burst-of-bursts, not to the average load.",
    ],
  },
  {
    slug: "agent-eval-methodology",
    date: "2026-04-19",
    title: "Agent evaluation · methodology and pitfalls",
    category: "Research",
    tags: ["agents", "evaluation", "methodology"],
    revision: "r.02",
    author: "N. Bercovici",
    status: "Published",
    readingMinutes: 14,
    summary:
      "Notes on evaluating agentic systems: why single-turn benchmarks mislead, what stochastic seed policies to use, and how to price a tool-use budget.",
    body: [
      "Agent evaluations that report a single number for success rate consistently over-state agent capability. The distribution matters: an agent that succeeds 80% of the time but has 12 distinct failure modes is not fungible with one that succeeds 80% of the time in one mode.",
      "Seed policy matters. We fix the environment seed and vary the agent seed; the reverse understates variance. The manifest records both.",
      "Tool-use budgets are priced. Every eval has a budget in tool-calls and a budget in tokens; agents that succeed under budget are strictly preferred to agents that succeed unbounded.",
    ],
  },
  {
    slug: "atlas-scheduler-incident",
    date: "2026-04-10",
    title: "Atlas scheduler · cascading retry incident",
    category: "Incident Review",
    tags: ["atlas", "sev-2", "retries"],
    revision: "r.04",
    author: "R. Halden",
    status: "Published",
    readingMinutes: 6,
    summary:
      "A cascading retry pattern in the Atlas scheduler amplified a small transient into a 22-minute control-plane degradation. Timeline and remediation.",
    body: [
      "A transient DNS blip caused a small percentage of scheduler calls to fail. The scheduler retried aggressively, without jitter, on top of an already-degraded resolver. Retries multiplied the load on the resolver, which multiplied the failure rate.",
      "The pattern is textbook and the fix is textbook: exponential backoff, jitter, and a per-caller budget on outstanding retries.",
      "The action item is not the fix. The action item is the audit: we now generate a retry-topology diagram at CI time for every service and flag any call site without a budget.",
    ],
  },
  {
    slug: "adr-031-eval-harness",
    date: "2026-04-02",
    title: "ADR·031 · Reproducible eval harness",
    category: "Architecture",
    tags: ["meridian", "evaluation", "adr"],
    revision: "r.01",
    author: "N. Bercovici",
    status: "Draft",
    readingMinutes: 8,
    summary:
      "The design record for Meridian, a standard evaluation harness. Draft — comments welcome via the ADR review workflow.",
    body: [
      "Two teams shipped incompatible harnesses in the same year. Both were reproducible in principle, both were flaky in practice, both stored results in incompatible schemas.",
      "Meridian is not a novel harness. It is a strict subset of what both harnesses did, plus a canonical results schema, plus a deterministic manifest per run.",
      "The proposal is uninteresting; adoption is the hard part. This ADR is paired with a migration plan and a deprecation calendar.",
    ],
  },
];
