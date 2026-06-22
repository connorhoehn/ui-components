import { VisionResult } from './types';
export type VisionStepStatus = 'running' | 'completed' | 'failed';
export interface VisionStepRecord {
    runId: string;
    stepId: string;
    status: VisionStepStatus;
    result?: VisionResult;
    error?: string;
    /** Wall-clock ms since the step's `started` event. */
    elapsedMs?: number;
    /** Endpoint id reported by the started event (e.g. 'ec2-vision-qwen'). */
    endpointId?: string;
    startedAt?: number;
    completedAt?: number;
}
/**
 * Wire-event payload contract for the vision-step events the platform-api
 * `image:vision-analyze` handler emits. Mirrors the `event-catalog`
 * declarations (see platform-api/src/types/image-pipeline.ts).
 *
 * We use a permissive shape so this hook stays useful even if the catalog
 * adds optional fields. The hook only requires `runId`, `stepId`, and on
 * completed events, the `result` payload.
 */
export interface PipelineImageVisionStartedPayload {
    runId: string;
    stepId: string;
    endpointId?: string;
    at?: number;
}
export interface PipelineImageVisionCompletedPayload {
    runId: string;
    stepId: string;
    result: VisionResult;
    at?: number;
}
export interface PipelineImageVisionFailedPayload {
    runId: string;
    stepId: string;
    error: string;
    at?: number;
}
export interface UseVisionResultsOptions {
    /** Limit accumulated records to the most recent N. Default: 50. */
    maxRecords?: number;
    /** When set, only records for this runId are kept. */
    runId?: string;
}
/**
 * Hook that subscribes to the pipeline event stream (the same stream the
 * existing runs page consumes) and folds `pipeline.image.vision.*` events
 * into a per-step record map. Stable record identity per (runId, stepId)
 * — completion mutates the existing record rather than creating a new one,
 * so a downstream `<VisionRunCard>` smoothly transitions running → completed
 * without unmounting.
 *
 * Pure observer: never publishes, never owns state outside React. Designed
 * to be embedded in the existing PipelinesPage / PipelineRunsPanel without
 * disturbing their context tree.
 */
export declare function useVisionResults(opts?: UseVisionResultsOptions): VisionStepRecord[];
export default useVisionResults;
//# sourceMappingURL=useVisionResults.d.ts.map