import { render, screen, act } from '@testing-library/react';
import { VideoPlayer } from '../VideoPlayer';

function getVideo(container: HTMLElement): HTMLVideoElement {
  const el = container.querySelector('video');
  if (!el) throw new Error('expected a <video> element');
  return el as HTMLVideoElement;
}

describe('VideoPlayer', () => {
  it('renders a <video> element with the provided src', () => {
    const { container } = render(<VideoPlayer src="https://example.com/clip.mp4" />);
    const video = getVideo(container);
    expect(video.getAttribute('src')).toBe('https://example.com/clip.mp4');
  });

  it('attaches a MediaStream to srcObject when stream is provided', () => {
    const stream = {} as MediaStream;
    const { container } = render(<VideoPlayer stream={stream} />);
    const video = getVideo(container);
    expect(video.srcObject).toBe(stream);
    // stream takes precedence — src attribute should be absent
    expect(video.getAttribute('src')).toBeNull();
  });

  it('clears srcObject when stream is set to null', () => {
    const stream = {} as MediaStream;
    const { container, rerender } = render(<VideoPlayer stream={stream} />);
    const video = getVideo(container);
    expect(video.srcObject).toBe(stream);

    rerender(<VideoPlayer stream={null} />);
    expect(video.srcObject).toBeNull();
  });

  it('renders the connecting overlay text when phase=connecting', () => {
    render(<VideoPlayer phase="connecting" />);
    expect(screen.getByText('Connecting…')).toBeInTheDocument();
  });

  it('renders the buffering overlay text when phase=buffering', () => {
    render(<VideoPlayer phase="buffering" />);
    expect(screen.getByText('Buffering…')).toBeInTheDocument();
  });

  it('renders the error overlay text when phase=error', () => {
    render(<VideoPlayer phase="error" />);
    expect(screen.getByText('Playback Error')).toBeInTheDocument();
  });

  it('hides the overlay text when phase=playing', () => {
    render(<VideoPlayer phase="playing" />);
    expect(screen.queryByText('Connecting…')).not.toBeInTheDocument();
    expect(screen.queryByText('Buffering…')).not.toBeInTheDocument();
    expect(screen.queryByText('Playback Error')).not.toBeInTheDocument();
  });

  it('fires onPhaseChange for the standard <video> event sequence', () => {
    const onPhaseChange = vi.fn();
    const { container } = render(<VideoPlayer onPhaseChange={onPhaseChange} />);
    const video = getVideo(container);

    act(() => { video.dispatchEvent(new Event('loadstart')); });
    act(() => { video.dispatchEvent(new Event('waiting')); });
    act(() => { video.dispatchEvent(new Event('playing')); });
    act(() => { video.dispatchEvent(new Event('error')); });

    expect(onPhaseChange).toHaveBeenNthCalledWith(1, 'connecting');
    expect(onPhaseChange).toHaveBeenNthCalledWith(2, 'buffering');
    expect(onPhaseChange).toHaveBeenNthCalledWith(3, 'playing');
    expect(onPhaseChange).toHaveBeenNthCalledWith(4, 'error');
  });

  it('fires onTimeUpdate with currentTime and duration', () => {
    const onTimeUpdate = vi.fn();
    const { container } = render(<VideoPlayer onTimeUpdate={onTimeUpdate} />);
    const video = getVideo(container);

    Object.defineProperty(video, 'currentTime', { configurable: true, value: 4.2 });
    Object.defineProperty(video, 'duration', { configurable: true, value: 12.5 });
    act(() => { video.dispatchEvent(new Event('timeupdate')); });

    expect(onTimeUpdate).toHaveBeenCalledWith(4.2, 12.5);
  });

  it('forwards muted, loop, controls, and autoPlay props to the <video> element', () => {
    const { container } = render(
      <VideoPlayer src="x.mp4" autoPlay muted={false} loop controls />,
    );
    const video = getVideo(container);
    expect(video.muted).toBe(false);
    expect(video.loop).toBe(true);
    expect(video.controls).toBe(true);
    expect(video.autoplay).toBe(true);
  });

  // 2.515.7: a paused file clip is not a connection.
  it('a file source with loaded metadata shows no connecting overlay over its controls', () => {
    const { container } = render(<VideoPlayer src="/clip.mp4" controls />);
    const video = getVideo(container);
    const root = container.querySelector('[data-video-player]')!;
    expect(root).toHaveAttribute('data-source', 'file');
    act(() => { video.dispatchEvent(new Event('loadstart')); });
    expect(screen.getByText('Connecting…')).toBeInTheDocument();
    act(() => { video.dispatchEvent(new Event('loadedmetadata')); });
    expect(screen.queryByText('Connecting…')).not.toBeInTheDocument();
    expect(container.querySelector('[data-video-overlay]')).toBeNull();
    expect(root).toHaveAttribute('data-file-loaded');
    // A new source starts over until its own metadata is in.
    act(() => { video.dispatchEvent(new Event('loadstart')); });
    expect(container.querySelector('[data-video-overlay="connecting"]')).not.toBeNull();
    expect(root).not.toHaveAttribute('data-file-loaded');
  });

  it('a loaded file still shows buffering and errors', () => {
    const { container } = render(<VideoPlayer src="/clip.mp4" />);
    const video = getVideo(container);
    act(() => { video.dispatchEvent(new Event('loadstart')); });
    act(() => { video.dispatchEvent(new Event('loadedmetadata')); });
    act(() => { video.dispatchEvent(new Event('waiting')); });
    expect(screen.getByText('Buffering…')).toBeInTheDocument();
    act(() => { video.dispatchEvent(new Event('error')); });
    expect(screen.getByText('Playback Error')).toBeInTheDocument();
  });

  it('a stream keeps its connecting overlay after metadata', () => {
    const stream = {} as MediaStream;
    const { container } = render(<VideoPlayer stream={stream} />);
    const video = getVideo(container);
    act(() => { video.dispatchEvent(new Event('loadstart')); });
    act(() => { video.dispatchEvent(new Event('loadedmetadata')); });
    expect(screen.getByText('Connecting…')).toBeInTheDocument();
    expect(container.querySelector('[data-video-player]')).toHaveAttribute('data-source', 'stream');
  });
});
