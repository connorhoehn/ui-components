import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MediaPlaybackDock, type PlaybackSource } from '../MediaPlaybackDock';

const source: PlaybackSource = { id: 'one', src: '/one.wav', kind: 'audio', title: 'First take' };
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe('MediaPlaybackDock', () => {
  it('keeps the idle footer useful without creating a media sink', () => {
    render(<MediaPlaybackDock status={<span>Connected</span>} />);
    expect(screen.getByText('Connected')).toBeVisible();
    expect(screen.queryByTestId('playback-element')).toBeNull();
  });
  it('plays, seeks, changes volume, ends and closes using shared controls', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    const close = vi.fn();
    render(<MediaPlaybackDock source={source} onClose={close} />);
    const el = screen.getByTestId('playback-element') as HTMLAudioElement;
    expect(screen.getByRole('slider', { name: 'Seek media' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(play).toHaveBeenCalledOnce();
    fireEvent.play(el);
    expect(screen.getByRole('button', { name: 'Pause' })).toBeVisible();
    Object.defineProperty(el, 'duration', { value: 12 }); fireEvent.durationChange(el);
    fireEvent.change(screen.getByRole('slider', { name: 'Seek media' }), { target: { value: '5' } });
    expect(el.currentTime).toBe(5);
    fireEvent.change(screen.getByRole('slider', { name: 'Volume' }), { target: { value: '0.5' } });
    expect(el.volume).toBe(0.5);
    fireEvent.click(screen.getByRole('button', { name: 'Mute' })); expect(el.muted).toBe(true);
    fireEvent.ended(el); expect(screen.getByRole('button', { name: 'Play' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Close player' })); expect(close).toHaveBeenCalledOnce();
    await waitFor(() => expect(play).toHaveBeenCalledOnce());
  });
  it('replaces the decoder and resets progress on source changes, and stops on removal', () => {
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    const { rerender } = render(<MediaPlaybackDock source={source} />);
    const old = screen.getByTestId('playback-element'); fireEvent.play(old);
    pause.mockClear();
    rerender(<MediaPlaybackDock source={{ ...source, id: 'two', src: '/two.wav' }} />);
    expect(screen.getByTestId('playback-element')).not.toBe(old);
    expect(screen.getByRole('button', { name: 'Play' })).toBeVisible();
    expect(pause.mock.contexts.filter(element => element === old)).toHaveLength(1);
    const next = screen.getByTestId('playback-element'); pause.mockClear();
    rerender(<MediaPlaybackDock source={null} />); expect(pause.mock.contexts).toContain(next);
  });
  it('reports load errors and rejected playback without showing a false playing state', async () => {
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockRejectedValue(new Error('blocked'));
    render(<MediaPlaybackDock source={source} />);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('could not start'));
    fireEvent.error(screen.getByTestId('playback-element'));
    expect(screen.getByRole('alert')).toHaveTextContent('could not be loaded');
  });
  it('collapses video without creating a second sink and exposes queue callbacks', () => {
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    const previous = vi.fn(), next = vi.fn();
    render(<MediaPlaybackDock source={{ ...source, kind: 'video' }} onPrevious={previous} onNext={next} />);
    fireEvent.click(screen.getByRole('button', { name: 'Hide video' }));
    expect(screen.getByTestId('playback-element')).not.toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Show video' }));
    expect(screen.getAllByTestId('playback-element')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Previous media' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next media' }));
    expect(previous).toHaveBeenCalledOnce(); expect(next).toHaveBeenCalledOnce();
  });
});
