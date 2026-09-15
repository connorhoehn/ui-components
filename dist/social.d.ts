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

export declare function ChannelDocumentsPanel({ documents, onOpen, onCreate, className, 'data-testid': testId, }: ChannelDocumentsPanelProps): JSX.Element;

export declare interface ChannelDocumentsPanelProps {
    documents: readonly ChannelDocumentItem[];
    onOpen?: (documentId: string) => void;
    /** Omit for a viewer who may not create documents here. */
    onCreate?: () => void;
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
}

export declare function ChatPanel({ messages, localMessages, onSend, disabled, onTyping, typingUsers, composer, currentUserId, reactionsFor, onToggleReaction, onReply, onTogglePin, pinnedMessageIds, onJumpToMessage, highlightedMessageId, documentEditors, callParticipants, agentRunStatus, onOpenRun, onOpenResult, onDecideRun, onReviewRun, onJoinCall, onOpenDocument, tone, showHeader, fill, onLoadMore, hasMore, loadingMore, onSendFiles, transfers, currentActor, onCancelTransfer, attachmentSrc, onOpenAttachment, acceptFiles, maxFileSize, onFileError, emojis, }: ChatPanelProps): JSX.Element;

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
    /** Pin/unpin. Absent means this viewer may not pin — the control is hidden. */
    onTogglePin?: (message: ChatMessage) => void;
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
    /** Opens a document announced in the thread. */
    onOpenDocument?: (documentId: string) => void;
    /**
     * The message a jump just landed on. Highlighted so arriving somewhere in
     * the middle of a transcript says WHICH message you were sent to — without
     * it a jump scrolls and leaves you to guess. The caller clears it; the
     * panel does not own a timer.
     */
    highlightedMessageId?: string | null;
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
export declare function ChatSidePanel({ panel, onClose, onOpenFullPage, className, 'data-testid': testId }: ChatSidePanelProps): JSX.Element;

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
export declare function ChatSidePanelFrame({ title, subtitle, onClose, onOpenFullPage, actions, children, className, 'data-testid': testId, }: ChatSidePanelFrameProps): JSX.Element;

export declare interface ChatSidePanelFrameProps {
    title: string;
    /** A second clause under the title — "12 results", "Edited by Grace". */
    subtitle?: string;
    onClose: () => void;
    /** Renders "Open full page" when given. */
    onOpenFullPage?: () => void;
    /** Extra header controls, placed before "Open full page". */
    actions?: ReactNode;
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

declare type ConnectionState = 'connected' | 'connecting' | 'disconnected';

/** The views a conversation can offer. `chat` is the transcript itself. */
export declare type ConversationFeature = 'chat' | 'files' | 'documents' | 'pins' | 'mentions' | 'calls';

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
}

export declare function ConversationList({ items, grouped, sectionOrder, sortByRecency, maxVisible, activeChannel, onSelect, onNewChat, emptyLabel, tone, className, 'data-testid': testId, }: ConversationListProps): JSX.Element;

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

export declare function ConversationRail({ shelf, conversations, selected, onSelect, onNewChat, grouped, sectionOrder, maxVisible, emptyLabel, header, footer, className, 'data-testid': testId, }: ConversationRailProps): JSX.Element;

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
    /** Forwarded to the list: rows per group before a "Show N more" row. */
    maxVisible?: number;
    emptyLabel?: string;
    /** Above the shelf: a workspace switcher, a search field, a title. */
    header?: ReactNode;
    /** Below the list: a "you" row, a status control. */
    footer?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare function ConversationShelf({ items, activeId, onSelect, className, 'data-testid': testId, }: ConversationShelfProps): JSX.Element | null;

export declare interface ConversationShelfItem {
    id: string;
    label: string;
    /** Emoji or glyph. Kept short — this rail is narrow by design. */
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
    className?: string;
    'data-testid'?: string;
}

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

export declare function ConversationSurface({ name, description, online, avatarUrl, features, children, canvas, files, thumbnailSrc, documents, onOpenDocument, onCreateDocument, pins, onUnpin, mentions, onOpenMention, recordings, onOpenRecording, onJumpToMessage, onStartCall, callModeFixed, onWatch, watchLabel, watchHint, watchViewerCount, callInProgress, headerActions, view: controlledView, onViewChange, className, 'data-testid': testId, }: ConversationSurfaceProps): JSX.Element;

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
    files?: readonly ChannelFileItem[];
    /** Resolves a displayable image source; the download route is authenticated. */
    thumbnailSrc?: (a: ChatAttachment) => string | null | undefined;
    documents?: readonly ChannelDocumentItem[];
    onOpenDocument?: (documentId: string) => void;
    /** Omit for a viewer who may not create documents here. */
    onCreateDocument?: () => void;
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

export declare function formatBytes(bytes: number): string;

/** "12m 4s" — the shape a transcript wants, not "00:12:04". */
export declare function formatCallDuration(ms: number): string;

/** Formats an ISO timestamp string to HH:MM local time. */
export declare function formatChatTime(isoString: string): string;

/** "12:04" / "1:02:11" — a duration people read, not a millisecond count. */
export declare function formatDuration(ms?: number): string;

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

/** Later commands win by trigger (case-insensitive); the first occurrence keeps its position. */
export declare function mergeChatCommands(...layers: ReadonlyArray<readonly ChatCommand[] | undefined>): ChatCommand[];

export declare function MessageActionBar({ quickReactions, onReact, onOpenReactionPicker, onReply, onTogglePin, pinned, onCopyLink, onEdit, onDelete, className, 'data-testid': testId, }: MessageActionBarProps): JSX.Element;

export declare interface MessageActionBarProps {
    /** Emoji offered inline. Keep it short; the picker covers the rest. */
    quickReactions?: readonly string[];
    onReact?: (emoji: string) => void;
    /** Opens the full emoji picker. Omit to show only the quick row. */
    onOpenReactionPicker?: () => void;
    onReply?: () => void;
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
    className?: string;
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
    /** ISO-8601. */
    pinnedAt?: string;
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

/** Channel names are lowercase and hyphenated, like every chat product's. */
export declare function toChannelName(raw: string): string;

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
