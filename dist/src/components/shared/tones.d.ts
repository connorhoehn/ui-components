export declare const TONES: readonly ['neutral', 'success', 'warning', 'danger', 'info', 'caution', 'accent'];
export type Tone = (typeof TONES)[number];
/** Tone plus the historical alias kept for source compatibility. */
export type ToneOrAlias = Tone | 'purple';
/** Normalise a caller-supplied tone (folds the deprecated 'purple'). */
export declare function toneKey(tone: ToneOrAlias): Tone;
/** Soft tinted surface: background + readable foreground. */
export declare const TONE_SOFT: Record<Tone, string>;
/** Solid fill with inverse text. */
export declare const TONE_SOLID: Record<Tone, string>;
/** Solid swatch only — indicator dots, bars, legend keys. */
export declare const TONE_SOLID_BG: Record<Tone, string>;
/**
 * Translucent tinted fill: the tone's solid colour at 15% opacity behind its
 * own `-fg` text, rather than the soft surface's dedicated `-bg` token. A
 * debug badge sitting on an already-tinted or code-dark backdrop (a log
 * line, a canvas node chrome) wants to read as "this tone, dimmed" rather
 * than carry its own opaque card — `TONE_SOFT`'s `-bg` tokens are opaque and
 * fight that backdrop instead of sitting on it.
 */
export declare const TONE_TRANSLUCENT: Record<Tone, string>;
/** Border for a soft surface. */
export declare const TONE_BORDER: Record<Tone, string>;
/** Foreground only — labels, icons on an untinted surface. */
export declare const TONE_TEXT: Record<Tone, string>;
/** Soft background only. */
export declare const TONE_BG: Record<Tone, string>;
/**
 * The raw CSS variable for a tone's solid swatch, for the rare caller that
 * needs a colour value rather than a class (canvas/SVG fills, chart series).
 * Prefer the class maps above wherever a class will do.
 */
export declare function toneVar(tone: ToneOrAlias): string;
/** Which colour family a primitive paints in. See the block comment above. */
export type SurfaceTone = 'surface' | 'code';
/**
 * `TONE_SOFT` in the code family. One background for all tones — the code
 * palette carries meaning in the foreground, the way syntax highlighting
 * does; tinted backgrounds behind text this dark read as noise.
 */
export declare const CODE_TONE_SOFT: Record<Tone, string>;
/**
 * `TONE_SOLID` in the code family. Text is `code-bg` rather than white:
 * these accents are pastels, and white on a pastel fails contrast.
 */
export declare const CODE_TONE_SOLID: Record<Tone, string>;
/**
 * `TONE_TRANSLUCENT` in the code family — the pipeline debugger's badges
 * (idle/running/exit-code pills sitting directly on `--color-code-bg`, no
 * card of their own). Same recipe as the surface family: the accent colour
 * at 15% opacity behind text in that same colour, rather than
 * `CODE_TONE_SOFT`'s opaque `bg-code-surface`.
 */
export declare const CODE_TONE_TRANSLUCENT: Record<Tone, string>;
/** `TONE_SOLID_BG` in the code family — swatches, dots, legend keys. */
export declare const CODE_TONE_SOLID_BG: Record<Tone, string>;
/** `TONE_TEXT` in the code family — labels and icons on an untinted surface. */
export declare const CODE_TONE_TEXT: Record<Tone, string>;
//# sourceMappingURL=tones.d.ts.map