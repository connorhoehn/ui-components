import type { ChangeAuthor, ChangeReviewStatus, ChangeReviewVerdict } from '../change-review';
/** How much the capture path trusted its own choice of target. */
export type ProposalConfidence = 'high' | 'medium' | 'low';
/** Where the item currently sits relative to the document. */
export type ProposalAttachState = 'attached' | 'author_only' | 'inbox' | 'healed';
export type ProposalKind = 'field' | 'prose';
export type ProposalCardStatus = 'none' | 'drafting' | 'ready' | 'applied' | 'rejected' | 'failed';
/** What the host reports back after trying to apply. */
export interface ProposalApplyOutcome {
    ok: boolean;
    /** Shown verbatim when `ok` is false. Say what happened, not "error". */
    message?: string;
    /** Set when the refusal was specifically a compare-and-set mismatch. */
    stale?: {
        expected: unknown;
        actual: unknown;
    };
}
export interface ProposalCardProps {
    /** Verbatim remark that raised this. Never paraphrase it. */
    utterance: string;
    /** `field` changes a title/scalar; `prose` stages suggestion marks. */
    kind: ProposalKind;
    status: ProposalCardStatus;
    confidence: ProposalConfidence;
    attachState?: ProposalAttachState;
    /** Human-readable target, e.g. "Document title" or "Overview". */
    targetLabel?: string;
    /** Why the capture path chose that target. Shown on the provenance line. */
    targetReason?: string;
    /** For `field`: the two values, so the change is legible without the doc. */
    before?: string;
    after?: string;
    /** For `prose`: one row per edit. */
    edits?: Array<{
        before: string;
        after: string;
    }>;
    /** The model's one-line justification. */
    rationale?: string;
    /** Set when drafting itself failed. Rendered instead of the diff. */
    draftError?: string;
    /**
     * Who ASKED for this change — the person whose remark raised it.
     *
     * Distinct from who drafted it: the draft is always the model's, which is
     * what the permanent "AI proposal" chip says. Omit when the requester is not
     * known. Never synthesise one; an invented author on a change nobody can
     * trace is worse than an honest blank.
     */
    author?: ChangeAuthor;
    /**
     * What kind of change this is, in the reviewer's words — "Document title",
     * "Body text". Defaults to a label derived from `kind`.
     */
    category?: string;
    /**
     * Where in the document this lands, outermost first. Rendered diff-hunk
     * style. Defaults to `targetLabel` when that is all the host knows.
     */
    path?: readonly string[];
    /** Position within the target, e.g. `paragraph 3`. */
    locationHint?: string;
    /** The agent's verdict on this change. */
    verdict?: ChangeReviewVerdict | undefined;
    /** How the review itself is going. */
    verdictStatus?: ChangeReviewStatus | undefined;
    /** Why the review failed, when `verdictStatus` is `failed`. */
    verdictError?: string | undefined;
    /**
     * The proposal's CURRENT revision. Pass it, or a verdict computed against an
     * earlier draft renders as though it still applies to this one.
     */
    revision?: string | undefined;
    /** Ask for a fresh verdict against the current revision. */
    onRereview?: () => void;
    /**
     * Apply the change. MUST perform the mutation and report what happened —
     * returning `{ ok: true }` without changing the document is the exact bug this
     * component is shaped to prevent.
     */
    onAccept: () => Promise<ProposalApplyOutcome> | ProposalApplyOutcome;
    onReject: (reason: string) => void;
    /** Ask for a fresh draft against the document's current values. */
    onRedraft?: () => void;
    /** Move the item to a different section. Omitted when there is nowhere to go. */
    onReattach?: () => void;
    /** Confirm an `author_only` attachment, publishing it to collaborators. */
    onConfirmAttachment?: () => void;
    className?: string;
    'data-testid'?: string;
}
export declare function ProposalCard({ utterance, kind, status, confidence, attachState, targetLabel, targetReason, before, after, edits, rationale, draftError, author, category, path, locationHint, verdict, verdictStatus, verdictError, revision, onRereview, onAccept, onReject, onRedraft, onReattach, onConfirmAttachment, className, 'data-testid': testId, }: ProposalCardProps): import("react").JSX.Element;
export default ProposalCard;
//# sourceMappingURL=ProposalCard.d.ts.map