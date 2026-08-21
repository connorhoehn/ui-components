import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('TypedDocumentForm widget mapping', () => {
  it('renders the right control per widget', () => {
    render(
      <TypedDocumentForm
        type={docType([
          field({ fieldId: 'title', widget: 'text_field' }),
          field({ fieldId: 'body', fieldType: 'long_text', widget: 'textarea' }),
          field({ fieldId: 'count', fieldType: 'number', widget: 'number_input' }),
          field({ fieldId: 'due', fieldType: 'date', widget: 'date_picker' }),
          field({ fieldId: 'done', fieldType: 'boolean', widget: 'checkbox' }),
          field({ fieldId: 'sev', fieldType: 'enum', widget: 'select', options: ['low', 'high'] }),
        ])}
        onSubmit={submitSpy()}
      />,
    );
    expect((screen.getByTestId('input-title') as HTMLInputElement).type).toBe('text');
    expect(screen.getByTestId('input-body').tagName).toBe('TEXTAREA');
    expect((screen.getByTestId('input-count') as HTMLInputElement).type).toBe('number');
    expect((screen.getByTestId('input-due') as HTMLInputElement).type).toBe('date');
    expect((screen.getByTestId('input-done') as HTMLInputElement).type).toBe('checkbox');
    expect(screen.getByTestId('input-sev').tagName).toBe('SELECT');
  });

  it('reference picker is disabled with a hint when no options exist for the type', () => {
    render(
      <TypedDocumentForm
        type={docType([
          field({ fieldId: 'ref', fieldType: 'reference', widget: 'reference_picker', referenceTypeId: 'other' }),
        ])}
        onSubmit={submitSpy()}
        referenceOptions={{}}
      />,
    );
    expect(screen.getByTestId('input-ref')).toBeDisabled();
    expect(screen.getByTestId('reference-empty-ref')).toBeInTheDocument();
  });
});

describe('TypedDocumentForm submit coercion', () => {
  it('coerces numbers, keeps booleans native, and drops empty optional fields', async () => {
    const onSubmit = submitSpy();
    render(
      <TypedDocumentForm
        type={docType([
          field({ fieldId: 'title' }),
          field({ fieldId: 'count', fieldType: 'number', widget: 'number_input' }),
          field({ fieldId: 'done', fieldType: 'boolean', widget: 'checkbox' }),
          field({ fieldId: 'skipped' }),
        ])}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.change(screen.getByTestId('input-title'), { target: { value: 'Standup' } });
    fireEvent.change(screen.getByTestId('input-count'), { target: { value: '42' } });
    fireEvent.submit(screen.getByTestId('typed-document-form'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit).toHaveBeenCalledWith({ title: 'Standup', count: 42, done: false });
  });

  it('blocks submit when a required field is empty', async () => {
    const onSubmit = submitSpy();
    render(
      <TypedDocumentForm
        type={docType([field({ fieldId: 'title', name: 'Title', required: true })])}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.submit(screen.getByTestId('typed-document-form'));
    expect(await screen.findByTestId('form-error')).toHaveTextContent('Title is required');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('boolean false passes a requireTrue=false validation but fails requireTrue', async () => {
    const onSubmit = submitSpy();
    render(
      <TypedDocumentForm
        type={docType([
          field({
            fieldId: 'agree', name: 'Agree', fieldType: 'boolean', widget: 'checkbox',
            validation: { requireTrue: true },
          }),
        ])}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.submit(screen.getByTestId('typed-document-form'));
    expect(await screen.findByTestId('form-error')).toHaveTextContent('Agree must be checked');
    fireEvent.click(screen.getByTestId('input-agree'));
    fireEvent.submit(screen.getByTestId('typed-document-form'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ agree: true }));
  });

  it('enforces string min/max/regex validation', async () => {
    const onSubmit = submitSpy();
    render(
      <TypedDocumentForm
        type={docType([
          field({ fieldId: 'code', name: 'Code', validation: { regex: '^[A-Z]{3}$' } }),
        ])}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.change(screen.getByTestId('input-code'), { target: { value: 'nope' } });
    fireEvent.submit(screen.getByTestId('typed-document-form'));
    expect(await screen.findByTestId('form-error')).toHaveTextContent('does not match');
    fireEvent.change(screen.getByTestId('input-code'), { target: { value: 'ABC' } });
    fireEvent.submit(screen.getByTestId('typed-document-form'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ code: 'ABC' }));
  });

  it('enforces numeric min/max', async () => {
    const onSubmit = submitSpy();
    render(
      <TypedDocumentForm
        type={docType([
          field({ fieldId: 'n', name: 'N', fieldType: 'number', widget: 'number_input', validation: { min: 10 } }),
        ])}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.change(screen.getByTestId('input-n'), { target: { value: '3' } });
    fireEvent.submit(screen.getByTestId('typed-document-form'));
    expect(await screen.findByTestId('form-error')).toHaveTextContent('at least 10');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('resets to defaults after a successful submit (and shows the success mark)', async () => {
    const onSubmit = submitSpy();
    render(
      <TypedDocumentForm type={docType([field({ fieldId: 'title' })])} onSubmit={onSubmit} />,
    );
    fireEvent.change(screen.getByTestId('input-title'), { target: { value: 'x' } });
    fireEvent.submit(screen.getByTestId('typed-document-form'));
    await screen.findByTestId('form-success');
    expect((screen.getByTestId('input-title') as HTMLInputElement).value).toBe('');
  });

  it('surfaces onSubmit rejection as the form error', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('server said no'));
    render(
      <TypedDocumentForm type={docType([field({ fieldId: 'title' })])} onSubmit={onSubmit} />,
    );
    fireEvent.change(screen.getByTestId('input-title'), { target: { value: 'x' } });
    fireEvent.submit(screen.getByTestId('typed-document-form'));
    expect(await screen.findByTestId('form-error')).toHaveTextContent('server said no');
  });
});

describe('TypedDocumentForm showWhen visibility', () => {
  const conditional = () =>
    docType([
      field({ fieldId: 'kind', fieldType: 'enum', widget: 'select', options: ['bug', 'task'] }),
      field({ fieldId: 'severity', showWhen: { fieldId: 'kind', equals: 'bug' } }),
    ]);

  it('hides the dependent field until the source matches, and drops it from the payload', async () => {
    const onSubmit = submitSpy();
    render(<TypedDocumentForm type={conditional()} onSubmit={onSubmit} />);
    expect(screen.queryByTestId('input-severity')).toBeNull();

    fireEvent.change(screen.getByTestId('input-kind'), { target: { value: 'bug' } });
    fireEvent.change(screen.getByTestId('input-severity'), { target: { value: 'p1' } });

    // Flip back — the field hides again and its value must NOT ship.
    fireEvent.change(screen.getByTestId('input-kind'), { target: { value: 'task' } });
    expect(screen.queryByTestId('input-severity')).toBeNull();
    fireEvent.submit(screen.getByTestId('typed-document-form'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ kind: 'task' }));
  });
});

describe('TypedDocumentForm unlimited cardinality', () => {
  const listType = (fieldType: 'text' | 'number' = 'text') =>
    docType([
      field({
        fieldId: 'tags', name: 'Tags', fieldType,
        widget: fieldType === 'number' ? 'number_input' : 'text_field',
        cardinality: 'unlimited',
      }),
    ]);

  it('adds and removes entries, never dropping below one row', () => {
    render(<TypedDocumentForm type={listType()} onSubmit={submitSpy()} />);
    fireEvent.click(screen.getByTestId('add-tags'));
    expect(screen.getByTestId('input-tags-1')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('remove-tags-1'));
    fireEvent.click(screen.getByTestId('remove-tags-0'));
    expect(screen.getByTestId('input-tags-0')).toBeInTheDocument();
  });

  it('submits only non-empty entries, coercing numbers', async () => {
    const onSubmit = submitSpy();
    render(<TypedDocumentForm type={listType('number')} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByTestId('input-tags-0'), { target: { value: '7' } });
    fireEvent.click(screen.getByTestId('add-tags'));
    fireEvent.submit(screen.getByTestId('typed-document-form'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ tags: [7] }));
  });

  it('number inputs silently refuse non-numeric text (browser guard), leaving the row empty', async () => {
    // The coerceUnlimited error path ("invalid value for number") is defensive:
    // a real <input type=number> — and jsdom — rejects non-numeric text at the
    // DOM level, so the stored value stays '' and submit sends an empty payload.
    const onSubmit = submitSpy();
    render(<TypedDocumentForm type={listType('number')} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByTestId('input-tags-0'), { target: { value: 'seven' } });
    expect((screen.getByTestId('input-tags-0') as HTMLInputElement).value).toBe('');
    fireEvent.submit(screen.getByTestId('typed-document-form'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({}));
  });
});
