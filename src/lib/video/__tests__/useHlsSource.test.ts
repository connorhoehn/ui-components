import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import { useHlsSource } from '../useHlsSource';

/**
 * `loading` used to be set true on attach and cleared in exactly one place —
 * the branch that gives up because the browser cannot play HLS. On both paths
 * that work it stayed true forever, and every consumer reads it as "not
 * playing": a live stream never got its LIVE badge, and StreamStage's
 * "Nothing is being broadcast right now." sat on top of decoding video.
 */
function mountWith(video: HTMLVideoElement | null, url: string | null) {
  return renderHook(() => {
    const ref = useRef<HTMLVideoElement | null>(video);
    return useHlsSource(ref, url, { live: true });
  });
}

function fakeVideo(readyState = 0): HTMLVideoElement {
  const el = document.createElement('video');
  Object.defineProperty(el, 'readyState', { value: readyState, configurable: true });
  // jsdom cannot play media; the element only has to dispatch events.
  el.canPlayType = () => '' as CanPlayTypeResult;
  return el;
}

describe('useHlsSource', () => {
  it('stops loading once the element actually produces a frame', () => {
    const video = fakeVideo();
    const { result } = mountWith(video, 'https://example.test/master.m3u8');
    expect(result.current.loading).toBe(true);

    act(() => { video.dispatchEvent(new Event('playing')); });
    expect(result.current.loading).toBe(false);
  });

  it('does not re-arm the wait when a live stream rebuffers', () => {
    const video = fakeVideo();
    const { result } = mountWith(video, 'https://example.test/master.m3u8');
    act(() => { video.dispatchEvent(new Event('loadeddata')); });
    expect(result.current.loading).toBe(false);

    // `waiting` fires routinely at the live edge. Answering it with
    // "Connecting…" over a stream already on screen is worse than a freeze.
    act(() => { video.dispatchEvent(new Event('waiting')); });
    expect(result.current.loading).toBe(false);
  });

  it('treats an element that is already decoding as not loading', () => {
    const video = fakeVideo(3 /* HAVE_FUTURE_DATA */);
    const { result } = mountWith(video, 'https://example.test/master.m3u8');
    expect(result.current.loading).toBe(false);
  });

  it('reports neither loading nor error with no source', () => {
    const { result } = mountWith(fakeVideo(), null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('does not trust canPlayType — hls.js decides, because Chromium lies', () => {
    // Chromium answers canPlayType('application/vnd.apple.mpegurl') with
    // "maybe" while being unable to play a playlist at all. Trusting it put
    // the .m3u8 straight into video.src, and the element settled at
    // NETWORK_NO_SOURCE with play() rejecting "no supported sources" — no
    // playlist ever fetched, and the stage wearing a LIVE badge over it.
    const video = fakeVideo();
    video.canPlayType = () => 'maybe' as CanPlayTypeResult;
    mountWith(video, 'https://example.test/master.m3u8');
    // hls.js is loaded asynchronously, so the synchronous pass must NOT have
    // already claimed the element for the native path.
    expect(video.getAttribute('src')).toBeNull();
  });

  it('reports a source the element cannot play, whatever it managed earlier', () => {
    const video = fakeVideo();
    const { result } = mountWith(video, 'https://example.test/master.m3u8');
    act(() => { video.dispatchEvent(new Event('canplay')); });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    // The element's own verdict outranks anything it did before.
    act(() => { video.dispatchEvent(new Event('error')); });
    expect(result.current.error).toMatch(/could not be played/i);
  });

  it('goes back and looks again when a LIVE stream reports it ended', () => {
    // The muxer writes #EXT-X-ENDLIST when a broadcast stops, and the next one
    // reuses the same channel arn. A viewer who loads inside that window reads
    // the ENDLIST, hls.js calls endOfStream(), and the element sits at `ended`
    // forever — while the server serves a healthy live playlist again seconds
    // later. Measured: stuck at 10.7s with a frozen buffer against a playlist
    // that had reached segment 36 and carried no ENDLIST.
    const video = fakeVideo(3);
    const play = vi.fn(() => Promise.resolve());
    video.play = play as unknown as HTMLVideoElement['play'];
    const load = vi.fn();
    video.load = load;
    mountWith(video, 'https://example.test/master.m3u8');

    act(() => { video.dispatchEvent(new Event('ended')); });
    expect(play).toHaveBeenCalled();
  });

  it('does not chase `ended` on a stream that is not live', () => {
    // A recording that finishes has genuinely finished.
    const video = fakeVideo(3);
    const play = vi.fn(() => Promise.resolve());
    video.play = play as unknown as HTMLVideoElement['play'];
    renderHook(() => {
      const ref = useRef<HTMLVideoElement | null>(video);
      return useHlsSource(ref, 'https://example.test/vod.m3u8', { live: false });
    });

    act(() => { video.dispatchEvent(new Event('ended')); });
    expect(play).not.toHaveBeenCalled();
  });

  it('throttles recovery so a dead stream is not hammered', () => {
    const video = fakeVideo(3);
    const play = vi.fn(() => Promise.resolve());
    video.play = play as unknown as HTMLVideoElement['play'];
    mountWith(video, 'https://example.test/master.m3u8');

    act(() => {
      video.dispatchEvent(new Event('ended'));
      video.dispatchEvent(new Event('ended'));
      video.dispatchEvent(new Event('ended'));
    });
    expect(play).toHaveBeenCalledTimes(1);
  });
});
