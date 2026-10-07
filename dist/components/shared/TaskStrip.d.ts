import type { ReactNode } from 'react';
/** Where an agent task is. Shared by `TaskStrip` and `AgentTaskCard`. */
export type AgentTaskStatus = 'queued' | 'running' | 'paused' | 'awaiting' | 'done' | 'failed' | 'stopped';
/** The words for each status, as the strip and the card print them. */
export declare const AGENT_TASK_STATUS_LABELS: Record<AgentTaskStatus, string>;
/** Dot colour per status. `running` pulses unless the reader asked for less motion. */
export declare const AGENT_TASK_STATUS_DOT: Record<AgentTaskStatus, string>;
export interface TaskStripProps {
    /** What the task is — "Creating release-readiness deck". */
    label: string;
    status: AgentTaskStatus;
    /** What it is doing now — "Editing slide 4". Replaces the status word when given. */
    phase?: string;
    /**
     * A REAL completion percentage from the run, 0–100. Omit when the source
     * does not report one; the strip then shows no bar rather than a guess.
     */
    percent?: number;
    /** Leading glyph. Defaults to a status dot. */
    icon?: ReactNode;
    onPause?: () => void;
    onResume?: () => void;
    onStop?: () => void;
    /** "Open run" — jump to the run's full view. */
    onOpen?: () => void;
    /** Hide the strip. The task keeps running. */
    onDismiss?: () => void;
    className?: string;
    'data-testid'?: string;
}
/** A percentage the strip is willing to print: finite, clamped, rounded. */
export declare function taskPercent(percent: number | undefined): number | null;
export declare function TaskStrip({ label, status, phase, percent, icon, onPause, onResume, onStop, onOpen, onDismiss, className, 'data-testid': testId, }: TaskStripProps): import("react").JSX.Element;
export default TaskStrip;
//# sourceMappingURL=TaskStrip.d.ts.map