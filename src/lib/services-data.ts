/**
 * Services registry — what VÆRØX actually builds for clients.
 *
 * Every service links back to the canonical VÆRØX corpus: related projects,
 * research notes, ADRs, and technologies. Nothing here is aspirational
 * marketing copy — every claim points to an artifact elsewhere on the site.
 */
export type Service = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  overview: string;
  approach: string;
  technologies: string[];
  relatedProjects: string[]; // system/project slugs
  relatedResearch: string[]; // research slugs
  relatedAdrs: string[]; // ADR numbers
  examples: string[]; // short bullet descriptions
};

export const SERVICES: Service[] = [
  {
    slug: "ai-agents",
    code: "SVC-01",
    name: "AI Agents",
    tagline: "Production-grade LLM agents with explicit tools, memory and evaluation.",
    overview:
      "Multi-step agent systems built on LangGraph and typed tool contracts, with deterministic replay, evaluation harnesses, and human-in-the-loop review. Agents are designed as software — not as prompts.",
    approach:
      "Every agent ships with an evaluation harness before it ships with a UI. Tools are strongly typed. State is durable. Failures are recorded, replayed, and fixed in code rather than in prompts.",
    technologies: ["Python", "LangGraph", "OpenAI", "Anthropic", "PostgreSQL", "Redis"],
    relatedProjects: ["vestra", "aegis-ops", "leadpulse"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Wealth-planning agent with grounded portfolio tools (VESTRA)",
      "DFIR triage agent with SIEM adapters (AEGIS OPS)",
      "Outreach drafting agent with reviewer loop (LeadPulse)",
    ],
  },
  {
    slug: "workflow-automation",
    code: "SVC-02",
    name: "Workflow Automation",
    tagline: "Durable orchestration for AI-assisted internal operations.",
    overview:
      "Long-running, replayable workflows that combine deterministic steps with LLM reasoning. Built on Temporal-style runtimes with explicit step contracts, retries, and observability.",
    approach:
      "Workflows are defined as code, not diagrams. Every step is idempotent, versioned, and independently testable. Human approvals are first-class steps.",
    technologies: ["TypeScript", "Temporal", "PostgreSQL", "Node", "Python"],
    relatedProjects: ["axiom", "aegis-ops"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Deterministic replay runtime for AI workflows (Axiom)",
      "Multi-step DFIR triage with analyst gates (AEGIS OPS)",
    ],
  },
  {
    slug: "mcp-development",
    code: "SVC-03",
    name: "MCP Development",
    tagline: "Model Context Protocol servers that expose your systems to LLMs safely.",
    overview:
      "Custom MCP servers that turn internal APIs, databases, and business logic into typed capabilities LLMs can call — with authorization, auditability, and rate-limiting built in.",
    approach:
      "Every capability is scoped, typed, and observable. Nothing is exposed to the model that the model shouldn't reach. Audit logs are non-optional.",
    technologies: ["TypeScript", "Python", "MCP SDK", "PostgreSQL"],
    relatedProjects: ["axiom", "vestra"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "MCP server exposing portfolio tools to planning agents",
      "MCP layer over internal workflow runtime",
    ],
  },
  {
    slug: "llm-applications",
    code: "SVC-04",
    name: "LLM Applications",
    tagline: "Custom software with LLMs where they earn their keep.",
    overview:
      "End-to-end product surfaces that combine LLMs with domain data — classification, extraction, drafting, summarization, grounded chat — with cost, latency, and quality tracked as first-class metrics.",
    approach:
      "Model choice is a variable, not a religion. Prompts are versioned and evaluated. Cost per successful call is measured. Fallbacks are designed.",
    technologies: ["Python", "TypeScript", "OpenAI", "Anthropic", "Gemini", "FastAPI"],
    relatedProjects: ["marketpulse", "leadpulse", "vestra"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "News classification and sentiment pipeline (MarketPulse)",
      "Portfolio Q&A grounded in structured accounts (VESTRA)",
    ],
  },
  {
    slug: "rag-systems",
    code: "SVC-05",
    name: "RAG Systems",
    tagline: "Retrieval pipelines that actually retrieve the right thing.",
    overview:
      "Hybrid retrieval (BM25 + vector + rerank), chunking that respects document structure, and evaluation harnesses that catch regressions before users do.",
    approach:
      "Retrieval quality is measured with retrieval metrics — not with vibes. Reranking is standard. Every corpus has an eval set.",
    technologies: ["Python", "PostgreSQL", "pgvector", "Redis", "OpenAI", "Anthropic"],
    relatedProjects: ["vestra", "marketpulse"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Hybrid retrieval over financial research notes",
      "Chunking pipelines for structured filings",
    ],
  },
  {
    slug: "backend-platforms",
    code: "SVC-06",
    name: "Backend Platforms",
    tagline: "Production-grade APIs, data models, and services.",
    overview:
      "FastAPI and Node services, PostgreSQL data models, background workers, and the operational glue — auth, migrations, observability — that keeps them running.",
    approach:
      "Data models are designed first. Migrations are reversible. Every service has a health check, a runbook, and a set of SLOs it aims for.",
    technologies: ["Python", "FastAPI", "Node", "PostgreSQL", "Redis", "Docker"],
    relatedProjects: ["vestra", "cloudcostiq", "aegis-ops", "leadpulse"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Portfolio ingestion and account APIs (VESTRA)",
      "Billing ingestion and attribution engine (CloudCostIQ)",
    ],
  },
  {
    slug: "internal-tools",
    code: "SVC-07",
    name: "Internal Business Software",
    tagline: "Custom operational software for the people running the business.",
    overview:
      "Dashboards, review tools, and admin surfaces built for internal operators — the software that never ships to end users but decides how the company runs.",
    approach:
      "The people who use the tool are in the design loop from day one. Keyboard-first. Auditable. Boring where it matters.",
    technologies: ["React", "TypeScript", "TanStack Start", "PostgreSQL", "Tailwind"],
    relatedProjects: ["leadpulse", "cloudcostiq", "aegis-ops"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Analyst review UI for outreach drafting (LeadPulse)",
      "FinOps attribution dashboard (CloudCostIQ)",
    ],
  },
  {
    slug: "computer-vision",
    code: "SVC-08",
    name: "Computer Vision",
    tagline: "Applied vision models with real evaluation.",
    overview:
      "Classification, segmentation, and detection pipelines with proper dataset hygiene, augmentation strategy, and evaluation across the distributions that matter.",
    approach:
      "Datasets are versioned. Evaluation is per-slice. Confusion matrices beat accuracy scores. Nothing is deployed without a failure-mode gallery.",
    technologies: ["Python", "PyTorch", "OpenCV", "ONNX"],
    relatedProjects: [],
    relatedResearch: ["cataract", "paddy", "wireseg", "cloth-geometry"],
    relatedAdrs: [],
    examples: ["Segmentation over LMOD-Cataract-1K", "Wire segmentation with WireSeg-36K"],
  },
  {
    slug: "financial-ai",
    code: "SVC-09",
    name: "Financial AI",
    tagline: "Quantitative research tooling and grounded financial software.",
    overview:
      "Walk-forward backtesting, factor research, risk decomposition, portfolio tooling, and LLM interfaces over structured financial data.",
    approach:
      "Reproducibility is the deliverable. Every backtest ships with its seed, its data window, and its assumptions.",
    technologies: ["Python", "DuckDB", "NumPy", "Pandas", "PyTorch", "PostgreSQL"],
    relatedProjects: ["vestra", "quantedge", "marketpulse"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Walk-forward backtest harness (QuantEdge AI)",
      "Portfolio ingestion and planning (VESTRA)",
    ],
  },
  {
    slug: "data-engineering",
    code: "SVC-10",
    name: "Data Engineering",
    tagline: "Ingestion, modeling, and analytics that hold up to real questions.",
    overview:
      "Batch and streaming ingestion, dimensional modeling, DuckDB and Postgres analytics stacks, and the schema discipline that makes downstream work possible.",
    approach:
      "Schemas are designed. Naming is boring on purpose. Backfills are planned before they're needed. Analytics is a product surface, not a spreadsheet.",
    technologies: ["Python", "DuckDB", "PostgreSQL", "dbt", "Redis"],
    relatedProjects: ["cloudcostiq", "marketpulse", "supply-chain-twin"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Billing export ingestion and attribution model (CloudCostIQ)",
      "News corpus ingestion pipeline (MarketPulse)",
    ],
  },
  {
    slug: "custom-software",
    code: "SVC-11",
    name: "Custom Software Development",
    tagline: "Bespoke software engineered end-to-end for a specific business problem.",
    overview:
      "Full-lifecycle custom software — discovery, architecture, build, deployment, documentation, maintenance — for teams whose problem doesn't fit an off-the-shelf product.",
    approach:
      "Requirements are written down. Architecture is drawn before code. The riskiest surface is prototyped first. Delivery is incremental and inspectable at every step.",
    technologies: ["TypeScript", "Python", "React", "PostgreSQL", "FastAPI", "Docker"],
    relatedProjects: ["vestra", "aegis-ops", "leadpulse", "cloudcostiq"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Greenfield product platforms",
      "Internal enterprise systems",
      "Second-version rewrites of aging software",
    ],
  },
  {
    slug: "saas-product",
    code: "SVC-12",
    name: "SaaS Product Development",
    tagline: "Multi-tenant products designed to scale from first customer to enterprise.",
    overview:
      "Full-stack SaaS engineering — auth, billing, tenancy, admin, product surfaces — with the platform work handled up front so the roadmap is about features, not firefighting.",
    approach:
      "Tenancy is a data-model decision, not a header. Billing is instrumented from day one. Admin and audit surfaces are first-class, not afterthoughts.",
    technologies: ["TypeScript", "React", "TanStack Start", "Node", "PostgreSQL", "Stripe"],
    relatedProjects: ["leadpulse", "cloudcostiq"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Vertical SaaS MVPs for founders",
      "Product v2 rebuilds after PMF",
      "Enterprise-tier features on existing SaaS",
    ],
  },
  {
    slug: "full-stack-web",
    code: "SVC-13",
    name: "Full-Stack Web Applications",
    tagline: "Modern web applications from database schema to interaction detail.",
    overview:
      "TanStack Start, React, TypeScript, PostgreSQL, and the operational glue that turns a prototype into a real application — auth, forms, files, background jobs, deployment.",
    approach:
      "The stack is boring on purpose. Rendering strategy matches the surface. Forms and validation are shared across client and server. Nothing is magical.",
    technologies: ["TypeScript", "React", "TanStack Start", "Tailwind", "PostgreSQL", "Node"],
    relatedProjects: ["leadpulse", "vestra", "cloudcostiq"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Customer-facing web applications",
      "Portal and admin surfaces",
      "Booking, review, and workflow apps",
    ],
  },
  {
    slug: "dashboards",
    code: "SVC-14",
    name: "Dashboards & Analytics",
    tagline: "Analytics surfaces built for the people who make decisions from them.",
    overview:
      "Executive dashboards, operational analytics, and embedded reporting powered by DuckDB, Postgres, and query engines chosen for the shape of the data — not for the shape of the demo.",
    approach:
      "Metrics are defined before they're rendered. Every chart has a source query. Freshness is visible. Drilldowns end at a row, not a mystery.",
    technologies: ["TypeScript", "React", "DuckDB", "PostgreSQL", "Python", "dbt"],
    relatedProjects: ["cloudcostiq", "marketpulse", "supply-chain-twin"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "FinOps and unit-economics dashboards",
      "Executive KPI surfaces",
      "Operational monitoring UIs",
    ],
  },
  {
    slug: "frontend",
    code: "SVC-15",
    name: "Frontend Development",
    tagline: "Design-system-grade frontends with real interaction and accessibility discipline.",
    overview:
      "React and TypeScript frontends built on a shared design system — tokens, primitives, accessibility, motion, and the interaction detail that separates a serious product from a template.",
    approach:
      "Design tokens live in code. Components are typed. Motion is restrained. Accessibility is checked, not assumed. Performance is measured on real devices.",
    technologies: ["TypeScript", "React", "TanStack Start", "Tailwind", "Motion"],
    relatedProjects: ["vestra", "leadpulse", "aegis-ops"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Design-system implementation",
      "Product frontend rebuilds",
      "Marketing sites that read as software",
    ],
  },
  {
    slug: "chatbots",
    code: "SVC-16",
    name: "AI Chatbots & Assistants",
    tagline: "Grounded conversational interfaces over your data and your systems.",
    overview:
      "Chatbots and assistants that call your APIs, read your documents, and enforce your business rules — with evaluation, guardrails, and audit logging as first-class features.",
    approach:
      "Every capability is scoped and typed. Retrieval is measured. Refusals and escalations are designed, not guessed. The bot is a product surface, not a demo.",
    technologies: ["TypeScript", "Python", "OpenAI", "Anthropic", "PostgreSQL", "pgvector"],
    relatedProjects: ["vestra", "leadpulse", "aegis-ops"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Internal knowledge-base assistants",
      "Customer-facing product chat",
      "Analyst copilots with human-in-the-loop review",
    ],
  },
  {
    slug: "ml-systems",
    code: "SVC-17",
    name: "Machine Learning Systems",
    tagline: "Applied ML with dataset hygiene, evaluation, and honest limits.",
    overview:
      "Classification, ranking, forecasting, and detection systems built with proper dataset versioning, per-slice evaluation, and deployment paths that survive contact with production traffic.",
    approach:
      "Datasets are versioned. Evaluation is per-slice. Baselines are honest. Every model has a fallback and a known failure gallery.",
    technologies: ["Python", "PyTorch", "scikit-learn", "ONNX", "DuckDB"],
    relatedProjects: ["marketpulse", "quantedge"],
    relatedResearch: ["cataract", "paddy", "wireseg"],
    relatedAdrs: [],
    examples: [
      "Ranking and classification models on structured data",
      "Time-series and forecasting pipelines",
      "Model deployment with evaluation harnesses",
    ],
  },
  {
    slug: "cloud-infra",
    code: "SVC-18",
    name: "Cloud Infrastructure",
    tagline: "Infrastructure as code, sized to your actual traffic and team.",
    overview:
      "AWS, Cloudflare, and container-based infrastructure defined in code — networking, secrets, storage, background workers, and deployment — sized for the traffic that exists, not the traffic on the pitch deck.",
    approach:
      "Everything in IaC. Environments identical up to configuration. Secrets never in code. Bills reviewed like code.",
    technologies: ["AWS", "Cloudflare", "Docker", "Terraform", "PostgreSQL", "Redis"],
    relatedProjects: ["cloudcostiq", "aegis-ops"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Greenfield cloud environments",
      "Migration from managed platforms to owned infra",
      "Cost and reliability audits",
    ],
  },
  {
    slug: "devops",
    code: "SVC-19",
    name: "DevOps & Deployment",
    tagline: "CI/CD, observability, and the boring pipes that keep software alive.",
    overview:
      "GitHub Actions pipelines, container deployments, health checks, logging, tracing, and the SLOs that make on-call survivable — set up so the team can ship weekly without heroics.",
    approach:
      "Pipelines are readable. Deployments are reversible. Every service has a health check and a runbook. Alerts point to a human action, not a graph.",
    technologies: ["Docker", "GitHub Actions", "AWS", "Cloudflare", "PostgreSQL"],
    relatedProjects: ["cloudcostiq", "aegis-ops", "leadpulse"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "CI/CD pipeline design",
      "Observability and SLO instrumentation",
      "Release process modernization",
    ],
  },
  {
    slug: "business-automation",
    code: "SVC-20",
    name: "Business Process Automation",
    tagline: "Automate the workflows that eat your operations team's week.",
    overview:
      "AI-assisted automation for repetitive knowledge work — intake, routing, extraction, drafting, approval — designed as durable workflows, not as brittle scripts.",
    approach:
      "Every step is idempotent and observable. Approvals are first-class. Nothing runs where a human should. The system explains what it did and why.",
    technologies: ["TypeScript", "Python", "Temporal", "PostgreSQL", "OpenAI", "Anthropic"],
    relatedProjects: ["axiom", "leadpulse", "aegis-ops"],
    relatedResearch: [],
    relatedAdrs: [],
    examples: [
      "Document intake and routing",
      "Approval and review workflows",
      "Back-office reconciliation and reporting",
    ],
  },
];

export function findService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
