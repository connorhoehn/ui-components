import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AgentRunCard, agentRunRefFromMetadata, agentRunResultFromMetadata, type AgentRunResult } from '../AgentRunCard';
import { ChatPanel } from '../ChatPanel';

afterEach(cleanup);

const panelResult: AgentRunResult = { kind: 'panel', panel: { kind: 'graph', id: 'k8s', title: 'Kubernetes experts' } };

describe('AgentRunCard result', () => {
  it('offers one small "Open" once the run is done, and not a moment before', () => {
    const onOpenResult = vi.fn();
    const { rerender } = render(<AgentRunCard runId="r1" instruction="find me all kubernetes experts" command="/search" agentName="Search" result={panelResult} onOpenResult={onOpenResult} status={{ phase: 'running' }} />);
    expect(screen.queryByTestId('agent-run-card-open-result')).toBeNull();
    rerender(<AgentRunCard runId="r1" instruction="x" command="/search" agentName="Search" result={panelResult} onOpenResult={onOpenResult} status={{ phase: 'completed', detail: '12 people' }} />);
    const open = screen.getByTestId('agent-run-card-open-result');
    expect(open).toHaveTextContent('Open');
    expect(open.dataset.resultKind).toBe('panel');
    fireEvent.click(open);
    expect(onOpenResult).toHaveBeenCalledWith(panelResult);
    // Still two lines: the command row and the status row with the action on it.
    expect(screen.getByTestId('agent-run-card').children).toHaveLength(2);
  });

  it('prefers the live status result and uses a link label when there is one', () => {
    const onOpenResult = vi.fn();
    const fromStatus: AgentRunResult = { kind: 'link', href: 'https://example.test/report', label: 'View report' };
    render(<AgentRunCard runId="r1" instruction="x" agentName="A" result={panelResult} onOpenResult={onOpenResult} status={{ phase: 'completed', result: fromStatus }} />);
    fireEvent.click(screen.getByText('View report'));
    expect(onOpenResult).toHaveBeenCalledWith(fromStatus);
  });

  it('renders a link result as a real link when the host gave no handler, and nothing without a result', () => {
    render(<AgentRunCard runId="r1" instruction="x" agentName="A" status={{ phase: 'completed', result: { kind: 'link', href: 'https://example.test/r' } }} />);
    const a = screen.getByTestId('agent-run-card-open-result');
    expect(a.tagName).toBe('A');
    expect(a).toHaveAttribute('href', 'https://example.test/r');
    cleanup();
    render(<AgentRunCard runId="r1" instruction="x" agentName="A" status={{ phase: 'completed' }} onOpenResult={() => {}} />);
    expect(screen.queryByTestId('agent-run-card-open-result')).toBeNull();
  });

  it('does not show the same document twice when the result IS the document', () => {
    const onOpenResult = vi.fn();
    const onOpenDocument = vi.fn();
    const result: AgentRunResult = { kind: 'document', documentId: 'd1' };
    const { rerender } = render(<AgentRunCard runId="r1" instruction="x" agentName="A" status={{ phase: 'completed', result }} onOpenResult={onOpenResult} onOpenDocument={onOpenDocument} />);
    expect(screen.queryByTestId('agent-run-card-open-document')).toBeNull();
    fireEvent.click(screen.getByTestId('agent-run-card-open-result'));
    expect(onOpenResult).toHaveBeenCalledWith(result);
    // Without a result handler the old document link is still the way in.
    rerender(<AgentRunCard runId="r1" instruction="x" agentName="A" status={{ phase: 'completed', result }} onOpenDocument={onOpenDocument} />);
    expect(screen.getByTestId('agent-run-card-open-document')).toBeInTheDocument();
  });
});

describe('agentRunResultFromMetadata', () => {
  it('reads the three result shapes and refuses anything malformed', () => {
    expect(agentRunResultFromMetadata({ kind: 'panel', panel: { kind: 'graph', id: 'g', title: 'G', params: { q: 'k8s', n: 3 } } })).toEqual({ kind: 'panel', panel: { kind: 'graph', id: 'g', title: 'G', params: { q: 'k8s' } } });
    expect(agentRunResultFromMetadata({ kind: 'document', documentId: 'd' })).toEqual({ kind: 'document', documentId: 'd' });
    expect(agentRunResultFromMetadata({ kind: 'link', href: 'https://x', label: 'X' })).toEqual({ kind: 'link', href: 'https://x', label: 'X' });
    expect(agentRunResultFromMetadata({ kind: 'panel', panel: { kind: 'graph' } })).toBeNull();
    expect(agentRunResultFromMetadata({ kind: 'document' })).toBeNull();
    expect(agentRunResultFromMetadata({ kind: 'link' })).toBeNull();
    expect(agentRunResultFromMetadata('panel')).toBeNull();
    expect(agentRunResultFromMetadata(undefined)).toBeNull();
  });

  it('rides along on the agent-run ref, and is absent when the metadata has none', () => {
    expect(agentRunRefFromMetadata({ kind: 'agent-run', runId: 'r', command: '/search', result: { kind: 'panel', panel: { kind: 'graph', id: 'g' } } })).toMatchObject({ runId: 'r', command: '/search', result: { kind: 'panel', panel: { kind: 'graph', id: 'g' } } });
    expect(agentRunRefFromMetadata({ kind: 'agent-run', runId: 'r' })).not.toHaveProperty('result');
  });
});

describe('ChatPanel threads onOpenResult to the card', () => {
  it('opens a finished run result from the transcript', () => {
    const onOpenResult = vi.fn();
    render(
      <ChatPanel
        messages={[{ id: 'm1', clientId: 'c1', content: '/search find me all kubernetes experts', displayName: 'Grace', timestamp: new Date(2026, 8, 9, 9, 0).toISOString(), metadata: { kind: 'agent-run', runId: 'r1', command: '/search', instruction: 'find me all kubernetes experts', agentName: 'Search', result: { kind: 'panel', panel: { kind: 'graph', id: 'k8s' } } } }]}
        onSend={() => {}}
        agentRunStatus={() => ({ phase: 'completed', detail: '12 people' })}
        onOpenResult={onOpenResult}
      />,
    );
    fireEvent.click(screen.getByTestId('agent-run-card-open-result'));
    expect(onOpenResult).toHaveBeenCalledWith({ kind: 'panel', panel: { kind: 'graph', id: 'k8s' } });
  });
});
