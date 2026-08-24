import { render, screen } from '@testing-library/react';
import type { NodeType, StepExecution } from '../../../types/pipeline';
import { StepTree } from '../steps/StepTree';

// The tree ordering used to reconstruct each step's start as
// `completedAt - durationMs`, falling back to 0 (the Unix epoch) when
// `completedAt` was absent — so every UNFINISHED step sorted ahead of every
// finished one. `StepExecution.startedAt` is the field that actually means
// "when this step began" and is now used directly.
//
// The fixture is a live run: two steps done, one running, one pending. That is
// the case where the two orderings disagree; a fixture where every step has
// completed would sort identically either way.

const T = (iso: string) => iso;

const steps: Record<string, StepExecution> = {
  fetch: {
    nodeId: 'fetch',
    status: 'completed',
    startedAt: T('2026-08-16T10:04:00.000Z'),
    completedAt: T('2026-08-16T10:04:01.000Z'),
    durationMs: 1000,
  },
  transform: {
    nodeId: 'transform',
    status: 'completed',
    startedAt: T('2026-08-16T10:04:01.000Z'),
    completedAt: T('2026-08-16T10:04:06.000Z'),
    durationMs: 5000,
  },
  summarize: {
    nodeId: 'summarize',
    status: 'running',
    startedAt: T('2026-08-16T10:04:06.000Z'),
  },
  notify: {
    nodeId: 'notify',
    status: 'pending',
  },
};

const nodeDataMap: Record<string, { type: NodeType; data: Record<string, unknown> }> = {
  fetch: { type: 'trigger', data: {} },
  transform: { type: 'transform', data: {} },
  summarize: { type: 'llm', data: {} },
  notify: { type: 'action', data: {} },
};

/** The "N. nodeType" label each StepThread header renders, in DOM order. */
const renderedOrder = () =>
  screen.getAllByText(/^\d+\. /).map((el) => el.textContent);

describe('StepTree execution ordering', () => {
  it('orders by startedAt, keeping the running step after the completed ones', () => {
    render(<StepTree steps={steps} nodeDataMap={nodeDataMap} />);
    expect(renderedOrder()).toEqual([
      '1. trigger',
      '2. transform',
      '3. llm',
      '4. action',
    ]);
  });

  it('does not hoist an unfinished step to the top of the tree', () => {
    render(<StepTree steps={steps} nodeDataMap={nodeDataMap} />);
    // The old fallback scored the running and pending steps at epoch 0, so
    // they led the list ahead of everything that had already finished.
    expect(renderedOrder()[0]).toBe('1. trigger');
  });

  it('still orders steps that only carry completedAt + durationMs', () => {
    const legacy: Record<string, StepExecution> = {
      second: {
        nodeId: 'second',
        status: 'completed',
        completedAt: T('2026-08-16T10:04:06.000Z'),
        durationMs: 1000,
      },
      first: {
        nodeId: 'first',
        status: 'completed',
        completedAt: T('2026-08-16T10:04:02.000Z'),
        durationMs: 1000,
      },
    };
    render(
      <StepTree
        steps={legacy}
        nodeDataMap={{
          first: { type: 'trigger', data: {} },
          second: { type: 'action', data: {} },
        }}
      />,
    );
    expect(renderedOrder()).toEqual(['1. trigger', '2. action']);
  });

  it('keeps insertion order for steps with no usable timestamps at all', () => {
    const untimed: Record<string, StepExecution> = {
      alpha: { nodeId: 'alpha', status: 'pending' },
      beta: { nodeId: 'beta', status: 'pending' },
    };
    render(
      <StepTree
        steps={untimed}
        nodeDataMap={{
          alpha: { type: 'trigger', data: {} },
          beta: { type: 'action', data: {} },
        }}
      />,
    );
    expect(renderedOrder()).toEqual(['1. trigger', '2. action']);
  });
});
