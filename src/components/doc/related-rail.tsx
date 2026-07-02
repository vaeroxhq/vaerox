import { Link } from "@tanstack/react-router";
import { getRelated, KIND_LABEL, type EntityKind, type Entity } from "@/lib/graph";

/**
 * RelatedRail — right-column list of related entities grouped by
 * kind. Renders nothing if the entity has no edges.
 */
export function RelatedRail({
  kind,
  id,
  title = "Related",
}: {
  kind: EntityKind;
  id: string;
  title?: string;
}) {
  const related = getRelated(kind, id);
  if (related.length === 0) return null;

  const groups = new Map<EntityKind, Entity[]>();
  for (const e of related) {
    if (!groups.has(e.kind)) groups.set(e.kind, []);
    groups.get(e.kind)!.push(e);
  }

  const order: EntityKind[] = [
    "system",
    "future",
    "team",
    "person",
    "adr",
    "incident",
    "benchmark",
    "api",
    "project",
    "research",
    "dataset",
    "journal",
    "handbook",
  ];

  return (
    <aside className="hairline bg-canvas h-fit sticky top-24">
      <div className="px-4 py-3 hairline-b flex items-baseline justify-between">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
          {title}
        </span>
        <span className="font-mono text-[10px] text-text-3 tabular opacity-70">
          {related.length.toString().padStart(2, "0")}
        </span>
      </div>
      <div>
        {order
          .filter((k) => groups.has(k))
          .map((k) => (
            <RelatedGroup key={k} label={KIND_LABEL[k]} items={groups.get(k)!} />
          ))}
      </div>
    </aside>
  );
}

function RelatedGroup({ label, items }: { label: string; items: Entity[] }) {
  return (
    <div className="hairline-b last:border-b-0">
      <div className="px-4 pt-3 pb-1 font-mono text-[9.5px] text-text-3 uppercase tracking-[0.18em] opacity-60">
        {label}
      </div>
      <ul>
        {items.map((e) => (
          <li key={`${e.kind}:${e.id}`}>
            <Link
              to={e.href}
              className="group card-hover hover:card-hover-on flex items-baseline gap-3 px-4 py-2.5"
            >
              <span className="font-mono text-[10px] text-text-3 tabular w-14 shrink-0">
                {e.kicker}
              </span>
              <span className="font-display text-[13px] text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.005em] truncate">
                {e.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
