// The stage's state machine, as a pure function.
//
// It lives outside the component because the interesting part of a watch
// surface is NOT its pixels — it is which of eight mutually exclusive claims
// it is making about a stream, and every bug this surface has shipped was one
// of those claims being wrong. Isolating the decision means it can be tested
// exhaustively without rendering anything, and means there is exactly one
// place that answers "what is this stage saying right now".

import type { HlsPhase } from '../../lib/video/useHlsSource';

export type StreamStagePhase =
  /** No source yet, still inside the grace period. A normal pre-broadcast state. */
  | 'idle'
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
  hls?: { phase?: HlsPhase; error?: string | null; loading?: boolean };
}

export function streamStagePhase({
  hasStream,
  hasPlaylist,
  hadSource,
  graceExpired,
  streamHasTracks = null,
  hls,
}: StreamStagePhaseInput): StreamStagePhase {
  // A MediaStream with tracks in it is evidence in itself: the caller could
  // not have produced one without a peer connection. The realtime path has no
  // manifest to wait on and nothing to buffer against, so it is playing or it
  // is not there — the one exception being a stream that is still empty.
  if (hasStream) {
    if (streamHasTracks === false) return graceExpired ? 'not-started' : 'connecting';
    return 'playing';
  }

  if (hasPlaylist) {
    const p: HlsPhase =
      hls?.phase ?? (hls?.error ? 'error' : hls?.loading ? 'connecting' : 'playing');
    if (p === 'error') return 'error';
    // "Connecting…" has to stop eventually. A playlist URL can be composed for
    // a channel nobody is broadcasting to, and HLS does not error on that — it
    // simply never delivers a segment. Without this the viewer waits on a
    // spinner indefinitely, told nothing.
    if (p === 'connecting') return graceExpired ? 'not-started' : 'connecting';
    if (p === 'idle') return graceExpired ? 'not-started' : 'connecting';
    return p;
  }

  // No source at all. "It ended" and "it has not started" look identical — an
  // empty stage — and are opposite messages, so which one gets said depends on
  // whether this mount ever had something. Per MOUNT, deliberately: a viewer
  // who opens the stage after a broadcast has finished never had a source
  // here, and for them "waiting" is the true thing.
  if (hadSource) return 'ended';
  // …but only for a while. "Waiting for the stream to start…" with no source
  // and no timeout is a promise the stage cannot keep, and this codebase has
  // shipped that exact forever-state more than once.
  return graceExpired ? 'not-started' : 'idle';
}

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
export function stagePhaseIsLive(phase: StreamStagePhase): boolean {
  return phase === 'playing' || phase === 'buffering' || phase === 'idle';
}

/**
 * Whether the stage is showing a picture the viewer can trust as CURRENT.
 * Everything else — connecting, buffering, stalled, error, empty — wants some
 * words over it rather than a bare frame.
 */
export function stagePhaseIsShowingLiveMedia(phase: StreamStagePhase): boolean {
  return phase === 'playing';
}
