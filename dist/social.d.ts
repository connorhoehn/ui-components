import { CSSProperties } from 'react';
import { HTMLAttributes } from 'react';
import { JSX } from 'react';
import { ReactNode } from 'react';
import { RefObject } from 'react';

export declare function ActivePeopleGrid({ people, maxVisible, onSelectPerson, onShowAll, onSelectSharedWork, emptyLabel, className, 'data-testid': testId, }: ActivePeopleGridProps): JSX.Element;

export declare interface ActivePeopleGridProps {
    people: readonly ActivePerson[];
    /** Beyond this many, the rest collapse into a "+N" tile. Default 8. */
    maxVisible?: number;
    /** Clicking a tile — the host opens a chat with them. */
    onSelectPerson?: (userId: string) => void;
    /** Clicking the "+N" tile. Without it, the tile is inert text rather than a button. */
    onShowAll?: () => void;
    /** Opens this person's server-filtered shared work graph. */
    onSelectSharedWork?: (userId: string) => void;
    emptyLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface ActivePerson {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    /** What they are doing right now — "In a call", "Editing the roadmap". A tooltip, and a small glyph on the bubble. */
    activity?: string;
    /** In a live call right now: the bubble gets a ring and the tile a small live marker. */
    inCall?: boolean;
    status?: 'online' | 'busy' | 'away';
    /** Voluntary work sharing is independent from presence and call state. */
    workSharing?: {
        state: 'active' | 'historical';
        fresh: boolean;
    };
}

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

export declare interface ActivityItem {
    eventType: string;
    timestamp: string;
    detail: Record<string, unknown>;
}

export declare function ActivityPanel({ idToken, sendMessage, onMessage, connectionState, baseUrl, fetchActivity, onError, }: ActivityPanelProps): JSX.Element;

export declare interface ActivityPanelProps {
    idToken: string | null;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: OnMessageFn_6;
    connectionState: ConnectionState;
    /**
     * Origin for `GET /api/activity`. Wins over the build-time
     * `VITE_SOCIAL_API_URL`, which a consumer cannot influence — see the note
     * on `getBaseUrl` above. Pass the same origin the host's other REST calls
     * use; `''` is a same-origin request.
     */
    baseUrl?: string;
    /**
     * Full replacement for the REST hydration, for a host that already owns an
     * authorized client (signed requests, a proxy, a mock in tests). Wins over
     * `baseUrl`. The live WebSocket half is untouched either way.
     */
    fetchActivity?: FetchActivityFn;
    /**
     * Called with the normalized `Error` whenever a hydrate (REST or
     * `fetchActivity`) fails — in addition to, not instead of, the panel's own
     * inline `ErrorState` and toast. A host with its own error-reporting
     * (Sentry, a status bar) hooks in here instead of re-deriving failure from
     * the panel's render output.
     */
    onError?: (err: Error) => void;
}

export declare interface ActivityResponse {
    items: ActivityItem[];
    nextKey: string | null;
}

export declare function AddToChatDialog({ open, conversationName, people, preselectedIds, busy, anchor, placement, onAdd, onClose, 'data-testid': testId, historyChoice, }: AddToChatDialogProps): JSX.Element;

export declare interface AddToChatDialogProps {
    open: boolean;
    /** "#design", "the chat with Carol" — the place they are being added to. */
    conversationName: string;
    /** Everyone who could be added — members already in are the host's to leave out. */
    people: readonly AddToChatPerson[];
    preselectedIds?: readonly string[];
    busy?: boolean;
    /** The control that opened it. The popover hangs off this; without it, it centres. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    /** Resolves when the server has them; rejects with a reason to show. */
    onAdd: (userIds: string[], history: MembershipHistory) => Promise<void> | void;
    /**
     * Offer the Teams history choice. Off for a place whose policy decides
     * it — a room's members always get the room's past — and `onAdd` then
     * receives `{ mode: 'all' }`.
     */
    historyChoice?: boolean;
    onClose: () => void;
    'data-testid'?: string;
}

export declare interface AddToChatPerson {
    id: string;
    name: string;
    avatarUrl?: string;
    /** A second line — a title, an email, "already in 3 of your chats". */
    subtitle?: string;
}

/** The dot class for a step status — shared with RunSummaryPanel so the two timelines read the same. */
export declare const AGENT_RUN_STEP_DOT: Record<AgentRunStepStatus, string>;

export declare function AgentRunCard({ runId, instruction, agentName, requestedBy, command, status, onOpenDocument, onOpenRun, result, onOpenResult, onDecide, suggestion: suggestionProp, onReview, documentTitle, defaultExpanded, className, 'data-testid': testId }: AgentRunCardProps): JSX.Element;

export declare interface AgentRunCardProps {
    runId: string;
    instruction: string;
    /** The agent carrying it out, e.g. "Haiku". */
    agentName: string;
    requestedBy?: string;
    /** The command this run is — `/doc`, `recording`, `transcribe`. Shown in mono before the instruction. */
    command?: string;
    status?: AgentRunStatus;
    /** Open the document the edit went into. */
    onOpenDocument?: () => void;
    /** Open the run in the pipeline UI. */
    onOpenRun?: (runId: string) => void;
    /** The result carried in the message's metadata; `status.result` wins when both are set. */
    result?: AgentRunResult;
    /** Open the finished run's result — a panel beside the chat, the document, a link. The action renders only when this is given. */
    onOpenResult?: (result: AgentRunResult) => void;
    /** Approve or reject a run that is waiting; the buttons render only when this is given. */
    onDecide?: (runId: string, decision: AgentRunDecision) => void;
    /** The suggestions carried in the message's metadata; `status.suggestion` wins when both are set. */
    suggestion?: Pick<AgentRunSuggestion, 'key' | 'documentId'>;
    /** Accept or reject a finished edit that landed as suggestions; the buttons render only when this is given. */
    onReview?: (runId: string, decision: AgentRunReviewDecision, suggestion: Pick<AgentRunSuggestion, 'key' | 'documentId'>) => void;
    /** The document's title as the message carried it; the expanded document row falls back to it when the live details have none. */
    documentTitle?: string;
    /** Start expanded. The default is the two-line card; the details are a click away. */
    defaultExpanded?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare type AgentRunDecision = 'approve' | 'reject';

/**
 * What the expanded card shows. Populated by realtime-modules' run hook from
 * the run's steps and the edit it applied — keep the field names.
 */
export declare interface AgentRunDetails {
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
 * One edit the agent made, in the document-ops vocabulary the pipeline emits
 * (`setTitle`, `appendBlock`, `replaceBlock`, …). The card turns each into a
 * sentence; an op it does not know is shown by name.
 */
export declare interface AgentRunOp {
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

export declare type AgentRunPhase = 'received' | 'running' | 'awaiting_approval' | 'completed' | 'rejected' | 'failed';

/** Reads a `/doc` command message's metadata; null for anything else. */
export declare function agentRunRefFromMetadata(metadata: Record<string, unknown> | undefined): {
    runId: string;
    documentId: string;
    documentTitle?: string;
    instruction: string;
    agentName: string;
    pipelineId?: string;
    command: string;
    result?: AgentRunResult;
    suggestionKey?: string;
} | null;

/**
 * What a finished run produced, when it produced something a reader can open:
 * a side panel (a search graph, a trace), the document it edited, or a link.
 * Read from the message's metadata (`result`) when the run is posted done, or
 * from the live status while the card is watching it.
 */
export declare type AgentRunResult = {
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

/** Reads a run result out of untrusted metadata; null for anything malformed. */
export declare function agentRunResultFromMetadata(value: unknown): AgentRunResult | null;

/** Who accepted or rejected the suggestions, and when. Mirrors realtime-modules' `PipelineRunStatus.review`. */
export declare interface AgentRunReview {
    decision: AgentRunReviewDecision;
    /** The reviewer's id. */
    by: string;
    byName?: string;
    /** ISO timestamp. */
    at: string;
}

/** What a reviewer does with an edit that landed as suggestions. */
export declare type AgentRunReviewDecision = 'accept' | 'reject';

export declare interface AgentRunStatus {
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

export declare interface AgentRunStep {
    id: string;
    label: string;
    status: AgentRunStepStatus;
}

/** One step of the run, for the expanded timeline. Mirrors realtime-modules' step status vocabulary — keep the names. */
export declare type AgentRunStepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped' | 'awaiting';

/**
 * The suggestions a finished edit left in the document, waiting for a
 * reviewer. Mirrors realtime-modules' `PipelineRunStatus.suggestion` — keep
 * the field names.
 */
export declare interface AgentRunSuggestion {
    /** The suggestion key the changes were tagged with; the review resolves everything under it. */
    key: string;
    documentId?: string;
    /** How many changes were suggested. */
    applied: number;
}

/** "started 21:44 · 80s" — whichever halves the timestamps allow. */
export declare function agentRunTimings(details: Pick<AgentRunDetails, 'startedAt' | 'completedAt'> | undefined): string | null;

export declare const ALL_CONVERSATION_FEATURES: readonly ConversationFeature[];

export declare function AttachmentBubble({ attachment, src, onOpen, className }: AttachmentBubbleProps): JSX.Element;

export declare interface AttachmentBubbleProps {
    attachment: ChatAttachment;
    /**
     * Resolved, directly-renderable source for an image (typically an object
     * URL produced by an authenticated fetch). Falls back to `attachment.preview`
     * so the recipient sees the placeholder rather than a broken image while
     * the full-size fetch is in flight.
     *
     * `undefined` means "not resolved yet"; **`null` means it will not resolve**
     * — the fetch failed, the row is gone, the viewer is not permitted. The two
     * cannot be collapsed: with only `undefined` to work with, a picture that
     * can never arrive says "Loading image…" for as long as the thread stays
     * open, which is a promise the component has no way to keep.
     */
    src?: string | null;
    /** Invoked when the viewer activates the attachment (open / download). */
    onOpen?: (attachment: ChatAttachment) => void;
    className?: string;
}

/** What a console surface paints behind itself. `none` keeps the ordinary surface. */
declare type BackdropTone = 'auto' | 'night' | 'graphite' | 'none';

export declare function CallActivityCard({ callId, startedBy, participants, live, durationMs, audioOnly, recorded, notRecordedReason, lobbyName, onJoin, className, 'data-testid': testId, }: CallActivityCardProps): JSX.Element;

export declare interface CallActivityCardProps {
    callId: string;
    /** Who started it — a display name, never a raw userId. */
    startedBy?: string;
    /**
     * People in the call. While live these are the people to join; once ended
     * they are who was there.
     */
    participants?: readonly CallActivityParticipant[];
    /**
     * Whether the call is still going. This is the card's whole state machine:
     * live offers a way in, ended is a record.
     */
    live?: boolean;
    /** Wall-clock length in ms. Rendered only once the call has ended. */
    durationMs?: number;
    /**
     * True when the call had no camera, false when it had one — and UNDEFINED
     * when nobody knows.
     *
     * The third state is load-bearing. The invite frame does not carry this, so
     * a server-written record genuinely cannot tell, and defaulting to either
     * one puts a confident "Video call" on a call that may have been audio. An
     * unqualified "Call" is the true statement.
     */
    audioOnly?: boolean;
    /**
     * Whether the call was recorded — and UNDEFINED when the record does not
     * say, in which case the card says nothing about it. Only `false` produces
     * a note: a recording that exists announces itself in the thread as its own
     * card, so "Recorded" here would say it twice.
     */
    recorded?: boolean;
    /**
     * Why it was not recorded, as the platform-api decision code:
     * `room-setting-off`, `dm-not-opted-in:<userIds>`, … See
     * `describeNotRecorded` for the words each one becomes.
     */
    notRecordedReason?: string;
    /** The call's lobby (`room:design`, `dm:a:b`) — names the room in the note. */
    lobbyName?: string;
    /**
     * Joins the call. Ignored once `live` is false — a call that ended has
     * nothing to join, and the button would be a dead control. Omit it when the
     * viewer may not join, rather than rendering it disabled.
     */
    onJoin?: (callId: string) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface CallActivityParticipant {
    userId: string;
    displayName?: string;
    avatarUrl?: string;
}

export declare function callRefFromMetadata(metadata: Record<string, unknown> | undefined): {
    callId: string;
    live: boolean;
    durationMs?: number;
    audioOnly?: boolean;
    recorded?: boolean;
    notRecordedReason?: string;
    lobbyName?: string;
    participants: CallActivityParticipant[];
} | null;

export declare interface ChannelDocumentItem {
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

export declare function ChannelDocumentsPanel({ documents, onOpen, onCreate, onCreateWhiteboard, className, 'data-testid': testId, }: ChannelDocumentsPanelProps): JSX.Element;

export declare interface ChannelDocumentsPanelProps {
    documents: readonly ChannelDocumentItem[];
    onOpen?: (documentId: string) => void;
    /** Omit for a viewer who may not create documents here. */
    onCreate?: () => void;
    /**
     * Start a WHITEBOARD here, beside the document.
     *
     * The two are different authoring surfaces, not one with a setting: a
     * document is a page you write down, a whiteboard is an infinite canvas you
     * draw on with other people. The product had both and a conversation could
     * only ever start the first, so the canvas was unreachable from the place
     * people actually decide to sketch something.
     *
     * Omit for a viewer who may not create one.
     */
    onCreateWhiteboard?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface ChannelFileItem {
    /** The message the file arrived on — what the row jumps back to. */
    messageId: string;
    attachment: ChatAttachment;
    author: string;
    /** ISO-8601 of the message. */
    sentAt?: string;
}

export declare function ChannelFilesPanel({ files, thumbnailSrc, onJump, className, 'data-testid': testId, }: ChannelFilesPanelProps): JSX.Element;

export declare interface ChannelFilesPanelProps {
    files: readonly ChannelFileItem[];
    /**
     * Resolves a displayable image source. The download route is authenticated,
     * so `attachment.url` in an <img> would 401 — the integration layer hands
     * back a resolved object URL. Falling back to the inline preview keeps the
     * thumbnail honest while the real bytes are still being fetched.
     */
    thumbnailSrc?: (a: ChatAttachment) => string | null | undefined;
    onJump?: (messageId: string) => void;
    className?: string;
    'data-testid'?: string;
}

/**
 * One time you were named, in a CHANNEL. Named `ChannelMention…` because the
 * library already has a `MentionItem` for the other kind — being named in a
 * document comment — and those two are not interchangeable: one points at a
 * message in a conversation, the other at a comment on a section.
 */
export declare interface ChannelMentionItem {
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

export declare function ChannelMentionsPanel({ mentions, onJump, className, 'data-testid': testId, }: ChannelMentionsPanelProps): JSX.Element;

export declare interface ChannelMentionsPanelProps {
    mentions: readonly ChannelMentionItem[];
    /** Jump takes both, because a mention can be in a channel you are not in. */
    onJump?: (channel: string, messageId: string) => void;
    className?: string;
    'data-testid'?: string;
}

export declare type ChannelPrivacy = 'standard' | 'private';

export declare interface ChannelRecordingItem {
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

export declare function ChannelRecordingsPanel({ recordings, onOpen, className, 'data-testid': testId, }: ChannelRecordingsPanelProps): JSX.Element;

export declare interface ChannelRecordingsPanelProps {
    recordings: readonly ChannelRecordingItem[];
    onOpen?: (recordingId: string) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface ChatAttachment {
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

export declare interface ChatBubble {
    id: string;
    author: string;
    avatarUrl?: string;
    color?: string;
    /** Plain text. The host strips markup; this component never renders HTML. */
    text: string;
    /** Where it came from — the room — for the small caption. */
    channelLabel?: string;
}

export declare function ChatBubbleStack({ bubbles, onOpen, onDismiss, dismissAfterMs, max, className, 'data-testid': testId, }: ChatBubbleStackProps): JSX.Element | null;

export declare interface ChatBubbleStackProps {
    bubbles: ChatBubble[];
    /** The reader clicked a bubble: open the conversation there. */
    onOpen: (id: string) => void;
    /** A bubble timed out or was dismissed. */
    onDismiss: (id: string) => void;
    /** How long a bubble stays. Default 8 s. */
    dismissAfterMs?: number;
    /** At most this many on screen; older ones go first. Default 3. */
    max?: number;
    className?: string;
    'data-testid'?: string;
}

export declare type ChatChannelKind = 'room' | 'dm';

/** Room or DM for a channel, from the host's word first and the gateway's prefix second. */
export declare function chatChannelKindOf(ctx: Pick<ChatCommandScopeContext, 'channel' | 'channelKind'>): ChatChannelKind;

/**
 * Wraps the message list + composer so the column as a whole changes state with
 * the mode. Layout is identical in both states — only colour and the backdrop
 * change — so nothing reflows across the transition.
 */
export declare function ChatColumnBackdrop({ mode, working, tone: toneProp, className, children, 'data-testid': testId, }: ChatColumnBackdropProps): JSX.Element;

export declare interface ChatColumnBackdropProps {
    /**
     * The composer's mode. `chat` is the ordinary light column; `agent` and
     * `terminal` are the console.
     */
    mode?: ComposerMode;
    /**
     * True while a loop is mid-turn. Denser, faster, and the cloud leans toward
     * the pointer — the same "this is working" signal the lab shell uses, said by
     * the whole column instead of one pane.
     */
    working?: boolean;
    /**
     * The sky. `auto` (default): graphite on a light theme, night on a dark one
     * (see `resolveBackdropTone`). The resolved tone is stamped on this element
     * as `data-backdrop-tone`, so a composer inside it inherits the SAME sky
     * instead of deciding again. `none` never darkens the column.
     */
    tone?: BackdropTone;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}

export declare interface ChatCommand extends ComposerCommand {
    /** What sending the command does. Errors propagate to the host, which toasts. */
    run: (ctx: ChatCommandContext) => Promise<ChatCommandOutcome>;
    /** When the command is offered. Default `'always'`. Out of scope, it is listed disabled with a hint that says why. */
    scope?: ChatCommandScope;
    /** Overrides the hint shown while the command is out of scope. */
    disabledHint?: string;
}

/** What a command sees when it runs, and what a scope sees when it decides. */
export declare interface ChatCommandContext {
    channel: string;
    /**
     * Room or direct message, when the host knows. Without it, the `room`/`dm`
     * scopes fall back to the gateway's `chat:dm:`/`chat:dmg:` prefixes.
     */
    channelKind?: ChatChannelKind;
    user: {
        id: string;
        displayName: string;
    };
    idToken: string | null;
    /** The whole draft as sent, trigger included. */
    text: string;
    /** The text after the trigger, trimmed — the instruction, the query. */
    argumentText: string;
    /** The row picked from the command's argument menu, when there was one. */
    argument?: ComposerArgumentItem;
    sidePanel: {
        current: ChatSidePanelRef | null;
        open: (panel: ChatSidePanelRef) => void;
        close: () => void;
    };
    toast?: (message: string, opts?: {
        type?: 'info' | 'success' | 'error';
    }) => void;
    navigate?: (path: string) => void;
}

export declare type ChatCommandOutcome = 
/**
* The command started a pipeline run. The host posts an `agent-run` message
* whose metadata is `{ kind: 'agent-run', command, instruction, runId,
* pipelineId, ...card }`, and the thread shows an AgentRunCard for it.
*
* `visibility: 'private'` asks the host NOT to post: the card is shown to
* the person who ran the command alone (ChatPanel's `localMessages`), and
* they decide whether it goes into the conversation once the run has
* produced something worth sharing. Default `'shared'`.
*/
    {
    kind: 'run';
    runId: string;
    pipelineId: string;
    card: Record<string, unknown>;
    echo?: string;
    visibility?: 'shared' | 'private';
}
/** The command opened something beside the conversation, immediately. */
| {
    kind: 'panel';
    panel: ChatSidePanelRef;
    echo?: string;
}
/** The command's whole result is a message in the thread. */
| {
    kind: 'message';
    text: string;
    metadata?: Record<string, unknown>;
}
/** The command did its work out of band (a toast, a navigation). */
| {
    kind: 'none';
};

export declare function ChatCommandProvider({ commands, children }: ChatCommandProviderProps): JSX.Element;

export declare interface ChatCommandProviderProps {
    /** This layer's commands. Merged over any provider above; overrides by trigger. */
    commands?: readonly ChatCommand[];
    children: ReactNode;
}

/** Everything `run` needs except the draft, which the runner parses. */
export declare type ChatCommandRunContext = Omit<ChatCommandContext, 'text' | 'argumentText'>;

export declare type ChatCommandScope = 'always' | 'document-open' | 'room' | 'dm' | ((ctx: ChatCommandScopeContext) => boolean);

/** The context a scope decides on: everything but the draft, which does not exist yet. */
export declare type ChatCommandScopeContext = Omit<ChatCommandContext, 'text' | 'argumentText' | 'argument'>;

/** Why a command is disabled right now, in the words the composer's bar shows. */
export declare function chatCommandScopeHint(command: Pick<ChatCommand, 'scope' | 'disabledHint' | 'hint'>): string;

/**
 * The composer's view of the registry: every command, in registry order,
 * with out-of-scope ones disabled and their hint replaced by the reason. The
 * composer never sees `run` or `scope`.
 */
export declare function chatCommandsToComposer(commands: readonly ChatCommand[], ctx: ChatCommandScopeContext): ComposerCommand[];

export declare function ChatDropZone({ children, onFiles, accept, maxSize, onError, disabled, label, className, }: ChatDropZoneProps): JSX.Element;

export declare interface ChatDropZoneProps {
    children: ReactNode;
    /** Receives the dropped files after validation. */
    onFiles: (files: File[]) => void;
    /** Comma-separated MIME patterns, e.g. "image/*,.pdf". Omit to accept all. */
    accept?: string;
    /** Per-file byte cap. Rejected files are reported via `onError`. */
    maxSize?: number;
    /** Called with a human-readable reason when a drop is rejected. */
    onError?: (message: string) => void;
    /** Suppresses the drop affordance entirely (e.g. while disconnected). */
    disabled?: boolean;
    /** Overlay copy. Defaults to a generic prompt. */
    label?: string;
    className?: string;
}

/**
 * The loop, shrunk to one line for the composer's chip row.
 *
 * "Back to chat" must not feel like abandoning the run, so the run has to stay
 * visible and one click away once the column is a conversation again.
 */
export declare function ChatLabPill({ status, contextTokens, contextBudgetTokens, onOpen, className, 'data-testid': testId, }: ChatLabPillProps): JSX.Element;

export declare interface ChatLabPillProps {
    status: LabStatus;
    contextTokens: number;
    contextBudgetTokens: number;
    onOpen: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare function ChatLabShell({ title, status, model, contextBudgetTokens, contextTokens, iterations, planSource, steps, events, onInstruct, onStop, onBackToChat, onOpenRun, onOpenGraph, shell, notice, className, 'data-testid': testId, }: ChatLabShellProps): JSX.Element;

export declare interface ChatLabShellProps {
    /** The instruction the loop was started with, already truncated by the host. */
    title: string;
    status: LabStatus;
    model: string;
    contextBudgetTokens: number;
    contextTokens: number;
    iterations: number;
    /** `'fallback'` means the planner did not answer and this is one step. Surfaced. */
    planSource?: 'planner' | 'fallback';
    steps: LabStep[];
    events: LabEvent[];
    /** The `›` prompt. Disabled while the loop is mid-turn — there is nothing to interrupt. */
    onInstruct?: (text: string) => void | Promise<void>;
    onStop?: () => void;
    onBackToChat: () => void;
    onOpenRun?: () => void;
    onOpenGraph?: () => void;
    /**
     * The box behind the loop. Present = a Terminal tab exists. `shellUrl` is
     * minted on demand by the host, so its absence is a button, not an error.
     */
    shell?: {
        sessionId: string;
        shellUrl?: string;
        onRequestShell?: () => void;
    };
    /** Honest state, e.g. "Planner unavailable · single step" or "Mock runtime". */
    notice?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface ChatMember {
    id: string;
    name: string;
    avatarUrl?: string;
    role: 'owner' | 'member';
    /** ISO. */
    addedAt?: string;
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

export declare function ChatPanel({ messages, localMessages, onSend, disabled, onTyping, typingUsers, emptyState, composer, currentUserId, reactionsFor, onToggleReaction, onReply, onForwardMessage, onCopyLink, onTogglePin, onEditMessage, onDeleteMessage, pinnedMessageIds, onJumpToMessage, highlightedMessageId, threaded, alignOwnMessages, documentEditors, callParticipants, agentRunStatus, onOpenRun, onOpenResult, onDecideRun, onReviewRun, onJoinCall, onOpenRecording, onCopyRecordingLink, onShareRecording, onDownloadRecording, onOpenRecordingTranscript, onManageRecordingExpiry, recordingStatus, onOpenDocument, renderMessageReferences, tone, showHeader, fill, onLoadMore, hasMore, loadingMore, onSendFiles, transfers, currentActor, onCancelTransfer, attachmentSrc, onOpenAttachment, acceptFiles, maxFileSize, onFileError, readReceipts: readReceiptsProp, readReceiptsEnabled, unreadFrom, emojis, }: ChatPanelProps): JSX.Element;

export declare interface ChatPanelProps {
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
    /** Open what a finished agent run produced — a side panel, a document, a link. */
    onOpenResult?: (result: AgentRunResult) => void;
    /** Approve or reject a run whose card says it is waiting for approval. */
    onDecideRun?: (runId: string, decision: AgentRunDecision) => void;
    /** Accept or reject the suggestions a finished agent edit left in the document. */
    onReviewRun?: (runId: string, decision: AgentRunReviewDecision, suggestion: Pick<AgentRunSuggestion, 'key' | 'documentId'>) => void;
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

export declare function ChatRoom({ idToken, roomId, roomName, onMessage }: ChatRoomProps): JSX.Element;

declare interface ChatRoomProps {
    idToken: string | null;
    roomId: string;
    roomName: string;
    onMessage: OnMessageFn_3;
}

/**
 * Looks the panel's renderer up and shows it inside the frame. With no
 * renderer for the kind the frame still opens — with an empty state that names
 * the kind, so a missing registration is a visible bug, not a blank split.
 */
export declare function ChatSidePanel({ panel, onClose, onOpenFullPage, subtitle, actions, expanded, onToggleExpanded, className, 'data-testid': testId }: ChatSidePanelProps): JSX.Element;

export declare interface ChatSidePanelApi {
    close: () => void;
    /** Present when the host gave the panel a full-page destination. */
    openFullPage?: () => void;
    /** Replaces the frame's title once the body knows the real one (the live document title). */
    setTitle: (title: string | null) => void;
}

/**
 * The chrome around anything open beside a conversation: one header row with
 * the title on the left and the way out on the right, and a body that fills
 * the rest and scrolls on its own.
 */
export declare function ChatSidePanelFrame({ title, subtitle, onClose, onOpenFullPage, actions, expanded, onToggleExpanded, children, className, 'data-testid': testId, }: ChatSidePanelFrameProps): JSX.Element;

export declare interface ChatSidePanelFrameProps {
    title: string;
    /** A second clause under the title — "12 results", "Edited by Grace". */
    subtitle?: string;
    onClose: () => void;
    /** Offers navigation to the full-page destination. */
    onOpenFullPage?: () => void;
    /** Additional controls beside the panel title. */
    actions?: ReactNode;
    /** Whether this panel currently occupies the conversation area. */
    expanded?: boolean;
    /** When supplied, offers an expand/restore control beside the title. */
    onToggleExpanded?: () => void;
    children: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** Sentence-cases a kind for the header when the ref carries no title: `agent-trace` → `Agent trace`. */
export declare function chatSidePanelKindLabel(kind: string): string;

export declare interface ChatSidePanelProps {
    panel: ChatSidePanelRef;
    onClose: () => void;
    /** Where the panel goes full-page, when it can. Receives the ref so one handler serves every kind. */
    onOpenFullPage?: (panel: ChatSidePanelRef) => void;
    /**
     * A second clause under the title — WHERE this panel came from.
     *
     * A panel beside a conversation gets its context free: the thread is right
     * there. One that takes the whole pane does not, and a bare document title
     * over a full-width canvas reads as a separate place the app navigated to
     * rather than something open inside a channel. This is where the host says
     * which conversation it belongs to.
     */
    subtitle?: string;
    /** Additional controls beside the panel title. */
    actions?: ReactNode;
    /** Whether this panel currently occupies the conversation area. */
    expanded?: boolean;
    /** When supplied, offers an expand/restore control beside the title. */
    onToggleExpanded?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare function ChatSidePanelProvider({ renderers, children }: ChatSidePanelProviderProps): JSX.Element;

export declare interface ChatSidePanelProviderProps {
    /** This layer's renderers by kind. Merged over any provider above; overrides by kind. */
    renderers?: ChatSidePanelRenderers;
    children: ReactNode;
}

/**
 * Something open BESIDE the conversation — a document, a search-result graph,
 * a run's trace. `kind` selects a renderer (see ChatSidePanelRegistry); `id`
 * is what that renderer opens. The library reserves `kind: 'document'` for the
 * `?doc=` URL form; every other kind is the host's.
 */
export declare interface ChatSidePanelRef {
    kind: string;
    id: string;
    /** A first guess at the header; a renderer may replace it once it knows more. */
    title?: string;
    /** Extra state the renderer needs — a query, a tab. Round-trips through the URL. */
    params?: Record<string, string>;
}

export declare type ChatSidePanelRenderer = (panel: ChatSidePanelRef, api: ChatSidePanelApi) => ReactNode;

export declare type ChatSidePanelRenderers = Record<string, ChatSidePanelRenderer>;

export declare interface ChatTransfer {
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

export declare interface ComposerArgumentItem {
    /** Stable identity — this is what travels to the host, not the label. */
    id: string;
    label: string;
    /** Shown on the right of the row: where it lives, who owns it. */
    hint?: string;
    /** A glyph for the row, e.g. `📄`. */
    icon?: string;
}

export declare interface ComposerCommand {
    /** The leading token, e.g. `/doc`. Matched case-insensitively at the start of the draft. */
    trigger: string;
    /** What it does — "Edit the open document with Haiku". */
    label: string;
    /** A second clause: what it needs, or what will happen. */
    hint?: string;
    /** True when the command cannot run right now (no document open); the bar says why via `hint`. */
    disabled?: boolean;
    /** The long form, shown as a tooltip on the bar: what will happen, step by step. */
    description?: string;
    /**
     * A glyph before the trigger in the docked card's command chip
     * (`modeControl="menu"`) — a branch mark for `/workflow`. Since 2.385.0.
     */
    icon?: ReactNode;
    /** What the command acts on, offered as a second menu once the trigger is typed. */
    argument?: ComposerCommandArgument;
}

export declare interface ComposerCommandArgument {
    /** Shown in the status bar while the argument is empty — "type a document name". */
    placeholder?: string;
    /**
     * Resolves the argument menu from the text after the trigger. A promise is
     * supported (and debounced ~120ms) so a host can hit an index rather than
     * filter a preloaded array; the previous list stays up while a new one is
     * in flight.
     */
    search: (query: string) => ComposerArgumentItem[] | Promise<ComposerArgumentItem[]>;
    /**
     * What picking a row does. `'execute'` clears the draft and calls
     * `onCommand` — the pick WAS the message. `'insert'` (the default) writes the
     * label into the draft so the person can keep typing, and the pick travels
     * on send as `ComposedMessage.command.argument`.
     */
    onPick?: (item: ComposerArgumentItem) => 'execute' | 'insert';
}

/**
 * The text after a matched command's trigger and its one separator:
 * `/doc Roadmap` → `Roadmap`, `/doc` → ``. Leading whitespace beyond the
 * separator is kept, so callers replacing the argument know its exact extent.
 */
export declare function composerCommandArgumentText(draft: string, command: ComposerCommand): string;

/** What the composer is for, right now. */
declare type ComposerMode = 'chat' | 'agent' | 'terminal';

export declare interface ComposerReference {
    /** Stable across re-renders; what `onRemove` is called with. */
    id: string;
    /** Already composed by the host — "Sprint review · v2 · Slide 4". */
    label: string;
    /** The referenced thing's own glyph, when it has one. */
    icon?: string;
    /** Hover text; the label itself when absent. */
    title?: string;
}

export declare function ComposerReferences({ references, onRemove, removeLabel, className, size, 'data-testid': testId, }: ComposerReferencesProps): JSX.Element | null;

export declare interface ComposerReferencesProps {
    references: readonly ComposerReference[];
    /** Omit to render the chips without a remove control. */
    onRemove?: (id: string) => void;
    /** Accessible name for a chip's remove button. */
    removeLabel?: (reference: ComposerReference) => string;
    className?: string;
    /** Chip type. `xs` (default) is the 11px chip of a chat composer; `sm` is the 12px chip of a docked editor card (2.377.0). */
    size?: 'xs' | 'sm' | 'md';
    'data-testid'?: string;
}

declare type ConnectionState = 'connected' | 'connecting' | 'disconnected';

/** The views a conversation can offer. `chat` is the transcript itself. */
export declare type ConversationFeature = 'chat' | 'files' | 'documents' | 'pins' | 'members' | 'mentions' | 'calls';

export declare interface ConversationItem {
    /** Chat channel id — handed back verbatim by `onSelect`. */
    channel: string;
    /**
     * What kind of conversation this is.
     *
     * The server already models all three as ONE thing — a room carries
     * `type: 'standalone' | 'group' | 'dm'` — so they belong in one list rather
     * than three panels with three "new" buttons. This only changes how the row
     * IDENTIFIES itself:
     *
     *   'dm'      → the peer's avatar and name
     *   'group'   → stacked avatars, all the names
     *   'channel' → a # and the channel's own name. A channel is not the sum of
     *               its members; #general does not want forty stacked avatars,
     *               and its identity survives everyone leaving.
     *
     * Defaults to peer-derived ('dm' or 'group' by peer count), so every existing
     * caller keeps the rows it already had.
     */
    kind?: 'dm' | 'group' | 'channel';
    /** Required for `kind: 'channel'` — the channel's name, without the '#'. */
    name?: string;
    /** 1 peer for a 1:1 conversation, N for groups. Empty for a channel. */
    peers: ConversationPeer[];
    lastMessagePreview?: string;
    /** ISO timestamp of the last message. Rendered as HH:MM. */
    lastMessageAt?: string;
    unreadCount?: number;
    /**
     * Somebody named YOU in this conversation.
     *
     * Separate from `unreadCount` because they answer different questions and
     * only one of them is urgent: unread is "there is traffic here", a mention
     * is "someone is waiting on you". Rolling them into one number is how a
     * mention gets lost inside a busy channel's 40 unread.
     */
    mentioned?: boolean;
    /**
     * A call is happening in this conversation RIGHT NOW.
     *
     * Its own signal, for the same reason `mentioned` is: unread says "there is
     * traffic here", a mention says "someone is waiting on you", and this says
     * "something is happening that you can still join". Only the last one
     * expires — a call you learn about afterwards is a fact, not an invitation.
     *
     * Until this existed a call was invisible from the list: the thread posted a
     * card when the call ENDED, so the only way to discover one in progress was
     * to already be looking at the conversation it was in. For a stream meant
     * for an audience that is the whole problem — nobody can watch what nobody
     * can find.
     */
    live?: boolean;
    /**
     * Kept at the top of the rail, above every other row and out of recency's
     * reach — the two or three conversations a person returns to all day.
     *
     * Pinned rows form ONE group regardless of kind: a pin says "I want this
     * where I can find it", and splitting the pins back into Channels and
     * Direct messages puts them back where they were.
     */
    pinned?: boolean;
    /**
     * A heading this person filed the row under — the Slack/Teams "custom
     * section". Absent or blank means the default grouping.
     *
     * Sections sit ABOVE Channels and Direct messages and below Pinned: someone
     * who has made a section has said, in the strongest terms the rail offers,
     * where they want this thread. A pin still outranks it — "keep this in
     * reach" is a stronger statement than "file this under Work", and a pinned
     * row pulled down into a section is a pin that stopped working.
     *
     * Filing is per person and per conversation, so two people in one channel
     * can file it differently and neither sees the other's arrangement.
     */
    section?: string | null;
    /**
     * Muted: traffic here is not worth interrupting for.
     *
     * The row still counts its unread — muting is not hiding — but the badge
     * loses its accent, so a glance down the rail separates "someone is talking"
     * from "someone wants me". A MENTION keeps its full-strength marker even
     * here, because being named is the one thing a mute is not meant to swallow.
     */
    muted?: boolean;
}

export declare function ConversationList({ items, grouped, sectionOrder, sectionActions, collapsedSections, onToggleSection, onStartCall, sortByRecency, maxVisible, activeChannel, onSelect, onNewChat, emptyLabel, onTogglePin, onToggleMute, onMarkUnread, onRename, canRename, onSetSection, tone, className, 'data-testid': testId, }: ConversationListProps): JSX.Element;

export declare interface ConversationListProps {
    items: ConversationItem[];
    /** Channel of the conversation currently open — its row highlights. */
    activeChannel?: string | null;
    onSelect: (channel: string) => void;
    /** Renders a "+ New chat" affordance above the rows when set. */
    onNewChat?: () => void;
    /** Empty-state text. Defaults to "No conversations yet". */
    emptyLabel?: string;
    /**
     * Split the list into Channels and Direct messages, the way Slack and Teams
     * do.
     *
     * A flat list mixing the two is scannable at four rows and not at forty: a
     * channel and a person are different kinds of destination, and the eye
     * looks for them in different places. Off by default so existing callers —
     * a compact sidebar, a call's people list — keep the single run they were
     * designed around.
     */
    grouped?: boolean;
    /**
     * Which group leads when `grouped`.
     *
     * `'channels-first'` (the default, and what every existing caller keeps) is
     * the Slack shape and is right when channels are things you deliberately
     * joined. `'dms-first'` is right on a surface whose subject is people: a DM
     * is addressed to you personally and a channel is not, and on a rail with
     * forty rooms in it that difference is the only thing keeping a new message
     * from a colleague above the fold.
     */
    sectionOrder?: 'channels-first' | 'dms-first';
    /**
     * Trailing buttons on a section's heading, keyed by the section's name —
     * 'Channels', 'Direct messages', 'Pinned'. A + on the Channels heading is
     * where people look for "make a new one"; a "new" button parked somewhere
     * else is a button nobody finds.
     */
    sectionActions?: Readonly<Record<string, readonly RailSectionAction[]>>;
    /**
     * Which sections are folded away, keyed by the section's name the way
     * `sectionActions` is — 'Pinned', 'Channels', 'Direct messages'.
     *
     * Controlled, and only live once `onToggleSection` is given: a collapsed
     * section with no handler is one nothing can reopen. The host owns the state
     * because this is a preference worth persisting — a rail that forgets which
     * sections you folded is one you refold every morning.
     *
     * Not to be confused with the "Show N more" cap (`maxVisible`), which is
     * this component's own state and a different idea: the cap trims a long
     * section down to its top rows, this hides the section outright. Neither
     * resets the other, so reopening a section brings back exactly the rows it
     * had.
     */
    collapsedSections?: Readonly<Record<string, boolean>>;
    /** Fires with the section's name and the state the host should switch to. */
    onToggleSection?: (label: string, next: boolean) => void;
    /**
     * Start a call in a conversation from the rail — the row's ⋯ gains "Call"
     * and "Video call". A conversation you can open is one you can call into,
     * and making people open it first to find the call button is a step for
     * nothing.
     */
    onStartCall?: (channel: string, kind: 'audio' | 'video') => void;
    /**
     * Sort rows most-recent-first within each group. Default TRUE.
     *
     * Off for a caller whose order already means something — a call's people
     * list is in join order, and re-sorting it by "last message" would shuffle
     * the participants of a live call every time somebody spoke.
     */
    sortByRecency?: boolean;
    /**
     * Show at most this many rows per group, with a "Show N more" row after
     * them that expands the group in place (and "Show less" to fold it back).
     *
     * A rail is a place to find the conversation you want, and past a handful
     * of rows the eye stops scanning and starts reading. With recency sorting
     * on, the cut keeps the most recent; the open conversation is always kept
     * visible so the highlight never sits inside the folded part. Unset shows
     * everything, which is what every existing caller gets.
     */
    maxVisible?: number;
    /**
     * Per-row actions, the way Teams and Slack hang them off a conversation:
     * a ⋯ button revealed on hover or focus, never a second permanent control
     * competing with the row itself. Each is optional and its menu row appears
     * only when the handler does — a rail that cannot mute should not offer to.
     *
     * `next` is the state being asked for, not the state now, so a host never
     * has to re-derive the flip.
     */
    onTogglePin?: (channel: string, next: boolean) => void;
    onToggleMute?: (channel: string, next: boolean) => void;
    /** Absent from a row that is already unread — there is nothing to mark. */
    onMarkUnread?: (channel: string) => void;
    /**
     * Rename this conversation — the Teams/Slack "Rename channel" row.
     *
     * Offered per row rather than per list because renaming is a permission:
     * the host knows which conversations this reader owns, and a row that
     * cannot be renamed should not say it can. Pass a handler only for rows
     * where it is allowed (see `canRename`).
     */
    onRename?: (channel: string) => void;
    /**
     * "Move to section…" — file this row under one of the person's own
     * headings. The host owns the picker; this only reports the intent.
     *
     * Offered on every row when given, unlike Rename: filing is the reader's
     * own arrangement of their own rail, so it needs no permission from anyone
     * and applies as well to a DM as to a channel.
     */
    onSetSection?: (channel: string) => void;
    /**
     * Which rows accept a rename. Defaults to "all of them" when `onRename` is
     * given. A DM has no name of its own — it is named by the people in it — so
     * a host will typically answer false for those.
     */
    canRename?: (item: ConversationItem) => boolean;
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

export declare function ConversationRail({ shelf, conversations, selected, onSelect, onNewChat, grouped, sectionOrder, sectionActions, collapsedSections, onToggleSection, onStartCall, maxVisible, emptyLabel, header, title, actions, beforeList, footer, onTogglePin, onToggleMute, onMarkUnread, onRename, canRename, onSetSection, collapsible, collapsed, onToggleCollapse, className, 'data-testid': testId, }: ConversationRailProps): JSX.Element;

export declare interface ConversationRailProps {
    /**
     * Persistent destinations — Mentions, Threads, Drafts. Empty renders
     * nothing at all rather than an empty strip.
     */
    shelf?: readonly ConversationShelfItem[];
    conversations: ConversationItem[];
    /** Null when nothing is open — a cold start, or a pane the rail does not model. */
    selected?: RailSelection | null;
    onSelect: (selection: RailSelection) => void;
    /** Renders the "+ New chat" row above the conversations when set. */
    onNewChat?: () => void;
    /**
     * Split conversations into Channels and Direct messages. On by default
     * here — unlike the bare list, which serves compact sidebars too. A rail is
     * the full-height case, where a forty-row flat mix stops being scannable.
     */
    grouped?: boolean;
    /**
     * Which group leads. Forwarded to ConversationList — `'dms-first'` on a
     * surface whose subject is people rather than rooms.
     */
    sectionOrder?: 'channels-first' | 'dms-first';
    /** Trailing buttons on each section heading, keyed by section name. Forwarded to the list. */
    sectionActions?: Readonly<Record<string, readonly RailSectionAction[]>>;
    /**
     * Which conversation sections are folded away, keyed by section name.
     * Forwarded to the list.
     *
     * Nothing to do with `collapsed` below: that shrinks the WHOLE rail to an
     * icon strip, this folds one section inside an otherwise normal rail.
     */
    collapsedSections?: Readonly<Record<string, boolean>>;
    /** Fires with the section's name and the state to switch to. Forwarded to the list. */
    onToggleSection?: (label: string, next: boolean) => void;
    /** "Call" / "Video call" in each row's ⋯ menu. Forwarded to the list. */
    onStartCall?: (channel: string, kind: 'audio' | 'video') => void;
    /** Forwarded to the list: rows per group before a "Show N more" row. */
    maxVisible?: number;
    emptyLabel?: string;
    /** Above the shelf: a workspace switcher, a search field, a title. */
    header?: ReactNode;
    title?: string;
    actions?: ReactNode;
    /** Below the list: a "you" row, a status control. */
    /**
     * Between the shelf and the conversation list — where a team → channel
     * tree goes, so it sits above the flat conversations rather than below
     * them.
     */
    beforeList?: ReactNode;
    footer?: ReactNode;
    /**
     * Per-row actions, forwarded to the list: the ⋯ menu on each conversation.
     * Each item appears only when its handler does.
     */
    onTogglePin?: (channel: string, next: boolean) => void;
    onToggleMute?: (channel: string, next: boolean) => void;
    onMarkUnread?: (channel: string) => void;
    /** "Rename" in each row's ⋯ menu. Forwarded to the list; see its prop docs. */
    onRename?: (channel: string) => void;
    /** Which rows accept a rename. Forwarded to the list. */
    canRename?: (item: ConversationItem) => boolean;
    /** "Move to section…" in each row's ⋯ menu. Forwarded to the list. */
    onSetSection?: (channel: string) => void;
    /**
     * Opts into the Teams/Slack "shrink to an icon strip" toggle. Off by
     * default, so every existing caller keeps its always-expanded rail with no
     * behaviour change.
     */
    collapsible?: boolean;
    /**
     * Whether the rail is currently the narrow icon strip. The rail does not
     * own this — the host decides, typically from a piece of state it
     * persists, and hears about a change through `onToggleCollapse`.
     */
    collapsed?: boolean;
    /** Fires with the state the host should switch to when the toggle is used. */
    onToggleCollapse?: (next: boolean) => void;
    className?: string;
    'data-testid'?: string;
}

export declare function ConversationShelf({ items, activeId, onSelect, compact, iconOnly, size, className, 'data-testid': testId, }: ConversationShelfProps): JSX.Element | null;

export declare interface ConversationShelfItem {
    id: string;
    label: string;
    /**
     * A glyph component from `ui/Icons` (e.g. `<ActivityIcon />`), rendered in a
     * fixed-size box so every row's label starts at the same x. Avoid emoji —
     * they render as a fixed system glyph and do not take the theme's colour,
     * so an urgent shelf item and a quiet one end up looking the same.
     */
    icon?: ReactNode;
    /** Unread/waiting count. Zero renders no badge rather than a "0". */
    count?: number;
    /**
     * Draws the count in the alert colour. An @-mention is not the same kind of
     * pending as "there is traffic"; the rail should not make you open it to
     * find out which one this is.
     */
    urgent?: boolean;
}

export declare interface ConversationShelfProps {
    items: readonly ConversationShelfItem[];
    activeId?: string | null;
    onSelect: (id: string) => void;
    compact?: boolean;
    iconOnly?: boolean;
    /**
     * `sm` (default) is the 13px shelf. `md` (2.386.0) is the Documents
     * explorer's quick views: 15px labels and 18px icons on 36px rows, the
     * scale of the Folders tree under them.
     */
    size?: 'sm' | 'md';
    className?: string;
    'data-testid'?: string;
}

/**
 * How a conversation LIST row stamps itself.
 *
 * A transcript row can show a bare `21:52` because a day separator sits above
 * it. An inbox row has no such context: the same `21:52` beside a channel
 * nobody has touched since Sunday reads as tonight, and — when the hour is
 * later than the current one — as the future. The stamp has to say which day
 * it means, in the width of a rail.
 *
 * So: the time for today, the word for yesterday, a short weekday inside the
 * week, and a numeric date beyond it. Same shape Teams and Slack use in their
 * rails, and the same six-day window as `dayLabel` — "Mon" a week and a day
 * ago is the wrong Monday. Pair it with `fullTimestampLabel` as the `title`
 * so the exact moment is one hover away.
 *
 * The activity feed stamps its rows the same way and for the same reason, so
 * this is the one copy of the rule rather than one per list.
 *
 * `now` is injectable for the same reason it is on `dayLabel`: the answer
 * changes at midnight and a test cannot wait for it.
 */
export declare function conversationStamp(isoString: string, now?: Date): string;

export declare function ConversationStart({ title, body, onStart, startLabel, startDescription, rooms, onAddToRoom, people, onShareWith, busy, receipt, searchAbove, 'data-testid': testId, }: ConversationStartProps): JSX.Element;

export declare interface ConversationStartDestination {
    /** The host's key for the destination — a channel, a user id. */
    id: string;
    /** What to call it: `#design`, `Hank Anderson`. */
    label: string;
    icon?: ReactNode;
}

export declare interface ConversationStartProps {
    /** Default "No conversation yet". */
    title?: string;
    /** Default names the three choices. */
    body?: string;
    /** Present, the first row: make a new conversation about this. */
    onStart?: () => void;
    /** Default "Start a conversation". */
    startLabel?: string;
    /** What starting makes. Default "A new room, named after this page". */
    startDescription?: string;
    /** Conversations that already exist. Empty: the row is disabled, not hidden — it still says the choice exists. */
    rooms?: readonly ConversationStartDestination[];
    onAddToRoom?: (id: string) => void;
    /** People it could be sent to. */
    people?: readonly ConversationStartDestination[];
    onShareWith?: (id: string) => void;
    /** Something is in flight — every row waits. */
    busy?: boolean;
    /** What the last attempt did, under the intro. */
    receipt?: ConversationStartReceipt | null;
    /** Lists longer than this get a search box. Default 6. */
    searchAbove?: number;
    'data-testid'?: string;
}

export declare interface ConversationStartReceipt {
    tone: 'success' | 'error';
    text: string;
    /** An optional way onward — "Open the chat" after sending to a person. */
    actionLabel?: string;
    onAction?: () => void;
}

export declare function ConversationSurface({ name, description, online, avatarUrl, features, children, canvas, members, memberCount, files, thumbnailSrc, documents, onOpenDocument, onRename, onCreateDocument, onCreateWhiteboard, pins, onUnpin, mentions, onOpenMention, recordings, onOpenRecording, onJumpToMessage, onStartCall, callModeFixed, onWatch, watchLabel, watchHint, watchViewerCount, callInProgress, headerActions, view: controlledView, onViewChange, className, 'data-testid': testId, }: ConversationSurfaceProps): JSX.Element;

export declare interface ConversationSurfaceProps {
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
    /** Controlled view. Omit to let the surface keep its own. */
    view?: ConversationFeature;
    onViewChange?: (view: ConversationFeature) => void;
    className?: string;
    'data-testid'?: string;
}

export declare function CreateChannelDialog({ open, teamName, busy, anchor, placement, onCreate, onClose, 'data-testid': testId, }: CreateChannelDialogProps): JSX.Element;

export declare interface CreateChannelDialogInput {
    name: string;
    description?: string;
    privacy: ChannelPrivacy;
}

export declare interface CreateChannelDialogProps {
    open: boolean;
    teamName: string;
    busy?: boolean;
    /** The control that opened it. The popover hangs off this; without it, it centres. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    /** Reject with a reason (e.g. a duplicate name) and it shows inline. */
    onCreate: (input: CreateChannelDialogInput) => Promise<void> | void;
    onClose: () => void;
    'data-testid'?: string;
}

/** One line for a host: `renderers={{ run: createRunPanelRenderer({ load, onOpenFull }) }}`. */
export declare function createRunPanelRenderer(options: CreateRunPanelRendererOptions): ChatSidePanelRenderer;

export declare interface CreateRunPanelRendererOptions {
    /** Fetches the run. Called on open, and again every `refreshMs` while the run is not terminal; a throw on open becomes the error state. */
    load: (panel: ChatSidePanelRef) => Promise<RunPanelData>;
    /** The footer's primary action: the full run page. */
    onOpenFull: (panel: ChatSidePanelRef, data: RunPanelData) => void;
    /** The footer's secondary action, offered when the run knows its conversation. */
    onOpenChat?: (panel: ChatSidePanelRef, data: RunPanelData) => void;
    /** "Open beside the chat" on the document row. */
    onOpenDocument?: (documentId: string) => void;
    /** Open the finished run's result — a panel, a document, a link. */
    onOpenResult?: (result: AgentRunResult) => void;
    /** Re-load interval while the run is running / awaiting. Default 2000; `0` disables. */
    refreshMs?: number;
    'data-testid'?: string;
}

export declare function CreateTeamDialog({ open, busy, anchor, placement, onCreate, onClose, 'data-testid': testId, }: CreateTeamDialogProps): JSX.Element;

export declare interface CreateTeamDialogInput {
    name: string;
    description?: string;
    visibility: TeamVisibility;
}

export declare interface CreateTeamDialogProps {
    open: boolean;
    busy?: boolean;
    /** The control that opened it. The popover hangs off this; without it, it centres. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    /** Reject with a reason (e.g. a name already taken) and it shows inline. */
    onCreate: (input: CreateTeamDialogInput) => Promise<void> | void;
    onClose: () => void;
    'data-testid'?: string;
}

/** Local calendar day of an ISO timestamp, as `YYYY-MM-DD`. Empty when unparseable. */
export declare function dayKeyOf(isoString: string): string;

/**
 * How the boundary calls itself: `Today`, `Yesterday`, a weekday inside the
 * last week, and an explicit date beyond that.
 *
 * "Today"/"Yesterday" are the words people actually use, and a bare weekday is
 * unambiguous for six days and actively misleading on the seventh — "Monday"
 * a week and a day ago is the wrong Monday — so the window stops at six.
 *
 * `now` is injectable because the whole point of this function is that it
 * changes answer at midnight, which is not something a test can wait for.
 */
export declare function dayLabel(isoString: string, now?: Date): string;

/**
 * The line between one day of a transcript and the next.
 *
 * `role="separator"` rather than a heading: it divides the flow, it is not a
 * section title you would navigate to, and a transcript with forty headings in
 * it makes a screen reader's heading list useless. The accessible name carries
 * the FULL date even though the visible text says "Today" — see
 * `fullDateLabel`.
 *
 * The rule is horizontal and decorative, so it is drawn with borders on the
 * flex children rather than an <hr>: an <hr> is itself a separator, and two
 * nested separators is one announcement too many.
 */
export declare function DaySeparator({ timestamp, now, tone, className }: DaySeparatorProps): JSX.Element | null;

export declare interface DaySeparatorProps {
    /** ISO timestamp of the first message of the day this separator opens. */
    timestamp: string;
    /** Injectable clock, so "Today" is testable. */
    now?: Date;
    tone?: 'light' | 'dark';
    className?: string;
}

export declare const DEFAULT_PICKER_EMOJIS: readonly ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯", "😀", "😅", "😉", "😍", "😘", "🤣", "🥰", "😇", "🤔", "😎", "😢", "😡", "🤯", "😱", "🙃", "🤩", "🙏", "🤝", "👋", "👌", "✌️", "🤞", "🤘", "🫶", "✨", "⭐", "💫", "🌟", "⚡", "💥", "☀️", "🌈", "🚀", "🎯", "🏆", "💪", "🎊", "🎈", "🥳", "🎁", "☕", "🍕", "🍔", "🍩", "🍦", "🍓", "🍻", "🍷", "👀", "🤖", "👻", "😺", "🐶", "🦄", "🐝", "🌸"];

/** One op as a sentence. Exported for the tests and for hosts that render a run outside the card. */
export declare function describeAgentRunOp(op: AgentRunOp): string;

/** The sentence the line shows; the fallback when the names are not on the wire. */
export declare function describeMembership(ref: MembershipRef, fallbackText?: string): string;

export declare function describeMembershipHistory(history: MembershipHistory | undefined): string;

/**
 * Names, not ids, and never more than two before it starts counting.
 *
 * Counts EVERY participant, including the ones it cannot name — they are
 * faces in the row beside this sentence, so leaving them out of the sentence
 * makes the two disagree about how many people were there.
 */
export declare function describeParticipants(participants: readonly CallActivityParticipant[], live: boolean): string;

/** "You and Ada", "Ada, Sam and 3 others" — the tooltip people expect. */
export declare function describeReactors(group: ReactionGroup): string;

/** "Mia Zhao and 2 others" — the sentence beside the avatar row. */
export declare function describeRecordingParticipants(participants: readonly RecordingParticipant[], total: number): string;

export declare function DocumentActivityCard({ documentId, title, icon, createdBy, editors, onOpen, className, 'data-testid': testId, }: DocumentActivityCardProps): JSX.Element;

export declare interface DocumentActivityCardProps {
    documentId: string;
    title: string;
    /** Emoji or short glyph from the document's type. */
    icon?: string;
    /** Who created it — a display name, never a raw userId. */
    createdBy?: string;
    /** People in the document right now. Empty means nobody. */
    editors?: readonly DocumentActivityEditor[];
    /**
     * Opens the document. Omit and the card is a record rather than a dead
     * button — a document the viewer cannot reach should not offer a way in.
     */
    onOpen?: (documentId: string) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface DocumentActivityEditor {
    userId: string;
    displayName?: string;
    avatarUrl?: string;
}

export declare function DocumentChip({ documentId, label, icon, onOpen, className, 'data-testid': testId }: DocumentChipProps): JSX.Element;

export declare interface DocumentChipProps {
    documentId: string;
    label: string;
    /** The document's own icon, when the reference carried one. */
    icon?: string;
    /** Open the document — beside the chat, or wherever the host puts documents. */
    onOpen?: (documentId: string) => void;
    className?: string;
    'data-testid'?: string;
}

/**
 * A document referenced by a message, whichever way it got there.
 *
 * Two features put a document into a conversation and each invented its own
 * metadata: the gateway announces a document CREATED in the channel as
 * `{ kind: 'document', documentId }`, and Share-to-room posts
 * `{ share: { kind: 'document', id, url } }`. They are the same fact —
 * "there is a document in this thread" — so they get the same card. Reading
 * both here rather than teaching each producer the other's shape keeps the
 * older wire format working unchanged.
 *
 * Returns null for anything that is not a document reference, including a
 * reference that names no document: a card with no target is an Open button
 * to nowhere.
 */
export declare function documentRefFromMetadata(metadata: Record<string, unknown> | undefined): {
    documentId: string;
    title: string;
    icon?: string;
    createdBy?: string;
} | null;

/**
 * The documents a message REFERS to — the composer's `#Roadmap` chips, carried
 * as `metadata.documents: [{ id, label }]`. Distinct from documentRefFromMetadata,
 * which is a document ARRIVING in the thread: a reference sits under the words,
 * an arrival replaces them. Malformed entries are dropped, duplicates collapse.
 */
export declare function documentRefsFromMetadata(metadata: Record<string, unknown> | undefined): Array<{
    id: string;
    label: string;
    icon?: string;
}>;

export declare const EMOJI_SHORTCODES: readonly EmojiShortcode[];

export declare interface EmojiShortcode {
    /** The code typed between colons, without them. */
    code: string;
    emoji: string;
    /** Extra search terms, so `:party:` finds 🎉 even though its code is `tada`. */
    keywords?: readonly string[];
}

/** Caps an excerpt on a word boundary so a quote never dominates its reply. */
export declare function excerpt(text: string, limit?: number): string;

export declare function FeedRow({ leading, title, timestamp, timestampIso, timestampTitle, meta, metaTone, actions, onJump, jumpLabel, unread, className, 'data-testid': testId, ...rest }: FeedRowProps): JSX.Element;

export declare interface FeedRowProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title' | 'children'> {
    /**
     * Left-hand visual: a thumbnail, an avatar, a glyph, a status disc. Rendered
     * OUTSIDE the jump so anything it announces survives — see above. Give it an
     * accessible name if it carries meaning, and `aria-hidden` if it does not.
     */
    leading: ReactNode;
    /**
     * Line one. `string`, not `ReactNode`, on purpose: it is also the line's
     * `title` attribute, and a caller who could pass markup could pass a second
     * line. Truncates.
     */
    title: string;
    /**
     * Right-aligned on the title line — already formatted, and short. A feed
     * column is read by shape ("14:03", "Yesterday", "Tue"), so a phrase like
     * "3 days ago" costs the reader arithmetic and cannot be scanned.
     *
     * Callers used to stuff this into `meta`, where it sat third in a run of
     * middle-dots and was the first thing to be truncated away.
     */
    timestamp?: string;
    /** ISO-8601 behind the stamp. Its presence is what makes the stamp a `<time>`. */
    timestampIso?: string;
    /** Hover text for the stamp — the full instant the abbreviation stands for. */
    timestampTitle?: string;
    /**
     * Line two: who, and where. Required, because a row whose second line is
     * sometimes absent is a list of two different heights. Truncates.
     */
    meta: string;
    /**
     * Colours line two when it carries a state rather than context — `danger`
     * for a run's error text, which read as ordinary grey metadata beside
     * "Hank Anderson · 180 KB". Omit for the quiet default.
     */
    metaTone?: Tone;
    /** Trailing controls — unpin, download, Approve/Reject. Never the jump: the row is the jump. */
    actions?: ReactNode;
    onJump?: () => void;
    /**
     * The jump's accessible name. It replaces the row's text for a screen
     * reader, so say where it goes: "Go to the pinned message from Hank".
     */
    jumpLabel?: string;
    /** Draws a dot over `leading` and reflects `data-unread` for selection. */
    unread?: boolean;
    /** Also spelled onto the jump as `<testid>-jump`, so it can be clicked by name. */
    'data-testid'?: string;
}

/** Hydration seam — see `ActivityPanelProps.fetchActivity`. */
export declare type FetchActivityFn = (args: {
    idToken: string | null;
    limit: number;
}) => Promise<ActivityResponse>;

export declare function formatBytes(bytes: number): string;

/** "12m 4s" — the shape a transcript wants, not "00:12:04". */
export declare function formatCallDuration(ms: number): string;

/** Formats an ISO timestamp string to HH:MM local time. */
export declare function formatChatTime(isoString: string): string;

/** "12:04" / "1:02:11" — a duration people read, not a millisecond count. */
export declare function formatDuration(ms?: number): string;

/** `84.2k`, `1.3M` — a token count is scale, not an exact figure. */
export declare function formatTokens(tokens: number): string;

/** The exact first line of a forwarded message's body. See above. */
export declare function forwardAttributionLine(from: ForwardedFrom): string;

/**
 * Where a forwarded message came from, carried in `metadata.forwardedFrom`.
 *
 * ## Why this is not `replyTo`
 *
 * `replyTo` already carries `{ messageId, author, text, timestamp }` and the
 * panel already renders it as a quote, so riding it was the obvious move and
 * it is wrong in three ways, each of which shows up in the product:
 *
 *   * `replyTo` MEANS "this answers that". `groupThreads` reads it and nests
 *     the message under its target whenever that target is in the loaded
 *     window — so forwarding a message back into the channel it came from
 *     would file the forward as a reply to the original, indented under it.
 *   * The quote block offers a jump to `messageId`. A forwarded message's
 *     original is in a DIFFERENT conversation, so the jump is guaranteed to
 *     find nothing — a control that goes nowhere, which the `onJumpToMessage`
 *     note above exists to avoid.
 *   * A reply quotes an excerpt and adds new words beneath it. A forward has
 *     no new words: the original text IS the body. Storing the same sentence
 *     in both `content` and `replyTo.text` gives two copies that disagree the
 *     moment anything edits one.
 *
 * ## No `text` field, on purpose
 *
 * The forwarded words live in the message's own `content`, once. This carries
 * only the facts a plain string cannot: which conversation, which person, and
 * when they said it.
 *
 * ## What a client that has never heard of this field shows
 *
 * The attribution is ALSO written into `content` by the host that posts the
 * forward ("Forwarded from #design — Hank Anderson:" above the words). That
 * is what makes an old client — or a notification preview, or the
 * conversation-list preview, none of which read metadata — show a forward
 * that still says whose words these are. Strip the attribution into metadata
 * alone and a forward degrades into an unattributed quote, which is the exact
 * thing forwarding exists to prevent. This field is therefore an ENRICHMENT
 * of the text, never a replacement for it, and the panel renders it as a
 * marker rather than by restating the sentence the body already carries.
 */
export declare interface ForwardedFrom {
    /** The original's server id. Not linkable from here — see above — but it is
     *  what lets a host dedupe, audit, or one day offer "open the original". */
    messageId: string;
    /** The channel key the original was said in. Plumbing; prefer the label. */
    channel: string;
    /** How that conversation calls itself — "design", "Carol Nguyen". */
    channelLabel?: string;
    /** The ORIGINAL author's display name, never the forwarder's. */
    author: string;
    /** The original author's stable user id, so an avatar or hovercard resolves. */
    authorUserId?: string;
    /** ISO: when the original was said, not when it was forwarded. */
    timestamp?: string;
}

/** Reads `metadata.forwardedFrom`, tolerating anything that is not the shape. */
export declare function forwardedFromMetadata(metadata: Record<string, unknown> | undefined): ForwardedFrom | null;

/**
 * "Forwarded from #design — Hank Anderson", from the metadata.
 *
 * The visible half of the marker, and — with a colon on the end, see
 * `forwardAttributionLine` — a byte-for-byte reproduction of the line a host
 * writes into the forwarded message's `content`. Exported so a host composes
 * its bodies with THIS function instead of its own copy of the sentence: the
 * two agreeing is what lets the panel recognise its own prefix, and a host
 * that rewords its copy silently loses the de-duplication below.
 */
export declare function forwardOriginLabel(from: ForwardedFrom): string;

/**
 * The unabbreviated date, for the separator's accessible name and for the
 * `title` on a row's HH:MM.
 *
 * "Today" is a fine thing to READ and a poor thing to be told by a screen
 * reader hours later in a saved transcript, so the announced name always
 * carries the real date as well.
 */
export declare function fullDateLabel(isoString: string): string;

/** Full local date AND time — the `title` of a row's truncated HH:MM. */
export declare function fullTimestampLabel(isoString: string): string;

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

/** Groups by emoji, preserving first-seen order so chips do not reshuffle. */
export declare function groupReactions(reactions: readonly MessageReaction[], currentUserId: string): ReactionGroup[];

export declare const HISTORY_DAYS_DEFAULT = 7;

export declare const HISTORY_DAYS_MAX = 3650;

export declare const HISTORY_DAYS_MIN = 1;

export declare function InlineMessageEditor({ initialText, onSave, onCancel, 'data-testid': testId }: InlineMessageEditorProps): JSX.Element;

export declare interface InlineMessageEditorProps {
    initialText: string;
    /** Resolves once the server has the new text; rejects with a reason to show. */
    onSave: (text: string) => Promise<void> | void;
    onCancel: () => void;
    'data-testid'?: string;
}

declare type InlinePopoverPlacement = 'bottom-start' | 'bottom-end' | 'right';

/** A person who can be invited. Thin on purpose so callers can map a
 *  presence roster straight in without dragging in PresenceUser. */
declare interface InviteCandidate {
    userId: string;
    /** Pre-resolved display name — callers MUST pass a human name, never
     *  a raw id/UUID (mirrors ResumeCallParticipant's contract). */
    name: string;
    avatarUrl?: string;
    /** True when this person is already on the call. Rendered as a
     *  non-selectable "In call" row so the list still reads as the full
     *  roster rather than mysteriously omitting people. */
    alreadyInCall?: boolean;
    /** True when they have been rung but have not answered yet. */
    pending?: boolean;
    /** Non-selectable for a reason that is NOT "already on this call" —
     *  e.g. an offline person a ring would never reach. Renders the same
     *  dimmed, non-clickable row without claiming "In call". Pair it with
     *  `statusLabel` so the row says WHY. */
    disabled?: boolean;
    /** Free-text right-hand annotation, e.g. "On a call" / "Offline".
     *  Purely informational — it does NOT affect selectability, so a
     *  caller can mark someone busy while still allowing a knock/join.
     *  `alreadyInCall` and `pending` keep their own fixed labels and win
     *  over this one. */
    statusLabel?: string;
    /** Presence: true → online dot, false → offline dot, undefined → no
     *  dot. Also drives which section a row lands in under `grouped`. */
    online?: boolean;
    /** Shown on offline rows when present, e.g. "Last seen 2h ago".
     *  Pre-formatted by the caller — this component never touches
     *  Date.now(). */
    lastSeenLabel?: string;
    /** Avatar brand color override (falls back to the name hash). */
    color?: string;
}

/** True when `command` is offered in `ctx`. */
export declare function isChatCommandInScope(command: Pick<ChatCommand, 'scope'>, ctx: ChatCommandScopeContext): boolean;

export declare function isImageAttachment(a: {
    contentType?: string;
}): boolean;

/**
 * Does a separator belong BETWEEN these two messages?
 *
 * `previous` is undefined for the first message in the list, which does get a
 * separator: the top of a transcript is a day boundary too, and without one
 * the oldest visible block is the only one on screen whose date is unstated.
 *
 * An unparseable timestamp never opens a new day. A malformed row is a data
 * problem; inventing a date heading for it would turn it into a reading
 * problem for every message under it.
 */
export declare function isNewDay(current: string, previous?: string): boolean;

/** A run that is still moving — the panel keeps re-reading it. */
export declare function isRunPanelLive(status: RunPanelStatus): boolean;

export declare interface LabEvent {
    id: string;
    at: string;
    kind: 'command' | 'text' | 'tool' | 'result' | 'error' | 'status' | 'iteration';
    text: string;
    /** Long form — a tool's arguments and output. Collapsed behind a disclosure. */
    detail?: string;
    /** True when the runtime that produced this frame was a mock. Always shown. */
    mock?: boolean;
}

/** Where a loop is. Mirrors the run status platform-api reports. */
export declare type LabStatus = 'planning' | 'starting' | 'running' | 'waiting' | 'done' | 'failed' | 'stopped' | 'budget';

export declare interface LabStep {
    id: string;
    title: string;
    kind: string;
    status: 'pending' | 'running' | 'done' | 'failed' | 'skipped';
    iterations?: number;
    contextTokens?: number;
}

export declare function LinkDialog({ open, initialText, initialHref, onSubmit, onRemove, onClose, 'data-testid': testId, }: LinkDialogProps): JSX.Element;

export declare interface LinkDialogProps {
    open: boolean;
    /** Selected text at the time the dialog opened; prefills the label. */
    initialText?: string;
    /** Existing href when editing a link rather than creating one. */
    initialHref?: string;
    onSubmit: (value: LinkDialogValue) => void;
    onRemove?: () => void;
    onClose: () => void;
    'data-testid'?: string;
}

export declare interface LinkDialogValue {
    href: string;
    /** The visible text. Empty means "keep whatever is selected". */
    text: string;
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
export declare interface LocalChatMessage {
    id: string;
    /** ISO. Decides where in the thread the message sits. */
    timestamp: string;
    displayName: string;
    content: string;
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

/** The command a draft is addressing, or null. `/doc`, `/doc …`, never `/document`. */
export declare function matchComposerCommand(draft: string, commands: readonly ComposerCommand[] | undefined): ComposerCommand | null;

export declare interface MembershipHistory {
    mode: MembershipHistoryMode;
    days?: number;
}

export declare type MembershipHistoryMode = 'none' | 'days' | 'all';

export declare function MembershipNotice({ membership, fallbackText, timestamp, className, 'data-testid': testId, }: MembershipNoticeProps): JSX.Element;

export declare interface MembershipNoticeProps {
    membership: MembershipRef;
    /** The message text — what the line says when the names are missing. */
    fallbackText?: string;
    timestamp?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface MembershipRef {
    event: 'added' | 'removed';
    actorId: string;
    actorName?: string;
    userIds: string[];
    names?: string[];
    history?: MembershipHistory;
}

/**
 * A membership event: `metadata.kind === 'membership'`. Rendered as a system
 * line — "Eve added Carol · history from the last 7 days" — not a bubble.
 */
export declare function membershipRefFromMetadata(metadata: Record<string, unknown> | undefined): MembershipRef | null;

export declare function MembersPanel({ members, open, canManage, currentUserId, onAdd, onRemove, className, 'data-testid': testId, }: MembersPanelProps): JSX.Element;

export declare interface MembersPanelProps {
    members: readonly ChatMember[];
    /** True when the channel gates nobody — everyone in the org can read it. */
    open?: boolean;
    /** The viewer may add and remove (an owner). */
    canManage?: boolean;
    currentUserId?: string;
    /**
     * "Add people". Receives the button that was pressed, so the host can open
     * an anchored form beside it rather than a centred modal.
     */
    onAdd?: (trigger?: HTMLElement) => void;
    onRemove?: (userId: string) => void;
    className?: string;
    'data-testid'?: string;
}

/** Later commands win by trigger (case-insensitive); the first occurrence keeps its position. */
export declare function mergeChatCommands(...layers: ReadonlyArray<readonly ChatCommand[] | undefined>): ChatCommand[];

export declare function MessageActionBar({ quickReactions, onReact, onOpenReactionPicker, onReply, onForward, onTogglePin, pinned, onCopyLink, onEdit, onDelete, className, 'data-testid': testId, }: MessageActionBarProps): JSX.Element | null;

export declare interface MessageActionBarProps {
    /** Emoji offered inline. Keep it short; the picker covers the rest. */
    quickReactions?: readonly string[];
    onReact?: (emoji: string) => void;
    /**
     * Opens the full emoji picker, at the button that asked for it. Omit to show
     * only the quick row.
     */
    onOpenReactionPicker?: (trigger: HTMLElement) => void;
    onReply?: () => void;
    /**
     * Send this message to ANOTHER conversation.
     *
     * Sits next to Reply because the two are the same gesture pointed different
     * ways — reply keeps the message where it is, forward moves a copy
     * somewhere else — and putting it after Pin would bury it among the
     * channel-admin controls, which is not what it is.
     *
     * Absent means this message cannot be forwarded, and nothing renders. That
     * is a real state rather than a permission: a card or a system notice is
     * not a thing you can relocate (see ChatPanel's `onForwardMessage`), so a
     * disabled Forward would be a promise the product will not keep — the same
     * rule `onTogglePin` follows above.
     *
     * Hands back the BUTTON that was pressed, so the destination picker can
     * open against it instead of in the middle of a dimmed page. Same hand-back
     * `RailSectionHeader` does for the rail's + buttons, and the reason is the
     * same: only the bar knows which of the transcript's many Forward buttons
     * this click came from, and the host that owns the picker cannot ask.
     */
    onForward?: (trigger: HTMLElement) => void;
    /** Pin/unpin. Absent means this viewer may not pin here — the control is
     *  then not rendered at all, rather than rendered disabled: a greyed pin is
     *  a promise the product will not keep. */
    onTogglePin?: () => void;
    pinned?: boolean;
    onCopyLink?: () => void;
    /** Own-message actions. Absent for other people's messages. */
    onEdit?: () => void;
    onDelete?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare function MessageBody({ html, text, className, 'data-testid': testId }: MessageBodyProps): JSX.Element;

export declare interface MessageBodyProps {
    /** Rich body from the composer. When absent, `text` is rendered plainly. */
    html?: string;
    /** Plain-text fallback — also what a client that cannot render HTML shows. */
    text: string;
    className?: string;
    'data-testid'?: string;
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

export declare interface MessageReaction {
    emoji: string;
    /** Who reacted. Drives the count, the "you" state, and the tooltip. */
    userId: string;
    displayName?: string;
}

export declare function MessageRow({ author, content, timestamp, avatarUrl, hideAvatar, hideAuthor, mine, footer, tone, editedAt, contentLayout, className, }: MessageRowProps): JSX.Element;

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
    /**
     * This row is the viewer's own message.
     *
     * Mirrors what Teams and iMessage do, and for the same reason: in a busy
     * thread the question "which of these did I write" is answered constantly
     * and answering it by reading names is work. The row flips to the other
     * side and takes a tinted bubble, so the shape of the conversation is
     * legible before any of it is read.
     *
     * The avatar goes with it — a own-side bubble with a left-hand avatar reads
     * as somebody else's message that has drifted right.
     */
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
    /** ISO: when the text was last changed. Renders "(edited)" after the time. */
    editedAt?: string;
    /**
     * How the content span is laid out. Defaults to `'inline'` — the
     * shrink-to-fit tinted bubble (`max-w-[85%]`, padded, right-aligned text)
     * this component has always used, sized for plain chat text.
     *
     * `'block'` is for a card body (an `AgentRunCard`, a document/deck
     * preview, an attachment) instead of text. Those cards size themselves to
     * their CONTAINER (`AgentRunCard` uses a `@container` query, so its
     * intrinsic inline size is 0) — inside the `'inline'` bubble, which has no
     * width of its own beyond its shrink-to-fit content, that container
     * collapses to a few px and the card's contents wrap letter-by-letter in
     * a sliver on the right. `'block'` renders the span as a full-width block
     * up to a cap (`w-full max-w-[36rem]`) with no tint/padding, so the card
     * gets real horizontal room to size against — still right-aligned via the
     * column's `items-end`, not via `text-align`.
     *
     * Only changes anything on a `mine` row — a non-`mine` row never had the
     * shrink-to-fit bubble to begin with, so this prop is a no-op there
     * regardless of its value.
     */
    contentLayout?: 'inline' | 'block';
    className?: string;
}

export declare function NewChatDialog({ open, candidates, anchor, placement, busy, error, onStart, onClose, 'data-testid': testId, }: NewChatDialogProps): JSX.Element | null;

export declare interface NewChatDialogProps {
    open: boolean;
    /** Everyone who can be messaged. Already-selectable; presence drives grouping. */
    candidates: InviteCandidate[];
    /** The control that opened it. Without one the shell centres — the fallback, not the intent. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    busy?: boolean;
    /** A refusal from the server, shown in place without moving the footer. */
    error?: string | null;
    onStart: (userIds: string[]) => void | Promise<void>;
    onClose: () => void;
    'data-testid'?: string;
}

export declare function NewConversationPanel({ people, onStartDm, onCreateChannel, onCancel, peopleError, busy, className, 'data-testid': testId, }: NewConversationPanelProps): JSX.Element;

export declare interface NewConversationPanelProps {
    people: readonly NewConversationPerson[];
    /** Start (or open) a direct conversation with this person. */
    onStartDm: (userId: string) => void | Promise<void>;
    /** Create a channel with this name. Omit to disable channel creation. */
    onCreateChannel?: (name: string) => void | Promise<void>;
    onCancel?: () => void;
    /**
     * Set when the directory fetch FAILED. An empty list and a failed fetch look
     * identical on screen otherwise, and "no one to talk to" is a much stronger
     * claim than "we could not ask".
     */
    peopleError?: string | null;
    busy?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare interface NewConversationPerson {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    color?: string;
    /** Secondary line — role, team, or handle. */
    hint?: string;
}

/**
 * Accepts what people actually paste.
 *
 * `example.com` is a URL to everyone except a URL parser, so a bare host gets
 * https://. Anything with a scheme is left alone — including mailto: and
 * relative paths, which a naive prefix would corrupt.
 */
export declare function normalizeHref(raw: string): string;

declare type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_2 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_3 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_4 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_5 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_6 = (handler: (msg: GatewayMessage_2) => void) => () => void;

/** The command a sent draft addresses and its argument, or null when the draft is plain text. */
export declare function parseChatCommand<C extends ComposerCommand = ChatCommand>(text: string, commands: readonly C[] | undefined): {
    command: C;
    argumentText: string;
} | null;

/** The two halves of a run panel id, split at the first `:`; null when either half is missing. */
export declare function parseRunPanelId(id: string): {
    pipelineId: string;
    runId: string;
} | null;

export declare interface PinnedMessageItem {
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

export declare function PinnedMessagesPanel({ pins, onJump, onUnpin, className, 'data-testid': testId, }: PinnedMessagesPanelProps): JSX.Element;

export declare interface PinnedMessagesPanelProps {
    pins: readonly PinnedMessageItem[];
    onJump?: (messageId: string) => void;
    /** Omit to render a read-only panel — e.g. for someone who may not unpin. */
    onUnpin?: (messageId: string) => void;
    className?: string;
    'data-testid'?: string;
}

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

export declare function QuoteBlock({ quote, onJump, onDismiss, className, 'data-testid': testId, }: QuoteBlockProps): JSX.Element;

export declare interface QuoteBlockProps {
    quote: QuotedMessage;
    /** Jumps to the original. Omit when the original is unreachable (deleted,
     *  or outside a window this client cannot load) — the quote then reads as
     *  what it is, a record of something said, rather than a dead control. */
    onJump?: (messageId: string) => void;
    /** Removes the quote — only meaningful in the composer. */
    onDismiss?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface QuotedMessage {
    messageId: string;
    author: string;
    /** ISO timestamp of the quoted message. */
    timestamp?: string;
    /** Plain text of the original. Trimmed for display; the full text is not needed. */
    text: string;
}

export declare interface RailSectionAction {
    /** The accessible name and the tooltip — "Create a channel", not "+". */
    label: string;
    /** Defaults to a plus. */
    icon?: ReactNode;
    /** Receives the button itself, so an anchored popover can point at it. */
    onClick: (trigger: HTMLElement) => void;
    'data-testid'?: string;
}

export declare function RailSectionHeader({ label, actions, presentational, collapsed, onToggleCollapse, controls, toggleId, collapsedCount, dark, className, 'data-testid': testId, }: RailSectionHeaderProps): JSX.Element;

export declare interface RailSectionHeaderProps {
    label: string;
    /** Right-aligned, in order. Usually one +. */
    actions?: readonly RailSectionAction[];
    /**
     * The heading names the list that follows, and that list already carries
     * the same name — announcing both is the label twice. Sections whose list
     * is NOT separately named should pass false.
     *
     * Ignored once the header is a disclosure: the label is then the control's
     * own name, and a control that is `aria-hidden` cannot be reached or
     * announced at all. See `toggleId` for how the name stays said once.
     */
    presentational?: boolean;
    /**
     * Given together with `onToggleCollapse`, the whole label becomes the
     * disclosure control — a target the width of the heading, the way Teams and
     * Slack fold their rail sections, rather than a 12px chevron people miss.
     *
     * Controlled on purpose. Collapsing a section is a preference, not a
     * transient: the host owns the state so it can persist it and have the rail
     * come back the way it was left.
     */
    collapsed?: boolean;
    /** Fires with the state the host should switch to. */
    onToggleCollapse?: (next: boolean) => void;
    /** Id of the region this header folds away, for `aria-controls`. */
    controls?: string;
    /**
     * Put on the disclosure button itself, so the region it controls can point
     * an `aria-labelledby` back at it instead of repeating the same word in its
     * own `aria-label`. That is what keeps the name said once now that
     * `presentational` can no longer hide the heading.
     */
    toggleId?: string;
    /**
     * Unread hiding under a collapsed section — rendered only while collapsed.
     *
     * Collapsing is only safe to reach for if the rail still tells you when
     * something arrived in what you folded away; without it, hiding a section is
     * the same as muting it by accident.
     */
    collapsedCount?: number;
    /** Light-on-dark, for a rail sitting on call chrome. */
    dark?: boolean;
    className?: string;
    'data-testid'?: string;
}

/**
 * What the rail currently points at. One value, because one pane.
 */
export declare type RailSelection = {
    kind: 'shelf';
    id: string;
} | {
    kind: 'conversation';
    channel: string;
};

export declare function ReactionChips({ reactions, currentUserId, onToggle, className, 'data-testid': testId, }: ReactionChipsProps): JSX.Element | null;

export declare interface ReactionChipsProps {
    reactions: readonly MessageReaction[];
    /** The viewer, so their own reactions can be marked and toggled. */
    currentUserId: string;
    onToggle: (emoji: string) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface ReactionGroup {
    emoji: string;
    count: number;
    mine: boolean;
    names: string[];
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

export declare function RecordingActivityCard({ recordingId, title, recordedBy, participants, participantCount, startedAt, durationMs, thumbnailUrl, stage, transcriptReady, summaryReady, expiresAt, pinned, onOpen, onCopyLink, onShare, onTogglePin, onDownload, onOpenTranscript, onManageExpiry, onParticipantClick, className, 'data-testid': testId, }: RecordingActivityCardProps): JSX.Element;

export declare interface RecordingActivityCardProps {
    recordingId: string;
    /** "Recording" unless the host names it — "Design review", say. */
    title?: string;
    /** Who the recording is by — the person who started the call. */
    recordedBy?: string;
    /** Who was in the call. Real people: names and avatars, not counts. */
    participants?: readonly RecordingParticipant[];
    /** When the list is a sample: the true headcount. */
    participantCount?: number;
    /** ISO. When it was recorded. */
    startedAt?: string;
    durationMs?: number;
    /** The recording's own thumbnail. Absent, the participants stand in as tiles. */
    thumbnailUrl?: string;
    stage?: RecordingStage;
    transcriptReady?: boolean;
    summaryReady?: boolean;
    /** ISO. The "Set to expire" line. */
    expiresAt?: string;
    /** Pinned in the conversation. */
    pinned?: boolean;
    /** Opens the recording (its page or player). Absent, the card is a record, not a button. */
    onOpen?: (recordingId: string) => void;
    onCopyLink?: (recordingId: string) => void;
    /** Mints a share link (who it works for is the host's business). */
    onShare?: (recordingId: string) => void;
    onTogglePin?: (recordingId: string) => void;
    onDownload?: (recordingId: string) => void;
    onOpenTranscript?: (recordingId: string) => void;
    /** "View or change" on the expiry line. */
    onManageExpiry?: (recordingId: string) => void;
    onParticipantClick?: (participantId: string) => void;
    className?: string;
    'data-testid'?: string;
}

/**
 * What a recording card knows. The chat message stamps what was true when
 * it was posted (`recordingRefFromMetadata`); the host's `recordingStatus`
 * overlays what is true now — the stage, the thumbnail once composed, the
 * expiry — the way `agentRunStatus` does for run cards.
 */
export declare interface RecordingCardStatus {
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

export declare interface RecordingParticipant {
    id: string;
    name: string;
    avatarUrl?: string;
    color?: string;
}

/**
 * A recording card: `metadata.kind === 'recording'` with the recording's id.
 * Posted by the recording pipeline the moment the recording is saved.
 */
export declare function recordingRefFromMetadata(metadata: Record<string, unknown> | undefined): (RecordingCardStatus & {
    recordingId: string;
    callId?: string;
    stage: RecordingStage;
}) | null;

/** Where the recording is on its way to being watchable. */
/** `gone`: the recording no longer exists — expired or removed — so the card is the record of a thing that was. */
export declare type RecordingStage = 'saving' | 'transcribing' | 'summarizing' | 'ready' | 'failed' | 'gone';

declare interface RoomItem {
    roomId: string;
    /** `room:<slug>` — a room's chat channel is its call lobby. */
    channelId: string;
    /** As sent by the API; `channelId` is derived from it when absent. */
    slug?: string;
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

export declare function RunPanelBody({ panel, api, options }: RunPanelBodyProps): ReactNode;

declare interface RunPanelBodyProps {
    panel: ChatSidePanelRef;
    api: ChatSidePanelApi;
    options: CreateRunPanelRendererOptions;
}

/** What the condensed panel shows. The host builds it from the run snapshot and the pipeline definition. */
export declare interface RunPanelData {
    pipelineId: string;
    runId: string;
    /** "Call transcription", not `call-transcription`. Falls back to the id. */
    pipelineName?: string;
    /** The chat command that started the run — `/doc`, `/summarize`. */
    command?: string;
    /** What the person asked for, in their words. */
    instruction?: string;
    status: RunPanelStatus;
    /** ISO timestamps. */
    startedAt?: string;
    completedAt?: string;
    /** Why it failed, when it did. */
    error?: string;
    steps: AgentRunStep[];
    /** What the run changed, in the document-ops vocabulary. */
    ops?: AgentRunOp[];
    /** The document the run worked on, when it worked on one. */
    document?: {
        id: string;
        title?: string;
        snippet?: string;
    };
    /** What a finished run produced, when it is something a reader can open. */
    result?: AgentRunResult;
    /** The conversation the run's card was posted in, when known. */
    channel?: string;
    /** The card's message id in that conversation, when known. */
    messageId?: string;
}

/** `<pipelineId>:<runId>` — the panel id for a run. */
export declare function runPanelId(pipelineId: string, runId: string): string;

/** The run's status, in the card's phase vocabulary (mirrors realtime-modules' `PipelineRunPhase`). */
export declare type RunPanelStatus = AgentRunPhase;

/** The condensed run, given its data. `createRunPanelRenderer` wraps it with loading, error and refresh. */
export declare function RunSummaryPanel({ data, onOpenFull, onOpenChat, onOpenDocument, onOpenResult, className, 'data-testid': testId }: RunSummaryPanelProps): JSX.Element;

export declare interface RunSummaryPanelProps {
    data: RunPanelData;
    onOpenFull: () => void;
    /** Offered only when the run knows its conversation. */
    onOpenChat?: () => void;
    onOpenDocument?: (documentId: string) => void;
    onOpenResult?: (result: AgentRunResult) => void;
    className?: string;
    'data-testid'?: string;
}

/**
 * Ranks shortcodes for a query.
 *
 * Prefix matches on the CODE come first: someone typing `:fi` means `fire`,
 * not `crossed_fingers` — a plain substring search buries the obvious answer
 * under coincidental matches, which is the difference between autocomplete
 * that feels instant and autocomplete you have to read.
 */
export declare function searchEmoji(query: string, list?: readonly EmojiShortcode[], limit?: number): EmojiShortcode[];

/** Reads the panel a query string names, `doc` first; null when it names none. */
export declare function sidePanelFromSearch(search: string | URLSearchParams | undefined): ChatSidePanelRef | null;

/**
 * Writes `panel` into `search` (an existing query string, or nothing) and
 * returns the new params. `null` closes: it removes `doc`, `panel` and every
 * `panel.*` entry.
 */
export declare function sidePanelToSearch(panel: ChatSidePanelRef | null, search?: string | URLSearchParams): URLSearchParams;

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

export declare interface TeamChannelItem {
    channel: string;
    name: string;
    unreadCount?: number;
    mentioned?: boolean;
    muted?: boolean;
    private?: boolean;
    live?: boolean;
    /** Pinned WITHIN its team — see `onTogglePinChannel` on the tree props. */
    pinned?: boolean;
}

export declare function TeamChannelTree({ teams, activeChannel, onSelectChannel, onToggleTeam, onCreateChannel, onManageTeam, onLeaveTeam, onTogglePinTeam, onTogglePinChannel, onCreateTeam, heading, filter, collapsed, onToggleCollapse, className, 'data-testid': testId, }: TeamChannelTreeProps): JSX.Element;

export declare interface TeamChannelTreeProps {
    teams: readonly TeamTreeItem[];
    activeChannel?: string | null;
    onSelectChannel: (channel: string) => void;
    /** Controls expansion when given; the tree keeps its own state when absent. */
    onToggleTeam?: (teamId: string, expanded: boolean) => void;
    /**
     * The + on a team row. Receives the button itself so the host can hang the
     * create form off it — beside the team it is creating in, not centred over
     * the whole app.
     */
    onCreateChannel?: (teamId: string, trigger: HTMLElement) => void;
    /** "Manage team" in the team's ⋯ menu. */
    onManageTeam?: (teamId: string) => void;
    /** "Leave team" in the team's ⋯ menu. */
    onLeaveTeam?: (teamId: string) => void;
    /**
     * "Pin" / "Unpin" in the team's ⋯ menu — same language as `ConversationList`'s
     * `onTogglePin`. Pinned teams sort before unpinned ones (stable within each
     * group; see the sort below).
     */
    onTogglePinTeam?: (teamId: string, next: boolean) => void;
    /**
     * Pin / unpin one channel inside its team. Unlike a team's ⋯ menu, a channel
     * row has no menu today, so this is offered as a single hover-revealed
     * button rather than opening a `DropdownMenu` for one action — see the
     * render below for why. A pinned channel sorts before its unpinned siblings
     * but stays inside its team: the tree is a hierarchy, and lifting a channel
     * out into a flat "Pinned" group would be a second structure fighting the
     * first. A flat, cross-team Pinned group (if the host wants one) is the
     * host's business, built from this same `pinned` field.
     */
    onTogglePinChannel?: (channel: string, next: boolean) => void;
    /** The + on the "Teams" heading. Receives the button, for the same reason. */
    onCreateTeam?: (trigger: HTMLElement) => void;
    /** Hides the "Teams" heading for a host that draws its own. */
    heading?: string | false;
    /**
     * The rail's "Find a chat" text, so a channel inside a team can be found by
     * typing its name.
     *
     * The rail filtered its FLAT rows and left the tree alone, so a channel that
     * lived in a team was unreachable by search — typing "standups" returned
     * nothing while #Standups sat one fold away. Teams and Slack both find
     * channels this way and it is how people expect to reach one they are not
     * already looking at.
     *
     * While filtering, a matching team is shown OPEN regardless of how it was
     * left — and without disturbing that: the reader's own expansion is
     * untouched underneath and returns intact when the box is cleared. A team
     * whose NAME matches keeps all its channels (you asked for the team); any
     * other shows only the channels that match.
     */
    filter?: string;
    /**
     * Folds the whole tree away behind its heading, the way the rail's other
     * sections fold. Controlled together with `onToggleCollapse` — the host owns
     * it so it can persist it, and the heading is inert without the handler.
     *
     * Distinct from a team's own expansion (`expanded` / `onToggleTeam`): that
     * opens one team's channels, this hides the Teams section outright, and
     * reopening it leaves every team exactly as expanded as it was.
     */
    collapsed?: boolean;
    /** Fires with the state the host should switch to. */
    onToggleCollapse?: (next: boolean) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface TeamTreeItem {
    teamId: string;
    name: string;
    avatarUrl?: string;
    channels: readonly TeamChannelItem[];
    expanded?: boolean;
    /** Pinned among the other teams — see `onTogglePinTeam` on the tree props. */
    pinned?: boolean;
}

export declare type TeamVisibility = 'org' | 'private';

/** Channel names are lowercase and hyphenated, like every chat product's. */
export declare function toChannelName(raw: string): string;

declare type Tone = (typeof TONES)[number];

declare const TONES: readonly ["neutral", "success", "warning", "danger", "info", "caution", "accent"];

export declare function TransferBubble({ transfer, mine, onCancel, className }: TransferBubbleProps): JSX.Element;

export declare interface TransferBubbleProps {
    transfer: ChatTransfer;
    /**
     * True when the viewer is the sender. Only the sender gets a cancel
     * affordance — a recipient cancelling someone else's upload is not a
     * feature, and offering the button implies a permission that does not exist.
     */
    mine?: boolean;
    onCancel?: (transferId: string) => void;
    className?: string;
}

export declare type TransferPhase = 'started' | 'transferring' | 'verifying' | 'complete' | 'failed' | 'cancelled';

/**
 * What the server could not fit in this message, if anything.
 *
 * Chat metadata has a size budget, and attachments share it with the rich
 * body, the mentions and the reply. Past the cap the server sheds the largest
 * keys and stamps `_truncated` / `_droppedKeys` on what survives.
 *
 * Rendering it is the whole point. Before this, an oversized send looked
 * IDENTICAL to a successful one — the text appeared, the three files the
 * sender had just watched upload were simply not there, and no part of the
 * product ever said so. A message that lost something has to admit it, or the
 * transcript is quietly lying about what was said.
 */
export declare function truncationFromMetadata(metadata: Record<string, unknown> | undefined): {
    droppedKeys: string[];
    labels: string[];
} | null;

/** Every command in scope of the nearest provider; `[]` outside one. */
export declare function useChatCommands(): ChatCommand[];

/** The renderer for `kind`, or null when nothing above registered one. */
export declare function useChatSidePanelRenderer(kind: string): ChatSidePanelRenderer | null;

/** Every renderer visible here, by kind; `{}` outside a provider. */
export declare function useChatSidePanelRenderers(): ChatSidePanelRenderers;

/**
 * Adds `commands` to the nearest provider while the caller is mounted. Pass a
 * stable array (module-level or memoised): a new array each render is a
 * re-registration each render.
 */
export declare function useRegisterChatCommands(commands: readonly ChatCommand[] | undefined): void;

/**
 * Runs the command a sent draft names. Resolves `null` when the draft is plain
 * text (send it as a message); throws when the command is out of scope or its
 * `run` rejects — the host toasts and keeps the draft.
 */
export declare function useRunChatCommand(): (text: string, ctx: ChatCommandRunContext) => Promise<ChatCommandOutcome | null>;

/**
 * Say the origin ONCE.
 *
 * The attribution is deliberately written into `content` (see `ForwardedFrom`)
 * so a client with no idea what `forwardedFrom` means still shows whose words
 * these are. A client that DOES understand it then had the same sentence
 * twice — once in the marker, once as the body's first line.
 *
 * The contract is one sentence: **the marker names the origin exactly when
 * the RENDERED body does not.** So the question is asked of whatever is
 * actually going to be shown — the plain text, or the rich body when there is
 * one — and never of the mere existence of `metadata.html`. An earlier version
 * declined on any rich body, which was wrong in the case rich bodies actually
 * occur: a forward carries no html until somebody EDITS it, and the edit path
 * sends html to match the new text, so the one message shape that could have
 * used this never got it.
 *
 * Three ways it declines, all landing on the same safe result — body untouched,
 * marker back to a bare "Forwarded" badge:
 *
 *   * NOT OURS. Somebody can type "Forwarded from the old thread — Bob:"
 *     themselves, and a forwarded body can begin with anything. The test is
 *     equality against the string generated from THIS message's metadata, not
 *     a pattern that matches the shape of one.
 *   * NOTHING LEFT. A pathological origin (a room and a name that together
 *     exceed the wire's message cap) makes the attribution the entire body.
 *     Stripping it would render an empty bubble, so it stays.
 *   * NOT A CLEAN LINE. The rich body spells the attribution across several
 *     elements, or runs it into the words without a break. See
 *     `htmlWithoutLeadingLine`.
 *
 * Both halves are returned because the caller renders `html` OVER `body` and
 * has to hand `MessageBody` a consistent pair — stripping one and not the
 * other is how the sentence comes back on the next edit.
 */
export declare function withoutForwardAttribution(content: string, from: ForwardedFrom | null, html?: string): {
    body: string;
    html?: string;
    stripped: boolean;
};

export { }


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
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
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
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
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
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
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
