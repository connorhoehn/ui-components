// StreamVideo — wire a MediaStream into a <video> element imperatively.
//
// React doesn't pass MediaStream through the DOM attribute system, so
// srcObject has to be assigned in a useEffect outside the render loop.
// The optional `videoRef` escape hatch lets callers reach the element
// for OS-level Picture-in-Picture (PiPButton.getVideoElement uses it).
//
// `onPlayStateChange` surfaces the underlying <video> playback state so
// composites like <AutoplayGate> can react to browser autoplay rejection
// (Chrome/Safari block non-muted autoplay without a user gesture, which
// is the source of the "remote tile is permanently black" class of bug
// when joining a call via a background tab).

import { useEffect, useRef, type MutableRefObject } from 'react';

export type StreamVideoPlayState = 'playing' | 'paused-by-autoplay' | 'ended';

export interface StreamVideoProps {
  stream: MediaStream;
  muted?: boolean;
  /** Optional external ref. Lets callers reach the underlying <video>
   *  for OS-level Picture-in-Picture. */
  videoRef?: MutableRefObject<HTMLVideoElement | null>;
  /** Tailwind class overrides. Defaults to `h-full w-full object-cover`. */
  className?: string;
  /** Notifies on playback state transitions. Fires `paused-by-autoplay`
   *  when the browser rejects autoplay with `NotAllowedError`. */
  onPlayStateChange?: (state: StreamVideoPlayState) => void;
}

export function StreamVideo({
  stream,
  muted = false,
  videoRef,
  className = 'h-full w-full object-cover',
  onPlayStateChange,
}: StreamVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const callbackRef = useRef(onPlayStateChange);
  callbackRef.current = onPlayStateChange;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.srcObject !== stream) el.srcObject = stream;
    if (videoRef) videoRef.current = el;

    const emit = (state: StreamVideoPlayState) => {
      callbackRef.current?.(state);
    };
    const handlePlay = () => emit('playing');
    const handleEnded = () => emit('ended');
    const handlePause = () => {
      // A pause that isn't an end is either a user pause or an autoplay
      // rejection. The play().catch below distinguishes the autoplay
      // case explicitly; a bare pause event after a successful play is
      // a user pause and we don't model it as a separate state today.
      if (el.ended) emit('ended');
    };
    el.addEventListener('play', handlePlay);
    el.addEventListener('ended', handleEnded);
    el.addEventListener('pause', handlePause);

    const result = el.play();
    if (result && typeof result.catch === 'function') {
      result.catch((err: unknown) => {
        const name = (err as { name?: string } | null)?.name;
        if (name === 'NotAllowedError') emit('paused-by-autoplay');
      });
    }

    return () => {
      el.removeEventListener('play', handlePlay);
      el.removeEventListener('ended', handleEnded);
      el.removeEventListener('pause', handlePause);
      if (videoRef && videoRef.current === el) videoRef.current = null;
    };
  }, [stream, videoRef]);

  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted={muted}
      className={className}
    />
  );
}
