/** Where the recording is on its way to being watchable. */
/** `gone`: the recording no longer exists — expired or removed — so the card is the record of a thing that was. */
export type RecordingStage = 'saving' | 'transcribing' | 'summarizing' | 'ready' | 'failed' | 'gone';
export interface RecordingParticipant {
    id: string;
    name: string;
    avatarUrl?: string;
    color?: string;
}
export interface RecordingActivityCardProps {
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
/** "Mia Zhao and 2 others" — the sentence beside the avatar row. */
export declare function describeRecordingParticipants(participants: readonly RecordingParticipant[], total: number): string;
export declare function RecordingActivityCard({ recordingId, title, recordedBy, participants, participantCount, startedAt, durationMs, thumbnailUrl, stage, transcriptReady, summaryReady, expiresAt, pinned, onOpen, onCopyLink, onShare, onTogglePin, onDownload, onOpenTranscript, onManageExpiry, onParticipantClick, className, 'data-testid': testId, }: RecordingActivityCardProps): import("react").JSX.Element;
export default RecordingActivityCard;
//# sourceMappingURL=RecordingActivityCard.d.ts.map