import { ConnectionState } from '../../types/gateway';
export interface ConnectionPillProps {
    state: ConnectionState;
    /** Dot-only rendering — no label text. Default false. */
    compact?: boolean;
    /** Render the text label next to the dot. Default true. Set false for dot-only. */
    withLabel?: boolean;
    /** Override label text per state (e.g. localized strings). */
    labels?: Partial<Record<ConnectionState, string>>;
    className?: string;
    'data-testid'?: string;
}
export declare function ConnectionPill({ state, compact, withLabel, labels, className, 'data-testid': testId, }: ConnectionPillProps): import("react").JSX.Element;
export default ConnectionPill;
//# sourceMappingURL=ConnectionPill.d.ts.map