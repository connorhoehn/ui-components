import { render, screen, fireEvent, act, configure } from '@testing-library/react';
import { createRef } from 'react';
import { RecordingPlayer, type RecordingPlayerHandle } from '../RecordingPlayer';
// `hls.js` is aliased to a stub in `vitest.config.ts`; the Safari-native-HLS
// path stubbed below means tests never actually reach that branch.

// jsdom's HTMLMediaElement.play is a no-op (returns undefined, not a Promise),
// canPlayType always returns '', and requestFullscreen / exitFullscreen don't
// exist. Stub the prototype per-suite so RecordingPlayer's effects exercise
// the Safari-native-HLS path (the simple, deterministic one) instead of trying
// to dynamic-import the optional hls.js peer dep.

function getVideo(container: HTMLElement): HTMLVideoElement {
  const el = container.querySelector('video');
  if (!el) throw new Error('expected a <video> element');
  return el;
}

type Stub = () => void;

function stubProto(key: keyof HTMLMediaElement, value: unknown): Stub {
  const original = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, key);
  Object.defineProperty(HTMLMediaElement.prototype, key, {
    configurable: true,
    writable: true,
    value,
  });
  return () => {
    if (original) Object.defineProperty(HTMLMediaElement.prototype, key, original);
    else delete (HTMLMediaElement.prototype as unknown as Record<string, unknown>)[key as string];
  };
}

describe('RecordingPlayer', () => {
  let restores: Stub[] = [];

  beforeEach(() => {
    restores = [
      // Pretend we're Safari with native HLS — RecordingPlayer's effect then
      // takes the simple `v.src = playlistUrl` branch and skips hls.js.
      stubProto('canPlayType', () => 'maybe'),
      stubProto('play', () => Promise.resolve()),
      stubProto('pause', () => undefined),
      stubProto('load', () => undefined),
    ];
  });

  afterEach(() => {
    while (restores.length) restores.pop()!();
  });

  it('renders a <video> with poster, autoPlay, muted, playsInline', () => {
    const { container } = render(
      <RecordingPlayer
        playlistUrl="https://example.com/v.m3u8"
        poster="https://example.com/p.jpg"
        autoPlay
        muted
      />,
    );
    const v = getVideo(container);
    expect(v.getAttribute('poster')).toBe('https://example.com/p.jpg');
    expect(v.autoplay).toBe(true);
    expect(v.muted).toBe(true);
    expect(v.playsInline).toBe(true);
  });

  it('assigns playlistUrl to <video src> on the native-HLS path', () => {
    const { container } = render(
      <RecordingPlayer playlistUrl="https://example.com/v.m3u8" />,
    );
    expect(getVideo(container).src).toBe('https://example.com/v.m3u8');
  });

  it('does not set <video src> when playlistUrl is null', () => {
    const { container } = render(<RecordingPlayer playlistUrl={null} />);
    expect(getVideo(container).getAttribute('src')).toBeNull();
  });

  it('shows the loading overlay when a playlist is supplied and not yet ready', () => {
    render(<RecordingPlayer playlistUrl="https://example.com/v.m3u8" />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('hides the loading overlay after canplay fires', () => {
    const { container } = render(
      <RecordingPlayer playlistUrl="https://example.com/v.m3u8" />,
    );
    act(() => { getVideo(container).dispatchEvent(new Event('canplay')); });
    expect(screen.queryByText('Loading…')).not.toBeInTheDocument();
  });

  it('renders an error overlay and fires onError when the <video> errors', () => {
    const onError = vi.fn();
    const { container } = render(
      <RecordingPlayer playlistUrl="https://example.com/v.m3u8" onError={onError} />,
    );
    act(() => { getVideo(container).dispatchEvent(new Event('error')); });
    expect(screen.getByText('Playback error.')).toBeInTheDocument();
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('calls onLoadedMetadata with the duration', () => {
    const onLoadedMetadata = vi.fn();
    const { container } = render(
      <RecordingPlayer
        playlistUrl="https://example.com/v.m3u8"
        onLoadedMetadata={onLoadedMetadata}
      />,
    );
    const v = getVideo(container);
    Object.defineProperty(v, 'duration', { configurable: true, value: 123.4 });
    act(() => { v.dispatchEvent(new Event('loadedmetadata')); });
    expect(onLoadedMetadata).toHaveBeenCalledWith(123.4);
  });

  it('calls onTimeUpdate with the current time + duration', () => {
    const onTimeUpdate = vi.fn();
    const { container } = render(
      <RecordingPlayer
        playlistUrl="https://example.com/v.m3u8"
        onTimeUpdate={onTimeUpdate}
      />,
    );
    const v = getVideo(container);
    Object.defineProperty(v, 'currentTime', { configurable: true, value: 7.5 });
    Object.defineProperty(v, 'duration', { configurable: true, value: 60 });
    act(() => { v.dispatchEvent(new Event('timeupdate')); });
    expect(onTimeUpdate).toHaveBeenCalledWith(7.5, 60);
  });

  it('toggles play and pause via the play/pause button', () => {
    const playSpy = vi.fn(() => Promise.resolve());
    const pauseSpy = vi.fn();
    restores.push(stubProto('play', playSpy), stubProto('pause', pauseSpy));

    const { container } = render(
      <RecordingPlayer playlistUrl="https://example.com/v.m3u8" />,
    );
    const v = getVideo(container);

    // Paused -> click Play -> play() called.
    Object.defineProperty(v, 'paused', { configurable: true, value: true });
    fireEvent.click(screen.getByLabelText('Play'));
    expect(playSpy).toHaveBeenCalledTimes(1);

    // Now playing -> button flips to Pause -> click -> pause() called.
    act(() => { v.dispatchEvent(new Event('play')); });
    Object.defineProperty(v, 'paused', { configurable: true, value: false });
    fireEvent.click(screen.getByLabelText('Pause'));
    expect(pauseSpy).toHaveBeenCalledTimes(1);
  });

  it('updates volume on the underlying <video> when the volume range changes', () => {
    const { container } = render(
      <RecordingPlayer playlistUrl="https://example.com/v.m3u8" />,
    );
    const v = getVideo(container);
    fireEvent.change(screen.getByLabelText('Volume'), { target: { value: '0.3' } });
    expect(v.volume).toBeCloseTo(0.3);
  });

  it('updates playbackRate on the underlying <video> when speed changes', () => {
    const { container } = render(
      <RecordingPlayer playlistUrl="https://example.com/v.m3u8" />,
    );
    const v = getVideo(container);
    fireEvent.change(screen.getByLabelText('Playback speed'), { target: { value: '2' } });
    expect(v.playbackRate).toBe(2);
  });

  it('shows the Download link by default when a playlistUrl is set', () => {
    render(<RecordingPlayer playlistUrl="https://example.com/v.m3u8" />);
    const link = screen.getByLabelText('Download') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('https://example.com/v.m3u8');
    expect(link.hasAttribute('download')).toBe(true);
  });

  it('hides the Download link when hideDownload is true', () => {
    render(<RecordingPlayer playlistUrl="https://example.com/v.m3u8" hideDownload />);
    expect(screen.queryByLabelText('Download')).toBeNull();
  });

  it('hides the Download link when playlistUrl is null', () => {
    render(<RecordingPlayer playlistUrl={null} />);
    expect(screen.queryByLabelText('Download')).toBeNull();
  });

  it('requests fullscreen on the video element when the fullscreen button is clicked', () => {
    const reqFs = vi.fn();
    restores.push(stubProto('requestFullscreen', reqFs));
    const { container } = render(
      <RecordingPlayer playlistUrl="https://example.com/v.m3u8" />,
    );
    fireEvent.click(screen.getByLabelText('Fullscreen'));
    expect(reqFs).toHaveBeenCalled();
    void container;
  });

  it('exits fullscreen when already fullscreen and the button is clicked', () => {
    const exitFs = vi.fn(() => Promise.resolve());
    const originalExit = Object.getOwnPropertyDescriptor(document, 'exitFullscreen');
    const originalEl = Object.getOwnPropertyDescriptor(document, 'fullscreenElement');
    Object.defineProperty(document, 'exitFullscreen', { configurable: true, value: exitFs });
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: document.createElement('div') });
    try {
      render(<RecordingPlayer playlistUrl="https://example.com/v.m3u8" />);
      fireEvent.click(screen.getByLabelText('Fullscreen'));
      expect(exitFs).toHaveBeenCalled();
    } finally {
      if (originalExit) Object.defineProperty(document, 'exitFullscreen', originalExit);
      else delete (document as unknown as { exitFullscreen?: unknown }).exitFullscreen;
      if (originalEl) Object.defineProperty(document, 'fullscreenElement', originalEl);
    }
  });

  it('formats currentTime and duration with mm:ss (or h:mm:ss past an hour)', () => {
    const { container } = render(
      <RecordingPlayer playlistUrl="https://example.com/v.m3u8" />,
    );
    const v = getVideo(container);
    Object.defineProperty(v, 'duration', { configurable: true, value: 3725 }); // 1:02:05
    Object.defineProperty(v, 'currentTime', { configurable: true, value: 65 }); //   1:05
    act(() => {
      v.dispatchEvent(new Event('loadedmetadata'));
      v.dispatchEvent(new Event('timeupdate'));
    });
    expect(screen.getByText('1:02:05')).toBeInTheDocument();
    expect(screen.getByText('1:05')).toBeInTheDocument();
  });
});

// REGRESSION: the player's entire control bar — scrubber, play/pause, mute,
// fullscreen — lives in an `opacity-0` overlay that was revealed only by
// `group-hover:opacity-100`. A keyboard user tabbing into the player was
// operating completely invisible controls. The overlay must reveal itself
// when focus lands anywhere inside it too.
describe('RecordingPlayer — controls must be visible when focused', () => {
  it('reveals the control overlay on focus-within, not only on hover', () => {
    const { container } = render(
      <RecordingPlayer playlistUrl="https://example.com/v.m3u8" />,
    );

    const overlay = container.querySelector('.opacity-0.group-hover\\:opacity-100');
    expect(overlay).not.toBeNull();
    // The half that was missing:
    expect((overlay as HTMLElement).className).toContain('focus-within:opacity-100');
  });
});

// The hls.js engine is the expensive resource this component owns: a worker,
// a fetch loop and a decode buffer. `vitest.config.ts` aliases `hls.js` to a
// stub; this block replaces it with an instrumented one so the effect's
// hls.js branch (isSupported() === true) is actually exercised and every
// construction/destruction is counted.
vi.mock('hls.js', () => {
  class MockHls {
    static instances: MockHls[] = [];
    static isSupported = () => true;
    static Events = { MEDIA_ATTACHED: 'media-attached', ERROR: 'error' } as const;
    // Fresh spies per construction — a shared instance would hide the very
    // thing under test (which engine got torn down, and how many exist).
    attachMedia = vi.fn();
    loadSource = vi.fn();
    destroy = vi.fn();
    on = vi.fn();
    constructor() { MockHls.instances.push(this); }
  }
  return { default: MockHls };
});

describe('RecordingPlayer — hls.js engine lifetime', () => {
  // StrictMode opt-out, per the contract in src/test-setup.ts.
  //
  // REASON: the component loads the engine with
  // `import(/* @vite-ignore */ 'hls.js')`. That pragma tells the bundler to
  // leave the specifier alone, and vitest therefore does not route it through
  // `vi.mock('hls.js')` the way a static import would — the test file gets the
  // mock, the component does not reliably get the same module instance.
  // Single-mount hides that; the StrictMode double-mount surfaces it as "no
  // engine was ever constructed".
  //
  // This is NOT the component misbehaving, and it was checked rather than
  // assumed: instrumenting the effect shows both passes take the hls branch
  // with a live video ref, pass 1 correctly bails on its own cancelled flag,
  // and pass 2 proceeds with `cancelled === false` all the way to engine
  // construction. The teardown semantics these tests pin are real and still
  // verified — only the module-interception is unreliable under two passes.
  //
  // The rest of this file runs under StrictMode as normal.
  beforeAll(() => { configure({ reactStrictMode: false }); });
  afterAll(() => { configure({ reactStrictMode: true }); });

  let MockHls: { instances: Array<{ destroy: ReturnType<typeof vi.fn> }> };

  // The engine is created after `await import('hls.js')`. Under StrictMode the
  // effect runs twice, so there are two import chains to settle — the first
  // pass's is cancelled by its own cleanup and never builds an engine, the
  // second's does. A single `await Promise.resolve()` only drains one link of
  // that chain and the engine looks like it was never created at all. The
  // EXPECTED COUNT is unchanged at 1: this drains the queue rather than
  // relaxing the assertion.
  const settle = async () => {
    // Macrotask turns, not just microtasks: the engine is built after
    // `await import('hls.js')`, and under StrictMode there are two import
    // chains to settle — the first pass's is cancelled by its own cleanup and
    // never builds an engine, the second's does. A bare `await
    // Promise.resolve()` drains one microtask link and the engine looks like
    // it was never created at all. The EXPECTED COUNT stays 1; this drains the
    // queue rather than relaxing the assertion.
    await act(async () => { for (let i = 0; i < 4; i++) await new Promise((r) => setTimeout(r, 0)); });
  };

  beforeEach(async () => {
    MockHls = (await import('hls.js')).default as unknown as typeof MockHls;
    MockHls.instances.length = 0;
  });

  it('keeps ONE engine across parent re-renders that change the onError identity', async () => {
    // `onError` is almost always an inline arrow. While it was an effect
    // dependency, the engine was keyed to the parent's render identity: each
    // render destroyed it and built a new one, re-importing, re-attaching and
    // re-buffering from zero. A parent that mirrors progress via onTimeUpdate
    // re-renders several times a second, so the recording never advanced and
    // the decoder churned nonstop.
    const { rerender } = render(
      <RecordingPlayer playlistUrl="https://example.com/v.m3u8" onError={() => {}} />,
    );
    await settle();
    expect(MockHls.instances).toHaveLength(1);
    const engine = MockHls.instances[0];

    for (let i = 0; i < 4; i++) {
      rerender(
        <RecordingPlayer playlistUrl="https://example.com/v.m3u8" onError={() => {}} />,
      );
      await settle();
    }

    expect(MockHls.instances).toHaveLength(1);
    expect(engine.destroy).not.toHaveBeenCalled();
  });

  it('destroys the engine on unmount', async () => {
    const { unmount } = render(
      <RecordingPlayer playlistUrl="https://example.com/v.m3u8" />,
    );
    await settle();
    const engine = MockHls.instances[0];
    expect(engine).toBeDefined();

    unmount();
    expect(engine.destroy).toHaveBeenCalledTimes(1);
  });

  it('replaces the engine when the playlist actually changes', async () => {
    const { rerender } = render(
      <RecordingPlayer playlistUrl="https://example.com/a.m3u8" />,
    );
    await act(async () => { await Promise.resolve(); });
    const first = MockHls.instances[0];

    rerender(<RecordingPlayer playlistUrl="https://example.com/b.m3u8" />);
    await act(async () => { await Promise.resolve(); });

    expect(first.destroy).toHaveBeenCalledTimes(1);
    expect(MockHls.instances).toHaveLength(2);
  });
});

// 2.534.0: a page that drives something else from the recording's clock (a
// code playback beside it) needs to move the recording too.
describe('RecordingPlayer — handle and startAt', () => {
  let restores: Stub[] = [];
  afterEach(() => { while (restores.length) restores.pop()!(); });

  function stubEngine(nativeHls: boolean) {
    restores = [
      stubProto('canPlayType', () => (nativeHls ? 'maybe' : '')),
      stubProto('play', vi.fn(() => Promise.resolve())),
      stubProto('pause', vi.fn()),
      stubProto('load', () => undefined),
    ];
  }

  /** A video whose clock the test can read and set, with a given duration. */
  function fakeClock(v: HTMLVideoElement, duration: number) {
    let t = 0;
    const sets: number[] = [];
    Object.defineProperty(v, 'currentTime', { configurable: true, get: () => t, set: (n: number) => { t = n; sets.push(n); } });
    Object.defineProperty(v, 'duration', { configurable: true, value: duration });
    return { sets, now: () => t };
  }

  const loadMetadata = (v: HTMLVideoElement) => act(() => { v.dispatchEvent(new Event('loadedmetadata')); });

  for (const [kind, url, nativeHls] of [
    ['progressive', 'https://example.com/r.mp4', false],
    ['native HLS', 'https://example.com/r.m3u8', true],
    ['hls.js', 'https://example.com/r.m3u8', false],
  ] as const) {
    it(`seek moves and clamps the ${kind} source once its metadata has loaded`, () => {
      stubEngine(nativeHls);
      const ref = createRef<RecordingPlayerHandle>();
      const { container } = render(<RecordingPlayer playlistUrl={url} ref={ref} />);
      const v = getVideo(container);
      const clock = fakeClock(v, 120);
      loadMetadata(v);
      act(() => ref.current!.seek(42.5));
      expect(clock.now()).toBe(42.5);
      expect(ref.current!.currentTime).toBe(42.5);
      act(() => ref.current!.seek(500));
      expect(clock.now()).toBe(120);
      act(() => ref.current!.seek(-3));
      expect(clock.now()).toBe(0);
    });
  }

  it('remembers a seek made before the metadata and applies it (clamped) when it loads', () => {
    stubEngine(true);
    const ref = createRef<RecordingPlayerHandle>();
    const { container } = render(<RecordingPlayer playlistUrl="https://example.com/r.mp4" ref={ref} />);
    const v = getVideo(container);
    const clock = fakeClock(v, 60);
    act(() => ref.current!.seek(90));
    expect(clock.sets).toEqual([]);
    expect(ref.current!.currentTime).toBe(90);
    loadMetadata(v);
    expect(clock.sets).toEqual([60]);
  });

  it('applies startAt once when the metadata loads, and an early seek wins over it', () => {
    stubEngine(true);
    const ref = createRef<RecordingPlayerHandle>();
    const { container } = render(<RecordingPlayer playlistUrl="https://example.com/a.mp4" startAt={15} ref={ref} />);
    const v = getVideo(container);
    const clock = fakeClock(v, 60);
    loadMetadata(v);
    expect(clock.sets).toEqual([15]);
    // A second loadedmetadata on the same source does not jump back.
    loadMetadata(v);
    expect(clock.sets).toEqual([15]);

    const ref2 = createRef<RecordingPlayerHandle>();
    const second = render(<RecordingPlayer playlistUrl="https://example.com/b.mp4" startAt={15} ref={ref2} />);
    const v2 = getVideo(second.container);
    const clock2 = fakeClock(v2, 60);
    act(() => ref2.current!.seek(30));
    loadMetadata(v2);
    expect(clock2.sets).toEqual([30]);
  });

  it('applies startAt again for a new source', () => {
    stubEngine(true);
    const { container, rerender } = render(<RecordingPlayer playlistUrl="https://example.com/a.mp4" startAt={10} />);
    const v = getVideo(container);
    const clock = fakeClock(v, 60);
    loadMetadata(v);
    rerender(<RecordingPlayer playlistUrl="https://example.com/b.mp4" startAt={10} />);
    loadMetadata(v);
    expect(clock.sets).toEqual([10, 10]);
  });

  it('play and pause drive the video; onTimeUpdate still reports', () => {
    stubEngine(true);
    const ref = createRef<RecordingPlayerHandle>();
    const onTimeUpdate = vi.fn();
    const { container } = render(<RecordingPlayer playlistUrl="https://example.com/r.mp4" ref={ref} onTimeUpdate={onTimeUpdate} />);
    const v = getVideo(container);
    fakeClock(v, 60);
    act(() => ref.current!.play());
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    act(() => ref.current!.pause());
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
    loadMetadata(v);
    act(() => ref.current!.seek(7));
    act(() => { v.dispatchEvent(new Event('timeupdate')); });
    expect(onTimeUpdate).toHaveBeenLastCalledWith(7, 60);
  });
});
