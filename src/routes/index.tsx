import { createFileRoute } from "@tanstack/react-router";
import { VaeroxMark } from "@/components/brand/vaerox-mark";

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
 * Phase 1.2 — Engineering Polish.
 * Identity locked. Hero given more authority + air. Right side becomes a
 * subtle engineering blueprint (guides, intersections, coordinate marks,
 * revision tags) around the official mark. Domain cells become engineering
 * modules with metadata slots. Full build footer. All below 5% opacity for
 * construction geometry; hairlines only; no shadows, no gradients.
 */
function Index() {
  return (
    <div className="bg-canvas text-text-1 relative overflow-hidden">
      {/* ── Blueprint overlay (desktop only, decorative, aria-hidden) ── */}
      <BlueprintOverlay />

      <div className="relative w-shell mx-auto px-6 md:px-10 lg:px-16">


        {/* ── Hero ── */}
        <section className="relative pt-28 md:pt-40 lg:pt-48 pb-24 md:pb-32">
          {/* Section identifier */}
          <div className="flex items-center gap-3 mb-14">
            <DiamondGlyph />
            <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
              §01 · Introduction
            </span>
          </div>

          <h1 className="font-display text-[52px] md:text-[80px] lg:text-[96px] leading-[0.98] tracking-[-0.032em] max-w-[980px]">
            Engineering systems,
            <br />
            <span className="text-text-2">documented in public.</span>
          </h1>

          <p className="mt-12 max-w-[560px] text-text-2 text-[15px] leading-[1.65]">
            VÆRØX is an engineering organization building production systems across enterprise AI,
            distributed infrastructure, developer platforms, and quantitative research. The work —
            architecture decisions, incident reviews, benchmarks — is published here as it is
            written.
          </p>

          {/* Double-hairline rail */}
          <div className="mt-20 max-w-[560px]">
            <div className="hairline-t" />
            <div className="hairline-t mt-[3px]" />
          </div>

          {/* Meta strip — labels quieter, values dominant */}
          <CornerFramed className="mt-8">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
              <MetaCell label="Version" value="0.1.0" />
              <MetaCell label="Phase" value="01 / 10" />
              <MetaCell label="Status" value="Building" />
              <MetaCell label="Updated" value="2026-07-01" />
            </dl>
          </CornerFramed>
        </section>

        {/* Section rule */}
        <SectionRule label="§02 · Structure" />

        {/* ── Domains — engineering modules ── */}
        <section className="mt-10 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-1 hairline">
            <DomainCell
              index="01"
              title="Enterprise AI"
              note="Model serving, evals, agent runtimes."
            />
            <DomainCell index="02" title="Platform" note="Multi-tenant control planes, IaC." />
            <DomainCell
              index="03"
              title="Infrastructure"
              note="Distributed storage, observability."
            />
          </div>
        </section>

      </div>
    </div>
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

/**
 * Meta cell — quieter label, dominant value. Scan target is the value.
 */
function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas px-4 pt-3 pb-4">
      <dt className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </dt>
      <dd className="font-mono text-[17px] text-text-1 mt-2 tabular tracking-[-0.005em]">
        {value}
      </dd>
    </div>
  );
}

/**
 * Domain cell — engineering module. Title + note + metadata rail.
 * Metadata values are placeholders ("—") until real data is wired in.
 * No fabricated values.
 */
function DomainCell({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <article className="group bg-canvas px-5 pt-5 pb-4 transition-ui hover:bg-surface relative">
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 h-3 w-3 border-t border-r border-line-2"
      />

      {/* Header row */}
      <header className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] tabular">
          {index}
        </span>
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          Domain
        </span>
      </header>

      {/* Title + note */}
      <h3 className="font-display text-[22px] mt-8 tracking-[-0.022em]">{title}</h3>
      <p className="mt-2 text-[13px] text-text-2 leading-[1.55]">{note}</p>

      {/* Metadata rail — engineering density */}
      <dl className="mt-6 pt-4 hairline-t grid grid-cols-2 gap-y-2 gap-x-4">
        <ModuleMeta label="Status" value="—" />
        <ModuleMeta label="Verified" value="—" />
        <ModuleMeta label="Tech" value="—" />
        <ModuleMeta label="Docs" value="—" />
        <ModuleMeta label="Updated" value="—" className="col-span-2" />
      </dl>
    </article>
  );
}

function ModuleMeta({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline justify-between gap-3 ${className}`}>
      <dt className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </dt>
      <dd className="font-mono text-[11px] text-text-2 tabular">{value}</dd>
    </div>
  );
}

function FootCell({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-canvas px-4 py-3 flex items-baseline justify-between gap-4">
      <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </span>
      <span className="font-mono text-[11px] text-text-2 tabular">{children ?? value}</span>
    </div>
  );
}

/**
 * Blueprint overlay — the right side reads as an engineering drawing.
 * Guides, intersections, coordinate marks, and revision tags orbit the
 * official mark. Everything is aria-hidden, pointer-events-none, and sits
 * at ≤ 5% opacity so it never competes with content. Desktop only.
 */
function BlueprintOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden lg:block select-none"
    >
      {/* Faint construction grid — right half only */}
      <svg
        className="absolute inset-y-0 right-0 h-full w-[62%] text-text-3"
        style={{ opacity: 0.035 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="vx-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M64 0H0V64" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vx-grid)" />
      </svg>

      {/* Guide circles + crosshair centered on the mark */}
      <svg
        className="absolute text-text-2"
        style={{
          top: 96,
          right: -96,
          width: 880,
          height: 880,
          opacity: 0.045,
        }}
        viewBox="0 0 880 880"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="440" cy="440" r="200" />
          <circle cx="440" cy="440" r="320" />
          <circle cx="440" cy="440" r="420" strokeDasharray="2 6" />
          {/* Crosshair */}
          <line x1="0" y1="440" x2="880" y2="440" strokeDasharray="1 8" />
          <line x1="440" y1="0" x2="440" y2="880" strokeDasharray="1 8" />
          {/* 45° diagonals — echo the mark */}
          <line x1="140" y1="140" x2="740" y2="740" strokeDasharray="1 8" />
          <line x1="740" y1="140" x2="140" y2="740" strokeDasharray="1 8" />
        </g>
      </svg>

      {/* Official mark — embedded in the drawing */}
      <div className="absolute" style={{ top: 336, right: 144, opacity: 0.06 }}>
        <VaeroxMark size={400} />
      </div>

      {/* Coordinate marks — tiny tabular ticks along the right edge */}
      <div
        className="absolute right-6 top-40 flex flex-col gap-8 font-mono text-[9px] text-text-3 uppercase tracking-[0.14em] tabular"
        style={{ opacity: 0.5 }}
      >
        {["y·000", "y·080", "y·160", "y·240", "y·320", "y·400", "y·480"].map((t) => (
          <span key={t} className="flex items-center gap-2">
            <span className="inline-block h-px w-2 bg-line-2" />
            {t}
          </span>
        ))}
      </div>

      {/* Revision tags — tiny engineering annotations */}
      <div
        className="absolute right-6 bottom-40 flex flex-col items-end gap-1 font-mono text-[9px] text-text-3 uppercase tracking-[0.14em] tabular"
        style={{ opacity: 0.55 }}
      >
        <span>rev · 001</span>
        <span>sheet · 01/01</span>
        <span>scale · 1:1</span>
      </div>
    </div>
  );
}
