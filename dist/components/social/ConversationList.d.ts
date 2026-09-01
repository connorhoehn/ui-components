export interface ConversationPeer {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    color?: string;
    /** Presence: true → online dot, false → offline dot, undefined → no dot. */
    online?: boolean;
}
export interface ConversationItem {
    /** Chat channel id — handed back verbatim by `onSelect`. */
    channel: string;
    /** 1 peer for a 1:1 conversation, N for groups. */
    peers: ConversationPeer[];
    lastMessagePreview?: string;
    /** ISO timestamp of the last message. Rendered as HH:MM. */
    lastMessageAt?: string;
    unreadCount?: number;
}
export interface ConversationListProps {
    items: ConversationItem[];
    /** Channel of the conversation currently open — its row highlights. */
    activeChannel?: string | null;
    onSelect: (channel: string) => void;
    /** Renders a "+ New chat" affordance above the rows when set. */
    onNewChat?: () => void;
    /** Empty-state text. Defaults to "No conversations yet". */
    emptyLabel?: string;
    tone?: 'light' | 'dark';
    className?: string;
    'data-testid'?: string;
}
export declare function ConversationList({ items, activeChannel, onSelect, onNewChat, emptyLabel, tone, className, 'data-testid': testId, }: ConversationListProps): import("react").JSX.Element;
export default ConversationList;
//# sourceMappingURL=ConversationList.d.ts.map