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
import { bindMediaStream, type StreamVideoPlayState } from './bindMediaStream';

export type { StreamVideoPlayState };

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
    if (videoRef) videoRef.current = el;

    const snapshotTracks = (label: string) => {
      // Guarded — test stubs sometimes pass `{}` as the stream and have
      // no getTracks(); production MediaStream always does.
      if (typeof stream?.getTracks !== 'function') return;
      console.info(`[StreamVideo] ${label}`, {
        streamId: stream.id,
        tracks: stream.getTracks().map(t => ({
          kind: t.kind,
          id: t.id,
          ready: t.readyState,
          muted: t.muted,
          enabled: t.enabled,
        })),
      });
    };

    const unbind = bindMediaStream(el, stream, {
      onPlayState: (state) => callbackRef.current?.(state),
      onRebind: (reason) => snapshotTracks(reason === 'bind' ? 'bind' : `stream ${reason}`),
    });

    return () => {
      unbind();
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
