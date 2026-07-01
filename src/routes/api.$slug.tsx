import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { APIS, type ApiSpec, type ApiEndpoint } from "@/lib/apis-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { RelatedRail } from "@/components/doc/related-rail";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { PrevNext } from "@/components/doc/prev-next";
import { CodeBlock } from "@/components/doc/code-block";

export const Route = createFileRoute("/api/$slug")({
  loader: ({ params }) => {
    const a = APIS.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return { a };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.a;
    return { meta: [
      { title: a ? `${a.name} — VÆRØX` : "API — VÆRØX" },
      { name: "description", content: (a?.summary ?? "").slice(0, 160) },
      { property: "og:title", content: a?.name ?? "API — VÆRØX" },
      { property: "og:description", content: (a?.summary ?? "").slice(0, 160) },
    ] };
  },
  component: ApiDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader section="§ · API" title="API not found." summary="No API matches that identifier." />
      <Link to="/api" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1">← All APIs</Link>
    </SectionShell>
  ),
});

function ApiDetail() {
  const { a } = Route.useLoaderData() as { a: ApiSpec };
  const idx = APIS.findIndex((x) => x.slug === a.slug);
  const prev = APIS[idx - 1];
  const next = APIS[idx + 1];

  return (
    <SectionShell>
      <Breadcrumbs items={[
        { label: "VÆRØX", to: "/" },
        { label: "API", to: "/api" },
        { label: a.code },
      ]} />

      <PageHeader
        section={`§ · API · ${a.code}`}
        title={a.name}
        summary={a.summary}
        meta={[
          { label: "Version",   value: a.version },
          { label: "Stability", value: a.stability },
          { label: "System",    value: a.system },
          { label: "Updated",   value: a.updated },
        ]}
      />

      <div className="mb-6 hairline bg-canvas px-4 py-3 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">Base URL</span>
        <code className="font-mono text-[12px] text-text-1 tabular truncate">{a.baseUrl}</code>
      </div>

      <DocShell rail={<RelatedRail kind="api" id={a.slug} />}>
        <article className="max-w-[820px]">
          <DocBlock heading="Authentication">
            <p className="text-[15px] text-text-2 leading-[1.7]">{a.authNote}</p>
          </DocBlock>

          <DocBlock heading={`Endpoints · ${a.endpoints.length}`}>
            <ul className="space-y-6">
              {a.endpoints.map((e, i) => (
                <li key={i}>
                  <EndpointBlock e={e} />
                </li>
              ))}
            </ul>
          </DocBlock>
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.name, href: `/api/${prev.slug}`, kicker: prev.code } : null}
        next={next ? { title: next.name, href: `/api/${next.slug}`, kicker: next.code } : null}
      />
    </SectionShell>
  );
}

function EndpointBlock({ e }: { e: ApiEndpoint }) {
  return (
    <div className="hairline bg-canvas">
      <div className="px-4 py-3 hairline-b flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-1 tabular">{e.method}</span>
          <code className="font-mono text-[13px] text-text-2 tabular truncate">{e.path}</code>
        </div>
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">{e.auth}</span>
      </div>
      <div className="px-4 py-3 text-[14px] text-text-2 leading-[1.6]">{e.summary}</div>
      <div className="px-4 pb-3 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">Rate</span>
        <span className="font-mono text-[11px] text-text-2 tabular truncate">{e.rateLimit}</span>
      </div>
      {(e.request || e.response) && (
        <div className="hairline-t p-4 space-y-4">
          {e.request && <CodeBlock filename="Request" language="json">{e.request}</CodeBlock>}
          {e.response && <CodeBlock filename="Response" language="json">{e.response}</CodeBlock>}
        </div>
      )}
    </div>
  );
}
