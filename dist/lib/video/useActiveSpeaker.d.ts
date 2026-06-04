/**
 * useActiveSpeaker — detects the loudest currently-speaking participant
 * via Web Audio API analysis of each MediaStream.
 *
 * Wave 7 refactor: previously created one `AudioContext` per
 * participant, which (a) Chrome warns about past 6 contexts and (b)
 * hits a hard browser limit around 25. Now uses a SINGLE shared
 * AudioContext + per-participant `MediaStreamAudioSourceNode →
 * AnalyserNode`. Drops N contexts → 1 with no semantic change.
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
}
export declare function useActiveSpeaker({ participants, threshold, smoothingTimeConstant, pollIntervalMs, }: UseActiveSpeakerOptions): {
    activeSpeakerId: string | null;
};
export {};
//# sourceMappingURL=useActiveSpeaker.d.ts.map