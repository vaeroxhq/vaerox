/**
 * Dossier extras — engineering metrics, challenges encountered, and lessons
 * learned per canonical project. Kept in a separate file so we can enrich
 * the case-study surface without touching every dossier entry.
 *
 * Metrics are stated honestly: derived counts (milestones, decisions,
 * stack, validation entries) or ranges. Nothing is fabricated. When a
 * value is not known it is omitted, not invented.
 */

export type DossierExtras = {
  metricsOverride?: Partial<{
    loc: string;
    repositories: string;
    contributors: string;
    architectureVersion: string;
    documentationCoverage: string;
    knownLimitations: string;
    nextMilestone: string;
  }>;
  challenges: string[];
  lessons: string[];
  roadmap?: { at: string; title: string; detail: string }[];
};

export const DOSSIER_EXTRAS: Record<string, DossierExtras> = {
  vestra: {
    metricsOverride: {
      architectureVersion: "v2 · plan graph",
      documentationCoverage: "ADRs · dossier · handbook chapters",
    },
    challenges: [
      "Grounding LLM output in structured portfolio state without paying retrieval cost on every turn.",
      "Bounding per-session token spend for an ambient assistant that runs across a full planning conversation.",
      "Reconciling manual entries with future broker imports without duplicating positions.",
    ],
    lessons: [
      "Typed retrieval against a plan graph eliminates a whole class of hallucination that generic RAG cannot.",
      "Explicit citation to plan-graph nodes is what makes recommendations trustworthy — not model choice.",
      "LangGraph earns its complexity once branch count crosses a threshold; below that it is overkill.",
    ],
  },
  quantedge: {
    metricsOverride: {
      architectureVersion: "v1 · walk-forward runner",
      documentationCoverage: "ADRs · methodology notes · reproducibility manifest",
    },
    challenges: [
      "Preventing look-ahead bias by construction rather than by convention.",
      "Keeping analytical throughput on a laptop as the equity universe grows.",
      "Reproducing bit-identical results across NumPy / DuckDB version drift.",
    ],
    lessons: [
      "A runner that refuses non-walk-forward strategies is worth more than any amount of documentation about bias.",
      "DuckDB removes the largest single class of infrastructure friction for research-scale analytics.",
      "Hashing the strategy definition + data snapshot is the smallest change with the largest reproducibility payoff.",
    ],
  },
  marketpulse: {
    metricsOverride: {
      architectureVersion: "v1 · typed classifier",
      documentationCoverage: "ADRs · evaluation harness notes",
    },
    challenges: [
      "Bounding LLM cost on bursty news volume without dropping accuracy on rare event classes.",
      "Detecting silent prompt drift when upstream model versions change.",
      "Keeping the labeled evaluation set honest as new event types are added.",
    ],
    lessons: [
      "Typed events beat scalar sentiment for any downstream consumer that isn't a chart.",
      "A held-out evaluation set is the only real defense against prompt-change regressions.",
      "Per-prompt cost tracking exposes classification designs that look cheap in aggregate but aren't.",
    ],
  },
  "aegis-ops": {
    metricsOverride: {
      architectureVersion: "v1 · LangGraph triage",
      documentationCoverage: "ADRs · workflow diagrams · analyst runbooks",
    },
    challenges: [
      "Making every workflow step produce a reviewable artifact without slowing high-volume ingestion.",
      "Building fraud scoring against imbalanced labels without hiding class performance behind aggregate metrics.",
      "Avoiding vendor lock-in on threat intel while keeping enrichment cheap.",
    ],
    lessons: [
      "Workflow-as-graph exposes exactly the reasoning steps analysts need to review — monolithic classifiers cannot.",
      "Per-class metrics on imbalanced data prevent an entire category of misleading progress reports.",
      "Synthetic SIEM traces are a first check, never the last one.",
    ],
  },
  leadpulse: {
    metricsOverride: {
      architectureVersion: "v1 · scoring + drafting split",
      documentationCoverage: "ADRs · rubric documentation",
    },
    challenges: [
      "Making a hard human-review gate ergonomic enough that reviewers actually use it.",
      "Producing signal breakdowns that are useful to a sales operator, not just a data scientist.",
      "Evaluating draft quality without click-through data.",
    ],
    lessons: [
      "The most valuable feature of an AI outreach system is the review gate, not the draft.",
      "Interpretable scoring beats a marginally more accurate black box in any workflow that includes humans.",
      "Rubric-based evaluation with inter-rater checks is the honest way to measure draft quality.",
    ],
  },
  cloudcostiq: {
    metricsOverride: {
      architectureVersion: "v1 · rule-based attribution",
      documentationCoverage: "ADRs · attribution rulebook",
    },
    challenges: [
      "Handling full CUR-scale exports on a workstation without giving up query interactivity.",
      "Publishing forecast intervals that are calibrated, not just wide.",
      "Extending attribution rules across accounts without an ML crutch.",
    ],
    lessons: [
      "DuckDB flattens the infrastructure surface for FinOps-scale analytics.",
      "Interval forecasts change how teams talk about spend far more than point estimates do.",
      "Rule-based attribution is auditable — that is exactly the property FinOps needs.",
    ],
  },
  axiom: {
    metricsOverride: {
      architectureVersion: "v0 · event-log runtime",
      documentationCoverage: "ADRs · DSL reference (draft)",
    },
    challenges: [
      "Keeping the runtime embeddable while still supporting deterministic replay.",
      "Typing retry policies so 'retry on validation error' is a compile-time bug.",
      "Designing a DSL that survives contact with real prototype workflows.",
    ],
    lessons: [
      "Postgres as the event log removes the operational surface a full cluster would demand.",
      "Typed retries eliminate a class of production incidents that generic retry-with-backoff cannot.",
      "DSL ergonomics only stabilise after real workflows are running against them.",
    ],
  },
  "supply-chain-twin": {
    metricsOverride: {
      architectureVersion: "v0 · single-tier core",
      documentationCoverage: "ADRs · validation harness notes",
    },
    challenges: [
      "Validating against analytical baselines where closed-form solutions exist — and being explicit where they do not.",
      "Keeping scenario definitions reproducible from seed and configuration alone.",
      "Extending validation to multi-tier topologies without falling back to empirical tuning.",
    ],
    lessons: [
      "Simulation output without validation is untrustworthy; the harness is not optional.",
      "NetworkX topology + SimPy processes is a surprisingly complete substrate for supply-chain modelling.",
      "Discipline around seed and configuration is the single largest reproducibility lever.",
    ],
  },
  "pitwall-ai": {
    metricsOverride: {
      architectureVersion: "v0 · degradation + strategy",
      documentationCoverage: "Journal write-ups · methodology notes",
    },
    challenges: [
      "Fitting tire-degradation models against noisy public data.",
      "Making Monte-Carlo strategy simulations tractable without over-simplifying track state.",
      "Distinguishing model improvements from data-window luck.",
    ],
    lessons: [
      "Documenting modelling assumptions is more valuable than any single accuracy number.",
      "Monte-Carlo variance is the honest metric — a point estimate hides everything that matters.",
      "Public data is enough for a rigorous simulator; proprietary telemetry is not the moat it looks like.",
    ],
  },
};

export function getDossierExtras(slug: string): DossierExtras | undefined {
  return DOSSIER_EXTRAS[slug];
}
