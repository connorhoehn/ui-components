// useHangoutEmbed lifecycle.
//
// The hook acquires camera, mic and screen-capture streams. Every acquisition
// is an await against a user-facing permission prompt, which can stay open for
// seconds — long enough for the user to close the call, or for the panel to
// unmount. Anything assigned after that await must still be released, or the
// browser keeps the capture indicator lit with no UI left to turn it off.
//
// The IVS SDK is dynamically imported (see the note in useHangoutEmbed), so it
// is stubbed at the module seam here rather than installed.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

vi.mock('amazon-ivs-web-broadcast', () => {
  class LocalStageStream {
    constructor(public mediaStreamTrack: MediaStreamTrack) {}
  }
  class Stage {
    constructor(public token: string, public strategy: unknown) {}
    join = vi.fn().mockResolvedValue(undefined);
    leave = vi.fn();
    on = vi.fn();
    refreshStrategy = vi.fn();
  }
  return {
    Stage,
    LocalStageStream,
    SubscribeType: { AUDIO_VIDEO: 'audio_video' },
    StageEvents: {
      STAGE_PARTICIPANT_JOINED: 'joined',
      STAGE_PARTICIPANT_LEFT: 'left',
      STAGE_PARTICIPANT_STREAMS_ADDED: 'added',
    },
  };
});

import { useHangoutEmbed } from '../useHangoutEmbed';

/** A MediaStream whose tracks record whether they were stopped.
 *  Every call builds fresh track objects, so a shared instance can never
 *  mask a stop() that landed on the wrong stream. */
function fakeStream(kinds: string[] = ['video', 'audio']) {
  const tracks = kinds.map((kind) => {
    const listeners: Record<string, Array<() => void>> = {};
    return {
      kind,
      stop: vi.fn(),
      contentHint: '',
      addEventListener: vi.fn((evt: string, fn: () => void) => {
        (listeners[evt] ??= []).push(fn);
      }),
      /** Fire a track event (e.g. the browser's "Stop sharing" bar → 'ended'). */
      _emit: (evt: string) => { for (const fn of listeners[evt] ?? []) fn(); },
      enabled: true,
    };
  });
  return {
    getTracks: () => tracks,
    getVideoTracks: () => tracks.filter((t) => t.kind === 'video'),
    getAudioTracks: () => tracks.filter((t) => t.kind === 'audio'),
    _tracks: tracks,
  } as unknown as MediaStream & {
    _tracks: Array<{ stop: ReturnType<typeof vi.fn>; _emit: (evt: string) => void }>;
  };
}

let getUserMedia: ReturnType<typeof vi.fn>;
let getDisplayMedia: ReturnType<typeof vi.fn>;

beforeEach(() => {
  getUserMedia = vi.fn().mockResolvedValue(fakeStream());
  getDisplayMedia = vi.fn().mockResolvedValue(fakeStream(['video']));
  Object.defineProperty(navigator, 'mediaDevices', {
    configurable: true,
    value: { getUserMedia, getDisplayMedia },
  });
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

const args = { stageToken: 'tok', userId: 'u1', participantId: 'p1' };

describe('useHangoutEmbed teardown', () => {
  it('stops camera and mic tracks on unmount', async () => {
    const camera = fakeStream();
    getUserMedia.mockResolvedValue(camera);

    const { result, unmount } = renderHook(() => useHangoutEmbed(args));
    await waitFor(() => expect(result.current.isJoined).toBe(true));

    unmount();
    for (const t of camera._tracks) expect(t.stop).toHaveBeenCalled();
  });

  it('releases a camera stream that arrives after unmount', async () => {
    // The permission prompt is still open when the user closes the call.
    let resolveMedia: (s: MediaStream) => void = () => {};
    const late = fakeStream();
    getUserMedia.mockReturnValue(new Promise<MediaStream>((r) => { resolveMedia = r; }));

    const { unmount } = renderHook(() => useHangoutEmbed(args));
    unmount();

    await act(async () => {
      resolveMedia(late);
      await Promise.resolve();
    });

    for (const t of late._tracks) expect(t.stop).toHaveBeenCalled();
  });

  it('releases a screen-share stream that arrives after unmount', async () => {
    const { result, unmount } = renderHook(() => useHangoutEmbed(args));
    await waitFor(() => expect(result.current.isJoined).toBe(true));

    // getDisplayMedia stays pending while the OS picker is open.
    let resolveScreen: (s: MediaStream) => void = () => {};
    const screen = fakeStream(['video']);
    getDisplayMedia.mockReturnValue(new Promise<MediaStream>((r) => { resolveScreen = r; }));

    act(() => { void result.current.startScreenShare(); });
    unmount();

    // User finishes picking a window AFTER the call panel is gone.
    await act(async () => {
      resolveScreen(screen);
      await Promise.resolve();
      await Promise.resolve();
    });

    // Nothing is left to stop this stream, so the hook must do it — otherwise
    // the browser keeps reporting an active screen capture.
    for (const t of screen._tracks) expect(t.stop).toHaveBeenCalled();
  });

  it('stops an active screen share on unmount', async () => {
    const screen = fakeStream(['video']);
    getDisplayMedia.mockResolvedValue(screen);

    const { result, unmount } = renderHook(() => useHangoutEmbed(args));
    await waitFor(() => expect(result.current.isJoined).toBe(true));
    await act(async () => { await result.current.startScreenShare(); });
    expect(result.current.isScreenSharing).toBe(true);

    unmount();
    for (const t of screen._tracks) expect(t.stop).toHaveBeenCalled();
  });

  it('stops the superseded capture when a second screen share replaces it', async () => {
    // `isScreenSharing` only flips true once getDisplayMedia resolves, so the
    // consumer's toggle still offers "Share screen" while the OS picker is
    // open — a second click gets a second capture. The first one must be
    // released, or the browser keeps its sharing indicator up with no UI left
    // that can stop it.
    const first = fakeStream(['video']);
    const second = fakeStream(['video']);

    const { result } = renderHook(() => useHangoutEmbed(args));
    await waitFor(() => expect(result.current.isJoined).toBe(true));

    getDisplayMedia.mockResolvedValueOnce(first);
    await act(async () => { await result.current.startScreenShare(); });
    getDisplayMedia.mockResolvedValueOnce(second);
    await act(async () => { await result.current.startScreenShare(); });

    for (const t of first._tracks) expect(t.stop).toHaveBeenCalled();
    for (const t of second._tracks) expect(t.stop).not.toHaveBeenCalled();
    expect(result.current.isScreenSharing).toBe(true);
  });

  it('ignores an `ended` event from a capture that has already been replaced', async () => {
    // Each capture gets its own browser "Stop sharing" bar. Hitting the STALE
    // one fires `ended` on the superseded track; because stopScreenShare reads
    // the ref, an unguarded handler would tear down the LIVE share instead.
    const first = fakeStream(['video']);
    const second = fakeStream(['video']);

    const { result } = renderHook(() => useHangoutEmbed(args));
    await waitFor(() => expect(result.current.isJoined).toBe(true));

    getDisplayMedia.mockResolvedValueOnce(first);
    await act(async () => { await result.current.startScreenShare(); });
    getDisplayMedia.mockResolvedValueOnce(second);
    await act(async () => { await result.current.startScreenShare(); });

    second._tracks.forEach((t) => t.stop.mockClear());
    await act(async () => {
      first._tracks[0]._emit('ended');
      await Promise.resolve();
    });

    for (const t of second._tracks) expect(t.stop).not.toHaveBeenCalled();
    expect(result.current.isScreenSharing).toBe(true);
  });

  it('does not report an error when the user cancels the screen picker', async () => {
    const { result } = renderHook(() => useHangoutEmbed(args));
    await waitFor(() => expect(result.current.isJoined).toBe(true));

    getDisplayMedia.mockRejectedValue(Object.assign(new Error('no'), { name: 'NotAllowedError' }));
    await act(async () => { await result.current.startScreenShare(); });

    expect(result.current.isScreenSharing).toBe(false);
    expect(console.error).not.toHaveBeenCalled();
  });
});
