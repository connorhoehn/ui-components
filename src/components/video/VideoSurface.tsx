// VideoSurface — a framed <video> element that a hook can drive, with overlay slots.
//
// The other video components own their source: StreamVideo requires a
// MediaStream, VideoPlayer takes a `src` or `stream` prop, StreamStage picks
// between WHEP and HLS itself. None of them fits a hook that already owns the
// element: a publisher hook that assigns its captured camera to `srcObject`
// and never hands the stream back, or an hls.js hook that needs the element to
// `attachMedia` to. Those callers used to hand-roll the frame, the letterbox
// and the corner chips around a bare <video>.
//
// The contract is about who touches the element:
//
//   - `videoRef` (an object or callback ref) receives the <video> element. The
//     element is mounted for the whole life of the surface, through every
//     `state`, so a hook holding the ref never sees it swapped or detached.
//   - With `stream`, the surface binds it to `srcObject`, attempts play(),
//     rebinds on addtrack/removetrack, and clears `srcObject` when the stream
//     goes away (only if it is still the one it bound).
//   - Without `stream`, the surface never reads or writes `srcObject` or
//     `src`. Whatever the hook attached stays attached across re-renders.
//
// Overlays: four corner slots and a centre slot. Each slot ignores pointer
// events itself and gives them back to its children, so the empty part of a
// slot never blocks the video's own controls; with `controls` the bottom
// slots sit above the native control bar. Overlays are never mirrored, even
// when the video is (`mirrored` flips the picture only).
//
// States: `ready` shows the video; `loading` draws a spinner over it (a
// pill along the top with `controls`, clear of the browser's own spinner);
// `empty` covers it with the placeholder; `error` covers it with the message.
// The state layer never unmounts the <video>.

import { useCallback, useEffect, useRef, type ReactNode, type Ref } from 'react';
import { cn } from '../../lib/cn';
import { Spinner } from '../shared/Spinner';
import { bindMediaStream, type StreamVideoPlayState } from './bindMediaStream';

export type VideoSurfaceFit = 'cover' | 'contain';

/**
 * `video` 16:9, `square` 1:1, `portrait` 9:16, `fill` takes the parent's box
 * (the parent sets the height).
 */
export type VideoSurfaceAspect = 'video' | 'square' | 'portrait' | 'fill';

export type VideoSurfaceState = 'ready' | 'loading' | 'empty' | 'error';

export interface VideoSurfaceProps {
  /**
   * Receives the <video> element. Object refs and callback refs both work;
   * the element is the same one for the life of the surface.
   */
  videoRef?: Ref<HTMLVideoElement>;
  /**
   * A MediaStream for the surface to bind to `srcObject`. Omit it when a hook
   * drives the element through `videoRef`: the surface then never touches
   * `srcObject` or `src`. `null` clears a stream the surface bound earlier.
   */
  stream?: MediaStream | null;
  /** Default false. A local camera preview should pass true (no echo). */
  muted?: boolean;
  /** Default true. */
  autoPlay?: boolean;
  /** Default true, so iOS plays inline rather than going full screen. */
  playsInline?: boolean;
  /** Native playback controls. Default false. */
  controls?: boolean;
  poster?: string;
  /** How the picture fills the frame. Default `contain` (letterboxed). */
  fit?: VideoSurfaceFit;
  /** Flip the picture horizontally (a selfie preview). Overlays are not flipped. */
  mirrored?: boolean;
  /** Frame shape. Default `video` (16:9). */
  aspect?: VideoSurfaceAspect;
  /** Default `ready`. */
  state?: VideoSurfaceState;
  /** Shown in the `empty` state. Default "No video". */
  placeholder?: ReactNode;
  /** Shown under the spinner in the `loading` state. Default "Loading…". */
  loadingLabel?: ReactNode;
  /** Shown in the `error` state. Default "Video unavailable". */
  error?: ReactNode;
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  center?: ReactNode;
  /** Accessible name for the <video> element, e.g. "Camera preview". */
  label?: string;
  /** Playback state of a bound `stream` (not called without one). */
  onPlayStateChange?: (state: StreamVideoPlayState) => void;
  /** Classes on the frame: width, max height, rounding, border. */
  className?: string;
  'data-testid'?: string;
}

const ASPECT_CLASSES: Record<VideoSurfaceAspect, string> = {
  video: 'aspect-video w-full',
  square: 'aspect-square w-full',
  portrait: 'aspect-[9/16] h-full',
  fill: 'h-full w-full',
};

const SLOT_BASE =
  'pointer-events-none absolute z-10 flex max-w-[calc(100%-1rem)] flex-col gap-1.5 [&>*]:pointer-events-auto';

/** A slot renders only for real content: `cond && <Chip/>` yields `false`. */
function filled(node: ReactNode): boolean {
  return node != null && node !== false && node !== '';
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

export function VideoSurface({
  videoRef,
  stream,
  muted = false,
  autoPlay = true,
  playsInline = true,
  controls = false,
  poster,
  fit = 'contain',
  mirrored = false,
  aspect = 'video',
  state = 'ready',
  placeholder = 'No video',
  loadingLabel = 'Loading…',
  error = 'Video unavailable',
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  center,
  label,
  onPlayStateChange,
  className,
  'data-testid': testId = 'video-surface',
}: VideoSurfaceProps) {
  const elRef = useRef<HTMLVideoElement | null>(null);
  const externalRef = useRef(videoRef);
  externalRef.current = videoRef;
  const playStateRef = useRef(onPlayStateChange);
  playStateRef.current = onPlayStateChange;

  // A stable callback ref: React calls it once with the element and once with
  // null at unmount, never on a re-render, so a hook's ref is not churned.
  const setElement = useCallback((el: HTMLVideoElement | null) => {
    elRef.current = el;
    assignRef(externalRef.current, el);
  }, []);

  // A caller that swaps the ref object itself gets the element on the new one.
  useEffect(() => {
    if (!videoRef || !elRef.current) return;
    assignRef(videoRef, elRef.current);
  }, [videoRef]);

  useEffect(() => {
    const el = elRef.current;
    if (!el || !stream) return;
    const unbind = bindMediaStream(el, stream, {
      onPlayState: (s) => playStateRef.current?.(s),
    });
    return () => {
      unbind();
      if (el.srcObject === stream) el.srcObject = null;
    };
  }, [stream]);

  const bottomOffset = controls ? 'bottom-12' : 'bottom-2';

  return (
    <div
      data-testid={testId}
      data-video-surface=""
      data-state={state}
      data-fit={fit}
      data-aspect={aspect}
      {...(mirrored ? { 'data-mirrored': '' } : {})}
      className={cn(
        'relative overflow-hidden rounded-lg bg-video-stage',
        ASPECT_CLASSES[aspect],
        className,
      )}
    >
      <video
        ref={setElement}
        aria-label={label}
        autoPlay={autoPlay}
        playsInline={playsInline}
        muted={muted}
        controls={controls}
        poster={poster}
        className={cn(
          'block h-full w-full',
          fit === 'cover' ? 'object-cover' : 'object-contain',
          mirrored && '-scale-x-100',
        )}
      />

      {state === 'loading' && (
        <div
          role="status"
          data-video-surface-state="loading"
          className={cn(
            'pointer-events-none absolute inset-0 flex justify-center bg-black/40 text-xs font-medium text-white',
            // The browser draws its own spinner in the middle of a <video
            // controls> that is loading; ours moves to a pill along the top.
            controls ? 'items-start pt-3' : 'items-center',
          )}
        >
          <span
            className={cn(
              'flex items-center gap-2',
              controls ? 'flex-row rounded-full bg-black/65 px-3 py-1.5' : 'flex-col',
            )}
          >
            <Spinner size={controls ? 'sm' : 'md'} color="currentColor" decorative />
            <span>{loadingLabel}</span>
          </span>
        </div>
      )}
      {state === 'empty' && (
        <div
          data-video-surface-state="empty"
          className="absolute inset-0 flex items-center justify-center bg-video-stage px-4 text-center text-sm text-white/60"
        >
          {placeholder}
        </div>
      )}
      {state === 'error' && (
        <div
          role="alert"
          data-video-surface-state="error"
          className="absolute inset-0 flex items-center justify-center bg-video-stage px-4 text-center text-sm font-medium text-white"
        >
          <span className="max-w-full rounded-md bg-danger/90 px-3 py-1.5">{error}</span>
        </div>
      )}

      {filled(center) && (
        <div
          data-video-surface-slot="center"
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center [&>*]:pointer-events-auto"
        >
          {center}
        </div>
      )}
      {filled(topLeft) && (
        <div data-video-surface-slot="top-left" className={cn(SLOT_BASE, 'left-2 top-2 items-start')}>
          {topLeft}
        </div>
      )}
      {filled(topRight) && (
        <div data-video-surface-slot="top-right" className={cn(SLOT_BASE, 'right-2 top-2 items-end')}>
          {topRight}
        </div>
      )}
      {filled(bottomLeft) && (
        <div data-video-surface-slot="bottom-left" className={cn(SLOT_BASE, bottomOffset, 'left-2 items-start')}>
          {bottomLeft}
        </div>
      )}
      {filled(bottomRight) && (
        <div data-video-surface-slot="bottom-right" className={cn(SLOT_BASE, bottomOffset, 'right-2 items-end')}>
          {bottomRight}
        </div>
      )}
    </div>
  );
}

export default VideoSurface;
