export declare function formatDuration(ms?: number): string;
export declare function formatDate(iso: string | undefined): string;
/**
 * Human-friendly relative time label ("just now", "5m ago", "3h ago", etc.).
 * Falls back to locale date string for anything older than 3 days.
 */
export declare function relativeTime(iso: string): string;
//# sourceMappingURL=formatTime.d.ts.map