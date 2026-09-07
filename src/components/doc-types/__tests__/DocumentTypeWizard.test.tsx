// The wizard's output is a document-type definition that other people's
// documents are then shaped by, so the payload handed to `onSave` is the
// contract worth pinning: pages must stay consistent with fields (a section
// removed from `fields` must also leave every page's `sectionIds`, or the
// renderer looks up an id that no longer exists), and removing a page must
// re-home its sections rather than orphan them. The step machine matters too:
// editing an existing type opens on Sections, not Basic Info, and Next is the
// only thing standing between an unnamed type and the API.

import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { DocumentType } from '../../../types/documentType';
import { DocumentTypeWizard } from '../DocumentTypeWizard';

type SavedType = Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>;

function renderWizard(initialType?: DocumentType) {
  const onSave = vi.fn<(t: SavedType) => void>();
  const onCancel = vi.fn();
  render(<DocumentTypeWizard initialType={initialType} onSave={onSave} onCancel={onCancel} />);
  return { onSave, onCancel };
}

function existingType(over: Partial<DocumentType> = {}): DocumentType {
  return {
    id: 'dt-1',
    name: 'Retro',
    description: 'Sprint retrospective',
    icon: '📄',
    fields: [
      { id: 'f1', name: 'Went well', sectionType: 'rich-text', required: false, defaultCollapsed: false, hiddenInModes: [], rendererOverrides: {} },
      { id: 'f2', name: 'Actions', sectionType: 'tasks', required: false, defaultCollapsed: false, hiddenInModes: [], rendererOverrides: {} },
    ],
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    ...over,
  } as DocumentType;
}

const next = () => fireEvent.click(screen.getByTestId('wizard-next'));

beforeEach(() => vi.clearAllMocks());

describe('DocumentTypeWizard step machine', () => {
  it('a new type starts on Basic Info with Next blocked until it is named', () => {
    renderWizard();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('wizard-next')).toBeDisabled();
  });

  it('whitespace does not count as a name', () => {
    renderWizard();
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: '   ' } });
    expect(screen.getByTestId('wizard-next')).toBeDisabled();
  });

  it('an existing type opens straight on Sections so its fields are visible', () => {
    renderWizard(existingType());
    expect(screen.queryByTestId('name-input')).toBeNull();
    expect(screen.getByTestId('field-name-f1')).toHaveValue('Went well');
  });

  it('Back returns to the previous step without losing the draft', () => {
    renderWizard();
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Standup' } });
    next();
    fireEvent.click(screen.getByRole('button', { name: '← Back' }));
    expect(screen.getByTestId('name-input')).toHaveValue('Standup');
  });

  it('the final step commits instead of advancing, and is labelled accordingly', () => {
    const { onSave } = renderWizard();
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Standup' } });
    next(); // → sections
    next(); // → view modes
    expect(screen.getByTestId('wizard-next')).toHaveTextContent('Create Type');
    next();
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('labels the commit "Save Changes" when editing', () => {
    renderWizard(existingType());
    next(); // sections → view modes
    expect(screen.getByTestId('wizard-next')).toHaveTextContent('Save Changes');
  });

  it('Cancel reports to the host without saving', () => {
    const { onSave, onCancel } = renderWizard();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onSave).not.toHaveBeenCalled();
  });
});

describe('DocumentTypeWizard save payload', () => {
  it('trims the name and carries the default icon for a brand-new type', () => {
    const { onSave } = renderWizard();
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: '  Standup  ' } });
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'daily' } });
    next(); next(); next();
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Standup',
      description: 'daily',
      icon: '📄',
      fields: [],
      pageConfig: { showTableOfContents: false },
    }));
  });

  it('preserves the icon of the type being edited', () => {
    const { onSave } = renderWizard(existingType({ icon: '🎯' }));
    next(); next();
    expect(onSave.mock.calls[0][0].icon).toBe('🎯');
  });

  it('always ships at least one page, holding every field id', () => {
    const { onSave } = renderWizard(existingType());
    next(); next();
    const saved = onSave.mock.calls[0][0];
    expect(saved.pages).toHaveLength(1);
    expect(saved.pages![0].sectionIds).toEqual(['f1', 'f2']);
  });
});

describe('DocumentTypeWizard sections', () => {
  it('adding a section registers it in both fields and the active page', () => {
    const { onSave } = renderWizard(existingType({ fields: [] }));
    fireEvent.click(screen.getByTestId('add-field-tasks'));
    next(); next();
    const saved = onSave.mock.calls[0][0];
    expect(saved.fields).toHaveLength(1);
    expect(saved.fields[0].sectionType).toBe('tasks');
    expect(saved.pages![0].sectionIds).toEqual([saved.fields[0].id]);
  });

  it('removing a section takes it out of the page list too, never orphaning an id', () => {
    const { onSave } = renderWizard(existingType());
    fireEvent.click(screen.getByRole('button', { name: 'Remove Went well' }));
    next(); next();
    const saved = onSave.mock.calls[0][0];
    expect(saved.fields.map((f) => f.id)).toEqual(['f2']);
    expect(saved.pages![0].sectionIds).toEqual(['f2']);
  });

  it('shows the empty prompt rather than an empty list', () => {
    renderWizard(existingType({ fields: [] }));
    expect(screen.getByText(/No sections yet/)).toBeInTheDocument();
  });
});

describe('DocumentTypeWizard pages', () => {
  it('starts single-page, with no per-page chrome', () => {
    renderWizard(existingType());
    expect(screen.queryByTestId('page-config-toc')).toBeNull();
    expect(screen.getByTestId('fields-list')).toBeInTheDocument();
  });

  it('adding a page switches to the multi-page layout and exposes the ToC toggle', () => {
    renderWizard(existingType());
    fireEvent.click(screen.getByTestId('add-page'));
    expect(screen.getByTestId('page-config-toc')).toBeInTheDocument();
    expect(screen.getByTestId('wizard-page-page-default')).toBeInTheDocument();
  });

  it('the removal control locks whenever only one page would be left', () => {
    renderWizard(existingType());
    fireEvent.click(screen.getByTestId('add-page'));
    fireEvent.click(screen.getByTestId('add-page'));
    expect(screen.getAllByTestId(/^wizard-page-/)).toHaveLength(3);
    expect(screen.getByTestId('page-remove-page-default')).not.toBeDisabled();

    const ids = screen.getAllByTestId(/^wizard-page-/)
      .map((el) => el.getAttribute('data-testid')!.replace('wizard-page-', ''));
    fireEvent.click(screen.getByTestId(`page-remove-${ids[2]}`));
    // Two pages left: still removable.
    expect(screen.getByTestId('page-remove-page-default')).not.toBeDisabled();
    fireEvent.click(screen.getByTestId(`page-remove-${ids[1]}`));
    // One page left — the multi-page layout collapses back to the flat list.
    expect(screen.queryAllByTestId(/^wizard-page-/)).toHaveLength(0);
    expect(screen.getByTestId('fields-list')).toBeInTheDocument();
  });

  it('removing a page re-homes its sections onto the first page', () => {
    const { onSave } = renderWizard(existingType());
    fireEvent.click(screen.getByTestId('add-page'));
    const pages = screen.getAllByTestId(/^wizard-page-/);
    const secondPageId = pages[1].getAttribute('data-testid')!.replace('wizard-page-', '');
    // New sections land on the newly added (active) page.
    fireEvent.click(screen.getByTestId('add-field-tasks'));
    fireEvent.click(screen.getByTestId(`page-remove-${secondPageId}`));
    next(); next();
    const saved = onSave.mock.calls[0][0];
    expect(saved.pages).toHaveLength(1);
    expect(saved.pages![0].sectionIds).toHaveLength(3);
  });

  it('a new section lands on whichever page is active', () => {
    const { onSave } = renderWizard(existingType({ fields: [] }));
    fireEvent.click(screen.getByTestId('add-page')); // becomes active
    const secondPageId = screen.getAllByTestId(/^wizard-page-/)[1]
      .getAttribute('data-testid')!.replace('wizard-page-', '');
    fireEvent.click(screen.getByTestId('add-field-tasks'));
    next(); next();
    const saved = onSave.mock.calls[0][0];
    const target = saved.pages!.find((p) => p.id === secondPageId)!;
    expect(target.sectionIds).toHaveLength(1);
    expect(saved.pages![0].sectionIds).toHaveLength(0);
  });

  it('renaming a page to blank stores undefined, not an empty string', () => {
    const { onSave } = renderWizard(existingType());
    fireEvent.click(screen.getByTestId('add-page'));
    fireEvent.change(screen.getByTestId('page-title-page-default'), { target: { value: 'Intro' } });
    next(); next();
    expect(onSave.mock.calls[0][0].pages![0].title).toBe('Intro');
  });

  it('page reorder arrows are disabled at the ends of the list', () => {
    renderWizard(existingType());
    fireEvent.click(screen.getByTestId('add-page'));
    expect(screen.getByTestId('page-up-page-default')).toBeDisabled();
    const secondPageId = screen.getAllByTestId(/^wizard-page-/)[1]
      .getAttribute('data-testid')!.replace('wizard-page-', '');
    expect(screen.getByTestId(`page-down-${secondPageId}`)).toBeDisabled();
  });

  it('the ToC toggle round-trips into the saved payload', () => {
    const { onSave } = renderWizard(existingType());
    fireEvent.click(screen.getByTestId('add-page'));
    fireEvent.click(within(screen.getByTestId('page-config-toc')).getByRole('checkbox'));
    next(); next();
    expect(onSave.mock.calls[0][0].pageConfig).toEqual({ showTableOfContents: true });
  });
});

describe('DocumentTypeWizard view modes', () => {
  it('sends the operator back to step 2 when there is nothing to configure', () => {
    renderWizard(existingType({ fields: [] }));
    next();
    expect(screen.getByText(/No fields defined/)).toBeInTheDocument();
  });

  it('hiding a field in one mode records only that mode', () => {
    const { onSave } = renderWizard(existingType());
    next();
    fireEvent.click(screen.getByTestId('visibility-f1-reader'));
    next();
    const saved = onSave.mock.calls[0][0];
    expect(saved.fields.find((f) => f.id === 'f1')!.hiddenInModes).toEqual(['reader']);
    expect(saved.fields.find((f) => f.id === 'f2')!.hiddenInModes).toEqual([]);
  });

  it('unhiding removes the mode again rather than adding a duplicate', () => {
    const { onSave } = renderWizard(existingType());
    next();
    fireEvent.click(screen.getByTestId('visibility-f1-ack'));
    fireEvent.click(screen.getByTestId('visibility-f1-ack'));
    next();
    expect(onSave.mock.calls[0][0].fields[0].hiddenInModes).toEqual([]);
  });

  it('a hidden field offers no renderer choice', () => {
    renderWizard(existingType());
    next();
    expect(screen.getByTestId('renderer-f1-editor')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('visibility-f1-editor'));
    expect(screen.queryByTestId('renderer-f1-editor')).toBeNull();
  });
});

describe('DocumentTypeWizard schema export', () => {
  it('is offered only for a type that already exists server-side', () => {
    renderWizard();
    expect(screen.queryByRole('button', { name: 'Export Schema' })).toBeNull();
  });

  it('appears once the type has an id', () => {
    renderWizard(existingType());
    expect(screen.getByRole('button', { name: 'Export Schema' })).toBeInTheDocument();
  });
});
