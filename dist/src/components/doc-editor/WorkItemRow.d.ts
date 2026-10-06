/**
 * A ranked guess at where the remark belongs.
 *
 * Ordering only. `score` decides the order and is never rendered as a number —
 * no percentage, no bar, nothing that invites reading a ranking heuristic as a
 * probability.
 */
export interface WorkItemCandidate {
    sectionId: string;
    sectionTitle?: string;
    score: number;
    reason: string;
}
export interface WorkItemRowProps {
    /** Identifies the row and seeds its test ids. */
    itemId: string;
    /** The verbatim remark. */
    utterance: string;
    /**
     * True when the capture path could not place this remark. Changes the chip
     * and reveals the filing controls — it never withholds an action.
     */
    unplaced?: boolean;
    /**
     * Where it is filed, in words, when it IS placed. Ignored when `unplaced`.
     */
    targetLabel?: string;
    /** Why the capture path declined to place it. Shown so it is never a mystery. */
    reason?: string;
    /** True when the speaker's screen moved mid-utterance. */
    contextSplit?: boolean;
    /** A draft is in flight; the draft action reads as busy and is disabled. */
    drafting?: boolean;
    /** A drafting failure, shown verbatim rather than swallowed. */
    draftError?: string;
    /** Ranked guesses. Ordered here, never pre-selected. */
    candidates?: WorkItemCandidate[];
    /** All sections, so a user can file the remark somewhere no candidate names. */
    sections: Array<{
        id: string;
        title: string;
    }>;
    /** Turn the remark into a proposal. Offered on every remark, placed or not. */
    onPropose: () => void;
    /** File the remark under a section. */
    onAttach: (sectionId: string) => void;
    /** Discard the remark. */
    onDismiss: () => void;
    className?: string;
    'data-testid'?: string;
}
export declare function WorkItemRow({ itemId, utterance, unplaced, targetLabel, reason, contextSplit, drafting, draftError, candidates, sections, onPropose, onAttach, onDismiss, className, 'data-testid': testId, }: WorkItemRowProps): import("react").JSX.Element;
export default WorkItemRow;
//# sourceMappingURL=WorkItemRow.d.ts.map