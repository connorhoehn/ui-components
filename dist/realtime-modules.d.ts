import { Component } from 'react';
import { ErrorInfo } from 'react';
import { HangoutConnectionState } from '@connorhoehn/realtime-modules/client/video';
import { JSX } from 'react';
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

/**
 * Wrap `node` in NetworkErrorBoundary + ReconnectingShim when `opts` is
 * provided; otherwise return `node` unchanged. Used by Wrapped* adapters
 * as a one-line opt-in for the standard connection-resiliency UI.
 */
export declare function applyNetworkShim(node: ReactNode, opts: NetworkShimOptions | undefined): ReactNode;

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

declare interface ConnectionPillProps {
    state: ConnectionState;
    /** Dot-only rendering — no label text. Default false. */
    compact?: boolean;
    /** Render the text label next to the dot. Default true. Set false for dot-only. */
    withLabel?: boolean;
    /** Override label text per state (e.g. localized strings). */
    labels?: Partial<Record<ConnectionState, string>>;
    className?: string;
    'data-testid'?: string;
}

/** Connection lifecycle states */
declare type ConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

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
    /** Pre-rendered screen-share video element. When ANY participant supplies
     *  this, `<HangoutLayout>` auto-flips to spotlight mode and
     *  `<HangoutSpotlight>` promotes this element into the main slot (the
     *  sharer's camera tile stays visible in the filmstrip). An explicit
     *  `spotlightContent` prop on `<HangoutLayout>` still wins. */
    screenElement?: ReactNode;
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

declare interface MediaEffectsBackgroundOption {
    id: string;
    label: string;
    /** Thumbnail + replacement image URL, rendered as the chip's preview. */
    url: string;
}

declare interface MediaEffectsFilterOption {
    id: string;
    label: string;
}

declare interface MediaEffectsPreviewPanelProps extends Pick<MediaEffectsTrayProps, 'filters' | 'activeFilterId' | 'onSelectFilter' | 'backgrounds' | 'backgroundMode' | 'activeBackgroundUrl' | 'onSelectBackground' | 'faceSprites' | 'activeFaceSpriteId' | 'onSelectFaceSprite'> {
    /**
     * True while a preview session is open — i.e. the controller has a
     * non-null `draft` and its setters write that draft instead of the
     * live pipeline. When false the panel renders read-only and NO
     * selection callback fires, so nothing can reach peers.
     */
    previewActive: boolean;
    /**
     * The draft self-view (built from the controller's `previewTrack`).
     * Never published. Pass null for the camera-off / warming-up state.
     */
    previewStream: MediaStream | null;
    /** Draft differs from live. Gates Apply. */
    isDirty: boolean;
    /** Commit the draft — the only thing that changes what peers see. */
    onApply: () => void;
    /** Discard the draft and dismiss. Live stays untouched. */
    onCancel: () => void;
    /** Extra dimming on top of `previewActive`, e.g. while the engine warms. */
    disabled?: boolean;
    /** Panel heading. Defaults to "Video effects" (Teams' wording). */
    title?: string;
    /** Label for the commit button. Defaults to "Apply". */
    applyLabel?: string;
    className?: string;
    'data-testid'?: string;
}

declare interface MediaEffectsTrayProps {
    filters: MediaEffectsFilterOption[];
    /** 'none' = no filter active. */
    activeFilterId: string;
    onSelectFilter: (id: string) => void;
    backgrounds: MediaEffectsBackgroundOption[];
    backgroundMode: 'none' | 'blur' | 'image';
    /** Only meaningful when backgroundMode === 'image'. */
    activeBackgroundUrl: string | null;
    /** ('none', null) | ('blur', null) | ('image', url) */
    onSelectBackground: (mode: 'none' | 'blur' | 'image', url: string | null) => void;
    faceSprites: MediaEffectsFilterOption[];
    /** null = no sprite active. */
    activeFaceSpriteId: string | null;
    onSelectFaceSprite: (id: string | null) => void;
    /** Dims every chip and blocks clicks — e.g. while the engine loads. */
    disabled?: boolean;
    /** Compact = tighter paddings for popover placement. */
    compact?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare class NetworkErrorBoundary extends Component<NetworkErrorBoundaryProps, NetworkErrorBoundaryState> {
    state: NetworkErrorBoundaryState;
    static getDerivedStateFromError(error: Error): NetworkErrorBoundaryState;
    componentDidCatch(error: Error, info: ErrorInfo): void;
    reset: () => void;
    render(): ReactNode;
}

export declare interface NetworkErrorBoundaryProps {
    children: ReactNode;
    /**
     * Render override. Receives the caught error + a reset callback that
     * resets the boundary state. Use when you want a custom error UI
     * (e.g. inline alert vs. full empty-state card).
     */
    fallback?: (error: Error, reset: () => void) => ReactNode;
    /**
     * Optional callback fired when the caller clicks the retry button.
     * Use to re-run the underlying hook (e.g. gateway.reconnect()) BEFORE
     * the boundary resets so the next render has a fresh attempt.
     */
    onRetry?: () => void;
    /**
     * Logging hook called on caught errors. Defaults to `console.error`.
     * Override to forward to a telemetry sink without losing the stack.
     */
    onError?: (error: Error, info: ErrorInfo) => void;
    /** Title shown in the default fallback. Default: "Something went wrong". */
    title?: string;
    /** Body shown in the default fallback. Defaults to the caught error message. */
    description?: string;
    /** Retry button label. Default: "Retry". */
    retryLabel?: string;
}

declare interface NetworkErrorBoundaryState {
    error: Error | null;
}

export declare interface NetworkShimOptions {
    /** Current connection lifecycle state from the caller's gateway/hook layer. */
    connectionState: ReconnectingShimConnectionState;
    /**
     * Single retry callback re-used by:
     *   - ReconnectingShim's "Try again" CTA when disconnected
     *   - NetworkErrorBoundary's retry CTA when a hook throws
     * Omit if reconnect is fully automatic — both CTAs hide instead of showing.
     */
    onRetry?: () => void;
    reconnectingLabel?: string;
    disconnectedTitle?: string;
    disconnectedDescription?: string;
    /** Label for the retry CTA (used in both ReconnectingShim + boundary). */
    retryLabel?: string;
    /** Override for the connecting-state placeholder. */
    connectingPlaceholder?: ReactNode;
    /**
     * Replace the disconnected-state node entirely. When provided,
     * `disconnectedTitle`/`description`/`retryLabel` are ignored.
     */
    disconnectedFallback?: ReactNode;
    /** Title shown in the boundary's default fallback. */
    errorTitle?: string;
    /** Body shown in the boundary's default fallback. */
    errorDescription?: string;
    /** Forwarded to NetworkErrorBoundary.onError. */
    onError?: NetworkErrorBoundaryProps['onError'];
    /**
     * Custom render override for the boundary fallback. When provided,
     * `errorTitle`/`errorDescription`/`retryLabel` are ignored.
     */
    errorFallback?: NetworkErrorBoundaryProps['fallback'];
    /** className forwarded to ReconnectingShim's outer wrapper. */
    className?: string;
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

declare type PresenceMode = 'editor' | 'reviewer' | 'reader';

declare interface PresenceUser {
    /** Unique identifier for the user. Passed back to `onUserClick`. */
    id: string;
    name: string;
    /** Optional avatar image URL. Wins over `color` when present. */
    avatarUrl?: string;
    /** Online flag. Drives the status dot when `idle` is not set:
     *  `undefined`/`true` → green; `false` → gray. */
    online?: boolean;
    /** Override the auto-computed avatar background. Useful when the
     *  user identity needs to match a CRDT cursor color elsewhere. */
    color?: string;
    /** Present but away. Dims the avatar (alpha-blends `color` when
     *  provided, otherwise drops opacity) and flips the status dot to
     *  amber. Wins over `online` for the dot color. */
    idle?: boolean;
    /** Optional editing mode — renders a small mode badge on the
     *  upper-right of the avatar (pencil / check / eye). */
    mode?: PresenceMode;
}

export declare function ReconnectingShim({ connectionState, children, onRetry, reconnectingLabel, disconnectedTitle, disconnectedDescription, retryLabel, connectingPlaceholder, disconnectedFallback, className, }: ReconnectingShimProps): JSX.Element;

export declare type ReconnectingShimConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

export declare interface ReconnectingShimProps {
    /** Current connection lifecycle state from the gateway / hook layer. */
    connectionState: ReconnectingShimConnectionState;
    children: ReactNode;
    /**
     * Invoked when the user clicks the disconnected-state retry button.
     * Omit to hide the button (e.g. when reconnect is automatic-only).
     */
    onRetry?: () => void;
    /** Label override for the reconnecting overlay. Default: "Reconnecting…". */
    reconnectingLabel?: string;
    /** Title shown in the disconnected EmptyState. Default: "Disconnected". */
    disconnectedTitle?: string;
    /** Description shown in the disconnected EmptyState. */
    disconnectedDescription?: string;
    /** Retry button label. Default: "Try again". */
    retryLabel?: string;
    /** Optional override for the connecting-state placeholder (e.g. a custom skeleton). */
    connectingPlaceholder?: ReactNode;
    /**
     * Optional override for the disconnected-state node. When provided,
     * replaces the built-in EmptyState (`disconnectedTitle`/`description`/
     * `retryLabel`/`onRetry` are ignored).
     */
    disconnectedFallback?: ReactNode;
    className?: string;
}

/** Mirror of realtime-modules/src/client/types.ts ActivityEvent */
export declare interface RMActivityEvent {
    eventType: string;
    detail: Record<string, unknown>;
    timestamp: string;
    userId: string | null;
    displayName: string;
}

export declare type RMBackgroundMode = 'none' | 'blur' | 'image';

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

/**
 * Structural mirror of @connorhoehn/realtime-modules's `ConnectionState`.
 * Kept here (not imported) so the integration subpath compiles without a
 * runtime dep on realtime-modules.
 */
export declare type RMConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

/** Minimum shape needed from useWebSocket() / useGateway(). */
export declare interface RMConnectionStateSource {
    connectionState: RMConnectionState;
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

/**
 * Minimum shape needed from useMediaEffects()'s MediaEffectsController.
 * Registry entries may carry extra fields (cssFilter, render fns) — the
 * tray only reads id/label/url.
 */
export declare interface RMMediaEffectsControllerSource {
    filterId: string;
    backgroundMode: RMBackgroundMode;
    backgroundImageUrl: string | null;
    faceSpriteId: string | null;
    filters: Array<{
        id: string;
        label: string;
    }>;
    backgrounds: Array<{
        id: string;
        label: string;
        url: string;
    }>;
    faceSprites: Array<{
        id: string;
        label: string;
    }>;
    setFilter(id: string): void;
    setBackgroundMode(mode: RMBackgroundMode): void;
    setBackgroundImageUrl(url: string | null): void;
    setFaceSpriteId(id: string | null): void;
}

/**
 * useMediaEffects()'s controller plus the preview-session surface added
 * for the audition-before-publish flow.
 */
export declare interface RMMediaEffectsPreviewControllerSource extends RMMediaEffectsControllerSource {
    /** Non-null only during a preview session. */
    draft: RMMediaEffectsSettings | null;
    /** Draft differs from live. */
    isDirty: boolean;
    /** The draft self-view. NEVER published. */
    previewTrack: MediaStreamTrack | null;
    /** Snapshot live → draft; the setters now write the draft. */
    beginPreview(): void;
    /** Commit the draft to live — the only thing peers ever see. */
    applyPreview(): void;
    /** Discard the draft; live untouched. */
    cancelPreview(): void;
}

/** The four values a preview session snapshots and commits. */
export declare interface RMMediaEffectsSettings {
    filterId: string;
    backgroundMode: RMBackgroundMode;
    backgroundImageUrl: string | null;
    faceSpriteId: string | null;
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

declare type RoomsIndexSubscriber_2 = NonNullable<HangoutRoomsSectionProps['occupancyAdapter']>;

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

export declare function WrappedChatPanel({ chat, presence, disabled, typingUsers: typingUsersOverride, tone, wrapWithNetworkShim, }: WrappedChatPanelProps): JSX.Element;

export declare interface WrappedChatPanelProps {
    /** Return value of useChat(channel) from realtime-modules */
    chat: RMUseChatReturn;
    /** Optional presence hook return — used to derive typingUsers */
    presence?: RMUsePresenceReturn;
    /** Forwarded to ChatPanel */
    disabled?: boolean;
    /** Override typing banner (supersedes presence-derived list) */
    typingUsers?: string[];
    /** Forwarded to ChatPanel — 'dark' for call chrome surfaces. */
    tone?: 'light' | 'dark';
    /**
     * Opt-in: wrap the rendered ChatPanel in a NetworkErrorBoundary +
     * ReconnectingShim using the supplied connection state and retry
     * callback. Omit for no wrapping (default).
     */
    wrapWithNetworkShim?: NetworkShimOptions;
}

export declare function WrappedConnectionPill({ socket, ...rest }: WrappedConnectionPillProps): JSX.Element;

export declare interface WrappedConnectionPillProps extends Omit<ConnectionPillProps, 'state'> {
    /**
     * Hook return that exposes `connectionState`. Typically
     * `useWebSocket(...)` or `useGateway()` from realtime-modules.
     */
    socket: RMConnectionStateSource;
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

export declare function WrappedHangoutRoomsList({ hangoutRooms, subscribeRoomsIndex, occupancyFor, participantId, onJoin, onContextMenu, onBrowseAll, maxVisible, title, storageKey, renderEmpty, renderCreateDialog, wrapWithNetworkShim, }: WrappedHangoutRoomsListProps): JSX.Element;

export declare interface WrappedHangoutRoomsListProps {
    /** Return value of `useHangoutRooms()` from realtime-modules. */
    hangoutRooms: RMUseHangoutRoomsReturn;
    /**
     * Live gateway adapter for room occupancy — typically the
     * `subscribeRoomsIndex` returned by `useRoomsSubscription()`. When
     * provided, every row drives its own `useRoomOccupancy(slug)` off
     * this subscriber so presence indicators stay live without the
     * caller wiring per-row occupancy.
     */
    subscribeRoomsIndex?: RoomsIndexSubscriber_2;
    /**
     * Back-compat / static-snapshot lookup. Used only when
     * `subscribeRoomsIndex` is NOT provided. Returns the latest occupancy
     * snapshot for a slug.
     */
    occupancyFor?: (slug: string) => RMRoomOccupancy | null;
    /** This tab's participantId — drives the row "active" highlight. */
    participantId?: string;
    /** Convenience: fires with the room slug when a row is clicked. */
    onJoin?: (slug: string) => void;
    /** Right-click on a row. */
    onContextMenu?: (room: RMRoom, e: MouseEvent_2<HTMLElement>) => void;
    /** Fired when "Browse all" overflow link is clicked. */
    onBrowseAll?: () => void;
    /** Max inline rows. Defaults to 10. */
    maxVisible?: number;
    /** Section title override. Defaults to "Rooms". */
    title?: string;
    /** Section storageKey override (collapse persistence). */
    storageKey?: string;
    /**
     * Custom empty-state slot. When the active rooms list is empty AND
     * the hook is not loading AND there is no error, this slot REPLACES
     * the entire section render. Use it when the host page wants full
     * control over the no-rooms UI (e.g. an onboarding upsell).
     */
    renderEmpty?: ReactNode;
    /** Custom create-dialog renderer — forwarded to HangoutRoomsSection. */
    renderCreateDialog?: (props: {
        open: boolean;
        onClose: () => void;
    }) => ReactNode;
    /**
     * Opt-in: wrap the rendered section in NetworkErrorBoundary +
     * ReconnectingShim. Pass `connectionState` from the gateway layer.
     */
    wrapWithNetworkShim?: NetworkShimOptions;
}

/**
 * Snapshot of the wrapper's live hangout state, surfaced to the
 * consumer's `overlay` render-prop so they can render reconnecting /
 * failed / empty backdrops without subscribing to useLVSHangout
 * themselves.
 */
export declare interface WrappedHangoutState {
    connectionState: HangoutConnectionState;
    error: string | null;
    participantCount: number;
    remoteCount: number;
}

export declare function WrappedLVSHangoutLayout({ stageToken, participantId, userId, localClientId, getStageToken, overlay, spotlightContent, onParticipantClick, mode, activeSpeakerStrategy: _activeSpeakerStrategy, localTileLabel, showLocalAsTile, className, 'data-testid': testId, }: WrappedLVSHangoutLayoutProps): JSX.Element;

export declare interface WrappedLVSHangoutLayoutProps {
    /** Participant token from platform-api `/api/video/sessions/:id/join`.
     *  Decoded for the channel ARN claim. */
    stageToken: string;
    /** SFU-issued participant id (per-tab unique). */
    participantId: string;
    /** Display name for the local user. Falls back to participantId.slice(0,8). */
    userId?: string;
    /** Optional override for the local tile's "client id" — most consumers
     *  use the same value as participantId. Reserved for future per-device
     *  multiplexing scenarios. */
    localClientId?: string;
    /**
     * Async callback the wrapper calls when it needs a fresh stage token:
     * on initial connect, after a token-rejected close, and (optionally) on
     * a TTL-based schedule. Mirrors the SDK `getAuthToken` pattern.
     *
     * When omitted, the wrapper uses `stageToken` for the session lifetime
     * and surfaces a token-expired error via the overlay render prop.
     */
    getStageToken?: () => Promise<string>;
    /**
     * Render-prop slot rendered absolute-positioned over the tile grid.
     * Receives the wrapper's live hangout state so the consumer can render
     * reconnecting / failed / empty overlays.
     *
     * Example:
     *   overlay={({ connectionState, error, remoteCount }) => (
     *     <>
     *       {connectionState === 'reconnecting' && <YourReconnectingBanner />}
     *       {error && <YourFailedScreen error={error} />}
     *       {remoteCount === 0 && <YourEmptyBackdrop />}
     *     </>
     *   )}
     */
    overlay?: (state: WrappedHangoutState) => ReactNode;
    /** Forwarded to <HangoutLayout spotlightContent>. */
    spotlightContent?: ReactNode;
    /** Forwarded to <HangoutLayout onParticipantClick>. */
    onParticipantClick?: (participantId: string) => void;
    /** Forwarded to <HangoutLayout mode>. Default 'auto'. */
    mode?: HangoutMode;
    /** Optional active speaker driver. Default 'audio-level' (the layout
     *  computes from MediaStream audio energy). */
    activeSpeakerStrategy?: 'audio-level' | 'producer-state' | 'off';
    /** Override the local tile's display name. Default: "You". */
    localTileLabel?: string;
    /** When false, the local user does NOT appear as a tile (e.g. they
     *  only host the call). Default true (Meet-style). */
    showLocalAsTile?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function WrappedMediaEffectsPreviewPanel({ open, controller, onClose, onApplied, ...rest }: WrappedMediaEffectsPreviewPanelProps): JSX.Element | null;

export declare interface WrappedMediaEffectsPreviewPanelProps extends Pick<MediaEffectsPreviewPanelProps, 'disabled' | 'title' | 'applyLabel' | 'className' | 'data-testid'> {
    /** Mounts the surface and opens a preview session. */
    open: boolean;
    /** Return value of useMediaEffects() from realtime-modules. */
    controller: RMMediaEffectsPreviewControllerSource;
    /** Host closes its dialog/panel here. Fired after Apply AND Cancel. */
    onClose: () => void;
    /** Extra hook fired only on Apply (e.g. a "Effects updated" toast). */
    onApplied?: () => void;
}

export declare function WrappedMediaEffectsTray({ controller, ...rest }: WrappedMediaEffectsTrayProps): JSX.Element;

export declare interface WrappedMediaEffectsTrayProps extends Pick<MediaEffectsTrayProps, 'disabled' | 'compact' | 'className' | 'data-testid'> {
    /** Return value of useMediaEffects() from realtime-modules. */
    controller: RMMediaEffectsControllerSource;
}

export declare function WrappedNotificationCenter({ notifications, onItemClick, ...rest }: WrappedNotificationCenterProps): JSX.Element;

export declare interface WrappedNotificationCenterProps extends Omit<NotificationCenterProps, 'items' | 'onItemClick' | 'onMarkAllRead' | 'onClearAll'> {
    /** Return value of useNotifications(channel?) from realtime-modules */
    notifications: RMUseNotificationsReturn;
    /** Override item click handler (default: markAsRead on the clicked id) */
    onItemClick?: (item: NotificationItem) => void;
}

export declare function WrappedPresencePanel({ presence, currentClientId, wrapWithNetworkShim, }: WrappedPresencePanelProps): JSX.Element;

export declare interface WrappedPresencePanelProps {
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
