import { VisionResult } from './types';
export type VisionRunStatus = 'running' | 'completed' | 'failed';
export interface VisionRunCardProps {
    status: VisionRunStatus;
    /** Required when status === 'completed'. */
    result?: VisionResult;
    /** Optional run identifier displayed in the header. */
    runId?: string;
    /** Optional model / endpoint name override (falls back to result.model.endpointId). */
    endpointLabel?: string;
    error?: string;
    /** Latency in ms — shown in the header. Derived from result.model if absent. */
    latencyMs?: number;
    /** Click handler to expand into the full VisionResultViewer. */
    onOpen?: () => void;
    className?: string;
}
/**
 * Compact summary card for the activity stream. Shows endpoint + status +
 * a caption snippet + 3-4 top tags. Click to expand into the full
 * VisionResultViewer.
 */
export declare function VisionRunCard({ status, result, runId, endpointLabel, error, latencyMs, onOpen, className, }: VisionRunCardProps): import("react").JSX.Element;
export default VisionRunCard;
//# sourceMappingURL=VisionRunCard.d.ts.map