import type { ReactNode } from 'react';
export interface CallInterruptedNoticeProps {
    show: boolean;
    /** Names the moment in two or three words, e.g. "Call disconnected". */
    title: ReactNode;
    /** One line: what happened, and what the actions below will do about it. */
    description: ReactNode;
    /** The buttons. Rendered in a centred row under the description. */
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function CallInterruptedNotice({ show, title, description, actions, className, 'data-testid': testId, }: CallInterruptedNoticeProps): import("react").JSX.Element | null;
export default CallInterruptedNotice;
//# sourceMappingURL=CallInterruptedNotice.d.ts.map