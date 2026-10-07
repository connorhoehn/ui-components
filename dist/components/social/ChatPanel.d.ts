import { type ReactNode } from 'react';
import type { ChatMessage } from '../../hooks/useChat';
import { type DocumentActivityEditor, type DocumentUnavailableReason } from './DocumentActivityCard';
import { type CallActivityParticipant, type CallOutcome } from './CallActivityCard';
import { type RecordingParticipant, type RecordingStage } from './RecordingActivityCard';
import { type MembershipRef } from './MembershipNotice';
import { type AgentRunLoop, type AgentRunDecision, type AgentRunResult, type AgentRunReviewDecision, type AgentRunStatus, type AgentRunSuggestion } from './AgentRunCard';
import { type QuotedMessage } from './QuoteBlock';
import { type ChatAttachment, type ChatTransfer } from './ChatAttachment';
/**
 * A message that exists only in THIS viewer's thread — never sent, never
 * stored, gone on reload. The shape a `visibility: 'private'` command outcome
 * takes while its owner decides whether to post it: the card shows the run
 * moving (its `metadata` goes through the same `agent-run` reader as a real
 * message, so `agentRunStatus`, Open and Approve all work), a subdued note
 * says nobody else can see it, and `actions` are what the owner can do about
 * that — post it, dismiss it.
 */
export interface LocalChatMessage {
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
export interface ChatPanelProps {
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
/** How close to the bottom (px) still counts as "reading the live edge".
 *  Above this, incoming messages must not move the viewport. */
export declare const CHAT_AUTOSCROLL_THRESHOLD_PX = 64;
/** True when the scroller sits at (or within the threshold of) the bottom. */
export declare function isPinnedToBottom(el: {
    scrollHeight: number;
    scrollTop: number;
    clientHeight: number;
}, threshold?: number): boolean;
/**
 * What a screen reader is told when a message arrives.
 *
 * Deliberately NOT the message body verbatim past a short prefix: an
 * announcement interrupts whatever the user is reading, and a 900-character
 * paste read aloud in full is a denial of service on their attention. The
 * name and the opening clause are enough to decide whether to go and read it;
 * the transcript itself is right there.
 */
export declare function announcementFor(author: string, content: string, limit?: number): string;
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
export interface ForwardedFrom {
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
/** The exact first line of a forwarded message's body. See above. */
export declare function forwardAttributionLine(from: ForwardedFrom): string;
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
/** Reads `metadata.forwardedFrom`, tolerating anything that is not the shape. */
export declare function forwardedFromMetadata(metadata: Record<string, unknown> | undefined): ForwardedFrom | null;
export declare function callRefFromMetadata(metadata: Record<string, unknown> | undefined): {
    callId: string;
    live: boolean;
    durationMs?: number;
    startedAt?: string;
    outcome?: CallOutcome;
    recordingId?: string;
    audioOnly?: boolean;
    recorded?: boolean;
    notRecordedReason?: string;
    lobbyName?: string;
    participants: CallActivityParticipant[];
} | null;
/**
 * What a recording card knows. The chat message stamps what was true when
 * it was posted (`recordingRefFromMetadata`); the host's `recordingStatus`
 * overlays what is true now — the stage, the thumbnail once composed, the
 * expiry — the way `agentRunStatus` does for run cards.
 */
export interface RecordingCardStatus {
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
/**
 * A recording card: `metadata.kind === 'recording'` with the recording's id.
 * Posted by the recording pipeline the moment the recording is saved.
 */
export declare function recordingRefFromMetadata(metadata: Record<string, unknown> | undefined): (RecordingCardStatus & {
    recordingId: string;
    callId?: string;
    stage: RecordingStage;
}) | null;
/**
 * A membership event: `metadata.kind === 'membership'`. Rendered as a system
 * line — "Eve added Carol · history from the last 7 days" — not a bubble.
 */
export declare function membershipRefFromMetadata(metadata: Record<string, unknown> | undefined): MembershipRef | null;
export declare function ChatPanel({ messages, localMessages, onSend, disabled, onTyping, typingUsers, emptyState, composer, dock: dockSlot, currentUserId, reactionsFor, onToggleReaction, onReply, reply, onCancelReply, onForwardMessage, onCopyLink, onTogglePin, onEditMessage, onDeleteMessage, canEditMessage, canDeleteMessage, pinnedMessageIds, onJumpToMessage, highlightedMessageId, threaded, alignOwnMessages, documentEditors, documentUnavailable, callParticipants, agentRunStatus, onOpenRun, agentLoopStatus, onOpenLab, onOpenResult, onDecideRun, onReviewRun, onRetryRun, onJoinCall, onOpenRecording, onCopyRecordingLink, onShareRecording, onDownloadRecording, onOpenRecordingTranscript, onManageRecordingExpiry, recordingStatus, onOpenDocument, renderMessageReferences, tone, showHeader, fill, onLoadMore, hasMore, loadingMore, onSendFiles, transfers, currentActor, onCancelTransfer, attachmentSrc, onOpenAttachment, acceptFiles, maxFileSize, onFileError, readReceipts: readReceiptsProp, readReceiptsEnabled, unreadFrom, emojis, }: ChatPanelProps): import("react").JSX.Element;
//# sourceMappingURL=ChatPanel.d.ts.map