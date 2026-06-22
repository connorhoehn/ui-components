/**
 * Bridges pipeline run-lifecycle events onto the activity bus. Intended to be
 * mounted once near the top of the app (see AppLayoutInner) inside both the
 * EventStreamProvider and the WebSocket/activity-bus provider.
 *
 * @param activityPublish — `publish` from `useActivityBus`. Stable-reference
 *   in practice (the hook's callback uses refs internally), but we subscribe
 *   once on mount and pull via ref so changing the identity doesn't re-attach.
 */
export declare function usePipelineActivityRelay(activityPublish: (eventType: string, detail: Record<string, unknown>) => void): void;
//# sourceMappingURL=usePipelineActivityRelay.d.ts.map