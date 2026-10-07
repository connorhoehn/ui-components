import type { ReactNode, ElementType } from 'react';
/**
 * `upper` — the 11px bold uppercase panel caption (default) — the same step
 * as a rail's group heading (`RAIL_GROUP_LABEL`), so every caps label on a
 * screen is one size (10px until 2.407.14).
 * `sentence` — a 12px medium sentence-case caption at normal tracking, sized
 * and weighted to match `FormField`'s own label so it sits level with the
 * other labels in a config form.
 */
export type SectionLabelCase = 'upper' | 'sentence';
export interface SectionLabelProps {
    children: ReactNode;
    /** Letter case and weight. See `SectionLabelCase`. Default `upper`. */
    case?: SectionLabelCase;
    /**
     * The element to render. Defaults to `span` so it can sit inline beside a
     * count or a chip; pass `"div"` when the caption owns its own line.
     */
    as?: ElementType;
    className?: string;
    'data-testid'?: string;
}
export declare function SectionLabel({ children, as: As, case: textCase, className, 'data-testid': testId, }: SectionLabelProps): import("react").JSX.Element;
export default SectionLabel;
//# sourceMappingURL=SectionLabel.d.ts.map