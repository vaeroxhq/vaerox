import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VÆRØX" },
      {
        name: "description",
        content:
          "VÆRØX is an independent AI & software engineering studio. What it is, how it works, and how to read the rest of the site.",
      },
      { property: "og:title", content: "About — VÆRØX" },
      {
        property: "og:description",
        content: "An independent AI & software engineering studio. One place. One purpose per page.",
      },
    ],
  }),
  component: AboutPage,
});

/**
 * About — the ONE place identity, model, and site-map narrative live.
 * All other pages must reference this instead of restating it.
 * Absorbs the former /why, /process, /engagements, /faq intros.
 */
function AboutPage() {
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "About" }]} />

      <PageHeader
        section="§ · About"
        title="An independent engineering studio."
        summary="VÆRØX designs, builds and maintains modern software systems for startups, growing businesses and enterprise teams. Every system on this site is engineered under the same discipline we bring to client work."
        meta={[
          { label: "Model",       value: "Independent" },
          { label: "Focus",       value: "AI & Software" },
          { label: "Engagements", value: "Fixed / Capped" },
          { label: "Established", value: "2021" },
        ]}
      />

      <DocShell>
        <article className="max-w-[720px]">
          <DocBlock heading="What we do">
            <p className="text-[14.5px] text-text-2 leading-[1.75]">
              We build AI agents, SaaS products, internal tools, backend
              platforms, and workflow automation. Discovery, architecture,
              implementation, deployment, and maintenance — end-to-end, in
              one team.
            </p>
          </DocBlock>

          <DocBlock heading="How we work">
            <p className="text-[14.5px] text-text-2 leading-[1.75]">
              Fixed-scope MVPs, capped-cost builds, and long-form retainers.
              Written proposal inside a week, weekly demo cadence, and a
              hand-off package on delivery. No open-ended time-and-materials
              contracts.
            </p>
          </DocBlock>

          <DocBlock heading="How to read the site">
            <ul className="hairline bg-canvas">
              {[
                ["/services",     "What we build — capability catalogue."],
                ["/projects",     "What we've built — canonical systems and dossiers."],
                ["/architecture", "Why technical decisions were made — ADRs and diagrams."],
                ["/research",     "Experiments and investigations."],
                ["/journal",      "Chronological engineering notes."],
                ["/engineering",  "Internal standards the studio follows."],
                ["/technologies", "The tools and platforms we use."],
                ["/benchmarks",   "Validation methodology and measurements."],
              ].map(([path, body], i, arr) => (
                <li key={path} className={`grid grid-cols-[160px_1fr] gap-4 px-4 py-3 items-baseline ${i < arr.length - 1 ? "hairline-b" : ""}`}>
                  <a href={path} className="font-mono text-[12px] text-text-1 hover:text-text-2">{path}</a>
                  <span className="text-[13px] text-text-2">{body}</span>
                </li>
              ))}
            </ul>
          </DocBlock>
        </article>
      </DocShell>
    </SectionShell>
  );
}
