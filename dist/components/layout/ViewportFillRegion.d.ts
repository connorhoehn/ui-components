export interface ViewportFillRegionProps {
    /** Space to leave between the region's bottom edge and the window bottom. */
    bottomGap?: number;
    /** Floor for the computed height, so the region never collapses. */
    minHeight?: number;
    className?: string;
    children: React.ReactNode;
    'data-testid'?: string;
}
/**
 * Height the region should take: everything from its own top edge down to
 * the bottom of the window, minus `bottomGap`, never below `minHeight`.
 * Exported for testing — the arithmetic is the whole component.
 */
export declare function fillHeight(offsetTop: number, viewportHeight: number, bottomGap: number, minHeight: number): number;
export declare function ViewportFillRegion({ bottomGap, minHeight, className, children, 'data-testid': testId, }: ViewportFillRegionProps): import("react").JSX.Element;
export default ViewportFillRegion;
//# sourceMappingURL=ViewportFillRegion.d.ts.map