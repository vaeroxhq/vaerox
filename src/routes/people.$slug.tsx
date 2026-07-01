import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PEOPLE } from "@/lib/people-data";
import { TEAMS } from "@/lib/teams-data";
import { SYSTEMS } from "@/lib/systems-data";
import { ADRS } from "@/lib/architecture-data";
import { INCIDENTS } from "@/lib/incidents-data";
import { PROJECTS } from "@/lib/projects-data";
import { RESEARCH } from "@/lib/research-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { RelatedRail } from "@/components/doc/related-rail";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";
import { PrevNext } from "@/components/doc/prev-next";

export const Route = createFileRoute("/people/$slug")({
  head: ({ params }) => {
    const p = PEOPLE.find((x) => x.slug === params.slug);
    const title = p ? `${p.fullName} — People — VÆRØX` : "Person — VÆRØX";
    const description = p ? `${p.role}. ${p.bio}` : "Engineer profile.";
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
    const person = PEOPLE.find((p) => p.slug === params.slug);
    if (!person) throw notFound();
    return { person };
  },
  component: PersonDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader section="§ · People" title="Person not found." summary="No profile matches that identifier." />
      <Link to="/people" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1">← Back to directory</Link>
    </SectionShell>
  ),
});

type Event = { date: string; kind: string; title: string; href: string; kicker: string };

function PersonDetail() {
  const { person: p } = Route.useLoaderData();
  const team = TEAMS.find((t) => t.slug === p.team);

  const events: Event[] = [];
  for (const s of p.systemsOwned) {
    const sys = SYSTEMS.find((x) => x.slug === s);
    if (sys) events.push({ date: sys.lastDeploy, kind: "System deploy", title: sys.name, href: `/systems/${sys.slug}`, kicker: "SYS" });
  }
  for (const n of p.adrsAuthored) {
    const adr = ADRS.find((a) => a.number === n);
    if (adr) events.push({ date: adr.decisionDate, kind: `ADR·${adr.number}`, title: adr.title, href: `/architecture/${adr.slug}`, kicker: `ADR·${adr.number}` });
  }
  for (const inc of p.incidentsCommanded) {
    const i = INCIDENTS.find((x) => x.slug === inc);
    if (i) events.push({ date: i.openedAt.slice(0, 10), kind: `Incident ${i.id}`, title: i.title, href: `/incidents/${i.slug}`, kicker: i.id });
  }
  for (const r of p.researchAuthored) {
    const rr = RESEARCH.find((x) => x.slug === r);
    if (rr) events.push({ date: rr.published, kind: "Research", title: rr.title, href: `/research/${rr.slug}`, kicker: "RES" });
  }
  events.sort((a: Event, b: Event) => b.date.localeCompare(a.date));

  const projects = p.projectsContributed.map((s: string) => PROJECTS.find((x) => x.slug === s)).filter((x): x is (typeof PROJECTS)[number] => Boolean(x));

  const idx = PEOPLE.findIndex((x) => x.slug === p.slug);
  const prev = PEOPLE[idx - 1];
  const next = PEOPLE[idx + 1];

  return (
    <SectionShell>
      <Breadcrumbs items={[
        { label: "VÆRØX", to: "/" },
        { label: "People", to: "/people" },
        { label: p.name },
      ]} />

      <PageHeader
        section={`§ · People / ${p.slug}`}
        title={p.fullName}
        summary={p.bio}
        meta={[
          { label: "Role",     value: p.role },
          { label: "Team",     value: team?.name ?? p.team },
          { label: "Joined",   value: p.joined },
          { label: "Location", value: p.location },
        ]}
      />

      <DocShell rail={<RelatedRail kind="person" id={p.slug} />}>
        <article className="max-w-[760px]">
          <DocBlock heading="Expertise">
            <div className="flex flex-wrap gap-px bg-line-1 hairline">
              {p.expertise.map((e) => (
                <span key={e} className="bg-canvas px-3 py-2 font-mono text-[11px] text-text-1 tabular">{e}</span>
              ))}
            </div>
          </DocBlock>

          {projects.length > 0 && (
            <DocBlock heading="Projects">
              <div className="hairline bg-canvas">
                {projects.map((pr, i: number) => (
                  <Link
                    key={pr!.slug}
                    to="/projects/$slug"
                    params={{ slug: pr!.slug }}
                    className={`grid grid-cols-[1fr_auto] items-baseline gap-6 px-4 py-3 group card-hover hover:card-hover-on ${i < projects.length - 1 ? "hairline-b" : ""}`}
                  >
                    <div>
                      <div className="font-display text-[14px] text-text-1 tracking-[-0.008em]">{pr!.name}</div>
                      <div className="text-[12.5px] text-text-2 mt-1 leading-[1.5]">{pr!.description}</div>
                    </div>
                    <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">{pr!.stage}</span>
                  </Link>
                ))}
              </div>
            </DocBlock>
          )}

          {events.length > 0 && (
            <DocBlock heading="Contribution timeline">
              <ul className="hairline bg-canvas">
                {events.map((e, i) => (
                  <li key={`${e.href}-${i}`} className={i < events.length - 1 ? "hairline-b" : ""}>
                    <Link to={e.href} className="grid grid-cols-[90px_70px_1fr] items-baseline gap-4 px-4 py-3 group card-hover hover:card-hover-on">
                      <span className="font-mono text-[11px] text-text-3 tabular">{e.date}</span>
                      <span className="font-mono text-[10px] text-text-2 uppercase tracking-[0.14em]">{e.kicker}</span>
                      <span className="font-display text-[13.5px] text-text-1 tracking-[-0.006em] truncate">{e.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </DocBlock>
          )}

          {team && (
            <DocBlock heading="Team">
              <Link
                to="/teams/$slug"
                params={{ slug: team.slug }}
                className="hairline bg-canvas block group card-hover hover:card-hover-on p-4"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[15px] text-text-1 tracking-[-0.008em]">{team.name}</span>
                  <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Established {team.established.slice(0, 7)}</span>
                </div>
                <p className="mt-2 text-[13px] text-text-2 leading-[1.55]">{team.charter}</p>
              </Link>
            </DocBlock>
          )}
        </article>
      </DocShell>

      <PrevNext
        prev={prev ? { title: prev.name, href: `/people/${prev.slug}`, kicker: "PERSON" } : null}
        next={next ? { title: next.name, href: `/people/${next.slug}`, kicker: "PERSON" } : null}
      />
    </SectionShell>
  );
}
