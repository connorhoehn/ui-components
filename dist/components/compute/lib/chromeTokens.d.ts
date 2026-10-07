import type { CSSProperties } from 'react';
/** Which palette a lab surface paints in. */
export type ChromeTone = 'code' | 'app';
export declare const APP_CHROME_VARS: CSSProperties;
/**
 * The remap for a tone, or `undefined` to leave the code family alone.
 *
 * Returning `undefined` rather than an empty object matters: React skips the
 * `style` attribute entirely, so a `code`-toned lab carries no inline custom
 * properties at all and the tests can assert on their absence.
 */
export declare function chromeVarsFor(tone: ChromeTone): CSSProperties | undefined;
//# sourceMappingURL=chromeTokens.d.ts.map