import type { RMUseChatReturn, RMUsePresenceReturn } from './types';
import { type NetworkShimOptions } from './networkShim';
export interface WrappedChatPanelProps {
    /** Return value of useChat(channel) from realtime-modules */
    chat: RMUseChatReturn;
    /** Optional presence hook return — used to derive typingUsers */
    presence?: RMUsePresenceReturn;
    /** Forwarded to ChatPanel */
    disabled?: boolean;
    /** Override typing banner (supersedes presence-derived list) */
    typingUsers?: string[];
    /**
     * Opt-in: wrap the rendered ChatPanel in a NetworkErrorBoundary +
     * ReconnectingShim using the supplied connection state and retry
     * callback. Omit for no wrapping (default).
     */
    wrapWithNetworkShim?: NetworkShimOptions;
}
export declare function WrappedChatPanel({ chat, presence, disabled, typingUsers: typingUsersOverride, wrapWithNetworkShim, }: WrappedChatPanelProps): import("react").JSX.Element;
//# sourceMappingURL=WrappedChatPanel.d.ts.map