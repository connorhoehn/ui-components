declare const EVENT_TYPES: readonly ["pipeline.run.started", "pipeline.run.completed", "pipeline.run.failed", "pipeline.run.cancelled", "pipeline.run.orphaned", "pipeline.run.reassigned", "pipeline.step.started", "pipeline.step.completed", "pipeline.step.failed", "pipeline.step.skipped", "pipeline.step.cancelled", "pipeline.llm.prompt", "pipeline.llm.token", "pipeline.llm.response", "pipeline.approval.requested", "pipeline.approval.recorded", "pipeline.run.paused", "pipeline.run.resumed", "pipeline:run:resumeFromStep", "pipeline.run.retry", "pipeline.webhook.triggered", "pipeline.join.waiting", "pipeline.join.fired", "pipeline.step.breakpoint", "pipeline.step.context.patched", "pipeline.step.context.patched-unvalidated", "pipeline.step.context.patch-reverted", "pipeline.llm.stream.opened", "pipeline.run.resumed-from-step"];
export type EventKey = (typeof EVENT_TYPES)[number];
export interface EventPayloadEditorProps {
    eventType: EventKey;
    onEventTypeChange: (next: EventKey) => void;
    payloadText: string;
    onPayloadChange: (text: string) => void;
    seq: string;
    onSeqChange: (value: string) => void;
}
export declare function EventPayloadEditor({ eventType, onEventTypeChange, payloadText, onPayloadChange, seq, onSeqChange, }: EventPayloadEditorProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EventPayloadEditor.d.ts.map