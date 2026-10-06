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
export declare function useApiCall<T>(fn: (...args: unknown[]) => Promise<T>): ApiCallState<T>;
//# sourceMappingURL=useApiCall.d.ts.map