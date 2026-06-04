import type { RMUseChatReturn, RMUsePresenceReturn } from './types';
export interface WrappedChatPanelProps {
    /** Return value of useChat(channel) from realtime-modules */
    chat: RMUseChatReturn;
    /** Optional presence hook return — used to derive typingUsers */
    presence?: RMUsePresenceReturn;
    /** Forwarded to ChatPanel */
    disabled?: boolean;
    /** Override typing banner (supersedes presence-derived list) */
    typingUsers?: string[];
}
export declare function WrappedChatPanel({ chat, presence, disabled, typingUsers: typingUsersOverride, }: WrappedChatPanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=WrappedChatPanel.d.ts.map