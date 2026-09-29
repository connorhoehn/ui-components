import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useActiveSpeaker } from '../useActiveSpeaker';

// Each participant's analyser reads that participant's current amplitude.
const levels = new Map<string, number>();
const LOUD = 0.3; // ≈ -10 dB
const TALK = 0.1; // ≈ -20 dB
const SILENT = 0.001; // ≈ -60 dB, below the -40 threshold

const mockCtx = {
  createMediaStreamSource: vi.fn((stream: MediaStream & { pid: string }) => {
    const source = {
      connect: (analyser: { pid?: string }) => {
        analyser.pid = stream.pid;
      },
      disconnect: vi.fn(),
    };
    return source;
  }),
  createAnalyser: vi.fn(() => {
    const analyser: { pid?: string } & Record<string, unknown> = {
      fftSize: 0,
      smoothingTimeConstant: 0,
      frequencyBinCount: 256,
      disconnect: vi.fn(),
    };
    analyser.getFloatTimeDomainData = (arr: Float32Array) => arr.fill(levels.get(analyser.pid!) ?? 0);
    return analyser;
  }),
};

function MockAudioContext(this: object) {
  return mockCtx;
}

const participant = (pid: string) => ({
  participantId: pid,
  streams: [{ pid, getAudioTracks: () => [{}] } as unknown as MediaStream],
});
const PEOPLE = ['a', 'b', 'c', 'd'].map(participant);

const set = (next: Record<string, number>) => {
  for (const p of PEOPLE) levels.set(p.participantId, next[p.participantId] ?? SILENT);
};
const poll = () =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(200);
  });

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-09-29T00:00:00Z'));
  vi.stubGlobal('AudioContext', MockAudioContext);
  set({});
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('useActiveSpeaker hold', () => {
  it('four people alternating every 200 ms keep the first speaker', async () => {
    const { result } = renderHook(() => useActiveSpeaker({ participants: PEOPLE }));
    set({ a: LOUD });
    await poll();
    expect(result.current.activeSpeakerId).toBe('a');
    const order = ['b', 'c', 'd', 'a', 'c', 'b', 'd', 'b', 'c', 'd', 'a', 'd'];
    for (const pid of order) {
      set({ [pid]: LOUD });
      await poll();
      expect(result.current.activeSpeakerId).toBe('a');
    }
  });

  it('a speaker loud for 700 ms takes over', async () => {
    const { result } = renderHook(() => useActiveSpeaker({ participants: PEOPLE }));
    set({ a: TALK });
    await poll();
    expect(result.current.activeSpeakerId).toBe('a');
    set({ a: TALK, b: LOUD });
    await poll(); // 0 ms
    await poll(); // 200
    await poll(); // 400
    expect(result.current.activeSpeakerId).toBe('a');
    await poll(); // 600 → held long enough
    expect(result.current.activeSpeakerId).toBe('b');
  });

  it('a challenger within the margin never takes over', async () => {
    const { result } = renderHook(() => useActiveSpeaker({ participants: PEOPLE }));
    set({ a: TALK });
    await poll();
    set({ a: TALK, b: TALK * 1.2 }); // ≈ +1.6 dB, under the 3 dB margin
    for (let i = 0; i < 10; i++) await poll();
    expect(result.current.activeSpeakerId).toBe('a');
  });

  it('silence clears the ring only after the hold', async () => {
    const { result } = renderHook(() => useActiveSpeaker({ participants: PEOPLE }));
    set({ a: LOUD });
    await poll();
    set({});
    await poll();
    await poll();
    expect(result.current.activeSpeakerId).toBe('a');
    await poll();
    await poll();
    expect(result.current.activeSpeakerId).toBeNull();
  });

  it('holdMs: 0 follows the loudest voice on every poll (the old behaviour)', async () => {
    const { result } = renderHook(() => useActiveSpeaker({ participants: PEOPLE, holdMs: 0 }));
    for (const pid of ['a', 'b', 'c', 'd', 'a']) {
      set({ [pid]: LOUD });
      await poll();
      expect(result.current.activeSpeakerId).toBe(pid);
    }
    set({});
    await poll();
    expect(result.current.activeSpeakerId).toBeNull();
  });
});
