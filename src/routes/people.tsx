import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PEOPLE } from "@/lib/people-data";
import { TEAMS } from "@/lib/teams-data";
import { PageHeader, Toolbar, SectionShell } from "@/components/section/section-bits";

const FILTERS = ["All", ...TEAMS.map((t) => t.name)];

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "People — VÆRØX" },
      { name: "description", content: "Engineer directory — role, team, systems, contributions." },
      { property: "og:title", content: "People — VÆRØX" },
      { property: "og:description", content: "Engineer directory — role, team, systems, contributions." },
    ],
  }),
  component: PeoplePage,
});

function PeoplePage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PEOPLE.filter((p) => {
      if (filter !== "All") {
        const team = TEAMS.find((t) => t.slug === p.team);
        if (!team || team.name !== filter) return false;
      }
      if (!needle) return true;
      return (
        p.name.toLowerCase().includes(needle) ||
        p.fullName.toLowerCase().includes(needle) ||
        p.role.toLowerCase().includes(needle) ||
        p.handle.toLowerCase().includes(needle) ||
        p.expertise.join(" ").toLowerCase().includes(needle)
      );
    });
  }, [q, filter]);

  return (
    <SectionShell>
      <PageHeader
        section="§ · People"
        title="Engineer directory."
        summary="Every engineer who ships and operates VÆRØX. Roles, teams, and the artifacts they own."
        meta={[
          { label: "People",     value: PEOPLE.length.toString().padStart(2, "0") },
          { label: "Teams",      value: TEAMS.length.toString().padStart(2, "0") },
          { label: "Locations",  value: new Set(PEOPLE.map((p) => p.location.split(",")[1]?.trim())).size.toString().padStart(2, "0") },
          { label: "Est. avg tenure", value: "2.6y" },
        ]}
      />

      <Toolbar
        query={q}
        onQuery={setQ}
        placeholder="Search name, role, expertise…"
        filters={FILTERS}
        activeFilter={filter}
        onFilter={setFilter}
        count={rows.length}
      />

      <div className="hairline mt-px bg-canvas">
        <div className="grid grid-cols-[1.6fr_1.2fr_1fr_0.5fr_0.7fr] gap-6 px-4 py-3 hairline-b font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
          <span>Name</span>
          <span>Role</span>
          <span>Team</span>
          <span className="text-right">Owns</span>
          <span className="text-right">Joined</span>
        </div>
        {rows.map((p, i) => {
          const team = TEAMS.find((t) => t.slug === p.team);
          const owns = p.systemsOwned.length + p.adrsAuthored.length + p.incidentsCommanded.length;
          return (
            <Link
              key={p.slug}
              to="/people/$slug"
              params={{ slug: p.slug }}
              className={`grid grid-cols-[1.6fr_1.2fr_1fr_0.5fr_0.7fr] gap-6 px-4 py-3 items-baseline group card-hover hover:card-hover-on ${i < rows.length - 1 ? "hairline-b" : ""}`}
            >
              <div className="min-w-0">
                <div className="font-display text-[14px] text-text-1 tracking-[-0.008em] truncate">{p.name}</div>
                <div className="font-mono text-[10px] text-text-3 tabular mt-0.5">{p.handle}</div>
              </div>
              <span className="text-[12.5px] text-text-2 truncate">{p.role}</span>
              <span className="font-mono text-[11px] text-text-2 uppercase tracking-[0.1em] truncate">{team?.name ?? p.team}</span>
              <span className="text-right font-mono text-[12px] text-text-1 tabular">{owns.toString().padStart(2, "0")}</span>
              <span className="text-right font-mono text-[11px] text-text-3 tabular">{p.joined.slice(0, 7)}</span>
            </Link>
          );
        })}
      </div>
    </SectionShell>
  );
}
