/**
 * Capabilities — the stack VÆRØX ships in.
 * Grouped by domain so the surface reads as a company capabilities page,
 * not a résumé skills list.
 */
export type CapabilityGroup = {
  code: string;
  name: string;
  summary: string;
  items: { name: string; note: string }[];
};

export const CAPABILITIES: CapabilityGroup[] = [
  {
    code: "CAP-01",
    name: "Languages & Runtimes",
    summary: "The languages the studio writes production code in.",
    items: [
      { name: "Python", note: "Backend services, agents, data, ML" },
      { name: "TypeScript", note: "Frontend, workflow runtimes, MCP servers" },
      { name: "SQL", note: "Postgres and DuckDB, hand-written" },
      { name: "Bash", note: "Ops glue, migrations, one-shot tools" },
    ],
  },
  {
    code: "CAP-02",
    name: "AI & LLM",
    summary: "Model providers, orchestration, and evaluation.",
    items: [
      { name: "OpenAI", note: "GPT-4 class reasoning and structured output" },
      { name: "Anthropic", note: "Claude for long-context and tool use" },
      { name: "Gemini", note: "Multimodal and cost-sensitive workloads" },
      { name: "LangGraph", note: "Typed agent graphs with state and replay" },
      { name: "MCP", note: "Model Context Protocol server implementations" },
      { name: "pgvector", note: "Vector retrieval alongside relational data" },
    ],
  },
  {
    code: "CAP-03",
    name: "Backend & Data",
    summary: "The services and stores behind every VÆRØX system.",
    items: [
      { name: "FastAPI", note: "Typed Python HTTP services" },
      { name: "Node", note: "TypeScript backends and runtimes" },
      { name: "PostgreSQL", note: "Primary transactional store, with jsonb where it earns it" },
      { name: "Redis", note: "Caching, queues, session state" },
      { name: "DuckDB", note: "Analytical workloads and reproducible research" },
      { name: "Temporal", note: "Durable workflow orchestration" },
    ],
  },
  {
    code: "CAP-04",
    name: "Frontend",
    summary: "Interfaces built to be used every day.",
    items: [
      { name: "React", note: "Component model of choice" },
      { name: "TanStack Start", note: "File-based routing with SSR" },
      { name: "Tailwind CSS", note: "Design tokens, not utility soup" },
      { name: "Vite", note: "Build tooling" },
    ],
  },
  {
    code: "CAP-05",
    name: "ML & Computer Vision",
    summary: "Applied ML with real evaluation.",
    items: [
      { name: "PyTorch", note: "Training and fine-tuning" },
      { name: "OpenCV", note: "Classical vision pipelines" },
      { name: "ONNX", note: "Model portability and inference" },
      { name: "SimPy", note: "Discrete-event simulation" },
    ],
  },
  {
    code: "CAP-06",
    name: "Infrastructure",
    summary: "How the software gets to production.",
    items: [
      { name: "Docker", note: "Containerisation across services" },
      { name: "AWS", note: "Primary cloud target" },
      { name: "GitHub", note: "Source of truth and CI" },
      { name: "Linux", note: "Runtime everywhere" },
    ],
  },
];
