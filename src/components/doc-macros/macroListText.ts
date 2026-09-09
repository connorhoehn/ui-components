// ui-components/src/components/doc-macros/macroListText.ts
//
// The list arithmetic every plural macro needs, in one place.
//
// `macro:action-items` established this shape and `macro:links` is the second
// citizen to want it, so it moves here rather than being copied. What "this
// shape" means precisely:
//
//     <listKey>:
//       - keyA: value
//         keyB: value
//       - keyA: value
//
// One top-level key holding a block sequence of flat mappings, and nothing
// else. Every function below reads and edits those bytes AS TEXT — there is no
// YAML parser in `./diagram`, deliberately, and editing a parsed form would be
// a second serialiser. `actionItemsText.ts`'s header argues both points at
// length; this file is that argument's implementation, with the top-level key
// as a parameter.
//
// The consequence is worth restating because every caller inherits it: this
// reads a RESTRICTED subset — the shape the chassis emits, plus quoted scalars
// a foreign tool may have normalised — and returns `null` for anything else.
// `null` is a real answer. The node view then shows the literal fence, which is
// what the format promises a reader whose renderer cannot draw the block.

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

const KEY_RE = /^([A-Za-z][A-Za-z0-9_-]*):/;
export const ITEM_MARKER = '  - ';
export const ITEM_INDENT = '    ';

/** Splits into lines, keeping each line's offset in the original string. */
function lines(source: string): { text: string; start: number }[] {
    const out: { text: string; start: number }[] = [];
    let start = 0;
    for (;;) {
        const nl = source.indexOf('\n', start);
        if (nl === -1) {
            out.push({ text: source.slice(start), start });
            return out;
        }
        out.push({ text: source.slice(start, nl), start });
        start = nl + 1;
    }
}

/**
 * A `'…'` / `"…"` / bare scalar as its string value.
 *
 * The quoted forms are accepted for the reason `readDiagramId` accepts them: a
 * hand-edited or foreign-tool-normalised file may quote a scalar the chassis
 * left bare, and refusing it would blank a block over punctuation.
 */
function unquote(raw: string): string | null {
    if (raw.length >= 2 && raw.startsWith("'") && raw.endsWith("'")) {
        return raw.slice(1, -1).replace(/''/g, "'");
    }
    if (raw.length >= 2 && raw.startsWith('"') && raw.endsWith('"')) {
        try {
            return JSON.parse(raw) as string;
        } catch {
            return null;
        }
    }
    if (raw.startsWith("'") || raw.startsWith('"')) return null; // unterminated
    // A bare scalar can carry a trailing `# comment`, which is not part of the
    // value. Rather than strip it — and then silently delete it on the next
    // write — the whole block is declined, so the reader keeps their comment
    // and sees the fence.
    if (/(^|\s)#/.test(raw)) return null;
    return raw;
}

/** `key: value` at `indent` columns, with the value's offsets. */
function parseEntry(text: string, lineStart: number, indent: number): Entry | null {
    const m = KEY_RE.exec(text.slice(indent));
    if (!m) return null;
    let i = indent + m[0].length;
    while (i < text.length && (text[i] === ' ' || text[i] === '\t')) i += 1;
    let end = text.length;
    while (end > i && (text[end - 1] === ' ' || text[end - 1] === '\t')) end -= 1;
    const value = unquote(text.slice(i, end));
    if (value === null) return null;
    return {
        key: m[1]!,
        keyEnd: lineStart + indent + m[0].length,
        scalar: { value, from: lineStart + i, to: lineStart + end },
        lineStart,
        lineEnd: lineStart + text.length,
    };
}

/**
 * The list a macro body describes, or `null` when the body is not a shape this
 * module can edit safely.
 */
export function parseListBody(source: string, listKey: string): ParsedBody | null {
    const all = lines(source);
    let i = 0;
    while (i < all.length && all[i]!.text.trim() === '') i += 1;
    const head = all[i];
    if (!head) return null;

    const listEntry = parseEntry(head.text, head.start, 0);
    if (!listEntry || listEntry.key !== listKey) return null;
    if (listEntry.scalar.value !== '' && listEntry.scalar.value !== '[]') return null;
    i += 1;

    const items: RawItem[] = [];
    let listEnd = listEntry.lineEnd;
    for (; i < all.length; i += 1) {
        const line = all[i]!;
        if (line.text.trim() === '') continue;
        if (line.text.startsWith(ITEM_MARKER)) {
            const entry = parseEntry(line.text, line.start, ITEM_MARKER.length);
            if (!entry) return null;
            items.push({ entries: [entry], lineStart: line.start, lineEnd: entry.lineEnd });
        } else if (line.text.startsWith(ITEM_INDENT)) {
            const current = items[items.length - 1];
            if (!current) return null;
            const entry = parseEntry(line.text, line.start, ITEM_INDENT.length);
            if (!entry) return null;
            if (current.entries.some((e) => e.key === entry.key)) return null; // duplicate key
            current.entries.push(entry);
            current.lineEnd = entry.lineEnd;
        } else {
            // Nested structure, a second top-level key, a flow sequence — all
            // legal YAML this reader will not pretend to understand.
            return null;
        }
        listEnd = items[items.length - 1]!.lineEnd;
    }
    if (items.length > 0 && listEntry.scalar.value === '[]') return null;

    return { items, list: listEntry, listEnd };
}

export function entryOf(item: RawItem, key: string): Entry | undefined {
    return item.entries.find((e) => e.key === key);
}

/**
 * A scalar as YAML.
 *
 * Conservative on purpose: plain style only for values that can carry no other
 * reading, single-quoted (with `''` for an embedded quote) otherwise. js-yaml
 * would leave more of these plain, and that divergence is harmless — an
 * exported file is re-dumped from the PARSED data by the chassis, so what
 * matters is that these bytes parse back to the same string.
 */
export function yamlScalar(value: string): string | null {
    if (value.includes('\n')) return null; // a block scalar is not one range
    const plain =
        value !== '' &&
        /^[A-Za-z][A-Za-z0-9 _.()/-]*$/.test(value) &&
        !value.endsWith(' ') &&
        !/^(true|false|null|yes|no|on|off|y|n)$/i.test(value);
    return plain ? value : `'${value.replace(/'/g, "''")}'`;
}

/**
 * Where a key this item does not have yet goes, alphabetically — matching the
 * chassis's `sortKeys: true`, so a body it wrote stays a body it would write.
 */
function insertionFor(item: RawItem, key: string, scalar: string): TextRangeEdit {
    const after = item.entries.find((e) => e.key > key);
    if (after) {
        // Immediately before the first key that sorts after this one. Both the
        // item marker and the continuation indent are four columns wide, so
        // landing four characters into that line pushes it down with whichever
        // prefix it already had.
        const at = after.lineStart + ITEM_INDENT.length;
        return { from: at, to: at, insert: `${key}: ${scalar}\n${ITEM_INDENT}` };
    }
    // Nothing sorts after it: a new last line for the item.
    const last = item.entries[item.entries.length - 1]!;
    return { from: last.lineEnd, to: last.lineEnd, insert: `\n${ITEM_INDENT}${key}: ${scalar}` };
}

/**
 * The edit that sets one key on one item, or `null` when there is nothing to
 * do (or the body is not editable).
 *
 * When the key is already there this replaces the SCALAR alone. When it is not,
 * it inserts a whole line in the position `sortKeys` would have put it, so the
 * body stays byte-identical to what the chassis would emit.
 */
export function setListItemKeyEdit(
    source: string,
    listKey: string,
    index: number,
    key: string,
    value: string,
): TextRangeEdit | null {
    const body = parseListBody(source, listKey);
    const item = body?.items[index];
    if (!item) return null;
    const scalar = yamlScalar(value);
    if (scalar === null) return null;

    const existing = entryOf(item, key);
    if (existing) {
        if (existing.scalar.value === value) return null; // already correct
        return { from: existing.scalar.from, to: existing.scalar.to, insert: scalar };
    }
    return insertionFor(item, key, scalar);
}

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
export function removeListItemKeyEdit(
    source: string,
    listKey: string,
    index: number,
    key: string,
): TextRangeEdit | null {
    const body = parseListBody(source, listKey);
    const item = body?.items[index];
    if (!item) return null;
    const entry = entryOf(item, key);
    if (!entry || item.entries.length < 2) return null;

    const position = item.entries.indexOf(entry);
    if (position === 0) {
        // The item marker lives on this line, so the line itself has to stay.
        // Cut from just past the marker to the same column of the next entry's
        // line, which pulls that key up onto the marker — precisely what
        // `insertionFor` does in reverse.
        const next = item.entries[1]!;
        return {
            from: entry.lineStart + ITEM_INDENT.length,
            to: next.lineStart + ITEM_INDENT.length,
            insert: '',
        };
    }
    // A continuation line: take it and the break that put it on its own line.
    const previous = item.entries[position - 1]!;
    return { from: previous.lineEnd, to: entry.lineEnd, insert: '' };
}

/**
 * The edit that removes one item — its lines AND the break that separated them
 * from their neighbour, so nothing is left behind that would reparse
 * differently.
 *
 * Removing the last remaining item writes `<listKey>: []` rather than a bare
 * key, because a bare key parses as `null`, not as an empty list: the block
 * would come back as merge damage rather than as an empty list.
 */
export function removeListItemEdit(
    source: string,
    listKey: string,
    index: number,
): TextRangeEdit | null {
    const body = parseListBody(source, listKey);
    const item = body?.items[index];
    if (!body || !item) return null;
    if (body.items.length === 1) {
        return { from: body.list.keyEnd, to: body.listEnd, insert: ' []' };
    }
    const next = body.items[index + 1];
    // Take the trailing newline when something follows, the leading one when
    // nothing does; either way the remaining lines stay adjacent.
    if (next) return { from: item.lineStart, to: next.lineStart, insert: '' };
    return { from: item.lineStart - 1, to: body.listEnd, insert: '' };
}

/**
 * The edit that appends one item, given its keys in the order they should be
 * written — which callers supply already sorted, because `sortKeys: true` is
 * what the chassis dumps.
 *
 * Also the path back from `<listKey>: []` to a block list: the range then
 * starts at the list key's colon and swallows the empty flow sequence, which
 * keeps this a single range rather than two edits a CRDT would have to order.
 */
export function addListItemEdit(
    source: string,
    listKey: string,
    pairs: readonly (readonly [string, string])[],
): TextRangeEdit | null {
    const body = parseListBody(source, listKey);
    if (!body || pairs.length === 0) return null;
    // All or nothing: one unrepresentable value would otherwise leave a
    // half-written item behind.
    const scalars = pairs.map(([, v]) => yamlScalar(v));
    if (scalars.some((s) => s === null)) return null;
    const row = pairs
        .map(([k], i) => `${i === 0 ? ITEM_MARKER : ITEM_INDENT}${k}: ${scalars[i]!}`)
        .join('\n');
    if (body.items.length === 0) {
        return { from: body.list.keyEnd, to: body.listEnd, insert: `\n${row}` };
    }
    return { from: body.listEnd, to: body.listEnd, insert: `\n${row}` };
}
