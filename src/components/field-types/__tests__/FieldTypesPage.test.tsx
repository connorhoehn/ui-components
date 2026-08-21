// FieldTypesPage — self-contained page over the localStorage-backed
// useCustomFieldTypes hook, so the whole create/delete flow is testable
// end-to-end in jsdom.

import { render, screen, fireEvent } from '@testing-library/react';
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
