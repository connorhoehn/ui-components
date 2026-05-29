// RemoteTileSlot — per-remote tile that adaptively renders a live <video>
// or an Avatar placeholder based on the stream's video-track state.
//
// Subscribes to mute/unmute/ended events on the inbound MediaStream's
// video tracks (via useTrackStateBump) so a track that arrives muted
// from WebRTC and later unmutes correctly flips from avatar fallback to
// live frame. Without this, every consumer rediscovers the
// "remote tile is permanently black even when camera is on" bug class.
//
// Extracted from websocket-gateway's HangoutOverlay (lines 117-137
// pre-extraction).

import { Avatar } from '../shared/Avatar';
import { useTrackStateBump, streamHasUsableVideo } from '../../lib/video/useTrackStateBump';
import { StreamVideo } from './StreamVideo';

export interface RemoteTileSlotProps {
  stream: MediaStream | undefined;
  displayName: string;
  /** Camera enabled by sender. False → show avatar even if a stream exists. */
  cameraOn: boolean;
  /** Avatar size when fallback renders. Default 96. */
  avatarSize?: number;
}

export function RemoteTileSlot({
  stream,
  displayName,
  cameraOn,
  avatarSize = 96,
}: RemoteTileSlotProps) {
  useTrackStateBump(stream, displayName);
  const hasUsableVideo = streamHasUsableVideo(stream);
  if (!cameraOn || !hasUsableVideo || !stream) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]">
        <Avatar name={displayName} size={avatarSize} />
      </div>
    );
  }
  return <StreamVideo stream={stream} />;
}
