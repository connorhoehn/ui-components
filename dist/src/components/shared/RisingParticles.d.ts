import { type ReactNode } from 'react';
declare const INTENSITY_SCALE: {
    readonly low: 0.35;
    readonly medium: 1;
    readonly high: 1.75;
};
export type RisingParticlesIntensity = keyof typeof INTENSITY_SCALE;
export interface RisingParticlesProps {
    /** True while the thing behind this surface is working. */
    active: boolean;
    /**
     * How dense the sky is. `low` for a small pane where a full field reads as
     * noise; `high` for a surface that IS the working state.
     */
    intensity?: RisingParticlesIntensity;
    /**
     * The sky. The same seed is always the same sky, so a pane keeps its own
     * stars across re-renders and two panes side by side do not look cloned.
     */
    seed?: number;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}
/**
 * Renders `children` over a rising star field while `active`, and over nothing
 * at all when not.
 *
 * The backdrop is `pointer-events: none` and sits BEHIND the children in an
 * isolated stacking context, so nothing above it changes position, size or
 * hit-testing when the state flips — a working surface and an idle one have
 * identical layout, which is what makes the transition a crossfade rather than
 * a reflow.
 */
export declare function RisingParticles({ active, intensity, seed, className, children, 'data-testid': testId, }: RisingParticlesProps): import("react").JSX.Element;
export default RisingParticles;
//# sourceMappingURL=RisingParticles.d.ts.map