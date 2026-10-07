import type { ReactNode } from 'react';
export type AccessNoticeTone = 'warning' | 'info' | 'danger';
export interface AccessNoticeAction {
    label: string;
    onClick?: () => void;
    /** Renders a real link instead of a button. */
    href?: string;
}
export interface AccessNoticeProps {
    tone?: AccessNoticeTone;
    title: string;
    body?: ReactNode;
    action?: AccessNoticeAction | null;
    className?: string;
    'data-testid'?: string;
}
export declare function AccessNotice({ tone, title, body, action, className, 'data-testid': testId, }: AccessNoticeProps): import("react").JSX.Element;
export default AccessNotice;
//# sourceMappingURL=AccessNotice.d.ts.map