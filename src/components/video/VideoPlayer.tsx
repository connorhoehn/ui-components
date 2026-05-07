import { useRef, useEffect, useState, type CSSProperties } from 'react';

export type PlayerPhase = 'idle' | 'connecting' | 'buffering' | 'playing' | 'error';

export interface VideoPlayerProps {
  src?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  poster?: string;
  phase?: PlayerPhase;
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
  autoPlay = false,
  muted = true,
  loop = false,
  poster,
  phase: controlledPhase,
  style,
  onPhaseChange,
  onTimeUpdate,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [internalPhase, setInternalPhase] = useState<PlayerPhase>('idle');
  const phase = controlledPhase ?? internalPhase;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handlers: [string, () => void][] = [
      ['waiting', () => { setInternalPhase('buffering'); onPhaseChange?.('buffering'); }],
      ['playing', () => { setInternalPhase('playing'); onPhaseChange?.('playing'); }],
      ['error', () => { setInternalPhase('error'); onPhaseChange?.('error'); }],
      ['loadstart', () => { setInternalPhase('connecting'); onPhaseChange?.('connecting'); }],
      ['timeupdate', () => { onTimeUpdate?.(el.currentTime, el.duration); }],
    ];

    handlers.forEach(([evt, fn]) => el.addEventListener(evt, fn));
    return () => handlers.forEach(([evt, fn]) => el.removeEventListener(evt, fn));
  }, [onPhaseChange, onTimeUpdate]);

  const showOverlay = phase !== 'playing';
  const overlayText = overlayLabels[phase];

  return (
    <div style={{
      position: 'relative',
      background: '#000',
      borderRadius: 8,
      overflow: 'hidden',
      aspectRatio: '16/9',
      ...style,
    }}>
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        poster={poster}
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
      {showOverlay && overlayText && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: 0.5,
        }}>
          {phase === 'buffering' && <Spinner />}
          <span style={{ marginLeft: phase === 'buffering' ? 8 : 0 }}>{overlayText}</span>
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" style={{ animation: 'spin 1s linear infinite' }}>
      <circle cx="9" cy="9" r="7" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path d="M9 2a7 7 0 0 1 7 7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </svg>
  );
}
