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
    /** Social actions for the people on the presence bar. See DiagramPresenceActions. */
    presenceActions?: DiagramPresenceActions;
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
export type CollaborativeExcalidrawProps = CollaborativeExcalidrawHostedProps | CollaborativeExcalidrawBootstrapProps;
//# sourceMappingURL=types.d.ts.map