import { CSSProperties } from 'react';
import { JSX } from 'react';
import { ReactNode } from 'react';
import { RefObject } from 'react';

declare interface ActivityEvent {
    id: string;
    eventType: string;
    detail: Record<string, unknown>;
    timestamp: string;
    userId?: string;
    displayName?: string;
    color?: string;
    source: 'local' | 'remote';
}

export declare function ActivityPanel({ idToken, sendMessage, onMessage, connectionState }: ActivityPanelProps): JSX.Element;

declare interface ActivityPanelProps {
    idToken: string | null;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: OnMessageFn_6;
    connectionState: ConnectionState;
}

declare interface ChatMessage {
    id?: string;
    clientId: string;
    content: string;
    timestamp: string;
    displayName?: string;
    avatarUrl?: string;
}

export declare function ChatPanel({ messages, onSend, disabled, onTyping, typingUsers, tone, showHeader, fill, }: ChatPanelProps): JSX.Element;

export declare interface ChatPanelProps {
    messages: ChatMessage[];
    onSend: (content: string) => void;
    disabled?: boolean;
    onTyping?: (isTyping: boolean) => void;
    typingUsers?: string[];
    /** Surface the panel renders on. 'light' (default) keeps the theme
     *  tokens; 'dark' swaps to white/alpha classes for dark call chrome
     *  (e.g. inside a FloatingPanel next to the call widget) — without it
     *  the message text renders dark-on-dark and disappears. Mirrors
     *  InviteCandidateList's tone seam. */
    tone?: 'light' | 'dark';
    /** Render the panel's own "Chat (n)" heading.
     *
     *  Default: TRUE standalone — every consumer in this repo (the DMs
     *  page's <SocialPanel>, <PanelsView>, <WrappedChatPanel>, the hook
     *  demos) drops the panel into a plain container and relies on it to
     *  name itself. Default FALSE inside a panel dock, which already names
     *  the region with its tab bar — that is where "Chat" appeared twice,
     *  ~40px apart. Pass it explicitly to override either way. */
    showHeader?: boolean;
    /** Fill the parent's height — the message list becomes the flexible
     *  region and the composer sits on the bottom edge — instead of sizing
     *  to a 200px-tall list inside a bordered card.
     *
     *  Default: FALSE standalone (the card is what the DMs page and the
     *  demos expect), TRUE inside a dock, whose column has a definite
     *  height that the body must match or leave a dead band behind. */
    fill?: boolean;
}

export declare function ChatRoom({ idToken, roomId, roomName, onMessage }: ChatRoomProps): JSX.Element;

declare interface ChatRoomProps {
    idToken: string | null;
    roomId: string;
    roomName: string;
    onMessage: OnMessageFn_3;
}

/**
 * Inline comment thread for a single post.
 *
 * Safe to keep mounted across `postId` / `roomId` changes: the underlying
 * `useComments` clears the thread and cancels the in-flight request when
 * either id changes, so a caller does not need a `key` to avoid seeing the
 * previous post's comments.
 */
export declare function CommentThread({ idToken, roomId, postId, onMessage }: CommentThreadProps): JSX.Element;

declare interface CommentThreadProps {
    idToken: string | null;
    roomId: string | null;
    postId: string | null;
    onMessage: OnMessageFn_5;
}

declare type ConnectionState = 'connected' | 'connecting' | 'disconnected';

export declare interface ConversationItem {
    /** Chat channel id — handed back verbatim by `onSelect`. */
    channel: string;
    /** 1 peer for a 1:1 conversation, N for groups. */
    peers: ConversationPeer[];
    lastMessagePreview?: string;
    /** ISO timestamp of the last message. Rendered as HH:MM. */
    lastMessageAt?: string;
    unreadCount?: number;
}

export declare function ConversationList({ items, activeChannel, onSelect, onNewChat, emptyLabel, tone, className, 'data-testid': testId, }: ConversationListProps): JSX.Element;

export declare interface ConversationListProps {
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

export declare interface ConversationPeer {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    color?: string;
    /** Presence: true → online dot, false → offline dot, undefined → no dot. */
    online?: boolean;
}

export declare const DEFAULT_PICKER_EMOJIS: readonly ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯", "😀", "😅", "😉", "😍", "😘", "🤣", "🥰", "😇", "🤔", "😎", "😢", "😡", "🤯", "😱", "🙃", "🤩", "🙏", "🤝", "👋", "👌", "✌️", "🤞", "🤘", "🫶", "✨", "⭐", "💫", "🌟", "⚡", "💥", "☀️", "🌈", "🚀", "🎯", "🏆", "💪", "🎊", "🎈", "🥳", "🎁", "☕", "🍕", "🍔", "🍩", "🍦", "🍓", "🍻", "🍷", "👀", "🤖", "👻", "😺", "🐶", "🦄", "🐝", "🌸"];

/** Formats an ISO timestamp string to HH:MM local time. */
export declare function formatChatTime(isoString: string): string;

/** Error received from the gateway (matches server error-codes.js format) */
declare interface GatewayError {
    /** Standardized error code (e.g. AUTH_TOKEN_EXPIRED, AUTHZ_CHANNEL_DENIED) */
    code: string;
    /** Human-readable description for display */
    message: string;
    timestamp: string;
}

/** A raw message received over the WebSocket */
declare interface GatewayMessage {
    type: string;
    action?: string;
    channel?: string;
    error?: GatewayError;
    [key: string]: unknown;
}

declare interface GatewayMessage_2 {
    type: string;
    channel?: string;
    payload?: unknown;
    [key: string]: unknown;
}

export declare function GroupPanel({ idToken, rooms, createGroupRoom, onRoomSelect, roomsLoading, compact }: GroupPanelProps): JSX.Element;

declare interface GroupPanelProps {
    idToken: string | null;
    rooms: RoomItem[];
    createGroupRoom: (groupId: string, name: string) => Promise<void>;
    onRoomSelect?: (room: RoomItem) => void;
    roomsLoading: boolean;
    compact?: boolean;
}

export declare function MessageGroup({ author, avatarUrl, mine, messages, className, }: MessageGroupProps): JSX.Element | null;

export declare interface MessageGroupItem {
    /** Stable React key for the row. */
    id: string;
    content: ReactNode;
    /** ISO timestamp string; rendered as local HH:MM. */
    timestamp: string;
    /** Optional per-row footer (e.g. a `<ReactionsBar>` specific to this message). */
    footer?: ReactNode;
}

export declare interface MessageGroupProps {
    /** Display name shown on the first row of the group. */
    author: string;
    /** Avatar image URL for the group header. Falls back to initials. */
    avatarUrl?: string;
    /** Mark all rows as the current viewer's own — passed through to each MessageRow. */
    mine?: boolean;
    /** Messages in this group, in chronological order. */
    messages: MessageGroupItem[];
    className?: string;
}

export declare function MessageRow({ author, content, timestamp, avatarUrl, hideAvatar, hideAuthor, mine, footer, tone, className, }: MessageRowProps): JSX.Element;

export declare interface MessageRowProps {
    /** Display name shown next to the message; required even for anonymous rows (use a fallback). */
    author: string;
    /** Message body. Plain text or pre-rendered ReactNode for rich content. */
    content: ReactNode;
    /** ISO timestamp string; rendered as local HH:MM. */
    timestamp: string;
    /** Optional avatar image URL. Falls back to initials derived from `author`. */
    avatarUrl?: string;
    /** Hide the avatar slot (e.g. middle of a MessageGroup). Defaults to false. */
    hideAvatar?: boolean;
    /** Hide the author label (e.g. middle of a MessageGroup). Defaults to false. */
    hideAuthor?: boolean;
    /** Mark this row as the current viewer's own message — exposed on data attr for styling hooks. */
    mine?: boolean;
    /**
     * Slot rendered below the content (e.g. a `<ReactionsBar>` for this message).
     * Indented under the content so it lines up under text, not under the avatar.
     */
    footer?: ReactNode;
    /** Surface the row renders on. 'light' (default) keeps the theme tokens;
     *  'dark' swaps to white/alpha classes for dark call chrome — without it
     *  the message text renders dark-on-dark and disappears. Mirrors
     *  InviteCandidateList's tone seam. */
    tone?: 'light' | 'dark';
    className?: string;
}

declare type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_2 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_3 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_4 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_5 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_6 = (handler: (msg: GatewayMessage_2) => void) => () => void;

export declare function PostFeed({ idToken, roomId, onMessage }: PostFeedProps): JSX.Element;

declare interface PostFeedProps {
    idToken: string | null;
    /**
     * Room whose posts are shown. Changing this resets the feed: the previous
     * room's posts and paging cursor are dropped and its in-flight request is
     * ignored, so a caller does NOT need `key={roomId}` to avoid a wrong-room
     * render. (It used to: the slower of two overlapping requests won, so
     * switching rooms could repaint the new room with the old room's posts.)
     */
    roomId: string | null;
    onMessage: OnMessageFn_4;
}

export declare function PresencePanel({ users, currentClientId }: PresencePanelProps): JSX.Element;

declare interface PresencePanelProps {
    users: PresenceUser[];
    currentClientId: string | null;
}

declare interface PresenceUser {
    clientId: string;
    status: string;
    metadata: Record<string, unknown>;
}

export declare function ReactionPickerPopover({ open, onSelect, onClose, triggerRef, emojis, showSearch, className, style, }: ReactionPickerPopoverProps): JSX.Element | null;

export declare interface ReactionPickerPopoverProps {
    /** Controls visibility. */
    open: boolean;
    /** Fires with the chosen emoji. */
    onSelect: (emoji: string) => void;
    /** Fires when the popover should close (Escape, click outside, select). */
    onClose: () => void;
    /**
     * Trigger element to anchor against. When provided, the popover positions
     * itself above the trigger; otherwise it falls back to absolute centering
     * at top:auto/left:0 (useful inside a relatively-positioned container).
     */
    triggerRef?: RefObject<HTMLElement | null>;
    /** Override the emoji list. Defaults to 64. */
    emojis?: readonly string[];
    /** Render a search input above the grid. Defaults to true. */
    showSearch?: boolean;
    className?: string;
    style?: CSSProperties;
}

export declare function ReactionsBar({ reactions, onReact, disabled, pickerEmojis, addTriggerLabel, hideAddTrigger, className, }: ReactionsBarProps): JSX.Element;

export declare interface ReactionsBarProps {
    reactions: ReactionSummary[];
    /**
     * Called when the viewer clicks a chip (toggle) OR picks an emoji from
     * the popover. The consumer decides whether this is an add or a remove
     * based on the `mine` flag of the matching chip.
     */
    onReact: (emoji: string) => void;
    /**
     * Disables both the chips and the add-reaction trigger (e.g. when the
     * connection is not 'connected'). Defaults to false.
     */
    disabled?: boolean;
    /**
     * Override the popover emoji set. Defaults to the 64-emoji 8x8 grid.
     */
    pickerEmojis?: readonly string[];
    /** Override the add-reaction trigger label. Defaults to a "+" plus emoji. */
    addTriggerLabel?: ReactNode;
    /** Hide the add-reaction trigger entirely (read-only mode). */
    hideAddTrigger?: boolean;
    className?: string;
}

export declare interface ReactionSummary {
    emoji: string;
    count: number;
    /** True if the local viewer is one of the reactors. */
    mine?: boolean;
}

declare interface RoomItem {
    roomId: string;
    channelId: string;
    name: string;
    type: 'standalone' | 'group' | 'dm';
    ownerId: string;
    groupId?: string;
    dmPeerUserId?: string;
    createdAt: string;
}

export declare function RoomList({ idToken, rooms, createRoom, createDM, loading, error, onRetry, onRoomSelect, activeRoomId, compact }: RoomListProps): JSX.Element;

declare interface RoomListProps {
    idToken: string | null;
    rooms: RoomItem[];
    createRoom: (name: string) => Promise<void>;
    createDM: (peerId: string) => Promise<void>;
    loading: boolean;
    /** Inline-render an error + retry control instead of the empty state when set. */
    error?: string | null;
    onRetry?: () => void;
    onRoomSelect: (room: RoomItem) => void;
    activeRoomId?: string | null;
    compact?: boolean;
}

export declare function SocialPanel({ idToken, onMessage }: {
    idToken: string | null;
    onMessage: OnMessageFn;
}): JSX.Element;

export declare function SocialTabContent({ userId, displayName, idToken, rooms, createRoom, createDM, createGroupRoom, roomsLoading, roomsError, onRoomsRetry, handleRoomSelect, activeRoomId, onMessage, }: SocialTabContentProps): JSX.Element;

declare interface SocialTabContentProps {
    userId: string;
    displayName: string;
    userEmail: string;
    connectionState: string;
    idToken: string | null;
    rooms: RoomItem[];
    createRoom: (name: string) => Promise<void>;
    createDM: (targetUserId: string) => Promise<void>;
    createGroupRoom: (groupId: string, name: string) => Promise<void>;
    roomsLoading: boolean;
    roomsError?: string | null;
    onRoomsRetry?: () => void;
    handleRoomSelect: (room: RoomItem) => void;
    activeRoomId: string | null;
    activityEvents: ActivityEvent[];
    onMessage: OnMessageFn_2;
}

export { }
