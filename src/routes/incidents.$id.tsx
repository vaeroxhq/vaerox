import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { INCIDENTS, type Incident } from "@/lib/incidents-data";
import { PageHeader, SectionShell, StageDot } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { RelatedRail } from "@/components/doc/related-rail";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { PrevNext } from "@/components/doc/prev-next";
import { OpsTag } from "@/components/ops/ops-tag";

export const Route = createFileRoute("/incidents/$id")({
  loader: ({ params }) => {
    const inc = INCIDENTS.find((x) => x.slug === params.id);
    if (!inc) throw notFound();
    return { inc };
  },
  head: ({ loaderData }) => {
    const i = loaderData?.inc;
    const title = i ? `${i.id} · ${i.title} — VÆRØX` : "Incident — VÆRØX";
    const desc = i?.summary ?? "";
    return { meta: [
      { title },
      { name: "description", content: desc.slice(0, 160) },
      { property: "og:title", content: title },
      { property: "og:description", content: desc.slice(0, 160) },
    ] };
  },
  component: IncidentDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader section="§ · Incidents" title="Incident not found." summary="No incident matches that identifier." />
      <Link to="/incidents" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1">← All incidents</Link>
    </SectionShell>
  ),
});

function IncidentDetail() {
  const { inc } = Route.useLoaderData() as { inc: Incident };
  const sorted = [...INCIDENTS].sort((a, b) => b.openedAt.localeCompare(a.openedAt));
  const idx = sorted.findIndex((x) => x.slug === inc.slug);
  const prev = sorted[idx + 1];
  const next = sorted[idx - 1];

  const sevTone: "warning" | "info" =
    inc.severity === "SEV-1" ? "warning" : inc.severity === "SEV-2" ? "warning" : "info";

  const doneAI = inc.actionItems.filter((a) => a.done).length;

  return (
    <SectionShell>
      <Breadcrumbs items={[
        { label: "VÆRØX", to: "/" },
        { label: "Incidents", to: "/incidents" },
        { label: inc.id },
      ]} />

      <PageHeader
        section={`§ · Incident · ${inc.id}`}
        title={inc.title}
        summary={inc.summary}
        meta={[
          { label: "Severity",  value: inc.severity },
          { label: "Commander", value: inc.commander },
          { label: "MTTA",      value: inc.mtta },
          { label: "MTTR",      value: inc.mttr },
        ]}
      />

      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
        <StageDot tone={sevTone} />
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{inc.status}</span>
        <span className="font-mono text-[10px] text-text-3 opacity-60">·</span>
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Opened {inc.openedAt.replace("T", " ").replace("Z", " UTC")}</span>
        <span className="font-mono text-[10px] text-text-3 opacity-60">·</span>
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Resolved {inc.resolvedAt.replace("T", " ").replace("Z", " UTC")}</span>
        <OpsTag label="POST-MORTEM" />
        <OpsTag label="SIGNED" />
      </div>

      <DocShell rail={<RelatedRail kind="incident" id={inc.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Customer impact">
            <p className="text-[15px] text-text-2 leading-[1.7]">{inc.customerImpact}</p>
          </DocBlock>
          <DocBlock heading="Detection">
            <p className="text-[15px] text-text-2 leading-[1.7]">{inc.detection}</p>
          </DocBlock>
          <DocBlock heading="Root cause">
            <p className="text-[15px] text-text-2 leading-[1.7]">{inc.rootCause}</p>
            {inc.contributingFactors.length > 0 && (
              <>
                <div className="mt-6 font-mono text-[10px] text-text-3 uppercase tracking-[0.18em] mb-2">Contributing factors</div>
                <ul className="space-y-2">
                  {inc.contributingFactors.map((c, i) => (
                    <li key={i} className="flex gap-3 text-[14px] text-text-2 leading-[1.65]">
                      <span className="mt-[9px] inline-block h-px w-3 bg-line-3 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </DocBlock>

          <DocBlock heading="Timeline">
            <ol className="hairline bg-canvas">
              {inc.timeline.map((t, i) => (
                <li key={i} className={`grid grid-cols-[110px_1fr] gap-4 items-baseline px-4 py-3 ${i < inc.timeline.length - 1 ? "hairline-b" : ""}`}>
                  <span className="font-mono text-[11px] text-text-2 tabular">{t.at}</span>
                  <span className="text-[14px] text-text-2 leading-[1.55]">{t.note}</span>
                </li>
              ))}
            </ol>
          </DocBlock>

          <DocBlock heading="Five whys">
            <ol className="hairline bg-canvas">
              {inc.fiveWhys.map((w, i) => (
                <li key={i} className={`grid grid-cols-[32px_1fr] gap-4 items-baseline px-4 py-3 ${i < inc.fiveWhys.length - 1 ? "hairline-b" : ""}`}>
                  <span className="font-mono text-[11px] text-text-3 tabular">{i + 1}.</span>
                  <span className="text-[14px] text-text-2 leading-[1.6]">{w}</span>
                </li>
              ))}
            </ol>
          </DocBlock>

          <DocBlock heading={`Action items · ${doneAI}/${inc.actionItems.length} complete`}>
            <ol className="hairline bg-canvas">
              {inc.actionItems.map((a, i) => (
                <li key={a.id} className={`grid grid-cols-[80px_1fr_100px_90px_60px] gap-4 items-baseline px-4 py-3 ${i < inc.actionItems.length - 1 ? "hairline-b" : ""}`}>
                  <span className="font-mono text-[11px] text-text-2 tabular">{a.id}</span>
                  <span className="text-[14px] text-text-2 leading-[1.55]">{a.title}</span>
                  <span className="font-mono text-[11px] text-text-3 tabular">{a.owner}</span>
                  <span className="font-mono text-[11px] text-text-3 tabular">{a.due}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] tabular text-right">
                    {a.done ? <span className="text-text-1">DONE</span> : <span className="text-warning">OPEN</span>}
                  </span>
                </li>
              ))}
            </ol>
          </DocBlock>
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.title, href: `/incidents/${prev.slug}`, kicker: prev.id } : null}
        next={next ? { title: next.title, href: `/incidents/${next.slug}`, kicker: next.id } : null}
      />
    </SectionShell>
  );
}
