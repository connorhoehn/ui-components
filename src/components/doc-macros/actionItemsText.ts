// ui-components/src/components/doc-macros/actionItemsText.ts
//
// The `macro:action-items` payload, read and edited AS TEXT.
//
// ```macro:action-items
// items:
//   - status: pending
//     text: ship it
//   - assignee: ana
//     due: '2026-09-10'
//     status: done
//     text: wire it
// ```
//
// Those bytes are ground truth, not a sketch: they are what
// `serializeDocument({content:[{type:'macro',name:'action-items',data}]})` in
// distributed-core emits today (keys alphabetical from `sortKeys`, `due`
// single-quoted because js-yaml quotes any scalar that would otherwise resolve
// to a Date). `actionItemsMacroText` below reproduces them exactly, and
// `actionItemsText.test.ts` pins them — the same drift guard `diagramMacroText`
// uses for its one-key body.
//
// ---------------------------------------------------------------------------
// Why this reads the text and does not parse YAML
// ---------------------------------------------------------------------------
//
// Two reasons, and the second is the important one.
//
// 1. `macro.ts` established the rule for this package: `./diagram` has no YAML
//    parser, deliberately, so a canvas macro renderer stays importable by an
//    app that never took a chassis dependency. Pulling js-yaml (or
//    distributed-core) in here to read a four-key mapping would spend that.
//
// 2. **Editing the parsed form would be a second serialiser**, and
//    `macroText.ts` in realtime-modules exists to argue that there must not be
//    one. A macro's editor content IS the YAML body — the bytes between the
//    fences in the exported file are the bytes in the editor — so a renderer
//    that re-dumped the whole mapping on every tick would rewrite bytes nobody
//    touched: it would restyle a hand-quoted scalar, drop a comment, reorder a
//    hand-written key, and turn one person ticking item 3 into a whole-body
//    conflict with another person ticking item 1.
//
// So every mutation here is a MINIMAL single-range text edit — the range of one
// scalar, or one item's lines. Ticking `pending` -> `done` replaces exactly
// four characters. That is the shape `minimalEdit` in realtime-modules already
// argues for, arrived at from the other end: rather than diffing a re-dumped
// body down to its minimal edit, we never build the re-dumped body at all.
//
// The consequence is that this reads a RESTRICTED YAML subset — the shape the
// chassis emits, plus quoted scalars a foreign tool may have normalised — and
// returns `null` for anything else. `null` is a real answer, not a failure:
// the node view then shows the literal fence, which is what the format promises
// a reader who cannot draw the block. It is the same judgement `readDiagramId`
// makes when it refuses to guess an id from merge damage.

/** A single-range replacement, in offsets into the macro's text. */
export interface TextRangeEdit {
    from: number;
    to: number;
    insert: string;
}

/** One row of the checklist. */
export interface ActionItem {
    /** Position in `items`, 0-based. */
    index: number;
    /**
     * The `id:` scalar, or `null`.
     *
     * The JOIN KEY, and the reason it exists: an index is not an identity. An
     * item mirrored into a queryable row has to be findable again after
     * somebody inserts a line above it, and `items[2]` stops naming the same
     * work the moment they do. Absent until something needs the item to be
     * addressable — see `ensureItemIdEdit`.
     */
    id: string | null;
    /** The `text:` scalar. `''` when the item has no text yet. */
    text: string;
    /**
     * The `status:` scalar verbatim, or `''` when the item has no status key.
     *
     * NOT normalised to a known set. A status this package has never heard of
     * is shown to the reader as it is written rather than coerced to
     * `pending` — the block is a view of the document, and silently relabelling
     * someone's `blocked` as `pending` is a lie about what the file says.
     */
    status: string;
    /** True only for the literal status `done`. */
    done: boolean;
    assignee: string | null;
    due: string | null;
}

/** The status a tick sets, and the one un-ticking restores. */
export const STATUS_DONE = 'done';
export const STATUS_PENDING = 'pending';

/** The `macro:<name>` discriminator for a checklist. */
export const ACTION_ITEMS_MACRO_NAME = 'action-items';

/**
 * The `category` a section-item row carries so it is recognisably an action
 * item rather than a mirrored callout.
 *
 * The inbox splits one query on this field: `hitl` rows are decisions and
 * everything else is a task, so the value matters less than its NOT being
 * `hitl` — a to-do that arrived with an Acknowledge button where an agent was
 * waiting for an answer would retire the row for the person and leave the
 * agent parked.
 */
export const ACTION_ITEM_CATEGORY = 'action-item';

// ---------------------------------------------------------------------------
// Reading
// ---------------------------------------------------------------------------

interface Scalar {
    value: string;
    /** Offset of the first character of the value, in the macro's text. */
    from: number;
    /** Offset one past the last character of the value. */
    to: number;
}

interface Entry {
    key: string;
    /** Offset one past the `:` that ends the key. */
    keyEnd: number;
    scalar: Scalar;
    /** Offset of the first character of the line holding this entry. */
    lineStart: number;
    /** Offset of the newline ending this line, or the end of the source. */
    lineEnd: number;
}

interface RawItem {
    entries: Entry[];
    lineStart: number;
    lineEnd: number;
}

interface ParsedBody {
    items: RawItem[];
    /** The `items:` entry. Its scalar is `[]` for an empty list, `''` otherwise. */
    list: Entry;
    /**
     * Offset one past the last item's last line — or one past `items:` itself
     * when the list is empty. Everything an edit may replace ends here.
     */
    listEnd: number;
}

const KEY_RE = /^([A-Za-z][A-Za-z0-9_-]*):/;
const ITEM_MARKER = '  - ';
const ITEM_INDENT = '    ';

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
 * The document shape, or `null` when the body is not one this package can edit
 * safely.
 */
function parseBody(source: string): ParsedBody | null {
    const all = lines(source);
    let i = 0;
    while (i < all.length && all[i]!.text.trim() === '') i += 1;
    const head = all[i];
    if (!head) return null;

    const listEntry = parseEntry(head.text, head.start, 0);
    if (!listEntry || listEntry.key !== 'items') return null;
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

function entryOf(item: RawItem, key: string): Entry | undefined {
    return item.entries.find((e) => e.key === key);
}

/**
 * The checklist a macro body describes, or `null` when the body is not the
 * shape this renderer edits.
 */
export function readActionItems(source: string): ActionItem[] | null {
    const body = parseBody(source);
    if (!body) return null;
    return body.items.map((item, index) => {
        const status = entryOf(item, 'status')?.scalar.value ?? '';
        return {
            index,
            id: entryOf(item, 'id')?.scalar.value ?? null,
            text: entryOf(item, 'text')?.scalar.value ?? '',
            status,
            done: status === STATUS_DONE,
            assignee: entryOf(item, 'assignee')?.scalar.value ?? null,
            due: entryOf(item, 'due')?.scalar.value ?? null,
        };
    });
}

// ---------------------------------------------------------------------------
// Writing — one range, never the whole body
// ---------------------------------------------------------------------------

/**
 * A scalar as YAML.
 *
 * Conservative on purpose: plain style only for values that can carry no other
 * reading, single-quoted (with `''` for an embedded quote) otherwise. js-yaml
 * would leave more of these plain, and that divergence is harmless — an
 * exported file is re-dumped from the PARSED data by the chassis, so what
 * matters is that these bytes parse back to the same string, which is what
 * `actionItemsText.test.ts` asserts.
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
export function setItemKeyEdit(
    source: string,
    index: number,
    key: string,
    value: string,
): TextRangeEdit | null {
    const body = parseBody(source);
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
 * `insertionFor`, and the only honest way to say "unassigned".
 *
 * Writing `assignee: ''` would say something different: the item HAS an
 * assignee whose id is the empty string, which renders as a `@` chip pointing
 * at nobody and matches nobody's inbox. Absent is what unassigned means in this
 * format, so unassigning has to remove the line.
 *
 * Returns `null` when the key is not there (nothing to do) and when it is the
 * item's only entry, which would leave a bare `-` marker that reparses as a
 * null item — merge damage rather than an empty field.
 */
export function removeItemKeyEdit(source: string, index: number, key: string): TextRangeEdit | null {
    const body = parseBody(source);
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
 * Gives one item an `id`, if it has none — the edit that makes it addressable.
 *
 * Minted lazily rather than at insert, and that is the whole design: an id in
 * every checklist would put a UUID in front of every reader of the exported
 * markdown for the sake of items nothing outside the page will ever ask about.
 * An item becomes addressable when somebody assigns it, which is also the
 * moment a row is worth writing.
 *
 * `mint` is injected so a caller can make the id deterministic; the default is
 * `crypto.randomUUID` where it exists, falling back to a time-plus-random
 * string for a JSDOM-shaped environment that has no WebCrypto.
 */
export function ensureItemIdEdit(
    source: string,
    index: number,
    mint: () => string = defaultItemId,
): TextRangeEdit | null {
    const body = parseBody(source);
    const item = body?.items[index];
    if (!item) return null;
    if (entryOf(item, 'id')) return null; // already addressable
    return setItemKeyEdit(source, index, 'id', mint());
}

function defaultItemId(): string {
    const c = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
    if (c?.randomUUID) return c.randomUUID();
    return `ai-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

// ---------------------------------------------------------------------------
// The mirror row
// ---------------------------------------------------------------------------

/**
 * What one action item looks like to something that has never opened the
 * document — the whole of it, in one place, so the document half and the host
 * half cannot disagree about what is visible outside the page.
 *
 * The same problem `HitlMirrorRow` solves and for the same reason: a checklist
 * lives in a Y.Doc, there is no server-side Y.Doc, and scanning every document
 * for assigned work is O(all documents) of CRDT sync to draw one list. So the
 * body keeps the record and a row carries the queryable half.
 *
 * `assigneeId`, not a name: the cross-document query is keyed on the auth
 * subject. `dueDate` rather than `due`, because that is what the row field is
 * called and a rename here would silently drop every deadline.
 */
export interface ActionItemMirrorRow {
    itemId: string;
    text: string;
    assigneeId: string;
    category: typeof ACTION_ITEM_CATEGORY;
    dueDate: string | null;
    /** Terminal work. The row's status follows the tick, so a finished item
     *  leaves the assignee's inbox instead of nagging them forever. */
    done: boolean;
}

/**
 * The row for one item, or `null` when there is nothing anybody could query.
 *
 * Three ways to be unmirrorable, all legal in a body: no id (nothing to key
 * on), nobody assigned (a row in nobody's inbox), and no text (a row that says
 * nothing to the person who finds it).
 */
export function actionItemMirrorRow(item: ActionItem): ActionItemMirrorRow | null {
    if (!item.id || !item.assignee || !item.text) return null;
    return {
        itemId: item.id,
        text: item.text,
        assigneeId: item.assignee,
        category: ACTION_ITEM_CATEGORY,
        dueDate: item.due,
        done: item.done,
    };
}

/** Ticking, as an edit. `pending` <-> `done`, four characters. */
export function toggleItemEdit(source: string, index: number): TextRangeEdit | null {
    const items = readActionItems(source);
    const item = items?.[index];
    if (!item) return null;
    return setItemKeyEdit(source, index, 'status', item.done ? STATUS_PENDING : STATUS_DONE);
}

/** Retitling, as an edit. */
export function setItemTextEdit(source: string, index: number, text: string): TextRangeEdit | null {
    return setItemKeyEdit(source, index, 'text', text);
}

/**
 * The edit that removes one item — its lines AND the break that separated them
 * from their neighbour, so nothing is left behind that would reparse
 * differently.
 *
 * Removing the last remaining item writes `items: []` rather than a bare
 * `items:`, because a bare key parses as `null`, not as an empty list: the
 * block would come back as merge damage rather than as an empty checklist.
 */
export function removeItemEdit(source: string, index: number): TextRangeEdit | null {
    const body = parseBody(source);
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
 * The edit that appends a pending item.
 *
 * Also the path back from `items: []` to a block list: the range then starts at
 * the `items:` colon and swallows the empty flow sequence, which keeps this a
 * single range rather than two edits a CRDT would have to order.
 */
export function addItemEdit(source: string, text: string): TextRangeEdit | null {
    const body = parseBody(source);
    if (!body) return null;
    const scalar = yamlScalar(text);
    if (scalar === null) return null;
    const row = `${ITEM_MARKER}status: ${STATUS_PENDING}\n${ITEM_INDENT}text: ${scalar}`;
    if (body.items.length === 0) {
        return { from: body.list.keyEnd, to: body.listEnd, insert: `\n${row}` };
    }
    return { from: body.listEnd, to: body.listEnd, insert: `\n${row}` };
}

// ---------------------------------------------------------------------------
// Creating
// ---------------------------------------------------------------------------

/**
 * The macro body for a checklist — byte-identical to what the chassis
 * serializer writes between the fences, with no trailing newline (the closing
 * fence supplies the final break, exactly as `macroTextFromData` returns it).
 */
export function actionItemsMacroText(
    items: readonly { text: string; status?: string; assignee?: string; due?: string }[],
): string {
    if (items.length === 0) return 'items: []';
    const rows = items.map((item) => {
        // Alphabetical, because `sortKeys: true` is what the chassis dumps.
        const pairs: [string, string][] = [];
        if (item.assignee) pairs.push(['assignee', item.assignee]);
        if (item.due) pairs.push(['due', item.due]);
        pairs.push(['status', item.status ?? STATUS_PENDING]);
        pairs.push(['text', item.text]);
        return pairs
            .map(([k, v], i) => `${i === 0 ? ITEM_MARKER : ITEM_INDENT}${k}: ${yamlScalar(v) ?? "''"}`)
            .join('\n');
    });
    return ['items:', ...rows].join('\n');
}
