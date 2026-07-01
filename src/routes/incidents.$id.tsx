import { createFileRoute, Link } from "@tanstack/react-router";
import { DocShell } from "@/components/doc/doc-shell";

export const Route = createFileRoute("/incidents/$id")({
  component: IncidentNotFound,
});

function IncidentNotFound() {
  return (
    <DocShell
      kicker="INC"
      title="Incident not found"
      lede="No incident records exist yet."
      updated="2026-07-01"
      owner="Mayank Sharma"
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Incidents", to: "/incidents" }, { label: "Not found" }]}
    >
      <div className="mt-8 border border-hairline p-6 font-mono text-[13px] text-text-3">
        <p className="mb-2 text-text-1">VÆRØX has no production incidents.</p>
        <p>
          Return to{" "}
          <Link to="/systems" className="text-text-1 underline underline-offset-4">Engineering Systems</Link>
          {" "}or{" "}
          <Link to="/journal" className="text-text-1 underline underline-offset-4">the Journal</Link>.
        </p>
      </div>
    </DocShell>
  );
}
