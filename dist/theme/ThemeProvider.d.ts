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
export declare function ThemeProvider({ children, preset, theme }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Returns the current resolved theme tokens from the nearest ThemeProvider.
 * Falls back to the light theme if no provider is present.
 */
export declare function useThemeContext(): ThemeTokens;
//# sourceMappingURL=ThemeProvider.d.ts.map