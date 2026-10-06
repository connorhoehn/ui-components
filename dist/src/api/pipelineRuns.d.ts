import type { PipelineRun } from '../types/pipeline';
export interface ListRunsResponse {
    runs: PipelineRun[];
    nextCursor?: string;
}
/**
 * Fetch pipeline run history from the backend API.
 *
 * **Rejects** when the endpoint is unavailable or answers non-2xx. It used to
 * swallow the failure and resolve `{ runs: [] }`, which is indistinguishable
 * from "this pipeline has never run": `PipelineRunsPanel` rendered
 * "No runs yet. Trigger this pipeline to see history here." with its error
 * banner unreachable, and `PipelineRunsContext`'s localStorage fallback —
 * written in its `.catch` — could never run because nothing ever rejected.
 * Every caller already has a `catch`/`.catch` that does the right thing.
 */
export declare function listPipelineRuns(pipelineId: string, options?: {
    limit?: number;
    cursor?: string;
}): Promise<ListRunsResponse>;
/**
 * Fetch a single pipeline run by runId from the dedicated v2 endpoint.
 * The v2 handler does live-then-stored fallback so historical runs (no
 * longer in the runtime's in-memory state) resolve correctly.
 *
 * **Resolves `null` for a genuine 404 only. Rejects for everything else** —
 * transport failure, 5xx, 401, malformed JSON. It used to spell both the
 * same way, so an unreachable API was indistinguishable from a run that had
 * really been garbage-collected: `PipelineRunReplayPage` told the user
 * "Run not available — it may have been trimmed from history." with no
 * retry, and `PendingApprovalsPage` claimed the upstream steps "haven't
 * produced reviewable output yet" while the approver decided blind.
 * Same class as `listPipelineRuns` above (fixed in v2.92.0).
 *
 * Wire shape comes from `PipelineRunDetailResponse` in
 * ../types/pipeline-contracts.ts — kept in lockstep with
 * platform-api/src/pipeline/http/contracts.ts.
 */
export declare function getPipelineRun(pipelineId: string, runId: string): Promise<PipelineRun | null>;
//# sourceMappingURL=pipelineRuns.d.ts.map