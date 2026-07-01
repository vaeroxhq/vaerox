import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";

export const Route = createFileRoute("/dashboards")({
  head: () => ({
    meta: [
      { title: "Dashboards — VÆRØX" },
      { name: "description", content: "Operational dashboards across delivery, reliability, performance, and cost." },
    ],
  }),
  component: DashboardsPage,
});

type Dashboard = {
  code: string;
  title: string;
  unit: string;
  lowerIsBetter: boolean;
  target?: number;
  category: "Delivery" | "Reliability" | "Performance" | "Infrastructure" | "Cost";
  seed: number;
  base: number;
  amp: number;
  drift: number;
};

const DASHBOARDS: Dashboard[] = [
  { code: "DEP-FREQ", title: "Deployment Frequency",   unit: "/wk",     lowerIsBetter: false, target: 40,   category: "Delivery",       seed: 11, base: 42,  amp: 6,   drift: 0.4 },
  { code: "LEAD-T",   title: "Lead Time for Changes",  unit: "h",       lowerIsBetter: true,  target: 6,    category: "Delivery",       seed: 12, base: 6.4, amp: 1.4, drift: -0.05 },
  { code: "MTTA",     title: "Mean Time to Acknowledge", unit: "min",   lowerIsBetter: true,  target: 5,    category: "Reliability",    seed: 13, base: 4.1, amp: 1.1, drift: -0.02 },
  { code: "MTTR",     title: "Mean Time to Recover",   unit: "min",     lowerIsBetter: true,  target: 45,   category: "Reliability",    seed: 14, base: 38,  amp: 8,   drift: -0.2 },
  { code: "INC-CNT",  title: "Incident Count",         unit: "/mo",     lowerIsBetter: true,  target: 4,    category: "Reliability",    seed: 15, base: 3.2, amp: 1.6, drift: -0.03 },
  { code: "ERR-BUD",  title: "Error Budget Remaining", unit: "%",       lowerIsBetter: false, target: 60,   category: "Reliability",    seed: 16, base: 78,  amp: 10,  drift: -0.1 },
  { code: "P95-EDGE", title: "Edge P95 Latency",       unit: "ms",      lowerIsBetter: true,  target: 90,   category: "Performance",    seed: 17, base: 82,  amp: 9,   drift: -0.15 },
  { code: "P99-EDGE", title: "Edge P99 Latency",       unit: "ms",      lowerIsBetter: true,  target: 220,  category: "Performance",    seed: 18, base: 198, amp: 22,  drift: -0.3 },
  { code: "AVAIL",    title: "Platform Availability",  unit: "%",       lowerIsBetter: false, target: 99.9, category: "Reliability",    seed: 19, base: 99.94, amp: 0.05, drift: 0.001 },
  { code: "GPU-UTL",  title: "GPU Utilization",        unit: "%",       lowerIsBetter: false, target: 70,   category: "Infrastructure", seed: 20, base: 74,  amp: 8,   drift: 0.1 },
  { code: "Q-DEPTH",  title: "Signal Queue Depth",     unit: "msg",     lowerIsBetter: true,  target: 5000, category: "Infrastructure", seed: 21, base: 4100, amp: 1200, drift: -8 },
  { code: "INF-TPS",  title: "Inference Throughput",   unit: "req/s",   lowerIsBetter: false, target: 12000,category: "Performance",    seed: 22, base: 12800, amp: 900, drift: 25 },
  { code: "STOR-GRW", title: "Storage Growth",         unit: "TB/wk",   lowerIsBetter: true,  target: 30,   category: "Infrastructure", seed: 23, base: 24,  amp: 4,   drift: 0.2 },
  { code: "COST-REQ", title: "Cost per Million Req",   unit: "$",       lowerIsBetter: true,  target: 0.85, category: "Cost",           seed: 24, base: 0.78, amp: 0.08, drift: -0.005 },
];

function series(d: Dashboard, len = 26): number[] {
  const rand = mulberry32(d.seed);
  const out: number[] = [];
  let v = d.base;
  for (let i = 0; i < len; i++) {
    v += d.drift + (rand() - 0.5) * d.amp * 0.3;
    const wave = Math.sin(i / 3.4) * d.amp * 0.4;
    out.push(Math.max(0, v + wave));
  }
  return out;
}

function mulberry32(a: number) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function DashboardsPage() {
  const cards = useMemo(
    () => DASHBOARDS.map((d) => ({ ...d, data: series(d) })),
    [],
  );

  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Dashboards" }]} />
      <PageHeader
        section="§ · Dashboards"
        title="Operational dashboards."
        summary="Standing measurements across delivery, reliability, performance, and cost. Twenty-six week rolling windows. Deterministic time-series; no live telemetry."
        meta={[
          { label: "Panels",  value: DASHBOARDS.length.toString().padStart(2, "0") },
          { label: "Window",  value: "26 weeks" },
          { label: "Refresh", value: "on-demand" },
          { label: "Source",  value: "orbit · pull" },
        ]}
      />

      <div className="hairline bg-canvas grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-1">
        {cards.map((c) => <DashCard key={c.code} d={c} />)}
      </div>
    </SectionShell>
  );
}

function DashCard({ d }: { d: Dashboard & { data: number[] } }) {
  const last = d.data[d.data.length - 1];
  const first = d.data[0];
  const delta = last - first;
  const pct = (delta / first) * 100;
  const min = Math.min(...d.data, d.target ?? Infinity);
  const max = Math.max(...d.data, d.target ?? -Infinity);
  const W = 260, H = 68;
  const x = (i: number) => (i / (d.data.length - 1)) * W;
  const y = (v: number) => H - ((v - min) / Math.max(1e-9, max - min)) * H;
  const path = d.data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${path} L ${W} ${H} L 0 ${H} Z`;

  const trendGood = d.lowerIsBetter ? delta < 0 : delta > 0;
  const trendTone = trendGood ? "text-success" : "text-warning";
  const trendSign = delta > 0 ? "+" : "";

  return (
    <div className="bg-canvas p-4 card-hover">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.16em] tabular">
          {d.code} · {d.category}
        </span>
        <span className={`font-mono text-[10px] uppercase tracking-[0.14em] tabular ${trendTone}`}>
          {trendSign}{pct.toFixed(1)}%
        </span>
      </div>
      <div className="mt-1 font-display text-[14px] text-text-1 tracking-[-0.01em]">{d.title}</div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-mono text-[22px] text-text-1 tabular">{fmt(last)}</span>
        <span className="font-mono text-[11px] text-text-3">{d.unit}</span>
        {d.target !== undefined && (
          <span className="ml-auto font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] tabular">
            target {fmt(d.target)}{d.unit}
          </span>
        )}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full h-[68px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${d.code}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--text-3)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--text-3)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {d.target !== undefined && (
          <line x1="0" x2={W} y1={y(d.target)} y2={y(d.target)}
            stroke="var(--line-3)" strokeWidth="1" strokeDasharray="2 3" />
        )}
        <path d={area} fill={`url(#grad-${d.code})`} />
        <path d={path} stroke="var(--text-1)" strokeWidth="1" fill="none" />
        <circle cx={x(d.data.length - 1)} cy={y(last)} r="1.8" fill="var(--text-1)" />
      </svg>

      <div className="mt-2 flex items-baseline justify-between font-mono text-[10px] text-text-3 tabular">
        <span>min {fmt(Math.min(...d.data))}{d.unit}</span>
        <span>max {fmt(Math.max(...d.data))}{d.unit}</span>
      </div>
    </div>
  );
}

function fmt(n: number): string {
  if (n >= 1000) return n.toFixed(0);
  if (n >= 10) return n.toFixed(1);
  if (n >= 1) return n.toFixed(2);
  return n.toFixed(3);
}
