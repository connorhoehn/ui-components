// ConversationCallDock bound to the canonical `@connorhoehn/realtime-modules` install.
// Implementation: ../realtime/ConversationCallDock (scope-agnostic, injected functions).
import * as video from '@connorhoehn/realtime-modules/client/video';
import { createConversationCallDock } from '../realtime/ConversationCallDock';

export type { ConversationCallDockProps } from '../realtime/ConversationCallDock';

export const ConversationCallDock = createConversationCallDock(video);
export default ConversationCallDock;
