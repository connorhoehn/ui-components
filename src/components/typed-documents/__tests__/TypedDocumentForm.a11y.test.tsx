// TypedDocumentForm is a form GENERATOR — whatever it gets wrong, it gets
// wrong once per field in every document type a host defines.
//
// It got the same thing wrong that pipelines' ConfigField did: the `<label>`
// carried no `htmlFor` and wrapped no control, so it labelled NOTHING. Every
// generated input announced as a bare "edit text" / "combo box", the per-field
// `helpText` was unreachable, and the reference picker's "lookup failed" note
// — the only explanation for why the combo box is disabled — was announced
// nowhere.
//
// These tests query by the VISIBLE label text and assert the control comes
// back. Asserting `htmlFor` is present would prove nothing: an id pointing at
// no element still "has an id".

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TypedDocumentForm } from '../TypedDocumentForm';
import type { ApiDocumentType, ApiDocumentTypeField } from '../../../hooks/useTypedDocuments';

function field(partial: Partial<ApiDocumentTypeField> & { fieldId: string }): ApiDocumentTypeField {
  return {
    name: partial.fieldId,
    fieldType: 'text',
    widget: 'text_field',
    cardinality: 1,
    required: false,
    helpText: '',
    ...partial,
  } as ApiDocumentTypeField;
}

function docType(fields: ApiDocumentTypeField[]): ApiDocumentType {
  return {
    typeId: 'dt1', name: 'Meeting Notes', description: '', icon: '📄',
    fields, createdBy: 'u1', createdAt: '', updatedAt: '',
  };
}

const submitSpy = () => vi.fn<(v: Record<string, unknown>) => Promise<void>>().mockResolvedValue();

describe('TypedDocumentForm — generated fields are labelled', () => {
  it('associates every single-cardinality widget with its visible label', () => {
    render(
      <TypedDocumentForm
        type={docType([
          field({ fieldId: 'title', name: 'Title', widget: 'text_field' }),
          field({ fieldId: 'body', name: 'Body', fieldType: 'long_text', widget: 'textarea' }),
          field({ fieldId: 'count', name: 'Attendee count', fieldType: 'number', widget: 'number_input' }),
          field({ fieldId: 'due', name: 'Due date', fieldType: 'date', widget: 'date_picker' }),
          field({ fieldId: 'done', name: 'Completed', fieldType: 'boolean', widget: 'checkbox' }),
          field({ fieldId: 'sev', name: 'Severity', fieldType: 'enum', widget: 'select', options: ['low', 'high'] }),
        ])}
        onSubmit={submitSpy()}
      />,
    );

    expect(screen.getByLabelText('Title')).toBe(screen.getByTestId('input-title'));
    expect(screen.getByLabelText('Body')).toBe(screen.getByTestId('input-body'));
    expect(screen.getByLabelText('Attendee count')).toBe(screen.getByTestId('input-count'));
    expect(screen.getByLabelText('Due date')).toBe(screen.getByTestId('input-due'));
    expect(screen.getByLabelText('Completed')).toBe(screen.getByTestId('input-done'));
    expect(screen.getByLabelText('Severity')).toBe(screen.getByTestId('input-sev'));
  });

  it('names the controls by role, with the required marker dropped', () => {
    render(
      <TypedDocumentForm
        type={docType([
          field({ fieldId: 'title', name: 'Title', required: true }),
          field({ fieldId: 'sev', name: 'Severity', fieldType: 'enum', widget: 'select', options: ['low'] }),
        ])}
        onSubmit={submitSpy()}
      />,
    );

    // The "*" is aria-hidden, so accessible-name computation drops it and the
    // name is exactly the field name — not "Title *".
    const title = screen.getByRole('textbox', { name: 'Title' });
    expect(title).toBe(screen.getByTestId('input-title'));
    expect(title).toHaveAttribute('aria-required', 'true');
    expect(screen.getByRole('combobox', { name: 'Severity' })).toBe(screen.getByTestId('input-sev'));
  });

  it('reaches helpText through aria-describedby', () => {
    render(
      <TypedDocumentForm
        type={docType([field({ fieldId: 'title', name: 'Title', helpText: 'Keep it under 60 characters' })])}
        onSubmit={submitSpy()}
      />,
    );

    expect(screen.getByLabelText('Title')).toHaveAccessibleDescription('Keep it under 60 characters');
  });

  it('announces the reference picker load failure as its description', () => {
    render(
      <TypedDocumentForm
        type={docType([
          field({ fieldId: 'proj', name: 'Project', fieldType: 'reference', widget: 'reference_picker', referenceTypeId: 'dt2' }),
        ])}
        onSubmit={submitSpy()}
        referenceOptionsErrors={{ dt2: 'Could not load projects' }}
      />,
    );

    expect(screen.getByLabelText('Project')).toHaveAccessibleDescription('Could not load projects');
  });

  it('announces "nothing to reference" on the disabled picker', () => {
    render(
      <TypedDocumentForm
        type={docType([
          field({ fieldId: 'proj', name: 'Project', fieldType: 'reference', widget: 'reference_picker', referenceTypeId: 'dt2' }),
        ])}
        onSubmit={submitSpy()}
      />,
    );

    const picker = screen.getByLabelText('Project');
    expect(picker).toBeDisabled();
    expect(picker).toHaveAccessibleDescription(/No referenceable documents/);
  });

  it('groups an unlimited field and names each entry positionally', () => {
    render(
      <TypedDocumentForm
        type={docType([
          field({ fieldId: 'tags', name: 'Tags', cardinality: 'unlimited' }),
        ])}
        onSubmit={submitSpy()}
      />,
    );

    // `htmlFor` pointing at a repeating list would associate nothing, so the
    // label names a role="group" instead.
    const group = screen.getByRole('group', { name: 'Tags' });
    expect(group).toContainElement(screen.getByTestId('input-tags-0'));

    expect(screen.getByRole('textbox', { name: 'Tags 1' })).toBe(screen.getByTestId('input-tags-0'));
    // The add/remove buttons were a bare "+" and "−" glyph.
    expect(screen.getByRole('button', { name: 'Add another Tags' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove Tags 1' })).toBeInTheDocument();
  });
});
