import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

const FAQS: [string, string][] = [
  ["Is VÆRØX a company or a person?",
    "VÆRØX is an independent engineering studio operated by one engineer. Every artifact on this site — architecture, code, writing — is authored by the same person. The About page introduces the founder; every other page speaks in the studio's voice."],
  ["What do you actually build?",
    "AI agents, LLM applications, RAG systems, MCP servers, workflow automation, backend platforms, internal business software, computer vision pipelines, and the data engineering underneath. See /services for the full list, and /case-studies for real work."],
  ["What technologies do you use?",
    "Python, TypeScript, FastAPI, Node, PostgreSQL, Redis, DuckDB, LangGraph, OpenAI, Anthropic, Gemini, PyTorch, React, Tailwind, Docker, AWS. The full stack is on /capabilities."],
  ["How do you engage on a project?",
    "Scoping conversation → written proposal → prototype of the riskiest piece → incremental build → evaluation → handover. Six steps, documented on /process."],
  ["Are the systems on this site in production?",
    "No. The canonical VÆRØX systems are reference implementations at Building, Prototype, or Research stage — labeled honestly on every page. They exercise the architecture the studio brings to client work; they are not commercial services."],
  ["Do you work fixed-price or time-and-materials?",
    "Both. Fixed price for well-scoped work with a clear deliverable. Capped time-and-materials for research-flavored engagements where the shape of the answer is part of the work. The proposal makes the choice explicit."],
  ["Do you subcontract or work with a team?",
    "The studio is a single engineer. Larger engagements are staffed by hand, with named collaborators, only when the shape of the work genuinely requires it. There is no hidden team."],
  ["Where can I see real code?",
    "The systems on /systems, the case studies on /case-studies, the ADRs on /architecture, and the write-ups on /journal all reflect real work. Repository links are provided where they exist and are publishable."],
  ["How do I start a conversation?",
    "Email hello@vaerox.dev or use /contact. Include what you're trying to build, roughly when you need it, and any constraints you already know about."],
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — VÆRØX" },
      { name: "description", content: "Frequently asked questions about how VÆRØX engages and what it builds." },
      { property: "og:title", content: "FAQ — VÆRØX" },
      { property: "og:description", content: "How the studio works, what it builds, and how to start." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "FAQ" }]} />
      <PageHeader
        section="§ · FAQ"
        title="Frequently asked questions."
        summary="What VÆRØX is, what it builds, and how to engage. If a question isn't here, email hello@vaerox.dev."
        meta={[
          { label: "Questions", value: FAQS.length.toString().padStart(2, "0") },
          { label: "Contact",   value: "hello@vaerox.dev" },
          { label: "Model",     value: "Studio" },
          { label: "Updated",   value: "2026-07-01" },
        ]}
      />

      <dl className="hairline bg-canvas">
        {FAQS.map(([q, a], i, arr) => (
          <div key={q} className={`grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 px-5 py-6 ${i < arr.length - 1 ? "hairline-b" : ""}`}>
            <dt className="font-display text-[15px] text-text-1 tracking-[-0.008em]">{q}</dt>
            <dd className="text-[13.5px] text-text-2 leading-[1.7]">{a}</dd>
          </div>
        ))}
      </dl>
    </SectionShell>
  );
}
