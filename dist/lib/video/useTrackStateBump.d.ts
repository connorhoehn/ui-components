export declare function useTrackStateBump(stream: MediaStream | undefined | null, participantLabel: string): number;
/**
 * Companion utility: returns true when the stream has at least one
 * paintable video track (live + enabled + not muted). Pair with
 * useTrackStateBump in the same component so the boolean re-derives on
 * every track transition.
 */
export declare function streamHasUsableVideo(stream: MediaStream | undefined | null): boolean;
//# sourceMappingURL=useTrackStateBump.d.ts.map