/**
 * Engineering Handbook — long-form, opinionated, written to be
 * re-read. Each section is a real document, not a stub.
 */

export type HandbookSection = {
  slug: string;
  index: string; // "01"
  title: string;
  owner: string;
  updated: string;
  revision: string; // "r.14"
  status: "Canonical" | "Working draft" | "Under review";
  summary: string;
  body: HandbookBlock[];
};

export type HandbookBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "kv"; rows: { k: string; v: string }[] }
  | { kind: "quote"; text: string; source?: string };

export const HANDBOOK: HandbookSection[] = [
  {
    slug: "development-workflow",
    index: "01",
    title: "Development workflow",
    owner: "Platform",
    updated: "2026-06-14",
    revision: "r.31",
    status: "Canonical",
    summary:
      "Trunk-based development on a single monorepo. Short-lived branches; every merge is a candidate release.",
    body: [
      {
        kind: "p",
        text: "All work happens on branches cut from `main`. Branches live for hours, not days. If a change grows beyond ~400 lines of diff, split it — first mechanically, then semantically.",
      },
      {
        kind: "list",
        items: [
          "Branch names encode intent: `fix/…`, `feat/…`, `chore/…`, `perf/…`. Naming is enforced by the pre-push hook.",
          "Commits are imperative, single-purpose, and reference an ADR or issue when the change is architectural.",
          "Force-push is allowed on personal branches, forbidden after review has started.",
        ],
      },
      {
        kind: "p",
        text: "Every merge to `main` produces an artifact suitable for canary. There is no separate `develop` branch.",
      },
      {
        kind: "kv",
        rows: [
          { k: "Branch protection", v: "1 required review · CI green · linear history" },
          { k: "Max PR size (soft)", v: "400 lines diff" },
          { k: "Time from open to merge (P50)", v: "3h 20m" },
          { k: "Time from open to merge (P90)", v: "1d 6h" },
        ],
      },
    ],
  },
  {
    slug: "code-review-standards",
    index: "02",
    title: "Code review standards",
    owner: "Engineering",
    updated: "2026-05-30",
    revision: "r.22",
    status: "Canonical",
    summary:
      "Reviews are engineering conversations, not gates. Reviewers own correctness; authors own intent.",
    body: [
      {
        kind: "list",
        items: [
          "Read the PR description first. If intent is unclear, ask before commenting on code.",
          "Distinguish `must-fix`, `should-fix`, `consider`, and `nit`. Only `must-fix` blocks merge.",
          "For architectural changes, require an ADR link. Reviews are not the place to relitigate design.",
          "Cite standards, not preferences. If a preference matters enough to enforce, promote it to a lint rule.",
        ],
      },
      {
        kind: "quote",
        text: "The review comment you don't leave costs less than the review comment nobody acts on.",
        source: "Handbook · r.14",
      },
    ],
  },
  {
    slug: "release-process",
    index: "03",
    title: "Release process",
    owner: "Release Engineering",
    updated: "2026-06-08",
    revision: "r.19",
    status: "Canonical",
    summary:
      "Continuous delivery with per-system release trains. Canary → 10% → 50% → 100% under automated SLO gating.",
    body: [
      {
        kind: "list",
        items: [
          "Every merge to `main` builds a release candidate and deploys to `dev`.",
          "Promotion to `canary` is automatic once smoke tests and integration checks pass.",
          "Promotion to `10% → 50% → 100%` requires SLO budget to remain positive for the full soak window (30 min).",
          "Rollback is a single command and always available; there is no rollback approval.",
        ],
      },
      {
        kind: "kv",
        rows: [
          { k: "Deploys per week", v: "142" },
          { k: "Change failure rate", v: "1.9%" },
          { k: "Mean time to rollback", v: "3m 12s" },
          { k: "Lead time (commit → prod)", v: "48 min P50" },
        ],
      },
    ],
  },
  {
    slug: "testing-strategy",
    index: "04",
    title: "Testing strategy",
    owner: "Engineering",
    updated: "2026-05-25",
    revision: "r.17",
    status: "Canonical",
    summary:
      "Tests exist to make change safe, not to prove correctness. Prefer few, high-signal tests over many, brittle ones.",
    body: [
      {
        kind: "list",
        items: [
          "Unit tests: fast (<50ms), no I/O, run on every save.",
          "Integration tests: real dependencies where cheap, fakes where not. Run on every push.",
          "System tests: full stack, per-system, run on every merge to `main`.",
          "Simulation tests: for consensus, backpressure, and failure modes. Run nightly.",
        ],
      },
      {
        kind: "p",
        text: "Coverage is not a target. Coverage below 60% on a critical path is a signal; coverage above 90% is a smell.",
      },
    ],
  },
  {
    slug: "engineering-challenges",
    index: "05",
    title: "Engineering challenges",
    owner: "Maintainer",
    updated: "2026-06-12",
    revision: "r.03",
    status: "Canonical",
    summary:
      "The lab is pre-production. There are no live incidents to run — but every open engineering challenge is tracked, scoped, and owned.",
    body: [
      {
        kind: "p",
        text: "This handbook does not claim an incident-response rotation. Instead, unresolved problems on canonical systems are treated as first-class engineering challenges: named, dated, and linked to the design record they affect.",
      },
      {
        kind: "list",
        items: [
          "One owner per challenge. If nobody owns it, it is not a challenge — it is a wish.",
          "A challenge document names the affected system, the assumption that broke, and the smallest experiment that would resolve it.",
          "Resolution ships as an ADR, a validation record, or a development log entry — never as a silent commit.",
          "When a canonical system reaches production, this section becomes an incident-response contract; not before.",
        ],
      },
    ],
  },

  {
    slug: "release-checklist",
    index: "06",
    title: "Release checklist (draft)",
    owner: "Maintainer",
    updated: "2026-04-18",
    revision: "r.02",
    status: "Working draft",
    summary:
      "The contract a canonical system must satisfy before its first tagged release. Written now so it applies uniformly when the first system ships.",
    body: [
      {
        kind: "list",
        items: [
          "All declared tool contracts are covered by contract tests.",
          "Held-out evaluation set has been re-run on the release candidate; results are logged.",
          "Feature flags exist for anything not covered by the eval set.",
          "Rollback path is documented and rehearsed locally.",
          "The relevant ADRs are marked Accepted, not Proposed.",
          "The release is announced as a Development Log entry linking every artifact.",
        ],
      },
    ],
  },

  {
    slug: "performance-budget",
    index: "07",
    title: "Performance budgets",
    owner: "Performance",
    updated: "2026-06-02",
    revision: "r.09",
    status: "Canonical",
    summary:
      "Every user-facing surface has a budget. Regressions are treated as bugs, not deferred as tech debt.",
    body: [
      {
        kind: "kv",
        rows: [
          { k: "VESTRA · plan-step P95 (target)", v: "≤ 800ms" },
          { k: "MarketPulse · classify P95 (target)", v: "≤ 600ms" },
          { k: "QuantEdge · backtest step (target)", v: "≤ 250ms" },
          { k: "CloudCostIQ · forecast render (target)", v: "≤ 400ms" },
          { k: "vaerox.dev · LCP", v: "≤ 1.2s" },
          { k: "vaerox.dev · JS on first paint", v: "0 KB" },
        ],
      },
      {
        kind: "p",
        text: "Budgets are declared before implementation. A breach is logged as an open engineering challenge on the owning system with a written justification or a plan to close it.",
      },
    ],
  },
  {
    slug: "security-checklist",
    index: "08",
    title: "Security checklist",
    owner: "Security",
    updated: "2026-06-19",
    revision: "r.14",
    status: "Canonical",
    summary:
      "Security review is required for changes to authn/z, data flow, or public interfaces. The checklist is the contract.",
    body: [
      {
        kind: "list",
        items: [
          "All secrets loaded from the sealed secret store; never from env in prod.",
          "New public endpoints have rate limits and abuse dashboards from day one.",
          "Cross-tenant reads must go through the isolation gateway.",
          "Dependencies pinned by hash; SBOM published per release.",
          "Cryptographic primitives from the vetted internal library only.",
        ],
      },
    ],
  },
  {
    slug: "documentation-standards",
    index: "09",
    title: "Documentation standards",
    owner: "Engineering",
    updated: "2026-05-11",
    revision: "r.08",
    status: "Canonical",
    summary:
      "Documentation is a first-class artifact. If it isn't in the handbook or an ADR, it doesn't exist.",
    body: [
      {
        kind: "list",
        items: [
          "Every system has a README with owners, SLOs, runbook links, and an architecture diagram.",
          "Every ADR includes context, decision, consequences, and rejected alternatives.",
          "Prose is written for a re-reader six months from now, not for the author today.",
          "Screenshots age poorly; prefer text and diagrams under version control.",
        ],
      },
      {
        kind: "quote",
        text: "Documentation is the interface between the version of you that shipped this and the version of you that has to change it.",
        source: "Handbook · r.03",
      },
    ],
  },
];
