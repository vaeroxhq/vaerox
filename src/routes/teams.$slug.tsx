import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TEAMS, getTeam } from "@/lib/teams-data";
import { SYSTEMS } from "@/lib/systems-data";
import { PROJECTS } from "@/lib/projects-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { RelatedRail } from "@/components/doc/related-rail";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { PrevNext } from "@/components/doc/prev-next";

export const Route = createFileRoute("/teams/$slug")({
  head: ({ params }) => {
    const t = getTeam(params.slug);
    const title = t ? `${t.name} — Surfaces — VÆRØX` : "Surface — VÆRØX";
    const description = t?.charter ?? "Surface of the lab.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    const team = getTeam(params.slug);
    if (!team) throw notFound();
    return { team };
  },
  component: SurfaceDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader section="§ · Surfaces" title="Surface not found." summary="No surface matches that identifier." />
      <Link to="/teams" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1">← Back to surfaces</Link>
    </SectionShell>
  ),
});

function SurfaceDetail() {
  const { team: t } = Route.useLoaderData() as { team: (typeof TEAMS)[number] };
  const systems = t.systemsOwned.map((s: string) => SYSTEMS.find((x) => x.slug === s)).filter((x): x is (typeof SYSTEMS)[number] => Boolean(x));
  const projects = t.currentProjects.map((s: string) => PROJECTS.find((x) => x.slug === s)).filter((x): x is (typeof PROJECTS)[number] => Boolean(x));

  const idx = TEAMS.findIndex((x) => x.slug === t.slug);
  const prev = TEAMS[idx - 1];
  const next = TEAMS[idx + 1];

  return (
    <SectionShell>
      <Breadcrumbs items={[
        { label: "VÆRØX", to: "/" },
        { label: "Surfaces", to: "/teams" },
        { label: t.name },
      ]} />

      <PageHeader
        section={`§ · Surfaces / ${t.slug}`}
        title={t.name}
        summary={t.charter}
        meta={[
          { label: "Maintainer",  value: "Solo" },
          { label: "Systems",     value: t.systemsOwned.length.toString().padStart(2, "0") },
          { label: "Projects",    value: t.currentProjects.length.toString().padStart(2, "0") },
          { label: "Established", value: t.established },
        ]}
      />

      <DocShell rail={<RelatedRail kind="team" id={t.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Focus">
            <ul className="hairline bg-canvas">
              {t.responsibilities.map((r: string, i: number) => (
                <li key={r} className={`px-4 py-3 flex items-baseline gap-4 ${i < t.responsibilities.length - 1 ? "hairline-b" : ""}`}>
                  <span className="font-mono text-[10px] text-text-3 tabular w-6 shrink-0">{(i + 1).toString().padStart(2, "0")}</span>
                  <span className="text-[13.5px] text-text-1 leading-[1.6]">{r}</span>
                </li>
              ))}
            </ul>
          </DocBlock>

          {systems.length > 0 && (
            <DocBlock heading="Systems exercised">
              <div className="hairline bg-canvas">
                {systems.map((s, i: number) => (
                  <Link
                    key={s!.slug}
                    to="/systems/$slug"
                    params={{ slug: s!.slug }}
                    className={`grid grid-cols-[1fr_auto] items-baseline gap-6 px-4 py-3 group card-hover hover:card-hover-on ${i < systems.length - 1 ? "hairline-b" : ""}`}
                  >
                    <div>
                      <div className="font-display text-[14px] text-text-1 tracking-[-0.008em]">{s!.name}</div>
                      <div className="text-[12.5px] text-text-2 mt-1 leading-[1.5]">{s!.summary}</div>
                    </div>
                    <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{s!.stage}</span>
                  </Link>
                ))}
              </div>
            </DocBlock>
          )}

          {projects.length > 0 && (
            <DocBlock heading="Current build">
              <div className="hairline bg-canvas">
                {projects.map((p, i: number) => (
                  <Link
                    key={p!.slug}
                    to="/projects/$slug"
                    params={{ slug: p!.slug }}
                    className={`grid grid-cols-[1fr_auto] items-baseline gap-6 px-4 py-3 group card-hover hover:card-hover-on ${i < projects.length - 1 ? "hairline-b" : ""}`}
                  >
                    <div>
                      <div className="font-display text-[14px] text-text-1 tracking-[-0.008em]">{p!.name}</div>
                      <div className="text-[12.5px] text-text-2 mt-1 leading-[1.5]">{p!.description}</div>
                    </div>
                    <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{p!.stage}</span>
                  </Link>
                ))}
              </div>
            </DocBlock>
          )}

          <DocBlock heading="Maintenance cadence">
            <p className="font-mono text-[12.5px] text-text-2 tabular leading-[1.7]">{t.onCall}</p>
          </DocBlock>

          <DocBlock heading="Maintainer">
            <Link to="/people/$slug" params={{ slug: "maintainer" }} className="hairline bg-canvas block group card-hover hover:card-hover-on p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-[15px] text-text-1 tracking-[-0.008em]">Maintainer</span>
                <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Solo · independent lab</span>
              </div>
              <p className="mt-2 text-[13px] text-text-2 leading-[1.55]">
                This surface — like every other surface at VÆRØX — is maintained by one engineer.
              </p>
            </Link>
          </DocBlock>
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.name, href: `/teams/${prev.slug}`, kicker: "SURFACE" } : null}
        next={next ? { title: next.name, href: `/teams/${next.slug}`, kicker: "SURFACE" } : null}
      />
    </SectionShell>
  );
}
