/**
 * Team registry. Team slugs are referenced from Person.team.
 */
export type Team = {
  slug: string;
  name: string;
  charter: string;
  lead: string; // person slug
  established: string;
  memberSlugs: string[];        // person slugs
  systemsOwned: string[];       // system slugs
  currentProjects: string[];    // project slugs
  responsibilities: string[];
  onCall: string;               // rotation description
};

export const TEAMS: Team[] = [
  {
    slug: "platform",
    name: "Platform",
    charter: "The platform substrate every other team builds on. Control plane, service mesh, identity, quotas.",
    lead: "l-voss",
    established: "2021-06-01",
    memberSlugs: ["l-voss", "h-al-sayed", "r-halden"],
    systemsOwned: ["atlas"],
    currentProjects: ["atlas-control-plane"],
    responsibilities: [
      "Control-plane availability ≥ 99.99%",
      "Service identity and mTLS lifecycle",
      "Quota, rate limit and admission policy",
      "Internal SDK versioning",
    ],
    onCall: "Follow-the-sun · 3 primary, 3 secondary, 7-day rotation",
  },
  {
    slug: "inference",
    name: "Inference",
    charter: "The Helix serving runtime — every internal LLM call passes through here.",
    lead: "m-aro",
    established: "2023-01-09",
    memberSlugs: ["m-aro"],
    systemsOwned: ["helix"],
    currentProjects: ["helix-inference"],
    responsibilities: [
      "Serving P50/P95/P99 for every model tier",
      "Cost per million tokens",
      "GPU pool capacity and driver qualification",
      "Streaming protocol and framing",
    ],
    onCall: "Two-primary rotation, 5-day, EU/APAC split",
  },
  {
    slug: "observability",
    name: "Observability",
    charter: "Orbit — the substrate for every metric, log, span and profile.",
    lead: "s-kaur",
    established: "2022-08-22",
    memberSlugs: ["s-kaur"],
    systemsOwned: ["orbit"],
    currentProjects: ["orbit-observability"],
    responsibilities: [
      "Ingest availability ≥ 99.95%",
      "Query P95 ≤ 200ms across 14 regions",
      "Sampling policy and cardinality controls",
      "Retention and cost per billion events",
    ],
    onCall: "Two-primary rotation, 7-day",
  },
  {
    slug: "reliability",
    name: "Reliability (SRE)",
    charter: "Incident command, capacity, chaos, and the practice of failing safely.",
    lead: "r-halden",
    established: "2021-11-02",
    memberSlugs: ["r-halden"],
    systemsOwned: [],
    currentProjects: [],
    responsibilities: [
      "Incident command and post-mortem quality",
      "Regional failover drills quarterly",
      "Capacity planning and burn-rate alerting",
      "Chaos programme",
    ],
    onCall: "Always on. Two commanders, 24-hour handoff.",
  },
  {
    slug: "distributed",
    name: "Distributed Systems",
    charter: "The research and hardening of consensus, replication and consistency primitives.",
    lead: "j-odeh",
    established: "2023-04-18",
    memberSlugs: ["j-odeh"],
    systemsOwned: [],
    currentProjects: ["parity-consensus"],
    responsibilities: [
      "Consensus and replication primitives",
      "Formal specifications for critical paths",
      "Metadata layer evolution",
    ],
    onCall: "Escalation only — no primary rotation",
  },
  {
    slug: "edge",
    name: "Edge Infra",
    charter: "The signal-router and everything on the network hot path.",
    lead: "k-ito",
    established: "2022-06-01",
    memberSlugs: ["k-ito"],
    systemsOwned: ["signal-router"],
    currentProjects: ["signal-router"],
    responsibilities: [
      "L4/L7 routing for internal traffic",
      "io_uring pool sizing and burst handling",
      "TLS termination and session resumption",
    ],
    onCall: "Two-primary rotation, 7-day, APAC-anchored",
  },
  {
    slug: "research",
    name: "Research Infra",
    charter: "Meridian and every tool the research organization uses to promote a model.",
    lead: "n-bercovici",
    established: "2023-09-11",
    memberSlugs: ["n-bercovici"],
    systemsOwned: [],
    currentProjects: ["meridian-eval"],
    responsibilities: [
      "Evaluation harness and reproducibility",
      "Dataset provenance and licensing",
      "Model promotion gates",
    ],
    onCall: "Business hours, EU",
  },
  {
    slug: "security",
    name: "Security",
    charter: "Vigil, supply-chain attestation, and the platform's threat model.",
    lead: "a-mensah",
    established: "2024-02-05",
    memberSlugs: ["a-mensah"],
    systemsOwned: ["vigil"],
    currentProjects: ["vigil"],
    responsibilities: [
      "Host and workload telemetry",
      "SBOM and build attestation",
      "Incident forensics and detections",
    ],
    onCall: "Follow-the-sun · 2 primary",
  },
  {
    slug: "performance",
    name: "Performance",
    charter: "Owner of the benchmark suite. Reproducibility, methodology, and the number.",
    lead: "t-nakashima",
    established: "2023-07-19",
    memberSlugs: ["t-nakashima"],
    systemsOwned: [],
    currentProjects: [],
    responsibilities: [
      "Benchmark methodology and hardware fleet",
      "Regression gating in the release pipeline",
      "Published performance numbers",
    ],
    onCall: "Business hours, APAC",
  },
  {
    slug: "market-data",
    name: "Market Data",
    charter: "MarketPulse — tick-level ingestion across every venue we consume.",
    lead: "e-lindqvist",
    established: "2022-10-30",
    memberSlugs: ["e-lindqvist"],
    systemsOwned: ["marketpulse"],
    currentProjects: ["marketpulse"],
    responsibilities: [
      "Venue adapter correctness and clock sync",
      "Normalized tick and bar streams",
      "End-to-end tick latency budget",
    ],
    onCall: "Market hours + weekly maintenance window",
  },
  {
    slug: "devex",
    name: "Developer Experience",
    charter: "The build graph, CI, ADR tooling and the daily loop every engineer runs.",
    lead: "d-park",
    established: "2022-05-16",
    memberSlugs: ["d-park"],
    systemsOwned: [],
    currentProjects: [],
    responsibilities: [
      "Build graph and incremental correctness",
      "CI wall-time budget",
      "ADR and RFC tooling",
    ],
    onCall: "Business hours, KR",
  },
];

const teamIndex = new Map<string, Team>();
for (const t of TEAMS) teamIndex.set(t.slug, t);

export function getTeam(slug: string): Team | undefined {
  return teamIndex.get(slug);
}
