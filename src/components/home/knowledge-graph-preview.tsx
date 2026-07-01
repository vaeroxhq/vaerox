import { useMemo, useState } from "react";
import { GRAPH_EDGES, GRAPH_NODES, type GraphNodeKind } from "@/lib/home-data";

const KIND_LABEL: Record<GraphNodeKind, string> = {
  project: "Project",
  infra: "Infrastructure",
  architecture: "Architecture",
  research: "Research",
  dataset: "Dataset",
  adr: "ADR",
};

/**
 * Knowledge Graph Preview — real relationship map of the engineering
 * surface. Hovering a node dims unrelated nodes/edges so the local
 * topology becomes readable. No decorative motion.
 */
export function KnowledgeGraphPreview() {
  const nodeById = useMemo(
    () => Object.fromEntries(GRAPH_NODES.map((n) => [n.id, n])),
    [],
  );
  const [hovered, setHovered] = useState<string | null>(null);

  const neighbors = useMemo(() => {
    if (!hovered) return null;
    const set = new Set<string>([hovered]);
    for (const e of GRAPH_EDGES) {
      if (e.from === hovered) set.add(e.to);
      if (e.to === hovered) set.add(e.from);
    }
    return set;
  }, [hovered]);

  const isDim = (id: string) => (neighbors ? !neighbors.has(id) : false);
  const isEdgeDim = (from: string, to: string) =>
    neighbors ? !(neighbors.has(from) && neighbors.has(to)) : false;

  const kinds = Object.keys(KIND_LABEL) as GraphNodeKind[];

  return (
    <section className="mt-10 mb-24 hairline reveal">
      <header className="hairline-b bg-canvas grid grid-cols-3 md:grid-cols-6 gap-px bg-line-1">
        {kinds.map((k) => (
          <div key={k} className="bg-canvas px-4 py-3 flex items-baseline justify-between gap-3">
            <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
              {KIND_LABEL[k]}
            </span>
            <span className="font-mono text-[11px] text-text-2 tabular">
              {GRAPH_NODES.filter((n) => n.kind === k).length.toString().padStart(2, "0")}
            </span>
          </div>
        ))}
      </header>

      <div className="bg-canvas p-6">
        <svg
          role="img"
          aria-label="Knowledge graph preview"
          viewBox="0 0 1000 500"
          className="w-full h-[420px] md:h-[500px]"
        >
          <defs>
            <pattern id="kg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="var(--line-1)" strokeWidth="1" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="1000" height="500" fill="url(#kg-grid)" />

          {/* edges */}
          <g fill="none">
            {GRAPH_EDGES.map((e, i) => {
              const a = nodeById[e.from];
              const b = nodeById[e.to];
              if (!a || !b) return null;
              const dim = isEdgeDim(e.from, e.to);
              const active = neighbors?.has(e.from) && neighbors?.has(e.to);
              return (
                <line
                  key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={active ? "var(--text-2)" : "var(--line-3)"}
                  strokeWidth="1"
                  strokeDasharray="2 4"
                  opacity={dim ? 0.15 : active ? 0.9 : 0.55}
                  style={{ transition: "opacity 180ms ease, stroke 180ms ease" }}
                />
              );
            })}
          </g>

          {/* nodes */}
          <g>
            {GRAPH_NODES.map((n) => (
              <g
                key={n.id}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered((h) => (h === n.id ? null : h))}
                style={{
                  cursor: "pointer",
                  opacity: isDim(n.id) ? 0.25 : 1,
                  transition: "opacity 180ms ease",
                }}
              >
                <GraphNodeGlyph x={n.x} y={n.y} label={n.label} kind={n.kind} active={hovered === n.id} />
              </g>
            ))}
          </g>
        </svg>

        <ul className="mt-6 hairline-t pt-4 grid grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-2 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          {kinds.map((k) => (
            <li key={k} className="flex items-center gap-2">
              <NodeMark kind={k} />
              <span>{KIND_LABEL[k]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GraphNodeGlyph({
  x, y, label, kind, active,
}: {
  x: number; y: number; label: string; kind: GraphNodeKind; active: boolean;
}) {
  const stroke = active ? "var(--text-1)" : "var(--text-2)";
  const fill = "var(--bg-canvas)";
  return (
    <g transform={`translate(${x} ${y})`}>
      {kind === "project" && <rect x={-6} y={-6} width={12} height={12} fill={fill} stroke={stroke} />}
      {kind === "infra" && <rect x={-5} y={-5} width={10} height={10} fill={stroke} />}
      {kind === "architecture" && (
        <rect x={-6} y={-6} width={12} height={12} transform="rotate(45)" fill={fill} stroke={stroke} />
      )}
      {kind === "research" && <circle r={7} fill={fill} stroke={stroke} />}
      {kind === "dataset" && <circle r={4} fill={stroke} />}
      {kind === "adr" && <polygon points="0,-8 7,4 -7,4" fill={fill} stroke={stroke} />}
      <text
        x={12} y={4}
        fill={active ? "var(--text-1)" : "var(--text-2)"}
        fontFamily="var(--vx-font-mono)"
        fontSize="10"
        letterSpacing="0.5"
      >
        {label}
      </text>
    </g>
  );
}

function NodeMark({ kind }: { kind: GraphNodeKind }) {
  const cls = "inline-block h-[8px] w-[8px] border border-line-3";
  if (kind === "project") return <span className={cls} />;
  if (kind === "infra") return <span className="inline-block h-[8px] w-[8px] bg-line-3" />;
  if (kind === "architecture") return <span className={`${cls} rotate-45`} />;
  if (kind === "research") return <span className={`${cls} rounded-full`} />;
  if (kind === "dataset") return <span className="inline-block h-[6px] w-[6px] rounded-full bg-line-3" />;
  return (
    <span
      className="inline-block h-0 w-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent"
      style={{ borderBottomColor: "var(--line-3)" }}
    />
  );
}
