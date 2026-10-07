import type { ComputeClient } from '../lib/computeClient';
import type { ComputeRunResult } from '../types';
import { type TaskStep } from './useComputeTask';
export interface UseComputeTailOptions {
    client: ComputeClient;
    /** Registry id of the box to tail. Null closes any open stream. */
    boxId: string | null;
    /** Retained steps. Older ones drop — this is a live view, not a log store. */
    maxSteps?: number;
    enabled?: boolean;
}
export interface UseComputeTailResult {
    steps: TaskStep[];
    /** True once the stream is open. */
    connected: boolean;
    /** A run is in flight on the box, as far as the stream has said. */
    running: boolean;
    result: ComputeRunResult | null;
    error: string | null;
}
export declare function useComputeTail({ client, boxId, maxSteps, enabled, }: UseComputeTailOptions): UseComputeTailResult;
//# sourceMappingURL=useComputeTail.d.ts.map