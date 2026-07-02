/**
 * Journal — chronological engineering feed. Authentic engineering
 * notes tied to the canonical VÆRØX systems. No fictional incidents
 * or fake operational reviews.
 */

export type JournalCategory =
  | "Engineering Notes"
  | "Architecture"
  | "Research"
  | "Evaluation"
  | "Design Decision"
  | "Post-Mortem"
  | "Development Log";

export type JournalStatus = "Published" | "Draft" | "Working note";

export type JournalEntry = {
  slug: string;
  date: string;
  title: string;
  category: JournalCategory;
  tags: string[]; // canonical system slugs preferred
  revision: string;
  author: string;
  status: JournalStatus;
  readingMinutes: number;
  summary: string;
  body: string[];
};

export const JOURNAL: JournalEntry[] = [
  {
    slug: "vestra-tool-contracts",
    date: "2026-06-24",
    title: "Why VESTRA enforces a strict tool contract",
    category: "Design Decision",
    tags: ["vestra", "agents"],
    revision: "r.02",
    author: "VÆRØX",
    status: "Published",
    readingMinutes: 7,
    summary:
      "Every VESTRA tool call has a typed signature and a replayable trace. This is the single most useful design decision I've made on the agent layer.",
    body: [
      "The temptation with an agent framework is to let the model reach for whatever it needs. That works until the first time a portfolio summary is wrong and you have no way to isolate whether the model, the tool, or the data is at fault.",
      "The contract is simple: every tool is a typed function, every call is logged with input and output, every trace is replayable. Adding a tool now costs a schema and a test.",
      "In exchange, debugging a wrong number takes minutes instead of an afternoon. The parallel-tool-call optimisation in VAL-01 was only possible because tool boundaries were explicit.",
    ],
  },
  {
    slug: "quantedge-duckdb-decision",
    date: "2026-06-18",
    title: "QuantEdge: why DuckDB is the analytics core",
    category: "Architecture",
    tags: ["quantedge", "duckdb"],
    revision: "r.01",
    author: "VÆRØX",
    status: "Published",
    readingMinutes: 6,
    summary:
      "Choosing an analytics engine for a solo research environment. Postgres was overkill; pandas was too slow. DuckDB fit the shape of the problem.",
    body: [
      "The walk-forward runner spent most of its time in pandas group-by and merge operations. Refit-heavy strategies were bottlenecked on Python, not compute.",
      "DuckDB moved the heavy analytics into a query engine without asking me to run a database. The reference-dataset walk-forward dropped from 145 s to 71 s after caching factor exposures.",
      "The honest limitation: I have not validated behaviour at 10× the current reference dataset. When I get there, I'll publish the measurement.",
    ],
  },
  {
    slug: "marketpulse-prompt-eval",
    date: "2026-06-19",
    title: "MarketPulse: prompt versions get evaluated before they merge",
    category: "Evaluation",
    tags: ["marketpulse", "evaluation", "llm"],
    revision: "r.03",
    author: "VÆRØX",
    status: "Published",
    readingMinutes: 8,
    summary:
      "A held-out 1,200-item set decides whether a prompt change ships. Two regressions caught this month that would have made it to main.",
    body: [
      "Spot-checking prompt changes through a chat UI is comforting and useless. Selection bias makes every change look better than the last.",
      "The rule now: every prompt version is committed with a hash, evaluated against the held-out set, and merged with a delta report. Two regressions this month never made it out of the branch.",
      "Chain-of-tags prompting beat single-shot by 4 F1 points at equal cost. The cheaper model gets within 1 F1 point on the majority classes at half the cost, which is going to matter for scaling.",
    ],
  },
  {
    slug: "aegis-langgraph-notes",
    date: "2026-06-27",
    title: "AEGIS OPS: what I learned building triage on LangGraph",
    category: "Development Log",
    tags: ["aegis-ops", "langgraph"],
    revision: "r.01",
    author: "VÆRØX",
    status: "Published",
    readingMinutes: 9,
    summary:
      "LangGraph earned its place as the workflow substrate. Keeping tool logic outside the graph nodes turned out to be the load-bearing decision.",
    body: [
      "Triage workflows grow branches quickly: retries, human-in-the-loop, escalations, fallbacks. Doing this in a hand-rolled state machine is where projects go to die.",
      "The rule is: LangGraph handles the graph, plain Python functions handle the tools. That keeps vendor coupling small and testing sane.",
      "Retrieval calls dominate latency on unseen alert shapes. Warming the retrieval cache brings median under 6 s — cold start still doesn't, and that's honest on the AEGIS page.",
    ],
  },
  {
    slug: "leadpulse-human-in-loop",
    date: "2026-06-12",
    title: "LeadPulse: why I refused to build auto-send",
    category: "Design Decision",
    tags: ["leadpulse"],
    revision: "r.01",
    author: "VÆRØX",
    status: "Published",
    readingMinutes: 5,
    summary:
      "The prototype drafts outreach; it does not send it. That constraint shaped the whole product surface.",
    body: [
      "No confidence score justifies auto-sending an LLM-drafted email under someone else's name. The failure mode is reputational and asymmetric.",
      "Human review is a real throughput constraint. That is a feature, not a bug, and it is documented as such on the LeadPulse page.",
    ],
  },
  {
    slug: "cloudcostiq-explainable-forecast",
    date: "2026-06-22",
    title: "CloudCostIQ: forecasts are worthless without drivers",
    category: "Design Decision",
    tags: ["cloudcostiq", "forecasting"],
    revision: "r.01",
    author: "VÆRØX",
    status: "Published",
    readingMinutes: 6,
    summary:
      "A cloud cost forecast should tell you what changed and why. Point estimates are a false comfort.",
    body: [
      "The first CloudCostIQ prototype rendered a monthly forecast as a single number with a confidence band. Users had no way to argue with it.",
      "Every forecast surface now includes top drivers with signed contribution and an error bound. That constrains the model — no opaque ensembles — and that constraint is welcome.",
    ],
  },
  {
    slug: "axiom-determinism-contracts",
    date: "2026-06-08",
    title: "Axiom: making determinism a first-class contract",
    category: "Engineering Notes",
    tags: ["axiom", "workflows"],
    revision: "r.01",
    author: "VÆRØX",
    status: "Published",
    readingMinutes: 7,
    summary:
      "If a workflow doesn't replay bit-identically, you can't safely debug it. Axiom treats determinism as a step contract, not a hope.",
    body: [
      "Time, network, and randomness are the three places non-determinism sneaks in. Wrapping each of them with a recorded contract turned replay from aspirational to measurable.",
      "Currently 11 of 14 prototype patterns replay bit-identically. The remaining 3 are open issues on the Axiom page, not swept under a demo.",
    ],
  },
  {
    slug: "supply-chain-baselines",
    date: "2026-05-30",
    title: "Supply Chain Twin: validate against analytical baselines first",
    category: "Research",
    tags: ["supply-chain-twin", "simulation"],
    revision: "r.01",
    author: "VÆRØX",
    status: "Published",
    readingMinutes: 5,
    summary:
      "Before trusting a custom scenario, the simulator has to reproduce M/M/1 and Little's law. Everything else is guesswork.",
    body: [
      "Discrete-event simulators are easy to write and hard to trust. The bar is: if the sim can't reproduce a closed-form baseline, it can't tell you anything credible about a custom scenario.",
      "Current deviation is under 1.4% across the utilisation sweep. Custom scenarios remain explicitly unvalidated on every page.",
    ],
  },
  {
    slug: "pitwall-strategy-log",
    date: "2026-06-04",
    title: "PitWall AI: what the tire model got wrong",
    category: "Development Log",
    tags: ["pitwall-ai"],
    revision: "r.01",
    author: "VÆRØX",
    status: "Published",
    readingMinutes: 6,
    summary:
      "Tire degradation is the biggest error source. Adding a safety-car probability shrank the tail; the mean barely moved.",
    body: [
      "Naïve degradation curves under-predict wear on high-degradation tracks. Fitting per-track curves helped, but the sim still overestimates one-stop viability on those.",
      "Adding a per-race safety-car probability made a bigger difference to tail error than to the mean — the sim now handicaps risky strategies more honestly.",
    ],
  },
];
