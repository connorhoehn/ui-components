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
//
// ## Two coordinate systems, and the bug that lived between them
//
// There are DOCUMENT pixels (the page's own 96dpi grid: the sheet is 816 of
// them wide, whatever it is displayed at) and SCREEN pixels (what the reader
// actually sees, which is document pixels times the display scale).
//
// Every prop on this component is in DOCUMENT pixels, and `zoom` is the one
// place the conversion happens. That was not true before: the geometry scaled
// but `ticksFor` stepped and labelled with a hard 96, so at 150% it drew a
// label every 96 SCREEN px — every two thirds of a document inch — and called
// the first one "1". Measured on an 816px page at 150%: the "1" label sat at
// x=240 where one document inch is x=288, and the page grew eleven labels
// where it has eight inches. The ruler was not merely imprecise, it named
// measures the page did not have, which is why it shipped switched off.
//
// The fix is one line in the tick loop — walk in document pixels, emit screen
// pixels — and it is the whole reason the ruler can now be on by default.

import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

/** CSS pixels per inch at the canvas's 96dpi page scale. */
export const PX_PER_INCH = 96;

/**
 * Below this many screen pixels an eighth-inch tick stops being a mark and
 * becomes grey noise, so the eighths are dropped and the ruler falls back to
 * halves and inches. Dropping ticks changes the DENSITY, never the meaning: a
 * label still sits at the inch it names. At 8px this cuts in below ~67% —
 * so the 50% preset shows halves, and every preset from 75% up shows eighths.
 */
const MIN_MINOR_TICK_PX = 8;

export interface DocumentRulerProps {
  /**
   * Page width in DOCUMENT px — 816 is US Letter at 96dpi, and stays 816 at
   * every zoom. Pass a measured width divided by `zoom`, never the measured
   * width itself.
   */
  pageWidth?: number;
  /** Left margin in DOCUMENT px. Default 96 — one inch. */
  marginLeft?: number;
  /** Right margin in DOCUMENT px. Default 96 — one inch. */
  marginRight?: number;
  /**
   * Scale the page is displayed at. 1 is 100%.
   *
   * The ruler multiplies every measure by it — geometry AND the inch grid —
   * rather than being told a second set of numbers that could disagree with
   * the first. This is what keeps a label honest when the page is zoomed: an
   * inch mark moves to `96 * zoom` screen px and is still labelled 1.
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
 *
 * Walks in DOCUMENT px — so the label sequence is a property of the page and
 * reads identically at 50%, 100% and 150% — and emits SCREEN px, so each mark
 * lands over the text it measures.
 */
export function ticksFor(pageWidth: number, marginLeft: number, zoom = 1): Array<{
  x: number;
  kind: 'inch' | 'half' | 'minor';
  label?: string;
}> {
  const out: Array<{ x: number; kind: 'inch' | 'half' | 'minor'; label?: string }> = [];
  const step = PX_PER_INCH / 8; // an eighth of a DOCUMENT inch
  const showMinor = step * zoom >= MIN_MINOR_TICK_PX;
  for (let dx = 0; dx <= pageWidth + 0.5; dx += step) {
    const fromMargin = dx - marginLeft;
    const inches = fromMargin / PX_PER_INCH;
    const nearest = Math.round(inches * 8) / 8;
    const isInch = Number.isInteger(nearest);
    const isHalf = !isInch && Math.abs(nearest * 2 - Math.round(nearest * 2)) < 1e-9;
    if (!isInch && !isHalf && !showMinor) continue;
    out.push({
      // The single conversion. Everything above this line is the page's own
      // grid; everything below it is the screen.
      x: dx * zoom,
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
  // Screen px, for everything that gets positioned. The tick grid does its own
  // conversion because it has to count in inches first.
  const w = pageWidth * zoom;
  const ml = marginLeft * zoom;
  const mr = marginRight * zoom;
  const ticks = ticksFor(pageWidth, marginLeft, zoom);

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
            surround. Same figure/ground as the paper below it — `bg-paper`
            on `bg-workspace`, the desk the sheet floats on — so the eye
            lines the two up without having to measure, in both themes:
            `surface-inset` was a 5/255 tint off white paper and, once paper
            went dark (2.383.0), 3/255 off the dark sheet. */}
        <div className="absolute inset-0 rounded-sm bg-workspace" />
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
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] leading-none text-text-secondary"
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
