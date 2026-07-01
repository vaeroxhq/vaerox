import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TEAMS, getTeam } from "@/lib/teams-data";
import { PEOPLE } from "@/lib/people-data";
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
    const title = t ? `${t.name} — Teams — VÆRØX` : "Team — VÆRØX";
    const description = t?.charter ?? "Team charter.";
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
  component: TeamDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader section="§ · Teams" title="Team not found." summary="No team matches that identifier." />
      <Link to="/teams" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1">← Back to teams</Link>
    </SectionShell>
  ),
});

function TeamDetail() {
  const { team: t } = Route.useLoaderData();
  const lead = PEOPLE.find((p) => p.slug === t.lead);
  const members = t.memberSlugs.map((s) => PEOPLE.find((p) => p.slug === s)).filter((x) => Boolean(x)) as typeof PEOPLE;
  const systems = t.systemsOwned.map((s: string) => SYSTEMS.find((x) => x.slug === s)).filter((x): x is (typeof SYSTEMS)[number] => Boolean(x));
  const projects = t.currentProjects.map((s: string) => PROJECTS.find((x) => x.slug === s)).filter((x): x is (typeof PROJECTS)[number] => Boolean(x));

  const idx = TEAMS.findIndex((x) => x.slug === t.slug);
  const prev = TEAMS[idx - 1];
  const next = TEAMS[idx + 1];

  return (
    <SectionShell>
      <Breadcrumbs items={[
        { label: "VÆRØX", to: "/" },
        { label: "Teams", to: "/teams" },
        { label: t.name },
      ]} />

      <PageHeader
        section={`§ · Teams / ${t.slug}`}
        title={t.name}
        summary={t.charter}
        meta={[
          { label: "Lead",        value: lead?.name ?? t.lead },
          { label: "Members",     value: t.memberSlugs.length.toString().padStart(2, "0") },
          { label: "Systems",     value: t.systemsOwned.length.toString().padStart(2, "0") },
          { label: "Established", value: t.established },
        ]}
      />

      <DocShell rail={<RelatedRail kind="team" id={t.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Responsibilities">
            <ul className="hairline bg-canvas">
              {t.responsibilities.map((r: string, i: number) => (
                <li key={r} className={`px-4 py-3 flex items-baseline gap-4 ${i < t.responsibilities.length - 1 ? "hairline-b" : ""}`}>
                  <span className="font-mono text-[10px] text-text-3 tabular w-6 shrink-0">{(i + 1).toString().padStart(2, "0")}</span>
                  <span className="text-[13.5px] text-text-1 leading-[1.6]">{r}</span>
                </li>
              ))}
            </ul>
          </DocBlock>

          <DocBlock heading="Members">
            <div className="hairline bg-canvas">
              {members.map((m, i: number) => (
                <Link
                  key={m.slug}
                  to="/people/$slug"
                  params={{ slug: m.slug }}
                  className={`grid grid-cols-[1fr_auto] items-baseline gap-6 px-4 py-3 group card-hover hover:card-hover-on ${i < members.length - 1 ? "hairline-b" : ""}`}
                >
                  <div className="min-w-0">
                    <div className="font-display text-[14px] text-text-1 tracking-[-0.008em]">{m.name}</div>
                    <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mt-1">{m.role}</div>
                  </div>
                  <span className="font-mono text-[10px] text-text-3 tabular">{m.handle}</span>
                </Link>
              ))}
            </div>
          </DocBlock>

          {systems.length > 0 && (
            <DocBlock heading="Systems owned">
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
            <DocBlock heading="Current projects">
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

          <DocBlock heading="On-call">
            <p className="font-mono text-[12.5px] text-text-2 tabular leading-[1.7]">{t.onCall}</p>
          </DocBlock>
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.name, href: `/teams/${prev.slug}`, kicker: "TEAM" } : null}
        next={next ? { title: next.name, href: `/teams/${next.slug}`, kicker: "TEAM" } : null}
      />
    </SectionShell>
  );
}
