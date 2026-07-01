/**
 * API surfaces — the interfaces each canonical VÆRØX system exposes
 * or plans to expose. Because every system is pre-production, most
 * surfaces are labelled "Internal" or "Beta". No stability claims are
 * made beyond what the prototype actually supports.
 */

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "STREAM";
export type ApiStability = "Stable" | "Beta" | "Internal" | "Planned" | "Deprecated";

export type ApiEndpoint = {
  method: ApiMethod;
  path: string;
  summary: string;
  auth: string;
  rateLimit: string;
  request?: string;
  response?: string;
};

export type ApiSpec = {
  slug: string;
  code: string;
  name: string;
  system: string;           // canonical system slug
  version: string;
  stability: ApiStability;
  baseUrl: string;
  owner: string;
  updated: string;
  summary: string;
  authNote: string;
  endpoints: ApiEndpoint[];
  relatedSystems: string[];
  relatedAdrs: string[];
};

export const APIS: ApiSpec[] = [
  {
    slug: "vestra-agent",
    code: "API-01",
    name: "VESTRA Agent API",
    system: "vestra",
    version: "v0.4",
    stability: "Internal",
    baseUrl: "https://api.local/vestra/v0",
    owner: "VÆRØX",
    updated: "2026-06-24",
    summary: "Prototype interface for the VESTRA portfolio agent. Not exposed publicly.",
    authNote: "Local development only. Bearer token issued per developer workstation.",
    endpoints: [
      {
        method: "POST",
        path: "/turns",
        summary: "Submit a user turn; returns a streamed agent response.",
        auth: "Bearer (local)",
        rateLimit: "Unmetered on local dev",
        request: `{ "user_id": "u_demo", "message": "Summarise my portfolio." }`,
        response: `{ "turn_id": "t_01HZ...", "stream_url": "/turns/t_01HZ.../stream" }`,
      },
      {
        method: "GET",
        path: "/portfolios/{id}",
        summary: "Fetch a portfolio snapshot with derived metrics.",
        auth: "Bearer (local)",
        rateLimit: "Unmetered on local dev",
      },
    ],
    relatedSystems: ["vestra"],
    relatedAdrs: [],
  },
  {
    slug: "quantedge-research",
    code: "API-02",
    name: "QuantEdge Research API",
    system: "quantedge",
    version: "v0.3",
    stability: "Internal",
    baseUrl: "https://api.local/qe/v0",
    owner: "VÆRØX",
    updated: "2026-06-18",
    summary: "Programmatic surface for defining strategies and launching walk-forward runs.",
    authNote: "Local development only.",
    endpoints: [
      {
        method: "POST",
        path: "/runs",
        summary: "Launch a walk-forward evaluation for a strategy spec.",
        auth: "Bearer (local)",
        rateLimit: "Unmetered on local dev",
        request: `{ "strategy": "momentum_3f", "window": "2015-01-01/2025-01-01" }`,
        response: `{ "run_id": "run_01HZ...", "status": "queued" }`,
      },
      {
        method: "GET",
        path: "/runs/{id}/report",
        summary: "Fetch the full walk-forward report with Sharpe / drawdown / turnover.",
        auth: "Bearer (local)",
        rateLimit: "Unmetered on local dev",
      },
    ],
    relatedSystems: ["quantedge"],
    relatedAdrs: [],
  },
  {
    slug: "marketpulse-classify",
    code: "API-03",
    name: "MarketPulse Classification API",
    system: "marketpulse",
    version: "v0.6",
    stability: "Beta",
    baseUrl: "https://api.local/mp/v0",
    owner: "VÆRØX",
    updated: "2026-06-19",
    summary: "Classify news headlines and short bodies against the MarketPulse tag ontology.",
    authNote: "Beta; API surface may change without notice.",
    endpoints: [
      {
        method: "POST",
        path: "/classify",
        summary: "Classify one or more items in a single call.",
        auth: "Bearer",
        rateLimit: "60 items / minute (prototype)",
        request: `{ "items": [{ "id": "n_1", "headline": "..." }] }`,
        response: `{ "results": [{ "id": "n_1", "tags": ["earnings","tech"], "confidence": 0.91 }] }`,
      },
    ],
    relatedSystems: ["marketpulse"],
    relatedAdrs: [],
  },
  {
    slug: "aegis-triage",
    code: "API-04",
    name: "AEGIS OPS Triage API",
    system: "aegis-ops",
    version: "v0.3",
    stability: "Internal",
    baseUrl: "https://api.local/aegis/v0",
    owner: "VÆRØX",
    updated: "2026-06-27",
    summary: "Submit alerts to the triage workflow and fetch analyst-facing summaries.",
    authNote: "Internal; runs against synthetic SIEM traces.",
    endpoints: [
      {
        method: "POST",
        path: "/alerts",
        summary: "Submit an alert for triage.",
        auth: "Bearer",
        rateLimit: "30 / minute (prototype)",
      },
      {
        method: "GET",
        path: "/triage/{alert_id}",
        summary: "Fetch the current triage state and workflow trace.",
        auth: "Bearer",
        rateLimit: "120 / minute",
      },
    ],
    relatedSystems: ["aegis-ops"],
    relatedAdrs: [],
  },
  {
    slug: "leadpulse-scoring",
    code: "API-05",
    name: "LeadPulse Scoring API",
    system: "leadpulse",
    version: "v0.3",
    stability: "Internal",
    baseUrl: "https://api.local/lp/v0",
    owner: "VÆRØX",
    updated: "2026-06-12",
    summary: "Score accounts and leads with the LeadPulse prototype model.",
    authNote: "Internal; scoring runs against synthetic pipelines.",
    endpoints: [
      {
        method: "POST",
        path: "/score",
        summary: "Score a batch of accounts.",
        auth: "Bearer",
        rateLimit: "200 accounts / minute",
      },
    ],
    relatedSystems: ["leadpulse"],
    relatedAdrs: [],
  },
  {
    slug: "cloudcostiq-attribution",
    code: "API-06",
    name: "CloudCostIQ Attribution API",
    system: "cloudcostiq",
    version: "v0.3",
    stability: "Internal",
    baseUrl: "https://api.local/ccq/v0",
    owner: "VÆRØX",
    updated: "2026-06-22",
    summary: "Ingest billing exports, request attribution rollups, and pull forecasts.",
    authNote: "Internal; runs against synthetic billing exports.",
    endpoints: [
      {
        method: "POST",
        path: "/exports",
        summary: "Register a new CUR-shaped export for ingestion.",
        auth: "Bearer",
        rateLimit: "10 / minute",
      },
      {
        method: "GET",
        path: "/rollups",
        summary: "Retrieve attribution rollups by tag, team, or workload.",
        auth: "Bearer",
        rateLimit: "60 / minute",
      },
    ],
    relatedSystems: ["cloudcostiq"],
    relatedAdrs: [],
  },
  {
    slug: "axiom-workflow",
    code: "API-07",
    name: "Axiom Workflow API",
    system: "axiom",
    version: "v0.2",
    stability: "Internal",
    baseUrl: "https://api.local/axiom/v0",
    owner: "VÆRØX",
    updated: "2026-06-08",
    summary: "Submit workflow definitions, launch runs, and inspect replay traces.",
    authNote: "Internal prototype.",
    endpoints: [
      {
        method: "POST",
        path: "/workflows",
        summary: "Register a workflow definition.",
        auth: "Bearer",
        rateLimit: "60 / minute",
      },
      {
        method: "POST",
        path: "/runs",
        summary: "Launch a run of a registered workflow.",
        auth: "Bearer",
        rateLimit: "60 / minute",
      },
    ],
    relatedSystems: ["axiom"],
    relatedAdrs: [],
  },
];
