/** What the reader's typing currently does. */
export type SuggestionAuthoringMode = 'editing' | 'suggesting' | 'viewing';
export declare const SUGGESTION_AUTHORING_MODES: {
    value: SuggestionAuthoringMode;
    label: string;
    /** Shown as the control's title — the whole point is that people can tell them apart. */
    hint: string;
}[];
export interface SuggestionModeControlProps {
    mode: SuggestionAuthoringMode;
    onModeChange: (mode: SuggestionAuthoringMode) => void;
    /**
     * Hide the Viewing segment.
     *
     * For a host that has no read-only surface to switch to. Offering a segment
     * that cannot be honoured is the exact failure this component exists to
     * avoid, so it is opt-out rather than silently no-op.
     */
    showViewing?: boolean;
    /**
     * Suggestions currently open, shown beside the pill.
     *
     * Null (the default) renders no count at all — which is NOT the same as zero.
     * A document whose suggestions have not been read yet must not claim there
     * are none.
     */
    openCount?: number | null;
    /** Read-only documents, finalized documents, a reader without permission. */
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function SuggestionModeControl({ mode, onModeChange, showViewing, openCount, disabled, className, 'data-testid': testId, }: SuggestionModeControlProps): import("react").JSX.Element;
export default SuggestionModeControl;
//# sourceMappingURL=SuggestionModeControl.d.ts.map