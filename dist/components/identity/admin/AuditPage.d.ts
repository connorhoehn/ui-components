export interface AuditPageProps {
    records: Array<{
        timestamp: number;
        actor: {
            id?: string;
            email?: string;
        } | string;
        entityType: string;
        entityId: string;
        operation: string;
    }>;
    onQuery: (params: {
        entityType?: string;
        entityId?: string;
        fromTime?: number;
        toTime?: number;
        limit?: number;
    }) => Promise<void>;
    onViewEntity: (entityType: string, entityId: string) => void;
    onReplay: (entityId: string, atTime: number) => Promise<Record<string, unknown> | null>;
    loading?: boolean;
    totalRecords?: number;
}
export declare function AuditPage({ records, onQuery, onViewEntity, onReplay, loading, totalRecords, }: AuditPageProps): import("react").JSX.Element;
//# sourceMappingURL=AuditPage.d.ts.map