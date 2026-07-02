/**
 * Engagement models — the shapes in which VÆRØX works with clients.
 */
export type Engagement = {
  slug: string;
  code: string;
  name: string;
  summary: string;
  idealFor: string[];
  deliverables: string[];
  duration: string;
  pricing: string;
};

export const ENGAGEMENTS: Engagement[] = [
  {
    slug: "mvp",
    code: "ENG-01",
    name: "MVP Development",
    summary:
      "Take a validated idea to a shippable v1 — architected properly from day one so it doesn't have to be rebuilt at v2.",
    idealFor: [
      "Pre-seed and seed startups",
      "Founders with a defined problem",
      "Teams replacing a prototype with a real product",
    ],
    deliverables: [
      "Full-stack MVP with auth, data model, and core flows",
      "Deployed environment (staging + production)",
      "Architecture doc, ADRs, and handover runbook",
    ],
    duration: "6–12 weeks",
    pricing: "Fixed scope",
  },
  {
    slug: "fixed-scope",
    code: "ENG-02",
    name: "Fixed-Scope Projects",
    summary:
      "A defined system, defined milestones, defined cost. Best when the requirements are clear and the risk is in execution, not exploration.",
    idealFor: [
      "SMBs modernizing a specific workflow",
      "Enterprise teams delivering a bounded system",
      "Integration or migration work",
    ],
    deliverables: [
      "System delivered against written milestones",
      "Weekly written updates",
      "Documentation and evaluation report",
    ],
    duration: "4–16 weeks",
    pricing: "Fixed scope",
  },
  {
    slug: "product-engineering",
    code: "ENG-03",
    name: "Long-Term Product Engineering",
    summary:
      "Ongoing engineering ownership of one or more product surfaces — features, infrastructure, evaluation, and maintenance under one relationship.",
    idealFor: [
      "Post-seed startups without a full team",
      "Scale-ups adding a specialized surface",
      "Product teams needing AI depth",
    ],
    deliverables: [
      "Continuous feature delivery",
      "Roadmap co-ownership",
      "Instrumentation, SLOs, and evaluation harnesses",
    ],
    duration: "Rolling monthly",
    pricing: "Monthly retainer",
  },
  {
    slug: "fractional",
    code: "ENG-04",
    name: "Fractional Engineering",
    summary:
      "Senior engineering capacity by the week for teams that need a strong hand on architecture, AI, or infrastructure — without a full-time hire.",
    idealFor: [
      "Startups without a technical co-founder",
      "Teams between senior hires",
      "Scale-ups needing an AI or platform specialist",
    ],
    deliverables: [
      "Weekly engineering hours",
      "Architecture and code review",
      "Direct implementation on critical paths",
    ],
    duration: "Rolling monthly",
    pricing: "Weekly capacity",
  },
  {
    slug: "consulting",
    code: "ENG-05",
    name: "Technical Consulting",
    summary:
      "Short, high-density engagements to unblock a decision — architecture review, technology selection, hiring plan, or system audit.",
    idealFor: [
      "CTOs facing a rebuild-or-refactor decision",
      "Founders scoping a new platform",
      "Teams evaluating a vendor or migration",
    ],
    deliverables: [
      "Written technical report",
      "Recommended architecture and stack",
      "Risk log and next-step plan",
    ],
    duration: "1–4 weeks",
    pricing: "Fixed scope",
  },
  {
    slug: "ai-strategy",
    code: "ENG-06",
    name: "AI Strategy & Implementation",
    summary:
      "End-to-end: identify the AI surfaces worth building, design them, build a validated prototype, then take the winners to production.",
    idealFor: [
      "Businesses new to shipping AI features",
      "Operations teams looking to automate knowledge work",
      "Product teams adding AI depth",
    ],
    deliverables: [
      "AI opportunity map",
      "Validated prototype on real data",
      "Production-ready implementation plan",
    ],
    duration: "4–12 weeks",
    pricing: "Fixed or capped T&M",
  },
  {
    slug: "modernization",
    code: "ENG-07",
    name: "Legacy System Modernization",
    summary:
      "Incremental replacement of aging systems — data first, contracts second, UI last — without stopping the business that depends on them.",
    idealFor: [
      "Established businesses on aging stacks",
      "Teams with a working system that no longer scales",
      "Migrations off costly vendors",
    ],
    deliverables: [
      "Strangler-pattern migration plan",
      "Incremental replacement in production",
      "Documentation and knowledge transfer",
    ],
    duration: "3–9 months",
    pricing: "Capped T&M",
  },
];
