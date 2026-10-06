/** Only a durable backend receipt may select `saved`. Connection/sync is insufficient. */
export interface DocumentSaveState {
    status: 'pending' | 'saved' | 'error' | 'offline';
    detail?: string;
    onRetry?: () => void;
}
/** `className` (since 2.386.5) sizes the line for its host — an editor head reads it at 13px. */
export declare function DocumentSaveStatus({ state, className }: {
    state?: DocumentSaveState;
    className?: string;
}): import("react").JSX.Element | null;
//# sourceMappingURL=DocumentSaveStatus.d.ts.map