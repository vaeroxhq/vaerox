import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { allEntities, allEdges, KIND_LABEL, type Entity, type EntityKind } from "@/lib/graph";

export const Route = createFileRoute("/graph")({
  head: () => ({
    meta: [
      { title: "Knowledge Graph — Vaerox" },
      {
        name: "description",
        content: "The complete Vaerox engineering graph. Every entity, every edge.",
      },
    ],
  }),
  component: GraphPage,
});

const ALL_KINDS: EntityKind[] = [
  "system",
  "future",
  "project",
  "adr",
  "incident",
  "benchmark",
  "api",
  "research",
  "dataset",
  "handbook",
  "journal",
  "person",
  "team",
];

const KIND_COLOR: Record<EntityKind, string> = {
  system: "var(--text-1)",
  project: "var(--text-1)",
  adr: "var(--text-2)",
  incident: "var(--warning, var(--text-1))",
  benchmark: "var(--text-2)",
  api: "var(--text-2)",
  research: "var(--text-2)",
  dataset: "var(--text-2)",
  handbook: "var(--text-3)",
  journal: "var(--text-3)",
  person: "var(--text-2)",
  team: "var(--text-1)",
  future: "var(--text-3)",
};

type LaidOutNode = Entity & { x: number; y: number; degree: number };

/** Deterministic seeded pseudo-force layout via simulated annealing. */
function layout(
  nodes: Entity[],
  edges: { a: string; b: string }[],
  w: number,
  h: number,
): LaidOutNode[] {
  const N = nodes.length;
  const rand = mulberry32(1337);
  const pos = nodes.map((_, i) => {
    const angle = (i / N) * Math.PI * 2;
    const r = 240 + rand() * 120;
    return { x: w / 2 + Math.cos(angle) * r, y: h / 2 + Math.sin(angle) * r };
  });
  const idx = new Map(nodes.map((n, i) => [`${n.kind}:${n.id}`, i]));
  const deg = new Array(N).fill(0);
  const adj: [number, number][] = [];
  for (const e of edges) {
    const ai = idx.get(e.a);
    const bi = idx.get(e.b);
    if (ai === undefined || bi === undefined) continue;
    adj.push([ai, bi]);
    deg[ai]++;
    deg[bi]++;
  }

  const ITER = 140;
  const k = Math.sqrt((w * h) / Math.max(N, 1)) * 0.55;
  for (let it = 0; it < ITER; it++) {
    const t = (1 - it / ITER) * 12;
    const disp = pos.map(() => ({ x: 0, y: 0 }));
    // repulsion
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pos[i].x - pos[j].x;
        const dy = pos[i].y - pos[j].y;
        const d2 = dx * dx + dy * dy + 0.01;
        const f = (k * k) / d2;
        const fx = dx * f;
        const fy = dy * f;
        disp[i].x += fx;
        disp[i].y += fy;
        disp[j].x -= fx;
        disp[j].y -= fy;
      }
    }
    // attraction
    for (const [ai, bi] of adj) {
      const dx = pos[ai].x - pos[bi].x;
      const dy = pos[ai].y - pos[bi].y;
      const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const f = (d * d) / k;
      const fx = (dx / d) * f;
      const fy = (dy / d) * f;
      disp[ai].x -= fx;
      disp[ai].y -= fy;
      disp[bi].x += fx;
      disp[bi].y += fy;
    }
    // integrate + cool
    for (let i = 0; i < N; i++) {
      const dx = disp[i].x;
      const dy = disp[i].y;
      const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
      pos[i].x += (dx / d) * Math.min(d, t);
      pos[i].y += (dy / d) * Math.min(d, t);
      // clamp
      pos[i].x = Math.max(30, Math.min(w - 30, pos[i].x));
      pos[i].y = Math.max(30, Math.min(h - 30, pos[i].y));
    }
  }
  return nodes.map((n, i) => ({ ...n, x: pos[i].x, y: pos[i].y, degree: deg[i] }));
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function GraphPage() {
  const [enabled, setEnabled] = useState<Set<EntityKind>>(new Set(ALL_KINDS));
  const [hover, setHover] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef<{ x: number; y: number } | null>(null);

  const W = 1600,
    H = 1000;

  const filtered = useMemo(() => allEntities().filter((e) => enabled.has(e.kind)), [enabled]);

  const filteredKeys = useMemo(() => new Set(filtered.map((n) => `${n.kind}:${n.id}`)), [filtered]);

  const edges = useMemo(
    () => allEdges().filter((e) => filteredKeys.has(e.a) && filteredKeys.has(e.b)),
    [filteredKeys],
  );

  const laidOut = useMemo(() => layout(filtered, edges, W, H), [filtered, edges]);
  const byKey = useMemo(() => new Map(laidOut.map((n) => [`${n.kind}:${n.id}`, n])), [laidOut]);

  const activeKey = focus ?? hover;
  const neighbors = useMemo(() => {
    if (!activeKey) return null;
    const set = new Set<string>([activeKey]);
    for (const e of edges) {
      if (e.a === activeKey) set.add(e.b);
      if (e.b === activeKey) set.add(e.a);
    }
    return set;
  }, [activeKey, edges]);

  const searchHit = useMemo(() => {
    if (!q.trim()) return null;
    const t = q.trim().toLowerCase();
    return new Set(
      laidOut
        .filter((n) => n.title.toLowerCase().includes(t) || n.kicker.toLowerCase().includes(t))
        .map((n) => `${n.kind}:${n.id}`),
    );
  }, [q, laidOut]);

  const toggle = (k: EntityKind) =>
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });

  const focusedEntity = focus ? byKey.get(focus) : null;

  // Wheel zoom
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.max(0.4, Math.min(3, z * (1 - e.deltaY * 0.0015))));
  };
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    setPan({ x: e.clientX - dragging.current.x, y: e.clientY - dragging.current.y });
  };
  const onMouseUp = () => {
    dragging.current = null;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFocus(null);
      }
      if (e.key === "0") {
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "Vaerox", to: "/" }, { label: "Graph" }]} />
      <PageHeader
        section="§ · Graph"
        title="Knowledge graph."
        summary="Every documented entity, every declared relationship. Hover to highlight neighbors. Click to focus. Scroll to zoom, drag to pan."
        meta={[
          { label: "Nodes", value: filtered.length.toString().padStart(3, "0") },
          { label: "Edges", value: edges.length.toString().padStart(3, "0") },
          {
            label: "Kinds",
            value: enabled.size.toString().padStart(2, "0") + " / " + ALL_KINDS.length,
          },
          { label: "Zoom", value: zoom.toFixed(2) + "×" },
        ]}
      />

      {/* Toolbar */}
      <div className="hairline bg-canvas mb-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-px bg-line-1">
          <label className="bg-canvas flex items-center gap-3 px-4 py-3">
            <span className="text-overline text-text-3 opacity-70">Find</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find node…"
              className="flex-1 bg-transparent border-0 outline-none text-label text-text-1 placeholder:text-text-3 tabular"
            />
            <span className="text-metadata text-text-3">
              {searchHit ? searchHit.size.toString().padStart(2, "0") + " hit" : ""}
            </span>
          </label>
          <div className="bg-canvas flex items-center">
            <button
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
                setFocus(null);
              }}
              className="px-4 py-3 text-overline text-text-3 hover:text-text-1 border-l border-line-1"
            >
              Reset view
            </button>
          </div>
        </div>
        <div className="hairline-t flex flex-wrap items-stretch">
          <div className="px-3 py-2 text-overline text-text-3 border-r border-line-1 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 border border-text-1" /> Current
            <span className="mx-1 text-text-3">·</span>
            <span
              className="inline-block w-2.5 h-2.5 border border-text-3"
              style={{ borderStyle: "dashed" }}
            />{" "}
            Future
          </div>
          {ALL_KINDS.map((k) => {
            const on = enabled.has(k);
            return (
              <button
                key={k}
                onClick={() => toggle(k)}
                className={`px-3 py-2 font-mono text-overline uppercase tracking-[0.14em] border-r border-line-1 transition-micro ${
                  on ? "text-text-1 bg-surface-2" : "text-text-3 hover:text-text-1"
                }`}
              >
                {KIND_LABEL[k]} · {allEntities().filter((e) => e.kind === k).length}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        {/* Graph canvas */}
        <div
          className="hairline bg-canvas relative overflow-hidden"
          style={{ height: "min(78vh, 780px)" }}
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <svg
            role="img"
            aria-label="VÆRØX knowledge graph"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
          >
            <defs>
              <pattern id="g-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M40 0H0V40"
                  fill="none"
                  stroke="var(--line-1)"
                  strokeWidth="1"
                  opacity="0.5"
                />
              </pattern>
            </defs>
            <rect x="0" y="0" width={W} height={H} fill="url(#g-grid)" />

            <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
              {/* edges */}
              <g fill="none">
                {edges.map((e, i) => {
                  const a = byKey.get(e.a);
                  const b = byKey.get(e.b);
                  if (!a || !b) return null;
                  const dim = neighbors && !(neighbors.has(e.a) && neighbors.has(e.b));
                  const active = neighbors?.has(e.a) && neighbors?.has(e.b);
                  return (
                    <line
                      key={i}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={active ? "var(--text-2)" : "var(--line-3)"}
                      strokeWidth={active ? 1 : 0.6}
                      opacity={dim ? 0.06 : active ? 0.9 : 0.35}
                    />
                  );
                })}
              </g>

              {/* nodes */}
              <g>
                {laidOut.map((n) => {
                  const key = `${n.kind}:${n.id}`;
                  const dim = neighbors && !neighbors.has(key);
                  const isHit = searchHit?.has(key);
                  const r = 4 + Math.min(6, n.degree * 0.35);
                  return (
                    <g
                      key={key}
                      transform={`translate(${n.x} ${n.y})`}
                      onMouseEnter={() => setHover(key)}
                      onMouseLeave={() => setHover((h) => (h === key ? null : h))}
                      onClick={() => setFocus(key === focus ? null : key)}
                      style={{
                        cursor: "pointer",
                        opacity: dim ? 0.2 : 1,
                        transition: "opacity 160ms ease",
                      }}
                    >
                      {isHit && (
                        <circle
                          r={r + 6}
                          fill="none"
                          stroke="var(--text-1)"
                          strokeWidth={0.75}
                          opacity={0.5}
                        />
                      )}
                      {n.kind === "adr" ? (
                        <rect
                          x={-r}
                          y={-r}
                          width={r * 2}
                          height={r * 2}
                          transform="rotate(45)"
                          fill="var(--bg-canvas)"
                          stroke={KIND_COLOR[n.kind]}
                        />
                      ) : n.kind === "team" ? (
                        <rect
                          x={-r}
                          y={-r}
                          width={r * 2}
                          height={r * 2}
                          fill={KIND_COLOR[n.kind]}
                        />
                      ) : n.kind === "person" ? (
                        <circle r={r} fill="var(--bg-canvas)" stroke={KIND_COLOR[n.kind]} />
                      ) : n.kind === "system" || n.kind === "project" ? (
                        <rect
                          x={-r}
                          y={-r}
                          width={r * 2}
                          height={r * 2}
                          fill="var(--bg-canvas)"
                          stroke={KIND_COLOR[n.kind]}
                          strokeWidth={1.25}
                        />
                      ) : n.kind === "future" ? (
                        <rect
                          x={-r}
                          y={-r}
                          width={r * 2}
                          height={r * 2}
                          fill="var(--bg-canvas)"
                          stroke={KIND_COLOR[n.kind]}
                          strokeWidth={0.9}
                          strokeDasharray="2 2"
                        />
                      ) : (
                        <circle r={r * 0.9} fill={KIND_COLOR[n.kind]} opacity={0.85} />
                      )}

                      {(hover === key ||
                        focus === key ||
                        (neighbors?.has(key) && neighbors.size < 14)) && (
                        <text
                          x={r + 4}
                          y={3}
                          fill="var(--text-1)"
                          fontFamily="var(--vx-font-mono)"
                          fontSize="10"
                          letterSpacing="0.4"
                        >
                          {n.title}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            </g>
          </svg>

          {/* Minimap */}
          <div
            className="absolute bottom-3 right-3 hairline bg-canvas p-1"
            style={{ width: 160, height: 100 }}
          >
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
              <rect
                x="0"
                y="0"
                width={W}
                height={H}
                fill="var(--surface-2, var(--bg-canvas))"
                opacity="0.5"
              />
              {laidOut.map((n) => (
                <circle
                  key={`mini-${n.kind}:${n.id}`}
                  cx={n.x}
                  cy={n.y}
                  r={4}
                  fill="var(--text-3)"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Side panel */}
        <aside className="hairline bg-canvas">
          <div className="hairline-b px-4 py-3">
            <div className="text-overline text-text-3 opacity-70">
              {focus ? "Focused" : "Inspector"}
            </div>
          </div>
          {focusedEntity ? (
            <div className="p-4">
              <div className="font-mono text-overline text-text-3 uppercase tracking-[0.18em] tabular">
                {focusedEntity.kicker} · {KIND_LABEL[focusedEntity.kind]}
              </div>
              <h3 className="mt-1 font-display text-heading-m text-text-1 tracking-[-0.01em] leading-[1.2]">
                {focusedEntity.title}
              </h3>
              <p className="mt-2 text-label text-text-2 leading-[1.55]">{focusedEntity.summary}</p>
              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <Link
                  to={focusedEntity.href}
                  className="hairline px-3 py-1.5 font-mono text-overline text-text-1 uppercase tracking-[0.14em] hover:bg-surface-2"
                >
                  Open →
                </Link>
                <button
                  onClick={() => setFocus(null)}
                  className="text-overline text-text-3 hover:text-text-1"
                >
                  Clear
                </button>
              </div>
              {neighbors && neighbors.size > 1 && (
                <>
                  <div className="mt-6 text-overline text-text-3 opacity-70">
                    Neighbors · {(neighbors.size - 1).toString().padStart(2, "0")}
                  </div>
                  <ul className="mt-2 divide-y divide-line-1 hairline">
                    {[...neighbors]
                      .filter((k) => k !== focus)
                      .slice(0, 12)
                      .map((k) => {
                        const n = byKey.get(k);
                        if (!n) return null;
                        return (
                          <li key={k}>
                            <Link
                              to={n.href}
                              className="block px-3 py-2 hover:bg-surface-2"
                              onMouseEnter={() => setHover(k)}
                              onMouseLeave={() => setHover(null)}
                            >
                              <div className="font-mono text-overline text-text-3 uppercase tracking-[0.16em]">
                                {n.kicker}
                              </div>
                              <div className="font-display text-caption text-text-1 truncate">
                                {n.title}
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </>
              )}
            </div>
          ) : (
            <div className="p-4 text-label text-text-3 leading-[1.6] space-y-3">
              <p>Hover any node to highlight its neighborhood.</p>
              <p>
                Click to focus and inspect. <kbd className="hairline px-1">Esc</kbd> to clear.
              </p>
              <p>
                Scroll to zoom, drag to pan. Press <kbd className="hairline px-1">0</kbd> to reset
                the view.
              </p>
            </div>
          )}
        </aside>
      </div>
    </SectionShell>
  );
}
