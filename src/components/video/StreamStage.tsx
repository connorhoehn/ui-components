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

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { StreamVideo } from './StreamVideo';
import { ViewerCount } from './ViewerCount';
import { StreamChatTicker, type StreamChatMessage } from './StreamChatTicker';

export interface StreamStageProps {
  /**
   * The live stream. Null renders the placeholder instead — a stage with no
   * stream is the normal state before a broadcast starts, not an error.
   */
  stream?: MediaStream | null;
  /** Name of the stream or call, shown top-left. */
  title?: string;
  /** Shown beside the title. Omit when the count is unknown rather than passing 0. */
  viewerCount?: number;
  /** True while the stream is live — drives the LIVE badge. */
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
  title,
  viewerCount,
  live = false,
  chatMessages,
  chatVisibleCount,
  chatRotateMs,
  muted = true,
  controls,
  placeholder,
  className,
  'data-testid': testId = 'stream-stage',
}: StreamStageProps) {
  return (
    <div
      data-testid={testId}
      data-live={String(live)}
      // Always black, in both themes: letterbox bars around a video are black
      // everywhere video is watched, and a white stage in light mode makes the
      // frame edges glow. This is one of the few surfaces that should not
      // follow the app's palette.
      className={cn('relative h-full w-full overflow-hidden rounded-lg bg-black', className)}
    >
      {stream ? (
        <StreamVideo stream={stream} muted={muted} className="h-full w-full object-contain" />
      ) : (
        <div
          data-testid={`${testId}-placeholder`}
          className="flex h-full w-full items-center justify-center text-sm text-white/60"
        >
          {placeholder ?? 'Waiting for the stream to start…'}
        </div>
      )}

      {/* Top-left: identity. */}
      {(title || live || viewerCount !== undefined) && (
        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
          {live && (
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
