import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react';
import { cn } from '../../lib/cn';
import { Stack, Inline } from '../ui/Stack';
import { IconButton } from '../ui/IconButton';
import { Button } from '../ui/Button';
import { ChevronIcon, CloseIcon } from '../ui/Icons';
import { Slider } from '../forms/Slider';
import { Select } from '../forms/Select';
import { PlayIcon, PauseIcon, SpeakerIcon } from './MediaIcons';
import { formatAudioTime, type AudioPlayerController } from './AudioPlayer';

export interface PlaybackSource {
  /** Stable identity, including a revision when the bytes change. */
  id: string;
  src: string;
  kind: 'audio' | 'video';
  title: string;
  subtitle?: string;
}
export interface MediaPlaybackDockProps {
  source?: PlaybackSource | null;
  /** Enable only after the user explicitly chooses Play. */
  autoPlay?: boolean;
  onClose?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  /** Connection/freshness context. Kept separate from playback announcements. */
  status?: ReactNode;
  emptyLabel?: string;
  /**
   * The playback as it changes: which source, playing or not, where and how
   * long (G152-1). With `controlRef`, what lets other views follow and drive
   * the one player; `useMediaPlayback` wires both. Since 2.520.0.
   */
  onStateChange?: (state: MediaPlaybackState) => void;
  /** Filled with play, pause, toggle and seek for the current source. Since 2.520.0. */
  controlRef?: RefObject<MediaPlaybackHandle | null>;
  className?: string;
  'data-testid'?: string;
}

/** What the dock is doing, reported through `onStateChange`. */
export interface MediaPlaybackState {
  /** The current source's id, or null with nothing loaded. */
  sourceId: string | null;
  playing: boolean;
  /** Seconds into the current source. */
  time: number;
  /** The current source's length in seconds, 0 until known. */
  duration: number;
}

/** The dock's transport, for other views to drive it (`controlRef`). */
export interface MediaPlaybackHandle {
  play(): void;
  pause(): void;
  toggle(): void;
  seek(seconds: number): void;
}

const IDLE: MediaPlaybackState = { sourceId: null, playing: false, time: 0, duration: 0 };

/** One media sink under the scrolling shell, never a fixed overlay.
 * Source keys discard the old decoder and its events before starting another.
 * Uses the same Stack/Inline footer composition as the huddle shell, with the
 * shared button, icon, form and typography primitives throughout. */
export function MediaPlaybackDock({ source, autoPlay = false, onClose, onPrevious, onNext, status,
  emptyLabel = 'Select audio or video to preview', onStateChange, controlRef, className, 'data-testid': testId = 'media-playback-dock',
}: MediaPlaybackDockProps) {
  const report = useRef(onStateChange);
  report.current = onStateChange;
  useEffect(() => { if (!source) report.current?.(IDLE); }, [source]);
  return <Stack as="footer" gap="none" aria-label="Media player" className={cn('shrink-0 min-w-0 border-t border-border bg-surface', className)} data-testid={testId}>
    {source ? <PlaybackSession key={`${source.id}:${source.kind}:${source.src}`} source={source} autoPlay={autoPlay}
      onClose={onClose} onPrevious={onPrevious} onNext={onNext} status={status} onStateChange={onStateChange} controlRef={controlRef} />
      : <Inline gap="md" align="center" justify="between" className="min-h-11 px-4 py-1">
        <span className="text-xs text-text-secondary">{emptyLabel}</span>{status}
      </Inline>}
  </Stack>;
}

function PlaybackSession({ source, autoPlay, onClose, onPrevious, onNext, status, onStateChange, controlRef }: MediaPlaybackDockProps & { source: PlaybackSource }) {
  const media = useRef<HTMLMediaElement | null>(null);
  const [playing, setPlaying] = useState(false), [time, setTime] = useState(0), [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1), [muted, setMuted] = useState(false), [speed, setSpeed] = useState(1);
  const [error, setError] = useState(''), [expanded, setExpanded] = useState(true);
  useEffect(() => {
    const element = media.current;
    return () => { element?.pause(); };
  }, []);
  const start = () => {
    const el = media.current;
    if (!el) return;
    setError(''); void el.play().catch(() => setError('Playback could not start. Try Play again or check the source.'));
  };
  const play = () => {
    const el = media.current;
    if (!el) return;
    if (!el.paused) el.pause();
    else start();
  };
  const seek = (n: number) => { if (media.current) media.current.currentTime = n; setTime(n); };
  useImperativeHandle(controlRef, () => ({
    play: () => { if (media.current?.paused) start(); },
    pause: () => { media.current?.pause(); },
    toggle: play,
    seek,
  }));
  const report = useRef(onStateChange);
  report.current = onStateChange;
  useEffect(() => { report.current?.({ sourceId: source.id, playing, time, duration }); }, [source.id, playing, time, duration]);
  const mediaProps = {
    src: source.src, autoPlay, preload: 'metadata',
    'aria-label': source.title, 'data-testid': 'playback-element',
    onPlay: () => setPlaying(true), onPause: () => setPlaying(false),
    onEnded: () => setPlaying(false),
    onError: () => { setPlaying(false); setError('This media could not be loaded. Check the source file and supported format.'); },
    onTimeUpdate: (e: React.SyntheticEvent<HTMLMediaElement>) => setTime(e.currentTarget.currentTime),
    onDurationChange: (e: React.SyntheticEvent<HTMLMediaElement>) => {
      const d = e.currentTarget.duration; setDuration(Number.isFinite(d) && d > 0 ? d : 0);
    },
  };
  return <>
    {source.kind === 'video' ? <video {...mediaProps} ref={el => { media.current = el; }} playsInline hidden={!expanded}
      className={cn('w-full max-h-[40dvh] bg-code-bg object-contain', !expanded && 'hidden')} />
      : <audio {...mediaProps} ref={el => { media.current = el; }} className="hidden" />}
    {error && <p role="alert" className="m-0 px-4 py-1 text-xs text-danger-fg">{error}</p>}
    {/* G152-2: the row is its own container. Under 42rem (a phone) the title
        line is the title and Close, and the controls wrap below it; the title
        takes the line less Close's width and the gap, so nothing else fits
        beside them. Wider, one row as before. */}
    <Inline gap="sm" align="center" wrap className="@container min-h-11 min-w-0 px-3 py-1" data-testid="playback-controls">
      <div className={cn('min-w-0 flex-1 basis-40', onClose && NARROW_TITLE)} data-playback-title="" title={source.subtitle ? `${source.title} — ${source.subtitle}` : source.title}>
        <div className="truncate text-sm font-semibold text-text-primary">{source.title}</div>
        {source.subtitle && <div className="truncate text-xs text-text-secondary">{source.subtitle}</div>}
      </div>
      <Inline gap="xs" align="center" wrap={false} className={NARROW_REST}>
        {onPrevious && <IconButton size="sm" aria-label="Previous media" icon={<ChevronIcon dir="left" />} onClick={onPrevious} />}
        <IconButton size="sm" variant="primary" aria-label={playing ? 'Pause' : 'Play'} icon={playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />} onClick={play} />
        {onNext && <IconButton size="sm" aria-label="Next media" icon={<ChevronIcon dir="right" />} onClick={onNext} />}
      </Inline>
      <Inline gap="xs" align="center" wrap={false} className={cn('min-w-40 flex-1 basis-48', NARROW_REST)}>
        <span className="text-xs tabular-nums text-text-secondary">{formatAudioTime(time)}</span>
        <Slider aria-label="Seek media" value={Math.min(time, duration)} min={0} max={duration || 1} step={0.1} readout={false}
          disabled={!duration} className="min-w-0 flex-1" onChange={seek} />
        <span className="text-xs tabular-nums text-text-secondary">{formatAudioTime(duration)}</span>
      </Inline>
      <Inline gap="xs" align="center" wrap={false} className={NARROW_REST}>
        <IconButton size="sm" aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted} icon={<SpeakerIcon size={16} />}
          onClick={() => { if (media.current) media.current.muted = !muted; setMuted(!muted); }} />
        <Slider aria-label="Volume" value={volume} max={1} step={0.05} readout={false} className="w-16"
          onChange={n => { if (media.current) media.current.volume = n; setVolume(n); }} />
        <Select aria-label="Playback speed" value={String(speed)} options={[0.75, 1, 1.25, 1.5, 2].map(n => ({ value: String(n), label: `${n}×` }))}
          onChange={e => { const n = Number(e.target.value); if (media.current) media.current.playbackRate = n; setSpeed(n); }} />
      </Inline>
      {source.kind === 'video' && <Button size="sm" variant="ghost" className={NARROW_REST} onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>{expanded ? 'Hide video' : 'Show video'}</Button>}
      {onClose && <IconButton size="sm" aria-label="Close player" icon={<CloseIcon />} onClick={onClose} className="shrink-0 @max-2xl:order-1" data-playback-close="" />}
      {status && <span className={cn('min-w-0', NARROW_REST)}>{status}</span>}
    </Inline>
  </>;
}

// G152-2 (since 2.520.0). Under the row's 42rem container width the title
// shares its line with Close only (the title's basis is the line less the sm
// control, the 8px gap and 4px of slack), and every other group follows on the next lines.
const NARROW_TITLE = '@max-2xl:basis-[calc(100%-var(--ui-control-sm,1.75rem)-0.75rem)]';
const NARROW_REST = '@max-2xl:order-2';

/**
 * One playback for a page (G152-1): the `MediaPlaybackDock` owns the only
 * media element, and every row's `AudioPlayer` follows it through
 * `controllerFor(source)`. A row's Play loads its source into the dock and
 * plays it; a row's scrubber seeks the dock (loading that source first when
 * another is current). Spread `dockProps` on the dock. Since 2.520.0.
 */
export function useMediaPlayback(initial: PlaybackSource | null = null) {
  const [source, setSource] = useState<PlaybackSource | null>(initial);
  const [autoPlay, setAutoPlay] = useState(false);
  const [state, setState] = useState<MediaPlaybackState>(IDLE);
  const controlRef = useRef<MediaPlaybackHandle | null>(null);
  const pendingSeek = useRef<{ id: string; seconds: number } | null>(null);

  const onStateChange = useCallback((next: MediaPlaybackState) => {
    setState((prev) => (prev.sourceId === next.sourceId && prev.playing === next.playing && prev.time === next.time && prev.duration === next.duration ? prev : next));
    const p = pendingSeek.current;
    if (p && next.sourceId === p.id && next.duration > 0) {
      pendingSeek.current = null;
      controlRef.current?.seek(p.seconds);
    }
  }, []);

  const load = useCallback((next: PlaybackSource, play: boolean) => {
    setAutoPlay(play);
    setSource(next);
  }, []);
  const close = useCallback(() => { setSource(null); setAutoPlay(false); }, []);

  const controllerFor = useCallback((row: PlaybackSource): AudioPlayerController => {
    const current = state.sourceId === row.id;
    return {
      playing: current && state.playing,
      time: current ? state.time : 0,
      duration: current && state.duration > 0 ? state.duration : undefined,
      onToggle: () => { if (current) controlRef.current?.toggle(); else load(row, true); },
      onSeek: (seconds) => {
        if (current) controlRef.current?.seek(seconds);
        else { pendingSeek.current = { id: row.id, seconds }; load(row, false); }
      },
    };
  }, [state, load]);

  const dockProps = useMemo(() => ({ source, autoPlay, onStateChange, controlRef, onClose: close }), [source, autoPlay, onStateChange, close]);
  return { source, state, play: (next: PlaybackSource) => load(next, true), load: (next: PlaybackSource) => load(next, false), close, controllerFor, controlRef, dockProps };
}
