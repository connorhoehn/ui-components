import { type ReactNode } from 'react';
import { type ChangeDiffPair } from './ChangeDiff';
import type { ChangeReviewStatus, ChangeReviewVerdict } from './types';
/** Who is asking for the change. */
export interface ChangeAuthor {
    name: string;
    /**
     * `agent` renders the machine label. This is not decoration: an unreviewed
     * machine edit and a colleague's edit carry very different weight, and the
     * only thing separating them on screen is this.
     */
    kind?: 'human' | 'agent';
    avatarUrl?: string;
}
/** What the host reports back after trying to apply. */
export interface ChangeApplyOutcome {
    ok: boolean;
    /** Shown verbatim when `ok` is false. Say what happened, not "error". */
    message?: string;
    /** Set when the refusal was specifically a compare-and-set mismatch. */
    stale?: {
        expected: unknown;
        actual: unknown;
    };
}
export type ChangeReviewCardStatus = 'pending' | 'applied' | 'rejected';
export interface ChangeReviewCardProps {
    /**
     * What KIND of change this is, in the reviewer's words — "Title", "Payment
     * terms", "Body text". Rendered first and most prominent.
     */
    category: string;
    /**
     * Who made / is asking for the change.
     *
     * Optional, and its absence is RENDERED — as "Unattributed", not as a blank.
     * Plenty of real sources cannot name an editor (an S3 object has no author),
     * and the wrong fix is to fill the gap with the system that delivered the
     * change. "Contracts (Google Drive)" is a provenance, not a person; showing
     * it where a person belongs is what made the queue it replaces unreadable.
     */
    author?: ChangeAuthor;
    /** Breadcrumb to the change site. See `ChangeLocation`. */
    path?: readonly string[];
    /** Position within the target, e.g. `paragraph 3`. */
    locationHint?: string;
    /** The before/after pairs. One for a field, several for prose edits. */
    pairs: readonly ChangeDiffPair[];
    /** Label for the current value. Defaults to "Now". */
    beforeLabel?: string;
    /** Label for the proposed value. Defaults to "Proposed". */
    afterLabel?: string;
    /** Verbatim request that raised this, if there was one. Never paraphrase it. */
    utterance?: string;
    /** The author's one-line justification for the change itself. */
    rationale?: string;
    verdict?: ChangeReviewVerdict | undefined;
    verdictStatus?: ChangeReviewStatus | undefined;
    verdictError?: string | undefined;
    /**
     * The change's CURRENT revision. Pass it, or a verdict computed against an
     * older revision renders as though it still applies.
     */
    revision?: string | undefined;
    status?: ChangeReviewCardStatus;
    /** When set, rendered instead of the diff — the change could not be drafted. */
    draftError?: string;
    /** Extra chips for the header line (attachment state, confidence, …). */
    badges?: ReactNode;
    /**
     * Apply the change. MUST perform the mutation and report what happened —
     * returning `{ ok: true }` without changing the document is the exact bug
     * this component is shaped to prevent.
     */
    onAccept?: () => Promise<ChangeApplyOutcome> | ChangeApplyOutcome;
    onReject?: (reason: string) => void;
    /** Ask for a fresh review of the current revision. Offered on stale/failed. */
    onRereview?: () => void;
    /** Extra actions, rendered after the built-in ones. */
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function ChangeReviewCard({ category, author, path, locationHint, pairs, beforeLabel, afterLabel, utterance, rationale, verdict, verdictStatus, verdictError, revision, status, draftError, badges, onAccept, onReject, onRereview, actions, className, 'data-testid': testId, }: ChangeReviewCardProps): import("react").JSX.Element;
export default ChangeReviewCard;
//# sourceMappingURL=ChangeReviewCard.d.ts.map