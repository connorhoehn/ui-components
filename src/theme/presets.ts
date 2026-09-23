// src/theme/presets.ts
//
// Light and dark theme presets defining all design tokens as raw CSS values.
//
// The light preset's colours MUST match the @theme tokens in src/styles.css.
// They had drifted (primary #3b82f6 vs #646cff, success #10b981 vs #16a34a, and
// four more), which meant simply mounting <ThemeProvider> would silently
// rebrand the app once the provider started writing the real --color-* tokens.
// src/styles.css is the source of truth; mirror it here.

import type { ThemeTokens } from './ThemeProvider';

/** Default light theme — derived from the original hardcoded tokens. */
export const lightTheme: ThemeTokens = {
  // Colors
  primary: '#5a61ff',
  primaryDark: '#4f55ff',
  primaryLight: '#93c5fd',
  danger: '#dc2626',
  dangerLight: '#fca5a5',
  success: '#16a34a',
  successLight: '#6ee7b7',
  warning: '#d97706',
  warningLight: '#fcd34d',
  info: '#2563eb',
  infoLight: '#7dd3fc',

  // Text
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  // 4.6:1 on the #f8fafc background; the old #94a3b8 was 2.45:1 (AA fail).
  textMuted: '#64748b',
  textInverse: '#ffffff',

  // Surfaces
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceRaised: '#ffffff',
  surfaceOverlay: 'rgba(15, 23, 42, 0.5)',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',

  // Spacing
  spaceXs: '4px',
  spaceSm: '8px',
  spaceMd: '16px',
  spaceLg: '24px',
  spaceXl: '32px',

  // Font sizes
  fontXs: '11px',
  fontSm: '13px',
  fontMd: '14px',
  fontLg: '16px',
  fontXl: '22px',

  // Border radius
  radiusSm: '4px',
  radiusMd: '6px',
  radiusLg: '8px',
  radiusXl: '12px',
  radiusFull: '9999px',

  // Shadows
  shadowSm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
  shadowMd: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
  shadowLg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
  shadowXl: '0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)',
};

/** Dark theme preset — proper dark UI design, not simply inverted.
 *
 * MUST stay consistent with the `[data-theme="dark"]` token block in
 * src/styles.css (same source-of-truth direction as the light preset: the
 * CSS block mirrors this file). Primary was re-derived 2026-08 from the
 * brand indigo (#646cff lightened for dark surfaces) — it had drifted to a
 * plain blue (#60a5fa) from the pre-#646cff era. */
export const darkTheme: ThemeTokens = {
  // Colors
  primary: '#8b91ff',
  primaryDark: '#646cff',
  primaryLight: '#312e81',
  danger: '#f87171',
  dangerLight: '#7f1d1d',
  success: '#34d399',
  successLight: '#064e3b',
  warning: '#fbbf24',
  warningLight: '#78350f',
  info: '#38bdf8',
  infoLight: '#0c4a6e',

  // Text
  textPrimary: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textMuted: '#64748b',
  textInverse: '#0f172a',

  // Surfaces
  background: '#0f172a',
  surface: '#1e293b',
  surfaceRaised: '#334155',
  surfaceOverlay: 'rgba(0, 0, 0, 0.6)',
  border: '#334155',
  borderLight: '#1e293b',

  // Spacing (unchanged)
  spaceXs: '4px',
  spaceSm: '8px',
  spaceMd: '16px',
  spaceLg: '24px',
  spaceXl: '32px',

  // Font sizes (unchanged)
  fontXs: '11px',
  fontSm: '13px',
  fontMd: '14px',
  fontLg: '16px',
  fontXl: '22px',

  // Border radius (unchanged)
  radiusSm: '4px',
  radiusMd: '6px',
  radiusLg: '8px',
  radiusXl: '12px',
  radiusFull: '9999px',

  // Shadows — softer, using darker/more opaque values for dark backgrounds
  shadowSm: '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
  shadowMd: '0 4px 6px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.15)',
  shadowLg: '0 10px 15px rgba(0,0,0,0.3), 0 4px 6px rgba(0,0,0,0.15)',
  shadowXl: '0 20px 25px rgba(0,0,0,0.4), 0 10px 10px rgba(0,0,0,0.2)',
};
