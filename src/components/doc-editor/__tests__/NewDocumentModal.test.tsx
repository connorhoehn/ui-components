import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import NewDocumentModal from '../NewDocumentModal';
import type { DocumentType, DocumentTypeField } from '../../../types/documentType';

const loadTypes = vi.fn<() => DocumentType[]>();
/**
 * The modal writes a picked cookbook straight into the offline cache — that is
 * what makes the editor able to resolve its sections a moment later. See
 * `ensureCookbookType`.
 */
const persistTypes = vi.fn<(types: DocumentType[]) => void>();

// `refreshTypesFromServer` is what makes the modal reconcile a cold cache with
// the server. It defaults to echoing the cache so existing cases behave as
// before; the reconciliation cases below override it.
let serverTypes: DocumentType[] | null = null;
vi.mock('../../../hooks/useDocumentTypes', () => ({
  loadTypes: () => loadTypes(),
  persistTypes: (types: DocumentType[]) => persistTypes(types),
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
  persistTypes.mockReset();
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

  // WAS: "zero types shows an empty-state fallback whose only control is
  // Close." That behaviour was the bug. A document type defines the SECTIONS a
  // document starts with, so only the `sections` shape needs one — a page is
  // one continuous document and a diagram is a whiteboard. Blocking the whole
  // dialog made a prerequisite for one shape lock out the other two, and left
  // "Create New Document" with nothing to do but close. The conversation
  // surface has always created untyped documents, so it was not even true.
  it('open + zero types: still lets you create a page', async () => {
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    const onCreate = vi.fn();
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    await act(async () => { await Promise.resolve(); });

    // The form is there, not a dead end.
    expect(screen.getByTestId('new-doc-submit')).toBeInTheDocument();
    expect(screen.getByTestId('new-doc-cancel')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Notes' } });
    fireEvent.click(screen.getByTestId('new-doc-submit'));

    // And it is a document, not a "Diagram" — the old payload called every
    // untyped document that, because a whiteboard used to be the only one.
    expect(onCreate).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Notes', shape: 'page', type: 'Document', icon: '\u{1F4C4}',
    }));
    expect(onCreate.mock.calls[0][0]).not.toHaveProperty('documentTypeId');
  });

  it('open + zero types: says where types come from without blocking', async () => {
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    await act(async () => { await Promise.resolve(); });
    expect(screen.getByTestId('no-document-types')).toHaveTextContent(/Document Types/);
  });

  // Sections ARE defined by a type, so that one shape genuinely cannot be
  // created without one — and the copy points at the way out.
  it('open + zero types: blocks only the shape that truly needs a type', async () => {
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    const onCreate = vi.fn();
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    await act(async () => { await Promise.resolve(); });

    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Notes' } });
    fireEvent.click(screen.getByTestId('doc-shape-sections'));
    fireEvent.click(screen.getByTestId('new-doc-submit'));
    expect(onCreate).not.toHaveBeenCalled();
    expect(screen.getByTestId('no-document-types')).toHaveTextContent(/page instead/);
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

  // The SEARCH box, not the title: the first thing to do in this dialog is
  // say what you are writing, and the answer to that picks a starting point
  // (and often the title with it).
  it('auto-focuses the search box ~50ms after open', () => {
    loadTypes.mockReturnValue([mkType()]);
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    // Modal's focus trap already lands on the first focusable element, which
    // is now this box — so the assertion is that the deferred focus AGREES
    // with it rather than yanking focus into the title field 50ms later.
    act(() => { vi.advanceTimersByTime(60); });
    expect(document.activeElement).toBe(screen.getByTestId('new-doc-search'));
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
    expect(screen.getByRole('group', { name: 'Your document types' })).toBeInTheDocument();
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

    expect(screen.getByText('Your document types')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Diagram'));
    expect(screen.queryByText('Your document types')).toBeNull();
    // and back again — the picker is hidden, not destroyed
    fireEvent.click(screen.getByText('Page'));
    expect(screen.getByText('Your document types')).toBeInTheDocument();
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

  // WAS: "still requires a type for Page and Sections". Only SECTIONS is
  // defined by a type — it is literally the list of sections a document starts
  // with. A page is one continuous document and a type merely decorates it
  // (icon + the chip the list shows), which is why the conversation surface
  // has always created untyped pages.
  it('requires a type for Sections only', async () => {
    const onCreate = vi.fn();
    loadTypes.mockReturnValue([]);          // no types available
    serverTypes = [];
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    await act(async () => { await Promise.resolve(); });

    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Notes' } });

    // Sections: refused, because there is no type to build them from.
    fireEvent.click(screen.getByTestId('doc-shape-sections'));
    expect(screen.getByTestId('new-doc-submit')).toBeDisabled();

    // Page: allowed.
    fireEvent.click(screen.getByTestId('doc-shape-page'));
    expect(screen.getByTestId('new-doc-submit')).not.toBeDisabled();

    // Diagram: allowed, as before.
    fireEvent.click(screen.getByTestId('doc-shape-diagram'));
    expect(screen.getByTestId('new-doc-submit')).not.toBeDisabled();
  });
});

// ── The known-type front door ───────────────────────────────────────────
//
// The fourteen prebuilt types used to be reachable only from a "Cookbooks"
// button on the Document Types page, i.e. the shortest path to a structured
// document ran THROUGH the field-by-field wizard we want people to need least.
// These pin the new shape of that: the types are in the create dialog, they are
// searchable, and picking one asks nobody to define a schema.
describe('NewDocumentModal — starting from a known type', () => {
  it('offers the prebuilt types even when the user has none of their own', async () => {
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    await act(async () => { await Promise.resolve(); });

    expect(screen.getByTestId('starter-cookbook-sprint-retro')).toBeInTheDocument();
    expect(screen.getByTestId('starter-cookbook-bug-report')).toBeInTheDocument();
    expect(screen.getByTestId('starter-cookbook-invoice')).toBeInTheDocument();
  });

  it('searches across name, tags and category', async () => {
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    await act(async () => { await Promise.resolve(); });

    // "retro" is in the retrospective's name AND its tags; "postmortem" is
    // only in the incident report's tags, which is exactly the word someone
    // would type for it.
    fireEvent.change(screen.getByTestId('new-doc-search'), { target: { value: 'retro' } });
    expect(screen.getByTestId('starter-cookbook-sprint-retro')).toBeInTheDocument();
    expect(screen.queryByTestId('starter-cookbook-invoice')).toBeNull();

    fireEvent.change(screen.getByTestId('new-doc-search'), { target: { value: 'postmortem' } });
    expect(screen.getByTestId('starter-cookbook-incident-report')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('new-doc-search'), { target: { value: 'zzzz' } });
    expect(screen.getByTestId('new-doc-no-matches')).toBeInTheDocument();
  });

  // THE TEN-SECOND PATH. Three keystrokes and Enter, no title typed, no schema
  // defined, and the document that comes out has the retro's sections.
  it('type "retro" + Enter creates the retrospective outright', async () => {
    const onCreate = vi.fn();
    const onClose = vi.fn();
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    render(<NewDocumentModal open onClose={onClose} onCreate={onCreate} />);
    await act(async () => { await Promise.resolve(); });

    const search = screen.getByTestId('new-doc-search');
    fireEvent.change(search, { target: { value: 'retro' } });
    fireEvent.keyDown(search, { key: 'Enter' });

    expect(onCreate).toHaveBeenCalledTimes(1);
    const meta = onCreate.mock.calls[0][0];
    expect(meta).toMatchObject({
      title: 'Sprint Retrospective',
      type: 'Sprint Retrospective',
      // The DEFAULT shape, untouched by the type. It used to be forced to
      // `sections` here, back when a type's fields had no page representation;
      // `macro:field` gave them one, and the host now seeds the retro's fields
      // as blocks. Nothing about picking a type changes the shape any more.
      shape: 'page',
    });
    expect(typeof meta.documentTypeId).toBe('string');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // The document editor resolves a template from the type CACHE, by name. If
  // the cookbook never lands there, the document opens empty — which is the
  // one failure this whole path exists to prevent.
  it('installs the picked cookbook into the type cache, fields and all', async () => {
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    await act(async () => { await Promise.resolve(); });

    fireEvent.click(screen.getByTestId('starter-cookbook-bug-report'));
    fireEvent.click(screen.getByTestId('new-doc-submit'));

    expect(persistTypes).toHaveBeenCalledTimes(1);
    const written = persistTypes.mock.calls[0][0];
    expect(written).toHaveLength(1);
    expect(written[0].name).toBe('Bug Report');
    expect(written[0].fields.length).toBeGreaterThan(3);
    expect(written[0].id).toEqual(expect.any(String));
  });

  it('reuses a type of the same name instead of installing a duplicate', async () => {
    const onCreate = vi.fn();
    const already = mkType({ id: 'already-here', name: 'Bug Report', icon: '🐛' });
    loadTypes.mockReturnValue([already]);
    serverTypes = [already];
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    await act(async () => { await Promise.resolve(); });

    fireEvent.click(screen.getByTestId('starter-cookbook-bug-report'));
    fireEvent.click(screen.getByTestId('new-doc-submit'));

    expect(persistTypes).not.toHaveBeenCalled();
    expect(onCreate).toHaveBeenCalledWith(
      expect.objectContaining({ documentTypeId: 'already-here', type: 'Bug Report' }),
    );
  });

  it('fills the title from the picked type, but never over one you typed', async () => {
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    await act(async () => { await Promise.resolve(); });

    fireEvent.click(screen.getByTestId('starter-cookbook-meeting-notes'));
    expect(screen.getByTestId('new-doc-title')).toHaveValue('Meeting Notes');

    // Switching starters re-fills, because the title is still ours.
    fireEvent.click(screen.getByTestId('starter-cookbook-invoice'));
    expect(screen.getByTestId('new-doc-title')).toHaveValue('Invoice');

    // Once the user writes their own, it is theirs.
    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'March billing' } });
    fireEvent.click(screen.getByTestId('starter-cookbook-meeting-notes'));
    expect(screen.getByTestId('new-doc-title')).toHaveValue('March billing');
  });

  // Sections used to be flatly impossible without a type of your own, and the
  // dialog said so. A known type IS a type the moment it is used.
  it('a known type satisfies the sections requirement with zero types of your own', async () => {
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    await act(async () => { await Promise.resolve(); });

    fireEvent.click(screen.getByTestId('doc-shape-sections'));
    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Notes' } });
    expect(screen.getByTestId('new-doc-submit')).toBeDisabled();

    fireEvent.click(screen.getByTestId('starter-cookbook-meeting-notes'));
    expect(screen.getByTestId('new-doc-submit')).not.toBeDisabled();
  });

  // The shape and the type are two independent questions, and this pins that
  // they stay independent. The old behaviour — picking a type forced
  // `sections`, and picking any shape discarded the type — made both controls
  // move under the user, and left all three shape cards reading
  // `aria-pressed="false"` with no shape visibly chosen at all.
  it('a type and a shape are chosen independently, and both stay chosen', async () => {
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={vi.fn()} />);
    await act(async () => { await Promise.resolve(); });

    // Page is the default and picking a type does not move it.
    fireEvent.click(screen.getByTestId('starter-cookbook-meeting-notes'));
    expect(screen.getByTestId('starter-cookbook-meeting-notes')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('doc-shape-page')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('doc-shape-sections')).toHaveAttribute('aria-pressed', 'false');

    // And switching shape keeps the type.
    fireEvent.click(screen.getByTestId('doc-shape-sections'));
    expect(screen.getByTestId('starter-cookbook-meeting-notes')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('doc-shape-sections')).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(screen.getByTestId('doc-shape-page'));
    expect(screen.getByTestId('starter-cookbook-meeting-notes')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('doc-shape-page')).toHaveAttribute('aria-pressed', 'true');
  });

  // Diagram is the ONE real coupling: a whiteboard has no document type, so the
  // two choices genuinely cannot both stand. It resolves in both directions
  // rather than leaving an incoherent pair selected.
  it('diagram and a type cannot both stand, in either direction', async () => {
    const onCreate = vi.fn();
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    await act(async () => { await Promise.resolve(); });

    fireEvent.click(screen.getByTestId('starter-cookbook-meeting-notes'));
    fireEvent.click(screen.getByTestId('doc-shape-diagram'));
    expect(screen.getByTestId('starter-cookbook-meeting-notes')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('doc-shape-diagram')).toHaveAttribute('aria-pressed', 'true');

    // And back: a type picked on a whiteboard moves to Page, the default.
    fireEvent.click(screen.getByTestId('starter-cookbook-meeting-notes'));
    expect(screen.getByTestId('doc-shape-diagram')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('doc-shape-page')).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(screen.getByTestId('new-doc-submit'));
    expect(onCreate).toHaveBeenCalledWith(
      expect.objectContaining({ shape: 'page', type: 'Meeting Notes' }),
    );
  });

  // The shape a typed create reports is the shape the person chose, both ways.
  // The `sections` half is the legacy path and must not have moved: legacy
  // documents are section-shaped and `canvas-shape-blind-spot` is real.
  it('a known type creates on whichever shape is selected', async () => {
    const onCreate = vi.fn();
    loadTypes.mockReturnValue([]);
    serverTypes = [];
    render(<NewDocumentModal open onClose={vi.fn()} onCreate={onCreate} />);
    await act(async () => { await Promise.resolve(); });

    fireEvent.click(screen.getByTestId('starter-cookbook-bug-report'));
    fireEvent.click(screen.getByTestId('new-doc-submit'));
    expect(onCreate.mock.calls[0][0]).toMatchObject({ shape: 'page', type: 'Bug Report' });
    expect(typeof onCreate.mock.calls[0][0].documentTypeId).toBe('string');

    // `onClose` is a spy here, so the dialog is still standing and still holds
    // the same type — which is the point: switching shape and submitting again
    // is all it takes to get the other surface.
    onCreate.mockClear();
    fireEvent.click(screen.getByTestId('doc-shape-sections'));
    fireEvent.click(screen.getByTestId('new-doc-submit'));
    expect(onCreate.mock.calls[0][0]).toMatchObject({ shape: 'sections', type: 'Bug Report' });
  });
});
