import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useMuteWhileTalking } from '../useMuteWhileTalking';

let amplitude = 0;
let createSourceShouldThrow = false;
const mockAnalyser = {
  fftSize: 0,
  smoothingTimeConstant: 0,
  frequencyBinCount: 256,
  getFloatTimeDomainData: vi.fn((arr: Float32Array) => arr.fill(amplitude)),
  disconnect: vi.fn(),
};
const mockSource = { connect: vi.fn(), disconnect: vi.fn() };
const mockCtx = {
  createMediaStreamSource: vi.fn(() => {
    if (createSourceShouldThrow) throw new Error('already connected');
    return mockSource;
  }),
  createAnalyser: vi.fn(() => mockAnalyser),
};

const makeStream = (tracks: { readyState: string }[]) =>
  ({ getAudioTracks: () => tracks }) as unknown as MediaStream;
const liveStream = () => makeStream([{ readyState: 'live' }]);

const TALK = 0.1; // db ≈ -20, above default -45 threshold
const SILENT = 0.001; // db ≈ -60, below threshold

const advance = (ms: number) =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-05-28T00:00:00Z'));
  amplitude = 0;
  createSourceShouldThrow = false;
  mockAnalyser.getFloatTimeDomainData.mockImplementation((arr: Float32Array) =>
    arr.fill(amplitude),
  );
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

function stubAudioContextOk() {
  // Regular function so `new AudioContext()` (a constructor call inside the
  // hook) doesn't throw — arrow functions aren't constructable.
  function MockAudioContext(this: object) {
    return mockCtx;
  }
  vi.stubGlobal('AudioContext', MockAudioContext);
}

describe('useMuteWhileTalking', () => {
  // MUST run first so the module-level singleton starts uninitialized.
  it('returns false when AudioContext is unavailable', async () => {
    const stream = liveStream();
    const { result } = renderHook(() =>
      useMuteWhileTalking({ localStream: stream, isMuted: true }),
    );
    await advance(5000);
    expect(result.current).toBe(false);
  });

  it('returns false when isMuted is false', () => {
    stubAudioContextOk();
    const stream = liveStream();
    const { result } = renderHook(() =>
      useMuteWhileTalking({ localStream: stream, isMuted: false }),
    );
    expect(result.current).toBe(false);
  });

  it('returns false when localStream is null', () => {
    stubAudioContextOk();
    const { result } = renderHook(() =>
      useMuteWhileTalking({ localStream: null, isMuted: true }),
    );
    expect(result.current).toBe(false);
  });

  it('returns false when stream has no live audio tracks', async () => {
    stubAudioContextOk();
    const stream = makeStream([{ readyState: 'ended' }]);
    const { result } = renderHook(() =>
      useMuteWhileTalking({ localStream: stream, isMuted: true }),
    );
    amplitude = TALK;
    await advance(5000);
    expect(result.current).toBe(false);
  });

  it('returns false when createMediaStreamSource throws (StrictMode double-mount)', async () => {
    stubAudioContextOk();
    createSourceShouldThrow = true;
    const stream = liveStream();
    const { result } = renderHook(() =>
      useMuteWhileTalking({ localStream: stream, isMuted: true }),
    );
    await advance(5000);
    expect(result.current).toBe(false);
  });

  it('fires after sustained talking above threshold for triggerMs', async () => {
    stubAudioContextOk();
    const stream = liveStream();
    const { result } = renderHook(() =>
      useMuteWhileTalking({ localStream: stream, isMuted: true, triggerMs: 200 }),
    );
    amplitude = TALK;
    await advance(500);
    expect(result.current).toBe(true);
  });

  it('does not fire if talking is shorter than triggerMs', async () => {
    stubAudioContextOk();
    const stream = liveStream();
    const { result } = renderHook(() =>
      useMuteWhileTalking({ localStream: stream, isMuted: true, triggerMs: 1500 }),
    );
    amplitude = TALK;
    await advance(1000);
    expect(result.current).toBe(false);
  });

  it('resets the talking timer when signal drops below threshold mid-window', async () => {
    stubAudioContextOk();
    const stream = liveStream();
    const { result } = renderHook(() =>
      useMuteWhileTalking({ localStream: stream, isMuted: true, triggerMs: 1500 }),
    );
    amplitude = TALK;
    await advance(1000);
    expect(result.current).toBe(false);
    amplitude = SILENT;
    await advance(800);
    amplitude = TALK;
    await advance(800);
    expect(result.current).toBe(false);
  });

  it('does not re-fire within cooldownMs of last fire', async () => {
    stubAudioContextOk();
    const stream = liveStream();
    const { result } = renderHook(() =>
      useMuteWhileTalking({
        localStream: stream,
        isMuted: true,
        triggerMs: 200,
        cooldownMs: 6000,
      }),
    );
    amplitude = TALK;
    await advance(500);
    expect(result.current).toBe(true);
    await advance(3100); // auto-dismiss fires at ~3400ms after the fire
    expect(result.current).toBe(false);
    await advance(1500); // still within cooldown — should not re-fire
    expect(result.current).toBe(false);
  });

  it('auto-dismisses showNag after 3000ms', async () => {
    stubAudioContextOk();
    const stream = liveStream();
    const { result } = renderHook(() =>
      useMuteWhileTalking({ localStream: stream, isMuted: true, triggerMs: 200 }),
    );
    amplitude = TALK;
    await advance(500);
    expect(result.current).toBe(true);
    await advance(3100);
    expect(result.current).toBe(false);
  });

  it('clears showNag immediately when unmuted', async () => {
    stubAudioContextOk();
    const stream = liveStream();
    const { result, rerender } = renderHook(
      ({ isMuted }) => useMuteWhileTalking({ localStream: stream, isMuted, triggerMs: 200 }),
      { initialProps: { isMuted: true } },
    );
    amplitude = TALK;
    await advance(500);
    expect(result.current).toBe(true);
    rerender({ isMuted: false });
    expect(result.current).toBe(false);
  });

  it('clears the interval on unmount so no further fires occur', async () => {
    stubAudioContextOk();
    const stream = liveStream();
    const { result, unmount } = renderHook(() =>
      useMuteWhileTalking({ localStream: stream, isMuted: true, triggerMs: 200 }),
    );
    amplitude = TALK;
    await advance(100);
    unmount();
    await advance(5000);
    expect(result.current).toBe(false);
  });

  it('clears the nested auto-dismiss timeout on unmount', async () => {
    stubAudioContextOk();
    const stream = liveStream();
    const { unmount } = renderHook(() =>
      useMuteWhileTalking({ localStream: stream, isMuted: true, triggerMs: 200 }),
    );
    // Fire the nag so the 3s auto-dismiss timeout gets scheduled from inside
    // the polling interval, then unmount while it is still pending.
    amplitude = TALK;
    await advance(500);
    unmount();

    // Cleanup must own the nested timeout too, not just the interval —
    // otherwise it survives unmount holding the effect closure alive.
    expect(vi.getTimerCount()).toBe(0);
  });
});
