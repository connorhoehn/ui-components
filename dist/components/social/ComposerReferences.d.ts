import { type DropdownMenuSection } from '../shared/DropdownMenu';
export interface ComposerReference {
    /** Stable across re-renders; what `onRemove` is called with. */
    id: string;
    /** Already composed by the host — "Sprint review · v2 · Slide 4". */
    label: string;
    /** The referenced thing's own glyph, when it has one. */
    icon?: string;
    /** Hover text; the label itself when absent. */
    title?: string;
    /**
     * Makes the chip a menu trigger — label + chevron — that opens these
     * choices ("This guide", "This guide + sources", "No context"). A chip with
     * a menu draws NO remove button even when `onRemove` is passed: choosing
     * "none" is one of the menu's items, not an ×. Since 2.389.0.
     */
    menu?: readonly DropdownMenuSection[];
    /** Accessible name of the menu trigger. Default: the label. Since 2.389.0. */
    menuLabel?: string;
    /**
     * The chip's leading mark when it has no `icon`. `icon` (default): the
     * document glyph. `dot`: a small brand-coloured dot — "● Observability
     * Platform", "● This work item": the draft is about a scope, not a file.
     * Ignored when `icon` is set. Since 2.390.0.
     */
    marker?: 'icon' | 'dot';
}
export interface ComposerReferencesProps {
    references: readonly ComposerReference[];
    /** Omit to render the chips without a remove control. */
    onRemove?: (id: string) => void;
    /** Accessible name for a chip's remove button. */
    removeLabel?: (reference: ComposerReference) => string;
    className?: string;
    /** Chip type. `xs` (default) is the 11px chip of a chat composer; `sm` is the 12px chip of a docked editor card (2.377.0). */
    size?: 'xs' | 'sm' | 'md';
    'data-testid'?: string;
}
export declare function ComposerReferences({ references, onRemove, removeLabel, className, size, 'data-testid': testId, }: ComposerReferencesProps): import("react").JSX.Element | null;
export default ComposerReferences;
//# sourceMappingURL=ComposerReferences.d.ts.map