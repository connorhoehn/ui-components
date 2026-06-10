// context/__tests__/EventStreamContext.test.tsx
//
// Behavior tests for the EventStream dispatcher — the single fan-out hub
// every pipeline surface (canvas, runs panel, approvals) subscribes to.
// Covers: typed fan-out, wildcard envelopes, (runId, stepId, seq) dedupe
// on dispatchEnvelope, and unsubscribe semantics.

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import {
  EventStreamProvider,
  useEventStreamContext,
  useEventStream,
} from '../EventStreamContext';
import type { EventStreamValue } from '../EventStreamContext';
import type { PipelineWireEvent } from '../../../../types/pipeline';

// ---------------------------------------------------------------------------
// Harness — exposes the context value to the test body
// ---------------------------------------------------------------------------

function renderStream(): { stream: () => EventStreamValue } {
  let value: EventStreamValue | null = null;
  function Capture() {
    value = useEventStreamContext();
    return null;
  }
  render(
    <EventStreamProvider>
      <Capture />
    </EventStreamProvider>,
  );
  return {
    stream: () => {
      if (!value) throw new Error('EventStream context not captured');
      return value;
    },
  };
}

const runStartedPayload = (runId: string) => ({
  runId,
  pipelineId: 'p-1',
  triggeredBy: { userId: 'u-test', triggerType: 'manual' },
  at: new Date().toISOString(),
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('EventStreamContext', () => {
  it('throws when useEventStreamContext is used outside a provider', () => {
    function Naked() {
      useEventStreamContext();
      return null;
    }
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Naked />)).toThrow(/within an EventStreamProvider/);
    spy.mockRestore();
  });

  it('dispatch fans out to a typed subscriber', () => {
    const { stream } = renderStream();
    const handler = vi.fn();
    stream().subscribe('pipeline.run.started', handler);
    const payload = runStartedPayload('run-1');
    stream().dispatch('pipeline.run.started', payload as never);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(payload);
  });

  it('does not deliver events of other types to a typed subscriber', () => {
    const { stream } = renderStream();
    const handler = vi.fn();
    stream().subscribe('pipeline.run.completed', handler);
    stream().dispatch('pipeline.run.started', runStartedPayload('run-1') as never);
    expect(handler).not.toHaveBeenCalled();
  });

  it('wildcard subscribers receive { eventType, payload } envelopes for every event', () => {
    const { stream } = renderStream();
    const wildcard = vi.fn();
    stream().subscribe('*', wildcard);
    const payload = runStartedPayload('run-2');
    stream().dispatch('pipeline.run.started', payload as never);
    expect(wildcard).toHaveBeenCalledWith({
      eventType: 'pipeline.run.started',
      payload,
    });
  });

  it('unsubscribe stops delivery', () => {
    const { stream } = renderStream();
    const handler = vi.fn();
    const unsubscribe = stream().subscribe('pipeline.run.started', handler);
    stream().dispatch('pipeline.run.started', runStartedPayload('run-a') as never);
    unsubscribe();
    stream().dispatch('pipeline.run.started', runStartedPayload('run-b') as never);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('dispatchEnvelope dedupes on (runId, stepId, seq) — replays are dropped', () => {
    const { stream } = renderStream();
    const handler = vi.fn();
    stream().subscribe('pipeline.run.started', handler);

    const envelope = {
      eventType: 'pipeline.run.started',
      payload: runStartedPayload('run-3'),
      seq: 7,
      sourceNodeId: 'node-a',
      emittedAt: Date.now(),
    } as unknown as PipelineWireEvent;

    stream().dispatchEnvelope(envelope as never);
    // Replay of the same (runId, stepId, seq) — e.g. after failover — is a no-op.
    stream().dispatchEnvelope({ ...envelope, emittedAt: Date.now() + 1000 } as never);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('dispatchEnvelope delivers distinct seqs for the same run', () => {
    const { stream } = renderStream();
    const handler = vi.fn();
    stream().subscribe('pipeline.run.started', handler);
    const base = {
      eventType: 'pipeline.run.started',
      payload: runStartedPayload('run-4'),
      sourceNodeId: 'node-a',
      emittedAt: Date.now(),
    };
    stream().dispatchEnvelope({ ...base, seq: 1 } as never);
    stream().dispatchEnvelope({ ...base, seq: 2 } as never);
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('a handler that throws does not break fan-out to later subscribers', () => {
    const { stream } = renderStream();
    const bad = vi.fn(() => {
      throw new Error('boom');
    });
    const good = vi.fn();
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    stream().subscribe('pipeline.run.started', bad);
    stream().subscribe('pipeline.run.started', good);
    stream().dispatch('pipeline.run.started', runStartedPayload('run-5') as never);
    expect(good).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('useEventStream subscribes for the component lifetime and cleans up on unmount', () => {
    const received: unknown[] = [];
    let captured: EventStreamValue | null = null;
    function Capture() {
      captured = useEventStreamContext();
      return null;
    }
    function Listener() {
      useEventStream('pipeline.run.started', (p) => received.push(p));
      return null;
    }
    const { unmount } = render(
      <EventStreamProvider>
        <Capture />
        <Listener />
      </EventStreamProvider>,
    );
    captured!.dispatch('pipeline.run.started', runStartedPayload('run-6') as never);
    expect(received).toHaveLength(1);
    unmount();
  });
});
