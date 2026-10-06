export interface ActivityItem {
    eventType: string;
    timestamp: string;
    detail: Record<string, unknown>;
}
export interface ActivityResponse {
    items: ActivityItem[];
    nextKey: string | null;
}
type ConnectionState = 'connected' | 'connecting' | 'disconnected';
type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;
interface GatewayMessage {
    type: string;
    channel?: string;
    payload?: unknown;
    [key: string]: unknown;
}
export interface ActivityPanelProps {
    idToken: string | null;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: OnMessageFn;
    connectionState: ConnectionState;
    /**
     * Origin for `GET /api/activity`. Wins over the build-time
     * `VITE_SOCIAL_API_URL`, which a consumer cannot influence — see the note
     * on `getBaseUrl` above. Pass the same origin the host's other REST calls
     * use; `''` is a same-origin request.
     */
    baseUrl?: string;
    /**
     * Full replacement for the REST hydration, for a host that already owns an
     * authorized client (signed requests, a proxy, a mock in tests). Wins over
     * `baseUrl`. The live WebSocket half is untouched either way.
     */
    fetchActivity?: FetchActivityFn;
    /**
     * Called with the normalized `Error` whenever a hydrate (REST or
     * `fetchActivity`) fails — in addition to, not instead of, the panel's own
     * inline `ErrorState` and toast. A host with its own error-reporting
     * (Sentry, a status bar) hooks in here instead of re-deriving failure from
     * the panel's render output.
     */
    onError?: (err: Error) => void;
}
/** Hydration seam — see `ActivityPanelProps.fetchActivity`. */
export type FetchActivityFn = (args: {
    idToken: string | null;
    limit: number;
}) => Promise<ActivityResponse>;
export declare function ActivityPanel({ idToken, sendMessage, onMessage, connectionState, baseUrl, fetchActivity, onError, }: ActivityPanelProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ActivityPanel.d.ts.map