import type { HlsPhase } from '../../lib/video/useHlsSource';
export type StreamStagePhase = 
/** No source yet, still inside the grace period. A normal pre-broadcast state. */
'idle'
/** No source, and long enough that promising one would be a lie. */
 | 'not-started'
/** Had a source; it went away. The opposite message from `not-started`. */
 | 'ended'
/** Source attached, no frame yet. */
 | 'connecting'
/** Frames advancing. */
 | 'playing'
/** Briefly out of data. Still live. */
 | 'buffering'
/** Out of data long enough that the picture is a lie about the present. */
 | 'stalled'
/** Unplayable. */
 | 'error';
export interface StreamStagePhaseInput {
    hasStream: boolean;
    /**
     * Whether that MediaStream actually carries anything. `null` means the
     * caller could not tell (a stand-in object, a stream without `getTracks`).
     *
     * WHEP hands over a stream BEFORE its tracks arrive — `addtrack` fires
     * later — so an empty one is a subscription still being set up, or one that
     * never will be. Either way it is not a picture, and calling it `playing`
     * puts a LIVE badge over a black rectangle: the realtime spelling of the
     * same lie the HLS path had.
     */
    streamHasTracks?: boolean | null;
    hasPlaylist: boolean;
    /** Whether this mount has EVER held a source. Distinguishes ended from not-started. */
    hadSource: boolean;
    /** Whether the stage has waited longer than it is willing to promise. */
    graceExpired: boolean;
    /**
     * What the HLS player reports. `phase` is preferred; `error`/`loading` are
     * the fallback so a caller (or a test double) that only has the old two-flag
     * shape still resolves to the same answer.
     */
    hls?: {
        phase?: HlsPhase;
        error?: string | null;
        loading?: boolean;
    };
}
export declare function streamStagePhase({ hasStream, hasPlaylist, hadSource, graceExpired, streamHasTracks, hls, }: StreamStagePhaseInput): StreamStagePhase;
/**
 * Whether the LIVE badge may be lit.
 *
 * The badge is the caller's claim ANDed with what the player managed to do —
 * on the HLS path a caller typically knows only that it composed a playlist
 * URL, which is string concatenation, not a broadcast. `buffering` counts: a
 * momentary rebuffer at the live edge is still live. `stalled` does NOT: a
 * frame that has not moved in eight seconds is a picture of the past, and
 * calling it live is the most confident lie this component can tell.
 *
 * `idle` counts because the caller's claim is all anyone has yet and nothing
 * contradicts it; once the grace period turns that into `not-started`, the
 * badge goes out.
 */
export declare function stagePhaseIsLive(phase: StreamStagePhase): boolean;
/**
 * Whether the stage is showing a picture the viewer can trust as CURRENT.
 * Everything else — connecting, buffering, stalled, error, empty — wants some
 * words over it rather than a bare frame.
 */
export declare function stagePhaseIsShowingLiveMedia(phase: StreamStagePhase): boolean;
//# sourceMappingURL=streamStagePhase.d.ts.map