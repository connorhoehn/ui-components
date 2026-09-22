// RippleGridBackground — a grid that breathes, for a canvas that should not
// look like graph paper.
//
// A knock-off of ReactBits' `RippleGrid`, ported off `ogl` onto raw WebGL for
// the same reason as `ParticlesBackground`: the shader is the whole component,
// and a renderer graph is not worth taking on to draw one full-screen triangle.
// The fragment shader below is ReactBits', unchanged — the ripple, the mouse
// wave, the glow, the vignette and the light-mode inversion all behave exactly
// as theirs do.
//
// WHAT IT LOOKS LIKE at the activity preset: a near-white ground with pale grey
// lines about 14 cells across, the whole lattice rippling outward from the
// centre at a walking pace and bending slightly toward the pointer, fading off
// at the edges. At a glance it reads as a surface with a texture rather than as
// a graphic — which is the requirement, because nodes and edges are drawn on
// top of it and they are what anyone is actually looking at.

import { useEffect, useMemo, useRef } from 'react';
import { cn } from '../../lib/cn';
import { createArrayBuffer, compileProgram, useWebGLCanvas, type WebGLContextLike } from '../../hooks/useWebGLCanvas';

/** Two triangles' worth of coverage in three vertices — no index buffer, no waste. */
const FULLSCREEN_TRIANGLE = new Float32Array([-1, -1, 3, -1, -1, 3]);

const VERTEX_SHADER = `precision highp float;

attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

/** ReactBits' fragment shader, verbatim. */
const FRAGMENT_SHADER = `precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform bool enableRainbow;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform float gridRotation;
uniform bool mouseInteraction;
uniform vec2 mousePosition;
uniform float mouseInfluence;
uniform float mouseInteractionRadius;
uniform bool lightMode;
varying vec2 vUv;

float pi = 3.141592;

mat2 rotate(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= iResolution.x / iResolution.y;

  if (gridRotation != 0.0) {
    uv = rotate(gridRotation * pi / 180.0) * uv;
  }

  float dist = length(uv);
  float func = sin(pi * (iTime - dist));
  vec2 rippleUv = uv + uv * func * rippleIntensity;

  if (mouseInteraction && mouseInfluence > 0.0) {
    vec2 mouseUv = (mousePosition * 2.0 - 1.0);
    mouseUv.x *= iResolution.x / iResolution.y;
    float mouseDist = length(uv - mouseUv);

    float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));

    float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
    rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
  }

  vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
  vec2 b = abs(a);

  float aaWidth = 0.5;
  vec2 smoothB = vec2(
    smoothstep(0.0, aaWidth, b.x),
    smoothstep(0.0, aaWidth, b.y)
  );

  vec3 color = vec3(0.0);
  color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
  color += exp(-gridThickness * smoothB.y);
  color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
  color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

  if (glowIntensity > 0.0) {
    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
  }

  float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));

  vec2 vignetteCoords = vUv - 0.5;
  float vignetteDistance = length(vignetteCoords);
  float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
  vignette = clamp(vignette, 0.0, 1.0);

  vec3 t;
  if (enableRainbow) {
    t = vec3(
      uv.x * 0.5 + 0.5 * sin(iTime),
      uv.y * 0.5 + 0.5 * cos(iTime),
      pow(cos(iTime), 4.0)
    ) + 0.5;
  } else {
    t = gridColor;
  }

  float finalFade = ddd * vignette;
  float alpha = length(color) * finalFade * opacity;
  vec3 effect = color * t * finalFade * opacity;
  if (lightMode) {
    float peak = max(effect.r, max(effect.g, effect.b));
    vec3 chroma = pow(clamp(effect / max(peak, 0.0001), 0.0, 1.0), vec3(1.2));
    gl_FragColor = vec4(mix(vec3(1.0), chroma, clamp(alpha * 0.94, 0.0, 0.94)), 1.0);
  } else {
    gl_FragColor = vec4(effect, alpha);
  }
}`;

function hexToRgb(hex: string): [number, number, number] {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!match) return [1, 1, 1];
  return [
    Number.parseInt(match[1]!, 16) / 255,
    Number.parseInt(match[2]!, 16) / 255,
    Number.parseInt(match[3]!, 16) / 255,
  ];
}

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
 */
export const ACTIVITY_RIPPLE_GRID: RippleGridBackgroundProps = {
  lightMode: true,
  gridColor: '#c9ccd6',
  rippleIntensity: 0.03,
  gridSize: 14,
  opacity: 0.8,
  vignetteStrength: 1.2,
  mouseInteraction: true,
};

interface Scene {
  program: WebGLProgram;
  buffer: WebGLBuffer;
  position: number;
  uniforms: Record<string, WebGLUniformLocation | null>;
}

/** How fast the pointer position and the mouse influence chase their targets, per frame. */
const POSITION_LERP = 0.1;
const INFLUENCE_LERP = 0.05;

export function RippleGridBackground({
  active = true,
  enableRainbow = false,
  gridColor = '#ffffff',
  rippleIntensity = 0.05,
  gridSize = 10,
  gridThickness = 15,
  fadeDistance = 1.5,
  vignetteStrength = 2,
  glowIntensity = 0.1,
  opacity = 1,
  gridRotation = 0,
  mouseInteraction = true,
  mouseInteractionRadius = 1,
  lightMode = false,
  pixelRatio,
  className,
  'data-testid': testId = 'ripple-grid-background',
}: RippleGridBackgroundProps) {
  const rgb = useMemo(() => hexToRgb(gridColor), [gridColor]);
  const live = useRef({
    enableRainbow, rgb, rippleIntensity, gridSize, gridThickness, fadeDistance,
    vignetteStrength, glowIntensity, opacity, gridRotation, mouseInteraction,
    mouseInteractionRadius, lightMode,
  });
  live.current = {
    enableRainbow, rgb, rippleIntensity, gridSize, gridThickness, fadeDistance,
    vignetteStrength, glowIntensity, opacity, gridRotation, mouseInteraction,
    mouseInteractionRadius, lightMode,
  };

  // Smoothed pointer. The raw position would make the wave snap from cell to
  // cell; the lerp is what makes it feel like water rather than a cursor trail.
  const pointer = useRef({ x: 0.5, y: 0.5 });
  const target = useRef({ x: 0.5, y: 0.5 });
  const influence = useRef(0);
  const influenceTarget = useRef(0);

  // What a parked frame would render differently. `iTime` and the smoothed
  // pointer are absent: both only matter while the loop is running.
  const version = [
    enableRainbow ? 1 : 0, gridColor, rippleIntensity, gridSize, gridThickness, fadeDistance,
    vignetteStrength, glowIntensity, opacity, gridRotation, mouseInteractionRadius, lightMode ? 1 : 0,
  ].join(':');

  const { hostRef, canvasRef, status, reducedMotion } = useWebGLCanvas<Scene>({
    active,
    version,
    ...(pixelRatio === undefined ? {} : { pixelRatio }),
    setup: (gl: WebGLContextLike): Scene | null => {
      const program = compileProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
      if (!program) return null;
      const buffer = createArrayBuffer(gl, FULLSCREEN_TRIANGLE);
      if (!buffer) return null;
      const names = [
        'iTime', 'iResolution', 'enableRainbow', 'gridColor', 'rippleIntensity', 'gridSize',
        'gridThickness', 'fadeDistance', 'vignetteStrength', 'glowIntensity', 'opacity',
        'gridRotation', 'mouseInteraction', 'mousePosition', 'mouseInfluence',
        'mouseInteractionRadius', 'lightMode',
      ];
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      for (const name of names) uniforms[name] = gl.getUniformLocation(program, name);
      return { program, buffer, position: gl.getAttribLocation(program, 'position'), uniforms };
    },
    draw: (scene, frame) => {
      const p = live.current;
      const { gl, width, height, time } = frame;

      pointer.current.x += (target.current.x - pointer.current.x) * POSITION_LERP;
      pointer.current.y += (target.current.y - pointer.current.y) * POSITION_LERP;
      influence.current += (influenceTarget.current - influence.current) * INFLUENCE_LERP;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(scene.program);

      if (scene.position >= 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, scene.buffer);
        gl.enableVertexAttribArray(scene.position);
        gl.vertexAttribPointer(scene.position, 2, gl.FLOAT, false, 0, 0);
      }

      const u = scene.uniforms;
      gl.uniform1f(u.iTime, time * 0.001);
      gl.uniform2f(u.iResolution, width, height);
      gl.uniform1i(u.enableRainbow, p.enableRainbow ? 1 : 0);
      gl.uniform3f(u.gridColor, p.rgb[0], p.rgb[1], p.rgb[2]);
      // Reduced motion flattens the wave to nothing rather than freezing it
      // mid-swell: a grid stopped halfway through a ripple looks warped, which
      // is worse than no ripple at all.
      gl.uniform1f(u.rippleIntensity, reducedMotion ? 0 : p.rippleIntensity);
      gl.uniform1f(u.gridSize, p.gridSize);
      gl.uniform1f(u.gridThickness, p.gridThickness);
      gl.uniform1f(u.fadeDistance, p.fadeDistance);
      gl.uniform1f(u.vignetteStrength, p.vignetteStrength);
      gl.uniform1f(u.glowIntensity, p.glowIntensity);
      gl.uniform1f(u.opacity, p.opacity);
      gl.uniform1f(u.gridRotation, p.gridRotation);
      gl.uniform1i(u.mouseInteraction, p.mouseInteraction && !reducedMotion ? 1 : 0);
      gl.uniform2f(u.mousePosition, pointer.current.x, pointer.current.y);
      gl.uniform1f(u.mouseInfluence, reducedMotion ? 0 : influence.current);
      gl.uniform1f(u.mouseInteractionRadius, p.mouseInteractionRadius);
      gl.uniform1i(u.lightMode, p.lightMode ? 1 : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose: (scene, gl) => {
      gl.deleteProgram(scene.program);
      gl.deleteBuffer(scene.buffer);
    },
  });

  // Window-level, for the same reason as the particle field: this canvas is
  // `pointer-events: none` under a graph that needs every one of them.
  useEffect(() => {
    if (!mouseInteraction || typeof window === 'undefined') return;
    const onMove = (event: PointerEvent) => {
      const rect = hostRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) return;
      const inside =
        event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      influenceTarget.current = inside ? 1 : 0;
      if (!inside) return;
      target.current = {
        x: (event.clientX - rect.left) / rect.width,
        // Flipped: GL's origin is the bottom-left, the DOM's is the top-left.
        y: 1 - (event.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mouseInteraction, hostRef]);

  const unsupported = status === 'unsupported';

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      data-testid={testId}
      data-motion={reducedMotion ? 'static' : 'rippling'}
      data-webgl={unsupported ? 'unavailable' : 'ready'}
      className={cn('pointer-events-none overflow-hidden', className)}
    >
      {/* No fallback drawing. Without WebGL this is simply absent, and the
          surface underneath is the plain one it was always designed to be —
          a grid is decoration, and decoration does not get a consolation
          prize made of DOM nodes. */}
      <canvas
        ref={canvasRef}
        data-testid={`${testId}-canvas`}
        className="block h-full w-full"
        {...(unsupported ? { hidden: true } : {})}
      />
    </div>
  );
}

export default RippleGridBackground;
