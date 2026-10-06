export interface TriggerRunResponse {
    runId: string;
    pipelineId: string;
    triggeredBy: {
        userId: string;
        triggerType: string;
    };
    at: string;
}
export interface UseTriggerRunOptions {
    /** Wins over this library's `useIdentityContext().idToken`. */
    idToken?: string | null;
    /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
    baseUrl?: string;
}
export interface TriggerRunOptions {
    /**
     * When provided, sent as the `Idempotency-Key` request header. The server
     * dedupes replays of the same key within a short window and returns the
     * original response (with `X-Idempotent-Replay: true`). Callers typically
     * pass `crypto.randomUUID()` once per logical trigger and reuse it across
     * retries.
     */
    idempotencyKey?: string;
}
export interface UseTriggerRunReturn {
    triggerRun: (pipelineId: string, payload?: Record<string, unknown>, options?: TriggerRunOptions) => Promise<string | null>;
    isTriggering: boolean;
    lastError: string | null;
    /**
     * True iff the most recent successful `triggerRun` call was served from the
     * server's idempotency cache (i.e. the `X-Idempotent-Replay` header was
     * set). Resets to `false` on each new trigger attempt.
     */
    isReplay: boolean;
}
export declare function useTriggerRun(options?: UseTriggerRunOptions): UseTriggerRunReturn;
//# sourceMappingURL=useTriggerRun.d.ts.map