// A failed node shows a "retry from here" pill, and `BaseNode` decides whether
// to render it with `typeof onRetry === 'function'`.
//
// That guard was defeated by the hook feeding it. `useRetryFromStep` is a
// frozen export that returns a resolving NO-OP when no `PipelineRunsProvider`
// is in scope — deliberately, so a storybook or an isolated unit render does
// not throw merely for asking for the handler. But a no-op function is still a
// function, so every failed node rendered a live-looking Retry pill that did
// nothing at all: the user clicks it, nothing happens, no error, and clicking
// again does the same nothing.
//
// `useRetryFromStepIfWired` returns `undefined` when nothing is wired, which
// is what the guard actually needs. It is deliberately NOT re-exported from
// the `/pipelines` barrel, so the frozen public surface is unchanged.

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ReactFlowProvider } from '@xyflow/react';

import { PipelineNodeRuntimeProvider } from '../../context/PipelineNodeRuntimeContext';
import LLMNode from '../llm/LLMNode';

vi.mock('../../context/PipelineRunsContext', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../context/PipelineRunsContext')>();
  return {
    ...actual,
    // A failed step, so the retry affordance is in scope at all.
    useLatestStepForNode: () => ({ status: 'failed', stepId: 's1', nodeId: 'n1' }),
  };
});

function renderNode(ui: React.ReactNode) {
  return render(<ReactFlowProvider>{ui}</ReactFlowProvider>);
}

const nodeProps = {
  id: 'n1',
  data: { type: 'llm', label: 'Summarise', model: 'claude-opus-5' },
  selected: false,
} as unknown as React.ComponentProps<typeof LLMNode>;

describe('retry pill only renders when a retry handler is actually wired', () => {
  it('renders NO retry control when nothing supplies retryFromStep', () => {
    renderNode(<LLMNode {...nodeProps} />);
    expect(screen.queryByRole('button', { name: /retry/i })).toBeNull();
  });

  it('renders the retry control when a host seam supplies retryFromStep', () => {
    const retryFromStep = vi.fn().mockResolvedValue(undefined);
    renderNode(
      <PipelineNodeRuntimeProvider
        value={{ retryFromStep, getLatestStepForNode: () => null }}
      >
        <LLMNode {...nodeProps} />
      </PipelineNodeRuntimeProvider>,
    );
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });
});
