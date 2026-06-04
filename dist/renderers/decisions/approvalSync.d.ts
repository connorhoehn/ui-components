declare const TERMINAL_DECISIONS: {
    readonly acked: "approved";
    readonly done: "approved";
    readonly rejected: "rejected";
};
export type TerminalRendererStatus = keyof typeof TERMINAL_DECISIONS;
export type ApprovalDecision = typeof TERMINAL_DECISIONS[TerminalRendererStatus];
export declare function readDocumentIdFromUrl(): string | null;
export declare function mapStatusToDecision(status: string): ApprovalDecision | null;
export interface PostApprovalArgs {
    sectionId: string;
    decision: ApprovalDecision;
    reviewerName?: string;
    comment?: string;
    /** Override for tests; production reads from window.location. */
    documentId?: string | null;
    /** Optional bearer token. Dev (SKIP_AUTH=true) accepts unauthenticated. */
    idToken?: string | null;
}
export declare function postApproval(args: PostApprovalArgs): Promise<{
    ok: boolean;
    error?: string;
}>;
export {};
//# sourceMappingURL=approvalSync.d.ts.map