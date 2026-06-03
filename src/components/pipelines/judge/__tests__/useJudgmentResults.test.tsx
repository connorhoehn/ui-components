import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import {
  EventStreamProvider,
  useEventStreamContext,
} from '../../context/EventStreamContext';
import { useJudgmentResults } from '../useJudgmentResults';
import type { JudgmentResult } from '../types';

function wrapper({ children }: { children: ReactNode }) {
  return <EventStreamProvider>{children}</EventStreamProvider>;
}

const startedPayload = {
  runId: 'run_1',
  stepId: 'judge_a',
  pipelineId: 'pl_1',
  rubricId: 'rubric.helpfulness',
  judgeModel: 'claude-sonnet-4-6',
  at: '2026-06-03T12:00:00.000Z',
};

const result: JudgmentResult = {
  judgmentId: 'jdg_1',
  runId: 'run_1',
  stepId: 'judge_a',
  pipelineId: 'pl_1',
  rubricId: 'rubric.helpfulness',
  rubricVersion: 2,
  rubricSnapshot: {
    id: 'rubric.helpfulness',
    version: 2,
    overall: 'weighted-mean',
    criteria: [{ id: 'a', prompt: 'p', scale: '1-5' }],
  },
  mode: 'absolute',
  overallScore: 0.85,
  overallVerdict: 'pass',
  overallPassed: true,
  criteria: [],
  model: 'claude-sonnet-4-6',
  tokensIn: 1000,
  tokensOut: 200,
  latencyMs: 1500,
  costUsd: 0.005,
  cacheHit: false,
  judgedAt: '2026-06-03T12:00:01.500Z',
};

const scoredPayload = {
  runId: 'run_1',
  stepId: 'judge_a',
  pipelineId: 'pl_1',
  judgmentId: 'jdg_1',
  rubricId: 'rubric.helpfulness',
  judgeModel: 'claude-sonnet-4-6',
  result,
  costUsd: 0.005,
  latencyMs: 1500,
  usage: { inputTokens: 1000, outputTokens: 200 },
  at: '2026-06-03T12:00:01.500Z',
};

// Helper: hook into the provider's dispatchEnvelope so we can push events
// that aren't in DC's PipelineEventMap (the judge events live in EC, not DC).
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

describe('useJudgmentResults', () => {
  it('folds started → scored into a single record with status transitions', () => {
    const { result: rendered } = renderHook(
      () => ({
        records: useJudgmentResults(),
        dispatch: useTestDispatch(),
      }),
      { wrapper },
    );

    act(() => {
      rendered.current.dispatch('pipeline.judge.started', startedPayload, 1);
    });
    expect(rendered.current.records).toHaveLength(1);
    expect(rendered.current.records[0].status).toBe('running');
    expect(rendered.current.records[0].rubricId).toBe('rubric.helpfulness');

    act(() => {
      rendered.current.dispatch('pipeline.judge.scored', scoredPayload, 2);
    });
    expect(rendered.current.records).toHaveLength(1);
    expect(rendered.current.records[0].status).toBe('scored');
    expect(rendered.current.records[0].result?.overallScore).toBe(0.85);
    expect(rendered.current.records[0].costUsd).toBe(0.005);
  });

  it('records a failure with reason + error', () => {
    const { result: rendered } = renderHook(
      () => ({
        records: useJudgmentResults(),
        dispatch: useTestDispatch(),
      }),
      { wrapper },
    );

    act(() => {
      rendered.current.dispatch(
        'pipeline.judge.failed',
        {
          runId: 'run_1',
          stepId: 'judge_a',
          pipelineId: 'pl_1',
          reason: 'malformed',
          error: 'extractor returned null after retry',
          at: '2026-06-03T12:00:00.000Z',
        },
        3,
      );
    });

    const record = rendered.current.records[0];
    expect(record.status).toBe('failed');
    expect(record.failureReason).toBe('malformed');
    expect(record.error).toMatch(/extractor returned null/);
  });

  it('records a budget-exhausted skip without an error', () => {
    const { result: rendered } = renderHook(
      () => ({
        records: useJudgmentResults(),
        dispatch: useTestDispatch(),
      }),
      { wrapper },
    );

    act(() => {
      rendered.current.dispatch(
        'pipeline.judge.budget-exceeded',
        { runId: 'run_1', stepId: 'judge_a', pipelineId: 'pl_1', at: '2026-06-03T12:00:00.000Z' },
        4,
      );
    });

    expect(rendered.current.records[0].status).toBe('budget-exceeded');
    expect(rendered.current.records[0].error).toBeUndefined();
  });

  it('filters by runId when opts.runId is set', () => {
    const { result: rendered } = renderHook(
      () => ({
        records: useJudgmentResults({ runId: 'run_keep' }),
        dispatch: useTestDispatch(),
      }),
      { wrapper },
    );

    act(() => {
      rendered.current.dispatch(
        'pipeline.judge.started',
        { ...startedPayload, runId: 'run_drop' },
        5,
      );
      rendered.current.dispatch(
        'pipeline.judge.started',
        { ...startedPayload, runId: 'run_keep' },
        6,
      );
    });

    expect(rendered.current.records).toHaveLength(1);
    expect(rendered.current.records[0].runId).toBe('run_keep');
  });

  it('ignores non-judge pipeline events', () => {
    const { result: rendered } = renderHook(
      () => ({
        records: useJudgmentResults(),
        dispatch: useTestDispatch(),
      }),
      { wrapper },
    );

    act(() => {
      rendered.current.dispatch(
        'pipeline.run.started',
        { runId: 'run_1', stepId: 'whatever' },
        7,
      );
      rendered.current.dispatch(
        'pipeline.image.vision.completed',
        { runId: 'run_1', stepId: 'vision_a', result: {} },
        8,
      );
    });

    expect(rendered.current.records).toHaveLength(0);
  });
});
