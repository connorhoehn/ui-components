import { PipelineRun } from '../types/pipeline';
export interface ListRunsResponse {
    runs: PipelineRun[];
    nextCursor?: string;
}
/**
 * Fetch pipeline run history from the backend API.
 * Falls back gracefully when the endpoint is unavailable.
 */
export declare function listPipelineRuns(pipelineId: string, options?: {
    limit?: number;
    cursor?: string;
}): Promise<ListRunsResponse>;
/**
 * Fetch a single pipeline run by runId from the dedicated v2 endpoint.
 * The v2 handler does live-then-stored fallback so historical runs (no
 * longer in the runtime's in-memory state) resolve correctly. Returns
 * null on 404 or transport failure.
 *
 * Wire shape comes from `PipelineRunDetailResponse` in
 * frontend/src/types/pipeline-contracts.ts — kept in lockstep with
 * social-api/src/pipeline/http/contracts.ts.
 */
export declare function getPipelineRun(pipelineId: string, runId: string): Promise<PipelineRun | null>;
//# sourceMappingURL=pipelineRuns.d.ts.map