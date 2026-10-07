export interface OutcomeSectionProps {
    title?: string;
    value: string | null;
    onChange?: (v: string) => void;
    placeholder?: string;
    readOnlyReason?: string;
    pending?: boolean;
    /** Suppress DetailSection's leading rule. */
    first?: boolean;
    /**
     * `heading` (default since 2.386.15): a 16px sentence-case heading, 14px
     * body, affordances quiet until hover — a work item's Brief. `label`: the
     * small uppercase caption under a hairline, for a side panel.
     */
    variant?: 'label' | 'heading';
    /**
     * `heading` only: `lg` (since 2.390.0) is `DetailSection size="lg"` — a
     * 19px heading ("Why this matters") over a 15px body.
     */
    size?: 'md' | 'lg';
    className?: string;
    'data-testid'?: string;
}
export declare function OutcomeSection({ title, value, onChange, placeholder, readOnlyReason, pending, first, variant, size, className, 'data-testid': testId, }: OutcomeSectionProps): import("react").JSX.Element;
export default OutcomeSection;
//# sourceMappingURL=OutcomeSection.d.ts.map