// frontend/src/components/pipelines/persistence/runHistory.ts
//
// localStorage-backed persistence for terminal pipeline runs (Phase 1
// simplification — Phase 3+ replaces this with the distributed-core WAL, see
// PIPELINES_PLAN.md §13.4 / §14.4).
//
// Storage layout:
//   ws_pipeline_runs_v1:{pipelineId}  — PipelineRun[] sorted by startedAt desc,
//                                        capped at MAX_RUNS_PER_PIPELINE
//
// Writes are silent-failure (QuotaExceeded, JSON errors); reads return [] on
// any corruption so callers don't have to defend themselves.
//
// Only runs in a terminal state should be appended — active runs live in
// memory on `PipelineRunsContext`.

import type { PipelineRun } from '../../../types/pipeline';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const KEY_PREFIX = 'ws_pipeline_runs_v1:';
const MAX_RUNS_PER_PIPELINE = 50;

function keyFor(pipelineId: string): string {
  return `${KEY_PREFIX}${pipelineId}`;
}

// ---------------------------------------------------------------------------
// Silent-failure write helper
// ---------------------------------------------------------------------------

let quotaWarned = false;

function safeWrite(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    if (!quotaWarned) {
      quotaWarned = true;
      // eslint-disable-next-line no-console
      console.warn('[runHistory] localStorage write failed', err);
    }
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Bring one stored entry up to the shape the run pages assume.
 *
 * The module header promises callers don't have to defend themselves, but that
 * only ever covered a corrupt *blob* — a JSON-parseable array of malformed
 * ENTRIES went straight through the `as PipelineRun[]` cast below. Two fields
 * are load-bearing and were routinely absent, because this store is written by
 * whatever build the user last ran and read by this one:
 *
 *  - `steps` — `PipelineRunsPage`, `AllRunsPage`, `PipelineRunDiff`,
 *    `PipelineRunComparePage` and `useRunCost` all call `Object.values(r.steps)`
 *    or `Object.keys(r.steps)` inside a render memo. `Object.values(undefined)`
 *    is a TypeError, so ONE such stored run blanked the whole runs page —
 *    filter bar, header and the 49 good runs included.
 *  - `startedAt` — every list sorts on `a.startedAt.localeCompare(b.startedAt)`.
 *    Same blast radius, from the sort comparator instead of the memo. (This is
 *    the bug `PipelinesPage.toRow` already fixed for pipeline *definitions*.)
 *
 * A run that is not an object at all is dropped — there is nothing to show —
 * but a run merely missing fields is kept and rendered with what it has.
 */
export function normalizeRun(raw: unknown): PipelineRun | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const r = raw as Partial<PipelineRun>;
  if (typeof r.id !== 'string') return null;
  return {
    ...(r as PipelineRun),
    steps: typeof r.steps === 'object' && r.steps !== null ? r.steps : {},
    startedAt: typeof r.startedAt === 'string' ? r.startedAt : '',
  };
}

/**
 * Return all persisted runs for a pipeline, newest first. Corrupt or missing
 * entries yield an empty array.
 */
export function listRuns(pipelineId: string): PipelineRun[] {
  try {
    const raw = localStorage.getItem(keyFor(pipelineId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeRun)
      .filter((r): r is PipelineRun => r !== null);
  } catch {
    return [];
  }
}

/**
 * Look up a specific run by id. Linear scan (capped at MAX_RUNS_PER_PIPELINE
 * so this is cheap).
 */
export function getRun(pipelineId: string, runId: string): PipelineRun | null {
  const runs = listRuns(pipelineId);
  return runs.find((r) => r.id === runId) ?? null;
}

/**
 * Insert/replace a run by id, then trim to the newest MAX_RUNS_PER_PIPELINE
 * entries. Safe to call repeatedly for the same runId — later writes win.
 */
export function appendRun(pipelineId: string, run: PipelineRun): void {
  const safe = normalizeRun(run);
  if (!safe) return;
  const existing = listRuns(pipelineId).filter((r) => r.id !== safe.id);
  const next = [safe, ...existing]
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
    .slice(0, MAX_RUNS_PER_PIPELINE);
  safeWrite(keyFor(pipelineId), JSON.stringify(next));
}

/**
 * Wipe every persisted run for a pipeline. Used by the editor's Delete
 * action and tests.
 */
export function clearRuns(pipelineId: string): void {
  try {
    localStorage.removeItem(keyFor(pipelineId));
  } catch {
    // ignore
  }
}
