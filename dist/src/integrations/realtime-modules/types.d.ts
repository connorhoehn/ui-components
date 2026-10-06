/** Mirror of realtime-modules/src/client/types.ts ChatMessage */
export interface RMChatMessage {
    id: string;
    clientId: string;
    /**
     * The AUTHENTICATED author. realtime-modules has emitted this since the
     * gateway started stamping it, but this mirror never declared it, so the
     * adapter below could not carry it even in principle — and "is this message
     * mine" keys on exactly this field. Without it every message in an embedded
     * transcript belongs to somebody else.
     */
    userId?: string;
    channel: string;
    /** NOTE: realtime-modules uses `message`, not `content` */
    message: string;
    metadata?: Record<string, unknown>;
    timestamp: string;
}
/** Mirror of realtime-modules/src/client/types.ts PresenceStatus */
export type RMPresenceStatus = 'online' | 'away' | 'busy' | 'offline';
/** Mirror of realtime-modules/src/client/types.ts PresenceEntry */
export interface RMPresenceEntry {
    clientId: string;
    status: RMPresenceStatus;
    metadata: Record<string, unknown>;
    channels: string[];
    nodeId: string;
    timestamp: string;
    lastSeen: string;
    lastHeartbeat: number;
}
/** Mirror of realtime-modules/src/client/types.ts CursorEntry */
export interface RMCursorEntry {
    clientId: string;
    channel: string;
    position: Record<string, unknown>;
    metadata: Record<string, unknown> & {
        mode?: string;
        userInitials?: string;
        userColor?: string;
    };
    timestamp: string;
}
/** Return shape of `useCursor(channel)` from realtime-modules (singular hook). */
export interface RMUseCursorReturn {
    /** Live cursors for the channel, excluding your own. */
    cursors: RMCursorEntry[];
    /** Publish your position (throttled by the hook). */
    move: (position: Record<string, unknown>, metadata?: Record<string, unknown>) => void;
    refresh?: () => void;
}
/** Mirror of realtime-modules/src/client/types.ts Reaction */
export interface RMReaction {
    id: string;
    clientId: string;
    channel: string;
    emoji: string;
    effect: string;
    position: unknown;
    metadata: Record<string, unknown>;
    timestamp: string;
    /**
     * The entity this reaction is ON — a messageId, an articleId, a commentId.
     *
     * Absent for a floating call reaction, which is addressed to the moment
     * rather than to anything. Present for every reaction that AGGREGATES, and
     * this mirror not declaring it is why the embed path could render the
     * confetti but never a reaction chip: `reactionsFor(messageId)` has nothing
     * to filter on when the field does not exist.
     */
    targetId?: string;
    /**
     * Stable owner id, stamped server-side from the connection's authenticated
     * context (never from the frame). This — not `clientId`, which is a socket
     * and changes on every reconnect — is what makes "you already reacted"
     * answerable across a reload, so grouping and toggling both key on it.
     */
    userId?: string;
    /** Owner's display name, stamped alongside `userId`. */
    displayName?: string;
}
/** Mirror of realtime-modules/src/client/types.ts ActivityEvent */
export interface RMActivityEvent {
    eventType: string;
    detail: Record<string, unknown>;
    timestamp: string;
    userId: string | null;
    displayName: string;
}
/** Mirror of realtime-modules/src/client/useFileUpload.ts FileUploadState */
export interface RMFileUploadState {
    id: string;
    filename: string;
    size: number;
    status: 'pending' | 'uploading' | 'completed' | 'failed' | 'scanning' | 'clean' | 'infected';
    progress?: number;
    uploadUrl?: string;
    downloadUrl?: string;
    error?: string;
    /**
     * The SERVER's id for this transfer, once the gateway has minted one.
     *
     * Distinct from `id`, the client's own correlation id. Every channel-wide
     * frame — progress, completion, cancellation — is keyed by this, so a
     * caller matching its own upload to what the channel reports needs it.
     */
    transferId?: string;
}
/** Mirror of realtime-modules/src/client/useVideoHangout.ts HangoutParticipant */
export interface RMHangoutParticipant {
    clientId: string;
    displayName?: string;
    role: 'host' | 'participant' | 'viewer';
    videoOn: boolean;
    audioOn: boolean;
    joinedAt: string;
}
/** Mirror of realtime-modules/src/client/useVideoHangout.ts HangoutSession */
export interface RMHangoutSession {
    id: string;
    type: string;
    createdAt: string;
}
/** Mirror of realtime-modules/src/client/useNotifications.ts NotificationHookEntry */
export interface RMNotificationEntry {
    id: string;
    type: string;
    title: string;
    body?: string;
    timestamp: string;
    read?: boolean;
    channel?: string;
    payload?: Record<string, unknown>;
    /** Optional CTA the host can render as a button or link. */
    action?: {
        label: string;
        href?: string;
        onClickEvent?: string;
    };
}
/** Mirror of realtime-modules/src/client/useCapability.ts CapabilityHookResult */
export interface RMCapabilityHookResult {
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
export interface RMUseChatReturn {
    messages: RMChatMessage[];
    /**
     * Post to the channel. `metadata` rides the message verbatim.
     *
     * This mirror used to declare a one-argument function, which typechecked
     * against the real hook (fewer params always does) and quietly made the
     * second one unreachable — so an embedded thread sent every message with no
     * `displayName` and no `avatarUrl`, and every recipient saw an unnamed,
     * faceless row. It is also where a reply's quote rides.
     */
    sendMessage: (text: string, metadata?: Record<string, unknown>) => void;
    loadHistory: (limit?: number) => void;
}
export interface RMUsePresenceReturn {
    roster: RMPresenceEntry[];
    setStatus: (status: RMPresenceStatus) => void;
    updateMetadata: (meta: Record<string, unknown>) => void;
}
export interface RMUseReactionsReturn {
    reactions: RMReaction[];
    /** Send an emoji reaction, optionally addressed to an entity. */
    react: (emoji: string, opts?: {
        targetId?: string;
        metadata?: Record<string, unknown>;
    }) => void;
    /**
     * The channel's reactions filtered to one target. Optional here because a
     * host on an older realtime-modules has only `reactions` — read it through
     * `adaptMessageReactions`, which falls back to filtering the list itself.
     */
    reactionsFor?: (targetId: string) => RMReaction[];
    /** Take back your own reaction. Only targeted reactions are removable. */
    unreact?: (emoji: string, opts?: {
        targetId?: string;
    }) => void;
    /**
     * React or un-react depending on whether `userId` already has this emoji on
     * the target — what a reaction CHIP does, since a chip is a toggle and only
     * the hook holds the list that decides which way it goes.
     */
    toggle?: (emoji: string, opts?: {
        targetId?: string;
        userId: string;
    }) => void;
}
export interface RMUseActivityReturn {
    events: RMActivityEvent[];
    loadHistory: (limit?: number) => void;
}
/**
 * A transfer moving through the channel right now — possibly somebody else's.
 *
 * `uploads` is the viewer's own outbox; this is the shared truth. Mirrors
 * realtime-modules' ChannelTransfer.
 */
export interface RMChannelTransfer {
    transferId: string;
    /** Human-facing attribution, so a recipient reads "Ada is sending…". */
    actor: string;
    /** Authed user id of the sender — the reliable identity for "is this mine". */
    uploader: string;
    name: string;
    size: number;
    /** Bytes the SERVER has counted. Never a client's self-report. */
    transferred: number;
    phase: 'started' | 'transferring' | 'verifying' | 'complete' | 'failed' | 'cancelled';
    contentType?: string;
    preview?: string;
    width?: number;
    height?: number;
    error?: string;
    downloadUrl?: string;
}
export interface RMUseFileUploadReturn {
    uploads: RMFileUploadState[];
    /**
     * Every transfer in flight in this channel, the viewer's own included.
     *
     * Optional only so a host on an older realtime-modules still typechecks.
     * Without it a file someone else drags in is invisible until it has fully
     * arrived and then materialises out of nowhere — which is the whole reason
     * the shared list exists.
     */
    transfers?: RMChannelTransfer[];
    upload(file: File, opts?: {
        metadata?: Record<string, unknown>;
    }): Promise<RMFileUploadState>;
    cancel(id: string): void;
    /** Cancel by the server-minted transfer id (what the UI renders). */
    cancelTransfer?: (transferId: string) => void;
    removeCompleted(): void;
}
export interface RMUseVideoHangoutReturn {
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
export interface RMUseNotificationsReturn {
    notifications: RMNotificationEntry[];
    unreadCount: number;
    markAsRead: (id: string) => void;
    markAllRead: () => void;
    remove: (id: string) => void;
    clearAll: () => void;
}
export type RMRoomVisibility = 'org' | 'private';
export type RMRoomState = 'active' | 'archived';
export interface RMRoomSettings {
    audioOnly: boolean;
    recordingEnabled: boolean;
    softCap: number;
}
export interface RMRoom {
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
export interface RMRoomOccupancyMember {
    userId: string;
    displayName?: string;
    participantId: string;
}
export interface RMRoomOccupancy {
    slug: string;
    count: number;
    members: RMRoomOccupancyMember[];
}
export interface RMCreateRoomInput {
    name: string;
    description?: string;
    visibility?: RMRoomVisibility;
    settings?: Partial<RMRoomSettings>;
}
export interface RMJoinRoomResult {
    room: RMRoom;
    sessionId: string;
    token: string;
    participantId: string;
}
export interface RMUseHangoutRoomsReturn {
    rooms: RMRoom[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    createRoom: (input: RMCreateRoomInput) => Promise<RMRoom>;
    archiveRoom: (slug: string) => Promise<void>;
    joinRoom: (slug: string) => Promise<RMJoinRoomResult>;
}
export interface RMUseRoomOccupancyReturn {
    occupancy: RMRoomOccupancy | null;
}
//# sourceMappingURL=types.d.ts.map