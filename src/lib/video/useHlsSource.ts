// useHlsSource — attach an HLS playlist to a <video>, whichever way the
// browser supports.
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

import { useEffect, useRef, useState, type RefObject } from 'react';

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
  onError?: (err: Error) => void;
}

export interface UseHlsSourceState {
  /** Human-readable failure, or null. Rendered by the player, not thrown. */
  error: string | null;
  /** True between attach and first data. */
  loading: boolean;
}

export function useHlsSource(
  videoRef: RefObject<HTMLVideoElement | null>,
  playlistUrl: string | null | undefined,
  opts: UseHlsSourceOptions = {},
): UseHlsSourceState {
  const { live = false } = opts;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const hlsRef = useRef<any>(null);
  /** Whether THIS effect put a src on the element, so teardown only clears its own. */
  const nativeSrcRef = useRef(false);

  // Held in a ref so a caller passing an inline arrow does not re-key the
  // whole hls.js lifecycle on every parent render — the bug this file's
  // ancestor carried, where each render destroyed the engine and rebuilt it.
  const onErrorRef = useRef(opts.onError);
  useEffect(() => { onErrorRef.current = opts.onError; }, [opts.onError]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !playlistUrl) return;
    setError(null);
    setLoading(true);

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
  }, [videoRef, playlistUrl, live]);

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
  // Only a new source starts the wait again.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !playlistUrl) return;
    // Already decoding — a re-attach to a warm element must not re-arm the wait.
    if (v.readyState >= 2) { setLoading(false); return; }
    const started = () => setLoading(false);
    // The element's own verdict. A source it cannot decode leaves it at
    // NETWORK_NO_SOURCE with play() rejecting "no supported sources" — and
    // because `loading` had already cleared on an earlier `canplay`, the
    // stage went on claiming LIVE over a frame that never moved. Whatever
    // else is true, a media element with no source is not playing.
    const failed = () => setError('This stream could not be played.');
    const events = ['loadeddata', 'playing', 'canplay'] as const;
    events.forEach((e) => v.addEventListener(e, started));
    v.addEventListener('error', failed);
    return () => {
      events.forEach((e) => v.removeEventListener(e, started));
      v.removeEventListener('error', failed);
    };
  }, [videoRef, playlistUrl]);

  return { error, loading };
}
