import { createFileRoute, Link } from "@tanstack/react-router";
import { PEOPLE } from "@/lib/people-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { SYSTEMS } from "@/lib/systems-data";
import { ADRS } from "@/lib/architecture-data";
import { PROJECTS } from "@/lib/projects-data";


export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "Maintainer — VÆRØX" },
      { name: "description", content: "VÆRØX is written and maintained by one engineer. This is the maintainer." },
      { property: "og:title", content: "Maintainer — VÆRØX" },
      { property: "og:description", content: "One engineer. Everything on this site is signed by the same person." },
    ],
  }),
  component: MaintainerPage,
});

function MaintainerPage() {
  const p = PEOPLE[0];
  return (
    <SectionShell>
      <PageHeader
        section="§ · Maintainer"
        title="One engineer."
        summary="VÆRØX is written, built, and operated by a single engineer. There is no team behind the byline — every artifact on this site is authored, dated, and signed by the same person."
        meta={[
          { label: "Maintainer", value: "Solo" },
          { label: "Systems",    value: SYSTEMS.length.toString().padStart(2, "0") },
          { label: "ADRs",       value: ADRS.length.toString().padStart(2, "0") },
          { label: "Incidents",  value: INCIDENTS.length.toString().padStart(2, "0") },
        ]}
      />

      <div className="hairline bg-canvas">
        <Link
          to="/people/$slug"
          params={{ slug: p.slug }}
          className="grid grid-cols-[1.6fr_1.4fr_0.8fr] gap-6 px-5 py-5 items-baseline group card-hover hover:card-hover-on"
        >
          <div className="min-w-0">
            <div className="font-display text-[18px] text-text-1 tracking-[-0.01em]">{p.name}</div>
            <div className="font-mono text-[11px] text-text-3 tabular mt-1">{p.handle}</div>
          </div>
          <span className="text-[13px] text-text-2 truncate">{p.role}</span>
          <span className="text-right font-mono text-[10px] text-text-2 uppercase tracking-[0.14em] transition-micro group-hover:text-text-1">
            VIEW PROFILE →
          </span>
        </Link>
      </div>
    </SectionShell>
  );
}
