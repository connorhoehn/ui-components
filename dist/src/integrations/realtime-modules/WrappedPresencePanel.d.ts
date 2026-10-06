import type { RMUsePresenceReturn } from './types';
import { type NetworkShimOptions } from './networkShim';
export interface WrappedPresencePanelProps {
    /** Return value of usePresence(channel) from realtime-modules */
    presence: RMUsePresenceReturn;
    /** The local user's clientId (from useGateway().clientId) */
    currentClientId: string | null;
    /**
     * Show one row per CONNECTION instead of one per person.
     *
     * The gateway keys presence by clientId — a per-WebSocket id — so a person
     * with three tabs is three rows and every reconnect mints another. Rendering
     * that raw is the "13 rows for 4 humans" bug, and it is the default this
     * component used to have. Turn it on only for a diagnostic view where the
     * sockets themselves are the subject.
     */
    perConnection?: boolean;
    /**
     * Opt-in: wrap the rendered PresencePanel in a NetworkErrorBoundary +
     * ReconnectingShim using the supplied connection state and retry
     * callback. Omit for no wrapping (default).
     */
    wrapWithNetworkShim?: NetworkShimOptions;
}
export declare function WrappedPresencePanel({ presence, currentClientId, perConnection, wrapWithNetworkShim, }: WrappedPresencePanelProps): import("react").JSX.Element;
//# sourceMappingURL=WrappedPresencePanel.d.ts.map