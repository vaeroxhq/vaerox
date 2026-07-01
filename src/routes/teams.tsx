import { createFileRoute, Link } from "@tanstack/react-router";
import { TEAMS } from "@/lib/teams-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "Surfaces — VÆRØX" },
      { name: "description", content: "Surfaces of the lab — the areas of practice VÆRØX explores, documents, and exercises through reference implementations." },
      { property: "og:title", content: "Surfaces — VÆRØX" },
      { property: "og:description", content: "Areas of practice, not teams of humans. Each surface is maintained by one engineer." },
    ],
  }),
  component: SurfacesPage,
});

function SurfacesPage() {
  return (
    <SectionShell>
      <PageHeader
        section="§ · Surfaces"
        title="Areas of the lab."
        summary="VÆRØX is not organized into teams — a single maintainer runs everything. Surfaces are the areas of practice the lab explores and documents. Each links to the systems, projects, and ADRs that exercise it."
        meta={[
          { label: "Surfaces",    value: TEAMS.length.toString().padStart(2, "0") },
          { label: "Maintainer",  value: "Solo" },
          { label: "Systems",     value: TEAMS.reduce((n, t) => n + t.systemsOwned.length, 0).toString().padStart(2, "0") },
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
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">SURFACE · {t.slug}</span>
              <span className="font-mono text-[10px] text-text-3 tabular">{t.systemsOwned.length.toString().padStart(2, "0")} sys · {t.currentProjects.length.toString().padStart(2, "0")} proj</span>
            </div>
            <h2 className="font-display text-[22px] tracking-[-0.012em] text-text-1 group-hover:text-text-1">
              {t.name}
            </h2>
            <p className="text-[13.5px] text-text-2 leading-[1.6]">{t.charter}</p>
            <div className="mt-auto pt-4 hairline-t flex items-baseline justify-between">
              <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Est. {t.established}</span>
              <span className="font-mono text-[10px] text-text-2 tabular group-hover:text-text-1 transition-micro">VIEW →</span>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
