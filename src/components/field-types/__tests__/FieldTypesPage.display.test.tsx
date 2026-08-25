// Regression: step 2 of the Data Types wizard was write-only.
//
// `handleSave` sent `{name, icon, description, primitiveType, baseType}` and
// nothing else. `CustomFieldType` had no field that could hold the Visible
// checkboxes or the renderer pickers, so both were discarded on Save — and
// because reopening for edit re-seeded from the primitive type's defaults, the
// form always came back showing all three modes visible with the first
// renderer. There was no way to tell a type you had configured that way from
// one whose configuration had been thrown away.
//
// Second, smaller bug in the same file: the `formatters` lazy initialiser ran
// once at mount, when `primitiveType` was still `''` in create mode, and stored
// `''` for every mode. `''` is not nullish, so step 2's `?? options[0]` fallback
// never fired.
//
// NOTE, because it is easy to mis-diagnose: this does NOT render a blank
// dropdown. React marks every <option> unselected, and the HTML
// option-selectedness algorithm (jsdom and browsers alike) then auto-selects
// the first option — so the control LOOKS correct while the state behind it is
// `''`. That silent divergence is the bug: the screen said "Rich Text Editor"
// and the value that would be submitted was empty. Hence the assertion below
// is on what a save actually writes, not on `select.value`.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import FieldTypesPage from '../FieldTypesPage';
import { CUSTOM_FIELD_TYPE_STORAGE_KEY, isValidCustomFieldType } from '../../../types/fieldType';
import type { CustomFieldType } from '../../../types/fieldType';
import { getFieldType } from '../../../renderers/registry';
import '../../../renderers';

function stored(): CustomFieldType[] {
  return JSON.parse(window.localStorage.getItem(CUSTOM_FIELD_TYPE_STORAGE_KEY) ?? '[]') as CustomFieldType[];
}

/** Pick a primitive type by id from the (grouped) select. */
function chooseType(primitiveId: string) {
  const select = screen.getByTestId('primitive-type-select') as HTMLSelectElement;
  fireEvent.change(select, { target: { value: primitiveId } });
}

/** Step 1 → step 2 for a named, typed field. */
function startWizard(name: string, primitiveId = 'long_text') {
  fireEvent.click(screen.getByTestId('new-data-type-button'));
  fireEvent.change(screen.getByTestId('name-input'), { target: { value: name } });
  chooseType(primitiveId);
  fireEvent.click(screen.getByTestId('next-button'));
}

describe('FieldTypesPage — step 2 survives Save', () => {
  beforeEach(() => window.localStorage.clear());

  it('an untouched renderer dropdown saves the option it is displaying', () => {
    render(<FieldTypesPage />);
    startWizard('Author bio');

    const editorSelect = screen.getByLabelText('Editor renderer') as HTMLSelectElement;
    expect(editorSelect.value).toBe('rich-text:editor');

    // Nobody touches the dropdown. The state behind it used to be `''`.
    fireEvent.click(screen.getByTestId('save-button'));
    expect(stored()[0].display?.editor?.renderer).toBe(editorSelect.value);
  });

  it('persists the Visible checkboxes', () => {
    render(<FieldTypesPage />);
    startWizard('Author bio');

    // Hide the field in Read mode.
    const readGroup = screen.getByRole('group', { name: 'Read' });
    fireEvent.click(readGroup.querySelector('input[type="checkbox"]')!);
    fireEvent.click(screen.getByTestId('save-button'));

    const [saved] = stored();
    expect(saved.display?.reader?.visible).toBe(false);
    expect(saved.display?.editor?.visible).toBe(true);
    expect(saved.display?.ack?.visible).toBe(true);
  });

  it('persists the renderer picked per view mode', () => {
    render(<FieldTypesPage />);
    startWizard('Checklist thing', 'list_text');

    const readerSelect = screen.getByLabelText('Read renderer') as HTMLSelectElement;
    expect(readerSelect.value).toBe('checklist:reader');
    fireEvent.click(screen.getByTestId('save-button'));

    const [saved] = stored();
    expect(saved.display?.reader?.renderer).toBe('checklist:reader');
    expect(saved.display?.editor?.renderer).toBe('checklist:editor');
  });

  it('reopening for edit shows what was configured, not the defaults', () => {
    render(<FieldTypesPage />);
    startWizard('Author bio');
    const readGroup = screen.getByRole('group', { name: 'Read' });
    fireEvent.click(readGroup.querySelector('input[type="checkbox"]')!);
    fireEvent.click(screen.getByTestId('save-button'));

    // Reopen.
    fireEvent.click(screen.getByRole('button', { name: 'Author bio' }));
    fireEvent.click(screen.getByTestId('next-button'));

    const reopened = screen.getByRole('group', { name: 'Read' });
    expect(reopened.querySelector('input[type="checkbox"]')).not.toBeChecked();
    expect(screen.getByRole('group', { name: 'Editor' }).querySelector('input[type="checkbox"]')).toBeChecked();
    // A hidden mode offers no renderer picker at all.
    expect(screen.queryByLabelText('Read renderer')).toBeNull();
  });

  it('does not carry a renderer across a field-type change', () => {
    render(<FieldTypesPage />);
    startWizard('Switcheroo', 'long_text');
    expect((screen.getByLabelText('Editor renderer') as HTMLSelectElement).value).toBe('rich-text:editor');

    // Back to step 1, switch the primitive type, forward again.
    fireEvent.click(screen.getByText('← Back'));
    chooseType('list_text');
    fireEvent.click(screen.getByTestId('next-button'));
    expect((screen.getByLabelText('Editor renderer') as HTMLSelectElement).value).toBe('checklist:editor');

    fireEvent.click(screen.getByTestId('save-button'));
    expect(stored()[0].display?.editor?.renderer).toBe('checklist:editor');
  });
});

describe('CustomFieldType.display — persistence + registry', () => {
  beforeEach(() => window.localStorage.clear());

  it('round-trips through the storage validator', () => {
    const base = {
      id: 'x', name: 'X', icon: '', description: '', baseType: 'rich-text',
      createdAt: '2024-01-01', updatedAt: '2024-01-01',
    };
    expect(isValidCustomFieldType(base)).toBe(true);
    expect(isValidCustomFieldType({ ...base, display: { reader: { visible: false } } })).toBe(true);
    expect(isValidCustomFieldType({ ...base, display: { reader: { visible: 'no' } } })).toBe(false);
    expect(isValidCustomFieldType({ ...base, display: { nope: { visible: true } } })).toBe(false);
    expect(isValidCustomFieldType({ ...base, display: [] })).toBe(false);
  });

  it('a hidden mode is withheld from the renderer registry', () => {
    render(<FieldTypesPage />);
    startWizard('Author bio');
    fireEvent.click(screen.getByRole('group', { name: 'Read' }).querySelector('input[type="checkbox"]')!);
    fireEvent.click(screen.getByTestId('save-button'));

    const def = getFieldType(stored()[0].id);
    expect(def).toBeDefined();
    // `rendererKeys` is what DocumentTypeWizard's per-mode picker offers.
    expect(def!.rendererKeys.reader).toBeUndefined();
    expect(def!.rendererKeys.editor).toEqual(['rich-text:editor']);
  });
});
