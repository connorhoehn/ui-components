import { AuditFilters, AuditRow } from '../../../api/pipelineAudit';
export interface UsePipelineRunAuditLogOptions {
    /** Override the poll cadence in ms. Pass `0` to disable polling. */
    pollMs?: number;
    /** Initial filters; mutating them re-fetches from page 1. */
    filters?: AuditFilters;
}
export interface UsePipelineRunAuditLogResult {
    items: AuditRow[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    loadMore: () => void;
    /** True iff at least one event-stream message has arrived for this runId since mount. */
    liveHealthy: boolean;
    /** Force a re-fetch from page 1. */
    refresh: () => void;
}
export declare function usePipelineRunAuditLog(pipelineId: string | undefined, runId: string | undefined, options?: UsePipelineRunAuditLogOptions): UsePipelineRunAuditLogResult;
//# sourceMappingURL=usePipelineRunAuditLog.d.ts.map