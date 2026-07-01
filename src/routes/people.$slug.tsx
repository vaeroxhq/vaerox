import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PEOPLE } from "@/lib/people-data";
import { SYSTEMS } from "@/lib/systems-data";
import { ADRS } from "@/lib/architecture-data";
import { PROJECTS } from "@/lib/projects-data";
import { RESEARCH } from "@/lib/research-data";

import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { RelatedRail } from "@/components/doc/related-rail";
import { DocShell, DocBlock } from "@/components/doc/doc-shell";

export const Route = createFileRoute("/people/$slug")({
  head: ({ params }) => {
    const p = PEOPLE.find((x) => x.slug === params.slug);
    const title = p ? `${p.fullName} — Maintainer — VÆRØX` : "Maintainer — VÆRØX";
    const description = p ? p.bio : "Maintainer profile.";
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
  component: MaintainerDetail,
  notFoundComponent: () => (
    <SectionShell>
      <PageHeader section="§ · Maintainer" title="Profile not found." summary="No profile matches that identifier." />
      <Link to="/people" className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1">← Back</Link>
    </SectionShell>
  ),
});

type Event = { date: string; kicker: string; title: string; href: string };

function MaintainerDetail() {
  const { person: p } = Route.useLoaderData() as { person: (typeof PEOPLE)[number] };

  const events: Event[] = [];
  for (const s of p.systemsOwned) {
    const sys = SYSTEMS.find((x) => x.slug === s);
    if (sys) events.push({ date: sys.lastDeploy, kicker: "SYS", title: `${sys.name} · last update`, href: `/systems/${sys.slug}` });
  }
  for (const n of p.adrsAuthored) {
    const adr = ADRS.find((a) => a.number === n);
    if (adr) events.push({ date: adr.decisionDate, kicker: `ADR·${adr.number}`, title: adr.title, href: `/architecture/${adr.slug}` });
  }
  for (const inc of p.incidentsCommanded) {
    const i = INCIDENTS.find((x) => x.slug === inc);
    if (i) events.push({ date: i.openedAt.slice(0, 10), kicker: i.id, title: i.title, href: `/incidents/${i.slug}` });
  }
  for (const r of p.researchAuthored) {
    const rr = RESEARCH.find((x) => x.slug === r);
    if (rr) events.push({ date: rr.published, kicker: "RES", title: rr.title, href: `/research/${rr.slug}` });
  }
  events.sort((a, b) => b.date.localeCompare(a.date));

  const projects = p.projectsContributed.map((s: string) => PROJECTS.find((x) => x.slug === s)).filter((x): x is (typeof PROJECTS)[number] => Boolean(x));

  return (
    <SectionShell>
      <Breadcrumbs items={[
        { label: "VÆRØX", to: "/" },
        { label: "Maintainer", to: "/people" },
        { label: p.name },
      ]} />

      <PageHeader
        section={`§ · Maintainer`}
        title={p.fullName}
        summary={p.bio}
        meta={[
          { label: "Role",     value: p.role },
          { label: "Model",    value: "Independent lab" },
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

          <DocBlock heading="How to read attribution">
            <p className="text-[13.5px] text-text-2 leading-[1.7]">
              Anywhere on the site — in ADRs, incident reports, benchmarks, or APIs —
              an <span className="font-mono text-[12.5px] text-text-1">owner</span> or{" "}
              <span className="font-mono text-[12.5px] text-text-1">commander</span> field
              refers to the same maintainer. Surface names (Platform, Inference,
              Observability, etc.) refer to areas of practice, not teams of humans.
            </p>
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
            <DocBlock heading="Recent activity">
              <ul className="hairline bg-canvas">
                {events.slice(0, 30).map((e, i, arr) => (
                  <li key={`${e.href}-${i}`} className={i < arr.length - 1 ? "hairline-b" : ""}>
                    <Link to={e.href} className="grid grid-cols-[90px_90px_1fr] items-baseline gap-4 px-4 py-3 group card-hover hover:card-hover-on">
                      <span className="font-mono text-[11px] text-text-3 tabular">{e.date}</span>
                      <span className="font-mono text-[10px] text-text-2 uppercase tracking-[0.14em]">{e.kicker}</span>
                      <span className="font-display text-[13.5px] text-text-1 tracking-[-0.006em] truncate">{e.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </DocBlock>
          )}
        </article>
      </DocShell>
    </SectionShell>
  );
}
