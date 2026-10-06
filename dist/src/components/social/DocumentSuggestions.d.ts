import { type ReactNode } from 'react';
export interface DocumentCandidate {
    /** Stable identity — this is what travels in the message, not the label. */
    id: string;
    /** The document's title. */
    label: string;
    /** Shown under the title, e.g. the folder or who last edited it. */
    hint?: string;
    /** The document's own icon, when it has one; 📄 otherwise. */
    icon?: string;
    /** A drawn glyph for the row (wins over `icon`) — a person for a subject mask. Since 2.390.0. */
    glyph?: ReactNode;
    /**
     * The heading this row sits under in the `panel` menu ("MASKS IN THIS
     * PHOTO"). Consecutive rows with the same group share one heading; order is
     * the host's. Ignored by the plain menu. Since 2.390.0.
     */
    group?: string;
}
/** The "Add context" card form of the `#` menu (RichChatComposer `documentMenu`). */
export interface DocumentMenuPanel {
    /** The card's title. Default "Add context". */
    title?: string;
    /** Said when nothing matches. Default "Nothing matches". */
    emptyLabel?: string;
}
export interface DocumentSuggestionsProps {
    items: DocumentCandidate[];
    command: (item: {
        id: string;
        label: string;
    }) => void;
    /** What was typed after `#` (the suggestion plugin passes it). */
    query?: string;
    /** Clears the typed query, leaving the `#` (the panel's ⓧ). */
    onClearQuery?: () => void;
    /** Draw as the "Add context" card. */
    panel?: DocumentMenuPanel;
}
export interface DocumentSuggestionsHandle {
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => boolean;
}
export declare const DocumentSuggestions: import("react").ForwardRefExoticComponent<DocumentSuggestionsProps & import("react").RefAttributes<DocumentSuggestionsHandle>>;
export default DocumentSuggestions;
//# sourceMappingURL=DocumentSuggestions.d.ts.map