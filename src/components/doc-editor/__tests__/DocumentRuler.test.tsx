// The ruler measures the page it sits above, or it measures nothing.

import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { DocumentRuler, PX_PER_INCH } from '../DocumentRuler';

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
