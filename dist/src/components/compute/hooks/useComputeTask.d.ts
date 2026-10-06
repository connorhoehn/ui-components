import type { ComputeClient, StreamEvent } from '../lib/computeClient';
import type { ComputeRunResult } from '../types';
export type TaskStepKind = 'text' | 'tool' | 'result' | 'error' | 'meta' | 'job' | 'job_end';
export interface TaskStep {
    kind: TaskStepKind;
    text: string;
    /** Tool name, for `kind: 'tool'`. */
    tool?: string;
    /** `job` only: the dispatcher's job kind (e.g. `devbox:task`) — the banner's subtitle. */
    jobKind?: string;
    /** `job_end` only: whether the job closed clean. Drives the closing tone. */
    jobOk?: boolean;
    /** `result` only: the structured tally, so the view renders cost chips instead of re-parsing `text`. */
    result?: ComputeRunResult;
    at: number;
}
/**
 * One-line summary of a tool call.
 *
 * Tool inputs are unbounded — a `Write` carries an entire file — so a raw
 * dump of the arguments makes the stream unreadable exactly when it is
 * moving fastest. The interesting field is almost always the target.
 */
export declare function summarizeTool(name: string, input: Record<string, unknown>): string;
export interface UseComputeTaskOptions {
    client: ComputeClient;
    /** Cap on retained steps. Older ones are dropped — this is a live view. */
    maxSteps?: number;
    /** Raw frames, for hosts that render their own timeline. */
    onEvent?: (event: StreamEvent) => void;
}
export interface UseComputeTaskResult {
    steps: TaskStep[];
    isRunning: boolean;
    /** Tool calls made so far in the run in flight. */
    toolCount: number;
    result: ComputeRunResult | null;
    error: string | null;
    run: (sessionId: string, input: {
        prompt: string;
        resume: boolean;
        model?: string;
    }) => Promise<void>;
    cancel: () => void;
    clear: () => void;
    push: (step: Omit<TaskStep, 'at'>) => void;
}
export declare function useComputeTask({ client, maxSteps, onEvent, }: UseComputeTaskOptions): UseComputeTaskResult;
//# sourceMappingURL=useComputeTask.d.ts.map