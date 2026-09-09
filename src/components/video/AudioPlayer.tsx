// AudioPlayer — a voice message with the library's controls, not the browser's.
//
// `<audio controls>` is a different widget in every browser and none of them
// take the theme: a grey Chrome bar in a dark call surface, a Safari pill in a
// table row. This owns the element and draws play/pause, a scrubber and the
// time in tokens. The element itself is hidden — it is the decoder, not the UI.

import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { Slider } from '../forms/Slider';
import { CircularIconToggle } from './CircularIconToggle';
import { PauseIcon, PlayIcon } from './MediaIcons';

export interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  /** Fires once, the first time playback starts — "mark as listened". */
  onFirstPlay?: () => void;
  onEnded?: () => void;
  /** Length to show before metadata arrives, in seconds. */
  durationHint?: number;
  /** `sm` fits a table row. */
  size?: 'sm' | 'md';
  className?: string;
  'data-testid'?: string;
}

export function formatAudioTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function AudioPlayer({ src, autoPlay = false, onFirstPlay, onEnded, durationHint, size = 'md', className, 'data-testid': testId = 'audio-player' }: AudioPlayerProps) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState<number>(durationHint ?? 0);
  const playedRef = useRef(false);

  // A new source is a new message: start over.
  useEffect(() => { setPlaying(false); setTime(0); setDuration(durationHint ?? 0); playedRef.current = false; }, [src, durationHint]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    // Our own flag, not `el.paused`: the events below keep it honest and it
    // does not depend on the element having settled.
    if (playing) el.pause();
    else void el.play().catch(() => setPlaying(false));
  };

  const seek = (next: number) => {
    const el = ref.current;
    if (!el) return;
    el.currentTime = next;
    setTime(next);
  };

  const max = duration > 0 ? duration : Math.max(time, 1);
  return (
    <div className={cn('flex min-w-0 items-center gap-2', size === 'sm' ? 'text-xs' : 'text-sm', className)} data-testid={testId} data-playing={playing}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- a voice message has no caption track */}
      <audio
        ref={ref}
        src={src}
        autoPlay={autoPlay}
        preload="metadata"
        className="hidden"
        onPlay={() => { setPlaying(true); if (!playedRef.current) { playedRef.current = true; onFirstPlay?.(); } }}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); onEnded?.(); }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => { const d = e.currentTarget.duration; if (Number.isFinite(d) && d > 0) setDuration(d); }}
        onDurationChange={(e) => { const d = e.currentTarget.duration; if (Number.isFinite(d) && d > 0) setDuration(d); }}
        data-testid={`${testId}-element`}
      />
      <CircularIconToggle
        on={playing}
        offTone="neutral"
        size={size === 'sm' ? 'sm' : 'md'}
        aria-label={playing ? 'Pause' : 'Play'}
        iconOn={<PauseIcon size={size === 'sm' ? 14 : 18} />}
        iconOff={<PlayIcon size={size === 'sm' ? 14 : 18} />}
        onClick={toggle}
        data-testid={`${testId}-toggle`}
      />
      <span className="w-9 shrink-0 text-right font-mono tabular-nums text-text-secondary" data-testid={`${testId}-time`}>{formatAudioTime(time)}</span>
      <Slider
        aria-label="Seek"
        min={0}
        max={max}
        step={0.1}
        value={Math.min(time, max)}
        onChange={seek}
        className="min-w-[96px] flex-1"
        data-testid={`${testId}-scrubber`}
      />
      <span className="w-9 shrink-0 font-mono tabular-nums text-text-tertiary" data-testid={`${testId}-duration`}>{formatAudioTime(duration)}</span>
    </div>
  );
}

export default AudioPlayer;
