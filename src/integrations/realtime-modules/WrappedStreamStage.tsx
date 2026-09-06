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

import { useMemo } from 'react';
import {
  useLVSSubscriber,
  useLVSLiveHls,
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
  onStatusChange?: (status: { mode: StreamMode; live: boolean; error: string | null }) => void;
}

export function WrappedStreamStage({
  channelArn,
  mode = 'near-realtime',
  playbackToken = null,
  baseUrl,
  excludeParticipantId,
  getAuthToken,
  onStatusChange,
  ...stage
}: WrappedStreamStageProps) {
  const realtime = mode === 'realtime';

  // Both hooks run unconditionally — hooks cannot be called conditionally, and
  // each is inert when its inputs are null. The WHEP subscriber does not
  // connect without a channel, and the HLS composer is a pure URL builder.
  const sub = useLVSSubscriber({
    channelArn: realtime && channelArn ? channelArn : '',
    autoStart: realtime && !!channelArn,
    excludeParticipantId,
    baseUrl,
    getAuthToken,
  });

  const hls = useLVSLiveHls({
    channelArn: realtime ? null : channelArn,
    playbackToken,
    baseUrl,
  });

  const live = realtime ? sub.phase === 'live' : hls.ready;
  const error = realtime ? sub.error : null;

  useMemo(() => {
    onStatusChange?.({ mode, live, error });
    // Reporting is a side effect of the values, not of the callback identity —
    // a host passing an inline arrow must not re-fire this every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, live, error]);

  return (
    <StreamStage
      {...stage}
      live={live}
      stream={realtime ? sub.stream : null}
      playlistUrl={realtime ? null : hls.playlistUrl}
    />
  );
}

export default WrappedStreamStage;
