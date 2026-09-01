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
    className?: string;
    'data-testid'?: string;
}
export declare function PaneStatusLine({ computer, modelId, models, idleWindowMs, broadcasting, mode, className, 'data-testid': testId, }: PaneStatusLineProps): import("react").JSX.Element;
//# sourceMappingURL=PaneStatusLine.d.ts.map