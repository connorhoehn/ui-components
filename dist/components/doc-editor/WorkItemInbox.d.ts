export interface WorkItemCandidate {
    sectionId: string;
    sectionTitle?: string;
    /** Ordering only. Never rendered as a number. */
    score: number;
    reason: string;
}
export interface WorkItemInboxEntry {
    itemId: string;
    /** Verbatim remark. */
    utterance: string;
    /** Why the capture path declined to place it. Shown so it is never a mystery. */
    reason?: string;
    /** True when the speaker's screen moved mid-utterance. */
    contextSplit?: boolean;
    capturedAt?: string;
    candidates?: WorkItemCandidate[];
}
export interface WorkItemInboxProps {
    entries: WorkItemInboxEntry[];
    /** All sections, so a user can file an item somewhere no candidate names. */
    sections: Array<{
        id: string;
        title: string;
    }>;
    onAttach: (itemId: string, sectionId: string) => void;
    onDismiss: (itemId: string) => void;
    className?: string;
    'data-testid'?: string;
}
export declare function WorkItemInbox({ entries, sections, onAttach, onDismiss, className, 'data-testid': testId, }: WorkItemInboxProps): import("react").JSX.Element;
export default WorkItemInbox;
//# sourceMappingURL=WorkItemInbox.d.ts.map