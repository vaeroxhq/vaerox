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
          "VÆRØX is an independent engineering laboratory, written and maintained by one engineer. Public research, reference implementations, and long-form engineering documentation.",
      },
      { property: "og:title", content: "About — VÆRØX" },
      {
        property: "og:description",
        content:
          "An independent engineering laboratory. One maintainer. Public artifacts. No marketing.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "About" }]} />

      <PageHeader
        section="§ · About"
        title="An independent engineering laboratory."
        summary="VÆRØX is a public engineering lab, written and maintained by one engineer. It is not a company, not a product, and not a team. It is a durable, public record of one engineer's architectural work."
        meta={[
          { label: "Model",       value: "Independent lab" },
          { label: "Maintainer",  value: "Solo" },
          { label: "License",     value: "Public" },
          { label: "Established", value: "2021" },
        ]}
      />

      <DocShell>
        <article className="max-w-[720px]">
          <DocBlock heading="What this is">
            <p className="text-[14.5px] text-text-2 leading-[1.75]">
              VÆRØX publishes architecture exploration for enterprise AI, distributed platforms,
              low-latency infrastructure, and the practices around them. Systems are built as
              reference implementations, not products. Decisions are recorded as ADRs.
              Failures are written up as post-mortems. Numbers are cited with methodology.
            </p>
            <p className="mt-4 text-[14.5px] text-text-2 leading-[1.75]">
              The intent is durability. Every URL, taxonomy, and interface on this site is
              chosen to remain stable across years. The goal is a record that is worth
              re-reading, not a launch page.
            </p>
          </DocBlock>

          <DocBlock heading="Who runs it">
            <p className="text-[14.5px] text-text-2 leading-[1.75]">
              VÆRØX is written, built, operated, and reviewed by one engineer. There is no
              team behind the byline. Where the site refers to a{" "}
              <span className="font-mono text-[13px] text-text-1">Maintainer</span>, it means
              the same person; where it refers to a surface — Platform, Inference,
              Observability, Reliability, Distributed Systems, Edge, Security, Performance,
              Public Research — it means an area of practice the lab explores, not a team of
              humans.
            </p>
          </DocBlock>

          <DocBlock heading="What the systems are">
            <p className="text-[14.5px] text-text-2 leading-[1.75]">
              The systems listed under{" "}
              <a href="/systems" className="text-text-1 underline decoration-line-3 underline-offset-4 hover:decoration-text-2">/systems</a>{" "}
              are reference implementations. They run in the lab. They exercise the
              architecture described in their ADRs. They are not commercial services,
              they have no external SLA, and they do not carry customer traffic. Where a
              system is marked{" "}
              <span className="font-mono text-[13px] text-text-1">Production</span>, that
              means it runs continuously in the lab and its behavior is the subject of the
              published measurements — not that it serves external users.
            </p>
          </DocBlock>

          <DocBlock heading="What the numbers mean">
            <p className="text-[14.5px] text-text-2 leading-[1.75]">
              Every published benchmark cites the workload, the hardware, and the harness.
              Every dashboard on{" "}
              <a href="/dashboards" className="text-text-1 underline decoration-line-3 underline-offset-4 hover:decoration-text-2">/dashboards</a>{" "}
              is a deterministic, seeded time-series — a shape, not a live feed. Absent
              methodology, absent claim.
            </p>
          </DocBlock>

          <DocBlock heading="Principles">
            <ol className="hairline bg-canvas">
              {[
                ["01", "Engineering over marketing", "Artifacts are chosen for technical accuracy first. No hero copy stands in for a benchmark."],
                ["02", "Documented in public",       "Architecture decisions, incident reviews, and post-mortems are written to be re-read."],
                ["03", "Honest about scope",         "One maintainer. Reference implementations. No fabricated org, no fabricated traffic, no fabricated SLA."],
                ["04", "Long-term URLs",             "Interfaces, taxonomies, and paths are chosen to remain stable for years, not quarters."],
                ["05", "Cited numbers",              "Every measurement carries its methodology, hardware, and workload."],
              ].map(([n, t, b], i, arr) => (
                <li key={n} className={`grid grid-cols-[48px_1fr] gap-4 px-4 py-4 ${i < arr.length - 1 ? "hairline-b" : ""}`}>
                  <span className="font-mono text-[11px] text-text-3 tabular pt-1">{n}</span>
                  <div>
                    <div className="font-display text-[14.5px] text-text-1 tracking-[-0.008em]">{t}</div>
                    <div className="mt-1 text-[13px] text-text-2 leading-[1.6]">{b}</div>
                  </div>
                </li>
              ))}
            </ol>
          </DocBlock>

          <DocBlock heading="How to read the site">
            <ul className="hairline bg-canvas">
              {[
                ["/systems",      "Reference implementations maintained in the lab."],
                ["/architecture", "Decision records, ordered and cross-linked."],
                ["/incidents",    "Post-mortems for events that occurred in the lab."],
                ["/benchmarks",   "Standing measurements with methodology attached."],
                ["/research",     "Long-form notes, evaluation harnesses, and critique."],
                ["/engineering",  "The handbook the lab itself follows."],
                ["/journal",      "Chronological entries as they were written."],
                ["/graph",        "How every artifact connects to every other."],
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
