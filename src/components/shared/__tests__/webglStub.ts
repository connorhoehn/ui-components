// A WebGL context that exists only to be asked what it was told.
//
// jsdom ships no WebGL at all — `canvas.getContext('webgl')` returns null — so
// without this every backdrop in this library would render its CSS fallback in
// the test suite and the shaders would go to production having never been
// compiled, linked or handed a uniform by anything. That is not a hypothetical:
// a mis-typed uniform name is invisible at runtime (GL returns a null location
// and silently ignores every write to it), which is exactly the class of bug a
// test can catch and a screenshot cannot.
//
// So: a recording stub. It answers every call the two backdrops make, reports
// success for the compile and link steps, and hands out uniform locations that
// remember their own NAME — which is what lets a test assert
// `uniforms.gridSize` rather than "the fourth uniform1f call".

export interface StubUniformLocation {
  name: string;
}

export interface WebGLStub {
  /** Shader sources, in the order they were compiled. */
  shaders: { type: 'vertex' | 'fragment'; source: string }[];
  /** Last value written to each uniform, keyed by its GLSL name. */
  uniforms: Record<string, unknown>;
  /** `drawArrays` calls: [mode, first, count]. */
  draws: { mode: number; first: number; count: number }[];
  /** Attribute buffers uploaded, keyed by nothing — just the payloads, in order. */
  buffers: Float32Array[];
  linked: boolean;
  disposed: boolean;
  gl: Record<string, unknown>;
}

const CONSTANTS = {
  VERTEX_SHADER: 0x8b31,
  FRAGMENT_SHADER: 0x8b30,
  COMPILE_STATUS: 0x8b81,
  LINK_STATUS: 0x8b82,
  ARRAY_BUFFER: 0x8892,
  STATIC_DRAW: 0x88e4,
  FLOAT: 0x1406,
  POINTS: 0x0000,
  TRIANGLES: 0x0004,
  COLOR_BUFFER_BIT: 0x4000,
  DEPTH_TEST: 0x0b71,
  BLEND: 0x0be2,
  SRC_ALPHA: 0x0302,
  ONE_MINUS_SRC_ALPHA: 0x0303,
};

/** One stub context. `failCompile` exercises the "shader will not build here" path. */
export function createWebGLStub(options: { failCompile?: boolean } = {}): WebGLStub {
  const stub: WebGLStub = {
    shaders: [],
    uniforms: {},
    draws: [],
    buffers: [],
    linked: false,
    disposed: false,
    gl: {},
  };

  const sources = new Map<object, { type: number; source: string }>();
  let attribute = 0;

  const record = (location: StubUniformLocation | null, value: unknown) => {
    if (location) stub.uniforms[location.name] = value;
  };

  stub.gl = {
    ...CONSTANTS,
    canvas: null,
    createShader: (type: number) => {
      const shader = { type };
      sources.set(shader, { type, source: '' });
      return shader;
    },
    shaderSource: (shader: object, source: string) => {
      const entry = sources.get(shader);
      if (entry) entry.source = source;
    },
    compileShader: (shader: object) => {
      const entry = sources.get(shader);
      if (!entry) return;
      stub.shaders.push({ type: entry.type === CONSTANTS.VERTEX_SHADER ? 'vertex' : 'fragment', source: entry.source });
    },
    getShaderParameter: () => !options.failCompile,
    getShaderInfoLog: () => (options.failCompile ? 'stubbed compile failure' : ''),
    deleteShader: () => {},
    createProgram: () => ({ program: true }),
    attachShader: () => {},
    linkProgram: () => {
      stub.linked = !options.failCompile;
    },
    getProgramParameter: () => !options.failCompile,
    getProgramInfoLog: () => '',
    deleteProgram: () => {
      stub.disposed = true;
    },
    createBuffer: () => ({ buffer: true }),
    bindBuffer: () => {},
    bufferData: (_target: number, data: Float32Array) => {
      stub.buffers.push(data);
    },
    deleteBuffer: () => {},
    getAttribLocation: () => {
      attribute += 1;
      return attribute - 1;
    },
    getUniformLocation: (_program: object, name: string): StubUniformLocation => ({ name }),
    useProgram: () => {},
    enableVertexAttribArray: () => {},
    vertexAttribPointer: () => {},
    viewport: () => {},
    clearColor: () => {},
    clear: () => {},
    enable: () => {},
    disable: () => {},
    blendFunc: () => {},
    uniform1f: (location: StubUniformLocation | null, value: number) => record(location, value),
    uniform1i: (location: StubUniformLocation | null, value: number) => record(location, value),
    uniform2f: (location: StubUniformLocation | null, x: number, y: number) => record(location, [x, y]),
    uniform3f: (location: StubUniformLocation | null, x: number, y: number, z: number) => record(location, [x, y, z]),
    uniformMatrix4fv: (location: StubUniformLocation | null, _transpose: boolean, value: Float32Array) =>
      record(location, Array.from(value)),
    drawArrays: (mode: number, first: number, count: number) => {
      stub.draws.push({ mode, first, count });
    },
    getExtension: () => null,
  };

  return stub;
}

/**
 * Swap `HTMLCanvasElement.prototype.getContext` for one handing out stubs, and
 * return both the accessor for the most recent stub and the restore function.
 *
 * StrictMode mounts twice, so several contexts are created per test; `latest()`
 * is the one the mounted component is actually drawing with.
 */
export function installWebGLStub(options: { failCompile?: boolean; unsupported?: boolean } = {}) {
  const original = HTMLCanvasElement.prototype.getContext;
  const created: WebGLStub[] = [];
  HTMLCanvasElement.prototype.getContext = function getContext(this: HTMLCanvasElement, id: string) {
    if (id !== 'webgl2' && id !== 'webgl' && id !== 'experimental-webgl') return null;
    if (options.unsupported) return null;
    // WebGL2 only — so the WebGL1 fallback path is not silently the one under
    // test. A test that wants WebGL1 asks for it explicitly.
    if (id !== 'webgl2') return null;
    const stub = createWebGLStub(options);
    stub.gl.canvas = this;
    created.push(stub);
    return stub.gl;
  } as unknown as typeof HTMLCanvasElement.prototype.getContext;

  return {
    created,
    latest: () => created[created.length - 1],
    restore: () => {
      HTMLCanvasElement.prototype.getContext = original;
    },
  };
}

/**
 * jsdom's `matchMedia` is a no-op polyfill from `test-setup` that always reports
 * "no preference", so a test that cares about reduced motion has to install its
 * own. Call with `false` in an `afterEach` to put it back.
 */
export function setReducedMotion(reduce: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: reduce && query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

/**
 * A hand-cranked `requestAnimationFrame`.
 *
 * jsdom's own never fires, so a rAF loop under test neither runs nor can be
 * proven to have STOPPED. With this, "the queue is empty" is the assertion that
 * the loop was parked — which is the property that matters, and the one a
 * timer-based fake cannot express.
 */
export function installAnimationFrames() {
  const pending: FrameRequestCallback[] = [];
  const realRequest = globalThis.requestAnimationFrame;
  const realCancel = globalThis.cancelAnimationFrame;
  globalThis.requestAnimationFrame = ((callback: FrameRequestCallback) => {
    pending.push(callback);
    return pending.length;
  }) as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = (() => {
    pending.length = 0;
  }) as typeof cancelAnimationFrame;
  return {
    pending,
    /** Drain and invoke whatever is queued, `count` times over. */
    run: (count = 1, step = 16) => {
      for (let i = 0; i < count; i += 1) {
        for (const callback of pending.splice(0, pending.length)) callback(performance.now() + i * step);
      }
    },
    restore: () => {
      globalThis.requestAnimationFrame = realRequest;
      globalThis.cancelAnimationFrame = realCancel;
      pending.length = 0;
    },
  };
}
