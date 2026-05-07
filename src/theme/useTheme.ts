// src/theme/useTheme.ts
//
// Convenience hook for accessing the current theme tokens.

import { useThemeContext } from './ThemeProvider';
import type { ThemeTokens } from './ThemeProvider';

/**
 * Returns the current resolved theme tokens from the nearest ThemeProvider.
 * Falls back to the default light theme if no provider is present.
 */
export function useTheme(): ThemeTokens {
  return useThemeContext();
}
