import type { RealtimeClientModules } from './modules';
import { type StreamStageProps } from '../../components/video/StreamStage';
/** Which transport carries the stream. See the header for how to choose. */
export type StreamMode = 'realtime' | 'near-realtime';
export interface WrappedStreamStageProps extends Omit<StreamStageProps, 'stream' | 'playlistUrl' | 'live'> {
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
    onStatusChange?: (status: {
        mode: StreamMode;
        live: boolean;
        error: string | null;
    }) => void;
}
/** The realtime-modules functions WrappedStreamStage calls. */
export type WrappedStreamStageModules = Pick<RealtimeClientModules, 'useLVSSubscriber' | 'useLVSLiveHls' | 'useLVSViewerCount'>;
export type WrappedStreamStageComponent = (props: WrappedStreamStageProps) => React.JSX.Element;
/** Bind WrappedStreamStage to injected LVS hooks. See `createRealtimeIntegrations`. */
export declare function createWrappedStreamStage(rm: WrappedStreamStageModules): WrappedStreamStageComponent;
//# sourceMappingURL=WrappedStreamStage.d.ts.map