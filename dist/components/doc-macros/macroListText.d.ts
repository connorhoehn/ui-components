/** A single-range replacement, in offsets into the macro's text. */
export interface TextRangeEdit {
    from: number;
    to: number;
    insert: string;
}
export interface Scalar {
    value: string;
    /** Offset of the first character of the value, in the macro's text. */
    from: number;
    /** Offset one past the last character of the value. */
    to: number;
}
export interface Entry {
    key: string;
    /** Offset one past the `:` that ends the key. */
    keyEnd: number;
    scalar: Scalar;
    /** Offset of the first character of the line holding this entry. */
    lineStart: number;
    /** Offset of the newline ending this line, or the end of the source. */
    lineEnd: number;
}
export interface RawItem {
    entries: Entry[];
    lineStart: number;
    lineEnd: number;
}
export interface ParsedBody {
    items: RawItem[];
    /** The list entry. Its scalar is `[]` for an empty list, `''` otherwise. */
    list: Entry;
    /**
     * Offset one past the last item's last line — or one past the list key
     * itself when the list is empty. Everything an edit may replace ends here.
     */
    listEnd: number;
}
export declare const ITEM_MARKER = "  - ";
export declare const ITEM_INDENT = "    ";
/**
 * The list a macro body describes, or `null` when the body is not a shape this
 * module can edit safely.
 */
export declare function parseListBody(source: string, listKey: string): ParsedBody | null;
export declare function entryOf(item: RawItem, key: string): Entry | undefined;
/**
 * A scalar as YAML.
 *
 * Conservative on purpose: plain style only for values that can carry no other
 * reading, single-quoted (with `''` for an embedded quote) otherwise. js-yaml
 * would leave more of these plain, and that divergence is harmless — an
 * exported file is re-dumped from the PARSED data by the chassis, so what
 * matters is that these bytes parse back to the same string.
 */
export declare function yamlScalar(value: string): string | null;
/**
 * The edit that sets one key on one item, or `null` when there is nothing to
 * do (or the body is not editable).
 *
 * When the key is already there this replaces the SCALAR alone. When it is not,
 * it inserts a whole line in the position `sortKeys` would have put it, so the
 * body stays byte-identical to what the chassis would emit.
 */
export declare function setListItemKeyEdit(source: string, listKey: string, index: number, key: string, value: string): TextRangeEdit | null;
/**
 * The edit that takes one key OFF one item — the exact inverse of
 * `insertionFor`, and the only honest way to say a field is not there.
 *
 * Writing `assignee: ''` would say something different: the item HAS an
 * assignee whose id is the empty string, which renders as a chip pointing at
 * nobody and matches nobody's inbox. Absent is what unset means in this format.
 *
 * Returns `null` when the key is not there (nothing to do) and when it is the
 * item's only entry, which would leave a bare `-` marker that reparses as a
 * null item — merge damage rather than an empty field.
 */
export declare function removeListItemKeyEdit(source: string, listKey: string, index: number, key: string): TextRangeEdit | null;
/**
 * The edit that removes one item — its lines AND the break that separated them
 * from their neighbour, so nothing is left behind that would reparse
 * differently.
 *
 * Removing the last remaining item writes `<listKey>: []` rather than a bare
 * key, because a bare key parses as `null`, not as an empty list: the block
 * would come back as merge damage rather than as an empty list.
 */
export declare function removeListItemEdit(source: string, listKey: string, index: number): TextRangeEdit | null;
/**
 * The edit that appends one item, given its keys in the order they should be
 * written — which callers supply already sorted, because `sortKeys: true` is
 * what the chassis dumps.
 *
 * Also the path back from `<listKey>: []` to a block list: the range then
 * starts at the list key's colon and swallows the empty flow sequence, which
 * keeps this a single range rather than two edits a CRDT would have to order.
 */
export declare function addListItemEdit(source: string, listKey: string, pairs: readonly (readonly [string, string])[]): TextRangeEdit | null;
//# sourceMappingURL=macroListText.d.ts.map