import { createFileRoute, Link } from "@tanstack/react-router";
import { PROJECTS } from "@/lib/projects-data";
import { getDossier } from "@/lib/dossiers-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";


export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — VÆRØX" },
      {
        name: "description",
        content:
          "Long-form narratives on the systems VÆRØX has built: problem, context, architecture, trade-offs, lessons learned, and current status.",
      },
      { property: "og:title", content: "Case Studies — VÆRØX" },
      {
        property: "og:description",
        content: "Real build narratives with architecture, trade-offs, and lessons learned.",
      },
    ],
  }),
  component: CaseStudiesIndex,
});

function CaseStudiesIndex() {
  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Case Studies" }]} />
      <PageHeader
        section="§ · Case Studies"
        title="Build narratives."
        summary="Every canonical VÆRØX system, written up as a narrative: the problem it addresses, the architecture chosen, the trade-offs accepted, and what has actually been shipped. No fabricated production history — every entry states its current stage honestly."
        meta={[
          { label: "Studies", value: PROJECTS.length.toString().padStart(2, "0") },
          { label: "Building", value: PROJECTS.filter((p) => p.stage === "Building").length.toString().padStart(2, "0") },
          { label: "Prototype", value: PROJECTS.filter((p) => p.stage === "Prototype").length.toString().padStart(2, "0") },
          { label: "Research", value: PROJECTS.filter((p) => p.stage === "Research").length.toString().padStart(2, "0") },
        ]}
      />

      <ol className="hairline bg-canvas">
        {PROJECTS.map((p, i, arr) => (
          <li key={p.slug} className={i < arr.length - 1 ? "hairline-b" : ""}>
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group card-hover hover:card-hover-on grid grid-cols-[64px_1fr_140px_120px] gap-4 px-5 py-5 items-baseline"
            >
              <span className="font-mono text-[11px] text-text-3 tabular">CS-{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <div className="font-display text-[18px] text-text-1 tracking-[-0.01em]">{p.name}</div>
                <div className="mt-1.5 text-[13.5px] text-text-2 leading-[1.55]">{p.description}</div>
                <div className="mt-3 font-mono text-[11px] text-text-3 tabular truncate">{p.architecture}</div>
              </div>
              <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">{p.stage}</span>
              <span className="text-right font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] group-hover:text-text-1 transition-micro">Read →</span>
            </Link>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
