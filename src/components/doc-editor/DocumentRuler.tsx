// The ruler above the page.
//
// A word processor's ruler is not decoration: it is the only place the page's
// GEOMETRY is visible. Without one the margins are a fact you can see but not
// name — you can tell the text starts somewhere in from the edge, and nothing
// tells you it is exactly one inch, or lets you find the same measure twice.
//
// Everything here is derived from the same numbers the page itself uses, so
// the two cannot drift: 96px to the inch, an 816px (8.5in) page, 96px (1in)
// margins. Hand it different numbers and the ticks move with the paper.

import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

/** CSS pixels per inch at the canvas's 96dpi page scale. */
export const PX_PER_INCH = 96;

export interface DocumentRulerProps {
  /** Page width in CSS px. Default 816 — US Letter at 96dpi. */
  pageWidth?: number;
  /** Left margin in CSS px. Default 96 — one inch. */
  marginLeft?: number;
  /** Right margin in CSS px. Default 96 — one inch. */
  marginRight?: number;
  /**
   * Scale the page is displayed at, so the ruler tracks a zoomed page. 1 is
   * 100%; the ruler multiplies every measure by it rather than being told a
   * second set of numbers that could disagree with the first.
   */
  zoom?: number;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

/**
 * Whole-inch labels, plus minor ticks at every eighth of an inch.
 *
 * Numbering restarts at the left margin and counts outward in both
 * directions, which is what every word processor does and why "1 inch" on the
 * ruler means "one inch of TEXT", not one inch of paper.
 */
function ticksFor(pageWidth: number, marginLeft: number): Array<{
  x: number;
  kind: 'inch' | 'half' | 'minor';
  label?: string;
}> {
  const out: Array<{ x: number; kind: 'inch' | 'half' | 'minor'; label?: string }> = [];
  const step = PX_PER_INCH / 8;
  for (let x = 0; x <= pageWidth + 0.5; x += step) {
    const fromMargin = x - marginLeft;
    const inches = fromMargin / PX_PER_INCH;
    const nearest = Math.round(inches * 8) / 8;
    const isInch = Number.isInteger(nearest);
    const isHalf = !isInch && Math.abs(nearest * 2 - Math.round(nearest * 2)) < 1e-9;
    out.push({
      x,
      kind: isInch ? 'inch' : isHalf ? 'half' : 'minor',
      // 0 is the margin itself and is left unlabelled: the number would sit
      // exactly where the text begins and read as part of the document.
      label: isInch && nearest !== 0 ? String(Math.abs(nearest)) : undefined,
    });
  }
  return out;
}

export function DocumentRuler({
  pageWidth = 816,
  marginLeft = PX_PER_INCH,
  marginRight = PX_PER_INCH,
  zoom = 1,
  className,
  style,
  'data-testid': testId = 'document-ruler',
}: DocumentRulerProps) {
  const w = pageWidth * zoom;
  const ml = marginLeft * zoom;
  const mr = marginRight * zoom;
  const ticks = ticksFor(w, ml);

  return (
    <div
      data-testid={testId}
      // Presentational: a screen reader gains nothing from 68 tick marks, and
      // the measurements it describes are not actionable here.
      aria-hidden="true"
      // Centred by the track's own auto margins, not by justification: a
      // zoomed page is wider than the workspace, and a justified flex item
      // cannot be scrolled back to once it overflows.
      className={cn('flex select-none', className)}
      style={style}
    >
      {/* `shrink-0`: without it flex shrinks the track to the container and
          the ruler quietly measures the WORKSPACE instead of the page — at
          150% on a 924px workspace it drew 924px of ruler over 1224px of
          paper, which is worse than no ruler at all. */}
      <div
        className="relative h-6 shrink-0 mx-auto"
        style={{ width: w }}
        data-testid={`${testId}-track`}
      >
        {/* The text column reads as the page; the margins are the darker
            surround. Same figure/ground as the paper below it, so the eye
            lines the two up without having to measure. */}
        <div className="absolute inset-0 rounded-sm bg-surface-inset" />
        <div
          data-testid={`${testId}-text-area`}
          className="absolute inset-y-0 bg-paper"
          style={{ left: ml, right: mr }}
        />

        {ticks.map((t, i) => (
          <div
            key={i}
            className={cn(
              'absolute w-px bg-text-tertiary',
              t.kind === 'inch' ? 'opacity-0' : t.kind === 'half' ? 'opacity-60' : 'opacity-30',
            )}
            style={{
              left: t.x,
              top: t.kind === 'half' ? 8 : 10,
              height: t.kind === 'half' ? 8 : 4,
            }}
          />
        ))}

        {ticks
          .filter((t) => t.label)
          .map((t) => (
            <span
              key={`l${t.x}`}
              data-testid={`${testId}-label`}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] leading-none text-text-secondary"
              style={{ left: t.x }}
            >
              {t.label}
            </span>
          ))}

        {/* Margin boundaries. These are where the text column actually starts
            and stops, and the one measure a writer reaches for. */}
        {[ml, w - mr].map((x, i) => (
          <div
            key={`m${i}`}
            data-testid={`${testId}-margin-marker`}
            className="absolute inset-y-1 w-px bg-primary opacity-70"
            style={{ left: x }}
          />
        ))}
      </div>
    </div>
  );
}

export default DocumentRuler;
