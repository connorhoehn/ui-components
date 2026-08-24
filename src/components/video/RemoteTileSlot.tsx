// RemoteTileSlot — per-remote tile that adaptively renders a live <video>
// or an Avatar placeholder based on the stream's video-track state.
//
// Subscribes to mute/unmute/ended events on the inbound MediaStream's
// video tracks (via useTrackStateBump) so a track that arrives muted
// from WebRTC and later unmutes correctly flips from avatar fallback to
// live frame. Without this, every consumer rediscovers the
// "remote tile is permanently black even when camera is on" bug class.
//
// Audio-from-t=0 (2026-06-07 upstream of websocket-gateway commit
// a923d6b): when the visual branch is the avatar fallback, audio still
// needs a DOM binding so it plays the moment its RTP arrives — the
// avatar div is a placeholder with no media binding, and the bug it
// was meant to mask is that <video> showed a black frame during the
// 5-15s cold-WHEP window. Solution: render a hidden <audio> bound to
// the same stream alongside the avatar. When the visual branch is
// <StreamVideo>, that video element handles audio natively; the
// hidden audio is NOT rendered in that branch to avoid double-binding
// the same audio track (which would double-render in some browsers).
//
// Extracted from websocket-gateway's HangoutOverlay (lines 117-137
// pre-extraction).

import { useEffect, useRef } from 'react';
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

/**
 * Hidden <audio> element that binds the inbound MediaStream so audio
 * plays the moment its RTP arrives. Rendered ONLY in the avatar branch
 * — the <video> branch's element already handles audio playback, and
 * double-binding the same audio track risks playback duplication.
 *
 * Browsers gate non-muted autoplay on a recent user gesture. The
 * hangout open path is itself user-initiated, so the gesture
 * requirement is normally satisfied; the .catch() guards a tab that
 * opens in the background and joins via a programmatic flow.
 */
function HiddenAudioBinding({ stream }: { stream: MediaStream | undefined }) {
  const ref = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!stream) {
      if (el.srcObject) el.srcObject = null;
      return;
    }
    if (el.srcObject !== stream) el.srcObject = stream;
    const result = el.play();
    if (result && typeof result.catch === 'function') {
      result.catch(() => {
        // Autoplay rejected (e.g. background tab). The next user
        // gesture re-triggers playback via the browser's autoplay
        // recovery path; the audio is bound to the element regardless.
      });
    }
    return () => {
      // Releasing the binding is not optional. When the remote turns their
      // camera on, this component unmounts and <StreamVideo> takes over the
      // same stream — but React only DETACHES this <audio>, and a detached
      // media element with a live srcObject keeps playing in Chrome. The
      // participant would be audible through both elements from that moment
      // on, which is precisely the double-render the branch split above was
      // written to avoid.
      el.pause();
      el.srcObject = null;
    };
  }, [stream]);
  return (
    <audio
      ref={ref}
      autoPlay
      playsInline
      className="hidden"
      data-testid="remote-tile-hidden-audio"
    />
  );
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
      <div
        className="flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]"
        data-testid="remote-tile-avatar-branch"
      >
        <Avatar name={displayName} size={avatarSize} />
        {stream && <HiddenAudioBinding stream={stream} />}
      </div>
    );
  }
  return <StreamVideo stream={stream} />;
}
