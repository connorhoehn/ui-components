/** A match, as a ProseMirror document range. */
export interface FindMatch {
    from: number;
    to: number;
}
/** The subset of a ProseMirror node this needs. Keeps the module editor-free. */
export interface TextWalkable {
    descendants(fn: (node: {
        isText?: boolean;
        text?: string | null;
    }, pos: number) => void): void;
}
/**
 * Every occurrence of `query`, in document order.
 *
 * Case-insensitive by default, the way a word processor's find is. An empty or
 * whitespace-only query matches nothing rather than everything — the natural
 * reading of "I have not typed anything yet", and it keeps the bar from
 * selecting the whole document the moment it opens.
 *
 * Matches never span text nodes. A run split by a mark boundary — half a word
 * in bold — is two nodes, and joining them would produce positions that do not
 * address contiguous text. Word processors have the same limitation; it is
 * invisible in practice and honest, which is better than a position that lies.
 */
export declare function findMatches(doc: TextWalkable | null | undefined, query: string, opts?: {
    caseSensitive?: boolean;
}): FindMatch[];
/**
 * The match a person means by "next" from where the cursor is.
 *
 * Wraps, and treats the match the cursor is already sitting on as the current
 * one rather than skipping past it — pressing Enter in a find bar should step
 * from where you are, not from wherever the last search left off.
 */
export declare function nextMatchIndex(matches: readonly FindMatch[], cursorPos: number, direction?: 1 | -1): number;
//# sourceMappingURL=findMatches.d.ts.map