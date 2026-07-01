import { createFileRoute, Link } from "@tanstack/react-router";
import { TEAMS } from "@/lib/teams-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "Teams — VÆRØX" },
      { name: "description", content: "Engineering teams — charters, leads, systems owned." },
      { property: "og:title", content: "Teams — VÆRØX" },
      { property: "og:description", content: "Engineering teams — charters, leads, systems owned." },
    ],
  }),
  component: TeamsPage,
});

function TeamsPage() {
  return (
    <SectionShell>
      <PageHeader
        section="§ · Teams"
        title="How VÆRØX is organized."
        summary="Each team owns a substrate of the platform. Charters are narrow, membership is small, and ownership is unambiguous."
        meta={[
          { label: "Teams",  value: TEAMS.length.toString().padStart(2, "0") },
          { label: "People", value: TEAMS.reduce((n, t) => n + t.memberSlugs.length, 0).toString().padStart(2, "0") },
          { label: "Systems", value: TEAMS.reduce((n, t) => n + t.systemsOwned.length, 0).toString().padStart(2, "0") },
          { label: "Established", value: "2021" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 hairline">
        {TEAMS.map((t) => (
          <Link
            key={t.slug}
            to="/teams/$slug"
            params={{ slug: t.slug }}
            className="group card-hover hover:card-hover-on bg-canvas p-6 flex flex-col gap-4"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">TEAM · {t.slug}</span>
              <span className="font-mono text-[10px] text-text-3 tabular">{t.memberSlugs.length.toString().padStart(2, "0")} · {t.systemsOwned.length.toString().padStart(2, "0")} sys</span>
            </div>
            <h2 className="font-display text-[22px] tracking-[-0.012em] text-text-1 group-hover:text-text-1">
              {t.name}
            </h2>
            <p className="text-[13.5px] text-text-2 leading-[1.6]">{t.charter}</p>
            <div className="mt-auto pt-4 hairline-t flex items-baseline justify-between">
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Est. {t.established.slice(0, 7)}</span>
              <span className="font-mono text-[10px] text-text-2 tabular group-hover:text-text-1 transition-micro">VIEW →</span>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
