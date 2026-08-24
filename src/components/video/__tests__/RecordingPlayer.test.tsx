import { render, screen, fireEvent, act } from '@testing-library/react';
import { RecordingPlayer } from '../RecordingPlayer';
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
