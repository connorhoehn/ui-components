// AudioPlayer — a voice message with the library's controls, not the browser's.
//
// `<audio controls>` is a different widget in every browser and none of them
// take the theme: a grey Chrome bar in a dark call surface, a Safari pill in a
// table row. This owns the element and draws play/pause, a scrubber and the
// time in tokens. The element itself is hidden — it is the decoder, not the UI.
//
// With `controller` (since 2.520.0, G152-1) it owns no element: it draws the
// state of a shared player (a `MediaPlaybackDock`, through
// `useMediaPlayback().controllerFor(source)`) and hands presses back to it, so
// a row's scrubber and the footer bar are one playback, not two.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Slider } from '../forms/Slider';
import { CircularIconToggle } from './CircularIconToggle';
import { PauseIcon, PlayIcon } from './MediaIcons';

/** The shared player an `AudioPlayer` follows instead of owning an `<audio>`. */
export interface AudioPlayerController {
  /** This row's source is the one playing. */
  playing: boolean;
  /** Where the shared player is in this source (0 when it holds another). */
  time: number;
  /** The source's length once known; `durationHint` until then. */
  duration?: number;
  /** Play or pause (a row that is not the current source starts it). */
  onToggle: () => void;
  onSeek: (seconds: number) => void;
}

export interface AudioPlayerProps {
  /** The file to play. Not used with `controller`. */
  src?: string;
  /**
   * Follow a shared player instead of owning one (G152-1): no `<audio>` is
   * rendered; play, pause and seek go to `controller`, and the time, length
   * and playing state come from it. `autoPlay` and `onEnded` belong to the
   * shared player then; `onFirstPlay` still fires the first time `playing`
   * turns true. Since 2.520.0.
   */
  controller?: AudioPlayerController;
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

export function AudioPlayer(props: AudioPlayerProps) {
  return props.controller ? <ControlledAudioPlayer {...props} controller={props.controller} /> : <OwnAudioPlayer {...props} />;
}

function PlayerRow({ playing, time, duration, onToggle, onSeek, size = 'md', className, testId, children }: {
  playing: boolean;
  time: number;
  duration: number;
  onToggle: () => void;
  onSeek: (seconds: number) => void;
  size?: 'sm' | 'md';
  className?: string;
  testId: string;
  children?: ReactNode;
}) {
  const max = duration > 0 ? duration : Math.max(time, 1);
  return (
    <div className={cn('flex min-w-0 items-center gap-2', size === 'sm' ? 'text-xs' : 'text-sm', className)} data-testid={testId} data-playing={playing}>
      {children}
      <CircularIconToggle
        on={playing}
        offTone="neutral"
        size={size === 'sm' ? 'sm' : 'md'}
        aria-label={playing ? 'Pause' : 'Play'}
        iconOn={<PauseIcon size={size === 'sm' ? 14 : 18} />}
        iconOff={<PlayIcon size={size === 'sm' ? 14 : 18} />}
        onClick={onToggle}
        data-testid={`${testId}-toggle`}
      />
      <span className="w-9 shrink-0 text-right font-mono tabular-nums text-text-secondary" data-testid={`${testId}-time`}>{formatAudioTime(time)}</span>
      <Slider
        aria-label="Seek"
        min={0}
        max={max}
        step={0.1}
        value={Math.min(time, max)}
        onChange={onSeek}
        className="min-w-[96px] flex-1"
        data-testid={`${testId}-scrubber`}
      />
      <span className="w-9 shrink-0 font-mono tabular-nums text-text-tertiary" data-testid={`${testId}-duration`}>{formatAudioTime(duration)}</span>
    </div>
  );
}

function ControlledAudioPlayer({ controller, durationHint, onFirstPlay, size, className, 'data-testid': testId = 'audio-player' }: AudioPlayerProps & { controller: AudioPlayerController }) {
  const playedRef = useRef(false);
  useEffect(() => {
    if (controller.playing && !playedRef.current) { playedRef.current = true; onFirstPlay?.(); }
  }, [controller.playing, onFirstPlay]);
  const duration = controller.duration && controller.duration > 0 ? controller.duration : durationHint ?? 0;
  return (
    <PlayerRow
      playing={controller.playing}
      time={controller.time}
      duration={duration}
      onToggle={controller.onToggle}
      onSeek={controller.onSeek}
      size={size}
      className={className}
      testId={testId}
    />
  );
}

function OwnAudioPlayer({ src, autoPlay = false, onFirstPlay, onEnded, durationHint, size = 'md', className, 'data-testid': testId = 'audio-player' }: AudioPlayerProps) {
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

  return (
    <PlayerRow playing={playing} time={time} duration={duration} onToggle={toggle} onSeek={seek} size={size} className={className} testId={testId}>
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
    </PlayerRow>
  );
}

export default AudioPlayer;
