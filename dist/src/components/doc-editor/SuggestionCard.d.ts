import type { ReactNode } from 'react';
/** What kind of change is being proposed. */
export type SuggestionCardKind = 'insert' | 'delete' | 'replace' | 'modify';
export interface SuggestionCardProps {
    kind: SuggestionCardKind;
    /**
     * Display name of whoever proposed it. Never blank — see below.
     *
     * `"Eve (powered by Haiku)"` is understood as a person and the model that
     * drafted for them, and is laid out as two tiers: Eve owns the author row,
     * the model sits under it. Anything else is one name and renders as one.
     */
    author: string;
    /** When it was proposed, epoch ms. */
    when?: number | null;
    /** Where in the document, e.g. a section title. */
    context?: string;
    /** Text proposed for removal — the whole run, for hosts without block detail. */
    deletedText?: string;
    /** Text proposed for addition — the whole run. */
    insertedText?: string;
    /** The same, one entry per block. Preferred over `insertedText` when given. */
    insertedBlocks?: readonly string[];
    deletedBlocks?: readonly string[];
    /** True for the suggestion the reader is currently sitting on. */
    active?: boolean;
    /** Scroll/select the change in the document. */
    onFocus?: () => void;
    /**
     * Accept/reject. BOTH optional and BOTH hidden when absent — a reader without
     * the authority to resolve a suggestion must not be shown buttons that do
     * nothing, which is the failure this whole surface exists to remove.
     */
    onAccept?: () => void;
    onReject?: () => void;
    /** Label of the Accept button. Default "Accept". */
    acceptLabel?: string;
    /**
     * Draw a checkbox at the start of the header for choosing a subset (accept
     * the ticked ones together). Controlled: pass `selected` AND
     * `onSelectedChange`; with `onSelectedChange` absent no checkbox is drawn.
     */
    selected?: boolean;
    onSelectedChange?: (selected: boolean) => void;
    /**
     * A status chip or run-progress line in the header, before the kind label
     * ("Drafting…", "Ready", "Failed").
     */
    status?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function SuggestionCard({ kind, author, when, context, deletedText, insertedText, insertedBlocks, deletedBlocks, active, onFocus, onAccept, onReject, acceptLabel, selected, onSelectedChange, status, className, 'data-testid': testId, }: SuggestionCardProps): import("react").JSX.Element;
export default SuggestionCard;
//# sourceMappingURL=SuggestionCard.d.ts.map