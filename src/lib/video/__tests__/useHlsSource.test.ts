import { describe, it, expect } from 'vitest';
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
});
