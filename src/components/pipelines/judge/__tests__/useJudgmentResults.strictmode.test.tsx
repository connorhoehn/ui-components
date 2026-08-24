// judge/__tests__/useJudgmentResults.strictmode.test.tsx
//
// Both `useJudgmentResults` and `useVisionResults` kept a
// `runId::stepId -> position` index in a ref and REBUILT that ref inside the
// `setRecords` updater. React double-invokes updaters under StrictMode, so the
// second pass read the index the first pass had just written: a brand-new step
// looked like it already lived at position 0 and took the update-in-place
// branch, overwriting the previous top record instead of inserting a row.
//
// Symptom: with two concurrent judge (or vision) steps in one run, the second
// step's row silently replaced the first — the results table lost a row.
//
// The suite does not mount in StrictMode globally, so this file opts in.

import { describe, it, expect } from 'vitest';
import { StrictMode, type ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { EventStreamProvider, useEventStreamContext } from '../../context/EventStreamContext';
import { useJudgmentResults } from '../useJudgmentResults';
import { useVisionResults } from '../../vision/useVisionResults';

function wrapper({ children }: { children: ReactNode }) {
  return (
    <StrictMode>
      <EventStreamProvider>{children}</EventStreamProvider>
    </StrictMode>
  );
}

function useTestDispatch() {
  const { dispatchEnvelope } = useEventStreamContext();
  return (eventType: string, payload: unknown, seq: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (dispatchEnvelope as any)({
      eventType,
      payload,
      seq,
      sourceNodeId: 'test',
      emittedAt: Date.now(),
    });
  };
}

const started = (stepId: string) => ({
  runId: 'run_1',
  stepId,
  pipelineId: 'pl_1',
  rubricId: 'rubric.helpfulness',
  judgeModel: 'claude-sonnet-4-6',
  at: '2026-06-03T12:00:00.000Z',
});

describe('useJudgmentResults under StrictMode', () => {
  it('keeps one record per step when two steps start in the same run', () => {
    const { result } = renderHook(
      () => ({ records: useJudgmentResults(), dispatch: useTestDispatch() }),
      { wrapper },
    );

    act(() => {
      result.current.dispatch('pipeline.judge.started', started('judge_a'), 1);
    });
    expect(result.current.records).toHaveLength(1);

    act(() => {
      result.current.dispatch('pipeline.judge.started', started('judge_b'), 2);
    });

    // Pre-fix: 1 — judge_b overwrote judge_a's row in place.
    expect(result.current.records).toHaveLength(2);
    expect(result.current.records.map((r) => r.stepId).sort()).toEqual([
      'judge_a',
      'judge_b',
    ]);
  });
});

describe('useVisionResults under StrictMode', () => {
  it('keeps one record per step when two vision steps start in the same run', () => {
    const { result } = renderHook(
      () => ({ records: useVisionResults(), dispatch: useTestDispatch() }),
      { wrapper },
    );

    act(() => {
      result.current.dispatch(
        'pipeline.image.vision.started',
        { runId: 'run_1', stepId: 'vis_a', endpointId: 'ep1', at: 1 },
        1,
      );
    });
    expect(result.current.records).toHaveLength(1);

    act(() => {
      result.current.dispatch(
        'pipeline.image.vision.started',
        { runId: 'run_1', stepId: 'vis_b', endpointId: 'ep1', at: 2 },
        2,
      );
    });

    // Pre-fix: 1 — vis_b overwrote vis_a's row in place.
    expect(result.current.records).toHaveLength(2);
    expect(result.current.records.map((r) => r.stepId).sort()).toEqual(['vis_a', 'vis_b']);
  });
});
