import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VÆRØX" },
      { name: "description", content: "Reach the maintainer of VÆRØX. One inbox. Async by default." },
      { property: "og:title", content: "Contact — VÆRØX" },
      { property: "og:description", content: "Reach the maintainer of VÆRØX." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Contact" }]} />

      <PageHeader
        section="§ · Contact"
        title="Reach the maintainer."
        summary="VÆRØX is maintained by one engineer. There is no support desk and no sales channel — one inbox, read on the maintainer's cadence."
        meta={[
          { label: "Channel",  value: "Email" },
          { label: "Cadence",  value: "Async" },
          { label: "Response", value: "Days, not hours" },
          { label: "PGP",      value: "On request" },
        ]}
      />

      <DocShell>
        <article className="max-w-[680px]">
          <DocBlock heading="Get in touch">
            <ul className="hairline bg-canvas">
              <li className="grid grid-cols-[140px_1fr] gap-4 px-4 py-4 items-baseline hairline-b">
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Email</span>
                <a href="mailto:hello@vaerox.dev" className="font-mono text-[13px] text-text-1 hover:text-text-2">hello@vaerox.dev</a>
              </li>
              <li className="grid grid-cols-[140px_1fr] gap-4 px-4 py-4 items-baseline hairline-b">
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Corrections</span>
                <a href="mailto:corrections@vaerox.dev" className="font-mono text-[13px] text-text-1 hover:text-text-2">corrections@vaerox.dev</a>
              </li>
              <li className="grid grid-cols-[140px_1fr] gap-4 px-4 py-4 items-baseline">
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Security</span>
                <a href="mailto:security@vaerox.dev" className="font-mono text-[13px] text-text-1 hover:text-text-2">security@vaerox.dev</a>
              </li>
            </ul>
          </DocBlock>

          <DocBlock heading="What is worth writing about">
            <ul className="hairline bg-canvas">
              {[
                ["Corrections", "Errata, misattributions, or broken links in any published artifact."],
                ["Reproduction", "You ran a benchmark on documented hardware and got different numbers."],
                ["Collaboration", "You are working on adjacent problems and want to compare notes."],
                ["Reading", "Pointers to papers, RFCs, or write-ups that belong in the record."],
              ].map(([t, b], i, arr) => (
                <li key={t} className={`grid grid-cols-[140px_1fr] gap-4 px-4 py-3 ${i < arr.length - 1 ? "hairline-b" : ""}`}>
                  <span className="font-mono text-[11px] text-text-2 uppercase tracking-[0.12em] pt-0.5">{t}</span>
                  <span className="text-[13px] text-text-2 leading-[1.6]">{b}</span>
                </li>
              ))}
            </ul>
          </DocBlock>

          <DocBlock heading="What this is not">
            <p className="text-[13.5px] text-text-2 leading-[1.7]">
              VÆRØX is not a product, not a service, and not a team. There is no
              hiring pipeline, no support tier, and no on-call rotation. Messages are
              read and answered when the maintainer has time to answer them properly.
            </p>
          </DocBlock>
        </article>
      </DocShell>
    </SectionShell>
  );
}
