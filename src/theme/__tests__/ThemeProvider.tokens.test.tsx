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
