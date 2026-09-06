// WrappedStreamStage — watch a channel, in whichever mode the audience needs.
//
// ## The mapping this exists to make
//
// LVS can deliver one channel two ways, and the difference is a product
// decision, not a detail:
//
//   'realtime'      → WHEP (`useLVSSubscriber`). Sub-second glass-to-glass,
//                     one peer connection PER VIEWER. That per-viewer cost is
//                     exactly what makes a conversation work and exactly what
//                     makes a thousand-viewer broadcast expensive.
//
//   'near-realtime' → HLS (`useLVSLiveHls`). Segmented plain HTTP, so it is
//                     cacheable and a CDN carries it to an audience of any
//                     size. Costs a few seconds of latency.
//
// Both were already reachable — the endpoints existed, and so did the parts —
// but only the CALL path had a wired component. Watching a broadcast meant
// hand-assembling a hook and a stage, and `StreamStage` could not even accept
// an HLS URL. So the two modes were not equally available, and the cheaper one
// was the harder one to reach.
//
// Here the mode is DATA. Flipping a stream from a conversation to a broadcast
// is one prop, not a rewrite:
//
//   <WrappedStreamStage channelArn={arn} mode="near-realtime" title="All hands" />
//
// ## Choosing
//
// If viewers TALK BACK, they need realtime — a two-second delay makes a
// conversation unusable. If they watch, near-realtime is cheaper by orders of
// magnitude and looks identical on screen.
//
// ## What stays outside
//
// Chat, viewer count and controls are props, exactly as on StreamStage. This
// wrapper resolves the TRANSPORT and nothing else: a host that already has a
// chat surface should not be made to adopt a second one to show a video.

import { useEffect } from 'react';
import {
  useLVSSubscriber,
  useLVSLiveHls,
  useLVSViewerCount,
} from '@connorhoehn/realtime-modules/client/video';
import { StreamStage, type StreamStageProps } from '../../components/video/StreamStage';

/** Which transport carries the stream. See the header for how to choose. */
export type StreamMode = 'realtime' | 'near-realtime';

export interface WrappedStreamStageProps
  extends Omit<StreamStageProps, 'stream' | 'playlistUrl' | 'live'> {
  /** Channel to watch. Null is idle — the stage shows its placeholder. */
  channelArn: string | null;
  /**
   * Defaults to 'near-realtime'. A component whose job is "let people watch"
   * should default to the mode that scales; realtime is the deliberate,
   * more expensive choice.
   */
  mode?: StreamMode;
  /** Playback JWT for a private channel. Public channels need none. */
  playbackToken?: string | null;
  /** Override the LVS base URL (else taken from LVSProvider). */
  baseUrl?: string;
  /** Realtime only: skip our own published tracks in the WHEP answer. */
  excludeParticipantId?: string;
  /** Realtime only: auth for the WHEP negotiation. */
  getAuthToken?: () => string | Promise<string>;
  /**
   * Reports transport state so a host can render its own connecting/failed
   * chrome. The stage renders playback errors itself; this is for the host's
   * larger surface (a banner, a retry).
   */
  /**
   * Transport-level status. `live` means different things per mode and neither
   * is a promise that pixels are moving: realtime reports the subscriber's
   * phase, near-realtime reports only that a playlist URL could be composed —
   * the wrapper does not own the player, so it cannot know more than that. The
   * LIVE badge is gated separately, inside StreamStage, on what playback
   * actually did.
   */
  onStatusChange?: (status: { mode: StreamMode; live: boolean; error: string | null }) => void;
}

/**
 * Realtime leg. Its hook lives here, not in the parent, because
 * `useLVSSubscriber` THROWS outside an LVSProvider — it is not inert when
 * unused. Calling both hooks in one component to keep hook order stable
 * therefore crashed every near-realtime viewer in a host that has no rm
 * LVSProvider, which is most of them: HLS needs no provider at all.
 *
 * One component per transport means only the chosen hook ever runs, so the
 * broadcast path cannot be broken by the realtime path's requirements — and
 * a broadcast provably opens no peer connection, rather than opening one and
 * asking it nicely not to start.
 */
function RealtimeStage({
  channelArn,
  excludeParticipantId,
  getAuthToken,
  baseUrl,
  onStatusChange,
  ...stage
}: Omit<WrappedStreamStageProps, 'mode' | 'playbackToken'>) {
  const sub = useLVSSubscriber({
    channelArn: channelArn ?? '',
    autoStart: !!channelArn,
    excludeParticipantId,
    baseUrl,
    getAuthToken,
  });

  const live = sub.phase === 'live';
  const { viewerCount } = useLVSViewerCount({ channelArn, baseUrl });
  useEffect(() => {
    onStatusChange?.({ mode: 'realtime', live, error: sub.error });
  }, [live, sub.error, onStatusChange]);

  return (
    <StreamStage
      {...stage}
      live={live}
      stream={sub.stream}
      // Omitted rather than passed as null: the stage's own contract is to
      // show nothing when the count is unknown, and a caller that turns
      // "not told" into 0 would have it announce an empty house.
      {...(viewerCount !== null ? { viewerCount } : {})}
    />
  );
}

/** Near-realtime leg. A pure URL composer — no provider required. */
function NearRealtimeStage({
  channelArn,
  playbackToken,
  baseUrl,
  onStatusChange,
  ...stage
}: Omit<WrappedStreamStageProps, 'mode' | 'excludeParticipantId' | 'getAuthToken'>) {
  const hls = useLVSLiveHls({ channelArn, playbackToken, baseUrl });
  // This is the leg that carries a mass audience, so it is the one the number
  // matters most on.
  const { viewerCount } = useLVSViewerCount({ channelArn, baseUrl, playbackToken });

  useEffect(() => {
    onStatusChange?.({ mode: 'near-realtime', live: hls.ready, error: null });
  }, [hls.ready, onStatusChange]);

  return (
    <StreamStage
      {...stage}
      live={hls.ready}
      playlistUrl={hls.playlistUrl}
      {...(viewerCount !== null ? { viewerCount } : {})}
    />
  );
}

export function WrappedStreamStage({ mode = 'near-realtime', ...props }: WrappedStreamStageProps) {
  // A branch, not a flag: the two legs have different hooks and different
  // requirements, and only one of them may run.
  return mode === 'realtime'
    ? <RealtimeStage {...props} />
    : <NearRealtimeStage {...props} />;
}

export default WrappedStreamStage;
