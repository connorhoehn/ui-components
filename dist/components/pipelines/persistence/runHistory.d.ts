import type { PipelineRun } from '../../../types/pipeline';
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