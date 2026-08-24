import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTrackStateBump } from '../useTrackStateBump';

// ---------------------------------------------------------------------------
// Minimal MediaStream / MediaStreamTrack fakes.
//
// jsdom has no WebRTC, so these model just the surface the hook touches:
// getVideoTracks(), add/removeEventListener on both stream and track, and the
// addtrack/removetrack events that carry a `track`.
// ---------------------------------------------------------------------------

class FakeTrack {
  kind = 'video';
  id: string;
  listeners = new Map<string, Set<EventListener>>();

  constructor(id: string) {
    this.id = id;
  }

  addEventListener(type: string, fn: EventListener) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(fn);
  }

  removeEventListener(type: string, fn: EventListener) {
    this.listeners.get(type)?.delete(fn);
  }

  /** Total listeners still attached across all event types. */
  get listenerCount() {
    let n = 0;
    this.listeners.forEach((s) => { n += s.size; });
    return n;
  }
}

class FakeStream {
  tracks: FakeTrack[] = [];
  listeners = new Map<string, Set<EventListener>>();

  getVideoTracks() {
    return this.tracks as unknown as MediaStreamTrack[];
  }

  addEventListener(type: string, fn: EventListener) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(fn);
  }

  removeEventListener(type: string, fn: EventListener) {
    this.listeners.get(type)?.delete(fn);
  }

  emit(type: string, event: unknown) {
    this.listeners.get(type)?.forEach((fn) => fn(event as Event));
  }

  /** Simulate an inbound WebRTC track arriving after mount. */
  addTrack(track: FakeTrack) {
    this.tracks.push(track);
    this.emit('addtrack', { track });
  }

  /** Simulate a track being removed before unmount. */
  removeTrack(track: FakeTrack) {
    this.tracks = this.tracks.filter((t) => t !== track);
    this.emit('removetrack', { track });
  }
}

const asStream = (s: FakeStream) => s as unknown as MediaStream;

beforeEach(() => {
  vi.spyOn(console, 'info').mockImplementation(() => {});
});

describe('useTrackStateBump', () => {
  it('removes listeners from tracks present at unmount', () => {
    const stream = new FakeStream();
    const track = new FakeTrack('t0');
    stream.tracks.push(track);

    const { unmount } = renderHook(() => useTrackStateBump(asStream(stream), 'Alice'));
    expect(track.listenerCount).toBe(3); // mute / unmute / ended

    unmount();
    expect(track.listenerCount).toBe(0);
  });

  it('removes listeners from a track that left the stream before unmount', () => {
    // The leak: cleanup used to re-derive its track list from
    // stream.getVideoTracks() at cleanup time, so a track that arrived via
    // addtrack and then left via removetrack was never in that list. Its
    // three listeners stayed attached, pinning setBump — and with it the
    // unmounted component — for as long as anything else held the track.
    const stream = new FakeStream();
    const { unmount } = renderHook(() => useTrackStateBump(asStream(stream), 'Alice'));

    const late = new FakeTrack('t1');
    act(() => { stream.addTrack(late); });
    expect(late.listenerCount).toBe(3);

    act(() => { stream.removeTrack(late); });
    expect(stream.getVideoTracks()).toHaveLength(0);

    unmount();
    expect(late.listenerCount).toBe(0);
  });

  it('detaches its own addtrack/removetrack listeners from the stream', () => {
    const stream = new FakeStream();
    const { unmount } = renderHook(() => useTrackStateBump(asStream(stream), 'Alice'));

    expect(stream.listeners.get('addtrack')?.size).toBe(1);
    expect(stream.listeners.get('removetrack')?.size).toBe(1);

    unmount();
    expect(stream.listeners.get('addtrack')?.size).toBe(0);
    expect(stream.listeners.get('removetrack')?.size).toBe(0);
  });
});
