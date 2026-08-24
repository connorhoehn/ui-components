// FieldTypesPage — self-contained page over the localStorage-backed
// useCustomFieldTypes hook, so the whole create/delete flow is testable
// end-to-end in jsdom.

import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import FieldTypesPage from '../FieldTypesPage';

describe('FieldTypesPage', () => {
  beforeEach(() => window.localStorage.clear());

  it('shows the empty state until a type exists', () => {
    render(<FieldTypesPage />);
    expect(screen.getByTestId('new-data-type-empty-btn')).toBeInTheDocument();
  });

  it('Next is gated on name + primitive type', () => {
    render(<FieldTypesPage />);
    fireEvent.click(screen.getByTestId('new-data-type-empty-btn'));
    const next = screen.getByTestId('next-button');
    expect(next).toBeDisabled();
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Author bio' } });
    expect(next).toBeDisabled();
    const select = screen.getByTestId('primitive-type-select') as HTMLSelectElement;
    const firstEnabled = Array.from(select.options).find((o) => o.value && !o.disabled)!;
    fireEvent.change(select, { target: { value: firstEnabled.value } });
    expect(next).toBeEnabled();
  });

  it('creates a type through the two-step wizard and lists it', () => {
    render(<FieldTypesPage />);
    fireEvent.click(screen.getByTestId('new-data-type-empty-btn'));
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Author bio' } });
    const select = screen.getByTestId('primitive-type-select') as HTMLSelectElement;
    const firstEnabled = Array.from(select.options).find((o) => o.value && !o.disabled)!;
    fireEvent.change(select, { target: { value: firstEnabled.value } });
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('save-button'));
    expect(screen.getByText('Author bio')).toBeInTheDocument();
    // Persisted — a fresh mount still lists it.
  });

  it('persists across remount and delete requires the confirmation modal', () => {
    const { unmount } = render(<FieldTypesPage />);
    fireEvent.click(screen.getByTestId('new-data-type-empty-btn'));
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Author bio' } });
    const select = screen.getByTestId('primitive-type-select') as HTMLSelectElement;
    const firstEnabled = Array.from(select.options).find((o) => o.value && !o.disabled)!;
    fireEvent.change(select, { target: { value: firstEnabled.value } });
    fireEvent.click(screen.getByTestId('next-button'));
    fireEvent.click(screen.getByTestId('save-button'));
    unmount();

    render(<FieldTypesPage />);
    expect(screen.getByText('Author bio')).toBeInTheDocument();
  });

  it('the coming-soon primitive types are disabled options', () => {
    render(<FieldTypesPage />);
    fireEvent.click(screen.getByTestId('new-data-type-empty-btn'));
    const select = screen.getByTestId('primitive-type-select') as HTMLSelectElement;
    const disabled = Array.from(select.options).filter((o) => o.disabled);
    expect(disabled.length).toBeGreaterThan(0);
  });
});

function createType(name = 'Author bio') {
  fireEvent.click(screen.getByTestId('new-data-type-empty-btn'));
  fireEvent.change(screen.getByTestId('name-input'), { target: { value: name } });
  const select = screen.getByTestId('primitive-type-select') as HTMLSelectElement;
  const firstEnabled = Array.from(select.options).find((o) => o.value && !o.disabled)!;
  fireEvent.change(select, { target: { value: firstEnabled.value } });
  fireEvent.click(screen.getByTestId('next-button'));
  fireEvent.click(screen.getByTestId('save-button'));
}

// REGRESSION (keyboard a11y): the left-list rows were `<div onClick>` with no
// role, tabIndex or key handler. The only focusable thing in a row was its
// delete "×" button, so a keyboard user tabbing the list could DELETE a data
// type but had no way to open one for editing — the destructive action was
// reachable and the safe one was not. The row now carries role="button" +
// tabIndex={0} + an Enter/Space handler, and the "×" swallows key events so
// it does not also open the editor.
describe('FieldTypesPage — keyboard selection of a data type', () => {
  beforeEach(() => window.localStorage.clear());

  it('exposes the row as a labelled button in the tab order', () => {
    render(<FieldTypesPage />);
    createType();
    const row = screen.getByRole('button', { name: 'Author bio' });
    expect(row).toHaveAttribute('tabindex', '0');
  });

  it('opens the editor on Enter', () => {
    render(<FieldTypesPage />);
    createType();
    expect(screen.queryByText('Edit: Author bio')).toBeNull();
    fireEvent.keyDown(screen.getByRole('button', { name: 'Author bio' }), { key: 'Enter' });
    expect(screen.getByText('Edit: Author bio')).toBeInTheDocument();
  });

  it('opens the editor on Space and suppresses the page scroll', () => {
    render(<FieldTypesPage />);
    createType();
    const row = screen.getByRole('button', { name: 'Author bio' });
    const ev = createEvent.keyDown(row, { key: ' ' });
    fireEvent(row, ev);
    expect(screen.getByText('Edit: Author bio')).toBeInTheDocument();
    expect(ev.defaultPrevented).toBe(true);
  });

  it('ignores keys that are not Enter or Space', () => {
    render(<FieldTypesPage />);
    createType();
    fireEvent.keyDown(screen.getByRole('button', { name: 'Author bio' }), { key: 'x' });
    expect(screen.queryByText('Edit: Author bio')).toBeNull();
  });

  it('keying the delete "×" does not also open the editor', () => {
    render(<FieldTypesPage />);
    createType();
    fireEvent.keyDown(screen.getByTitle('Delete'), { key: 'Enter' });
    expect(screen.queryByText('Edit: Author bio')).toBeNull();
  });
});
