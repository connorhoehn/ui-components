import { render, screen, act, fireEvent } from '@testing-library/react';
import { AutoplayGate } from '../AutoplayGate';

// jsdom's HTMLMediaElement.play returns undefined, not a Promise. Stub
// the prototype per-test so we can drive the autoplay-rejection path.
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

function notAllowed(): Error {
  return Object.assign(new Error('autoplay blocked'), { name: 'NotAllowedError' });
}

describe('AutoplayGate', () => {
  it('does not show the chip when playback succeeds', () => {
    const restore = stubPlay(() => Promise.resolve());
    try {
      const stream = {} as MediaStream;
      render(<AutoplayGate stream={stream} />);
      expect(screen.queryByTestId('autoplay-gate-chip')).not.toBeInTheDocument();
    } finally {
      restore();
    }
  });

  it('shows the chip when play() rejects with NotAllowedError', async () => {
    const restore = stubPlay(() => Promise.reject(notAllowed()));
    try {
      const stream = {} as MediaStream;
      await act(async () => {
        render(<AutoplayGate stream={stream} />);
      });
      expect(screen.getByTestId('autoplay-gate-chip')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Tap to unmute');
    } finally {
      restore();
    }
  });

  it('uses chipLabel override when provided', async () => {
    const restore = stubPlay(() => Promise.reject(notAllowed()));
    try {
      const stream = {} as MediaStream;
      await act(async () => {
        render(<AutoplayGate stream={stream} chipLabel="Click to start audio" />);
      });
      expect(screen.getByRole('button')).toHaveTextContent('Click to start audio');
    } finally {
      restore();
    }
  });

  it('clicking the chip unmutes the wrapped video and plays every paused video in the document', async () => {
    const restore = stubPlay(() => Promise.reject(notAllowed()));
    try {
      // Two extra paused <video> elements in the document — siblings of
      // the wrapped tile. The chip's gesture must play these too.
      const extra1 = document.createElement('video');
      const extra2 = document.createElement('video');
      const play1 = vi.fn(() => Promise.resolve());
      const play2 = vi.fn(() => Promise.resolve());
      Object.defineProperty(extra1, 'paused', { value: true, configurable: true });
      Object.defineProperty(extra2, 'paused', { value: true, configurable: true });
      Object.defineProperty(extra1, 'play', { value: play1, configurable: true, writable: true });
      Object.defineProperty(extra2, 'play', { value: play2, configurable: true, writable: true });
      document.body.appendChild(extra1);
      document.body.appendChild(extra2);

      const stream = {} as MediaStream;
      let container!: HTMLElement;
      await act(async () => {
        ({ container } = render(<AutoplayGate stream={stream} />));
      });

      const wrapped = container.querySelector('video') as HTMLVideoElement;
      expect(wrapped.muted).toBe(false);
      wrapped.muted = true;

      // Stub the wrapped tile's play to resolve so the gesture re-plays
      // succeed and we don't immediately re-enter the blocked state.
      const wrappedPlay = vi.fn(() => Promise.resolve());
      Object.defineProperty(wrapped, 'play', { value: wrappedPlay, configurable: true, writable: true });
      Object.defineProperty(wrapped, 'paused', { value: false, configurable: true });

      await act(async () => {
        fireEvent.click(screen.getByTestId('autoplay-gate-chip'));
      });

      expect(wrapped.muted).toBe(false);
      expect(wrappedPlay).toHaveBeenCalled();
      expect(play1).toHaveBeenCalled();
      expect(play2).toHaveBeenCalled();

      document.body.removeChild(extra1);
      document.body.removeChild(extra2);
    } finally {
      restore();
    }
  });

  it('dismisses the chip after a successful play event', async () => {
    const restore = stubPlay(() => Promise.reject(notAllowed()));
    try {
      const stream = {} as MediaStream;
      let container!: HTMLElement;
      await act(async () => {
        ({ container } = render(<AutoplayGate stream={stream} />));
      });
      expect(screen.getByTestId('autoplay-gate-chip')).toBeInTheDocument();

      const video = container.querySelector('video') as HTMLVideoElement;
      act(() => { video.dispatchEvent(new Event('play')); });

      expect(screen.queryByTestId('autoplay-gate-chip')).not.toBeInTheDocument();
    } finally {
      restore();
    }
  });

  it('forwards onPlayStateChange to consumers', async () => {
    const restore = stubPlay(() => Promise.reject(notAllowed()));
    try {
      const onPlayStateChange = vi.fn();
      const stream = {} as MediaStream;
      await act(async () => {
        render(<AutoplayGate stream={stream} onPlayStateChange={onPlayStateChange} />);
      });
      expect(onPlayStateChange).toHaveBeenCalledWith('paused-by-autoplay');
    } finally {
      restore();
    }
  });
});
