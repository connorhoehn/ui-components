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
      mouseInteraction: true,
    });
  });
});
