// src/components/shared/FrameStrip.tsx
//
// A scrubbable image sequence — "20 frames of it moving". The current frame
// large in one aspect frame (the same classes as ImageCompare), then Play /
// Pause, a Slider scrubber (1..N) and "Frame 7 of 20", then a row of frame
// thumbnails that scrolls sideways inside the strip (it never widens its
// container) and preloads every frame. With a `contactSheet`, a
// "Frames | Contact sheet" switch swaps the player for the one-image grid.
//
// Keyboard on the strip: Left/Right step a frame, Home/End jump to the ends,
// Space plays or pauses. The scrubber keeps its own arrow keys (a native
// range input), so a key is never applied twice.
//
// Motion: `autoPlay` never starts under prefers-reduced-motion; Play still
// works when the reader asks for it.

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Slider } from '../forms/Slider';
import { IconButton } from '../ui/IconButton';
import { PauseIcon, PlayIcon } from '../video/MediaIcons';
import { SegmentedControl } from './SegmentedControl';

export interface FrameStripFrame {
  src: string;
  label?: string;
  alt?: string;
}

export type FrameStripAspect = 'square' | 'landscape' | 'portrait' | 'wide';

export interface FrameStripProps {
  frames: readonly FrameStripFrame[];
  /** Accessible name of the strip. Default "Frames". */
  label?: string;
  /** Playback rate. Default 12. */
  fps?: number;
  /** Controlled frame index (0-based). */
  index?: number;
  /** Initial frame when uncontrolled. Default 0. */
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Start playing on mount. Default false; never under prefers-reduced-motion. */
  autoPlay?: boolean;
  /** Wrap from the last frame to the first while playing. Default true. */
  loop?: boolean;
  /** One image of every frame; adds a "Frames | Contact sheet" switch. */
  contactSheet?: { src: string; label?: string; alt?: string };
  /**
   * Accessible name of that switch. Default "<label>: frames or <sheet label>"
   * (e.g. "Motion: frames or contact sheet"), so it never collides with
   * another "View" group on the same page. Since 2.520.0 (G150-6; was "View").
   */
  switchLabel?: string;
  /** The frame's aspect — same classes as ImageCompare. Default `square`. */
  aspect?: FrameStripAspect;
  /** A scrolling row of frame buttons under the player. Default true. */
  thumbnails?: boolean;
  className?: string;
  'data-testid'?: string;
}

const ASPECT: Record<FrameStripAspect, string> = {
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-video',
};

const clamp = (i: number, n: number) => Math.min(Math.max(0, Math.round(i)), Math.max(0, n - 1));

export function FrameStrip({
  frames,
  label = 'Frames',
  fps = 12,
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  autoPlay = false,
  loop = true,
  contactSheet,
  switchLabel,
  aspect = 'square',
  thumbnails = true,
  className,
  'data-testid': testId,
}: FrameStripProps) {
  const n = frames.length;
  const reducedMotion = usePrefersReducedMotion();
  const [indexState, setIndexState] = useState(() => clamp(defaultIndex, n));
  const index = clamp(indexProp ?? indexState, n);
  const [playing, setPlaying] = useState(() => autoPlay && !reducedMotion && n > 1);
  const [view, setView] = useState<'frames' | 'sheet'>('frames');
  const rowRef = useRef<HTMLOListElement>(null);

  // Read inside the timer, so the interval is not torn down every frame.
  const live = useRef({ index, onIndexChange, controlled: indexProp !== undefined, loop, n });
  live.current = { index, onIndexChange, controlled: indexProp !== undefined, loop, n };

  const go = (next: number) => {
    const i = clamp(next, n);
    if (indexProp === undefined) setIndexState(i);
    if (i !== index) onIndexChange?.(i);
  };

  // A reduced-motion preference that arrives after mount still stops autoplay.
  useEffect(() => {
    if (reducedMotion && autoPlay) setPlaying(false);
  }, [reducedMotion, autoPlay]);

  useEffect(() => {
    if (!playing || n < 2 || view !== 'frames') return;
    const ms = 1000 / Math.max(1, fps);
    const id = setInterval(() => {
      const s = live.current;
      let next = s.index + 1;
      if (next >= s.n) {
        if (!s.loop) { setPlaying(false); return; }
        next = 0;
      }
      if (!s.controlled) setIndexState(next);
      // Advance the ref too, so a controlled parent that is slow to re-render
      // does not make the next tick repeat this frame.
      s.index = next;
      s.onIndexChange?.(next);
    }, ms);
    return () => clearInterval(id);
  }, [playing, fps, n, view]);

  // Keep the current thumbnail in view without scrolling the page.
  useEffect(() => {
    const scroller = rowRef.current?.parentElement;
    const thumb = rowRef.current?.children[index] as HTMLElement | undefined;
    if (!scroller || !thumb) return;
    const box = scroller.getBoundingClientRect();
    const t = thumb.getBoundingClientRect();
    if (t.left < box.left) scroller.scrollLeft -= box.left - t.left;
    else if (t.right > box.right) scroller.scrollLeft += t.right - box.right;
  }, [index]);

  // Without thumbnails nothing else fetches the frames ahead of playback.
  useEffect(() => {
    if (thumbnails || typeof Image === 'undefined') return;
    for (const f of frames) { const img = new Image(); img.src = f.src; }
  }, [frames, thumbnails]);

  const togglePlay = () => {
    if (!playing && !loop && index >= n - 1) go(0);
    setPlaying((p) => !p && n > 1);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (view !== 'frames') return;
    const target = event.target as HTMLElement;
    const inRange = target instanceof HTMLInputElement && target.type === 'range';
    const inRadio = target.getAttribute('role') === 'radio';
    const key = event.key;
    if (key === ' ' || key === 'Spacebar') {
      // A focused button's own Space is its click; don't also toggle.
      if (target.tagName === 'BUTTON' || inRadio) return;
      event.preventDefault();
      togglePlay();
      return;
    }
    if (inRange || inRadio) return; // native range / radiogroup keys
    let next: number | null = null;
    if (key === 'ArrowRight' || key === 'ArrowDown') next = index + 1;
    else if (key === 'ArrowLeft' || key === 'ArrowUp') next = index - 1;
    else if (key === 'Home') next = 0;
    else if (key === 'End') next = n - 1;
    if (next === null) return;
    event.preventDefault();
    setPlaying(false);
    go(next);
  };

  if (n === 0) return null;
  const current = frames[index]!;
  const frameClass = cn('relative block w-full overflow-hidden rounded-lg border border-border bg-surface-inset', ASPECT[aspect]);

  return (
    <section
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      data-ui-frame-strip=""
      data-frame-strip-index={index}
      data-frame-strip-playing={playing ? 'true' : 'false'}
      data-frame-strip-view={view}
      data-testid={testId}
      className={cn('flex min-w-0 flex-col gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className)}
    >
      {contactSheet && (
        <SegmentedControl
          size="sm"
          aria-label={switchLabel ?? `${label}: frames or ${(contactSheet.label ?? 'Contact sheet').toLowerCase()}`}
          value={view}
          onChange={(v) => { setView(v as 'frames' | 'sheet'); setPlaying(false); }}
          options={[{ value: 'frames', label: 'Frames' }, { value: 'sheet', label: contactSheet.label ?? 'Contact sheet' }]}
          data-testid={testId ? `${testId}-view` : undefined}
        />
      )}

      {view === 'sheet' && contactSheet ? (
        <span className={frameClass} data-frame-strip-sheet>
          <img src={contactSheet.src} alt={contactSheet.alt ?? contactSheet.label ?? 'Contact sheet'} draggable={false} className="block h-full w-full object-contain" />
        </span>
      ) : (
        <>
          <span className={frameClass} data-frame-strip-frame>
            <img
              src={current.src}
              alt={current.alt ?? current.label ?? `Frame ${index + 1} of ${n}`}
              draggable={false}
              data-frame-strip-current
              className="block h-full w-full object-contain"
            />
          </span>

          <div className="flex min-w-0 items-center gap-2">
            <IconButton
              size="sm"
              variant="ghost"
              aria-label={playing ? 'Pause' : 'Play'}
              disabled={n < 2}
              onClick={togglePlay}
              data-frame-strip-play
            >
              {playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
            </IconButton>
            <Slider
              className="min-w-0 flex-1"
              min={1}
              max={n}
              step={1}
              value={index + 1}
              readout={false}
              aria-label="Frame"
              disabled={n < 2}
              onChange={(v) => { setPlaying(false); go(v - 1); }}
              data-testid={testId ? `${testId}-scrubber` : undefined}
            />
            <span data-frame-strip-counter className="shrink-0 text-xs tabular-nums text-text-secondary">
              Frame {index + 1} of {n}
            </span>
          </div>

          {thumbnails && (
            <div className="min-w-0 overflow-x-auto" data-frame-strip-thumbnails>
              <ol ref={rowRef} aria-label={`${label}: thumbnails`} className="m-0 flex w-max list-none gap-1.5 p-0 pb-1">
                {frames.map((f, i) => (
                  <li key={`${i}-${f.src}`} className="shrink-0">
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label={f.label ?? `Frame ${i + 1}`}
                      aria-current={i === index ? 'true' : undefined}
                      onClick={() => { setPlaying(false); go(i); }}
                      className={cn(
                        'block size-12 cursor-pointer overflow-hidden rounded-md border-2 bg-surface-inset p-0',
                        i === index ? 'border-primary' : 'border-transparent hover:border-border',
                      )}
                    >
                      <img src={f.src} alt="" draggable={false} className="block h-full w-full object-cover" />
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default FrameStrip;
