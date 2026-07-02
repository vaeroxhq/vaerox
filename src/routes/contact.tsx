import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact VÆRØX — AI & Software Engineering Studio" },
      {
        name: "description",
        content:
          "Reach the VÆRØX engineering studio. Book a discovery call, brief your project, or request a written proposal. Typical response within 24 hours.",
      },
      { property: "og:title", content: "Contact — VÆRØX" },
      { property: "og:description", content: "Start a project with VÆRØX. Fast response, transparent process, fixed scope." },
    ],
  }),
  component: ContactPage,
});

const CTAS: [string, string][] = [
  ["Book a discovery call", "A 30-minute async or live conversation to understand the problem, the timeline, and where the risk sits."],
  ["Discuss your project", "Bring an early idea, a written brief, or a working system that needs to grow — we'll write back with questions."],
  ["Request a proposal", "A short technical brief with proposed architecture, milestones, and a fixed or capped estimate. Delivered inside a week."],
  ["Build your MVP", "Take a validated idea to a shippable v1 — architected properly from day one so it survives v2."],
  ["Modernize existing software", "Incremental replacement of aging systems without stopping the business that depends on them."],
  ["Automate business processes", "AI-assisted workflows for the operational work that currently eats your team's week."],
];

function ContactPage() {
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Contact" }]} />

      <PageHeader
        section="§ · Contact"
        title="Start a project."
        summary="VÆRØX is an independent AI & software engineering studio. Reach us to discuss your project, book a discovery call, or request a written proposal — we reply within 24 hours."
        meta={[
          { label: "Response",  value: "Within 24 hours" },
          { label: "Timezone",  value: "IST (UTC+5:30)" },
          { label: "Availability", value: "Remote, Worldwide" },
          { label: "Process",   value: "Transparent, Fixed" },
        ]}
      />

      <DocShell>
        <article className="max-w-[820px]">
          <DocBlock heading="What to write about">
            <ul className="hairline bg-canvas">
              {CTAS.map(([t, b], i, arr) => (
                <li key={t} className={`grid grid-cols-[220px_1fr] gap-4 px-4 py-4 ${i < arr.length - 1 ? "hairline-b" : ""}`}>
                  <a
                    href={`mailto:hello@vaerox.dev?subject=${encodeURIComponent(t)}`}
                    className="font-mono text-[11.5px] text-text-1 uppercase tracking-[0.12em] hover:opacity-70 transition-micro"
                  >
                    {t} →
                  </a>
                  <span className="text-[13px] text-text-2 leading-[1.6]">{b}</span>
                </li>
              ))}
            </ul>
          </DocBlock>

          <DocBlock heading="Direct channels">
            <ul className="hairline bg-canvas">
              <li className="grid grid-cols-[140px_1fr] gap-4 px-4 py-4 items-baseline hairline-b">
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Email</span>
                <a href="mailto:hello@vaerox.dev" className="font-mono text-[13px] text-text-1 hover:text-text-2">hello@vaerox.dev</a>
              </li>
              <li className="grid grid-cols-[140px_1fr] gap-4 px-4 py-4 items-baseline hairline-b">
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">LinkedIn</span>
                <a href="https://www.linkedin.com/company/vaerox" target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-text-1 hover:text-text-2">/company/vaerox</a>
              </li>
              <li className="grid grid-cols-[140px_1fr] gap-4 px-4 py-4 items-baseline hairline-b">
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Instagram</span>
                <a href="https://instagram.com/vaeroxlabs" target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-text-1 hover:text-text-2">@vaeroxlabs</a>
              </li>
              <li className="grid grid-cols-[140px_1fr] gap-4 px-4 py-4 items-baseline">
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Security</span>
                <a href="mailto:security@vaerox.dev" className="font-mono text-[13px] text-text-1 hover:text-text-2">security@vaerox.dev</a>
              </li>
            </ul>
          </DocBlock>

          <DocBlock heading="What happens next">
            <ol className="hairline bg-canvas">
              {[
                ["01", "You send a short note", "A paragraph is fine. What you're building, who it's for, and where the timeline sits."],
                ["02", "We reply with questions", "Within a week. The goal is to understand the actual problem before scoping anything."],
                ["03", "We send a written proposal", "Architecture, milestones, and a fixed or capped estimate. Inside a week from the scoping conversation."],
                ["04", "We start the work", "Weekly written updates. Everything under version control from day one."],
              ].map(([n, t, b], i, arr) => (
                <li key={n} className={`grid grid-cols-[64px_1fr] gap-6 px-5 py-5 ${i < arr.length - 1 ? "hairline-b" : ""}`}>
                  <span className="font-mono text-[12px] text-text-3 tabular tracking-[0.06em]">{n}</span>
                  <div>
                    <div className="font-display text-[16px] text-text-1 tracking-[-0.012em]">{t}</div>
                    <p className="mt-1.5 text-[13px] text-text-2 leading-[1.6]">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </DocBlock>
        </article>
      </DocShell>
    </SectionShell>
  );
}
