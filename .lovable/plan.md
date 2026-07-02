# Canonical Identity Migration

Design language is locked. This phase is purely IA + content.

## Objective

Every document on VÆRØX must belong to (a) one of 9 real systems or (b) an explicitly planned future system. No fictional production history.

## Canonical roster (real, current)

VESTRA · QuantEdge AI · MarketPulse · AEGIS OPS · LeadPulse · CloudCostIQ · Axiom · Supply Chain Digital Twin · PitWall AI

## Future-only roster

Helix · Atlas · Meridian · Signal Router · Nimbus · VectorHub · DataForge · PromptLab · AgentBench · FinGraph
(Orbit, Vigil, Ledger·01 — retire entirely; they aren't in either roster.)

## Steps

### 1. Rebuild `src/lib/systems-data.ts`

Replace the 8 current entries (marketpulse, axiom, vigil, helix, atlas, orbit, signal-router, ledger-01) with the 9 canonical systems. Every entry:

- `stage: "Building" | "Prototype" | "Research"` (no "Production" unless truly deployed; default Building)
- Remove `health` field usage from copy; keep field but set to "Nominal" placeholder and stop rendering it
- `owner: "Mayank Sharma"`, `lastDeploy` → rename semantics to `updated`
- Honest 2-sentence summary + purpose per system

### 2. Move Helix/Atlas/Meridian/Signal Router into `future-systems-data.ts` only

Already present for most. Ensure Orbit/Vigil are removed from all future lists too (they're neither real nor planned). Add any missing (Nimbus, VectorHub, DataForge, PromptLab, AgentBench, FinGraph already exist per prior phase).

### 3. Rewrite `src/lib/benchmarks-data.ts` (Engineering Validation)

Point every record's `system` to a canonical slug. Rewrite records that referenced helix/atlas/orbit/signal-router to reference vestra/quantedge/marketpulse/etc. Keep validation-honest framing (Target, Prototype measured). For future systems, use "Design Target" terminology.

### 4. Rewrite `src/lib/apis-data.ts`

Every API `system` → canonical slug. Rename APIs for future systems to "Planned Interface" with `stability: "Planned"`.

### 5. Rewrite `src/lib/architecture-data.ts` (ADRs)

Rebind each ADR's `systems` array to canonical slugs. ADRs about fictional infra get retargeted to a real system (e.g. an ADR about serving latency → VESTRA agent latency).

### 6. Rewrite `src/lib/journal-data.ts`

Replace fictional operational entries with authentic-sounding engineering notes tied to canonical systems (design decisions, tradeoffs, experiments — no fake incidents/deploys). Tags reference canonical slugs.

### 7. Delete Incidents entirely

Incidents imply live production. Remove:

- `src/lib/incidents-data.ts` (keep file but empty the array, or delete route)
- `src/routes/incidents.*` (delete files)
- Nav entry, command palette entry, graph registration, related-rail references
  Replace nav slot with nothing (keep count down) or with "Engineering Challenges" later — for now, remove.

### 8. Rewrite `src/lib/evidence-data.ts`

Rebind `PROJECT_EVIDENCE` and `SYSTEM_EVIDENCE` keys/values to canonical slugs. Remove incident refs.

### 9. Rewrite `src/lib/projects-data.ts`

Nine projects, one per canonical system, slugs matching systems.

### 10. Rewrite `src/lib/research-data.ts` tags/links to canonical slugs.

### 11. Future system pages — planning language

In `systems.future.$slug.tsx` and `future-systems-data.ts`, ensure section labels are: Architecture Proposal, Design Targets, Planned Interfaces, Development Log, Open Questions, Tradeoffs, Future Milestones. No "Production", "Incident", "Release", "Benchmark", "API Version".

### 12. Knowledge graph — two visual layers

In `src/routes/graph.tsx`, style `kind === "future"` nodes with a distinct treatment (dashed hairline + muted fill) vs. `kind === "system"` (solid). Add legend row "Current / Future".

### 13. Cleanup pass

- `src/lib/nav.ts` — drop incidents; keep architecture, benchmarks (label "Engineering Validation"), research, journal, graph, timeline.
- `src/components/shell/command-palette.tsx` — remove incident entries.
- `src/lib/graph.ts` — remove `INCIDENTS` import + registration block.
- Homepage strips referencing incidents → remove.
- `timeline.tsx`, `explorer.tsx`, `search.tsx`, `dashboards.tsx` — filter out incident kind; use canonical systems in any sample data.

### 14. Copy language sweep

Global find/replace within touched files:

- "Production Deployment" → "Architecture Proposal" (future context)
- "Incident" → "Engineering Challenge" (future context) / removed elsewhere
- "Benchmark" (future context) → "Design Target"
- "API Version" (future) → "Planned Interface"
- "Release Notes" (future) → "Development Log"

## Out of scope

- No visual/typographic/color changes.
- No new route shells or components.
- Not writing 60+ pages of real long-form content this phase — that's the follow-on month of work the user described. This phase produces honest scaffolding with concrete-but-brief real-topic entries (2–4 sentence bodies) tied to real systems, so the site stops claiming fake ops.

## Technical notes

- Files rewritten wholesale where >50% changes: `systems-data.ts`, `projects-data.ts`, `benchmarks-data.ts`, `apis-data.ts`, `architecture-data.ts`, `journal-data.ts`, `evidence-data.ts`.
- Delete: `src/lib/incidents-data.ts`, `src/routes/incidents.tsx`, `src/routes/incidents.index.tsx`, `src/routes/incidents.$id.tsx`.
- Constitution memory already lists the 9 canonical systems — matches this migration.

## Verification

1. `bun run build` clean (no dangling incident imports).
2. Every route under /systems/_, /projects/_, /benchmarks/_, /architecture/_, /api/_, /journal/_ references a canonical or future slug.
3. Graph legend shows two layers.
4. `rg -n "Orbit|Vigil|Ledger·01|incident" src/` returns only intentional matches (e.g. legend "no incidents").
