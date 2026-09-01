export interface ThinkingDotsProps {
    /** sm: 4px dots, md: 6px dots (default md) */
    size?: 'sm' | 'md';
    /** dot color, default var(--color-text-tertiary) */
    color?: string;
    className?: string;
}
/**
 * Animated 3-dot typing/thinking indicator.
 *
 * Uses inline `<style>` for keyframes to avoid global CSS dependency.
 */
export declare function ThinkingDots({ size, color, className }: ThinkingDotsProps): import("react").JSX.Element;
//# sourceMappingURL=ThinkingDots.d.ts.map