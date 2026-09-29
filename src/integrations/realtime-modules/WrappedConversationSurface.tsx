// conversationFeaturesFor bound to the canonical `@connorhoehn/realtime-modules`
// install. The component itself is pure and lives in ../realtime/WrappedConversationSurface.
import * as call from '@connorhoehn/realtime-modules/call';
import { createConversationFeaturesFor } from '../realtime/WrappedConversationSurface';

export {
  WrappedConversationSurface,
  capabilityNamesFor,
  CONVERSATION_CAPABILITY_NAMES,
} from '../realtime/WrappedConversationSurface';
export type {
  WrappedConversationSurfaceProps,
  RMCapabilityMap,
  UngatedConversationFeature,
  GatedConversationFeature,
  ConversationFeaturesForOptions,
} from '../realtime/WrappedConversationSurface';
export { default } from '../realtime/WrappedConversationSurface';

/** Which features a conversation is capable of — see ../realtime/WrappedConversationSurface. */
export const conversationFeaturesFor = createConversationFeaturesFor(call);
