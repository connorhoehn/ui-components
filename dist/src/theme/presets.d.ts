import type { ThemeTokens } from './ThemeProvider';
/** Default light theme — derived from the original hardcoded tokens. */
export declare const lightTheme: ThemeTokens;
/** Dark theme preset — proper dark UI design, not simply inverted.
 *
 * MUST stay consistent with the `[data-theme="dark"]` token block in
 * src/styles.css (same source-of-truth direction as the light preset: the
 * CSS block mirrors this file). Primary was re-derived 2026-08 from the
 * brand indigo (#646cff lightened for dark surfaces) — it had drifted to a
 * plain blue (#60a5fa) from the pre-#646cff era. */
export declare const darkTheme: ThemeTokens;
//# sourceMappingURL=presets.d.ts.map