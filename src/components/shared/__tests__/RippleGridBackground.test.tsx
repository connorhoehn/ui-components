import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ACTIVITY_RIPPLE_GRID, RippleGridBackground } from '../RippleGridBackground';
import { installAnimationFrames, installWebGLStub, setReducedMotion, type WebGLStub } from './webglStub';

let webgl: ReturnType<typeof installWebGLStub> | null = null;
let frames: ReturnType<typeof installAnimationFrames>;

beforeEach(() => {
  setReducedMotion(false);
  frames = installAnimationFrames();
});

afterEach(() => {
  cleanup();
  webgl?.restore();
  webgl = null;
  frames.restore();
  setReducedMotion(false);
});

const advanceFrames = (count: number) => act(() => frames.run(count));

const latest = (): WebGLStub => {
  const stub = webgl?.latest();
  if (!stub) throw new Error('no WebGL stub was created');
  return stub;
};

describe('RippleGridBackground', () => {
  it('compiles the ReactBits ripple shader and links a program', () => {
    webgl = installWebGLStub();
    render(<RippleGridBackground />);

    const { shaders, linked } = latest();
    expect(linked).toBe(true);
    expect(shaders.map((shader) => shader.type)).toEqual(['vertex', 'fragment']);
    // The three things the look is made of: the outward ripple, the grid
    // lattice, and the light-mode inversion the activity preset depends on.
    expect(shaders[1]!.source).toContain('sin(pi * (iTime - dist))');
    expect(shaders[1]!.source).toContain('sin(gridSize * 0.5 * pi * rippleUv');
    expect(shaders[1]!.source).toContain('if (lightMode)');
  });

  it('maps every prop onto its uniform, colour included', () => {
    webgl = installWebGLStub();
    render(
      <RippleGridBackground
        gridColor="#c9ccd6"
        rippleIntensity={0.03}
        gridSize={14}
        gridThickness={9}
        fadeDistance={1.1}
        vignetteStrength={1.2}
        glowIntensity={0.25}
        opacity={0.8}
        gridRotation={12}
        mouseInteractionRadius={2}
        lightMode
      />,
    );
    advanceFrames(1);

    const { uniforms, draws } = latest();
    expect(uniforms.rippleIntensity).toBe(0.03);
    expect(uniforms.gridSize).toBe(14);
    expect(uniforms.gridThickness).toBe(9);
    expect(uniforms.fadeDistance).toBe(1.1);
    expect(uniforms.vignetteStrength).toBe(1.2);
    expect(uniforms.glowIntensity).toBe(0.25);
    expect(uniforms.opacity).toBe(0.8);
    expect(uniforms.gridRotation).toBe(12);
    expect(uniforms.mouseInteractionRadius).toBe(2);
    // Booleans reach GLSL as ints.
    expect(uniforms.lightMode).toBe(1);
    expect(uniforms.enableRainbow).toBe(0);
    // #c9ccd6 → 201/204/214 over 255.
    expect(uniforms.gridColor).toEqual([201 / 255, 204 / 255, 214 / 255]);
    // One full-screen triangle, three vertices.
    expect(draws.at(-1)).toMatchObject({ first: 0, count: 3 });
  });

  it('flattens the ripple to nothing under reduced motion and draws exactly once', () => {
    setReducedMotion(true);
    webgl = installWebGLStub();
    render(<RippleGridBackground rippleIntensity={0.05} />);

    const { uniforms, draws } = latest();
    expect(draws).toHaveLength(1);
    expect(frames.pending).toHaveLength(0);
    expect(uniforms.rippleIntensity).toBe(0);
    expect(uniforms.mouseInfluence).toBe(0);
    expect(screen.getByTestId('ripple-grid-background')).toHaveAttribute('data-motion', 'static');
  });

  it('parks the loop when inactive', () => {
    webgl = installWebGLStub();
    const { rerender } = render(<RippleGridBackground active />);
    advanceFrames(2);
    const stub = latest();
    const drawn = stub.draws.length;
    expect(drawn).toBeGreaterThan(1);

    rerender(<RippleGridBackground active={false} />);
    expect(frames.pending).toHaveLength(0);
    advanceFrames(3);
    expect(stub.draws.length).toBe(drawn);
  });

  it('draws nothing at all without a WebGL context — a grid gets no consolation DOM', () => {
    webgl = installWebGLStub({ unsupported: true });
    const { container } = render(<RippleGridBackground />);

    expect(screen.getByTestId('ripple-grid-background')).toHaveAttribute('data-webgl', 'unavailable');
    expect(screen.getByTestId('ripple-grid-background-canvas')).toHaveAttribute('hidden');
    expect(container.querySelectorAll('span')).toHaveLength(0);
  });

  it('ships the activity preset the work canvas uses', () => {
    expect(ACTIVITY_RIPPLE_GRID).toMatchObject({
      lightMode: true,
      gridColor: '#c9ccd6',
      rippleIntensity: 0.03,
      gridSize: 14,
      opacity: 0.8,
      vignetteStrength: 1.2,
      // Low on purpose: the grid is the section's surface and must reach its
      // sides. At ReactBits' full fade a 3:2 panel showed an oval in the middle.
      edgeFade: 0.35,
      mouseInteraction: true,
    });
  });

  it('measures the fade against the section, and lets edgeFade turn it down', () => {
    webgl = installWebGLStub();
    render(<RippleGridBackground edgeFade={0.35} />);
    advanceFrames(1);

    const { shaders, uniforms } = latest();
    const fragment = shaders[1]!.source;
    // Both the fade and the vignette read the SECTION-relative distance (0 at
    // the centre, 1 at the corners) — not ReactBits' short-axis radius, which
    // is what left the grid as a centred oval on any non-square box.
    expect(fragment).toContain('float sectionDist = length(vUv * 2.0 - 1.0) / 1.41421356');
    expect(fragment).toContain('pow(sectionDist, fadeDistance)');
    expect(fragment).toContain('pow(sectionDist, vignetteStrength)');
    expect(fragment).not.toContain('pow(dist, fadeDistance)');
    expect(fragment).toContain('mix(1.0, ddd * vignette, edgeFade)');
    expect(uniforms.edgeFade).toBe(0.35);
  });

  it('defaults edgeFade to the full fade and clamps it to 0..1', () => {
    webgl = installWebGLStub();
    const { rerender } = render(<RippleGridBackground />);
    advanceFrames(1);
    expect(latest().uniforms.edgeFade).toBe(1);

    rerender(<RippleGridBackground edgeFade={4} />);
    advanceFrames(1);
    expect(latest().uniforms.edgeFade).toBe(1);

    rerender(<RippleGridBackground edgeFade={-1} />);
    advanceFrames(1);
    expect(latest().uniforms.edgeFade).toBe(0);
  });

  describe('filling its section', () => {
    // jsdom lays nothing out, so the host's box is whatever the test says it
    // is. The hook reads clientWidth/clientHeight of the host, exactly as it
    // would in a browser.
    const sizeHost = (host: HTMLElement, width: number, height: number) => {
      Object.defineProperty(host, 'clientWidth', { configurable: true, value: width });
      Object.defineProperty(host, 'clientHeight', { configurable: true, value: height });
    };

    let observers: Array<{ target: Element | null; callback: ResizeObserverCallback }> = [];
    let originalResizeObserver: typeof ResizeObserver | undefined;
    let originalDpr: number;

    beforeEach(() => {
      observers = [];
      originalResizeObserver = globalThis.ResizeObserver;
      originalDpr = window.devicePixelRatio;
      class ResizeObserverMock {
        private entry: { target: Element | null; callback: ResizeObserverCallback };
        constructor(callback: ResizeObserverCallback) {
          this.entry = { target: null, callback };
          observers.push(this.entry);
        }
        observe(target: Element) { this.entry.target = target; }
        unobserve() {}
        disconnect() { this.entry.target = null; }
      }
      (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = ResizeObserverMock;
    });

    afterEach(() => {
      (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = originalResizeObserver;
      Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: originalDpr });
    });

    const fireResize = () =>
      act(() => {
        for (const { target, callback } of observers) {
          if (target) callback([], {} as ResizeObserver);
        }
      });

    it('sits absolutely inside a relative section and backs the canvas at devicePixelRatio', () => {
      webgl = installWebGLStub();
      Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 2 });
      render(
        <div className="relative isolate">
          <RippleGridBackground className="absolute inset-0 -z-10" data-testid="grid" />
        </div>,
      );
      const host = screen.getByTestId('grid');
      const canvas = screen.getByTestId('grid-canvas') as HTMLCanvasElement;
      // The canvas is the host's whole box, and the host is the section's.
      expect(host.className).toContain('absolute inset-0');
      expect(canvas.className).toContain('h-full w-full');

      sizeHost(host, 852, 509);
      advanceFrames(1);
      // Backing store is the CSS box × DPR (852×509 at 2× → 1704×1018), and
      // the shader is told that size, so the grid's cells stay square.
      expect([canvas.width, canvas.height]).toEqual([1704, 1018]);
      expect(latest().uniforms.iResolution).toEqual([1704, 1018]);
      expect(observers.some((o) => o.target === host)).toBe(true);
    });

    it('follows the section when it is resized', () => {
      webgl = installWebGLStub();
      Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 1 });
      render(<RippleGridBackground data-testid="grid" />);
      const host = screen.getByTestId('grid');
      const canvas = screen.getByTestId('grid-canvas') as HTMLCanvasElement;

      sizeHost(host, 1600, 900);
      advanceFrames(1);
      expect([canvas.width, canvas.height]).toEqual([1600, 900]);

      // The window shrinks; the loop's next frame re-measures.
      sizeHost(host, 1280, 720);
      advanceFrames(1);
      expect([canvas.width, canvas.height]).toEqual([1280, 720]);
    });

    it('re-measures on ResizeObserver even while the loop is parked', () => {
      setReducedMotion(true);
      webgl = installWebGLStub();
      Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 1 });
      render(<RippleGridBackground data-testid="grid" />);
      const host = screen.getByTestId('grid');
      const canvas = screen.getByTestId('grid-canvas') as HTMLCanvasElement;
      sizeHost(host, 1600, 900);
      fireResize();
      expect([canvas.width, canvas.height]).toEqual([1600, 900]);

      // No animation frame is ever requested under reduced motion, so the
      // observer is the only thing that can catch the new size — and it does.
      sizeHost(host, 1280, 720);
      fireResize();
      expect([canvas.width, canvas.height]).toEqual([1280, 720]);
      expect(latest().uniforms.iResolution).toEqual([1280, 720]);
    });
  });
});
