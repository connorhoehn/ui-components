// context/__tests__/PipelineRunsContext.strictmode.test.tsx
//
// The history seed used to claim its `historyFetchedRef` guard *before*
// awaiting `listPipelineRuns`, while the effect's cleanup cancelled the
// in-flight request. On any double-mount — StrictMode, an <Activity>/Offscreen
// re-show, a Suspense retry, or a `pipelineId` that goes A -> undefined -> A —
// the first pass started (and had cancelled) the fetch and the second pass saw
// its own ref already set and bailed. The runs map then stayed empty for a
// pipeline that has history, with no error and no retry.
//
// The suite does not mount in StrictMode globally, so this file opts in.

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StrictMode } from 'react';
import { render, waitFor } from '@testing-library/react';
import type { PipelineDefinition, PipelineRun } from '../../../../types/pipeline';

vi.mock('../WebSocketEventAdapter', () => ({
  usePipelineWsCommands: () => ({ cancelRun: vi.fn(), resolveApproval: vi.fn() }),
}));
vi.mock('../../hooks/useTriggerRun', () => ({
  useTriggerRun: () => ({ triggerRun: vi.fn(async () => 'run-new') }),
}));

const historicRun = {
  id: 'run-historic',
  pipelineId: 'pipe-1',
  status: 'completed',
  startedAt: new Date().toISOString(),
  steps: [],
} as unknown as PipelineRun;

const mockListPipelineRuns = vi.fn(async () => ({ runs: [historicRun] }));
vi.mock('../../../../api/pipelineRuns', () => ({
  listPipelineRuns: (...args: unknown[]) =>
    (mockListPipelineRuns as unknown as (...a: unknown[]) => Promise<{ runs: PipelineRun[] }>)(
      ...args,
    ),
}));

import { EventStreamProvider } from '../EventStreamContext';
import {
  PipelineRunsProvider,
  usePipelineRuns,
  type PipelineRunsValue,
} from '../PipelineRunsContext';
import { PipelineEditorContext, type PipelineEditorValue } from '../PipelineEditorContext';

let runsCtx: PipelineRunsValue;

function Probe() {
  runsCtx = usePipelineRuns();
  return null;
}

/**
 * A minimal editor context value — the runs provider only reads
 * `definition.id` off it to decide which pipeline's history to seed.
 */
const editorValue = {
  definition: { id: 'pipe-1' } as PipelineDefinition,
} as unknown as PipelineEditorValue;

beforeEach(() => {
  mockListPipelineRuns.mockClear();
});

describe('PipelineRunsContext history seed under StrictMode', () => {
  it('seeds historical runs even when the first mount pass is cancelled', async () => {
    render(
      <StrictMode>
        <PipelineEditorContext.Provider value={editorValue}>
          <EventStreamProvider>
            <PipelineRunsProvider>
              <Probe />
            </PipelineRunsProvider>
          </EventStreamProvider>
        </PipelineEditorContext.Provider>
      </StrictMode>,
    );

    // Pre-fix the second effect pass returned early on its own ref and the
    // first pass's response was dropped by `cancelled`, so this never arrived.
    await waitFor(() => {
      expect(runsCtx.runs['run-historic']).toBeDefined();
    });
    expect(mockListPipelineRuns).toHaveBeenCalledWith('pipe-1', expect.anything());
  });
});
