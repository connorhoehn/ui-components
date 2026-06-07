import { render, screen, fireEvent, cleanup } from '@testing-library/react';
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
  mocks.hookReturn.createType.mockReset();
  mocks.hookReturn.updateType.mockReset();
  mocks.hookReturn.deleteType.mockReset();
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
  it('flashes a create banner and applies the synced suffix when lastSync updates', () => {
    const { rerender } = render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('create-type-btn'));
    fireEvent.click(screen.getByTestId('wizard-save'));
    expect(mocks.hookReturn.createType).toHaveBeenCalledTimes(1);
    const banner = screen.getByTestId('save-message');
    expect(banner.textContent).toContain('"Saved type" created');
    expect(banner.textContent).not.toContain('synced');

    mocks.hookReturn.lastSync = { op: 'create', ok: true, key: 1 };
    rerender(<DocumentTypesPage />);
    expect(screen.getByTestId('save-message').textContent).toContain('synced');
  });

  it('updates an existing type via the wizard and surfaces the offline suffix', () => {
    mocks.hookReturn.types = [makeType('t1', 'Briefs')];
    const { rerender } = render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('edit-type-t1'));
    fireEvent.click(screen.getByTestId('wizard-save'));
    expect(mocks.hookReturn.updateType).toHaveBeenCalledWith('t1', expect.any(Object));
    expect(screen.getByTestId('save-message').textContent).toContain('"Renamed type" updated');

    mocks.hookReturn.lastSync = { op: 'update', ok: false, key: 2 };
    rerender(<DocumentTypesPage />);
    expect(screen.getByTestId('save-message').textContent).toContain('offline');
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

  it('confirm deletes via the hook and resets to idle when the active type was being edited', () => {
    mocks.hookReturn.types = [makeType('t1', 'Briefs')];
    render(<DocumentTypesPage />);
    fireEvent.click(screen.getByTestId('edit-type-t1'));
    expect(screen.getByTestId('wizard-mock')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('delete-type-t1'));
    fireEvent.click(screen.getByTestId('confirm-delete'));
    expect(mocks.hookReturn.deleteType).toHaveBeenCalledWith('t1');
    expect(screen.queryByTestId('wizard-mock')).toBeNull();
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
