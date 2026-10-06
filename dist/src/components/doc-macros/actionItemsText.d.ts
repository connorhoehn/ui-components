import { yamlScalar, type TextRangeEdit } from './macroListText';
export { yamlScalar };
export type { TextRangeEdit };
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
export declare const STATUS_DONE = "done";
export declare const STATUS_PENDING = "pending";
/** The `macro:<name>` discriminator for a checklist. */
export declare const ACTION_ITEMS_MACRO_NAME = "action-items";
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
export declare const ACTION_ITEM_CATEGORY = "action-item";
/** The edit that sets one key on one action item. */
export declare function setItemKeyEdit(source: string, index: number, key: string, value: string): TextRangeEdit | null;
/**
 * The edit that takes one key OFF one item, and the only honest way to say
 * "unassigned": writing `assignee: ''` would say the item HAS an assignee
 * whose id is the empty string, which matches nobody's inbox.
 */
export declare function removeItemKeyEdit(source: string, index: number, key: string): TextRangeEdit | null;
/**
 * The checklist a macro body describes, or `null` when the body is not the
 * shape this renderer edits.
 */
export declare function readActionItems(source: string): ActionItem[] | null;
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
export declare function ensureItemIdEdit(source: string, index: number, mint?: () => string): TextRangeEdit | null;
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
export declare function actionItemMirrorRow(item: ActionItem): ActionItemMirrorRow | null;
/** Ticking, as an edit. `pending` <-> `done`, four characters. */
export declare function toggleItemEdit(source: string, index: number): TextRangeEdit | null;
/** Retitling, as an edit. */
export declare function setItemTextEdit(source: string, index: number, text: string): TextRangeEdit | null;
/**
 * The edit that removes one item — its lines AND the break that separated them
 * from their neighbour, so nothing is left behind that would reparse
 * differently.
 *
 * Removing the last remaining item writes `items: []` rather than a bare
 * `items:`, because a bare key parses as `null`, not as an empty list: the
 * block would come back as merge damage rather than as an empty checklist.
 */
export declare function removeItemEdit(source: string, index: number): TextRangeEdit | null;
/**
 * The edit that appends a pending item.
 *
 * Also the path back from `items: []` to a block list: the range then starts at
 * the `items:` colon and swallows the empty flow sequence, which keeps this a
 * single range rather than two edits a CRDT would have to order.
 */
export declare function addItemEdit(source: string, text: string): TextRangeEdit | null;
/**
 * The macro body for a checklist — byte-identical to what the chassis
 * serializer writes between the fences, with no trailing newline (the closing
 * fence supplies the final break, exactly as `macroTextFromData` returns it).
 */
export declare function actionItemsMacroText(items: readonly {
    text: string;
    status?: string;
    assignee?: string;
    due?: string;
}[]): string;
//# sourceMappingURL=actionItemsText.d.ts.map