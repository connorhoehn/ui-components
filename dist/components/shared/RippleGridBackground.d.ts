export interface RippleGridBackgroundProps {
    /** False parks the loop on a static frame without tearing the context down. */
    active?: boolean;
    enableRainbow?: boolean;
    gridColor?: string;
    rippleIntensity?: number;
    gridSize?: number;
    gridThickness?: number;
    fadeDistance?: number;
    vignetteStrength?: number;
    glowIntensity?: number;
    opacity?: number;
    /**
     * How much of the edge fade (`fadeDistance` + `vignetteStrength`) to apply,
     * 0..1. At 1 (default, ReactBits' look) the grid fades to nothing at the
     * section's corners; at 0 it is drawn edge to edge at full strength. The
     * fade is measured against the SECTION — its corners are always where it
     * ends — so a wide or tall box gets the same soft edge as a square one
     * rather than an oval in the middle.
     */
    edgeFade?: number;
    /** Degrees. */
    gridRotation?: number;
    mouseInteraction?: boolean;
    mouseInteractionRadius?: number;
    /** Grid lines in `gridColor` on a light ground, rather than glowing on dark. */
    lightMode?: boolean;
    pixelRatio?: number;
    className?: string;
    'data-testid'?: string;
}
/**
 * The preset the work-activity canvas wears: grey lines on the near-white
 * surface the nodes already sit on, rippling slowly, never competing with them.
 * Exported so a host can match it on a surface of its own.
 *
 * `edgeFade` is low because this grid is the SURFACE of the section, not a
 * picture in it: it has to reach the sides of a panel that is usually much
 * wider than it is tall. What is left is a soft dimming toward the corners
 * (about a third of the way to white), enough that the box still has a
 * centre without the grid ending before the box does.
 */
export declare const ACTIVITY_RIPPLE_GRID: RippleGridBackgroundProps;
/**
 * The same grid for a DARK surface. `lightMode` paints an opaque white ground
 * — on a dark page that is a white box with a grid in it — so this variant
 * uses the additive branch instead: dim grey lines on a transparent ground,
 * and the surface underneath stays whatever the theme made it. Same cell
 * size, same ripple, same edge fade, so switching theme changes the ink and
 * nothing else.
 */
export declare const ACTIVITY_RIPPLE_GRID_DARK: RippleGridBackgroundProps;
export declare function RippleGridBackground({ active, enableRainbow, gridColor, rippleIntensity, gridSize, gridThickness, fadeDistance, vignetteStrength, glowIntensity, opacity, edgeFade, gridRotation, mouseInteraction, mouseInteractionRadius, lightMode, pixelRatio, className, 'data-testid': testId, }: RippleGridBackgroundProps): import("react").JSX.Element;
export default RippleGridBackground;
//# sourceMappingURL=RippleGridBackground.d.ts.map