// A Toolbar must not take arrow keys away from a text field inside it.
//
// Toolbar implements the roving-focus pattern: Left/Right move BETWEEN
// controls, Home/End jump to the ends of the row. It used to claim those four
// keys unconditionally, so a SearchInput inside a Toolbar was unusable —
// pressing Left to fix a typo moved focus to the next button, and Home/End
// left the field instead of going to the ends of the value. The visible cost
// was not a bug report but an avoidance: the app's document-list filter row
// uses `Inline` rather than `Toolbar`, because Toolbar broke the search box.
//
// Inside an editable control there is nothing to rove between, so the handler
// stands down and lets the browser do what the user expects. Tab still leaves
// the field, which is how a keyboard user exits it either way.

import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Toolbar } from '../Toolbar';
import { SearchInput } from '../SearchInput';

afterEach(cleanup);

function Row({ value = 'hello' }: { value?: string }) {
  return (
    <Toolbar aria-label="Filters">
      <button type="button">Before</button>
      <SearchInput value={value} onChange={() => {}} data-testid="filter" placeholder="Search…" />
      <button type="button">After</button>
    </Toolbar>
  );
}

const ARROWS = ['ArrowLeft', 'ArrowRight', 'Home', 'End'] as const;

describe('Toolbar roving focus vs text fields', () => {
  it.each(ARROWS)('leaves %s alone while a text field has focus', (key) => {
    render(<Row />);
    const field = screen.getByTestId('filter');
    field.focus();
    expect(document.activeElement).toBe(field);

    const e = fireEvent.keyDown(field, { key, bubbles: true });

    // Focus stayed put, and the event was not consumed — the browser is free
    // to move the caret.
    expect(document.activeElement).toBe(field);
    expect(e).toBe(true); // not preventDefault()ed
  });

  it('still roves between the buttons either side of the field', () => {
    render(<Row />);
    const before = screen.getByText('Before');
    before.focus();

    fireEvent.keyDown(before, { key: 'ArrowRight', bubbles: true });
    expect(document.activeElement).toBe(screen.getByTestId('filter'));

    // And from a button, End still reaches the last control.
    before.focus();
    fireEvent.keyDown(before, { key: 'End', bubbles: true });
    expect(document.activeElement).toBe(screen.getByText('After'));
  });
});

describe('SearchInput data-testid', () => {
  it('lands on the input, not the wrapper', () => {
    render(<SearchInput value="" onChange={() => {}} data-testid="filter" />);
    expect(screen.getByTestId('filter').tagName).toBe('INPUT');
  });
});
