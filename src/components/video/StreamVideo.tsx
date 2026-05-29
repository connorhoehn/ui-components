// StreamVideo — wire a MediaStream into a <video> element imperatively.
//
// React doesn't pass MediaStream through the DOM attribute system, so
// srcObject has to be assigned in a useEffect outside the render loop.
// The optional `videoRef` escape hatch lets callers reach the element
// for OS-level Picture-in-Picture (PiPButton.getVideoElement uses it).
//
// Extracted from websocket-gateway's HangoutOverlay (lines 75-108
// pre-extraction). The pattern is identical across every hangout
// consumer; lives here so OrgIQ + future apps don't fork it.

import { useEffect, useRef, type MutableRefObject } from 'react';

export interface StreamVideoProps {
  stream: MediaStream;
  muted?: boolean;
  /** Optional external ref. Lets callers reach the underlying <video>
   *  for OS-level Picture-in-Picture. */
  videoRef?: MutableRefObject<HTMLVideoElement | null>;
  /** Tailwind class overrides. Defaults to `h-full w-full object-cover`. */
  className?: string;
}

export function StreamVideo({
  stream,
  muted = false,
  videoRef,
  className = 'h-full w-full object-cover',
}: StreamVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.srcObject !== stream) el.srcObject = stream;
    if (videoRef) videoRef.current = el;
    return () => {
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
