export type IngestAuditEventType = 'mapping.decided' | 'source.created' | 'source.updated' | 'source.paused' | 'source.resumed' | 'writeback.attempted' | 'writeback.failed';
export interface IngestAuditEntry {
    auditId: string;
    createdAt: string;
    actor: string;
    eventType: IngestAuditEventType;
    targetType: 'source' | 'item' | 'document';
    targetId: string;
    summary: string;
    detail: Record<string, unknown>;
}
export interface IngestAuditFilters {
    since?: string;
    until?: string;
    actor?: string;
    eventType?: IngestAuditEventType;
    targetId?: string;
    limit?: number;
}
export interface UseIngestAuditResult {
    entries: IngestAuditEntry[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}
export declare function useIngestAudit(filters?: IngestAuditFilters): UseIngestAuditResult;
export default useIngestAudit;
//# sourceMappingURL=useIngestAudit.d.ts.map