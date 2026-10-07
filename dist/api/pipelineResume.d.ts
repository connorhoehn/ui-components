export interface ResumeFromStepResponse {
    runId: string;
    fromNodeId: string;
    /** The stepId that originally failed, when surfaceable. */
    originalFailedStepId?: string;
    /** Monotonic count of `resumeFromStep` invocations on this run. */
    replayAttempts: number;
    at: string;
}
export interface ResumeFromStepOptions {
    /** When true, allow resuming a `succeeded`/`done` run for diagnostic re-execution. */
    allowCompleted?: boolean;
    /** Optional list of node ids to break on during the resumed dispatch loop. */
    breakpoints?: string[];
}
export declare function resumeFromStep(pipelineId: string, runId: string, fromNodeId: string, options?: ResumeFromStepOptions): Promise<ResumeFromStepResponse>;
//# sourceMappingURL=pipelineResume.d.ts.map