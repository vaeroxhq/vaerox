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
  { label: "Systems",      to: "/systems",      hint: "Production systems & domains",   section: "Primary" },
  { label: "Projects",     to: "/projects",     hint: "Case studies & builds",          section: "Primary" },
  { label: "Architecture", to: "/architecture", hint: "Decision records & diagrams",    section: "Primary" },
  { label: "Incidents",    to: "/incidents",    hint: "Post-mortems & action items",    section: "Primary" },
  { label: "Benchmarks",   to: "/benchmarks",   hint: "Standing measurements",          section: "Primary" },
  { label: "API",          to: "/api",          hint: "Interface reference",            section: "Primary" },
  { label: "Research",     to: "/research",     hint: "Papers, benchmarks, notes",      section: "Primary" },
  { label: "Engineering",  to: "/engineering",  hint: "Handbook & standards",           section: "Primary" },
  { label: "Journal",      to: "/journal",      hint: "Long-form entries",              section: "Primary" },
  { label: "Graph",        to: "/graph",        hint: "Interactive knowledge graph",    section: "Meta" },
  { label: "Search",       to: "/search",       hint: "Universal search",               section: "Meta" },
  { label: "Timeline",     to: "/timeline",     hint: "Unified engineering timeline",   section: "Meta" },
  { label: "Dashboards",   to: "/dashboards",   hint: "Operational metrics",            section: "Meta" },
  { label: "Explorer",     to: "/explorer",     hint: "Faceted entity browser",         section: "Meta" },
  { label: "Teams",        to: "/teams",        hint: "Org structure & charters",       section: "Meta" },
  { label: "People",       to: "/people",       hint: "Engineer directory",             section: "Meta" },
  { label: "About",        to: "/about",        hint: "Organization & principles",      section: "Meta" },
  { label: "Contact",      to: "/contact",      hint: "Reach the team",                 section: "Meta" },
];
