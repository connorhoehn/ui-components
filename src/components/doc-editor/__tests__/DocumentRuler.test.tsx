// The ruler measures the page it sits above, or it measures nothing.

import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { DocumentRuler, PX_PER_INCH, ticksFor } from '../DocumentRuler';

afterEach(cleanup);

const track = () => screen.getByTestId('document-ruler-track');
const textArea = () => screen.getByTestId('document-ruler-text-area');

describe('DocumentRuler', () => {
  it('is exactly as wide as the page', () => {
    render(<DocumentRuler />);
    expect(track()).toHaveStyle({ width: '816px' });
  });

  // The numbers count from the MARGIN, so "1" means one inch of text.
  it('labels whole inches out from the left margin', () => {
    render(<DocumentRuler />);
    const labels = screen.getAllByTestId('document-ruler-label').map((e) => e.textContent);
    // 816px page, 96px margin: one inch of left margin, then 7.5in of page
    // to the right of it — so 1 through 7, the last of which lands in the
    // right margin, exactly as a word processor numbers it.
    expect(labels).toEqual(['1', '1', '2', '3', '4', '5', '6', '7']);
  });

  it('does not label the margin itself', () => {
    render(<DocumentRuler />);
    expect(screen.queryAllByTestId('document-ruler-label').map((e) => e.textContent))
      .not.toContain('0');
  });

  it('marks both margins', () => {
    render(<DocumentRuler />);
    const markers = screen.getAllByTestId('document-ruler-margin-marker');
    expect(markers).toHaveLength(2);
    expect(markers[0]).toHaveStyle({ left: '96px' });
    expect(markers[1]).toHaveStyle({ left: '720px' }); // 816 - 96
  });

  it('paints the text column between the margins', () => {
    render(<DocumentRuler />);
    expect(textArea()).toHaveStyle({ left: '96px', right: '96px' });
  });

  // A ruler that ignores zoom is worse than none: it would name measures the
  // page no longer has.
  it('tracks a zoomed page', () => {
    render(<DocumentRuler zoom={1.5} />);
    expect(track()).toHaveStyle({ width: '1224px' });
    expect(screen.getAllByTestId('document-ruler-margin-marker')[0])
      .toHaveStyle({ left: '144px' });
  });

  it('follows custom margins', () => {
    render(<DocumentRuler marginLeft={48} marginRight={48} />);
    expect(textArea()).toHaveStyle({ left: '48px', right: '48px' });
  });

  it('is hidden from assistive tech — 68 ticks help nobody', () => {
    render(<DocumentRuler />);
    expect(screen.getByTestId('document-ruler')).toHaveAttribute('aria-hidden', 'true');
  });

  it('exports the page scale it measures in', () => {
    expect(PX_PER_INCH).toBe(96);
  });
});

// The reason the ruler shipped switched off, and the reason it can now ship on.
//
// The geometry always scaled; the TICK GRID did not. `ticksFor` stepped and
// labelled with a hard 96px inch while being handed screen pixels, so a zoomed
// ruler drew a label every 96 SCREEN px — two thirds of a document inch at
// 150% — and called the first one "1". It did not merely lose precision, it
// named measures the page did not have.
describe('DocumentRuler — an inch is an inch at every zoom', () => {
  const ZOOMS = [0.5, 1, 1.5];

  // The whole contract in one assertion: the label sequence is a property of
  // the PAGE, so it cannot depend on how large the page is being drawn.
  it.each(ZOOMS)('reads the same label sequence at %s', (zoom) => {
    render(<DocumentRuler zoom={zoom} />);
    expect(screen.getAllByTestId('document-ruler-label').map((e) => e.textContent))
      .toEqual(['1', '1', '2', '3', '4', '5', '6', '7']);
  });

  // The old grid grew labels with the scale — an 8.5in page sprouted eleven
  // inch marks at 150%, because it was counting screen pixels.
  it.each(ZOOMS)('grows no extra inches at %s', (zoom) => {
    expect(ticksFor(816, 96, zoom).filter((t) => t.label)).toHaveLength(8);
  });

  // Every labelled mark lands on the same DOCUMENT position, whatever the
  // scale. Dividing the screen position back by zoom must recover the 100%
  // layout exactly.
  it('places every label at the same document offset at every zoom', () => {
    const at100 = ticksFor(816, 96, 1).filter((t) => t.label);
    for (const zoom of ZOOMS) {
      const scaled = ticksFor(816, 96, zoom).filter((t) => t.label);
      expect(scaled.map((t) => ({ x: t.x / zoom, label: t.label }))).toEqual(
        at100.map((t) => ({ x: t.x, label: t.label })),
      );
    }
  });

  // The measure a writer actually reaches for: the gap between the left margin
  // marker and the "1" beside it has to BE one inch of screen at that scale.
  it.each(ZOOMS)('puts the first inch one document inch from the margin at %s', (zoom) => {
    render(<DocumentRuler zoom={zoom} />);
    const marginX = parseFloat(
      (screen.getAllByTestId('document-ruler-margin-marker')[0] as HTMLElement).style.left,
    );
    // Labels are ordered left to right; index 1 is the first one INSIDE the
    // text column (index 0 is the "1" out in the left margin).
    const firstInsideX = parseFloat(
      (screen.getAllByTestId('document-ruler-label')[1] as HTMLElement).style.left,
    );
    expect(firstInsideX - marginX).toBeCloseTo(PX_PER_INCH * zoom, 6);
  });

  // Both margin markers track the sheet's own text edges, which is what the
  // page renders as `96 * zoom` of padding on an `816 * zoom` sheet.
  it.each(ZOOMS)('lines both margin markers up with the text column at %s', (zoom) => {
    render(<DocumentRuler zoom={zoom} />);
    const [left, right] = screen.getAllByTestId('document-ruler-margin-marker') as HTMLElement[];
    expect(parseFloat(left.style.left)).toBeCloseTo(96 * zoom, 6);
    expect(parseFloat(right.style.left)).toBeCloseTo((816 - 96) * zoom, 6);
    expect(screen.getByTestId('document-ruler-track')).toHaveStyle({ width: `${816 * zoom}px` });
  });

  // Density is allowed to change with the scale — meaning is not. Eighth-inch
  // ticks 6px apart are grey noise, so below ~67% they go and the ruler falls
  // back to halves, with every label still on its own inch.
  it('drops the eighth-inch ticks when they would be noise', () => {
    expect(ticksFor(816, 96, 0.5).some((t) => t.kind === 'minor')).toBe(false);
    expect(ticksFor(816, 96, 1).some((t) => t.kind === 'minor')).toBe(true);
    // Halves and inches survive the cull, so the labels are untouched.
    expect(ticksFor(816, 96, 0.5).some((t) => t.kind === 'half')).toBe(true);
    expect(ticksFor(816, 96, 0.5).filter((t) => t.label)).toHaveLength(8);
  });

  // A clamped page: at 100% the sheet is `w-full max-w-[816px]`, so a narrow
  // workspace makes it genuinely narrower than a letter page and the ruler has
  // to measure what is there rather than what it assumed.
  it('follows a page narrower than a letter sheet', () => {
    render(<DocumentRuler pageWidth={600} zoom={1} />);
    expect(screen.getByTestId('document-ruler-track')).toHaveStyle({ width: '600px' });
    expect(screen.getAllByTestId('document-ruler-label').map((e) => e.textContent))
      .toEqual(['1', '1', '2', '3', '4', '5']);
  });
});
