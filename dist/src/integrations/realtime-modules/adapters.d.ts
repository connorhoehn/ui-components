import type { CursorOverlayEntry } from '../../components/collaboration/CursorOverlay';
import type { RMCursorEntry, RMChatMessage, RMPresenceEntry, RMReaction, RMActivityEvent, RMFileUploadState, RMHangoutParticipant, RMNotificationEntry, RMUseReactionsReturn } from './types';
import type { ChatMessage as UIChatMessage } from '../../hooks/useChat';
import type { PresenceUser as UIPresenceUser } from '../../components/shared/PresenceAvatars';
import type { EphemeralReaction as UIEphemeralReaction } from '../../hooks/useReactions';
import type { ActivityFeedItem } from '../../components/shared/ActivityFeed';
import type { HangoutLayoutParticipant } from '../../components/video/HangoutLayout';
import type { NotificationItem as UINotificationItem } from '../../components/shared/NotificationCenter';
export declare function adaptChatMessage(msg: RMChatMessage): UIChatMessage;
export declare function adaptChatMessages(messages: RMChatMessage[]): UIChatMessage[];
export declare function adaptPresenceEntry(entry: RMPresenceEntry): UIPresenceUser;
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
export declare function adaptPresenceRoster(roster: RMPresenceEntry[]): UIPresenceUser[];
export declare function adaptReaction(reaction: RMReaction, index: number): UIEphemeralReaction;
export declare function adaptReactions(reactions: RMReaction[]): UIEphemeralReaction[];
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
export declare function adaptMessageReactions(hook: RMUseReactionsReturn, messageId: string): UIMessageReaction[];
export declare function adaptActivityEvent(event: RMActivityEvent): ActivityFeedItem;
export declare function adaptActivityEvents(events: RMActivityEvent[]): ActivityFeedItem[];
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
export declare function adaptFileUploadState(state: RMFileUploadState): FileUploadSummary;
export declare function adaptFileUploads(uploads: RMFileUploadState[]): FileUploadSummary[];
export declare function adaptHangoutParticipant(participant: RMHangoutParticipant, localClientId?: string | null, 
/** Resolved by the host from its own directory — see the note above. */
avatarUrl?: string): HangoutLayoutParticipant;
export declare function adaptHangoutParticipants(participants: RMHangoutParticipant[], localClientId?: string | null, 
/** clientId → avatar URL, resolved by the host. */
avatarUrls?: Record<string, string | undefined>): HangoutLayoutParticipant[];
export declare function adaptNotification(n: RMNotificationEntry): UINotificationItem;
export declare function adaptNotifications(entries: RMNotificationEntry[]): UINotificationItem[];
/**
 * Cursor entries -> overlay entries. Only freeform/canvas positions (numeric
 * x and y) can be drawn over content; table/text cursors are skipped. The
 * service-assigned `userColor` is kept: it is what tells collaborators apart.
 */
export declare function adaptCursors(cursors: readonly RMCursorEntry[]): CursorOverlayEntry[];
//# sourceMappingURL=adapters.d.ts.map