import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ADRS, type Adr } from "@/lib/architecture-data";
import { PageHeader, SectionShell, StageDot } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { RelatedRail } from "@/components/doc/related-rail";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { PrevNext } from "@/components/doc/prev-next";
import { OpsTag } from "@/components/ops/ops-tag";

export const Route = createFileRoute("/architecture/$adr")({
  loader: ({ params }) => {
    const adr = ADRS.find((a) => a.slug === params.adr);
    if (!adr) throw notFound();
    return { adr };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.adr;
    const title = a ? `ADR·${a.number} · ${a.title} — VÆRØX` : "ADR — VÆRØX";
    const desc = a?.context ?? "Architecture Decision Record.";
    return {
      meta: [
        { title },
        { name: "description", content: desc.slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: desc.slice(0, 160) },
      ],
    };
  },
  component: AdrPage,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader section="§ · Architecture" title="ADR not found." summary="This decision record could not be located." />
      <Link to="/architecture" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1">← Back to architecture</Link>
    </SectionShell>
  ),
});

function AdrPage() {
  const { adr } = Route.useLoaderData() as { adr: Adr };
  const tone =
    adr.status === "Accepted" ? "success"
    : adr.status === "Proposed" ? "info"
    : adr.status === "Draft" ? "warning"
    : "muted";

  const sorted = [...ADRS].sort((a, b) => a.number.localeCompare(b.number));
  const idx = sorted.findIndex((a) => a.slug === adr.slug);
  const prev = sorted[idx - 1];
  const next = sorted[idx + 1];

  return (
    <SectionShell>
      <Breadcrumbs items={[
        { label: "VÆRØX", to: "/" },
        { label: "Architecture", to: "/architecture" },
        { label: `ADR·${adr.number}` },
      ]} />

      <PageHeader
        section={`§ · Architecture · ADR·${adr.number}`}
        title={adr.title}
        summary={adr.context}
        meta={[
          { label: "Status",   value: adr.status },
          { label: "Decision", value: adr.decisionDate },
          { label: "Owner",    value: `${adr.owner} · ${adr.team}` },
          { label: "Review",   value: adr.review },
        ]}
      />

      <div className="mb-6 flex items-center flex-wrap gap-3">
        <StageDot tone={tone as "success" | "warning" | "info" | "muted"} />
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{adr.status}</span>
        <span className="font-mono text-[10px] text-text-3 opacity-60">·</span>
        <OpsTag label="SIGNED" />
        <OpsTag label="VERSIONED" />
        {adr.supersedes && (
          <>
            <span className="font-mono text-[10px] text-text-3 opacity-60">·</span>
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Supersedes ADR·{adr.supersedes}</span>
          </>
        )}
        {adr.supersededBy && (
          <>
            <span className="font-mono text-[10px] text-text-3 opacity-60">·</span>
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Superseded by ADR·{adr.supersededBy}</span>
          </>
        )}
      </div>

      <DocShell rail={<RelatedRail kind="adr" id={adr.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Context">
            <p className="text-[15px] text-text-2 leading-[1.7]">{adr.context}</p>
          </DocBlock>
          <DocBlock heading="Decision">
            <p className="text-[15px] text-text-2 leading-[1.7]">{adr.decision}</p>
          </DocBlock>
          <DocBlock heading="Consequences">
            <ul className="space-y-2">
              {adr.consequences.map((c, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-text-2 leading-[1.65]">
                  <span className="mt-[9px] inline-block h-px w-3 bg-line-3 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </DocBlock>
          {adr.alternatives.length > 0 && (
            <DocBlock heading="Alternatives considered">
              <ul className="hairline bg-canvas">
                {adr.alternatives.map((alt, i) => (
                  <li key={i} className={`px-4 py-3 ${i < adr.alternatives.length - 1 ? "hairline-b" : ""}`}>
                    <div className="font-display text-[14px] text-text-1 tracking-[-0.005em]">{alt.name}</div>
                    <div className="mt-1 font-mono text-[11px] text-text-3">Rejected — {alt.rejectedBecause}</div>
                  </li>
                ))}
              </ul>
            </DocBlock>
          )}
          <DocBlock heading="Revision history">
            <ol className="hairline bg-canvas">
              <RevRow at={adr.decisionDate} note="Recorded" who={adr.owner} />
              <RevRow at={adr.decisionDate} note={`Reviewed — ${adr.review}`} who={adr.team} last />
            </ol>
          </DocBlock>
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.title, href: `/architecture/${prev.slug}`, kicker: `ADR·${prev.number}` } : null}
        next={next ? { title: next.title, href: `/architecture/${next.slug}`, kicker: `ADR·${next.number}` } : null}
      />
    </SectionShell>
  );
}

function RevRow({ at, note, who, last }: { at: string; note: string; who: string; last?: boolean }) {
  return (
    <li className={`grid grid-cols-[110px_1fr_140px] gap-4 items-baseline px-4 py-3 ${last ? "" : "hairline-b"}`}>
      <span className="font-mono text-[11px] text-text-2 tabular">{at}</span>
      <span className="text-[14px] text-text-2">{note}</span>
      <span className="font-mono text-[11px] text-text-3 tabular text-right">{who}</span>
    </li>
  );
}
