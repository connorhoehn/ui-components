import type { Tone } from '../../shared/tones';
import type { ComputeStatus, ShellStatus } from '../types';
export interface StatusMeta {
    /** Short word for chips and dots. */
    label: string;
    /**
     * Design-system tone, for any primitive that takes one.
     *
     * Carried here so the status → colour decision is made once. It was
     * previously re-derived as a four-way ternary in the rail, the pane status
     * line and the chooser, which is three places to forget to update.
     */
    tone: Tone;
    /** A sentence an operator can act on — tooltips and empty states. */
    help: string;
    /** CSS colour for `StatusDot`, taken from the theme's tokens. */
    color: string;
    /** Animate the dot. Reserved for states that are genuinely in motion. */
    pulse: boolean;
}
export declare const COMPUTE_STATUS: Record<ComputeStatus, StatusMeta>;
export declare const SHELL_STATUS: Record<ShellStatus, StatusMeta>;
/** Normalise a possibly-absent status. The server omits it for a fresh box. */
export declare function statusOf(computer: {
    status?: ComputeStatus;
} | null | undefined): ComputeStatus;
/**
 * How close a box is to being reaped, as a 0–1 fraction, plus whether that is
 * worth drawing attention to.
 *
 * `stopsInMs` alone is a number with no scale — "stops in 4m" means nothing
 * without knowing whether the window was five minutes or an hour. The meter
 * needs a denominator, so callers pass the policy window they know about.
 */
export declare function expiryPressure(stopsInMs: number, windowMs: number): {
    fraction: number;
    urgent: boolean;
};
//# sourceMappingURL=status.d.ts.map