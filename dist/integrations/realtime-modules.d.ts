import { JSX } from 'react/jsx-runtime';
import { MouseEvent as MouseEvent_2 } from 'react';
import { ReactNode } from 'react';
import { RoomsIndexSubscriber } from '@connorhoehn/realtime-modules/client/hangout-rooms';

declare interface ActivityFeedItem {
    id: string;
    /** Display name of the person who performed the action, e.g. "Alex Chen". */
    actor: string;
    /** Verb phrase, e.g. "completed". */
    action: string;
    /** Jira-style ticket ID badge, e.g. "K8S-182". */
    ticketId?: string;
    /** Short description/title of the work item. */
    subject: string;
    /** Human-readable relative timestamp, e.g. "2m ago". */
    timeLabel?: string;
    /** Controls the type-dot color. */
    kind?: ActivityKind;
}

declare interface ActivityFeedProps {
    items: ActivityFeedItem[];
    /** Number of items visible at once (default: 3). */
    visibleCount?: number;
    /** Auto-rotation interval in ms (default: 4200). Set 0 to disable. */
    rotateMs?: number;
    /** Delay before the first rotation fires, for stagger between sibling feeds (ms). */
    staggerMs?: number;
    /** Override dot colors per kind. Merged over the built-in palette. */
    kindColors?: Record<string, string>;
    className?: string;
}

declare type ActivityKind = 'task' | 'pr' | 'decision' | 'comment' | 'status' | string;

export declare function adaptActivityEvent(event: RMActivityEvent): ActivityFeedItem;

export declare function adaptActivityEvents(events: RMActivityEvent[]): ActivityFeedItem[];

export declare function adaptChatMessage(msg: RMChatMessage): ChatMessage;

export declare function adaptChatMessages(messages: RMChatMessage[]): ChatMessage[];

export declare function adaptFileUploads(uploads: RMFileUploadState[]): FileUploadSummary[];

export declare function adaptFileUploadState(state: RMFileUploadState): FileUploadSummary;

export declare function adaptHangoutParticipant(participant: RMHangoutParticipant, localClientId?: string | null): HangoutLayoutParticipant;

export declare function adaptHangoutParticipants(participants: RMHangoutParticipant[], localClientId?: string | null): HangoutLayoutParticipant[];

export declare function adaptNotification(n: RMNotificationEntry): NotificationItem;

export declare function adaptNotifications(entries: RMNotificationEntry[]): NotificationItem[];

export declare function adaptPresenceEntry(entry: RMPresenceEntry): PresenceUser;

export declare function adaptPresenceRoster(roster: RMPresenceEntry[]): PresenceUser[];

export declare function adaptReaction(reaction: RMReaction, index: number): EphemeralReaction;

export declare function adaptReactions(reactions: RMReaction[]): EphemeralReaction[];

export declare function CapabilityBoundary({ capability, loading, fallback, children, }: CapabilityBoundaryProps): JSX.Element;

export declare interface CapabilityBoundaryProps {
    /** Return value of useCapability(name) from realtime-modules */
    capability: RMCapabilityHookResult;
    /** Rendered while capability.isLoading is true */
    loading?: ReactNode;
    /** Rendered when capability.enabled is false (and not loading) */
    fallback?: ReactNode;
    /** Rendered when capability.enabled is true */
    children: ReactNode;
}

declare interface ChatMessage {
    id?: string;
    clientId: string;
    content: string;
    timestamp: string;
    displayName?: string;
    avatarUrl?: string;
}

declare interface EphemeralReaction {
    id: string;
    emoji: string;
    x: number;
    y: number;
    timestamp: string;
}

export declare interface FileUploadSummary {
    id: string;
    filename: string;
    /** 0–100 */
    progress: number;
    status: RMFileUploadState['status'];
    downloadUrl?: string;
    error?: string;
}

declare interface HangoutLayoutParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isLocal?: boolean;
    /** Pre-rendered video element — typically `<video ref={…} autoPlay playsInline />`. */
    videoElement?: ReactNode;
}

declare type HangoutMode = 'auto' | 'spotlight';

export declare function HangoutRoomRow({ slug, name, participantId, occupancy, subscribeRoomsIndex, onClick, onContextMenu, kebab, className, 'data-testid': testId, }: HangoutRoomRowProps): JSX.Element;

export declare interface HangoutRoomRowProps {
    /** Room slug (immutable identifier). */
    slug: string;
    /** Visible room name. */
    name: string;
    /** This tab's participantId, if currently in the room. Used to drive
     *  the `active` highlight and the "Just you" pulse. */
    participantId?: string;
    /** Latest occupancy snapshot for this room, or null when not yet
     *  received from the gateway. Ignored when `subscribeRoomsIndex` is
     *  provided. */
    occupancy?: RMRoomOccupancy | null;
    /** Live adapter wiring the gateway's `rooms:index` stream into
     *  `useRoomOccupancy(slug)`. When set, takes precedence over the
     *  static `occupancy` prop. */
    subscribeRoomsIndex?: RoomsIndexSubscriber;
    /** Fired on row click — caller opens the hangout overlay. */
    onClick?: () => void;
    /** Fired on right-click — caller can show a context menu. */
    onContextMenu?: (e: MouseEvent_2<HTMLElement>) => void;
    /** Optional kebab node passed through to the row. */
    kebab?: React.ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare function HangoutRoomsSection({ rooms, occupancyFor, occupancyAdapter, participantId, onJoinRoom, onContextMenu, onBrowseAll, maxVisible, title, storageKey, renderCreateDialog, }: HangoutRoomsSectionProps): JSX.Element;

export declare interface HangoutRoomsSectionProps {
    /** Return value of `useHangoutRooms()` from realtime-modules. */
    rooms: RMUseHangoutRoomsReturn;
    /** Resolves the latest occupancy snapshot for one slug. Legacy
     *  pattern — when `occupancyAdapter` is supplied, that adapter wins
     *  and this callback is ignored on a per-row basis. */
    occupancyFor?: (slug: string) => RMRoomOccupancy | null;
    /** Live gateway adapter — when provided, each row drives its own
     *  `useRoomOccupancy(slug)` off this subscriber and the static
     *  `occupancyFor` lookup is bypassed. The expected shape matches the
     *  `subscribeRoomsIndex` adapter returned by `useRoomsSubscription`
     *  in the gateway frontend. */
    occupancyAdapter?: RoomsIndexSubscriber;
    /** Per-tab participantId — used to highlight rooms this tab is in. */
    participantId?: string;
    /** Called when a row is clicked. Caller opens the hangout overlay. */
    onJoinRoom?: (room: RMRoom) => void;
    /** Called when a row is right-clicked. */
    onContextMenu?: (room: RMRoom, e: MouseEvent_2<HTMLElement>) => void;
    /** Called when "Browse all" is clicked (when rooms exceed `maxVisible`). */
    onBrowseAll?: () => void;
    /** Max rows to render inline. Defaults to 10. */
    maxVisible?: number;
    /** Section title override. Defaults to "Rooms". */
    title?: string;
    /** Section storageKey override (collapse persistence). */
    storageKey?: string;
    /** Custom create renderer — when omitted the built-in dialog is used. */
    renderCreateDialog?: (props: {
        open: boolean;
        onClose: () => void;
    }) => React.ReactNode;
}

export declare function NewHangoutRoomDialog({ open, onClose, onCreate, onCreated, defaultVisibility, }: NewHangoutRoomDialogProps): JSX.Element;

export declare interface NewHangoutRoomDialogProps {
    open: boolean;
    onClose: () => void;
    /** Imperative create — typically `rooms.createRoom` from useHangoutRooms. */
    onCreate: (input: RMCreateRoomInput) => Promise<RMRoom>;
    /** Fires after a successful create; caller may auto-join the room. */
    onCreated?: (room: RMRoom) => void;
    /** Default visibility. Server defaults to 'org' if omitted. */
    defaultVisibility?: RMRoomVisibility;
}

declare interface NotificationCenterProps {
    items: NotificationItem[];
    onItemClick?: (item: NotificationItem) => void;
    onMarkAllRead?: () => void;
    onClearAll?: () => void;
    className?: string;
    'data-testid'?: string;
}

declare interface NotificationItem {
    id: string;
    title: string;
    body?: string;
    timestamp?: string | number;
    read?: boolean;
    /** Optional icon / emoji / ReactNode prefix */
    icon?: string;
    /** Optional grouping / category label */
    category?: string;
}

declare interface PresenceUser {
    /** Unique identifier for the user */
    id: string;
    name: string;
    /** Optional avatar image URL */
    avatarUrl?: string;
    online?: boolean;
}

/** Mirror of realtime-modules/src/client/types.ts ActivityEvent */
export declare interface RMActivityEvent {
    eventType: string;
    detail: Record<string, unknown>;
    timestamp: string;
    userId: string | null;
    displayName: string;
}

/** Mirror of realtime-modules/src/client/useCapability.ts CapabilityHookResult */
export declare interface RMCapabilityHookResult {
    capability: {
        name: string;
        enabled: boolean;
        channel?: string;
        version?: string;
        metadata?: Record<string, unknown>;
    } | null;
    enabled: boolean;
    isLoading: boolean;
    error?: Error;
}

/** Mirror of realtime-modules/src/client/types.ts ChatMessage */
export declare interface RMChatMessage {
    id: string;
    clientId: string;
    channel: string;
    /** NOTE: realtime-modules uses `message`, not `content` */
    message: string;
    metadata?: Record<string, unknown>;
    timestamp: string;
}

export declare interface RMCreateRoomInput {
    name: string;
    description?: string;
    visibility?: RMRoomVisibility;
    settings?: Partial<RMRoomSettings>;
}

/** Mirror of realtime-modules/src/client/useFileUpload.ts FileUploadState */
export declare interface RMFileUploadState {
    id: string;
    filename: string;
    size: number;
    status: 'pending' | 'uploading' | 'completed' | 'failed' | 'scanning' | 'clean' | 'infected';
    progress?: number;
    uploadUrl?: string;
    downloadUrl?: string;
    error?: string;
}

/** Mirror of realtime-modules/src/client/useVideoHangout.ts HangoutParticipant */
export declare interface RMHangoutParticipant {
    clientId: string;
    displayName?: string;
    role: 'host' | 'participant' | 'viewer';
    videoOn: boolean;
    audioOn: boolean;
    joinedAt: string;
}

/** Mirror of realtime-modules/src/client/useVideoHangout.ts HangoutSession */
export declare interface RMHangoutSession {
    id: string;
    type: string;
    createdAt: string;
}

export declare interface RMJoinRoomResult {
    room: RMRoom;
    sessionId: string;
    token: string;
    participantId: string;
}

/** Mirror of realtime-modules/src/client/useNotifications.ts NotificationHookEntry */
export declare interface RMNotificationEntry {
    id: string;
    type: string;
    title: string;
    body?: string;
    timestamp: string;
    read?: boolean;
    channel?: string;
    payload?: Record<string, unknown>;
}

/** Mirror of realtime-modules/src/client/types.ts PresenceEntry */
export declare interface RMPresenceEntry {
    clientId: string;
    status: RMPresenceStatus;
    metadata: Record<string, unknown>;
    channels: string[];
    nodeId: string;
    timestamp: string;
    lastSeen: string;
    lastHeartbeat: number;
}

/** Mirror of realtime-modules/src/client/types.ts PresenceStatus */
export declare type RMPresenceStatus = 'online' | 'away' | 'busy' | 'offline';

/** Mirror of realtime-modules/src/client/types.ts Reaction */
export declare interface RMReaction {
    id: string;
    clientId: string;
    channel: string;
    emoji: string;
    effect: string;
    position: unknown;
    metadata: Record<string, unknown>;
    timestamp: string;
}

export declare interface RMRoom {
    orgId: string;
    roomId: string;
    slug: string;
    name: string;
    description?: string;
    createdBy: string;
    createdAt: string;
    visibility: RMRoomVisibility;
    settings: RMRoomSettings;
    state: RMRoomState;
    lastActiveAt: string;
}

export declare interface RMRoomOccupancy {
    slug: string;
    count: number;
    members: RMRoomOccupancyMember[];
}

export declare interface RMRoomOccupancyMember {
    userId: string;
    displayName?: string;
    participantId: string;
}

export declare interface RMRoomSettings {
    audioOnly: boolean;
    recordingEnabled: boolean;
    softCap: number;
}

export declare type RMRoomState = 'active' | 'archived';

export declare type RMRoomVisibility = 'org' | 'private';

export declare interface RMUseActivityReturn {
    events: RMActivityEvent[];
    loadHistory: (limit?: number) => void;
}

export declare interface RMUseChatReturn {
    messages: RMChatMessage[];
    sendMessage: (text: string) => void;
    loadHistory: (limit?: number) => void;
}

export declare interface RMUseFileUploadReturn {
    uploads: RMFileUploadState[];
    upload(file: File, opts?: {
        metadata?: Record<string, unknown>;
    }): Promise<RMFileUploadState>;
    cancel(id: string): void;
    removeCompleted(): void;
}

export declare interface RMUseHangoutRoomsReturn {
    rooms: RMRoom[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    createRoom: (input: RMCreateRoomInput) => Promise<RMRoom>;
    archiveRoom: (slug: string) => Promise<void>;
    joinRoom: (slug: string) => Promise<RMJoinRoomResult>;
}

export declare interface RMUseNotificationsReturn {
    notifications: RMNotificationEntry[];
    unreadCount: number;
    markAsRead: (id: string) => void;
    markAllRead: () => void;
    remove: (id: string) => void;
    clearAll: () => void;
}

export declare interface RMUsePresenceReturn {
    roster: RMPresenceEntry[];
    setStatus: (status: RMPresenceStatus) => void;
    updateMetadata: (meta: Record<string, unknown>) => void;
}

export declare interface RMUseReactionsReturn {
    reactions: RMReaction[];
    react: (emoji: string) => void;
}

export declare interface RMUseRoomOccupancyReturn {
    occupancy: RMRoomOccupancy | null;
}

export declare interface RMUseVideoHangoutReturn {
    session: RMHangoutSession | null;
    participants: RMHangoutParticipant[];
    joinToken: string | null;
    start(opts?: {
        type?: 'hangout' | 'call';
        metadata?: Record<string, unknown>;
    }): Promise<void>;
    join(sessionId: string): Promise<void>;
    leave(): Promise<void>;
    end(): Promise<void>;
    toggleVideo(): void;
    toggleAudio(): void;
}

/** Strip non-alphanumeric, lowercase, hyphenate. Mirrors typical
 *  server-side slug generation closely enough for a preview UI. */
export declare function slugifyRoomName(input: string): string;

export declare function WrappedActivityPanel({ activity, visibleCount, rotateMs, staggerMs, kindColors, className, }: WrappedActivityPanelProps): JSX.Element;

export declare interface WrappedActivityPanelProps {
    /** Return value of useActivity(channel) from realtime-modules */
    activity: RMUseActivityReturn;
    /** Forwarded to ActivityFeed */
    visibleCount?: ActivityFeedProps['visibleCount'];
    rotateMs?: ActivityFeedProps['rotateMs'];
    staggerMs?: ActivityFeedProps['staggerMs'];
    kindColors?: ActivityFeedProps['kindColors'];
    className?: string;
}

export declare function WrappedChatPanel({ chat, presence, disabled, typingUsers: typingUsersOverride, }: WrappedChatPanelProps): JSX.Element;

export declare interface WrappedChatPanelProps {
    /** Return value of useChat(channel) from realtime-modules */
    chat: RMUseChatReturn;
    /** Optional presence hook return — used to derive typingUsers */
    presence?: RMUsePresenceReturn;
    /** Forwarded to ChatPanel */
    disabled?: boolean;
    /** Override typing banner (supersedes presence-derived list) */
    typingUsers?: string[];
}

export declare function WrappedFileUploadDrop({ fileUpload, accept, maxSize, multiple, disabled, label, className, uploadMetadata, onError, }: WrappedFileUploadDropProps): JSX.Element;

export declare interface WrappedFileUploadDropProps {
    /** Return value of useFileUpload(channel) from realtime-modules */
    fileUpload: RMUseFileUploadReturn;
    /** Forwarded to FileUploadDrop */
    accept?: string;
    maxSize?: number;
    multiple?: boolean;
    disabled?: boolean;
    label?: string;
    className?: string;
    /** Optional metadata attached to each upload request */
    uploadMetadata?: Record<string, unknown>;
    /** Called when any upload fails */
    onError?: (message: string) => void;
}

export declare function WrappedHangoutLayout({ hangout, localClientId, videoElements, mode, spotlightContent, activeSpeakerId, speakerHysteresisMs, onParticipantClick, className, }: WrappedHangoutLayoutProps): JSX.Element;

export declare interface WrappedHangoutLayoutProps {
    /** Return value of useVideoHangout(channel) from realtime-modules */
    hangout: RMUseVideoHangoutReturn;
    /** The local user's clientId (used to separate local vs remote tiles) */
    localClientId?: string | null;
    /** Keyed by participant clientId — caller wires actual <video> elements */
    videoElements?: Record<string, ReactNode>;
    /** Forwarded to HangoutLayout */
    mode?: HangoutMode;
    spotlightContent?: ReactNode;
    activeSpeakerId?: string | null;
    speakerHysteresisMs?: number;
    onParticipantClick?: (id: string) => void;
    className?: string;
}

export declare function WrappedNotificationCenter({ notifications, onItemClick, ...rest }: WrappedNotificationCenterProps): JSX.Element;

export declare interface WrappedNotificationCenterProps extends Omit<NotificationCenterProps, 'items' | 'onItemClick' | 'onMarkAllRead' | 'onClearAll'> {
    /** Return value of useNotifications(channel?) from realtime-modules */
    notifications: RMUseNotificationsReturn;
    /** Override item click handler (default: markAsRead on the clicked id) */
    onItemClick?: (item: NotificationItem) => void;
}

export declare function WrappedPresencePanel({ presence, currentClientId, }: WrappedPresencePanelProps): JSX.Element;

export declare interface WrappedPresencePanelProps {
    /** Return value of usePresence(channel) from realtime-modules */
    presence: RMUsePresenceReturn;
    /** The local user's clientId (from useGateway().clientId) */
    currentClientId: string | null;
}

export declare function WrappedReactionsOverlay({ reactions: reactionsHook, ttlMs, }: WrappedReactionsOverlayProps): JSX.Element;

export declare interface WrappedReactionsOverlayProps {
    /** Return value of useReactions(channel) from realtime-modules */
    reactions: RMUseReactionsReturn;
    /**
     * How long (ms) each reaction remains visible before fading out.
     * Default 2500 matches the CSS animation duration.
     */
    ttlMs?: number;
}

export { }
