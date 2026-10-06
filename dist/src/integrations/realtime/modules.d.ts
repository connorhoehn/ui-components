import type * as RMClient from '@connorhoehn/realtime-modules/client';
import type * as RMVideo from '@connorhoehn/realtime-modules/client/video';
import type * as RMHangoutRooms from '@connorhoehn/realtime-modules/client/hangout-rooms';
import type * as RMCall from '@connorhoehn/realtime-modules/call';
/**
 * Exactly the realtime-modules functions the hook-bound integrations call.
 * Spread the namespaces you installed — see `createRealtimeIntegrations`.
 */
export interface RealtimeClientModules {
    /** `/client` — RealtimeCapabilityProvider. */
    useCapabilities: typeof RMClient.useCapabilities;
    /** `/client/hangout-rooms` — HangoutRoomRow (and so HangoutRoomsSection, WrappedHangoutRoomsList). */
    useRoomOccupancy: typeof RMHangoutRooms.useRoomOccupancy;
    /** `/client/video` — WrappedLVSHangoutLayout. */
    useLVSHangout: typeof RMVideo.useLVSHangout;
    /** `/client/video` — WrappedStreamStage, realtime (WHEP) leg. */
    useLVSSubscriber: typeof RMVideo.useLVSSubscriber;
    /** `/client/video` — WrappedStreamStage, near-realtime (HLS) leg. */
    useLVSLiveHls: typeof RMVideo.useLVSLiveHls;
    /** `/client/video` — WrappedStreamStage, both legs. */
    useLVSViewerCount: typeof RMVideo.useLVSViewerCount;
    /** `/call` — conversationFeaturesFor (does this channel have a call lobby?). */
    lobbyForChannel: typeof RMCall.lobbyForChannel;
}
//# sourceMappingURL=modules.d.ts.map