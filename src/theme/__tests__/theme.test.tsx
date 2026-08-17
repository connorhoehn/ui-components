// NOTE: the light-preset colours asserted here must match the @theme tokens
// in src/styles.css. They used to be a drifted fork (#3b82f6 vs #646cff,
// #1e293b vs #0f172a, ...), and these assertions were pinning the drift —
// which mattered once ThemeProvider started writing the real --color-*
// tokens, because mounting it would then have silently rebranded the app.
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { createElement } from 'react';
import { cssVar, tokenToCssVarName } from '../css-variables';
import { ThemeProvider } from '../ThemeProvider';
import { useTheme } from '../useTheme';
import { lightTheme, darkTheme } from '../presets';

describe('cssVar', () => {
  it('returns correct CSS variable string for simple token', () => {
    expect(cssVar('primary')).toBe('var(--ui-primary)');
  });

  it('returns correct CSS variable string for camelCase token', () => {
    expect(cssVar('textPrimary')).toBe('var(--ui-text-primary)');
  });

  it('returns correct CSS variable string for multi-word token', () => {
    expect(cssVar('primaryDark')).toBe('var(--ui-primary-dark)');
  });
});

describe('tokenToCssVarName', () => {
  it('converts simple token to prefixed CSS variable name', () => {
    expect(tokenToCssVarName('primary')).toBe('--ui-primary');
  });

  it('converts camelCase to kebab-case with prefix', () => {
    expect(tokenToCssVarName('primaryDark')).toBe('--ui-primary-dark');
    expect(tokenToCssVarName('textPrimary')).toBe('--ui-text-primary');
    expect(tokenToCssVarName('spaceXs')).toBe('--ui-space-xs');
  });

  it('handles multiple capital letters', () => {
    expect(tokenToCssVarName('surfaceRaised')).toBe('--ui-surface-raised');
    expect(tokenToCssVarName('borderLight')).toBe('--ui-border-light');
  });
});

describe('ThemeProvider', () => {
  it('injects CSS variables on document root', () => {
    render(
      createElement(ThemeProvider, null, createElement('div', null, 'Hello'))
    );

    const root = document.documentElement;
    expect(root.style.getPropertyValue('--ui-primary')).toBe('#646cff');
    expect(root.style.getPropertyValue('--ui-text-primary')).toBe('#0f172a');
  });

  it('applies dark theme preset CSS variables', () => {
    render(
      createElement(ThemeProvider, { preset: 'dark' }, createElement('div', null, 'Dark'))
    );

    const root = document.documentElement;
    expect(root.style.getPropertyValue('--ui-primary')).toBe('#60a5fa');
    expect(root.style.getPropertyValue('--ui-background')).toBe('#0f172a');
  });

  it('removes CSS variables on unmount', () => {
    const { unmount } = render(
      createElement(ThemeProvider, null, createElement('div', null, 'Temp'))
    );

    const root = document.documentElement;
    expect(root.style.getPropertyValue('--ui-primary')).toBe('#646cff');

    unmount();

    expect(root.style.getPropertyValue('--ui-primary')).toBe('');
  });

  it('merges theme overrides on top of preset', () => {
    render(
      createElement(
        ThemeProvider,
        { theme: { primary: '#ff0000' } },
        createElement('div', null, 'Override')
      )
    );

    const root = document.documentElement;
    expect(root.style.getPropertyValue('--ui-primary')).toBe('#ff0000');
    // Non-overridden values should still be the light preset
    expect(root.style.getPropertyValue('--ui-danger')).toBe('#dc2626');
  });
});

describe('useTheme', () => {
  it('returns current theme tokens (light by default)', () => {
    function themeWrapper({ children }: { children: React.ReactNode }) {
      return createElement(ThemeProvider, null, children);
    }

    const { result } = renderHook(() => useTheme(), { wrapper: themeWrapper });

    expect(result.current.primary).toBe('#646cff');
    expect(result.current.textPrimary).toBe('#0f172a');
    expect(result.current.background).toBe('#f8fafc');
  });

  it('returns dark theme tokens when dark preset is used', () => {
    function darkWrapper({ children }: { children: React.ReactNode }) {
      return createElement(ThemeProvider, { preset: 'dark' }, children);
    }

    const { result } = renderHook(() => useTheme(), { wrapper: darkWrapper });

    expect(result.current.primary).toBe('#60a5fa');
    expect(result.current.textPrimary).toBe('#f1f5f9');
    expect(result.current.background).toBe('#0f172a');
  });
});

describe('Theme presets', () => {
  it('dark theme has different values from light theme', () => {
    expect(darkTheme.primary).not.toBe(lightTheme.primary);
    expect(darkTheme.background).not.toBe(lightTheme.background);
    expect(darkTheme.textPrimary).not.toBe(lightTheme.textPrimary);
    expect(darkTheme.surface).not.toBe(lightTheme.surface);
  });

  it('both presets define all required tokens', () => {
    const lightKeys = Object.keys(lightTheme);
    const darkKeys = Object.keys(darkTheme);
    expect(lightKeys).toEqual(darkKeys);
    expect(lightKeys.length).toBeGreaterThan(0);
  });
});
