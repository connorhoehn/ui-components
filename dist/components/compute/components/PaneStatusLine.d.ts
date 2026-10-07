import { type ReactNode } from 'react';
import type { Computer, ComputeModel } from '../types';
/**
 * Denominator for the expiry meter.
 *
 * The reaper's idle window is server policy and is not reported, so the meter
 * needs an assumed full scale. An hour matches the reference deployment; a
 * host running a different policy passes its own rather than watching every
 * box render as permanently nearly-full.
 */
export declare const DEFAULT_IDLE_WINDOW_MS: number;
/** `us.anthropic.claude-sonnet-5` is not a name anyone wants in a status line. */
export declare function shortModelName(id: string | null | undefined, models?: ComputeModel[]): string;
export interface PaneStatusLineProps {
    computer: Computer;
    /** Model this pane is set to run with, if the runtime honours per-task models. */
    modelId?: string | null;
    models?: ComputeModel[];
    /** Denominator for the expiry meter. */
    idleWindowMs?: number;
    /** True when this pane is one of the broadcast targets. */
    broadcasting?: boolean;
    /** Right-hand mode text, e.g. `resume on`. */
    mode?: string;
    /**
     * `full` (default) is the three-row status bar under a classic pane.
     * `meta` is one quiet line of the same facts — model · ctx · cost ·
     * auto-stop · mode — for the workspace lab's pane header, which carries the
     * status as a badge of its own and has no room for a meter.
     */
    variant?: 'full' | 'meta';
    /** Extra trailing fields for `meta` — an agent pane's elapsed time, say. */
    extra?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function PaneStatusLine({ computer, modelId, models, idleWindowMs, broadcasting, mode, variant, extra, className, 'data-testid': testId, }: PaneStatusLineProps): import("react").JSX.Element;
//# sourceMappingURL=PaneStatusLine.d.ts.map