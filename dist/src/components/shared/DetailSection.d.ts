import type { ReactNode } from 'react';
export interface DetailSectionProps {
    title: string;
    /** Quiet qualifier beside the title — a count, a state, a caveat. */
    hint?: ReactNode;
    /** Right-aligned affordance for this section only. */
    actions?: ReactNode;
    /** Suppress the leading rule. Use on the first section of a surface. */
    first?: boolean;
    /**
     * `label` (default): a small uppercase caption under a hairline, for a
     * drawer or side panel. `heading` (since 2.386.15): a 16px sentence-case
     * heading with no rule, for a document-like body (a work item's Brief); its
     * `actions` stay quiet until the section is hovered or focused (always shown
     * where there is no hover).
     */
    variant?: 'label' | 'heading';
    /**
     * `heading` only. `md` (default) is the 16px heading. `lg` (since 2.390.0)
     * is a page's section heading — 19px semibold on a 28px row, sentence case
     * ("What needs attention", "Plan next", "Why this matters").
     */
    size?: 'md' | 'lg';
    /**
     * `heading` only: one line under the heading, before the content — what
     * the section is for ("Add enough detail for an engineer or agent to know
     * what success looks like."). Since 2.390.0.
     */
    description?: ReactNode;
    children: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function DetailSection({ title, hint, actions, first, variant, size, description, children, className, 'data-testid': testId, }: DetailSectionProps): import("react").JSX.Element;
export default DetailSection;
//# sourceMappingURL=DetailSection.d.ts.map