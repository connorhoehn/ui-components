import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import NewDocumentModal from '../NewDocumentModal';
import type { DocumentType, DocumentTypeField } from '../../../types/documentType';

const loadTypes = vi.fn<() => DocumentType[]>();

// `refreshTypesFromServer` is what makes the modal reconcile a cold cache with
// the server. It defaults to echoing the cache so existing cases behave as
// before; the reconciliation cases below override it.
let serverTypes: DocumentType[] | null = null;
vi.mock('../../../hooks/useDocumentTypes', () => ({
  loadTypes: () => loadTypes(),
  refreshTypesFromServer: async () => ({
    ok: true as const,
    types: serverTypes ?? loadTypes(),
  }),
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

  it('open + zero types: shows empty-state fallback; Close fires onClose; no footer Cancel/Create', async () => {
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    const onClose = vi.fn();
    render(<NewDocumentModal open onClose={onClose} onCreate={vi.fn()} />);
    // Only AFTER the server confirms there are none. While the probe is in
    // flight the modal says "Loading document types…" — see the next test.
    await act(async () => { await Promise.resolve(); });
    expect(screen.getByText(/No document types defined yet/)).toBeInTheDocument();
    expect(screen.queryByTestId('new-doc-submit')).toBeNull();
    expect(screen.queryByTestId('new-doc-cancel')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // THE BUG THIS PINS. The modal used to read localStorage and nothing else, so
  // a client that had never opened the Document Types page — a fresh browser, an
  // incognito window, or any client after a server-side wipe cleared its cache —
  // was told "No document types defined yet. Create one first." while the server
  // held four. That is worse than unhelpful: following the advice creates
  // duplicates of types the user already has.
  it('reconciles a COLD CACHE with the server instead of claiming none exist', async () => {
    loadTypes.mockReturnValue([]);                        // cache empty
    serverTypes = [mkType({ id: 's1', name: 'Research Note' })]; // server has one

    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);

    // Never accuses the user of having no types while it is still asking.
    expect(screen.queryByText(/No document types defined yet/)).toBeNull();
    expect(screen.getByText(/Loading document types/)).toBeInTheDocument();

    await act(async () => { await Promise.resolve(); });
    expect(screen.getByText('Research Note')).toBeInTheDocument();
    expect(screen.queryByText(/No document types defined yet/)).toBeNull();
  });

  it('keeps a warm cache when the server is unreachable', async () => {
    // Offline with types already cached is a usable form; blanking it would be
    // a worse answer than a slightly stale one.
    const cached = mkType({ id: 'c1', name: 'Cached Type' });
    loadTypes.mockReturnValue([cached]);
    serverTypes = null; // mock echoes the cache
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    await act(async () => { await Promise.resolve(); });
    expect(screen.getByText('Cached Type')).toBeInTheDocument();
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
      shape: 'page',
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
    // The count is only true for a sectioned document — a page starts blank.
    fireEvent.click(screen.getByTestId('doc-shape-sections'));
    expect(screen.getByTestId('type-option-one').textContent).toContain('1 section');
    expect(screen.getByTestId('type-option-one').textContent).not.toContain('1 sections');
    expect(screen.getByTestId('type-option-two').textContent).toContain('2 sections');
  });
});

// ── Document shape ──────────────────────────────────────────────────────
describe('NewDocumentModal — page vs sections', () => {
  it('preselects Page', () => {
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    expect(screen.getByTestId('doc-shape-page')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('doc-shape-sections')).toHaveAttribute('aria-pressed', 'false');
  });

  it('describes both shapes in words, never as a schema version', () => {
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    expect(screen.getByTestId('doc-shape-page').textContent).toContain('One continuous document');
    expect(screen.getByTestId('doc-shape-sections').textContent).toContain('section forms');
    expect(screen.getByRole('dialog').textContent).not.toMatch(/schemaVersion/i);
  });

  it('reports the chosen shape on create', () => {
    const onCreate = vi.fn();
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    fireEvent.click(screen.getByTestId('doc-shape-sections'));
    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Notepad' } });
    fireEvent.click(screen.getByTestId('new-doc-submit'));
    expect(onCreate).toHaveBeenCalledWith(expect.objectContaining({ shape: 'sections' }));
  });

  it('resets to Page each time the modal opens', () => {
    loadTypes.mockReturnValue([mkType()]);
    const { rerender } = render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    fireEvent.click(screen.getByTestId('doc-shape-sections'));
    expect(screen.getByTestId('doc-shape-sections')).toHaveAttribute('aria-pressed', 'true');
    rerender(<NewDocumentModal open={false} onClose={vi.fn()} onCreate={vi.fn()} />);
    rerender(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    expect(screen.getByTestId('doc-shape-page')).toHaveAttribute('aria-pressed', 'true');
  });
});

// ── Deep a11y audit ─────────────────────────────────────────────────────
describe('NewDocumentModal — accessibility wiring', () => {
  it('gives the dialog an accessible name', () => {
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    // The heading is rendered inside the card, so Modal's `aria-label={title}`
    // left the dialog announcing as a bare "dialog".
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Create New Document');
  });

  it('associates the Title and Description labels with their controls', () => {
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    // Before this, focusing the field announced only the placeholder.
    expect(screen.getByTestId('new-doc-title')).toBe(screen.getByLabelText(/^Title/));
    expect(screen.getByTestId('new-doc-description')).toBe(
      screen.getByLabelText(/^Description/),
    );
  });

  it('marks the title field required', () => {
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    expect(screen.getByTestId('new-doc-title')).toHaveAttribute('aria-required', 'true');
  });

  it('exposes the selected document type via aria-pressed', () => {
    loadTypes.mockReturnValue([mkType(), mkType({ id: 'brief', name: 'Brief' })]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    // Selection used to be conveyed by colour and a "✓" glyph alone.
    expect(screen.getByTestId('type-option-meeting-notes')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('type-option-brief')).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('names the document-type picker as a labelled group', () => {
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    expect(screen.getByRole('group', { name: 'Document Type' })).toBeInTheDocument();
  });
});

describe('NewDocumentModal — the diagram shape', () => {
  it('offers Diagram alongside Page and Sections', async () => {
    loadTypes.mockReturnValue([mkType({ id: 'a', name: 'Alpha' })]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    await act(async () => { await Promise.resolve(); });
    expect(screen.getByText('Diagram')).toBeInTheDocument();
    expect(screen.getByText('Page')).toBeInTheDocument();
    expect(screen.getByText('Sections')).toBeInTheDocument();
  });

  it('reports shape "diagram" on create', async () => {
    // The shape is the ONLY field the server never sees — it is applied to the
    // new document's CRDT by the seeder — so if it does not come out of here
    // correctly nothing downstream can recover it.
    const onCreate = vi.fn();
    loadTypes.mockReturnValue([mkType({ id: 'a', name: 'Alpha' })]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    await act(async () => { await Promise.resolve(); });

    fireEvent.click(screen.getByText('Diagram'));
    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Arch sketch' } });
    fireEvent.click(screen.getByTestId('new-doc-submit'));

    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(onCreate.mock.calls[0][0]).toMatchObject({ title: 'Arch sketch', shape: 'diagram' });
  });

  it('still defaults to Page, so the new option does not change the default', async () => {
    const onCreate = vi.fn();
    loadTypes.mockReturnValue([mkType({ id: 'a', name: 'Alpha' })]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    await act(async () => { await Promise.resolve(); });
    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'T' } });
    fireEvent.click(screen.getByTestId('new-doc-submit'));
    expect(onCreate.mock.calls[0][0]).toMatchObject({ shape: 'page' });
  });
});

describe('NewDocumentModal — a diagram needs no document type', () => {
  it('hides the type picker for Diagram, and shows it for the other shapes', async () => {
    loadTypes.mockReturnValue([mkType({ id: 'a', name: 'Alpha' })]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    await act(async () => { await Promise.resolve(); });

    expect(screen.getByText('Document Type')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Diagram'));
    expect(screen.queryByText('Document Type')).toBeNull();
    // and back again — the picker is hidden, not destroyed
    fireEvent.click(screen.getByText('Page'));
    expect(screen.getByText('Document Type')).toBeInTheDocument();
  });

  it('creates a diagram with only a title', async () => {
    // The guard used to require a selected type. With the picker hidden that
    // made Create permanently dead on this shape — a button waiting on a
    // control the user is never shown.
    const onCreate = vi.fn();
    loadTypes.mockReturnValue([mkType({ id: 'a', name: 'Alpha' })]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    await act(async () => { await Promise.resolve(); });

    fireEvent.click(screen.getByText('Diagram'));
    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Whiteboard' } });
    fireEvent.click(screen.getByTestId('new-doc-submit'));

    expect(onCreate).toHaveBeenCalledTimes(1);
    const meta = onCreate.mock.calls[0][0];
    expect(meta).toMatchObject({ title: 'Whiteboard', shape: 'diagram', type: 'Diagram' });
    expect(meta.documentTypeId).toBeUndefined();
  });

  it('still requires a type for Page and Sections', async () => {
    // The relaxation must not leak to the shapes that DO have structure.
    const onCreate = vi.fn();
    loadTypes.mockReturnValue([]);          // no types available
    serverTypes = [];
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    await act(async () => { await Promise.resolve(); });
    // With zero types there is nothing to select, so Page cannot submit.
    expect(screen.queryByTestId('new-doc-submit')).toBeNull();
  });
});
