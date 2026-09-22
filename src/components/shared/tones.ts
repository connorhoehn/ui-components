// tones.ts
//
// THE tone→class mapping for the library. Single source of truth.
//
// Every tinted surface — Chip, Badge, StackDiagram, StatusDot, banners —
// resolves through this module, and this module resolves through the semantic
// scale declared in styles.css (`--color-{tone}`, `-bg`, `-fg`, `-border`).
//
// Why it exists: Chip, Badge and StackDiagram each carried their own
// `Record<Tone, string>` of raw palette classes. They disagreed — Chip's
// success was green-50/green-600, Badge's was emerald-100/emerald-700 — so the
// same semantic state rendered in two different greens depending on which
// component you happened to use. Rebranding meant hunting every literal.
//
// To rebrand a tone, override its four CSS variables; every component follows.
// To add a tone, add it to TONES and give it the same four-role shape.

export const TONES = [
  'neutral',
  'success',
  'warning',
  'danger',
  'info',
  'caution',
  'accent',
] as const;

export type Tone = (typeof TONES)[number];

/** Tone plus the historical alias kept for source compatibility. */
export type ToneOrAlias = Tone | 'purple';

/** Normalise a caller-supplied tone (folds the deprecated 'purple'). */
export function toneKey(tone: ToneOrAlias): Tone {
  return tone === 'purple' ? 'accent' : tone;
}

/** Soft tinted surface: background + readable foreground. */
export const TONE_SOFT: Record<Tone, string> = {
  neutral: 'bg-neutral-bg text-neutral-fg',
  success: 'bg-success-bg text-success-fg',
  warning: 'bg-warning-bg text-warning-fg',
  danger: 'bg-danger-bg text-danger-fg',
  info: 'bg-info-bg text-info-fg',
  caution: 'bg-caution-bg text-caution-fg',
  accent: 'bg-accent-bg text-accent-fg',
};

/** Solid fill with inverse text. */
export const TONE_SOLID: Record<Tone, string> = {
  neutral: 'bg-neutral text-white',
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
  danger: 'bg-danger text-white',
  info: 'bg-info text-white',
  caution: 'bg-caution text-white',
  accent: 'bg-accent text-white',
};

/** Solid swatch only — indicator dots, bars, legend keys. */
export const TONE_SOLID_BG: Record<Tone, string> = {
  neutral: 'bg-neutral',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
  caution: 'bg-caution',
  accent: 'bg-accent',
};

/**
 * Translucent tinted fill: the tone's solid colour at 15% opacity behind its
 * own `-fg` text, rather than the soft surface's dedicated `-bg` token. A
 * debug badge sitting on an already-tinted or code-dark backdrop (a log
 * line, a canvas node chrome) wants to read as "this tone, dimmed" rather
 * than carry its own opaque card — `TONE_SOFT`'s `-bg` tokens are opaque and
 * fight that backdrop instead of sitting on it.
 */
export const TONE_TRANSLUCENT: Record<Tone, string> = {
  neutral: 'bg-neutral/15 text-neutral-fg',
  success: 'bg-success/15 text-success-fg',
  warning: 'bg-warning/15 text-warning-fg',
  danger: 'bg-danger/15 text-danger-fg',
  info: 'bg-info/15 text-info-fg',
  caution: 'bg-caution/15 text-caution-fg',
  accent: 'bg-accent/15 text-accent-fg',
};

/** Border for a soft surface. */
export const TONE_BORDER: Record<Tone, string> = {
  neutral: 'border-neutral-border',
  success: 'border-success-border',
  warning: 'border-warning-border',
  danger: 'border-danger-border',
  info: 'border-info-border',
  caution: 'border-caution-border',
  accent: 'border-accent-border',
};

/** Foreground only — labels, icons on an untinted surface. */
export const TONE_TEXT: Record<Tone, string> = {
  neutral: 'text-neutral-fg',
  success: 'text-success-fg',
  warning: 'text-warning-fg',
  danger: 'text-danger-fg',
  info: 'text-info-fg',
  caution: 'text-caution-fg',
  accent: 'text-accent-fg',
};

/** Soft background only. */
export const TONE_BG: Record<Tone, string> = {
  neutral: 'bg-neutral-bg',
  success: 'bg-success-bg',
  warning: 'bg-warning-bg',
  danger: 'bg-danger-bg',
  info: 'bg-info-bg',
  caution: 'bg-caution-bg',
  accent: 'bg-accent-bg',
};

/**
 * The raw CSS variable for a tone's solid swatch, for the rare caller that
 * needs a colour value rather than a class (canvas/SVG fills, chart series).
 * Prefer the class maps above wherever a class will do.
 */
export function toneVar(tone: ToneOrAlias): string {
  return `var(--color-${toneKey(tone)})`;
}

// ---------------------------------------------------------------------------
// Surface families
//
// The scale above is SEMANTIC (what the thing means). This axis is which
// colour FAMILY the primitive paints in, and the two are independent: a
// success chip exists in both.
//
// The library ships two families. `surface` is the app's own tokens, which
// flip with the host's light/dark theme. `code` is the permanently-dark
// Catppuccin family (--color-code-*) that terminals, log consoles and the
// pipeline debugger render in — those surfaces cannot follow the theme,
// because a PTY's own escape codes do not.
//
// Every primitive that hardcoded the app family got a `surface | code` prop
// defaulting to `surface`, so dropping a SearchInput or a Chip into a
// terminal pane no longer renders a light box in a black hole. Without it the
// "everything is backed by a primitive" rule is unsatisfiable in those
// surfaces and people hand-roll a <button> instead.
// ---------------------------------------------------------------------------

/** Which colour family a primitive paints in. See the block comment above. */
export type SurfaceTone = 'surface' | 'code';

/**
 * `TONE_SOFT` in the code family. One background for all tones — the code
 * palette carries meaning in the foreground, the way syntax highlighting
 * does; tinted backgrounds behind text this dark read as noise.
 */
export const CODE_TONE_SOFT: Record<Tone, string> = {
  neutral: 'bg-code-surface text-code-subtle',
  success: 'bg-code-surface text-code-green',
  warning: 'bg-code-surface text-code-peach',
  danger: 'bg-code-surface text-code-red',
  info: 'bg-code-surface text-code-blue',
  caution: 'bg-code-surface text-code-yellow',
  accent: 'bg-code-surface text-code-mauve',
};

/**
 * `TONE_SOLID` in the code family. Text is `code-bg` rather than white:
 * these accents are pastels, and white on a pastel fails contrast.
 */
export const CODE_TONE_SOLID: Record<Tone, string> = {
  neutral: 'bg-code-raised text-code-text',
  success: 'bg-code-green text-code-bg',
  warning: 'bg-code-peach text-code-bg',
  danger: 'bg-code-red text-code-bg',
  info: 'bg-code-blue text-code-bg',
  caution: 'bg-code-yellow text-code-bg',
  accent: 'bg-code-mauve text-code-bg',
};

/**
 * `TONE_TRANSLUCENT` in the code family — the pipeline debugger's badges
 * (idle/running/exit-code pills sitting directly on `--color-code-bg`, no
 * card of their own). Same recipe as the surface family: the accent colour
 * at 15% opacity behind text in that same colour, rather than
 * `CODE_TONE_SOFT`'s opaque `bg-code-surface`.
 */
export const CODE_TONE_TRANSLUCENT: Record<Tone, string> = {
  neutral: 'bg-code-subtle/15 text-code-subtle',
  success: 'bg-code-green/15 text-code-green',
  warning: 'bg-code-peach/15 text-code-peach',
  danger: 'bg-code-red/15 text-code-red',
  info: 'bg-code-blue/15 text-code-blue',
  caution: 'bg-code-yellow/15 text-code-yellow',
  accent: 'bg-code-mauve/15 text-code-mauve',
};

/** `TONE_SOLID_BG` in the code family — swatches, dots, legend keys. */
export const CODE_TONE_SOLID_BG: Record<Tone, string> = {
  neutral: 'bg-code-subtle',
  success: 'bg-code-green',
  warning: 'bg-code-peach',
  danger: 'bg-code-red',
  info: 'bg-code-blue',
  caution: 'bg-code-yellow',
  accent: 'bg-code-mauve',
};

/** `TONE_TEXT` in the code family — labels and icons on an untinted surface. */
export const CODE_TONE_TEXT: Record<Tone, string> = {
  neutral: 'text-code-subtle',
  success: 'text-code-green',
  warning: 'text-code-peach',
  danger: 'text-code-red',
  info: 'text-code-blue',
  caution: 'text-code-yellow',
  accent: 'text-code-mauve',
};
