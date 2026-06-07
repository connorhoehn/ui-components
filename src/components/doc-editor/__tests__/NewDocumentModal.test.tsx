import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import NewDocumentModal from '../NewDocumentModal';
import type { DocumentType, DocumentTypeField } from '../../../types/documentType';

const loadTypes = vi.fn<() => DocumentType[]>();

vi.mock('../../../hooks/useDocumentTypes', () => ({
  loadTypes: () => loadTypes(),
}));

function mkField(id: string): DocumentTypeField {
  return {
    id, name: id, sectionType: 'rich-text', required: false,
    defaultCollapsed: false, placeholder: '', hiddenInModes: [], rendererOverrides: {},
  };
}

function mkType(over: Partial<DocumentType> = {}): DocumentType {
  return {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Agenda + action items',
    icon: '📝',
    fields: [mkField('f1')],
    createdAt: '2026-06-01T00:00:00Z',
    updatedAt: '2026-06-01T00:00:00Z',
    ...over,
  };
}

beforeEach(() => {
  loadTypes.mockReset();
  vi.useFakeTimers();
});
afterEach(() => { vi.useRealTimers(); });

describe('NewDocumentModal', () => {
  it('renders nothing when open=false', () => {
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open={false} onClose={vi.fn()} onCreate={vi.fn()} />);
    expect(screen.queryByText('Create New Document')).toBeNull();
    expect(loadTypes).not.toHaveBeenCalled();
  });

  it('open + zero types: shows empty-state fallback; Close fires onClose; no footer Cancel/Create', () => {
    loadTypes.mockReturnValue([]);
    const onClose = vi.fn();
    render(<NewDocumentModal open onClose={onClose} onCreate={vi.fn()} />);
    expect(screen.getByText(/No document types defined yet/)).toBeInTheDocument();
    expect(screen.queryByTestId('new-doc-submit')).toBeNull();
    expect(screen.queryByTestId('new-doc-cancel')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('open + types: first type is selected by default (✓ marker) and title input is rendered', () => {
    const a = mkType({ id: 'a', name: 'Alpha' });
    const b = mkType({ id: 'b', name: 'Beta' });
    loadTypes.mockReturnValue([a, b]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    const first = screen.getByTestId('type-option-a');
    expect(first.textContent).toContain('✓');
    const second = screen.getByTestId('type-option-b');
    expect(second.textContent).not.toContain('✓');
    expect(screen.getByTestId('new-doc-title')).toBeInTheDocument();
  });

  it('auto-focuses the title input ~50ms after open', () => {
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    expect(document.activeElement).not.toBe(screen.getByTestId('new-doc-title'));
    act(() => { vi.advanceTimersByTime(60); });
    expect(document.activeElement).toBe(screen.getByTestId('new-doc-title'));
  });

  it('clicking another type-grid card switches selection (✓ moves)', () => {
    const a = mkType({ id: 'a', name: 'Alpha' });
    const b = mkType({ id: 'b', name: 'Beta' });
    loadTypes.mockReturnValue([a, b]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    fireEvent.click(screen.getByTestId('type-option-b'));
    expect(screen.getByTestId('type-option-b').textContent).toContain('✓');
    expect(screen.getByTestId('type-option-a').textContent).not.toContain('✓');
  });

  it('Create Document is disabled until title is non-blank', () => {
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    const submit = screen.getByTestId('new-doc-submit') as HTMLButtonElement;
    expect(submit.disabled).toBe(true);

    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: '   ' } });
    expect(submit.disabled).toBe(true);

    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Hello' } });
    expect(submit.disabled).toBe(false);
  });

  it('clicking Create Document fires onCreate with trimmed meta + onClose; description undefined when blank', () => {
    const onCreate = vi.fn();
    const onClose = vi.fn();
    loadTypes.mockReturnValue([mkType({ id: 'mn', name: 'Meeting Notes', icon: '📝' })]);
    render(<NewDocumentModal open onClose={onClose} onCreate={onCreate} />);
    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: '  Q2 review  ' } });
    fireEvent.click(screen.getByTestId('new-doc-submit'));
    expect(onCreate).toHaveBeenCalledWith({
      title: 'Q2 review',
      type: 'Meeting Notes',
      description: undefined,
      icon: '📝',
      documentTypeId: 'mn',
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('description is trimmed and passed through when non-blank', () => {
    const onCreate = vi.fn();
    loadTypes.mockReturnValue([mkType({ id: 'mn', name: 'Meeting Notes', icon: '📝' })]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Review' } });
    fireEvent.change(screen.getByTestId('new-doc-description'), { target: { value: '  pre-mortem  ' } });
    fireEvent.click(screen.getByTestId('new-doc-submit'));
    expect(onCreate).toHaveBeenCalledWith(expect.objectContaining({ description: 'pre-mortem' }));
  });

  it('Enter key submits when title is valid; no-op when title blank or Shift+Enter', () => {
    const onCreate = vi.fn();
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    const title = screen.getByTestId('new-doc-title');

    // blank → ignored
    fireEvent.keyDown(title, { key: 'Enter' });
    expect(onCreate).not.toHaveBeenCalled();

    fireEvent.change(title, { target: { value: 'Hello' } });
    // Shift+Enter → ignored (newline path)
    fireEvent.keyDown(title, { key: 'Enter', shiftKey: true });
    expect(onCreate).not.toHaveBeenCalled();

    // bare Enter → submit
    fireEvent.keyDown(title, { key: 'Enter' });
    expect(onCreate).toHaveBeenCalledTimes(1);
  });

  it('Cancel button fires onClose without calling onCreate', () => {
    const onCreate = vi.fn();
    const onClose = vi.fn();
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open onClose={onClose} onCreate={onCreate} />);
    fireEvent.click(screen.getByTestId('new-doc-cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onCreate).not.toHaveBeenCalled();
  });

  it('section-count label pluralizes correctly (1 section vs N sections)', () => {
    const oneField = mkType({ id: 'one', name: 'OneSec', fields: [mkField('f1')] });
    const twoFields = mkType({ id: 'two', name: 'TwoSec', fields: [mkField('f1'), mkField('f2')] });
    loadTypes.mockReturnValue([oneField, twoFields]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    expect(screen.getByTestId('type-option-one').textContent).toContain('1 section');
    expect(screen.getByTestId('type-option-one').textContent).not.toContain('1 sections');
    expect(screen.getByTestId('type-option-two').textContent).toContain('2 sections');
  });
});
