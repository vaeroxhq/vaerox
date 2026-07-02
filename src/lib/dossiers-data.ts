/**
 * Project Dossiers — the long-form engineering documentation for each
 * canonical VÆRØX project. Modeled after mature product engineering
 * documentation. Every claim is either measured, marked as a design
 * target, or explicitly flagged as speculative future work.
 */

export type ProjectPhase =
  "Research" | "Architecture" | "Prototype" | "Building" | "Validation" | "Released" | "Archived";

export const PHASE_ORDER: ProjectPhase[] = [
  "Research",
  "Architecture",
  "Prototype",
  "Building",
  "Validation",
  "Released",
  "Archived",
];

export type LinkStatus = "Available" | "Coming Soon" | "Private";

export type ProjectLink = {
  label: "Repository" | "Documentation" | "Live Demo" | "Technical Report" | "Status";
  url?: string;
  status: LinkStatus;
  note?: string;
};

export type ArchComponent = { name: string; role: string; tech: string };
export type DecisionEntry = {
  title: string;
  chose: string;
  over: string;
  because: string;
  adr?: string;
};
export type MilestoneEntry = { at: string; title: string; detail: string; done: boolean };
export type ValidationEntry = {
  label: string;
  value: string;
  kind: "measured" | "target" | "methodology" | "limitation";
};
export type FutureWork = {
  title: string;
  detail: string;
  kind: "feature" | "challenge" | "research";
};

export type ProjectDossier = {
  slug: string;

  // 01. Executive Summary
  summary: {
    what: string;
    why: string;
    maturity: string;
    status: string;
  };

  // 02. Problem Statement
  problem: {
    statement: string;
    existingSolutions: string;
    constraints: string[];
  };

  // 03. System Architecture
  architecture: {
    highLevel: string;
    components: ArchComponent[];
    dataFlow: string;
    choices: string;
  };

  // 04. Technical Stack
  stack: {
    languages: string[];
    frameworks: string[];
    infrastructure: string[];
    models: string[]; // AI models actually used
    databases: string[];
    deployment: string;
  };

  // 05. Engineering Decisions
  decisions: DecisionEntry[];

  // 06. Development Timeline
  timeline: {
    milestones: MilestoneEntry[];
    currentPhase: ProjectPhase;
    nextMilestone: string;
    longTerm: string;
  };

  // 07. Validation
  validation: {
    entries: ValidationEntry[];
    methodology: string;
    limitations: string[];
  };

  // 08. Documentation (cross-references — free-form, resolved at render time)
  docs: {
    adrRefs: string[]; // ADR slugs
    journalRefs: string[]; // Journal slugs
    researchRefs: string[]; // Research slugs
    datasetRefs: string[]; // Dataset slugs
    apiRefs: string[]; // API slugs
    diagramRefs: string[]; // Architecture diagram slugs
    validationRefs: string[]; // Benchmark slugs
  };

  // 09. Future Work
  future: FutureWork[];

  // Technology badges (subset actually used)
  badges: string[];

  // Progress checklist across phases
  progress: Record<ProjectPhase, "done" | "active" | "planned">;

  // GitHub / links
  links: ProjectLink[];
};

// -------------------------------------------------------------------------
// Helper — default all-coming-soon links
// -------------------------------------------------------------------------
const csLinks = (opts?: Partial<Record<ProjectLink["label"], LinkStatus>>): ProjectLink[] => {
  const base: ProjectLink["label"][] = [
    "Repository",
    "Documentation",
    "Live Demo",
    "Technical Report",
    "Status",
  ];
  return base.map((label) => ({ label, status: opts?.[label] ?? "Coming Soon" }));
};

const phaseChecklist = (
  active: ProjectPhase,
): Record<ProjectPhase, "done" | "active" | "planned"> => {
  const out = {} as Record<ProjectPhase, "done" | "active" | "planned">;
  const activeIdx = PHASE_ORDER.indexOf(active);
  PHASE_ORDER.forEach((p, i) => {
    if (p === "Archived") {
      out[p] = active === "Archived" ? "active" : "planned";
      return;
    }
    out[p] = i < activeIdx ? "done" : i === activeIdx ? "active" : "planned";
  });
  return out;
};

// =========================================================================
// DOSSIERS
// =========================================================================

export const DOSSIERS: Record<string, ProjectDossier> = {
  // ---------------------------------------------------------------------
  vestra: {
    slug: "vestra",
    summary: {
      what: "VESTRA is an AI-native wealth operating system: portfolio ingestion, goal planning, and grounded conversational agents that reason over an individual's real financial state.",
      why: "Traditional wealth tools present dashboards; households need a system that reasons about goals, constraints, and trade-offs and explains its recommendations.",
      maturity:
        "Building — end-to-end prototype running against synthetic accounts; live integrations designed but not wired.",
      status:
        "Active development. Portfolio ingestion, plan graph, and conversational agent flow reproducible against seed data.",
    },
    problem: {
      statement:
        "Wealth planning software is either broker-native (locked to one custodian, no reasoning) or spreadsheet-based (flexible but unreasoning). Neither closes the loop between goals, constraints, and daily decisions.",
      existingSolutions:
        "Personal finance dashboards (Mint-class) aggregate but do not plan. Advisor-facing planning software (eMoney, RightCapital) plans but is not conversational and not accessible without an advisor. LLM chat products lack grounded portfolio state.",
      constraints: [
        "All reasoning must be grounded in the user's real portfolio state — never hallucinated numbers.",
        "Every agent recommendation must cite the underlying positions, assumptions, and rule that generated it.",
        "Costs per session must be bounded — an ambient assistant cannot burn LLM tokens on every keystroke.",
        "Local-first for sensitive data where feasible; server-side only for reasoning that requires it.",
      ],
    },
    architecture: {
      highLevel:
        "FastAPI service orchestrates a LangGraph agent runtime over a Postgres portfolio store. A React web client renders the plan graph and mediates conversational turns.",
      components: [
        {
          name: "Ingestion service",
          role: "Normalizes broker exports and manual entries into a canonical position schema.",
          tech: "Python · FastAPI · Pydantic",
        },
        {
          name: "Plan graph store",
          role: "Represents goals, constraints, and derived recommendations as a typed graph.",
          tech: "PostgreSQL · SQLAlchemy",
        },
        {
          name: "Agent runtime",
          role: "LangGraph workflow that grounds every response in the current plan graph.",
          tech: "Python · LangGraph · OpenAI · Anthropic",
        },
        {
          name: "Web client",
          role: "Renders the plan graph and mediates chat turns with streaming responses.",
          tech: "React · TypeScript · Vite",
        },
      ],
      dataFlow:
        "Client turn → FastAPI → agent runtime pulls the relevant plan graph slice → LLM call with grounded context → structured response persisted → streamed back to the client with citations.",
      choices:
        "FastAPI + Python for LLM tooling ecosystem parity; Postgres over a graph DB because the plan graph is small and relational queries dominate; LangGraph over an ad-hoc state machine because agent branches proliferate quickly.",
    },
    stack: {
      languages: ["Python", "TypeScript"],
      frameworks: ["FastAPI", "LangGraph", "React", "Vite"],
      infrastructure: ["Docker", "Redis (cache)"],
      models: ["OpenAI (GPT-class)", "Anthropic (Claude-class)"],
      databases: ["PostgreSQL"],
      deployment:
        "Containerized service + static client. Target: single-tenant deployment per household or lab environment.",
    },
    decisions: [
      {
        title: "Ground every LLM call in the plan graph",
        chose: "Retrieve-then-reason with typed plan slices",
        over: "Free-form RAG over documents",
        because:
          "Portfolios are structured; typed retrieval eliminates a whole class of hallucination.",
        adr: "adr-0007",
      },
      {
        title: "LangGraph over hand-rolled state machine",
        chose: "LangGraph",
        over: "Custom workflow layer",
        because:
          "Branch explosion in wealth-planning agents makes explicit graph tooling worthwhile.",
        adr: "adr-0004",
      },
      {
        title: "Postgres over Neo4j for the plan graph",
        chose: "PostgreSQL",
        over: "Neo4j",
        because: "The graph is bounded (hundreds of nodes) and relational queries dominate.",
        adr: "adr-0002",
      },
    ],
    timeline: {
      milestones: [
        {
          at: "2025-11",
          title: "Ingestion schema",
          detail: "Canonical position and account schema; broker export parsers.",
          done: true,
        },
        {
          at: "2026-01",
          title: "Plan graph v1",
          detail: "Typed goal/constraint graph with query API.",
          done: true,
        },
        {
          at: "2026-03",
          title: "Agent runtime v1",
          detail: "LangGraph workflow with grounded retrieval and citation.",
          done: true,
        },
        {
          at: "2026-06",
          title: "End-to-end demo",
          detail: "Conversational plan review against synthetic households.",
          done: true,
        },
        {
          at: "2026-Q3",
          title: "Live broker integration",
          detail: "First read-only broker connector with reconciliation.",
          done: false,
        },
        {
          at: "2026-Q4",
          title: "Multi-account households",
          detail: "Cross-account plan reasoning and joint goal solvers.",
          done: false,
        },
      ],
      currentPhase: "Building",
      nextMilestone: "Read-only broker integration with automatic reconciliation.",
      longTerm:
        "Household-level ambient assistant grounded in a live plan graph, with pluggable optimizers.",
    },
    validation: {
      entries: [
        { label: "Grounded-response rate (synthetic)", value: "Target ≥ 98%", kind: "target" },
        { label: "Median turn latency", value: "Target < 2.5s p50", kind: "target" },
        { label: "Cost per session", value: "Target < $0.15 (cached retrieval)", kind: "target" },
        {
          label: "Plan graph correctness",
          value: "Property tests over synthetic households",
          kind: "methodology",
        },
      ],
      methodology:
        "Synthetic household fixtures cover the goal/constraint matrix. Agent outputs are scored for grounding (must cite a plan-graph node), correctness (recommendation matches rule), and cost (tokens per session).",
      limitations: [
        "No live broker data path yet — evaluation is against synthetic households.",
        "Optimizer library is intentionally narrow; complex tax scenarios are out of scope for v1.",
      ],
    },
    docs: {
      adrRefs: ["adr-0002", "adr-0004", "adr-0007"],
      journalRefs: [],
      researchRefs: [],
      datasetRefs: [],
      apiRefs: [],
      diagramRefs: [],
      validationRefs: [],
    },
    future: [
      {
        title: "Live broker integrations",
        detail: "Read-only connectors with reconciliation to the plan graph.",
        kind: "feature",
      },
      {
        title: "Household solver",
        detail: "Joint optimization across account owners with shared goals.",
        kind: "feature",
      },
      {
        title: "Grounding evaluation harness",
        detail: "Automated scoring of citation quality on new household fixtures.",
        kind: "research",
      },
      {
        title: "Cost budget governor",
        detail: "Per-session token budget with graceful degradation.",
        kind: "challenge",
      },
    ],
    badges: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "LangGraph",
      "React",
      "TypeScript",
      "OpenAI",
      "Anthropic",
      "Redis",
      "Docker",
    ],
    progress: phaseChecklist("Building"),
    links: csLinks(),
  },

  // ---------------------------------------------------------------------
  quantedge: {
    slug: "quantedge",
    summary: {
      what: "QuantEdge AI is a reproducible quantitative research platform — walk-forward backtests, factor models, and risk decomposition over multi-year equity data.",
      why: "Most retail quant tooling either hides methodology or ships silently biased evaluation (look-ahead, survivorship). Research demands explicit methodology and honest error bars.",
      maturity:
        "Building — walk-forward runner and factor library operational; strategy DSL iterating.",
      status:
        "Not a live trading engine and not intended to be one. Research and evaluation infrastructure only.",
    },
    problem: {
      statement:
        "Quantitative research needs point-in-time data, walk-forward evaluation, and reproducible experiment records. Consumer backtesters ship with hidden look-ahead bias and irreproducible parameter searches.",
      existingSolutions:
        "Zipline / QuantConnect are opinionated frameworks tied to specific data models. Custom notebooks lose reproducibility. Academic packages assume a research context users lack.",
      constraints: [
        "All evaluations must be walk-forward; no look-ahead permitted by construction.",
        "Every backtest must be reproducible from a strategy definition + data snapshot hash.",
        "Analytics core must handle multi-year daily equity data on a laptop.",
        "Strategy DSL must express factor strategies without falling back to imperative Python.",
      ],
    },
    architecture: {
      highLevel:
        "DuckDB analytics core over point-in-time data; a small strategy DSL defines factors and portfolios; a walk-forward runner executes evaluations and persists results.",
      components: [
        {
          name: "Data core",
          role: "Point-in-time equity, fundamentals, and factor exposures in columnar storage.",
          tech: "DuckDB · Parquet",
        },
        {
          name: "Strategy DSL",
          role: "Declarative factor and portfolio definitions with lint-time checks.",
          tech: "Python · Pydantic",
        },
        {
          name: "Walk-forward runner",
          role: "Executes evaluations, records methodology, and hashes inputs.",
          tech: "Python · NumPy · Pandas",
        },
        {
          name: "Notebook interface",
          role: "Interactive analysis surface with reproducible experiment records.",
          tech: "Jupyter · Plotly",
        },
      ],
      dataFlow:
        "Strategy definition → runner materializes point-in-time slices from DuckDB → walk-forward loop produces per-fold results → results and input hash persisted → notebook renders diagnostics.",
      choices:
        "DuckDB over a hosted warehouse because analytics fit on a laptop; a small DSL over an ORM because factor expressions are the primary artifact; Pandas for the last-mile transform where readability wins.",
    },
    stack: {
      languages: ["Python"],
      frameworks: ["Pandas", "NumPy"],
      infrastructure: ["DuckDB", "Parquet"],
      models: ["PyTorch (factor learning, experimental)"],
      databases: ["DuckDB"],
      deployment:
        "Local-first. Runner is a CLI; results archive is a directory of Parquet + JSON manifests.",
    },
    decisions: [
      {
        title: "DuckDB over a hosted warehouse",
        chose: "DuckDB",
        over: "BigQuery / Snowflake",
        because: "Datasets fit on a laptop and iteration speed dominates.",
        adr: "adr-0003",
      },
      {
        title: "Walk-forward by construction",
        chose: "Runner refuses non-walk-forward evaluations",
        over: "Convention-only enforcement",
        because: "Look-ahead bias is the most common silent failure in retail backtesting.",
        adr: "adr-0006",
      },
      {
        title: "Strategy DSL over free-form Python",
        chose: "Declarative DSL",
        over: "Imperative callbacks",
        because:
          "Factor definitions are the artifact users iterate on; a DSL enables lint-time checks and reproducibility.",
        adr: "adr-0008",
      },
    ],
    timeline: {
      milestones: [
        {
          at: "2025-09",
          title: "Data core",
          detail: "Point-in-time daily equity data loaded into DuckDB with schema tests.",
          done: true,
        },
        {
          at: "2025-11",
          title: "Walk-forward runner v1",
          detail: "Runner with input hashing and per-fold result persistence.",
          done: true,
        },
        {
          at: "2026-02",
          title: "Factor library v1",
          detail: "Value, momentum, and quality factor definitions with unit tests.",
          done: true,
        },
        {
          at: "2026-05",
          title: "Risk decomposition",
          detail: "Factor-model risk attribution over multi-year windows.",
          done: true,
        },
        {
          at: "2026-Q3",
          title: "Strategy DSL v2",
          detail: "Constraint-based portfolio construction with turnover controls.",
          done: false,
        },
        {
          at: "2026-Q4",
          title: "Cost model",
          detail: "Transaction-cost model integrated into evaluation.",
          done: false,
        },
      ],
      currentPhase: "Building",
      nextMilestone: "Strategy DSL v2 with constraint-based portfolio construction.",
      longTerm:
        "Reference research platform for factor strategies with reproducibility guarantees the retail ecosystem lacks.",
    },
    validation: {
      entries: [
        {
          label: "Walk-forward evaluation window",
          value: "Rolling 3y train / 1y test, monthly rebalance",
          kind: "methodology",
        },
        {
          label: "Sharpe methodology",
          value: "Annualized, excess of risk-free, per-fold reported",
          kind: "methodology",
        },
        {
          label: "Reproducibility check",
          value: "Runner rejects strategy definitions that reference future data",
          kind: "measured",
        },
        {
          label: "Factor library coverage",
          value: "Value / momentum / quality with unit tests on synthetic returns",
          kind: "measured",
        },
      ],
      methodology:
        "Every evaluation is a walk-forward loop with explicit train/test windows. Runner hashes strategy definition, data snapshot, and code version so any result can be reproduced.",
      limitations: [
        "No transaction-cost model in v1 — reported Sharpe is gross of costs.",
        "Equity-only; no futures or FX cross-asset backtesting.",
      ],
    },
    docs: {
      adrRefs: ["adr-0003", "adr-0006", "adr-0008"],
      journalRefs: [],
      researchRefs: [],
      datasetRefs: [],
      apiRefs: [],
      diagramRefs: [],
      validationRefs: [],
    },
    future: [
      {
        title: "Transaction-cost model",
        detail: "Broker-specific cost model integrated into evaluation.",
        kind: "feature",
      },
      {
        title: "Cross-asset support",
        detail: "Futures and FX with per-asset-class evaluation semantics.",
        kind: "feature",
      },
      {
        title: "Bayesian factor learning",
        detail: "Move from OLS factor exposures to hierarchical Bayesian estimation.",
        kind: "research",
      },
      {
        title: "Reproducibility across dependency drift",
        detail: "Guarantee bit-identical results across NumPy / DuckDB versions.",
        kind: "challenge",
      },
    ],
    badges: ["Python", "DuckDB", "NumPy", "Pandas", "PyTorch", "Parquet", "Jupyter"],
    progress: phaseChecklist("Building"),
    links: csLinks(),
  },

  // ---------------------------------------------------------------------
  marketpulse: {
    slug: "marketpulse",
    summary: {
      what: "MarketPulse ingests financial news and classifies it into typed events (earnings, guidance, macro, M&A) with explicit prompt-evaluation methodology.",
      why: "Sentiment tools ship black-box scores; research needs typed events with per-prompt accuracy and cost tracked as first-class metrics.",
      maturity:
        "Prototype — classification pipeline running against a rolling news corpus; evaluation harness operational.",
      status:
        "Active prototype. Not connected to live trading; used as a research corpus source for downstream projects.",
    },
    problem: {
      statement:
        "Off-the-shelf sentiment scores are opaque and unstable across releases. Research use needs typed events, calibrated confidence, and reproducible prompts.",
      existingSolutions:
        "Commercial NLP providers score sentiment as a scalar without event typing. Vanilla LLM calls per-headline are cost-prohibitive and drift silently between model versions.",
      constraints: [
        "Every classification must be typed against a documented schema, not a scalar score.",
        "Per-prompt accuracy and cost must be tracked in a validation record.",
        "Ingestion must handle bursty news volume without unbounded LLM cost.",
        "Prompt changes require re-evaluation on a held-out labeled set before promotion.",
      ],
    },
    architecture: {
      highLevel:
        "Ingestion workers pull from configured news feeds, dedupe, and enqueue classification jobs. A classification pipeline runs typed prompts and writes results into a sentiment store.",
      components: [
        {
          name: "Ingestion workers",
          role: "Poll feeds, dedupe, normalize into a canonical article schema.",
          tech: "Python · FastAPI · Redis",
        },
        {
          name: "Classification pipeline",
          role: "Runs typed prompts and captures per-item cost and confidence.",
          tech: "Python · OpenAI",
        },
        {
          name: "Sentiment store",
          role: "Persists typed events with citations back to source articles.",
          tech: "PostgreSQL",
        },
        {
          name: "Evaluation harness",
          role: "Runs prompt versions against a labeled held-out set and reports drift.",
          tech: "Python · Pandas",
        },
      ],
      dataFlow:
        "Feed poll → dedupe → article stored → classification job enqueued → typed event written with citation → evaluation harness periodically re-scores held-out set.",
      choices:
        "OpenAI as the initial classifier for schema-fidelity on typed outputs; Postgres for the sentiment store because queries are relational; explicit evaluation harness because prompt drift is otherwise invisible.",
    },
    stack: {
      languages: ["Python"],
      frameworks: ["FastAPI", "Pydantic"],
      infrastructure: ["Redis", "Docker"],
      models: ["OpenAI (GPT-class)"],
      databases: ["PostgreSQL"],
      deployment: "Containerized workers behind a small API. Evaluation harness runs on demand.",
    },
    decisions: [
      {
        title: "Typed events over sentiment scores",
        chose: "Typed schema",
        over: "Scalar sentiment",
        because: "Research consumers need to filter by event type; scalars discard information.",
        adr: "adr-0005",
      },
      {
        title: "Held-out evaluation set",
        chose: "Explicit labeled corpus",
        over: "Ad-hoc spot checks",
        because: "Prompt changes silently regress accuracy without a fixed evaluation set.",
        adr: "adr-0009",
      },
      {
        title: "OpenAI for classification v1",
        chose: "OpenAI",
        over: "Local model",
        because: "Schema-fidelity on structured outputs was decisive; migration path documented.",
        adr: "adr-0001",
      },
    ],
    timeline: {
      milestones: [
        {
          at: "2025-10",
          title: "Ingestion v1",
          detail: "Feed polling, dedupe, canonical article schema.",
          done: true,
        },
        {
          at: "2025-12",
          title: "Classification pipeline",
          detail: "Typed prompts and per-item cost tracking.",
          done: true,
        },
        {
          at: "2026-03",
          title: "Evaluation harness",
          detail: "Held-out labeled set with per-prompt accuracy and drift reports.",
          done: true,
        },
        {
          at: "2026-Q3",
          title: "Local classifier fallback",
          detail: "Local model for high-volume classes to bound cost.",
          done: false,
        },
        {
          at: "2026-Q4",
          title: "Cross-source resolution",
          detail: "Resolve the same event across multiple publishers.",
          done: false,
        },
      ],
      currentPhase: "Prototype",
      nextMilestone: "Local classifier fallback for high-volume event classes.",
      longTerm:
        "A research corpus of typed financial events with published accuracy and cost per class.",
    },
    validation: {
      entries: [
        {
          label: "Labeled evaluation set size",
          value: "~2k articles across event classes",
          kind: "measured",
        },
        {
          label: "Per-prompt cost",
          value: "Tracked per classification, reported per event class",
          kind: "methodology",
        },
        { label: "Accuracy target — earnings class", value: "Target ≥ 92%", kind: "target" },
        {
          label: "Drift alerting",
          value: "Held-out re-run on every prompt change",
          kind: "methodology",
        },
      ],
      methodology:
        "Prompt versions are evaluated against a held-out labeled set. Accuracy, per-class recall, and cost are recorded per prompt version. No prompt promotes without a passing evaluation.",
      limitations: [
        "Labeled set is single-annotator; inter-rater reliability not yet measured.",
        "English-language only; multi-lingual is future work.",
      ],
    },
    docs: {
      adrRefs: ["adr-0001", "adr-0005", "adr-0009"],
      journalRefs: [],
      researchRefs: [],
      datasetRefs: [],
      apiRefs: [],
      diagramRefs: [],
      validationRefs: [],
    },
    future: [
      {
        title: "Local classifier fallback",
        detail: "Cost-bounded local model for high-volume classes.",
        kind: "feature",
      },
      {
        title: "Cross-source event resolution",
        detail: "Resolve the same event across publishers into a single typed record.",
        kind: "feature",
      },
      {
        title: "Inter-rater reliability",
        detail: "Second annotator on a subset of the labeled corpus.",
        kind: "research",
      },
      {
        title: "Prompt drift across model versions",
        detail: "Systematically measure accuracy change across upstream model releases.",
        kind: "challenge",
      },
    ],
    badges: ["Python", "FastAPI", "PostgreSQL", "OpenAI", "Redis", "Docker", "Pydantic"],
    progress: phaseChecklist("Prototype"),
    links: csLinks(),
  },

  // ---------------------------------------------------------------------
  "aegis-ops": {
    slug: "aegis-ops",
    summary: {
      what: "AEGIS OPS is a security and DFIR workflow platform — triage, threat intel enrichment, and fraud scoring composed as LangGraph agents over SIEM data.",
      why: "Security analysts drown in alert volume; a workflow layer that composes triage, enrichment, and scoring as reviewable graphs is more transparent than end-to-end model outputs.",
      maturity:
        "Building — triage workflow prototype running against synthetic SIEM traces; fraud-scoring pipeline in evaluation.",
      status: "Active build. Not deployed against production security infrastructure.",
    },
    problem: {
      statement:
        "SOC teams face high alert volume with low base rates. Existing SIEM automation is either brittle rule-based playbooks or opaque ML classifiers with no reasoning trace.",
      existingSolutions:
        "SOAR platforms encode rigid playbooks. Vendor ML classifiers are black-box. In-house LLM prompting on alert text lacks the enrichment and evidence-collection steps analysts actually perform.",
      constraints: [
        "Every workflow step must produce a reviewable artifact — no hidden reasoning.",
        "Triage must run against synthetic SIEM traces before touching real telemetry.",
        "Latency budget per alert must be bounded for high-volume ingestion.",
        "Fraud-scoring evaluation must use a labeled dataset with class imbalance made explicit.",
      ],
    },
    architecture: {
      highLevel:
        "SIEM adapters normalize events into a canonical alert schema. A LangGraph workflow layer composes triage, enrichment, and scoring steps. An alert store persists results and analyst reviews.",
      components: [
        {
          name: "SIEM adapters",
          role: "Normalize events from configured SIEM sources.",
          tech: "Python · Pydantic",
        },
        {
          name: "Workflow layer",
          role: "LangGraph workflows for triage, enrichment, and scoring.",
          tech: "Python · LangGraph · OpenAI",
        },
        {
          name: "Alert store",
          role: "Alerts, workflow artifacts, and analyst decisions.",
          tech: "PostgreSQL · OpenSearch",
        },
        {
          name: "Analyst UI",
          role: "Review workflow output, override decisions, and label training data.",
          tech: "React · TypeScript",
        },
      ],
      dataFlow:
        "SIEM event → adapter normalizes → triage workflow → enrichment (threat intel lookup, historical context) → scoring → analyst review → decision persisted → feedback loop into scoring.",
      choices:
        "LangGraph for workflow explicitness; OpenSearch for alert search because analysts need it; Postgres for structured state; no vendor SOAR lock-in.",
    },
    stack: {
      languages: ["Python", "TypeScript"],
      frameworks: ["LangGraph", "FastAPI", "React"],
      infrastructure: ["Docker", "OpenSearch"],
      models: ["OpenAI", "Anthropic"],
      databases: ["PostgreSQL", "OpenSearch"],
      deployment:
        "Containerized service; single-tenant deployment intended for a lab or research SOC.",
    },
    decisions: [
      {
        title: "Workflow-as-graph over end-to-end model",
        chose: "LangGraph workflows",
        over: "Single-model classifier",
        because:
          "Analysts must review each reasoning step; monolithic classifiers cannot expose intermediate artifacts.",
        adr: "adr-0004",
      },
      {
        title: "OpenSearch for alert search",
        chose: "OpenSearch",
        over: "Postgres full-text only",
        because: "Analyst workflows depend on fast full-text search over a large alert history.",
        adr: "adr-0010",
      },
    ],
    timeline: {
      milestones: [
        {
          at: "2026-01",
          title: "SIEM adapter v1",
          detail: "Canonical alert schema and one adapter implementation.",
          done: true,
        },
        {
          at: "2026-03",
          title: "Triage workflow",
          detail: "LangGraph triage workflow running against synthetic traces.",
          done: true,
        },
        {
          at: "2026-05",
          title: "Enrichment layer",
          detail: "Threat intel lookup and historical context.",
          done: true,
        },
        {
          at: "2026-Q3",
          title: "Fraud-scoring v1",
          detail: "Scoring pipeline evaluated on a labeled dataset.",
          done: false,
        },
        {
          at: "2026-Q4",
          title: "Analyst UI v1",
          detail: "Review, override, and labeling surface.",
          done: false,
        },
      ],
      currentPhase: "Building",
      nextMilestone: "Fraud-scoring v1 evaluated on labeled data with imbalance-aware metrics.",
      longTerm:
        "Composable, reviewable SOC workflow platform — an alternative to opaque vendor automation.",
    },
    validation: {
      entries: [
        { label: "Triage workflow latency", value: "Target < 5s per alert (p50)", kind: "target" },
        {
          label: "Fraud-scoring AUC",
          value: "Target reported per class with imbalance ratio",
          kind: "target",
        },
        {
          label: "Reviewable step coverage",
          value: "100% — every workflow step emits an artifact",
          kind: "measured",
        },
      ],
      methodology:
        "Synthetic SIEM traces cover core alert types. Scoring evaluation uses a labeled dataset with explicit class imbalance; metrics reported per class, not as aggregate accuracy.",
      limitations: [
        "Synthetic traces do not capture real adversarial distributions.",
        "Threat intel enrichment currently mocks external providers.",
      ],
    },
    docs: {
      adrRefs: ["adr-0004", "adr-0010"],
      journalRefs: [],
      researchRefs: [],
      datasetRefs: [],
      apiRefs: [],
      diagramRefs: [],
      validationRefs: [],
    },
    future: [
      {
        title: "Real threat intel connectors",
        detail: "Connect enrichment to real threat-intel APIs with rate-limiting.",
        kind: "feature",
      },
      {
        title: "Analyst feedback loop",
        detail: "Feed analyst decisions into scoring model.",
        kind: "feature",
      },
      {
        title: "Adversarial evaluation",
        detail: "Move from synthetic to adversarial evaluation traces.",
        kind: "research",
      },
      {
        title: "Multi-tenant deployment model",
        detail: "Isolation and per-tenant workflow customization.",
        kind: "challenge",
      },
    ],
    badges: [
      "Python",
      "LangGraph",
      "PostgreSQL",
      "OpenSearch",
      "FastAPI",
      "React",
      "TypeScript",
      "OpenAI",
      "Anthropic",
      "Docker",
    ],
    progress: phaseChecklist("Building"),
    links: csLinks(),
  },

  // ---------------------------------------------------------------------
  leadpulse: {
    slug: "leadpulse",
    summary: {
      what: "LeadPulse is a revenue intelligence prototype — lead qualification, account signals, and LLM-drafted outreach with mandatory human review.",
      why: "Sales-tech ships either dumb form-scorers or unreviewable auto-outreach. Research needs a system where scoring is transparent and drafts are reviewable, not shipped autonomously.",
      maturity:
        "Prototype — scoring against synthetic pipelines and drafting evaluation methodology published.",
      status: "Active prototype. No production outreach; every draft passes a human review.",
    },
    problem: {
      statement:
        "Revenue teams need signal-based qualification, but AI-drafted outreach without review damages brand and inbox reputation. A prototype needs to separate scoring from sending, with review as a hard gate.",
      existingSolutions:
        "CRM lead-scoring plugins use hand-tuned point systems. AI-outreach tools blast unreviewed content. Neither exposes the reasoning behind a score or draft.",
      constraints: [
        "Every score must expose the signal breakdown that produced it.",
        "Every draft must pass a human review before it can be sent — no autonomous send.",
        "Signals must be pulled from actually available sources; no fabricated firmographics.",
        "Evaluation must include draft-quality scoring, not just click-through fantasy.",
      ],
    },
    architecture: {
      highLevel:
        "Signal ingestion pulls account and lead signals from configured sources. A scoring service produces transparent per-lead scores. A drafting agent produces outreach candidates; a review UI is a mandatory gate.",
      components: [
        {
          name: "Signal ingestion",
          role: "Pulls firmographic and behavioral signals into a canonical account schema.",
          tech: "Python · FastAPI",
        },
        {
          name: "Scoring service",
          role: "Produces per-lead scores with a signal-level breakdown.",
          tech: "Python · scikit-learn",
        },
        {
          name: "Drafting agent",
          role: "LLM drafts outreach against a documented rubric.",
          tech: "Python · OpenAI",
        },
        {
          name: "Review UI",
          role: "Human gate — approve, edit, or reject drafts.",
          tech: "React · TypeScript",
        },
      ],
      dataFlow:
        "Signals ingested → account record updated → scoring service produces score + breakdown → drafting agent produces candidate → review UI enforces human approval → decision logged.",
      choices:
        "Scikit-learn over a heavy ML stack because the model is small and interpretable; explicit signal breakdown over a black-box score; hard review gate over an autonomous-send toggle.",
    },
    stack: {
      languages: ["Python", "TypeScript"],
      frameworks: ["FastAPI", "React", "scikit-learn"],
      infrastructure: ["Docker"],
      models: ["OpenAI"],
      databases: ["PostgreSQL"],
      deployment:
        "Containerized service + client. Evaluation-only for now; no production send path.",
    },
    decisions: [
      {
        title: "Human review as a hard gate",
        chose: "Mandatory approval before send",
        over: "Autonomous send with toggles",
        because: "Auto-outreach without review is a reputational risk with no research value.",
        adr: "adr-0011",
      },
      {
        title: "Interpretable scorer",
        chose: "Small interpretable model with signal breakdown",
        over: "Black-box scoring",
        because: "Signal breakdown is the point — sales teams need to know why.",
        adr: "adr-0012",
      },
    ],
    timeline: {
      milestones: [
        {
          at: "2025-12",
          title: "Signal ingestion v1",
          detail: "Canonical account schema and initial signal pullers.",
          done: true,
        },
        {
          at: "2026-02",
          title: "Scoring service v1",
          detail: "Interpretable per-lead scoring with breakdown.",
          done: true,
        },
        {
          at: "2026-04",
          title: "Drafting agent v1",
          detail: "LLM drafting against a documented rubric.",
          done: true,
        },
        {
          at: "2026-06",
          title: "Review UI v1",
          detail: "Human approval gate with edit and reject.",
          done: true,
        },
        {
          at: "2026-Q3",
          title: "Draft-quality evaluation",
          detail: "Rubric-based scoring of draft quality with inter-rater checks.",
          done: false,
        },
        {
          at: "2026-Q4",
          title: "Feedback loop",
          detail: "Feed edit/reject decisions back into drafting.",
          done: false,
        },
      ],
      currentPhase: "Prototype",
      nextMilestone: "Rubric-based draft-quality evaluation with inter-rater checks.",
      longTerm:
        "A revenue intelligence platform where every score and draft is explainable and every send is reviewed.",
    },
    validation: {
      entries: [
        {
          label: "Score breakdown coverage",
          value: "100% — every score exposes its signals",
          kind: "measured",
        },
        {
          label: "Draft-quality rubric",
          value: "Documented rubric with 6 dimensions",
          kind: "methodology",
        },
        { label: "Autonomous-send count", value: "0 — enforced by architecture", kind: "measured" },
        { label: "Inter-rater reliability on drafts", value: "Target κ ≥ 0.7", kind: "target" },
      ],
      methodology:
        "Drafts are scored against a documented rubric (relevance, specificity, tone, call-to-action, factuality, brevity). Inter-rater reliability is the primary metric, not click-through.",
      limitations: [
        "Signal sources are limited to what is publicly available.",
        "Draft evaluation is single-annotator; second annotator is the next milestone.",
      ],
    },
    docs: {
      adrRefs: ["adr-0011", "adr-0012"],
      journalRefs: [],
      researchRefs: [],
      datasetRefs: [],
      apiRefs: [],
      diagramRefs: [],
      validationRefs: [],
    },
    future: [
      {
        title: "Second annotator",
        detail: "Inter-rater reliability on draft-quality evaluation.",
        kind: "research",
      },
      {
        title: "Feedback loop",
        detail: "Route edit and reject decisions into drafting prompts.",
        kind: "feature",
      },
      {
        title: "Signal source expansion",
        detail: "Additional publicly available signal sources.",
        kind: "feature",
      },
      {
        title: "Drift across model releases",
        detail: "Measure draft-quality drift across LLM version changes.",
        kind: "challenge",
      },
    ],
    badges: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "React",
      "TypeScript",
      "scikit-learn",
      "OpenAI",
      "Docker",
    ],
    progress: phaseChecklist("Prototype"),
    links: csLinks(),
  },

  // ---------------------------------------------------------------------
  cloudcostiq: {
    slug: "cloudcostiq",
    summary: {
      what: "CloudCostIQ is a FinOps platform for cloud cost attribution, forecasting, and explainable spend drivers over billing exports.",
      why: "FinOps tools either surface bills without attribution or forecast without explaining what drives the numbers. Engineering teams need both.",
      maturity:
        "Building — attribution engine over synthetic CUR exports; forecast model documented with error bounds.",
      status:
        "Active build against synthetic billing data. Real cloud billing integration planned.",
    },
    problem: {
      statement:
        "Cloud spend is unattributed and forecasts are opaque. Engineering teams cannot answer 'why did our bill spike' without a full-time FinOps analyst.",
      existingSolutions:
        "Native cloud cost tools stop at the account level. FinOps SaaS is expensive and opinionated. Neither surfaces per-service, per-team attribution with explanation.",
      constraints: [
        "Attribution must be transparent — every dollar is traced to a rule.",
        "Forecasts must publish error bounds, not point estimates.",
        "Ingestion must handle full CUR-scale exports on a workstation.",
        "The tool must run against synthetic data; live cloud connections are opt-in.",
      ],
    },
    architecture: {
      highLevel:
        "Billing ingest normalizes CUR exports into a DuckDB analytics core. An attribution engine applies rules to trace cost to services and teams. A forecast model produces per-service forecasts with intervals. A React dashboard renders the results.",
      components: [
        {
          name: "Billing ingest",
          role: "Parse and normalize CUR-shaped exports.",
          tech: "Python · DuckDB · Parquet",
        },
        {
          name: "Attribution engine",
          role: "Rule-based cost tracing to services, teams, and features.",
          tech: "Python · SQL",
        },
        {
          name: "Forecast model",
          role: "Per-service forecasts with quantile intervals.",
          tech: "Python · statsmodels",
        },
        {
          name: "Dashboard",
          role: "Interactive attribution and forecast visualization.",
          tech: "React · TypeScript · Recharts",
        },
      ],
      dataFlow:
        "CUR export → ingest normalizes → DuckDB stores → attribution engine tags each row → forecast model runs per service → dashboard queries results.",
      choices:
        "DuckDB over a data warehouse because full-workstation analytics is the target; rule-based attribution over ML because rules are explainable; statsmodels for forecasting because prediction intervals matter more than point accuracy.",
    },
    stack: {
      languages: ["Python", "TypeScript"],
      frameworks: ["React", "Vite", "statsmodels"],
      infrastructure: ["DuckDB", "Parquet"],
      models: [],
      databases: ["DuckDB"],
      deployment: "Local-first workstation deployment. Multi-tenant SaaS is out of scope for v1.",
    },
    decisions: [
      {
        title: "Rule-based attribution",
        chose: "Explicit rules",
        over: "ML classification",
        because: "Attribution rules must be auditable; ML would obscure the mapping.",
        adr: "adr-0013",
      },
      {
        title: "Quantile forecasts",
        chose: "Interval forecasts",
        over: "Point forecasts",
        because: "FinOps decisions depend on worst-case bounds, not point estimates.",
        adr: "adr-0014",
      },
    ],
    timeline: {
      milestones: [
        {
          at: "2026-02",
          title: "Billing ingest v1",
          detail: "CUR parser and DuckDB schema.",
          done: true,
        },
        {
          at: "2026-04",
          title: "Attribution engine v1",
          detail: "Rule-based tagging with test coverage.",
          done: true,
        },
        {
          at: "2026-06",
          title: "Forecast model v1",
          detail: "Per-service quantile forecasts.",
          done: true,
        },
        {
          at: "2026-Q3",
          title: "Dashboard v1",
          detail: "Attribution and forecast visualization.",
          done: false,
        },
        {
          at: "2026-Q4",
          title: "Live billing connector",
          detail: "Read-only connector to real cloud billing.",
          done: false,
        },
      ],
      currentPhase: "Building",
      nextMilestone: "Dashboard v1 with attribution drill-down and forecast visualization.",
      longTerm:
        "A local-first FinOps platform where attribution is auditable and forecasts publish error bounds.",
    },
    validation: {
      entries: [
        {
          label: "Attribution coverage",
          value: "100% of spend traced by rule (or explicitly 'unattributed')",
          kind: "measured",
        },
        {
          label: "Forecast interval calibration",
          value: "Target 80% interval covers ≥ 78% of held-out weeks",
          kind: "target",
        },
        {
          label: "Ingest throughput",
          value: "Full CUR month in < 90s on workstation",
          kind: "target",
        },
      ],
      methodology:
        "Attribution rules are tested against synthetic CUR exports with known ground truth. Forecast model is evaluated via rolling-window backtests with calibration reporting.",
      limitations: [
        "AWS CUR schema first; GCP and Azure formats are future work.",
        "No anomaly detection in v1 — forecasts only.",
      ],
    },
    docs: {
      adrRefs: ["adr-0013", "adr-0014"],
      journalRefs: [],
      researchRefs: [],
      datasetRefs: [],
      apiRefs: [],
      diagramRefs: [],
      validationRefs: [],
    },
    future: [
      {
        title: "GCP / Azure billing formats",
        detail: "Adapters for non-AWS billing schemas.",
        kind: "feature",
      },
      {
        title: "Anomaly detection",
        detail: "Change-point detection over per-service spend.",
        kind: "feature",
      },
      {
        title: "Attribution rule mining",
        detail: "Suggest attribution rules from tag patterns.",
        kind: "research",
      },
      {
        title: "Multi-account consolidation",
        detail: "Cross-account attribution semantics.",
        kind: "challenge",
      },
    ],
    badges: ["Python", "TypeScript", "React", "DuckDB", "Parquet", "statsmodels", "Vite"],
    progress: phaseChecklist("Building"),
    links: csLinks(),
  },

  // ---------------------------------------------------------------------
  axiom: {
    slug: "axiom",
    summary: {
      what: "Axiom is a durable workflow orchestration runtime for AI-assisted internal tooling — explicit step contracts, deterministic replay, and typed retries.",
      why: "AI-assisted workflows fail in messy, partial ways. Orchestration needs step contracts and replay so failures can be reasoned about, not just retried.",
      maturity:
        "Prototype — runtime with deterministic replay over a small library of workflow patterns.",
      status: "Prototype. API surface still iterating.",
    },
    problem: {
      statement:
        "LLM-heavy workflows are non-deterministic and fail in ways ad-hoc retry logic cannot express. Orchestration needs step-level contracts, deterministic replay, and typed failure handling.",
      existingSolutions:
        "Temporal is powerful but heavy for internal-tool scale. Prefect / Dagster target data workflows. Custom scripts do not survive partial failures.",
      constraints: [
        "Every step must have a typed contract — input, output, and failure modes.",
        "Replay must be deterministic given a step trace.",
        "Runtime must be embeddable in a small internal-tool service, not a separate cluster.",
        "Retries must be typed — 'retry on rate-limit' is not the same as 'retry on validation error'.",
      ],
    },
    architecture: {
      highLevel:
        "A workflow definition DSL expresses steps and their contracts. A Temporal-style runtime executes workflows against a Postgres event log. A contract layer enforces typed I/O and typed retries at step boundaries.",
      components: [
        {
          name: "Workflow DSL",
          role: "Typed step definitions and workflow composition.",
          tech: "TypeScript",
        },
        {
          name: "Runtime",
          role: "Executes workflows, persists events, supports replay.",
          tech: "Node · TypeScript",
        },
        {
          name: "Contract layer",
          role: "Enforces typed I/O and typed retries.",
          tech: "TypeScript · Zod",
        },
        { name: "Event log", role: "Append-only step-event log for replay.", tech: "PostgreSQL" },
      ],
      dataFlow:
        "Workflow triggered → runtime records event → step executes with contract check → result persisted → next step scheduled → replay reconstructs state from the event log.",
      choices:
        "TypeScript for embeddability in the internal-tool ecosystem; Postgres event log because durability and replay dominate; Zod for step contracts because runtime validation must match static types.",
    },
    stack: {
      languages: ["TypeScript"],
      frameworks: ["Node", "Zod"],
      infrastructure: ["Docker"],
      models: [],
      databases: ["PostgreSQL"],
      deployment: "Embeddable runtime library plus optional worker container.",
    },
    decisions: [
      {
        title: "Embeddable runtime",
        chose: "Library + optional worker",
        over: "Separate cluster (Temporal-style)",
        because: "Internal-tool scale does not justify cluster ops; embeddability is decisive.",
        adr: "adr-0015",
      },
      {
        title: "Typed retries",
        chose: "Retry policies bound to typed failures",
        over: "Universal retry with jitter",
        because:
          "Retrying validation errors is a bug; retry policy must be a function of failure type.",
        adr: "adr-0016",
      },
    ],
    timeline: {
      milestones: [
        {
          at: "2026-03",
          title: "Runtime v0",
          detail: "Event log and single-step execution.",
          done: true,
        },
        {
          at: "2026-05",
          title: "Replay v1",
          detail: "Deterministic replay from event log.",
          done: true,
        },
        {
          at: "2026-06",
          title: "Contract layer v1",
          detail: "Typed I/O and typed retries.",
          done: true,
        },
        {
          at: "2026-Q3",
          title: "DSL ergonomics",
          detail: "API surface iteration based on prototype workflows.",
          done: false,
        },
        {
          at: "2026-Q4",
          title: "Observability surface",
          detail: "Trace visualization and step-timing metrics.",
          done: false,
        },
      ],
      currentPhase: "Prototype",
      nextMilestone: "DSL ergonomics pass based on real prototype workflow feedback.",
      longTerm:
        "An embeddable durable runtime that internal-tool teams can adopt without running a cluster.",
    },
    validation: {
      entries: [
        {
          label: "Replay determinism",
          value: "100% — replay reproduces final state from event log",
          kind: "measured",
        },
        {
          label: "Contract violation rate",
          value: "Target 0% at runtime (caught at DSL compile)",
          kind: "target",
        },
        {
          label: "Overhead vs. direct call",
          value: "Target < 20ms per step (p50) on Postgres LAN",
          kind: "target",
        },
      ],
      methodology:
        "Property tests verify replay determinism across a library of workflow patterns. Contract violations are surfaced as compile-time errors where possible, runtime errors otherwise.",
      limitations: [
        "Single-runtime-per-workflow — no distributed sharding in the prototype.",
        "No first-class saga/compensation semantics yet.",
      ],
    },
    docs: {
      adrRefs: ["adr-0015", "adr-0016"],
      journalRefs: [],
      researchRefs: [],
      datasetRefs: [],
      apiRefs: [],
      diagramRefs: [],
      validationRefs: [],
    },
    future: [
      {
        title: "Saga / compensation semantics",
        detail: "First-class compensation actions for typed failures.",
        kind: "feature",
      },
      {
        title: "Distributed sharding",
        detail: "Shard workflow execution across worker nodes.",
        kind: "feature",
      },
      {
        title: "Contract inference",
        detail: "Infer step contracts from usage patterns.",
        kind: "research",
      },
      {
        title: "Cross-language step handlers",
        detail: "Allow Python step handlers alongside TypeScript.",
        kind: "challenge",
      },
    ],
    badges: ["TypeScript", "Node", "PostgreSQL", "Zod", "Docker"],
    progress: phaseChecklist("Prototype"),
    links: csLinks(),
  },

  // ---------------------------------------------------------------------
  "supply-chain-twin": {
    slug: "supply-chain-twin",
    summary: {
      what: "Supply Chain Digital Twin is a discrete-event simulation of multi-tier supply chains with model validation against analytical baselines.",
      why: "Supply-chain reasoning ships either as spreadsheets (untestable) or as enterprise simulation software (opaque). Research needs an open, validatable simulation core.",
      maturity:
        "Research — simulation core validated against analytical baselines; scenario library growing.",
      status: "Active research. Simulation-only; no operational deployment.",
    },
    problem: {
      statement:
        "Supply-chain simulation is either spreadsheet-based (opaque, unverifiable) or vendor software (opaque, expensive). Research needs a validatable simulation core with explicit modeling assumptions.",
      existingSolutions:
        "AnyLogic and Arena are excellent but proprietary. Open packages exist but rarely publish validation against analytical baselines.",
      constraints: [
        "Simulation core must be validated against analytical baselines (M/M/1, Little's Law, etc.).",
        "Every scenario must be reproducible from a seed and configuration file.",
        "Network topology must be first-class — supply chains are graphs, not linear flows.",
        "Model assumptions must be explicit in scenario definitions.",
      ],
    },
    architecture: {
      highLevel:
        "SimPy is the discrete-event core. A scenario library expresses supply-chain topologies as NetworkX graphs. A validation harness runs analytical baselines and compares to simulation output.",
      components: [
        {
          name: "Simulation core",
          role: "Discrete-event simulation of orders, inventory, and lead times.",
          tech: "Python · SimPy",
        },
        {
          name: "Topology layer",
          role: "Supply-chain graphs with node/edge properties.",
          tech: "Python · NetworkX",
        },
        {
          name: "Scenario library",
          role: "Reproducible scenario definitions with seed control.",
          tech: "Python · Pydantic",
        },
        {
          name: "Validation harness",
          role: "Runs analytical baselines and compares to simulation.",
          tech: "Python · NumPy",
        },
      ],
      dataFlow:
        "Scenario definition + seed → topology built → simulation runs → outputs collected → validation harness compares to analytical baseline where one exists.",
      choices:
        "SimPy over a homegrown DES because SimPy's process model matches supply-chain semantics; NetworkX for topology; validation harness is a mandatory part of the release process.",
    },
    stack: {
      languages: ["Python"],
      frameworks: ["SimPy", "NetworkX", "Pydantic"],
      infrastructure: ["Docker"],
      models: ["PyTorch (learned policies, experimental)"],
      databases: [],
      deployment:
        "CLI runner. Results archive is a directory of JSON manifests and Parquet outputs.",
    },
    decisions: [
      {
        title: "Analytical baseline validation",
        chose: "Mandatory validation against M/M/1, Little's Law",
        over: "Empirical tuning only",
        because: "Simulation output without validation is untrustworthy.",
        adr: "adr-0017",
      },
      {
        title: "SimPy over custom DES",
        chose: "SimPy",
        over: "Hand-rolled scheduler",
        because: "SimPy's process API matches supply-chain semantics and reduces bug surface.",
        adr: "adr-0018",
      },
    ],
    timeline: {
      milestones: [
        {
          at: "2026-04",
          title: "Simulation core v0",
          detail: "Single-tier simulation with order and lead-time models.",
          done: true,
        },
        {
          at: "2026-05",
          title: "Validation harness",
          detail: "M/M/1 and Little's Law baselines with pass/fail thresholds.",
          done: true,
        },
        {
          at: "2026-Q3",
          title: "Multi-tier topology",
          detail: "Full graph topology with policy nodes.",
          done: false,
        },
        {
          at: "2026-Q4",
          title: "Learned policy experiments",
          detail: "RL policies benchmarked against heuristic policies.",
          done: false,
        },
      ],
      currentPhase: "Research",
      nextMilestone: "Multi-tier topology with policy nodes at each tier.",
      longTerm:
        "A reference open simulation platform for supply-chain research with validated core dynamics.",
    },
    validation: {
      entries: [
        {
          label: "M/M/1 baseline agreement",
          value: "< 2% deviation across queue-length statistics",
          kind: "measured",
        },
        { label: "Little's Law check", value: "Passes on all shipped scenarios", kind: "measured" },
        {
          label: "Seed determinism",
          value: "Identical outputs across runs given seed",
          kind: "measured",
        },
        {
          label: "Multi-tier validation",
          value: "Target — validation strategy to be documented",
          kind: "target",
        },
      ],
      methodology:
        "Every release runs the validation harness. Analytical baselines are the primary check; empirical tuning only where analytical baselines do not exist.",
      limitations: ["Single-tier topologies only in v0.", "No stochastic disruption modeling yet."],
    },
    docs: {
      adrRefs: ["adr-0017", "adr-0018"],
      journalRefs: [],
      researchRefs: [],
      datasetRefs: [],
      apiRefs: [],
      diagramRefs: [],
      validationRefs: [],
    },
    future: [
      {
        title: "Multi-tier topology",
        detail: "Full graph topology with policy nodes.",
        kind: "feature",
      },
      {
        title: "Disruption scenarios",
        detail: "Stochastic disruption modeling with recovery policies.",
        kind: "feature",
      },
      {
        title: "Learned policies",
        detail: "Benchmark RL policies against heuristic baselines.",
        kind: "research",
      },
      {
        title: "Analytical baselines for multi-tier",
        detail: "Where do closed-form baselines exist for multi-tier networks?",
        kind: "research",
      },
    ],
    badges: ["Python", "SimPy", "NetworkX", "PyTorch", "Pydantic", "NumPy"],
    progress: phaseChecklist("Research"),
    links: csLinks(),
  },

  // ---------------------------------------------------------------------
  "pitwall-ai": {
    slug: "pitwall-ai",
    summary: {
      what: "PitWall AI is a Monte-Carlo race strategy simulator with tire-degradation modeling over public race data.",
      why: "Motorsport strategy analysis is either proprietary or hand-waved on social media. Research needs a public, reproducible strategy simulator with documented modeling assumptions.",
      maturity:
        "Research — degradation model fit to a rolling window of races; strategy simulator prototype in the Journal.",
      status: "Research prototype. No commercial or operational use.",
    },
    problem: {
      statement:
        "Race strategy analysis requires per-lap tire degradation models and Monte-Carlo simulation. Public data exists; open reproducible modeling infrastructure does not.",
      existingSolutions:
        "Team strategy tools are proprietary. Public analyses are usually snapshot infographics without reproducible methodology.",
      constraints: [
        "All inputs must be public race data.",
        "Degradation models must publish fit diagnostics, not just point estimates.",
        "Strategy simulator must be Monte-Carlo, not deterministic.",
        "Every result must be reproducible from data snapshot + model version.",
      ],
    },
    architecture: {
      highLevel:
        "Data ingestion pulls public race data into a Parquet archive. A degradation model fits per-compound tire degradation with confidence intervals. A Monte-Carlo strategy runner samples outcomes across pit-stop strategies.",
      components: [
        {
          name: "Data ingestion",
          role: "Pulls public race lap data into a Parquet archive.",
          tech: "Python · Pandas",
        },
        {
          name: "Degradation model",
          role: "Per-compound degradation fit with confidence intervals.",
          tech: "Python · PyTorch · statsmodels",
        },
        {
          name: "Monte-Carlo runner",
          role: "Samples outcomes across strategies and race conditions.",
          tech: "Python · NumPy",
        },
        {
          name: "Diagnostics",
          role: "Fit diagnostics and simulation summaries.",
          tech: "Python · Plotly",
        },
      ],
      dataFlow:
        "Race data pulled → archive updated → degradation model fit per race window → Monte-Carlo runner samples across strategies → diagnostics rendered.",
      choices:
        "PyTorch for degradation because differentiable fits enable partial-pool learning across compounds; Monte-Carlo over deterministic simulation because race outcomes are dominated by variance.",
    },
    stack: {
      languages: ["Python"],
      frameworks: ["PyTorch", "Pandas", "NumPy", "statsmodels"],
      infrastructure: ["Parquet"],
      models: [],
      databases: [],
      deployment: "Local-first CLI + notebooks.",
    },
    decisions: [
      {
        title: "Monte-Carlo over deterministic",
        chose: "Monte-Carlo strategy sampling",
        over: "Deterministic strategy evaluation",
        because: "Variance dominates race outcomes; a single point estimate is misleading.",
        adr: "adr-0019",
      },
      {
        title: "Partial-pool degradation model",
        chose: "Partial-pool across compounds",
        over: "Per-compound independent fits",
        because: "Compound-specific data is sparse; partial pooling improves generalization.",
        adr: "adr-0020",
      },
    ],
    timeline: {
      milestones: [
        {
          at: "2026-04",
          title: "Data ingestion v1",
          detail: "Public lap data archive.",
          done: true,
        },
        {
          at: "2026-05",
          title: "Degradation model v0",
          detail: "Per-compound fits with confidence intervals.",
          done: true,
        },
        {
          at: "2026-06",
          title: "Monte-Carlo runner v0",
          detail: "Strategy sampling over race conditions.",
          done: true,
        },
        {
          at: "2026-Q3",
          title: "Weather modeling",
          detail: "Incorporate weather uncertainty into degradation.",
          done: false,
        },
        {
          at: "2026-Q4",
          title: "Cross-race generalization",
          detail: "Held-out race evaluation with published errors.",
          done: false,
        },
      ],
      currentPhase: "Research",
      nextMilestone: "Weather uncertainty modeling in the degradation fit.",
      longTerm:
        "A public, reproducible race-strategy research platform with documented modeling assumptions.",
    },
    validation: {
      entries: [
        {
          label: "Degradation fit diagnostics",
          value: "R², residual plots, held-out MAE published per race",
          kind: "measured",
        },
        {
          label: "Strategy simulator seed determinism",
          value: "Identical outputs given seed",
          kind: "measured",
        },
        {
          label: "Cross-race generalization",
          value: "Target held-out MAE ≤ threshold TBD",
          kind: "target",
        },
      ],
      methodology:
        "Degradation fits are evaluated on held-out laps within a race. Cross-race generalization is the next open evaluation question.",
      limitations: [
        "Public data granularity limits some modeling choices.",
        "Weather uncertainty not yet incorporated.",
      ],
    },
    docs: {
      adrRefs: ["adr-0019", "adr-0020"],
      journalRefs: [],
      researchRefs: [],
      datasetRefs: [],
      apiRefs: [],
      diagramRefs: [],
      validationRefs: [],
    },
    future: [
      {
        title: "Weather uncertainty",
        detail: "Incorporate weather into degradation and strategy sampling.",
        kind: "feature",
      },
      {
        title: "Cross-race generalization",
        detail: "Held-out race evaluation with published errors.",
        kind: "research",
      },
      {
        title: "Driver-effect decomposition",
        detail: "Separate driver from car and tire effects in degradation.",
        kind: "research",
      },
      {
        title: "Data granularity ceiling",
        detail: "Public data may bound achievable accuracy.",
        kind: "challenge",
      },
    ],
    badges: ["Python", "PyTorch", "Pandas", "NumPy", "statsmodels", "Parquet"],
    progress: phaseChecklist("Research"),
    links: csLinks(),
  },
};

export function getDossier(slug: string): ProjectDossier | undefined {
  return DOSSIERS[slug];
}
