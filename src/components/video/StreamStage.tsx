// StreamStage — the surface a live stream or call is watched on.
//
// ## Why this exists as a composite
//
// The library had the PARTS of a stream surface and no stream surface:
// `StreamVideo` wires a MediaStream into a <video>, `ViewerCount` is a badge,
// `StreamChatTicker` rotates chat. Every app that wanted a watchable stream had
// to assemble those itself, which meant re-deciding the same things — where
// chat floats, whether the badge is over or beside the video, what happens
// before the stream arrives — and getting a different answer each time.
//
// ## Overlay, not columns
//
// Chat, viewer count and title all float OVER the video rather than taking
// layout beside it. On a stream the video is the content; a chat column that
// steals 320px is 320px of the thing you came to watch. Overlaying also means
// the stage works unchanged at any size, from a sidebar tile to full screen,
// which a column layout does not.
//
// Everything overlaid is `pointer-events-none` except deliberate controls, so
// the video keeps its own click targets (play, fullscreen, PiP).
//
// ## Two transports, one stage
//
// LVS delivers the same channel two ways and they are NOT interchangeable:
//
//   `stream`      — a MediaStream from WHEP (`useLVSSubscriber`). Sub-second,
//                   one peer connection per viewer. That per-viewer cost is
//                   what makes a CALL work and what makes a thousand-viewer
//                   broadcast expensive.
//   `playlistUrl` — an HLS playlist from `useLVSLiveHls`. Segmented plain
//                   HTTP, so a CDN can carry it to an audience of any size.
//                   Costs a few seconds of latency.
//
// The stage takes either, because the chrome is identical either way — a
// viewer cannot tell which transport they are on, and neither should the code
// that lays out the LIVE badge. `stream` wins when both are given: it is the
// lower-latency source, so passing both reads as "realtime, with HLS as the
// thing I fall back to", and that is what happens.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useHlsSource } from '../../lib/video/useHlsSource';
import { StreamVideo } from './StreamVideo';
import { ViewerCount } from './ViewerCount';

/**
 * How long a stream may say "Connecting…" before admitting nothing is coming.
 * A live manifest answers in a second or two; ten seconds is generous enough
 * that a slow one is never called dead.
 */
const STALL_AFTER_MS = 10_000;
import { StreamChatTicker, type StreamChatMessage } from './StreamChatTicker';

export interface StreamStageProps {
  /**
   * The live stream, realtime transport. Null renders the placeholder — a
   * stage with no stream is the normal state before a broadcast starts, not
   * an error.
   */
  stream?: MediaStream | null;
  /**
   * The live stream, near-realtime transport: an HLS playlist URL, typically
   * from `useLVSLiveHls`. Used when `stream` is absent.
   */
  playlistUrl?: string | null;
  /** Surfaced when HLS cannot play — an unsupported browser, a dead playlist. */
  onPlaybackError?: (err: Error) => void;
  /** Replaces the default wording once a stream has failed to start. */
  notStartedLabel?: string;
  /**
   * Shown when a stream that WAS playing goes away — the broadcaster hung up.
   *
   * A distinct state from "not started". Both render an empty stage, but the
   * placeholder tells the audience to keep waiting, which is the wrong thing
   * to say about something that is over.
   */
  endedLabel?: ReactNode;
  /** How long to wait before saying so. Default 10s. */
  stallAfterMs?: number;
  /** Name of the stream or call, shown top-left. */
  title?: string;
  /** Shown beside the title. Omit when the count is unknown rather than passing 0. */
  viewerCount?: number;
  /**
   * The caller's claim that this should be live. It is ANDed with what the
   * player actually managed to do, so on the HLS path a claim alone will not
   * light the badge — a composed playlist URL is not a broadcast.
   */
  live?: boolean;
  /**
   * Chat to rotate over the video. Empty or omitted renders no ticker at all,
   * so a silent stream is not carrying an empty chat frame.
   */
  chatMessages?: readonly StreamChatMessage[];
  /** Forwarded to the ticker. */
  chatVisibleCount?: number;
  chatRotateMs?: number;
  /** Muted by default: an autoplaying stream that makes noise is hostile. */
  muted?: boolean;
  /** Controls rendered bottom-right, e.g. leave / mute / fullscreen. */
  controls?: ReactNode;
  /** Shown centred when there is no stream. */
  placeholder?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function StreamStage({
  stream = null,
  playlistUrl = null,
  onPlaybackError,
  title,
  viewerCount,
  live = false,
  notStartedLabel,
  endedLabel,
  stallAfterMs = STALL_AFTER_MS,
  chatMessages,
  chatVisibleCount,
  chatRotateMs,
  muted = true,
  controls,
  placeholder,
  className,
  'data-testid': testId = 'stream-stage',
}: StreamStageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Only engaged on the HLS path; passing null keeps the hook inert when a
  // MediaStream is driving the stage.
  const hls = useHlsSource(videoRef, stream ? null : playlistUrl, {
    live: true,
    onError: onPlaybackError,
  });

  // `live` is the CALLER'S CLAIM, not evidence. On the HLS path the caller
  // typically knows only that it managed to compose a playlist URL — which is
  // string concatenation, not a broadcast — so a channel that was provisioned
  // once and has been idle ever since produced a black rectangle wearing a LIVE
  // badge. Nothing about that display was true.
  //
  // The player is the only thing here that knows. So the claim is ANDed with
  // it: still attaching, or failed, means not live. The realtime path is
  // unaffected — its `stream` either has tracks or the caller does not pass it.
  const playing = stream ? live : live && !hls.loading && !hls.error;

  // "Connecting…" has to stop eventually.
  //
  // A playlist URL can be composed for a channel nobody is broadcasting to,
  // and HLS does not error on that — it simply never delivers a segment. So a
  // viewer who opens a stream that has not started waits on a spinner
  // indefinitely, told nothing. After a grace period long enough for a real
  // manifest (a live one answers in a second or two), say the true thing
  // instead: there is nothing coming.
  // "It ended" and "it has not started" look identical — an empty stage — and
  // are opposite messages. Once this stage has had a source, losing it means
  // the broadcast is over, and telling the audience to keep waiting for it is
  // the one thing that is certainly wrong.
  //
  // Per MOUNT, deliberately: a viewer who opens the stage after a broadcast
  // has finished never had a source here, and for them "waiting" is right.
  const hadSource = useRef(false);
  if (stream || playlistUrl) hadSource.current = true;
  const ended = hadSource.current && !stream && !playlistUrl;

  const [stalled, setStalled] = useState(false);
  useEffect(() => {
    setStalled(false);
    if (!playlistUrl || stream || !hls.loading || hls.error) return;
    const timer = setTimeout(() => setStalled(true), stallAfterMs);
    return () => clearTimeout(timer);
  }, [playlistUrl, stream, hls.loading, hls.error, stallAfterMs]);

  return (
    <div
      data-testid={testId}
      data-live={String(playing)}
      data-transport={stream ? 'realtime' : playlistUrl ? 'hls' : 'none'}
      // Always black, in both themes: letterbox bars around a video are black
      // everywhere video is watched, and a white stage in light mode makes the
      // frame edges glow. This is one of the few surfaces that should not
      // follow the app's palette.
      className={cn('relative h-full w-full overflow-hidden rounded-lg bg-black', className)}
    >
      {stream ? (
        <StreamVideo stream={stream} muted={muted} className="h-full w-full object-contain" />
      ) : playlistUrl ? (
        <video
          ref={videoRef}
          data-testid={`${testId}-hls`}
          autoPlay
          playsInline
          muted={muted}
          className="h-full w-full object-contain"
        />
      ) : (
        <div
          data-testid={ended ? `${testId}-ended` : `${testId}-placeholder`}
          className="flex h-full w-full items-center justify-center text-sm text-white/60"
        >
          {ended
            ? (endedLabel ?? 'The broadcast has ended.')
            : (placeholder ?? 'Waiting for the stream to start…')}
        </div>
      )}

      {/* Connecting is its own state. Without it the stage is black from the
          moment it mounts, so "about to play" and "there is nothing here" look
          exactly the same for as long as the manifest takes. */}
      {playlistUrl && !stream && hls.loading && !hls.error && (
        <div
          data-testid={stalled ? `${testId}-not-started` : `${testId}-connecting`}
          className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-white/60"
        >
          {stalled ? (notStartedLabel ?? 'Nothing is being broadcast right now.') : 'Connecting…'}
        </div>
      )}

      {/* An unplayable stream says so. Before this the stage sat black and
          indistinguishable from a broadcast that had not started. */}
      {hls.error && (
        <div
          data-testid={`${testId}-error`}
          className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-white/80"
        >
          {hls.error}
        </div>
      )}

      {/* Top-left: identity. */}
      {(title || playing || viewerCount !== undefined) && (
        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
          {playing && (
            <span
              data-testid={`${testId}-live`}
              className="rounded bg-danger px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
            >
              Live
            </span>
          )}
          {title && (
            <span className="truncate text-sm font-medium text-white drop-shadow">{title}</span>
          )}
          {viewerCount !== undefined && <ViewerCount count={viewerCount} />}
        </div>
      )}

      {/* Bottom-left: chat, out of the way of controls on the right. */}
      {chatMessages && chatMessages.length > 0 && (
        <StreamChatTicker
          messages={chatMessages}
          visibleCount={chatVisibleCount}
          rotateMs={chatRotateMs}
          className="absolute bottom-3 left-3"
          data-testid={`${testId}-chat`}
        />
      )}

      {controls && <div className="absolute bottom-3 right-3 flex items-center gap-2">{controls}</div>}
    </div>
  );
}

export default StreamStage;
