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

/** The `macro:<name>` discriminator for a checklist. */
export declare const ACTION_ITEMS_MACRO_NAME = "action-items";

/** One row of the checklist. */
export declare interface ActionItem {
    /** Position in `items`, 0-based. */
    index: number;
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

export declare function ActionItemsBlock({ items, editable, onToggle, onTextChange, onRemoveItem, onAddItem, onRemove, 'data-testid': testId, }: ActionItemsBlockProps): JSX.Element;

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
    'data-testid'?: string;
}

export declare const ActionItemsMacro: Extension<any, MacroRendererStorage>;

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
export declare function actionItemsRenderer(): MacroRenderer;

/**
 * The edit that appends a pending item.
 *
 * Also the path back from `items: []` to a block list: the range then starts at
 * the `items:` colon and swallows the empty flow sequence, which keeps this a
 * single range rather than two edits a CRDT would have to order.
 */
export declare function addItemEdit(source: string, text: string): TextRangeEdit | null;

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

export declare function DiagramPresenceBar({ participants, size, className, 'data-testid': testId, }: DiagramPresenceBarProps): JSX.Element;

export declare interface DiagramPresenceBarProps {
    /**
     * Everyone on the board, local user included — i.e.
     * `useCollaborativeDiagram(...).participants`.
     */
    participants: DiagramCollaborator[];
    /** Avatar diameter in px. */
    size?: number;
    className?: string;
    'data-testid'?: string;
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

/** Props of the lazily-loaded canvas — always fully resolved by this point. */
export declare interface ExcalidrawCanvasProps extends SharedDiagramProps {
    ydoc: Y.Doc | null;
    awareness?: AwarenessLike | null;
}

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

/** `pre[data-macro] > code` — the macro's YAML, editable as text. */
export declare function plainMacroView(node: Node_2): NodeView;

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
    destroy(): void;
}

/**
 * The checklist a macro body describes, or `null` when the body is not the
 * shape this renderer edits.
 */
export declare function readActionItems(source: string): ActionItem[] | null;

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
 * The edit that removes one item — its lines AND the break that separated them
 * from their neighbour, so nothing is left behind that would reparse
 * differently.
 *
 * Removing the last remaining item writes `items: []` rather than a bare
 * `items:`, because a bare key parses as `null`, not as an empty list: the
 * block would come back as merge damage rather than as an empty checklist.
 */
export declare function removeItemEdit(source: string, index: number): TextRangeEdit | null;

export declare type ResolvedTheme = 'light' | 'dark';

/**
 * The edit that sets one key on one item, or `null` when there is nothing to
 * do (or the body is not editable).
 *
 * When the key is already there this replaces the SCALAR alone. When it is not,
 * it inserts a whole line in the position `sortKeys` would have put it, so the
 * body stays byte-identical to what the chassis would emit.
 */
export declare function setItemKeyEdit(source: string, index: number, key: string, value: string): TextRangeEdit | null;

/** Retitling, as an edit. */
export declare function setItemTextEdit(source: string, index: number, text: string): TextRangeEdit | null;

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
}

/** The status a tick sets, and the one un-ticking restores. */
export declare const STATUS_DONE = "done";

export declare const STATUS_PENDING = "pending";

/** A single-range replacement, in offsets into the macro's text. */
export declare interface TextRangeEdit {
    from: number;
    to: number;
    insert: string;
}

/** Ticking, as an edit. `pending` <-> `done`, four characters. */
export declare function toggleItemEdit(source: string, index: number): TextRangeEdit | null;

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
 * matters is that these bytes parse back to the same string, which is what
 * `actionItemsText.test.ts` asserts.
 */
export declare function yamlScalar(value: string): string | null;

export { }


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
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}
