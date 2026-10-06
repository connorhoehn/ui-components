/**
 * Subscribes to webhook events on the pipeline EventStream and fires runs
 * whose triggerBinding matches `(event: 'webhook', webhookPath)`.
 *
 * The hook re-reads the pipeline index per event (cheap localStorage scan)
 * so newly-published pipelines start receiving webhooks without a remount.
 */
export declare function useWebhookTriggers(): void;
//# sourceMappingURL=useWebhookTriggers.d.ts.map