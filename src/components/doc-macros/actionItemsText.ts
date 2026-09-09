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

import {
    addListItemEdit,
    entryOf,
    ITEM_INDENT,
    ITEM_MARKER,
    parseListBody,
    removeListItemEdit,
    removeListItemKeyEdit,
    setListItemKeyEdit,
    yamlScalar,
    type TextRangeEdit,
} from './macroListText';

export { yamlScalar };
export type { TextRangeEdit };

/**
 * The top-level key. `macroListText` holds the arithmetic for every plural
 * macro; this file is that arithmetic bound to `items:` plus everything an
 * action item means on top of it.
 */
const LIST_KEY = 'items';
const parseBody = (source: string) => parseListBody(source, LIST_KEY);

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

/** The edit that sets one key on one action item. */
export function setItemKeyEdit(
    source: string,
    index: number,
    key: string,
    value: string,
): TextRangeEdit | null {
    return setListItemKeyEdit(source, LIST_KEY, index, key, value);
}

/**
 * The edit that takes one key OFF one item, and the only honest way to say
 * "unassigned": writing `assignee: ''` would say the item HAS an assignee
 * whose id is the empty string, which matches nobody's inbox.
 */
export function removeItemKeyEdit(source: string, index: number, key: string): TextRangeEdit | null {
    return removeListItemKeyEdit(source, LIST_KEY, index, key);
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
    return removeListItemEdit(source, LIST_KEY, index);
}

/**
 * The edit that appends a pending item.
 *
 * Also the path back from `items: []` to a block list: the range then starts at
 * the `items:` colon and swallows the empty flow sequence, which keeps this a
 * single range rather than two edits a CRDT would have to order.
 */
export function addItemEdit(source: string, text: string): TextRangeEdit | null {
    // Alphabetical, because `sortKeys: true` is what the chassis dumps.
    return addListItemEdit(source, LIST_KEY, [
        ['status', STATUS_PENDING],
        ['text', text],
    ]);
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
