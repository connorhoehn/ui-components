import { ReactNode } from 'react';
/** The full set of design tokens exposed as CSS custom properties. */
export interface ThemeTokens {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    danger: string;
    dangerLight: string;
    success: string;
    successLight: string;
    warning: string;
    warningLight: string;
    info: string;
    infoLight: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textInverse: string;
    background: string;
    surface: string;
    surfaceRaised: string;
    surfaceOverlay: string;
    border: string;
    borderLight: string;
    spaceXs: string;
    spaceSm: string;
    spaceMd: string;
    spaceLg: string;
    spaceXl: string;
    fontXs: string;
    fontSm: string;
    fontMd: string;
    fontLg: string;
    fontXl: string;
    radiusSm: string;
    radiusMd: string;
    radiusLg: string;
    radiusXl: string;
    radiusFull: string;
    shadowSm: string;
    shadowMd: string;
    shadowLg: string;
    shadowXl: string;
}
/** Overrides for one tone in the semantic scale. Omitted roles keep their default. */
export interface ToneOverride {
    /** Solid fill / icon / indicator dot. */
    base?: string;
    /** Soft tinted background. */
    bg?: string;
    /** Readable text on the soft background. */
    fg?: string;
    /** Border for the soft surface. */
    border?: string;
}
export interface ThemeProviderProps {
    children?: ReactNode;
    /** Base preset to use. Defaults to 'light'. */
    preset?: 'light' | 'dark';
    /** Partial overrides merged on top of the preset. */
    theme?: Partial<ThemeTokens>;
    /**
     * Rebrand tones from the semantic scale — the recommended path, because it
     * maps 1:1 onto what every tinted surface in the library reads:
     *
     *   <ThemeProvider tones={{ accent: { base: '#0d9488', bg: '#f0fdfa' } }}>
     *
     * Equivalent to overriding `--color-accent` / `--color-accent-bg` in CSS.
     */
    tones?: Record<string, ToneOverride>;
}
/**
 * Injects the theme as CSS custom properties on the document root.
 *
 * Writes BOTH namespaces:
 *   - `--ui-*`   for every ThemeTokens key (kept for `cssVar()` callers)
 *   - `--color-*` / `--radius-*` for keys with a real token counterpart, which
 *     is what Tailwind utilities compile against
 *
 * The second half is what makes this component do anything. Until v2.40.2 it
 * wrote only `--ui-*`, which no utility class reads, so
 * `<ThemeProvider theme={{ primary: 'red' }}>` was silently inert.
 *
 * Mounting with no overrides is a no-op: the light preset mirrors the @theme
 * defaults in src/styles.css.
 *
 * `preset="dark"` is PARTIAL — it re-tones text/surface/border and the semantic
 * colours, but the token set has no dark-specific palette, so surfaces that use
 * literal utilities won't follow. Treat it as a starting point.
 */
export declare function ThemeProvider({ children, preset, theme, tones }: ThemeProviderProps): import("react").JSX.Element;
/**
 * Returns the current resolved theme tokens from the nearest ThemeProvider.
 * Falls back to the light theme if no provider is present.
 */
export declare function useThemeContext(): ThemeTokens;
//# sourceMappingURL=ThemeProvider.d.ts.map