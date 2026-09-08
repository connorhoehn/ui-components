import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { DocumentType } from '../../../types/documentType';

const mocks = vi.hoisted(() => ({
  hookReturn: {
    types: [] as DocumentType[],
    lastSync: null as null | { op: 'create' | 'update' | 'delete'; ok: boolean; key: number },
    createType: vi.fn(),
    updateType: vi.fn(),
    deleteType: vi.fn(),
    getType: vi.fn(),
  },
}));

vi.mock('../../../hooks/useDocumentTypes', () => ({
  useDocumentTypes: () => mocks.hookReturn,
}));

vi.mock('../DocumentTypeWizard', () => ({
  DocumentTypeWizard: ({
    initialType,
    onSave,
    onCancel,
  }: {
    initialType?: DocumentType;
    onSave: (data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
  }) => (
    <div data-testid="wizard-mock">
      <div data-testid="wizard-mode">{initialType ? 'edit' : 'create'}</div>
      <div data-testid="wizard-name">{initialType?.name ?? ''}</div>
      <button
        data-testid="wizard-save"
        onClick={() =>
          onSave({
            name: initialType ? 'Renamed type' : 'Saved type',
            description: 'd',
            icon: '📄',
            fields: [],
            sections: [],
            viewModes: [],
          } as unknown as Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>)
        }
      >
        save
      </button>
      <button data-testid="wizard-cancel" onClick={onCancel}>
        cancel
      </button>
    </div>
  ),
}));

vi.mock('../CookbooksModal', () => ({
  default: ({
    open,
    onClose,
    onCreated,
  }: {
    open: boolean;
    onClose: () => void;
    onCreated: (id: string) => void;
  }) =>
    open ? (
      <div data-testid="cookbooks-mock">
        <button data-testid="cookbooks-close" onClick={onClose}>
          close
        </button>
        <button
          data-testid="cookbooks-create"
          onClick={() => onCreated('cookbook-spawned-id')}
        >
          create
        </button>
      </div>
    ) : null,
}));

import { DocumentTypesPage } from '../DocumentTypesPage';

function makeType(id: string, name: string): DocumentType {
  return {
    id,
    name,
    description: '',
    icon: '📄',
    fields: [],
    sections: [],
    viewModes: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  } as unknown as DocumentType;
}

beforeEach(() => {
  mocks.hookReturn.types = [];
  mocks.hookReturn.lastSync = null;
  // These three are async and return a discriminated outcome the page reads
  // `.status` off. A bare mockReset() resolves undefined, which throws inside
  // the page's own promise and shows up only as an unhandled rejection — so
  // reset AND restore a default 'synced' outcome. Tests that care about
  // offline/rejected override it locally.
  mocks.hookReturn.createType.mockReset().mockResolvedValue({
    status: 'synced',
    type: makeType('t-new', 'New Type'),
  });
  mocks.hookReturn.updateType.mockReset().mockResolvedValue({
    status: 'synced',
    type: makeType('t1', 'Updated Type'),
  });
  mocks.hookReturn.deleteType.mockReset().mockResolvedValue({ status: 'synced' });
  mocks.hookReturn.getType.mockReset();
});

afterEach(cleanup);

describe('DocumentTypesPage — empty state', () => {
  it('shows the "No types yet" sidebar and idle empty-state with create CTA', () => {
    render(<DocumentTypesPage />);
    expect(screen.getByText('No types yet.')).toBeInTheDocument();
    expect(screen.getByTestId('idle-panel')).toBeInTheDocument();
    expect(screen.getByText('No document types yet')).toBeInTheDocument();
    const idleCta = screen.getByTestId('idle-create-btn');
    fireEvent.click(idleCta);
    expect(screen.getByTestId('wizard-mock')).toBeInTheDocument();
    expect(screen.getByTestId('wizard-mode').textContent).toBe('create');
  });
});

describe('DocumentTypesPage — list + mode switching', () => {
  it('renders one TypeListItem per stored type and toggles active highlight on edit', () => {
    mocks.hookReturn.types = [makeType('t1', 'Briefs'), makeType('t2', 'Memos')];
    render(<DocumentTypesPage />);
    expect(screen.getByTestId('type-item-t1')).toBeInTheDocument();
    expect(screen.getByTestId('type-item-t2')).toBeInTheDocument();
    expect(screen.getByText('Select a type to edit')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('edit-type-t2'));
    expect(screen.getByTestId('wizard-mock')).toBeInTheDocument();
    expect(screen.getByTestId('wizard-mode').textContent).toBe('edit');
    expect(screen.getByTestId('wizard-name').textContent).toBe('Memos');
  });

  it('enters create mode from the sidebar + New button', () => {
    mocks.hookReturn.types = [makeType('t1', 'Briefs')];
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('create-type-btn'));
    expect(screen.getByTestId('wizard-mode').textContent).toBe('create');
    expect(screen.getByTestId('wizard-name').textContent).toBe('');
  });

  it('cancel returns to the idle empty-state', () => {
    mocks.hookReturn.types = [makeType('t1', 'Briefs')];
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('edit-type-t1'));
    fireEvent.click(screen.getByTestId('wizard-cancel'));
    expect(screen.queryByTestId('wizard-mock')).toBeNull();
    expect(screen.getByText('Select a type to edit')).toBeInTheDocument();
  });
});

describe('DocumentTypesPage — save banner', () => {
  // The banner is now derived from the awaited outcome, not from a later
  // `lastSync` render. That is deliberate: the old two-phase version claimed
  // success first and appended "— synced"/"— offline" AFTER the fact, so it
  // announced a save it did not yet know had happened.
  it('states the create outcome once, in the same banner', async () => {
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('create-type-btn'));
    fireEvent.click(screen.getByTestId('wizard-save'));
    expect(mocks.hookReturn.createType).toHaveBeenCalledTimes(1);
    const banner = await screen.findByTestId('save-message');
    expect(banner.textContent).toContain('"Saved type" created');
    expect(banner.textContent).toContain('synced');
  });

  it('reports a rejected create as NOT saved and keeps the wizard open', async () => {
    mocks.hookReturn.createType.mockResolvedValue({ status: 'rejected', error: 'duplicate name' });
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('create-type-btn'));
    fireEvent.click(screen.getByTestId('wizard-save'));
    const banner = await screen.findByTestId('save-message');
    expect(banner.textContent).toContain('NOT saved');
    expect(banner.textContent).toContain('duplicate name');
    // Nothing was persisted, so the user's work must still be on screen.
    expect(screen.getByTestId('wizard-mock')).toBeInTheDocument();
  });

  it('surfaces the offline suffix when the update only saved locally', async () => {
    mocks.hookReturn.types = [makeType('t1', 'Briefs')];
    mocks.hookReturn.updateType.mockResolvedValue({
      status: 'offline',
      type: makeType('t1', 'Renamed type'),
      error: 'server unreachable',
    });
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('edit-type-t1'));
    fireEvent.click(screen.getByTestId('wizard-save'));
    expect(mocks.hookReturn.updateType).toHaveBeenCalledWith('t1', expect.any(Object));
    const banner = await screen.findByTestId('save-message');
    expect(banner.textContent).toContain('updated');
    expect(banner.textContent).toContain('offline');
  });
});

describe('DocumentTypesPage — delete flow', () => {
  it('cancel keeps the type intact and dismisses the modal', () => {
    mocks.hookReturn.types = [makeType('t1', 'Briefs')];
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('delete-type-t1'));
    expect(screen.getByText('Delete document type?')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('cancel-delete'));
    expect(screen.queryByText('Delete document type?')).toBeNull();
    expect(mocks.hookReturn.deleteType).not.toHaveBeenCalled();
  });

  it('confirm deletes via the hook and resets to idle when the active type was being edited', async () => {
    mocks.hookReturn.types = [makeType('t1', 'Briefs')];
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('edit-type-t1'));
    expect(screen.getByTestId('wizard-mock')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('delete-type-t1'));
    fireEvent.click(screen.getByTestId('confirm-delete'));
    expect(mocks.hookReturn.deleteType).toHaveBeenCalledWith('t1');
    // Reset-to-idle happens after the delete resolves.
    await waitFor(() => expect(screen.queryByTestId('wizard-mock')).toBeNull());
    expect(screen.getByText('Select a type to edit')).toBeInTheDocument();
  });
});

describe('DocumentTypesPage — cookbooks modal', () => {
  it('opens and closes the cookbooks gallery', () => {
    render(<DocumentTypesPage />);
    expect(screen.queryByTestId('cookbooks-mock')).toBeNull();
    fireEvent.click(screen.getByTestId('cookbooks-btn'));
    expect(screen.getByTestId('cookbooks-mock')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('cookbooks-close'));
    expect(screen.queryByTestId('cookbooks-mock')).toBeNull();
  });

  it('promotes a cookbook-spawned type into edit mode', () => {
    mocks.hookReturn.types = [makeType('cookbook-spawned-id', 'From cookbook')];
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('cookbooks-btn'));
    fireEvent.click(screen.getByTestId('cookbooks-create'));
    expect(screen.getByTestId('wizard-mode').textContent).toBe('edit');
    expect(screen.getByTestId('wizard-name').textContent).toBe('From cookbook');
  });
});

// ── The known types are the page, the wizard is the escape hatch ────────
//
// The fourteen prebuilt types lived behind a "Cookbooks" button sitting next to
// a louder "+ New" that opened a three-step field editor. These pin the swap:
// the gallery IS the idle panel, and building a type by hand is a secondary
// action that still works.
describe('DocumentTypesPage — leading with known types', () => {
  it('renders the known-type gallery in the idle panel, not just in a modal', () => {
    render(<DocumentTypesPage />);
    expect(screen.getByTestId('known-types-panel')).toBeInTheDocument();
    expect(screen.getByTestId('type-starters-grid')).toBeInTheDocument();
    expect(screen.getByTestId('type-starter-card-sprint-retro')).toBeInTheDocument();
    // Its ids are its own — the modal's `cookbooks-*` selectors must still
    // resolve to exactly one node when it opens.
    expect(screen.queryByTestId('cookbooks-grid')).toBeNull();
  });

  it('shows the gallery next to an existing type too', () => {
    mocks.hookReturn.types = [makeType('t1', 'Briefs')];
    render(<DocumentTypesPage />);
    expect(screen.getByText('Select a type to edit')).toBeInTheDocument();
    expect(screen.getByTestId('type-starters-grid')).toBeInTheDocument();
  });

  it('installs a picked type and says so, WITHOUT dropping into the wizard', async () => {
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('type-starter-use-meeting-notes'));

    await waitFor(() => expect(mocks.hookReturn.createType).toHaveBeenCalledTimes(1));
    expect(mocks.hookReturn.createType.mock.calls[0][0].name).toBe('Meeting Notes');
    const banner = await screen.findByTestId('save-message');
    expect(banner.textContent).toContain('added');
    // The point of a ready-made type is not having to edit its fields.
    expect(screen.queryByTestId('wizard-mock')).toBeNull();
  });

  it('reports a rejected install instead of claiming the type exists', async () => {
    mocks.hookReturn.createType.mockResolvedValue({ status: 'rejected', error: 'duplicate name' });
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('type-starter-use-invoice'));
    const banner = await screen.findByTestId('save-message');
    expect(banner.textContent).toContain('NOT added');
    expect(banner.textContent).toContain('duplicate name');
  });

  it('keeps the from-scratch wizard one click away', () => {
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('idle-create-btn'));
    expect(screen.getByTestId('wizard-mode').textContent).toBe('create');
  });

  it('points the empty sidebar at the gallery rather than the wizard', () => {
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('empty-browse-types-btn'));
    expect(screen.getByTestId('cookbooks-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('wizard-mock')).toBeNull();
  });
});

// Installing a type and then being unable to use it is the gap this closes.
// Before, a row offered Edit and Delete only: you added "Bug Report" here and
// had to leave for the documents list and search for it again to write one.
describe('starting a document from an installed type', () => {
  it('offers New per row, and hands back the type it belongs to', async () => {
    const onCreateDocument = vi.fn();
    mocks.hookReturn.types = [makeType('t1', 'Bug Report'), makeType('t2', 'Invoice')];
    render(<DocumentTypesPage onCreateDocument={onCreateDocument} />);

    const bug = await screen.findByTestId('new-doc-from-type-t1');
    fireEvent.click(bug);

    expect(onCreateDocument).toHaveBeenCalledTimes(1);
    expect(onCreateDocument.mock.calls[0][0]).toMatchObject({ id: 't1', name: 'Bug Report' });
  });

  it('does not select the row it was clicked in', async () => {
    // The row is a select target; New must not also open the editor for it,
    // or creating a document silently changes what the page is editing.
    const onCreateDocument = vi.fn();
    mocks.hookReturn.types = [makeType('t1', 'Bug Report')];
    render(<DocumentTypesPage onCreateDocument={onCreateDocument} />);

    fireEvent.click(await screen.findByTestId('new-doc-from-type-t1'));
    expect(screen.queryByTestId('type-editor')).toBeNull();
  });

  it('renders no New button when the host cannot create documents', async () => {
    // Absent, not disabled — an embedder with no creation route should not be
    // shown a control that cannot work.
    mocks.hookReturn.types = [makeType('t1', 'Bug Report')];
    render(<DocumentTypesPage />);

    await screen.findByTestId('type-item-t1');
    expect(screen.queryByTestId('new-doc-from-type-t1')).toBeNull();
  });
});
