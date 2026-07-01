import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { Breadcrumbs } from "@/components/doc/breadcrumbs";
import { allEntities, KIND_LABEL, type Entity, type EntityKind } from "@/lib/graph";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — VÆRØX" },
      { name: "description", content: "Universal search across every documented VÆRØX entity." },
    ],
  }),
  component: SearchPage,
});

const KIND_ORDER: EntityKind[] = [
  "system", "project", "api", "adr", "incident",
  "benchmark", "research", "handbook", "journal", "person", "team",
];

const RECENT_KEY = "vx.search.recent";

function score(entity: Entity, q: string): number {
  const t = q.toLowerCase();
  const hay = `${entity.title} ${entity.summary} ${entity.kicker} ${entity.owner ?? ""} ${(entity.tags ?? []).join(" ")}`.toLowerCase();
  if (!hay.includes(t)) {
    // fuzzy: allow gap-tolerant subsequence
    let i = 0;
    for (const ch of hay) {
      if (ch === t[i]) i++;
      if (i === t.length) break;
    }
    if (i < t.length) return 0;
    return 1;
  }
  let s = 4;
  if (entity.title.toLowerCase().includes(t)) s += 8;
  if (entity.title.toLowerCase().startsWith(t)) s += 6;
  if (entity.kicker.toLowerCase().includes(t)) s += 3;
  if ((entity.tags ?? []).some((tg) => tg.toLowerCase().includes(t))) s += 2;
  return s;
}

function SearchPage() {
  const [q, setQ] = useState("");
  const [activeKinds, setActiveKinds] = useState<Set<EntityKind>>(new Set());
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    if (!q || q.length < 2) return;
    const t = setTimeout(() => {
      setRecent((prev) => {
        const next = [q, ...prev.filter((x) => x !== q)].slice(0, 8);
        try { window.localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* noop */ }
        return next;
      });
    }, 800);
    return () => clearTimeout(t);
  }, [q]);

  const entities = useMemo(() => allEntities(), []);

  const results = useMemo(() => {
    if (!q.trim()) return [] as Entity[];
    return entities
      .map((e) => ({ e, s: score(e, q.trim()) }))
      .filter((x) => x.s > 0 && (activeKinds.size === 0 || activeKinds.has(x.e.kind)))
      .sort((a, b) => b.s - a.s)
      .map((x) => x.e);
  }, [q, entities, activeKinds]);

  const grouped = useMemo(() => {
    const m = new Map<EntityKind, Entity[]>();
    for (const e of results) {
      if (!m.has(e.kind)) m.set(e.kind, []);
      m.get(e.kind)!.push(e);
    }
    return m;
  }, [results]);

  const suggestions = useMemo(
    () => ["Helix", "cardinality", "gRPC", "MoE", "atlas", "P95 latency", "incident", "MTTR"],
    [],
  );

  const toggleKind = (k: EntityKind) =>
    setActiveKinds((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k); else next.add(k);
      return next;
    });

  return (
    <SectionShell>
      <Breadcrumbs items={[{ label: "VÆRØX", to: "/" }, { label: "Search" }]} />
      <PageHeader
        section="§ · Search"
        title="Universal search."
        summary="Fuzzy search across every documented system, decision, incident, benchmark, person, and note. Grouped by kind, filterable, keyboard-first."
        meta={[
          { label: "Indexed",  value: entities.length.toString().padStart(3, "0") + " entities" },
          { label: "Kinds",    value: KIND_ORDER.length.toString().padStart(2, "0") },
          { label: "Fuzzy",    value: "subsequence + substring" },
          { label: "Shortcut", value: "⌘K palette" },
        ]}
      />

      {/* Search input */}
      <div className="hairline bg-canvas">
        <label className="flex items-center gap-3 px-4 py-4">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
            Query
          </span>
          <input
            autoFocus
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search systems, ADRs, incidents, benchmarks, APIs, people…"
            className="flex-1 bg-transparent border-0 outline-none font-mono text-[14px] text-text-1 placeholder:text-text-3 tabular"
          />
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] tabular">
            {results.length.toString().padStart(3, "0")}
          </span>
        </label>

        <div className="hairline-t flex flex-wrap">
          {KIND_ORDER.map((k) => {
            const active = activeKinds.has(k);
            return (
              <button
                key={k}
                type="button"
                onClick={() => toggleKind(k)}
                className={`px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-micro border-r border-line-1 ${
                  active ? "text-text-1 bg-surface-2" : "text-text-3 hover:text-text-1"
                }`}
              >
                {KIND_LABEL[k]}
              </button>
            );
          })}
          {activeKinds.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveKinds(new Set())}
              className="ml-auto px-3 py-2 font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] hover:text-text-1"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Suggestions & recent */}
      {!q && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 hairline">
          <div className="bg-canvas p-4">
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70 mb-3">
              Suggested
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQ(s)}
                  className="hairline px-2.5 py-1 font-mono text-[11px] text-text-2 hover:text-text-1"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-canvas p-4">
            <div className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70 mb-3">
              Recent
            </div>
            {recent.length === 0 ? (
              <div className="font-mono text-[11px] text-text-3">No recent searches.</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {recent.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQ(s)}
                    className="hairline px-2.5 py-1 font-mono text-[11px] text-text-2 hover:text-text-1"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {q && (
        <div className="mt-10 space-y-8">
          {results.length === 0 && (
            <div className="hairline bg-canvas p-8 font-mono text-[12px] text-text-3 uppercase tracking-[0.14em]">
              No matches for "{q}"
            </div>
          )}
          {KIND_ORDER.filter((k) => grouped.has(k)).map((k) => {
            const rows = grouped.get(k)!;
            return (
              <section key={k}>
                <header className="mb-3 flex items-baseline justify-between hairline-b pb-2">
                  <h2 className="font-mono text-[11px] text-text-1 uppercase tracking-[0.18em]">
                    {KIND_LABEL[k]}
                  </h2>
                  <span className="font-mono text-[10px] text-text-3 tabular">
                    {rows.length.toString().padStart(2, "0")}
                  </span>
                </header>
                <ul className="hairline bg-canvas divide-y divide-line-1">
                  {rows.slice(0, 12).map((e) => (
                    <li key={`${e.kind}:${e.id}`}>
                      <Link
                        to={e.href}
                        className="block px-4 py-3 hover:bg-surface-2 transition-micro"
                      >
                        <div className="grid grid-cols-[90px_1fr_auto] gap-4 items-baseline">
                          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.16em] tabular">
                            {e.kicker}
                          </span>
                          <div className="min-w-0">
                            <div className="font-display text-[14px] text-text-1 tracking-[-0.01em] truncate">
                              {e.title}
                            </div>
                            <div className="font-mono text-[11px] text-text-3 mt-1 truncate">
                              {e.summary}
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-text-3 tabular">
                            {e.updated ?? ""}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </SectionShell>
  );
}
