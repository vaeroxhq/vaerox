/**
 * Incidents — intentionally empty.
 *
 * VÆRØX systems are pre-production (Building / Prototype / Research).
 * Because no infrastructure is genuinely live, there are no genuine
 * incidents to publish. Engineering challenges are documented on the
 * per-system pages and in Development Logs under Future Systems.
 *
 * The types are preserved so that consumers (graph, evidence blocks,
 * timeline, people) compile without change; the array is empty.
 */

export type Severity = "SEV-1" | "SEV-2" | "SEV-3";
export type IncidentStatus = "Resolved" | "Monitoring" | "Investigating" | "Root cause identified";

export type TimelineEntry = { at: string; note: string };
export type ActionItem = { id: string; owner: string; due: string; done: boolean; title: string };

export type Incident = {
  id: string;
  slug: string;
  title: string;
  severity: Severity;
  status: IncidentStatus;
  openedAt: string;
  resolvedAt: string;
  mtta: string;
  mttr: string;
  commander: string;
  systemsAffected: string[];
  customerImpact: string;
  summary: string;
  detection: string;
  rootCause: string;
  contributingFactors: string[];
  timeline: TimelineEntry[];
  fiveWhys: string[];
  actionItems: ActionItem[];
  relatedAdrs: string[];
  relatedJournal: string[];
  relatedBenchmarks: string[];
};

export const INCIDENTS: Incident[] = [];
