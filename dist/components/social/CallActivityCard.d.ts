/** How an invite that never became a call ended. */
export type CallOutcome = 'cancelled' | 'declined' | 'no-answer';
export interface CallActivityParticipant {
    userId: string;
    displayName?: string;
    avatarUrl?: string;
}
export interface CallActivityCardProps {
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
     * When the call started (ISO string or epoch ms). While live, the card
     * counts up from it — "Live · 3:12" — on the reader's clock.
     */
    startedAt?: string | number;
    /**
     * Set when the invite never became a call: the card reads "Missed call",
     * "Declined" or "No answer" instead of a duration, and shows no roster.
     */
    outcome?: CallOutcome;
    /** The recording of this call, once there is one — with `onOpenRecording`, a link to it. */
    recordingId?: string;
    onOpenRecording?: (recordingId: string) => void;
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
/** "12m 4s" — the shape a transcript wants, not "00:12:04". */
export declare function formatCallDuration(ms: number): string;
/**
 * Names, not ids, and never more than two before it starts counting.
 *
 * Counts EVERY participant, including the ones it cannot name — they are
 * faces in the row beside this sentence, so leaving them out of the sentence
 * makes the two disagree about how many people were there.
 */
export declare function describeParticipants(participants: readonly CallActivityParticipant[], live: boolean): string;
/**
 * The one-line reason a call was not recorded, in words a person can act on.
 *
 * The codes are platform-api's `recording.reason` vocabulary. Each maps to
 * what the person can DO about it — turn the room setting on, or opt in on
 * their profile — because "not recorded" alone sends them looking for a
 * setting they cannot name. An unknown code still gets the plain statement:
 * saying nothing would read as "recorded", which is the one thing it is not.
 */
export declare function describeNotRecorded(reason: string | undefined, lobbyName?: string): string;
/** "3:12", "1:02:03" — a clock, because this one is running. */
export declare function formatElapsed(ms: number): string;
/**
 * Milliseconds since `startedAt`, re-read every second while `running`.
 * Null when there is no start to count from — the card then says "Live"
 * without a number rather than counting from a made-up zero.
 */
export declare function useElapsedMs(startedAt: string | number | undefined, running: boolean): number | null;
/** The headline for an invite that never became a call. */
export declare function describeOutcome(outcome: CallOutcome): string;
export declare function CallActivityCard({ callId, startedBy, participants, live, durationMs, startedAt, outcome, recordingId, onOpenRecording, audioOnly, recorded, notRecordedReason, lobbyName, onJoin, className, 'data-testid': testId, }: CallActivityCardProps): import("react").JSX.Element;
export default CallActivityCard;
//# sourceMappingURL=CallActivityCard.d.ts.map