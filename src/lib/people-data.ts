/**
 * Maintainer registry.
 *
 * VÆRØX is written, built, and operated by a single engineer. This file
 * describes that maintainer. The `PEOPLE` array is kept as an array (rather
 * than a scalar) so that existing consumers — directory tables, related
 * rails, the graph — continue to work without special-casing.
 *
 * Any owner or commander string that appears anywhere in the corpus
 * resolves to this single maintainer via `findPersonByName`.
 */
export type Person = {
  slug: string;
  name: string;
  fullName: string;
  handle: string;
  role: string;
  team: string;
  joined: string;
  location: string;
  bio: string;
  expertise: string[];
  systemsOwned: string[];
  adrsAuthored: string[];
  incidentsCommanded: string[];
  projectsContributed: string[];
  researchAuthored: string[];
};

import { SYSTEMS } from "@/lib/systems-data";
import { ADRS } from "@/lib/architecture-data";
import { INCIDENTS } from "@/lib/incidents-data";
import { PROJECTS } from "@/lib/projects-data";
import { RESEARCH } from "@/lib/research-data";

const MAINTAINER: Person = {
  slug: "maintainer",
  name: "Mayank Sharma",
  fullName: "Mayank Sharma",
  handle: "@vaerox",
  role: "Founder · Principal Engineer",
  team: "lab",
  joined: "2024-06-01",
  location: "Independent",
  bio: "VÆRØX is written, built, and operated by one engineer. Everything on this site — the canonical systems, the architecture decisions, the validation records, the research notes — is authored, maintained, and signed by the same person. There is no team behind the byline.",
  expertise: [
    "LLM agent systems",
    "quantitative research tooling",
    "workflow orchestration",
    "evaluation methodology",
    "cost forecasting",
    "systems performance",
    "technical writing",
  ],
  systemsOwned: SYSTEMS.map((s) => s.slug),
  adrsAuthored: ADRS.map((a) => a.number),
  incidentsCommanded: INCIDENTS.map((i) => i.slug),
  projectsContributed: PROJECTS.map((p) => p.slug),
  researchAuthored: RESEARCH.map((r) => r.slug),
};


export const PEOPLE: Person[] = [MAINTAINER];

/**
 * Any legacy owner or commander string ("L. Voss", "Inference", "SRE", …)
 * resolves to the single maintainer. This preserves every cross-link that
 * was previously built assuming a larger fictional org.
 */
export function findPersonByName(_name: string): Person | undefined {
  return MAINTAINER;
}

export function personHref(_name: string): string | undefined {
  return `/people/${MAINTAINER.slug}`;
}
