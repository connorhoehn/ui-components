// ui-components/src/components/diagram/types.ts
//
// Props shared between the public component and the lazily-loaded canvas.
// Kept in their own module so the barrel can re-export the types without
// pulling `@excalidraw/excalidraw` into the eager graph.

import type * as Y from 'yjs';
import type { AwarenessLike } from '@connorhoehn/realtime-modules/adapters/excalidraw';

export interface DiagramUser {
    /** Stable identity (Cognito sub). Used to label your cursor for peers. */
    userId?: string;
    displayName: string;
    color: string;
}

/** One person on the diagram's presence bar, as handed to an action. */
export interface DiagramPresencePerson {
    userId: string;
    clientId: string;
    displayName: string;
    color: string;
}

/**
 * What a reader can do with a person on the presence bar. Absent, the bar
 * is a roster and nothing more; present, the bar opens a menu of the people
 * on it with these actions per person. Each is optional so a host offers
 * only what it can back — a host with no calling offers no Call.
 */
export interface DiagramPresenceActions {
    onMessage?: (person: DiagramPresencePerson) => void;
    onCall?: (person: DiagramPresencePerson) => void;
    onFollow?: (person: DiagramPresencePerson) => void;
}

export interface SharedDiagramProps {
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
    /**
     * How a follower shows the followed person's view.
     *
     * `'mirror'` (the default) copies their scroll and zoom, so a follower on a
     * smaller canvas sees only the top-left of what they see. `'contain'`
     * centres the followed person's whole visible area and zooms out until it
     * fits this canvas (never zooming in past their zoom). Each canvas
     * publishes its size with its camera for this; a peer on an older version
     * that publishes no size is mirrored.
     */
    followFit?: 'mirror' | 'contain';
    /**
     * Fires when the person moves this canvas's camera themselves (a pan,
     * a zoom), as opposed to a follow or an opening fit this canvas applied.
     * A host pauses following on it without listening to the DOM.
     */
    onViewportInput?: () => void;
    /**
     * Open the board zoomed to its content, once the scene first has
     * elements. `true` fits the whole scene; an object picks a region
     * (`elementIds`, or every id starting with `elementIdPrefix`) and zoom
     * bounds. A region too large for `minZoom` opens on its top-left corner,
     * so the start of a long prompt is readable.
     */
    fitOnOpen?: boolean | DiagramFitOptions;
    /**
     * Excalidraw's help "?" button. `'corner'` (the default) leaves it in the
     * bottom-right corner; `'start'` moves it into the footer beside the zoom
     * and undo controls (clear of an overlay in that corner); `'hidden'`
     * removes the button (the "?" key still opens the help dialog).
     */
    helpButton?: 'corner' | 'start' | 'hidden';
    /** Receives Excalidraw's imperative API once the editor has mounted. */
    onExcalidrawAPI?: (api: unknown) => void;
    /** Social actions for the people on the presence bar. See DiagramPresenceActions. */
    presenceActions?: DiagramPresenceActions;
}

/** Options for `fitOnOpen`. */
export interface DiagramFitOptions {
    /** Fit these elements only. */
    elementIds?: readonly string[];
    /** Fit every element whose id starts with this. */
    elementIdPrefix?: string;
    /** Never zoom out past this (a readable floor). Default 0.1. */
    minZoom?: number;
    /** Never zoom in past this. Default 1. */
    maxZoom?: number;
    /** Share of the canvas kept clear on each side. Default 0.05. */
    margin?: number;
}

/** Props of the lazily-loaded canvas — always fully resolved by this point. */
export interface ExcalidrawCanvasProps extends SharedDiagramProps {
    ydoc: Y.Doc | null;
    awareness?: AwarenessLike | null;
}

/**
 * Hosted mode — the caller already has a Y.Doc.
 *
 * This is the mode a page/canvas host uses: the PAGE owns one Y.Doc and one
 * WebSocket, and each diagram block is a namespaced subtree of it.
 */
export interface CollaborativeExcalidrawHostedProps extends SharedDiagramProps {
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

/**
 * Bootstrap mode — the component owns the whole collaboration stack.
 *
 * Point it at a gateway and a diagram id and it builds the WebSocket, the
 * Y.Doc and the provider itself. Callers never construct a provider stack by
 * hand; that complexity is this library's job to absorb.
 */
export interface CollaborativeExcalidrawBootstrapProps extends SharedDiagramProps {
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

export type CollaborativeExcalidrawProps =
    | CollaborativeExcalidrawHostedProps
    | CollaborativeExcalidrawBootstrapProps;
