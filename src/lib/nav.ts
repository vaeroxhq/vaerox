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
  { label: "Systems", to: "/systems", hint: "Domains & production systems", section: "Primary" },
  { label: "Projects", to: "/projects", hint: "Case studies & builds", section: "Primary" },
  { label: "Research", to: "/research", hint: "Papers, benchmarks, notes", section: "Primary" },
  {
    label: "Architecture",
    to: "/architecture",
    hint: "Diagrams & decision records",
    section: "Primary",
  },
  {
    label: "Engineering",
    to: "/engineering",
    hint: "Practices, incidents, reviews",
    section: "Primary",
  },
  { label: "Journal", to: "/journal", hint: "Long-form entries", section: "Primary" },
  { label: "About", to: "/about", hint: "Organization & principles", section: "Meta" },
  { label: "Contact", to: "/contact", hint: "Reach the team", section: "Meta" },
];
