export interface DLQEntry {
    messageId: string;
    eventType: string;
    eventPayload: unknown;
    lastError: string;
    failedAt: string;
    totalAttempts: number;
    errorKind: string | null;
}
export interface DLQListResponse {
    items: DLQEntry[];
    cursor?: string;
}
export interface DLQRedriveResponse {
    redriven: string[];
    notFound: string[];
}
export interface DLQPurgeResponse {
    purged: string[];
    notFound: string[];
}
/**
 * Fetch DLQ entries with optional filters.
 */
export declare function listDLQEntries(options?: {
    limit?: number;
    cursor?: string;
    errorKind?: string;
    sinceMs?: number;
}): Promise<DLQListResponse>;
/**
 * Redrive one or more DLQ entries (re-publish them to the event bus).
 */
export declare function redriveDLQEntries(ids: string[], options?: {
    resetAttempts?: boolean;
    preview?: boolean;
}): Promise<DLQRedriveResponse>;
/**
 * Purge (permanently delete) one or more DLQ entries.
 */
export declare function purgeDLQEntries(ids: string[], options?: {
    preview?: boolean;
}): Promise<DLQPurgeResponse>;
//# sourceMappingURL=pipelineDLQ.d.ts.map