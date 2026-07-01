import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ADRS, type Adr } from "@/lib/architecture-data";
import { PageHeader, SectionShell, StageDot } from "@/components/section/section-bits";
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

  return (
    <SectionShell>
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

      <div className="mb-6 flex items-center gap-3">
        <StageDot tone={tone as "success" | "warning" | "info" | "muted"} />
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{adr.status}</span>
        <span className="font-mono text-[10px] text-text-3 opacity-60">·</span>
        <OpsTag label="SIGNED" />
        <OpsTag label="VERSIONED" />
        {adr.supersedes && (<><span className="font-mono text-[10px] text-text-3 opacity-60">·</span>
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Supersedes ADR·{adr.supersedes}</span></>)}
        {adr.supersededBy && (<><span className="font-mono text-[10px] text-text-3 opacity-60">·</span>
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Superseded by ADR·{adr.supersededBy}</span></>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
        <article className="max-w-[720px]">
          <Block heading="Context">
            <p className="text-[15px] text-text-2 leading-[1.7]">{adr.context}</p>
          </Block>
          <Block heading="Decision">
            <p className="text-[15px] text-text-2 leading-[1.7]">{adr.decision}</p>
          </Block>
          <Block heading="Consequences">
            <ul className="space-y-2">
              {adr.consequences.map((c, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-text-2 leading-[1.65]">
                  <span className="mt-[9px] inline-block h-px w-3 bg-line-3 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Block>
          {adr.alternatives.length > 0 && (
            <Block heading="Alternatives considered">
              <ul className="hairline bg-canvas">
                {adr.alternatives.map((alt, i) => (
                  <li key={i} className={`px-4 py-3 ${i < adr.alternatives.length - 1 ? "hairline-b" : ""}`}>
                    <div className="font-display text-[14px] text-text-1 tracking-[-0.005em]">{alt.name}</div>
                    <div className="mt-1 font-mono text-[11px] text-text-3">Rejected — {alt.rejectedBecause}</div>
                  </li>
                ))}
              </ul>
            </Block>
          )}
          {adr.references.length > 0 && (
            <Block heading="References">
              <ul className="space-y-1">
                {adr.references.map((r, i) => (
                  <li key={i}>
                    <a href={r.href} className="font-mono text-[12px] text-text-2 hover:text-text-1 transition-micro underline underline-offset-4 decoration-line-2">
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </article>

        <aside className="hairline bg-canvas h-fit">
          <div className="px-4 py-3 hairline-b">
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">Systems affected</span>
          </div>
          <ul>
            {adr.systems.map((s) => (
              <li key={s} className="px-4 py-3 hairline-b last:border-b-0 font-mono text-[12px] text-text-2">{s}</li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mt-16 hairline-t pt-6">
        <Link to="/architecture" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1 transition-micro">
          ← All ADRs
        </Link>
      </div>
    </SectionShell>
  );
}

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-mono text-[10px] text-text-3 uppercase tracking-[0.18em] mb-3">{heading}</h2>
      <div className="hairline-t pt-4">{children}</div>
    </section>
  );
}
