// A step-output card belongs in the row of the step that PRODUCED it. Hosts
// were rendering those cards in a section above the tree, which put the output
// of step 4 above step 1 and left the row that made it showing only a
// duration.

import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { NodeType, StepExecution } from '../../../types/pipeline';
import { StepTree } from '../steps/StepTree';

const steps: Record<string, StepExecution> = {
  fetch: { nodeId: 'fetch', status: 'completed', startedAt: '2026-09-22T10:00:00.000Z', completedAt: '2026-09-22T10:00:01.000Z', durationMs: 1000 },
  deck: { nodeId: 'deck', status: 'completed', startedAt: '2026-09-22T10:00:01.000Z', completedAt: '2026-09-22T10:00:09.000Z', durationMs: 8000 },
  notify: { nodeId: 'notify', status: 'pending' },
};

const nodeDataMap: Record<string, { type: NodeType; data: Record<string, unknown> }> = {
  fetch: { type: 'trigger', data: {} },
  deck: { type: 'llm', data: {} },
  notify: { type: 'action', data: {} },
};

describe('StepTree renderStepDetail', () => {
  it('renders the slot for the matching step only', () => {
    render(
      <StepTree
        steps={steps}
        nodeDataMap={nodeDataMap}
        renderStepDetail={(_step, stepId) =>
          stepId === 'deck' ? <article>Sprint review deck</article> : null}
      />,
    );
    expect(screen.getByText('Sprint review deck')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^step-detail-/)).toHaveLength(1);
    expect(screen.getByTestId('step-detail-deck')).toBeInTheDocument();
  });

  it('puts the card in that step\u2019s own row, not above the tree', () => {
    render(
      <StepTree
        steps={steps}
        nodeDataMap={nodeDataMap}
        renderStepDetail={(_step, stepId) => (stepId === 'deck' ? <article>Deck card</article> : null)}
      />,
    );
    const row = screen.getByTestId('step-row-deck').parentElement!;
    expect(within(row).getByText('Deck card')).toBeInTheDocument();
  });

  it('shows the card without expanding the step', () => {
    render(
      <StepTree
        steps={steps}
        nodeDataMap={nodeDataMap}
        renderStepDetail={() => <span>Always visible</span>}
      />,
    );
    expect(screen.getByTestId('step-row-deck')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getAllByText('Always visible')).toHaveLength(3);
  });

  it('hands the slot the step itself, not just its id', () => {
    const renderStepDetail = vi.fn().mockReturnValue(null);
    render(<StepTree steps={steps} nodeDataMap={nodeDataMap} renderStepDetail={renderStepDetail} />);
    expect(renderStepDetail).toHaveBeenCalledWith(steps.deck, 'deck');
  });

  it('renders nothing extra without the prop', () => {
    render(<StepTree steps={steps} nodeDataMap={nodeDataMap} />);
    expect(screen.queryAllByTestId(/^step-detail-/)).toHaveLength(0);
  });
});
