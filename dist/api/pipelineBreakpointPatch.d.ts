export interface ContextPatchMerge {
    mode: 'merge';
    values: Record<string, unknown>;
}
export interface ContextPatchJsonPatch {
    mode: 'jsonPatch';
    ops: Array<{
        op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';
        path: string;
        value?: unknown;
        from?: string;
    }>;
}
export type ContextPatch = ContextPatchMerge | ContextPatchJsonPatch;
export interface PatchResult {
    patchId: string;
    before: Record<string, unknown>;
    after: Record<string, unknown>;
    validation: {
        ok: true;
    } | {
        ok: false;
        reason: string;
    };
}
/**
 * Thrown when the executor's `ContextValidator` rejected a paused-context
 * patch. The patch was NOT applied; the UI should keep the dirty buffer
 * intact and show `reason` to the user.
 */
export declare class PatchValidationRejectedError extends Error {
    readonly reason: string;
    readonly result?: PatchResult;
    constructor(reason: string, result?: PatchResult);
}
/**
 * Thrown for non-2xx/422 transport errors (404, 409, 500, 503, ...).
 * `status` is the HTTP status; `body` is the parsed JSON body when present.
 */
export declare class PatchHttpError extends Error {
    readonly status: number;
    readonly body?: unknown;
    constructor(status: number, message: string, body?: unknown);
}
/**
 * Apply a paused-context patch. Resolves the executor's `PatchResult` on a
 * 200. Throws `PatchValidationRejectedError` on a 422 (carrying the executor
 * rejection reason). Throws `PatchHttpError` on any other non-2xx.
 */
export declare function applyPatch(pipelineId: string, runId: string, stepId: string, patch: ContextPatch, appliedBy?: string): Promise<PatchResult>;
/**
 * Revert a previously-applied paused-context patch. Throws `PatchHttpError`
 * for non-204 (typically 409 once the run has resumed past the breakpoint).
 */
export declare function revertPatch(pipelineId: string, runId: string, stepId: string, patchId: string): Promise<void>;
//# sourceMappingURL=pipelineBreakpointPatch.d.ts.map