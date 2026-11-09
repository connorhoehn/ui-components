import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FrameStrip } from '../FrameStrip';

const frames = Array.from({ length: 20 }, (_, i) => ({ src: `/f${i + 1}.png` }));
const strip = (c: HTMLElement) => c.querySelector('[data-ui-frame-strip]') as HTMLElement;
const current = (c: HTMLElement) => c.querySelector('[data-frame-strip-current]') as HTMLImageElement;

afterEach(() => vi.useRealTimers());

describe('FrameStrip', () => {
  it('shows the current frame, the counter and a thumbnail row that scrolls inside the strip', () => {
    const { container } = render(<FrameStrip frames={frames} defaultIndex={6} />);
    expect(screen.getByRole('region', { name: 'Frames' })).toBe(strip(container));
    expect(current(container)).toHaveAttribute('src', '/f7.png');
    expect(screen.getByText('Frame 7 of 20')).toBeInTheDocument();
    expect(strip(container)).toHaveAttribute('data-frame-strip-index', '6');
    const thumbs = screen.getAllByRole('button', { name: /^Frame \d+$/ });
    expect(thumbs).toHaveLength(20);
    expect(thumbs[6]).toHaveAttribute('aria-current', 'true');
    expect(thumbs[0]).not.toHaveAttribute('aria-current');
    expect(container.querySelector('[data-frame-strip-thumbnails]')).toHaveClass('min-w-0', 'overflow-x-auto');
    expect(current(container).closest('[data-frame-strip-frame]')).toHaveClass('aspect-square');
  });

  it('scrubs with the slider (1..N)', () => {
    const onIndexChange = vi.fn();
    const { container } = render(<FrameStrip frames={frames} onIndexChange={onIndexChange} />);
    const slider = screen.getByRole('slider', { name: 'Frame' });
    expect(slider).toHaveAttribute('min', '1');
    expect(slider).toHaveAttribute('max', '20');
    fireEvent.change(slider, { target: { value: '12' } });
    expect(onIndexChange).toHaveBeenLastCalledWith(11);
    expect(current(container)).toHaveAttribute('src', '/f12.png');
    expect(screen.getByText('Frame 12 of 20')).toBeInTheDocument();
  });

  it('steps with the arrow keys and jumps with Home/End on the strip', () => {
    const { container } = render(<FrameStrip frames={frames} />);
    const s = strip(container);
    fireEvent.keyDown(s, { key: 'ArrowRight' });
    fireEvent.keyDown(s, { key: 'ArrowRight' });
    expect(s).toHaveAttribute('data-frame-strip-index', '2');
    fireEvent.keyDown(s, { key: 'ArrowLeft' });
    expect(s).toHaveAttribute('data-frame-strip-index', '1');
    fireEvent.keyDown(s, { key: 'End' });
    expect(s).toHaveAttribute('data-frame-strip-index', '19');
    fireEvent.keyDown(s, { key: 'ArrowRight' });
    expect(s).toHaveAttribute('data-frame-strip-index', '19');
    fireEvent.keyDown(s, { key: 'Home' });
    expect(s).toHaveAttribute('data-frame-strip-index', '0');
    // The scrubber's own arrows are native; the strip does not add a second step.
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
    expect(s).toHaveAttribute('data-frame-strip-index', '0');
  });

  it('Play advances at fps on a timer and loops; Space toggles', () => {
    vi.useFakeTimers();
    const { container } = render(<FrameStrip frames={frames.slice(0, 3)} fps={10} />);
    const s = strip(container);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(s).toHaveAttribute('data-frame-strip-playing', 'true');
    act(() => { vi.advanceTimersByTime(100); });
    expect(s).toHaveAttribute('data-frame-strip-index', '1');
    act(() => { vi.advanceTimersByTime(200); });
    expect(s).toHaveAttribute('data-frame-strip-index', '0');
    fireEvent.keyDown(s, { key: ' ' });
    expect(s).toHaveAttribute('data-frame-strip-playing', 'false');
    act(() => { vi.advanceTimersByTime(500); });
    expect(s).toHaveAttribute('data-frame-strip-index', '0');
    fireEvent.keyDown(s, { key: ' ' });
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  });

  it('without loop, playback stops on the last frame', () => {
    vi.useFakeTimers();
    const { container } = render(<FrameStrip frames={frames.slice(0, 3)} fps={10} loop={false} autoPlay />);
    const s = strip(container);
    act(() => { vi.advanceTimersByTime(1000); });
    expect(s).toHaveAttribute('data-frame-strip-index', '2');
    expect(s).toHaveAttribute('data-frame-strip-playing', 'false');
  });

  it('autoPlay never starts under prefers-reduced-motion', () => {
    vi.useFakeTimers();
    const original = window.matchMedia;
    window.matchMedia = ((q: string) => ({ matches: q.includes('reduce'), media: q, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
    try {
      const { container } = render(<FrameStrip frames={frames} autoPlay />);
      act(() => { vi.advanceTimersByTime(1000); });
      expect(strip(container)).toHaveAttribute('data-frame-strip-playing', 'false');
      expect(strip(container)).toHaveAttribute('data-frame-strip-index', '0');
    } finally {
      window.matchMedia = original;
    }
  });

  it('the contact sheet switch swaps the player for the sheet image', () => {
    const { container } = render(<FrameStrip frames={frames} contactSheet={{ src: '/sheet.png' }} />);
    const group = screen.getByRole('radiogroup', { name: 'View' });
    fireEvent.click(screen.getByRole('radio', { name: 'Contact sheet' }));
    expect(group).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Contact sheet' })).toHaveAttribute('src', '/sheet.png');
    expect(current(container)).toBeNull();
    expect(strip(container)).toHaveAttribute('data-frame-strip-view', 'sheet');
    fireEvent.click(screen.getByRole('radio', { name: 'Frames' }));
    expect(current(container)).toHaveAttribute('src', '/f1.png');
  });

  it('a thumbnail click jumps to that frame; a controlled index wins', () => {
    const onIndexChange = vi.fn();
    const { container } = render(<FrameStrip frames={frames} index={4} onIndexChange={onIndexChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Frame 10' }));
    expect(onIndexChange).toHaveBeenCalledWith(9);
    expect(strip(container)).toHaveAttribute('data-frame-strip-index', '4');
  });
});
