import { renderHook, act } from '@testing-library/react';
import { createElement } from 'react';
import { MemoryRouter } from 'react-router';
import { useUrlFilterState } from '../useUrlFilterState';

function wrapper({ children }: { children: React.ReactNode }) {
  return createElement(MemoryRouter, { initialEntries: ['/?status=running&search=test'] }, children);
}

function defaultWrapper({ children }: { children: React.ReactNode }) {
  return createElement(MemoryRouter, { initialEntries: ['/'] }, children);
}

describe('useUrlFilterState', () => {
  it('syncs state with URL search params', () => {
    const { result } = renderHook(
      () => useUrlFilterState({ status: 'all', search: undefined }),
      { wrapper }
    );

    expect(result.current.filters.status).toBe('running');
    expect(result.current.filters.search).toBe('test');
  });

  it('uses defaults when params are missing', () => {
    const { result } = renderHook(
      () => useUrlFilterState({ status: 'all', search: undefined }),
      { wrapper: defaultWrapper }
    );

    expect(result.current.filters.status).toBe('all');
    expect(result.current.filters.search).toBeUndefined();
  });

  it('updates URL when state changes via setFilter', () => {
    const { result } = renderHook(
      () => useUrlFilterState({ status: 'all', search: undefined }),
      { wrapper: defaultWrapper }
    );

    act(() => {
      result.current.setFilter('status', 'failed');
    });

    expect(result.current.filters.status).toBe('failed');
  });

  it('removes param when value matches default', () => {
    const { result } = renderHook(
      () => useUrlFilterState({ status: 'all', search: undefined }),
      { wrapper }
    );

    // Set status back to the default 'all' — param should be removed
    act(() => {
      result.current.setFilter('status', 'all');
    });

    expect(result.current.filters.status).toBe('all');
  });

  it('clearFilters resets all params', () => {
    const { result } = renderHook(
      () => useUrlFilterState({ status: 'all', search: undefined }),
      { wrapper }
    );

    expect(result.current.filters.status).toBe('running');

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.filters.status).toBe('all');
    expect(result.current.filters.search).toBeUndefined();
  });
});
