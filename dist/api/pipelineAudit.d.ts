/**
 * Mirrors `StoredAuditEvent` from social-api/src/pipeline/audit-repository.ts.
 * Re-declared here as a plain TS interface (per project conventions — no
 * runtime schema lib) so the frontend doesn't pull a backend module across
 * the Vite/TSX boundary.
 */
export interface AuditRow {
    auditId: string;
    timestamp: string;
    action: string;
    actorUserId: string;
    pipelineId: string;
    runId?: string;
    decision?: 'approved' | 'rejected' | 'cancelled' | 'failed' | 'completed' | 'success' | 'error';
    outcome?: 'success' | 'error' | 'rejected';
    details?: Record<string, unknown>;
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
    trace?: Record<string, unknown>;
    ttlEpoch?: number;
}
export interface AuditFilters {
    /** ISO 8601 lower bound on `timestamp`. */
    since?: string;
    /** ISO 8601 upper bound on `timestamp`. */
    until?: string;
    /** Action types to keep — comma-joined for the query string. */
    actions?: string[];
    /** Page size (1..1000). Server defaults to 100. */
    limit?: number;
    /** Opaque pagination token from a previous response. */
    cursor?: string;
}
export interface SearchAuditFilters extends AuditFilters {
    /** Either `actor` or `pipelineId` is required. */
    actor?: string;
    /** Either `actor` or `pipelineId` is required. */
    pipelineId?: string;
}
export interface AuditPage {
    items: AuditRow[];
    nextCursor?: string;
}
/**
 * Per-run audit timeline. Returns a single page; callers paginate with
 * `nextCursor`. The backend route returns `{ items: [], nextCursor }`
 * with rows newest-first.
 */
export declare function getRunAuditLog(pipelineId: string, runId: string, filters?: AuditFilters): Promise<AuditPage>;
/**
 * Cross-run audit search. At least one of `actor` / `pipelineId` is required;
 * the backend returns 400 otherwise.
 */
export declare function searchAudit(filters: SearchAuditFilters): Promise<AuditPage>;
//# sourceMappingURL=pipelineAudit.d.ts.map