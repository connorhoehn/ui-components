import { render, screen, act } from '@testing-library/react';
import { AgentsProvider, useAgentsContext } from '../AgentsContext';
import { fixtureAgents, fixtureMetrics } from '../../fixtures/agentsFixture';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function ContextReadout() {
  const ctx = useAgentsContext();
  return (
    <div>
      <span data-testid="agent-count">{ctx.agents.length}</span>
      <span data-testid="metrics-count">{ctx.metrics.length}</span>
      <span data-testid="selected">{ctx.selectedAgentId ?? 'none'}</span>
      <button onClick={() => ctx.selectAgent('orgiq-search')}>Select</button>
      <button onClick={() => ctx.selectAgent(null)}>Clear</button>
      <button onClick={() => ctx.refreshAgents()}>Refresh</button>
      <span data-testid="get-agent">{ctx.getAgent('orgiq-supervisor')?.name ?? 'missing'}</span>
      <span data-testid="get-metrics">{ctx.getMetrics('orgiq-supervisor')?.avgLatencyMs ?? 0}</span>
    </div>
  );
}

function ThrowingConsumer() {
  useAgentsContext();
  return null;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('AgentsProvider', () => {
  it('loads fixture agents and metrics by default', () => {
    render(
      <AgentsProvider>
        <ContextReadout />
      </AgentsProvider>,
    );
    expect(screen.getByTestId('agent-count').textContent).toBe(String(fixtureAgents.length));
    expect(screen.getByTestId('metrics-count').textContent).toBe(String(fixtureMetrics.length));
  });

  it('uses custom agents prop when provided', () => {
    const custom = [fixtureAgents[0]];
    render(
      <AgentsProvider agents={custom}>
        <ContextReadout />
      </AgentsProvider>,
    );
    expect(screen.getByTestId('agent-count').textContent).toBe('1');
  });

  it('selectAgent updates selectedAgentId', () => {
    render(
      <AgentsProvider>
        <ContextReadout />
      </AgentsProvider>,
    );
    expect(screen.getByTestId('selected').textContent).toBe('none');
    act(() => { screen.getByText('Select').click(); });
    expect(screen.getByTestId('selected').textContent).toBe('orgiq-search');
  });

  it('selectAgent(null) clears selectedAgentId', () => {
    render(
      <AgentsProvider>
        <ContextReadout />
      </AgentsProvider>,
    );
    act(() => { screen.getByText('Select').click(); });
    act(() => { screen.getByText('Clear').click(); });
    expect(screen.getByTestId('selected').textContent).toBe('none');
  });

  it('getAgent returns matching agent by id', () => {
    render(
      <AgentsProvider>
        <ContextReadout />
      </AgentsProvider>,
    );
    expect(screen.getByTestId('get-agent').textContent).toBe('Supervisor');
  });

  it('getMetrics returns metrics for the given agentId', () => {
    render(
      <AgentsProvider>
        <ContextReadout />
      </AgentsProvider>,
    );
    expect(screen.getByTestId('get-metrics').textContent).toBe('1240');
  });

  it('refreshAgents resets to initial agent list', () => {
    const custom = [fixtureAgents[0]];
    render(
      <AgentsProvider agents={custom}>
        <ContextReadout />
      </AgentsProvider>,
    );
    expect(screen.getByTestId('agent-count').textContent).toBe('1');
    act(() => { screen.getByText('Refresh').click(); });
    expect(screen.getByTestId('agent-count').textContent).toBe('1');
  });
});

describe('useAgentsContext', () => {
  it('throws when used outside AgentsProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ThrowingConsumer />)).toThrow(
      'useAgentsContext must be used within AgentsProvider',
    );
    spy.mockRestore();
  });
});
