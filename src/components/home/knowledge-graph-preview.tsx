import { GRAPH_EDGES, GRAPH_NODES, type GraphNodeKind } from "@/lib/home-data";

const KIND_LABEL: Record<GraphNodeKind, string> = {
  project: "Project",
  architecture: "Architecture",
  research: "Research",
  adr: "ADR",
};

/**
 * Knowledge Graph Preview — a real relationship map, not decoration.
 * Nodes and edges are seeded but the shape mirrors what a future loader
 * will return from the content graph.
 */
export function KnowledgeGraphPreview() {
  const nodeById = Object.fromEntries(GRAPH_NODES.map((n) => [n.id, n]));

  return (
    <section className="mt-10 mb-24 hairline">
      <header className="hairline-b bg-canvas grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
        {(Object.keys(KIND_LABEL) as GraphNodeKind[]).map((k) => (
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
          className="w-full h-[360px] md:h-[420px]"
        >
          <defs>
            <pattern id="kg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M40 0H0V40"
                fill="none"
                stroke="var(--line-1)"
                strokeWidth="1"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="1000" height="500" fill="url(#kg-grid)" />

          {/* edges */}
          <g stroke="var(--line-3)" strokeWidth="1" fill="none" opacity="0.7">
            {GRAPH_EDGES.map((e, i) => {
              const a = nodeById[e.from];
              const b = nodeById[e.to];
              if (!a || !b) return null;
              return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeDasharray="2 4" />;
            })}
          </g>

          {/* nodes */}
          <g>
            {GRAPH_NODES.map((n) => (
              <GraphNodeGlyph key={n.id} x={n.x} y={n.y} label={n.label} kind={n.kind} />
            ))}
          </g>
        </svg>

        <ul className="mt-6 hairline-t pt-4 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          {(Object.keys(KIND_LABEL) as GraphNodeKind[]).map((k) => (
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
  x,
  y,
  label,
  kind,
}: {
  x: number;
  y: number;
  label: string;
  kind: GraphNodeKind;
}) {
  const stroke = "var(--text-2)";
  const fill = "var(--bg-canvas)";
  return (
    <g transform={`translate(${x} ${y})`}>
      {kind === "project" && <rect x={-6} y={-6} width={12} height={12} fill={fill} stroke={stroke} />}
      {kind === "architecture" && (
        <rect x={-6} y={-6} width={12} height={12} transform="rotate(45)" fill={fill} stroke={stroke} />
      )}
      {kind === "research" && <circle r={7} fill={fill} stroke={stroke} />}
      {kind === "adr" && (
        <polygon points="0,-8 7,4 -7,4" fill={fill} stroke={stroke} />
      )}
      <text
        x={12}
        y={4}
        fill="var(--text-2)"
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
  if (kind === "architecture") return <span className={`${cls} rotate-45`} />;
  if (kind === "research") return <span className={`${cls} rounded-full`} />;
  return (
    <span
      className="inline-block h-0 w-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent"
      style={{ borderBottomColor: "var(--line-3)" }}
    />
  );
}
