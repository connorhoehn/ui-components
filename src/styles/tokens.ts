// src/styles/tokens.ts
//
// Design tokens exposed as CSS variable references.
// Components importing these values get `var(--ui-*)` strings, making them
// automatically reactive to theme changes via ThemeProvider.
//
// The original hardcoded values are preserved in `rawTokens` for use by the
// ThemeProvider defaults and any logic that needs actual color values.

import { cssVar } from '../theme/css-variables';

// ---------------------------------------------------------------------------
// Raw values (used by ThemeProvider as defaults)
// ---------------------------------------------------------------------------

export const rawColors = {
  primary: '#3b82f6',
  primaryDark: '#1d4ed8',
  primaryLight: '#93c5fd',
  danger: '#dc2626',
  dangerLight: '#fca5a5',
  success: '#10b981',
  successLight: '#6ee7b7',
  warning: '#f59e0b',
  warningLight: '#fcd34d',
  info: '#0ea5e9',
  infoLight: '#7dd3fc',
  textPrimary: '#1e293b',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  textInverse: '#ffffff',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceRaised: '#ffffff',
  surfaceOverlay: 'rgba(15, 23, 42, 0.5)',
} as const;

export const rawSpacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const rawFontSize = { xs: 11, sm: 13, md: 14, lg: 16, xl: 22 } as const;
export const rawBorderRadius = { sm: 4, md: 6, lg: 8, xl: 12, full: 9999 } as const;

export const rawTokens = {
  colors: rawColors,
  spacing: rawSpacing,
  fontSize: rawFontSize,
  borderRadius: rawBorderRadius,
} as const;

// ---------------------------------------------------------------------------
// CSS variable references (used by components)
// ---------------------------------------------------------------------------

export const colors = {
  primary: cssVar('primary'),
  primaryDark: cssVar('primaryDark'),
  primaryLight: cssVar('primaryLight'),
  danger: cssVar('danger'),
  dangerLight: cssVar('dangerLight'),
  success: cssVar('success'),
  successLight: cssVar('successLight'),
  warning: cssVar('warning'),
  warningLight: cssVar('warningLight'),
  info: cssVar('info'),
  infoLight: cssVar('infoLight'),
  textPrimary: cssVar('textPrimary'),
  textSecondary: cssVar('textSecondary'),
  textMuted: cssVar('textMuted'),
  textInverse: cssVar('textInverse'),
  border: cssVar('border'),
  borderLight: cssVar('borderLight'),
  background: cssVar('background'),
  surface: cssVar('surface'),
  surfaceRaised: cssVar('surfaceRaised'),
  surfaceOverlay: cssVar('surfaceOverlay'),
} as const;

export const spacing = {
  xs: cssVar('spaceXs'),
  sm: cssVar('spaceSm'),
  md: cssVar('spaceMd'),
  lg: cssVar('spaceLg'),
  xl: cssVar('spaceXl'),
} as const;

export const fontSize = {
  xs: cssVar('fontXs'),
  sm: cssVar('fontSm'),
  md: cssVar('fontMd'),
  lg: cssVar('fontLg'),
  xl: cssVar('fontXl'),
} as const;

export const borderRadius = {
  sm: cssVar('radiusSm'),
  md: cssVar('radiusMd'),
  lg: cssVar('radiusLg'),
  xl: cssVar('radiusXl'),
  full: cssVar('radiusFull'),
} as const;
