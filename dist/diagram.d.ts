import { AwarenessLike } from '@connorhoehn/realtime-modules/adapters/excalidraw';
import { DiagramCollaborator } from '@connorhoehn/realtime-modules/adapters/excalidraw';
import { EditorView } from '@tiptap/pm/view';
import { Extension } from '@tiptap/core';
import { JSX } from 'react';
import { Node as Node_2 } from '@tiptap/pm/model';
import { NodeView } from '@tiptap/pm/view';
import { Plugin as Plugin_2 } from '@tiptap/pm/state';
import { PluginKey } from '@tiptap/pm/state';
import { ReactElement } from 'react';
import { RefObject } from 'react';
import type * as Y from 'yjs';

/** True when a node's text is an attachment body we would draw. */
export declare function acceptsAttachment(source: string): boolean;

/**
 * True when a node's text is a decision body we would draw.
 *
 * Needed for the way BACK, and this is the subtle one: a rendered card has no
 * `contentDOM`, but a plain fence does, so ProseMirror updates the fence in
 * place and never asks for a new view. Without an explicit accept test, a
 * person repairing broken YAML by hand would keep looking at a fence forever.
 * `ActionItemsMacro` learned this the hard way; the note is repeated because
 * the next renderer will need it too.
 */
export declare function acceptsDecision(source: string): boolean;

/**
 * True when a node's text is a field body we would draw.
 *
 * Needed for the way BACK, and this is the subtle one: a rendered block has no
 * `contentDOM`, but a plain fence DOES, so ProseMirror updates the fence in
 * place and never asks for a new view. Without an explicit accept test, a
 * person repairing broken YAML by hand would keep looking at a fence forever.
 * `ActionItemsMacro` learned this the hard way; the note is repeated because
 * every renderer needs it.
 */
export declare function acceptsField(source: string): boolean;

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

/** The `macro:<name>` discriminator for a checklist. */
export declare const ACTION_ITEMS_MACRO_NAME = "action-items";

/** One row of the checklist. */
export declare interface ActionItem {
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
export declare interface ActionItemMirrorRow {
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

export declare function ActionItemsBlock({ items, editable, onToggle, onTextChange, onRemoveItem, onAddItem, onRemove, people, onAssign, onDue, 'data-testid': testId, }: ActionItemsBlockProps): JSX.Element;

export declare interface ActionItemsBlockProps {
    items: readonly ActionItem[];
    /** False renders the checklist as a read-only list — no ticking, no edits. */
    editable?: boolean;
    onToggle?: (index: number) => void;
    onTextChange?: (index: number, text: string) => void;
    onRemoveItem?: (index: number) => void;
    onAddItem?: () => void;
    /** Takes the whole block off the page. Omitted when not editable. */
    onRemove?: () => void;
    /**
     * Who an item can be assigned to.
     *
     * The format has carried `assignee:` since it was written and this block
     * has always DISPLAYED it — an `@ana` chip — with nothing anywhere able to
     * SET it. So an action item created on a canvas could never be assigned,
     * and the inbox's Tasks lane could never be filled from the document shape
     * this product is moving to. Meanwhile Data Types ships a built-in whose
     * own description is "Task List — ASSIGNABLE action items with status
     * tracking", and the HITL callout next door has had a working picker all
     * along.
     *
     * Omitted renders no picker, which is right for a host with no directory:
     * a control listing nobody is worse than none.
     */
    people?: readonly AssignablePerson[];
    /** Only ever called with an id from `people`, or `''` to unassign. */
    onAssign?: (index: number, assigneeId: string) => void;
    /**
     * Sets `due:` on one item, or clears it with `''`.
     *
     * Same gap the assignee had: the format has always carried `due:` and this
     * block has always drawn the chip, with nothing able to write one. A
     * deadline that can only be typed by hand-editing the fence is a deadline
     * nobody sets, and `ActionItemMirrorRow.dueDate` — already projected into
     * the inbox row — was therefore always null.
     *
     * Omitted renders the chip and no control, which is what a read-only view
     * wants.
     */
    onDue?: (index: number, due: string) => void;
    'data-testid'?: string;
}

export declare const ActionItemsMacro: Extension<ActionItemsMacroOptions, any>;

export declare interface ActionItemsMacroOptions {
    /**
     * Who an item can be assigned to. `id` is the AUTH SUBJECT, because that
     * is what `/api/items/mine` queries on — a display name here is what once
     * left that endpoint unable to find a single assigned item.
     *
     * Read through a getter for the same reason `HitlMacroOptions.people` is:
     * a roster arrives after the editor is built and changes while it is open,
     * and an extension configured once must not freeze the first list it saw.
     *
     * Omitted renders no picker, which is the right answer for a host with no
     * directory: a control listing nobody is worse than no control.
     */
    people?: () => readonly AssignablePerson[];
    /**
     * An item's QUERYABLE fields changed, so the host's row should be brought
     * in line with them: on insert, on a reassignment, on a tick, and whenever
     * a peer changes any of them through the CRDT.
     *
     * Fires on every client that has the page open, which is why a host's
     * write has to be idempotent — a projection maintained by one designated
     * client would stop being maintained the moment that client closed the
     * tab. `ActionItemsMacroOptions` says nothing about how the row is stored;
     * see `actionItemMirrorRow` for what is in it and why an unassigned or
     * unidentified item produces nothing at all.
     *
     * Omitted means document-only, which is honest: with no host reading the
     * rows, nothing outside the page is out of step with the body.
     */
    onItemChanged?: (row: ActionItemMirrorRow) => void;
}

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

/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent.
 */
export declare function actionItemsRenderer(options?: ActionItemsMacroOptions): MacroRenderer;

/**
 * The edit that appends a pending item.
 *
 * Also the path back from `items: []` to a block list: the range then starts at
 * the `items:` colon and swallows the empty flow sequence, which keeps this a
 * single range rather than two edits a CRDT would have to order.
 */
export declare function addItemEdit(source: string, text: string): TextRangeEdit | null;

/**
 * The edit that appends a row.
 *
 * Both keys are always written, even empty, so the row has two entries from
 * the start: `removeListItemKeyEdit` declines to strip an item's only entry
 * (it would leave a bare `-` marker), and a row that began with one key would
 * therefore be uneditable in one direction.
 */
export declare function addLinkEdit(source: string, label?: string, url?: string): TextRangeEdit | null;

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

/**
 * The edit that answers a callout — ONE range, always.
 *
 * Replaces an existing answer where one is already recorded and can be
 * replaced in a single step; inserts the trio otherwise. Returns `null` when
 * there is nothing to do, when the body is not editable, or when the existing
 * answer is not contiguous (see `answerRange`).
 *
 * `by` and `at` are optional: an answer with no attribution is still an
 * answer, and inventing `answeredBy: 'someone'` would be worse than the field
 * being absent.
 */
export declare function answerHitlEdit(source: string, params: {
    answer: string;
    by?: string;
    at?: string;
}): TextRangeEdit | null;

/**
 * One candidate assignee.
 *
 * Same shape as `HitlPerson`, and for the same load-bearing reason: `id` is
 * the AUTH SUBJECT, because that is what `/api/items/mine` queries on. Writing
 * a display name here is what once left that endpoint unable to find a single
 * assigned item. The name is a label and is never written into the body.
 */
export declare interface AssignablePerson {
    id: string;
    name: string;
}

export declare interface Attachment {
    /** Original filename. User content — shown, never used as a path. */
    name: string;
    /** Bytes, or `null` when the body does not say. */
    size: number | null;
    /** Declared MIME type, or `''`. Picks a layout; is never trusted. */
    type: string;
    /** Where the bytes are, VERBATIM. */
    url: string;
}

/** The `macro:<name>` discriminator for a file. */
export declare const ATTACHMENT_MACRO_NAME = "attachment";

export declare function AttachmentBlock({ attachment, editable, href, onOpen, previewSrc, onRemove, 'data-testid': testId, }: AttachmentBlockProps): JSX.Element;

export declare interface AttachmentBlockProps {
    attachment: Attachment;
    /** False hides the Remove control. Opening is never gated on it. */
    editable?: boolean;
    /** A directly-followable URL. Ignored when `onOpen` is given. */
    href?: string | null;
    /** The host opens it with credentials. Wins over `href`. */
    onOpen?: () => void;
    /**
     * A renderable `src` for an image attachment — an object URL the host
     * resolved, or `null` while it has not / could not. Only consulted when
     * `type` is `image/*`.
     */
    previewSrc?: string | null;
    onRemove?: () => void;
    'data-testid'?: string;
}

export declare interface AttachmentDraft {
    name: string;
    size?: number;
    type?: string;
    url: string;
}

/**
 * The `href` a reader may follow directly, or `null` when the host must
 * resolve it (a hosted upload) or when it is unsafe (anything `linkHref`
 * refuses). Callers check `isHostedUpload` first to tell the two apart.
 */
export declare function attachmentHref(a: Attachment): string | null;

export declare const AttachmentMacro: Extension<AttachmentMacroOptions, any>;

export declare interface AttachmentMacroOptions {
    /**
     * Show the file to the reader, with whatever credentials the host has.
     * Called for hosted uploads always, and for absolute URLs too when given —
     * the host may prefer its own viewer to a new tab.
     */
    open?: (attachment: Attachment) => void;
    /**
     * A renderable `src` for an image attachment, or `null` when it cannot be
     * had. Only asked for `image/*`. The host owns the object URL's lifetime;
     * the view never revokes what it did not create.
     */
    resolve?: (attachment: Attachment) => Promise<string | null>;
}

/**
 * The macro body for a file — alphabetical keys, because `sortKeys: true` is
 * what the chassis dumps, and no trailing newline (the closing fence supplies
 * it). `size:` is written plain: js-yaml leaves an integer bare.
 */
export declare function attachmentMacroText(draft: AttachmentDraft): string;

export declare function attachmentRenderer(options?: AttachmentMacroOptions): MacroRenderer;

/**
 * The edit that records who decided, and when.
 *
 * Separate from the status change on purpose — see above. Both land in the
 * same ProseMirror transaction when a caller dispatches them together, but a
 * caller with only one of the two facts can write just that one.
 */
export declare function attributeDecisionEdit(source: string, params: {
    by?: string;
    at?: string;
}): TextRangeEdit | null;

export declare function CollaborativeExcalidraw(props: CollaborativeExcalidrawProps): JSX.Element;

/**
 * Bootstrap mode — the component owns the whole collaboration stack.
 *
 * Point it at a gateway and a diagram id and it builds the WebSocket, the
 * Y.Doc and the provider itself. Callers never construct a provider stack by
 * hand; that complexity is this library's job to absorb.
 */
export declare interface CollaborativeExcalidrawBootstrapProps extends SharedDiagramProps {
    /** Gateway WebSocket URL, e.g. `wss://gateway.example.com/ws`. */
    gatewayUrl: string;
    /**
     * Diagram id. Subscribes to `doc:${diagramId}`.
     *
     * The gateway caps channel names at 50 characters and allows only
     * `[a-zA-Z0-9_:-]`, so the id must be <= 46 chars with no dots or slashes.
     * A raw UUID fits.
     */
    diagramId: string;
    /** Bearer-style token forwarded as Sec-WebSocket-Protocol. May be ''. */
    authToken: string;
    /**
     * Wait for the server's first snapshot before mounting the canvas.
     *
     * Unlike the text editor, a cold open here is not corrupting — a CRDT
     * merges early strokes with the server state rather than fighting it. So
     * this defaults to false, and is offered for hosts that would simply
     * rather show a spinner than a scene that fills in.
     */
    requireSync?: boolean;
    /** Shown while the Y.Doc is still being built. */
    loadingSlot?: React.ReactNode;
    ydoc?: undefined;
    awareness?: undefined;
}

/**
 * Hosted mode — the caller already has a Y.Doc.
 *
 * This is the mode a page/canvas host uses: the PAGE owns one Y.Doc and one
 * WebSocket, and each diagram block is a namespaced subtree of it.
 */
export declare interface CollaborativeExcalidrawHostedProps extends SharedDiagramProps {
    ydoc: Y.Doc;
    /**
     * Awareness from the same provider that owns `ydoc`. Pass
     * `provider.awareness`. Omit only if you genuinely want no live pointers.
     */
    awareness?: AwarenessLike | null;
    gatewayUrl?: undefined;
    diagramId?: undefined;
    authToken?: undefined;
}

export declare type CollaborativeExcalidrawProps = CollaborativeExcalidrawHostedProps | CollaborativeExcalidrawBootstrapProps;

export declare function createMacroRendererRegistry(renderers?: readonly MacroRenderer[]): MacroRendererRegistry;

export declare interface Decision {
    /** The decision itself, stated as a claim. Required; without it, no card. */
    decision: string;
    status: DecisionStatus;
    /** Why. Optional, and the field most worth writing. */
    rationale: string;
    /** What else was weighed. One per line in the source. */
    alternatives: string[];
    decidedBy: string;
    decidedAt: string;
    /**
     * What replaced this one. Only meaningful with `status: superseded`, and
     * free text on purpose — it may name a decision in another document, or
     * one that does not exist yet.
     */
    supersededBy: string;
    /** Stable id, when the body carries one. */
    id: string;
}

export declare const DECISION_MACRO_NAME = "decision";

/**
 * Why a decision, unlike a HITL callout, needs no queryable mirror.
 *
 * A callout blocks an agent, so something outside the document has to be able
 * to see it was answered — hence `HITL_QUERYABILITY` and the section-item row.
 * Nothing polls a decision. It is read by people, in the document that argued
 * for it, which is the only place its rationale exists. Mirroring it would
 * create a second copy to keep honest for no reader.
 *
 * If a decision index is ever wanted, that is a scan built deliberately, not a
 * write-through this block should be doing on the side.
 */
export declare const DECISION_QUERYABILITY: string;

/** The lifecycle, in the order the UI presents it. */
export declare const DECISION_STATUSES: readonly ["proposed", "accepted", "rejected", "superseded"];

export declare function DecisionBlock({ decision, editable, onStatusChange, onSupersededBy, onRemove, testId, }: DecisionBlockProps): JSX.Element;

export declare interface DecisionBlockProps {
    decision: Decision;
    /** False in read/print, and for a reader without write access. */
    editable?: boolean;
    onStatusChange?: (status: DecisionStatus) => void;
    onSupersededBy?: (ref: string) => void;
    onRemove?: () => void;
    testId?: string;
}

export declare interface DecisionDraft {
    decision: string;
    status?: DecisionStatus;
    rationale?: string;
    alternatives?: readonly string[];
    decidedBy?: string;
    decidedAt?: string;
    id?: string;
}

export declare const DecisionMacro: Extension<DecisionMacroOptions, any>;

export declare interface DecisionMacroOptions {
    /**
     * Who is changing the status, for `decidedBy`. A string or a getter,
     * because the signed-in user outlives no editor and a host should not have
     * to rebuild the extension when it changes.
     *
     * Omitted writes no attribution at all, which is the honest result of not
     * knowing — inventing `decidedBy: someone` would be worse.
     */
    decidedBy?: string | (() => string | undefined);
    /** The clock, for `decidedAt`. Defaults to `Date.now`. */
    now?: () => number;
}

/**
 * The YAML body for a new decision block, keys sorted, `alternatives:` last.
 *
 * Sorted because that is what the chassis emits and what `insertionFor`
 * assumes; `alternatives` last because it is the only multi-line value and a
 * scalar key landing after it would reparse as one of its members.
 */
export declare function decisionMacroText(draft: DecisionDraft): string;

/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent, and the options
 * are the same either way.
 */
export declare function decisionRenderer(options?: DecisionMacroOptions): MacroRenderer;

export declare type DecisionStatus = (typeof DECISION_STATUSES)[number];

/** The `macro:<name>` discriminator for an embedded diagram. */
export declare const DIAGRAM_MACRO_NAME = "diagram";

export declare interface DiagramBlockProps {
    /**
     * The diagram's id — the reference the macro body carries.
     *
     * `null` means the macro's YAML no longer says anything readable (a CRDT
     * merge of two concurrent rewrites can do that). The block then shows the
     * source instead of inventing an id, because inventing one would silently
     * start a SECOND, empty diagram and lose the first.
     */
    diagramId: string | null;
    /** The macro's literal body, shown when `diagramId` is null. */
    source?: string;
    /** The page's shared document. Null when the page is not connected. */
    ydoc: unknown;
    /** Awareness from the provider that owns `ydoc`, for live pointers. */
    awareness?: AwarenessLike | null;
    /**
     * False renders Excalidraw in view mode AND drops every local write — see
     * `ExcalidrawCanvas`. It is not a toolbar toggle.
     */
    editable?: boolean;
    user: DiagramBlockUser;
    /** Where Excalidraw loads its fonts from, e.g. `/excalidraw-assets/`. */
    assetPath?: string;
    /**
     * Removes the whole block from the page.
     *
     * Its absence is what makes the block read-only-shaped: with no contentDOM
     * the node view swallows its own events, so a click cannot select the node
     * and a backspace cannot reach it. An embedded object a reader can never
     * delete is a bug, so the editing host passes this and the header renders
     * the one affordance that removes it.
     */
    onRemove?: () => void;
    'data-testid'?: string;
}

export declare function DiagramBlockRenderer({ diagramId, source, ydoc, awareness, editable, user, assetPath, onRemove, 'data-testid': testId, }: DiagramBlockProps): JSX.Element;

/** Local identity, as the diagram's awareness pointers should label it. */
export declare interface DiagramBlockUser {
    name: string;
    color: string;
    userId?: string;
}

export declare const DiagramMacro: Extension<DiagramMacroOptions, MacroRendererStorage>;

/**
 * Everything a diagram block needs that the document does not carry.
 *
 * Supplied through a GETTER rather than as plain options, for the reason
 * `CommentHighlight` documents: ProseMirror builds its plugin list once at
 * editor construction, so a value baked in here would be the one captured on
 * the first render and consulted forever. The host holds these in a ref and the
 * node view asks for them at paint time.
 */
export declare interface DiagramMacroContext {
    /** The page's Y.Doc — the same one Collaboration is bound to. */
    ydoc: unknown;
    /** Awareness from the provider that owns `ydoc`. */
    awareness?: AwarenessLike | null;
    user: DiagramBlockUser;
    /** Where Excalidraw loads its fonts from, e.g. `/excalidraw-assets/`. */
    assetPath?: string;
}

export declare interface DiagramMacroOptions {
    getContext: () => DiagramMacroContext | null;
}

/**
 * @deprecated The `macro` node view is now the registry's single plugin, keyed
 * by `macroRenderersPluginKey`. This key no longer belongs to any plugin and is
 * kept only so a pinned consumer that imports it keeps compiling.
 */
export declare const diagramMacroPluginKey: PluginKey<any>;

/**
 * The macro body for a diagram — byte-identical to what the chassis serializer
 * writes between the fences, with no trailing newline (the closing fence
 * supplies the final break, exactly as `macroTextFromData` returns it).
 */
export declare function diagramMacroText(id: string): string;

/**
 * What a reader can do with a person on the presence bar. Absent, the bar
 * is a roster and nothing more; present, the bar opens a menu of the people
 * on it with these actions per person. Each is optional so a host offers
 * only what it can back — a host with no calling offers no Call.
 */
export declare interface DiagramPresenceActions {
    onMessage?: (person: DiagramPresencePerson) => void;
    onCall?: (person: DiagramPresencePerson) => void;
    onFollow?: (person: DiagramPresencePerson) => void;
}

export declare function DiagramPresenceBar({ participants, size, actions, followingUserId, className, 'data-testid': testId, }: DiagramPresenceBarProps): JSX.Element;

export declare interface DiagramPresenceBarProps {
    participants: DiagramCollaborator[];
    size?: number;
    /**
     * What a reader can do with each person. With any of these the bar is a
     * button: click it and every OTHER person on the diagram is listed with
     * the actions the host backs. Without them it is a roster.
     */
    actions?: DiagramPresenceActions;
    /** Whose viewport the reader is following, so the menu can offer to stop. */
    followingUserId?: string | null;
    className?: string;
    'data-testid'?: string;
}

/** One person on the diagram's presence bar, as handed to an action. */
export declare interface DiagramPresencePerson {
    userId: string;
    clientId: string;
    displayName: string;
    color: string;
}

/**
 * The diagram renderer.
 *
 * Exported so a host can drop it straight into `MacroRenderers.configure({
 * renderers: [...] })` instead of registering this extension. The two are
 * equivalent; the extension additionally brings `insertDiagram`.
 */
export declare function diagramRenderer(options: DiagramMacroOptions): MacroRenderer;

export declare interface DiagramUser {
    /** Stable identity (Cognito sub). Used to label your cursor for peers. */
    userId?: string;
    displayName: string;
    color: string;
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
export declare function ensureItemIdEdit(source: string, index: number, mint?: () => string): TextRangeEdit | null;

declare interface Entry {
    key: string;
    /** Offset one past the `:` that ends the key. */
    keyEnd: number;
    scalar: Scalar;
    /** Offset of the first character of the line holding this entry. */
    lineStart: number;
    /** Offset of the newline ending this line, or the end of the source. */
    lineEnd: number;
}

/** Props of the lazily-loaded canvas — always fully resolved by this point. */
export declare interface ExcalidrawCanvasProps extends SharedDiagramProps {
    ydoc: Y.Doc | null;
    awareness?: AwarenessLike | null;
}

export declare const FIELD_MACRO_NAME = "field";

/**
 * Why a typed field, like a decision and unlike a HITL callout, needs no
 * queryable mirror.
 *
 * The temptation is real here: a typed value is the one macro payload that
 * plausibly WANTS an index — "every document with a target date in Q4". But a
 * mirror is a second copy to keep honest on every keystroke, and the moment it
 * exists a stale row misreports a real budget. If a field index is wanted it
 * should be a deliberate scan over the document bodies, which are already the
 * authoritative store, not a write-through this block does on the side.
 */
export declare const FIELD_QUERYABILITY: string;

/** The types, in the order the type picker offers them. */
export declare const FIELD_TYPES: readonly ["text", "date", "number", "boolean"];

export declare function FieldBlock({ field, editable, onValueChange, onLabelChange, onTypeChange, onRemove, testId, }: FieldBlockProps): JSX.Element;

/**
 * An in-progress edit of one control, held in BOTH state and a ref.
 *
 * `null` means "follow the document": a draft exists only while somebody is
 * typing into this row and is dropped on commit or cancel, so a value changed
 * by a collaborator lands immediately in every row nobody is holding and never
 * yanks the characters out from under one they are.
 *
 * The ref is not redundant. Escape must cancel, and cancelling is `set(null)`
 * followed by `blur()` — but `blur` fires SYNCHRONOUSLY, before React has
 * re-rendered, so the blur handler's closure still sees the abandoned draft and
 * commits exactly what Escape was pressed to discard. Measured: typing "x" into
 * "Ada" and pressing Escape wrote "Adax". The ref is what the handlers read;
 * the state is only what the input renders.
 */
export declare interface FieldBlockProps {
    field: TypedField;
    /** False in read/print, and for a reader without write access. */
    editable?: boolean;
    /** `undefined` clears the field — see `setFieldValueEdit`. */
    onValueChange?: (value: string | undefined) => void;
    onLabelChange?: (label: string) => void;
    onTypeChange?: (type: FieldType) => void;
    onRemove?: () => void;
    testId?: string;
}

/**
 * Yes/no answer, or `undefined` when nobody answered.
 *
 * Strict on purpose, exactly as `readBooleanValue` is: a missing or unreadable
 * value must never render as "No". "Approved: no" and "nobody has said" are
 * different sentences and only one of them is safe to act on.
 */
export declare function fieldBoolean(field: TypedField): boolean | undefined;

/** Calendar date as `YYYY-MM-DD` (what `<input type="date">` speaks), or `''`. */
export declare function fieldDate(field: TypedField): string;

export declare interface FieldDraft {
    label: string;
    type?: FieldType;
    /** Omitted means unanswered, which is the normal state of a new field. */
    value?: string;
}

export declare const FieldMacro: Extension<any, MacroRendererStorage>;

/**
 * The YAML body for a new field, keys sorted.
 *
 * Sorted because that is what the chassis emits and what `insertionFor`
 * assumes; a body we wrote stays a body we would write.
 *
 * `type:` is always written even when it is `text`, unlike `status:` on a
 * decision. A decision's default is a lifecycle position that a reader can
 * infer; a field's type is the whole point of the block, and a body that does
 * not say what it holds invites the next tool to guess.
 */
export declare function fieldMacroText(draft: FieldDraft): string;

/** Numeric answer, or `undefined` when unanswered or not a number. */
export declare function fieldNumber(field: TypedField): number | undefined;

/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent.
 */
export declare function fieldRenderer(): MacroRenderer;

/**
 * The YAML scalar for a value of a given type.
 *
 * `yamlScalar` alone is not enough here and that is the whole reason this
 * function exists. It quotes anything that would otherwise resolve to a
 * boolean — deliberately, because for an action item's `text:` a bare `true`
 * would be a type error. For a field of `type: boolean` the bare `true` is
 * exactly right and the quoted `'true'` is the error: `macroDataFromText` in
 * realtime-modules parses this body with js-yaml, so `value: 'true'` reaches
 * every consumer as the STRING "true". A typed field whose boolean is a string
 * is not a typed field.
 *
 * Numbers are emitted bare for the same reason. Dates are left to `yamlScalar`,
 * which quotes them — matching js-yaml, which quotes any scalar that would
 * otherwise resolve to a Date, and matching the `due:` key in
 * `actionItemsText.ts`.
 *
 * A value that does NOT fit its type falls through to `yamlScalar`, so "next
 * tuesday" under a date field is stored as the quoted text it is. It comes
 * back flagged, which is the design — see the header.
 */
export declare function fieldScalar(type: FieldType, value: string): string | null;

export declare type FieldType = (typeof FIELD_TYPES)[number];

/**
 * Whether a scalar fits a type.
 *
 * `text` accepts anything, because anything written down is text.
 *
 * `date` is checked against the CALENDAR, not just the shape: `2026-13-04` has
 * the right eight digits and is not a date. That specific string is the one
 * `scalarValue.ts` names as the hazard — it is what two concurrent
 * character-merged dates interleave into — so it must not read as valid here
 * either.
 *
 * `boolean` is deliberately strict about `true`/`false` and nothing else. YAML
 * 1.2's core schema (what js-yaml resolves with by default) reads `yes` as the
 * string "yes", so accepting it would make this renderer disagree with the
 * chassis about what the document says.
 */
export declare function fitsFieldType(type: FieldType, value: string): boolean;

export declare function formatBytes(bytes: number): string;

/**
 * `YYYY-MM-DD` → `Nov 1, 2026` in the reader's locale.
 *
 * Forced to UTC, and this is not a nicety: `new Date('2026-03-04')` is UTC
 * midnight, and formatting that in any timezone west of Greenwich renders
 * "Mar 3" — an invoice due date off by one day for every user in the Americas.
 * The same note stands over `formatDateValue` in `scalarValue.ts`; it is
 * repeated because it is the kind of thing a "simplification" removes.
 */
export declare function formatFieldDate(iso: string): string;

/**
 * Thousands separators, full precision.
 *
 * `toLocaleString()` alone rounds to three decimals, which would quietly round
 * an invoice total. Same guard, same reason, as `formatNumberValue`.
 */
export declare function formatFieldNumber(n: number): string;

/** What the reader sees when the block is not editable. `''` when unanswered. */
export declare function formatFieldValue(field: TypedField): string;

/**
 * WHICH SIDE WINS WHEN THE BODY AND THE ROW DISAGREE.
 *
 * Two stores, no transaction between them (there is no server-side Y.Doc), so
 * they CAN disagree and the only dishonest answer is to not have decided. The
 * rule is not "newest wins" — it is per-field, because the two halves are
 * authoritative about different things:
 *
 *   THE BODY OWNS THE ASK.  The question, the addressee, the options and the
 *   expiry live in the document and are projected OUT to the row by whoever
 *   has the page open. A row whose text or assignee drifts is corrected from
 *   the body, never the other way round: the body is what a person reads and
 *   what a foreign tool round-trips.
 *
 *   THE ROW OWNS WHETHER AN ANSWER STUCK.  It is the only half a person can
 *   reach without opening the page, and the only half the asker polls. So an
 *   answer written in the page is PROVISIONAL until the row accepts it — if
 *   the mirror refuses, the document edit is retracted and the card says why
 *   (`retractHitlEdit`, and `HitlMacro`'s header).
 *
 *   AN ANSWERED ROW FILLS AN UNANSWERED BODY.  That is the whole point of
 *   answering from an inbox, and it is how a page catches up after being
 *   answered while nobody had it open.
 *
 *   AN ANSWERED BODY IS NEVER OVERWRITTEN BY THE ROW.  Not even when the two
 *   answers differ. Two different recorded answers means one of them was
 *   accepted by something that acted on it, and silently replacing the text a
 *   person can see is how a document stops being evidence. The disagreement is
 *   REPORTED to the host instead — see `onAnswered`'s contract — and left on
 *   screen for a human.
 */
export declare const HITL_CONVERGENCE: string;

/** The `category` a section-item row carries so it is recognisably a callout. */
export declare const HITL_ITEM_CATEGORY = "hitl";

/** The `macro:<name>` discriminator for an agent -> human hand-off. */
export declare const HITL_MACRO_NAME = "hitl";

/**
 * HOW A CALLOUT BECOMES VISIBLE OUTSIDE THIS PAGE — and exactly how far that
 * goes. Stated here because it is the first thing a reader of this file will
 * assume wrongly.
 *
 * Nothing outside an open editor can read a document body. There is no
 * server-side Y.Doc; the gateway relays CRDT bytes opaquely and platform-api
 * never materialises a document. So a callout that exists ONLY as these bytes
 * is invisible to every surface that is not the page it is on — an inbox built
 * on it would be empty by construction.
 *
 * The fix is the one `macro:diagram` already made: the body carries a
 * REFERENCE (`id`) and a queryable substrate carries a row. Here that
 * substrate is the section-items table, reached with a sentinel section id
 * (`_macro`) because a page-shaped document has no sections — verified: the
 * item handlers never look `sectionId` up against a real section and the
 * partition key is a plain `${documentId}:${sectionId}` concatenation, which
 * is why `_inbox` is already in use for the same trick.
 *
 * What that buys, and what it does not:
 *
 *   VISIBLE     the question (`text`), who is asked (`assignee`), whether it
 *               is still waiting (`status`), and — via
 *               `POST …/items/:itemId/answer` — an answer, with the addressee
 *               check and the already-answered guard enforced server side.
 *   NOT VISIBLE the OPTIONS and `expiresAt`. A section item has no field for
 *               either, and this work does not own the repository that would
 *               add one. So a surface reading only the row can offer free
 *               prose, and cannot know a callout has expired.
 *
 * The consequence is deliberate and must not be papered over: a remote surface
 * may present a comment box, never the declared choices, unless it has the
 * body in hand. Drawing three named buttons from a row that never carried them
 * would be inventing the ask.
 */
export declare const HITL_QUERYABILITY: string;

/** @deprecated Use `MACRO_ITEM_SENTINEL_SECTION` — the sentinel is not HITL's. */
export declare const HITL_SENTINEL_SECTION = "_macro";

/** The answer, as the host's mirror needs to address it. */
export declare interface HitlAnsweredEvent {
    /** The callout's `id`. Empty when the body carries none. */
    id: string;
    answer: string;
    /** ISO, the same instant written into the body. */
    answeredAt: string;
    /** Empty when the host declared no identity. */
    answeredBy: string;
    /** The callout as it read immediately before the answer. */
    callout: HitlCallout;
}

export declare function HitlBlock({ callout, editable, now, onAnswer, busy, failure, people, onAssign, onRetract, onRemove, 'data-testid': testId, }: HitlBlockProps): JSX.Element;

export declare interface HitlBlockProps {
    callout: HitlCallout;
    /** False renders the callout read-only — no answering, no retracting. */
    editable?: boolean;
    /**
     * The clock, for expiry. Injected rather than read from `Date.now()` here
     * so a test can pin it; defaults to now.
     */
    now?: number;
    /** Records an answer. Never called for an expired callout. */
    onAnswer?: (answer: string) => void;
    /** An answer is in flight — the controls are live but must not be re-fired. */
    busy?: boolean;
    /**
     * Why the last answer did not stick.
     *
     * Set when an answer was written into the document and then TAKEN BACK
     * because the mirror write failed. The card must say so: the alternative
     * is a callout that silently returns to `waiting` and a person who
     * believes they unblocked something.
     */
    failure?: string | null;
    /**
     * Who this callout may be addressed to, as identity + label.
     *
     * Empty (or absent) draws no picker at all, which is the honest rendering
     * of "this surface has no directory": a control listing nobody would
     * suggest the addressee is unchangeable when it is only unknown.
     */
    people?: readonly HitlPerson[];
    /**
     * Readdresses the callout. Only ever called with an id from `people`, or
     * `''` to address it to nobody.
     *
     * Load-bearing rather than cosmetic: `assignee` is the ONLY field the
     * cross-document query is keyed on, so a callout stuck on the wrong
     * addressee is invisible to the person who should answer it and answerable
     * by nobody — the answer endpoint refuses everyone but the addressee.
     */
    onAssign?: (assignee: string) => void;
    /** Takes a recorded answer back. Omitted when it cannot be done in one edit. */
    onRetract?: () => void;
    /** Takes the whole block off the page. Omitted when not editable. */
    onRemove?: () => void;
    'data-testid'?: string;
}

/** A `macro:hitl` callout, as the block draws it. */
export declare interface HitlCallout {
    /**
     * Stable id, minted by whoever asked. `''` when the body has none — which
     * is legal and renders fine, but see `HITL_QUERYABILITY`: an id is what a
     * row outside the document is keyed on, so a callout without one exists
     * only on this page.
     */
    id: string;
    /** The question. The one field this reader refuses a body without. */
    question: string;
    /** What the agent was doing. `''` when unstated. */
    context: string;
    /** Who is asking. `''` when unstated. */
    askedBy: string;
    /**
     * Who is being asked — an identity key, not a display name.
     *
     * `''` when the callout is addressed to nobody in particular. The
     * distinction is load-bearing outside the document: the cross-document
     * query is by assignee, and the answer endpoint refuses anyone who is not
     * the addressee. See `HITL_QUERYABILITY`.
     */
    assignee: string;
    /** What is stopped until this is answered. `''` when nothing is. */
    blocks: string;
    /**
     * ISO, or null. When it passes the asker has STOPPED WAITING — which is a
     * different fact from a deadline, and the block treats it as one: an
     * expired callout draws no answer control at all.
     */
    expiresAt: string | null;
    /** The choices. Empty means the answer is free prose. */
    options: HitlOption[];
    /** The recorded answer, or null while the callout is still waiting. */
    answer: string | null;
    /** `''` when the answer carries no attribution. */
    answeredBy: string;
    /** ISO, or `''`. */
    answeredAt: string;
}

/** What `hitlMacroText` will write. Every field but `question` is optional. */
export declare interface HitlDraft {
    id?: string;
    question: string;
    context?: string;
    askedBy?: string;
    assignee?: string;
    blocks?: string;
    expiresAt?: string;
    /** A scalar shorthand, or a choice with its consequence. */
    options?: readonly (string | {
        value: string;
        then?: string;
    })[];
}

/**
 * Whether the callout's asker has stopped waiting.
 *
 * Deliberately NOT folded into `readHitl`: expiry is a fact about the clock,
 * and a reader that baked `Date.now()` into a parse result would hand the
 * renderer a value that silently went stale between paints. The caller passes
 * the clock in.
 */
export declare function hitlExpired(callout: HitlCallout, now?: number): boolean;

export declare const HitlMacro: Extension<HitlMacroOptions, any>;

export declare interface HitlMacroOptions {
    /**
     * Who is answering, for `answeredBy`. A string or a getter, because the
     * signed-in user outlives no editor and a host should not have to rebuild
     * the extension when it changes.
     *
     * Omitted writes no attribution at all, which is the honest result of not
     * knowing — inventing `answeredBy: someone` would be worse.
     */
    answeredBy?: string | (() => string | undefined);
    /** The clock, for `answeredAt` and for expiry. Defaults to `Date.now`. */
    now?: () => number;
    /**
     * Mirrors an answer to wherever the asker is actually reading.
     *
     * Return nothing for fire-and-forget, or a promise of `{ ok }`. A rejection
     * or `{ ok: false }` RETRACTS the document edit — see the file header.
     */
    onAnswered?: (event: HitlAnsweredEvent) => void | Promise<HitlMirrorResult | void>;
    /**
     * Who this page may address a callout to. Read through a getter for the
     * same reason `answeredBy` is: a roster arrives after the editor is built
     * and changes while it is open, and an extension configured once must not
     * freeze the first answer it got.
     *
     * Absent draws no picker — see `HitlBlock`'s `people`.
     */
    people?: () => readonly HitlPerson[];
    /**
     * The callout's QUERYABLE fields changed, so the host's row should be
     * brought in line with them: on insert, on a readdress, and whenever a peer
     * changes either through the CRDT.
     *
     * This is the body -> row half of `HITL_CONVERGENCE`, and it fires on every
     * client that has the page open rather than only on the one that made the
     * change — a projection maintained by one designated client would stop
     * being maintained the moment that client closed the tab. The host is
     * expected to make the write idempotent; `hitlMirrorRow` is what it should
     * write.
     *
     * Fired only when a MIRRORED field actually moved (id, question, addressee,
     * and whether an answer is recorded), never on ordinary typing elsewhere in
     * the block.
     */
    onCalloutChanged?: (callout: HitlCallout) => void;
}

/**
 * The macro body for a callout — the bytes the chassis serializer would write
 * between the fences, keys alphabetical from `sortKeys: true`, with no
 * trailing newline (the closing fence supplies the final break).
 *
 * An empty `options` list is OMITTED rather than written as `options: []`.
 * They mean the same thing to a reader — the answer is free prose — and
 * leaving the key out keeps the two forms from having to be reconciled by an
 * edit later.
 */
export declare function hitlMacroText(draft: HitlDraft): string;

/** What a host's mirror write reports back. */
export declare interface HitlMirrorResult {
    ok: boolean;
    /** Shown on the card when `ok` is false. */
    message?: string;
}

/**
 * The fields a section-item row carries for one callout — the whole of what
 * `HITL_QUERYABILITY` says is visible outside the page, in one place so the
 * document half and the host half cannot disagree about it.
 *
 * `itemId` IS the callout's `id`. That identity is the join: the inbox row a
 * person answers and the block in the body are the same callout because they
 * share it, and a callout with no id gets no row at all (see below).
 *
 * `assigneeId`, not `assignee`. The row's `assignee` is a human LABEL and the
 * cross-document query is keyed on the IDENTITY; a callout carries only the
 * identity, so writing it into the label field would produce a row that renders
 * a Cognito sub at a reader AND — because a host that later set a real label
 * would overwrite it — a row that silently stopped being findable. A host that
 * knows the person's name is free to add the label beside this.
 *
 * Returns `null` for a callout no row can be keyed on: no id, or addressed to
 * nobody. Both are legal in a body and both are invisible outside it — an
 * unaddressed question is one the answer endpoint refuses on purpose, and a row
 * for it would sit in nobody's inbox forever.
 */
export declare interface HitlMirrorRow {
    itemId: string;
    text: string;
    assigneeId: string;
    category: typeof HITL_ITEM_CATEGORY;
}

export declare function hitlMirrorRow(callout: HitlCallout): HitlMirrorRow | null;

/**
 * One answer the callout offers, and what taking it does.
 *
 * `then` is the half that makes this more than a labelled button: a person
 * asked "ship it or hold?" is being asked to pick a CONSEQUENCE, and an agent
 * that knows what each branch does can say so. Empty when the asker did not.
 */
export declare interface HitlOption {
    /** The literal answer recorded when this option is taken. */
    value: string;
    /** What happens if it is. `''` when unstated. */
    then: string;
}

/** One candidate addressee: the identity the row is keyed on, and its label. */
export declare interface HitlPerson {
    /** The auth subject written into `assignee:`. */
    id: string;
    /** What a reader sees. Never written into the body — see `hitlMirrorRow`. */
    name: string;
}

/** What the card is, in one word — and the only place that decides it. */
export declare function hitlPhase(callout: HitlCallout, now?: number): Phase;

/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent, and the options
 * are the same either way.
 */
export declare function hitlRenderer(options?: HitlMacroOptions): MacroRenderer;

/**
 * Whether `extensionName` is the one extension that contributes the node view.
 *
 * See the file header: `MacroRenderers` if present, otherwise the first
 * declaring extension. Derived on every call from state that is already
 * settled, so it needs no bookkeeping and survives an extension-manager
 * rebuild.
 */
export declare function hostsMacroNodeViews(editor: MacroEditorLike, extensionName: string): boolean;

/** True for an id this module would have minted — hex groups and dashes only. */
export declare function isDiagramId(value: string): boolean;

/** True for an `url:` the host must fetch with credentials rather than link. */
export declare function isHostedUpload(url: string): boolean;

/** True when the card should try to show the file rather than name it. */
export declare function isImageAttachment(a: {
    type: string;
}): boolean;

/**
 * The `href` a row may be given, or `null` when it must render as text.
 *
 * A bare `example.com/x` is accepted and promoted to `https://` — a person
 * typing a link into a field means a link, and refusing it over a missing
 * scheme would be pedantry that shows them plain grey text instead.
 */
export declare function linkHref(url: string): string | null;

/** One row of the list. */
export declare interface LinkRow {
    /** Position in `links`, 0-based. */
    index: number;
    /** The `label:` scalar. `''` when the row has none. */
    label: string;
    /** The `url:` scalar VERBATIM — not validated. See `linkHref`. */
    url: string;
}

/** The `macro:<name>` discriminator for a reference list. */
export declare const LINKS_MACRO_NAME = "links";

export declare function LinksBlock({ rows, editable, onLabelChange, onUrlChange, onRemoveRow, onAddRow, onRemove, 'data-testid': testId, }: LinksBlockProps): JSX.Element;

export declare interface LinksBlockProps {
    rows: readonly LinkRow[];
    /** False renders the list as anchors only — no editing. */
    editable?: boolean;
    onLabelChange?: (index: number, label: string) => void;
    onUrlChange?: (index: number, url: string) => void;
    onRemoveRow?: (index: number) => void;
    onAddRow?: () => void;
    /** Takes the whole block off the page. Omitted when not editable. */
    onRemove?: () => void;
    'data-testid'?: string;
}

export declare const LinksMacro: Extension<any, MacroRendererStorage>;

/**
 * The macro body for a reference list — byte-identical to what the chassis
 * serializer writes between the fences, with no trailing newline (the closing
 * fence supplies the final break).
 */
export declare function linksMacroText(rows: readonly {
    label?: string;
    url?: string;
}[]): string;

/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent.
 */
export declare function linksRenderer(): MacroRenderer;

/**
 * The sentinel section a page-shaped document files macro rows under.
 *
 * Shared by every macro that mirrors itself, not just callouts — a canvas page
 * has no sections at all, so all of them need the same fake one to be
 * addressable. `HITL_SENTINEL_SECTION` is the older name, kept because it is
 * what the shipped hosts import.
 */
export declare const MACRO_ITEM_SENTINEL_SECTION = "_macro";

/**
 * The ProseMirror node name a macro occupies.
 *
 * Duplicated from realtime-modules' `MACRO_NODE_NAME` rather than imported.
 * Importing it would pull the whole Tiptap canvas adapter — and with it a
 * second `prosemirror-*` graph — into `./diagram`, which is the one thing the
 * app's `optimizeDeps.exclude` list exists to prevent. `'macro'` is a wire
 * constant on the same footing as the `data-macro` attribute, and the round
 * trip test pins it.
 */
export declare const MACRO_NODE_NAME = "macro";

/** The extension name that, when present, is always the node-view host. */
export declare const MACRO_RENDERERS_NAME = "macroRenderers";

/**
 * The minimum of a Tiptap editor this module touches.
 *
 * Structural rather than `import type { Editor }` so that a test can drive the
 * election with a stub, and so this file takes no value dependency on
 * `@tiptap/core`.
 */
export declare interface MacroEditorLike {
    extensionManager?: {
        extensions?: {
            name: string;
        }[];
    } | null;
    extensionStorage?: unknown;
}

/**
 * A ProseMirror node view that also wants to hear about `editable` flips.
 *
 * `refresh` is optional and is called by the host plugin's plugin view when
 * `EditorView.editable` changes without a document change — the only hook that
 * fires then. Reading `editable` once at construction would leave an editable
 * block sitting inside a page that had just been locked.
 */
export declare interface MacroNodeView extends NodeView {
    refresh?(): void;
}

export declare function macroNodeViewPlugin(registry: MacroRendererRegistry): Plugin_2;

/** Draws one macro name. */
export declare interface MacroRenderer {
    /** The `macro:<name>` discriminator this draws, e.g. `'action-items'`. */
    readonly macroName: string;
    /**
     * Whether this renderer can draw this node's payload. Optional; a renderer
     * that omits it is asked to draw every macro carrying its name.
     *
     * Declare it whenever `create` can decline (return `null`), because it is
     * the only way BACK. A declined block renders as the plain YAML fence, and
     * a fence keeps a `contentDOM` — so ProseMirror updates it in place on
     * every keystroke and never rebuilds it, which means the user fixing the
     * broken YAML by hand would never see their block come back. With `accepts`
     * the fence returns `false` from its own `update` the moment the payload
     * parses again, and the renderer gets another chance.
     *
     * Must be cheap: it runs on every transaction that touches the node. A line
     * scan is the right order of magnitude.
     */
    accepts?(node: Node_2): boolean;
    /**
     * Builds the node view.
     *
     * Returning `null` falls back to the plain YAML fence. That is a real
     * answer, not a failure path: a renderer whose payload arrived as merge
     * damage should show the user the bytes rather than invent a block — the
     * same judgement `readDiagramId` makes when it refuses to guess an id.
     */
    create(ctx: MacroViewContext): MacroNodeView | null;
}

/**
 * What a macro extension returns from `addProseMirrorPlugins`.
 *
 * Registers `renderer` for this editor and contributes the shared node view
 * plugin if — and only if — this extension is the elected host.
 *
 * A whole new macro tool is this, plus the renderer:
 *
 * ```ts
 * export const HitlMacro = Extension.create({
 *     name: 'hitlMacro',
 *     addStorage: macroRendererStorage,
 *     addProseMirrorPlugins() {
 *         return macroRendererPlugins(this.editor, this.name, hitlRenderer());
 *     },
 * });
 * ```
 */
export declare function macroRendererPlugins(editor: MacroEditorLike, extensionName: string, ...renderers: readonly MacroRenderer[]): Plugin_2[];

/** Where renderers are looked up by macro name. */
export declare interface MacroRendererRegistry {
    /** Adds a renderer. A later registration for the same name replaces it. */
    register(renderer: MacroRenderer): void;
    get(macroName: string): MacroRenderer | undefined;
    /** The macro names that currently have a renderer. */
    names(): string[];
}

export declare const MacroRenderers: Extension<MacroRenderersOptions, MacroRendererStorage>;

/**
 * The registry for this editor's CURRENT extension manager.
 *
 * Exported so a host can inspect what will draw (`names()`), and so a renderer
 * can be added from outside an extension. Registering after the editor is
 * built takes effect on the next paint of that macro, not retroactively —
 * ProseMirror does not rebuild node views that already exist.
 */
export declare function macroRenderersFor(editor: MacroEditorLike): MacroRendererRegistry;

export declare interface MacroRenderersOptions {
    /** Renderers to register for this editor, in addition to any extension's. */
    renderers: MacroRenderer[];
}

/** The single `macro` node-view plugin's key. */
export declare const macroRenderersPluginKey: PluginKey<any>;

/**
 * The shape an extension puts in `addStorage` to declare itself a macro
 * renderer. Read during host election, before any plugin is built.
 */
export declare interface MacroRendererStorage {
    macroRenderer: true;
    [key: string]: unknown;
}

/** `addStorage: macroRendererStorage` — that is the whole declaration. */
export declare function macroRendererStorage(): MacroRendererStorage;

/** Everything a macro node view is built from. */
export declare interface MacroViewContext {
    /** The macro node itself. Its `textContent` is the literal YAML body. */
    node: Node_2;
    view: EditorView;
    /** Position of the macro node, as ProseMirror hands it to a node view. */
    getPos: () => number | undefined;
}

/**
 * Mints a diagram id.
 *
 * A plain UUID: it is what `/diagram/:id` already uses, it is unambiguous YAML
 * (five hex groups can never be read as a date or a sexagesimal), and it is
 * short enough to stay inside the gateway's 46-character channel limit if a
 * diagram is ever promoted out of a page into its own document.
 */
export declare function newDiagramId(): string;

declare interface ParsedBody {
    items: RawItem[];
    /** The list entry. Its scalar is `[]` for an empty list, `''` otherwise. */
    list: Entry;
    /**
     * Offset one past the last item's last line — or one past the list key
     * itself when the list is empty. Everything an edit may replace ends here.
     */
    listEnd: number;
}

/**
 * The list a macro body describes, or `null` when the body is not a shape this
 * module can edit safely.
 */
export declare function parseListBody(source: string, listKey: string): ParsedBody | null;

declare type Phase = 'waiting' | 'answered' | 'expired';

/** `pre[data-macro] > code` — the macro's YAML, editable as text. */
export declare function plainMacroView(node: Node_2): NodeView;

declare interface RawItem {
    entries: Entry[];
    lineStart: number;
    lineEnd: number;
}

export declare abstract class ReactMacroView implements MacroNodeView {
    /** The node view's outer element. `data-macro` is set for the caller. */
    readonly dom: HTMLElement;
    protected node: Node_2;
    protected readonly view: EditorView;
    protected readonly getPos: () => number | undefined;
    private readonly host;
    private readonly root;
    private dead;
    private queued;
    constructor(ctx: MacroViewContext, macroName: string);
    /**
     * The way back to the prose.
     *
     * `stopEvent()` returning true is what hands keys to the widget instead of
     * to ProseMirror, and it is also what traps a keyboard user inside one.
     * Measured on a live document, with focus on the decision block's
     * "Accepted" button: Escape left `document.activeElement` exactly where it
     * was, and so did ArrowDown — the editor never saw either key, and the
     * only way back to the text was Shift-Tab past every control in the block.
     * Escape in an action item's text field was worse: the field's own handler
     * blurs to cancel, so focus landed on `body`.
     *
     * Two stages, because Escape already means "cancel this edit" inside a
     * field and must keep meaning it:
     *
     *   * from a text field — the field cancels (its own React handler has
     *     already run by the time this bubbles out of the React root), and
     *     focus parks on the block itself rather than falling to `body`
     *   * from anywhere else in the block — the caret goes to the position
     *     immediately after the node and the editor takes focus back
     *
     * So Escape from a half-typed field is one press to abandon the edit and a
     * second to leave, and Escape from a button is a single press back to the
     * text. Bubble phase on `this.dom`, which is OUTSIDE the React root
     * (`this.host`) — that ordering is what lets the field's cancel run first.
     */
    private readonly onEscape;
    /**
     * Puts the caret in the nearest REAL prose and hands focus back.
     *
     * The obvious implementation is `TextSelection.near(resolve(after), 1)`,
     * and it has a hole that only shows up when two macros are adjacent.
     * Measured on a live document holding action items, then a decision, then
     * a HITL callout: Escape from the decision's "Rejected" button moved focus
     * onto the ProseMirror element — the class list said `ProseMirror-focused`
     * — and then eleven typed characters went nowhere. `near` had found the
     * next valid text position, which was inside the HITL macro's own text,
     * and a React node view has no `contentDOM`, so ProseMirror cannot render
     * a selection there and drops every keystroke. Focus that lands somewhere
     * you cannot type is worse than focus that never moved, because it looks
     * like it worked.
     *
     * So the search skips macro nodes outright and asks for a textblock that
     * is not one: forward first, backward if the block is last, and a node
     * selection on the block itself if the document is nothing but macros —
     * which at least selects it visibly and lets an arrow key walk out.
     */
    protected exitToText(): void;
    /** The closest typable textblock at or after `from`, else the last before it. */
    private proseNear;
    /** What to draw for the node this view currently holds. */
    protected abstract element(): ReactElement;
    /** Queues a repaint. Safe to call from a constructor or a transaction. */
    protected schedule(): void;
    /** Called by the host plugin when `EditorView.editable` flips. */
    refresh(): void;
    /** True when the document allows edits. Read LIVE, never cached. */
    protected get editable(): boolean;
    /**
     * Replaces a range of the macro's TEXT.
     *
     * `from`/`to` are offsets into `node.textContent`; `+1` skips the macro
     * node's opening token, exactly as `setMacroData` does in realtime-modules.
     *
     * This is the only way a renderer should change its payload, and it is what
     * makes an in-block interaction a first-class document edit: it is an
     * ordinary `ReplaceStep` on a textblock, so Y.js merges it, undo reverses
     * it, and the suggestion fork wraps it in `suggestionDelete` /
     * `suggestionInsert` marks like any other typing.
     */
    protected replaceText(from: number, to: number, insert: string): boolean;
    /** Takes the whole block off the page. */
    protected removeBlock(): boolean;
    /** Renames the group — for a block whose payload says more than its type. */
    protected setAccessibleName(name: string): void;
    destroy(): void;
}

/**
 * The checklist a macro body describes, or `null` when the body is not the
 * shape this renderer edits.
 */
export declare function readActionItems(source: string): ActionItem[] | null;

/**
 * Parse an attachment body, or `null` when this is not one we can draw.
 *
 * `name:` and `url:` are required — a card with no name is a mystery box and
 * one with no URL is a name lying on the floor. `size:` must be a non-negative
 * integer when present; a body that says `size: large` is declined rather than
 * shown as "NaN B".
 */
export declare function readAttachment(source: string): Attachment | null;

/**
 * Parse a decision body, or `null` when this is not one we can draw.
 *
 * `decision:` is required — a card with no claim on it is not a decision — and
 * an unrecognised `status:` is declined rather than coerced to `proposed`,
 * because silently downgrading someone's `status: ratified` to "Proposed"
 * misreports the state of a real choice. An absent status is the exception and
 * means `proposed`, since that is what an unmarked decision is.
 */
export declare function readDecision(source: string): Decision | null;

/**
 * The id a diagram macro's body refers to, or `null`.
 *
 * `null` is a real state, not an error path: a CRDT merge of two concurrent
 * rewrites can leave text that no longer says anything, and the honest response
 * is to show the user the raw source so they can fix it — never to invent an id
 * and silently start a second, empty diagram under it.
 *
 * Deliberately strict. The quoted forms are accepted because a hand-edited or
 * foreign-tool-normalised file may quote a scalar the chassis left bare; an
 * arbitrary unquoted token is NOT accepted, because an id that is not shaped
 * like an id is far more likely to be merge damage than a diagram.
 */
export declare function readDiagramId(source: string): string | null;

/**
 * The callout a macro body describes, or `null` when the body is not the shape
 * this renderer edits.
 *
 * The one hard requirement is `question`. A callout with no question is not a
 * callout, and drawing an empty card with an answer box under it would invite
 * someone to answer nothing.
 */
export declare function readHitl(source: string): HitlCallout | null;

/**
 * The list a macro body describes, or `null` when the body is not the shape
 * this renderer edits — in which case the node view shows the fence.
 */
export declare function readLinks(source: string): LinkRow[] | null;

/**
 * Parse a field body, or `null` when this is not one we can draw.
 *
 * `label:` is required — an unnamed value is not a field, it is a number lying
 * on the floor. An unrecognised `type:` is declined for the reason the header
 * gives; an absent one means `text`, since that is what an unmarked value is.
 * An invalid VALUE is never a reason to decline: it comes back flagged.
 */
export declare function readTypedField(source: string): TypedField | null;

/**
 * Repaints every macro block in an editor.
 *
 * A node view only redraws when its own TEXT changes, which is right for a
 * payload and wrong for everything a renderer reads from OUTSIDE the document
 * — a roster, a clock, the signed-in user. Those arrive after the editor is
 * built and change while it is open, and without this a control that depends
 * on one (the action-item assignee picker is the first) never appears until
 * somebody happens to edit that block.
 *
 * Returns false when this editor has no macro renderers at all, so a caller
 * can tell "nothing to repaint" from "repainted nothing".
 */
export declare function refreshMacroViews(view: EditorView): boolean;

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
 * The edit that takes one key OFF one item, and the only honest way to say
 * "unassigned": writing `assignee: ''` would say the item HAS an assignee
 * whose id is the empty string, which matches nobody's inbox.
 */
export declare function removeItemKeyEdit(source: string, index: number, key: string): TextRangeEdit | null;

/** The edit that removes one row. Removing the last writes `links: []`. */
export declare function removeLinkEdit(source: string, index: number): TextRangeEdit | null;

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

export declare type ResolvedTheme = 'light' | 'dark';

/**
 * The edit that takes an answer back — the trio's lines and the break that
 * separated them from their neighbour, so what is left reparses identically.
 */
export declare function retractHitlEdit(source: string): TextRangeEdit | null;

declare interface Scalar {
    value: string;
    /** Offset of the first character of the value, in the macro's text. */
    from: number;
    /** Offset one past the last character of the value. */
    to: number;
}

/**
 * The edit that moves a decision to a new status.
 *
 * One range over the `status:` scalar — 8 characters becoming 8, or `proposed`
 * becoming `accepted` — not a payload rewrite. Returns `null` when the body is
 * not a decision, when the status is already that, or when the body carries
 * two `status:` keys (a shape we will not guess at).
 *
 * Attribution is deliberately NOT written here. Recording who moved a decision
 * to `accepted` is a second, independent edit (`attributeDecisionEdit`), so a
 * host that has no identity to offer still gets the status change instead of
 * being blocked on inventing a name.
 */
export declare function setDecisionStatusEdit(source: string, status: DecisionStatus): TextRangeEdit | null;

/** The edit that renames a field. One range over the `label:` scalar. */
export declare function setFieldLabelEdit(source: string, label: string): TextRangeEdit | null;

/**
 * The edit that changes a field's type. One range over the `type:` scalar.
 *
 * Deliberately does NOT touch the value. Retyping "Ada" from text to number
 * could plausibly clear it — but silently deleting somebody's answer because
 * they mis-clicked a dropdown is worse than showing them "Ada" with a chip
 * saying it is not a number, next to the dropdown that undoes it. Fusing the
 * two would also make this two ranges pretending to be one.
 */
export declare function setFieldTypeEdit(source: string, type: FieldType): TextRangeEdit | null;

/**
 * The edit that stores a field's value, or clears it.
 *
 * `undefined` CLEARS — the `value:` line goes away entirely, which is the only
 * representation of "unanswered" this format has. Passing `''` is not the same
 * thing and is not treated as one: it writes an empty scalar, which is a
 * person having answered with nothing.
 *
 * Returns `null` when there is nothing to do: the body is not a field, the
 * value is already that, or clearing a field that has no value.
 */
export declare function setFieldValueEdit(source: string, value: string | undefined): TextRangeEdit | null;

/**
 * The edit that changes who a callout is addressed to — ONE range, always.
 *
 * Three shapes, and they are all one range on purpose (see this file's header
 * on why answering is): the scalar alone when the key is already there, a whole
 * inserted line in sorted position when it is not, and the line plus its break
 * when the new addressee is nobody.
 *
 * Readdressing matters more here than it would on any other key, because
 * `assignee` is the ONLY field the cross-document query is keyed on: a callout
 * addressed to the wrong person is invisible to the right one. See
 * `HITL_QUERYABILITY`.
 *
 * Returns `null` when there is nothing to do, or when the body is not one this
 * file will write back to.
 */
export declare function setHitlAssigneeEdit(source: string, assignee: string): TextRangeEdit | null;

/** The edit that sets one key on one action item. */
export declare function setItemKeyEdit(source: string, index: number, key: string, value: string): TextRangeEdit | null;

/** Retitling, as an edit. */
export declare function setItemTextEdit(source: string, index: number, text: string): TextRangeEdit | null;

/** Retitling one row, as an edit. */
export declare function setLinkLabelEdit(source: string, index: number, label: string): TextRangeEdit | null;

/** Repointing one row, as an edit. Stored verbatim; safety is at render. */
export declare function setLinkUrlEdit(source: string, index: number, url: string): TextRangeEdit | null;

/**
 * The edit that sets one key on one item, or `null` when there is nothing to
 * do (or the body is not editable).
 *
 * When the key is already there this replaces the SCALAR alone. When it is not,
 * it inserts a whole line in the position `sortKeys` would have put it, so the
 * body stays byte-identical to what the chassis would emit.
 */
export declare function setListItemKeyEdit(source: string, listKey: string, index: number, key: string, value: string): TextRangeEdit | null;

export declare interface SharedDiagramProps {
    /**
     * Which diagram this is within its Y.Doc.
     *
     * Omit for a standalone diagram that owns its whole document. Pass a
     * stable block id (a section id, a macro id) when the diagram is one of
     * several on a page — it namespaces both the Y.Doc root type and the
     * awareness pointers, so two diagrams on one page never bleed into each
     * other.
     */
    blockId?: string;
    user: DiagramUser;
    /** False renders Excalidraw in view mode and stops all local writes. */
    editable?: boolean;
    className?: string;
    /**
     * Where Excalidraw loads its fonts from, e.g. `/excalidraw-assets/`.
     *
     * Unset, Excalidraw falls back to a public CDN. Hosts that want to stay
     * offline-clean copy the font files out of the package and point here.
     */
    assetPath?: string;
    /** Fires with the element count after every local scene change. */
    onSceneChange?: (elementCount: number) => void;
    /**
     * Mirror this participant's camera: their scroll and zoom are applied to
     * this canvas as they move. Matched against `userId` first, then
     * `clientId`, so following survives the peer reconnecting on a new socket.
     *
     * Null (the default) leaves the viewport under local control.
     */
    followUserId?: string | null;
    /** Social actions for the people on the presence bar. See DiagramPresenceActions. */
    presenceActions?: DiagramPresenceActions;
}

/** The status a tick sets, and the one un-ticking restores. */
export declare const STATUS_DONE = "done";

export declare const STATUS_PENDING = "pending";

/**
 * The edit that records what replaced this decision.
 *
 * Only meaningful alongside `status: superseded`, but not gated on it: the two
 * are separate edits and a caller may write either order, and refusing the
 * first because the second has not landed yet would make the pair
 * order-dependent for no benefit.
 */
export declare function supersedeDecisionEdit(source: string, by: string): TextRangeEdit | null;

/** A single-range replacement, in offsets into the macro's text. */
export declare interface TextRangeEdit {
    from: number;
    to: number;
    insert: string;
}

/** Ticking, as an edit. `pending` <-> `done`, four characters. */
export declare function toggleItemEdit(source: string, index: number): TextRangeEdit | null;

export declare interface TypedField {
    /** What the value is called. Required; without it, no field. */
    label: string;
    /** Absent `type:` means `text` — an unmarked field is a text field. */
    type: FieldType;
    /**
     * The `value:` scalar as written, or `undefined` when the key is ABSENT.
     *
     * `undefined` and `''` are different answers: the first is "nobody has
     * filled this in", the second is "somebody filled it in with nothing".
     * Only the first is unanswered, and only the first is what clearing
     * writes. See the header.
     */
    value: string | undefined;
    /**
     * False when a value is present and does not fit `type`.
     *
     * An unanswered field is `true` — not answering is not an error. See the
     * header for why an invalid value is kept and flagged rather than refused.
     */
    valid: boolean;
}

/** The prefix a host-resolved upload carries. */
export declare const UPLOAD_PATH_PREFIX = "/api/uploads/";

/**
 * The theme currently in force for `ref`'s subtree, kept live.
 *
 * Re-reads on any `data-theme` mutation anywhere in the document (the
 * attribute can be set on <html> or on any ancestor) and on OS theme changes.
 */
export declare function useResolvedTheme(ref: RefObject<Element | null>): ResolvedTheme;

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

export { }


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}
