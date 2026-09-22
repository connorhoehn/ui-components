// RisingParticles — the backdrop a surface wears while something is working.
//
// An agent shell that is thinking and an agent shell that has finished look
// identical: same dark rectangle, same last line of output. A spinner in the
// corner is the usual answer and it is a poor one — it is small, it is easy to
// miss, and it competes with the output for the one part of the screen anyone
// is looking at. What reads instantly, from across a desk and out of the
// corner of an eye, is that the SURFACE itself is alive.
//
// So this is a star field rising behind the content: four parallax layers on a
// dark radial gradient, drifting upward at 60s / 120s / 180s / 600s. Slower is
// farther. It carries no information beyond "this is working", which is
// exactly the amount of information the backdrop of a log console should
// carry, and it costs nothing to read because you never have to read it.
//
// NO 50 KB LITERAL. The reference implementation is a hand-pasted CSS file
// with thirteen hundred `box-shadow` coordinates in it. Here the fields are
// generated from `seed` by a deterministic PRNG at render, so the same seed is
// the same sky every time (a pane that re-shuffled its stars on every state
// change would flicker), two panes with different seeds are different skies,
// and the bundle carries an algorithm rather than a wall of numbers.
//
// INLINE STYLE, DELIBERATELY. The generated field and the per-layer duration
// reach CSS as custom properties on the element — `--uic-particle-shadow`,
// `--uic-particle-size`, `--uic-particle-duration`. There is no other route: a
// thirteen-hundred-point `box-shadow` cannot be a Tailwind class, and the
// library's compiled stylesheet cannot contain a value the host's own seed
// produced. Everything else about these elements is a class, and the rules
// themselves live in `styles.css` with the rest of the keyframes. The file is
// on `check-static-styles.allowlist.txt` for this reason and no other.

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/** The field is this tall, and each layer carries an `::after` copy exactly this far down, so the loop is seamless. */
const FIELD = 2560;

/** How long the backdrop takes to arrive and to leave. Matches the CSS. */
const CROSSFADE_MS = 250;

interface LayerSpec {
  id: string;
  /** Point size in px. Bigger reads as nearer. */
  size: number;
  /** Points in the field at `intensity: 'medium'`. */
  count: number;
  /** One full 2560px traverse. Slower reads as farther. */
  seconds: number;
}

const LAYERS: readonly LayerSpec[] = [
  { id: 'near', size: 1, count: 600, seconds: 60 },
  { id: 'mid', size: 2, count: 200, seconds: 120 },
  { id: 'far', size: 3, count: 100, seconds: 180 },
  { id: 'drift', size: 1, count: 400, seconds: 600 },
];

const INTENSITY_SCALE = { low: 0.35, medium: 1, high: 1.75 } as const;

export type RisingParticlesIntensity = keyof typeof INTENSITY_SCALE;

/**
 * mulberry32 — 32 bits of state, uniform enough for scattering dots and small
 * enough to read. `Math.random()` would make `seed` a lie.
 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One layer's sky, as a `box-shadow` list. `white`, never a hex — see the hex-colour guard. */
function starField(count: number, seed: number): string {
  const next = mulberry32(seed);
  const points: string[] = [];
  for (let i = 0; i < count; i += 1) {
    points.push(`${Math.round(next() * FIELD)}px ${Math.round(next() * FIELD)}px white`);
  }
  return points.join(', ');
}

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
export function RisingParticles({
  active,
  intensity = 'medium',
  seed = 1,
  className,
  children,
  'data-testid': testId = 'rising-particles',
}: RisingParticlesProps) {
  const reducedMotion = usePrefersReducedMotion();
  // Held one crossfade past deactivation so the backdrop can fade OUT. Without
  // it, unmounting on the same tick makes the sky vanish instantly, which is
  // the one moment the effect is being watched.
  const [painted, setPainted] = useState(active);

  useEffect(() => {
    if (active) {
      setPainted(true);
      return;
    }
    const timer = setTimeout(() => setPainted(false), CROSSFADE_MS);
    return () => clearTimeout(timer);
  }, [active]);

  const layers = useMemo(
    () =>
      LAYERS.map((layer, index) => ({
        ...layer,
        // Every layer gets its own stream, derived from the one seed, so the
        // four skies are independent but the whole backdrop is reproducible.
        field: starField(Math.max(1, Math.round(layer.count * INTENSITY_SCALE[intensity])), seed + index * 7919),
        points: Math.max(1, Math.round(layer.count * INTENSITY_SCALE[intensity])),
      })),
    [intensity, seed],
  );

  return (
    <div
      data-testid={testId}
      data-active={active ? 'true' : 'false'}
      className={cn('relative isolate', painted && 'overflow-hidden', className)}
    >
      {painted && (
        <div
          aria-hidden="true"
          data-testid={`${testId}-backdrop`}
          data-motion={reducedMotion ? 'static' : 'rising'}
          className={cn(
            'uic-rising-particles pointer-events-none absolute inset-0 -z-10 transition-opacity duration-[250ms]',
            active ? 'uic-rising-particles-in opacity-100' : 'opacity-0',
          )}
        >
          {layers.map((layer) => (
            <span
              key={layer.id}
              data-testid={`${testId}-layer`}
              data-layer={layer.id}
              data-points={layer.points}
              className="uic-rising-particle absolute left-0 top-0 block"
              style={{
                '--uic-particle-size': `${layer.size}px`,
                '--uic-particle-shadow': layer.field,
                // Reduced motion leaves the field exactly where it is: the sky
                // is the message, the movement is decoration.
                ...(reducedMotion ? {} : { '--uic-particle-duration': `${layer.seconds}s` }),
              } as CSSProperties}
            />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

export default RisingParticles;
