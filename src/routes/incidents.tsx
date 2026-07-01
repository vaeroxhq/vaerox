import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { INCIDENTS, type Severity } from "@/lib/incidents-data";
import { PageHeader, Toolbar, SectionShell, StageDot } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

const FILTERS = ["All", "SEV-1", "SEV-2", "SEV-3", "Resolved", "Open"] as const;

export const Route = createFileRoute("/incidents")({
  head: () => ({
    meta: [
      { title: "Incidents — VÆRØX" },
      { name: "description", content: "Every declared incident, with post-mortem, timeline, five-whys, and action items." },
      { property: "og:title", content: "Incidents — VÆRØX" },
      { property: "og:description", content: "Every declared incident, with post-mortem, timeline, five-whys, and action items." },
    ],
  }),
  component: IncidentsPage,
});

function IncidentsPage() {
  const [q, setQ] = useState("");
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return INCIDENTS.filter((i) => {
      if (f === "All") return true;
      if (f === "Open") return i.status !== "Resolved";
      if (f === "Resolved") return i.status === "Resolved";
      return i.severity === (f as Severity);
    }).filter((i) => {
      if (!needle) return true;
      return (
        i.title.toLowerCase().includes(needle) ||
        i.id.toLowerCase().includes(needle) ||
        i.commander.toLowerCase().includes(needle) ||
        i.systemsAffected.join(" ").toLowerCase().includes(needle)
      );
    });
  }, [q, f]);

  const sev1 = INCIDENTS.filter((i) => i.severity === "SEV-1").length;
  const resolved = INCIDENTS.filter((i) => i.status === "Resolved").length;
  const latest = INCIDENTS.map((i) => i.openedAt).sort().at(-1)?.slice(0, 10) ?? "—";

  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Incidents" }]} />
      <PageHeader
        section="§ · Incidents"
        title="Every incident, in the open."
        summary="A canonical register of declared incidents. Every entry has a commander, a timeline, a root cause, and action items that are tracked to completion."
        meta={[
          { label: "Total",    value: INCIDENTS.length.toString().padStart(2, "0") },
          { label: "SEV-1",    value: sev1.toString().padStart(2, "0") },
          { label: "Resolved", value: resolved.toString().padStart(2, "0") },
          { label: "Latest",   value: latest },
        ]}
      />

      <Toolbar
        query={q} onQuery={setQ}
        placeholder="Search incidents · ID · commander · system"
        filters={[...FILTERS]}
        activeFilter={f} onFilter={(x) => setF(x as (typeof FILTERS)[number])}
        count={rows.length}
      />

      <ol className="hairline border-t-0 bg-canvas">
        <li className="hidden md:grid grid-cols-[110px_1fr_80px_120px_100px_100px_160px] gap-4 px-4 py-3 hairline-b">
          {["ID", "Title", "SEV", "Opened", "MTTA", "MTTR", "Systems"].map((h) => (
            <span key={h} className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">{h}</span>
          ))}
        </li>
        {rows.map((i) => (
          <li key={i.id} className="hairline-b last:border-b-0">
            <Link
              to="/incidents/$id"
              params={{ id: i.slug }}
              className="group card-hover hover:card-hover-on bg-canvas grid grid-cols-2 md:grid-cols-[110px_1fr_80px_120px_100px_100px_160px] gap-4 px-4 py-4 items-baseline"
            >
              <span className="font-mono text-[11px] text-text-2 tabular">{i.id}</span>
              <span className="col-span-2 md:col-span-1 font-display text-[15px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.01em]">
                {i.title}
              </span>
              <SevPill sev={i.severity} />
              <span className="font-mono text-[11px] text-text-3 tabular">{i.openedAt.slice(0, 10)}</span>
              <span className="font-mono text-[11px] text-text-2 tabular">{i.mtta}</span>
              <span className="font-mono text-[11px] text-text-2 tabular">{i.mttr}</span>
              <span className="font-mono text-[11px] text-text-3 truncate">{i.systemsAffected.join(" · ")}</span>
            </Link>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

function SevPill({ sev }: { sev: Severity }) {
  const tone: "warning" | "danger" | "info" =
    sev === "SEV-1" ? "danger" : sev === "SEV-2" ? "warning" : "info";
  const cls = tone === "danger" ? "text-danger" : tone === "warning" ? "text-warning" : "text-info";
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] ${cls}`}>
      <StageDot tone={tone === "danger" ? "warning" : (tone as "warning" | "info")} />
      {sev}
    </span>
  );
}
