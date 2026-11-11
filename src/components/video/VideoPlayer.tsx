import { useRef, useEffect, useState, type CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export type PlayerPhase = 'idle' | 'connecting' | 'buffering' | 'playing' | 'error';

/** A named span of the clip, from `start` (seconds) to the next chapter's start. */
export interface VideoChapter {
  start: number;
  title: string;
  id?: string;
}
/** A point on the clip worth a look (a review finding, a note), at `at` seconds. */
export interface VideoMarker {
  at: number;
  label: string;
  tone?: 'info' | 'warning' | 'danger';
  id?: string;
}

/** "0:06" for 6 seconds; "1:02" past a minute. */
export function formatClipTime(seconds: number): string {
  const s = Math.max(0, Math.round(Number(seconds) || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export interface VideoPlayerProps {
  src?: string;
  /**
   * MediaStream source for WebRTC playback (WHEP, RTCPeerConnection.ontrack,
   * getUserMedia, etc.). When set, attached to the underlying <video>'s
   * `srcObject`. Takes precedence over `src` if both are supplied. Pass
   * `null` to clear.
   */
  stream?: MediaStream | null;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  poster?: string;
  phase?: PlayerPhase;
  className?: string;
  style?: CSSProperties;
  onPhaseChange?: (phase: PlayerPhase) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  /**
   * Chapters drawn under the clip as a list a viewer can jump through (since
   * 2.520.0). The playing chapter is marked `aria-current`. File sources only.
   */
  chapters?: VideoChapter[];
  /** Points on the clip (review findings) drawn as ticks on a track and as jump buttons (since 2.520.0). */
  markers?: VideoMarker[];
  /**
   * Seek to this many seconds. Change `nonce` to seek to the same time again.
   * The player seeks once metadata is in. Since 2.520.0.
   */
  seekTo?: { seconds: number; nonce?: number } | null;
  /** The chapter that started playing (after a seek or as the clip plays). Since 2.520.0. */
  onChapterChange?: (chapter: VideoChapter, index: number) => void;
}

const overlayLabels: Record<PlayerPhase, string> = {
  idle: 'Ready',
  connecting: 'Connecting…',
  buffering: 'Buffering…',
  playing: '',
  error: 'Playback Error',
};

/**
 * A file or live-stream player with a phase overlay; with `chapters` and `markers` it lists a cut's shots and marked moments under the clip and seeks to them.
 */
export function VideoPlayer({
  src,
  stream,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = false,
  poster,
  phase: controlledPhase,
  className,
  style,
  onPhaseChange,
  onTimeUpdate,
  chapters,
  markers,
  seekTo,
  onChapterChange,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [internalPhase, setInternalPhase] = useState<PlayerPhase>('idle');
  // A file source (a plain `src`, no `stream`) whose metadata has loaded is a
  // clip at rest, not a connection: it shows its poster/first frame and its
  // controls, never the idle/connecting overlay over them (since 2.515.7).
  const [fileLoaded, setFileLoaded] = useState(false);
  const phase = controlledPhase ?? internalPhase;
  const [now, setNow] = useState(0);
  const [length, setLength] = useState(0);
  const timed = !!(chapters?.length || markers?.length);
  const source = stream ? 'stream' : src ? 'file' : 'none';

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handlers: [string, () => void][] = [
      ['waiting', () => { setInternalPhase('buffering'); onPhaseChange?.('buffering'); }],
      ['playing', () => { setInternalPhase('playing'); onPhaseChange?.('playing'); }],
      ['error', () => { setInternalPhase('error'); onPhaseChange?.('error'); }],
      ['loadstart', () => { setFileLoaded(false); setInternalPhase('connecting'); onPhaseChange?.('connecting'); }],
      ['loadedmetadata', () => { if (!el.srcObject) setFileLoaded(true); }],
      ['timeupdate', () => { setNow(el.currentTime); onTimeUpdate?.(el.currentTime, el.duration); }],
      ['durationchange', () => { if (Number.isFinite(el.duration)) setLength(el.duration); }],
    ];

    handlers.forEach(([evt, fn]) => el.addEventListener(evt, fn));
    // Metadata may already be in (a cached clip) before the listeners attach.
    if (el.readyState >= 1 && !el.srcObject && el.currentSrc) setFileLoaded(true);
    return () => handlers.forEach(([evt, fn]) => el.removeEventListener(evt, fn));
  }, [onPhaseChange, onTimeUpdate]);

  // Attach MediaStream (WebRTC) imperatively — srcObject is the only way to
  // bind a live stream to <video>. Setting null clears it so the element
  // releases its media graph when the parent disposes the stream.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (stream !== undefined) {
      el.srcObject = stream;
    }
  }, [stream]);

  const seek = (seconds: number) => {
    const el = videoRef.current;
    if (!el || !Number.isFinite(seconds)) return;
    const go = () => { el.currentTime = Math.max(0, seconds); setNow(el.currentTime); };
    if (el.readyState >= 1) go();
    else el.addEventListener('loadedmetadata', go, { once: true });
  };
  useEffect(() => {
    if (seekTo && Number.isFinite(seekTo.seconds)) seek(seekTo.seconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seekTo?.seconds, seekTo?.nonce]);

  const sorted = [...(chapters || [])].sort((a, b) => a.start - b.start);
  let current = -1;
  sorted.forEach((c, i) => { if (c.start <= now + 0.001) current = i; });
  const lastChapter = useRef(-1);
  useEffect(() => {
    if (current >= 0 && current !== lastChapter.current) {
      lastChapter.current = current;
      onChapterChange?.(sorted[current], current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
  const span = length || Math.max(0, ...sorted.map((c) => c.start), ...(markers || []).map((m) => m.at)) || 1;

  const fileAtRest = source === 'file' && fileLoaded && (phase === 'idle' || phase === 'connecting');
  const showOverlay = phase !== 'playing' && !fileAtRest;
  const overlayText = overlayLabels[phase];

  const player = (
    <div
      className={cn('relative bg-black rounded-lg overflow-hidden aspect-video', timed ? undefined : className)}
      style={timed ? undefined : style}
      data-video-player=""
      data-phase={phase}
      data-source={source}
      {...(source === 'file' && fileLoaded ? { 'data-file-loaded': '' } : {})}
    >
      <video
        ref={videoRef}
        src={stream ? undefined : src}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        poster={poster}
        playsInline
        className={cn('w-full h-full object-contain block')}
      />
      {showOverlay && overlayText && (
        <div className={cn('absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide')} data-video-overlay={phase}>
          {phase === 'buffering' && <Spinner />}
          <span className={cn(phase === 'buffering' ? 'ml-2' : '')}>{overlayText}</span>
        </div>
      )}
    </div>
  );
  if (!timed) return player;
  // The track's tick positions are a share of the clip's length: the one
  // dynamic value here, set as `left` (check-static-styles allowlist).
  const rowClass = 'flex w-full items-baseline gap-3 rounded-md px-2 py-1 text-left text-sm text-text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';
  return (
    <div className={cn('flex flex-col gap-2', className)} style={style} data-video-timed="">
      {player}
      {!!markers?.length && (
        <div className="relative h-2 rounded-full bg-border" aria-hidden="true" data-video-track="">
          {sorted.map((c, i) => i > 0 && (
            <span key={`c-${c.id ?? i}`} className="absolute top-0 h-2 w-px bg-text-tertiary" style={{ left: `${(c.start / span) * 100}%` }} />
          ))}
          {markers.map((m, i) => (
            <span
              key={`m-${m.id ?? i}`}
              className={cn('absolute -top-0.5 h-3 w-1.5 -translate-x-1/2 rounded-sm', MARKER_TONE[m.tone ?? 'warning'])}
              style={{ left: `${(m.at / span) * 100}%` }}
              data-video-marker-tick={m.id ?? i}
            />
          ))}
        </div>
      )}
      {!!sorted.length && (
        <ol className="m-0 flex list-none flex-col gap-1 p-0" aria-label="Chapters" data-video-chapters="">
          {sorted.map((c, i) => (
            <li key={c.id ?? i}>
              <button
                type="button"
                onClick={() => seek(c.start)}
                aria-current={i === current ? 'true' : undefined}
                data-video-chapter={c.id ?? i}
                className={cn(rowClass, i === current && 'bg-surface-hover font-semibold')}
              >
                <span className="shrink-0 text-xs tabular-nums text-text-secondary">{formatClipTime(c.start)}</span>
                <span className="min-w-0 break-words">{c.title}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
      {!!markers?.length && (
        <ul className="m-0 flex list-none flex-col gap-1 p-0" aria-label="Marked moments" data-video-markers="">
          {markers.map((m, i) => (
            <li key={m.id ?? i}>
              <button
                type="button"
                onClick={() => seek(m.at)}
                data-video-marker={m.id ?? i}
                data-tone={m.tone ?? 'warning'}
                className={rowClass}
              >
                <span className="shrink-0 text-xs tabular-nums text-text-secondary">{formatClipTime(m.at)}</span>
                <span className="min-w-0 break-words">{m.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const MARKER_TONE: Record<NonNullable<VideoMarker['tone']>, string> = {
  info: 'bg-info',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className={cn('animate-spin')}>
      <circle cx="9" cy="9" r="7" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path d="M9 2a7 7 0 0 1 7 7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
