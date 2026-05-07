// frontend/src/hooks/useApiCall.ts
//
// Wrap async API calls with loading/error/retry state.

import { useCallback, useState } from 'react';

export interface ApiCallState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: unknown[]) => Promise<void>;
  retry: () => Promise<void>;
  reset: () => void;
}

/**
 * Wrap an async function with loading/error/retry state.
 * Useful for API calls in components that need to show loading spinners,
 * error messages, and retry buttons.
 *
 * @param fn Async function to wrap
 * @returns { data, loading, error, execute, retry, reset }
 *
 * @example
 * const { data, loading, error, execute, retry } = useApiCall(
 *   async (pipelineId: string) => {
 *     const res = await fetch(`/api/pipelines/${pipelineId}`);
 *     return res.json();
 *   }
 * );
 *
 * useEffect(() => { execute(pipelineId); }, [pipelineId]);
 */
export function useApiCall<T>(
  fn: (...args: unknown[]) => Promise<T>,
): ApiCallState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastArgs, setLastArgs] = useState<unknown[]>([]);

  const execute = useCallback(
    async (...args: unknown[]) => {
      setLoading(true);
      setError(null);
      setLastArgs(args);
      try {
        const result = await fn(...args);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    },
    [fn],
  );

  const retry = useCallback(async () => {
    await execute(...lastArgs);
  }, [execute, lastArgs]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setLastArgs([]);
  }, []);

  return { data, loading, error, execute, retry, reset };
}
