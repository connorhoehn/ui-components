// WrappedStreamStage bound to the canonical `@connorhoehn/realtime-modules` install.
// Implementation: ../realtime/WrappedStreamStage (scope-agnostic, injected hooks).
import * as video from '@connorhoehn/realtime-modules/client/video';
import { createWrappedStreamStage } from '../realtime/WrappedStreamStage';

export type { WrappedStreamStageProps, StreamMode } from '../realtime/WrappedStreamStage';

export const WrappedStreamStage = createWrappedStreamStage(video);
export default WrappedStreamStage;
