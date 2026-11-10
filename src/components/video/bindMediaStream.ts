// bindMediaStream — attach a MediaStream to a <video> element and keep it
// painting.
//
// Shared by StreamVideo and VideoSurface. React does not pass a MediaStream
// through the DOM attribute system, so `srcObject` is assigned imperatively,
// play() is attempted, and the browser's autoplay rejection is surfaced.
//
// Chrome does not paint frames from tracks added after a <video> is already
// playing, and `el.srcObject = sameStream` is a no-op, so on `addtrack` /
// `removetrack` the element is unbound and rebound. Hit path: WHEP delivers
// audio first, srcObject is bound, play() succeeds, the video track arrives
// via stream.addTrack(), and without the rebind the tile stays black.

export type StreamVideoPlayState = 'playing' | 'paused-by-autoplay' | 'ended';

export interface BindMediaStreamOptions {
  /** Playback state transitions; `paused-by-autoplay` when play() is
   *  rejected with `NotAllowedError`. */
  onPlayState?: (state: StreamVideoPlayState) => void;
  /** Called after the bind and after each track-driven rebind, with the
   *  event type (`bind`, `addtrack`, `removetrack`). */
  onRebind?: (reason: string) => void;
}

/**
 * Binds `stream` to `el` and returns the cleanup. The cleanup removes the
 * listeners only; whether to clear `srcObject` is the caller's decision.
 */
export function bindMediaStream(
  el: HTMLVideoElement,
  stream: MediaStream,
  { onPlayState, onRebind }: BindMediaStreamOptions = {},
): () => void {
  if (el.srcObject !== stream) el.srcObject = stream;
  onRebind?.('bind');

  const emit = (state: StreamVideoPlayState) => onPlayState?.(state);
  const handlePlay = () => emit('playing');
  const handleEnded = () => emit('ended');
  const handlePause = () => {
    if (el.ended) emit('ended');
  };

  const tryPlay = () => {
    const result = el.play();
    if (result && typeof result.catch === 'function') {
      result.catch((err: unknown) => {
        const name = (err as { name?: string } | null)?.name;
        if (name === 'NotAllowedError') emit('paused-by-autoplay');
      });
    }
  };

  const handleStreamMutation = (ev: Event) => {
    el.srcObject = null;
    el.srcObject = stream;
    onRebind?.(ev.type);
    tryPlay();
  };

  el.addEventListener('play', handlePlay);
  el.addEventListener('ended', handleEnded);
  el.addEventListener('pause', handlePause);
  // Guarded: test stubs sometimes pass `{}` as the stream; a production
  // MediaStream always has addEventListener.
  const streamHasEvents = typeof stream?.addEventListener === 'function';
  if (streamHasEvents) {
    stream.addEventListener('addtrack', handleStreamMutation);
    stream.addEventListener('removetrack', handleStreamMutation);
  }

  tryPlay();

  return () => {
    el.removeEventListener('play', handlePlay);
    el.removeEventListener('ended', handleEnded);
    el.removeEventListener('pause', handlePause);
    if (streamHasEvents) {
      stream.removeEventListener('addtrack', handleStreamMutation);
      stream.removeEventListener('removetrack', handleStreamMutation);
    }
  };
}
