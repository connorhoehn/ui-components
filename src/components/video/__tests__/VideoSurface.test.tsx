import { act, render, screen } from '@testing-library/react';
import { createRef, useRef, useState } from 'react';
import { VideoSurface } from '../VideoSurface';

type PlayImpl = () => Promise<void>;

// jsdom's HTMLMediaElement.play returns undefined; stub it per test.
function stubPlay(impl: PlayImpl) {
  const original = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'play');
  Object.defineProperty(HTMLMediaElement.prototype, 'play', { configurable: true, writable: true, value: impl });
  return () => {
    if (original) Object.defineProperty(HTMLMediaElement.prototype, 'play', original);
    else delete (HTMLMediaElement.prototype as unknown as { play?: PlayImpl }).play;
  };
}

function fakeStream(): MediaStream {
  const target = new EventTarget();
  return Object.assign(target, { id: 's', getTracks: () => [] }) as unknown as MediaStream;
}

let restorePlay: () => void;
beforeEach(() => { restorePlay = stubPlay(() => Promise.resolve()); });
afterEach(() => restorePlay());

describe('VideoSurface', () => {
  it('hands the <video> element to an object ref and keeps the same element across state changes', () => {
    const ref = createRef<HTMLVideoElement>();
    const { rerender } = render(<VideoSurface videoRef={ref} label="Camera preview" />);
    const el = screen.getByLabelText('Camera preview');
    expect(ref.current).toBe(el);
    rerender(<VideoSurface videoRef={ref} label="Camera preview" state="loading" />);
    rerender(<VideoSurface videoRef={ref} label="Camera preview" state="empty" />);
    rerender(<VideoSurface videoRef={ref} label="Camera preview" state="error" />);
    expect(ref.current).toBe(el);
    expect(screen.getByLabelText('Camera preview')).toBe(el);
  });

  it('calls a callback ref with the element and with null at unmount', () => {
    const calls: Array<HTMLVideoElement | null> = [];
    const { unmount } = render(<VideoSurface videoRef={(el) => { calls.push(el); }} />);
    expect(calls[0]).toBeInstanceOf(HTMLVideoElement);
    unmount();
    expect(calls[calls.length - 1]).toBeNull();
  });

  it('never touches srcObject without a stream, so a hook-attached source survives re-renders', () => {
    const stream = fakeStream();
    function HookDriven() {
      const ref = useRef<HTMLVideoElement>(null);
      const [tick, setTick] = useState(0);
      return (
        <>
          <button type="button" onClick={() => { if (ref.current) ref.current.srcObject = stream; setTick(tick + 1); }}>
            attach
          </button>
          <VideoSurface videoRef={ref} label="preview" state={tick % 2 ? 'loading' : 'ready'} />
        </>
      );
    }
    render(<HookDriven />);
    act(() => { screen.getByText('attach').click(); });
    act(() => { screen.getByText('attach').click(); });
    const video = screen.getByLabelText('preview') as HTMLVideoElement;
    expect(video.srcObject).toBe(stream);
    expect(video.getAttribute('src')).toBeNull();
  });

  it('binds a stream to srcObject and clears it when the stream goes away', () => {
    const stream = fakeStream();
    const { rerender } = render(<VideoSurface stream={stream} label="v" />);
    const video = screen.getByLabelText('v') as HTMLVideoElement;
    expect(video.srcObject).toBe(stream);
    rerender(<VideoSurface stream={null} label="v" />);
    expect(video.srcObject).toBeNull();
  });

  it('reports autoplay rejection for a bound stream', async () => {
    restorePlay();
    restorePlay = stubPlay(() => Promise.reject(Object.assign(new Error('blocked'), { name: 'NotAllowedError' })));
    const onPlayStateChange = vi.fn();
    await act(async () => {
      render(<VideoSurface stream={fakeStream()} onPlayStateChange={onPlayStateChange} />);
    });
    expect(onPlayStateChange).toHaveBeenCalledWith('paused-by-autoplay');
  });

  it('passes the media flags through to the element', () => {
    render(<VideoSurface label="v" muted controls autoPlay={false} poster="/p.jpg" />);
    const video = screen.getByLabelText('v') as HTMLVideoElement;
    expect(video.muted).toBe(true);
    expect(video.controls).toBe(true);
    expect(video.autoplay).toBe(false);
    expect(video.getAttribute('poster')).toBe('/p.jpg');
  });

  it('renders the state layers with their roles and copy', () => {
    const { rerender } = render(<VideoSurface state="loading" loadingLabel="Buffering…" />);
    expect(screen.getByRole('status')).toHaveTextContent('Buffering…');
    rerender(<VideoSurface state="empty" placeholder="Camera off" />);
    expect(screen.getByText('Camera off')).toBeInTheDocument();
    rerender(<VideoSurface state="error" error="Playlist not found" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Playlist not found');
    rerender(<VideoSurface />);
    expect(screen.queryByRole('status')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('renders each overlay slot and only the slots given', () => {
    render(
      <VideoSurface
        topLeft={<span>tl</span>}
        topRight={<span>tr</span>}
        bottomLeft={<span>bl</span>}
        bottomRight={<span>br</span>}
        center={<span>c</span>}
      />,
    );
    for (const [slot, text] of [['top-left', 'tl'], ['top-right', 'tr'], ['bottom-left', 'bl'], ['bottom-right', 'br'], ['center', 'c']]) {
      expect(screen.getByText(text).closest('[data-video-surface-slot]')).toHaveAttribute('data-video-surface-slot', slot);
    }
  });

  it('omits empty slots', () => {
    const { container } = render(<VideoSurface topRight={<span>tr</span>} />);
    expect(container.querySelectorAll('[data-video-surface-slot]')).toHaveLength(1);
  });

  it('flips only the picture when mirrored, never the overlays', () => {
    render(<VideoSurface mirrored label="v" topLeft={<span>badge</span>} />);
    expect(screen.getByLabelText('v').className).toContain('-scale-x-100');
    expect(screen.getByText('badge').closest('[data-video-surface-slot]')!.className).not.toContain('scale');
  });

  it('exposes fit, aspect and state as data attributes and accepts frame classes', () => {
    render(<VideoSurface fit="cover" aspect="square" state="empty" className="max-h-[50vh]" />);
    const root = screen.getByTestId('video-surface');
    expect(root).toHaveAttribute('data-fit', 'cover');
    expect(root).toHaveAttribute('data-aspect', 'square');
    expect(root).toHaveAttribute('data-state', 'empty');
    expect(root.className).toContain('max-h-[50vh]');
  });
});

describe('VideoSurface slot content', () => {
  it('treats false, null and empty string as an empty slot', () => {
    const { container } = render(<VideoSurface topLeft={false} topRight={null} bottomLeft="" bottomRight={<span>br</span>} />);
    expect(container.querySelectorAll('[data-video-surface-slot]')).toHaveLength(1);
  });
});

describe('VideoSurface loading with native controls', () => {
  it('moves the loading readout to the top, clear of the browser spinner', () => {
    const { rerender } = render(<VideoSurface state="loading" />);
    expect(screen.getByRole('status').className).toContain('items-center');
    rerender(<VideoSurface state="loading" controls />);
    expect(screen.getByRole('status').className).toContain('items-start');
    expect(screen.getByRole('status')).toHaveTextContent('Loading…');
  });
});
