import { type LogLevel } from '../../shared/LogStream';
import type { TaskStep } from '../hooks/useComputeTask';
import type { PaneKindContext } from '../lib/paneKinds';
import type { Computer } from '../types';
/** `08:08:41` — the log's own clock, local time, seconds resolution. */
export declare function clockTime(at: number): string;
/** `4:12`, `1:02:09` — elapsed time as a run clock reads it. */
export declare function elapsed(ms: number): string;
/** Severity of a step, read the way a log reader expects it. */
export declare function stepLevel(step: TaskStep): LogLevel;
/** What emitted a step — the source column and the filter's vocabulary. */
export declare function stepSource(step: TaskStep): string;
/**
 * Bytes per second over the trailing window, from the steps' own timestamps.
 *
 * Measured on the text that arrived, not guessed from a frame count: "2.4
 * KB/s" means that much log reached this pane in the last ten seconds, and a
 * stream that has gone quiet reads 0 B/s rather than its lifetime average.
 */
export declare function byteRate(steps: readonly TaskStep[], now: number, windowMs?: number): number;
export declare function formatRate(bytesPerSecond: number): string;
export interface LogsPaneProps {
    computer: Computer;
    registerPane?: PaneKindContext['registerPane'];
    className?: string;
}
export declare function LogsPane({ computer, registerPane, className }: LogsPaneProps): import("react").JSX.Element;
export interface AgentPaneProps {
    computer: Computer;
    registerPane?: PaneKindContext['registerPane'];
    className?: string;
}
/**
 * The current run's steps — everything since the last run boundary.
 *
 * A box that has run five tasks has five runs in its tail; the checklist is
 * about the one in front of you. A boundary is a dispatcher job start or a
 * `task_started` meta step, whichever came last.
 */
export declare function currentRun(steps: readonly TaskStep[]): TaskStep[];
export declare function AgentPane({ computer, registerPane, className }: AgentPaneProps): import("react").JSX.Element;
//# sourceMappingURL=WorkspacePanes.d.ts.map