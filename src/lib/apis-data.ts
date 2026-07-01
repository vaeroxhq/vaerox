/**
 * Public API surfaces. These are the canonical contracts customers
 * and internal services build against.
 */

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "STREAM";
export type ApiStability = "Stable" | "Beta" | "Internal" | "Deprecated";

export type ApiEndpoint = {
  method: ApiMethod;
  path: string;
  summary: string;
  auth: string;
  rateLimit: string;
  request?: string;   // JSON snippet
  response?: string;  // JSON snippet
};

export type ApiSpec = {
  slug: string;
  code: string;           // API-01
  name: string;
  system: string;         // system slug
  version: string;        // v1.9
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
    slug: "helix-inference",
    code: "API-01",
    name: "Helix Inference API",
    system: "helix",
    version: "v1.9",
    stability: "Stable",
    baseUrl: "https://api.vaerox.dev/helix/v1",
    owner: "Inference",
    updated: "2026-06-24",
    summary: "Streaming and batch inference against the Helix serving fleet. gRPC-first with an HTTP/2 JSON edge.",
    authNote: "Bearer token (workload identity) or mTLS with tenant-scoped SPIFFE ID. Requests must set X-Tenant-Id.",
    endpoints: [
      {
        method: "STREAM",
        path: "/completions:stream",
        summary: "Bidirectional stream. Tokens emitted as they are decoded.",
        auth: "Bearer / mTLS",
        rateLimit: "128 concurrent streams per tenant, 4 QPS burst",
        request: `{
  "model": "helix-large-1.9",
  "prompt": "Explain expert-parallel serving.",
  "max_output_tokens": 512,
  "temperature": 0.2,
  "stream_options": { "include_usage": true }
}`,
        response: `event: token
data: {"token": "Expert", "logprob": -0.42}

event: token
data: {"token": "-parallel", "logprob": -0.11}

event: usage
data: {"input_tokens": 7, "output_tokens": 2}`,
      },
      {
        method: "POST",
        path: "/completions",
        summary: "Synchronous completion; blocks until final token.",
        auth: "Bearer / mTLS",
        rateLimit: "32 QPS per tenant",
        request: `{
  "model": "helix-large-1.9",
  "prompt": "Summarise ADR·014.",
  "max_output_tokens": 256
}`,
        response: `{
  "id": "cmpl_01HZ...",
  "output": "ADR·014 adopts gRPC bidirectional streams...",
  "usage": { "input_tokens": 5, "output_tokens": 128 }
}`,
      },
      {
        method: "POST",
        path: "/embeddings",
        summary: "Return embeddings for one or more inputs.",
        auth: "Bearer / mTLS",
        rateLimit: "64 QPS per tenant",
        request: `{
  "model": "helix-embed-1.2",
  "inputs": ["expert parallelism", "structured batching"]
}`,
        response: `{
  "vectors": [[0.041, -0.128, ...], [...]],
  "usage": { "input_tokens": 4 }
}`,
      },
      {
        method: "GET",
        path: "/models",
        summary: "List available models with capability metadata.",
        auth: "Bearer",
        rateLimit: "10 QPS per tenant",
        response: `[
  { "id": "helix-large-1.9", "context": 128000, "modality": ["text"] },
  { "id": "helix-embed-1.2", "dim": 1024 }
]`,
      },
    ],
    relatedSystems: ["helix"],
    relatedAdrs: ["grpc-framing"],
  },
  {
    slug: "atlas-control",
    code: "API-02",
    name: "Atlas Control API",
    system: "atlas",
    version: "v3.8",
    stability: "Stable",
    baseUrl: "https://api.vaerox.dev/atlas/v3",
    owner: "Platform",
    updated: "2026-06-25",
    summary: "Declarative control plane: workloads, placements, tenants, quotas.",
    authNote: "Workload identity via SPIFFE; policy enforcement via OPA at the API edge.",
    endpoints: [
      {
        method: "PUT",
        path: "/workloads/{id}",
        summary: "Apply a workload spec. Idempotent by hash of spec.",
        auth: "SPIFFE",
        rateLimit: "60 spec-writes / tenant / min",
        request: `{
  "kind": "Workload",
  "id": "helix-serving-eu",
  "regions": ["eu-west-1", "eu-north-1"],
  "replicas": 42,
  "placement": {
    "kv_footprint_weight": 0.7,
    "context_length_weight": 0.3
  }
}`,
        response: `{
  "revision": "wr_01HZ...",
  "status": "Reconciling",
  "placements": []
}`,
      },
      {
        method: "GET",
        path: "/workloads/{id}",
        summary: "Fetch workload state, including current placements.",
        auth: "SPIFFE",
        rateLimit: "600 QPS / tenant",
        response: `{
  "id": "helix-serving-eu",
  "revision": "wr_01HZ...",
  "status": "Ready",
  "placements": [
    { "region": "eu-west-1", "cell": "c14", "replicas": 24 },
    { "region": "eu-north-1", "cell": "c07", "replicas": 18 }
  ]
}`,
      },
      {
        method: "POST",
        path: "/tenants/{id}/quotas",
        summary: "Update quota ceiling. Reconciled asynchronously.",
        auth: "SPIFFE (admin scope)",
        rateLimit: "10 / tenant / min",
      },
      {
        method: "GET",
        path: "/placements",
        summary: "List placements matching a selector.",
        auth: "SPIFFE",
        rateLimit: "300 QPS / tenant",
      },
    ],
    relatedSystems: ["atlas"],
    relatedAdrs: ["region-failover", "consensus-model"],
  },
  {
    slug: "orbit-query",
    code: "API-03",
    name: "Orbit Query API",
    system: "orbit",
    version: "v2.3",
    stability: "Stable",
    baseUrl: "https://api.vaerox.dev/orbit/v2",
    owner: "Observability",
    updated: "2026-06-14",
    summary: "Trace, span, and metric queries against the Orbit store.",
    authNote: "Bearer token, tenant-scoped. Analyst tokens carry read-only scopes.",
    endpoints: [
      {
        method: "POST",
        path: "/traces/search",
        summary: "Search traces by service, tag, or SLO breach flag.",
        auth: "Bearer",
        rateLimit: "40 QPS per tenant",
        request: `{
  "service": "helix",
  "since": "2026-06-24T00:00:00Z",
  "min_duration_ms": 250,
  "slo_breach": true,
  "limit": 100
}`,
        response: `{
  "traces": [
    { "id": "t_01HZ...", "duration_ms": 412, "span_count": 34 }
  ],
  "returned": 87
}`,
      },
      {
        method: "GET",
        path: "/traces/{id}",
        summary: "Retrieve a trace with all spans.",
        auth: "Bearer",
        rateLimit: "200 QPS per tenant",
      },
      {
        method: "POST",
        path: "/metrics/query",
        summary: "PromQL-compatible query surface over the columnar store.",
        auth: "Bearer",
        rateLimit: "20 QPS per tenant",
      },
    ],
    relatedSystems: ["orbit"],
    relatedAdrs: ["trace-sampling"],
  },
  {
    slug: "signal-router-admin",
    code: "API-04",
    name: "Signal Router Admin API",
    system: "signal-router",
    version: "v0.8",
    stability: "Beta",
    baseUrl: "https://api.vaerox.dev/signal/v0",
    owner: "Edge Infra",
    updated: "2026-06-08",
    summary: "Subscription topology, credit accounting, and runtime SQ tuning.",
    authNote: "SPIFFE; the write scope is restricted to on-call and Edge Infra.",
    endpoints: [
      {
        method: "GET",
        path: "/topologies/{id}",
        summary: "Return publisher/subscriber graph and current credit state.",
        auth: "SPIFFE",
        rateLimit: "60 QPS",
      },
      {
        method: "PATCH",
        path: "/tuning/sq-depth",
        summary: "Resize submission-queue depth at runtime.",
        auth: "SPIFFE (write)",
        rateLimit: "6 / min",
        request: `{ "sq_depth": 8192, "reason": "burst-of-bursts from tenant bulk-ingest" }`,
      },
    ],
    relatedSystems: ["signal-router"],
    relatedAdrs: ["io-uring-router"],
  },
  {
    slug: "meridian-eval",
    code: "API-05",
    name: "Meridian Eval API",
    system: "meridian-eval",
    version: "v0.6",
    stability: "Internal",
    baseUrl: "https://api.internal.vaerox.dev/meridian/v0",
    owner: "Research Infra",
    updated: "2026-06-11",
    summary: "Submit eval runs, query historical results, diff two runs.",
    authNote: "Internal only. Bearer token issued via research workspace.",
    endpoints: [
      {
        method: "POST",
        path: "/runs",
        summary: "Submit an eval run with an explicit manifest.",
        auth: "Bearer",
        rateLimit: "30 / hour",
        request: `{
  "manifest": {
    "suite": "canonical.q2",
    "model": "helix-large-1.9",
    "seed": { "env": 42, "agent": 128 },
    "tool_budget": 24
  }
}`,
        response: `{ "run_id": "run_01HZ...", "status": "Queued" }`,
      },
      {
        method: "GET",
        path: "/runs/{id}/results",
        summary: "Return results with per-task scoring.",
        auth: "Bearer",
        rateLimit: "60 QPS",
      },
      {
        method: "GET",
        path: "/diff",
        summary: "Diff two runs by manifest overlap.",
        auth: "Bearer",
        rateLimit: "20 QPS",
      },
    ],
    relatedSystems: ["meridian-eval"],
    relatedAdrs: ["eval-harness"],
  },
  {
    slug: "marketpulse-stream",
    code: "API-06",
    name: "MarketPulse Stream API",
    system: "marketpulse",
    version: "v4.5",
    stability: "Stable",
    baseUrl: "wss://stream.vaerox.dev/marketpulse/v4",
    owner: "Market Data",
    updated: "2026-06-28",
    summary: "Normalized tick and bar streams. Kernel-bypass edge, WebSocket public edge.",
    authNote: "Bearer token, entitlement-scoped by venue.",
    endpoints: [
      {
        method: "STREAM",
        path: "/ticks",
        summary: "Subscribe to normalized tick stream.",
        auth: "Bearer",
        rateLimit: "n/a — session-scoped",
        request: `{ "subscribe": ["AAPL", "MSFT", "NVDA"], "venue": ["NASDAQ", "NYSE"] }`,
        response: `{ "sym": "NVDA", "venue": "NASDAQ", "t": 1719572400123456, "p": 1183.44, "sz": 100 }`,
      },
      {
        method: "STREAM",
        path: "/bars/{interval}",
        summary: "Subscribe to bar stream. Interval one of 1s/5s/1m/5m.",
        auth: "Bearer",
        rateLimit: "n/a",
      },
    ],
    relatedSystems: ["marketpulse"],
    relatedAdrs: [],
  },
];
