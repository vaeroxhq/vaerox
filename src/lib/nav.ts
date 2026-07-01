/**
 * Single source of truth for primary navigation.
 * Consumed by TopNav and CommandPalette.
 */
export type NavItem = {
  label: string;
  to: string;
  hint: string;
  section: "Primary" | "Meta";
};

export const NAV: NavItem[] = [
  { label: "Systems",         to: "/systems",         hint: "Systems maintained in the lab",  section: "Primary" },
  { label: "Future Systems",  to: "/systems/future",  hint: "Long-term engineering roadmap",  section: "Primary" },
  { label: "Projects",     to: "/projects",     hint: "Build write-ups & case studies", section: "Primary" },
  { label: "Architecture", to: "/architecture", hint: "Decision records & diagrams",    section: "Primary" },
  { label: "Incidents",    to: "/incidents",    hint: "Post-mortems & action items",    section: "Primary" },
  { label: "Engineering Validation", to: "/benchmarks", hint: "Architecture validation & prototype results", section: "Primary" },
  { label: "API",          to: "/api",          hint: "Interface reference",            section: "Primary" },
  { label: "Research",     to: "/research",     hint: "Papers, benchmarks, notes",      section: "Primary" },
  { label: "Research Assets", to: "/research/assets", hint: "Datasets, corpora & annotation pipelines", section: "Primary" },
  { label: "Engineering",  to: "/engineering",  hint: "Handbook & standards",           section: "Primary" },
  { label: "Journal",      to: "/journal",      hint: "Long-form entries",              section: "Primary" },
  { label: "Graph",        to: "/graph",        hint: "Interactive knowledge graph",    section: "Meta" },
  { label: "Search",       to: "/search",       hint: "Universal search",               section: "Meta" },
  { label: "Timeline",     to: "/timeline",     hint: "Unified engineering timeline",   section: "Meta" },
  { label: "Dashboards",   to: "/dashboards",   hint: "Operational metrics",            section: "Meta" },
  { label: "Explorer",     to: "/explorer",     hint: "Faceted entity browser",         section: "Meta" },
  { label: "Surfaces",     to: "/teams",        hint: "Areas of the lab",               section: "Meta" },
  { label: "Maintainer",   to: "/people",       hint: "Who writes and operates this",   section: "Meta" },
  { label: "About",        to: "/about",        hint: "What VÆRØX is",                  section: "Meta" },
  { label: "Contact",      to: "/contact",      hint: "Reach the maintainer",           section: "Meta" },
];
