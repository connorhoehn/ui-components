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

  describe('chapters and markers (G154-1, 2.520.0)', () => {
    const chapters = [
      { start: 0, title: 'Walks in', id: 'a' },
      { start: 6, title: 'Stops at the puddle', id: 'b' },
      { start: 9, title: 'Waves', id: 'c' },
    ];
    it('draws the chapters as a list and jumps to one when pressed', () => {
      const { container } = render(<VideoPlayer src="clip.mp4" chapters={chapters} />);
      const video = getVideo(container);
      Object.defineProperty(video, 'readyState', { value: 4, configurable: true });
      const list = screen.getByRole('list', { name: 'Chapters' });
      expect(list.querySelectorAll('button')).toHaveLength(3);
      expect(screen.getByText('0:06')).toBeInTheDocument();
      act(() => { screen.getByText('Stops at the puddle').click(); });
      expect(video.currentTime).toBe(6);
      expect(container.querySelector('[data-video-chapter="b"]')?.getAttribute('aria-current')).toBe('true');
    });
    it('marks findings on a track and jumps to them', () => {
      const onChapterChange = vi.fn();
      const { container } = render(
        <VideoPlayer src="clip.mp4" chapters={chapters} markers={[{ at: 9, label: 'Nobody moves', id: 'f1', tone: 'danger' }]} onChapterChange={onChapterChange} />,
      );
      const video = getVideo(container);
      Object.defineProperty(video, 'readyState', { value: 4, configurable: true });
      expect(container.querySelector('[data-video-marker-tick="f1"]')).not.toBeNull();
      act(() => { screen.getByText('Nobody moves').click(); });
      expect(video.currentTime).toBe(9);
      expect(onChapterChange).toHaveBeenLastCalledWith(chapters[2], 2);
    });
    it('seeks when seekTo changes', () => {
      const { container, rerender } = render(<VideoPlayer src="clip.mp4" chapters={chapters} />);
      const video = getVideo(container);
      Object.defineProperty(video, 'readyState', { value: 4, configurable: true });
      rerender(<VideoPlayer src="clip.mp4" chapters={chapters} seekTo={{ seconds: 6 }} />);
      expect(video.currentTime).toBe(6);
    });
    it('keeps the plain player unwrapped without chapters or markers', () => {
      const { container } = render(<VideoPlayer src="clip.mp4" className="x" />);
      expect(container.querySelector('[data-video-timed]')).toBeNull();
      expect((container.firstChild as HTMLElement).className).toContain('x');
    });
  });
});
