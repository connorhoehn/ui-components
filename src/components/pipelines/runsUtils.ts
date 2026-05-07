// Shared types, constants, and pure filter utilities for the Runs views.
// PipelineRunsPage re-exports everything here for test backward-compat.

import type { PipelineRun, RunStatus } from '../../types/pipeline';

// Filter chips intentionally exclude `awaiting_approval` — transitional state.
export type StatusKey = Exclude<RunStatus, 'awaiting_approval'>;
export type TriggerKindKey = 'manual' | 'scheduled' | 'webhook' | 'document';
export type DateRangeKey = '24h' | '7d' | '30d' | 'all';

export const STATUS_KEYS: readonly StatusKey[] = [
  'pending',
  'running',
  'completed',
  'failed',
  'cancelled',
] as const;

export const TRIGGER_KIND_KEYS: readonly TriggerKindKey[] = [
  'manual',
  'scheduled',
  'webhook',
  'document',
] as const;

export const DATE_RANGE_KEYS: readonly DateRangeKey[] = ['24h', '7d', '30d', 'all'] as const;

export const RANGE_MS: Record<Exclude<DateRangeKey, 'all'>, number> = {
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
  '30d': 30 * 24 * 60 * 60 * 1000,
};

/**
 * Map a stored `triggeredBy.triggerType` string onto one of the user-facing
 * UI bins. `document.*` collapses to 'document'; the legacy 'schedule' string
 * surfaces as 'scheduled'. Anything unrecognized falls back to 'manual'.
 */
export function triggerTypeToKind(triggerType: string): TriggerKindKey {
  if (triggerType.startsWith('document.')) return 'document';
  if (triggerType === 'document') return 'document';
  if (triggerType === 'schedule' || triggerType === 'scheduled') return 'scheduled';
  if (triggerType === 'webhook') return 'webhook';
  return 'manual';
}

/**
 * Hub#1287: sum of retries across all steps in a run.
 * One step with `attempts.length === 3` contributes 2 retries.
 */
export function countTotalRetries(run: PipelineRun): number {
  let retries = 0;
  for (const step of Object.values(run.steps ?? {})) {
    const n = step.attempts?.length ?? 0;
    if (n > 1) retries += n - 1;
  }
  return retries;
}

export interface RunFilterCriteria {
  query: string;
  statuses: ReadonlySet<StatusKey>;
  triggerKinds: ReadonlySet<TriggerKindKey>;
  range: DateRangeKey;
  /** ms since epoch. Defaults to Date.now() — exposed for deterministic tests. */
  now?: number;
}

/**
 * Pure filter applied to a list of runs. Empty status/trigger sets mean
 * "match all" (so the unfiltered default doesn't accidentally hide everything).
 */
export function filterRuns(runs: PipelineRun[], c: RunFilterCriteria): PipelineRun[] {
  const now = c.now ?? Date.now();
  const cutoff = c.range === 'all' ? null : now - RANGE_MS[c.range];
  const q = c.query.trim().toLowerCase();
  return runs.filter((r) => {
    if (c.statuses.size > 0 && !c.statuses.has(r.status as StatusKey)) return false;
    if (c.triggerKinds.size > 0) {
      const kind = triggerTypeToKind(r.triggeredBy.triggerType);
      if (!c.triggerKinds.has(kind)) return false;
    }
    if (cutoff != null) {
      const t = new Date(r.startedAt).getTime();
      if (Number.isFinite(t) && t < cutoff) return false;
    }
    if (q.length > 0) {
      const idMatch = r.id.toLowerCase().includes(q);
      const pidMatch = r.pipelineId.toLowerCase().includes(q);
      if (!idMatch && !pidMatch) return false;
    }
    return true;
  });
}

function parseCsvSet<T extends string>(raw: string | null, allowed: readonly T[]): Set<T> {
  if (!raw) return new Set<T>();
  const allowSet = new Set<string>(allowed);
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => allowSet.has(s)) as T[],
  );
}

export function parseFilterParams(params: URLSearchParams): {
  query: string;
  statuses: Set<StatusKey>;
  triggerKinds: Set<TriggerKindKey>;
  range: DateRangeKey;
} {
  const range = (params.get('range') ?? '7d') as DateRangeKey;
  const safeRange: DateRangeKey = (DATE_RANGE_KEYS as readonly string[]).includes(range)
    ? range
    : '7d';
  return {
    query: params.get('q') ?? '',
    statuses: parseCsvSet<StatusKey>(params.get('status'), STATUS_KEYS),
    triggerKinds: parseCsvSet<TriggerKindKey>(params.get('trigger'), TRIGGER_KIND_KEYS),
    range: safeRange,
  };
}
