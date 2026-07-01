/**
 * People registry. Names match owner strings across systems, ADRs,
 * incidents, APIs and benchmarks so ownership resolves to profiles.
 */
export type Person = {
  slug: string;
  name: string;         // "L. Voss"
  fullName: string;
  handle: string;       // "@lvoss"
  role: string;
  team: string;         // team slug
  joined: string;       // ISO
  location: string;
  bio: string;
  expertise: string[];
  systemsOwned: string[];    // system slugs
  adrsAuthored: string[];    // adr numbers
  incidentsCommanded: string[]; // incident slugs
  projectsContributed: string[]; // project slugs
  researchAuthored: string[]; // research slugs
};

export const PEOPLE: Person[] = [
  {
    slug: "l-voss", name: "L. Voss", fullName: "Lena Voss", handle: "@lvoss",
    role: "Principal Engineer, Platform", team: "platform",
    joined: "2022-03-14", location: "Berlin, DE",
    bio: "Owns the Atlas control plane and the URL taxonomy that stitches the platform together. Previously wrote the reconciler that survived the 2024 quota flap.",
    expertise: ["control planes", "reconcilers", "gRPC", "postgres"],
    systemsOwned: ["atlas", "signal-router"],
    adrsAuthored: ["001", "007", "020"],
    incidentsCommanded: ["atlas-quota-controller-flap", "marketpulse-venue-adapter-drift"],
    projectsContributed: ["atlas-control-plane", "signal-router", "marketpulse"],
    researchAuthored: [],
  },
  {
    slug: "m-aro", name: "M. Aro", fullName: "Mikael Aro", handle: "@maro",
    role: "Staff Engineer, Inference", team: "inference",
    joined: "2023-01-09", location: "Helsinki, FI",
    bio: "Runs the Helix serving runtime end to end. Wrote the framing spec, commanded the KV cache and driver regressions, and pushed cost per Mtok down 41% year on year.",
    expertise: ["LLM serving", "CUDA", "kernel scheduling", "gRPC"],
    systemsOwned: ["helix"],
    adrsAuthored: ["014"],
    incidentsCommanded: ["helix-p99-driver-regression", "helix-kv-cache-thrash"],
    projectsContributed: ["helix-inference"],
    researchAuthored: [],
  },
  {
    slug: "s-kaur", name: "S. Kaur", fullName: "Simran Kaur", handle: "@skaur",
    role: "Staff Engineer, Observability", team: "observability",
    joined: "2022-08-22", location: "London, UK",
    bio: "Owns Orbit, from ingestion to query. Reshaped tail sampling after the 2025 buffer overrun and keeps the query P95 under 180ms across 14 regions.",
    expertise: ["telemetry", "columnar storage", "sampling theory"],
    systemsOwned: ["orbit"],
    adrsAuthored: ["018"],
    incidentsCommanded: ["orbit-tail-buffer-overrun"],
    projectsContributed: ["orbit-observability"],
    researchAuthored: [],
  },
  {
    slug: "r-halden", name: "R. Halden", fullName: "Ronen Halden", handle: "@rhalden",
    role: "Principal SRE", team: "reliability",
    joined: "2021-11-02", location: "Tel Aviv, IL",
    bio: "Runs the reliability practice. Commanded the eu-west-2 failover and the scheduler cascading retry, and authored the automated fencing path that replaced manual promotion.",
    expertise: ["consensus", "failover", "capacity planning", "chaos"],
    systemsOwned: ["atlas"],
    adrsAuthored: ["022"],
    incidentsCommanded: ["eu-west-2-region-failover", "atlas-scheduler-cascading-retry"],
    projectsContributed: ["atlas-control-plane"],
    researchAuthored: [],
  },
  {
    slug: "j-odeh", name: "J. Odeh", fullName: "Jamila Odeh", handle: "@jodeh",
    role: "Principal Engineer, Distributed Systems", team: "distributed",
    joined: "2023-04-18", location: "Amsterdam, NL",
    bio: "Leads the Parity consensus prototype and the leaderless replication path for Atlas. Formerly on the Spanner-style transaction team at a prior employer.",
    expertise: ["consensus", "replication", "formal methods"],
    systemsOwned: [],
    adrsAuthored: ["027"],
    incidentsCommanded: [],
    projectsContributed: ["parity-consensus"],
    researchAuthored: ["leaderless-metadata"],
  },
  {
    slug: "k-ito", name: "K. Ito", fullName: "Kenji Ito", handle: "@kito",
    role: "Staff Engineer, Edge Infra", team: "edge",
    joined: "2022-06-01", location: "Tokyo, JP",
    bio: "Owns the signal-router io_uring rewrite. Commanded the SQ under-provisioning incident and codified the burst-of-bursts sizing rule now used across the fleet.",
    expertise: ["io_uring", "Rust", "kernel bypass", "load balancing"],
    systemsOwned: ["signal-router"],
    adrsAuthored: ["029"],
    incidentsCommanded: ["signal-router-sq-underprovisioned"],
    projectsContributed: ["signal-router"],
    researchAuthored: [],
  },
  {
    slug: "n-bercovici", name: "N. Bercovici", fullName: "Noa Bercovici", handle: "@nbercovici",
    role: "Staff Research Engineer", team: "research",
    joined: "2023-09-11", location: "Paris, FR",
    bio: "Runs the Meridian evaluation stack. Publishes the internal harness that gates every model promotion.",
    expertise: ["evaluation", "statistics", "benchmarking"],
    systemsOwned: [],
    adrsAuthored: ["031"],
    incidentsCommanded: [],
    projectsContributed: ["meridian-eval"],
    researchAuthored: ["eval-harness-methodology"],
  },
  {
    slug: "a-mensah", name: "A. Mensah", fullName: "Ama Mensah", handle: "@amensah",
    role: "Senior Engineer, Security", team: "security",
    joined: "2024-02-05", location: "Accra, GH",
    bio: "Owns the Vigil telemetry pipeline and the platform's supply chain attestation path.",
    expertise: ["eBPF", "supply chain", "attestation", "threat modeling"],
    systemsOwned: ["vigil"],
    adrsAuthored: [],
    incidentsCommanded: [],
    projectsContributed: ["vigil"],
    researchAuthored: [],
  },
  {
    slug: "t-nakashima", name: "T. Nakashima", fullName: "Taro Nakashima", handle: "@tnakashima",
    role: "Senior Engineer, Performance", team: "performance",
    joined: "2023-07-19", location: "Osaka, JP",
    bio: "Curator of the benchmark suite. Guards methodology and ensures every published number is reproducible on documented hardware.",
    expertise: ["profiling", "microbenchmarks", "statistics"],
    systemsOwned: [],
    adrsAuthored: [],
    incidentsCommanded: [],
    projectsContributed: [],
    researchAuthored: ["p99-methodology"],
  },
  {
    slug: "e-lindqvist", name: "E. Lindqvist", fullName: "Elin Lindqvist", handle: "@elindqvist",
    role: "Senior Engineer, Market Data", team: "market-data",
    joined: "2022-10-30", location: "Stockholm, SE",
    bio: "Owns the MarketPulse venue adapters and the tick-latency budget across all consolidated feeds.",
    expertise: ["market data", "clock sync", "Rust", "ClickHouse"],
    systemsOwned: ["marketpulse"],
    adrsAuthored: [],
    incidentsCommanded: [],
    projectsContributed: ["marketpulse"],
    researchAuthored: [],
  },
  {
    slug: "d-park", name: "D. Park", fullName: "Daniel Park", handle: "@dpark",
    role: "Staff Engineer, Developer Experience", team: "devex",
    joined: "2022-05-16", location: "Seoul, KR",
    bio: "Owns the internal build graph, the ADR tooling, and the CI lint that keeps retry topologies bounded.",
    expertise: ["build systems", "CI", "TypeScript", "developer tooling"],
    systemsOwned: [],
    adrsAuthored: [],
    incidentsCommanded: [],
    projectsContributed: [],
    researchAuthored: [],
  },
  {
    slug: "h-al-sayed", name: "H. Al-Sayed", fullName: "Hana Al-Sayed", handle: "@halsayed",
    role: "Engineering Director", team: "platform",
    joined: "2021-06-01", location: "Dubai, AE",
    bio: "Runs the platform organization. Chairs the architecture review and owns the quarterly roadmap.",
    expertise: ["engineering leadership", "roadmapping", "architecture review"],
    systemsOwned: [],
    adrsAuthored: [],
    incidentsCommanded: [],
    projectsContributed: [],
    researchAuthored: [],
  },
];

const nameIndex = new Map<string, Person>();
for (const p of PEOPLE) nameIndex.set(p.name.toLowerCase(), p);

/** Resolve a legacy owner string like "L. Voss" to a Person, if any. */
export function findPersonByName(name: string): Person | undefined {
  if (!name) return undefined;
  // Try direct match, then strip trailing team qualifier ("L. Voss · Platform")
  const cleaned = name.split("·")[0].trim().toLowerCase();
  return nameIndex.get(cleaned);
}

export function personHref(name: string): string | undefined {
  const p = findPersonByName(name);
  return p ? `/people/${p.slug}` : undefined;
}
