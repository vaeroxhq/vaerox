/**
 * Service extras — the client-facing detail that turns a service page into
 * a real product surface: ideal clients, deliverables, typical timeline,
 * problems solved, and FAQs. Kept separate from the technical service
 * registry so both stay easy to maintain.
 *
 * Every service has a generic fallback; flagship services have specific
 * copy. The fallback is honest — it does not claim scope beyond what
 * VÆRØX actually delivers.
 */

export type ServiceExtras = {
  problemsSolved: string[];
  idealClients: string[];
  deliverables: string[];
  typicalTimeline: string;
  faqs: { q: string; a: string }[];
};

const GENERIC: ServiceExtras = {
  problemsSolved: [
    "Engineering capacity gap on a specific system or surface.",
    "An existing prototype that needs to become a real, documented product.",
    "A build the internal team could do — but not in the window available.",
  ],
  idealClients: [
    "Startups building a first serious version of the product.",
    "SMBs with real revenue and no in-house engineering studio.",
    "Enterprise innovation teams that need to move outside procurement cycles.",
  ],
  deliverables: [
    "Working software in a repository you own.",
    "Architecture documentation, ADRs, and a written handover.",
    "A deployment path and the operational glue to keep it running.",
  ],
  typicalTimeline:
    "4–12 weeks depending on surface. Scoping conversation → written proposal → build → handover.",
  faqs: [
    {
      q: "Can you start on an existing codebase?",
      a: "Yes — most engagements are additions to an existing system. The first week is spent reading and writing an assessment before any code changes.",
    },
    {
      q: "Do you provide ongoing maintenance?",
      a: "Yes, as a separate engagement. Fractional retainer for continued work; fixed-price for scoped follow-ups.",
    },
    {
      q: "How is the work priced?",
      a: "Fixed price for well-scoped work; capped time-and-materials for research-flavored engagements. The proposal makes the choice explicit.",
    },
  ],
};

const OVERRIDES: Record<string, Partial<ServiceExtras>> = {
  "ai-agents": {
    problemsSolved: [
      "Prompt-in-a-Python-script prototypes that need to become durable, testable agent systems.",
      "Agents that hallucinate because they call unstructured tools or read unstructured context.",
      "Teams that cannot ship LLM features because evaluation is ad-hoc and regressions are invisible.",
    ],
    idealClients: [
      "SaaS teams with a working LLM prototype that needs to survive production.",
      "Ops teams automating knowledge work where errors are expensive.",
      "Founders building an AI-native product surface with real users.",
    ],
    deliverables: [
      "Typed agent runtime with tool contracts and durable state.",
      "Evaluation harness with regression fixtures and cost tracking.",
      "Human-in-the-loop review surface where the domain requires it.",
      "Runbooks and observability for on-call.",
    ],
    typicalTimeline: "6–12 weeks for a first production agent. Prototype in weeks 1–2.",
    faqs: [
      {
        q: "Which model providers do you use?",
        a: "OpenAI, Anthropic, Gemini — chosen per capability and per cost, not per allegiance. Provider swap is designed in.",
      },
      {
        q: "Do you build on LangGraph or your own runtime?",
        a: "LangGraph where its graph model earns its keep; a smaller custom runtime where it doesn't. The choice is per-project.",
      },
      {
        q: "How do you handle evaluation?",
        a: "Every agent ships with a fixture set and a scoring harness before it ships with a UI. Regressions are visible in CI.",
      },
    ],
  },
  "workflow-automation": {
    problemsSolved: [
      "Multi-step business processes that live in fragile scripts and glue code.",
      "AI-assisted workflows that fail in partial, unreviewable ways.",
      "Approval flows that route through email because there's no tool for the shape of the process.",
    ],
    idealClients: [
      "Operations teams whose weekly work is repetitive knowledge work.",
      "SaaS platforms that need first-class background workflows.",
      "Companies replacing brittle Zapier / no-code chains.",
    ],
    deliverables: [
      "Durable workflow runtime with typed steps and typed retries.",
      "Approval surfaces where humans belong in the loop.",
      "Observability, replay, and step-level audit logging.",
    ],
    typicalTimeline: "4–10 weeks depending on step count and approval complexity.",
    faqs: [
      {
        q: "Temporal, Prefect, or something custom?",
        a: "Temporal-style semantics on the smallest runtime that fits — often embedded rather than a separate cluster.",
      },
      {
        q: "Can workflows call our existing APIs?",
        a: "Yes. Existing services are wrapped as typed steps; workflows never own business logic that already lives elsewhere.",
      },
    ],
  },
  "mcp-development": {
    problemsSolved: [
      "Internal systems that LLMs need to call, safely and auditably.",
      "Overly-broad API surfaces exposed to agents that then call the wrong thing.",
      "MCP integrations that lack authorisation, rate-limiting, and audit trails.",
    ],
    idealClients: [
      "Enterprises exposing internal capability to LLM-driven copilots.",
      "SaaS platforms building an official MCP surface for their product.",
      "Teams standardising agent access to internal tools.",
    ],
    deliverables: [
      "Typed MCP server with scoped capabilities and auth.",
      "Audit log of every capability invocation.",
      "Rate-limiting, quota, and abuse controls.",
    ],
    typicalTimeline: "3–8 weeks depending on capability surface size.",
    faqs: [
      {
        q: "Does the MCP server run on our infrastructure?",
        a: "Yes — the deliverable is a service you deploy. VÆRØX does not host your data path.",
      },
      {
        q: "Can we start with read-only capabilities?",
        a: "Recommended. Read-only surface first, write capabilities added once the audit and authorisation surface is in place.",
      },
    ],
  },
  "saas-product": {
    problemsSolved: [
      "Founders who have validated a wedge and need a real v1, not a Figma clickable.",
      "Existing products stuck between MVP hackery and a proper multi-tenant architecture.",
      "Teams that need auth, billing, tenancy, and admin to be right on day one.",
    ],
    idealClients: [
      "Pre-seed and seed startups with a clear ICP and design partners lined up.",
      "Post-PMF products rebuilding for enterprise tier.",
      "Founders replacing a no-code stack with something they own.",
    ],
    deliverables: [
      "Multi-tenant application with auth, billing, and audit built in.",
      "Design system and product frontend built to be extended.",
      "Deployment pipeline, environments, and observability.",
      "Handover documentation and a first-90-days runbook.",
    ],
    typicalTimeline: "8–16 weeks to a real v1. Working slice in weeks 3–4.",
    faqs: [
      {
        q: "Can you build against Lovable Cloud / Supabase / our own Postgres?",
        a: "All of the above. Data model and hosting are chosen per project, not per template.",
      },
      {
        q: "Do you handle billing integration?",
        a: "Yes — Stripe or Paddle, instrumented from day one so revenue and usage are visible in the admin surface.",
      },
    ],
  },
  dashboards: {
    problemsSolved: [
      "Executives making decisions from spreadsheets no one trusts.",
      "Operational teams with data everywhere and answers nowhere.",
      "Product surfaces that need embedded analytics for customers.",
    ],
    idealClients: [
      "SMBs with real operational data and no BI team.",
      "SaaS products embedding analytics for customers.",
      "FinOps, ops, and revenue teams that need daily decision surfaces.",
    ],
    deliverables: [
      "Query-defined metrics with visible source SQL.",
      "Freshness indicators, drilldowns to source rows, exportable slices.",
      "Access control, saved views, and audit logging.",
    ],
    typicalTimeline: "3–8 weeks. Working slice by week 2.",
    faqs: [
      {
        q: "DuckDB, Postgres, or a warehouse?",
        a: "Chosen per shape of data. DuckDB for research-scale, Postgres for operational, warehouses only where they earn their keep.",
      },
      {
        q: "Can we own the dashboards after handover?",
        a: "Yes — the entire stack is code in your repo. Nothing runs on VÆRØX infrastructure.",
      },
    ],
  },
  "computer-vision": {
    problemsSolved: [
      "Vision prototypes that work on demo data and collapse on real distributions.",
      "Datasets without versioning, evaluation without per-slice metrics.",
      "Models deployed without a failure gallery or fallback path.",
    ],
    idealClients: [
      "Healthcare, agriculture, manufacturing, and industrial-inspection teams.",
      "Product teams adding vision features to existing software.",
      "Research groups needing production-quality engineering around a working model.",
    ],
    deliverables: [
      "Versioned dataset pipeline with augmentation strategy documented.",
      "Training and evaluation harness with per-slice metrics and confusion matrices.",
      "Deployment pipeline (ONNX or native) with a documented failure gallery.",
    ],
    typicalTimeline: "6–14 weeks depending on data readiness.",
    faqs: [
      {
        q: "Can you work with our existing dataset?",
        a: "Yes. Assessment starts with a dataset audit — labels, distributions, and known biases — before any modelling.",
      },
      {
        q: "PyTorch or something else?",
        a: "PyTorch by default; ONNX for portability. Model choice follows the eval, not the fashion.",
      },
    ],
  },
};

export function getServiceExtras(slug: string): ServiceExtras {
  const o = OVERRIDES[slug] ?? {};
  return {
    problemsSolved: o.problemsSolved ?? GENERIC.problemsSolved,
    idealClients: o.idealClients ?? GENERIC.idealClients,
    deliverables: o.deliverables ?? GENERIC.deliverables,
    typicalTimeline: o.typicalTimeline ?? GENERIC.typicalTimeline,
    faqs: o.faqs ?? GENERIC.faqs,
  };
}
