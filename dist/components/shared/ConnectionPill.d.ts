import type { ConnectionState } from '../../types/gateway';
import type { SurfaceTone } from './tones';
/** @see SurfaceTone — which colour family the pill paints in. */
export type ConnectionPillTone = SurfaceTone;
export interface ConnectionPillProps {
    state: ConnectionState;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette.
     *
     * A wrapper `className` cannot substitute: the label and dot colours come
     * from the per-state map below, on children the caller never sees.
     */
    tone?: ConnectionPillTone;
    /** Dot-only rendering — no label text. Default false. */
    compact?: boolean;
    /** Render the text label next to the dot. Default true. Set false for dot-only. */
    withLabel?: boolean;
    /** Override label text per state (e.g. localized strings). */
    labels?: Partial<Record<ConnectionState, string>>;
    className?: string;
    'data-testid'?: string;
}
export declare function ConnectionPill({ state, tone, compact, withLabel, labels, className, 'data-testid': testId, }: ConnectionPillProps): import("react").JSX.Element;
export default ConnectionPill;
//# sourceMappingURL=ConnectionPill.d.ts.map