// ParticlesBackground — the star field an agent surface wears while it works.
//
// A knock-off of ReactBits' `Particles` background, ported off `ogl` onto raw
// WebGL. The port is deliberate and it is not about bundle size: `ogl` is a
// whole renderer/camera/mesh graph pulled in to draw ONE point cloud, and this
// library already refuses to take a rendering dependency for a decoration. The
// shaders below are ReactBits' shaders — same drift, same soft-edged point,
// same colour wobble — because the look is the point. What changed is
// everything around them: matrices computed here, the lifecycle handed to
// `useWebGLCanvas`, and a CSS star field (`RisingParticles`) underneath for the
// machines and the people that cannot have the GL one.
//
// WHAT IT LOOKS LIKE at the defaults: a couple of hundred white points scattered
// through a sphere of depth, each one breathing along its own sine, the whole
// cloud turning slowly, over a near-black radial gradient that is lightest at
// the bottom. Not a screensaver — the motion is slow enough to read a log
// against, which is the only reason it can sit behind one.
//
// Like `RisingParticles`, this says exactly one thing — "this surface is
// working" — and it says it with the surface itself rather than a corner
// spinner, because a spinner is small and the surface is not.

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { createArrayBuffer, compileProgram, useWebGLCanvas, type WebGLContextLike } from '../../hooks/useWebGLCanvas';
import { RisingParticles, type RisingParticlesIntensity } from './RisingParticles';

/** How long the backdrop takes to arrive and to leave. Matches `RisingParticles` and the CSS. */
const CROSSFADE_MS = 250;

const DEFAULT_COLORS = ['#ffffff', '#ffffff', '#ffffff'] as const;

/**
 * The agent surfaces' sky: white through the two indigos `--color-primary`
 * wears at night. One constant, used by the lab shell, the compute pane and the
 * chat console, so a loop looks like itself wherever it is showing.
 */
export const AGENT_PARTICLE_COLORS = ['#ffffff', '#c7d2fe', '#a5b4fc'] as const;

/**
 * ReactBits' vertex shader, verbatim but for the added precision qualifier
 * (WebGL1 on some Android drivers does not guarantee highp in a vertex shader
 * without it). GLSL ES 1.00, which both WebGL2 and WebGL1 accept, so one source
 * covers the fallback path.
 */
const VERTEX_SHADER = `precision highp float;

attribute vec3 position;
attribute vec4 random;
attribute vec3 color;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSpread;
uniform float uBaseSize;
uniform float uSizeRandomness;

varying vec4 vRandom;
varying vec3 vColor;

void main() {
  vRandom = random;
  vColor = color;

  vec3 pos = position * uSpread;
  pos.z *= 10.0;

  vec4 mPos = modelMatrix * vec4(pos, 1.0);
  float t = uTime;
  mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
  mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
  mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

  vec4 mvPos = viewMatrix * mPos;

  if (uSizeRandomness == 0.0) {
    gl_PointSize = uBaseSize;
  } else {
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
  }

  gl_Position = projectionMatrix * mvPos;
}`;

/**
 * ReactBits' fragment shader, verbatim. `uAlphaParticles` picks between a hard
 * disc (discard outside the radius) and a soft one (`smoothstep` alpha); both
 * add a slow sine wobble to the colour so a field of identical white points
 * does not read as dead pixels.
 */
const FRAGMENT_SHADER = `precision highp float;

uniform float uTime;
uniform float uAlphaParticles;
varying vec4 vRandom;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord.xy;
  float d = length(uv - vec2(0.5));

  if (uAlphaParticles < 0.5) {
    if (d > 0.5) {
      discard;
    }
    gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
  } else {
    float circle = smoothstep(0.5, 0.4, d) * 0.8;
    gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
  }
}`;

/** `#rgb` and `#rrggbb` → 0..1 triple. An unparseable colour is white, never a crash. */
function hexToRgb(hex: string): [number, number, number] {
  let value = hex.replace(/^#/, '');
  if (value.length === 3) value = value.split('').map((c) => c + c).join('');
  const int = Number.parseInt(value.slice(0, 6), 16);
  if (!Number.isFinite(int)) return [1, 1, 1];
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

// ── Matrices ───────────────────────────────────────────────────────────────
// Column-major, the order GL wants them. Four small functions instead of a
// matrix library, because this is the entire amount of linear algebra a point
// cloud in front of a fixed camera needs.

function perspective(fovDegrees: number, aspect: number, near: number, far: number): Float32Array {
  const f = 1 / Math.tan((fovDegrees * Math.PI) / 360);
  const range = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * range, -1,
    0, 0, 2 * far * near * range, 0,
  ]);
}

function multiply(a: Float32Array, b: Float32Array): Float32Array {
  const out = new Float32Array(16);
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      let sum = 0;
      for (let k = 0; k < 4; k += 1) sum += a[k * 4 + row]! * b[column * 4 + k]!;
      out[column * 4 + row] = sum;
    }
  }
  return out;
}

/** Translation · Rz · Ry · Rx. The rotations here are fractions of a radian, so the order is not observable. */
function modelMatrix(x: number, y: number, rx: number, ry: number, rz: number): Float32Array {
  const translation = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, 0, 1]);
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const cz = Math.cos(rz), sz = Math.sin(rz);
  const rotX = new Float32Array([1, 0, 0, 0, 0, cx, sx, 0, 0, -sx, cx, 0, 0, 0, 0, 1]);
  const rotY = new Float32Array([cy, 0, -sy, 0, 0, 1, 0, 0, sy, 0, cy, 0, 0, 0, 0, 1]);
  const rotZ = new Float32Array([cz, sz, 0, 0, -sz, cz, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  return multiply(translation, multiply(rotZ, multiply(rotY, rotX)));
}

/** The camera sits on +z looking back at the origin, so the view is one translation. */
function viewMatrix(distance: number): Float32Array {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -distance, 1]);
}

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
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

interface Scene {
  program: WebGLProgram;
  buffers: { position: WebGLBuffer; random: WebGLBuffer; color: WebGLBuffer };
  attributes: { position: number; random: number; color: number };
  uniforms: Record<string, WebGLUniformLocation | null>;
  count: number;
}

/**
 * Renders `children` over a drifting point cloud while `active`.
 *
 * The canvas is `pointer-events: none` and sits behind the children in an
 * isolated stacking context; nothing above it moves, resizes or changes
 * hit-testing when the state flips.
 */
export function ParticlesBackground({
  active = true,
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio,
  seed = 1,
  fallbackIntensity = 'medium',
  className,
  children,
  'data-testid': testId = 'particles-background',
}: ParticlesBackgroundProps) {
  // Held one crossfade past deactivation so the backdrop can fade OUT. Without
  // it the field vanishes on the same tick it stops, which is the one moment
  // anybody is watching it.
  const [painted, setPainted] = useState(active);
  useEffect(() => {
    if (active) {
      setPainted(true);
      return;
    }
    const timer = setTimeout(() => setPainted(false), CROSSFADE_MS);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div
      data-testid={testId}
      data-active={active ? 'true' : 'false'}
      className={cn('relative isolate', painted && 'uic-particles-ground overflow-hidden', className)}
    >
      {painted && (
        <ParticleField
          // The point cloud is uploaded to the GPU once, at setup, so a change
          // of COUNT or PALETTE is a new cloud rather than a new uniform: keyed
          // here so React rebuilds the field instead of leaving it silently
          // drawing the old number of points. Every other prop is a uniform and
          // costs nothing per frame.
          key={`${Math.max(1, Math.round(particleCount))}|${(particleColors?.length ? particleColors : DEFAULT_COLORS).join(',')}`}
          active={active}
          particleCount={particleCount}
          particleSpread={particleSpread}
          speed={speed}
          particleColors={particleColors}
          moveParticlesOnHover={moveParticlesOnHover}
          particleHoverFactor={particleHoverFactor}
          alphaParticles={alphaParticles}
          particleBaseSize={particleBaseSize}
          sizeRandomness={sizeRandomness}
          cameraDistance={cameraDistance}
          disableRotation={disableRotation}
          {...(pixelRatio === undefined ? {} : { pixelRatio })}
          seed={seed}
          fallbackIntensity={fallbackIntensity}
          testId={testId}
        />
      )}
      {children}
    </div>
  );
}

type FieldProps = Required<
  Pick<
    ParticlesBackgroundProps,
    | 'active' | 'particleCount' | 'particleSpread' | 'speed' | 'moveParticlesOnHover' | 'particleHoverFactor'
    | 'alphaParticles' | 'particleBaseSize' | 'sizeRandomness' | 'cameraDistance' | 'disableRotation'
    | 'seed' | 'fallbackIntensity'
  >
> & { particleColors?: readonly string[]; pixelRatio?: number; testId: string };

/**
 * The GL half, mounted only while the backdrop is painted so an idle surface
 * holds no context at all. Split from the wrapper because the wrapper must keep
 * rendering `children` across the crossfade while this must not outlive it.
 */
function ParticleField(props: FieldProps) {
  const { testId } = props;
  const live = useRef(props);
  live.current = props;
  const pointer = useRef({ x: 0, y: 0 });
  const rotationZ = useRef(0);
  const elapsed = useRef(0);

  // The geometry is sampled once per count/palette/spread — re-sampling it on
  // every render would re-shuffle the sky under the viewer.
  const palette = (props.particleColors?.length ? props.particleColors : DEFAULT_COLORS).join(',');
  const geometry = useMemo(() => {
    const count = Math.max(1, Math.round(props.particleCount));
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const swatches = palette.split(',');
    for (let i = 0; i < count; i += 1) {
      // Rejection sampling into the unit ball, then a cube-root radius — the
      // combination is what makes the cloud evenly dense rather than clumped
      // at the centre the way naive spherical coordinates are.
      let x = 0, y = 0, z = 0, len = 0;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      colors.set(hexToRgb(swatches[Math.floor(Math.random() * swatches.length)] ?? '#ffffff'), i * 3);
    }
    return { count, positions, randoms, colors };
  }, [props.particleCount, palette]);

  const geometryRef = useRef(geometry);
  geometryRef.current = geometry;

  // Everything a parked (reduced-motion / off-screen) frame would render
  // differently. Time and rotation are absent on purpose: they only matter to a
  // frame the loop is already drawing.
  const version = [
    geometry.count, props.particleSpread, props.particleBaseSize, props.sizeRandomness,
    props.alphaParticles ? 1 : 0, props.cameraDistance, props.disableRotation ? 1 : 0,
  ].join(':');

  const { hostRef, canvasRef, status, reducedMotion } = useWebGLCanvas<Scene>({
    active: props.active,
    version,
    ...(props.pixelRatio === undefined ? {} : { pixelRatio: props.pixelRatio }),
    setup: (gl: WebGLContextLike): Scene | null => {
      const program = compileProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
      if (!program) return null;
      const { positions, randoms, colors, count } = geometryRef.current;
      const position = createArrayBuffer(gl, positions);
      const random = createArrayBuffer(gl, randoms);
      const color = createArrayBuffer(gl, colors);
      if (!position || !random || !color) return null;
      return {
        program,
        buffers: { position, random, color },
        attributes: {
          position: gl.getAttribLocation(program, 'position'),
          random: gl.getAttribLocation(program, 'random'),
          color: gl.getAttribLocation(program, 'color'),
        },
        uniforms: {
          modelMatrix: gl.getUniformLocation(program, 'modelMatrix'),
          viewMatrix: gl.getUniformLocation(program, 'viewMatrix'),
          projectionMatrix: gl.getUniformLocation(program, 'projectionMatrix'),
          uTime: gl.getUniformLocation(program, 'uTime'),
          uSpread: gl.getUniformLocation(program, 'uSpread'),
          uBaseSize: gl.getUniformLocation(program, 'uBaseSize'),
          uSizeRandomness: gl.getUniformLocation(program, 'uSizeRandomness'),
          uAlphaParticles: gl.getUniformLocation(program, 'uAlphaParticles'),
        },
        count,
      };
    },
    draw: (scene, frame) => {
      const p = live.current;
      const { gl, width, height, delta } = frame;
      elapsed.current += delta * p.speed;
      if (!p.disableRotation) rotationZ.current += 0.01 * p.speed;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(scene.program);

      const bind = (location: number, buffer: WebGLBuffer, size: number) => {
        if (location < 0) return;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
      };
      bind(scene.attributes.position, scene.buffers.position, 3);
      bind(scene.attributes.random, scene.buffers.random, 4);
      bind(scene.attributes.color, scene.buffers.color, 3);

      const dpr = Math.max(1, width / Math.max(1, hostRef.current?.clientWidth || width));
      const rotX = p.disableRotation ? 0 : Math.sin(elapsed.current * 0.0002) * 0.1;
      const rotY = p.disableRotation ? 0 : Math.cos(elapsed.current * 0.0005) * 0.15;
      const offsetX = p.moveParticlesOnHover ? -pointer.current.x * p.particleHoverFactor : 0;
      const offsetY = p.moveParticlesOnHover ? -pointer.current.y * p.particleHoverFactor : 0;

      gl.uniformMatrix4fv(scene.uniforms.projectionMatrix ?? null, false, perspective(15, width / Math.max(1, height), 0.1, 100));
      gl.uniformMatrix4fv(scene.uniforms.viewMatrix ?? null, false, viewMatrix(p.cameraDistance));
      gl.uniformMatrix4fv(scene.uniforms.modelMatrix ?? null, false, modelMatrix(offsetX, offsetY, rotX, rotY, p.disableRotation ? 0 : rotationZ.current));
      gl.uniform1f(scene.uniforms.uTime ?? null, elapsed.current * 0.001);
      gl.uniform1f(scene.uniforms.uSpread ?? null, p.particleSpread);
      gl.uniform1f(scene.uniforms.uBaseSize ?? null, p.particleBaseSize * dpr);
      gl.uniform1f(scene.uniforms.uSizeRandomness ?? null, p.sizeRandomness);
      gl.uniform1f(scene.uniforms.uAlphaParticles ?? null, p.alphaParticles ? 1 : 0);

      gl.drawArrays(gl.POINTS, 0, scene.count);
    },
    dispose: (scene, gl) => {
      gl.deleteProgram(scene.program);
      gl.deleteBuffer(scene.buffers.position);
      gl.deleteBuffer(scene.buffers.random);
      gl.deleteBuffer(scene.buffers.color);
    },
  });

  // Pointer tracking on the WINDOW rather than the element: the canvas is
  // `pointer-events: none` (it must be — there is a log and a prompt on top of
  // it), so an element listener would never fire. Containment is decided from
  // the rect instead, which also gives the enter/leave behaviour for free.
  useEffect(() => {
    if (!props.moveParticlesOnHover || typeof window === 'undefined') return;
    const onMove = (event: PointerEvent) => {
      const rect = hostRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) return;
      const inside =
        event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) {
        pointer.current = { x: 0, y: 0 };
        return;
      }
      pointer.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [props.moveParticlesOnHover, hostRef]);

  const unsupported = status === 'unsupported';

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      data-testid={`${testId}-backdrop`}
      data-motion={reducedMotion ? 'static' : 'drifting'}
      data-webgl={unsupported ? 'unavailable' : 'ready'}
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 transition-opacity duration-[250ms] motion-reduce:transition-none',
        props.active ? 'uic-particles-in opacity-100' : 'opacity-0',
      )}
    >
      <canvas
        ref={canvasRef}
        data-testid={`${testId}-canvas`}
        className="block h-full w-full"
        {...(unsupported ? { hidden: true } : {})}
      />
      {/* No WebGL — a driver blocklist, a headless browser, a lost context that
          never came back. The CSS field says the same thing with box-shadows. */}
      {unsupported && (
        <RisingParticles
          active={props.active}
          intensity={props.fallbackIntensity}
          seed={props.seed}
          className="absolute inset-0"
          data-testid={`${testId}-fallback`}
        />
      )}
    </div>
  );
}

export default ParticlesBackground;
