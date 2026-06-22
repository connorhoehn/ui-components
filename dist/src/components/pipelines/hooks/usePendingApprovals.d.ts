import { Approver } from '../../../types/pipeline';
export interface PendingApproval {
    runId: string;
    pipelineId: string;
    stepId: string;
    approvers: Approver[];
    /** ISO timestamp when the approval was first requested. */
    requestedAt: string;
    /** Optional approver-facing message captured on the node config. */
    message?: string;
    /** n-of-m threshold from the node config. Defaults to 1. */
    requiredCount?: number;
    /** How many `pipeline:approval:recorded` events we've seen so far. */
    recordedCount?: number;
}
export interface PendingApprovalsState {
    approvals: PendingApproval[];
    isLoading: boolean;
    error: string | null;
    retry: () => void;
}
type PendingApprovalsArrayLike = PendingApproval[] & {
    length: number;
};
/**
 * Maintain the live pending-approvals list. Subscribes to
 * `pipeline:approval:requested` / `pipeline:approval:recorded` and keeps an
 * internal map keyed on `(runId, stepId)`.
 */
export declare function usePendingApprovalsState(): PendingApprovalsState;
/**
 * Backwards-compatible array hook. `AppLayout` consumes this for the sub-nav
 * badge count — keep returning a plain array so `.length` continues to work.
 */
export declare function usePendingApprovals(): PendingApprovalsArrayLike;
export {};
//# sourceMappingURL=usePendingApprovals.d.ts.map