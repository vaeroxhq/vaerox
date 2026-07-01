/**
 * Industries — the sectors VÆRØX builds software systems for. Each entry
 * describes the kinds of systems we design and build in that context, not
 * a client list.
 */
export type Industry = {
  slug: string;
  code: string;
  name: string;
  summary: string;
  systems: string[];
  relatedServices: string[]; // service slugs
  relatedProjects: string[]; // project slugs
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "fintech",
    code: "IND-01",
    name: "FinTech",
    summary:
      "Wealth, portfolio, quantitative research, and market-intelligence software with the reproducibility and auditability the domain requires.",
    systems: [
      "Portfolio and planning applications",
      "Walk-forward backtesting harnesses",
      "News, sentiment and market-signal pipelines",
      "Grounded LLM interfaces over structured financial data",
    ],
    relatedServices: ["financial-ai", "llm-applications", "backend-platforms", "rag-systems"],
    relatedProjects: ["vestra", "quantedge", "marketpulse"],
  },
  {
    slug: "healthcare",
    code: "IND-02",
    name: "Healthcare",
    summary:
      "Applied computer vision, clinical data tooling, and workflow software built with dataset hygiene and evaluation discipline at the center.",
    systems: [
      "Segmentation and classification pipelines on clinical imagery",
      "Annotation and reviewer tooling",
      "Evaluation harnesses per patient / device slice",
    ],
    relatedServices: ["computer-vision", "ml-systems", "data-engineering"],
    relatedProjects: [],
  },
  {
    slug: "cybersecurity",
    code: "IND-03",
    name: "Cybersecurity",
    summary:
      "DFIR triage automation, SIEM integrations, and AI-assisted analyst tooling with explicit human gates and full audit trails.",
    systems: [
      "Alert triage and correlation agents",
      "SIEM and EDR adapters",
      "Analyst review UIs with keyboard-first workflows",
    ],
    relatedServices: ["ai-agents", "workflow-automation", "internal-tools"],
    relatedProjects: ["aegis-ops"],
  },
  {
    slug: "manufacturing",
    code: "IND-04",
    name: "Manufacturing",
    summary:
      "Operational software, computer-vision QA, and simulation-backed planning tools for physical operations.",
    systems: [
      "Vision-based defect and part-inspection pipelines",
      "Digital twin simulations for lines and yards",
      "Operator dashboards and alerting",
    ],
    relatedServices: ["computer-vision", "ml-systems", "internal-tools", "data-engineering"],
    relatedProjects: ["supply-chain-twin"],
  },
  {
    slug: "supply-chain",
    code: "IND-05",
    name: "Supply Chain & Logistics",
    summary:
      "Network modeling, scenario simulation, and analytics platforms for planners running real inventory and flows.",
    systems: [
      "Discrete-event and network simulation models",
      "Ingestion and reconciliation pipelines",
      "Planner-facing dashboards and what-if tooling",
    ],
    relatedServices: ["data-engineering", "internal-tools", "backend-platforms"],
    relatedProjects: ["supply-chain-twin"],
  },
  {
    slug: "b2b-saas",
    code: "IND-06",
    name: "B2B SaaS",
    summary:
      "Full-stack product engineering for SaaS teams — MVPs, greenfield products, and second-version rewrites that need to scale.",
    systems: [
      "Multi-tenant backend platforms",
      "Product frontends with TanStack Start / React",
      "Billing, auth, and admin surfaces",
      "AI-native product features",
    ],
    relatedServices: ["saas-product", "backend-platforms", "frontend", "llm-applications"],
    relatedProjects: ["leadpulse", "cloudcostiq", "axiom"],
  },
  {
    slug: "cloud-devops",
    code: "IND-07",
    name: "Cloud & DevOps",
    summary:
      "FinOps, cost attribution, deployment pipelines, and platform tooling for teams running non-trivial cloud footprints.",
    systems: [
      "Cost attribution and unit-economics engines",
      "IaC, CI/CD and deployment tooling",
      "Observability and SLO instrumentation",
    ],
    relatedServices: ["cloud-infra", "devops", "data-engineering", "internal-tools"],
    relatedProjects: ["cloudcostiq"],
  },
  {
    slug: "professional-services",
    code: "IND-08",
    name: "Professional & Financial Services",
    summary:
      "Internal software, AI copilots, and workflow automation for firms whose product is knowledge work.",
    systems: [
      "Document extraction and drafting agents",
      "Review and approval workflows",
      "Internal knowledge-base RAG systems",
    ],
    relatedServices: ["ai-agents", "rag-systems", "workflow-automation", "internal-tools"],
    relatedProjects: ["leadpulse", "vestra"],
  },
  {
    slug: "motorsport-realtime",
    code: "IND-09",
    name: "Real-Time & Motorsport",
    summary:
      "Low-latency decision support and telemetry-driven tooling where every millisecond and every dropped packet matters.",
    systems: [
      "Telemetry ingestion and normalization",
      "Real-time strategy assistants",
      "Timing and race-state models",
    ],
    relatedServices: ["backend-platforms", "ml-systems", "llm-applications"],
    relatedProjects: ["pitwall-ai"],
  },
  {
    slug: "research-labs",
    code: "IND-10",
    name: "Research & Labs",
    summary:
      "Experiment infrastructure, evaluation harnesses, and reproducibility tooling for teams doing serious ML and AI research.",
    systems: [
      "Dataset versioning and annotation pipelines",
      "Evaluation and benchmarking harnesses",
      "Reproducibility-first training scaffolds",
    ],
    relatedServices: ["ml-systems", "data-engineering", "computer-vision"],
    relatedProjects: [],
  },
];
