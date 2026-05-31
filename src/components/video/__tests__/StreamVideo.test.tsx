import { render, act } from '@testing-library/react';
import { StreamVideo } from '../StreamVideo';

// jsdom's HTMLMediaElement.play returns undefined, not a Promise. Stub
// the prototype per-test so we can exercise the autoplay-rejection path.
type PlayImpl = () => Promise<void>;

function stubPlay(impl: PlayImpl) {
  const original = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'play');
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    writable: true,
    value: impl,
  });
  return () => {
    if (original) Object.defineProperty(HTMLMediaElement.prototype, 'play', original);
    else delete (HTMLMediaElement.prototype as unknown as { play?: PlayImpl }).play;
  };
}

function getVideo(container: HTMLElement): HTMLVideoElement {
  const el = container.querySelector('video');
  if (!el) throw new Error('expected a <video> element');
  return el;
}

describe('StreamVideo', () => {
  it('assigns the MediaStream to srcObject', () => {
    const restore = stubPlay(() => Promise.resolve());
    try {
      const stream = {} as MediaStream;
      const { container } = render(<StreamVideo stream={stream} />);
      expect(getVideo(container).srcObject).toBe(stream);
    } finally {
      restore();
    }
  });

  it('fires onPlayStateChange("paused-by-autoplay") when play() rejects with NotAllowedError', async () => {
    const err = Object.assign(new Error('autoplay blocked'), { name: 'NotAllowedError' });
    const restore = stubPlay(() => Promise.reject(err));
    try {
      const onPlayStateChange = vi.fn();
      const stream = {} as MediaStream;
      await act(async () => {
        render(<StreamVideo stream={stream} onPlayStateChange={onPlayStateChange} />);
      });
      expect(onPlayStateChange).toHaveBeenCalledWith('paused-by-autoplay');
    } finally {
      restore();
    }
  });

  it('does not fire "paused-by-autoplay" on unrelated play() rejections', async () => {
    const err = Object.assign(new Error('aborted'), { name: 'AbortError' });
    const restore = stubPlay(() => Promise.reject(err));
    try {
      const onPlayStateChange = vi.fn();
      const stream = {} as MediaStream;
      await act(async () => {
        render(<StreamVideo stream={stream} onPlayStateChange={onPlayStateChange} />);
      });
      expect(onPlayStateChange).not.toHaveBeenCalledWith('paused-by-autoplay');
    } finally {
      restore();
    }
  });

  it('fires onPlayStateChange("playing") on the play event', () => {
    const restore = stubPlay(() => Promise.resolve());
    try {
      const onPlayStateChange = vi.fn();
      const stream = {} as MediaStream;
      const { container } = render(
        <StreamVideo stream={stream} onPlayStateChange={onPlayStateChange} />,
      );
      const video = getVideo(container);
      act(() => { video.dispatchEvent(new Event('play')); });
      expect(onPlayStateChange).toHaveBeenCalledWith('playing');
    } finally {
      restore();
    }
  });

  it('forwards videoRef to the underlying <video> element', () => {
    const restore = stubPlay(() => Promise.resolve());
    try {
      const ref: { current: HTMLVideoElement | null } = { current: null };
      const stream = {} as MediaStream;
      const { container } = render(<StreamVideo stream={stream} videoRef={ref} />);
      expect(ref.current).toBe(getVideo(container));
    } finally {
      restore();
    }
  });

  it('renders muted=false by default and respects the muted prop', () => {
    const restore = stubPlay(() => Promise.resolve());
    try {
      const stream = {} as MediaStream;
      const { container, rerender } = render(<StreamVideo stream={stream} />);
      expect(getVideo(container).muted).toBe(false);
      rerender(<StreamVideo stream={stream} muted />);
      expect(getVideo(container).muted).toBe(true);
    } finally {
      restore();
    }
  });

  it('does not throw when play() returns undefined (older browser shim)', () => {
    const restore = stubPlay((() => undefined) as unknown as PlayImpl);
    try {
      const stream = {} as MediaStream;
      expect(() => render(<StreamVideo stream={stream} />)).not.toThrow();
    } finally {
      restore();
    }
  });
});
