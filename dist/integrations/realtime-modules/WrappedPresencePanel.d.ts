import type { RMUsePresenceReturn } from './types';
export interface WrappedPresencePanelProps {
    /** Return value of usePresence(channel) from realtime-modules */
    presence: RMUsePresenceReturn;
    /** The local user's clientId (from useGateway().clientId) */
    currentClientId: string | null;
}
export declare function WrappedPresencePanel({ presence, currentClientId, }: WrappedPresencePanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=WrappedPresencePanel.d.ts.map