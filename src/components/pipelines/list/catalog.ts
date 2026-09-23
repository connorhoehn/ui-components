// The pipelines directory's vocabulary — what a pipeline is FOR (its work
// type, the group it sits under), what it PRODUCES (its kind, the row's mark)
// and what its last runs said (the rollup, the row's pill).
//
// These are plain strings and records on purpose: the platform stores them on
// the definition, `realtime-modules` carries the same names to the host, and
// this library only needs to agree on the spelling. No fetching, no hooks —
// `PipelinesListView` takes entries in this shape and draws them.
//
// `toGroupedRows` and `statusPillFor` are exported so the host's tests and the
// library's stories build the same rows from the same entries.

import type { FileKind } from '../../shared/FileKindMark';
import type { StatusPillTone } from '../../shared/StatusPill';

export type WorkType = 'documents' | 'agents' | 'conversations' | 'other';

export const WORK_TYPE_LABEL: Record<WorkType, string> = {
  documents: 'Documents & presentations',
  agents: 'Agents & experiments',
  conversations: 'Conversations & media',
  other: 'Other',
};

export const WORK_TYPE_ORDER: WorkType[] = ['documents', 'agents', 'conversations', 'other'];

export type PipelineKind =
  | 'document'
  | 'presentation'
  | 'diagram'
  | 'agent'
  | 'experiment'
  | 'recording'
  | 'call'
  | 'conversation'
  | 'media'
  | 'workflow';

export const KIND_MARK: Record<PipelineKind, FileKind> = {
  document: 'page',
  presentation: 'presentation',
  diagram: 'diagram',
  agent: 'agent',
  experiment: 'experiment',
  recording: 'recording',
  call: 'call',
  conversation: 'conversation',
  media: 'media',
  workflow: 'workflow',
};

export const KIND_WORK_TYPE: Record<PipelineKind, WorkType> = {
  document: 'documents',
  presentation: 'documents',
  diagram: 'documents',
  agent: 'agents',
  experiment: 'agents',
  recording: 'conversations',
  call: 'conversations',
  conversation: 'conversations',
  media: 'conversations',
  workflow: 'other',
};

export const KIND_LABEL: Record<PipelineKind, string> = {
  document: 'Document',
  presentation: 'Presentation',
  diagram: 'Diagram',
  agent: 'Agent',
  experiment: 'Experiment',
  recording: 'Recording',
  call: 'Call',
  conversation: 'Conversation',
  media: 'Media',
  workflow: 'Workflow',
};

export const KIND_ORDER: PipelineKind[] = [
  'document',
  'presentation',
  'diagram',
  'agent',
  'experiment',
  'recording',
  'call',
  'conversation',
  'media',
  'workflow',
];

export type PipelineDefinitionStatus = 'draft' | 'published' | 'archived';

export const STATUS_LABEL: Record<PipelineDefinitionStatus, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

export const STATUS_ORDER: PipelineDefinitionStatus[] = ['published', 'draft', 'archived'];

/** A run's terminal or in-flight state, as the platform's run list names them. */
export type PipelineRunItemStatus =
  | 'running'
  | 'awaiting_approval'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'interrupted'
  | 'rejected'
  | 'stuck';

/** The last-run read model: one row per pipeline, kept fresh by run events. */
export interface PipelineRunRollup {
  pipelineId: string;
  lastRunId: string;
  /** `startedAt` of the newest run. Empty string on the "no runs yet" sentinel. */
  lastRunAt: string;
  lastRunStatus: PipelineRunItemStatus;
  /** Newest first, at most five. */
  recent: Array<{ runId: string; status: PipelineRunItemStatus; startedAt: string; completedAt?: string }>;
  /** `recent` rows that failed, were interrupted or stuck. */
  failedOfRecent: number;
  /** `recent` rows still running or awaiting approval. */
  runningCount: number;
  updatedAt: string;
}

/** One pipeline as the directory lists it. */
export interface PipelinesListEntry {
  id: string;
  name: string;
  description?: string;
  /** Short step labels in order: `['/doc', 'Read', 'Plan', 'Approval', 'Suggestions']`. */
  route?: string[];
  kind?: PipelineKind;
  workType?: WorkType;
  status: PipelineDefinitionStatus;
  /** A system pipeline the reader cannot edit. */
  readOnly?: boolean;
  rollup?: PipelineRunRollup | null;
  updatedAt?: string;
  tags?: string[];
}

export type PipelinesGroupBy = 'worktype' | 'status' | 'kind' | 'none';

export const GROUP_BY_LABEL: Record<PipelinesGroupBy, string> = {
  worktype: 'Work type',
  status: 'Status',
  kind: 'Kind',
  none: 'None',
};

export const GROUP_BY_ORDER: PipelinesGroupBy[] = ['worktype', 'status', 'kind', 'none'];

/** The id of the one group `groupBy: 'none'` produces. */
export const ALL_GROUP_ID = 'all';

// ---------------------------------------------------------------------------
// Derivation
// ---------------------------------------------------------------------------

export function entryKind(entry: Pick<PipelinesListEntry, 'kind'>): PipelineKind {
  return entry.kind && entry.kind in KIND_MARK ? entry.kind : 'workflow';
}

export function entryWorkType(entry: Pick<PipelinesListEntry, 'kind' | 'workType'>): WorkType {
  if (entry.workType && entry.workType in WORK_TYPE_LABEL) return entry.workType;
  return KIND_WORK_TYPE[entryKind(entry)];
}

/** The route as one line: "/doc → Read → Plan → Approval → Suggestions". */
export function routeLine(route: string[] | undefined): string | undefined {
  if (!route || route.length === 0) return undefined;
  return route.join(' → ');
}

/** "just now", "29m ago", "10h ago", "3d ago", else a short date. */
export function relativeAgo(iso: string | undefined, now: number = Date.now()): string | undefined {
  if (!iso) return undefined;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return undefined;
  const d = Math.max(0, now - t);
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  if (d < 7 * 86_400_000) return `${Math.floor(d / 86_400_000)}d ago`;
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(t));
}

/** What `statusPillFor` returns — spread it straight into a `StatusPill`. */
export interface PillSpec {
  tone: StatusPillTone;
  label: string;
  meta?: string;
}

const FAILED_LIKE = new Set<PipelineRunItemStatus>(['failed', 'interrupted', 'stuck']);
const LIVE = new Set<PipelineRunItemStatus>(['running', 'awaiting_approval']);

/**
 * What the row's pill says, from the rollup first and the definition status
 * otherwise:
 * - last run failed → danger "Failed · 10h ago"
 * - some of the recent runs failed → warning "1 of 5 failed · 29m ago"
 * - a run is live → info "Running" / "Awaiting approval"
 * - else the definition status: "Published" (success), "Draft" (neutral),
 *   "Archived" (neutral).
 */
export function statusPillFor(entry: PipelinesListEntry, now: number = Date.now()): PillSpec {
  const rollup = entry.rollup;
  if (rollup && rollup.lastRunId) {
    const ago = relativeAgo(rollup.lastRunAt, now);
    if (LIVE.has(rollup.lastRunStatus)) {
      return { tone: 'info', label: rollup.lastRunStatus === 'running' ? 'Running' : 'Awaiting approval', meta: ago };
    }
    if (FAILED_LIKE.has(rollup.lastRunStatus)) {
      return { tone: 'danger', label: rollup.lastRunStatus === 'failed' ? 'Failed' : rollup.lastRunStatus === 'stuck' ? 'Stuck' : 'Interrupted', meta: ago };
    }
    if (rollup.failedOfRecent > 0 && rollup.recent.length > 0) {
      return { tone: 'warning', label: `${rollup.failedOfRecent} of ${rollup.recent.length} failed`, meta: ago };
    }
  }
  return {
    tone: entry.status === 'published' ? 'success' : 'neutral',
    label: STATUS_LABEL[entry.status] ?? entry.status,
  };
}

export interface GroupedEntries {
  groups: Array<{ id: string; title: string; count: number }>;
  /** Group id per entry id. */
  groupOf: Map<string, string>;
}

/**
 * Buckets entries by the chosen axis, in the vocabulary's order, dropping
 * groups with nothing in them. `none` yields the single `all` group.
 */
export function groupEntries(entries: PipelinesListEntry[], groupBy: PipelinesGroupBy): GroupedEntries {
  const groupOf = new Map<string, string>();
  const counts = new Map<string, number>();
  const bump = (id: string, entryId: string) => {
    groupOf.set(entryId, id);
    counts.set(id, (counts.get(id) ?? 0) + 1);
  };
  entries.forEach((e) => {
    switch (groupBy) {
      case 'worktype':
        bump(entryWorkType(e), e.id);
        break;
      case 'status':
        bump(e.status, e.id);
        break;
      case 'kind':
        bump(entryKind(e), e.id);
        break;
      default:
        bump(ALL_GROUP_ID, e.id);
    }
  });
  const order: Array<{ id: string; title: string }> =
    groupBy === 'worktype'
      ? WORK_TYPE_ORDER.map((id) => ({ id, title: WORK_TYPE_LABEL[id] }))
      : groupBy === 'status'
        ? STATUS_ORDER.map((id) => ({ id, title: STATUS_LABEL[id] }))
        : groupBy === 'kind'
          ? KIND_ORDER.map((id) => ({ id, title: KIND_LABEL[id] }))
          : [{ id: ALL_GROUP_ID, title: 'All pipelines' }];
  const groups = order
    .filter((g) => (counts.get(g.id) ?? 0) > 0)
    .map((g) => ({ ...g, count: counts.get(g.id) ?? 0 }));
  return { groups, groupOf };
}

/** Case-insensitive match on name, description, route and tags. */
export function matchesQuery(entry: PipelinesListEntry, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = [entry.name, entry.description ?? '', routeLine(entry.route) ?? '', ...(entry.tags ?? [])]
    .join(' ')
    .toLowerCase();
  return hay.includes(q);
}
