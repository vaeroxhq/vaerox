/**
 * Unified content graph. Every documented entity is registered here
 * with a stable id, human title, and canonical URL. Relationships
 * between entities are computed from the underlying data modules,
 * then symmetric edges are added at build time so RelatedRail and
 * Backlinks work in both directions.
 *
 * This module has no runtime cost beyond a single walk at import
 * time. It is safe to import from any surface.
 */

import { SYSTEMS } from "./systems-data";
import { PROJECTS as PROJECT_ROWS } from "./projects-data";
import { RESEARCH } from "./research-data";
import { ADRS } from "./architecture-data";
import { HANDBOOK } from "./engineering-data";
import { JOURNAL } from "./journal-data";
import { INCIDENTS } from "./incidents-data";
import { BENCHMARKS } from "./benchmarks-data";
import { APIS } from "./apis-data";
import { PEOPLE, findPersonByName } from "./people-data";
import { TEAMS } from "./teams-data";

export type EntityKind =
  | "system"
  | "project"
  | "research"
  | "adr"
  | "handbook"
  | "journal"
  | "incident"
  | "benchmark"
  | "api"
  | "person"
  | "team";

export type EntityRef = { kind: EntityKind; id: string };

export type Entity = {
  kind: EntityKind;
  id: string;                // stable, unique per (kind,id)
  slug: string;
  title: string;
  href: string;
  kicker: string;            // "ADR·014", "INC-2026-041", "SYS", etc.
  summary: string;
  owner?: string;
  updated?: string;
  status?: string;
  tags?: string[];
};

const entities = new Map<string, Entity>();
const relations = new Map<string, Set<string>>();

const key = (kind: EntityKind, id: string) => `${kind}:${id}`;

function register(e: Entity): Entity {
  const k = key(e.kind, e.id);
  entities.set(k, e);
  if (!relations.has(k)) relations.set(k, new Set());
  return e;
}

function link(a: EntityRef, b: EntityRef | undefined | null) {
  if (!b) return;
  const ka = key(a.kind, a.id);
  const kb = key(b.kind, b.id);
  if (ka === kb) return;
  if (!entities.has(ka) || !entities.has(kb)) return; // ignore dangling
  relations.get(ka)!.add(kb);
  if (!relations.has(kb)) relations.set(kb, new Set());
  relations.get(kb)!.add(ka);
}

/* ── Register every entity ───────────────────────────────── */

for (const s of SYSTEMS) {
  register({
    kind: "system", id: s.slug, slug: s.slug,
    title: s.name, href: `/systems/${s.slug}`,
    kicker: "SYS", summary: s.summary,
    owner: s.owner, updated: s.lastDeploy, status: s.stage,
    tags: s.stack,
  });
}

for (const p of PROJECT_ROWS) {
  register({
    kind: "project", id: p.slug, slug: p.slug,
    title: p.name, href: `/projects/${p.slug}`,
    kicker: "PRJ", summary: p.description,
    owner: p.role, updated: p.updated, status: p.stage,
    tags: p.stack,
  });
}

for (const r of RESEARCH) {
  register({
    kind: "research", id: r.slug, slug: r.slug,
    title: r.title, href: `/research/${r.slug}`,
    kicker: "RES", summary: r.abstract,
    owner: r.authors.join(", "), updated: r.published, status: r.status,
    tags: r.tags,
  });
}

for (const a of ADRS) {
  register({
    kind: "adr", id: a.slug, slug: a.slug,
    title: a.title, href: `/architecture/${a.slug}`,
    kicker: `ADR·${a.number}`, summary: a.context,
    owner: `${a.owner} · ${a.team}`, updated: a.decisionDate, status: a.status,
    tags: a.systems,
  });
}

for (const h of HANDBOOK) {
  register({
    kind: "handbook", id: h.slug, slug: h.slug,
    title: h.title, href: `/engineering#${h.slug}`,
    kicker: `§${h.index}`, summary: h.summary,
    owner: h.owner, updated: h.updated, status: h.status,
  });
}

for (const j of JOURNAL) {
  register({
    kind: "journal", id: j.slug, slug: j.slug,
    title: j.title, href: `/journal/${j.slug}`,
    kicker: "LOG", summary: j.summary,
    owner: j.author, updated: j.date, status: j.status,
    tags: j.tags,
  });
}

for (const i of INCIDENTS) {
  register({
    kind: "incident", id: i.slug, slug: i.slug,
    title: i.title, href: `/incidents/${i.slug}`,
    kicker: i.id, summary: i.summary,
    owner: i.commander, updated: i.openedAt.slice(0, 10), status: i.severity,
    tags: i.systemsAffected,
  });
}

for (const b of BENCHMARKS) {
  register({
    kind: "benchmark", id: b.slug, slug: b.slug,
    title: b.title, href: `/benchmarks/${b.slug}`,
    kicker: b.code, summary: `${b.metric} · ${b.cadence.toLowerCase()}`,
    owner: b.owner, updated: b.updated, status: b.cadence,
    tags: [b.system],
  });
}

for (const a of APIS) {
  register({
    kind: "api", id: a.slug, slug: a.slug,
    title: a.name, href: `/api/${a.slug}`,
    kicker: a.code, summary: a.summary,
    owner: a.owner, updated: a.updated, status: a.stability,
    tags: [a.version, a.system],
  });
}

/* ── Compute edges from the underlying data ──────────────── */

// ADR ↔ systems (by system slug)
for (const a of ADRS) {
  const self: EntityRef = { kind: "adr", id: a.slug };
  for (const sysName of a.systems) {
    const sysSlug = SYSTEMS.find((s) => s.name === sysName || s.slug === sysName)?.slug;
    if (sysSlug) link(self, { kind: "system", id: sysSlug });
  }
  if (a.supersedes) link(self, { kind: "adr", id: ADRS.find((x) => x.number === a.supersedes)?.slug ?? "" });
  if (a.supersededBy) link(self, { kind: "adr", id: ADRS.find((x) => x.number === a.supersededBy)?.slug ?? "" });
}

// Incidents ↔ everything they reference
for (const i of INCIDENTS) {
  const self: EntityRef = { kind: "incident", id: i.slug };
  for (const sys of i.systemsAffected) link(self, { kind: "system", id: sys });
  for (const adr of i.relatedAdrs) link(self, { kind: "adr", id: adr });
  for (const j of i.relatedJournal) link(self, { kind: "journal", id: j });
  for (const b of i.relatedBenchmarks) link(self, { kind: "benchmark", id: b });
}

// Benchmarks ↔ everything they reference
for (const b of BENCHMARKS) {
  const self: EntityRef = { kind: "benchmark", id: b.slug };
  link(self, { kind: "system", id: b.system });
  for (const s of b.relatedSystems) link(self, { kind: "system", id: s });
  for (const a of b.relatedAdrs) link(self, { kind: "adr", id: a });
  for (const inc of b.relatedIncidents) link(self, { kind: "incident", id: inc });
}

// APIs ↔ systems + ADRs
for (const a of APIS) {
  const self: EntityRef = { kind: "api", id: a.slug };
  link(self, { kind: "system", id: a.system });
  for (const s of a.relatedSystems) link(self, { kind: "system", id: s });
  for (const adr of a.relatedAdrs) link(self, { kind: "adr", id: adr });
}

// Projects ↔ system with matching slug (natural mapping in this dataset)
for (const p of PROJECT_ROWS) {
  link({ kind: "project", id: p.slug }, { kind: "system", id: p.slug });
}

// Journal ↔ tags → best-effort system/ADR/benchmark linking
for (const j of JOURNAL) {
  const self: EntityRef = { kind: "journal", id: j.slug };
  for (const t of j.tags) {
    if (SYSTEMS.some((s) => s.slug === t)) link(self, { kind: "system", id: t });
    if (BENCHMARKS.some((b) => b.slug.startsWith(t))) {
      const match = BENCHMARKS.find((b) => b.slug.startsWith(t));
      if (match) link(self, { kind: "benchmark", id: match.slug });
    }
    if (t === "adr") {
      // slug pattern adr-NNN-...
      const num = j.slug.match(/adr-(\d+)/)?.[1];
      if (num) {
        const found = ADRS.find((a) => a.number === num);
        if (found) link(self, { kind: "adr", id: found.slug });
      }
    }
  }
}

// Research ↔ system by tag heuristic
for (const r of RESEARCH) {
  const self: EntityRef = { kind: "research", id: r.slug };
  for (const t of r.tags) {
    const s = SYSTEMS.find((s) => s.name.toLowerCase().includes(t.toLowerCase()));
    if (s) link(self, { kind: "system", id: s.slug });
  }
}

/* ── Public API ─────────────────────────────────────────── */

export function getEntity(kind: EntityKind, id: string): Entity | undefined {
  return entities.get(key(kind, id));
}

export function getRelated(kind: EntityKind, id: string, only?: EntityKind[]): Entity[] {
  const set = relations.get(key(kind, id));
  if (!set) return [];
  const out: Entity[] = [];
  for (const k of set) {
    const e = entities.get(k);
    if (!e) continue;
    if (only && !only.includes(e.kind)) continue;
    out.push(e);
  }
  return out.sort((a, b) => (b.updated ?? "").localeCompare(a.updated ?? ""));
}

export function allEntities(): Entity[] {
  return Array.from(entities.values());
}

export function entitiesOfKind(kind: EntityKind): Entity[] {
  return allEntities().filter((e) => e.kind === kind);
}

export const KIND_LABEL: Record<EntityKind, string> = {
  system: "System",
  project: "Project",
  research: "Research",
  adr: "ADR",
  handbook: "Handbook",
  journal: "Journal",
  incident: "Incident",
  benchmark: "Benchmark",
  api: "API",
};
