import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AgentRunCard, agentRunRefFromMetadata, type AgentRunStatus } from '../AgentRunCard';
import { ChatPanel } from '../ChatPanel';

afterEach(cleanup);

const suggested: AgentRunStatus = { phase: 'completed', detail: '3 changes suggested', suggestion: { key: 'sug-1', documentId: 'd1', applied: 3 } };

describe('AgentRunCard review', () => {
  it('offers Accept / Reject only once an edit has landed as suggestions and nobody has decided', () => {
    const onReview = vi.fn();
    const { rerender } = render(<AgentRunCard runId="r1" instruction="tighten the intro" agentName="Haiku" status={{ phase: 'running', suggestion: suggested.suggestion }} onReview={onReview} />);
    expect(screen.queryByTestId('agent-run-card-review')).toBeNull();
    rerender(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={{ phase: 'completed', detail: 'Renamed' }} onReview={onReview} />);
    expect(screen.queryByTestId('agent-run-card-review')).toBeNull();
    rerender(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={suggested} onReview={onReview} />);
    expect(screen.getByTestId('agent-run-card-detail')).toHaveTextContent('3 changes suggested');
    expect(screen.getByTestId('agent-run-card-phase')).toHaveTextContent('Suggested');
    fireEvent.click(screen.getByTestId('agent-run-card-accept'));
    expect(onReview).toHaveBeenCalledWith('r1', 'accept', { key: 'sug-1', documentId: 'd1' });
    fireEvent.click(screen.getByTestId('agent-run-card-reject-review'));
    expect(onReview).toHaveBeenCalledWith('r1', 'reject', { key: 'sug-1', documentId: 'd1' });
    // Still two lines with the buttons on the status row.
    expect(screen.getByTestId('agent-run-card').children).toHaveLength(2);
    // No reviewer handler, no buttons.
    rerender(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={suggested} />);
    expect(screen.queryByTestId('agent-run-card-review')).toBeNull();
  });

  it('writes the count itself when the status has no detail', () => {
    render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={{ phase: 'completed', suggestion: { key: 'k', applied: 1 } }} />);
    expect(screen.getByTestId('agent-run-card-detail')).toHaveTextContent('1 change suggested');
  });

  it('says who decided, with no buttons, once the suggestions are reviewed', () => {
    const onReview = vi.fn();
    const { rerender } = render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={{ ...suggested, review: { decision: 'accept', by: 'u-grace', byName: 'Grace', at: '2026-09-09T09:00:00Z' } }} onReview={onReview} />);
    expect(screen.queryByTestId('agent-run-card-review')).toBeNull();
    expect(screen.getByTestId('agent-run-card-phase')).toHaveTextContent('Reviewed');
    expect(screen.getByTestId('agent-run-card-detail')).toHaveTextContent('Accepted by Grace');
    expect(screen.getByTestId('agent-run-card-detail').dataset.review).toBe('accept');
    expect(screen.getByTestId('agent-run-card').children).toHaveLength(2);
    // Falls back to the id when there is no display name.
    rerender(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={{ ...suggested, review: { decision: 'reject', by: 'u-lee', at: '2026-09-09T09:00:00Z' } }} onReview={onReview} />);
    expect(screen.getByTestId('agent-run-card-detail')).toHaveTextContent('Rejected by u-lee');
    expect(screen.getByTestId('agent-run-card-detail').dataset.review).toBe('reject');
    expect(screen.queryByTestId('agent-run-card-review')).toBeNull();
  });

  it('reads the suggestion key off the message metadata, and only when it is a string', () => {
    expect(agentRunRefFromMetadata({ kind: 'agent-run', runId: 'r', documentId: 'd', suggestionKey: 'sug-9' })).toMatchObject({ runId: 'r', suggestionKey: 'sug-9' });
    expect(agentRunRefFromMetadata({ kind: 'agent-run', runId: 'r', suggestionKey: 7 })).not.toHaveProperty('suggestionKey');
    expect(agentRunRefFromMetadata({ kind: 'agent-run', runId: 'r' })).not.toHaveProperty('suggestionKey');
  });
});

describe('ChatPanel threads onReviewRun to the card', () => {
  const message = { id: 'm1', clientId: 'c1', content: '/doc tighten the intro', displayName: 'Grace', timestamp: new Date(2026, 8, 9, 9, 0).toISOString(), metadata: { kind: 'agent-run', runId: 'r1', documentId: 'd1', instruction: 'tighten the intro', agentName: 'Haiku', suggestionKey: 'sug-1' } };

  it('accepts from the transcript with the live status key', () => {
    const onReviewRun = vi.fn();
    render(<ChatPanel messages={[message]} onSend={() => {}} agentRunStatus={() => suggested} onReviewRun={onReviewRun} />);
    fireEvent.click(screen.getByTestId('agent-run-card-accept'));
    expect(onReviewRun).toHaveBeenCalledWith('r1', 'accept', { key: 'sug-1', documentId: 'd1' });
  });

  it('falls back to the metadata key when the live status knows only that the run finished', () => {
    const onReviewRun = vi.fn();
    render(<ChatPanel messages={[message]} onSend={() => {}} agentRunStatus={() => ({ phase: 'completed' })} onReviewRun={onReviewRun} />);
    fireEvent.click(screen.getByTestId('agent-run-card-reject-review'));
    expect(onReviewRun).toHaveBeenCalledWith('r1', 'reject', { key: 'sug-1', documentId: 'd1' });
  });
});
