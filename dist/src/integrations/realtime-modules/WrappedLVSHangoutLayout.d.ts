import { ReactNode } from 'react';
import { HangoutConnectionState } from '@connorhoehnslalom/realtime-modules/client/video';
import { HangoutMode } from '../../components/video/HangoutLayout';
/**
 * Snapshot of the wrapper's live hangout state, surfaced to the
 * consumer's `overlay` render-prop so they can render reconnecting /
 * failed / empty backdrops without subscribing to useLVSHangout
 * themselves.
 */
export interface WrappedHangoutState {
    connectionState: HangoutConnectionState;
    error: string | null;
    participantCount: number;
    remoteCount: number;
}
export interface WrappedLVSHangoutLayoutProps {
    /** Participant token from platform-api `/api/video/sessions/:id/join`.
     *  Decoded for the channel ARN claim. */
    stageToken: string;
    /** SFU-issued participant id (per-tab unique). */
    participantId: string;
    /** Display name for the local user. Falls back to participantId.slice(0,8). */
    userId?: string;
    /** Optional override for the local tile's "client id" — most consumers
     *  use the same value as participantId. Reserved for future per-device
     *  multiplexing scenarios. */
    localClientId?: string;
    /**
     * Async callback the wrapper calls when it needs a fresh stage token:
     * on initial connect, after a token-rejected close, and (optionally) on
     * a TTL-based schedule. Mirrors the SDK `getAuthToken` pattern.
     *
     * When omitted, the wrapper uses `stageToken` for the session lifetime
     * and surfaces a token-expired error via the overlay render prop.
     */
    getStageToken?: () => Promise<string>;
    /**
     * Render-prop slot rendered absolute-positioned over the tile grid.
     * Receives the wrapper's live hangout state so the consumer can render
     * reconnecting / failed / empty overlays.
     *
     * Example:
     *   overlay={({ connectionState, error, remoteCount }) => (
     *     <>
     *       {connectionState === 'reconnecting' && <YourReconnectingBanner />}
     *       {error && <YourFailedScreen error={error} />}
     *       {remoteCount === 0 && <YourEmptyBackdrop />}
     *     </>
     *   )}
     */
    overlay?: (state: WrappedHangoutState) => ReactNode;
    /** Forwarded to <HangoutLayout spotlightContent>. */
    spotlightContent?: ReactNode;
    /** Forwarded to <HangoutLayout onParticipantClick>. */
    onParticipantClick?: (participantId: string) => void;
    /** Forwarded to <HangoutLayout mode>. Default 'auto'. */
    mode?: HangoutMode;
    /** Optional active speaker driver. Default 'audio-level' (the layout
     *  computes from MediaStream audio energy). */
    activeSpeakerStrategy?: 'audio-level' | 'producer-state' | 'off';
    /** Override the local tile's display name. Default: "You". */
    localTileLabel?: string;
    /** When false, the local user does NOT appear as a tile (e.g. they
     *  only host the call). Default true (Meet-style). */
    showLocalAsTile?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function WrappedLVSHangoutLayout({ stageToken, participantId, userId, localClientId, getStageToken, overlay, spotlightContent, onParticipantClick, mode, activeSpeakerStrategy: _activeSpeakerStrategy, localTileLabel, showLocalAsTile, className, 'data-testid': testId, }: WrappedLVSHangoutLayoutProps): import("react").JSX.Element;
export default WrappedLVSHangoutLayout;
//# sourceMappingURL=WrappedLVSHangoutLayout.d.ts.map