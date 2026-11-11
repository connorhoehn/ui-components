import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { AudioPlayer } from '../AudioPlayer';
import { MediaPlaybackDock, useMediaPlayback, type MediaPlaybackHandle, type PlaybackSource } from '../MediaPlaybackDock';
import { createRef } from 'react';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

const takeA: PlaybackSource = { id: 'a', src: '/a.wav', kind: 'audio', title: 'Take A' };
const takeB: PlaybackSource = { id: 'b', src: '/b.wav', kind: 'audio', title: 'Take B' };

describe('AudioPlayer controller (G152-1)', () => {
  it('owns no <audio>, draws the controller state and hands presses back', () => {
    const onToggle = vi.fn();
    const onSeek = vi.fn();
    const onFirstPlay = vi.fn();
    const { rerender } = render(
      <AudioPlayer controller={{ playing: false, time: 0, onToggle, onSeek }} durationHint={9} onFirstPlay={onFirstPlay} />,
    );
    expect(screen.queryByTestId('audio-player-element')).toBeNull();
    expect(document.querySelector('audio')).toBeNull();
    expect(screen.getByTestId('audio-player-duration')).toHaveTextContent('0:09');
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(onToggle).toHaveBeenCalledOnce();
    fireEvent.change(screen.getByRole('slider', { name: 'Seek' }), { target: { value: '4' } });
    expect(onSeek).toHaveBeenCalledWith(4);
    expect(onFirstPlay).not.toHaveBeenCalled();
    rerender(<AudioPlayer controller={{ playing: true, time: 3, duration: 12, onToggle, onSeek }} durationHint={9} onFirstPlay={onFirstPlay} />);
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    expect(screen.getByTestId('audio-player-time')).toHaveTextContent('0:03');
    expect(screen.getByTestId('audio-player-duration')).toHaveTextContent('0:12');
    expect(onFirstPlay).toHaveBeenCalledOnce();
    rerender(<AudioPlayer controller={{ playing: false, time: 3, duration: 12, onToggle, onSeek }} onFirstPlay={onFirstPlay} />);
    rerender(<AudioPlayer controller={{ playing: true, time: 4, duration: 12, onToggle, onSeek }} onFirstPlay={onFirstPlay} />);
    expect(onFirstPlay).toHaveBeenCalledOnce();
  });

  it('without a controller keeps its own element (unchanged)', () => {
    render(<AudioPlayer src="/a.wav" />);
    expect(screen.getByTestId('audio-player-element').tagName).toBe('AUDIO');
  });
});

describe('MediaPlaybackDock state and handle (G152-1)', () => {
  it('reports its state and is driven through controlRef', () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    const onStateChange = vi.fn();
    const controlRef = createRef<MediaPlaybackHandle | null>();
    const { rerender } = render(<MediaPlaybackDock source={takeA} onStateChange={onStateChange} controlRef={controlRef} />);
    expect(onStateChange).toHaveBeenLastCalledWith({ sourceId: 'a', playing: false, time: 0, duration: 0 });
    const el = screen.getByTestId('playback-element') as HTMLAudioElement;
    act(() => { controlRef.current!.play(); });
    expect(play).toHaveBeenCalledOnce();
    fireEvent.play(el);
    Object.defineProperty(el, 'duration', { value: 10 }); fireEvent.durationChange(el);
    act(() => { controlRef.current!.seek(6); });
    expect(el.currentTime).toBe(6);
    expect(onStateChange).toHaveBeenLastCalledWith({ sourceId: 'a', playing: true, time: 6, duration: 10 });
    rerender(<MediaPlaybackDock source={null} onStateChange={onStateChange} controlRef={controlRef} />);
    expect(onStateChange).toHaveBeenLastCalledWith({ sourceId: null, playing: false, time: 0, duration: 0 });
  });
});

describe('useMediaPlayback: rows follow the one dock (G152-1)', () => {
  function Page() {
    const playback = useMediaPlayback();
    return (
      <>
        {[takeA, takeB].map((take) => (
          <AudioPlayer key={take.id} controller={playback.controllerFor(take)} durationHint={5} data-testid={`row-${take.id}`} />
        ))}
        <MediaPlaybackDock {...playback.dockProps} />
      </>
    );
  }

  it('a row Play loads that take into the dock and plays it; the row follows the dock', () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    render(<Page />);
    expect(screen.queryByTestId('playback-element')).toBeNull();
    fireEvent.click(within(screen.getByTestId('row-b')).getByRole('button', { name: 'Play' }));
    const el = screen.getByTestId('playback-element') as HTMLAudioElement;
    expect(el.getAttribute('src')).toBe('/b.wav');
    expect(el.autoplay).toBe(true);
    // One media element on the page: the rows own none.
    expect(document.querySelectorAll('audio')).toHaveLength(1);
    fireEvent.play(el);
    expect(within(screen.getByTestId('row-b')).getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    expect(within(screen.getByTestId('row-a')).getByRole('button', { name: 'Play' })).toBeInTheDocument();
    Object.defineProperty(el, 'duration', { value: 8 }); fireEvent.durationChange(el);
    fireEvent.change(within(screen.getByTestId('row-b')).getByRole('slider', { name: 'Seek' }), { target: { value: '2' } });
    expect(el.currentTime).toBe(2);
    expect(screen.getByTestId('row-b-duration')).toHaveTextContent('0:08');
    // The dock's own Pause is the same playback.
    fireEvent.click(within(screen.getByTestId('playback-controls')).getByRole('button', { name: 'Pause' }));
    fireEvent.pause(el);
    expect(within(screen.getByTestId('row-b')).getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(play).toHaveBeenCalled();
  });

  it('closing the dock returns every row to rest', () => {
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    render(<Page />);
    fireEvent.click(within(screen.getByTestId('row-a')).getByRole('button', { name: 'Play' }));
    fireEvent.play(screen.getByTestId('playback-element'));
    fireEvent.click(screen.getByRole('button', { name: 'Close player' }));
    expect(screen.queryByTestId('playback-element')).toBeNull();
    expect(within(screen.getByTestId('row-a')).getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });
});

describe('MediaPlaybackDock at phone width (G152-2)', () => {
  it('puts Close on the title line under the row container\'s 42rem and the controls after it', () => {
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    render(<MediaPlaybackDock source={takeA} onClose={() => {}} status={<span>Live</span>} />);
    const row = screen.getByTestId('playback-controls');
    expect(row.className).toContain('@container');
    const title = row.querySelector('[data-playback-title]') as HTMLElement;
    const close = screen.getByRole('button', { name: 'Close player' });
    // Title then Close share the first line: the title's basis leaves exactly Close and the gap.
    expect(title.className).toContain('@max-2xl:basis-[calc(100%-var(--ui-control-sm,1.75rem)-0.75rem)]');
    expect(close.className).toContain('@max-2xl:order-1');
    // Every other group is ordered after Close.
    const others = Array.from(row.children).filter((c) => c !== title && c !== close && c.tagName !== 'AUDIO');
    expect(others.length).toBeGreaterThanOrEqual(4);
    for (const other of others) expect(other.className).toContain('@max-2xl:order-2');
  });
  it('without onClose the title keeps its plain basis', () => {
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    render(<MediaPlaybackDock source={takeA} />);
    const title = screen.getByTestId('playback-controls').querySelector('[data-playback-title]') as HTMLElement;
    expect(title.className).not.toContain('@max-2xl:basis');
  });
});
