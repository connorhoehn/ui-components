// src/integrations/realtime-modules/adapters.ts
//
// Field-by-field adapters between realtime-modules hook outputs and
// ui-components component prop shapes.
//
// None of these adapters import from realtime-modules at runtime — they work
// on plain structural types so the package stays an optional peer dep.
// Use the type imports in types.ts for the structural contracts.

import type {
  RMChatMessage,
  RMPresenceEntry,
  RMReaction,
  RMActivityEvent,
  RMFileUploadState,
  RMHangoutParticipant,
  RMNotificationEntry,
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

export function adaptChatMessage(msg: RMChatMessage): UIChatMessage {
  // Attachments ride in `metadata` because that is the field the chat wire
  // format already carries verbatim — which means a file shared today is
  // ordered, persisted and replayed by the exact same path as the text
  // around it, with no second stream to merge and no history migration.
  const raw = msg.metadata?.attachments;
  const attachments = Array.isArray(raw)
    ? (raw.filter(
        (a): a is UIChatAttachment =>
          !!a && typeof a === 'object' && typeof (a as UIChatAttachment).url === 'string',
      ))
    : undefined;
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
    displayName: (msg.metadata?.displayName as string | undefined) ?? undefined,
    avatarUrl: (msg.metadata?.avatarUrl as string | undefined) ?? undefined,
    ...(attachments && attachments.length > 0 ? { attachments } : {}),
    // The whole bag rides through. ChatPanel reads it for the things a
    // transcript renders as objects rather than sentences — a document that
    // was created, a call that happened, the rich `html` body, the `replyTo`
    // quote, the truncation markers — and every one of those readers returns
    // null on a message whose metadata was left behind. Pulling two fields
    // out of the bag and discarding the rest meant a host using this adapter
    // got a strictly worse thread than one that wired the hook up by hand.
    ...(msg.metadata ? { metadata: msg.metadata } : {}),
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
  const userId = entry.metadata?.userId;
  return {
    id: typeof userId === 'string' && userId ? userId : entry.clientId,
    name:
      (entry.metadata?.displayName as string | undefined) ??
      entry.clientId.slice(0, 12),
    avatarUrl: (entry.metadata?.avatarUrl as string | undefined) ?? undefined,
    online: entry.status !== 'offline',
  };
}

/**
 * The roster as PEOPLE. Presence has one row per connection, so someone with
 * the app open in two tabs arrived twice — two identical avatars side by side,
 * and a participant count that read one higher than the number of humans.
 *
 * First entry wins for name and avatar; online-ness is the OR across a
 * person's connections, because a stale tab must not be able to grey out
 * someone who is sitting right there in another one.
 */
export function adaptPresenceRoster(roster: RMPresenceEntry[]): UIPresenceUser[] {
  const byId = new Map<string, UIPresenceUser>();
  for (const entry of roster) {
    const adapted = adaptPresenceEntry(entry);
    const existing = byId.get(adapted.id);
    if (!existing) {
      byId.set(adapted.id, adapted);
      continue;
    }
    if (adapted.online && !existing.online) {
      byId.set(adapted.id, { ...existing, online: true });
    }
  }
  return [...byId.values()];
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
}

export function adaptFileUploadState(state: RMFileUploadState): FileUploadSummary {
  return {
    id: state.id,
    filename: state.filename,
    progress: state.progress ?? 0,
    status: state.status,
    downloadUrl: state.downloadUrl,
    error: state.error,
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
//   (no avatarUrl in RM type; taken from metadata if present)
//   (isLocal must be set by the caller who knows their own clientId)
// ---------------------------------------------------------------------------

export function adaptHangoutParticipant(
  participant: RMHangoutParticipant,
  localClientId?: string | null,
): HangoutLayoutParticipant {
  return {
    id: participant.clientId,
    displayName:
      participant.displayName ?? participant.clientId.slice(0, 12),
    isMuted: !participant.audioOn,
    isLocal: localClientId != null ? participant.clientId === localClientId : undefined,
  };
}

export function adaptHangoutParticipants(
  participants: RMHangoutParticipant[],
  localClientId?: string | null,
): HangoutLayoutParticipant[] {
  return participants.map((p) => adaptHangoutParticipant(p, localClientId));
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
