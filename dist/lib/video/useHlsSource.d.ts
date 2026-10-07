import { type RefObject } from 'react';
export interface UseHlsSourceOptions {
    /**
     * Tune for a live edge rather than a recording.
     *
     * A live viewer wants to be near the broadcast, and a large back buffer on a
     * stream someone leaves open for an hour is memory spent on video nobody
     * will scrub back to. VOD wants the opposite — keep what was downloaded so
     * seeking backwards is instant.
     */
    live?: boolean;
    /**
     * How long playback may fail to advance before it is called STALLED rather
     * than buffering. Short enough that a viewer is not lied to for long, long
     * enough that an ordinary rebuffer at the live edge is not an alarm.
     */
    stalledAfterMs?: number;
    onError?: (err: Error) => void;
}
/**
 * What the player is actually doing. Distinct states because they call for
 * different words on screen and, more importantly, because "buffering",
 * "stalled" and "over" were previously indistinguishable to a viewer — all
 * three were a still frame under a LIVE badge.
 */
export type HlsPhase = 
/** No source attached. */
'idle'
/** Source attached, no frame produced yet. */
 | 'connecting'
/** Frames are advancing. */
 | 'playing'
/** Was playing, briefly out of data. Normal at a live edge. */
 | 'buffering'
/** Out of data long enough that something is wrong. */
 | 'stalled'
/** Unplayable. `error` carries the wording. */
 | 'error';
/**
 * What KIND of thing went wrong, in terms a viewer's sentence can be built
 * from. hls.js's own vocabulary (`networkError`, `manifestLoadError`) is a
 * developer's, and it was reaching the screen: a room whose broadcast was not
 * producing rendered "HLS error: networkError" over the video — jargon, and
 * wrong, because the network was fine and there was simply nothing to play.
 *
 * The distinction that matters is the one the SERVER already makes and the
 * player was throwing away: a 503 saying "no active producers" is not a
 * network failure and not a bug, it is an empty channel.
 */
export type HlsFailureKind = 
/** The server answered, and its answer was that nothing is being broadcast. */
'no-broadcast'
/** The playlist could not be fetched at all — DNS, offline, CORS, timeout. */
 | 'network'
/** The server answered, and its answer was that IT is broken. */
 | 'server'
/** Bytes arrived and could not be decoded. */
 | 'media'
/** This browser cannot play the stream at all. Retrying can never help. */
 | 'unsupported' | 'other';
export interface HlsFailure {
    kind: HlsFailureKind;
    /** HTTP status behind it, when there was one. */
    status: number | null;
    /**
     * The developer's account — hls.js's type/details, the missing-peer hint.
     * For a console, a `data-` attribute or a bug report. NEVER for a viewer;
     * that is what `error` is, and the two are deliberately different strings.
     */
    detail: string;
    /**
     * Whether attaching the same URL again could plausibly succeed. False for a
     * browser that cannot play HLS — a "Try again" there is a button that can
     * never work, which is worse than no button.
     */
    retryable: boolean;
}
/** The viewer's sentence for a failure. Exported so a host can re-word it. */
export declare function hlsFailureText(failure: HlsFailure | null | undefined): string | null;
export interface UseHlsSourceState {
    /**
     * What to SHOW a viewer when playback failed, or null. Plain language, no
     * hls.js vocabulary, no status codes — see `failure.detail` for those.
     */
    error: string | null;
    /** The same failure, classified, for logging and for deciding on a retry. */
    failure: HlsFailure | null;
    /** True between attach and first data. Equivalent to `phase === 'connecting'`. */
    loading: boolean;
    /** The whole truth; prefer this over the two booleans above. */
    phase: HlsPhase;
    /**
     * Whether the media has audio but no picture. `null` until the element has
     * metadata — "not known yet" is not "there is video", and rendering an
     * audio-only card over a video stream is its own lie.
     */
    audioOnly: boolean | null;
    /**
     * Seconds behind the live edge, or null when it cannot be measured. HLS runs
     * seconds behind by construction; a viewer who is not told that concludes
     * the stream is frozen.
     */
    latencySec: number | null;
    /** Seek to the live edge. No-op when there is no source. */
    seekToLive: () => void;
    /** Tear the source down and attach it again from scratch. */
    retry: () => void;
}
export declare function useHlsSource(videoRef: RefObject<HTMLVideoElement | null>, playlistUrl: string | null | undefined, opts?: UseHlsSourceOptions): UseHlsSourceState;
//# sourceMappingURL=useHlsSource.d.ts.map