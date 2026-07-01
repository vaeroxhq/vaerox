export type ResearchStatus = "Published" | "Preprint" | "In Review" | "Working Draft";
export type ResearchCategory =
  | "Medical AI"
  | "Agricultural AI"
  | "Financial AI"
  | "Computer Vision"
  | "Remote Sensing"
  | "LLM Evaluation"
  | "Systems Design"
  | "Quantitative Evaluation";

export type ResearchEntry = {
  slug: string;
  title: string;
  category: ResearchCategory;
  readingMinutes: number;
  published: string;
  status: ResearchStatus;
  abstract: string;
  tags: string[];
  authors: string[];
};

/**
 * Research notes tied to the canonical VÆRØX systems and datasets.
 * Working drafts and preprints; nothing here claims peer-review that
 * hasn't happened.
 */
export const RESEARCH: ResearchEntry[] = [
  {
    slug: "vestra-agent-eval-methodology",
    title: "Evaluation methodology for personal-finance agents",
    category: "LLM Evaluation",
    readingMinutes: 12,
    published: "2026-06-22",
    status: "Working Draft",
    abstract:
      "A working-draft methodology for evaluating agent turns grounded in a user's own portfolio data, focused on faithfulness to the underlying numbers rather than surface fluency.",
    tags: ["vestra", "agents", "evaluation"],
    authors: ["VÆRØX"],
  },
  {
    slug: "quantedge-walkforward-methodology",
    title: "Walk-forward evaluation methodology for factor strategies",
    category: "Quantitative Evaluation",
    readingMinutes: 14,
    published: "2026-06-10",
    status: "Preprint",
    abstract:
      "A pragmatic write-up of the walk-forward, Sharpe, and drawdown methodology used inside QuantEdge AI, including the failure modes that made naive backtests look better than they were.",
    tags: ["quantedge", "backtesting"],
    authors: ["VÆRØX"],
  },
  {
    slug: "marketpulse-classifier-notes",
    title: "News classification for equities: prompt design and cost control",
    category: "Financial AI",
    readingMinutes: 10,
    published: "2026-06-05",
    status: "Preprint",
    abstract:
      "Design notes for the MarketPulse classifier prompt: chain-of-tags vs. single-shot, held-out evaluation, and per-tag cost accounting.",
    tags: ["marketpulse", "llm", "classification"],
    authors: ["VÆRØX"],
  },
  {
    slug: "aegis-triage-workflow-notes",
    title: "Composing DFIR triage as a LangGraph workflow",
    category: "Systems Design",
    readingMinutes: 11,
    published: "2026-05-28",
    status: "Preprint",
    abstract:
      "Design notes on decomposing DFIR triage into typed LangGraph steps with explicit retry and analyst hand-off.",
    tags: ["aegis-ops", "security"],
    authors: ["VÆRØX"],
  },
  {
    slug: "cloudcostiq-forecast-methodology",
    title: "Explainable monthly forecasts for cloud spend",
    category: "Systems Design",
    readingMinutes: 9,
    published: "2026-05-14",
    status: "Working Draft",
    abstract:
      "Forecasting monthly cloud spend with driver decomposition and honest error bounds. Notes on the modelling constraints an explainability requirement imposes.",
    tags: ["cloudcostiq", "forecasting"],
    authors: ["VÆRØX"],
  },
  {
    slug: "supply-chain-validation-notes",
    title: "Validating a supply-chain simulator against analytical baselines",
    category: "Systems Design",
    readingMinutes: 8,
    published: "2026-05-04",
    status: "Working Draft",
    abstract:
      "Notes on validating the Supply Chain Twin against M/M/1 and Little's-law baselines before running any custom scenario in anger.",
    tags: ["supply-chain-twin", "simulation"],
    authors: ["VÆRØX"],
  },
  {
    slug: "medical-cataract-notes",
    title: "Working notes: LMOD cataract classification",
    category: "Medical AI",
    readingMinutes: 7,
    published: "2026-04-20",
    status: "Working Draft",
    abstract:
      "Ongoing exploration of the LMOD Cataract-1K dataset, focused on evaluation protocol and honest reporting of class imbalance.",
    tags: ["medical", "computer-vision"],
    authors: ["VÆRØX"],
  },
  {
    slug: "agri-paddy-disease-notes",
    title: "Working notes: paddy disease classification",
    category: "Agricultural AI",
    readingMinutes: 6,
    published: "2026-04-04",
    status: "Working Draft",
    abstract:
      "Notes from working the paddy disease dataset — data hygiene issues, augmentation choices, and how much of the reported accuracy is real.",
    tags: ["agriculture", "computer-vision"],
    authors: ["VÆRØX"],
  },
];
