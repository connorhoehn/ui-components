// frontend/src/components/ChatPanel.tsx
//
// Chat message panel — renders a scrollable list of attributed messages
// with an input field and Send button. Displays message author as
// displayName when available, falling back to the first 8 chars of clientId.

import { Fragment, useState, useRef, useEffect, type ClipboardEvent, type ReactNode } from 'react';
import type { ChatMessage } from '../../hooks/useChat';
import { MessageRow } from './MessageRow';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { FileInput } from '../forms/FileInput';
import { useDockedPanel } from '../shared/DockedPanelContext';
import { Button } from '../ui/Button';
import { PinIcon } from '../ui/Icons';
import { MessageBody } from './MessageBody';
import { DocumentActivityCard, type DocumentActivityEditor } from './DocumentActivityCard';
import { DocumentChip } from './DocumentChip';
import { CallActivityCard, type CallActivityParticipant } from './CallActivityCard';
import { RecordingActivityCard, type RecordingParticipant, type RecordingStage } from './RecordingActivityCard';
import { MembershipNotice, type MembershipRef, type MembershipHistory } from './MembershipNotice';
import { AgentRunCard, agentRunRefFromMetadata, type AgentRunDecision, type AgentRunResult, type AgentRunReviewDecision, type AgentRunStatus, type AgentRunSuggestion } from './AgentRunCard';
import { ReactionChips } from './ReactionChips';
import { MessageActionBar } from './MessageActionBar';
import { InlineMessageEditor } from './InlineMessageEditor';
import ConfirmDialog from '../shared/ConfirmDialog';
import { QuoteBlock } from './QuoteBlock';
import {
  AttachmentBubble,
  TransferBubble,
  isOwnTransfer,
  type ChatAttachment,
  type ChatTransfer,
} from './ChatAttachment';
import { ChatDropZone } from './ChatDropZone';
import { ReactionPickerPopover, DEFAULT_PICKER_EMOJIS } from './ReactionPickerPopover';
import { DaySeparator } from './DaySeparator';
import { isNewDay, fullTimestampLabel } from './dayBoundary';
import { TypingIndicator } from '../shared/TypingIndicator';
import { Avatar } from '../shared/Avatar';
import { VISUALLY_HIDDEN_STYLE } from '../shared/VisuallyHidden';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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
  content: string;
  metadata: Record<string, unknown>;
  actions?: Array<{ id: string; label: string; onSelect: () => void; primary?: boolean }>;
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
   * The viewer, so their own reactions can be marked and their own messages
   * can offer edit/delete. Without it reactions render but cannot be toggled
   * meaningfully — "did I react?" is unanswerable.
   *
   * Also the identity that decides which in-flight `transfers` are the
   * viewer's own (compared against `ChatTransfer.uploader`).
   */
  currentUserId?: string;
  /** Reactions on one message. Omit to render no reaction UI at all. */
  reactionsFor?: (messageId: string) => readonly { emoji: string; userId: string; displayName?: string }[];
  /** Toggles the viewer's reaction. Presence of this enables the react controls. */
  onToggleReaction?: (messageId: string, emoji: string) => void;
  /** Starts a quote-reply. Presence of this enables the reply control. */
  onReply?: (message: ChatMessage) => void;
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

  // ── Read receipts ─────────────────────────────────────────────────────
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
  readReceipts?: readonly { userId: string; displayName?: string; readAt: string }[];
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

  // ── Attachments ───────────────────────────────────────────────────────
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
export const CHAT_AUTOSCROLL_THRESHOLD_PX = 64;

/** True when the scroller sits at (or within the threshold of) the bottom. */
export function isPinnedToBottom(
  el: { scrollHeight: number; scrollTop: number; clientHeight: number },
  threshold = CHAT_AUTOSCROLL_THRESHOLD_PX,
): boolean {
  return el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * What a screen reader is told when a message arrives.
 *
 * Deliberately NOT the message body verbatim past a short prefix: an
 * announcement interrupts whatever the user is reading, and a 900-character
 * paste read aloud in full is a denial of service on their attention. The
 * name and the opening clause are enough to decide whether to go and read it;
 * the transcript itself is right there.
 */
export function announcementFor(author: string, content: string, limit = 120): string {
  const body = content.replace(/\s+/g, ' ').trim();
  if (!body) return `${author} sent a message`;
  return `${author}: ${body.length > limit ? `${body.slice(0, limit)}…` : body}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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
export function documentRefFromMetadata(
  metadata: Record<string, unknown> | undefined,
): { documentId: string; title: string; icon?: string; createdBy?: string } | null {
  if (!metadata) return null;

  if (metadata.kind === 'document' && typeof metadata.documentId === 'string' && metadata.documentId) {
    return {
      documentId: metadata.documentId,
      title: typeof metadata.title === 'string' ? metadata.title : '',
      icon: typeof metadata.icon === 'string' ? metadata.icon : undefined,
      createdBy: typeof metadata.createdBy === 'string' ? metadata.createdBy : undefined,
    };
  }

  const share = metadata.share as Record<string, unknown> | undefined;
  if (share && share.kind === 'document' && typeof share.id === 'string' && share.id) {
    return {
      documentId: share.id,
      title: typeof share.title === 'string' ? share.title : '',
      icon: typeof share.icon === 'string' ? share.icon : undefined,
      // Who WROTE the document, which is not usually who shared it. See the
      // card's fallback below for why this had to become a carried field.
      createdBy: typeof share.createdBy === 'string' ? share.createdBy : undefined,
    };
  }

  return null;
}

/**
 * The documents a message REFERS to — the composer's `#Roadmap` chips, carried
 * as `metadata.documents: [{ id, label }]`. Distinct from documentRefFromMetadata,
 * which is a document ARRIVING in the thread: a reference sits under the words,
 * an arrival replaces them. Malformed entries are dropped, duplicates collapse.
 */
export function documentRefsFromMetadata(
  metadata: Record<string, unknown> | undefined,
): Array<{ id: string; label: string; icon?: string }> {
  if (!metadata || !Array.isArray(metadata.documents)) return [];
  const seen = new Set<string>();
  const out: Array<{ id: string; label: string; icon?: string }> = [];
  for (const raw of metadata.documents) {
    if (!raw || typeof raw !== 'object') continue;
    const d = raw as Record<string, unknown>;
    if (typeof d.id !== 'string' || !d.id || seen.has(d.id)) continue;
    seen.add(d.id);
    out.push({
      id: d.id,
      label: typeof d.label === 'string' && d.label ? d.label : d.id,
      ...(typeof d.icon === 'string' && d.icon ? { icon: d.icon } : {}),
    });
  }
  return out;
}

/**
 * A call event, read off a message's metadata.
 *
 * The sibling of documentRefFromMetadata, and the same idea: the server
 * writes a sentence for anywhere that renders plain text, and the metadata
 * carries the facts the thread renders as a card.
 *
 * Liveness is POSITIVE evidence only. A stored message is replayed forever,
 * so inferring "still going" from a missing `endedAt` would put a Join button
 * on every call that ever happened, and after a reload the thread would
 * cheerfully advertise a call that ended three hours ago. The gateway posts
 * this event when a call ENDS — the durable fact a transcript wants is that a
 * call happened, who was in it and how long it took. A host that genuinely
 * knows a call is live right now says so through ChatPanel's
 * `callParticipants`; nothing here guesses.
 */
/** Internal metadata keys, in the words a reader would use for them. */
const DROPPED_KEY_LABELS: Record<string, string> = {
  attachments: 'files',
  html: 'formatting',
  mentions: 'mentions',
  replyTo: 'the quoted reply',
};

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
export function truncationFromMetadata(
  metadata: Record<string, unknown> | undefined,
): { droppedKeys: string[]; labels: string[] } | null {
  if (!metadata || metadata._truncated !== true) return null;
  const raw = Array.isArray(metadata._droppedKeys) ? metadata._droppedKeys : [];
  const droppedKeys = raw.filter((k): k is string => typeof k === 'string');
  // An older server stamps `_truncated` with no key list. Still worth saying
  // something happened — "part of this message" beats silence.
  return {
    droppedKeys,
    labels: droppedKeys.map((k) => DROPPED_KEY_LABELS[k] ?? k),
  };
}

export function callRefFromMetadata(
  metadata: Record<string, unknown> | undefined,
): {
  callId: string;
  live: boolean;
  durationMs?: number;
  audioOnly?: boolean;
  recorded?: boolean;
  notRecordedReason?: string;
  lobbyName?: string;
  participants: CallActivityParticipant[];
} | null {
  if (!metadata || metadata.kind !== 'call') return null;
  const callId = typeof metadata.callId === 'string' ? metadata.callId : '';
  // A card with no call cannot be joined and cannot be identified.
  if (!callId) return null;

  const raw = Array.isArray(metadata.participants) ? metadata.participants : [];
  const participants: CallActivityParticipant[] = raw
    .map((entry) => {
      const p = entry as Record<string, unknown>;
      const userId = typeof p?.userId === 'string' ? p.userId : '';
      return userId
        ? {
            userId,
            displayName: typeof p.displayName === 'string' ? p.displayName : undefined,
          }
        : null;
    })
    .filter(Boolean) as CallActivityParticipant[];

  return {
    callId,
    // Only an explicit flag, never the absence of one.
    live: metadata.live === true,
    durationMs: typeof metadata.durationMs === 'number' ? metadata.durationMs : undefined,
    // Tri-state: absent means the record does not say, and the card renders
    // an unqualified "Call" rather than guessing which kind it was.
    audioOnly: typeof metadata.audioOnly === 'boolean' ? metadata.audioOnly : undefined,
    // Same tri-state: a record written before recording decisions were
    // stamped says nothing, and the card must not read that as "recorded".
    recorded: typeof metadata.recorded === 'boolean' ? metadata.recorded : undefined,
    notRecordedReason: typeof metadata.notRecordedReason === 'string' ? metadata.notRecordedReason : undefined,
    lobbyName: typeof metadata.lobbyName === 'string' ? metadata.lobbyName : undefined,
    participants,
  };
}

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
export function recordingRefFromMetadata(
  metadata: Record<string, unknown> | undefined,
): (RecordingCardStatus & { recordingId: string; callId?: string; stage: RecordingStage }) | null {
  if (!metadata || metadata.kind !== 'recording') return null;
  const recordingId = typeof metadata.recordingId === 'string' ? metadata.recordingId : '';
  if (!recordingId) return null;
  const stageRaw = metadata.stage ?? (metadata.status === 'processing' ? 'saving' : metadata.status);
  const stage: RecordingStage =
    stageRaw === 'saving' || stageRaw === 'transcribing' || stageRaw === 'summarizing' || stageRaw === 'failed' ? stageRaw : 'ready';
  const raw = Array.isArray(metadata.participants) ? metadata.participants : [];
  const participants: RecordingParticipant[] = raw
    .map((entry) => {
      const p = entry as Record<string, unknown>;
      const id = typeof p?.userId === 'string' ? p.userId : typeof p?.id === 'string' ? p.id : '';
      if (!id) return null;
      const name = typeof p.displayName === 'string' && p.displayName ? p.displayName : typeof p.name === 'string' && p.name ? p.name : id;
      return { id, name, ...(typeof p.avatarUrl === 'string' ? { avatarUrl: p.avatarUrl } : {}) };
    })
    .filter(Boolean) as RecordingParticipant[];
  return {
    recordingId,
    callId: typeof metadata.callId === 'string' ? metadata.callId : undefined,
    title: typeof metadata.title === 'string' ? metadata.title : undefined,
    recordedBy: typeof metadata.recordedBy === 'string' ? metadata.recordedBy : undefined,
    startedAt: typeof metadata.startedAt === 'string' ? metadata.startedAt : undefined,
    durationMs: typeof metadata.durationMs === 'number' ? metadata.durationMs : undefined,
    thumbnailUrl: typeof metadata.thumbnailUrl === 'string' ? metadata.thumbnailUrl : undefined,
    participants,
    participantCount: typeof metadata.participantCount === 'number' ? metadata.participantCount : undefined,
    stage,
    expiresAt: typeof metadata.expiresAt === 'string' ? metadata.expiresAt : undefined,
  };
}

/**
 * A membership event: `metadata.kind === 'membership'`. Rendered as a system
 * line — "Eve added Carol · history from the last 7 days" — not a bubble.
 */
export function membershipRefFromMetadata(metadata: Record<string, unknown> | undefined): MembershipRef | null {
  if (!metadata || metadata.kind !== 'membership') return null;
  const event = metadata.event === 'removed' ? 'removed' : metadata.event === 'added' ? 'added' : null;
  if (!event) return null;
  const actorId = typeof metadata.actorId === 'string' ? metadata.actorId : '';
  const userIds = Array.isArray(metadata.userIds) ? metadata.userIds.filter((u): u is string => typeof u === 'string') : [];
  // The gateway stamps names as a map keyed by user id; an array in the
  // order of `userIds` is accepted too.
  const rawNames = metadata.names;
  const names = Array.isArray(rawNames)
    ? rawNames.filter((n): n is string => typeof n === 'string')
    : rawNames && typeof rawNames === 'object'
      ? (Array.isArray(metadata.userIds) ? metadata.userIds : []).map((id) => {
          const n = (rawNames as Record<string, unknown>)[String(id)];
          return typeof n === 'string' && n ? n : String(id);
        })
      : undefined;
  const h = metadata.history as { mode?: unknown; days?: unknown } | undefined;
  const history: MembershipHistory | undefined =
    h && (h.mode === 'none' || h.mode === 'all' || h.mode === 'days')
      ? { mode: h.mode, ...(typeof h.days === 'number' ? { days: h.days } : {}) }
      : undefined;
  return {
    event,
    actorId,
    ...(typeof metadata.actorName === 'string' ? { actorName: metadata.actorName } : {}),
    userIds,
    ...(names && names.length ? { names } : {}),
    ...(history ? { history } : {}),
  };
}

type TimelineEntry =
  | { kind: 'message'; message: ChatMessage }
  | { kind: 'local'; local: LocalChatMessage };

function timelineTimestamp(entry: TimelineEntry | undefined): string | undefined {
  if (!entry) return undefined;
  return entry.kind === 'message' ? entry.message.timestamp : entry.local.timestamp;
}

/**
 * Sent messages in the order given; each local message slotted in after the
 * last row that is not newer than it. Local messages with equal or unparsable
 * timestamps keep their given order.
 */
function mergeTimeline(messages: readonly ChatMessage[], localMessages: readonly LocalChatMessage[]): TimelineEntry[] {
  const entries: TimelineEntry[] = messages.map((message) => ({ kind: 'message', message }));
  if (localMessages.length === 0) return entries;
  const locals = [...localMessages].sort((a, b) => (Date.parse(a.timestamp) || 0) - (Date.parse(b.timestamp) || 0));
  for (const local of locals) {
    const t = Date.parse(local.timestamp);
    let at = entries.length;
    while (at > 0 && !Number.isNaN(t)) {
      const prev = Date.parse(timelineTimestamp(entries[at - 1]) ?? '');
      if (!(prev > t)) break;
      at -= 1;
    }
    entries.splice(at, 0, { kind: 'local', local });
  }
  return entries;
}

/** The id a row can be replied TO. Locals carry one too, so an optimistic
 *  reply lands in its thread instead of at the bottom of the river. */
function entryId(entry: TimelineEntry): string | undefined {
  const id = entry.kind === 'message' ? entry.message.id : entry.local.id;
  return id || undefined;
}

/** The id this row answers, from the `replyTo` the composer stamped. */
function entryReplyToId(entry: TimelineEntry): string | undefined {
  const metadata = entry.kind === 'message' ? entry.message.metadata : entry.local.metadata;
  const replyTo = (metadata as Record<string, unknown> | undefined)?.replyTo as
    | { messageId?: unknown }
    | undefined;
  return typeof replyTo?.messageId === 'string' && replyTo.messageId ? replyTo.messageId : undefined;
}

/** A root post and the replies hanging off it, in the order they were sent. */
interface ThreadGroup {
  root: TimelineEntry;
  replies: TimelineEntry[];
}

/**
 * One level of nesting, and nothing else moves.
 *
 * ORDER — the part that looks like a bug and is not: a thread sits in the
 * river at its ROOT's position, and a new reply does NOT drag the thread to
 * the bottom. An answer to a question from this morning stays under that
 * question, where the question is still on screen to give it meaning; it does
 * not reappear at the live edge stripped of what it was answering. That IS
 * threading — a river that reorders itself on every reply is the flat list
 * with indentation, which buys nothing. Do not "fix" this by sorting groups
 * on their newest reply. (The unread pill and the scroll-to-bottom affordance
 * are how a reader learns an older thread moved; see the scroll-ownership
 * block in the component.)
 *
 * DEPTH — a reply to a reply resolves to the same root, so the indent never
 * goes past one step. Teams draws the line there and so does this.
 *
 * A reply whose parent is NOT in the loaded window stays a root of its own:
 * there is nothing on screen to nest it under, and it keeps its quote block,
 * which is the only remaining trace of what it answered.
 */
function groupThreads(entries: readonly TimelineEntry[]): ThreadGroup[] {
  const present = new Set<string>();
  for (const entry of entries) {
    const id = entryId(entry);
    if (id) present.add(id);
  }

  const parentOf = new Map<string, string>();
  for (const entry of entries) {
    const id = entryId(entry);
    const parent = entryReplyToId(entry);
    if (id && parent && parent !== id && present.has(parent)) parentOf.set(id, parent);
  }

  // `replyTo` is server data, so a cycle is possible in principle and would
  // hang the render. The hop cap costs nothing and makes that impossible.
  const rootOf = (id: string): string => {
    let current = id;
    for (let hops = 0; hops < 64; hops += 1) {
      const parent = parentOf.get(current);
      if (!parent) break;
      current = parent;
    }
    return current;
  };

  // Roots first, in list order, THEN replies — so a reply that arrived out of
  // order (before its parent) still finds a group to join.
  const groups: ThreadGroup[] = [];
  const byRootId = new Map<string, ThreadGroup>();
  for (const entry of entries) {
    const id = entryId(entry);
    if (id && rootOf(id) !== id) continue;
    const group: ThreadGroup = { root: entry, replies: [] };
    groups.push(group);
    if (id) byRootId.set(id, group);
  }
  for (const entry of entries) {
    const id = entryId(entry);
    if (!id) continue;
    const root = rootOf(id);
    if (root === id) continue;
    byRootId.get(root)?.replies.push(entry);
  }
  return groups;
}

/** More replies than this and the tail collapses behind a control. Three is
 *  the point where a thread stops reading as a short exchange and starts
 *  pushing the next post off the screen. */
const THREAD_COLLAPSE_AFTER = 3;
/** How many stay visible while collapsed — enough to see the thread is alive
 *  and who is in it, few enough that the channel keeps moving. */
const THREAD_COLLAPSED_VISIBLE = 2;

/**
 * How close two messages must be to read as one run of speech.
 *
 * Five minutes — the figure Slack and Teams both landed on. Long enough that
 * somebody typing three sentences in a row stays one block, short enough that
 * answering an hour later starts a new one, which is exactly the case where a
 * repeated name and time is information rather than noise.
 */
const RUN_WINDOW_MS = 5 * 60 * 1000;

/**
 * Who a row is FROM, for the purpose of deciding whether the next row
 * continues it.
 *
 * The authenticated `userId` when the message carries one, the display name
 * otherwise. Never `clientId`: it is per-connection and changes on every
 * reconnect, so a run keyed on it would split in the middle of somebody's
 * three sentences for a reason nothing on screen can explain. (The same trap
 * the `isMine` check below documents.)
 */
function runIdentity(message: ChatMessage): string | undefined {
  const userId = (message as { userId?: string }).userId;
  if (userId) return `id:${userId}`;
  return message.displayName ? `name:${message.displayName}` : undefined;
}

/**
 * Is this row somebody's words, rather than a record ABOUT the conversation?
 *
 * A notice, a card and a deleted row each break a run from both sides. None of
 * them is a sentence a person typed, and a bare line under "Bob started a
 * call" would read as part of that record — which is precisely the attribution
 * a collapsed row asserts.
 */
function isSpeech(message: ChatMessage): boolean {
  if (message.metadata?.system === true) return false;
  if (message.deletedAt || message.metadata?.deleted === true) return false;
  return !(
    agentRunRefFromMetadata(message.metadata) ||
    recordingRefFromMetadata(message.metadata) ||
    callRefFromMetadata(message.metadata) ||
    documentRefFromMetadata(message.metadata) ||
    membershipRefFromMetadata(message.metadata)
  );
}

/**
 * Does `entry` render as a bare continuation of `previous`?
 *
 * Every condition here names a case where the repeated avatar and name is
 * carrying information. Where none of them holds, that repetition is the noise
 * that makes a busy channel unreadable — five messages from one person as five
 * avatars and five names down the left.
 */
function continuesRun(previous: TimelineEntry | undefined, entry: TimelineEntry): boolean {
  // Local (viewer-only) rows sit this out in both directions. Each already
  // carries a "Only you can see this" note — and sometimes buttons — under its
  // text, so it is a block rather than a line, and dropping its author would
  // leave that note hanging under whatever is above it.
  if (!previous || previous.kind !== 'message' || entry.kind !== 'message') return false;
  const before = previous.message;
  const current = entry.message;

  const who = runIdentity(current);
  if (!who || who !== runIdentity(before)) return false;
  if (!isSpeech(before) || !isSpeech(current)) return false;

  // "(edited)" lives on the meta line a continued row drops. Silently losing
  // the one marker that says a message was changed after it was sent is a
  // worse trade than one repeated author line, so an edited row keeps a head
  // of its own.
  if (current.editedAt) return false;

  // A day divider is drawn between them, so they are visibly separate blocks
  // whatever the clock says: 23:58 and 00:01 are three minutes and two days
  // apart. This is the only separator drawn INSIDE the list — the unread
  // indicator is a pill floating over the scroller and `Load earlier messages`
  // sits above the whole transcript, so neither can land mid-run.
  if (isNewDay(current.timestamp, before.timestamp)) return false;

  const then = Date.parse(before.timestamp);
  const now = Date.parse(current.timestamp);
  if (!Number.isFinite(then) || !Number.isFinite(now)) return false;
  // Out of order counts as broken too. The server's order is the truth for the
  // list, but a row stamped EARLIER than the one above it has no run to
  // continue, and collapsing it would hide the only evidence of the skew.
  return now >= then && now - then <= RUN_WINDOW_MS;
}

/** One person's read cursor. Named off the prop so it cannot drift from it. */
type ChatReadReceipt = NonNullable<ChatPanelProps['readReceipts']>[number];

/**
 * The people whose cursor has passed a message sent at `sentAt`.
 *
 * `>=` rather than `>` because a cursor is stamped when the message is
 * displayed, and a message read the instant it landed can carry the same
 * millisecond as the send. Strict `>` would drop exactly the fastest reader,
 * which is the one case the sender is watching for.
 *
 * The viewer is filtered out here rather than at the call site: every use of
 * this list — the count, the avatars, the names — is wrong if their own cursor
 * is in it, so there is no version of the question that wants it included.
 */
function readersSince(
  receipts: readonly ChatReadReceipt[],
  viewerId: string,
  sentAt: string,
): ChatReadReceipt[] {
  const sent = Date.parse(sentAt);
  // An unparsable send time makes the comparison meaningless, and a receipt
  // line that appears on garbage timestamps is worse than none.
  if (!Number.isFinite(sent)) return [];
  return receipts.filter((receipt) => {
    if (receipt.userId === viewerId) return false;
    const read = Date.parse(receipt.readAt);
    return Number.isFinite(read) && read >= sent;
  });
}

/** The name to show for a reader. The id is a poor label, but it beats blank. */
function receiptLabel(receipt: ChatReadReceipt): string {
  return receipt.displayName || receipt.userId;
}

/**
 * How many people OTHER than the viewer have left a trace in this channel.
 *
 * This is how "is this a two-person conversation" gets answered, and it has to
 * be inferred: ChatPanel is never handed the roster. Two sources name people —
 * the authors of the loaded messages, and whoever has a read cursor — and the
 * union of those, minus the viewer, is one in a DM and two or more the moment
 * a third person has either spoken or read.
 *
 * Identity is the authenticated `userId` where there is one and the display
 * name otherwise, which is `runIdentity`'s rule and is here for the same
 * reason: `clientId` is per-connection and would count one person twice after
 * a reconnect. Mixing the two keys can also count one person twice — a
 * transport that omits `userId` on messages but supplies it on receipts — and
 * that is the acceptable direction to be wrong in. Over-counting turns "Seen"
 * into "Seen by 1", which is merely terse; under-counting would describe a
 * group channel as a private exchange.
 *
 * System notices are excluded: the gateway posts them on nobody's behalf, and
 * one "Bob started a call" in a DM would otherwise make it look like a group.
 */
function otherParticipantCount(
  messages: readonly ChatMessage[],
  receipts: readonly ChatReadReceipt[],
  viewerId: string,
): number {
  const others = new Set<string>();
  for (const message of messages) {
    if (message.userId === viewerId || message.metadata?.system === true) continue;
    const who = runIdentity(message);
    if (who) others.add(who);
  }
  for (const receipt of receipts) {
    if (receipt.userId !== viewerId) others.add(`id:${receipt.userId}`);
  }
  return others.size;
}

export function ChatPanel({
  messages,
  localMessages = [],
  onSend,
  disabled = false,
  onTyping,
  typingUsers = [],
  emptyState,
  composer,
  currentUserId,
  reactionsFor,
  onToggleReaction,
  onReply,
  onTogglePin,
  onEditMessage,
  onDeleteMessage,
  pinnedMessageIds,
  onJumpToMessage,
  highlightedMessageId,
  threaded = false,
  alignOwnMessages = true,
  documentEditors,
  callParticipants,
  agentRunStatus,
  onOpenRun,
  onOpenResult,
  onDecideRun,
  onReviewRun,
  onJoinCall,
  onOpenRecording,
  onCopyRecordingLink,
  onShareRecording,
  onDownloadRecording,
  onOpenRecordingTranscript,
  onManageRecordingExpiry,
  recordingStatus,
  onOpenDocument,
  tone = 'light',
  showHeader,
  fill,
  onLoadMore,
  hasMore,
  loadingMore = false,
  onSendFiles,
  transfers = [],
  currentActor,
  onCancelTransfer,
  attachmentSrc,
  onOpenAttachment,
  acceptFiles,
  maxFileSize,
  onFileError,
  readReceipts = [],
  readReceiptsEnabled = true,
  emojis = DEFAULT_PICKER_EMOJIS,
}: ChatPanelProps) {
  // Which own message is being edited in place, and which one is waiting on
  // the delete confirm. One at a time each; Teams does the same.
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const dark = tone === 'dark';
  // A surrounding dock already draws the header and hands down a definite
  // height; explicit props still win. See DockedPanelContext.
  const dock = useDockedPanel();
  const headerVisible = showHeader ?? !(dock?.hasHeader ?? false);
  const fills = fill ?? (dock?.fillsHeight ?? false);
  const [inputValue, setInputValue] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canLoadMore = !!onLoadMore && hasMore !== false;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiTriggerRef = useRef<HTMLButtonElement>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const attachmentsEnabled = !!onSendFiles && !disabled;
  // Sent messages keep the order they arrived in; a local message is slotted
  // in after the last row that is not newer than it. The list is not sorted
  // wholesale — the server's order is the truth for what it sent.
  const timeline = mergeTimeline(messages, localMessages);
  // Only computed when threading is on, so the flat path pays nothing for it.
  const threads = threaded ? groupThreads(timeline) : null;
  // Which long threads the reader has opened, keyed by root message id. Local
  // to the panel: expanding a thread is a reading gesture, not a fact about
  // the conversation that a host should have to store.
  const [expandedThreads, setExpandedThreads] = useState<ReadonlySet<string>>(() => new Set());
  function toggleThread(rootId: string) {
    setExpandedThreads((open) => {
      const next = new Set(open);
      if (!next.delete(rootId)) next.add(rootId);
      return next;
    });
  }

  // ── Read receipts ───────────────────────────────────────────────────
  // ONE line, under ONE message: the newest thing the viewer sent. Teams draws
  // it there and the restraint is the feature — a marker beside forty messages
  // is forty repetitions of a single fact (how far the other people have read)
  // and reads as decoration, while one line at the foot of your own last
  // message answers the only question a sender actually has.
  //
  // THREADED MODE: "most recent" is by position in the timeline — the server's
  // order, which is the truth for what it sent — and the line is then drawn
  // wherever that message renders, which for a reply is inside its thread's
  // rail. It deliberately does NOT move to whichever of the viewer's messages
  // sits lowest on screen: threads sit at their ROOT's position, so the lowest
  // one can be an hour older than the newest, and hanging the line off it
  // would attach "Seen" to a message whose readers are not the ones counted.
  //
  // Without a `currentUserId` nothing renders at all: "which of these are
  // mine" is unanswerable without it (see `isMine`), and a receipt line under
  // a message that might not be yours is worse than no receipt line.
  const receiptViewerId = readReceiptsEnabled && currentUserId ? currentUserId : undefined;
  const receiptAnchor = (() => {
    if (!receiptViewerId || readReceipts.length === 0) return undefined;
    for (let i = timeline.length - 1; i >= 0; i -= 1) {
      const entry = timeline[i];
      // A local row was never sent, so nobody can have read it.
      if (entry.kind !== 'message') continue;
      const message = entry.message;
      if (message.userId !== receiptViewerId || !message.id) continue;
      // A deleted message has no words left for anyone to have seen; the line
      // falls back to the newest of the viewer's messages that still says
      // something, which is the one the receipt is now about.
      if (message.deletedAt || message.metadata?.deleted === true) continue;
      return { id: message.id, timestamp: message.timestamp };
    }
    return undefined;
  })();
  const receiptReaders =
    receiptAnchor && receiptViewerId
      ? readersSince(readReceipts, receiptViewerId, receiptAnchor.timestamp)
      : [];
  // Two people, so the count is not news — there is only one person it could
  // be. See `otherParticipantCount` for how that is worked out without a
  // roster.
  const receiptsAreDuet =
    receiptReaders.length === 1 &&
    !!receiptViewerId &&
    otherParticipantCount(messages, readReceipts, receiptViewerId) === 1;

  /**
   * The line itself, or null when there is nothing honest to say.
   *
   * NOBODY YET is silence, not "Seen by 0". The absence of the line already
   * means nobody has read it; spelling that out turns every unanswered message
   * into a small notice about being ignored.
   *
   * SCREEN READERS — the decision, since neither default is right. This is NOT
   * a live region. It sits inside the message list, which is `role="log"` with
   * `aria-live="off"` (see the scroller below), so the line is in reading order
   * and reachable at the foot of the viewer's own message, and it is never
   * pushed into anybody's ear. It changes every time somebody's cursor moves —
   * in a busy channel that is several times a minute, each one interrupting
   * whatever is being read to announce a number that changed by one. Announced
   * on demand, never announced on arrival. The visually-hidden tail is what
   * keeps "on demand" worth doing: the avatars carry the names for a sighted
   * reader and would otherwise be a silent group of images, so the names are
   * spelled out for a reader who arrives at the line.
   */
  function renderReadReceipts() {
    if (receiptReaders.length === 0) return null;
    const names = receiptReaders.map(receiptLabel);
    // Three, the same cap the collapsed-thread control uses — enough to
    // recognise the conversation, few enough not to become a second avatar
    // rail. The count and the names carry the rest.
    const faces = receiptReaders.slice(0, 3);
    return (
      <div
        data-testid="chat-read-receipts"
        // The names for a pointer, on the whole line rather than on the
        // avatars, so it answers "who" wherever the hover lands.
        title={names.join(', ')}
        className={cn(
          'mt-0.5 flex items-center gap-1 text-[11px]',
          // Follows the message it belongs to: own messages are right-aligned
          // by default and left-aligned in a channel, and a status line that
          // stays on one side drifts away from its own message under the other.
          // `pl-7` is MessageRow's avatar gutter (`w-5` + `gap-2`), so the
          // left-aligned line starts under the message text rather than under
          // the avatar.
          alignOwnMessages ? 'justify-end pr-1' : 'justify-start pl-7',
          // `text-white/*` on dark: the `text-text-*` tokens are tuned for the
          // light surface and go muddy to invisible over call chrome.
          dark ? 'text-white/50' : 'text-text-tertiary',
        )}
      >
        {receiptReaders.length > 1 && (
          <span className="flex items-center gap-0.5" aria-hidden="true">
            {faces.map((receipt) => (
              <Avatar key={receipt.userId} name={receiptLabel(receipt)} size={14} />
            ))}
          </span>
        )}
        <span data-testid="chat-read-receipts-label">
          {receiptsAreDuet ? 'Seen' : `Seen by ${receiptReaders.length}`}
        </span>
        {/* The library's canonical clip rather than `sr-only`: a host that does
            not run Tailwind over the library would paint an `sr-only` span as
            ordinary text, printing the whole reader list on screen. */}
        <span style={VISUALLY_HIDDEN_STYLE}>
          {receiptsAreDuet ? ` by ${names[0]}` : `: ${names.join(', ')}`}
        </span>
      </div>
    );
  }

  // ── Scroll ownership ────────────────────────────────────────────────
  // The old effect slammed scrollTop to scrollHeight on EVERY length
  // change, so a message arriving while you read history threw you back
  // to the live edge mid-sentence. The viewport now belongs to the
  // reader unless they are already at the bottom.
  const [unreadBelow, setUnreadBelow] = useState(0);
  /** True once the list has content scrolled above the top edge. */
  const [scrolledFromTop, setScrolledFromTop] = useState(false);
  const pinnedRef = useRef(true);
  const prevCountRef = useRef(messages.length);
  // An arriving transfer grows the list exactly like an arriving message, so
  // it participates in the same scroll-ownership rule: follow the live edge
  // if the reader is already there, never yank them if they are not.
  const rowCount = messages.length + localMessages.length + transfers.length;
  // Set while a load-more prepend is in flight so the growth is restored
  // to the reader's position instead of being read as new traffic.
  const prependRef = useRef<{ scrollHeight: number; scrollTop: number } | null>(null);

  // ── New-message announcement ────────────────────────────────────────
  // Measured before this existed: a peer's message arrived, the transcript
  // grew, and NOTHING on the page changed that a screen reader would read —
  // there was no live region anywhere inside the panel. A sighted user sees
  // the thread move; a screen-reader user was simply never told.
  const [announcement, setAnnouncement] = useState('');
  const lastAnnouncedRef = useRef<string | null>(null);
  const announcedOnceRef = useRef(false);
  const announceSeqRef = useRef(0);
  useEffect(() => {
    const latest = messages[messages.length - 1];
    if (!latest) return;
    const key = latest.id ?? `${latest.timestamp}:${latest.clientId}:${latest.content}`;
    // The first render SEEDS without speaking. Opening a thread that already
    // has twenty messages of history is not "a message arrived", and reading
    // the newest of them out would misreport when it was said.
    if (!announcedOnceRef.current) {
      announcedOnceRef.current = true;
      lastAnnouncedRef.current = key;
      return;
    }
    if (key === lastAnnouncedRef.current) return;
    lastAnnouncedRef.current = key;
    // Your own send already had your attention, and it is the one message you
    // are certain to know about.
    if (currentUserId && latest.userId === currentUserId) return;
    announceSeqRef.current += 1;
    // A live region fires on text CHANGE. Two identical messages in a row
    // ("ok", "ok") produce identical strings and the second would be silent,
    // so an alternating zero-width space keeps the content genuinely
    // different without changing a single spoken word.
    const pad = announceSeqRef.current % 2 === 0 ? '​' : '';
    setAnnouncement(
      announcementFor(latest.displayName ?? latest.clientId.slice(0, 8), latest.content) + pad,
    );
  }, [messages, currentUserId]);

  function scrollToBottom() {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    pinnedRef.current = true;
    setUnreadBelow(0);
  }

  function handleListScroll() {
    const el = listRef.current;
    if (!el) return;
    const pinned = isPinnedToBottom(el);
    pinnedRef.current = pinned;
    if (pinned) setUnreadBelow(0);
    // Only fade when there is something above to fade INTO. At the top of a
    // short thread the oldest message is fully visible and washing it out
    // would be a lie about there being more.
    setScrolledFromTop(el.scrollTop > 8);
  }

  useEffect(() => {
    const el = listRef.current;
    const prev = prevCountRef.current;
    const grew = rowCount - prev;
    prevCountRef.current = rowCount;
    if (!el) return;

    // Older messages prepended — hold the reader's line steady.
    const anchor = prependRef.current;
    if (anchor && grew > 0) {
      prependRef.current = null;
      el.scrollTop = anchor.scrollTop + (el.scrollHeight - anchor.scrollHeight);
      return;
    }

    if (pinnedRef.current) {
      el.scrollTop = el.scrollHeight;
      setUnreadBelow(0);
      // Recomputed here as well as in onScroll: the jump to the bottom is
      // PROGRAMMATIC, and the first render of a long thread lands scrolled
      // without the user ever having scrolled — so the handler that would
      // have noticed never ran and the top edge stayed hard.
      setScrolledFromTop(el.scrollTop > 8);
    } else if (grew > 0) {
      setUnreadBelow((n) => n + grew);
    }
    // A progress tick re-renders without changing rowCount, which is exactly
    // right: the bar animates in place and the reader is left alone.
  }, [rowCount]);

  function handleLoadMore() {
    const el = listRef.current;
    if (el) prependRef.current = { scrollHeight: el.scrollHeight, scrollTop: el.scrollTop };
    onLoadMore?.();
  }

  // Clear typing timer on unmount.
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  function handleSend() {
    const content = inputValue.trim();
    if (!content || disabled) return;
    // Clear typing on send.
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = null;
    onTyping?.(false);
    // Sending is an explicit "take me to the live edge" gesture — your own
    // message must land in view even if you were reading history.
    pinnedRef.current = true;
    onSend(content);
    setInputValue('');
  }

  function handleFiles(files: File[]) {
    if (!attachmentsEnabled || files.length === 0) return;
    // Sharing a file is, like sending, an explicit "take me to the live edge"
    // gesture — the sender must see their own transfer appear.
    pinnedRef.current = true;
    onSendFiles?.(files);
  }

  /** Pasting a screenshot is the fastest way to share one; don't make the
   *  user save it to disk first just so they can drag it back in. */
  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    if (!attachmentsEnabled) return;
    const items = Array.from(e.clipboardData?.items ?? []);
    const files = items
      .filter((i) => i.kind === 'file')
      .map((i) => i.getAsFile())
      .filter((f): f is File => f !== null);
    if (files.length === 0) return;
    e.preventDefault();
    handleFiles(files);
  }

  function insertEmoji(emoji: string) {
    setInputValue((v) => v + emoji);
    setEmojiOpen(false);
  }

  /**
   * Broadcast "typing", reset the 2s idle timer.
   *
   * Split out of `handleKeyDown` so the COMPOSER SLOT gets it too. It used to
   * live only on the built-in `<Input>`, which meant `onTyping` was silently
   * inert for every host that passes its own composer — and passing one is
   * the normal case for a rich composer. A prop that does nothing depending
   * on an unrelated prop is worse than a missing prop: the wiring looks done.
   */
  function noteTyping() {
    if (disabled) return;
    onTyping?.(true);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => onTyping?.(false), 2000);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    noteTyping();
    if (e.key === 'Enter' && !disabled && inputValue.trim()) {
      handleSend();
    }
  }

  // One row of the transcript. Lifted out of the render loop so the threaded
  // path can call it twice — once for a root, once per reply — without the
  // body of a message row existing in two places and drifting apart.
  function renderTimelineEntry(
    entry: TimelineEntry,
    index: number,
    previousTimestamp: string | undefined,
    /**
     * The row this one may CONTINUE — the row directly above it with nothing
     * drawn in between. Usually the same row `previousTimestamp` came from,
     * but not always: a thread's replies rail and its foot control both sit in
     * the gap between one root and the next, so a root is handed `undefined`
     * whenever the thread above it drew anything below its own root.
     */
    previousInRun: TimelineEntry | undefined,
    /**
     * Set only when this row is a REPLY rendered inside a thread. Carries the
     * root the thread hangs off, which is what `onReply` must report so the
     * next reply lands in THIS thread instead of starting a nested one.
     */
    thread?: { rootId: string; rootMessage?: ChatMessage },
  ): ReactNode {
  const entryTimestamp = entry.kind === 'message' ? entry.message.timestamp : entry.local.timestamp;
  // A run of messages from one person renders as one headed row plus bare
  // lines under it, the way Teams and Slack both do it. Five messages from
  // Carol were five avatars and five copies of "Carol" down the left margin;
  // the name and the time are only news on the row where they CHANGE.
  const continues = continuesRun(previousInRun, entry);
  // A date heading opens each new local day — including the first
  // row on screen, whose date is otherwise stated nowhere. Keyed
  // off the PREVIOUS row rather than a running variable so a
  // `Load earlier messages` prepend recomputes correctly: the
  // boundary is a property of a pair, not of iteration order.
  //
  // Never inside a thread. The river's day headings mark the ROOTS, because
  // that is the order the river is in; a reply posted two days after its root
  // would otherwise drop a "Wednesday" inside a thread that the reader has
  // been told sits on Monday, and the next root would then have to repeat
  // Monday to undo it.
  const daySeparator = !thread && isNewDay(entryTimestamp, previousTimestamp) ? (
    <DaySeparator key={`day:${entryTimestamp}:${index}`} timestamp={entryTimestamp} tone={tone} />
  ) : null;

  if (entry.kind === 'local') {
    const local = entry.local;
    const localRef = agentRunRefFromMetadata(local.metadata);
    return (
      <Fragment key={`local:${local.id}`}>
        {daySeparator}
        <div data-testid="chat-local-message" data-local-message-id={local.id} className="rounded-md">
          <MessageRow
            author={local.displayName}
            timestamp={local.timestamp}
            tone={tone}
            // A local message is the viewer's by definition.
            mine
            content={
              <>
                {localRef ? (
                  <AgentRunCard
                    runId={localRef.runId}
                    instruction={localRef.instruction || local.content}
                    command={localRef.command}
                    agentName={localRef.agentName}
                    requestedBy={local.displayName}
                    status={agentRunStatus?.(localRef.runId)}
                    onOpenDocument={onOpenDocument && localRef.documentId ? () => onOpenDocument(localRef.documentId) : undefined}
                    documentTitle={localRef.documentTitle}
                    onOpenRun={onOpenRun}
                    result={localRef.result}
                    onOpenResult={onOpenResult}
                    onDecide={onDecideRun}
                    suggestion={localRef.suggestionKey ? { key: localRef.suggestionKey, ...(localRef.documentId ? { documentId: localRef.documentId } : {}) } : undefined}
                    onReview={onReviewRun}
                  />
                ) : (
                  <MessageBody text={local.content} />
                )}
                <div
                  data-testid="chat-local-message-note"
                  className={cn('mt-1 text-[11px] italic', dark ? 'text-white/50' : 'text-text-tertiary')}
                >
                  {local.note ?? 'Only you can see this'}
                </div>
                {local.actions && local.actions.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5" data-testid="chat-local-message-actions">
                    {local.actions.map((action) => (
                      <Button
                        key={action.id}
                        type="button"
                        size="sm"
                        variant={action.primary ? 'primary' : 'ghost'}
                        onClick={action.onSelect}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            }
          />
        </div>
      </Fragment>
    );
  }

  const { message } = entry;
  const author = message.displayName ?? message.clientId.slice(0, 8);
  const files = message.attachments ?? [];
  // Attachments render INSIDE the row's content slot rather than as
  // sibling rows, so a caption and its image stay one message —
  // they share an author, a timestamp, and a position in the
  // ordering, and splitting them lets the two drift apart.
  // `metadata.html` is the composer's rich body. Rendering
  // `content` alone threw away every link, bold run and mention the
  // sender created — MessageBody restores them, from an allow-list,
  // because a message body is attacker-controlled text.
  const rich = message.metadata?.html;
  const richHtml = typeof rich === 'string' ? rich : undefined;
  const text = <MessageBody html={richHtml} text={message.content} />;

  // A document event is not a message with a document mentioned in
  // it — it IS the document, so the card replaces the text rather
  // than sitting under it. The sentence the server wrote stays in
  // the stored message for anywhere that renders plain text
  // (notification previews, the conversation list) but the thread
  // shows the thing itself.
  const docRef = documentRefFromMetadata(message.metadata);
  const agentRef = agentRunRefFromMetadata(message.metadata);

  // Same rule for a call: the event IS the call, so the card
  // replaces the text. Unlike a document, a call CHANGES while
  // the thread is open — live it is an invitation, ended it is a
  // record — which is why one card renders both states in place
  // rather than the transcript swapping rows underneath a reader.
  const callRef = callRefFromMetadata(message.metadata);
  const recordingRef = recordingRefFromMetadata(message.metadata);
  const membershipRef = membershipRefFromMetadata(message.metadata);
  const truncation = truncationFromMetadata(message.metadata);
  // `#Roadmap` in the text stays words; the chips under it are the
  // same documents as things you can open.
  const docRefs = documentRefsFromMetadata(message.metadata);

  const body = agentRef ? (
    <AgentRunCard
      runId={agentRef.runId}
      instruction={agentRef.instruction || message.content.replace(/^\/doc\s*/i, '')}
      command={agentRef.command}
      agentName={agentRef.agentName}
      requestedBy={message.displayName}
      status={agentRunStatus?.(agentRef.runId)}
      onOpenDocument={onOpenDocument && agentRef.documentId ? () => onOpenDocument(agentRef.documentId) : undefined}
      documentTitle={agentRef.documentTitle}
      onOpenRun={onOpenRun}
      result={agentRef.result}
      onOpenResult={onOpenResult}
      onDecide={onDecideRun}
      suggestion={agentRef.suggestionKey ? { key: agentRef.suggestionKey, ...(agentRef.documentId ? { documentId: agentRef.documentId } : {}) } : undefined}
      onReview={onReviewRun}
    />
  ) : recordingRef ? (
    (() => {
      const live = recordingStatus?.(recordingRef.recordingId);
      const rec = { ...recordingRef, ...(live ?? {}) };
      return (
        <RecordingActivityCard
          recordingId={rec.recordingId}
          title={rec.title}
          recordedBy={rec.recordedBy ?? message.displayName}
          participants={rec.participants}
          participantCount={rec.participantCount}
          startedAt={rec.startedAt}
          durationMs={rec.durationMs}
          thumbnailUrl={rec.thumbnailUrl}
          stage={rec.stage ?? 'ready'}
          transcriptReady={rec.transcriptReady}
          summaryReady={rec.summaryReady}
          expiresAt={rec.expiresAt}
          pinned={!!message.id && !!pinnedMessageIds?.has(message.id)}
          onOpen={onOpenRecording}
          onCopyLink={onCopyRecordingLink}
          onShare={onShareRecording}
          onDownload={onDownloadRecording}
          onOpenTranscript={onOpenRecordingTranscript}
          onManageExpiry={onManageRecordingExpiry}
          onTogglePin={onTogglePin ? () => onTogglePin(message) : undefined}
        />
      );
    })()
  ) : callRef ? (
    <CallActivityCard
      callId={callRef.callId}
      startedBy={
        (typeof message.metadata?.displayName === 'string'
          ? message.metadata.displayName
          : undefined)
        ?? message.displayName
      }
      participants={callParticipants?.(callRef.callId) ?? callRef.participants}
      live={callRef.live}
      durationMs={callRef.durationMs}
      audioOnly={callRef.audioOnly}
      recorded={callRef.recorded}
      notRecordedReason={callRef.notRecordedReason}
      lobbyName={callRef.lobbyName}
      onJoin={onJoinCall}
    />
  ) : docRef ? (
    <DocumentActivityCard
      documentId={docRef.documentId}
      title={docRef.title || message.content}
      icon={docRef.icon}
      // The document's author when the share carries one, and only
      // then the message's sender.
      //
      // The card's label is "Created by", and this read the SENDER
      // — so sharing someone else's document into a thread
      // credited you with writing it. Verified: a document created
      // by one person, shared by another, rendered under the
      // sharer's name.
      createdBy={
        docRef.createdBy
        ?? (typeof message.metadata?.displayName === 'string'
          ? message.metadata.displayName
          : undefined)
        ?? message.displayName
      }
      editors={documentEditors?.(docRef.documentId) ?? []}
      onOpen={onOpenDocument}
    />
  ) : files.length === 0 ? (
      text
    ) : (
      <>
        {(message.content || richHtml) && text}
        {files.map((file) => (
          <AttachmentBubble
            key={file.id}
            attachment={file}
            src={attachmentSrc?.(file)}
            onOpen={onOpenAttachment}
          />
        ))}
      </>
    );
  const messageId = message.id ?? '';
  const reactions = messageId && reactionsFor ? reactionsFor(messageId) : [];
  const quoted = message.metadata?.replyTo as
    | { messageId: string; author: string; text: string; timestamp?: string }
    | undefined;
  // Inside a thread, a quote of the ROOT is the same words twice — the root is
  // the post directly above, under the same rail, and repeating it is exactly
  // the noise threading was added to remove. A quote of a SIBLING reply stays:
  // it is the only thing that says which of the four answers above this one is
  // being answered, which the single indent level deliberately cannot show.
  const quoteIsThreadRoot = !!thread && !!quoted && quoted.messageId === thread.rootId;
  const showQuote = !!quoted && !quoteIsThreadRoot;
  const isPinned = !!messageId && !!pinnedMessageIds?.has(messageId);
  // Matched on the AUTHENTICATED user id, never on clientId: a
  // clientId is per-connection and changes on every reconnect, so
  // keying on it would make your own messages stop being yours
  // halfway up the thread.
  const isMine =
    !!currentUserId && (message as { userId?: string }).userId === currentUserId;

  // A notice is a RECORD, not somebody's words.
  //
  // Replying to one quotes "Bob started a call" back at the
  // channel, which says nothing; pinning one pins an event that
  // already has its own place in the transcript and its own
  // live/ended states. Offering an action with no meaning is how a
  // thread fills up with pins nobody chose.
  //
  // The test is `metadata.system`, which the gateway's
  // `postSystemMessage` stamps on everything it posts on nobody's
  // behalf — NOT the card `kind`. That distinction is load-bearing
  // for documents, which arrive by two different routes and render
  // as the SAME card:
  //
  //   • "Bob created Q3 Plan"  — posted by the server. A notice.
  //   • "📄 Q3 Plan" + a link  — posted by a person through the
  //     share picker. A message they chose to send, so replying to
  //     it and pinning it mean exactly what they normally mean.
  //
  // Gating on `kind === 'document'` would have silenced both;
  // gating on the call card alone would have left the auto-posted
  // document notice replyable. Neither is right.
  //
  // Reactions stay. Reacting to "the call started" reads as a
  // response to the EVENT, which is what it is.
  const isActivityNotice = message.metadata?.system === true;
  const isDeleted = !!message.deletedAt || message.metadata?.deleted === true;
  const isCard = !!(agentRef || recordingRef || callRef || docRef || membershipRef);
  // Own, plain, still there: the only messages a person may edit or delete.
  const canEditDelete = isMine && !isDeleted && !isActivityNotice && !isCard && !!messageId;
  const editing = canEditDelete && !!onEditMessage && editingId === messageId;

  // The quote, the message, its reactions — one unit. Rendering
  // them as siblings of the row would let a reaction drift away
  // from the message it belongs to when the list reflows.
  const withInteractions = (
    <>
      {showQuote && quoted && (
        <QuoteBlock
          quote={quoted}
          onJump={onJumpToMessage}
          className="mb-1"
        />
      )}
      {isPinned && (
        <span className="mb-0.5 block text-[11px] text-text-tertiary" data-testid="pinned-marker">
          <PinIcon size={11} /> Pinned
        </span>
      )}
      {isDeleted ? (
        <span className="italic text-text-tertiary" data-testid="message-deleted">This message was deleted.</span>
      ) : editing ? (
        <InlineMessageEditor
          initialText={message.content}
          onSave={async (text) => { await onEditMessage!(message, text); setEditingId(null); }}
          onCancel={() => setEditingId(null)}
        />
      ) : body}
      {!isDeleted && docRefs.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1" data-testid="chat-message-docrefs">
          {docRefs.map((d) => (
            <DocumentChip key={d.id} documentId={d.id} label={d.label} icon={d.icon} onOpen={onOpenDocument} />
          ))}
        </div>
      )}
      {!isDeleted && truncation && (
        <div
          data-testid="message-truncated"
          className="mt-1 text-[11px] text-warning-fg"
        >
          ⚠{' '}
          {truncation.labels.length > 0
            ? `Too large to send: ${truncation.labels.join(', ')}`
            : 'Part of this message was too large to send'}
        </div>
      )}
      {!isDeleted && reactions.length > 0 && currentUserId && onToggleReaction && (
        <ReactionChips
          reactions={reactions}
          currentUserId={currentUserId}
          onToggle={(emoji) => onToggleReaction(messageId, emoji)}
        />
      )}
    </>
  );

  if (membershipRef) {
    return (
      <Fragment key={message.id ?? index}>
        {daySeparator}
        <MembershipNotice
          membership={membershipRef}
          fallbackText={message.content}
          timestamp={message.timestamp}
          data-testid="membership-notice"
        />
      </Fragment>
    );
  }

  return (
    <Fragment key={message.id ?? index}>
    {daySeparator}
    <div
      data-testid="chat-message"
      data-message-id={messageId || undefined}
      data-continues={continues ? 'true' : undefined}
      // A continued row drops the whole meta line, timestamp included, so the
      // native tooltip is where its time went. That is the honest limit of
      // what this component can do from here: MessageRow has no hover-gutter
      // slot, and inventing one in the panel would put a second time element
      // on the page that the row itself knows nothing about. The full local
      // date and time is in the title, on the row, reachable by pointer — and
      // the headed row a few lines above still states the clock time plainly.
      title={continues ? fullTimestampLabel(message.timestamp) : undefined}
      // `group` drives the hover reveal; `focus-within` is what
      // keeps the bar reachable without a pointer.
      className={cn(
        'group relative rounded-md transition-colors hover:bg-surface-hover',
        // `ring-inset`: an outset ring is drawn OUTSIDE the row's
        // box, and the scroll container clips overflow — so the
        // right edge of the highlight was cut off against the
        // pane boundary. Inset draws it within the row's own
        // bounds, which nothing can clip.
        messageId && messageId === highlightedMessageId &&
          'bg-surface-inset ring-1 ring-inset ring-primary transition-colors',
      )}
    >
      <MessageRow
        author={author}
        content={withInteractions}
        // An EMPTY timestamp on a continued row, which is what collapses the
        // meta line entirely: MessageRow keeps that line for the clock alone
        // (`metaVisible = !hideAuthor || !!time`), so hiding the author but
        // keeping the time would trade a name for a stray HH:MM and leave the
        // row two lines tall — half the repetition and none of the density
        // this is for. `formatChatTime('')` yields '', so nothing is rendered
        // and no invalid `dateTime` reaches the DOM. A `hideMeta` prop on
        // MessageRow would say this outright; that file is out of scope here.
        timestamp={continues ? '' : message.timestamp}
        editedAt={isDeleted ? undefined : message.editedAt}
        avatarUrl={message.avatarUrl}
        // The avatar slot keeps its width when hidden, so a continued line
        // starts under the first row's text rather than under its avatar.
        hideAvatar={continues}
        hideAuthor={continues}
        tone={tone}
        // Own messages flip side and take a tinted bubble. Matched
        // on the AUTHENTICATED user id, never on clientId: a
        // clientId is per-connection and changes on every
        // reconnect, so keying on it would make your own messages
        // stop being yours halfway up the thread.
        // Ownership still decides Edit/Delete (`canEditDelete` above); this
        // decides only where the row sits.
        mine={isMine && alignOwnMessages}
      />
      {messageId && !isDeleted && !editing && (onToggleReaction || canEditDelete || (!isActivityNotice && (onReply || onTogglePin))) && (
        <MessageActionBar
          // Top-RIGHT of the row, the way Slack and Teams place
          // it, and the hovered row is tinted so the bar and the
          // message it acts on read as one thing however wide the
          // pane is. It used to sit at the message column's left
          // edge, lifted onto the row's top — which put it over
          // the author's name and the timestamp ("Caro…"), the
          // one line that says whose message you are about to
          // react to. `-top-3` lifts it into the gap above the
          // row, where there is no text on the right.
          //
          // `group-has-[:focus-visible]` rather than
          // `group-focus-within`: focus-within is true after a
          // MOUSE click too, so clicking a reaction left that row's
          // bar stuck open after the pointer moved away — two bars
          // on screen at once, one of them for a message you were
          // no longer pointing at. focus-visible is keyboard-only,
          // which is the case the reveal-on-focus exists for.
          className={cn(
            'absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100',
          )}
          onReact={onToggleReaction ? (e) => onToggleReaction(messageId, e) : undefined}
          // Replying to a REPLY hands back the thread's root, never the reply
          // itself. The host stamps `replyTo` from what it gets, so handing it
          // the child would stamp a grandchild — and since a grandchild folds
          // back to the same root anyway, the only visible effect would be a
          // quote block and a `replyTo` pointing at a row that is no longer
          // structurally distinct. One thread, one target.
          onReply={
            onReply && !isActivityNotice
              ? () => onReply(thread?.rootMessage ?? message)
              : undefined
          }
          onTogglePin={
            onTogglePin && !isActivityNotice ? () => onTogglePin(message) : undefined
          }
          pinned={!!message.id && !!pinnedMessageIds?.has(message.id)}
          onEdit={canEditDelete && onEditMessage ? () => setEditingId(messageId) : undefined}
          onDelete={canEditDelete && onDeleteMessage ? () => setDeletingId(messageId) : undefined}
        />
      )}
    </div>
    {/* Inside the list rather than pinned to the pane, so it scrolls away with
        the message it describes — a receipt floating above the composer while
        the message it refers to is three screens up says nothing. It sits
        OUTSIDE the row div on purpose: that div is the hover target for the
        action bar and carries the row's highlight ring, and a status line
        inside it would tint and outline along with the message. */}
    {!!receiptAnchor && messageId === receiptAnchor.id && renderReadReceipts()}
    </Fragment>
  );
  }

  /** The name to put on a reply in the "who is in this thread" strip. */
  function entryAuthor(entry: TimelineEntry): string {
    return entry.kind === 'message'
      ? entry.message.displayName ?? entry.message.clientId.slice(0, 8)
      : entry.local.displayName;
  }

  /**
   * The message a thread's foot control would reply to, or undefined when this
   * thread has nothing repliable at its head.
   *
   * The same exclusions the hover bar applies, for the same reasons: a local
   * row has not been accepted by the server yet and there is no ChatMessage to
   * hand back, a deleted message has nothing left to answer, and an activity
   * notice ("the call started") is an event rather than something a person
   * said. A membership notice renders as a notice with no actions at all, so
   * it does not grow one here either.
   */
  function threadReplyTarget(root: TimelineEntry): ChatMessage | undefined {
    if (!onReply || root.kind !== 'message') return undefined;
    const message = root.message;
    if (!message.id) return undefined;
    if (message.deletedAt || message.metadata?.deleted === true) return undefined;
    if (message.metadata?.system === true) return undefined;
    if (membershipRefFromMetadata(message.metadata)) return undefined;
    return message;
  }

  /**
   * A root post with its replies beneath it, behind a rail.
   *
   * A thread with NO replies and no foot control renders as the bare row, byte
   * for byte what the flat path produces. Wrapping every message in thread
   * chrome would make a channel of ordinary messages look like a channel of
   * empty threads.
   */
  function renderThread(
    group: ThreadGroup,
    index: number,
    previousGroup: ThreadGroup | undefined,
  ): ReactNode {
    // Day headings key off ROOT order, which is the order the river is in —
    // so the previous root supplies the boundary even when a rail of replies
    // was drawn between the two.
    const previousTimestamp = timelineTimestamp(previousGroup?.root);
    // Grouping does NOT get the same latitude. A root may continue the root
    // above it only when nothing was drawn in the gap: a replies rail or a
    // foot Reply control is a visible interruption, and a bare line following
    // one would read as belonging to whatever the interruption said rather
    // than to the post above it. In a channel where every root carries the
    // foot control, that means top-level posts never collapse and only
    // replies within a thread do — the correct answer, not a limitation.
    const previousRoot =
      previousGroup && previousGroup.replies.length === 0 && !threadReplyTarget(previousGroup.root)
        ? previousGroup.root
        : undefined;
    const rootNode = renderTimelineEntry(group.root, index, previousTimestamp, previousRoot);

    /**
     * Air, and a hairline, between one post and the next. Threaded mode only.
     *
     * A post in a channel is a thread STARTER — its own small conversation
     * with its own reply control — so consecutive posts by one person stay
     * separate rows with separate heads, which is right (see `continuesRun`
     * and the `previousRoot` note above). What was wrong was the rhythm: the
     * same tight rows a DM uses, with a Reply link appended, so that correct
     * repetition read as noise instead of as structure. Teams answers this
     * with space, not with grouping.
     *
     * Air does most of the work, and the hairline is here because air alone
     * stops scaling: two one-line posts 24px apart are obviously two things,
     * two posts that are each a root plus five replies and a rail are not —
     * and the rail that would have marked the end of the first is indented
     * away from the left margin, exactly where the next post's name appears.
     *
     * ONE top border. No background, no radius, no shadow, no side or bottom
     * edges — a box on four sides is what turns a channel into a stack of CRM
     * cards, and this is the day separator's own vocabulary (a hairline
     * sibling between blocks) at the lightest weight the tokens have.
     *
     * Not `role="separator"`: DaySeparator takes that role for the divisions
     * worth announcing, and a channel that says "separator" between every post
     * gives a screen-reader user forty announcements carrying no information
     * the rows do not already carry.
     */
    const rootTimestamp = timelineTimestamp(group.root) ?? '';
    const boundary =
      // A day divider IS the boundary where it falls; drawing both stacks two
      // rules with three pixels between them. `isNewDay` is also true for the
      // first row, which is what keeps a rule off the top of the transcript.
      index > 0 && !isNewDay(rootTimestamp, previousTimestamp) ? (
        <div
          aria-hidden="true"
          data-testid="chat-post-boundary"
          className={cn(
            'mt-3 border-t pt-3',
            dark ? 'border-white/10' : 'border-border-subtle',
          )}
        />
      ) : null;

    // Hover-only reply was the whole discoverability problem: a reader who
    // never happens to hover a row never learns the channel is threaded, and
    // keeps answering with new top-level posts — the flat river threading was
    // built to end. A control that is always on screen is what says "this is
    // a thread you can answer", and it matters MOST on a root with no replies
    // yet, since that is the post a first reply has to start from.
    const replyTarget = threadReplyTarget(group.root);
    if (group.replies.length === 0 && !replyTarget) {
      // Still a post, so it still gets the separation — a channel where only
      // the posts with replies are set apart would say that a post nobody
      // answered is a lesser kind of thing.
      return boundary ? (
        <Fragment key={`post:${entryId(group.root) ?? index}`}>
          {boundary}
          {rootNode}
        </Fragment>
      ) : (
        rootNode
      );
    }

    const rootId = entryId(group.root) ?? '';
    const rootMessage = group.root.kind === 'message' ? group.root.message : undefined;
    // Without an id there is nothing stable to key the open/closed state on,
    // so such a thread simply stays open rather than flickering shut when the
    // list reflows.
    const collapsible = !!rootId && group.replies.length > THREAD_COLLAPSE_AFTER;
    const expanded = !collapsible || expandedThreads.has(rootId);
    const visible = expanded ? group.replies : group.replies.slice(0, THREAD_COLLAPSED_VISIBLE);
    const hidden = group.replies.length - visible.length;
    // Who is still behind the control — the question the reader is actually
    // asking before deciding to open it.
    const hiddenAuthors = [...new Set(group.replies.slice(visible.length).map(entryAuthor))].slice(0, 3);

    return (
      <Fragment key={`post:${rootId || index}`}>
      {boundary}
      <div data-testid="chat-thread" data-thread-root={rootId || undefined}>
        {rootNode}
        {group.replies.length > 0 && (
        <div
          data-testid="chat-thread-replies"
          // Indent plus a rail down the left. The rail is what makes the
          // grouping survive a reply that is the viewer's OWN — those flip to
          // the right side of the row, so indentation alone stops reading as
          // "belongs to that" the moment your own answer is in the thread.
          className={cn('ml-7 border-l pl-2', dark ? 'border-white/20' : 'border-border')}
        >
          {visible.map((reply, replyIndex) =>
            // A reply continues another REPLY, never the root. The root is the
            // post and the replies are answers to it, so the first answer
            // always states who is answering even when the same person wrote
            // both — and it sits across an indent change, where a bare line
            // would be unreadable anyway.
            renderTimelineEntry(reply, replyIndex, undefined, visible[replyIndex - 1], {
              rootId,
              ...(rootMessage ? { rootMessage } : {}),
            }),
          )}
          {collapsible && (
            <button
              type="button"
              data-testid="chat-thread-toggle"
              aria-expanded={expanded}
              onClick={() => toggleThread(rootId)}
              className={cn(
                'mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                dark ? 'text-white/70 hover:bg-white/10' : 'text-text-secondary hover:bg-surface-hover',
              )}
            >
              {!expanded && hiddenAuthors.length > 0 && (
                <span className="flex items-center gap-0.5">
                  {hiddenAuthors.map((name) => (
                    <Avatar key={name} name={name} size={16} />
                  ))}
                </span>
              )}
              {expanded
                ? 'Show fewer replies'
                : `${hidden} more ${hidden === 1 ? 'reply' : 'replies'}`}
            </button>
          )}
        </div>
        )}
        {replyTarget && (
          // Below the last reply AND below the "N more replies" control, so it
          // reads as the end of the thread rather than as one more reply.
          //
          // It is also the last thing INSIDE the post's block: `mt-0.5` holds
          // it against the post above while the next post's boundary opens
          // with `mt-3` and a rule. Six times the gap on the far side is what
          // keeps it reading as this post's closing line rather than as a
          // control floating in the space between two posts.
          //
          // `border-l border-transparent` rather than a bare `pl-*`: it puts
          // this on the exact box model the rail above uses, so the word lines
          // up with the replies' text to the pixel whether or not a rail is
          // drawn — and it does so without a hand-measured offset that would
          // silently drift the next time the rail's padding changes.
          <div className="ml-7 border-l border-transparent pl-2">
            <button
              type="button"
              data-testid="chat-thread-reply"
              // "Reply" repeated down a channel is a useless list to a screen
              // reader user moving control to control — every stop says the
              // same word and none of them says which post. The root's author
              // is already in hand here, so naming the target costs nothing.
              // The visible word stays "Reply": the name a sighted reader
              // needs is supplied by the thread the control sits under.
              aria-label={`Reply to ${entryAuthor(group.root)}`}
              // Reuses the hover bar's path exactly — the thread's ROOT, never
              // the last reply. See the `onReply` note on MessageActionBar for
              // why a reply to a reply still reports the root.
              onClick={() => onReply?.(replyTarget)}
              // No tabIndex: the list's own tab stop and the roving reveal on
              // the hover bar both key off focus-visible, and a plain button
              // in normal document order joins the sequence without touching
              // either. Scroll anchoring is likewise untouched — it measures
              // `rowCount` from the props, not from the DOM, so an extra
              // element per thread never reads as arriving traffic.
              className={cn(
                'mt-0.5 rounded px-1 py-0.5 text-xs',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                // Quiet at rest, clearer under a pointer or a focus ring. It
                // sits under EVERY post, so at the weight of the thread toggle
                // a hundred of them would read as a hundred pending actions
                // instead of as a standing invitation.
                //
                // `text-white/*` on dark: the `text-text-*` tokens are tuned
                // for the light surface and go muddy to invisible over call
                // chrome.
                dark
                  ? 'text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80'
                  : 'text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary',
              )}
            >
              Reply
            </button>
          </div>
        )}
      </div>
      </Fragment>
    );
  }

  const panel = (
    <div
      data-testid="chat-panel"
      className={cn(
        // Deliberately NOT font-mono: a conversation is prose, not a
        // terminal log. Everything in here inherits the app's UI font.
        // Filling a dock: no card of its own (the dock IS the card) and no
        // top margin — that margin plus the card's padding was the empty
        // strip between the dock's tab bar and the first message.
        fills
          ? 'flex h-full min-h-0 flex-col px-3 pb-3 pt-2'
          : cn('border rounded p-3 mt-4', dark ? 'border-white/10 bg-white/5' : 'border-border'),
      )}
    >
      {/* Header */}
      {headerVisible && (
        <div className={cn('text-sm font-semibold mb-2 shrink-0', dark ? 'text-white/90' : 'text-text-primary')}>
          Chat ({messages.length})
        </div>
      )}

      {/* Typing banner. The shared TypingIndicator rather than a private copy
          of the same sentence: it is the one that carries
          `role="status" aria-live="polite"`, so a screen-reader user hears
          "Carol is typing…" instead of watching nothing happen. The two
          implementations had also already drifted — the private one wrote
          "typing..." where the shared one writes "typing…". */}
      {/* The only thing on this panel that SPEAKS. Visually hidden, never
          focusable, one sentence per arriving message. It is kept outside the
          scroller on purpose: a live region that is also the thing being
          scrolled gets its announcements confused with its own reflow. */}
      <span
        // The library's canonical clip rather than `sr-only`: a host that does
        // not run Tailwind over the library renders an `sr-only` span as
        // ordinary text, and this one would paint every incoming message
        // twice. See VisuallyHidden — the constant is exported for exactly
        // the cases (role, aria-live) the component cannot carry.
        style={VISUALLY_HIDDEN_STYLE}
        role="status"
        aria-live="polite"
        data-testid="chat-panel-announcer"
      >
        {announcement}
      </span>

      {/* Message list — the flexible region when filling, so the composer
          stays on the bottom edge and the slack goes to the messages.
          Wrapped so the "new messages" affordance can float over its
          bottom edge without joining the scroll content. */}
      <div className={cn('relative flex flex-col mb-2', fills ? 'min-h-0 flex-1' : '')}>
        <div
          ref={listRef}
          onScroll={handleListScroll}
          data-testid="chat-panel-messages"
          // A scrolling region with no name and no tab stop is, to a keyboard
          // user, a part of the page that does not exist: measured before this
          // change, the transcript was not among the 120 tab stops on the
          // Messages page, so there was no way to scroll back through it
          // without a pointer. `tabIndex={0}` makes it a stop; the label says
          // what was landed on.
          //
          // `role="log"` types the region correctly, and `aria-live="off"`
          // then suppresses its IMPLICIT polite announcement. That pairing is
          // deliberate: role=log would otherwise announce every mutation,
          // including the 50 rows a `Load earlier messages` prepend inserts —
          // a screen reader reading half an hour of backlog because the user
          // asked to see it. New traffic is announced instead by the
          // dedicated status region below, which speaks once per message.
          role="log"
          aria-live="off"
          aria-label="Message history"
          tabIndex={0}
          className={cn(
            'scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded',
            // A long thread runs off the top edge with a hard cut. The mask
            // softens the oldest visible messages so the list reads as
            // continuing rather than as starting there.
            //
            // A mask rather than an overlay gradient: an overlay has to be
            // painted in the pane's own background colour, which is wrong the
            // moment the surface is dark or tinted. A mask fades the content
            // itself and is correct on any background.
            scrolledFromTop && 'fade-top',
            fills ? 'min-h-0 flex-1' : 'max-h-[200px]',
          )}
        >
          {/* A short thread belongs at the BOTTOM of the pane, against the
              composer, not stranded at the top with four hundred pixels of
              empty white under it — which is what a channel with two messages
              in it looked like. `mt-auto` on a single wrapper does that and
              nothing else: with slack it pushes the content down, and once the
              thread overflows the auto margin resolves to zero and the list
              scrolls normally. (`justify-end` on the scroller itself would
              make the oldest messages unreachable.) */}
          {/* `pb-4`: the last message used to sit flush against the composer,
              with its reactions and its Reply control touching the input's top
              edge. Teams and Slack both leave a clear band there, and it is
              not decoration — the newest message is the one you are reading
              while you type a reply, and a line of text hard against a focused
              input reads as part of the input. */}
          <div className="mt-auto pb-4">
          {canLoadMore && messages.length > 0 && (
            <div className="flex justify-center pb-1">
              <button
                type="button"
                data-testid="chat-panel-load-more"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className={cn(
                  'rounded px-2 py-1 text-xs disabled:opacity-60',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  dark
                    ? 'text-white/70 hover:bg-white/10'
                    : 'text-text-secondary hover:bg-surface-hover',
                )}
              >
                {loadingMore ? 'Loading…' : 'Load earlier messages'}
              </button>
            </div>
          )}
          {timeline.length === 0 ? (
            emptyState ?? (
              <div className={cn('text-sm', dark ? 'text-white/40' : 'text-text-secondary')}>
                No messages yet
              </div>
            )
          ) : (
            threads ? (
              threads.map((group, index) => renderThread(group, index, threads[index - 1]))
            ) : (
              timeline.map((entry, index) =>
                renderTimelineEntry(
                  entry,
                  index,
                  timelineTimestamp(timeline[index - 1]),
                  timeline[index - 1],
                ),
              )
            )
          )}

          {onDeleteMessage && (
            <ConfirmDialog
              open={deletingId !== null}
              tone="destructive"
              title="Delete this message?"
              body="It will be removed for everyone in this conversation."
              confirmLabel="Delete"
              onCancel={() => setDeletingId(null)}
              onConfirm={() => {
                const target = messages.find((m) => m.id === deletingId);
                setDeletingId(null);
                if (target) void onDeleteMessage(target);
              }}
            />
          )}
          {/* In-flight transfers sit at the live edge, below every settled
              message. They are not messages yet — the message is written when
              the bytes land — but they occupy the place the message will take,
              so the thread does not visibly reflow when it arrives. */}
          {transfers.map((transfer) => (
            <MessageRow
              key={transfer.transferId}
              author={transfer.actor}
              timestamp=""
              tone={tone}
              content={
                <TransferBubble
                  transfer={transfer}
                  // Ownership is an ID question. `transfer.actor` is the
                  // sender's DISPLAY NAME and is used above only to label the
                  // row; comparing it to the viewer's name gave both people
                  // called "Alex" a cancel button on the other's upload, and
                  // moved ownership when either of them renamed.
                  mine={isOwnTransfer(transfer, currentUserId, currentActor)}
                  onCancel={onCancelTransfer}
                />
              }
            />
          ))}
          </div>
        </div>
        {unreadBelow > 0 && (
          <button
            type="button"
            data-testid="chat-panel-new-messages"
            onClick={scrollToBottom}
            className={cn(
              'absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              dark ? 'bg-white/20 text-white' : 'bg-primary text-white',
            )}
          >
            {unreadBelow} new message{unreadBelow === 1 ? '' : 's'} ↓
          </button>
        )}
      </div>

      {/* "Carol is typing…" sits between the thread and the composer — where
          the reply is about to appear — not at the top of the pane, where
          on an empty channel it stood alone under the header. */}
      {typingUsers.length > 0 && (
        <TypingIndicator
          names={typingUsers}
          className={cn('mb-1 mt-1 shrink-0 italic', dark ? 'text-white/50' : 'text-text-secondary')}
        />
      )}

      {/* Input row — or whatever the host put in its place. */}
      {composer ? (
        <div
          className="shrink-0"
          data-testid="chat-panel-composer-slot"
          // Capture, so a slot composer that stops propagation on its own
          // keydowns (ProseMirror keymaps routinely do) is still observed.
          // The panel never READS the key — it only learns that one happened.
          onKeyDownCapture={onTyping ? noteTyping : undefined}
        >
          {composer}
        </div>
      ) : (
      <div className="flex flex-row items-center gap-2 shrink-0">
        {onSendFiles && (
          <>
            <button
              type="button"
              data-testid="chat-panel-attach"
              aria-label="Attach a file"
              title="Attach a file"
              disabled={!attachmentsEnabled}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'shrink-0 rounded p-1.5 disabled:opacity-40',
                dark
                  ? 'text-white/60 hover:bg-white/10'
                  : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              )}
            >
              <PaperclipGlyph />
            </button>
            <FileInput
              ref={fileInputRef}
              multiple
              accept={acceptFiles}
              onFiles={(picked) => {
                const tooBig = maxFileSize ? picked.filter((f) => f.size > maxFileSize) : [];
                if (tooBig.length > 0) {
                  onFileError?.(`Skipped ${tooBig.length} file(s) over the size limit.`);
                }
                handleFiles(picked.filter((f) => !tooBig.includes(f)));
              }}
            />
          </>
        )}

        <button
          ref={emojiTriggerRef}
          type="button"
          data-testid="chat-panel-emoji"
          aria-label="Insert emoji"
          aria-expanded={emojiOpen}
          title="Insert emoji"
          disabled={disabled}
          onClick={() => setEmojiOpen((o) => !o)}
          className={cn(
            'shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40',
            dark ? 'hover:bg-white/10' : 'hover:bg-[var(--color-surface-hover)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          )}
        >
          <span aria-hidden="true">🙂</span>
        </button>
        <ReactionPickerPopover
          open={emojiOpen}
          onSelect={insertEmoji}
          onClose={() => setEmojiOpen(false)}
          triggerRef={emojiTriggerRef}
          emojis={emojis}
        />

        <Input
          size="sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          disabled={disabled}
          placeholder={disabled ? 'Not connected' : 'Type a message...'}
          className={cn(
            'flex-1 text-sm',
            dark &&
              'border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20',
          )}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={handleSend}
          disabled={disabled || !inputValue.trim()}
          className="text-sm px-3 shrink-0"
        >
          Send
        </Button>
      </div>
      )}
    </div>
  );

  // A panel with no upload transport is not a drop target — advertising one
  // would promise a capability the host cannot deliver.
  if (!onSendFiles) return panel;

  return (
    <ChatDropZone
      onFiles={handleFiles}
      accept={acceptFiles}
      maxSize={maxFileSize}
      onError={onFileError}
      disabled={disabled}
      className={fills ? 'flex h-full min-h-0 flex-col' : undefined}
    >
      {panel}
    </ChatDropZone>
  );
}

function PaperclipGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
