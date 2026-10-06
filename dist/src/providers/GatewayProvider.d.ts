import { Observable } from 'lib0/observable';
import * as Y from 'yjs';
import { Awareness } from 'y-protocols/awareness';
export type SendMessage = (msg: Record<string, unknown>) => void;
export declare class GatewayProvider extends Observable<string> {
    readonly doc: Y.Doc;
    readonly channel: string;
    readonly awareness: Awareness;
    private readonly _sendMessage;
    private _synced;
    private _destroyed;
    private _awarenessTimer;
    private readonly _updateHandler;
    constructor(doc: Y.Doc, channel: string, sendMessage: SendMessage);
    /** Whether we have received at least one snapshot from the server. */
    get synced(): boolean;
    /**
     * Apply a remote Y.js document update received from the gateway.
     * Uses `this` as origin so the update handler above skips re-sending it.
     */
    applyRemoteUpdate(b64: string): void;
    /**
     * Apply the initial document snapshot from the server.
     * Functionally identical to applyRemoteUpdate but marks the provider as synced.
     */
    applySnapshot(b64: string): void;
    /**
     * Apply a remote awareness update received from the gateway.
     */
    applyAwarenessUpdate(b64: string): void;
    /**
     * Tell peers this client is gone — synchronously, on the current tick.
     *
     * The awareness sender is debounced by 50ms, which is fatal at teardown:
     * `Awareness.destroy()` clears the local state, our update handler schedules
     * the removal broadcast 50ms in the future, and by then `useYjsDoc` has
     * already sent `unsubscribe` for this channel (a gateway routes crdt
     * messages by subscription, so it drops the late one). On a page unload the
     * timer never runs at all. Either way the departing client lingers in every
     * other participant's avatar list until awareness times it out — or forever,
     * if no other awareness traffic arrives to prompt a re-render.
     */
    private _broadcastDeparture;
    destroy(): void;
}
//# sourceMappingURL=GatewayProvider.d.ts.map