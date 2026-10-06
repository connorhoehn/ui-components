import { type RefObject } from 'react';
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
 * WebGL2, then WebGL1, then the prefixed spelling old Safari and some Android
 * webviews still answer to. Wrapped because a browser with WebGL disabled by
 * policy THROWS from `getContext` rather than returning null.
 */
export declare function createWebGLContext(canvas: HTMLCanvasElement, attributes?: WebGLContextAttributes): WebGLContextLike | null;
/**
 * Compile + link, returning null on any failure. Shaders are detached and
 * deleted immediately after linking — the program holds what it needs.
 */
export declare function compileProgram(gl: WebGLContextLike, vertex: string, fragment: string): WebGLProgram | null;
/** A static-draw Float32 array buffer, the only buffer shape these backdrops use. */
export declare function createArrayBuffer(gl: WebGLContextLike, data: Float32Array): WebGLBuffer | null;
export declare function useWebGLCanvas<S>(options: UseWebGLCanvasOptions<S>): WebGLCanvas;
export default useWebGLCanvas;
//# sourceMappingURL=useWebGLCanvas.d.ts.map