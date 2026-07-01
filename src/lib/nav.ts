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
  // Client-facing surfaces first — this is a studio, not a documentation portal.
  { label: "Services",       to: "/services",     hint: "What VÆRØX builds",              section: "Primary" },
  { label: "Work",           to: "/work",         hint: "What are you trying to build?",  section: "Primary" },
  { label: "Industries",     to: "/industries",   hint: "Sectors we build for",           section: "Primary" },
  { label: "Case Studies",   to: "/case-studies", hint: "Real build narratives",          section: "Primary" },
  { label: "Engagements",    to: "/engagements",  hint: "How to work with the studio",    section: "Primary" },
  { label: "Process",        to: "/process",      hint: "How the studio delivers",        section: "Primary" },
  { label: "Why VÆRØX",     to: "/why",          hint: "Engineering standards",          section: "Primary" },
  { label: "Technologies",   to: "/technologies", hint: "The full technology matrix",     section: "Primary" },
  { label: "Capabilities",   to: "/capabilities", hint: "The stack we ship in",           section: "Primary" },

  // Engineering credibility surfaces.
  { label: "Systems",      to: "/systems",      hint: "Reference implementations",      section: "Primary" },
  { label: "Roadmap",      to: "/systems/future", hint: "What we are planning to build", section: "Primary" },
  { label: "Architecture", to: "/architecture", hint: "Decision records & diagrams",    section: "Primary" },
  { label: "Engineering Validation & Benchmarks", to: "/benchmarks", hint: "Architecture validation & measurements", section: "Primary" },
  { label: "Research",     to: "/research",     hint: "Papers, benchmarks, notes",      section: "Primary" },
  { label: "Datasets",     to: "/research/assets", hint: "Datasets, corpora & annotation pipelines", section: "Primary" },
  { label: "Engineering",  to: "/engineering",  hint: "Handbook & standards",           section: "Primary" },
  { label: "API",          to: "/api",          hint: "Interface reference",            section: "Primary" },
  { label: "Journal",      to: "/journal",      hint: "Long-form entries",              section: "Primary" },

  // Meta / navigation.
  { label: "Graph",        to: "/graph",        hint: "Interactive knowledge graph",    section: "Meta" },
  { label: "Search",       to: "/search",       hint: "Universal search",               section: "Meta" },
  { label: "Timeline",     to: "/timeline",     hint: "Unified engineering timeline",   section: "Meta" },
  { label: "Explorer",     to: "/explorer",     hint: "Faceted entity browser",         section: "Meta" },
  { label: "Surfaces",     to: "/teams",        hint: "Areas of the studio",            section: "Meta" },
  { label: "About",        to: "/about",        hint: "What VÆRØX is",                  section: "Meta" },
  { label: "FAQ",          to: "/faq",          hint: "How the studio works",           section: "Meta" },
  { label: "Contact",      to: "/contact",      hint: "Book a discovery call",          section: "Meta" },
  { label: "Dashboards",   to: "/dashboards",   hint: "Instrumentation targets",        section: "Meta" },
  { label: "Projects",     to: "/projects",     hint: "Build write-ups",                section: "Meta" },
];
