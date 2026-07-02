/**
 * Single source of truth for primary navigation.
 * Consumed by TopNav and CommandPalette.
 *
 * Nine primary destinations, each with exactly one purpose.
 * Meta entries are utility surfaces available through the palette.
 */
export type NavItem = {
  label: string;
  to: string;
  hint: string;
  section: "Primary" | "Meta";
};

export const NAV: NavItem[] = [
  // Primary — one purpose each.
  { label: "Services", to: "/services", hint: "What we build", section: "Primary" },
  { label: "Projects", to: "/projects", hint: "What we've built", section: "Primary" },
  {
    label: "Architecture",
    to: "/architecture",
    hint: "Why technical decisions were made",
    section: "Primary",
  },
  {
    label: "Research",
    to: "/research",
    hint: "Experiments and investigations",
    section: "Primary",
  },
  { label: "Journal", to: "/journal", hint: "Engineering notes", section: "Primary" },
  {
    label: "Engineering",
    to: "/engineering",
    hint: "Standards followed internally",
    section: "Primary",
  },
  { label: "Technologies", to: "/technologies", hint: "Tools and platforms", section: "Primary" },
  { label: "About", to: "/about", hint: "What the studio is", section: "Primary" },
  { label: "Contact", to: "/contact", hint: "Start a conversation", section: "Primary" },

  // Meta — utilities reachable through ⌘K.
  { label: "Validation", to: "/benchmarks", hint: "Measurements and evaluation", section: "Meta" },
  {
    label: "Datasets",
    to: "/research/assets",
    hint: "Datasets and annotation pipelines",
    section: "Meta",
  },
  { label: "API", to: "/api", hint: "Interface reference", section: "Meta" },
  { label: "Graph", to: "/graph", hint: "Interactive knowledge graph", section: "Meta" },
  { label: "Search", to: "/search", hint: "Universal search", section: "Meta" },
];
