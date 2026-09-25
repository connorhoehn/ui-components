import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';

import {
  CODE_TONE_SOFT,
  CODE_TONE_SOLID,
  CODE_TONE_SOLID_BG,
  CODE_TONE_TRANSLUCENT,
  TONE_BG,
  TONE_BORDER,
  TONE_SOFT,
  TONE_TEXT,
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

const SIZE_CLASSES: Record<'lg' | 'md' | 'sm' | 'xs', string> = {
  // A tag read as a word, not a badge — "Blocked" leading a work row (the
  // Initiatives v2 overview, 2.396.0): 14px regular type, 10px × 4px.
  lg: 'rounded-md px-2.5 py-1 text-[14px] font-normal leading-5',
  // A count pill beside a 15px tree row (the Folders explorer, 2.386.0).
  md: 'min-w-6 justify-center px-1.5 py-0.5 text-[12px] font-semibold leading-4 tabular-nums',
  sm: 'px-2 py-0.5 text-[11px]',
  xs: 'px-1.5 py-px text-[10px]',
};

const DOT_SIZE: Record<'lg' | 'md' | 'sm' | 'xs', string> = {
  lg: 'h-2 w-2',
  md: 'h-1.5 w-1.5',
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
  /** `lg` since 2.396.0: 14px regular text, 10px × 4px padding, 6px corners. */
  size?: 'lg' | 'md' | 'sm' | 'xs';
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
  /**
   * Outlined: a 1px border in the tone's `-border`, the tone's text colour,
   * and a faint surface wash instead of the soft `-bg` fill — a tag that sits
   * on an already-tinted row (the "Blocked" chip on `ActionRowList
   * tone="warning"`) without stacking a second tint on it. `surface` palette
   * only; ignored with `solid`/`translucent`. Since 2.393.1.
   *
   * `'soft'` (since 2.396.0): the same tone border and text over the tone's
   * pale `-bg` fill rather than the surface wash — a tag that should still
   * read as tinted on a tinted row (the Initiatives v2 "Blocked": pale red
   * fill, soft red border, red text).
   */
  outline?: boolean | 'soft';
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
  /**
   * Renders a dismiss control inside the chip. A removable chip is a token in
   * a multi-select (approvers, tags, filters), and every host that needed one
   * hand-rolled the same borderless `<button>` — `Button`'s boxed variants
   * were too heavy for a 12px glyph in a pill and `IconButton`'s smallest size
   * is a 24px square. This uses `Button variant="link"`, which is exactly the
   * inline, unpadded, font-size-inheriting control that shape wants.
   */
  onRemove?: () => void;
  /**
   * Accessible name for the remove control. Defaults to `Remove`, which is
   * fine for a lone chip and useless in a row of eight — pass
   * `removeLabel={`Remove ${name}`}` whenever the chip is one of several.
   */
  removeLabel?: string;
  /** `data-testid` on the remove control. */
  removeTestId?: string;
  /** Glyph inside the remove control. Defaults to a multiplication sign. */
  removeIcon?: ReactNode;
}

export default function Chip({
  tone = 'neutral',
  palette = 'surface',
  size = 'sm',
  solid = false,
  translucent = false,
  outline = false,
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
  onRemove,
  removeLabel = 'Remove',
  removeTestId,
  removeIcon = '×',
}: ChipProps) {
  const key = toneKey(tone);
  const family = PALETTE[palette] ?? PALETTE.surface;
  const paletteClasses = translucent
    ? family.translucent[key]
    : solid
      ? family.solid[key]
      : outline && palette === 'surface'
        ? cn('border', outline === 'soft' ? TONE_BG[key] : 'bg-surface/60', TONE_BORDER[key], TONE_TEXT[key])
        : family.soft[key];
  const hasAdornment = !!(dot || icon || onRemove);
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
      {onRemove && (
        <Button
          variant="link"
          tone={palette}
          onClick={(e) => {
            // A removable chip is often inside a clickable row or an <a>; the
            // dismiss must not also navigate or select.
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          aria-label={removeLabel}
          data-testid={removeTestId}
          className="ml-0.5 text-xs leading-none text-inherit no-underline hover:underline"
        >
          {removeIcon}
        </Button>
      )}
    </Root>
  );
}
