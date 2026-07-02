import { createFileRoute, Link } from "@tanstack/react-router";
import { APIS } from "@/lib/apis-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

export const Route = createFileRoute("/api/")({
  head: () => ({
    meta: [
      { title: "API — Vareox" },
      {
        name: "description",
        content: "Public and internal API surfaces across the Vareox platform.",
      },
      { property: "og:title", content: "API — Vareox" },
      {
        property: "og:description",
        content: "Public and internal API surfaces across the Vareox platform.",
      },
    ],
  }),
  component: ApiIndex,
});

function ApiIndex() {
  const stable = APIS.filter((a) => a.stability === "Stable").length;
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "Vareox", to: "/" }, { label: "API" }]} />
      <PageHeader
        section="§ · API"
        title="Public interfaces."
        summary="Every documented API surface across the platform, with authentication, rate limits, and canonical request/response examples."
        meta={[
          { label: "Surfaces", value: APIS.length.toString().padStart(2, "0") },
          { label: "Stable", value: stable.toString().padStart(2, "0") },
          {
            label: "Latest",
            value:
              APIS.map((a) => a.updated)
                .sort()
                .at(-1) ?? "—",
          },
          { label: "Auth", value: "SPIFFE · Bearer · mTLS" },
        ]}
      />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 hairline">
        {APIS.map((a) => (
          <li key={a.slug}>
            <Link
              to="/api/$slug"
              params={{ slug: a.slug }}
              className="group card-hover hover:card-hover-on bg-canvas p-5 flex flex-col h-full"
            >
              <header className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
                  {a.code} · {a.version}
                </span>
                <span className="font-mono text-[10px] text-text-3 tabular">{a.stability}</span>
              </header>
              <h3 className="mt-3 font-display text-[20px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.018em]">
                {a.name}
              </h3>
              <p className="mt-2 text-[13.5px] text-text-2 leading-[1.6]">{a.summary}</p>
              <div className="mt-4 pt-4 hairline-t flex items-center justify-between">
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
                  {a.owner} · {a.system}
                </span>
                <span className="font-mono text-[10px] text-text-3 tabular">
                  {a.endpoints.length.toString().padStart(2, "0")} endpoints →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
