// RealtimeCapabilityProvider bound to the canonical `@connorhoehn/realtime-modules`
// install. Everything else here is scope-agnostic and lives in
// ../realtime/capabilities — including the context, so a provider from either
// entry feeds CapabilityGate / useRealtimeCapabilities from either entry.
import * as client from '@connorhoehn/realtime-modules/client';
import { createRealtimeCapabilityProvider } from '../realtime/capabilities';

export {
  CapabilityGate,
  useRealtimeCapabilities,
  ALL_REALTIME_CAPABILITIES,
  DEFAULT_REALTIME_CAPABILITIES,
} from '../realtime/capabilities';
export type {
  RealtimeCapabilitySet,
  RealtimeCapabilityName,
  ResolvedCapabilities,
  RealtimeCapabilityProviderProps,
  CapabilityGateProps,
} from '../realtime/capabilities';

export const RealtimeCapabilityProvider = createRealtimeCapabilityProvider(client);
