## VÆRØX Phase 2 — Operating Company Experience

Visual language is locked. Zero redesign. All work is **new data, new routes, and deeper interconnection** using the primitives already shipped (`SectionShell`, `PageHeader`, `MetaCell`, `StageDot`, `OpsTag`, `DocShell`, `Breadcrumbs`, `RelatedRail`, `PrevNext`, `.hairline`, `.card-hover`, mono/geist tokens).

Every new entity registers into `src/lib/graph.ts` so RelatedRail and ⌘K pick it up automatically. No lorem ipsum — every string is plausible production content. No new deps.

---

### Batch E — Company & People (foundation)

The org chart is the spine that makes everything else feel lived-in.

1. **`src/lib/people-data.ts`** — 18 engineers with `slug`, name, handle, role, team, joined, location, bio (2 sentences), expertise tags, `systemsOwned[]`, `adrsAuthored[]`, `incidentsCommanded[]`, `projectsContributed[]`, `researchAuthored[]`.
2. **`src/lib/teams-data.ts`** — 7 teams (Platform, Infrastructure, Research, Security, Performance, Reliability, Developer Experience) with charter, lead, members, `systemsOwned[]`, `currentProjects[]`, on-call rotation, established date.
3. **Backfill** owners on existing systems/ADRs/incidents to reference `people` slugs (keep string display but resolve via helper).
4. **Graph registration** — add `person` and `team` entity kinds to `graph.ts` with edges to systems, ADRs, incidents, projects, research.
5. **Routes**
   - `/teams` — hairline grid of team cards (name, charter one-liner, member count, systems count).
   - `/teams/$slug` — team detail: charter, members table, systems owned, active projects, on-call, RelatedRail.
   - `/people` — tabular directory (name · role · team · systems · updated), searchable.
   - `/people/$slug` — profile: bio, expertise mono tag rail, contribution timeline (unified feed of ADR/incident/journal/research events sorted by date), RelatedRail grouped by kind.
6. **Nav** — add `Teams` and `People` under a new `Meta` grouping alongside About/Contact. ⌘K picks them up via graph.

Verify: every existing detail page's owner string becomes a `<Link>` to `/people/$slug` when a match exists.

---

### Batch F — Changelog, Releases, Roadmap

1. **`src/lib/changelog-data.ts`** — 24 entries spanning 2024-01 through 2026-06, each: `version`, date, `kind` (Feature/Architecture/Fix/Benchmark/Migration/Docs), title, body (3-5 sentences), linked systems/ADRs/benchmarks.
2. **`src/lib/roadmap-data.ts`** — 22 initiatives across 6 stages (Completed, In Progress, Planned, Research, Prototype, Future), each linked to system/project, quarter, owner-team, confidence.
3. **`src/lib/releases-data.ts`** — per-project version history (5-8 versions each for top 6 projects) with breaking changes, migration notes.
4. **Routes**
   - `/changelog` — reverse-chronological feed with month/quarter/year filter tabs (client state, no route change), kind chip, permalink `#v-x-y-z`.
   - `/roadmap` — 6-column hairline board, cards link to system/project, footer legend.
   - `/projects/$slug/releases` (nested tab) — versions table with prev/next between versions.
5. Register changelog + roadmap + release entities in graph.

---

### Batch G — Status Center & Engineering Metrics

1. **`src/lib/status-data.ts`** — 14 components with 90-day uptime series (deterministic pseudo-random seeded so it doesn't change per render), current state, historical incidents (link to `/incidents/*`), maintenance windows.
2. **`/status`** — dedicated route (replace any placeholder):
   - Top strip: overall status + 90-day availability %.
   - Components table: each row hairline bar chart (90 cells, filled = uptime tier).
   - Active incidents (from `INCIDENTS` filtered by open).
   - Scheduled maintenance list.
   - Latency history (per-region SVG sparkline).
3. **`src/lib/metrics-data.ts`** — 10 org metrics with 26-week series: deploys/wk, PR throughput, MTTA, MTTR, review time (h), incident freq, availability, P95, infra nodes, cost/req.
4. **`/metrics`** — executive dashboard: KV meta strip + grid of hairline sparkline cards, each linking to a definition modal-less detail page `/metrics/$slug` with methodology + related benchmarks/incidents.
5. **Homepage** — replace `OperationsStrip` blank halves with a "Platform Health" mini panel (3 metrics + link to /status) using the same primitives — no visual change to hero/sections.

---

### Batch H — Project Lifecycle, Graph & Polish

1. **Project detail expansion** (`/projects/$slug`) — add sectioned anchors: Overview · Architecture · Timeline · Roadmap · Benchmarks · Research · Deployment · Owners · Incidents · APIs · Systems · Dependencies · Docs. Populate each from the graph; hide empties silently (no empty-state prose).
2. **`/graph`** — full-page knowledge graph. Use existing SVG force layout style from `KnowledgeGraphPreview`, scaled up: all entity kinds with kind-filter chips, hover reveals title + href, click navigates. No new lib.
3. **Owner links** — every string ownership becomes a link via a `<PersonRef>` helper. Same for team, system, ADR references in bodies.
4. **Global audit pass**
   - Delete `placeholder-page.tsx` and any route still importing it; each must have real content or be removed.
   - Remove any "Coming soon" / empty-state copy.
   - Verify `TopNav` order and add new routes to nav manifest.
   - Add `reveal` mount fade to new pages (existing 200ms utility).
   - Skeletons on any lazy metric chart.
5. **⌘K polish** — group kinds in a stable order (System, Project, Team, Person, ADR, Incident, Benchmark, API, Research, Handbook, Journal, Changelog, Roadmap, Metric), mono kind-tag right-aligned.
6. **Smoke test** — Playwright pass: crawl every nav link + 5 random detail slugs per kind; assert 200 + Breadcrumbs + RelatedRail present.

---

### Non-goals

- No real-time telemetry (all series are deterministic seed data).
- No auth, no Cloud writes.
- No new fonts, colors, radii, motion primitives, or layout systems.
- No react-flow / charting libs — keep hairline SVG.

---

### Delivery order

Ship in order: **E → F → G → H**. Each batch ends with a build + Playwright smoke and a short changelog entry (dogfooding the new changelog).

Approve to start Batch E, or reshape scope (e.g. drop `/graph` full page, fold Teams into People, cut Metrics detail routes).