import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/incidents/$id")({
  component: IncidentNotFound,
});

function IncidentNotFound() {
  return (
    <main className="mx-auto max-w-[960px] px-6 py-12">
      <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.18em] mb-3">INC · Not Found</div>
      <h1 className="text-3xl font-medium tracking-tight text-text-1 mb-3">No incident records exist</h1>
      <p className="text-text-2 mb-6">VÆRØX has no production incidents.</p>
      <div className="font-mono text-[13px] text-text-3">
        Return to{" "}
        <Link to="/systems" className="text-text-1 underline underline-offset-4">Engineering Systems</Link>
        {" "}or{" "}
        <Link to="/journal" className="text-text-1 underline underline-offset-4">the Journal</Link>.
      </div>
    </main>
  );
}
