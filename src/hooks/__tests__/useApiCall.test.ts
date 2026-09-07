import { renderHook, act, waitFor } from '@testing-library/react';
import { useApiCall } from '../useApiCall';

describe('useApiCall', () => {
  it('returns initial state with loading false and no data', () => {
    const fn = vi.fn().mockResolvedValue({ id: 1 });
    const { result } = renderHook(() => useApiCall(fn));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('sets loading to true while executing', async () => {
    let resolve: (v: unknown) => void;
    const fn = vi.fn(() => new Promise((r) => { resolve = r; }));
    const { result } = renderHook(() => useApiCall(fn));

    act(() => {
      result.current.execute();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolve!({ id: 1 });
    });

    expect(result.current.loading).toBe(false);
  });

  it('returns data on successful fetch', async () => {
    const mockData = { name: 'Test', value: 42 };
    const fn = vi.fn().mockResolvedValue(mockData);
    const { result } = renderHook(() => useApiCall(fn));

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('returns error on failed fetch', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useApiCall(fn));

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Network error');
    expect(result.current.loading).toBe(false);
  });

  it('handles non-Error thrown values', async () => {
    const fn = vi.fn().mockRejectedValue('string error');
    const { result } = renderHook(() => useApiCall(fn));

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.error).toBe('string error');
  });

  it('passes arguments to the wrapped function', async () => {
    const fn = vi.fn().mockResolvedValue('result');
    const { result } = renderHook(() => useApiCall(fn));

    await act(async () => {
      await result.current.execute('arg1', 'arg2');
    });

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('retry re-executes with last arguments', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('First fail'))
      .mockResolvedValueOnce({ success: true });
    const { result } = renderHook(() => useApiCall(fn));

    await act(async () => {
      await result.current.execute('myArg');
    });
    expect(result.current.error).toBe('First fail');

    await act(async () => {
      await result.current.retry();
    });
    expect(fn).toHaveBeenCalledWith('myArg');
    expect(result.current.data).toEqual({ success: true });
    expect(result.current.error).toBeNull();
  });

  // Ported from the app's copy of this suite when that fork was deleted.
  // The retry case above happens to leave error null, but nothing here
  // pinned the plain execute path: a second, successful execute must clear
  // the error left by the first.
  it('a second successful execute clears the previous error', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('first error'))
      .mockResolvedValueOnce('ok');
    const { result } = renderHook(() => useApiCall(fn));

    await act(async () => {
      await result.current.execute();
    });
    expect(result.current.error).toBe('first error');

    await act(async () => {
      await result.current.execute();
    });
    expect(result.current.error).toBeNull();
  });

  it('reset clears an error left by a failed execute', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('oops'));
    const { result } = renderHook(() => useApiCall(fn));

    await act(async () => {
      await result.current.execute();
    });
    expect(result.current.error).toBe('oops');

    act(() => {
      result.current.reset();
    });

    expect(result.current.error).toBeNull();
  });

  it('reset clears all state', async () => {
    const fn = vi.fn().mockResolvedValue({ id: 1 });
    const { result } = renderHook(() => useApiCall(fn));

    await act(async () => {
      await result.current.execute();
    });
    expect(result.current.data).toEqual({ id: 1 });

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
