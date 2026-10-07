// src/integrations/realtime-modules/adapters.ts
//
// Field-by-field adapters between realtime-modules hook outputs and
// ui-components component prop shapes.
//
// None of these adapters import from realtime-modules at runtime — they work
// on plain structural types so the package stays an optional peer dep.
// Use the type imports in types.ts for the structural contracts.

import type { CursorOverlayEntry } from '../../components/collaboration/CursorOverlay';
import type {
  RMCursorEntry,
  RMChatMessage,
  RMPresenceEntry,
  RMReaction,
  RMActivityEvent,
  RMFileUploadState,
  RMHangoutParticipant,
  RMNotificationEntry,
  RMUseReactionsReturn,
} from './types';

import type { ChatMessage as UIChatMessage } from '../../hooks/useChat';
import type { ChatAttachment as UIChatAttachment } from '../../components/social/ChatAttachment';
import type { PresenceUser as UIPresenceUser } from '../../components/shared/PresenceAvatars';
import type { EphemeralReaction as UIEphemeralReaction } from '../../hooks/useReactions';
import type { ActivityFeedItem } from '../../components/shared/ActivityFeed';
import type { HangoutLayoutParticipant } from '../../components/video/HangoutLayout';
import type { NotificationItem as UINotificationItem } from '../../components/shared/NotificationCenter';

// ---------------------------------------------------------------------------
// Chat adapters
//
// realtime-modules ChatMessage.message (string) → ui-components ChatMessage.content
// realtime-modules ChatMessage.metadata?.displayName → ChatMessage.displayName
// realtime-modules ChatMessage.metadata?.avatarUrl → ChatMessage.avatarUrl
// ---------------------------------------------------------------------------

/** A string, or undefined. Metadata is sender-supplied and not a contract. */
function str(v: unknown): string | undefined {
  return typeof v === 'string' ? v : undefined;
}

/**
 * The quote a reply answers, rebuilt rather than trusted.
 *
 * Everything else in `metadata` is text the renderer treats as text; this one
 * is consumed STRUCTURALLY (author, text, jump target), so a malformed one is
 * a render crash in every recipient's thread rather than a bad string — a
 * remarkably cheap denial of service. Returns null for anything that names no
 * message, because a quote with no jump target is a control that goes nowhere.
 */
function normalizeReplyTo(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== 'object') return null;
  const rt = raw as Record<string, unknown>;
  if (typeof rt.messageId !== 'string' || !rt.messageId) return null;
  return {
    messageId: rt.messageId,
    author: str(rt.author) ?? 'Unknown',
    text: str(rt.text) ?? '',
    ...(str(rt.timestamp) ? { timestamp: rt.timestamp as string } : {}),
  };
}

export function adaptChatMessage(msg: RMChatMessage): UIChatMessage {
  // Attachments ride in `metadata` because that is the field the chat wire
  // format already carries verbatim — which means a file shared today is
  // ordered, persisted and replayed by the exact same path as the text
  // around it, with no second stream to merge and no history migration.
  //
  // They arrive as whatever the sender put there, so treat them as untrusted
  // and keep only entries that structurally look like one. `id` is checked as
  // well as `url`: it is the correlation id shared with the sender's in-flight
  // transfer and the React key for the row, so an entry without one renders a
  // keyless bubble that can never be matched to the transfer it completed.
  const raw = msg.metadata?.attachments;
  const attachments = Array.isArray(raw)
    ? (raw.filter(
        (a): a is UIChatAttachment =>
          !!a &&
          typeof a === 'object' &&
          typeof (a as UIChatAttachment).url === 'string' &&
          typeof (a as UIChatAttachment).id === 'string',
      ))
    : undefined;

  // The whole bag rides through. ChatPanel reads it for the things a
  // transcript renders as objects rather than sentences — a document that
  // was created, a call that happened, the rich `html` body, the `replyTo`
  // quote, the truncation markers — and every one of those readers returns
  // null on a message whose metadata was left behind. Pulling two fields
  // out of the bag and discarding the rest meant a host using this adapter
  // got a strictly worse thread than one that wired the hook up by hand.
  //
  // Pass-through is safe on VOLUME: the gateway already bounds metadata (key
  // count and byte size) before it is stored or fanned out. What this layer
  // owns is SHAPE, and exactly two fields are consumed structurally —
  // `attachments`, filtered above, and `replyTo`, rebuilt below.
  let metadata: Record<string, unknown> | undefined;
  if (msg.metadata) {
    const { replyTo: rawReplyTo, ...passthrough } = msg.metadata;
    const out: Record<string, unknown> = { ...passthrough };
    const replyTo = normalizeReplyTo(rawReplyTo);
    if (replyTo) out.replyTo = replyTo;
    metadata = Object.keys(out).length > 0 ? out : undefined;
  }

  return {
    id: msg.id,
    clientId: msg.clientId,
    // Carried, not derived. `isMine` keys on the authenticated userId and
    // never on clientId, which changes on every reconnect — so dropping this
    // made every message in an embedded transcript somebody else's, including
    // your own, and no amount of styling could put them on the right side.
    ...(msg.userId ? { userId: msg.userId } : {}),
    content: msg.message,
    timestamp: msg.timestamp,
    displayName: str(msg.metadata?.displayName),
    avatarUrl: str(msg.metadata?.avatarUrl),
    ...(attachments && attachments.length > 0 ? { attachments } : {}),
    ...(metadata ? { metadata } : {}),
    ...(msg.editedAt ? { editedAt: msg.editedAt } : {}),
    ...(msg.deletedAt ? { deletedAt: msg.deletedAt } : {}),
  };
}

export function adaptChatMessages(messages: RMChatMessage[]): UIChatMessage[] {
  return messages.map(adaptChatMessage);
}

// ---------------------------------------------------------------------------
// Presence adapters
//
// realtime-modules PresenceEntry.clientId → PresenceUser.id
// realtime-modules PresenceEntry.metadata.displayName → PresenceUser.name
// realtime-modules PresenceEntry.metadata.avatarUrl → PresenceUser.avatarUrl
// realtime-modules PresenceEntry.status ("online"/"away"/"busy"/"offline") → PresenceUser.online
// ---------------------------------------------------------------------------

export function adaptPresenceEntry(entry: RMPresenceEntry): UIPresenceUser {
  // The USER, not the connection, when presence carries one.
  //
  // `id` is what comes back to `onUserClick`, and a host answering that click
  // wants to do something to a PERSON — open the DM, start the call. A
  // clientId identifies a socket: it changes on every reconnect and there is
  // one per tab, so it cannot be looked up in any directory the host has.
  const userId = str(entry.metadata?.userId);
  return {
    id: userId || entry.clientId,
    name: str(entry.metadata?.displayName) ?? entry.clientId.slice(0, 12),
    avatarUrl: str(entry.metadata?.avatarUrl),
    online: entry.status !== 'offline',
    // Presence has four states and PresenceAvatars has three dots. Collapsing
    // `away` and `busy` into a plain green "online" was the whole difference
    // between a roster and a list of names: someone who stepped away read as
    // sitting right there. `idle` wins over `online` for the dot colour, which
    // is exactly the amber these two statuses want.
    ...(entry.status === 'away' || entry.status === 'busy' ? { idle: true } : {}),
  };
}

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
export function adaptPresenceRoster(roster: RMPresenceEntry[]): UIPresenceUser[] {
  interface Merged {
    id: string;
    /** From metadata, across ALL of the person's sessions. */
    name?: string;
    avatarUrl?: string;
    fallbackName: string;
    online: boolean;
    /** True only while every session seen so far says away/busy. */
    idle: boolean;
  }
  const byId = new Map<string, Merged>();

  for (const entry of roster) {
    const id = str(entry.metadata?.userId) || entry.clientId;
    const online = entry.status !== 'offline';
    const idle = entry.status === 'away' || entry.status === 'busy';
    const existing = byId.get(id);
    if (!existing) {
      byId.set(id, {
        id,
        name: str(entry.metadata?.displayName),
        avatarUrl: str(entry.metadata?.avatarUrl),
        fallbackName: entry.clientId.slice(0, 12),
        online,
        idle,
      });
      continue;
    }
    // First non-empty wins per FIELD, not per row: a tab that has not
    // published its metadata yet must not blank out a name the other tab
    // already published.
    existing.name ??= str(entry.metadata?.displayName);
    existing.avatarUrl ??= str(entry.metadata?.avatarUrl);
    existing.online = existing.online || online;
    existing.idle = existing.idle && idle;
  }

  return [...byId.values()].map((m) => ({
    id: m.id,
    name: m.name ?? m.fallbackName,
    avatarUrl: m.avatarUrl,
    online: m.online,
    // Away only while nobody is actually here. `idle: false` and absent mean
    // the same thing to PresenceAvatars, so only the true case is emitted.
    ...(m.online && m.idle ? { idle: true } : {}),
  }));
}

// ---------------------------------------------------------------------------
// Reactions adapters
//
// realtime-modules Reaction → EphemeralReaction (adds x/y position since
// the raw Reaction.position is opaque — we assign a deterministic spread).
//
// Pass `index` (position in the reactions array) to get a spread position.
// ---------------------------------------------------------------------------

const X_SPREAD = [15, 25, 35, 45, 55, 65, 75, 85] as const;
const Y_SPREAD = [20, 35, 50, 65, 80] as const;

export function adaptReaction(reaction: RMReaction, index: number): UIEphemeralReaction {
  // Spread across a grid so simultaneous reactions don't stack
  const x = X_SPREAD[index % X_SPREAD.length] ?? 50;
  const y = Y_SPREAD[Math.floor(index / X_SPREAD.length) % Y_SPREAD.length] ?? 50;

  // If the reaction carries an explicit {x, y} position, prefer it
  const pos =
    reaction.position != null && typeof reaction.position === 'object'
      ? (reaction.position as { x?: number; y?: number })
      : null;

  return {
    id: reaction.id,
    emoji: reaction.emoji,
    x: pos?.x ?? x,
    y: pos?.y ?? y,
    timestamp: reaction.timestamp,
  };
}

export function adaptReactions(reactions: RMReaction[]): UIEphemeralReaction[] {
  return reactions.map(adaptReaction);
}

// ---------------------------------------------------------------------------
// Message reactions
//
// A DIFFERENT feature from the floating overlay above, sharing one hook and
// one wire type. The overlay renders a reaction as a moment that happened; a
// reaction CHIP renders it as state on a message — grouped by emoji, counted,
// and answering "did I react?".
//
// That question is answerable only from `userId`, which the mirror type did
// not declare and this adapter therefore could not carry. The result was a
// whole feature missing from the embed path with nothing failing: an embedder
// wiring useReactions to ChatPanel got the confetti and never a chip.
// ---------------------------------------------------------------------------

/** One reaction as ChatPanel's `reactionsFor` wants it. */
export interface UIMessageReaction {
  emoji: string;
  userId: string;
  displayName?: string;
}

/**
 * The reactions on one message, in ChatPanel's shape.
 *
 * `userId` falls back to `clientId` only when the server resolved no identity
 * — imperfect (it changes on reconnect, so "did I react?" goes stale) but
 * better than an empty string, which would make every anonymous reaction the
 * same person's.
 */
export function adaptMessageReactions(
  hook: RMUseReactionsReturn,
  messageId: string,
): UIMessageReaction[] {
  const forTarget = hook.reactionsFor
    ? hook.reactionsFor(messageId)
    : hook.reactions.filter((r) => r.targetId === messageId);
  return forTarget.map((r) => ({
    emoji: r.emoji,
    userId: r.userId ?? r.clientId,
    displayName: r.displayName,
  }));
}

// ---------------------------------------------------------------------------
// Activity adapters
//
// realtime-modules ActivityEvent → ActivityFeedItem
//
// Mapping:
//   eventType             → kind (used for dot colour)
//   displayName           → actor
//   detail.action / verb derived from eventType → action
//   detail.subject / detail.contentId / eventType → subject
//   timestamp             → timeLabel (relative)
// ---------------------------------------------------------------------------

function relativeLabel(isoTs: string): string {
  try {
    const diffMs = Date.now() - new Date(isoTs).getTime();
    const secs = Math.floor(diffMs / 1000);
    if (secs < 60) return 'just now';
    if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
    if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
    return isoTs.slice(0, 10);
  } catch {
    return '';
  }
}

const EVENT_VERB: Record<string, string> = {
  'social.room.join': 'joined',
  'social.room.leave': 'left',
  'social.follow': 'followed',
  'social.unfollow': 'unfollowed',
  'social.like': 'liked',
  'social.reaction': 'reacted',
  'social.post.created': 'posted',
  'social.comment.created': 'commented',
  'pipeline.run.started': 'triggered',
  'pipeline.run.completed': 'completed',
  'pipeline.run.failed': 'failed',
  'pipeline.approval.requested': 'requested approval',
};

function deriveSubject(event: RMActivityEvent): string {
  const d = event.detail;
  if (typeof d.subject === 'string') return d.subject;
  if (typeof d.contentId === 'string') return d.contentId.slice(0, 12);
  if (typeof d.roomId === 'string') return `room:${(d.roomId as string).slice(0, 8)}`;
  if (typeof d.pipelineId === 'string') return `pipeline:${(d.pipelineId as string)}`;
  return event.eventType;
}

/**
 * A stable id, derived from the event itself.
 *
 * This used to be a module-level counter, which meant the SAME event got a
 * different id every time it was adapted. ActivityFeed keys its rows on this,
 * so every row unmounted and remounted whenever the feed was re-adapted —
 * which is every time a new event arrives, since that produces a new array.
 * The rotation timers reset with them, so the feed could stop rotating
 * entirely under a parent that re-rendered briskly. WrappedActivityPanel had
 * already reached for a useMemo against the symptom; the ids themselves were
 * the cause, and a memo cannot help when the input array is genuinely new.
 *
 * realtime-modules does not stamp activity events with an id, so the content
 * is the identity: what happened, when, who did it, to what.
 */
function activityId(event: RMActivityEvent, subject: string): string {
  return [event.eventType, event.timestamp, event.userId ?? event.displayName, subject].join('|');
}

export function adaptActivityEvent(event: RMActivityEvent): ActivityFeedItem {
  return {
    id: activityId(event, deriveSubject(event)),
    actor: event.displayName,
    action: EVENT_VERB[event.eventType] ?? event.eventType.split('.').pop() ?? 'did',
    subject: deriveSubject(event),
    ticketId:
      typeof event.detail.ticketId === 'string' ? event.detail.ticketId : undefined,
    timeLabel: relativeLabel(event.timestamp),
    kind: event.eventType.split('.')[0], // e.g. "social", "pipeline"
  };
}

export function adaptActivityEvents(events: RMActivityEvent[]): ActivityFeedItem[] {
  // Two genuinely identical events — same actor, same subject, same
  // millisecond — would otherwise share a key. Disambiguate by how many of
  // that exact event we have already seen in THIS list, which stays stable as
  // long as the list does.
  const seen = new Map<string, number>();
  return events.map((event) => {
    const item = adaptActivityEvent(event);
    const n = seen.get(item.id) ?? 0;
    seen.set(item.id, n + 1);
    return n === 0 ? item : { ...item, id: `${item.id}#${n}` };
  });
}

// ---------------------------------------------------------------------------
// FileUpload adapters
//
// realtime-modules FileUploadState is self-contained; FileUploadDrop just
// needs onFiles → upload callback. We expose a helper that maps the uploads
// array to a displayable summary the app can render however it likes.
// ---------------------------------------------------------------------------

export interface FileUploadSummary {
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

export function adaptFileUploadState(state: RMFileUploadState): FileUploadSummary {
  return {
    id: state.id,
    filename: state.filename,
    progress: state.progress ?? 0,
    status: state.status,
    downloadUrl: state.downloadUrl,
    error: state.error,
    transferId: state.transferId,
    size: state.size,
  };
}

export function adaptFileUploads(uploads: RMFileUploadState[]): FileUploadSummary[] {
  return uploads.map(adaptFileUploadState);
}

// ---------------------------------------------------------------------------
// VideoHangout adapters
//
// realtime-modules HangoutParticipant → HangoutLayoutParticipant
//
// Mapping:
//   clientId    → id
//   displayName → displayName (with clientId fallback)
//   audioOn     → isMuted (inverted)
//   (isLocal must be set by the caller who knows their own clientId)
//
// `avatarUrl` has no source: realtime-modules' HangoutParticipant carries only
// clientId/displayName/role/videoOn/audioOn/joinedAt. The comment here used to
// claim it was "taken from metadata if present", which was never true and
// there is no metadata field to take it from — a host that wants faces on
// tiles has to resolve them from its own directory and pass them in.
//
// `videoOn` and `role` are deliberately dropped: HangoutLayoutParticipant has
// no field for either. A camera-off tile is expressed by supplying no
// `videoElement`, which the caller owns.
// ---------------------------------------------------------------------------

export function adaptHangoutParticipant(
  participant: RMHangoutParticipant,
  localClientId?: string | null,
  /** Resolved by the host from its own directory — see the note above. */
  avatarUrl?: string,
): HangoutLayoutParticipant {
  return {
    id: participant.clientId,
    displayName: participant.displayName || participant.clientId.slice(0, 12),
    isMuted: !participant.audioOn,
    isLocal: localClientId != null ? participant.clientId === localClientId : undefined,
    ...(avatarUrl ? { avatarUrl } : {}),
  };
}

export function adaptHangoutParticipants(
  participants: RMHangoutParticipant[],
  localClientId?: string | null,
  /** clientId → avatar URL, resolved by the host. */
  avatarUrls?: Record<string, string | undefined>,
): HangoutLayoutParticipant[] {
  return participants.map((p) =>
    adaptHangoutParticipant(p, localClientId, avatarUrls?.[p.clientId]),
  );
}

// ---------------------------------------------------------------------------
// Notification adapters
//
// realtime-modules NotificationEntry → NotificationCenter NotificationItem
//
// Mapping:
//   id           → id
//   type         → category (used for grouping / colouring)
//   title        → title
//   body         → body
//   timestamp    → timestamp
//   read         → read (defaults false when absent)
//   payload.icon → icon (optional decoration)
// ---------------------------------------------------------------------------

export function adaptNotification(n: RMNotificationEntry): UINotificationItem {
  return {
    id: n.id,
    title: n.title,
    body: n.body,
    timestamp: n.timestamp,
    read: n.read ?? false,
    category: n.type,
    icon: typeof n.payload?.icon === 'string' ? n.payload.icon : undefined,
  };
}

export function adaptNotifications(entries: RMNotificationEntry[]): UINotificationItem[] {
  return entries.map(adaptNotification);
}

/**
 * Cursor entries -> overlay entries. Only freeform/canvas positions (numeric
 * x and y) can be drawn over content; table/text cursors are skipped. The
 * service-assigned `userColor` is kept: it is what tells collaborators apart.
 */
export function adaptCursors(cursors: readonly RMCursorEntry[]): CursorOverlayEntry[] {
  const out: CursorOverlayEntry[] = [];
  for (const c of cursors) {
    const { x, y } = c.position as { x?: unknown; y?: unknown };
    if (typeof x !== 'number' || typeof y !== 'number') continue;
    const m = c.metadata ?? {};
    const name = typeof m.displayName === 'string' ? m.displayName : undefined;
    out.push({
      clientId: c.clientId,
      x,
      y,
      label: name ?? (typeof m.userInitials === 'string' ? m.userInitials : undefined),
      color: typeof m.userColor === 'string' ? m.userColor : undefined,
    });
  }
  return out;
}
