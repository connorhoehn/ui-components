// src/theme/ThemeProvider.tsx
//
// React context + CSS custom property injection for the design token system.

import { createContext, useContext, useEffect, useMemo, useRef, ReactNode } from 'react';
import { lightTheme, darkTheme } from './presets';
import {
  tokenToCssVarName,
  toneCssVarName,
  THEME_TOKEN_ALIASES,
  type ToneRole,
} from './css-variables';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** The full set of design tokens exposed as CSS custom properties. */
export interface ThemeTokens {
  // Colors
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

  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  // Surfaces
  background: string;
  surface: string;
  surfaceRaised: string;
  surfaceOverlay: string;
  border: string;
  borderLight: string;

  // Spacing (as px values)
  spaceXs: string;
  spaceSm: string;
  spaceMd: string;
  spaceLg: string;
  spaceXl: string;

  // Font sizes
  fontXs: string;
  fontSm: string;
  fontMd: string;
  fontLg: string;
  fontXl: string;

  // Border radius
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusXl: string;
  radiusFull: string;

  // Shadows
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  shadowXl: string;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const ThemeContext = createContext<ThemeTokens>(lightTheme);

// Tracks whether a ThemeProvider is already mounted above this one. Not
// exported: it exists only to make nesting fail loudly instead of silently.
const ThemeNestingContext = createContext(false);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

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
export function ThemeProvider({ children, preset = 'light', theme, tones }: ThemeProviderProps) {
  const baseTheme = preset === 'dark' ? darkTheme : lightTheme;

  const isNested = useContext(ThemeNestingContext);
  const warnedRef = useRef(false);

  // `theme` and `tones` are almost always inline object literals — the JSDoc
  // above shows exactly that usage — so a fresh identity arrives on every
  // render. Both used to sit in the injection effect's dependency array, which
  // meant every parent render removed ~70 custom properties from
  // documentElement and immediately re-set them to the same values. Keying on
  // the CONTENT rather than the identity means the effect runs when the theme
  // actually changes.
  const themeKey = JSON.stringify(theme ?? null);
  const tonesKey = JSON.stringify(tones ?? null);

  const resolvedTheme = useMemo<ThemeTokens>(
    () => ({ ...baseTheme, ...theme }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, see above
    [baseTheme, themeKey],
  );

  // Nesting cannot work, and used to fail silently in the most confusing way
  // available: `useThemeContext()` returns the INNER tokens while every
  // Tailwind utility renders the OUTER ones. Both providers write the same
  // custom properties to `document.documentElement`, and React flushes child
  // effects before parent effects — so the outer provider's write lands last
  // and wins. A nested provider therefore changes what the hook reports and
  // nothing that is actually painted.
  //
  // There is no fix that keeps the current shape: `:root` holds one value per
  // property, so one document cannot carry two themes. Scoping a subtree needs
  // the variables on a wrapping element instead, which is a different
  // component. Until that exists, say so out loud.
  if (isNested && !warnedRef.current && process.env.NODE_ENV !== 'production') {
    warnedRef.current = true;
    console.warn(
      '[ThemeProvider] A nested ThemeProvider has no visual effect. Both write ' +
        'CSS custom properties to :root, and React runs child effects before ' +
        'parent effects, so the OUTER provider wins. useTheme() will report the ' +
        'inner tokens while the page renders the outer ones. Use a single ' +
        'app-level ThemeProvider, or scope a subtree by setting the ' +
        '--color-* variables on a wrapper element yourself.',
    );
  }

  // Inject CSS custom properties onto :root
  useEffect(() => {
    // A nested provider must not write: it would clobber the outer theme for
    // the whole document, not just its own subtree.
    if (isNested) return;
    const root = document.documentElement;
    const keys = Object.keys(resolvedTheme) as Array<keyof ThemeTokens>;
    const written: string[] = [];

    const set = (name: string, value: string) => {
      root.style.setProperty(name, value);
      written.push(name);
    };

    for (const key of keys) {
      set(tokenToCssVarName(key), resolvedTheme[key]);
      const alias = THEME_TOKEN_ALIASES[key];
      if (alias) set(alias, resolvedTheme[key]);
    }

    for (const [tone, roles] of Object.entries(tones ?? {})) {
      for (const [role, value] of Object.entries(roles)) {
        if (value) set(toneCssVarName(tone, role as ToneRole), value);
      }
    }

    return () => {
      for (const name of written) root.style.removeProperty(name);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tones keyed on content, see above
  }, [resolvedTheme, tonesKey, isNested]);

  return (
    <ThemeNestingContext.Provider value={true}>
      <ThemeContext.Provider value={resolvedTheme}>
        {children}
      </ThemeContext.Provider>
    </ThemeNestingContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook (exported from useTheme.ts but also accessible here for convenience)
// ---------------------------------------------------------------------------

/**
 * Returns the current resolved theme tokens from the nearest ThemeProvider.
 * Falls back to the light theme if no provider is present.
 */
export function useThemeContext(): ThemeTokens {
  return useContext(ThemeContext);
}
