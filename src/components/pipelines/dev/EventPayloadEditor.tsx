// frontend/src/components/pipelines/dev/EventPayloadEditor.tsx
//
// Extracted from SimulatorPanel.tsx — the JSON payload editor section
// (event type selector, JSON textarea, and seq input).

import { useMemo } from 'react';
import { cn } from '../../../lib/cn';
import type { PipelineEventMap } from '../../../types/pipeline';

// ---------------------------------------------------------------------------
// Event catalog — re-exported from parent for type consistency
// ---------------------------------------------------------------------------

const EVENT_TYPES = [
  'pipeline.run.started',
  'pipeline.run.completed',
  'pipeline.run.failed',
  'pipeline.run.cancelled',
  'pipeline.run.orphaned',
  'pipeline.run.reassigned',
  'pipeline.step.started',
  'pipeline.step.completed',
  'pipeline.step.failed',
  'pipeline.step.skipped',
  'pipeline.step.cancelled',
  'pipeline.llm.prompt',
  'pipeline.llm.token',
  'pipeline.llm.response',
  'pipeline.approval.requested',
  'pipeline.approval.recorded',
  'pipeline.run.paused',
  'pipeline.run.resumed',
  'pipeline:run:resumeFromStep',
  'pipeline.run.retry',
  'pipeline.webhook.triggered',
  'pipeline.join.waiting',
  'pipeline.join.fired',
  'pipeline.step.breakpoint',
  'pipeline.step.context.patched',
  'pipeline.step.context.patched-unvalidated',
  'pipeline.step.context.patch-reverted',
  'pipeline.llm.stream.opened',
  'pipeline.run.resumed-from-step',
] as const satisfies ReadonlyArray<keyof PipelineEventMap>;

export type EventKey = (typeof EVENT_TYPES)[number];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface EventPayloadEditorProps {
  eventType: EventKey;
  onEventTypeChange: (next: EventKey) => void;
  payloadText: string;
  onPayloadChange: (text: string) => void;
  seq: string;
  onSeqChange: (value: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EventPayloadEditor({
  eventType,
  onEventTypeChange,
  payloadText,
  onPayloadChange,
  seq,
  onSeqChange,
}: EventPayloadEditorProps) {
  const eventOptions = useMemo(
    () =>
      EVENT_TYPES.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      )),
    [],
  );

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-xs font-semibold text-text-primary mb-1">
          Event type
        </label>
        <select
          data-testid="sim-event-type"
          value={eventType}
          onChange={(e) => onEventTypeChange(e.target.value as EventKey)}
          className={cn(
            'w-full py-[7px] px-2 text-[13px] rounded-md',
            'border border-border-emphasis bg-surface font-[inherit]',
          )}
        >
          {eventOptions}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-primary mb-1">
          Payload (JSON)
        </label>
        <textarea
          data-testid="sim-payload"
          value={payloadText}
          onChange={(e) => onPayloadChange(e.target.value)}
          spellCheck={false}
          rows={12}
          className={cn(
            'w-full p-2 text-xs font-mono rounded-md',
            'border border-border-emphasis resize-y box-border',
          )}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-primary mb-1">
          Seq (optional)
        </label>
        <input
          data-testid="sim-seq"
          type="number"
          value={seq}
          onChange={(e) => onSeqChange(e.target.value)}
          className={cn(
            'w-[120px] py-1.5 px-2 text-[13px] rounded-md',
            'border border-border-emphasis font-[inherit]',
          )}
        />
      </div>
    </div>
  );
}
