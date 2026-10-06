declare const TERMINAL_DECISIONS: {
    readonly acked: 'approved';
    readonly done: 'approved';
    readonly rejected: 'rejected';
};
export type TerminalRendererStatus = keyof typeof TERMINAL_DECISIONS;
export type ApprovalDecision = typeof TERMINAL_DECISIONS[TerminalRendererStatus];
/** A string, or a getter for a host that resolves its base URL lazily. */
export type ApprovalApiBase = string | (() => string);
/**
 * Point the approvals sync at a host's own API. Pass `null` to fall back to
 * the environment. Call once at startup, before any decision is finalized.
 */
export declare function setApprovalApiBase(base: ApprovalApiBase | null): void;
export declare function getApprovalApiBase(): string;
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
    /** Per-call override of the API base; falls back to `getApprovalApiBase()`. */
    baseUrl?: string;
}
export declare function postApproval(args: PostApprovalArgs): Promise<{
    ok: boolean;
    error?: string;
}>;
export {};
//# sourceMappingURL=approvalSync.d.ts.map