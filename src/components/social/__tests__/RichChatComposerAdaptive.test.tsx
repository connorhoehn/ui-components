// The composer as a drop-in: it sizes itself from its OWN box, keeps its own
// shape whatever the host's tokens say, grows to a cap, and picks a console sky
// that suits the theme it sits in.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { COMPOSER_BREAKPOINTS, RichChatComposer, composerSizeFor, type ComposerMode } from '../RichChatComposer';
import { resolveBackdropTone } from '../../shared/backdropTone';
import { drawnParticles } from '../../shared/ParticlesBackground';
import { installAnimationFrames, installWebGLStub, setReducedMotion } from '../../shared/__tests__/webglStub';

// Every observer hears the width — the console sky's GL canvas watches its box
// too, so "the last observer constructed" is not necessarily the composer's.
let observers: Array<(entries: Array<{ contentRect: { width: number; height: number } }>) => void> = [];
const emit: ((width: number) => void) | null = (width: number) =>
  act(() => { observers.forEach((cb) => cb([{ contentRect: { width, height: 100 } }])); });
class FakeResizeObserver {
  constructor(private cb: (entries: Array<{ contentRect: { width: number; height: number } }>) => void) {
    observers.push(cb);
  }
  observe() {}
  disconnect() { observers = observers.filter((cb) => cb !== this.cb); }
}

let webgl: ReturnType<typeof installWebGLStub> | null = null;
let frames: ReturnType<typeof installAnimationFrames>;

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', FakeResizeObserver);
  setReducedMotion(false);
  frames = installAnimationFrames();
  webgl = installWebGLStub();
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  observers = [];
  webgl?.restore();
  webgl = null;
  frames.restore();
  setReducedMotion(false);
  document.documentElement.removeAttribute('data-theme');
});

const root = () => screen.getByTestId('composer');
const withHints = { hints: [{ key: '⌘K', label: 'quick open' }, { key: 'Enter', label: 'send' }] };

describe('size classes come from the composer’s own width', () => {
  it('maps widths to wide / medium / narrow at the published breakpoints', () => {
    expect(composerSizeFor(null)).toBe('wide');
    expect(composerSizeFor(COMPOSER_BREAKPOINTS.narrow - 1)).toBe('narrow');
    expect(composerSizeFor(COMPOSER_BREAKPOINTS.narrow)).toBe('medium');
    expect(composerSizeFor(COMPOSER_BREAKPOINTS.wide - 1)).toBe('medium');
    expect(composerSizeFor(COMPOSER_BREAKPOINTS.wide)).toBe('wide');
  });

  it('wide: the hint row and the full toolbar', () => {
    render(<RichChatComposer onSend={vi.fn()} data-testid="composer" {...withHints} />);
    emit!(700);
    expect(root()).toHaveAttribute('data-composer-size', 'wide');
    expect(screen.getByTestId('composer-hints')).toBeInTheDocument();
    expect(screen.queryByTestId('composer-hints-toggle')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Quote')).toBeInTheDocument();
  });

  it('medium: hints fold into a “?” menu, secondary formatting into “⋯”', () => {
    render(<RichChatComposer onSend={vi.fn()} data-testid="composer" {...withHints} />);
    emit!(450);
    expect(root()).toHaveAttribute('data-composer-size', 'medium');
    expect(screen.queryByTestId('composer-hints')).not.toBeInTheDocument();
    expect(screen.getByTestId('composer-hints-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('composer-format-more')).toBeInTheDocument();
    expect(screen.getByTestId('composer-body').className).not.toContain('flex-wrap');
  });

  it('narrow: input and Send share one row, the toolbar is behind a toggle, modes are the compact pill', () => {
    render(
      <RichChatComposer onSend={vi.fn()} data-testid="composer" mode="agent" onModeChange={vi.fn()} {...withHints} />,
    );
    emit!(320);
    expect(root()).toHaveAttribute('data-composer-size', 'narrow');
    expect(screen.getByTestId('composer-body').className).toContain('flex-wrap');
    expect(screen.queryByTestId('composer-format-toolbar')).not.toBeInTheDocument();
    expect(screen.getByTestId('composer-send')).toBeInTheDocument();
    expect(screen.getByTestId('composer-hints-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('composer-modes')).toHaveAttribute('data-mode-control', 'compact');
    expect(screen.queryByTestId('composer-mode-kbd')).not.toBeInTheDocument();
  });

  it('the `layout` prop overrides the measurement', () => {
    render(<RichChatComposer onSend={vi.fn()} data-testid="composer" layout="narrow" />);
    emit!(900);
    expect(root()).toHaveAttribute('data-composer-size', 'narrow');
  });
});

describe('auto-grow cap', () => {
  it('leaves the stylesheet default in charge when unset — a viewport-bounded cap', () => {
    render(<RichChatComposer onSend={vi.fn()} data-testid="composer" />);
    expect(root().style.getPropertyValue('--composer-input-max')).toBe('');
    const css = readFileSync(resolve(__dirname, '../../../styles.css'), 'utf8');
    expect(css).toMatch(/max-height: var\(--composer-input-max, min\(14rem, 40dvh\)\)/);
  });

  it('takes pixels or any CSS length from `maxInputHeight`', () => {
    const { rerender } = render(<RichChatComposer onSend={vi.fn()} data-testid="composer" maxInputHeight={200} />);
    expect(root().style.getPropertyValue('--composer-input-max')).toBe('200px');
    rerender(<RichChatComposer onSend={vi.fn()} data-testid="composer" maxInputHeight="30vh" />);
    expect(root().style.getPropertyValue('--composer-input-max')).toBe('30vh');
  });
});

describe('shape', () => {
  it('is rounded by its own default, never by the host’s --radius-* tokens', () => {
    render(<RichChatComposer onSend={vi.fn()} data-testid="composer" />);
    expect(root().className).toContain('rounded-[var(--composer-radius,12px)]');
    expect(root().className).not.toMatch(/var\(--radius-/);
    // Not set on the element, so a host's inherited --composer-radius still applies.
    expect(root().style.getPropertyValue('--composer-radius')).toBe('');
  });

  it('the `radius` prop overrides both', () => {
    const { rerender } = render(<RichChatComposer onSend={vi.fn()} data-testid="composer" radius="none" />);
    expect(root().style.getPropertyValue('--composer-radius')).toBe('0px');
    rerender(<RichChatComposer onSend={vi.fn()} data-testid="composer" radius="xl" />);
    expect(root().style.getPropertyValue('--composer-radius')).toBe('12px');
  });
});

describe('backdrop tone', () => {
  const tree = (theme: string | null, inner?: string) => {
    const outer = document.createElement('div');
    if (theme) outer.setAttribute('data-theme', theme);
    const mid = document.createElement('div');
    if (inner) mid.setAttribute('data-theme', inner);
    const leaf = document.createElement('div');
    leaf.setAttribute('data-theme', 'dark'); // the surface's own flip is never read back
    outer.append(mid);
    mid.append(leaf);
    return leaf;
  };

  it('auto: explicit light → graphite, explicit dark → night', () => {
    expect(resolveBackdropTone('auto', tree('light'), true)).toBe('graphite');
    expect(resolveBackdropTone('auto', tree('dark'), false)).toBe('night');
  });

  it('auto: the nearest data-theme wins over <html>', () => {
    expect(resolveBackdropTone('auto', tree('dark', 'light'), false)).toBe('graphite');
  });

  it('auto with no data-theme anywhere follows prefers-color-scheme (the “system” state)', () => {
    expect(resolveBackdropTone('auto', tree(null), true)).toBe('night');
    expect(resolveBackdropTone('auto', tree(null), false)).toBe('graphite');
  });

  it('auto inherits an enclosing console surface’s choice', () => {
    const leaf = tree('dark');
    leaf.parentElement!.setAttribute('data-backdrop-tone', 'graphite');
    expect(resolveBackdropTone('auto', leaf, true)).toBe('graphite');
  });

  it('explicit tones pass straight through', () => {
    expect(resolveBackdropTone('night', tree('light'), false)).toBe('night');
    expect(resolveBackdropTone('graphite', tree('dark'), true)).toBe('graphite');
    expect(resolveBackdropTone('none', tree('dark'), true)).toBe('none');
  });

  const agent = (props: { backdropTone?: 'auto' | 'night' | 'graphite' | 'none' } = {}) => (
    <RichChatComposer onSend={vi.fn()} data-testid="composer" mode={'agent' as ComposerMode} onModeChange={vi.fn()} {...props} />
  );

  it('the composer on a light page paints graphite', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    render(agent());
    expect(root()).toHaveAttribute('data-backdrop-tone', 'graphite');
    expect(root()).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByTestId('composer-console')).toHaveAttribute('data-tone', 'graphite');
  });

  it('the composer on a dark page paints night', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    render(agent());
    expect(root()).toHaveAttribute('data-backdrop-tone', 'night');
    expect(screen.getByTestId('composer-console')).toHaveAttribute('data-tone', 'night');
  });

  it('follows a theme switch while it is lit', async () => {
    document.documentElement.setAttribute('data-theme', 'light');
    render(agent());
    expect(root()).toHaveAttribute('data-backdrop-tone', 'graphite');
    await act(async () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      await Promise.resolve();
    });
    expect(root()).toHaveAttribute('data-backdrop-tone', 'night');
  });

  it('`none` keeps the ordinary surface in Agent mode', () => {
    render(agent({ backdropTone: 'none' }));
    expect(root()).not.toHaveAttribute('data-theme');
    expect(root()).not.toHaveAttribute('data-backdrop-tone');
    expect(root().className).not.toContain('uic-chat-console');
  });

  it('reduced motion: the sky arrives but holds still', () => {
    setReducedMotion(true);
    render(agent({ backdropTone: 'graphite' }));
    expect(screen.getByTestId('composer-console-backdrop')).toHaveAttribute('data-motion', 'static');
    expect(frames.pending).toHaveLength(0);
  });
});

describe('particle budget', () => {
  it('caps the drawn count by area and never thins below a floor', () => {
    expect(drawnParticles(120, undefined, 100, 100)).toBe(120);
    expect(drawnParticles(120, 22, 700, 130)).toBe(120);
    expect(drawnParticles(120, 22, 320, 90)).toBe(64);
    expect(drawnParticles(120, 22, 40, 40)).toBe(24);
    // No layout yet is not "tiny".
    expect(drawnParticles(120, 22, 1, 1)).toBe(120);
  });
});
