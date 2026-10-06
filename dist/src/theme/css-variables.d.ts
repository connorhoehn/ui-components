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
export declare function tokenToCssVarName(token: keyof ThemeTokens): string;
/**
 * Returns all ThemeTokens as a Record mapping CSS variable names to their values.
 */
export declare function themeToCssVars(tokens: ThemeTokens): Record<string, string>;
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
export declare function injectThemeVars(tokens: ThemeTokens): string;
/**
 * Returns a `var(--ui-...)` reference for use in inline styles or CSS-in-JS.
 *
 * Usage:
 *   style={{ color: cssVar('textPrimary') }}
 *   // → "var(--ui-text-primary)"
 */
export declare function cssVar(token: keyof ThemeTokens): string;
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
export declare const THEME_TOKEN_ALIASES: Partial<Record<keyof ThemeTokens, string>>;
/** The four roles every tone in the scale carries. */
export type ToneRole = 'base' | 'bg' | 'fg' | 'border';
/**
 * Custom-property name for one role of one tone, e.g.
 * `toneCssVarName('success', 'bg')` -> `--color-success-bg`.
 */
export declare function toneCssVarName(tone: string, role: ToneRole): string;
//# sourceMappingURL=css-variables.d.ts.map