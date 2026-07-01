import type {
  ProjectDossier,
  ProjectPhase,
  ProjectLink,
  ArchComponent,
  DecisionEntry,
  MilestoneEntry,
  ValidationEntry,
  FutureWork,
} from "@/lib/dossiers-data";
import { PHASE_ORDER } from "@/lib/dossiers-data";
import { DocBlock } from "@/components/doc/doc-shell";
import { Link } from "@tanstack/react-router";

// ---------------------------------------------------------------------
// KV grid — reused pattern
// ---------------------------------------------------------------------
function KVGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="hairline grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1">
      {items.map((it) => (
        <div key={it.label} className="bg-canvas px-4 py-3 flex items-baseline justify-between gap-4">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
            {it.label}
          </span>
          <span className="font-mono text-[11px] text-text-1 tabular text-right">{it.value}</span>
        </div>
      ))}
    </div>
  );
}

function Badges({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li
          key={t}
          className="hairline bg-canvas px-2.5 py-1 font-mono text-[10.5px] text-text-1 uppercase tracking-[0.1em] tabular"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-[14.5px] text-text-2 leading-[1.7]">{children}</p>;
}

// =====================================================================
// 01 · Executive Summary
// =====================================================================
export function ExecutiveSummary({ s }: { s: ProjectDossier["summary"] }) {
  return (
    <DocBlock heading="01 · Executive summary">
      <div className="space-y-4">
        <div>
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1.5">What it is</div>
          <Para>{s.what}</Para>
        </div>
        <div>
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1.5">Why it exists</div>
          <Para>{s.why}</Para>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 hairline mt-4">
          <div className="bg-canvas px-4 py-3">
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1">Current maturity</div>
            <div className="text-[13px] text-text-1">{s.maturity}</div>
          </div>
          <div className="bg-canvas px-4 py-3">
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1">Current status</div>
            <div className="text-[13px] text-text-1">{s.status}</div>
          </div>
        </div>
      </div>
    </DocBlock>
  );
}

// =====================================================================
// 02 · Problem Statement
// =====================================================================
export function ProblemStatement({ p }: { p: ProjectDossier["problem"] }) {
  return (
    <DocBlock heading="02 · Problem statement">
      <div className="space-y-4">
        <div>
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1.5">The problem</div>
          <Para>{p.statement}</Para>
        </div>
        <div>
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1.5">Why existing solutions were insufficient</div>
          <Para>{p.existingSolutions}</Para>
        </div>
        <div>
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1.5">Design constraints</div>
          <ul className="hairline bg-canvas">
            {p.constraints.map((c, i) => (
              <li
                key={i}
                className={`px-4 py-3 flex items-start gap-3 ${i < p.constraints.length - 1 ? "hairline-b" : ""}`}
              >
                <span className="font-mono text-[10px] text-text-3 tabular mt-0.5">C-{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[13.5px] text-text-2 leading-[1.6]">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocBlock>
  );
}

// =====================================================================
// 03 · System Architecture
// =====================================================================
export function SystemArchitecture({ a }: { a: ProjectDossier["architecture"] }) {
  return (
    <DocBlock heading="03 · System architecture">
      <div className="space-y-5">
        <div>
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1.5">High-level</div>
          <Para>{a.highLevel}</Para>
        </div>

        <div>
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-2">Core components</div>
          <ul className="hairline bg-canvas">
            {a.components.map((c: ArchComponent, i, arr) => (
              <li key={c.name} className={`px-4 py-3 ${i < arr.length - 1 ? "hairline-b" : ""}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[14px] text-text-1">{c.name}</span>
                  <span className="font-mono text-[10.5px] text-text-3 tabular text-right">{c.tech}</span>
                </div>
                <div className="mt-1 text-[13px] text-text-2 leading-[1.55]">{c.role}</div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1.5">Request / data flow</div>
          <p className="font-mono text-[12px] text-text-2 leading-[1.65] tabular">{a.dataFlow}</p>
        </div>

        <div>
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1.5">Technology choices</div>
          <Para>{a.choices}</Para>
        </div>
      </div>
    </DocBlock>
  );
}

// =====================================================================
// 04 · Technical Stack
// =====================================================================
export function TechnicalStack({ s }: { s: ProjectDossier["stack"] }) {
  const buckets: [string, string[]][] = [
    ["Languages", s.languages],
    ["Frameworks", s.frameworks],
    ["Infrastructure", s.infrastructure],
    ["Databases", s.databases],
    ["AI models", s.models],
  ];
  return (
    <DocBlock heading="04 · Technical stack">
      <div className="space-y-4">
        {buckets.map(([label, items]) => (
          <div key={label} className="grid grid-cols-[140px_1fr] gap-4 items-start">
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] pt-1">{label}</div>
            {items.length ? <Badges items={items} /> : <span className="font-mono text-[11px] text-text-3">—</span>}
          </div>
        ))}
        <div className="grid grid-cols-[140px_1fr] gap-4 items-start hairline-t pt-4">
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] pt-1">Deployment</div>
          <Para>{s.deployment}</Para>
        </div>
      </div>
    </DocBlock>
  );
}

// =====================================================================
// 05 · Engineering Decisions
// =====================================================================
export function EngineeringDecisions({ items }: { items: DecisionEntry[] }) {
  if (!items.length) return null;
  return (
    <DocBlock heading="05 · Engineering decisions">
      <ol className="hairline bg-canvas">
        {items.map((d, i, arr) => (
          <li key={i} className={`px-4 py-4 ${i < arr.length - 1 ? "hairline-b" : ""}`}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-[14px] text-text-1">{d.title}</span>
              {d.adr && (
                <Link
                  to="/architecture/$adr"
                  params={{ adr: d.adr }}
                  className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] hover:text-text-1 transition-micro"
                >
                  {d.adr.toUpperCase()} →
                </Link>
              )}
            </div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-px bg-line-1 hairline">
              <div className="bg-canvas px-3 py-2">
                <div className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.14em]">Chose</div>
                <div className="text-[12.5px] text-text-1 mt-0.5">{d.chose}</div>
              </div>
              <div className="bg-canvas px-3 py-2">
                <div className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.14em]">Over</div>
                <div className="text-[12.5px] text-text-2 mt-0.5">{d.over}</div>
              </div>
              <div className="bg-canvas px-3 py-2">
                <div className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.14em]">Because</div>
                <div className="text-[12.5px] text-text-2 mt-0.5">{d.because}</div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </DocBlock>
  );
}

// =====================================================================
// 06 · Development Timeline
// =====================================================================
export function DevelopmentTimeline({ t }: { t: ProjectDossier["timeline"] }) {
  return (
    <DocBlock heading="06 · Development timeline">
      <div className="space-y-4">
        <ol className="hairline bg-canvas">
          {t.milestones.map((m: MilestoneEntry, i, arr) => (
            <li
              key={i}
              className={`px-4 py-3 grid grid-cols-[90px_18px_1fr] gap-3 items-start ${
                i < arr.length - 1 ? "hairline-b" : ""
              }`}
            >
              <span className="font-mono text-[10.5px] text-text-3 tabular uppercase tracking-[0.1em]">{m.at}</span>
              <span
                aria-hidden
                className={`mt-1.5 inline-block w-[8px] h-[8px] ${
                  m.done ? "bg-text-1" : "hairline"
                }`}
                style={{ transform: "rotate(45deg)" }}
              />
              <div>
                <div className="text-[13.5px] text-text-1">{m.title}</div>
                <div className="mt-0.5 text-[12.5px] text-text-2 leading-[1.55]">{m.detail}</div>
              </div>
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-1 hairline">
          <div className="bg-canvas px-4 py-3">
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Current phase</div>
            <div className="mt-1 text-[13px] text-text-1">{t.currentPhase}</div>
          </div>
          <div className="bg-canvas px-4 py-3">
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Next milestone</div>
            <div className="mt-1 text-[13px] text-text-1">{t.nextMilestone}</div>
          </div>
          <div className="bg-canvas px-4 py-3">
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Long-term</div>
            <div className="mt-1 text-[13px] text-text-1">{t.longTerm}</div>
          </div>
        </div>
      </div>
    </DocBlock>
  );
}

// =====================================================================
// 07 · Validation
// =====================================================================
export function ValidationSection({ v }: { v: ProjectDossier["validation"] }) {
  const kindLabel: Record<ValidationEntry["kind"], string> = {
    measured: "Measured",
    target: "Design target",
    methodology: "Methodology",
    limitation: "Limitation",
  };
  return (
    <DocBlock heading="07 · Validation">
      <div className="space-y-4">
        <ul className="hairline bg-canvas">
          {v.entries.map((e, i, arr) => (
            <li
              key={i}
              className={`px-4 py-3 grid grid-cols-[1fr_auto_120px] gap-4 items-baseline ${
                i < arr.length - 1 ? "hairline-b" : ""
              }`}
            >
              <span className="text-[13px] text-text-1">{e.label}</span>
              <span className="font-mono text-[11.5px] text-text-1 tabular">{e.value}</span>
              <span className="text-right font-mono text-[9.5px] text-text-3 uppercase tracking-[0.14em]">
                {kindLabel[e.kind]}
              </span>
            </li>
          ))}
        </ul>
        <div>
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1.5">Methodology</div>
          <Para>{v.methodology}</Para>
        </div>
        <div>
          <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1.5">Known limitations</div>
          <ul className="hairline bg-canvas">
            {v.limitations.map((l, i, arr) => (
              <li
                key={i}
                className={`px-4 py-2.5 text-[13px] text-text-2 leading-[1.55] ${
                  i < arr.length - 1 ? "hairline-b" : ""
                }`}
              >
                — {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocBlock>
  );
}

// =====================================================================
// 08 · Documentation (cross-links resolved by caller)
// =====================================================================
type DocLink = { label: string; to: string; sub?: string };

export function DocumentationSection({
  groups,
}: {
  groups: { heading: string; items: DocLink[] }[];
}) {
  const nonEmpty = groups.filter((g) => g.items.length > 0);
  if (!nonEmpty.length) return null;
  return (
    <DocBlock heading="08 · Documentation">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 hairline">
        {nonEmpty.map((g) => (
          <div key={g.heading} className="bg-canvas px-4 py-3">
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-2">{g.heading}</div>
            <ul className="space-y-1.5">
              {g.items.map((it) => (
                <li key={it.to}>
                  <a
                    href={it.to}
                    className="group flex items-baseline justify-between gap-3 text-[12.5px] text-text-2 hover:text-text-1 transition-micro"
                  >
                    <span className="truncate">{it.label}</span>
                    <span className="font-mono text-[10px] text-text-3 group-hover:text-text-1">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DocBlock>
  );
}

// =====================================================================
// 09 · Future Work
// =====================================================================
export function FutureWorkSection({ items }: { items: FutureWork[] }) {
  if (!items.length) return null;
  const kindLabel: Record<FutureWork["kind"], string> = {
    feature: "Planned feature",
    challenge: "Known challenge",
    research: "Open research",
  };
  return (
    <DocBlock heading="09 · Future work">
      <ul className="hairline bg-canvas">
        {items.map((f, i, arr) => (
          <li key={i} className={`px-4 py-3 ${i < arr.length - 1 ? "hairline-b" : ""}`}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[13.5px] text-text-1">{f.title}</span>
              <span className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.14em]">
                {kindLabel[f.kind]}
              </span>
            </div>
            <div className="mt-1 text-[12.5px] text-text-2 leading-[1.55]">{f.detail}</div>
          </li>
        ))}
      </ul>
    </DocBlock>
  );
}

// =====================================================================
// Phase Checklist — top-of-page progress
// =====================================================================
export function PhaseChecklist({ progress }: { progress: Record<ProjectPhase, "done" | "active" | "planned"> }) {
  return (
    <div className="hairline bg-canvas">
      <div className="px-4 py-2 hairline-b flex items-baseline justify-between">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Progress</span>
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Phase checklist</span>
      </div>
      <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-line-1">
        {PHASE_ORDER.map((p) => {
          const st = progress[p];
          const cls =
            st === "done" ? "text-text-1"
            : st === "active" ? "text-text-1"
            : "text-text-3 opacity-60";
          const marker =
            st === "done" ? "bg-text-1"
            : st === "active" ? "hairline bg-canvas"
            : "hairline bg-canvas opacity-40";
          return (
            <li key={p} className="bg-canvas px-3 py-2.5 flex items-center gap-2">
              <span
                aria-hidden
                className={`inline-block w-[7px] h-[7px] ${marker}`}
                style={{ transform: "rotate(45deg)" }}
              />
              <span className={`font-mono text-[10px] uppercase tracking-[0.14em] tabular ${cls}`}>
                {p}
                {st === "active" && <span className="ml-1 text-text-2 opacity-70">·</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// =====================================================================
// GitHub / Links strip
// =====================================================================
export function ProjectLinksStrip({ links }: { links: ProjectLink[] }) {
  return (
    <div className="hairline bg-canvas">
      <div className="px-4 py-2 hairline-b flex items-baseline justify-between">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">Resources</span>
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">External</span>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-5 gap-px bg-line-1">
        {links.map((l) => {
          const live = l.status === "Available" && l.url;
          const content = (
            <>
              <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] mb-1">{l.label}</div>
              <div
                className={`font-mono text-[11.5px] tabular ${
                  live ? "text-text-1" : "text-text-3"
                }`}
              >
                {live ? "Open →" : l.status}
              </div>
            </>
          );
          return (
            <li key={l.label} className="bg-canvas">
              {live ? (
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-4 py-3 hover:bg-surface transition-micro"
                >
                  {content}
                </a>
              ) : (
                <div className="block px-4 py-3">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// KVGrid re-export for reuse
export { KVGrid };
