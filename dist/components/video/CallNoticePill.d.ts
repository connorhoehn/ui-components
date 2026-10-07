import type { ReactNode } from 'react';
export interface CallNoticePillProps {
    show: boolean;
    tone?: 'warning' | 'error' | 'info';
    /** The one sentence. */
    message: ReactNode;
    /** Small buttons, rendered inline after the message. */
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function CallNoticePill({ show, tone, message, actions, className, 'data-testid': testId }: CallNoticePillProps): import("react").JSX.Element | null;
export default CallNoticePill;
//# sourceMappingURL=CallNoticePill.d.ts.map