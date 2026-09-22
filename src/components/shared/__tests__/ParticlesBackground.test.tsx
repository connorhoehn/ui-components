import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ParticlesBackground } from '../ParticlesBackground';
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

describe('ParticlesBackground', () => {
  it('compiles both ReactBits shaders and links a program', () => {
    webgl = installWebGLStub();
    render(<ParticlesBackground active />);

    const { shaders, linked } = latest();
    expect(linked).toBe(true);
    expect(shaders.map((shader) => shader.type)).toEqual(['vertex', 'fragment']);
    // The two features the whole look rests on: the per-particle sine drift in
    // the vertex stage and the soft disc in the fragment stage.
    expect(shaders[0]!.source).toContain('gl_PointSize');
    expect(shaders[0]!.source).toContain('mix(0.1, 1.5, random.x)');
    expect(shaders[1]!.source).toContain('smoothstep(0.5, 0.4, d)');
    expect(shaders[1]!.source).toContain('uAlphaParticles');
  });

  it('maps props onto the uniforms the shaders read', () => {
    webgl = installWebGLStub();
    render(
      <ParticlesBackground
        active
        particleCount={17}
        particleSpread={7}
        particleBaseSize={64}
        sizeRandomness={0.25}
        alphaParticles
      />,
    );
    advanceFrames(1);

    const { uniforms, draws, buffers } = latest();
    expect(uniforms.uSpread).toBe(7);
    expect(uniforms.uSizeRandomness).toBe(0.25);
    expect(uniforms.uAlphaParticles).toBe(1);
    // dpr is 1 in jsdom, so the base size arrives unscaled.
    expect(uniforms.uBaseSize).toBe(64);
    // Three attribute buffers — position(3), random(4), colour(3) — for 17 points.
    expect(buffers.map((buffer) => buffer.length)).toEqual([17 * 3, 17 * 4, 17 * 3]);
    expect(draws.at(-1)?.count).toBe(17);
  });

  it('renders one static frame under reduced motion and never asks for another', () => {
    setReducedMotion(true);
    webgl = installWebGLStub();
    render(<ParticlesBackground active />);

    expect(latest().draws).toHaveLength(1);
    // Nothing queued: the loop was never started, so there is no next frame.
    expect(frames.pending).toHaveLength(0);
    expect(screen.getByTestId('particles-background-backdrop')).toHaveAttribute('data-motion', 'static');
  });

  it('parks the loop when inactive and draws nothing further', () => {
    webgl = installWebGLStub();
    const { rerender } = render(<ParticlesBackground active />);
    advanceFrames(2);
    const stub = latest();
    const drawnWhileActive = stub.draws.length;
    expect(drawnWhileActive).toBeGreaterThan(1);

    rerender(<ParticlesBackground active={false} />);
    // The rAF queue is empty, so even if the browser kept ticking there is
    // nothing left to call — and the canvas keeps the last frame it drew.
    expect(frames.pending).toHaveLength(0);
    advanceFrames(3);
    expect(stub.draws.length).toBe(drawnWhileActive);
  });

  it('falls back to the CSS star field when there is no WebGL context', () => {
    webgl = installWebGLStub({ unsupported: true });
    render(<ParticlesBackground active data-testid="surface" />);

    expect(screen.getByTestId('surface-backdrop')).toHaveAttribute('data-webgl', 'unavailable');
    expect(screen.getByTestId('surface-canvas')).toHaveAttribute('hidden');
    expect(screen.getAllByTestId('surface-fallback-layer')).toHaveLength(4);
  });

  it('falls back when the shaders will not compile on this GPU', () => {
    webgl = installWebGLStub({ failCompile: true });
    render(<ParticlesBackground active data-testid="surface" />);

    expect(screen.getByTestId('surface-backdrop')).toHaveAttribute('data-webgl', 'unavailable');
    expect(screen.getByTestId('surface-fallback')).toBeInTheDocument();
  });

  it('paints no backdrop at all once inactive, and keeps its children either way', () => {
    webgl = installWebGLStub();
    const { rerender } = render(
      <ParticlesBackground active={false}>
        <p>output</p>
      </ParticlesBackground>,
    );
    expect(screen.queryByTestId('particles-background-backdrop')).not.toBeInTheDocument();
    expect(screen.getByText('output')).toBeInTheDocument();

    rerender(
      <ParticlesBackground active>
        <p>output</p>
      </ParticlesBackground>,
    );
    expect(screen.getByTestId('particles-background-backdrop')).toBeInTheDocument();
    expect(screen.getByText('output')).toBeInTheDocument();
  });

  it('degrades to the CSS field when the GPU drops the context', () => {
    webgl = installWebGLStub();
    render(<ParticlesBackground active data-testid="surface" />);
    expect(screen.getByTestId('surface-backdrop')).toHaveAttribute('data-webgl', 'ready');

    act(() => {
      // `cancelable` matters: without preventDefault the browser treats the
      // loss as final, and the component has to be the one to say so.
      screen.getByTestId('surface-canvas').dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
    });
    expect(screen.getByTestId('surface-backdrop')).toHaveAttribute('data-webgl', 'unavailable');
    expect(screen.getByTestId('surface-fallback')).toBeInTheDocument();
    expect(frames.pending).toHaveLength(0);
  });

  it('stops drawing while the tab is in the background', () => {
    webgl = installWebGLStub();
    render(<ParticlesBackground active />);
    advanceFrames(2);
    const stub = latest();
    const drawn = stub.draws.length;

    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(frames.pending).toHaveLength(0);
    advanceFrames(3);
    expect(stub.draws.length).toBe(drawn);

    hidden.mockReturnValue(false);
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    advanceFrames(1);
    expect(stub.draws.length).toBeGreaterThan(drawn);
    hidden.mockRestore();
  });
});
