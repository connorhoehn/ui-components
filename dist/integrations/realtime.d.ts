import { AnyExtension } from '@tiptap/core';
import { Awareness } from 'y-protocols/awareness';
import { Component } from 'react';
import { ComponentType } from 'react';
import { Editor } from '@tiptap/react';
import { ErrorInfo } from 'react';
import { HangoutConnectionState } from '@connorhoehn/realtime-modules/client/video';
import { JSX } from 'react';
import { MouseEvent as MouseEvent_2 } from 'react';
import { Node as Node_2 } from '@tiptap/core';
import { ReactNode } from 'react';
import type * as RMCall from '@connorhoehn/realtime-modules/call';
import type * as RMClient from '@connorhoehn/realtime-modules/client';
import type * as RMHangoutRooms from '@connorhoehn/realtime-modules/client/hangout-rooms';
import type * as RMVideo from '@connorhoehn/realtime-modules/client/video';
import { RoomsIndexSubscriber } from '@connorhoehn/realtime-modules/client/hangout-rooms';
import { useEditor } from '@tiptap/react';
import { XmlFragment } from 'yjs';
import * as Y from 'yjs';

export declare function acceptsDocumentImage(file: File): boolean;

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

/** Rooms with people resolved, plus who is in the meeting but in no room. */
export declare function adaptBreakoutRooms(breakout: RMBreakoutState, people: readonly RMMeetingPerson[], hands?: readonly RMRaisedHand[]): {
    rooms: BreakoutRoomView[];
    unassigned: BreakoutPerson[];
};

export declare function adaptChatMessage(msg: RMChatMessage): ChatMessage;

export declare function adaptChatMessages(messages: RMChatMessage[]): ChatMessage[];

export declare function adaptFileUploads(uploads: RMFileUploadState[]): FileUploadSummary[];

export declare function adaptFileUploadState(state: RMFileUploadState): FileUploadSummary;

export declare function adaptHangoutParticipant(participant: RMHangoutParticipant, localClientId?: string | null, 
/** Resolved by the host from its own directory — see the note above. */
avatarUrl?: string): HangoutLayoutParticipant;

export declare function adaptHangoutParticipants(participants: RMHangoutParticipant[], localClientId?: string | null, 
/** clientId → avatar URL, resolved by the host. */
avatarUrls?: Record<string, string | undefined>): HangoutLayoutParticipant[];

/**
 * The reactions on one message, in ChatPanel's shape.
 *
 * `userId` falls back to `clientId` only when the server resolved no identity
 * — imperfect (it changes on reconnect, so "did I react?" goes stale) but
 * better than an empty string, which would make every anonymous reaction the
 * same person's.
 */
export declare function adaptMessageReactions(hook: RMUseReactionsReturn, messageId: string): UIMessageReaction[];

export declare function adaptNotification(n: RMNotificationEntry): NotificationItem;

export declare function adaptNotifications(entries: RMNotificationEntry[]): NotificationItem[];

export declare function adaptPresenceEntry(entry: RMPresenceEntry): PresenceUser;

/**
 * The roster as PEOPLE. Presence has one row per connection, so someone with
 * the app open in two tabs arrived twice — two identical avatars side by side,
 * and a participant count that read one higher than the number of humans.
 *
 * Identity, name and avatar are MERGED across a person's sessions rather than
 * taken from whichever row sorted first. A tab that has not published its
 * metadata yet is a normal thing for a roster to contain, and letting it win
 * showed a truncated clientId where a name the OTHER tab had already published
 * belonged. Online-ness is likewise the OR across the connections: a stale tab
 * must not grey out someone sitting right there in another one, and `idle`
 * survives only while EVERY live session says so.
 */
export declare function adaptPresenceRoster(roster: RMPresenceEntry[]): PresenceUser[];

export declare function adaptReaction(reaction: RMReaction, index: number): EphemeralReaction;

export declare function adaptReactions(reactions: RMReaction[]): EphemeralReaction[];

declare type AgentRunDecision = 'approve' | 'reject';

/**
 * What the expanded card shows. Populated by realtime-modules' run hook from
 * the run's steps and the edit it applied — keep the field names.
 */
declare interface AgentRunDetails {
    steps?: AgentRunStep[];
    ops?: AgentRunOp[];
    document?: {
        id: string;
        title?: string;
        snippet?: string;
    };
    /** ISO timestamps. */
    startedAt?: string;
    completedAt?: string;
    error?: string;
}

/**
 * An agent loop, live, for its card in the transcript.
 *
 * A loop (`/agent …`) is not a pipeline edit that is received, processed and
 * done in seconds: it plans for half a minute, then works through steps for
 * minutes, spending a context budget. The card says that in the thread so
 * nothing has to take the conversation's place to show it — the phase, the
 * clock while it is planning, the step it is on, what it has spent, and a way
 * into the lab.
 */
declare interface AgentRunLoop {
    phase: AgentRunLoopPhase;
    /** When the run started (ISO). With it, the card's clock ticks on its own while the loop is busy. */
    startedAt?: string;
    /** How long it has run, as last reported. Used when `startedAt` is absent. */
    elapsedMs?: number;
    /** The plan, with the running step marked. Empty while planning. */
    steps?: readonly LabStep[];
    contextTokens?: number;
    contextBudgetTokens?: number;
    /** One sentence about how it ended — the failure, the summary. Replaces the phase's own words once it has ended. */
    outcome?: string;
}

/** Where an agent LOOP is — the lab's own eight words. */
declare type AgentRunLoopPhase = LabStatus;

/**
 * One edit the agent made, in the document-ops vocabulary the pipeline emits
 * (`setTitle`, `appendBlock`, `replaceBlock`, …). The card turns each into a
 * sentence; an op it does not know is shown by name.
 */
declare interface AgentRunOp {
    op: string;
    /** The new title, the block's text, the macro's name, the type's name, or a skip's reason — whichever the op carries. */
    text?: string;
    /** The block the op acted on, zero-based. */
    index?: number;
    /** The block an `appendBlock`/`insertBlock` added — 'paragraph' | 'heading' | 'horizontalRule'. */
    kind?: string;
    /** A heading's level (1–6). */
    level?: number;
}

declare type AgentRunPhase = 'received' | 'running' | 'awaiting_approval' | 'completed' | 'rejected' | 'failed';

/**
 * What a finished run produced, when it produced something a reader can open:
 * a side panel (a search graph, a trace), the document it edited, or a link.
 * Read from the message's metadata (`result`) when the run is posted done, or
 * from the live status while the card is watching it.
 */
declare type AgentRunResult = {
    kind: 'panel';
    panel: ChatSidePanelRef;
} | {
    kind: 'document';
    documentId: string;
} | {
    kind: 'link';
    href: string;
    label?: string;
};

/** Who accepted or rejected the suggestions, and when. Mirrors realtime-modules' `PipelineRunStatus.review`. */
declare interface AgentRunReview {
    decision: AgentRunReviewDecision;
    /** The reviewer's id. */
    by: string;
    byName?: string;
    /** ISO timestamp. */
    at: string;
}

/** What a reviewer does with an edit that landed as suggestions. */
declare type AgentRunReviewDecision = 'accept' | 'reject';

declare interface AgentRunStatus {
    phase: AgentRunPhase;
    /** The outcome to open, once `phase === 'completed'`. */
    result?: AgentRunResult;
    /**
     * Set when the run completed but changed nothing — the model declined the
     * instruction. The badge reads "No change" and `detail` carries the reason,
     * so a declined run and a landed edit stop looking identical.
     */
    noop?: boolean;
    /** Everything the expanded card shows: steps, ops, the document, timings. */
    details?: AgentRunDetails;
    /** The step in flight, when known — "Reading the document", "Planning the edit", "Retrying — attempt 2". */
    stepLabel?: string;
    /** A sentence about the outcome — "Renamed to …", the failure, why approval is needed. */
    detail?: string;
    /** The approval step a decision goes to, while `phase === 'awaiting_approval'`. */
    approvalStepId?: string;
    /** Set when a completed edit landed as suggestions rather than changes; the card offers Accept / Reject until `review` is set. */
    suggestion?: AgentRunSuggestion;
    /** Set once someone accepted or rejected the suggestions. */
    review?: AgentRunReview;
}

declare interface AgentRunStep {
    id: string;
    label: string;
    status: AgentRunStepStatus;
}

/** One step of the run, for the expanded timeline. Mirrors realtime-modules' step status vocabulary — keep the names. */
declare type AgentRunStepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped' | 'awaiting';

/**
 * The suggestions a finished edit left in the document, waiting for a
 * reviewer. Mirrors realtime-modules' `PipelineRunStatus.suggestion` — keep
 * the field names.
 */
declare interface AgentRunSuggestion {
    /** The suggestion key the changes were tagged with; the review resolves everything under it. */
    key: string;
    documentId?: string;
    /** How many changes were suggested. */
    applied: number;
}

export declare const ALL_REALTIME_CAPABILITIES: readonly RealtimeCapabilityName[];

/**
 * Wrap `node` in NetworkErrorBoundary + ReconnectingShim when `opts` is
 * provided; otherwise return `node` unchanged. Used by Wrapped* adapters
 * as a one-line opt-in for the standard connection-resiliency UI.
 */
export declare function applyNetworkShim(node: ReactNode, opts: NetworkShimOptions | undefined): ReactNode;

declare interface AudioVideoSettings {
    microphoneId?: string;
    speakerId?: string;
    cameraId?: string;
    noiseSuppression: boolean;
    echoCancellation: boolean;
    autoGainControl: boolean;
    /** 0..1 local playback gain. */
    volume: number;
    mirrorPreview: boolean;
    quality: 'auto' | '720p' | '480p' | '360p';
    frameRate: 'auto' | 30 | 15;
    rememberDevices: boolean;
}

declare interface AudioVideoSettingsFormProps {
    value: AudioVideoSettings;
    onChange: (next: AudioVideoSettings) => void;
    devices: {
        microphones: DeviceOption[];
        speakers: DeviceOption[];
        cameras: DeviceOption[];
    };
    permission: {
        microphone: MediaPermission;
        camera: MediaPermission;
    };
    /** 0..1 live level of the selected microphone. */
    micLevel: number;
    previewStream: MediaStream | null;
    cameraOn: boolean;
    /** `HTMLMediaElement.setSinkId` exists. False (Safari) hides the Speakers select; the volume row stays. */
    speakerSelectionSupported: boolean;
    onTestMic: () => void | Promise<void>;
    onTestSound: () => void | Promise<void>;
    testMicState?: 'idle' | 'recording' | 'playing';
    /** Who the preview placeholder shows when the camera is off. */
    selfName?: string;
    selfAvatarUrl?: string;
    /** Two-column device setup; the default stack remains the call-settings form. */
    layout?: 'stack' | 'prejoin';
    className?: string;
    'data-testid'?: string;
}

declare type BreakoutPanelMode = 'assigned' | 'self-select';

declare type BreakoutPanelPhase = 'none' | 'draft' | 'open';

declare interface BreakoutPerson {
    id: string;
    name: string;
    avatarUrl?: string;
    /** `true` or the 1-based queue position. */
    handRaised?: boolean | number;
}

declare interface BreakoutRoomsPanelProps {
    rooms: BreakoutRoomView[];
    phase: BreakoutPanelPhase;
    mode: BreakoutPanelMode;
    /** The open room you are in, or null for the main meeting. */
    myRoomId?: string | null;
    isOrganizer?: boolean;
    /** Organizer view: people in the meeting placed in no room. */
    unassigned?: BreakoutPerson[];
    /** ISO end of the timer. */
    endsAt?: string | null;
    /** Participants may leave a room for the main meeting. Default true. */
    allowReturnToMain?: boolean;
    onJoin?: (roomId: string) => void;
    onReturnToMain?: () => void;
    onCreateRooms?: (count: number, mode: BreakoutPanelMode) => void;
    onAutoAssign?: () => void;
    onAssign?: (userId: string, roomId: string | null) => void;
    onOpenRooms?: (roomIds?: string[]) => void;
    onCloseRooms?: (roomIds?: string[]) => void;
    onSetTimer?: (durationMs: number | null) => void;
    onBroadcast?: (message: string) => void;
    onEnd?: () => void;
    /**
     * Discard the drafted rooms so they can be created again (2.458.1). Shown
     * only while rooms are closed; open rooms must be ended first.
     */
    onDeleteRooms?: () => void;
    /**
     * Rename a room (2.459.0). Organizers then click a room's name to edit it
     * in place, in any phase; Enter or blur commits, Escape cancels.
     */
    onRenameRoom?: (roomId: string, name: string) => void;
    /** Add one room (2.459.0), in draft or while rooms are open. It starts closed. */
    onAddRoom?: () => void;
    /** The server's room cap; Add room is disabled at it. Default 50. */
    maxRooms?: number;
    /** The header ✕. Omitted: no close button. */
    onClose?: () => void;
    title?: string;
    /** Rendered under the header — an error notice, say. */
    notice?: ReactNode;
    /** Minute choices for the timer. Default 5, 10, 15, 30, 60. */
    timerMinutes?: number[];
    className?: string;
    'data-testid'?: string;
}

declare interface BreakoutRoomView {
    id: string;
    name: string;
    state: 'open' | 'closed';
    members: BreakoutPerson[];
}

/**
 * THE canvas extension list: realtime-modules' canonical factory over the app's
 * parts, with the image node swapped for the authenticated one. Both apps build
 * their list here so the schema cannot drift. Call once at module scope —
 * ProseMirror reads extensions once, so a new array per render rebuilds the editor.
 */
export declare function buildCanvasDocumentExtensions(createCanvasExtensions: CreateCanvasExtensions, parts: CanvasDocumentExtensionParts): AnyExtension[];

declare interface CallActivityParticipant {
    userId: string;
    displayName?: string;
    avatarUrl?: string;
}

/** The call the host drives: RM `useConversationCall()`'s result, restated to what is read here. */
export declare interface CallBlockCall extends RMConversationCallSource {
    call: (NonNullable<RMConversationCallSource['call']> & {
        callId: string;
        host?: string | null;
        startedAt?: number | null;
    }) | null;
    start(targets: {
        userId: string;
        displayName?: string;
    }[], opts?: {
        audioOnly?: boolean;
    }): Promise<void>;
    accept(ring?: never): Promise<void>;
    rejoin(): Promise<void>;
    leave(): Promise<void>;
}

export declare type CallBlockClaimPlacement = Exclude<CallBlockPlacement, 'footer'>;

/** What a call is about, drawn as the bar's document chips. */
export declare interface CallBlockDocument {
    id: string;
    title: string;
    href?: string;
}

export declare type CallBlockHost<M extends CallBlockModules> = ReturnType<typeof createCallBlockHost<M>>;

/** The realtime-modules functions the host calls (spread `/client/video`). */
export declare interface CallBlockModules extends ConversationCallDockModules {
    LVSProvider: ComponentType<{
        baseUrl: string;
        getAuthToken: () => string;
        children: ReactNode;
    }>;
    useConversationCall(opts: {
        lobbyName: string;
        channel?: string | null;
        self: {
            userId: string;
            displayName: string;
            avatarUrl?: string;
        };
        platformApi: {
            baseUrl: string;
            getIdToken: () => string | Promise<string>;
        };
        gateway?: never;
        discover?: boolean;
        initialMedia?: {
            micOn: boolean;
            cameraOn: boolean;
        };
        onCallStarted?(e: never): void;
        onCallEnded?(e: never): void;
        onCallMissed?(e: never): void;
    }): CallBlockCall;
    useIncomingConversationCalls(opts: {
        gateway?: never;
        self: {
            userId: string | null;
            displayName?: string;
        };
        onAccept?(ring: never): void;
    }): {
        rings: CallBlockRing[];
        accept(ring: never): void;
        decline(ring: never): void;
    };
    useMediaDevices(opts?: {
        requestOnMount?: boolean;
    }): RMMediaDevicesSource;
}

/** Where the one call-media sink draws. */
export declare type CallBlockPlacement = 'composer' | 'page' | 'block' | 'pane' | 'footer';

export declare interface CallBlockProps {
    placement: CallBlockClaimPlacement;
    /** The narrow bar (mic, camera, Leave; the rest in ⋯) over tiles two to a row. Composer placement only. */
    compact?: boolean;
    documents?: readonly CallBlockDocument[];
    className?: string;
}

/** One ring, as RM `useIncomingConversationCalls()` reports it. */
export declare interface CallBlockRing extends RMIncomingConversationCall {
    lobbyName: string;
    channel: string | null;
}

export declare interface CallBlockView {
    /** The bar and tiles for `ConversationComposer callBlock`; undefined while the call is not this conversation's. */
    block: ReactNode;
    /** The call is this conversation's and drawn. */
    holds: boolean;
    /** The shell's call is bound to this conversation's lobby. */
    here: boolean;
    /** A huddle is on in this lobby that you are not in (the host discovered it). */
    live: boolean;
}

/** People in the call (the server's distinct count), kept apart from invitees still ringing. */
export declare function callCounts(call: {
    participantCount: number;
    participants: readonly {
        state: string;
    }[];
} | null): {
    joined: number;
    ringing: number;
};

declare type CallDockTileSize = 'sm' | 'md' | 'lg';

/** A call is drawn from the caller's first ring until the ended notice clears; an incoming ring is the toast's. */
export declare function callDrawn(phase: CallPhase | string, hasLobby: boolean): boolean;

export declare interface CallHostEvent {
    callId: string;
    lobbyName: string;
    channel: string | null;
    peerUserIds: string[];
    direction?: 'outgoing' | 'incoming';
    durationMs?: number | null;
    [key: string]: unknown;
}

/** A call event, for an app that keeps a call log. */
export declare type CallHostEventKind = 'started' | 'ended' | 'missed';

export declare interface CallHostProviderProps {
    self: {
        userId: string;
        displayName: string;
        avatarUrl?: string;
    } | null;
    tenant: string | null;
    /** Actor and tenant: a change tears media down; refreshing the same identity does not. */
    scopeKey: string;
    /** platform-api base URL the browser can reach, or null (calls unavailable). */
    platformApiUrl: string | null;
    getIdToken: () => string | Promise<string>;
    /** The SFU's URL; latched within one scope, so a token refresh without it cannot move a call. */
    videoUrl: string | null;
    /** The gateway socket the app holds (RM `ConversationCallGateway`). */
    gateway: unknown;
    gatewayConfigured: boolean;
    connectionState: string;
    /** Accept was pressed on a ring: open the page the call is about. */
    onAccept?: (ring: CallBlockRing) => void;
    onCallEvent?: OnCallHostEvent;
    /** Where the pre-join choices persist (one key per device). */
    preJoinStorageKey?: string;
    children: ReactNode;
}

export declare interface CallHostValue<C extends CallBlockCall> {
    call: C;
    /** The lobby the call is bound to; null until a page binds one or a ring is answered. */
    lobby: CallLobby | null;
    /** Bind this page's lobby. Ignored while a call is in progress or a ring is being answered. */
    bind(lobby: CallLobby, starter?: {
        start(): void;
    }): void;
    /** The page leaves: drops its lobby while no call is in progress. */
    unbind(lobbyName: string): void;
    /** Runs the bound page's own start (null when the page registered none) — the footer's idle Huddle. */
    startBound: (() => void) | null;
    self: {
        userId: string;
        displayName: string;
    } | null;
    tenant: string | null;
    gatewayConfigured: boolean;
    connectionState: string;
    platformApiUrl: string | null;
    /** Why no call can start here at all (no gateway, no platform-api, signed out, connecting), or null. */
    unavailableReason: string | null;
    /** Opens the device check on request (clears the remembered skip). */
    checkDevices(): void;
}

/** A page's lobby: what the call host binds while nothing is in progress. */
export declare interface CallLobby {
    lobbyName: string;
    /** What the bar's title says (the initiative's name, the people on Search). */
    title: string;
    /** Rides the invite, so the callee's Accept can open what the call is about. */
    channel: string | null;
    /** Why the page cannot start its call right now; absent = it can. */
    startBlockedReason?: string;
}

export declare interface CallMediaOutletProps {
    /** The footer's collapsed shelf id (for its toggle's aria-controls). */
    id?: string;
    /** Opens the call's People (e.g. the page's contributors). */
    onOpenPeople?: (lobby: CallLobby, tenant: string | null) => void;
    /** A document chip was clicked. */
    onOpenDocument?: (document: CallBlockDocument) => void;
    /** Drawn over the tiles wherever the sink draws (floating reactions). */
    overlay?: ReactNode;
    /** The dock's test id for a lobby (default `conversation-call-dock`). */
    dockTestId?: (lobby: CallLobby, tenant: string | null) => string;
}

/** The media panel (the side pane's tile grid): open or collapsed. Opens by itself once per call. */
export declare interface CallMediaPanelState {
    open: boolean;
    setOpen(open: boolean): void;
    toggle(): void;
}

export declare type CallPhase = 'idle' | 'calling' | 'ringing' | 'connecting' | 'live' | 'reconnecting' | 'ended' | 'failed';

/** Auth expiry is independent of whether a socket is open; the app adds its own mode rules. */
export declare function canEditCanvasGrant(grant: {
    canEdit: boolean;
    expiresAt: number;
}, accessValid: boolean, now?: number): boolean;

/** The schema inputs an app supplies from its own installed packages (one module graph). */
export declare interface CanvasDocumentExtensionParts {
    MacroNode: AnyExtension;
    HeadingAnchor: AnyExtension;
    MarkdownClipboard: AnyExtension;
    Callout: AnyExtension;
    CanvasTextAlign: AnyExtension;
    TextStyleKit: AnyExtension;
    /** The BASE `@tiptap/extension-image`; it is wrapped with the authenticated node view here. */
    Image: Node_2;
    TableKit: AnyExtension;
    /** Per-document comment/suggestion bindings; never replace shared node definitions. */
    additional?: readonly AnyExtension[];
}

/** The parts `renderFrame` receives. */
declare interface CanvasDocumentFrame {
    /** Formatting toolbar plus the find/replace row when open; null when there is nothing to edit. */
    toolbar: ReactNode;
    /** The page ruler, aligned to the sheet; null when `showRuler` is off. */
    ruler: ReactNode;
    /** Header, banners and the canvas workspace. */
    surface: ReactNode;
}

export declare type CanvasDocumentPaneComponent = (props: CanvasDocumentPaneProps) => ReactNode;

/** The realtime-modules functions the pane calls. Spread the namespace you installed. */
export declare interface CanvasDocumentPaneModules {
    /** `/client` */
    useGateway: () => CanvasPaneGateway;
    /** `/client` — called with `ws: gateway`. */
    useYjsDoc: (options: {
        documentId: string;
        ws: never;
        onMessage: CanvasPaneGateway['onMessage'];
        onUnpersistedChanges?: (snapshot: Uint8Array) => void;
    }) => CanvasPaneYjsDoc;
    /** `/client` */
    useCanvasDocument: (options: {
        ydoc: Y.Doc | null | undefined;
    }) => {
        isCanvas: boolean;
        body: CanvasDocumentViewProps['body'];
        exportMarkdown: () => string;
    };
}

/** The pieces `layout` places. */
export declare interface CanvasDocumentPaneParts {
    /** Recovery, storage and wire-error alerts, plus `notices`. */
    notices: ReactNode;
    /** The canvas (or its loading / migration-incomplete state), with the image provider and modal. */
    canvas: ReactNode;
    /** Formatting toolbar; null until the editor is ready or when read-only. */
    toolbar: ReactNode;
    ruler: ReactNode;
    /** For `EditorShell`'s `saveState`; undefined while idle. */
    saveState: DocumentSaveState | undefined;
    state: CanvasDocumentPaneState;
}

export declare interface CanvasDocumentPaneProps {
    documentId: string;
    /** Recovery is partitioned by these; also the awareness identity. */
    tenant: string;
    userId: string;
    userName: string;
    userColor?: string;
    /** The app's permission verdict (role, grant expiry, lifecycle). The pane adds sync and connection. */
    canEdit: boolean;
    /** The user's edit toggle. Default true. */
    editing?: boolean;
    /** Build once at module scope with `buildCanvasDocumentExtensions`. */
    extensions: readonly unknown[];
    /** Authenticated image fetch. */
    loadImage: DocumentImageLoader;
    /** Which image URLs need `loadImage`; default is gateway uploads. */
    isProtectedImage?: (src: string) => boolean;
    /** Present ⇒ the toolbar's Insert image opens a picker that uploads and inserts. */
    uploadImage?: (file: File) => Promise<string>;
    /** Tell the app about unsaved edits (a navigation guard, say). */
    onPendingChange?: (pendingUpdateCount: number) => void;
    /** Alerts placed before the pane's own. */
    notices?: ReactNode;
    /** Rendered inside the image provider after the canvas — a context panel, say. */
    children?: ReactNode;
    /** Pass-through to the view; overrides the pane's defaults. */
    viewProps?: Partial<Omit<CanvasDocumentViewProps, 'isCanvas' | 'body' | 'ydoc' | 'provider' | 'user' | 'editable' | 'extensions' | 'renderFrame'>>;
    onEditorReady?: (editor: unknown) => void;
    loadingLabel?: string;
    /** Place the parts in a shell. Omitted: notices then canvas, in a column. */
    layout?: (parts: CanvasDocumentPaneParts) => ReactNode;
    keyPrefix?: string;
}

/** What the pane knows, for a host that lays out its own shell. */
export declare interface CanvasDocumentPaneState {
    editable: boolean;
    online: boolean;
    synced: boolean;
    pendingUpdateCount: number;
    persistenceState: CanvasPaneYjsDoc['persistenceState'];
    docVersion: number;
    ydoc: Y.Doc | null;
    exportMarkdown: () => string;
}

/**
 * Save-state line for a canvas document. Only a durable backend receipt may
 * select `saved`; `idle` shows nothing.
 */
export declare function canvasDocumentSaveState(state: 'idle' | 'pending' | 'saved' | 'error', pending: number, online: boolean, retry: () => void): DocumentSaveState | undefined;

declare interface CanvasDocumentViewProps {
    /** True when the document is already a canvas (`meta.schemaVersion >= 2`). */
    isCanvas: boolean;
    /** The page body. Required when `isCanvas`; ignored otherwise. */
    body: XmlFragment | null;
    ydoc: Y.Doc;
    provider: Parameters<typeof TiptapEditor>[0]['provider'];
    user: {
        name: string;
        color: string;
    };
    editable?: boolean;
    /**
     * Canvas extensions (macro node views, heading anchors). Without these the
     * schema has no `macro` node and macros degrade to plain text, so this is
     * required rather than optional — a caller that forgets loses data on the
     * next save.
     */
    extensions: readonly unknown[];
    /**
     * Converts a legacy sectioned document into a canvas. Resolves to the
     * refusal reason on failure, or null on success.
     */
    onConvert?: () => Promise<string | null>;
    /**
     * Where to render the convert control on a legacy document.
     *
     * Given an element, the button is portaled into it and the full-width
     * explanatory prompt is not rendered at all. That is the right shape once
     * the host has a toolbar: the prompt is a standing offer about the
     * document's FORMAT, not a piece of its content, and as a block it pushed
     * the actual document down the page every single visit — an advertisement
     * above the thing you came to read.
     *
     * Null or omitted keeps the block prompt, which is still correct for a host
     * with nowhere else to put it.
     */
    convertSlot?: HTMLElement | null;
    /** Forms that could not be represented, from the last conversion. */
    unsupported?: readonly CanvasUnsupportedForm[];
    /**
     * The (still empty) canvas body, so the conversion has a live schema to run
     * against.
     *
     * ## Why this prop has to exist
     *
     * `onConvert` ultimately calls `materialize(schema, model)`, and that schema
     * must be the LIVE editor's — building a second one puts a second
     * prosemirror-model in the graph. But before conversion there IS no editor:
     * this component only mounted one inside the `isCanvas` branch, so
     * `onEditorReady` never fired, the host's schema stayed null, and
     * `WrappedCanvasDocument` refused every conversion with "the editor is still
     * loading — try again in a moment" — permanently, because it never would.
     *
     * Given the fragment, the convert prompt mounts a read-only, hidden editor
     * beside itself whose only job is to exist, so the schema is real and the
     * button works. Read-only is load-bearing: the fragment is the one
     * `materialize` writes into, and it REFUSES a non-empty body, so an editor a
     * user could type into would break conversion by being used.
     *
     * Omit it and the prompt behaves as before — the host is then responsible
     * for supplying `schema` some other way.
     */
    schemaProbe?: XmlFragment | null;
    /** Rendered above the page — title, participants, actions. */
    header?: ReactNode;
    /**
     * Rendered between the ruler (or the toolbar, with the ruler off) and the
     * sheet, across the editor column's width — the in-call follow bar
     * ("Following Alice · Session flow", mockups 02/03b/04/06). STICKY
     * (2.395.1): it starts under the ruler and, as the page scrolls, pins just
     * under the toolbar — follow mode moves the viewport for you, and the bar
     * is the way out, so it never scrolls away. Since 2.395.0.
     */
    belowRuler?: ReactNode;
    /**
     * Rendered at the right end of the toolbar — presence avatars, share, and
     * anything belonging to the document rather than to formatting.
     */
    toolbarActions?: ReactNode;
    /**
     * Annotations for the margin — comment threads, proposed edits, or both.
     * Each carries the offset it wants and the gutter resolves collisions
     * between them.
     *
     * Label each one's `kind`. The card's content is an opaque node, so this
     * view cannot tell a thread from a suggestion by looking, and the toolbar's
     * toggle has to name what it is hiding.
     *
     * Omitted entirely when empty rather than rendered as a blank column, so a
     * document with no discussion keeps the full width for its text.
     */
    gutterItems?: readonly GutterItem[];
    /**
     * Pinned to the top of the gutter — this is where a docked call goes.
     *
     * The margin beside the sheet is the right home for it: it scrolls with the
     * document, it is beside the text rather than over it, and it does not
     * reserve a band of empty page above the toolbar the way a floating dock
     * did. Its presence alone is enough to show the gutter — a call has to live
     * somewhere and "no comments yet" is not a reason to drop it.
     */
    gutterLead?: ReactNode;
    onFocusGutterItem?: (id: string) => void;
    /** Pointer over (`id`) / off (`null`) a margin card — see DocumentGutter. */
    onHoverGutterItem?: (id: string | null) => void;
    /**
     * Whether the margin gutter is showing. Defaults to true, so a caller that
     * knows nothing about this keeps today's behaviour.
     *
     * CONTROLLED on purpose. "Show comments" is a reading preference, and a
     * preference the component owns privately is one it forgets on every
     * navigation — open the document again and the margin is back. Only the host
     * can persist it (profile, localStorage, the document itself), so only the
     * host can own it.
     */
    gutterVisible?: boolean;
    /**
     * Show the ruler above the sheet.
     *
     * ON by default, which is a reversal — so here is what changed.
     *
     * It was off because the ruler lied when zoomed. Its geometry scaled with
     * the sheet but its tick grid did not: `ticksFor` stepped and labelled with
     * a hard 96px inch while being handed screen pixels, so at 150% it drew a
     * label every two thirds of a document inch and called the first one "1".
     * That is worse than no ruler, and no default could fix it.
     *
     * It no longer does. The ruler now takes DOCUMENT pixels plus `zoom` and
     * makes the one conversion itself, so an inch mark sits at `96 * zoom`
     * screen px and is still labelled 1. The label sequence is a property of the
     * page, identical at every scale — verified in the browser at 50%, 100% and
     * 150%: same eight labels, margin markers within a pixel of the sheet's own
     * text edges at all three.
     *
     * Zoom persisting across reloads is what settles the default. A reader who
     * once picked 150% now stays there, so "the zoomed case" is not a transient
     * state to be tolerated — for that reader it is every session. A ruler that
     * is correct there is worth having on; one that was not had to be hidden.
     *
     * Hosts with no room for it — a read-only embed, a preview pane — can still
     * pass `false`.
     */
    showRuler?: boolean;
    /** Forwarded to the toolbar: `compact` for a document shown inside something else. */
    toolbarDensity?: 'full' | 'compact';
    /**
     * The word-count / zoom bar along the bottom. Off for an embedded pane, and
     * off on a page whose zoom lives in the toolbar's ⋯ overflow instead — with
     * the bar off and `zoomMode` `remembered`, the toolbar gets `zoomControl`.
     * Read the length through `onDocumentStats` then.
     */
    showStatusBar?: boolean;
    /**
     * Horizontal page margin. `normal` is 1in on a letter sheet; `narrow` is
     * 0.75in — the documents workspace, where a typical line of the seeded
     * plan fits the measure instead of wrapping its last two words. The ruler
     * follows the same figure, so it keeps measuring what the page does.
     */
    pageMargin?: 'normal' | 'narrow';
    /**
     * The document's length as the status bar would report it, for a host that
     * shows it elsewhere (an info panel). Called when a figure changes; `null`
     * while unknown. `pageCount` is null on an unpaginated page.
     */
    onDocumentStats?: (stats: {
        wordCount: number | null;
        pageCount: number | null;
    }) => void;
    /** `fit` pins the sheet to the pane's width and ignores the remembered zoom — for a document shown in a narrow host. */
    zoomMode?: 'remembered' | 'fit';
    /**
     * `card` (since 2.386.5) draws the toolbar as one white rounded card on the
     * workspace grey, as the word-processor row (`DocumentToolbar
     * extras="overflow"`): alignment, indent, rule, table, clear formatting and
     * zoom behind its ⋯. `bar` (default) is the full-width strip.
     */
    toolbarStyle?: 'bar' | 'card';
    /**
     * How tall the grey workspace is. `viewport` (default) measures the view's
     * own distance from the top of the window and takes the rest of it, which
     * is what a host with an unbounded page needs. `parent` fills the box the
     * host gives it instead (`h-full`, the workspace `flex-1`), for a host that
     * already bounds the height — `EditorShell`, whose scroller pads by the
     * floating composer's `--dock-height`. Measured to the window there, the
     * workspace ran under the dock and the composer covered the last lines of
     * the page and the status bar.
     */
    fitHeight?: 'viewport' | 'parent';
    /**
     * Show the outline column beside the page.
     *
     * Off by default: it is the host's call whether a document is long enough to
     * need navigating, and an outline on a two-paragraph note is a column of
     * emptiness next to the thing you are reading.
     */
    showOutline?: boolean;
    /**
     * Draw page boundaries on the sheet: a 24px band of desk every 1056px with
     * a one-inch margin of white on each side of it, and a page count in the
     * status bar. Also pads the last sheet out to a whole page, and moves
     * content so that nothing lands on a boundary or in a margin.
     *
     * ON by default, which is a reversal — so here is what changed.
     *
     * It was off because a seam sliced pictures in half. Pagination was one
     * idea: a baseline grid whose row is the body line advance, plus a seam
     * thinner than the leading between two lines. Wonderful for prose, useless
     * the moment a screenshot appears — an image's intrinsic height cannot be
     * rounded to a 26.4px row, so it knocked every line below it off the grid
     * for the rest of the document. Measured over 1000 generated documents:
     * 8.4% of seams bisected on prose, 72.7% once images and tables were in the
     * mix. Shipping that was worse than one long sheet, so it stayed a prop.
     *
     * The grid is still there and still does the prose half of the job, but it
     * is no longer alone. `canvas/pageFlow.ts` now measures every top-level
     * block and moves the ones a seam would cut: an image, a table, a rule, a
     * code block or a heading is pushed to the next page rather than sliced, a
     * paragraph gets orphan/widow control instead, and the baseline grid is
     * re-snapped underneath anything whose height was intrinsic. Same corpus,
     * same 1000 documents: 0.0% of seams bisected, prose and pictures alike, for
     * about 6% more sheets.
     *
     * What has NOT changed is that pagination and the baseline grid are one
     * feature: the typography still moves when this is on. Paragraph gaps go
     * 14.4px -> 26.4px and headings and code blocks are re-spaced, so the page
     * gets airier. That is the mechanism, not a side effect.
     *
     * ## Every page has margins now, and it costs about a third more sheets
     *
     * This used to protect a hairline. Interior pages had no top or bottom
     * margin at all — page one had its inch and page one alone, and everywhere
     * else the text ran down to the boundary and started again straight below
     * it. The flow now reserves the same inch on both sides of every boundary
     * and moves anything that would reach into it, prose included: measured over
     * 1500 generated documents, 0 of 11,619 prose margins and 0 of 13,800 mixed
     * ones carry ink.
     *
     * Two consequences a host should know about before turning this on.
     *
     *   - SHEETS. 211.2px of every 1056 is margin, and a paragraph that can no
     *     longer flow through a boundary leaves a ragged page bottom on top of
     *     that. Same corpus: 1.30x the pages. `pageCount` and "Page 3 of 7"
     *     report the new number, which is the honest one — it is the number of
     *     sheets this document would occupy.
     *   - RAGGED BOTTOMS. Google Docs breaks a paragraph across a page and fills
     *     the sheet; this cannot, because a paragraph is one block box in a
     *     continuous flow and no CSS inserts two inches of dead space into the
     *     middle of one. A page therefore ends after its last whole paragraph.
     *
     * Both are in `canvas/pageFlow.ts` under "## Why every page has margins".
     *
     * Hosts that want the endless sheet — a preview pane, an embed with no room
     * for page furniture — can still pass `false`, and get back exactly the
     * document they had before any of this existed.
     */
    paginate?: boolean;
    /**
     * Flips `gutterVisible`. Its absence means no toggle is offered at all,
     * which is the right default for a read-only embed with no place to store
     * the answer.
     */
    onToggleGutter?: () => void;
    /**
     * Split the view so the host can place the chrome. Given a function, the view
     * stops drawing its own toolbar (with the find row) and ruler inside the
     * workspace and hands them over instead: put `toolbar` in `EditorShell`'s
     * `toolbar` slot, `ruler` under it (or drop it), and `surface` — the header,
     * banners and the canvas — in the body. `toolbar` and `ruler` are null until
     * they apply (read-only, editor not ready, `showRuler` off). Omitted keeps the
     * default single-frame layout unchanged. Same shape as the presentation
     * editor's `renderFrame`.
     */
    renderFrame?: (frame: CanvasDocumentFrame) => ReactNode;
    /**
     * Forwarded to the toolbar's image button. See DocumentToolbar's prop docs:
     * the host owns the picker and the upload, this view only decides that the
     * control belongs on the bar rather than in the host's `toolbarActions`
     * slot, where it would sit beside presence instead of beside the other
     * insert controls.
     */
    onInsertImage?: () => void;
    /**
     * Hands the live editor out once it exists (null while initialising).
     *
     * Not a convenience: `materialize()` needs the LIVE editor's ProseMirror
     * schema, and building a second one puts a second prosemirror-model in the
     * graph — the `instanceof` break the app's optimizeDeps.exclude entries
     * already exist to prevent. This is how a caller gets the real one.
     */
    onEditorReady?: (editor: Parameters<typeof DocumentToolbar>[0]['editor'] | null) => void;
    'data-testid'?: string;
}

/** The gateway pieces the pane reads (`useGateway()`'s return, structurally). */
export declare interface CanvasPaneGateway {
    connectionState: string;
    onMessage: (handler: (message: {
        channel?: string;
        type?: string;
        error?: unknown;
    }) => void) => () => void;
}

/** `useYjsDoc(...)`'s return, structurally. */
export declare interface CanvasPaneYjsDoc {
    ydoc: Y.Doc | null;
    provider: (CanvasDocumentViewProps['provider'] & {
        pendingUpdateCount: number;
        awareness: {
            setLocalStateField: (field: string, value: unknown) => void;
        };
    }) | null;
    synced: boolean;
    persistenceState: 'idle' | 'pending' | 'saved' | 'error';
    pendingUpdateCount: number;
    retryPersistence: () => void;
    docVersion: number;
}

export declare interface CanvasRecovery {
    version: 1;
    savedAt: string;
    snapshot: string;
}

/** Storage key partitioned by verified identity and document; a grant is never stored. */
export declare function canvasRecoveryKey(tenant: string, subject: string, documentId: string, prefix?: string): string;

/**
 * A form the ProseMirror schema could not express, surfaced rather than
 * dropped. Mirrors `UnsupportedForm` in realtime-modules structurally so this
 * package keeps zero runtime dependency on it.
 */
declare interface CanvasUnsupportedForm {
    kind: string;
    reason?: string;
}

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

export declare function CapabilityGate({ need, children, fallback }: CapabilityGateProps): JSX.Element;

export declare interface CapabilityGateProps {
    /** Renders children only when ALL of these are effective. */
    need: RealtimeCapabilityName | readonly RealtimeCapabilityName[];
    children: ReactNode;
    /**
     * Shown when the capability is unavailable. Defaults to nothing.
     *
     * Nothing, not a disabled control or an upsell: a greyed "Start call" in a
     * chat-only deployment is a promise the product cannot keep, and the reader
     * cannot tell whether it is broken, loading, or needs a permission. The way a
     * surface says "this does not apply here" is by not being there.
     */
    fallback?: ReactNode;
}

/**
 * The capability names to resolve for a declared feature set — feed this to
 * `useCapabilities`. Asking for names the host has not declared would make the
 * gateway's answer decide a question the host already answered.
 */
export declare function capabilityNamesFor(declare?: readonly ConversationFeature[], overrides?: Partial<Record<GatedConversationFeature, string>>): string[];

declare interface ChannelDocumentItem {
    documentId: string;
    title: string;
    /** Emoji or short glyph from the document's type. */
    icon?: string;
    /** Display name of whoever created it. */
    createdBy?: string;
    /** ISO-8601 of the last edit — what people scan this list by. */
    updatedAt?: string;
    /** People with the document open right now. */
    activeEditors?: number;
}

declare interface ChannelFileItem {
    /** The message the file arrived on — what the row jumps back to. */
    messageId: string;
    attachment: ChatAttachment;
    author: string;
    /** ISO-8601 of the message. */
    sentAt?: string;
}

/**
 * One time you were named, in a CHANNEL. Named `ChannelMention…` because the
 * library already has a `MentionItem` for the other kind — being named in a
 * document comment — and those two are not interchangeable: one points at a
 * message in a conversation, the other at a comment on a section.
 */
declare interface ChannelMentionItem {
    messageId: string;
    /** Channel the mention happened in — the id used to navigate. */
    channel: string;
    /** Human-readable channel name. Falls back to the id when absent. */
    channelLabel?: string;
    author: string;
    /** The message text, trimmed by the caller if it is long. */
    excerpt: string;
    /** ISO-8601. */
    at?: string;
    /** Unread mentions are the ones that still need you. */
    unread?: boolean;
}

declare interface ChannelRecordingItem {
    recordingId: string;
    /** ISO-8601 of when the call started. */
    startedAt?: string;
    /** Length of the recorded media, in milliseconds. */
    durationMs?: number;
    /** Distinct PEOPLE on the call, not sessions — rejoins are not extra heads. */
    participantCount?: number;
    participants?: Array<{
        userId: string;
        displayName?: string;
    }>;
    thumbnailUrl?: string;
    /**
     * Whether the recording can actually be played. A row that opens a player
     * showing nothing is worse than a row that says the recording is still
     * being assembled.
     */
    playable?: boolean;
}

declare interface ChatAttachment {
    /** Correlation id shared with the sender's in-flight transfer. */
    id: string;
    /** Original filename. User content — never used as a path, never trusted. */
    name: string;
    /** Byte length of the stored object. */
    size: number;
    /** Declared MIME type. Advisory: used to pick a layout, never to trust. */
    contentType: string;
    /**
     * Authenticated download URL. Because the download route requires a bearer
     * token, an `<img src>` pointed straight at this will 401 — a resolved
     * object URL should be handed in as `src` by the integration layer.
     */
    url: string;
    /** Intrinsic dimensions when known, so the row reserves space before load. */
    width?: number;
    height?: number;
    /**
     * Tiny inline data-URI placeholder captured by the sender before upload.
     * Lets a recipient see what the image IS while the bytes are still moving.
     */
    preview?: string;
}

declare interface ChatMessage {
    id?: string;
    clientId: string;
    /**
     * Authenticated sender, stamped server-side. Distinct from `clientId`,
     * which identifies a CONNECTION and changes on every reconnect — which is
     * why "is this mine" keys on this and never on clientId: otherwise your own
     * messages stop being yours partway up the thread.
     */
    userId?: string;
    content: string;
    timestamp: string;
    displayName?: string;
    avatarUrl?: string;
    /**
     * Files shared alongside (or instead of) the text.
     *
     * An attachment rides ON a message rather than being its own message kind
     * so that ordering is free: the file lands exactly where the sender put it
     * in the conversation, interleaved correctly with the text around it. A
     * separate "file event" stream would have to be merged back against the
     * message stream at render time, and the merge would be wrong at exactly
     * the moment it matters — when someone is typing while a file uploads.
     *
     * `content` may be empty when a message is nothing but attachments.
     */
    attachments?: ChatAttachment[];
    /**
     * Server-stamped facts about what this message IS, beyond its text.
     *
     * The thread renders some messages as objects rather than sentences — a
     * document that was created, a call that is happening — and this is where
     * the facts for those live: `{ kind: 'document', documentId, title }`,
     * `{ kind: 'call', callId, participants, endedAt }`. The sentence stays in
     * `content` for everywhere that renders plain text (notification previews,
     * the conversation list preview), so a host that does nothing with metadata
     * still shows something true.
     *
     * Deliberately open: the gateway adds event kinds without the library
     * needing a release, and `documentRefFromMetadata` / `callRefFromMetadata`
     * are the readers that turn this back into something typed.
     */
    metadata?: Record<string, unknown>;
    /** ISO: the author changed the text after sending. Rendered as "(edited)". */
    editedAt?: string;
    /** ISO: the author (or a moderator) removed it. The row keeps its place and says so. */
    deletedAt?: string;
}

declare interface ChatPanelProps {
    messages: ChatMessage[];
    /**
     * Viewer-only messages, rendered in timeline order among `messages` (by
     * timestamp) with a note that nobody else sees them and their `actions` as
     * small buttons under the card. The host owns them: ChatPanel never sends,
     * stores or removes one.
     */
    localMessages?: LocalChatMessage[];
    onSend: (content: string) => void;
    /**
     * Replaces the built-in input row entirely.
     *
     * The default composer is a plain field, which is the right default: it costs
     * no rich-text dependency and suits a support widget or a log console. A host
     * that wants formatting, @mentions, `:` emoji and staged attachments passes
     * `RichChatComposer` here (from `ui-components/social/rich-composer`, which
     * carries the tiptap peers) rather than this panel growing a second mode.
     *
     * When set, `onSend`, `onSendFiles`, `emojis` and the other composer-shaped
     * props are NOT used for input — the slot owns sending. They still apply to
     * the message list.
     */
    composer?: ReactNode;
    /**
     * Pinned to the composer's top edge, between the thread (and the typing
     * row) and the composer — the in-call shelf (`CallDock`) of the call this
     * conversation is on, per the document-calls mockup 02. The composer keeps
     * the bottom edge. Rendered `shrink-0`; the host owns what goes in it.
     */
    dock?: ReactNode;
    /**
     * The viewer, so their own reactions can be marked and their own messages
     * can offer edit/delete. Without it reactions render but cannot be toggled
     * meaningfully — "did I react?" is unanswerable.
     *
     * Also the identity that decides which in-flight `transfers` are the
     * viewer's own (compared against `ChatTransfer.uploader`).
     */
    currentUserId?: string;
    /** Reactions on one message. Omit to render no reaction UI at all. */
    reactionsFor?: (messageId: string) => readonly {
        emoji: string;
        userId: string;
        displayName?: string;
    }[];
    /** Toggles the viewer's reaction. Presence of this enables the react controls. */
    onToggleReaction?: (messageId: string, emoji: string) => void;
    /** Starts a quote-reply. Presence of this enables the reply control. */
    onReply?: (message: ChatMessage) => void;
    /**
     * The message being answered. Renders a dismissible quote strip directly above
     * the built-in input row. Ignored when `composer` is supplied (that slot owns
     * its own reply UI, e.g. ContextComposer's `reply`). The panel does not stamp
     * `metadata.replyTo` on the outgoing message: the host does, from the same
     * value, in whatever `onSend` path it owns.
     */
    reply?: QuotedMessage | null;
    /** Called by the quote strip's dismiss control. Omit for a quote with no dismiss. */
    onCancelReply?: () => void;
    /**
     * Send this message to ANOTHER conversation. Presence of this enables the
     * Forward control; absent, nothing renders and every existing caller is
     * untouched.
     *
     * ## What it is offered on, and why the gate is tighter than Reply's
     *
     * Reply is withheld from system NOTICES only (`metadata.system`) — replying
     * to "Bob started a call" quotes an event back at the room. Forward is
     * withheld from notices for the same reason AND from three more shapes,
     * because a forward is not a quote: it relocates the message, and a message
     * that only means something where it is does not survive the trip.
     *
     *   * A CARD — document, recording, call, agent run, membership — is a
     *     handle on something scoped to the conversation it was posted in. Its
     *     buttons resolve against services the destination may not reach: Open
     *     on a document nobody there can read, Join on a call that is not that
     *     room's, a runId whose panel lives in another channel's side pane. The
     *     card would render and then do nothing, which is worse than not
     *     offering it. Note this is WIDER than Reply's gate on purpose: a
     *     document card a PERSON posted through the share picker is a message
     *     they chose to send, so replying to it means what it normally means —
     *     but forwarding it still moves a link that may not open at the far end.
     *   * An ATTACHMENT rides a download URL scoped to the transfer in its
     *     origin channel. Re-posting the descriptor hands the destination a file
     *     row that 403s. Re-uploading the bytes into the new conversation is a
     *     different feature and is not this one.
     *   * A message with no words — attachments only, or deleted — has nothing
     *     to carry.
     *
     * So: own, other people's, plain text, still there. The handler receives the
     * message that was CLICKED, never the thread root — unlike `onReply`, which
     * folds a reply back onto its root, forwarding is about these exact words.
     *
     * ## What the host should post
     *
     * The library does not send anything; the host owns the destination and the
     * post. What it must not do is strip the attribution — see `ForwardedFrom`.
     *
     * ## Why the button comes with it
     *
     * The second argument is the Forward BUTTON that was pressed. Picking a
     * destination is a small act started from one message's hover bar, and a
     * picker that dims the page and lands in its centre puts the choice
     * nowhere near the words it is about. Only the panel knows which row's
     * button this was, so it hands it over and the host anchors to it.
     * Existing handlers that take the message alone keep working.
     */
    onForwardMessage?: (message: ChatMessage, trigger: HTMLElement) => void;
    /**
     * Put a link to this message on the clipboard.
     *
     * The HOST builds it, not the panel: a link needs a route, and the library
     * has no router and no idea what a conversation's URL looks like. Omit and
     * the control does not render — the same rule every other action here
     * follows, since a Copy link that copies nothing is worse than none.
     */
    onCopyLink?: (message: ChatMessage) => void;
    /** Pin/unpin. Absent means this viewer may not pin — the control is hidden. */
    onTogglePin?: (message: ChatMessage) => void;
    /**
     * Change the text of one of the viewer's own messages. Present, the hover
     * bar offers Edit on own, undeleted, plain messages (never on cards or
     * notices) and the bubble becomes an editor in place. Resolves once the
     * server has it — the edited message arrives through the live frame.
     */
    onEditMessage?: (message: ChatMessage, text: string) => Promise<void> | void;
    /** Remove one of the viewer's own messages, after a confirm. Same gate as `onEditMessage`. */
    onDeleteMessage?: (message: ChatMessage) => Promise<void> | void;
    /**
     * Who may edit. Default: the viewer's own messages only. A host that knows
     * more (it is the server that decides) passes a predicate; it REPLACES the
     * own-message default for Edit, and cards/notices/deleted rows stay excluded.
     */
    canEditMessage?: (message: ChatMessage) => boolean;
    /** Who may delete. Default own messages; a moderator-grant host widens it. */
    canDeleteMessage?: (message: ChatMessage) => boolean;
    /** Message ids currently pinned in this channel. */
    pinnedMessageIds?: ReadonlySet<string>;
    /**
     * Scrolls to a quoted original. Omit and quotes render as a record of what
     * was said rather than a control that goes nowhere — which is the honest
     * shape when the original is outside the loaded window.
     */
    onJumpToMessage?: (messageId: string) => void;
    /**
     * People currently editing a document, keyed by documentId. Feeds the
     * document cards in the thread, which is where the difference between "a
     * document exists" and "two people are in it right now" shows up.
     */
    documentEditors?: (documentId: string) => readonly DocumentActivityEditor[];
    /**
     * Documents a message refers to that can no longer be reached, keyed by
     * documentId: `'gone'` (deleted) or `'forbidden'` (not shared with the
     * viewer); `undefined` when it is fine or not yet known. Their cards and
     * chips render muted and labelled, with no way in. Since 2.406.0.
     */
    documentUnavailable?: (documentId: string) => DocumentUnavailableReason | undefined;
    /**
     * Who is in a call right now, keyed by callId. Overrides the participant
     * list frozen into the message metadata, which is only a snapshot of the
     * moment the event was written — people join a call after it starts, and a
     * card showing the founding members while three more are inside is why you
     * would not bother joining.
     */
    callParticipants?: (callId: string) => readonly CallActivityParticipant[];
    /**
     * Where a `/doc` command's pipeline run is, keyed by runId. The message
     * metadata only knows the run was started; the card shows it moving.
     */
    agentRunStatus?: (runId: string) => AgentRunStatus | undefined;
    /** Open the run in the pipeline UI from an agent-run card. */
    onOpenRun?: (runId: string) => void;
    /**
     * Where an agent LOOP is, keyed by runId — the phase, clock, steps and
     * budget its card shows in place of the pipeline's three beats. Called for
     * the run cards the panel renders, so a host can watch only those.
     * Undefined for a run that is not a loop, or one the host is not watching.
     */
    agentLoopStatus?: (runId: string) => AgentRunLoop | undefined;
    /** Open a loop's lab beside the chat. The card offers "Open lab" for a loop only when this is given. */
    onOpenLab?: (runId: string) => void;
    /** Open what a finished agent run produced — a side panel, a document, a link. */
    onOpenResult?: (result: AgentRunResult) => void;
    /** Approve or reject a run whose card says it is waiting for approval. */
    onDecideRun?: (runId: string, decision: AgentRunDecision) => void;
    /** Accept or reject the suggestions a finished agent edit left in the document. */
    onReviewRun?: (runId: string, decision: AgentRunReviewDecision, suggestion: Pick<AgentRunSuggestion, 'key' | 'documentId'>) => void;
    /** Start a failed agent run again; a failed card offers "Retry" only when this is given. */
    onRetryRun?: (runId: string) => void;
    /**
     * Joins a live call from the thread. Omit when the viewer cannot join —
     * the card then renders as a record rather than a dead button.
     */
    onJoinCall?: (callId: string) => void;
    /** Opens a recording posted in the thread. Omit and the card is a record, not a button. */
    onOpenRecording?: (recordingId: string) => void;
    /** Puts a link to the recording on the clipboard (the card's ⋯ menu). */
    onCopyRecordingLink?: (recordingId: string) => void;
    /** Mints a share link for the recording. */
    onShareRecording?: (recordingId: string) => void;
    onDownloadRecording?: (recordingId: string) => void;
    onOpenRecordingTranscript?: (recordingId: string) => void;
    /** "View or change" on a recording card's expiry line. */
    onManageRecordingExpiry?: (recordingId: string) => void;
    /**
     * The recording's LIVE state — stage, thumbnail, expiry — overlaid on what
     * the message stamped. Read from the recordings API by the host.
     */
    recordingStatus?: (recordingId: string) => RecordingCardStatus | undefined;
    /** Opens a document announced in the thread. */
    onOpenDocument?: (documentId: string) => void;
    /**
     * Viewer-scoped attachments whose safe rendering belongs to the host.
     * Called for each durable message inside its bubble. The raw metadata is
     * never interpreted by the library; a host can resolve opaque references
     * for the current reader and return unavailable placeholders after revoke.
     */
    renderMessageReferences?: (message: ChatMessage) => ReactNode;
    /**
     * The message a jump just landed on. Highlighted so arriving somewhere in
     * the middle of a transcript says WHICH message you were sent to — without
     * it a jump scrolls and leaves you to guess. The caller clears it; the
     * panel does not own a timer.
     */
    highlightedMessageId?: string | null;
    /**
     * Nest replies under the message they answer, Teams-style, instead of
     * letting every message be a peer in one flat river.
     *
     * OPT-IN, and default false on purpose. Threading is a CHANNEL shape: a
     * post with answers hanging off it. A DM, a support widget, a call-side
     * chat and a log console are all rivers, and grouping in those surfaces
     * would indent messages that nobody thinks of as replies. Every existing
     * caller keeps the flat render untouched.
     *
     * What it does when on: a message whose `metadata.replyTo.messageId` names
     * another message IN THE LOADED LIST renders beneath it, indented behind a
     * rail. One level only — a reply to a reply joins the same thread rather
     * than opening a second indent, which is the rule Teams settled on and the
     * reason its channels stay readable. A message with no replies renders
     * exactly as it does with this off.
     */
    threaded?: boolean;
    /**
     * Draw your own messages right-aligned in their own bubble. True by
     * default, which is what a two-person chat wants.
     *
     * A CHANNEL does not: Teams left-aligns every post in a channel, author and
     * avatar and all, and only a 1:1 chat puts yours on the right. With
     * threading on, the right-aligned treatment actively fights the thread —
     * the rail marking "these replies belong to that post" runs down the far
     * left while your reply sits at the far right, and the two stop looking
     * related at all.
     */
    alignOwnMessages?: boolean;
    disabled?: boolean;
    onTyping?: (isTyping: boolean) => void;
    typingUsers?: string[];
    /**
     * What stands where the thread will be while there is none: an intro
     * ("This is the start of your conversation with Carol"), not the bare
     * "No messages yet" line. Sits where the first message will land, so the
     * eye is already in the right place.
     */
    emptyState?: ReactNode;
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
    /** With a custom composer, let its backdrop meet the
     *  parent edges while message history keeps a 16px reading gutter. */
    flushComposer?: boolean;
    /** Discussion logs start at the top; live conversations rest against their input. */
    contentAlign?: 'start' | 'end';
    /** Called when the reader asks for older messages. When present (and
     *  `hasMore` is not false) a "Load earlier messages" button renders
     *  above the first message. The panel preserves the reader's scroll
     *  position across the prepend — growing the list must not yank the
     *  viewport, which is the same bug class as the auto-scroll below. */
    onLoadMore?: () => void;
    /** Whether older messages exist. Defaults to true when `onLoadMore` is
     *  given; pass false once the whole history is loaded to retire the button. */
    hasMore?: boolean;
    /** Show the load-more button in a pending state. */
    loadingMore?: boolean;
    /**
     * Who has read up to where in this channel. Cursors, not per-message records.
     *
     * One entry PER PERSON, not per message: `readAt` is how far that person has
     * read, so "has Carol seen message M" is `readAt >= M.timestamp` and nothing
     * finer is knowable. There is no per-message record on the server and there
     * is not going to be one, which is why this panel draws a single line under
     * your newest message rather than a tick beside every message — a tick per
     * message would be asserting a fact the data does not contain.
     *
     * The viewer's own cursor may be in here; it is filtered out. Reading your
     * own message is not a receipt.
     */
    readReceipts?: readonly {
        userId: string;
        displayName?: string;
        readAt: string;
    }[];
    /**
     * False when the server does not keep receipts here. Default true.
     *
     * The server keeps them only where the roster is small and nameable — a DM,
     * or a closed channel of at most twenty — and reports them off everywhere
     * else. That is a privacy decision, not a loading state, so `false` renders
     * NOTHING: no greyed hint, no "receipts are off in large channels" note. A
     * channel where receipts are off looks like a channel that never had them,
     * because an explanation is itself a signal that somebody's reading is being
     * tracked somewhere.
     */
    readReceiptsEnabled?: boolean;
    /**
     * ISO timestamp: the boundary between what this person had read and what
     * they had not.
     *
     * Draws ONE line across the transcript immediately above the first message
     * at or after it — the line Teams and Slack both draw, and the only thing
     * that answers "where does new begin" when you come back to a busy channel.
     * The floating "N new messages ↓" pill answers a different question ("is
     * there more, below the fold") and both stay.
     *
     * This is the viewer's OWN cursor — the same per-conversation value that
     * powers "Mark as unread" in the rail — and is unrelated to `readReceipts`,
     * which is where OTHER people have read to.
     *
     * The panel FREEZES it (see `unreadBoundaryRef` in the body). Hand it the
     * cursor as it stood when this conversation was opened and keep passing it,
     * or stop passing it once the server marks the channel read — either way
     * the line stays where it was put for as long as the panel is mounted.
     */
    unreadFrom?: string;
    /**
     * Receives files the user dropped on the thread, pasted into the composer,
     * or picked with the paperclip. When absent, every attachment affordance is
     * suppressed — a panel wired to a transport with no upload service must not
     * advertise one.
     */
    onSendFiles?: (files: File[]) => void;
    /**
     * Transfers currently in flight IN THIS CHANNEL — including other people's.
     *
     * This is the prop that makes the feature feel live rather than
     * transactional. Rendering only your own uploads here would leave every
     * other participant staring at an unchanged thread until a file appears
     * fully-formed out of nowhere.
     */
    transfers?: ChatTransfer[];
    /**
     * The viewer's DISPLAY NAME. Legacy fallback for "whose transfer is this",
     * used only when a transfer carries no `uploader` id. Prefer
     * `currentUserId`: a display name is not an identity, and deciding ownership
     * from it gave two participants named "Alex" a cancel button on each other's
     * uploads.
     */
    currentActor?: string;
    onCancelTransfer?: (transferId: string) => void;
    /**
     * Resolves an attachment to a directly-renderable image source. The download
     * route is bearer-authenticated, so an `<img src>` pointed at the raw URL
     * 401s; the integration layer fetches with credentials and hands back an
     * object URL. Attachments with no resolved src fall back to their inline
     * preview.
     */
    attachmentSrc?: (attachment: ChatAttachment) => string | null | undefined;
    /** Invoked when the viewer opens/downloads an attachment. */
    onOpenAttachment?: (attachment: ChatAttachment) => void;
    /** MIME/extension filter for drops and the picker. Defaults to everything. */
    acceptFiles?: string;
    /** Per-file byte cap enforced before the transfer starts. */
    maxFileSize?: number;
    /** Reports a rejected drop/paste so the host can surface it. */
    onFileError?: (message: string) => void;
    /**
     * Emoji offered by the composer picker. Defaults to the library's full
     * searchable set — deliberately NOT a short service-side catalog. A fixed
     * server-blessed list is right for reactions that get aggregated and
     * persisted; it is wrong for typing, where an emoji is just a character and
     * an unavailable one reads as a missing feature.
     */
    emojis?: readonly string[];
}

/**
 * Something open BESIDE the conversation — a document, a search-result graph,
 * a run's trace. `kind` selects a renderer (see ChatSidePanelRegistry); `id`
 * is what that renderer opens. The library reserves `kind: 'document'` for the
 * `?doc=` URL form; every other kind is the host's.
 */
declare interface ChatSidePanelRef {
    kind: string;
    id: string;
    /** A first guess at the header; a renderer may replace it once it knows more. */
    title?: string;
    /** Extra state the renderer needs — a query, a tab. Round-trips through the URL. */
    params?: Record<string, string>;
}

declare interface ChatTransfer {
    transferId: string;
    /**
     * Who is sending, for DISPLAY ONLY. A human-facing name is not an identity:
     * two people can be called "Alex", and one person can rename themselves
     * mid-transfer. Never decide ownership from this field — use `uploader`.
     */
    actor: string;
    /**
     * Authed user id of the sender — the reliable identity for "is this mine".
     * Mirrors realtime-modules' `ChannelTransfer.uploader`. Optional because
     * hosts on older transports may not carry it; when it is absent the panel
     * falls back to the display-name comparison, which is the pre-existing
     * (wrong, but no worse than before) behaviour.
     */
    uploader?: string;
    name: string;
    size: number;
    transferred: number;
    phase: TransferPhase;
    contentType?: string;
    preview?: string;
    error?: string;
}

/** Minimal provider shape needed by awareness. */
declare interface CollaborationProvider {
    awareness: Awareness;
}

declare interface ConnectionPillProps {
    state: ConnectionState;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette.
     *
     * A wrapper `className` cannot substitute: the label and dot colours come
     * from the per-state map below, on children the caller never sees.
     */
    tone?: ConnectionPillTone;
    /** Dot-only rendering — no label text. Default false. */
    compact?: boolean;
    /** Render the text label next to the dot. Default true. Set false for dot-only. */
    withLabel?: boolean;
    /** Override label text per state (e.g. localized strings). */
    labels?: Partial<Record<ConnectionState, string>>;
    /**
     * Optional action rendered inside the pill — "Reconnect" when the socket is
     * down, a host-defined control otherwise.
     *
     * A status pill is where people look when the connection misbehaves, so it
     * is also where they reach for the fix. Without this the recovery control
     * has to live somewhere else in the chrome, and in practice it ends up
     * nowhere: the host keeps threading an `onReconnect` down to a component
     * that no longer renders it.
     *
     * The host decides the label and whether there is an action at all, because
     * the sensible control is state-dependent and that policy belongs to the
     * product, not to the pill. Ignored when `compact` — a dot has no room for
     * a verb.
     */
    action?: {
        label: string;
        onClick: () => void;
        disabled?: boolean;
        'data-testid'?: string;
    };
    className?: string;
    'data-testid'?: string;
}

/** @see SurfaceTone — which colour family the pill paints in. */
declare type ConnectionPillTone = SurfaceTone;

/** Connection lifecycle states */
declare type ConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

export declare const CONVERSATION_CAPABILITY_NAMES: Record<GatedConversationFeature, string>;

export declare type ConversationCallDockComponent = (props: ConversationCallDockProps) => React.JSX.Element | null;

/** The realtime-modules functions ConversationCallDock calls (spread `/client/video`). */
export declare interface ConversationCallDockModules {
    conversationCallDockProps: typeof RMVideo.conversationCallDockProps;
    useAudioVideoSettings: typeof RMVideo.useAudioVideoSettings;
}

export declare interface ConversationCallDockProps {
    /** `useConversationCall()`'s result, as-is. */
    call: RMConversationCallSource;
    /** The conversation's name (`#general`, `Alice Chen`, an initiative). */
    title: string;
    /** Opens the host's People panel (the dock's People button). */
    onOpenPeople: () => void;
    /** The People panel is open (the button reads pressed). */
    peopleOpen?: boolean;
    /**
     * The host's own settings surface. Omitted, the dock opens its built-in
     * "Call devices" dialog (AudioVideoSettingsForm bound to useAudioVideoSettings).
     */
    onOpenSettings?: () => void;
    onPopOut?: () => void;
    /** Host controls in the controls row, before the gear (reactions, recording chip). */
    extras?: ReactNode;
    /** Extra rows in the camera menu ("Blur background…"). */
    cameraMenuItems?: {
        label: string;
        onSelect: () => void;
    }[];
    /** Override a participant's camera tile; `undefined` draws their initials. Default: StreamVideo on their stream. */
    tile?: (p: RMConversationCallParticipant) => ReactNode | undefined;
    /** An info line above the shelf while the call is on (e.g. who the call could not ring). */
    notice?: ReactNode;
    /**
     * Raised hand per call participant (2.458.1), by userId: `true`, a 1-based
     * queue position, or undefined. Bind to realtime-modules' useMeeting with
     * `const hands = meetingHandPositions(meeting.hands); handFor={(id) => hands.get(id)}`.
     */
    handFor?: (userId: string) => boolean | number | undefined;
    /** Name shown on the settings preview. */
    selfName?: string;
    /** 132 × 74 tiles instead of 176 × 88. */
    compact?: boolean;
    /** Shelf tile size (2.432.0): `sm` 132 × 74, `md` 176 × 88 (default), `lg` 240 × 135. Wins over `compact`. */
    tileSize?: CallDockTileSize;
    /**
     * The documents the call is about (2.432.0): the bar draws them as chips
     * after the meta (≥ 1240px of dock width) and, with `onOpenDocuments`, a
     * "Documents N" button. Omitted: a conversation call without documents.
     */
    documents?: {
        id: string;
        title: string;
        presenting?: boolean;
    }[];
    onOpenDocuments?: () => void;
    documentsOpen?: boolean;
    onDocumentClick?: (id: string) => void;
    /**
     * `shelf` (default): the dock's header, device controls and Leave over a
     * row of tiles. `grid` (2.423.0): the call's media panel — only the tiles,
     * in a grid that reflows with the head count (1 / 2 / 2×2 / 3 columns), the
     * viewer first as "You". The host's bar keeps mic, camera and Leave. The
     * same single dock (and its media elements) serves either layout.
     * `stack` (2.432.0): the narrow `shelf` for a side pane — mic ▾, camera ▾
     * and Leave on the bar, the rest in its "⋯" menu, the tiles two to a row.
     */
    layout?: 'shelf' | 'grid' | 'stack';
    className?: string;
    /** The dock's test id; the notice is `<id>-notice`, the settings dialog `<id>-settings`. Default `conversation-call-dock`. */
    'data-testid'?: string;
}

/** The views a conversation can offer. `chat` is the transcript itself. */
declare type ConversationFeature = 'chat' | 'files' | 'documents' | 'pins' | 'members' | 'mentions' | 'calls';

export declare type ConversationFeaturesFor = (opts: ConversationFeaturesForOptions) => ConversationFeature[];

/** The realtime-modules functions conversationFeaturesFor calls. */
export declare type ConversationFeaturesForModules = Pick<RealtimeClientModules, 'lobbyForChannel'>;

/**
 * Which features a conversation is CAPABLE of, before anyone asks the gateway
 * what it provisions.
 *
 * This is the host's half of the two gates: the app declares what it ships,
 * the gateway says what it provisions per channel, and the surface renders the
 * intersection. Some of the host's half depends on WHICH conversation this is,
 * and that is what this answers.
 *
 * The rule that motivated it: a call is addressed to a LOBBY, and a plain
 * channel has none — calls go to people (`dm:`) or to a room (`room:`). A
 * `#general` that offered a Calls tab showed an empty state reading "Calls
 * recorded in this conversation show up here", which no call ever could:
 * there is no way to start one and nowhere to record it. A feature this
 * conversation cannot have should be ABSENT, not empty — the same rule that
 * drops documents when the host is mounted without their provider.
 *
 * `mentions` is never included: mentions span every conversation, so a
 * per-channel tab for them claims a scope it does not have. They belong on a
 * shelf beside the conversation list.
 */
export declare type ConversationFeaturesForOptions = {
    /** The conversation's channel id. Null before one is open. */
    channel?: string | null;
    /** False when the host ships without a documents provider. */
    hasDocuments?: boolean;
    /** Defaults to everything the surface knows how to render. */
    from?: readonly ConversationFeature[];
};

declare interface ConversationSurfaceProps {
    /** Channel name, or the people in a DM. */
    name: string;
    /** Sub-line under the name. */
    description?: string;
    online?: boolean;
    avatarUrl?: string;
    /**
     * Which views this deployment offers. Defaults to all of them.
     *
     * Hand in the INTERSECTION of what the product declares and what the server
     * provisions — a view whose backend is not wired renders an empty tab, which
     * reads as a broken feature rather than an absent one.
     */
    features?: readonly ConversationFeature[];
    /** The transcript and its composer. Owned by the caller. */
    children?: ReactNode;
    /**
     * Something live to look at while you talk — the call happening in this
     * conversation, a stream. Sits above the transcript on the Chat view and
     * scrolls with nothing; the transcript keeps its own scroll below.
     */
    canvas?: ReactNode;
    /**
     * The Members view: the host's `MembersPanel`, wired to its membership
     * API. Absent, the tab shows nothing — pass it whenever 'members' is on.
     */
    members?: ReactNode;
    /** The Members tab's badge. */
    memberCount?: number;
    files?: readonly ChannelFileItem[];
    /** Resolves a displayable image source; the download route is authenticated. */
    thumbnailSrc?: (a: ChatAttachment) => string | null | undefined;
    documents?: readonly ChannelDocumentItem[];
    onOpenDocument?: (documentId: string) => void;
    /**
     * Rename this conversation from its own title — double-click it and the
     * heading becomes a field. Forwarded to ChannelHeader; see its prop docs.
     * Omit for a viewer who may not.
     */
    onRename?: (next: string) => void;
    /** Omit for a viewer who may not create documents here. */
    onCreateDocument?: () => void;
    /**
     * Start a whiteboard instead of a document. Same permission, different
     * shape: a document opens beside the conversation, a whiteboard takes the
     * whole window — you are not typing in chat while drawing with somebody.
     * Omit to offer documents only.
     */
    onCreateWhiteboard?: () => void;
    pins?: readonly PinnedMessageItem[];
    onUnpin?: (messageId: string) => void;
    mentions?: readonly ChannelMentionItem[];
    onOpenMention?: (channel: string, messageId: string) => void;
    recordings?: readonly ChannelRecordingItem[];
    onOpenRecording?: (recordingId: string) => void;
    /** Scrolls the transcript to a message. Used by pins, files and mentions. */
    onJumpToMessage?: (messageId: string) => void;
    /**
     * Start (or join) a call with the people in this conversation. Omit and no
     * call controls render — which is how a chat-only deployment looks.
     */
    onStartCall?: (audioOnly: boolean) => void;
    /**
     * Watch instead of joining.
     *
     * A conversation that many more people watch than speak in — an all-hands,
     * a demo — should not make every viewer open a peer connection. Joining is
     * realtime and costs one connection per head; watching is near-realtime HLS
     * and a CDN carries it to any audience. Offering both is the difference
     * between a room that seats twelve and one that seats a thousand.
     *
     * Omit when the conversation cannot be watched, rather than rendering a
     * disabled control.
     */
    onWatch?: () => void;
    /**
     * What the watch control SAYS. Default "Watch".
     *
     * It used to say nothing: a bare 👁 whose entire explanation lived in a
     * `title`. A tooltip is not a label — it never appears on a touch device,
     * plenty of screen readers do not announce it, and an eye glyph is ambiguous
     * even to someone who does hover it ("preview"? "visibility"? "seen by"?).
     * The word is now on the button; this prop is for a product that calls it
     * something else — "Watch live", "Join as audience", "View the stream".
     */
    watchLabel?: string;
    /**
     * The longer version, for the tooltip and the accessible description: what
     * is on the other side of the control. Defaults to the joining-vs-watching
     * distinction, which is the thing a first-time viewer cannot guess.
     */
    watchHint?: string;
    /**
     * How many people are already watching, when that is KNOWN.
     *
     * `null`/omitted and `0` are different claims and this keeps them apart:
     * omitted renders no number (nobody measured), a numeric 0 renders "0"
     * (somebody counted and the answer was nobody). Never pass 0 to stand in
     * for "not measured" — upstream `getViewerCount` returns `null` for that,
     * and a channel that has never been measured must not claim an audience.
     */
    watchViewerCount?: number | null;
    /** Someone here is already on a call, so the controls say Join. */
    callInProgress?: boolean;
    /**
     * This conversation's call mode is not the clicker's to choose.
     *
     * A room decides whether it is an audio room or a video room, and entering
     * one does not get to redefine it — so the host ignores the `audioOnly`
     * argument entirely. Two buttons then do exactly the same thing, and the
     * one labelled "Audio call" starts a video call: a control that lies about
     * what it does. Set this and a single control renders instead.
     */
    callModeFixed?: boolean;
    /** Extra header controls, to the right of the call buttons. */
    headerActions?: ReactNode;
    /** Optional host gutter adjustment; identity, tabs and actions remain native. */
    headerClassName?: string;
    /** Controlled view. Omit to let the surface keep its own. */
    view?: ConversationFeature;
    onViewChange?: (view: ConversationFeature) => void;
    className?: string;
    'data-testid'?: string;
}

/** Bind the host to the installed realtime-modules call hooks. Call once, at module scope. */
export declare function createCallBlockHost<M extends CallBlockModules>(rm: M): {
    CallHostProvider: ({ scopeKey, videoUrl, children, ...rest }: CallHostProviderProps) => JSX.Element;
    CallMediaOutlet: ({ id, onOpenPeople, onOpenDocument, overlay, dockTestId }: CallMediaOutletProps) => JSX.Element | null;
    CallBlock: ({ placement, compact, documents, className }: CallBlockProps) => JSX.Element;
    PreJoinDialog: ({ kind, title, selfName, selfAvatarUrl, initial, onJoin, onCancel }: {
        kind: PreJoinKind;
        title: string;
        selfName: string;
        selfAvatarUrl?: string;
        initial: PreJoinChoice;
        onJoin(choice: PreJoinChoice, devices: {
            microphoneId?: string;
            cameraId?: string;
            speakerId?: string;
        }): void;
        onCancel(): void;
    }) => JSX.Element;
    ConversationCallDock: ConversationCallDockComponent;
    useCallHost: () => CallHostValue<ReturnType<M["useConversationCall"]>> | null;
    useCallBlock: (conversations: string | null | readonly (string | null | undefined)[], options?: UseCallBlockOptions) => CallBlockView;
    useCallLobby: (lobby: CallLobby | null, start?: () => void) => {
        here: boolean;
        live: boolean;
    };
    useCallMediaPanel: () => CallMediaPanelState | null;
    useCallBlockPlacement: () => CallBlockPlacement;
    useCallBlockPageClaimed: () => boolean;
    useClaimCallBlock: (target: HTMLElement | null, placement: CallBlockClaimPlacement, enabled?: boolean, options?: {
        compact?: boolean;
        documents?: readonly CallBlockDocument[];
    }) => boolean;
};

/** Bind the pane to the app's realtime-modules functions. Call once at module scope. */
export declare function createCanvasDocumentPane(rm: CanvasDocumentPaneModules): CanvasDocumentPaneComponent;

/** `createCanvasExtensions` from `@…/realtime-modules/adapters/tiptap`, injected. */
export declare type CreateCanvasExtensions = (parts: CanvasDocumentExtensionParts) => AnyExtension[];

/** Bind ConversationCallDock to injected realtime-modules functions. Call once, at module scope. */
export declare function createConversationCallDock(rm: ConversationCallDockModules): ConversationCallDockComponent;

/**
 * Bind conversationFeaturesFor to an injected `lobbyForChannel` (the rule for
 * "does this channel have a call lobby" lives in realtime-modules' `/call`).
 */
export declare function createConversationFeaturesFor(rm: ConversationFeaturesForModules): ConversationFeaturesFor;

/**
 * Bind HangoutRoomRow to an injected `useRoomOccupancy`. The canonical binding
 * lives in `integrations/realtime-modules/HangoutRoomRow`.
 */
export declare function createHangoutRoomRow(rm: HangoutRoomRowModules): HangoutRoomRowComponent;

/**
 * Bind HangoutRoomsSection to a HangoutRoomRow (which carries the injected
 * `useRoomOccupancy`). See `createRealtimeIntegrations`.
 */
export declare function createHangoutRoomsSection(HangoutRoomRow: HangoutRoomRowComponent): HangoutRoomsSectionComponent;

/**
 * Bind RealtimeCapabilityProvider to an injected `useCapabilities`. Every
 * binding writes the SAME context, so `CapabilityGate` / `useRealtimeCapabilities`
 * from either entry read whichever provider is above them.
 */
export declare function createRealtimeCapabilityProvider(rm: RealtimeCapabilityProviderModules): RealtimeCapabilityProviderComponent;

/**
 * Bind the hook-bound integrations to `rm`. Props and test ids are identical to
 * the same-named exports of `integrations/realtime-modules` (which is exactly
 * this, applied to the canonical `@connorhoehn/realtime-modules` imports).
 *
 * Hooks are read from `rm` at render time, not captured here.
 */
export declare function createRealtimeIntegrations(rm: RealtimeClientModules): RealtimeIntegrations;

/** Bind WrappedHangoutRoomsList to a HangoutRoomsSection. See `createRealtimeIntegrations`. */
export declare function createWrappedHangoutRoomsList(HangoutRoomsSection: HangoutRoomsSectionComponent): WrappedHangoutRoomsListComponent;

/** Bind WrappedLVSHangoutLayout to an injected `useLVSHangout`. See `createRealtimeIntegrations`. */
export declare function createWrappedLVSHangoutLayout(rm: WrappedLVSHangoutLayoutModules): WrappedLVSHangoutLayoutComponent;

/** Bind WrappedStreamStage to injected LVS hooks. See `createRealtimeIntegrations`. */
export declare function createWrappedStreamStage(rm: WrappedStreamStageModules): WrappedStreamStageComponent;

declare type CursorCoordinates = 'pixels' | 'fraction';

export declare function decodeCanvasRecovery(value: unknown): Uint8Array | null;

/**
 * Chat and presence only.
 *
 * The default for a host that declares nothing, chosen deliberately: the
 * conservative set is the one that cannot surprise anyone with a camera, a
 * microphone, or a stored recording. Opting IN to those is a decision a host
 * should have to write down.
 */
export declare const DEFAULT_REALTIME_CAPABILITIES: RealtimeCapabilitySet;

/** Default room names: "Room 1"…"Room n". */
export declare function defaultRoomDrafts(count: number): {
    name: string;
}[];

declare interface DeviceOption {
    deviceId: string;
    label: string;
}

declare interface DocumentActivityEditor {
    userId: string;
    displayName?: string;
    avatarUrl?: string;
}

/** Structural injection keeps the UI package independent of the runtime package. */
export declare type DocumentFileUploadHook = (channel: string, options: {
    displayName: string;
    previewMaxEdge: number;
    onComplete: (completion: DocumentUploadCompletion) => void;
}) => {
    upload: (file: File) => Promise<{
        status: string;
        error?: string;
        transferId?: string;
    }>;
};

/** Fetch bytes using the current viewer's identity; credentials never enter the document. */
declare type DocumentImageLoader = (src: string, signal: AbortSignal) => Promise<Blob>;

export declare interface DocumentImageUpload {
    uploadImage: (file: File) => Promise<string>;
    uploadFile: (file: File) => Promise<UploadedDocumentFile>;
    accepts: (file: File) => boolean;
}

/** Only a durable backend receipt may select `saved`. Connection/sync is insufficient. */
declare interface DocumentSaveState {
    status: 'pending' | 'saved' | 'error' | 'offline';
    detail?: string;
    onRetry?: () => void;
}

declare function DocumentToolbar({ editor, actions, commentCount, suggestionCount, gutterVisible, onToggleGutter, onInsertImage, density, size: sizeProp, extras, zoomControl, 'data-testid': testId, }: DocumentToolbarProps): JSX.Element | null;

declare interface DocumentToolbarProps {
    editor: Editor | null;
    /** Rendered at the end of the bar — insert-macro menus, share, etc. */
    actions?: ReactNode;
    /**
     * How many comment threads the margin gutter holds.
     *
     * A first-class prop rather than something the page shoves into `actions`,
     * because `actions` is the HOST's slot: whatever the app passes (presence,
     * share) lands there, and merging a library-owned control into it means the
     * toolbar can no longer decide where its own control sits, nor keep a host
     * that fills the slot from displacing it.
     */
    commentCount?: number;
    /**
     * How many PROPOSED EDITS sit in the same margin, which is a different
     * thing and has to be counted separately.
     *
     * The gutter holds both, and the toggle used to be handed the total under
     * the name `commentCount` — so a document whose margin held one suggestion
     * and no discussion at all read "Comments 1", and the reader went looking
     * for a thread that did not exist. The count was never the wrong part; the
     * noun was. Splitting the two inputs is what lets the control pick a noun
     * that is true of what it is actually hiding.
     */
    suggestionCount?: number;
    /** Whether the gutter is currently showing. Drives `aria-pressed`. */
    gutterVisible?: boolean;
    /**
     * Toggles the gutter. Its absence — or an empty margin — means no control at
     * all: a toggle for a gutter with nothing in it is a button that does
     * nothing visible, which reads as broken rather than as empty.
     */
    onToggleGutter?: () => void;
    /**
     * Asks the host to put a picture on the page.
     *
     * The toolbar deliberately does not own the file picker. Getting bytes into
     * a document means an upload, and where those bytes go — which channel,
     * which storage, which auth — is knowledge only the app has. What the
     * library owns is the button, its place in the bar (beside the other insert
     * controls, where a word processor puts it) and the fact that it appears at
     * all only when the schema can hold an image: `setImage` absent means the
     * editor was built without the extension, and a button that inserts a node
     * the schema will reject is worse than no button.
     */
    onInsertImage?: () => void;
    /**
     * `compact` is the toolbar for a document shown INSIDE something else — a
     * chat's side pane, a card. Undo/redo, the inline marks, lists and link;
     * no typefaces, colours, alignment, tables or images. Those still exist
     * (the full page has them), they are just not what a reading pane is for.
     */
    density?: 'full' | 'compact';
    /**
     * How much of the bar fits on ONE row. `auto` (the default) measures the
     * bar's own box and picks `wide` / `medium` / `narrow` — see
     * `DOCUMENT_TOOLBAR_BREAKPOINTS`. A fixed value is for tests and stories.
     *
     * The bar never wraps. It used to (`flex-wrap`), and at a 1280px window the
     * page editor's toolbar took THREE rows — B and I on the first, the rest on
     * the second, and the host's Comment button alone on a third — leaving
     * about 200px of paper. A toolbar is one line of controls in every word
     * processor; what does not fit goes behind ⋯, the way Docs and Word do it.
     */
    size?: DocumentToolbarSize | 'auto';
    /**
     * The page's zoom, passed when the page has no status bar to carry it
     * (`CanvasDocumentView showStatusBar={false}`). The ⋯ overflow offers it as
     * a Zoom group — 100%, the other `steps`, and Fit width when `onFitWidth`
     * is present. Absent, no zoom item renders.
     */
    zoomControl?: DocumentZoomControl;
    /**
     * Where the occasional controls live (since 2.386.5). `inline` (default) is
     * the classic bar: alignment, spacing, indent, rule, table and clear
     * formatting sit on the row until the width folds them. `overflow` is the
     * word-processor row a page editor draws — undo · styles · marks · link and
     * image · lists (with style menus) · colour · highlight · ⋯ — and those
     * occasional controls always live behind ⋯.
     */
    extras?: 'inline' | 'overflow';
    'data-testid'?: string;
}

/** One-row layouts, widest first. */
declare type DocumentToolbarSize = 'wide' | 'medium' | 'narrow';

/** Why a referenced document cannot be opened. */
declare type DocumentUnavailableReason = 'gone' | 'forbidden';

export declare interface DocumentUploadCompletion {
    mine: boolean;
    transferId: string;
    downloadUrl?: string;
}

/**
 * The page's zoom, handed to whatever surface offers it when the status bar is
 * off — the toolbar's ⋯ overflow on the documents page. The page still OWNS
 * the value (remembered per reader, fit width resolved against the rails); a
 * control only reads it and asks for a change.
 */
declare interface DocumentZoomControl {
    /** The scale in force, fit width included — 1 is 100%. */
    zoom: number;
    /** True while the sheet tracks the workspace width rather than a fixed scale. */
    fitActive: boolean;
    /** The presets worth offering — `ZOOM_STEPS`. */
    steps: readonly number[];
    onZoomChange: (zoom: number) => void;
    /** Absent when the host cannot fit — then offer no Fit option. */
    onFitWidth?: () => void;
}

declare interface DropdownMenuItem {
    /** Visible item label. */
    label: string;
    /** Optional leading icon / glyph. */
    icon?: ReactNode;
    /** Highlight this item as the currently-active selection. */
    active?: boolean;
    /** Style this item as destructive. */
    danger?: boolean;
    /** Fires on click / Enter; the menu closes afterwards. Not needed on a row with a `submenu`. */
    onSelect?: () => void;
    /** Right-aligned hint after the label — a shortcut (`⌘P`), a count. */
    trailing?: ReactNode;
    /** A second, quieter line under the label. */
    description?: string;
    /** A setting that is on: a check leads the row (menuitemcheckbox). */
    checked?: boolean;
    /**
     * A flyout of further choices, opened from this row — "Share to ›",
     * "Download as ›". Opens on hover, click or ArrowRight; the row itself
     * runs no `onSelect`.
     */
    submenu?: DropdownMenuSection[];
    /**
     * Shown but not actionable: muted, `aria-disabled="true"` yet still
     * focusable (WAI-ARIA menu practice, so a screen reader can reach it and
     * hear why), and click / Enter / Space never run `onSelect` — the menu
     * stays open. A disabled row with a `submenu` does not open it. Since 2.390.3.
     */
    disabled?: boolean;
    /**
     * Why it is disabled — shown as the row's secondary line (in place of
     * `description`), its hover tooltip, and its `aria-describedby`.
     * Since 2.390.3; the visible line since 2.390.4.
     */
    disabledReason?: string;
    /** A hook for the spec that addresses this row. Without one the row is reachable by its label. */
    'data-testid'?: string;
}

declare interface DropdownMenuSection {
    /** Optional uppercase section heading. */
    label?: string;
    items: DropdownMenuItem[];
    /**
     * The group scrolls in place (`uic-menu-group-scroll`) so the sections
     * after it stay put. For a generated list — one row per room — that would
     * otherwise push the fixed actions below the fold.
     */
    scroll?: boolean;
    /**
     * A quiet line under the group's rows — what the group does as a whole
     * ("Creates a new document."). Since 2.390.3.
     */
    caption?: string;
    'data-testid'?: string;
}

export declare function encodeCanvasRecovery(bytes: Uint8Array): CanvasRecovery;

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
    /**
     * The server-minted id, once there is one. Every channel-wide frame is
     * keyed by this rather than by the client's `id`, so a caller reconciling
     * its own upload against what the channel reports needs it carried.
     */
    transferId?: string;
    /** Byte length, so a summary can render a size without re-reading the file. */
    size?: number;
}

declare interface FloatingCardProps {
    children: ReactNode;
    /** Which corner of the viewport it sits in. Default bottom-right. */
    corner?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** Width in px. Default 160. */
    width?: number;
    /** Height cap in px; the card scrolls past it. Default 280. */
    maxHeight?: number;
    className?: string;
    'data-testid'?: string;
}

export declare type GatedConversationFeature = Exclude<ConversationFeature, UngatedConversationFeature>;

/** A thread plus where it wants to sit, in pixels from the page top. */
declare interface GutterItem {
    id: string;
    /** Desired vertical offset. Ties and near-ties are resolved by stacking. */
    top: number;
    /** True when the anchor is inside the current selection or hovered. */
    active?: boolean;
    /** Rendered inside the card — usually a CommentThread. */
    content: ReactNode;
    /**
     * Defaults to `'comment'` — every caller that predates this field was
     * passing comment threads, so the unlabelled case keeps saying exactly what
     * it says today rather than degrading a true noun into a hedge. The cost is
     * that a NEW producer which forgets to label itself is counted as
     * discussion; labelling every producer is therefore part of adding one.
     */
    kind?: GutterItemKind;
}

/**
 * What kind of annotation a card holds.
 *
 * This component does not read it — stacking is the same arithmetic whatever
 * the card contains. It exists because the CONTROL that hides this column has
 * to name what it is hiding, and only the host knows: `content` is an opaque
 * ReactNode, so counting cards is the most the library can do on its own, and
 * counting is how a margin holding one proposed edit and no discussion came to
 * announce itself as "Comments 1".
 */
declare type GutterItemKind = 'comment' | 'suggestion';

declare interface HangoutLayoutParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isLocal?: boolean;
    /** Raised hand: `true`, or the 1-based queue position. Since 2.458.0. */
    handRaised?: boolean | number;
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

export declare type HangoutRoomRowComponent = (props: HangoutRoomRowProps) => React.JSX.Element;

/** The realtime-modules functions HangoutRoomRow calls. */
export declare type HangoutRoomRowModules = Pick<RealtimeClientModules, 'useRoomOccupancy'>;

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
    /**
     * Open the room's CONVERSATION rather than joining its call.
     *
     * A room is not only a call. Things are said in it, files are dropped in
     * it, documents get written in it — and until this existed the only way
     * into a room was to join the video, so everything that came out of it was
     * unreachable unless somebody was in there right now.
     *
     * Secondary by design: the row's own click still joins, because that is
     * what a hangout row is for. Omit to render no such control.
     */
    onOpenConversation?: () => void;
    /** Optional kebab node passed through to the row. */
    kebab?: React.ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare type HangoutRoomsSectionComponent = (props: HangoutRoomsSectionProps) => React.JSX.Element;

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
    /**
     * Open a room's conversation instead of joining its call. Omit and rooms
     * stay call-only, which is what they were before this existed.
     */
    onOpenConversation?: (room: RMRoom) => void;
    /** Called when "Browse all" is clicked (when rooms exceed `maxVisible`). */
    onBrowseAll?: () => void;
    /** Max rows to render inline. Defaults to 10. */
    maxVisible?: number;
    /** Section title override. Defaults to "Rooms". */
    title?: string;
    /** Section storageKey override (collapse persistence). */
    storageKey?: string;
    /**
     * Rail header (2.432.0). With `onToggleCollapse` the section is headed by
     * the rail's `RailSectionHeader` (caret, label, count, +) at the rail's one
     * inset, and folds under the host's control; without it the classic
     * `SidebarSection` header and its own localStorage memory stay.
     */
    collapsed?: boolean;
    onToggleCollapse?: (next: boolean) => void;
    /** Custom create renderer — when omitted the built-in dialog is used. */
    renderCreateDialog?: (props: {
        open: boolean;
        onClose: () => void;
    }) => React.ReactNode;
}

export declare function incomingCallTitle(ring: RMIncomingConversationCall): string;

export declare function IncomingCallToast({ ring, onAccept, onDecline, corner, width, className, 'data-testid': testId, }: IncomingCallToastProps): JSX.Element;

export declare interface IncomingCallToastProps {
    /** One of `useIncomingConversationCalls().rings` (the head of the queue). */
    ring: RMIncomingConversationCall;
    onAccept: () => void;
    onDecline: () => void;
    /** Viewport corner. Default top-right. */
    corner?: FloatingCardProps['corner'];
    /** Card width in px. Default 360. */
    width?: number;
    className?: string;
    /** Default `incoming-call-toast`; the answers are `incoming-call-accept` / `incoming-call-decline`. */
    'data-testid'?: string;
}

declare type InlinePopoverPlacement = 'bottom-start' | 'bottom-end' | 'right';

/** Where a loop is. Mirrors the run status platform-api reports. */
declare type LabStatus = 'planning' | 'starting' | 'running' | 'waiting' | 'done' | 'failed' | 'stopped' | 'budget';

declare interface LabStep {
    id: string;
    title: string;
    kind: string;
    status: 'pending' | 'running' | 'done' | 'failed' | 'skipped';
    iterations?: number;
    contextTokens?: number;
}

/**
 * A message that exists only in THIS viewer's thread — never sent, never
 * stored, gone on reload. The shape a `visibility: 'private'` command outcome
 * takes while its owner decides whether to post it: the card shows the run
 * moving (its `metadata` goes through the same `agent-run` reader as a real
 * message, so `agentRunStatus`, Open and Approve all work), a subdued note
 * says nobody else can see it, and `actions` are what the owner can do about
 * that — post it, dismiss it.
 */
declare interface LocalChatMessage {
    id: string;
    /** ISO. Decides where in the thread the message sits. */
    timestamp: string;
    displayName: string;
    /** Plain text. Drawn as the body unless `body` is set; keep it meaningful (a summary) either way. */
    content: string;
    /**
     * A host-rendered body in place of `content`: a React node, or a function
     * called on each render (so it can close over live state). Lets an
     * unpersisted private card carry markdown, a diagram, a document preview.
     * Since 2.413.0.
     */
    body?: ReactNode | (() => ReactNode);
    metadata: Record<string, unknown>;
    actions?: Array<{
        id: string;
        label: string;
        onSelect: () => void;
        primary?: boolean;
    }>;
    /** Replaces the default "Only you can see this". */
    note?: string;
}

export declare const MAX_ATTACHMENT_BYTES: number;

export declare const MAX_IMAGE_BYTES: number;

declare interface MediaEffectsBackgroundOption {
    id: string;
    label: string;
    /** Thumbnail + replacement image URL, rendered as the chip's preview. */
    url: string;
}

/**
 * How many of the four settings the open preview session changes — the
 * "2 changes" in the call-settings Effects footer. 0 outside a session.
 */
export declare function mediaEffectsChangeCount(controller: RMMediaEffectsPreviewControllerSource): number;

declare interface MediaEffectsFilterOption {
    id: string;
    label: string;
    /**
     * The CSS filter the effect applies (RM presets carry it as `cssFilter`).
     * The grid layout paints each filter thumbnail with it.
     */
    cssFilter?: string;
    /** Glyph for a face-effect button in the grid layout. */
    icon?: ReactNode;
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
    /**
     * `chrome` (default): the dark call-chrome panel with its private-preview
     * notice and pinned Apply/Cancel footer. `surface`: the call-settings
     * Effects tab — page-themed, a "Preview · Only you" chip on the preview, a
     * one-line hint, and the tray in its grid layout. Pair `surface` with
     * `showFooter={false}` when the host (CallSettingsDrawer) owns the footer.
     */
    variant?: 'chrome' | 'surface';
    /** Render the Apply/Cancel footer. Default true. */
    showFooter?: boolean;
    /** Surface: the line under the preview. Default "Changes appear in the call after Apply." */
    hint?: ReactNode;
    /** Surface: grid thumbnails fall back to this still when there is no preview stream. */
    thumbnailSrc?: string;
    /** Surface: "+ Custom" background tile. See MediaEffectsTray. */
    onSelectCustomBackground?: (file: File) => void;
    /** Surface: the background section says it cannot run here. */
    backgroundsUnsupported?: boolean;
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
    /**
     * `strip` (default): pill chips on the dark call chrome, for a popover or
     * the pre-join room. `grid`: the call-settings Effects tab — thumbnail
     * tiles in `columns` columns under "Filter · Reset", "Background" and "Face
     * effects" headings, painted in the page theme (light or dark).
     */
    layout?: 'strip' | 'grid';
    /** Grid columns. Default 3. */
    columns?: number;
    /** Grid: a live frame for the thumbnails (the preview stream), filtered per tile. */
    thumbnailStream?: MediaStream | null;
    /** Grid: a still frame for the thumbnails when there is no stream. */
    thumbnailSrc?: string;
    /** Grid: filter tiles before "More..." folds the rest. Default 5. */
    filterLimit?: number;
    /** Grid: when set, a dashed "+ Custom" tile opens a file picker (images ≤ 5 MB). */
    onSelectCustomBackground?: (file: File) => void;
    /** Grid: background replacement cannot run here (no WebGL / segmenter failed). */
    backgroundsUnsupported?: boolean;
    className?: string;
    'data-testid'?: string;
}

/** Browser media permission for one kind of device. */
declare type MediaPermission = 'prompt' | 'granted' | 'denied' | 'unavailable';

/** userId → 1-based hand position. Feed `handRaised` on tiles and roster rows. */
export declare function meetingHandPositions(hands: readonly RMRaisedHand[]): Map<string, number>;

/**
 * The People pane's hands queue: spread onto `RosterPanel`. Each participant
 * (keyed by the meeting's userId) gets its queue position, raised hands sort
 * to the top, and an organizer gets Lower and Lower all hands.
 *
 *   <RosterPanel {...meetingRosterProps(meeting, roster)} />
 */
export declare function meetingRosterProps(meeting: Pick<RMMeetingSource, 'hands' | 'isOrganizer' | 'lowerHand' | 'lowerAllHands'>, participants: readonly RosterParticipant[]): Pick<RosterPanelProps, 'participants' | 'raisedHandsFirst' | 'onLowerHand' | 'onLowerAllHands'>;

declare interface MeetingToolbarItem {
    /** Stable id; the button's testid is `meeting-toolbar-<id>`. */
    id: string;
    /** Text under the icon, and the accessible name. */
    label: string;
    icon: ReactNode;
    onClick?: () => void;
    /** The pane this button opens is open (underlined, `aria-expanded`). */
    active?: boolean;
    /** A toggle that is on (hand raised): filled, `aria-pressed`. */
    pressed?: boolean;
    /** A number shown beside the icon — the People count. */
    count?: number;
    /** An unread/attention badge on the icon — new chat messages. */
    badge?: number;
    disabled?: boolean;
    /** Why it is disabled; becomes the tooltip. */
    disabledReason?: string;
    /** `off` (camera/mic off) dims nothing but marks state for tests; `danger` reds the button. */
    tone?: 'default' | 'off' | 'danger';
    /** A split chevron with this menu (Camera ▾ devices). */
    menu?: DropdownMenuSection[];
    /** Accessible name of the chevron. Default `"<label> options"`. */
    menuLabel?: string;
    /** `secondary` folds into More when the bar is compact. Default `primary`. */
    priority?: 'primary' | 'secondary';
    /** Tooltip; defaults to the label. */
    title?: string;
}

/** Raise and Rooms toolbar buttons bound to the meeting. */
export declare function meetingToolbarItems(meeting: RMMeetingSource, opts: {
    roomsOpen: boolean;
    onToggleRooms: () => void;
}): {
    raise: MeetingToolbarItem;
    rooms: MeetingToolbarItem;
};

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

declare interface NotificationBellProps {
    /** The feed, in `NotificationCenter`'s shape. */
    items: NotificationItem[];
    /** Unread count on the badge and in the name. Default: items whose `read` is not `true`. */
    unreadCount?: number;
    /** A row was activated. The popover closes after the call. */
    onItemClick?: (item: NotificationItem) => void;
    onMarkAllRead?: () => void;
    onClearAll?: () => void;
    /** Accessible name of the button and the popover. Default "Activity". */
    label?: string;
    /** Where the popover opens. Default `bottom-end` (a bell at a header's right edge). */
    placement?: InlinePopoverPlacement;
    /**
     * A link pinned under the feed to the app's full activity view ("See all
     * activity"). The popover closes before `onSelect` runs. Since 2.446.1.
     */
    seeAll?: {
        label?: string;
        onSelect: () => void;
    };
    /** `sm` = 28px, the header-control family; `md` = 32px. Default `md`. */
    size?: NotificationBellSize;
    className?: string;
    /** Root test id (default `notification-bell`); parts: `-button`, `-badge`, `-popover`, `-center`, `-empty`. */
    'data-testid'?: string;
}

declare type NotificationBellSize = 'sm' | 'md';

declare interface NotificationCenterProps {
    items: NotificationItem[];
    onItemClick?: (item: NotificationItem) => void;
    onMarkAllRead?: () => void;
    onClearAll?: () => void;
    /**
     * Pinned under the feed, outside its scroll region — e.g. a "See all
     * activity" link. Since 2.446.1. The header (title, Mark all read, tabs) is
     * likewise outside the scroll region, so in a height-capped host both stay
     * in view while only the feed scrolls.
     */
    footer?: ReactNode;
    /** Test id of the empty state. Default `empty-state`. Since 2.448.0. */
    emptyTestId?: string;
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

export declare type OnCallHostEvent = (kind: CallHostEventKind, event: CallHostEvent, ctx: {
    host: string | null;
    selfId: string;
}) => void;

/**
 * A page's huddle: walk into the huddle that is on (discovered while idle),
 * else open one with nobody rung. What a page's bound start does by default.
 */
export declare function pageHuddleStart(call: {
    phase: string;
    call: unknown;
    rejoin(): unknown;
    start(targets: {
        userId: string;
        displayName: string;
    }[]): unknown;
}): 'rejoin' | 'start' | null;

declare interface PinnedMessageItem {
    messageId: string;
    /** Who wrote the message. */
    author: string;
    /** Short excerpt of it — the panel never re-reads the transcript. */
    preview: string;
    /** ISO-8601: when it was PINNED. The byline's business, not the stamp's. */
    pinnedAt?: string;
    /**
     * ISO-8601: when the message was SENT.
     *
     * What the stamp shows, because a pinned entry is a handle on a message and
     * the reader's next move is to find it in the transcript — where it is
     * stamped with this. Showing the pin time instead made one message read as
     * two different messages depending on which panel you were in.
     *
     * Optional: pins written before the store denormalised it have none, and
     * those fall back to `pinnedAt` rather than losing their stamp.
     */
    sentAt?: string;
    /** Display name of whoever pinned it. */
    pinnedBy?: string;
}

/** What this person last chose for how they enter a call. Device ids live in the call's own device preferences. */
export declare interface PreJoinChoice {
    micOn: boolean;
    cameraOn: boolean;
    remember: boolean;
}

export declare type PreJoinKind = 'start' | 'join' | 'accept' | 'check';

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
    /** One status line for the hover card — "editing", "away · 3m". Free text
     *  because the library does not know the host's vocabulary. */
    detail?: string;
    /** Where in the surface the user is — a section title, a pane name.
     *  Rendered under the detail line on the hover card. */
    location?: string;
}

declare interface QuotedMessage {
    messageId: string;
    author: string;
    /** ISO timestamp of the quoted message. */
    timestamp?: string;
    /** Plain text of the original. Trimmed for display; the full text is not needed. */
    text: string;
}

export declare type RealtimeCapabilityName = keyof RealtimeCapabilitySet;

export declare type RealtimeCapabilityProviderComponent = (props: RealtimeCapabilityProviderProps) => React.JSX.Element;

/** The realtime-modules functions RealtimeCapabilityProvider calls. */
export declare type RealtimeCapabilityProviderModules = Pick<RealtimeClientModules, 'useCapabilities'>;

export declare interface RealtimeCapabilityProviderProps {
    /**
     * What this host wants. Omitted keys are OFF — an allow-list, so adding a
     * capability to this library never switches something on inside an app that
     * never asked for it.
     */
    capabilities?: RealtimeCapabilitySet;
    /** Scope the grant lookup to one channel. */
    channel?: string;
    children: ReactNode;
}

/**
 * The capabilities a conversation surface can be composed from.
 *
 * Each is a distinct product decision, not a UI detail:
 *   chat       — send and read messages
 *   presence   — who is here / typing
 *   video      — start or join a video room from a conversation
 *   audio      — audio-only call, independently of video: a host may want
 *                voice without ever putting a camera in the product
 *   files      — attachments and drag-drop upload
 *   reactions  — emoji on messages
 *   recordings — past-call playback and transcripts
 */
export declare interface RealtimeCapabilitySet {
    chat?: boolean;
    presence?: boolean;
    video?: boolean;
    audio?: boolean;
    files?: boolean;
    reactions?: boolean;
    recordings?: boolean;
}

/**
 * Exactly the realtime-modules functions the hook-bound integrations call.
 * Spread the namespaces you installed — see `createRealtimeIntegrations`.
 */
export declare interface RealtimeClientModules {
    /** `/client` — RealtimeCapabilityProvider. */
    useCapabilities: typeof RMClient.useCapabilities;
    /** `/client/hangout-rooms` — HangoutRoomRow (and so HangoutRoomsSection, WrappedHangoutRoomsList). */
    useRoomOccupancy: typeof RMHangoutRooms.useRoomOccupancy;
    /** `/client/video` — WrappedLVSHangoutLayout. */
    useLVSHangout: typeof RMVideo.useLVSHangout;
    /** `/client/video` — WrappedStreamStage, realtime (WHEP) leg. */
    useLVSSubscriber: typeof RMVideo.useLVSSubscriber;
    /** `/client/video` — WrappedStreamStage, near-realtime (HLS) leg. */
    useLVSLiveHls: typeof RMVideo.useLVSLiveHls;
    /** `/client/video` — WrappedStreamStage, both legs. */
    useLVSViewerCount: typeof RMVideo.useLVSViewerCount;
    /** `/call` — conversationFeaturesFor (does this channel have a call lobby?). */
    lobbyForChannel: typeof RMCall.lobbyForChannel;
}

/** Every integration that calls a realtime-modules function, bound to one bag. */
export declare interface RealtimeIntegrations {
    HangoutRoomRow: HangoutRoomRowComponent;
    HangoutRoomsSection: HangoutRoomsSectionComponent;
    WrappedHangoutRoomsList: WrappedHangoutRoomsListComponent;
    RealtimeCapabilityProvider: RealtimeCapabilityProviderComponent;
    conversationFeaturesFor: ConversationFeaturesFor;
    WrappedStreamStage: WrappedStreamStageComponent;
    WrappedLVSHangoutLayout: WrappedLVSHangoutLayoutComponent;
}

/** Bind the integrations once for a subtree; read them with `useRealtimeIntegrations()`. */
export declare function RealtimeIntegrationsProvider({ modules, children }: RealtimeIntegrationsProviderProps): JSX.Element;

export declare interface RealtimeIntegrationsProviderProps {
    /**
     * The realtime-modules functions to bind. Pass a stable object (module
     * scope or memoised) — a new object each render re-binds and remounts.
     */
    modules: RealtimeClientModules;
    children: ReactNode;
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

/**
 * What a recording card knows. The chat message stamps what was true when
 * it was posted (`recordingRefFromMetadata`); the host's `recordingStatus`
 * overlays what is true now — the stage, the thumbnail once composed, the
 * expiry — the way `agentRunStatus` does for run cards.
 */
declare interface RecordingCardStatus {
    stage?: RecordingStage;
    title?: string;
    recordedBy?: string;
    startedAt?: string;
    durationMs?: number;
    thumbnailUrl?: string;
    participants?: readonly RecordingParticipant[];
    participantCount?: number;
    transcriptReady?: boolean;
    summaryReady?: boolean;
    expiresAt?: string;
}

declare interface RecordingParticipant {
    id: string;
    name: string;
    avatarUrl?: string;
    color?: string;
}

/** Where the recording is on its way to being watchable. */
/** `gone`: the recording no longer exists — expired or removed — so the card is the record of a thing that was. */
declare type RecordingStage = 'saving' | 'transcribing' | 'summarizing' | 'ready' | 'failed' | 'gone';

export declare interface ResolvedCapabilities {
    /** declared ∩ provisioned — what may actually render. */
    can: Record<RealtimeCapabilityName, boolean>;
    /** What the host asked for. */
    declared: Record<RealtimeCapabilityName, boolean>;
    /** What the tenant is granted. */
    provisioned: Record<RealtimeCapabilityName, boolean>;
    /** True until the grant has been resolved once. */
    isLoading: boolean;
}

/** Mirror of realtime-modules/src/client/types.ts ActivityEvent */
export declare interface RMActivityEvent {
    eventType: string;
    detail: Record<string, unknown>;
    timestamp: string;
    userId: string | null;
    displayName: string;
}

/** Minimum shape of RM `useAudioVideoSettings()`. */
export declare interface RMAudioVideoSettingsSource {
    settings: AudioVideoSettings;
    update(patch: Partial<AudioVideoSettings>): void;
    previewStream: MediaStream | null;
    micLevel: number;
    testMic(): Promise<void>;
    testSound(): Promise<void>;
    testMicState: 'idle' | 'recording' | 'playing';
}

export declare type RMBackgroundMode = 'none' | 'blur' | 'image';

/** The slice of realtime-modules' `BreakoutState` these bindings read. */
export declare interface RMBreakoutState {
    phase: 'none' | 'draft' | 'open';
    mode: 'assigned' | 'self-select';
    rooms: {
        id: string;
        name: string;
        state: 'open' | 'closed';
        members: string[];
    }[];
    returned: string[];
    endsAt: string | null;
    announcement: {
        message: string;
        fromUserId: string;
        fromDisplayName: string;
        at: string;
    } | null;
    settings: {
        allowReturnToMain: boolean;
    };
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

/** The `enabled` map from realtime-modules' `useCapabilities`, restated. */
export declare type RMCapabilityMap = Record<string, boolean>;

/**
 * A transfer moving through the channel right now — possibly somebody else's.
 *
 * `uploads` is the viewer's own outbox; this is the shared truth. Mirrors
 * realtime-modules' ChannelTransfer.
 */
export declare interface RMChannelTransfer {
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

/** Mirror of realtime-modules/src/client/types.ts ChatMessage */
export declare interface RMChatMessage {
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
    /** Set by the gateway's `messageUpdated` frame. */
    editedAt?: string;
    /** Set by `messageDeleted`: a soft delete, the row stays as a placeholder. */
    deletedAt?: string;
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

/** Mirror of RM `ConversationCallParticipant`. */
export declare interface RMConversationCallParticipant {
    id: string;
    userId: string;
    displayName: string;
    avatarUrl?: string;
    isLocal: boolean;
    state: 'in-call' | 'reconnecting' | 'ringing' | 'declined' | 'busy';
    audioOn: boolean;
    cameraOn: boolean;
    screenSharing: boolean;
    participantId: string | null;
    stream: MediaStream | null;
    screenStream: MediaStream | null;
}

/** Mirror of RM `ConversationCallPhase`. */
export declare type RMConversationCallPhase = 'idle' | 'calling' | 'ringing' | 'connecting' | 'live' | 'reconnecting' | 'ended' | 'failed';

/**
 * The slice of RM `useConversationCall()`'s result the dock reads — pass the
 * hook's result as-is.
 */
export declare interface RMConversationCallSource {
    phase: RMConversationCallPhase;
    call: {
        participants: RMConversationCallParticipant[];
        participantCount: number;
    } | null;
    error: {
        message: string;
    } | null;
    /** Optional native device-capture feedback; never a fatal call error. */
    media?: {
        /** Present in the original native media result, including SDKs before capture feedback. */
        error?: string | null;
        captureError?: string | null;
    };
    callingTo: string | null;
    elapsedMs: number | null;
    activeSpeakerId: string | null;
    self: {
        audioOn: boolean;
        cameraOn: boolean;
        screenSharing: boolean;
    };
    devices: {
        prefs: RMDevicePreferences;
        set(next: RMDevicePreferences): void;
        list: {
            microphones: DeviceOption[];
            cameras: DeviceOption[];
            speakers: DeviceOption[];
            permission: {
                microphone: MediaPermission;
                camera: MediaPermission;
            };
        };
    };
    toggleMic(): void;
    toggleCamera(): void;
    toggleScreenShare(): void;
    leave(): void | Promise<void>;
    rejoin(): void | Promise<void>;
}

export declare interface RMCreateRoomInput {
    name: string;
    description?: string;
    visibility?: RMRoomVisibility;
    settings?: Partial<RMRoomSettings>;
}

/** Mirror of realtime-modules/src/client/types.ts CursorEntry */
export declare interface RMCursorEntry {
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

/** Mirror of RM `DevicePreferences`. */
export declare interface RMDevicePreferences {
    microphoneId?: string;
    cameraId?: string;
    speakerId?: string;
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

/** Mirror of RM `IncomingConversationCall` — one entry of `useIncomingConversationCalls().rings`. */
export declare interface RMIncomingConversationCall {
    callId: string;
    callerName: string;
    /** `knock` = someone outside a call you are in asks to be let in. */
    kind: 'invite' | 'knock';
    audioOnly: boolean;
}

export declare interface RMJoinRoomResult {
    room: RMRoom;
    sessionId: string;
    token: string;
    participantId: string;
}

/** Minimum shape of RM `useMediaDevices()`. */
export declare interface RMMediaDevicesSource {
    microphones: DeviceOption[];
    cameras: DeviceOption[];
    speakers: DeviceOption[];
    permission: {
        microphone: MediaPermission;
        camera: MediaPermission;
    };
    speakerSelectionSupported: boolean;
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
        cssFilter?: string;
    }>;
    backgrounds: Array<{
        id: string;
        label: string;
        url: string;
    }>;
    /** `icon` (RM ≥ 0.97.4): the sprite's emoji, separate from a plain label. */
    faceSprites: Array<{
        id: string;
        label: string;
        icon?: string;
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

/** A person in the meeting as the host knows them (the call roster). */
export declare interface RMMeetingPerson {
    userId: string;
    displayName: string;
    avatarUrl?: string;
}

/**
 * Structural `UseMeetingResult` (realtime-modules 0.121.0). Members added
 * later are optional, so an older pin's result still fits.
 */
export declare interface RMMeetingSource {
    ready: boolean;
    isOrganizer: boolean;
    hands: RMRaisedHand[];
    myHandPosition: number | null;
    toggleHand(): void;
    lowerHand(userId?: string): void;
    lowerAllHands(): void;
    breakout: RMBreakoutState;
    myRoom: {
        id: string;
        name: string;
    } | null;
    state: {
        announcement: RMBreakoutState['announcement'];
        you?: {
            userId: string | null;
            organizer: boolean;
        };
    };
    error: {
        code: string;
        message: string;
        requestAction: string;
    } | null;
    configureBreakouts(rooms: {
        id?: string;
        name: string;
        members?: string[];
    }[], opts?: {
        mode?: 'assigned' | 'self-select';
        allowReturnToMain?: boolean;
    }): void;
    /** realtime-modules 0.123.0+. Without it the pane has no Add room. */
    addRoom?(opts?: {
        id?: string;
        name?: string;
    }): void;
    /** realtime-modules 0.123.0+. Without it room names are read-only. */
    renameRoom?(roomId: string, name: string): void;
    assign(assignments: Record<string, string | null>): void;
    autoAssign(userIds: string[]): void;
    openRooms(roomIds?: string[]): void;
    closeRooms(roomIds?: string[]): void;
    setTimer(durationMs: number | null): void;
    broadcast(message: string): void;
    joinRoom(roomId: string): void;
    returnToMain(): void;
    endBreakouts(): void;
    dismissAnnouncement(): void;
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
    /** Optional CTA the host can render as a button or link. */
    action?: {
        label: string;
        href?: string;
        onClickEvent?: string;
    };
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

export declare interface RMRaisedHand {
    userId: string;
    displayName: string;
    raisedAt: string;
}

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

/**
 * `useCanvasDocument(ydoc)`'s return, restated structurally so this package
 * keeps zero runtime dependency on realtime-modules — the same convention the
 * other Wrapped* components follow.
 */
export declare interface RMUseCanvasDocumentReturn {
    isCanvas: boolean;
    schemaVersion: number;
    body: Y.XmlFragment | null;
    exportMarkdown: () => string;
    materialize: (schema: {
        nodes: unknown;
        marks: unknown;
    }, model: unknown) => {
        ok: boolean;
        reason?: string;
        unsupported: CanvasUnsupportedForm[];
    };
    importMarkdown: (schema: {
        nodes: unknown;
        marks: unknown;
    }, markdown: string) => {
        ok: boolean;
        reason?: string;
        unsupported: CanvasUnsupportedForm[];
    };
}

export declare interface RMUseChatReturn {
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
    /** Change one of your own messages (realtime-modules >= 0.100). Optional: older hooks lack it. */
    editMessage?: (messageId: string, text: string, metadata?: Record<string, unknown>) => void;
    /** Soft-delete one of your own messages. Optional like `editMessage`. */
    deleteMessage?: (messageId: string) => void;
}

/** Return shape of `useCursor(channel)` from realtime-modules (singular hook). */
export declare interface RMUseCursorReturn {
    /** Live cursors for the channel, excluding your own. */
    cursors: RMCursorEntry[];
    /** Publish your position (throttled by the hook). */
    move: (position: Record<string, unknown>, metadata?: Record<string, unknown>) => void;
    refresh?: () => void;
}

export declare interface RMUseFileUploadReturn {
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

/**
 * The shape of `useFileUpload(channel)` from realtime-modules, restated
 * structurally so this package keeps zero runtime dependency on it (the same
 * convention the other Wrapped* components follow).
 *
 * @deprecated Prefer `RMUseFileUploadReturn` from `./types`, which is the full
 * hook shape. This narrower alias existed under the SAME NAME as that one, in
 * the same folder, describing a different subset of the same hook — so which
 * fields a caller was expected to supply depended on which file they happened
 * to import from. Kept only so existing imports keep resolving.
 */
declare interface RMUseFileUploadReturn_2 {
    transfers: ChatTransfer[];
    upload: (file: File, opts?: {
        metadata?: Record<string, unknown>;
    }) => Promise<unknown>;
    cancelTransfer: (transferId: string) => void;
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

/** What `usePins(channel)` from realtime-modules returns, restated. */
export declare interface RMUsePinsReturn {
    /** Ids only — what a message list needs to mark a message as pinned. */
    pinnedIds: Set<string>;
    pin: (input: {
        messageId: string;
        text: string;
        author: string;
    }) => Promise<void>;
    unpin: (messageId: string) => Promise<void>;
}

export declare interface RMUsePresenceReturn {
    roster: RMPresenceEntry[];
    setStatus: (status: RMPresenceStatus) => void;
    updateMetadata: (meta: Record<string, unknown>) => void;
}

export declare interface RMUseReactionsReturn {
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

declare interface RosterPanelProps {
    participants: RosterParticipant[];
    activeSpeakerId?: string | null;
    /** Click handler per row — e.g. promote to spotlight. */
    onParticipantClick?: (id: string) => void;
    /** Total-participants count shown in header. Defaults to participants.length. */
    count?: number;
    /** Optional header — e.g. "In this call". Default "Participants". */
    title?: string;
    /** Optional footer — e.g. an "+ Add" button. */
    footer?: ReactNode;
    /** 'dark' renders on black call chrome (the shipped token palette is
     *  light-only, so the default is a white slab inside the dark call
     *  widget — 2026-08-25 audit P0-3). */
    tone?: 'light' | 'dark';
    /**
     * Put raised hands at the top in queue order (numbered positions first,
     * then unnumbered hands), everyone else after in the given order. Default
     * false: the list keeps the caller's order.
     */
    raisedHandsFirst?: boolean;
    /** Organizer: lower one person's hand. Shown as Lower on rows with a hand up. */
    onLowerHand?: (id: string) => void;
    /** Organizer: lower every hand. Shown in the header while any hand is up. */
    onLowerAllHands?: () => void;
    className?: string;
}

declare interface RosterParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isLocal?: boolean;
    isScreenSharing?: boolean;
    /** `true`, or the 1-based queue position (shown beside the hand since 2.458.0). */
    handRaised?: boolean | number;
}

/** Strip non-alphanumeric, lowercase, hyphenate. Mirrors typical
 *  server-side slug generation closely enough for a preview UI. */
export declare function slugifyRoomName(input: string): string;

declare interface StreamChatMessage {
    id: string;
    /** Who sent it. */
    displayName: string;
    /** The message body. */
    content: string;
    /** ISO timestamp, rendered as HH:MM. */
    timestamp?: string;
}

/** Which transport carries the stream. See the header for how to choose. */
export declare type StreamMode = 'realtime' | 'near-realtime';

declare interface StreamStageProps {
    /**
     * The live stream, realtime transport. Null renders the placeholder — a
     * stage with no stream is the normal state before a broadcast starts, not
     * an error.
     */
    stream?: MediaStream | null;
    /**
     * The live stream, near-realtime transport: an HLS playlist URL, typically
     * from `useLVSLiveHls`. Used when `stream` is absent.
     */
    playlistUrl?: string | null;
    /** Surfaced when HLS cannot play — an unsupported browser, a dead playlist. */
    onPlaybackError?: (err: Error) => void;
    /**
     * Called by the "Try again" control, in addition to the stage's own retry.
     * Use it when recovery needs something the stage cannot do — re-issuing a
     * signed playlist URL, re-subscribing over WHEP.
     *
     * It is also the ONLY thing that can offer a way back from `ended`: there is
     * no playlist left to re-attach there, so the stage's own retry could not
     * succeed and no button is drawn without this.
     */
    onRetry?: () => void;
    /** Replaces the default wording once a stream has failed to start. */
    notStartedLabel?: string;
    /**
     * Shown when a stream that WAS playing goes away — the broadcaster hung up.
     *
     * A distinct state from "not started". Both render an empty stage, but the
     * placeholder tells the audience to keep waiting, which is the wrong thing
     * to say about something that is over.
     */
    endedLabel?: ReactNode;
    /** How long to wait before saying so. Default 10s. */
    stallAfterMs?: number;
    /** Name of the stream or call, shown top-left. */
    title?: string;
    /**
     * Watchers, when the number is KNOWN. Pass `null` (or omit) when it is not.
     *
     * `null`/omitted and `0` are DIFFERENT claims and this component keeps them
     * apart: null renders no badge at all ("nobody has told us"), and a numeric
     * 0 renders "0 watching" ("somebody counted, and the answer was nobody").
     *
     * They were collapsed once — 0 was suppressed as if it were unknown — and
     * that is the wrong way round for this codebase specifically. Viewer count
     * here was STRUCTURALLY zero for a long time (the tracker had no callers at
     * all, so every channel reported an empty house), and a visible "0 watching"
     * is the only thing that distinguishes a working counter from a missing
     * one. Suppressing the zero hides exactly the failure worth catching.
     *
     * So a caller must never turn "not told" into 0 to satisfy the type. Omit
     * the prop instead — see WrappedStreamStage, which spreads it conditionally.
     */
    viewerCount?: number | null;
    /**
     * The caller's claim that this should be live. It is ANDed with what the
     * player actually managed to do, so on the HLS path a claim alone will not
     * light the badge — a composed playlist URL is not a broadcast.
     */
    live?: boolean;
    /**
     * Force the audio-only presentation on or off. Omitted, the stage works it
     * out: no usable video track on the realtime path, `videoWidth === 0` on
     * the HLS path.
     */
    audioOnly?: boolean;
    /** Who is broadcasting. Gives an audio-only stream a face and a name. */
    speakerName?: string;
    speakerAvatarUrl?: string;
    /**
     * Chat to rotate over the video. Empty or omitted renders no ticker at all,
     * so a silent stream is not carrying an empty chat frame.
     */
    chatMessages?: readonly StreamChatMessage[];
    /** Forwarded to the ticker. */
    chatVisibleCount?: number;
    chatRotateMs?: number;
    /**
     * Whether the stream starts muted. Default true, and effectively mandatory:
     * browsers refuse to autoplay audible media, so an unmuted stage would not
     * start at all. The viewer can unmute from the stage itself.
     */
    muted?: boolean;
    /** Offer a fullscreen control. Default true; hidden where the API is absent. */
    allowFullscreen?: boolean;
    /**
     * Show how far behind the live edge HLS playback is. Default true. HLS runs
     * seconds behind by construction, and a viewer who does not know that reads
     * the delay as a frozen stream.
     */
    showLatency?: boolean;
    /** Controls rendered bottom-right, e.g. leave / mute / fullscreen. */
    controls?: ReactNode;
    /** Shown centred when there is no stream. */
    placeholder?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** Which colour family a primitive paints in. See the block comment above. */
declare type SurfaceTone = 'surface' | 'code';

declare function TiptapEditor({ fragment, ydoc, provider, user, editable, placeholder: placeholderText, sectionId, onUpdateCursorInfo, extensions: extraExtensions, chrome, hideToolbar, onEditorReady, }: TiptapEditorProps): JSX.Element;

declare interface TiptapEditorProps {
    fragment: XmlFragment;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    user: {
        name: string;
        color: string;
    };
    editable?: boolean;
    placeholder?: string;
    /** Section ID — used to filter cursor overlay to only show cursors in this section */
    sectionId?: string;
    /** Merge-safe awareness updater for cursor display info (name + color).
     *  When provided, replaces the direct setLocalStateField write. */
    onUpdateCursorInfo?: (name: string, color: string) => void;
    /**
     * Extra Tiptap extensions appended to the built-in set.
     *
     * The canvas needs this: its macros (`action-item`, `decision`, `field`) are
     * real ProseMirror nodes with node views, so without registering them the
     * schema has no `macro` node and every macro in the document degrades to
     * plain text — silently, and on the next save that lossy text is what gets
     * written back. Appended rather than replacing, so a caller cannot
     * accidentally drop Collaboration and turn a shared document into a local
     * one.
     *
     * Pass a STABLE array (module const or useMemo). The editor is rebuilt when
     * this identity changes, and a fresh array literal every render remounts the
     * editor on every keystroke.
     */
    extensions?: readonly unknown[];
    /**
     * `'card'` (default) keeps the bordered widget with its own padding and
     * themed ink — every existing caller. `'none'` strips both so the editor
     * can sit directly on a document page the caller owns.
     */
    chrome?: 'card' | 'none';
    /** Suppresses the built-in toolbar, for a page that renders its own. */
    hideToolbar?: boolean;
    /**
     * Hands the live editor out so a caller can render toolbars or menus
     * OUTSIDE the editor's own box. Called with null while the editor is
     * initialising, so a consumer must handle that rather than assume.
     *
     * A document page needs this: its toolbar belongs in the chrome above the
     * sheet, not inside the page margins, and the editor instance is the only
     * way to drive it.
     */
    onEditorReady?: (editor: ReturnType<typeof useEditor>) => void;
}

declare type TransferPhase = 'started' | 'transferring' | 'verifying' | 'complete' | 'failed' | 'cancelled';

/** One reaction as ChatPanel's `reactionsFor` wants it. */
export declare interface UIMessageReaction {
    emoji: string;
    userId: string;
    displayName?: string;
}

/**
 * Capability name per view. Exported so a host whose CRDs are named
 * differently can remap without forking the component — the names below are a
 * default, not a protocol.
 */
/** The views that need no capability: chat itself, and who is in it. */
export declare type UngatedConversationFeature = 'chat' | 'members';

export declare interface UploadedDocumentFile {
    url: string;
    name: string;
    size: number;
    type: string;
}

export declare interface UseCallBlockOptions {
    /** Draw the block while the call is this conversation's (default true). */
    enabled?: boolean;
    /** A narrow host (a side pane). */
    compact?: boolean;
    /** The bar's document chips. */
    documents?: readonly CallBlockDocument[];
    /**
     * Bind this conversation's lobby so the footer's Huddle starts it: the lobby
     * defaults to the channel, the start to "walk into the huddle that is on,
     * else open one with nobody rung".
     */
    bind?: {
        title: string;
        lobbyName?: string | null;
        channel?: string | null;
        blockedReason?: string | null;
        start?: () => void;
    } | null;
}

/**
 * Tab-local recovery is partitioned by verified identity and document; it never
 * stores grants. `keyPrefix` lets an app keep the storage keys it already wrote.
 */
export declare function useCanvasRecovery(tenant: string, subject: string, documentId: string, keyPrefix?: string): {
    recovered: CanvasRecovery | null;
    storageError: boolean;
    retain: (bytes: Uint8Array) => void;
    clear: () => void;
    track: (ydoc: Y.Doc | null, provider: {
        pendingUpdateCount: number;
    } | null) => () => void;
    acknowledged: () => void;
    download: () => void;
    restore: (ydoc: Y.Doc) => void;
};

/** Reference editor upload binding; waits for the server's stable asset URL, never a data URI. */
export declare function useDocumentImageUpload(documentId: string | null | undefined, displayName: string, useFileUpload: DocumentFileUploadHook, timeoutMs?: number): DocumentImageUpload;

/**
 * Read the effective capabilities.
 *
 * Outside a provider every capability is OFF rather than ON. An unwrapped
 * surface silently rendering video is exactly the failure this module exists to
 * prevent, so the unconfigured case is the safe one.
 */
export declare function useRealtimeCapabilities(): ResolvedCapabilities;

/**
 * The integrations bound by the nearest RealtimeIntegrationsProvider. Throws
 * outside one: there is no canonical fallback in this entry (that would import
 * the package this entry exists to avoid importing).
 */
export declare function useRealtimeIntegrations(): RealtimeIntegrations;

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

export declare function WrappedAudioVideoSettingsForm({ devices, settings, cameraOn, ...rest }: WrappedAudioVideoSettingsFormProps): JSX.Element;

export declare interface WrappedAudioVideoSettingsFormProps extends Pick<AudioVideoSettingsFormProps, 'selfName' | 'selfAvatarUrl' | 'layout' | 'className' | 'data-testid'> {
    devices: RMMediaDevicesSource;
    settings: RMAudioVideoSettingsSource;
    /** Whether the viewer's camera is on (the preview shows "Camera is off" otherwise). */
    cameraOn: boolean;
}

/** The in-room banner, or nothing in the main meeting. */
export declare function WrappedBreakoutRoomBanner({ meeting, className }: {
    meeting: RMMeetingSource;
    className?: string;
}): JSX.Element | null;

export declare function WrappedBreakoutRoomsPanel({ meeting, people, roomNames, renderError, ...rest }: WrappedBreakoutRoomsPanelProps): JSX.Element;

export declare interface WrappedBreakoutRoomsPanelProps extends Pick<BreakoutRoomsPanelProps, 'onClose' | 'title' | 'timerMinutes' | 'maxRooms' | 'className' | 'data-testid'> {
    meeting: RMMeetingSource;
    /** Everyone in the meeting (the call roster), for names and the "not in a room" list. */
    people: RMMeetingPerson[];
    /** Name the rooms an organizer creates. Default "Room 1"… */
    roomNames?: (count: number) => string[];
    /** Rendered above the list when the last action was refused. Default: the server's message. */
    renderError?: (error: NonNullable<RMMeetingSource['error']>) => ReactNode;
}

export declare function WrappedCanvasDocument({ canvas, schema, legacyModel, beforeConvert, ...viewProps }: WrappedCanvasDocumentProps): JSX.Element;

export declare interface WrappedCanvasDocumentProps extends Omit<CanvasDocumentViewProps, 'isCanvas' | 'body' | 'onConvert' | 'unsupported'> {
    /** Return value of useCanvasDocument(ydoc) from realtime-modules. */
    canvas: RMUseCanvasDocumentReturn;
    /**
     * The live editor's ProseMirror schema, needed to build the canvas body.
     *
     * Deliberately supplied by the caller rather than constructed here: a second
     * schema means a second copy of prosemirror-model in the module graph, which
     * breaks `instanceof` across the boundary. See the note on `PmSchemaLike` in
     * useCanvasDocument.
     */
    schema: {
        nodes: unknown;
        marks: unknown;
    } | null;
    /**
     * The legacy document to convert, as a `DocModel`. When omitted, conversion
     * starts from an empty page.
     */
    legacyModel?: unknown;
    /** Resolve only after legacy section editors have unmounted. Reject to refuse conversion. */
    beforeConvert?: () => void | Promise<void>;
}

export declare function WrappedChatPanel({ chat, localMessages, presence, upload, reactions, pins, currentActor, currentUserId, displayName, avatarUrl, sendMetadata, publishTyping, attachmentSrc, onOpenAttachment, acceptFiles, maxFileSize, onFileError, disabled, typingUsers: typingUsersOverride, tone, fill, flushComposer, contentAlign, showHeader, loadMoreHistory, joinHistoryLimit, historyPageSize, onLoadMore, hasMore, loadingMore, composer, renderMessageReferences, emojis, onReply, reply, onCancelReply, readReceipts, readReceiptsEnabled, unreadFrom, threaded, onJumpToMessage, highlightedMessageId, documentEditors, callParticipants, onJoinCall, onOpenDocument, wrapWithNetworkShim, editable, canEdit, canDelete, onForwardMessage, }: WrappedChatPanelProps): JSX.Element;

export declare interface WrappedChatPanelProps {
    /** Return value of useChat(channel) from realtime-modules */
    chat: RMUseChatReturn;
    /** Optional presence hook return — used to derive typingUsers */
    presence?: RMUsePresenceReturn;
    /**
     * Messages that exist only in this view and are merged into the transcript
     * by timestamp: a "Huddle started" notice, an optimistic send, a local
     * agent reply. Not sent anywhere. One whose `id` the channel's own history
     * also holds is dropped, so an optimistic message gives way to its echo.
     */
    localMessages?: readonly WrappedLocalMessage[];
    /**
     * Return value of useFileUpload(channel). Supplying it enables drag-drop,
     * paste and the paperclip, and renders every in-flight transfer in the
     * channel — including other participants'. Omit it and the panel shows no
     * attachment affordances at all.
     */
    upload?: RMUseFileUploadReturn_2 | RMUseFileUploadReturn;
    /**
     * Return value of useReactions(channel). Supplying it turns on reaction
     * chips: grouped, counted, and toggleable.
     *
     * Requires `currentUserId` to be meaningful — a chip is a toggle, and which
     * way it goes depends on whether YOU already placed that emoji. Without the
     * viewer's id the panel can render counts but cannot answer "did I react?",
     * so the controls stay off rather than lying.
     */
    reactions?: RMUseReactionsReturn;
    /**
     * Return value of usePins(channel). Supplying it renders the pinned state on
     * each message and offers the pin control. Omit it and pinning is absent
     * rather than broken — which is the right shape for a call scratchpad, where
     * there is no channel state for a pin to outlive.
     */
    pins?: RMUsePinsReturn;
    /** Identifies the viewer so their own transfers get a cancel button. */
    currentActor?: string;
    /**
     * The viewer's AUTHENTICATED user id — what makes their own messages theirs.
     *
     * Distinct from `currentActor`, which identifies a transfer's owner. This is
     * the id ChatPanel compares against each message's `userId` to decide "is
     * this mine", which drives own-message treatment. Without it every message
     * in an embedded transcript reads as somebody else's, including yours, and
     * no styling on the host's side can fix that — the panel simply has nothing
     * to compare.
     */
    currentUserId?: string;
    /**
     * Stamped onto every message this viewer sends.
     *
     * The gateway does not invent a display name, so a message sent without one
     * arrives at every recipient with no name and no face — and the sender
     * cannot see that, because their own row is the one place the panel does not
     * need it. `sendMetadata` merges on top for anything else the host wants to
     * carry (a reply quote, a client tag).
     */
    displayName?: string;
    avatarUrl?: string;
    /** Extra metadata merged into every outgoing message. */
    sendMetadata?: Record<string, unknown>;
    /**
     * Publish this viewer's typing state onto presence, so OTHER participants
     * see the banner this component already knows how to render for them.
     *
     * Default true when `presence` is supplied: reading the roster's `isTyping`
     * while never writing your own is the asymmetry that makes a typing
     * indicator look broken to exactly one person in the conversation — you.
     */
    publishTyping?: boolean;
    /**
     * Resolves an attachment to a renderable image src. The gateway's download
     * route is bearer-authenticated, so an `<img>` pointed at the raw URL 401s;
     * the host supplies an object URL (see useAttachmentSrc).
     */
    attachmentSrc?: (attachment: ChatAttachment) => string | null | undefined;
    onOpenAttachment?: (attachment: ChatAttachment) => void;
    acceptFiles?: string;
    maxFileSize?: number;
    onFileError?: (message: string) => void;
    /** Forwarded to ChatPanel */
    disabled?: boolean;
    /** Override typing banner (supersedes presence-derived list) */
    typingUsers?: string[];
    /** Forwarded to ChatPanel — 'dark' for call chrome surfaces. */
    tone?: 'light' | 'dark';
    /** Forwarded to ChatPanel — fill the parent's height. */
    fill?: boolean;
    /** Forwarded to ChatPanel — full-width custom composer in a filling pane. */
    flushComposer?: boolean;
    contentAlign?: 'start' | 'end';
    /** Forwarded to ChatPanel — suppress its own "Chat (n)" heading when the
     *  host already names the region. */
    showHeader?: boolean;
    /**
     * Turn on "Load earlier messages", backed by `chat.loadHistory`.
     *
     * Off by default, because the paging below only makes sense against a
     * gateway that HAS a history store, and a button that reloads the same
     * twenty messages forever is worse than no button. Where history exists it
     * is a straight drop of a feature the hook always had and this component
     * never called — an embedded transcript began at whatever the join replayed
     * and could not be scrolled back past it.
     *
     * `chat.loadHistory(limit)` REPLACES the window rather than prepending a
     * page, so paging means asking for a bigger window each time — the same
     * shape the app uses. A short answer means the start of the thread.
     */
    loadMoreHistory?: boolean;
    /** Messages the gateway pushes on join (its CHAT_JOIN_HISTORY_LIMIT). */
    joinHistoryLimit?: number;
    /** How many more to ask for on each press. */
    historyPageSize?: number;
    /** Override the paging above entirely. */
    onLoadMore?: () => void;
    hasMore?: boolean;
    loadingMore?: boolean;
    composer?: ReactNode;
    /** Host-resolved references rendered after each adapted message. */
    renderMessageReferences?: ChatPanelProps['renderMessageReferences'];
    emojis?: readonly string[];
    onReply?: (message: ChatMessage) => void;
    /**
     * The message currently being answered, shown as a dismissible quote above
     * the built-in input row (pair with `onReply`). The host also stamps
     * `replyTo` into `sendMetadata` so the sent message carries it. Ignored when
     * `composer` is supplied.
     */
    reply?: ChatPanelProps['reply'];
    onCancelReply?: () => void;
    /**
     * Who has read up to the newest message. Forwarded to ChatPanel, which draws
     * one "Seen by" line. Feed it from `useChatReadReceipts(channel, ...)`
     * (realtime-examples `DocumentChatPanel.tsx:416`, named at `:625`,
     * passed at `:855`).
     */
    readReceipts?: ChatPanelProps['readReceipts'];
    /** False when the server keeps no receipts here: renders nothing. Default true. */
    readReceiptsEnabled?: boolean;
    /** ISO timestamp of the viewer's own read cursor: draws the "new" line. */
    unreadFrom?: string;
    /** Nest replies under their root message (realtime-examples `DocumentChatPanel.tsx:856`). */
    threaded?: boolean;
    onJumpToMessage?: (messageId: string) => void;
    highlightedMessageId?: string | null;
    documentEditors?: ChatPanelProps['documentEditors'];
    callParticipants?: ChatPanelProps['callParticipants'];
    onJoinCall?: (callId: string) => void;
    onOpenDocument?: (documentId: string) => void;
    /**
     * Opt-in: wrap the rendered ChatPanel in a NetworkErrorBoundary +
     * ReconnectingShim using the supplied connection state and retry
     * callback. Omit for no wrapping (default).
     */
    wrapWithNetworkShim?: NetworkShimOptions;
    /**
     * Edit / delete through `chat.editMessage` / `chat.deleteMessage`. On by
     * default when the hook has them; `false` turns the controls off. Since
     * 2.424.0. The gateway stays the authority (its `authorize` and an
     * author-only check run on every edit/delete), so this only decides what the
     * UI OFFERS.
     */
    editable?: boolean;
    /** Who gets an Edit control. Default: the viewer's own messages. Replaces that default. */
    canEdit?: (message: ChatMessage) => boolean;
    /** Who gets a Delete control. Default: own messages; a moderator-grant host widens it. */
    canDelete?: (message: ChatMessage) => boolean;
    /** Forwarded to ChatPanel: the hover bar's Forward, with the trigger for a picker. */
    onForwardMessage?: ChatPanelProps['onForwardMessage'];
}

export declare function WrappedConnectionPill({ socket, ...rest }: WrappedConnectionPillProps): JSX.Element;

export declare interface WrappedConnectionPillProps extends Omit<ConnectionPillProps, 'state'> {
    /**
     * Hook return that exposes `connectionState`. Typically
     * `useWebSocket(...)` or `useGateway()` from realtime-modules.
     */
    socket: RMConnectionStateSource;
}

export declare function WrappedConversationSurface({ declare, capabilities, capabilitiesError, capabilityNames, children, ...surface }: WrappedConversationSurfaceProps): JSX.Element;

export declare interface WrappedConversationSurfaceProps extends Omit<ConversationSurfaceProps, 'features'> {
    /**
     * What this product offers. Defaults to everything, so a host that has not
     * thought about it gets whatever the gateway provisions.
     */
    declare?: readonly ConversationFeature[];
    /**
     * `useCapabilities(capabilityNamesFor(declare)).enabled`. Omit it entirely
     * to skip the gateway gate — appropriate for a deployment with no
     * capability service, where the host's declaration is the only answer
     * available and treating "no service" as "nothing enabled" would leave a
     * bare transcript.
     */
    capabilities?: RMCapabilityMap;
    /**
     * The `error` from `useCapabilities`. Load-bearing: the hook reports every
     * unresolved name as `false`, so a gateway that is momentarily 500ing is
     * indistinguishable from one that provisions nothing — and a surface gated
     * on that silently loses every view, with no explanation, until the gateway
     * recovers. COULD NOT ASK is not the same answer as NO, so a failed
     * resolution falls back to the host's declaration, exactly as a deployment
     * with no capability service does.
     */
    capabilitiesError?: unknown;
    /** Remap capability names when the host's CRDs are named differently. */
    capabilityNames?: Partial<Record<GatedConversationFeature, string>>;
    children?: ReactNode;
}

export declare function WrappedCursorOverlay({ cursor, coordinates, publish, selfClientId, children, className, }: WrappedCursorOverlayProps): JSX.Element;

export declare interface WrappedCursorOverlayProps {
    /** Return value of useCursor(channel) from realtime-modules. */
    cursor: RMUseCursorReturn;
    /**
     * `'fraction'` (default) publishes and reads 0..1 positions so pointers line
     * up across different viewport sizes. `'pixels'` uses raw offsets.
     */
    coordinates?: CursorCoordinates;
    /** Publish the local pointer. Default true; false renders others only. */
    publish?: boolean;
    /** Your own client id; a cursor carrying it is hidden. */
    selfClientId?: string;
    children?: ReactNode;
    className?: string;
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

export declare type WrappedHangoutRoomsListComponent = (props: WrappedHangoutRoomsListProps) => React.JSX.Element;

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
    /**
     * Rail header (2.432.0): with `onToggleCollapse` the section heads itself
     * with the rail's `RailSectionHeader` — the same inset, type and disclosure
     * as Teams, Direct messages and Channels — and the host owns the collapsed
     * state instead of the section's own localStorage key.
     */
    collapsed?: boolean;
    onToggleCollapse?: (next: boolean) => void;
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

/**
 * A view-only message. With `body` it renders as a private card (the node, or
 * what the function returns) with the "Only you can see this" note and its
 * `actions`, in timestamp order; `content` stays the plain-text summary.
 * Without `body` it is an ordinary transcript row. Since 2.413.0.
 */
declare type WrappedLocalMessage = ChatMessage & {
    body?: ReactNode | (() => ReactNode);
    actions?: LocalChatMessage['actions'];
    note?: string;
};

export declare type WrappedLVSHangoutLayoutComponent = (props: WrappedLVSHangoutLayoutProps) => React.JSX.Element;

/** The realtime-modules functions WrappedLVSHangoutLayout calls. */
export declare type WrappedLVSHangoutLayoutModules = Pick<RealtimeClientModules, 'useLVSHangout'>;

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
    /**
     * Raised hand for a participant (2.458.1): `true`, a 1-based queue
     * position, or undefined. Keyed by the app user id when the SFU carries one
     * (`appUserId`), else the SFU `userId`. Bind with meetingHandPositions:
     * `handFor={(id) => hands.get(id)}`.
     */
    handFor?: (userId: string) => boolean | number | undefined;
    className?: string;
    'data-testid'?: string;
}

export declare function WrappedMediaEffectsPreviewPanel({ open, controller, onClose, onApplied, ...rest }: WrappedMediaEffectsPreviewPanelProps): JSX.Element | null;

export declare interface WrappedMediaEffectsPreviewPanelProps extends Pick<MediaEffectsPreviewPanelProps, 'disabled' | 'title' | 'applyLabel' | 'className' | 'data-testid' | 'variant' | 'showFooter' | 'hint' | 'thumbnailSrc' | 'onSelectCustomBackground' | 'backgroundsUnsupported'> {
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

export declare interface WrappedMediaEffectsTrayProps extends Pick<MediaEffectsTrayProps, 'disabled' | 'compact' | 'className' | 'data-testid' | 'layout' | 'columns' | 'thumbnailStream' | 'thumbnailSrc' | 'onSelectCustomBackground' | 'backgroundsUnsupported'> {
    /** Return value of useMediaEffects() from realtime-modules. */
    controller: RMMediaEffectsControllerSource;
}

export declare function WrappedNotificationBell({ notifications, onItemClick, unreadCount, ...rest }: WrappedNotificationBellProps): JSX.Element;

export declare interface WrappedNotificationBellProps extends Omit<NotificationBellProps, 'items' | 'onItemClick' | 'onMarkAllRead' | 'onClearAll'> {
    /** Return value of useNotifications(channel?) from realtime-modules */
    notifications: RMUseNotificationsReturn;
    /**
     * Override item click handler (default: markAsRead on the clicked id).
     *
     * The SECOND argument is the original realtime-modules entry — see
     * `WrappedNotificationCenterProps.onItemClick`: `NotificationItem` has no
     * `channel`, `payload` or `action`, so the entry is what says where a
     * notification points. Undefined only if the click arrives for an id the
     * hook no longer holds.
     */
    onItemClick?: (item: NotificationItem, entry: RMNotificationEntry | undefined) => void;
}

export declare function WrappedNotificationCenter({ notifications, onItemClick, ...rest }: WrappedNotificationCenterProps): JSX.Element;

export declare interface WrappedNotificationCenterProps extends Omit<NotificationCenterProps, 'items' | 'onItemClick' | 'onMarkAllRead' | 'onClearAll'> {
    /** Return value of useNotifications(channel?) from realtime-modules */
    notifications: RMUseNotificationsReturn;
    /**
     * Override item click handler (default: markAsRead on the clicked id).
     *
     * The SECOND argument is the original realtime-modules entry, and it is the
     * reason this signature is not just `(item)`. `NotificationItem` has no
     * field for `channel`, `payload` or `action`, so an adapted item cannot say
     * where a notification points — which made click-to-navigate, the main thing
     * a host does with a notification, impossible through this component. The
     * entry is undefined only if the click arrives for an id the hook no longer
     * holds.
     */
    onItemClick?: (item: NotificationItem, entry: RMNotificationEntry | undefined) => void;
}

export declare function WrappedPresencePanel({ presence, currentClientId, perConnection, wrapWithNetworkShim, }: WrappedPresencePanelProps): JSX.Element;

export declare interface WrappedPresencePanelProps {
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

export declare type WrappedStreamStageComponent = (props: WrappedStreamStageProps) => React.JSX.Element;

/** The realtime-modules functions WrappedStreamStage calls. */
export declare type WrappedStreamStageModules = Pick<RealtimeClientModules, 'useLVSSubscriber' | 'useLVSLiveHls' | 'useLVSViewerCount'>;

export declare interface WrappedStreamStageProps extends Omit<StreamStageProps, 'stream' | 'playlistUrl' | 'live'> {
    /** Channel to watch. Null is idle — the stage shows its placeholder. */
    channelArn: string | null;
    /**
     * Defaults to 'near-realtime'. A component whose job is "let people watch"
     * should default to the mode that scales; realtime is the deliberate,
     * more expensive choice.
     */
    mode?: StreamMode;
    /** Playback JWT for a private channel. Public channels need none. */
    playbackToken?: string | null;
    /** Override the LVS base URL (else taken from LVSProvider). */
    baseUrl?: string;
    /** Realtime only: skip our own published tracks in the WHEP answer. */
    excludeParticipantId?: string;
    /** Realtime only: auth for the WHEP negotiation. */
    getAuthToken?: () => string | Promise<string>;
    /**
     * Reports transport state so a host can render its own connecting/failed
     * chrome. The stage renders playback errors itself; this is for the host's
     * larger surface (a banner, a retry).
     */
    /**
     * Transport-level status. `live` means different things per mode and neither
     * is a promise that pixels are moving: realtime reports the subscriber's
     * phase, near-realtime reports only that a playlist URL could be composed —
     * the wrapper does not own the player, so it cannot know more than that. The
     * LIVE badge is gated separately, inside StreamStage, on what playback
     * actually did.
     */
    onStatusChange?: (status: {
        mode: StreamMode;
        live: boolean;
        error: string | null;
    }) => void;
}

export { }


declare global {
    interface Window {
        /** Dev-only imperative canvas bridge — see `DevEditorBridge` above. */
        __pipelineEditor?: unknown;
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasListStyle: {
            /**
             * Make the caret's block a list of the style's kind (if it is not one
             * already) and set its marker.
             */
            setListStyle: (style: ListStyle) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        suggestChanges: {
            /** Turn suggestion mode on or off. */
            setSuggestionMode: (enabled: boolean) => ReturnType;
            /** Flip suggestion mode. */
            toggleSuggestionMode: () => ReturnType;
            /** Accept one suggestion: keep its insertions, remove its deletions. */
            acceptSuggestion: (id: SuggestionIdentity) => ReturnType;
            /** Reject one suggestion: drop its insertions, restore its deletions. */
            rejectSuggestion: (id: SuggestionIdentity) => ReturnType;
            /** Accept every suggestion in the document. */
            acceptAllSuggestions: () => ReturnType;
            /** Reject every suggestion in the document. */
            rejectAllSuggestions: () => ReturnType;
            /** Move the selection onto a suggestion. */
            selectSuggestion: (id: SuggestionIdentity) => ReturnType;
        };
    }
}
