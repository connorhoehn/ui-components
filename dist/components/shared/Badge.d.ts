export type BadgeVariant = 'count' | 'dot' | 'pulse';
export type BadgeColor = 'accent' | 'success' | 'danger' | 'muted';
export interface BadgeProps {
    variant: BadgeVariant;
    /** Required for variant="count". Ignored otherwise. */
    value?: number;
    color?: BadgeColor;
    /** Optional override label for screen readers. */
    'aria-label'?: string;
    className?: string;
    /** Optional testid. */
    'data-testid'?: string;
}
export declare function Badge({ variant, value, color, 'aria-label': ariaLabel, className, 'data-testid': testId, }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export default Badge;
//# sourceMappingURL=Badge.d.ts.map