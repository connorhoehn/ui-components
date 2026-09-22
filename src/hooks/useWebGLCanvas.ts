// useWebGLCanvas — the plumbing every WebGL backdrop in this library repeats.
//
// A shader background is ten lines of GLSL and two hundred lines of lifecycle,
// and the lifecycle is where they all go wrong. The failures are the same every
// time: a `requestAnimationFrame` loop that keeps burning a core after the pane
// scrolls out of view or the tab goes to the background; a canvas sized in CSS
// pixels so the whole thing is soft on a retina display; a context that is lost
// when the GPU resets and never comes back, leaving a black rectangle with no
// error anywhere; and an animation that ignores `prefers-reduced-motion`, which
// is precisely the setting an endlessly drifting field exists to respect.
//
// So the components own the shaders and nothing else. This hook owns:
//
//   * context creation, WebGL2 first and WebGL1 (and the old
//     `experimental-webgl` spelling) after it — and a plain `null` when there
//     is none, so the caller can render a CSS fallback instead of a blank box;
//   * drawing-buffer sizing from the element's measured box times the device
//     pixel ratio, re-measured through a ResizeObserver;
//   * a rAF loop that STOPS — when `active` goes false, when an
//     IntersectionObserver says the element left the viewport, and when
//     `document.hidden` says the tab did;
//   * `webglcontextlost` / `webglcontextrestored`, so a GPU reset degrades to
//     the fallback and recovers on its own rather than dying silently;
//   * `prefers-reduced-motion`, which paints exactly ONE frame and then stops.
//
// The caller passes `setup` (called once per context with the raw `gl`) and
// `draw` (called per frame with whatever `setup` returned). Both are read
// through a ref, so a component may close over its current props without
// tearing the context down and rebuilding it on every render — which is the
// other half of why these backgrounds usually stutter.

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export type WebGLContextLike = WebGLRenderingContext | WebGL2RenderingContext;

/** What `draw` is handed. Sizes are DRAWING-BUFFER pixels, times are milliseconds. */
export interface WebGLFrame {
  gl: WebGLContextLike;
  width: number;
  height: number;
  /** Milliseconds of RUNNING time. Frozen at 0 under reduced motion. */
  time: number;
  /** Milliseconds since the previous frame, clamped. 0 on a static frame. */
  delta: number;
  /** Frame counter, from 0. */
  frame: number;
}

export interface UseWebGLCanvasOptions<S> {
  /** False parks the loop without tearing the context down. Default true. */
  active?: boolean;
  /** Overrides `devicePixelRatio`. Capped at 2 either way — past it the fill cost buys nothing. */
  pixelRatio?: number;
  attributes?: WebGLContextAttributes;
  /**
   * A value the caller changes when the PARKED frame would look different — a
   * cheap signature of whatever props feed the uniforms. While the loop is
   * running this is ignored (the next tick repaints anyway); while it is parked
   * (inactive, off-screen, or reduced motion) a change repaints exactly one
   * frame. Without it a reduced-motion surface would ignore its own props after
   * the first paint.
   */
  version?: string | number;
  /** Build buffers, programs, uniform locations. Returning null means "cannot run" → fallback. */
  setup: (gl: WebGLContextLike) => S | null;
  draw: (state: S, frame: WebGLFrame) => void;
  dispose?: (state: S, gl: WebGLContextLike) => void;
}

export type WebGLCanvasStatus = 'pending' | 'ready' | 'unsupported';

export interface WebGLCanvas {
  /** Put this on the element whose measured box drives the drawing buffer. */
  hostRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  status: WebGLCanvasStatus;
  reducedMotion: boolean;
  /** Repaint one frame while the loop is parked — for a prop change under reduced motion. */
  redraw: () => void;
}

/**
 * A frame longer than this is a tab that was asleep, not a slow frame. Passing
 * the real delta through would jump the animation by however long nobody was
 * looking, which reads as a glitch at exactly the moment someone looks back.
 */
const MAX_DELTA_MS = 100;

/** Transparent, no depth buffer: these are backdrops composited over a DOM surface. */
const DEFAULT_ATTRIBUTES: WebGLContextAttributes = {
  alpha: true,
  antialias: true,
  depth: false,
  premultipliedAlpha: false,
  powerPreference: 'low-power',
};

/** Past 2 the fill cost of a full-screen shader rises with nothing visible in return. */
const MAX_PIXEL_RATIO = 2;

/**
 * WebGL2, then WebGL1, then the prefixed spelling old Safari and some Android
 * webviews still answer to. Wrapped because a browser with WebGL disabled by
 * policy THROWS from `getContext` rather than returning null.
 */
export function createWebGLContext(
  canvas: HTMLCanvasElement,
  attributes?: WebGLContextAttributes,
): WebGLContextLike | null {
  const attrs = { ...DEFAULT_ATTRIBUTES, ...attributes };
  const attempt = (id: string): WebGLContextLike | null => {
    try {
      return (canvas.getContext(id, attrs) as WebGLContextLike | null) ?? null;
    } catch {
      return null;
    }
  };
  return attempt('webgl2') ?? attempt('webgl') ?? attempt('experimental-webgl');
}

function compileShader(gl: WebGLContextLike, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // Not a throw: a shader that will not compile on this GPU is a reason to
    // render the CSS fallback, not to take the page down with it.
    if (typeof console !== 'undefined') console.warn('[ui-components] shader failed to compile:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Compile + link, returning null on any failure. Shaders are detached and
 * deleted immediately after linking — the program holds what it needs.
 */
export function compileProgram(gl: WebGLContextLike, vertex: string, fragment: string): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertex);
  const fs = vs ? compileShader(gl, gl.FRAGMENT_SHADER, fragment) : null;
  if (!vs || !fs) {
    if (vs) gl.deleteShader(vs);
    if (fs) gl.deleteShader(fs);
    return null;
  }
  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return null;
  }
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    if (typeof console !== 'undefined') console.warn('[ui-components] shader program failed to link:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

/** A static-draw Float32 array buffer, the only buffer shape these backdrops use. */
export function createArrayBuffer(gl: WebGLContextLike, data: Float32Array): WebGLBuffer | null {
  const buffer = gl.createBuffer();
  if (!buffer) return null;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

export function useWebGLCanvas<S>(options: UseWebGLCanvasOptions<S>): WebGLCanvas {
  const { active = true, pixelRatio, attributes } = options;
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [status, setStatus] = useState<WebGLCanvasStatus>('pending');
  // Bumped by `webglcontextrestored`; re-runs the whole setup effect against
  // the revived context. Nothing else touches it.
  const [generation, setGeneration] = useState(0);

  // `setup`/`draw` reach the loop through a ref so a parent re-render never
  // rebuilds the GL scene — the single most expensive mistake available here.
  const latest = useRef(options);
  latest.current = options;

  // Everything the loop consults to decide whether it should be running. Flags
  // rather than effect deps, because three independent signals (prop, viewport,
  // tab) start and stop the same loop and re-creating it per signal would drop
  // the accumulated time.
  const flags = useRef({ active, reducedMotion, visible: true, hidden: false });
  const sync = useRef<() => void>(() => {});
  const paintOnce = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = hostRef.current ?? canvas;

    const gl = createWebGLContext(canvas, latest.current.attributes);
    if (!gl) {
      setStatus('unsupported');
      return;
    }
    const state = latest.current.setup(gl);
    if (state === null || state === undefined) {
      // A context we got but cannot use — a shader the driver refuses, a buffer
      // it would not allocate. Hand it straight back rather than holding one of
      // the browser's handful of live contexts open for a canvas about to be
      // replaced by the fallback.
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      setStatus('unsupported');
      return;
    }
    setStatus('ready');

    let raf: number | null = null;
    let last = 0;
    let time = 0;
    let frame = 0;
    let dead = false;

    const resize = () => {
      const dpr = Math.min(
        latest.current.pixelRatio ?? (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1),
        MAX_PIXEL_RATIO,
      );
      // `|| 1` rather than a bail-out: jsdom measures every element at zero, and
      // a hook that refuses to draw there is a hook no test can exercise.
      const width = Math.max(1, Math.round((host.clientWidth || canvas.clientWidth || 1) * dpr));
      const height = Math.max(1, Math.round((host.clientHeight || canvas.clientHeight || 1) * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      return { width, height };
    };

    const paint = (delta: number) => {
      if (dead) return;
      const { width, height } = resize();
      gl.viewport(0, 0, width, height);
      latest.current.draw(state, { gl, width, height, time, delta, frame });
      frame += 1;
    };

    const tick = (now: number) => {
      const delta = last === 0 ? 0 : Math.min(MAX_DELTA_MS, now - last);
      last = now;
      time += delta;
      paint(delta);
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      last = 0;
    };

    // Reduced motion is a full stop, not a slow-down: the field is still drawn,
    // it simply never moves again.
    const shouldRun = () =>
      flags.current.active && !flags.current.reducedMotion && flags.current.visible && !flags.current.hidden;

    // `sync` only ever starts and stops. It does NOT paint, because three
    // independent signals call it — the `active` prop, the IntersectionObserver
    // and `visibilitychange` — and a paint inside it meant a mount drew the
    // same static frame three or four times over. The parked frame is painted
    // exactly once per render by the effect at the bottom of this hook instead.
    sync.current = () => {
      if (dead) return;
      if (shouldRun()) {
        if (raf === null) {
          last = 0;
          raf = requestAnimationFrame(tick);
        }
        return;
      }
      stop();
    };
    // One frame while the loop is parked, so a stopped canvas shows the scene
    // rather than whatever was left in the buffer. A no-op while it is running.
    paintOnce.current = () => {
      if (raf === null) paint(0);
    };

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => paintOnce.current());
    observer?.observe(host);

    const intersection =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            (entries) => {
              flags.current.visible = entries.some((entry) => entry.isIntersecting);
              sync.current();
            },
            { threshold: 0 },
          );
    intersection?.observe(host);

    const onVisibility = () => {
      flags.current.hidden = typeof document !== 'undefined' && document.hidden;
      sync.current();
    };
    document.addEventListener('visibilitychange', onVisibility);

    // preventDefault is what makes `webglcontextrestored` fire at all — without
    // it the browser treats the loss as final.
    const onLost = (event: Event) => {
      event.preventDefault();
      stop();
      dead = true;
      setStatus('unsupported');
    };
    const onRestored = () => setGeneration((value) => value + 1);
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);

    sync.current();

    return () => {
      dead = true;
      stop();
      sync.current = () => {};
      paintOnce.current = () => {};
      observer?.disconnect();
      intersection?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      latest.current.dispose?.(state, gl);
      // Hand the GPU memory back now rather than at the next GC. Under
      // StrictMode this runs for the throwaway first mount too, which is the
      // point: two live contexts per backdrop is how a page hits the browser's
      // 16-context limit.
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [generation]);

  useEffect(() => {
    flags.current.active = active;
    sync.current();
  }, [active]);

  useEffect(() => {
    flags.current.reducedMotion = reducedMotion;
    sync.current();
  }, [reducedMotion]);

  // The parked painter. Keyed on `version` rather than run after every render,
  // because a mount commits several renders (the context's own `status`, the
  // caller's crossfade state) and painting on each of them turned "renders one
  // static frame" into four. While the loop is running this is a no-op.
  useEffect(() => {
    paintOnce.current();
  }, [options.version]);

  const redraw = useCallback(() => paintOnce.current(), []);

  return { hostRef, canvasRef, status, reducedMotion, redraw };
}

export default useWebGLCanvas;
