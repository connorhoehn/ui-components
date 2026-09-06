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

    if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = playlistUrl;
      return () => { v.removeAttribute('src'); v.load(); };
    }

    let cancelled = false;
    void (async () => {
      try {
        // @ts-ignore — optional peer dep, marked external in vite.config.ts.
        // tsc cannot resolve it here; runtime resolution works in consumers.
        const Hls = (await import(/* @vite-ignore */ 'hls.js')).default;
        if (cancelled) return;
        if (!Hls.isSupported()) {
          setError('HLS playback is not supported in this browser.');
          setLoading(false);
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
        setError(`Failed to load hls.js — install it in the consumer app: ${e?.message ?? e}`);
      }
    })();

    return () => {
      cancelled = true;
      if (hlsRef.current) {
        try { hlsRef.current.destroy(); } catch { /* teardown is best-effort */ }
        hlsRef.current = null;
      }
    };
  }, [videoRef, playlistUrl, live]);

  return { error, loading };
}
