import { renderHook, act } from '@testing-library/react';
import { useCustomFieldTypes, loadCustomFieldTypes } from '../useCustomFieldTypes';
import { CUSTOM_FIELD_TYPE_STORAGE_KEY } from '../../types/fieldType';
import type { CustomFieldType } from '../../types/fieldType';

// ---------------------------------------------------------------------------
// Mock the renderer registry so registerFieldType / getFieldType are no-ops
// ---------------------------------------------------------------------------

vi.mock('../../renderers/registry', () => ({
  registerFieldType: vi.fn(),
  getFieldType: vi.fn().mockReturnValue(null),
}));

// ---------------------------------------------------------------------------
// Test data
// ---------------------------------------------------------------------------

const FT_A: CustomFieldType = {
  id: 'ft1',
  name: 'Priority Level',
  icon: '🔥',
  description: 'Custom priority field',
  baseType: 'text',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// loadCustomFieldTypes
// ---------------------------------------------------------------------------

describe('loadCustomFieldTypes', () => {
  it('returns [] when localStorage is empty', () => {
    expect(loadCustomFieldTypes()).toEqual([]);
  });

  it('returns [] when stored value is not a JSON array', () => {
    localStorage.setItem(CUSTOM_FIELD_TYPE_STORAGE_KEY, '"not-array"');
    expect(loadCustomFieldTypes()).toEqual([]);
  });

  it('returns [] when stored JSON is malformed', () => {
    localStorage.setItem(CUSTOM_FIELD_TYPE_STORAGE_KEY, '{{bad}}');
    expect(loadCustomFieldTypes()).toEqual([]);
  });

  it('parses and returns valid entries', () => {
    localStorage.setItem(CUSTOM_FIELD_TYPE_STORAGE_KEY, JSON.stringify([FT_A]));
    expect(loadCustomFieldTypes()).toEqual([FT_A]);
  });

  it('drops invalid entries and rewrites localStorage', () => {
    const invalid = { id: '', name: 'bad' };
    localStorage.setItem(CUSTOM_FIELD_TYPE_STORAGE_KEY, JSON.stringify([FT_A, invalid]));

    const result = loadCustomFieldTypes();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('ft1');

    const stored = JSON.parse(localStorage.getItem(CUSTOM_FIELD_TYPE_STORAGE_KEY)!) as unknown[];
    expect(stored).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Hook initialization
// ---------------------------------------------------------------------------

describe('initialization', () => {
  it('starts empty when localStorage has no data', () => {
    const { result } = renderHook(() => useCustomFieldTypes());
    expect(result.current.types).toEqual([]);
  });

  it('initializes from existing localStorage data', () => {
    localStorage.setItem(CUSTOM_FIELD_TYPE_STORAGE_KEY, JSON.stringify([FT_A]));
    const { result } = renderHook(() => useCustomFieldTypes());
    expect(result.current.types).toHaveLength(1);
    expect(result.current.types[0].id).toBe('ft1');
  });
});

// ---------------------------------------------------------------------------
// createType
// ---------------------------------------------------------------------------

describe('createType', () => {
  it('creates a type with auto id and matching createdAt / updatedAt, returns it', () => {
    const { result } = renderHook(() => useCustomFieldTypes());

    let created!: CustomFieldType;
    act(() => {
      created = result.current.createType({
        name: 'Status Tag',
        icon: '🏷️',
        description: 'Status tag field',
        baseType: 'text',
      });
    });

    expect(created.id).toBeTruthy();
    expect(created.name).toBe('Status Tag');
    expect(created.createdAt).toBeTruthy();
    expect(created.updatedAt).toBe(created.createdAt);
    expect(result.current.types).toHaveLength(1);
  });

  it('persists the new type to localStorage', () => {
    const { result } = renderHook(() => useCustomFieldTypes());

    act(() => {
      result.current.createType({ name: 'X', icon: '', description: '', baseType: 'text' });
    });

    const stored = JSON.parse(localStorage.getItem(CUSTOM_FIELD_TYPE_STORAGE_KEY)!) as CustomFieldType[];
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('X');
  });

  it('appends to existing types', () => {
    localStorage.setItem(CUSTOM_FIELD_TYPE_STORAGE_KEY, JSON.stringify([FT_A]));
    const { result } = renderHook(() => useCustomFieldTypes());

    act(() => {
      result.current.createType({ name: 'Y', icon: '', description: '', baseType: 'text' });
    });

    expect(result.current.types).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// updateType
// ---------------------------------------------------------------------------

describe('updateType', () => {
  it('patches the matching type and refreshes updatedAt', () => {
    localStorage.setItem(CUSTOM_FIELD_TYPE_STORAGE_KEY, JSON.stringify([FT_A]));
    const { result } = renderHook(() => useCustomFieldTypes());

    act(() => {
      result.current.updateType('ft1', { name: 'Renamed Priority' });
    });

    expect(result.current.types[0].name).toBe('Renamed Priority');
    expect(result.current.types[0].updatedAt).not.toBe(FT_A.updatedAt);
  });

  it('persists the patched type to localStorage', () => {
    localStorage.setItem(CUSTOM_FIELD_TYPE_STORAGE_KEY, JSON.stringify([FT_A]));
    const { result } = renderHook(() => useCustomFieldTypes());

    act(() => {
      result.current.updateType('ft1', { description: 'Updated description' });
    });

    const stored = JSON.parse(localStorage.getItem(CUSTOM_FIELD_TYPE_STORAGE_KEY)!) as CustomFieldType[];
    expect(stored[0].description).toBe('Updated description');
  });

  it('leaves other types untouched', () => {
    const FT_B: CustomFieldType = { ...FT_A, id: 'ft2', name: 'Other' };
    localStorage.setItem(CUSTOM_FIELD_TYPE_STORAGE_KEY, JSON.stringify([FT_A, FT_B]));
    const { result } = renderHook(() => useCustomFieldTypes());

    act(() => {
      result.current.updateType('ft1', { name: 'Changed' });
    });

    expect(result.current.types.find(t => t.id === 'ft2')?.name).toBe('Other');
  });
});

// ---------------------------------------------------------------------------
// deleteType
// ---------------------------------------------------------------------------

describe('deleteType', () => {
  it('removes the type from state and localStorage', () => {
    localStorage.setItem(CUSTOM_FIELD_TYPE_STORAGE_KEY, JSON.stringify([FT_A]));
    const { result } = renderHook(() => useCustomFieldTypes());

    act(() => {
      result.current.deleteType('ft1');
    });

    expect(result.current.types).toHaveLength(0);
    const stored = JSON.parse(localStorage.getItem(CUSTOM_FIELD_TYPE_STORAGE_KEY)!) as CustomFieldType[];
    expect(stored).toHaveLength(0);
  });

  it('is a no-op when the id does not exist', () => {
    localStorage.setItem(CUSTOM_FIELD_TYPE_STORAGE_KEY, JSON.stringify([FT_A]));
    const { result } = renderHook(() => useCustomFieldTypes());

    act(() => {
      result.current.deleteType('nonexistent');
    });

    expect(result.current.types).toHaveLength(1);
  });
});
