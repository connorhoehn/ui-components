// useHlsSource — attach an HLS playlist to a <video>, whichever way the
// browser supports, and report honestly what it is doing.
//
// Safari plays HLS natively from `src`; everywhere else needs hls.js, which is
// an OPTIONAL peer dependency and is therefore dynamic-imported so the library
// bundle does not carry it. Extracted from RecordingPlayer, which had this
// inline, so live and VOD share one implementation instead of drifting — they
// already differ in what they should buffer, which is a reason to have one
// place that knows the difference, not two that each guess.
//
// Returns the state a player has to render: nothing is thrown, because a
// browser without MSE is a supported situation, not a crash.
//
// ## Why there is a watchdog and not just events
//
// Media events are not a complete account of what a stream is doing. The two
// ways a live HLS stream dies in this codebase both leave the element SILENT:
//
//   * the muxer writes `#EXT-X-ENDLIST`, hls.js calls `endOfStream()`, and the
//     element parks at `ended` — paused, no `waiting`, no `error`;
//   * segments simply stop arriving mid-playback, and after the buffer drains
//     the element sits at a frozen frame. `waiting` may fire once; nothing
//     fires afterwards, ever.
//
// In both cases every event-derived flag says "playing" and the frame does not
// move. That is the shape of the lie this file exists to prevent, so the truth
// is measured directly: is `currentTime` advancing? One 1s interval answers
// that AND samples how far behind the live edge we are, which is the other
// thing an HLS viewer cannot see and wrongly reads as "frozen".

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

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
  | 'idle'
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

export interface UseHlsSourceState {
  /** Human-readable failure, or null. Rendered by the player, not thrown. */
  error: string | null;
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

/** Floor between recovery attempts, so a genuinely dead stream is not hammered. */
const RELOAD_THROTTLE_MS = 3_000;
/** How often the watchdog samples progress and latency. */
const WATCHDOG_INTERVAL_MS = 1_000;
/** Frozen for longer than this and it is buffering rather than a frame boundary. */
const BUFFERING_AFTER_MS = 1_500;
/** Frozen for longer than this and it is stalled, not buffering. */
const STALLED_AFTER_MS = 8_000;
/** Only re-render for a latency change a viewer could notice. */
const LATENCY_EPSILON_S = 0.5;

export function useHlsSource(
  videoRef: RefObject<HTMLVideoElement | null>,
  playlistUrl: string | null | undefined,
  opts: UseHlsSourceOptions = {},
): UseHlsSourceState {
  const { live = false, stalledAfterMs = STALLED_AFTER_MS } = opts;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [stalled, setStalled] = useState(false);
  const [audioOnly, setAudioOnly] = useState<boolean | null>(null);
  const [latencySec, setLatencySec] = useState<number | null>(null);
  /**
   * Bumped by `retry()`. It is in the attach effect's deps, so a retry is a
   * genuine teardown-and-rebuild rather than a nudge at a broken engine — the
   * only recovery that works after a fatal hls.js error.
   */
  const [attempt, setAttempt] = useState(0);
  const hlsRef = useRef<any>(null);
  /** Whether THIS effect put a src on the element, so teardown only clears its own. */
  const nativeSrcRef = useRef(false);
  const lastReloadRef = useRef(0);

  // Held in a ref so a caller passing an inline arrow does not re-key the
  // whole hls.js lifecycle on every parent render — the bug this file's
  // ancestor carried, where each render destroyed the engine and rebuilt it.
  const onErrorRef = useRef(opts.onError);
  useEffect(() => { onErrorRef.current = opts.onError; }, [opts.onError]);

  const retry = useCallback(() => {
    setError(null);
    setBuffering(false);
    setStalled(false);
    setAttempt((n) => n + 1);
  }, []);

  /**
   * Jump to the live edge. hls.js knows where that is; native playback has to
   * be asked for the end of the seekable range, which is the same answer to
   * within a segment.
   */
  const seekToLive = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      const h = hlsRef.current;
      const target =
        h && typeof h.liveSyncPosition === 'number' && Number.isFinite(h.liveSyncPosition)
          ? h.liveSyncPosition
          : v.seekable && v.seekable.length > 0
            ? v.seekable.end(v.seekable.length - 1)
            : null;
      if (target !== null) v.currentTime = target;
      void v.play?.().catch(() => { /* autoplay may refuse; the seek still landed */ });
    } catch { /* seeking is best-effort */ }
  }, [videoRef]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !playlistUrl) return;
    setError(null);
    setLoading(true);
    setAudioOnly(null);
    setLatencySec(null);

    let cancelled = false;
    // Native LAST, not first.
    //
    // `canPlayType('application/vnd.apple.mpegurl')` is not a capability
    // check — Chromium answers "maybe" for it while being unable to play a
    // playlist at all. Trusting that answer put the .m3u8 straight into
    // `video.src`, and the element settled at networkState NETWORK_NO_SOURCE
    // with play() rejecting "The element has no supported sources". No
    // playlist was ever fetched, and the stage sat there wearing a LIVE badge.
    // Observed on a second viewer watching a real broadcast in Chromium.
    //
    // hls.js answers the question properly — `isSupported()` tests for Media
    // Source Extensions — so ask it first and keep native for the browser that
    // genuinely needs it (Safari, which has no MSE for HLS and where
    // isSupported() is false).
    const useNative = () => {
      if (!v.canPlayType('application/vnd.apple.mpegurl')) {
        setError('HLS playback is not supported in this browser.');
        setLoading(false);
        return false;
      }
      v.src = playlistUrl;
      nativeSrcRef.current = true;
      return true;
    };

    void (async () => {
      try {
        // @ts-ignore — optional peer dep, marked external in vite.config.ts.
        // tsc cannot resolve it here; runtime resolution works in consumers.
        const Hls = (await import(/* @vite-ignore */ 'hls.js')).default;
        if (cancelled) return;
        if (!Hls.isSupported()) {
          useNative();
          return;
        }
        const hls = new Hls(
          live
            // Chase the live edge, and keep only a little behind it.
            ? { enableWorker: true, lowLatencyMode: true, backBufferLength: 30 }
            : { enableWorker: true },
        );
        hlsRef.current = hls;
        hls.attachMedia(v);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(playlistUrl));
        hls.on(Hls.Events.ERROR, (_evt: unknown, data: any) => {
          if (data?.fatal) {
            setError(`HLS error: ${data.type}`);
            onErrorRef.current?.(new Error(`HLS fatal: ${data.type}`));
          }
        });
      } catch (e: any) {
        if (cancelled) return;
        // No hls.js in the consumer app — native is the only thing left, and
        // on Safari it is the right answer anyway.
        if (!useNative()) {
          setError(`Failed to load hls.js — install it in the consumer app: ${e?.message ?? e}`);
        }
      }
    })();

    return () => {
      cancelled = true;
      if (hlsRef.current) {
        try { hlsRef.current.destroy(); } catch { /* teardown is best-effort */ }
        hlsRef.current = null;
      }
      if (nativeSrcRef.current) {
        nativeSrcRef.current = false;
        v.removeAttribute('src');
        v.load();
      }
    };
  }, [videoRef, playlistUrl, live, attempt]);

  // `loading` means "this source has not produced a frame yet", and only the
  // media element knows that.
  //
  // It used to be set true when a source was attached and cleared in exactly
  // one place: the branch that gives up because the browser cannot play HLS.
  // On both paths that actually work — native playback and hls.js — it stayed
  // true forever. Everything downstream reads it as "not playing", so a
  // genuinely live stream never got its LIVE badge or viewer count, and
  // StreamStage's "Nothing is being broadcast right now." sat on top of
  // decoding video. Confirmed in the browser: a face visible in the stage,
  // under a caption saying nothing was being broadcast.
  //
  // A mid-stream rebuffer deliberately does NOT set it back. `waiting` fires
  // routinely on a live edge, and answering it with "Connecting…" over a
  // stream the viewer is already watching is worse than a moment of freeze.
  // Only a new source starts the wait again. Rebuffering is reported through
  // `buffering`/`stalled` instead, which say the true thing without pretending
  // the stream has to be established all over again.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !playlistUrl) return;
    // Already decoding — a re-attach to a warm element must not re-arm the
    // wait. It must still SUBSCRIBE, though: this used to return early, which
    // skipped the error and ended handlers below and left exactly the element
    // that is playing without the recovery that keeps it playing.
    if (v.readyState >= 2) setLoading(false);

    /**
     * Audio-only is a NORMAL broadcast, not a broken one.
     *
     * A call from a machine whose camera is busy publishes audio and no video,
     * and the stage rendered exactly what that is at the pixel level: a black
     * rectangle wearing a LIVE badge. `videoWidth` is the element's own answer
     * and it is not available before metadata, so this stays `null` until it
     * is — and re-probes on `resize`, because a video track can join a stream
     * that started as audio.
     */
    const probeTracks = () => {
      if (v.readyState < 1 /* HAVE_METADATA */) return;
      setAudioOnly(v.videoWidth === 0 && v.videoHeight === 0);
    };
    const started = () => { setLoading(false); probeTracks(); };
    // A live stream that "ends" has not ended — it restarted.
    //
    // The muxer writes `#EXT-X-ENDLIST` when a broadcast stops, and the same
    // channel arn is reused when the next one starts. A viewer who loads the
    // playlist inside that window reads the ENDLIST, hls.js calls
    // endOfStream(), and the element sits at `ended` forever — while the
    // server is serving a healthy live playlist again seconds later. Measured:
    // stuck at 10.7s with the buffer frozen, against a playlist that had
    // reached segment 36 and carried no ENDLIST at all.
    //
    // So on a LIVE source, `ended` is a prompt to go back and look again.
    // Throttled rather than capped: a broadcaster can restart at any time, and
    // a viewer who waited through the gap should be picked up when they do.
    const reload = () => {
      if (!live) return;
      // Say so while it is happening. The reload is throttled and may not work
      // first time; without this the viewer watches a frozen frame under a
      // LIVE badge for as long as it takes, told nothing. The watchdog clears
      // it again the moment `currentTime` moves.
      setBuffering(true);
      const now = Date.now();
      if (now - lastReloadRef.current < RELOAD_THROTTLE_MS) return;
      lastReloadRef.current = now;
      try {
        if (hlsRef.current) hlsRef.current.startLoad();
        else if (nativeSrcRef.current) { v.src = playlistUrl; v.load(); }
        void v.play().catch(() => { /* autoplay may refuse; the frame is still current */ });
      } catch { /* recovery is best-effort */ }
    };
    const onWaiting = () => setBuffering(true);
    // The element's own verdict. A source it cannot decode leaves it at
    // NETWORK_NO_SOURCE with play() rejecting "no supported sources" — and
    // because `loading` had already cleared on an earlier `canplay`, the
    // stage went on claiming LIVE over a frame that never moved. Whatever
    // else is true, a media element with no source is not playing.
    const failed = () => setError('This stream could not be played.');
    const events = ['loadeddata', 'playing', 'canplay'] as const;
    events.forEach((e) => v.addEventListener(e, started));
    v.addEventListener('loadedmetadata', probeTracks);
    v.addEventListener('resize', probeTracks);
    v.addEventListener('waiting', onWaiting);
    v.addEventListener('error', failed);
    v.addEventListener('ended', reload);
    return () => {
      events.forEach((e) => v.removeEventListener(e, started));
      v.removeEventListener('loadedmetadata', probeTracks);
      v.removeEventListener('resize', probeTracks);
      v.removeEventListener('waiting', onWaiting);
      v.removeEventListener('error', failed);
      v.removeEventListener('ended', reload);
    };
  }, [videoRef, playlistUrl, live, attempt]);

  // The watchdog: the only thing here that can tell a playing stream from a
  // frozen one. See the header comment for why events cannot.
  useEffect(() => {
    if (!playlistUrl) {
      setBuffering(false);
      setStalled(false);
      setLatencySec(null);
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    let lastTime = Number.NaN;
    let lastAdvance = Date.now();

    const sampleLatency = () => {
      let lat: number | null = null;
      const h = hlsRef.current;
      if (h && typeof h.latency === 'number' && Number.isFinite(h.latency) && h.latency > 0) {
        lat = h.latency;
      } else if (v.seekable && v.seekable.length > 0) {
        const edge = v.seekable.end(v.seekable.length - 1);
        if (Number.isFinite(edge)) lat = Math.max(0, edge - v.currentTime);
      }
      setLatencySec((prev) => {
        if (lat === null) return prev === null ? prev : null;
        const rounded = Math.round(lat * 10) / 10;
        if (prev !== null && Math.abs(prev - rounded) < LATENCY_EPSILON_S) return prev;
        return rounded;
      });
    };

    const tick = () => {
      sampleLatency();
      const now = Date.now();
      const t = v.currentTime;
      if (t !== lastTime) {
        lastTime = t;
        lastAdvance = now;
        setBuffering(false);
        setStalled(false);
        return;
      }
      // A viewer who pressed pause is not stalled. An element parked at
      // `ended` is — that is precisely the ENDLIST trap, and it presents as a
      // paused element that will never move again on its own.
      const shouldBeMoving = !v.paused || v.ended;
      if (!shouldBeMoving) return;
      const frozenFor = now - lastAdvance;
      if (frozenFor >= stalledAfterMs) setStalled(true);
      else if (frozenFor >= BUFFERING_AFTER_MS) setBuffering(true);
    };

    const timer = setInterval(tick, WATCHDOG_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [videoRef, playlistUrl, live, attempt, stalledAfterMs]);

  const phase: HlsPhase = !playlistUrl
    ? 'idle'
    : error
      ? 'error'
      : loading
        ? 'connecting'
        : stalled
          ? 'stalled'
          : buffering
            ? 'buffering'
            : 'playing';

  return { error, loading, phase, audioOnly, latencySec, seekToLive, retry };
}
