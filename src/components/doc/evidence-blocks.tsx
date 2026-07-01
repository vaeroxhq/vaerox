import { Link } from "@tanstack/react-router";
import { DocBlock } from "./doc-shell";
import type {
  EvidenceFailure,
  EvidenceLimitation,
  EvidenceMetric,
  EvidenceTradeoff,
  EvidenceVersion,
} from "@/lib/evidence-data";
import { ADRS } from "@/lib/architecture-data";
import { BENCHMARKS, benchmarkFormatValue } from "@/lib/benchmarks-data";
import { INCIDENTS } from "@/lib/incidents-data";

/**
 * Presentational blocks used by system and project detail routes to
 * render engineering evidence. All blocks reuse the established
 * hairline + mono metadata vocabulary; no new visual patterns.
 */

export function EvolutionBlock({ items }: { items: EvidenceVersion[] }) {
  if (items.length === 0) return null;
  return (
    <DocBlock heading="Design evolution">
      <ol className="hairline bg-canvas">
        {items.map((v, i) => (
          <li
            key={v.tag}
            className={`grid grid-cols-[72px_100px_1fr] items-baseline gap-4 px-4 py-3 ${
              i < items.length - 1 ? "hairline-b" : ""
            }`}
          >
            <span className="font-mono text-[11px] text-text-1 tabular">{v.tag}</span>
            <span className="font-mono text-[11px] text-text-3 tabular">{v.at}</span>
            <div>
              <div className="font-display text-[14px] text-text-1 tracking-[-0.005em]">
                {v.headline}
              </div>
              <div className="mt-1 text-[13px] text-text-2 leading-[1.6]">{v.detail}</div>
            </div>
          </li>
        ))}
      </ol>
    </DocBlock>
  );
}

export function TradeoffsBlock({ items }: { items: EvidenceTradeoff[] }) {
  if (items.length === 0) return null;
  return (
    <DocBlock heading="Trade-offs">
      <ul className="hairline bg-canvas">
        {items.map((t, i) => (
          <li
            key={i}
            className={`px-4 py-3 ${i < items.length - 1 ? "hairline-b" : ""}`}
          >
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
              Chose {t.choice} over {t.over}
            </div>
            <div className="mt-1 text-[14px] text-text-2 leading-[1.65]">{t.because}</div>
          </li>
        ))}
      </ul>
    </DocBlock>
  );
}

const LIMIT_LABEL: Record<EvidenceLimitation["kind"], string> = {
  current: "Current",
  scaling: "Scaling",
  future: "Future work",
  research: "Research question",
  experimental: "Experimental",
};

export function LimitationsBlock({ items }: { items: EvidenceLimitation[] }) {
  if (items.length === 0) return null;
  return (
    <DocBlock heading="Known limitations">
      <ul className="hairline bg-canvas">
        {items.map((l, i) => (
          <li
            key={i}
            className={`grid grid-cols-[140px_1fr] gap-4 items-baseline px-4 py-3 ${
              i < items.length - 1 ? "hairline-b" : ""
            }`}
          >
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
              {LIMIT_LABEL[l.kind]}
            </span>
            <div>
              <div className="font-display text-[14px] text-text-1 tracking-[-0.005em]">
                {l.title}
              </div>
              <div className="mt-1 text-[13px] text-text-2 leading-[1.6]">{l.detail}</div>
            </div>
          </li>
        ))}
      </ul>
    </DocBlock>
  );
}

export function FailuresBlock({ items }: { items: EvidenceFailure[] }) {
  if (items.length === 0) return null;
  return (
    <DocBlock heading="Failure stories">
      <ul className="hairline bg-canvas">
        {items.map((f, i) => (
          <li
            key={i}
            className={`px-4 py-3 ${i < items.length - 1 ? "hairline-b" : ""}`}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] text-text-3 tabular">{f.at}</span>
              <span className="font-display text-[14px] text-text-1 tracking-[-0.005em]">
                {f.title}
              </span>
            </div>
            <p className="mt-2 text-[13px] text-text-2 leading-[1.6]">{f.detail}</p>
            <p className="mt-1 font-mono text-[11px] text-text-3">
              Lesson — {f.lesson}
            </p>
          </li>
        ))}
      </ul>
    </DocBlock>
  );
}

export function AdrRefsBlock({ slugs }: { slugs: string[] }) {
  const adrs = slugs.map((s) => ADRS.find((a) => a.slug === s)).filter(Boolean) as typeof ADRS;
  if (adrs.length === 0) return null;
  return (
    <DocBlock heading="Architecture decisions">
      <ul className="hairline bg-canvas">
        {adrs.map((a, i) => (
          <li
            key={a.slug}
            className={`px-4 py-3 ${i < adrs.length - 1 ? "hairline-b" : ""}`}
          >
            <Link
              to="/architecture/$adr"
              params={{ adr: a.slug }}
              className="group flex items-baseline gap-4"
            >
              <span className="font-mono text-[11px] text-text-3 tabular w-16 shrink-0">
                ADR·{a.number}
              </span>
              <span className="flex-1 min-w-0">
                <span className="font-display text-[14px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.005em]">
                  {a.title}
                </span>
                <span className="block mt-0.5 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
                  {a.status} · {a.decisionDate}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </DocBlock>
  );
}

export function BenchmarkRefsBlock({ slugs }: { slugs: string[] }) {
  const bs = slugs.map((s) => BENCHMARKS.find((b) => b.slug === s)).filter(Boolean) as typeof BENCHMARKS;
  if (bs.length === 0) return null;
  return (
    <DocBlock heading="Benchmarks">
      <ul className="hairline bg-canvas">
        {bs.map((b, i) => {
          const latest = b.runs.at(-1);
          return (
            <li
              key={b.slug}
              className={`px-4 py-3 ${i < bs.length - 1 ? "hairline-b" : ""}`}
            >
              <Link
                to="/benchmarks/$slug"
                params={{ slug: b.slug }}
                className="group grid grid-cols-[64px_1fr_auto] items-baseline gap-4"
              >
                <span className="font-mono text-[11px] text-text-3 tabular">{b.code}</span>
                <span className="min-w-0">
                  <span className="font-display text-[14px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.005em]">
                    {b.title}
                  </span>
                  <span className="block mt-0.5 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
                    {b.metric} · {b.cadence.toLowerCase()} · methodology recorded
                  </span>
                </span>
                <span className="font-mono text-[13px] text-text-1 tabular text-right">
                  {latest ? benchmarkFormatValue(b, latest.value) : "—"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </DocBlock>
  );
}

export function IncidentRefsBlock({ slugs }: { slugs: string[] }) {
  const incs = slugs.map((s) => INCIDENTS.find((i) => i.slug === s)).filter(Boolean) as typeof INCIDENTS;
  if (incs.length === 0) return null;
  return (
    <DocBlock heading="Incidents & post-mortems">
      <ul className="hairline bg-canvas">
        {incs.map((i, idx) => (
          <li
            key={i.slug}
            className={`px-4 py-3 ${idx < incs.length - 1 ? "hairline-b" : ""}`}
          >
            <Link
              to="/incidents/$id"
              params={{ id: i.slug }}
              className="group grid grid-cols-[110px_1fr_80px] items-baseline gap-4"
            >
              <span className="font-mono text-[11px] text-text-3 tabular">{i.id}</span>
              <span className="min-w-0">
                <span className="font-display text-[14px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.005em]">
                  {i.title}
                </span>
                <span className="block mt-0.5 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
                  {i.openedAt.slice(0, 10)} · {i.status}
                </span>
              </span>
              <span className="font-mono text-[11px] text-text-1 tabular text-right">
                {i.severity}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </DocBlock>
  );
}

export function MetricsGrid({
  columns,
  extra,
}: {
  columns: EvidenceMetric[];
  extra?: EvidenceMetric[];
}) {
  const all = [...columns, ...(extra ?? [])];
  if (all.length === 0) return null;
  return (
    <DocBlock heading="Engineering metrics">
      <dl className="grid grid-cols-2 md:grid-cols-3 gap-px bg-line-1 hairline">
        {all.map((m) => (
          <div key={m.label} className="bg-canvas px-4 pt-3 pb-4">
            <dt className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
              {m.label}
            </dt>
            <dd className="font-mono text-[15px] text-text-1 mt-2 tabular tracking-[-0.005em]">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>
    </DocBlock>
  );
}

export function LanguageBreakdown({
  langs,
}: {
  langs: { name: string; share: number }[];
}) {
  if (langs.length === 0) return null;
  return (
    <DocBlock heading="Language composition">
      <ul className="hairline bg-canvas">
        {langs.map((l, i) => (
          <li
            key={l.name}
            className={`grid grid-cols-[1fr_120px_60px] items-center gap-4 px-4 py-2.5 ${
              i < langs.length - 1 ? "hairline-b" : ""
            }`}
          >
            <span className="font-mono text-[12px] text-text-1 tabular">{l.name}</span>
            <span
              aria-hidden="true"
              className="relative h-[6px] hairline bg-canvas overflow-hidden"
            >
              <span
                className="absolute inset-y-0 left-0 bg-text-2"
                style={{ width: `${Math.round(l.share * 100)}%` }}
              />
            </span>
            <span className="font-mono text-[11px] text-text-3 tabular text-right">
              {Math.round(l.share * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </DocBlock>
  );
}
