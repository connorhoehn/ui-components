// WrappedLVSHangoutLayout bound to the canonical `@connorhoehn/realtime-modules` install.
// Implementation: ../realtime/WrappedLVSHangoutLayout (scope-agnostic, injected hook).
import * as video from '@connorhoehn/realtime-modules/client/video';
import { createWrappedLVSHangoutLayout } from '../realtime/WrappedLVSHangoutLayout';

export type { WrappedLVSHangoutLayoutProps, WrappedHangoutState } from '../realtime/WrappedLVSHangoutLayout';

export const WrappedLVSHangoutLayout = createWrappedLVSHangoutLayout(video);
export default WrappedLVSHangoutLayout;
