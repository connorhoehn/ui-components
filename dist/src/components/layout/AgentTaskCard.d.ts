import type { ReactNode } from 'react';
import { type AgentTaskStatus } from '../shared/TaskStrip';
export interface AgentTaskCardProps {
    /** "Build risk outlook slide". */
    title: string;
    status: AgentTaskStatus;
    /** Overrides the status pill's word ("Editing slide 4" stays in `phase`). */
    statusLabel?: string;
    /** The request, or what the agent is working from. */
    description?: ReactNode;
    /** What it is doing now — "Editing slide 4". */
    phase?: string;
    /** A REAL percentage, 0–100. Omit when the run reports none: no bar is drawn. */
    percent?: number;
    /** "Started 2m ago" — the host formats it, since it owns the clock. */
    startedLabel?: string;
    /** Buttons under the card body — Open run, Pause, Stop. */
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function AgentTaskCard({ title, status, statusLabel, description, phase, percent, startedLabel, actions, className, 'data-testid': testId, }: AgentTaskCardProps): import("react").JSX.Element;
export default AgentTaskCard;
//# sourceMappingURL=AgentTaskCard.d.ts.map