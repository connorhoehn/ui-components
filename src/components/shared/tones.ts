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
