// AutoplayGate — recover from browser autoplay rejection on remote tiles.
//
// Chrome and Safari refuse to start non-muted media playback without a
// prior user gesture in the tab. When a user joins a call from a
// background tab (notification click, hash-link), the remote <video>
// element silently rejects play() and the user sees a permanently
// black tile with no affordance. This composite wraps <StreamVideo>,
// listens for the rejection, and overlays a single tap-to-unmute chip.
// On click it unmutes + plays the wrapped tile AND walks every
// <video> element in the document, playing each paused one — a single
// user gesture clears every blocked remote tile at once.
//
// Born of websocket-gateway hub#1257.

import { useCallback, useRef, useState, type MutableRefObject } from 'react';
import { cn } from '../../lib/cn';
import {
  StreamVideo,
  type StreamVideoPlayState,
  type StreamVideoProps,
} from './StreamVideo';

export interface AutoplayGateProps extends StreamVideoProps {
  /** Chip label. Default: "Tap to unmute". */
  chipLabel?: string;
  /** Override the chip's Tailwind classes. */
  chipClassName?: string;
  /** Wrapper class for the relatively-positioned container. */
  wrapperClassName?: string;
}

const DEFAULT_CHIP_CLASSES =
  'pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70';

function playAllPausedVideos() {
  if (typeof document === 'undefined') return;
  const els = document.querySelectorAll('video');
  els.forEach(el => {
    if (el.paused) {
      const result = el.play();
      if (result && typeof result.catch === 'function') {
        // Swallow secondary rejections — the user already gestured.
        result.catch(() => {});
      }
    }
  });
}

export function AutoplayGate({
  chipLabel = 'Tap to unmute',
  chipClassName,
  wrapperClassName,
  onPlayStateChange,
  ...streamProps
}: AutoplayGateProps) {
  const [blocked, setBlocked] = useState(false);
  const localRef = useRef<HTMLVideoElement | null>(null);
  const externalRef = streamProps.videoRef;
  const mergedRef: MutableRefObject<HTMLVideoElement | null> = externalRef ?? localRef;

  const handlePlayStateChange = useCallback(
    (state: StreamVideoPlayState) => {
      if (state === 'paused-by-autoplay') setBlocked(true);
      else if (state === 'playing') setBlocked(false);
      onPlayStateChange?.(state);
    },
    [onPlayStateChange],
  );

  const handleTap = useCallback(() => {
    const el = mergedRef.current;
    if (el) {
      el.muted = false;
      const result = el.play();
      if (result && typeof result.catch === 'function') {
        result.catch(() => {});
      }
    }
    playAllPausedVideos();
    setBlocked(false);
  }, [mergedRef]);

  return (
    <div className={cn('relative h-full w-full', wrapperClassName)}>
      <StreamVideo
        {...streamProps}
        videoRef={mergedRef}
        onPlayStateChange={handlePlayStateChange}
      />
      {blocked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={handleTap}
            className={cn(DEFAULT_CHIP_CLASSES, chipClassName)}
            data-testid="autoplay-gate-chip"
          >
            {chipLabel}
          </button>
        </div>
      )}
    </div>
  );
}
