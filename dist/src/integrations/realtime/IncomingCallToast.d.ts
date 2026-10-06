import { type FloatingCardProps } from '../../components/layout/DockedAside';
import type { RMIncomingConversationCall } from './conversationCallTypes';
export interface IncomingCallToastProps {
    /** One of `useIncomingConversationCalls().rings` (the head of the queue). */
    ring: RMIncomingConversationCall;
    onAccept: () => void;
    onDecline: () => void;
    /** Viewport corner. Default top-right. */
    corner?: FloatingCardProps['corner'];
    /** Card width in px. Default 360. */
    width?: number;
    className?: string;
    /** Default `incoming-call-toast`; the answers are `incoming-call-accept` / `incoming-call-decline`. */
    'data-testid'?: string;
}
export declare function incomingCallTitle(ring: RMIncomingConversationCall): string;
export declare function IncomingCallToast({ ring, onAccept, onDecline, corner, width, className, 'data-testid': testId, }: IncomingCallToastProps): import("react").JSX.Element;
export default IncomingCallToast;
//# sourceMappingURL=IncomingCallToast.d.ts.map