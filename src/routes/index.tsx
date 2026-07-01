import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VÆRØX — Engineering Systems" },
      {
        name: "description",
        content:
          "VÆRØX is an engineering organization building enterprise AI, platform, and distributed systems in public.",
      },
    ],
  }),
  component: Index,
});

/**
 * Phase 1 — Token & Type Foundation.
 * This surface exists only to prove the token layer renders correctly.
 * Home composition ships in Phase 5.
 */
function Index() {
  return (
    <main className="min-h-dvh bg-canvas text-text-1">
      <div className="w-shell mx-auto px-6 md:px-10 lg:px-16">
        {/* Top rail — hairline only, no shell yet */}
        <div className="hairline-b flex items-center justify-between py-4">
          <span
            className="font-display text-[15px] tracking-[-0.02em]"
            aria-label="VÆRØX"
          >
            VÆRØX
          </span>
          <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.08em]">
            Phase 01 · Foundation
          </span>
        </div>

        {/* Foundation proof */}
        <section className="py-16 md:py-24">
          <p className="font-mono text-[11px] text-text-3 uppercase tracking-[0.12em] mb-6">
            <span
              className="dot text-success align-middle mr-2"
              aria-hidden="true"
            />
            System nominal
          </p>

          <h1 className="font-display text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.025em] max-w-[860px]">
            Engineering systems, documented in public.
          </h1>

          <p className="mt-8 max-w-[560px] text-text-2 text-[15px] leading-[1.65]">
            VÆRØX is an engineering organization working across enterprise AI,
            platform, distributed systems, observability, and quantitative
            finance. The public platform is under construction.
          </p>

          {/* Meta strip — mono, tabular */}
          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1 hairline">
            <MetaCell label="Version" value="0.1.0" />
            <MetaCell label="Phase" value="01 / 10" />
            <MetaCell label="Status" value="Building" />
            <MetaCell label="Updated" value="2026-07-01" />
          </dl>
        </section>

        {/* Revision line — engineering honesty */}
        <footer className="hairline-t py-6 flex items-center justify-between font-mono text-[11px] text-text-3">
          <span>v0.1.0 · phase-01 · foundation</span>
          <span className="inline-flex items-center gap-2">
            <span className="dot text-info" aria-hidden="true" />
            Dark canonical
          </span>
        </footer>
      </div>
    </main>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas px-4 py-4">
      <dt className="font-mono text-[11px] text-text-3 uppercase tracking-[0.08em]">
        {label}
      </dt>
      <dd className="font-mono text-[15px] text-text-1 mt-2 tabular">
        {value}
      </dd>
    </div>
  );
}
