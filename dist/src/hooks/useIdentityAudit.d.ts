import { AuditRecord, AuditQueryParams } from '../types/identity';
export interface UseIdentityAuditReturn {
    records: AuditRecord[];
    loading: boolean;
    error: string | null;
    query: (params: AuditQueryParams) => Promise<void>;
    getEntityHistory: (entityType: string, entityId: string) => Promise<AuditRecord[]>;
    getStateAtTime: (entityId: string, timestamp: number) => Promise<Record<string, unknown> | null>;
}
export declare function useIdentityAudit(): UseIdentityAuditReturn;
//# sourceMappingURL=useIdentityAudit.d.ts.map