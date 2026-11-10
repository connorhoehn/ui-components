import { useRef, useEffect, useState, type CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export type PlayerPhase = 'idle' | 'connecting' | 'buffering' | 'playing' | 'error';

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
}

const overlayLabels: Record<PlayerPhase, string> = {
  idle: 'Ready',
  connecting: 'Connecting…',
  buffering: 'Buffering…',
  playing: '',
  error: 'Playback Error',
};

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
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [internalPhase, setInternalPhase] = useState<PlayerPhase>('idle');
  // A file source (a plain `src`, no `stream`) whose metadata has loaded is a
  // clip at rest, not a connection: it shows its poster/first frame and its
  // controls, never the idle/connecting overlay over them (since 2.515.7).
  const [fileLoaded, setFileLoaded] = useState(false);
  const phase = controlledPhase ?? internalPhase;
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
      ['timeupdate', () => { onTimeUpdate?.(el.currentTime, el.duration); }],
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

  const fileAtRest = source === 'file' && fileLoaded && (phase === 'idle' || phase === 'connecting');
  const showOverlay = phase !== 'playing' && !fileAtRest;
  const overlayText = overlayLabels[phase];

  return (
    <div
      className={cn('relative bg-black rounded-lg overflow-hidden aspect-video', className)}
      style={style}
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
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className={cn('animate-spin')}>
      <circle cx="9" cy="9" r="7" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path d="M9 2a7 7 0 0 1 7 7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
