// Both authoring wizards captioned their fields with a `<span>` — not even a
// `<label>`, so `htmlFor` was never on the table and the controls announced as
// bare "edit text" / "combo box". `FieldTypesPage` additionally rendered its
// "Label is required" validation message as plain text with nothing pointing
// at it, so a rejected name was announced nowhere at all.
//
// Queried by the visible caption so the assertions only pass if the
// association actually resolves.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { DocumentTypeWizard } from '../DocumentTypeWizard';
import FieldTypesPage from '../../field-types/FieldTypesPage';
import { readSelectOptions } from '../../../test-utils/selectListbox';

describe('DocumentTypeWizard step 1', () => {
  it('associates the Name and Description captions with their controls', () => {
    render(<DocumentTypeWizard onCancel={vi.fn()} onSave={vi.fn()} />);

    const name = screen.getByRole('textbox', { name: 'Name' });
    expect(name).toBe(screen.getByTestId('name-input'));
    // The "*" is aria-hidden, so the accessible name is exactly "Name" and the
    // requirement is exposed programmatically instead.
    expect(name).toHaveAttribute('aria-required', 'true');

    expect(screen.getByRole('textbox', { name: 'Description' })).toBe(
      screen.getByTestId('description-input'),
    );
  });
});

describe('FieldTypesPage step 1', () => {
  function renderPage() {
    const result = render(<FieldTypesPage />);
    // The page opens on the saved-types list; the wizard is behind "+ New".
    fireEvent.click(screen.getByRole('button', { name: '+ New' }));
    return result;
  }

  it('associates all three captions with their controls', () => {
    renderPage();
    expect(screen.getByRole('textbox', { name: 'Label' })).toBe(screen.getByTestId('name-input'));
    expect(screen.getByRole('textbox', { name: 'Description' })).toBe(
      screen.getByTestId('description-input'),
    );
    // The trailing gloss is a description, not part of the name.
    const type = screen.getByRole('combobox', { name: 'Field type' });
    expect(type).toBe(screen.getByTestId('primitive-type-select'));
    expect(type).toHaveAccessibleDescription('— what kind of data this field stores');
  });

  it('announces the Label validation error and reaches it from the field', () => {
    renderPage();
    const name = screen.getByRole('textbox', { name: 'Label' });

    // Next is disabled until a field type is chosen, so the empty-name error
    // is only reachable in this order: pick a type, THEN advance with the
    // name still blank. Selecting the first real option rather than a
    // hardcoded id keeps this from breaking when the catalog changes.
    const typeSelect = screen.getByTestId('primitive-type-select');
    const firstEnabled = readSelectOptions(typeSelect).find((o) => o.value && !o.disabled);
    expect(firstEnabled, 'no selectable field type in the catalog').toBeDefined();
    fireEvent.change(typeSelect, { target: { value: firstEnabled!.value } });

    fireEvent.click(screen.getByTestId('next-button'));

    // Asserted unconditionally. Guarding this behind `if (alert)` would make
    // the test pass when the error is announced NOWHERE — which is the exact
    // bug it exists to catch.
    const alert = screen.getByRole('alert');
    expect(name).toHaveAccessibleDescription(alert.textContent ?? '');
    expect(name).toHaveAttribute('aria-invalid', 'true');
  });
});
