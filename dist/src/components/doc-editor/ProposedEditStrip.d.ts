export type ProposedEditStatus = 'streaming' | 'ready' | 'applying' | 'applied' | 'discarded';
export interface ProposedEdit {
    /** Stable across re-renders; what the callbacks receive. */
    id: string;
    /** `insert` adds at the anchor; `replace` swaps the anchored range for the content. */
    kind: 'insert' | 'replace';
    /** A document range (editor positions) or the live cursor. */
    anchor: {
        from: number;
        to: number;
    } | 'cursor';
    /** What would land. `text` is previewed as-is; `html` is previewed as its text. */
    content: {
        html?: string;
        text?: string;
    };
    /** One line saying what the edit does — "Tightens the scope paragraph". */
    summary?: string;
    status: ProposedEditStatus;
}
export interface ProposedEditStripProps {
    proposals: readonly ProposedEdit[];
    onApply: (id: string) => void;
    onDiscard: (id: string) => void;
    /** Wired, a ready proposal offers "Revise…": a one-line instruction sent back with its id. */
    onRevise?: (id: string, instruction: string) => void;
    /** Shown as "Apply all" when more than one proposal is ready. */
    onApplyAll?: () => void;
    /** Shown as "Discard all" when more than one proposal is pending. */
    onDiscardAll?: () => void;
    /** Heading. Default "Proposed edit" / "N proposed edits". */
    title?: string;
    className?: string;
    /** Default `proposed-edit-strip`. Items are `<id>-item`, actions `<id>-apply` etc. */
    'data-testid'?: string;
}
/** The text a proposal previews: `text` when given, else `html` without its markup. */
export declare function proposedEditPreview(content: ProposedEdit['content']): string;
/** Where the edit lands, in words. */
export declare function proposedEditPlacement(edit: Pick<ProposedEdit, 'kind' | 'anchor'>): string;
export declare function ProposedEditStrip({ proposals, onApply, onDiscard, onRevise, onApplyAll, onDiscardAll, title, className, 'data-testid': testId, }: ProposedEditStripProps): import("react").JSX.Element | null;
export default ProposedEditStrip;
//# sourceMappingURL=ProposedEditStrip.d.ts.map