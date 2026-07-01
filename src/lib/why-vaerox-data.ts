/**
 * Why VÆRØX — the reasons that back the studio's positioning.
 * Each point is testable against the rest of the site.
 */
export type WhyPoint = { code: string; title: string; body: string };

export const WHY_POINTS: WhyPoint[] = [
  {
    code: "01",
    title: "Architecture-first engineering",
    body: "Every project starts with a written architecture — data model, service boundaries, contracts, failure modes — before any UI is built. The ADR registry on this site is how we work, not a marketing surface.",
  },
  {
    code: "02",
    title: "Production-quality code",
    body: "Typed everywhere possible. Migrations reversible. Tests where they earn their keep. Observability from day one. Code written to be inherited, not thrown over a wall.",
  },
  {
    code: "03",
    title: "AI-native development",
    body: "LLMs are treated as a normal engineering component — versioned, evaluated, cost-tracked, and swappable. Prompts are code. Retrieval quality is measured. Nothing ships on vibes.",
  },
  {
    code: "04",
    title: "Transparent communication",
    body: "Written weekly updates. Everything in version control from day one. Milestones are visible. Bad news arrives early, in plain language.",
  },
  {
    code: "05",
    title: "Modern technology stack",
    body: "TanStack Start, TypeScript, React, Python, FastAPI, PostgreSQL, DuckDB, LangGraph, PyTorch. Chosen for longevity, not novelty. Documented on the Capabilities page.",
  },
  {
    code: "06",
    title: "Scalable systems",
    body: "Systems designed to survive traffic, data-volume, and team-size increases. Boundaries drawn before they're needed. No premature clever, no permanent duct tape.",
  },
  {
    code: "07",
    title: "Documentation included",
    body: "Architecture diagrams, ADRs, runbooks, and handover notes ship with the code. The Handbook and Architecture sections on this site show the standard.",
  },
  {
    code: "08",
    title: "Maintainable software",
    body: "Boring naming. Explicit modules. Reversible decisions. Code the next engineer — yours or ours — can extend without archaeology.",
  },
  {
    code: "09",
    title: "Long-term partnership",
    body: "Fixed-scope work is optimized for a healthy handover; product engagements are optimized for compounding value over years. Either way the studio stays reachable.",
  },
];
