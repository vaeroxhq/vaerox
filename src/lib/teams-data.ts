/**
 * Surfaces of the lab.
 *
 * VÆRØX is not organized into teams — it is maintained by a single engineer.
 * The concept of a "team" here is retained only as a filing structure: each
 * "surface" is an area of practice that the lab explores, documents, and
 * exercises through reference implementations. Every surface is maintained
 * by the same person.
 *
 * The shape of `Team` is preserved so existing consumers (routes, graph
 * relations, filters) continue to work. `memberSlugs` is intentionally
 * empty; `lead` always points to the single maintainer.
 */
export type Team = {
  slug: string;
  name: string;
  charter: string;
  lead: string;
  established: string;
  memberSlugs: string[];
  systemsOwned: string[];
  currentProjects: string[];
  responsibilities: string[];
  onCall: string;
};

const MAINT = "maintainer";

export const TEAMS: Team[] = [
  {
    slug: "platform",
    name: "Platform",
    charter: "The reference control plane. Reconcilers, identity, quotas, and the URL taxonomy that stitches everything together.",
    lead: MAINT,
    established: "2021-06",
    memberSlugs: [],
    systemsOwned: ["atlas"],
    currentProjects: ["atlas-control-plane"],
    responsibilities: [
      "Control-plane reconciler design and correctness",
      "Service identity and mTLS lifecycle patterns",
      "Quota, rate limit and admission policy modeling",
      "Internal SDK versioning conventions",
    ],
    onCall: "Not applicable — no external SLA. Bugs are triaged as they surface.",
  },
  {
    slug: "inference",
    name: "Inference",
    charter: "Architecture exploration for low-latency LLM serving — batching, KV caches, expert parallelism, framing.",
    lead: MAINT,
    established: "2023-01",
    memberSlugs: [],
    systemsOwned: ["helix"],
    currentProjects: ["helix-inference"],
    responsibilities: [
      "Serving-runtime prototypes and measurement",
      "Cost-per-token accounting methodology",
      "GPU pool sizing and driver notes",
      "Streaming protocol and framing design",
    ],
    onCall: "Not applicable.",
  },
  {
    slug: "observability",
    name: "Observability",
    charter: "Trace-first telemetry design — sampling, cardinality budgets, and query latency at reference scale.",
    lead: MAINT,
    established: "2022-08",
    memberSlugs: [],
    systemsOwned: ["orbit"],
    currentProjects: ["orbit-observability"],
    responsibilities: [
      "Ingest pipeline design and back-pressure",
      "Sampling policy and cardinality controls",
      "Query-path characterization",
      "Retention and cost modeling",
    ],
    onCall: "Not applicable.",
  },
  {
    slug: "reliability",
    name: "Reliability",
    charter: "Incident write-ups, capacity math, chaos exercises, and the practice of failing safely — applied to the lab's own systems and studied in the wild.",
    lead: MAINT,
    established: "2021-11",
    memberSlugs: [],
    systemsOwned: [],
    currentProjects: [],
    responsibilities: [
      "Post-mortem quality and reproducibility",
      "Failover procedures and drill design",
      "Capacity planning and burn-rate math",
      "Chaos and fault-injection notes",
    ],
    onCall: "Not applicable — write-ups are authored after the fact.",
  },
  {
    slug: "distributed",
    name: "Distributed Systems",
    charter: "Experimental work on consensus, replication, and consistency primitives — with formal specifications where they help.",
    lead: MAINT,
    established: "2023-04",
    memberSlugs: [],
    systemsOwned: [],
    currentProjects: ["parity-consensus"],
    responsibilities: [
      "Consensus and replication prototypes",
      "Formal specifications for critical paths",
      "Metadata-layer evolution notes",
    ],
    onCall: "Not applicable.",
  },
  {
    slug: "edge",
    name: "Edge Infra",
    charter: "Everything on the network hot path — io_uring, kernel-bypass patterns, and event routing at the edge.",
    lead: MAINT,
    established: "2022-06",
    memberSlugs: [],
    systemsOwned: ["signal-router"],
    currentProjects: ["signal-router"],
    responsibilities: [
      "L4/L7 routing prototypes",
      "io_uring sizing and burst handling",
      "TLS termination and session resumption notes",
    ],
    onCall: "Not applicable.",
  },
  {
    slug: "research",
    name: "Public Research",
    charter: "Reproducible evaluation harnesses, methodology write-ups, and reading notes that back the lab's technical claims.",
    lead: MAINT,
    established: "2023-09",
    memberSlugs: [],
    systemsOwned: [],
    currentProjects: ["meridian-eval"],
    responsibilities: [
      "Evaluation-harness design",
      "Dataset provenance and licensing hygiene",
      "Methodology critique and replication",
    ],
    onCall: "Not applicable.",
  },
  {
    slug: "security",
    name: "Security",
    charter: "Threat modeling for the lab's own artifacts, supply-chain attestation, and eBPF-based host telemetry experiments.",
    lead: MAINT,
    established: "2024-02",
    memberSlugs: [],
    systemsOwned: ["vigil"],
    currentProjects: ["vigil"],
    responsibilities: [
      "Host and workload telemetry design",
      "SBOM and build-attestation patterns",
      "Threat modeling of the lab's own surfaces",
    ],
    onCall: "Not applicable.",
  },
  {
    slug: "performance",
    name: "Performance",
    charter: "Benchmark methodology, reproducibility rules, and the numbers cited across the site.",
    lead: MAINT,
    established: "2023-07",
    memberSlugs: [],
    systemsOwned: [],
    currentProjects: [],
    responsibilities: [
      "Benchmark methodology and hardware documentation",
      "Regression rules for published numbers",
      "Reproduction scripts and raw data",
    ],
    onCall: "Not applicable.",
  },
  {
    slug: "market-data",
    name: "Market Data",
    charter: "Tick-level ingestion architecture — venue adapters, clock sync, and end-to-end latency budgets.",
    lead: MAINT,
    established: "2022-10",
    memberSlugs: [],
    systemsOwned: ["marketpulse"],
    currentProjects: ["marketpulse"],
    responsibilities: [
      "Venue-adapter correctness and clock discipline",
      "Normalized tick and bar stream design",
      "End-to-end tick latency accounting",
    ],
    onCall: "Not applicable.",
  },
  {
    slug: "devex",
    name: "Developer Experience",
    charter: "The build graph, CI conventions, ADR tooling, and the daily loop the lab itself runs on.",
    lead: MAINT,
    established: "2022-05",
    memberSlugs: [],
    systemsOwned: [],
    currentProjects: [],
    responsibilities: [
      "Build graph and incremental correctness",
      "CI wall-time budget",
      "ADR and RFC tooling",
    ],
    onCall: "Not applicable.",
  },
];

const teamIndex = new Map<string, Team>();
for (const t of TEAMS) teamIndex.set(t.slug, t);

export function getTeam(slug: string): Team | undefined {
  return teamIndex.get(slug);
}
