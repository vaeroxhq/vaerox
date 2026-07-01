## Phase 7 — Make VÆRØX Feel Like a Real Engineering Org

Visual language is locked. No redesign. All work is **content depth, interconnection, and interaction**. Delivered in four scoped batches so each batch ships a working, verifiable slice — not a half-migration.

---

### Guiding constraints (unchanged)

- No new fonts, colors, radii, or motion primitives. Reuse `SectionShell`, `PageHeader`, `MetaCell`, `StageDot`, `OpsTag`, `.hairline`, `.card-hover`.
- No decorative animation. Transitions ≤200ms, opacity + 1px hairline shifts only.
- No lorem ipsum. Every string is plausible production engineering content.
- Every new route uses the same shell, breadcrumbs, meta strip, and revision footer.

---

### Batch A — Content graph foundation

The interconnection is the product. Build the spine before the pages.

1. **`src/lib/graph.ts`** — a single typed registry that unifies every entity (System, Project, ADR, Benchmark, Incident, HandbookSection, JournalEntry, Diagram, ApiSpec, Runbook) with:
   - stable `id`, `kind`, `slug`, `title`, `href`, `owner`, `updated`, `revision`, `status`, `tags[]`
   - `related: EntityRef[]` — the edges (bidirectional, resolved at build time)
   - helper: `getRelated(id)`, `resolveHref(ref)`, `neighbors(id, kinds?)`
2. **New data modules** (invented, believable):
   - `incidents-data.ts` — 8 incidents (INC-2024-014 through INC-2026-041) with severity, MTTA/MTTR, timeline, root cause, action items, linked systems + ADRs.
   - `benchmarks-data.ts` — 10 benchmarks (Helix throughput, Atlas control-plane P95, Orbit query fan-out, etc.) with methodology, dataset, hardware, historical runs.
   - `apis-data.ts` — 6 API specs (Helix Inference API, Atlas Control API, Orbit Query API, …) with endpoints, auth, rate limits, examples.
   - `diagrams-data.ts` — 12 architecture diagrams as structured node/edge JSON (rendered SVG, no images).
   - `runbooks-data.ts` — 6 runbooks tied to systems and incidents.
3. **Backfill `related` on existing data** (systems, projects, ADRs, journal, handbook) so every entity has 4-12 edges.

Verifiable output: `graph.ts` exports a `GRAPH` object; a tiny `/graph.json` route (dev only) confirms edge counts.

---

### Batch B — Detail pages for every card

Every card becomes clickable and opens a real page. Shared primitives.

1. **New shared components** in `src/components/doc/`:
   - `Breadcrumbs.tsx` — Home › Section › Slug, mono 10px.
   - `PrevNext.tsx` — hairline strip at document foot.
   - `RelatedRail.tsx` — right-column list grouped by kind (ADR, Incident, Benchmark, Journal, System).
   - `Backlinks.tsx` — "Referenced by" section under body.
   - `TableOfContents.tsx` — sticky sidebar, scroll-spy, active heading highlight.
   - `ReadingProgress.tsx` — 1px top bar, opacity only.
   - `CodeBlock.tsx` — Shiki-highlighted, mono, copy button, filename header. Lazy-loaded.
   - `Callout.tsx` — Note / Warning / Incident / Decision variants, hairline only, no color fills.
2. **New routes** (all use `SectionShell` + Breadcrumbs + RelatedRail + PrevNext):
   - `/incidents` + `/incidents/$id` — timeline, severity, MTTA/MTTR, five-whys, action items, linked ADRs.
   - `/benchmarks` + `/benchmarks/$slug` — methodology, historical chart (SVG hairline), raw runs table.
   - `/api` + `/api/$slug` — endpoint reference with request/response examples.
   - `/runbooks/$slug` — step list, escalation, on-call, linked incidents.
   - `/engineering/$section` — split each handbook section into its own page with rationale, examples, enforcement, revision history, downloadable snippet.
   - `/architecture/diagrams/$slug` — interactive diagram viewer (Batch C).
3. **Systems detail** (`systems.$slug.tsx`) — expand with SLOs, dependencies (with hover-highlight in mini-graph), on-call, deployment topology summary, related ADRs/incidents/benchmarks/runbooks.
4. **Journal detail** — TOC, reading progress, code blocks, callouts, references, backlinks, prev/next by date.
5. **ADR detail** — add revision history, reviewers, backlinks, and PrevNext across ADR list.

Verifiable output: every card on every index page is an `<a>` / `<Link>`; every detail page renders Breadcrumbs + RelatedRail + PrevNext.

---

### Batch C — Architecture interactivity

1. **`react-flow` install** (`bun add reactflow`). Load the viewer lazily.
2. **`/architecture/diagrams/$slug`** — pan, zoom, minimap, node click → highlights dependencies (fade non-neighbors to 30% opacity), sidebar shows component detail (owner, SLO, links).
3. **Component explorer** at `/architecture/components` — searchable table of every node across all diagrams with kind, owner, systems, and cross-links.
4. **Sequence diagrams** — render 4 canonical flows (auth handshake, inference streaming, deploy pipeline, incident escalation) as hairline SVG lifelines. No lib; pure SVG.
5. **Schema diagrams** — 3 schema graphs (auth, telemetry, orbit index) as hairline ER SVGs.
6. **`/architecture/topology`** — deployment topology: regions × cells × systems, hairline grid, hover reveals P95 and traffic share.

---

### Batch D — Global search + command palette + polish

1. **Global search index** built from `GRAPH` — `src/lib/search-index.ts` uses a lightweight FlexSearch-style token match (no dependency; ~200 lines) across title, tags, summary, kind. Zero client JS on first paint; loaded on `⌘K`.
2. **Command palette upgrade** — replace hardcoded groups with `GRAPH`-driven results grouped by kind, with mono kind-tag on the right. Recent + Suggested sections. Kbar-style navigation with ↑↓ + enter.
3. **`/search` route** — full-page results view for the same index; deep-linkable `?q=`.
4. **Skeletons** — add `Skeleton` variants for detail pages (title, meta strip, body) shown during lazy diagram/code-block hydration.
5. **Homepage** — add "Recent Incidents" and "Latest Benchmarks" strips using the new data; keep hero and existing sections untouched.
6. **Nav** — add `Incidents`, `Benchmarks`, `API` to primary nav; reorder so Meta stays trailing. Update `nav.ts` only.
7. **404 + not-found** on all `$slug` routes route to a shared `RecordNotFound` component with breadcrumbs + suggestions.

---

### Non-goals for Phase 7

- No new visual identity work.
- No auth or Cloud persistence — content is compiled seed data.
- No real telemetry; benchmark charts are static SVG from `benchmarks-data.ts`.
- No CMS.

---

### Technical notes

- **Only new dependency:** `reactflow` for Batch C. Shiki is optional; if lazy-loading it adds >30KB to detail chunk, fall back to a hand-rolled tokenizer for TS/JSON/Bash. Decide inside Batch B.
- **Route splitting:** every detail page is code-split by default via TanStack's automatic splitting.
- **SSR-safe:** react-flow and Shiki loaded via `React.lazy` + `Suspense` fallback = `Skeleton`.
- **Type safety:** `EntityRef = { kind: EntityKind; id: string }` — refs resolved at render, not stored as raw hrefs.
- **Perf budget:** homepage stays 0 KB extra JS on first paint. Detail pages ≤ 40 KB gz after lazy chunks.

---

### Delivery order

I will ship **Batch A first** (graph + new seed data, no UI changes yet) so subsequent batches have a stable spine. Then B, C, D in sequence. Each batch ends with a Playwright smoke run against dev.

Approve to start Batch A, or tell me to reshape scope (e.g. drop Runbooks, drop react-flow, or fold Incidents into Journal).
