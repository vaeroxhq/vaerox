/**
 * Work — the business-question index.
 *
 * Frames VÆRØX capability around the client's question ("Need an AI
 * support agent?", "Need to modernise a legacy backend?"), and maps each
 * question to the canonical projects, services, and industries that
 * demonstrate the answer.
 */

export type WorkQuestion = {
  code: string;
  question: string;
  answer: string;
  outcomes: string[];
  relatedServices: string[];    // service slugs
  relatedProjects: string[];    // project slugs
  industries: string[];
};

export const WORK_QUESTIONS: WorkQuestion[] = [
  {
    code: "W-01",
    question: "Need an AI agent that actually calls your systems?",
    answer:
      "Typed agents with real tool contracts, durable state, evaluation, and human review where it matters. Not a prompt in a text box.",
    outcomes: [
      "Working agent running against your APIs, with an evaluation harness that catches regressions before users do.",
      "Human-in-the-loop surface where the domain requires it.",
      "Runbook, observability, and a documented cost per session.",
    ],
    relatedServices: ["ai-agents", "mcp-development", "workflow-automation"],
    relatedProjects: ["vestra", "aegis-ops", "leadpulse"],
    industries: ["FinTech", "Cybersecurity", "B2B SaaS", "Professional Services"],
  },
  {
    code: "W-02",
    question: "Need to automate a workflow that eats your team's week?",
    answer:
      "Durable workflow runtime with typed steps, typed retries, and first-class approvals — not a brittle Zapier chain.",
    outcomes: [
      "A workflow that survives partial failure, replays cleanly, and produces an audit trail.",
      "Approval surfaces built where a human belongs in the loop.",
      "Observability into every step so failures are diagnosable, not just retryable.",
    ],
    relatedServices: ["workflow-automation", "business-automation", "internal-tools"],
    relatedProjects: ["axiom", "aegis-ops", "leadpulse"],
    industries: ["Professional Services", "B2B SaaS", "Manufacturing", "Retail"],
  },
  {
    code: "W-03",
    question: "Need to ship a SaaS MVP that will survive first customers?",
    answer:
      "Full-stack SaaS engineering — auth, billing, tenancy, admin — built to be extended, not thrown away.",
    outcomes: [
      "Multi-tenant application with billing wired to real usage.",
      "Design system and admin surface built to survive year two.",
      "Deployment pipeline and observability from day one.",
    ],
    relatedServices: ["saas-product", "full-stack-web", "custom-software", "frontend"],
    relatedProjects: ["leadpulse", "cloudcostiq", "vestra"],
    industries: ["B2B SaaS", "FinTech", "Healthcare"],
  },
  {
    code: "W-04",
    question: "Need an internal tool the ops team will actually use?",
    answer:
      "Keyboard-first, auditable internal software built for the people who use it every day — not for a demo.",
    outcomes: [
      "Custom operational surface built in the design loop with real users.",
      "Auth, permissions, and audit logging as first-class features.",
      "Documentation and handover so the tool outlasts the engagement.",
    ],
    relatedServices: ["internal-tools", "dashboards", "backend-platforms"],
    relatedProjects: ["leadpulse", "cloudcostiq", "aegis-ops"],
    industries: ["Professional Services", "Manufacturing", "Supply Chain", "Retail"],
  },
  {
    code: "W-05",
    question: "Need a dashboard that decision-makers actually trust?",
    answer:
      "Metrics defined before they're rendered. Every chart has a source query. Freshness is visible. Drilldowns end at a row.",
    outcomes: [
      "Analytics surface with query-defined metrics and visible source SQL.",
      "Drilldowns, freshness indicators, and exportable slices.",
      "Access control and audit — nothing exported without a trace.",
    ],
    relatedServices: ["dashboards", "data-engineering", "backend-platforms"],
    relatedProjects: ["cloudcostiq", "marketpulse", "supply-chain-twin"],
    industries: ["FinTech", "Retail", "Supply Chain", "B2B SaaS"],
  },
  {
    code: "W-06",
    question: "Need a FinTech prototype that clears an engineering review?",
    answer:
      "Reproducible research infrastructure, grounded LLM interfaces over structured data, and evaluation methodology that survives scrutiny.",
    outcomes: [
      "Walk-forward backtesting with reproducibility manifests.",
      "Grounded LLM interfaces that cite the underlying positions and rules.",
      "Documented methodology and limitations — nothing hidden.",
    ],
    relatedServices: ["financial-ai", "ml-systems", "backend-platforms"],
    relatedProjects: ["vestra", "quantedge", "marketpulse"],
    industries: ["FinTech"],
  },
  {
    code: "W-07",
    question: "Need to modernise a legacy backend without a rewrite gamble?",
    answer:
      "Incremental strangler-fig modernisation. New surface behind the old one. Data migration designed, not hoped for.",
    outcomes: [
      "Modern service replacing the risky surface first, integrated behind the existing product.",
      "Data migration path with reversible steps.",
      "Observability and rollback plan for every deployment.",
    ],
    relatedServices: ["custom-software", "backend-platforms", "devops", "cloud-infra"],
    relatedProjects: ["cloudcostiq", "aegis-ops", "leadpulse"],
    industries: ["B2B SaaS", "FinTech", "Manufacturing", "Healthcare"],
  },
  {
    code: "W-08",
    question: "Need computer vision that survives real-world distributions?",
    answer:
      "Versioned datasets, per-slice evaluation, and a documented failure gallery. Models that ship with fallbacks and known limits.",
    outcomes: [
      "Training and evaluation pipeline with per-slice metrics.",
      "Deployment path with ONNX or native inference.",
      "Documented failure modes and a fallback plan.",
    ],
    relatedServices: ["computer-vision", "ml-systems", "data-engineering"],
    relatedProjects: [],
    industries: ["Healthcare", "Manufacturing", "Retail"],
  },
  {
    code: "W-09",
    question: "Need cloud spend attributed, forecast, and explained?",
    answer:
      "Rule-based attribution that is auditable, forecasts that publish error bounds, and a dashboard your CFO can actually use.",
    outcomes: [
      "Attribution engine tracing every dollar to a rule.",
      "Per-service forecasts with quantile intervals.",
      "Dashboard with drilldown to the row that caused the number.",
    ],
    relatedServices: ["dashboards", "data-engineering", "cloud-infra"],
    relatedProjects: ["cloudcostiq"],
    industries: ["B2B SaaS", "FinTech", "Retail"],
  },
  {
    code: "W-10",
    question: "Need retrieval that actually retrieves the right thing?",
    answer:
      "Hybrid retrieval (BM25 + vector + rerank), chunking that respects document structure, and an evaluation set that catches regressions.",
    outcomes: [
      "Retrieval pipeline with measured recall and precision on your corpus.",
      "Chunking strategy documented and tunable.",
      "Evaluation harness that runs on every prompt or corpus change.",
    ],
    relatedServices: ["rag-systems", "llm-applications", "ai-agents"],
    relatedProjects: ["vestra", "marketpulse"],
    industries: ["Professional Services", "Healthcare", "B2B SaaS", "Education"],
  },
];
