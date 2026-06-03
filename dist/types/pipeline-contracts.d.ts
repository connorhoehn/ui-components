/**
 * Identity attached to every request handled by the pipeline router. The
 * host (social-api today, distributed-core later) populates this from its
 * own auth middleware and injects a getter into the router factory; the
 * route handlers themselves never speak to Cognito / IAM / etc.
 *
 * `userId` is a stable opaque identifier — no assumption about format.
 * `scopes` is an optional capability list; routes that need fine-grained
 * authorization should check membership rather than guess from `userId`.
 */
export interface AuthContext {
    userId: string;
    scopes?: readonly string[];
}
/**
 * Inline pipeline definition shipped on a trigger request. Optional: when
 * absent, the server resolves the definition from its persistent store.
 *
 * Carrying the full definition is keyed by `id`; everything else is
 * adapter-/version-specific and stays opaque from the contracts layer.
 */
export interface InlinePipelineDefinition {
    id: string;
    [key: string]: unknown;
}
export interface PipelineTriggerRequest {
    /** Optional inline definition. When absent, server reads from store. */
    definition?: InlinePipelineDefinition;
    /** Free-form key/value passed to the trigger node's evaluation context. */
    triggerPayload?: Record<string, unknown>;
    /** Node IDs at which the run should pause for step-by-step debugging. */
    breakpoints?: readonly string[];
}
export interface PipelineTriggerResponse {
    runId: string;
    pipelineId: string;
    triggeredBy: {
        userId: string;
        triggerType: string;
    };
    /** ISO 8601 timestamp the server stamped the trigger acknowledgement. */
    at: string;
}
export interface PipelineApprovalResolveRequest {
    stepId: string;
    decision: 'approve' | 'reject';
    /** Optional free-form note recorded alongside the decision. */
    comment?: string;
}
/** 204 No Content on success. No structured response body. */
export type PipelineApprovalResolveResponse = void;
export interface PipelineRunsListQuery {
    /** Page size, clamped server-side to [1, 100]. */
    limit?: number;
    /** Opaque cursor returned by a prior page. */
    cursor?: string;
}
export interface PipelineRunSummary {
    runId: string;
    pipelineId: string;
    status: 'running' | 'succeeded' | 'failed' | 'canceled' | 'interrupted';
    startedAt: string;
    completedAt?: string;
    triggeredBy: {
        userId?: string;
        triggerType: string;
        payload?: Record<string, unknown>;
    };
    triggerType?: string;
    /** Per-step state map. Keyed by node ID; shape evolves with the framework. */
    steps?: Record<string, unknown>;
    /** Structured terminal-error envelope. Absent on non-failed runs. */
    error?: {
        nodeId: string;
        message: string;
        errorCategory?: string;
        retryability?: string;
        [key: string]: unknown;
    };
}
export interface PipelineRunsListResponse {
    runs: readonly PipelineRunSummary[];
    /** Present when more pages exist; pass to the next call as `cursor`. */
    nextCursor?: string;
}
/**
 * Full run snapshot. Same shape as `PipelineRunSummary` today; kept as a
 * distinct alias because the detail endpoint may grow fields that aren't
 * meaningful in list responses (full step input/output, attempt history,
 * audit trail) without churning the list shape.
 */
export type PipelineRunDetailResponse = PipelineRunSummary;
export interface PipelinePendingApprover {
    type: 'role' | 'user';
    value: string;
}
export interface PipelinePendingApproval {
    runId: string;
    pipelineId: string;
    stepId: string;
    approvers: readonly PipelinePendingApprover[];
    /** Display message authored on the approval node. */
    message?: string;
    /** ISO 8601 of the first request. */
    requestedAt: string;
    /** Number of approvals required to advance the step. Default 1. */
    requiredCount?: number;
    /** Approvals already recorded against the step. */
    recordedCount?: number;
}
export interface PipelinePendingApprovalsResponse {
    approvals: readonly PipelinePendingApproval[];
}
export interface PipelineCancelRequest {
    /** Optional reason recorded in the audit log. */
    reason?: string;
}
/** 204 No Content on success. */
export type PipelineCancelResponse = void;
/** Structured error body returned on bridge / framework failures. */
export interface PipelineErrorBody {
    error: string;
    /** Logical action attempted ("trigger", "cancel", "resolveApproval", ...). */
    action: string;
}
//# sourceMappingURL=pipeline-contracts.d.ts.map