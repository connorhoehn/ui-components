import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

import {
  CODE_TONE_SOFT,
  CODE_TONE_SOLID,
  CODE_TONE_SOLID_BG,
  CODE_TONE_TRANSLUCENT,
  TONE_SOFT,
  TONE_SOLID,
  TONE_SOLID_BG,
  TONE_TRANSLUCENT,
  toneKey,
  type SurfaceTone,
  type ToneOrAlias,
} from './tones';

/** @see Tone — the library-wide semantic tone scale. */
export type ChipTone = ToneOrAlias;

/**
 * `tone` was already spoken for by the semantic scale, so the surface-family
 * axis is `palette` here. Same idea as `TitledFrame`'s `tone`, different word
 * only because renaming the seven-year-old `tone` prop would break every one
 * of Chip's several hundred call sites.
 */
export type ChipPalette = SurfaceTone;

const PALETTE = {
  surface: {
    soft: TONE_SOFT,
    solid: TONE_SOLID,
    translucent: TONE_TRANSLUCENT,
    swatch: TONE_SOLID_BG,
  },
  code: {
    soft: CODE_TONE_SOFT,
    solid: CODE_TONE_SOLID,
    translucent: CODE_TONE_TRANSLUCENT,
    swatch: CODE_TONE_SOLID_BG,
  },
} as const;

const SIZE_CLASSES: Record<'sm' | 'xs', string> = {
  sm: 'px-2 py-0.5 text-[11px]',
  xs: 'px-1.5 py-px text-[10px]',
};

const DOT_SIZE: Record<'sm' | 'xs', string> = {
  sm: 'h-1.5 w-1.5',
  xs: 'h-1 w-1',
};

export interface ChipProps {
  tone?: ChipTone;
  /**
   * Colour family. `surface` (default) follows the host theme; `code` paints
   * in the permanently-dark terminal palette, for chips inside a log console,
   * debugger or terminal pane.
   */
  palette?: ChipPalette;
  size?: 'sm' | 'xs';
  /** Solid fill (dark bg + white text) instead of soft tint. */
  solid?: boolean;
  /**
   * Translucent fill — the tone colour at 15% opacity behind text in that
   * same colour, rather than the soft variant's opaque `-bg` token. Matches
   * the pipeline debugger's status badges, which sit directly on
   * `code-bg`/other tinted chrome and don't want their own opaque card.
   * Takes precedence over `solid` if both are set.
   */
  translucent?: boolean;
  /** Monospace font — for count badges. */
  mono?: boolean;
  /** Indicator dot. 'static' = filled circle, 'pulse' = filled circle
   *  with an animated outer ping (matches Badge variant="pulse"). */
  dot?: 'static' | 'pulse';
  /** Uppercase the label with letter-spacing — the "REC" / "LIVE"
   *  pattern common to status pills. */
  uppercase?: boolean;
  /** Optional leading icon (SVG element). Sized by the chip's `size`. */
  icon?: ReactNode;
  children: ReactNode;
  title?: string;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
  'aria-label'?: string;
  /** When set, the chip renders as an `<a href>` instead of a `<span>`,
   *  carrying the same classes. `rel="noopener noreferrer"` is always
   *  applied — see `external` for `target="_blank"`. */
  href?: string;
  /** Only meaningful with `href`. Opens in a new tab (`target="_blank"`),
   *  matching `Link`'s `external` prop. */
  external?: boolean;
}

export default function Chip({
  tone = 'neutral',
  palette = 'surface',
  size = 'sm',
  solid = false,
  translucent = false,
  mono = false,
  dot,
  uppercase = false,
  icon,
  children,
  title,
  className,
  style,
  'data-testid': testId,
  'aria-label': ariaLabel,
  href,
  external = false,
}: ChipProps) {
  const key = toneKey(tone);
  const family = PALETTE[palette] ?? PALETTE.surface;
  const paletteClasses = translucent
    ? family.translucent[key]
    : solid
      ? family.solid[key]
      : family.soft[key];
  const hasAdornment = !!(dot || icon);
  const Root = href ? 'a' : 'span';
  const rootProps = href
    ? { href, target: external ? '_blank' : undefined, rel: 'noopener noreferrer' }
    : {};
  return (
    <Root
      {...rootProps}
      data-testid={testId}
      aria-label={ariaLabel}
      title={title}
      className={cn(
        'inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap',
        SIZE_CLASSES[size],
        paletteClasses,
        mono && 'font-mono',
        uppercase && 'uppercase tracking-wide',
        hasAdornment && 'gap-1',
        className,
      )}
      style={style}
    >
      {dot && (
        <span
          aria-hidden
          className={cn(
            'relative inline-block rounded-full shrink-0',
            DOT_SIZE[size],
            family.swatch[key],
          )}
        >
          {dot === 'pulse' && (
            <span
              aria-hidden
              className={cn(
                'absolute inset-0 rounded-full animate-ping opacity-70',
                family.swatch[key],
              )}
            />
          )}
        </span>
      )}
      {icon && (
        <span aria-hidden className="inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3">
          {icon}
        </span>
      )}
      {children}
    </Root>
  );
}
