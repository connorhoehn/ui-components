/**
 * useActiveSpeaker — detects the loudest currently-speaking participant
 * via Web Audio API analysis of each MediaStream.
 *
 * Wave 7 refactor: previously created one `AudioContext` per
 * participant, which (a) Chrome warns about past 6 contexts and (b)
 * hits a hard browser limit around 25. Now uses a SINGLE shared
 * AudioContext + per-participant `MediaStreamAudioSourceNode →
 * AnalyserNode`. Drops N contexts → 1 with no semantic change.
 *
 * Hold (2.407.7): with several people talking at once the loudest voice
 * changes on nearly every poll, so the speaking ring used to jump every
 * 200 ms. The active speaker now changes only when a DIFFERENT participant
 * has been the loudest on every poll for at least `holdMs` (default 600)
 * and, on each of those polls, louder than the current speaker by more than
 * `marginDb` (default 3). Silence is held the same way: the ring clears once
 * nobody has been above `threshold` for `holdMs`. The first speaker after
 * silence takes the ring at once. `holdMs: 0` is the old behaviour — the
 * loudest voice on every poll.
 */
interface ParticipantWithStreams {
    participantId: string;
    streams: MediaStream[];
}
interface UseActiveSpeakerOptions {
    participants: ParticipantWithStreams[];
    threshold?: number;
    smoothingTimeConstant?: number;
    pollIntervalMs?: number;
    /**
     * How long (ms) a different participant must stay the loudest before the
     * ring moves to them — and how long silence must last before it clears.
     * Default 600. `0` switches on every poll (the pre-2.407.7 behaviour).
     */
    holdMs?: number;
    /**
     * How much louder (dB) than the current speaker a challenger must be, on
     * every poll of the hold, to count. Default 3. Ignored when `holdMs` is 0.
     */
    marginDb?: number;
}
export declare function useActiveSpeaker({ participants, threshold, smoothingTimeConstant, pollIntervalMs, holdMs, marginDb, }: UseActiveSpeakerOptions): {
    activeSpeakerId: string | null;
};
export {};
//# sourceMappingURL=useActiveSpeaker.d.ts.map