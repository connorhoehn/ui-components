// src/integrations/realtime/modules.ts
//
// The realtime-modules functions this integration layer calls, as an injected
// bag instead of top-level imports.
//
// Why injection: `integrations/realtime-modules` imports the library by its
// canonical name (`@connorhoehn/realtime-modules/...`). A consumer that installs
// the same library under another scope (e.g. `@connorhoehn/realtime-modules`)
// cannot resolve that specifier, so the whole entry failed to load — even for
// pages that only wanted a pure adapter. This entry never imports the library at
// runtime; the app hands over the functions from whatever scope it installed.
//
// Every type below is `import type` — it erases at build time, so nothing here
// resolves `@connorhoehn/realtime-modules` at runtime. (packaging test:
// src/integrations/realtime/__tests__/scopeAgnosticPackaging.test.ts)

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
