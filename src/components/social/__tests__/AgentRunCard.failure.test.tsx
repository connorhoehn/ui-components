import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AgentRunCard, describeAgentRunFailure } from '../AgentRunCard';

// A failed run's card used to print the pipeline's own error on its status
// row — "the chat service did not confirm the join of chat:dm:a:b within
// 4000ms". These pin the plain sentence a person reads instead, the technical
// text kept under the disclosure, and the Retry the host can offer.

afterEach(cleanup);

const JOIN_TIMEOUT = 'the chat service did not confirm the join of chat:dm:dev-connor:dev-frank within 4000ms';

describe('describeAgentRunFailure', () => {
  it('turns a chat timeout into what did not happen and what to do, naming the command\'s result', () => {
    expect(describeAgentRunFailure(JOIN_TIMEOUT, '/deck')).toEqual({
      summary: "Couldn't post the deck to this conversation — the chat didn't respond. Try again.",
      technical: JOIN_TIMEOUT,
    });
    expect(describeAgentRunFailure('the chat service did not answer the send for chat:general (timeout after 2000ms)', '/doc').summary)
      .toBe("Couldn't post the edit to this conversation — the chat didn't respond. Try again.");
  });

  it('says a refusal is about membership, not a slow reply', () => {
    const raw = 'the chat service refused to post to chat:dm:a:b: You are not a member of this direct-message channel (CHAT_DM_FORBIDDEN)';
    expect(describeAgentRunFailure(raw, '/summarize')).toEqual({
      summary: "Couldn't post the summary to this conversation — you're not a member of it.",
      technical: raw,
    });
  });

  it('covers an unreachable gateway and a silent model', () => {
    expect(describeAgentRunFailure('gateway connection failed: could not connect to the gateway at ws://localhost:18080: ECONNREFUSED', '/deck').summary)
      .toBe("Couldn't reach the chat service to post the deck. Try again.");
    expect(describeAgentRunFailure('the model did not answer within 60 s', '/deck').summary)
      .toBe("The agent didn't answer in time, so the deck wasn't made. Try again in a minute.");
  });

  it('passes a sentence written for people through unchanged, with nothing to disclose', () => {
    const human = 'The agent is busy: no model slot came free within 30 seconds, so nothing was changed. Try again in a minute.';
    expect(describeAgentRunFailure(human, '/deck')).toEqual({ summary: human });
    expect(describeAgentRunFailure(undefined)).toEqual({ summary: 'The run failed.' });
  });
});

describe('AgentRunCard on a failed run', () => {
  it('shows the plain sentence on the status row and the technical text under Details', () => {
    render(<AgentRunCard runId="r1" instruction="Frank Davis · Sep 22" command="/deck" agentName="Pipeline" status={{ phase: 'failed', detail: JOIN_TIMEOUT }} />);
    expect(screen.getByTestId('agent-run-card-detail')).toHaveTextContent("Couldn't post the deck to this conversation — the chat didn't respond. Try again.");
    expect(screen.getByTestId('agent-run-card-detail')).not.toHaveTextContent('4000ms');
    expect(screen.queryByTestId('agent-run-card-details-error')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Show details' }));
    expect(screen.getByTestId('agent-run-card-details-error')).toHaveTextContent(JOIN_TIMEOUT);
    expect(screen.getByTestId('agent-run-card-details-error-block')).toHaveTextContent('Details');
  });

  it('prefers the details error over the status detail, and offers Retry only when the host can retry', () => {
    const onRetry = vi.fn();
    const { rerender } = render(<AgentRunCard runId="r2" instruction="x" command="/deck" agentName="Pipeline" status={{ phase: 'failed', detail: 'Run failed · inspect run', details: { error: JOIN_TIMEOUT } }} />);
    expect(screen.getByTestId('agent-run-card-detail')).toHaveTextContent("the chat didn't respond");
    expect(screen.queryByTestId('agent-run-card-retry')).toBeNull();

    rerender(<AgentRunCard runId="r2" instruction="x" command="/deck" agentName="Pipeline" status={{ phase: 'failed', details: { error: JOIN_TIMEOUT } }} onRetry={onRetry} />);
    fireEvent.click(screen.getByTestId('agent-run-card-retry'));
    expect(onRetry).toHaveBeenCalledWith('r2');
    // Not on a run that is still moving.
    rerender(<AgentRunCard runId="r2" instruction="x" command="/deck" agentName="Pipeline" status={{ phase: 'running' }} onRetry={onRetry} />);
    expect(screen.queryByTestId('agent-run-card-retry')).toBeNull();
  });
});
