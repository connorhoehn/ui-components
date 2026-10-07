import { type ReactNode } from 'react';
import { type RisingParticlesIntensity } from './RisingParticles';
/**
 * The agent surfaces' sky: white through the two indigos `--color-primary`
 * wears at night. One constant, used by the lab shell, the compute pane and the
 * chat console, so a loop looks like itself wherever it is showing.
 */
export declare const AGENT_PARTICLE_COLORS: readonly ['#ffffff', '#c7d2fe', '#a5b4fc'];
/**
 * How many of `count` particles to draw on a `width`×`height` CSS-px surface
 * at `density` per 10,000 px². Exported for the tests.
 */
export declare function drawnParticles(count: number, density: number | undefined, width: number, height: number): number;
export interface ParticlesBackgroundProps {
    /**
     * True while the thing behind this surface is working. False renders
     * `children` on the normal surface with no backdrop at all — a 250ms
     * crossfade, no layout change, so a surface that starts working and one that
     * stops are the same box.
     */
    active?: boolean;
    particleCount?: number;
    particleSpread?: number;
    speed?: number;
    particleColors?: readonly string[];
    moveParticlesOnHover?: boolean;
    particleHoverFactor?: number;
    /** Soft-edged points with gradient alpha instead of hard discs. */
    alphaParticles?: boolean;
    particleBaseSize?: number;
    sizeRandomness?: number;
    cameraDistance?: number;
    disableRotation?: boolean;
    pixelRatio?: number;
    /** Seed for the CSS fallback's star field, so a fallback pane keeps its own sky. */
    seed?: number;
    fallbackIntensity?: RisingParticlesIntensity;
    /**
     * The sky behind the field. `night` (default) is the navy-to-black ground it
     * always had; `graphite` is a neutral dark grey with the field drawn at lower
     * contrast, for a console surface sitting on a LIGHT page. Resolve `auto`
     * with `useResolvedBackdropTone` before passing it here.
     */
    tone?: 'night' | 'graphite';
    /**
     * Upper bound on how many particles are DRAWN, per 10,000 CSS px² of the
     * surface. Unset draws all of `particleCount` (the old behaviour). The cloud
     * is uploaded once and its order is random, so drawing a prefix is a uniform
     * thinning that costs nothing to change — a surface that grows or shrinks
     * never rebuilds its GL context, and a small one never pays for a big sky.
     */
    density?: number;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}
/**
 * Renders `children` over a drifting point cloud while `active`.
 *
 * The canvas is `pointer-events: none` and sits behind the children in an
 * isolated stacking context; nothing above it moves, resizes or changes
 * hit-testing when the state flips.
 */
export declare function ParticlesBackground({ active, particleCount, particleSpread, speed, particleColors, moveParticlesOnHover, particleHoverFactor, alphaParticles, particleBaseSize, sizeRandomness, cameraDistance, disableRotation, pixelRatio, seed, fallbackIntensity, tone, density, className, children, 'data-testid': testId, }: ParticlesBackgroundProps): import("react").JSX.Element;
export default ParticlesBackground;
//# sourceMappingURL=ParticlesBackground.d.ts.map