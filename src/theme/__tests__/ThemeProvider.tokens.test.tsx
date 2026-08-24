// ThemeProvider has to actually re-theme.
//
// Until v2.40.2 it wrote only `--ui-*`, which no Tailwind utility reads, so
// `<ThemeProvider theme={{ primary: 'red' }}>` was silently inert while
// ThemingPage documented it as THE theming API. These tests pin the behaviour
// that makes it real.

import { render, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ThemeProvider } from '../ThemeProvider';
import { lightTheme } from '../presets';

function readVar(name: string) {
  return document.documentElement.style.getPropertyValue(name).trim();
}

afterEach(cleanup);

describe('ThemeProvider writes the real design tokens', () => {
  it('sets --color-* (what utilities read), not just --ui-*', () => {
    render(
      <ThemeProvider theme={{ primary: '#0d9488', textPrimary: '#111111' }}>
        <span />
      </ThemeProvider>,
    );
    expect(readVar('--color-primary')).toBe('#0d9488');
    expect(readVar('--color-text-primary')).toBe('#111111');
    // legacy namespace still written, so existing cssVar() callers keep working
    expect(readVar('--ui-primary')).toBe('#0d9488');
  });

  it('mounting with no overrides is a no-op against the stylesheet defaults', () => {
    render(<ThemeProvider><span /></ThemeProvider>);
    // The light preset must mirror src/styles.css @theme, or simply mounting
    // the provider would silently rebrand the app. These are the values there.
    expect(readVar('--color-primary')).toBe('#646cff');
    expect(readVar('--color-success')).toBe('#16a34a');
    expect(readVar('--color-warning')).toBe('#d97706');
    expect(readVar('--color-info')).toBe('#2563eb');
    expect(readVar('--color-text-primary')).toBe('#0f172a');
    expect(readVar('--color-text-secondary')).toBe('#475569');
    expect(lightTheme.primary).toBe('#646cff');
  });

  it('rebrands a tone through the four-role scale', () => {
    render(
      <ThemeProvider
        tones={{
          accent: { base: '#0d9488', bg: '#f0fdfa', fg: '#0f766e', border: '#99f6e4' },
          danger: { bg: '#fff1f2' },
        }}
      >
        <span />
      </ThemeProvider>,
    );
    expect(readVar('--color-accent')).toBe('#0d9488');
    expect(readVar('--color-accent-bg')).toBe('#f0fdfa');
    expect(readVar('--color-accent-fg')).toBe('#0f766e');
    expect(readVar('--color-accent-border')).toBe('#99f6e4');
    // omitted roles are left alone rather than blanked
    expect(readVar('--color-danger-bg')).toBe('#fff1f2');
    expect(readVar('--color-danger')).toBe('#dc2626'); // from the preset
  });

  it('removes every property it wrote on unmount', () => {
    const { unmount } = render(
      <ThemeProvider theme={{ primary: '#0d9488' }} tones={{ accent: { base: '#123456' } }}>
        <span />
      </ThemeProvider>,
    );
    expect(readVar('--color-accent')).toBe('#123456');
    unmount();
    expect(readVar('--color-primary')).toBe('');
    expect(readVar('--ui-primary')).toBe('');
    expect(readVar('--color-accent')).toBe('');
  });
});

// ---------------------------------------------------------------------------
// Nesting, and effect churn from inline object props
// ---------------------------------------------------------------------------

describe('ThemeProvider nesting', () => {
  it('a nested provider does not silently replace the outer theme on unmount', () => {
    // The severe face of this bug. Both providers write the SAME custom
    // property names to documentElement, so the inner one's cleanup removed
    // names the outer one had set. The outer provider has no reason to
    // re-render when its child unmounts, so its effect never re-runs to put
    // them back: mounting a themed preview pane and closing it again stripped
    // the app's branding down to the stylesheet defaults.
    const root = document.documentElement;
    const Outer = ({ withInner }: { withInner: boolean }) => (
      <ThemeProvider theme={{ primary: '#0a0a0a' }}>
        {withInner ? (
          <ThemeProvider theme={{ primary: '#ffffff' }}>
            <div />
          </ThemeProvider>
        ) : (
          <div />
        )}
      </ThemeProvider>
    );

    const { rerender } = render(<Outer withInner />);
    rerender(<Outer withInner={false} />);

    expect(root.style.getPropertyValue('--color-primary')).toBe('#0a0a0a');
  });

  it('warns that a nested provider has no visual effect', () => {
    // It cannot be made to work in this shape — :root holds one value per
    // property — so the failure has to be loud. Silence was the worst option:
    // useThemeContext() reports the INNER tokens while every utility class
    // renders the OUTER ones, so the hook and the screen disagree and neither
    // looks wrong on its own.
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <ThemeProvider theme={{ primary: '#0a0a0a' }}>
        <ThemeProvider theme={{ primary: '#ffffff' }}>
          <div />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('nested ThemeProvider has no visual effect'));
    warn.mockRestore();
  });

  it('does not warn for a single provider', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ThemeProvider theme={{ primary: '#0a0a0a' }}><div /></ThemeProvider>);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});

describe('ThemeProvider effect churn', () => {
  it('an inline theme object does not re-write every property on every render', () => {
    // The documented usage IS an inline literal, so a fresh identity arrives
    // each render. With the object itself in the dependency array, every
    // parent render removed ~70 custom properties from documentElement and
    // immediately re-set them to identical values. Keyed on content instead.
    const root = document.documentElement;
    const setSpy = vi.spyOn(root.style, 'setProperty');

    const App = ({ n }: { n: number }) => (
      // Same VALUE every render, fresh IDENTITY every render.
      <ThemeProvider theme={{ primary: '#123456' }}>
        <span>{n}</span>
      </ThemeProvider>
    );

    const { rerender } = render(<App n={0} />);
    const afterMount = setSpy.mock.calls.length;
    expect(afterMount).toBeGreaterThan(0); // it did write once

    for (let i = 1; i <= 3; i++) rerender(<App n={i} />);

    // A delta, so this is independent of how many passes the mount took —
    // which matters because the suite runs under StrictMode.
    expect(setSpy.mock.calls.length - afterMount).toBe(0);
    setSpy.mockRestore();
  });
});
