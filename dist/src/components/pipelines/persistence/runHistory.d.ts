import type { PipelineRun } from '../../../types/pipeline';
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
export declare function normalizeRun(raw: unknown): PipelineRun | null;
/**
 * Return all persisted runs for a pipeline, newest first. Corrupt or missing
 * entries yield an empty array.
 */
export declare function listRuns(pipelineId: string): PipelineRun[];
/**
 * Look up a specific run by id. Linear scan (capped at MAX_RUNS_PER_PIPELINE
 * so this is cheap).
 */
export declare function getRun(pipelineId: string, runId: string): PipelineRun | null;
/**
 * Insert/replace a run by id, then trim to the newest MAX_RUNS_PER_PIPELINE
 * entries. Safe to call repeatedly for the same runId — later writes win.
 */
export declare function appendRun(pipelineId: string, run: PipelineRun): void;
/**
 * Wipe every persisted run for a pipeline. Used by the editor's Delete
 * action and tests.
 */
export declare function clearRuns(pipelineId: string): void;
//# sourceMappingURL=runHistory.d.ts.map