/** One row. Both a command and a command's argument fit this shape. */
export interface CommandSuggestionItem {
    /** Stable key. For a command, its trigger. */
    id: string;
    /** The typed token, rendered in mono — `/doc`. */
    code?: string;
    /** A glyph rendered where the token would be, for argument rows. */
    icon?: string;
    label: string;
    /** A second clause on the right: what it needs, or where it lives. */
    hint?: string;
    /** The long form, shown under the list for the highlighted row only. */
    description?: string;
    /**
     * A command row whose command takes an argument (2.407.2). Enter on it
     * always accepts it, even when the draft is exactly its trigger — see the
     * note at the top.
     */
    takesArgument?: boolean;
}
export interface CommandSuggestionsProps {
    items: CommandSuggestionItem[];
    command: (item: CommandSuggestionItem) => void;
    /** The listbox's accessible name. */
    label?: string;
    /**
     * The whole draft, for the command menu only. When it equals the
     * highlighted row's `code` exactly, Enter is not a pick — see the note at
     * the top.
     */
    draft?: string;
    /**
     * `fit`: as wide as the rows need (11–20rem) instead of a fixed 26rem — for a
     * compact composer in a narrow column (a margin comment card), where a fixed
     * menu is wider than the card it opens from.
     */
    width?: 'fixed' | 'fit';
}
export interface CommandSuggestionsHandle {
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => boolean;
}
export declare const CommandSuggestions: import("react").ForwardRefExoticComponent<CommandSuggestionsProps & import("react").RefAttributes<CommandSuggestionsHandle>>;
export default CommandSuggestions;
//# sourceMappingURL=CommandSuggestions.d.ts.map