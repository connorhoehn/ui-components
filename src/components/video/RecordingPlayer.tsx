// RecordingPlayer — HLS playback shell for VOD-style DVR playlists.
//
// Detects native HLS support (Safari) and uses `<video src>` directly.
// Otherwise dynamic-imports hls.js so we don't bloat the lib bundle.
// Consumers pass a playlist URL (typically from `useLVSHlsPlayer`) and
// get standard playback chrome: play/pause, scrubber, volume, speed,
// fullscreen.

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { cn } from '../../lib/cn';
import { Select } from '../forms/Select';

export interface RecordingPlayerProps {
  playlistUrl: string | null;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  onLoadedMetadata?: (durationSec: number) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onError?: (err: Error) => void;
  /** Hide the download button (private channels). Default false. */
  hideDownload?: boolean;
  className?: string;
}

function formatTime(sec: number): string {
  if (!isFinite(sec) || sec < 0) return '0:00';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function RecordingPlayer({
  playlistUrl,
  poster,
  autoPlay = false,
  muted = false,
  onLoadedMetadata,
  onTimeUpdate,
  onError,
  hideDownload = false,
  className,
}: RecordingPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !playlistUrl) return;
    setError(null);
    setIsLoading(true);

    if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = playlistUrl;
      return () => { v.removeAttribute('src'); v.load(); };
    }

    let cancelled = false;
    (async () => {
      try {
        // @ts-ignore — hls.js is a peer/optional dep installed by the
        // consumer app; we mark it external in vite.config.ts. tsc here
        // can't resolve it but runtime resolution works.
        const Hls = (await import(/* @vite-ignore */ 'hls.js')).default;
        if (cancelled) return;
        if (!Hls.isSupported()) {
          setError('HLS playback is not supported in this browser.');
          setIsLoading(false);
          return;
        }
        const hls = new Hls({ enableWorker: true });
        hlsRef.current = hls;
        hls.attachMedia(v);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(playlistUrl));
        hls.on(Hls.Events.ERROR, (_evt: unknown, data: any) => {
          if (data.fatal) {
            setError(`HLS error: ${data.type}`);
            onError?.(new Error(`HLS fatal: ${data.type}`));
          }
        });
      } catch (e: any) {
        if (cancelled) return;
        setError(`Failed to load hls.js — install it in the consumer app: ${e?.message ?? e}`);
      }
    })();

    return () => {
      cancelled = true;
      if (hlsRef.current) {
        try { hlsRef.current.destroy(); } catch { /* */ }
        hlsRef.current = null;
      }
    };
  }, [playlistUrl, onError]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => { /* */ });
    else v.pause();
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !isFinite(duration) || duration <= 0) return;
    v.currentTime = Number(e.target.value);
  };

  const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const val = Number(e.target.value);
    v.volume = val;
    setVolume(val);
  };

  const onSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const val = Number(e.target.value);
    v.playbackRate = val;
    setSpeed(val);
  };

  const requestFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void v.requestFullscreen?.();
    }
  };

  const progressPct = useMemo(
    () => (duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0),
    [currentTime, duration],
  );

  return (
    <div className={cn('relative bg-video-stage rounded-lg overflow-hidden aspect-video group', className)}>
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        muted={muted}
        poster={poster}
        playsInline
        className="w-full h-full object-contain"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          setDuration(v.duration);
          setIsLoading(false);
          onLoadedMetadata?.(v.duration);
        }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          setCurrentTime(v.currentTime);
          onTimeUpdate?.(v.currentTime, v.duration);
        }}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={() => {
          setError('Playback error.');
          onError?.(new Error('video element error'));
          setIsLoading(false);
        }}
      />

      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm">
          Loading…
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center">
          {error}
        </div>
      )}

      {/* focus-within, not just group-hover: the whole control bar (scrubber,
          play, mute, fullscreen) was opacity-0 until the mouse entered, so a
          keyboard user tabbing into the player operated invisible controls. */}
      <div className="absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white text-xs tabular-nums w-12">{formatTime(currentTime)}</span>
          {/* Media chrome: the seek bar is part of the video overlay (white
              accent on a gradient, --progress var for the fill) — a player
              scrubber, not a form control, so it stays a raw range. */}
          <input
            type="range"
            min={0}
            max={isFinite(duration) ? duration : 0}
            step={0.1}
            value={currentTime}
            onChange={onSeek}
            className="flex-1 h-1 accent-white/90 cursor-pointer"
            style={{ '--progress': `${progressPct}%` } as CSSProperties}
          />
          <span className="text-white text-xs tabular-nums w-12 text-right">{formatTime(duration)}</span>
        </div>
        <div className="flex items-center gap-3 text-white">
          <button
            type="button"
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3" height="12"/><rect x="9" y="1" width="3" height="12"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><polygon points="2,1 12,7 2,13"/></svg>
            )}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-70">Vol</span>
            <input
              type="range" min={0} max={1} step={0.01}
              value={volume} onChange={onVolume}
              className="w-20 h-1 accent-white/90 cursor-pointer"
              aria-label="Volume"
            />
          </div>
          <Select
            size="sm"
            value={String(speed)}
            onChange={onSpeedChange}
            className="w-auto bg-white/10 hover:bg-white/20 text-white border-transparent focus:bg-white/20 focus:border-transparent"
            aria-label="Playback speed"
            options={[
              { value: '0.5', label: '0.5×' },
              { value: '1', label: '1×' },
              { value: '1.5', label: '1.5×' },
              { value: '2', label: '2×' },
            ]}
          />
          <div className="flex-1" />
          {!hideDownload && playlistUrl && (
            <a
              href={playlistUrl}
              download
              className="text-white/80 hover:text-white text-xs underline"
              aria-label="Download"
            >
              Download
            </a>
          )}
          <button
            type="button"
            onClick={requestFullscreen}
            className="w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center"
            aria-label="Fullscreen"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecordingPlayer;
