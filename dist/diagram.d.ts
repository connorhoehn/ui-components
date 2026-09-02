import { AwarenessLike } from '@connorhoehn/realtime-modules/adapters/excalidraw';
import { DiagramCollaborator } from '@connorhoehn/realtime-modules/adapters/excalidraw';
import { Extension } from '@tiptap/core';
import { JSX } from 'react';
import { PluginKey } from '@tiptap/pm/state';
import { RefObject } from 'react';
import type * as Y from 'yjs';

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

export declare const DiagramMacro: Extension<DiagramMacroOptions, any>;

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

/**
 * Mints a diagram id.
 *
 * A plain UUID: it is what `/diagram/:id` already uses, it is unambiguous YAML
 * (five hex groups can never be read as a date or a sexagesimal), and it is
 * short enough to stay inside the gateway's 46-character channel limit if a
 * diagram is ever promoted out of a page into its own document.
 */
export declare function newDiagramId(): string;

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

export declare type ResolvedTheme = 'light' | 'dark';

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

/**
 * The theme currently in force for `ref`'s subtree, kept live.
 *
 * Re-reads on any `data-theme` mutation anywhere in the document (the
 * attribute can be set on <html> or on any ancestor) and on OS theme changes.
 */
export declare function useResolvedTheme(ref: RefObject<Element | null>): ResolvedTheme;

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
