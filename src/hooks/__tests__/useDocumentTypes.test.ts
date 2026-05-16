import { renderHook, act } from '@testing-library/react';
import { useDocumentTypes, isValidDocumentType, loadTypes, STORAGE_KEY } from '../useDocumentTypes';
import type { DocumentType } from '../../types/documentType';

// ---------------------------------------------------------------------------
// Hoisted mocks — must be initialised before vi.mock() is hoisted by Vitest
// ---------------------------------------------------------------------------

const { mockCreate, mockUpdate, mockDelete } = vi.hoisted(() => ({
  mockCreate: vi.fn().mockResolvedValue({ ok: true }),
  mockUpdate: vi.fn().mockResolvedValue({ ok: true }),
  mockDelete: vi.fn().mockResolvedValue({ ok: true }),
}));

vi.mock('../../lib/documentTypeApiAdapter', () => ({
  syncDocumentTypeCreate: mockCreate,
  syncDocumentTypeUpdate: mockUpdate,
  syncDocumentTypeDelete: mockDelete,
  _resetLocalToServerIdForTests: vi.fn(),
  translateForApi: vi.fn((x: unknown) => x),
}));

// ---------------------------------------------------------------------------
// Test data
// ---------------------------------------------------------------------------

const TYPE_A: DocumentType = {
  id: 't1',
  name: 'Meeting Notes',
  description: 'Notes from meetings',
  icon: '📝',
  fields: [],
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

const TOKEN = 'test-idtoken';

beforeEach(() => {
  localStorage.clear();
  mockCreate.mockResolvedValue({ ok: true });
  mockUpdate.mockResolvedValue({ ok: true });
  mockDelete.mockResolvedValue({ ok: true });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// isValidDocumentType
// ---------------------------------------------------------------------------

describe('isValidDocumentType', () => {
  it('returns true for a complete valid object', () => {
    expect(isValidDocumentType(TYPE_A)).toBe(true);
  });

  it('returns false for null', () => {
    expect(isValidDocumentType(null)).toBe(false);
  });

  it('returns false for a non-object primitive', () => {
    expect(isValidDocumentType('string')).toBe(false);
    expect(isValidDocumentType(42)).toBe(false);
  });

  it('returns false when id is an empty string', () => {
    expect(isValidDocumentType({ ...TYPE_A, id: '' })).toBe(false);
  });

  it('returns false when fields is not an array', () => {
    expect(isValidDocumentType({ ...TYPE_A, fields: null })).toBe(false);
    expect(isValidDocumentType({ ...TYPE_A, fields: 'nope' })).toBe(false);
  });

  it('returns false when a required string field is absent', () => {
    const { description: _d, ...noDescription } = TYPE_A;
    expect(isValidDocumentType(noDescription)).toBe(false);
  });

  it('returns false when name is an empty string', () => {
    expect(isValidDocumentType({ ...TYPE_A, name: '' })).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// loadTypes
// ---------------------------------------------------------------------------

describe('loadTypes', () => {
  it('returns [] when localStorage is empty', () => {
    expect(loadTypes()).toEqual([]);
  });

  it('returns [] when stored value is not a JSON array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ not: 'array' }));
    expect(loadTypes()).toEqual([]);
  });

  it('returns [] when stored JSON is malformed', () => {
    localStorage.setItem(STORAGE_KEY, '{{not-json}}');
    expect(loadTypes()).toEqual([]);
  });

  it('parses and returns valid entries', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([TYPE_A]));
    expect(loadTypes()).toEqual([TYPE_A]);
  });

  it('silently drops invalid entries and rewrites localStorage', () => {
    const invalid = { id: '', name: 'bad' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([TYPE_A, invalid]));

    const result = loadTypes();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('t1');
    // Verify the corrupt entry was pruned from the persisted value
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!) as unknown[];
    expect(stored).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Hook initialization
// ---------------------------------------------------------------------------

describe('initialization', () => {
  it('starts with empty types and null lastSync when localStorage is empty', () => {
    const { result } = renderHook(() => useDocumentTypes());
    expect(result.current.types).toEqual([]);
    expect(result.current.lastSync).toBeNull();
  });

  it('initializes from existing localStorage data', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([TYPE_A]));
    const { result } = renderHook(() => useDocumentTypes());
    expect(result.current.types).toHaveLength(1);
    expect(result.current.types[0].id).toBe('t1');
  });
});

// ---------------------------------------------------------------------------
// createType
// ---------------------------------------------------------------------------

describe('createType', () => {
  it('creates a type with auto id and matching createdAt / updatedAt', () => {
    const { result } = renderHook(() => useDocumentTypes());

    let created!: DocumentType;
    act(() => {
      created = result.current.createType({
        name: 'Sprint Review',
        description: 'Sprint review notes',
        icon: '🏃',
        fields: [],
      });
    });

    expect(created.id).toBeTruthy();
    expect(created.name).toBe('Sprint Review');
    expect(created.createdAt).toBeTruthy();
    expect(created.updatedAt).toBe(created.createdAt);
    expect(result.current.types).toHaveLength(1);
  });

  it('persists the new type to localStorage', () => {
    const { result } = renderHook(() => useDocumentTypes());

    act(() => {
      result.current.createType({ name: 'T', description: '', icon: '', fields: [] });
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!) as DocumentType[];
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('T');
  });

  it('does not call syncDocumentTypeCreate when idToken is absent', () => {
    const { result } = renderHook(() => useDocumentTypes());

    act(() => {
      result.current.createType({ name: 'T', description: '', icon: '', fields: [] });
    });

    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('calls syncDocumentTypeCreate and records lastSync when idToken is provided', async () => {
    const { result } = renderHook(() => useDocumentTypes({ idToken: TOKEN }));

    await act(async () => {
      result.current.createType({ name: 'T', description: '', icon: '', fields: [] });
      await Promise.resolve();
    });

    expect(mockCreate).toHaveBeenCalledOnce();
    expect(result.current.lastSync).toMatchObject({ op: 'create', ok: true });
    expect(result.current.lastSync!.key).toBeGreaterThan(0);
  });

  it('records lastSync with ok:false when server sync fails', async () => {
    mockCreate.mockResolvedValue({ ok: false, error: 'POST failed: 500' });
    const { result } = renderHook(() => useDocumentTypes({ idToken: TOKEN }));

    await act(async () => {
      result.current.createType({ name: 'T', description: '', icon: '', fields: [] });
      await Promise.resolve();
    });

    expect(result.current.lastSync).toMatchObject({ op: 'create', ok: false, error: 'POST failed: 500' });
  });
});

// ---------------------------------------------------------------------------
// updateType
// ---------------------------------------------------------------------------

describe('updateType', () => {
  it('patches the matching type and refreshes updatedAt', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([TYPE_A]));
    const { result } = renderHook(() => useDocumentTypes());

    act(() => {
      result.current.updateType('t1', { name: 'Updated Notes' });
    });

    expect(result.current.types[0].name).toBe('Updated Notes');
    expect(result.current.types[0].updatedAt).not.toBe(TYPE_A.updatedAt);
  });

  it('persists the patched type to localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([TYPE_A]));
    const { result } = renderHook(() => useDocumentTypes());

    act(() => {
      result.current.updateType('t1', { name: 'Patched' });
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!) as DocumentType[];
    expect(stored[0].name).toBe('Patched');
  });

  it('does not call syncDocumentTypeUpdate without idToken', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([TYPE_A]));
    const { result } = renderHook(() => useDocumentTypes());

    act(() => {
      result.current.updateType('t1', { name: 'x' });
    });

    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('calls syncDocumentTypeUpdate and records lastSync when idToken is provided', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([TYPE_A]));
    const { result } = renderHook(() => useDocumentTypes({ idToken: TOKEN }));

    await act(async () => {
      result.current.updateType('t1', { name: 'x' });
      await Promise.resolve();
    });

    expect(mockUpdate).toHaveBeenCalledOnce();
    expect(result.current.lastSync).toMatchObject({ op: 'update', ok: true });
  });
});

// ---------------------------------------------------------------------------
// deleteType
// ---------------------------------------------------------------------------

describe('deleteType', () => {
  it('removes the type from state and localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([TYPE_A]));
    const { result } = renderHook(() => useDocumentTypes());

    act(() => {
      result.current.deleteType('t1');
    });

    expect(result.current.types).toHaveLength(0);
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!) as DocumentType[];
    expect(stored).toHaveLength(0);
  });

  it('does not call syncDocumentTypeDelete without idToken', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([TYPE_A]));
    const { result } = renderHook(() => useDocumentTypes());

    act(() => {
      result.current.deleteType('t1');
    });

    expect(mockDelete).not.toHaveBeenCalled();
  });

  it('calls syncDocumentTypeDelete with the correct id and records lastSync', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([TYPE_A]));
    const { result } = renderHook(() => useDocumentTypes({ idToken: TOKEN }));

    await act(async () => {
      result.current.deleteType('t1');
      await Promise.resolve();
    });

    expect(mockDelete).toHaveBeenCalledWith('t1', TOKEN);
    expect(result.current.lastSync).toMatchObject({ op: 'delete', ok: true });
  });
});

// ---------------------------------------------------------------------------
// getType
// ---------------------------------------------------------------------------

describe('getType', () => {
  it('returns the matching type by id', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([TYPE_A]));
    const { result } = renderHook(() => useDocumentTypes());

    expect(result.current.getType('t1')).toMatchObject({ id: 't1', name: 'Meeting Notes' });
  });

  it('returns undefined when the id is not found', () => {
    const { result } = renderHook(() => useDocumentTypes());
    expect(result.current.getType('nonexistent')).toBeUndefined();
  });
});
