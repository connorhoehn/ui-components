import type { ReactNode } from 'react';
export interface SignoffEntry {
    name: string;
    /** e.g. 'owner', 'sme', 'org-leader' — shown as the chip's title. */
    role?: string;
    decision: 'approve' | 'reject';
    timeLabel?: string;
}
export interface SignoffPanelProps {
    signoffs: SignoffEntry[];
    /** Approvals needed to ratify. Default 2. */
    required?: number;
    /** Approve/Reject buttons etc. — render only for viewers who may act. */
    actions?: ReactNode;
    emptyHint?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function SignoffPanel({ signoffs, required, actions, emptyHint, className, 'data-testid': testId, }: SignoffPanelProps): import("react").JSX.Element;
export default SignoffPanel;
//# sourceMappingURL=SignoffPanel.d.ts.map