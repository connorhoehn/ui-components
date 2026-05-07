// src/theme/ThemeProvider.tsx
//
// React context + CSS custom property injection for the design token system.

import { createContext, useContext, useEffect, useMemo, ReactNode } from 'react';
import { lightTheme, darkTheme } from './presets';
import { tokenToCssVarName } from './css-variables';

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

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface ThemeProviderProps {
  children?: ReactNode;
  /** Base preset to use. Defaults to 'light'. */
  preset?: 'light' | 'dark';
  /** Partial overrides merged on top of the preset. */
  theme?: Partial<ThemeTokens>;
}

/**
 * Provides a resolved theme via React context and injects CSS custom properties
 * on the document root so that `var(--ui-*)` references work globally.
 *
 * Works without wrapping — once mounted, any component using `cssVar()` in
 * inline styles will pick up the values. Wrapping in ThemeProvider enables
 * programmatic access via `useTheme()` and scoped overrides.
 */
export function ThemeProvider({ children, preset = 'light', theme }: ThemeProviderProps) {
  const baseTheme = preset === 'dark' ? darkTheme : lightTheme;

  const resolvedTheme = useMemo<ThemeTokens>(
    () => ({ ...baseTheme, ...theme }),
    [baseTheme, theme],
  );

  // Inject CSS custom properties onto :root
  useEffect(() => {
    const root = document.documentElement;
    const keys = Object.keys(resolvedTheme) as Array<keyof ThemeTokens>;

    for (const key of keys) {
      root.style.setProperty(tokenToCssVarName(key), resolvedTheme[key]);
    }

    // Cleanup: remove properties when unmounted or theme changes
    return () => {
      for (const key of keys) {
        root.style.removeProperty(tokenToCssVarName(key));
      }
    };
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={resolvedTheme}>
      {children}
    </ThemeContext.Provider>
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
