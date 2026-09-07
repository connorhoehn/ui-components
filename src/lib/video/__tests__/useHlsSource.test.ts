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

// ---------------------------------------------------------------------------
// The watchdog, audio-only detection and latency.
//
// Media events are not a complete account of what a stream is doing. The two
// ways a live HLS stream dies here both leave the element SILENT — parked at
// `ended` after an #EXT-X-ENDLIST, or frozen once segments stop arriving — and
// every event-derived flag goes on saying "playing" over a frame that has not
// moved. So the truth is measured rather than inferred, and these tests drive
// the measurement directly.
// ---------------------------------------------------------------------------

import { beforeEach, afterEach } from 'vitest';
import { renderHook as renderHook2 } from '@testing-library/react';

interface FakeVideoHandle {
  el: HTMLVideoElement;
  setTime: (t: number) => void;
  setPaused: (p: boolean) => void;
  setEnded: (e: boolean) => void;
  setDimensions: (w: number, h: number) => void;
  setSeekableEnd: (t: number | null) => void;
}

function controllableVideo(readyState = 3): FakeVideoHandle {
  const el = document.createElement('video');
  let time = 0;
  let paused = false;
  let ended = false;
  let width = 640;
  let height = 360;
  let seekableEnd: number | null = null;
  Object.defineProperty(el, 'readyState', { value: readyState, configurable: true });
  Object.defineProperty(el, 'currentTime', {
    get: () => time,
    set: (v: number) => { time = v; },
    configurable: true,
  });
  Object.defineProperty(el, 'paused', { get: () => paused, configurable: true });
  Object.defineProperty(el, 'ended', { get: () => ended, configurable: true });
  Object.defineProperty(el, 'videoWidth', { get: () => width, configurable: true });
  Object.defineProperty(el, 'videoHeight', { get: () => height, configurable: true });
  Object.defineProperty(el, 'seekable', {
    get: () =>
      seekableEnd === null
        ? ({ length: 0, end: () => 0 } as unknown as TimeRanges)
        : ({ length: 1, end: () => seekableEnd } as unknown as TimeRanges),
    configurable: true,
  });
  // hls.js has no MediaSource in jsdom, so the hook falls through to native.
  // Answering "maybe" keeps that path quiet; the "Chromium lies" test above
  // covers the case where that answer must NOT be trusted.
  el.canPlayType = () => 'maybe' as CanPlayTypeResult;
  el.play = (() => Promise.resolve()) as unknown as HTMLVideoElement['play'];
  el.load = () => {};
  return {
    el,
    setTime: (t) => { time = t; },
    setPaused: (p) => { paused = p; },
    setEnded: (e) => { ended = e; },
    setDimensions: (w, h) => { width = w; height = h; },
    setSeekableEnd: (t) => { seekableEnd = t; },
  };
}

function mountLive(video: HTMLVideoElement, opts: { stalledAfterMs?: number } = {}) {
  return renderHook2(() => {
    const ref = useRef<HTMLVideoElement | null>(video);
    return useHlsSource(ref, 'https://example.test/master.m3u8', {
      live: true,
      stalledAfterMs: opts.stalledAfterMs ?? 5_000,
    });
  });
}

describe('the watchdog', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('calls a frame that has stopped moving STALLED, not playing', () => {
    const v = controllableVideo();
    const { result } = mountLive(v.el, { stalledAfterMs: 5_000 });
    act(() => { v.el.dispatchEvent(new Event('playing')); });
    expect(result.current.phase).toBe('playing');

    // Segments stop arriving. No event fires — that is the whole problem.
    act(() => { vi.advanceTimersByTime(3_000); });
    expect(result.current.phase).toBe('buffering');
    act(() => { vi.advanceTimersByTime(3_000); });
    expect(result.current.phase).toBe('stalled');
  });

  it('goes back to playing the moment a frame lands', () => {
    const v = controllableVideo();
    const { result } = mountLive(v.el, { stalledAfterMs: 3_000 });
    act(() => { v.el.dispatchEvent(new Event('playing')); });
    act(() => { vi.advanceTimersByTime(6_000); });
    expect(result.current.phase).toBe('stalled');

    act(() => { v.setTime(12.5); vi.advanceTimersByTime(1_000); });
    expect(result.current.phase).toBe('playing');
  });

  // A viewer who pressed pause is not stalled, and telling them their stream
  // broke because they stopped it is its own false alarm.
  it('leaves a deliberately paused element alone', () => {
    const v = controllableVideo();
    v.setPaused(true);
    const { result } = mountLive(v.el, { stalledAfterMs: 2_000 });
    act(() => { v.el.dispatchEvent(new Event('playing')); });
    act(() => { vi.advanceTimersByTime(10_000); });
    expect(result.current.phase).toBe('playing');
  });

  // The ENDLIST trap: hls.js calls endOfStream() and the element parks — paused
  // AND ended, with no further events, while the server is serving a healthy
  // live playlist again seconds later. Paused alone must not excuse it.
  it('does not excuse an element parked at `ended`', () => {
    const v = controllableVideo();
    v.setPaused(true);
    v.setEnded(true);
    const { result } = mountLive(v.el, { stalledAfterMs: 2_000 });
    act(() => { v.el.dispatchEvent(new Event('playing')); });
    act(() => { vi.advanceTimersByTime(6_000); });
    expect(result.current.phase).toBe('stalled');
  });

  it('says buffering while it is trying to recover from an `ended`', () => {
    const v = controllableVideo();
    const { result } = mountLive(v.el);
    act(() => { v.el.dispatchEvent(new Event('playing')); });
    act(() => { v.el.dispatchEvent(new Event('ended')); });
    // Not silence: the reload is throttled and may not work first time, and
    // the viewer would otherwise watch a frozen frame under a LIVE badge.
    expect(result.current.phase).toBe('buffering');
  });

  it('answers a `waiting` event immediately rather than waiting a whole tick', () => {
    const v = controllableVideo();
    const { result } = mountLive(v.el);
    act(() => { v.el.dispatchEvent(new Event('playing')); });
    act(() => { v.el.dispatchEvent(new Event('waiting')); });
    expect(result.current.phase).toBe('buffering');
  });
});

describe('audio-only detection', () => {
  it('reports a stream with no picture as audio-only', () => {
    const v = controllableVideo(1 /* HAVE_METADATA */);
    v.setDimensions(0, 0);
    const { result } = mountLive(v.el);
    act(() => { v.el.dispatchEvent(new Event('loadedmetadata')); });
    expect(result.current.audioOnly).toBe(true);
  });

  it('reports a stream with a picture as not audio-only', () => {
    const v = controllableVideo(1);
    const { result } = mountLive(v.el);
    act(() => { v.el.dispatchEvent(new Event('loadedmetadata')); });
    expect(result.current.audioOnly).toBe(false);
  });

  // "Not known yet" is not "there is no video". An audio-only card over a
  // video stream is the same lie as a black rectangle over an audio one.
  it('stays null until the element has metadata', () => {
    const v = controllableVideo(0);
    v.setDimensions(0, 0);
    const { result } = mountLive(v.el);
    act(() => { v.el.dispatchEvent(new Event('loadedmetadata')); });
    expect(result.current.audioOnly).toBeNull();
  });

  // A video track can join a stream that started as audio — a publisher whose
  // camera frees up mid-broadcast — and `resize` is how the element says so.
  it('takes it back when a picture arrives', () => {
    const v = controllableVideo(1);
    v.setDimensions(0, 0);
    const { result } = mountLive(v.el);
    act(() => { v.el.dispatchEvent(new Event('loadedmetadata')); });
    expect(result.current.audioOnly).toBe(true);

    act(() => { v.setDimensions(1280, 720); v.el.dispatchEvent(new Event('resize')); });
    expect(result.current.audioOnly).toBe(false);
  });
});

describe('latency', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('measures the gap to the live edge', () => {
    const v = controllableVideo();
    v.setTime(100);
    v.setSeekableEnd(107.5);
    const { result } = mountLive(v.el);
    act(() => { vi.advanceTimersByTime(1_000); });
    expect(result.current.latencySec).toBeCloseTo(7.5, 1);
  });

  it('reports null rather than a made-up number when it cannot measure', () => {
    const v = controllableVideo();
    v.setSeekableEnd(null);
    const { result } = mountLive(v.el);
    act(() => { vi.advanceTimersByTime(1_000); });
    expect(result.current.latencySec).toBeNull();
  });

  it('seeks to the live edge on request', () => {
    const v = controllableVideo();
    v.setTime(100);
    v.setSeekableEnd(118);
    const { result } = mountLive(v.el);
    act(() => { result.current.seekToLive(); });
    expect(v.el.currentTime).toBeCloseTo(118, 1);
  });
});

describe('retry', () => {
  it('re-attaches the source and clears the failure', async () => {
    // readyState 0: a cold element, so the re-attach is visible as a fresh
    // wait rather than the "already decoding" shortcut.
    const v = controllableVideo(0);
    const { result } = mountLive(v.el);
    act(() => { v.el.dispatchEvent(new Event('error')); });
    expect(result.current.phase).toBe('error');

    act(() => { result.current.retry(); });
    // Back to waiting on a fresh attach — NOT stuck on the old verdict, which
    // is what a dead end with no way out looks like from the audience side.
    expect(result.current.error).toBeNull();
    expect(result.current.phase).toBe('connecting');
  });
});

describe('phases with no source', () => {
  it('is idle, not connecting, when there is nothing to connect to', () => {
    const { result } = mountWith(fakeVideo(), null);
    expect(result.current.phase).toBe('idle');
    expect(result.current.audioOnly).toBeNull();
    expect(result.current.latencySec).toBeNull();
  });
});
