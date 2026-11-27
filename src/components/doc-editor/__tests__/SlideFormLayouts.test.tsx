// The slide form on the six layouts and two chart kinds added in 2.547.0.

import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SlideForm } from '../presentation/SlideForm';
import { makeSlide, validateDeckSpec, type DeckSlide, type SlideLayout } from '../presentation/deckSpec';

const sources = [{ documentId: 'doc-1', title: 'Notes' }];

let latest: DeckSlide;
function Harness({ initial }: { initial: DeckSlide }) {
  const [slide, setSlide] = useState(initial);
  latest = slide;
  return <SlideForm slide={slide} onChange={(next) => { latest = next; setSlide(next); }} sources={[]} testIdPrefix="f" />;
}

function mount(layout: SlideLayout, patch: Partial<DeckSlide> = {}) {
  const initial = { ...makeSlide('s1', layout), title: 'T', sources, ...patch };
  render(<Harness initial={initial} />);
  return initial;
}

const type = (testId: string, value: string) => fireEvent.change(screen.getByTestId(testId), { target: { value } });
const engineAccepts = (slide: DeckSlide) => validateDeckSpec({ title: 'D', slides: [slide] });

describe('SlideForm — key figures', () => {
  it('edits two to four figures, each named for a screen reader and capped', () => {
    mount('key-figures');
    expect(screen.getByTestId('f-figures-remove-0')).toBeDisabled();
    expect(screen.getByLabelText('Figure 1 value')).toHaveAttribute('maxLength', '12');
    expect(screen.getByLabelText('Figure 1 change, optional')).toHaveAttribute('maxLength', '24');
    type('f-figures-value-0', '42%');
    type('f-figures-label-0', 'Adoption');
    type('f-figures-delta-0', '+8 pts');
    type('f-figures-value-1', '$1.2M');
    type('f-figures-label-1', 'Saved');
    expect(engineAccepts(latest).ok).toBe(true);
    fireEvent.click(screen.getByTestId('f-figures-add'));
    fireEvent.click(screen.getByTestId('f-figures-add'));
    expect(latest.figures).toHaveLength(4);
    expect(screen.getByTestId('f-figures-add')).toBeDisabled();
    expect(screen.getByTestId('f-figures-count')).toHaveTextContent('4 of 2–4');
    fireEvent.click(screen.getByTestId('f-figures-remove-3'));
    expect(latest.figures).toHaveLength(3);
    type('f-figures-delta-0', '');
    expect(latest.figures![0]).toEqual({ value: '42%', label: 'Adoption' });
  });
});

describe('SlideForm — table', () => {
  it('adds and removes rows and columns within 8 by 5, keeping every row as wide as the header', () => {
    mount('table');
    type('f-table-header-0', 'Team');
    type('f-table-cell-0-0', 'Search');
    expect(screen.getByLabelText('Row 1, Team')).toHaveAttribute('maxLength', '40');
    for (let i = 0; i < 3; i += 1) fireEvent.click(screen.getByTestId('f-table-add-column'));
    expect(screen.getByTestId('f-table-add-column')).toBeDisabled();
    expect(latest.table!.header).toHaveLength(5);
    for (let i = 0; i < 7; i += 1) fireEvent.click(screen.getByTestId('f-table-add-row'));
    expect(screen.getByTestId('f-table-add-row')).toBeDisabled();
    expect(latest.table!.rows).toHaveLength(8);
    expect(latest.table!.rows.every((row) => row.length === 5)).toBe(true);
    fireEvent.click(screen.getByTestId('f-table-remove-column-1'));
    expect(latest.table!.header).toEqual(['Team', '', '', '']);
    expect(latest.table!.rows.every((row) => row.length === 4)).toBe(true);
    expect(screen.getByTestId('f-table-count')).toHaveTextContent('8 of 8 rows · 4 of 5 columns');
  });
});

describe('SlideForm — comparison, timeline, agenda, closing', () => {
  it('comparison: two titled lists and an optional verdict', () => {
    mount('comparison');
    type('f-comparison-left-title', 'Build');
    type('f-comparison-right-title', 'Buy');
    type('f-comparison-left-points-0', 'Control');
    type('f-comparison-right-points-0', 'Speed');
    expect(screen.getByLabelText('Verdict')).toHaveAttribute('maxLength', '140');
    type('f-comparison-verdict', 'Buy now');
    expect(engineAccepts(latest).ok).toBe(true);
    type('f-comparison-verdict', '');
    expect(latest.comparison).not.toHaveProperty('verdict');
    expect(screen.getByTestId('f-comparison-left-points-remove-0')).toBeDisabled();
  });

  it('timeline: three to six steps', () => {
    mount('timeline');
    expect(screen.getByTestId('f-timeline-remove-0')).toBeDisabled();
    ['Jan', 'Mar', 'Jun'].forEach((date, i) => { type(`f-timeline-date-${i}`, date); type(`f-timeline-label-${i}`, `Step ${i}`); });
    expect(engineAccepts(latest).ok).toBe(true);
    for (let i = 0; i < 3; i += 1) fireEvent.click(screen.getByTestId('f-timeline-add'));
    expect(screen.getByTestId('f-timeline-add')).toBeDisabled();
    expect(screen.getByLabelText('Step 6 date')).toHaveAttribute('maxLength', '16');
  });

  it('agenda: up to six items, one optionally current, and removing it clears the mark', () => {
    mount('agenda', { agenda: { items: ['Intro', 'Numbers', 'Asks'], current: 2 } });
    expect(screen.getByLabelText('Agenda item 1')).toHaveAttribute('maxLength', '80');
    fireEvent.click(screen.getByTestId('f-agenda-items-remove-2'));
    expect(latest.agenda).toEqual({ items: ['Intro', 'Numbers'] });
    for (let i = 0; i < 4; i += 1) fireEvent.click(screen.getByTestId('f-agenda-items-add'));
    expect(screen.getByTestId('f-agenda-items-add')).toBeDisabled();
    expect(screen.getByTestId('f-agenda-current')).toBeInTheDocument();
  });

  it('closing: a line, up to three next steps, an optional contact', () => {
    mount('closing');
    type('f-closing-line', 'Thank you');
    for (let i = 0; i < 3; i += 1) fireEvent.click(screen.getByTestId('f-closing-steps-add'));
    expect(screen.getByTestId('f-closing-steps-add')).toBeDisabled();
    ['Approve', 'Staff', 'Ship'].forEach((text, i) => type(`f-closing-steps-${i}`, text));
    type('f-closing-contact', 'Platform team');
    expect(engineAccepts(latest).ok).toBe(true);
    type('f-closing-contact', '');
    expect(latest.closing).not.toHaveProperty('contact');
  });
});

describe('SlideForm — chart kinds', () => {
  it('a pie holds one series and at most six slices, and says so when it holds more', () => {
    mount('chart', {
      chart: { kind: 'pie', labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'], series: [{ name: 'x', values: [1, 1, 1, 1, 1, 1, 1] }, { name: 'y', values: [1, 1, 1, 1, 1, 1, 1] }] },
    });
    expect(screen.getByTestId('f-chart-pie-problem')).toHaveTextContent('one series and at most 6 slices');
    expect(screen.getByTestId('f-chart-add-series')).toBeDisabled();
    expect(screen.getByTestId('f-chart-add-label')).toBeDisabled();
    fireEvent.click(screen.getByTestId('f-chart-remove-series-1'));
    fireEvent.click(screen.getByTestId('f-chart-remove-label-6'));
    expect(screen.queryByTestId('f-chart-pie-problem')).toBeNull();
    expect(engineAccepts(latest).ok).toBe(true);
  });
});
