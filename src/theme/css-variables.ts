// src/theme/css-variables.ts
//
// Utilities for converting ThemeTokens to/from CSS custom properties.

import type { ThemeTokens } from './ThemeProvider';

/**
 * Convert a camelCase token key to a CSS variable name with --ui- prefix.
 *
 * Examples:
 *   'primary'      → '--ui-primary'
 *   'primaryDark'  → '--ui-primary-dark'
 *   'textPrimary'  → '--ui-text-primary'
 *   'spaceXs'      → '--ui-space-xs'
 */
export function tokenToCssVarName(token: keyof ThemeTokens): string {
  const kebab = token.replace(/([A-Z])/g, '-$1').toLowerCase();
  return `--ui-${kebab}`;
}

/**
 * Returns all ThemeTokens as a Record mapping CSS variable names to their values.
 */
export function themeToCssVars(tokens: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const key of Object.keys(tokens) as Array<keyof ThemeTokens>) {
    vars[tokenToCssVarName(key)] = tokens[key];
  }
  return vars;
}

/**
 * Returns a CSS string for injecting into a <style> tag or :root selector.
 *
 * Example output:
 *   :root {
 *     --ui-primary: #3b82f6;
 *     --ui-primary-dark: #1d4ed8;
 *     ...
 *   }
 */
export function injectThemeVars(tokens: ThemeTokens): string {
  const vars = themeToCssVars(tokens);
  const declarations = Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');
  return `:root {\n${declarations}\n}`;
}

/**
 * Returns a `var(--ui-...)` reference for use in inline styles or CSS-in-JS.
 *
 * Usage:
 *   style={{ color: cssVar('textPrimary') }}
 *   // → "var(--ui-text-primary)"
 */
export function cssVar(token: keyof ThemeTokens): string {
  return `var(${tokenToCssVarName(token)})`;
}


// ---------------------------------------------------------------------------
// Bridge to the real design tokens
// ---------------------------------------------------------------------------

/**
 * ThemeTokens key -> the `@theme` custom property in src/styles.css that
 * Tailwind utilities actually compile against.
 *
 * Why this exists: ThemeProvider only ever wrote `--ui-*`, and no utility class
 * reads those, so `<ThemeProvider theme={{ primary: 'red' }}>` changed nothing
 * visible. Writing these names too is what makes the provider real. Keys with
 * no semantic counterpart (textInverse, surfaceOverlay, borderLight, …) stay
 * `--ui-*`-only and are intentionally absent.
 */
export const THEME_TOKEN_ALIASES: Partial<Record<keyof ThemeTokens, string>> = {
  primary: '--color-primary',
  primaryDark: '--color-primary-hover',
  danger: '--color-danger',
  success: '--color-success',
  warning: '--color-warning',
  info: '--color-info',
  textPrimary: '--color-text-primary',
  textSecondary: '--color-text-secondary',
  textMuted: '--color-text-tertiary',
  surface: '--color-surface',
  border: '--color-border',
  radiusSm: '--radius-sm',
  radiusMd: '--radius-md',
  radiusLg: '--radius-lg',
};

/** The four roles every tone in the scale carries. */
export type ToneRole = 'base' | 'bg' | 'fg' | 'border';

const TONE_ROLE_SUFFIX: Record<ToneRole, string> = {
  base: '',
  bg: '-bg',
  fg: '-fg',
  border: '-border',
};

/**
 * Custom-property name for one role of one tone, e.g.
 * `toneCssVarName('success', 'bg')` -> `--color-success-bg`.
 */
export function toneCssVarName(tone: string, role: ToneRole): string {
  return `--color-${tone}${TONE_ROLE_SUFFIX[role]}`;
}
