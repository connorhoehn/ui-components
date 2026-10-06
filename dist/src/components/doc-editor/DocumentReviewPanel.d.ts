export interface DocumentReviewEntry {
    requestKey: string;
    reviewerId: string;
    reviewerName?: string;
    requestedBy: string;
    requestedByName?: string;
    state: 'pending' | 'approved' | 'changes_requested' | 'withdrawn';
    required: boolean;
    note?: string;
    comment?: string;
    dueDate?: string;
}
export interface DocumentReviewPanelProps {
    requests: DocumentReviewEntry[];
    /** Directory and permissions come from the host's authoritative service. */
    reviewers?: Array<{
        id: string;
        displayName: string;
    }>;
    currentUserId: string;
    loading?: boolean;
    error?: string | null;
    onRefresh: () => void;
    onRequest?: (input: {
        reviewerId: string;
        note: string;
        required: boolean;
    }) => Promise<void>;
    onDecide?: (requestKey: string, state: 'approved' | 'changes_requested', comment: string) => Promise<void>;
    onWithdraw?: (requestKey: string) => Promise<void>;
}
export declare function DocumentReviewPanel({ requests, reviewers, currentUserId, loading, error, onRefresh, onRequest, onDecide, onWithdraw }: DocumentReviewPanelProps): import("react").JSX.Element;
//# sourceMappingURL=DocumentReviewPanel.d.ts.map