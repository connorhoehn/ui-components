import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AgentRunCard, agentRunRefFromMetadata } from '../AgentRunCard';

afterEach(cleanup);

describe('AgentRunCard', () => {
  it('shows the instruction, the agent, and the run moving through three beats', () => {
    const onOpenRun = vi.fn();
    const { rerender } = render(<AgentRunCard runId="r1" instruction="change the title to Q3 audit" agentName="Haiku" requestedBy="Grace" onOpenRun={onOpenRun} />);
    expect(screen.getByTestId('agent-run-card').dataset.phase).toBe('received');
    expect(screen.getByTestId('agent-run-card-instruction')).toHaveTextContent('/doc change the title to Q3 audit');
    const states = () => [...screen.getByTestId('agent-run-card-steps').querySelectorAll('li')].map((li) => li.dataset.state);
    expect(states()).toEqual(['active', 'pending', 'pending']);
    rerender(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={{ phase: 'running', stepLabel: 'Planning the edit' }} />);
    expect(states()).toEqual(['done', 'active', 'pending']);
    expect(screen.getByTestId('agent-run-card-detail')).toHaveTextContent('Haiku — Planning the edit');
    rerender(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={{ phase: 'completed', detail: 'Renamed to Q3 audit' }} />);
    expect(states()).toEqual(['done', 'done', 'done']);
    expect(screen.getByTestId('agent-run-card-detail')).toHaveTextContent('Renamed to Q3 audit');
    // Two lines: the command row and the status row.
    expect(screen.getByTestId('agent-run-card').children).toHaveLength(2);
    rerender(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={{ phase: 'failed', detail: 'gateway unreachable' }} onOpenRun={onOpenRun} />);
    expect(states()).toEqual(['done', 'done', 'failed']);
    fireEvent.click(screen.getByTestId('agent-run-card-open-run'));
    expect(onOpenRun).toHaveBeenCalledWith('r1');
  });

  it('reads only agent-run metadata that names a run and a document', () => {
    expect(agentRunRefFromMetadata({ kind: 'agent-run', runId: 'r', documentId: 'd', instruction: 'i', agentName: 'Haiku' })).toEqual({ runId: 'r', documentId: 'd', instruction: 'i', agentName: 'Haiku', command: '/doc' });
    expect(agentRunRefFromMetadata({ kind: 'agent-run', runId: 'r', command: 'recording' })).toMatchObject({ runId: 'r', documentId: '', command: 'recording' });
    expect(agentRunRefFromMetadata({ kind: 'agent-run' })).toBeNull();
    expect(agentRunRefFromMetadata({ kind: 'document', documentId: 'd' })).toBeNull();
  });
});
