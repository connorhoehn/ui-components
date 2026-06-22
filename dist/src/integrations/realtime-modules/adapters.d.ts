import { RMChatMessage, RMPresenceEntry, RMReaction, RMActivityEvent, RMFileUploadState, RMHangoutParticipant, RMNotificationEntry } from './types';
import { ChatMessage as UIChatMessage } from '../../hooks/useChat';
import { PresenceUser as UIPresenceUser } from '../../components/shared/PresenceAvatars';
import { EphemeralReaction as UIEphemeralReaction } from '../../hooks/useReactions';
import { ActivityFeedItem } from '../../components/shared/ActivityFeed';
import { HangoutLayoutParticipant } from '../../components/video/HangoutLayout';
import { NotificationItem as UINotificationItem } from '../../components/shared/NotificationCenter';
export declare function adaptChatMessage(msg: RMChatMessage): UIChatMessage;
export declare function adaptChatMessages(messages: RMChatMessage[]): UIChatMessage[];
export declare function adaptPresenceEntry(entry: RMPresenceEntry): UIPresenceUser;
export declare function adaptPresenceRoster(roster: RMPresenceEntry[]): UIPresenceUser[];
export declare function adaptReaction(reaction: RMReaction, index: number): UIEphemeralReaction;
export declare function adaptReactions(reactions: RMReaction[]): UIEphemeralReaction[];
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
}
export declare function adaptFileUploadState(state: RMFileUploadState): FileUploadSummary;
export declare function adaptFileUploads(uploads: RMFileUploadState[]): FileUploadSummary[];
export declare function adaptHangoutParticipant(participant: RMHangoutParticipant, localClientId?: string | null): HangoutLayoutParticipant;
export declare function adaptHangoutParticipants(participants: RMHangoutParticipant[], localClientId?: string | null): HangoutLayoutParticipant[];
export declare function adaptNotification(n: RMNotificationEntry): UINotificationItem;
export declare function adaptNotifications(entries: RMNotificationEntry[]): UINotificationItem[];
//# sourceMappingURL=adapters.d.ts.map