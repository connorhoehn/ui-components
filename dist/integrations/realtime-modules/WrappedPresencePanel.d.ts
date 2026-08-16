import type { RMUsePresenceReturn } from './types';
import { type NetworkShimOptions } from './networkShim';
export interface WrappedPresencePanelProps {
    /** Return value of usePresence(channel) from realtime-modules */
    presence: RMUsePresenceReturn;
    /** The local user's clientId (from useGateway().clientId) */
    currentClientId: string | null;
    /**
     * Opt-in: wrap the rendered PresencePanel in a NetworkErrorBoundary +
     * ReconnectingShim using the supplied connection state and retry
     * callback. Omit for no wrapping (default).
     */
    wrapWithNetworkShim?: NetworkShimOptions;
}
export declare function WrappedPresencePanel({ presence, currentClientId, wrapWithNetworkShim, }: WrappedPresencePanelProps): import("react").JSX.Element;
//# sourceMappingURL=WrappedPresencePanel.d.ts.map