import { createFileRoute } from "@tanstack/react-router";
import { VaeroxLockup, VaeroxMark } from "@/components/brand/vaerox-mark";

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
 * Phase 1.1 — Identity integration.
 * Homepage carries the mark's geometry: 45° diamond frames, corner ticks,
 * double-hairline rails, notched cells. Mark appears as structural watermark,
 * never as decoration.
 */
function Index() {
  return (
    <main className="min-h-dvh bg-canvas text-text-1 relative overflow-hidden">
      {/* Structural watermark — the mark, subdued, anchored to the negative space */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 hidden lg:block text-text-1/[0.035]"
      >
        <VaeroxMark size={640} strokeWidth={1.25} />
      </div>

      <div className="relative w-shell mx-auto px-6 md:px-10 lg:px-16">
        {/* Top rail — proper lockup, meta on the right */}
        <div className="hairline-b flex items-center justify-between py-5">
          <VaeroxLockup markSize={22} />
          <div className="flex items-center gap-6">
            <span className="hidden md:inline font-mono text-[11px] text-text-3 uppercase tracking-[0.12em]">
              Engineering&nbsp;·&nbsp;Public
            </span>
            <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.12em] inline-flex items-center gap-2">
              <span className="dot text-success" aria-hidden="true" />
              Nominal
            </span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-20 md:py-28">
          {/* Section identifier — mono, small, aligned to hero */}
          <div className="flex items-center gap-3 mb-10">
            <DiamondGlyph />
            <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
              §01 · Introduction
            </span>
          </div>

          <h1 className="font-display text-[44px] md:text-[64px] leading-[1.02] tracking-[-0.028em] max-w-[760px]">
            Engineering systems,
            <br />
            <span className="text-text-2">documented in public.</span>
          </h1>

          <p className="mt-8 max-w-[560px] text-text-2 text-[15px] leading-[1.65]">
            VÆRØX is an engineering organization building production systems
            across enterprise AI, distributed infrastructure, developer
            platforms, and quantitative research. The work — architecture
            decisions, incident reviews, benchmarks — is published here as it
            is written.
          </p>

          {/* Double-hairline rail — echoes the parallel strokes of the mark */}
          <div className="mt-14 max-w-[560px]">
            <div className="hairline-t" />
            <div className="hairline-t mt-[3px]" />
          </div>

          {/* Meta grid — framed with corner ticks, notched cells */}
          <CornerFramed className="mt-8">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
              <MetaCell label="Version" value="0.1.0" />
              <MetaCell label="Phase" value="01 / 10" />
              <MetaCell label="Status" value="Building" />
              <MetaCell label="Updated" value="2026-07-01" />
            </dl>
          </CornerFramed>
        </section>

        {/* Section rule — diamond marker centered on the hairline */}
        <SectionRule label="§02 · Structure" />

        {/* Domains row — proves the geometric language extends */}
        <section className="mt-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-1 hairline">
            <DomainCell
              index="01"
              title="Enterprise AI"
              note="Model serving, evals, agent runtimes."
            />
            <DomainCell
              index="02"
              title="Platform"
              note="Multi-tenant control planes, IaC."
            />
            <DomainCell
              index="03"
              title="Infrastructure"
              note="Distributed storage, observability."
            />
          </div>
        </section>

        {/* Revision footer — structural continuation */}
        <footer className="hairline-t grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1 mt-16">
          <FootCell label="Build" value="v0.1.0" />
          <FootCell label="Ref" value="phase-01" />
          <FootCell label="Mode" value="Dark canonical" />
          <FootCell label="Region" value="EU · Global" />
        </footer>

        {/* Colophon */}
        <div className="py-6 flex items-center justify-between">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
            © VÆRØX · Engineering Journal
          </span>
          <VaeroxMark size={14} strokeWidth={2} className="text-text-3" />
        </div>
      </div>
    </main>
  );
}

/* ── Building blocks ────────────────────────────────────────── */

function DiamondGlyph() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[8px] w-[8px] rotate-45 border border-line-3"
    />
  );
}

function CornerFramed({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* 4 corner ticks — 45° L-brackets echoing the diamond vertices */}
      <span
        aria-hidden="true"
        className="absolute -top-px -left-px h-2 w-2 border-t border-l border-line-3"
      />
      <span
        aria-hidden="true"
        className="absolute -top-px -right-px h-2 w-2 border-t border-r border-line-3"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-line-3"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-line-3"
      />
      {children}
    </div>
  );
}

function SectionRule({ label }: { label: string }) {
  return (
    <div className="relative py-2">
      <div className="hairline-t" />
      <div className="absolute inset-x-0 -top-[5px] flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-block h-[9px] w-[9px] rotate-45 bg-canvas border border-line-2"
        />
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] bg-canvas pr-3">
          {label}
        </span>
      </div>
    </div>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas px-4 py-3">
      <dt className="font-mono text-[11px] text-text-3 uppercase tracking-[0.08em]">
        {label}
      </dt>
      <dd className="font-mono text-[15px] text-text-1 mt-1.5 tabular">
        {value}
      </dd>
    </div>
  );
}

function DomainCell({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note: string;
}) {
  return (
    <div className="group bg-canvas px-5 py-6 transition-ui hover:bg-surface relative">
      {/* Notch — 45° tick on top-right, echoing the mark */}
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 h-3 w-3 border-t border-r border-line-2"
      />
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
          {index}
        </span>
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          Domain
        </span>
      </div>
      <h3 className="font-display text-[20px] mt-6 tracking-[-0.02em]">
        {title}
      </h3>
      <p className="mt-2 text-[13px] text-text-2 leading-[1.55]">{note}</p>
    </div>
  );
}

function FootCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas px-4 py-3 flex items-baseline justify-between gap-4">
      <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.08em]">
        {label}
      </span>
      <span className="font-mono text-[11px] text-text-2 tabular">{value}</span>
    </div>
  );
}
