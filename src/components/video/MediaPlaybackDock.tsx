import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Stack, Inline } from '../ui/Stack';
import { IconButton } from '../ui/IconButton';
import { Button } from '../ui/Button';
import { ChevronIcon, CloseIcon } from '../ui/Icons';
import { Slider } from '../forms/Slider';
import { Select } from '../forms/Select';
import { PlayIcon, PauseIcon, SpeakerIcon } from './MediaIcons';
import { formatAudioTime } from './AudioPlayer';

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
  className?: string;
  'data-testid'?: string;
}

/** One media sink under the scrolling shell, never a fixed overlay.
 * Source keys discard the old decoder and its events before starting another.
 * Uses the same Stack/Inline footer composition as the huddle shell, with the
 * shared button, icon, form and typography primitives throughout. */
export function MediaPlaybackDock({ source, autoPlay = false, onClose, onPrevious, onNext, status,
  emptyLabel = 'Select audio or video to preview', className, 'data-testid': testId = 'media-playback-dock',
}: MediaPlaybackDockProps) {
  return <Stack as="footer" gap="none" aria-label="Media player" className={cn('shrink-0 min-w-0 border-t border-border bg-surface', className)} data-testid={testId}>
    {source ? <PlaybackSession key={`${source.id}:${source.kind}:${source.src}`} source={source} autoPlay={autoPlay}
      onClose={onClose} onPrevious={onPrevious} onNext={onNext} status={status} />
      : <Inline gap="md" align="center" justify="between" className="min-h-11 px-4 py-1">
        <span className="text-xs text-text-secondary">{emptyLabel}</span>{status}
      </Inline>}
  </Stack>;
}

function PlaybackSession({ source, autoPlay, onClose, onPrevious, onNext, status }: MediaPlaybackDockProps & { source: PlaybackSource }) {
  const media = useRef<HTMLMediaElement | null>(null);
  const [playing, setPlaying] = useState(false), [time, setTime] = useState(0), [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1), [muted, setMuted] = useState(false), [speed, setSpeed] = useState(1);
  const [error, setError] = useState(''), [expanded, setExpanded] = useState(true);
  useEffect(() => {
    const element = media.current;
    return () => { element?.pause(); };
  }, []);
  const play = () => {
    const el = media.current;
    if (!el) return;
    if (!el.paused) el.pause();
    else { setError(''); void el.play().catch(() => setError('Playback could not start. Try Play again or check the source.')); }
  };
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
    <Inline gap="sm" align="center" wrap className="min-h-11 min-w-0 px-3 py-1" data-testid="playback-controls">
      <div className="min-w-0 flex-1 basis-40" title={source.subtitle ? `${source.title} — ${source.subtitle}` : source.title}>
        <div className="truncate text-sm font-semibold text-text-primary">{source.title}</div>
        {source.subtitle && <div className="truncate text-xs text-text-secondary">{source.subtitle}</div>}
      </div>
      <Inline gap="xs" align="center" wrap={false}>
        {onPrevious && <IconButton size="sm" aria-label="Previous media" icon={<ChevronIcon dir="left" />} onClick={onPrevious} />}
        <IconButton size="sm" variant="primary" aria-label={playing ? 'Pause' : 'Play'} icon={playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />} onClick={play} />
        {onNext && <IconButton size="sm" aria-label="Next media" icon={<ChevronIcon dir="right" />} onClick={onNext} />}
      </Inline>
      <Inline gap="xs" align="center" wrap={false} className="min-w-40 flex-1 basis-48">
        <span className="text-xs tabular-nums text-text-secondary">{formatAudioTime(time)}</span>
        <Slider aria-label="Seek media" value={Math.min(time, duration)} min={0} max={duration || 1} step={0.1} readout={false}
          disabled={!duration} className="min-w-0 flex-1" onChange={n => { if (media.current) media.current.currentTime = n; setTime(n); }} />
        <span className="text-xs tabular-nums text-text-secondary">{formatAudioTime(duration)}</span>
      </Inline>
      <Inline gap="xs" align="center" wrap={false}>
        <IconButton size="sm" aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted} icon={<SpeakerIcon size={16} />}
          onClick={() => { if (media.current) media.current.muted = !muted; setMuted(!muted); }} />
        <Slider aria-label="Volume" value={volume} max={1} step={0.05} readout={false} className="w-16"
          onChange={n => { if (media.current) media.current.volume = n; setVolume(n); }} />
        <Select aria-label="Playback speed" value={String(speed)} options={[0.75, 1, 1.25, 1.5, 2].map(n => ({ value: String(n), label: `${n}×` }))}
          onChange={e => { const n = Number(e.target.value); if (media.current) media.current.playbackRate = n; setSpeed(n); }} />
      </Inline>
      {source.kind === 'video' && <Button size="sm" variant="ghost" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>{expanded ? 'Hide video' : 'Show video'}</Button>}
      {onClose && <IconButton size="sm" aria-label="Close player" icon={<CloseIcon />} onClick={onClose} />}
      {status}
    </Inline>
  </>;
}
