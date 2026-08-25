// Crash resistance for AgentDetailPage.
//
// Companion to `src/components/shared/__tests__/crash-resistance.test.tsx`.
// `AgentsProvider` accepts an `agents` array straight from the host — either
// passed as a prop or fetched from `baseUrl` — so `AgentDefinition`'s required
// fields are a compile-time promise the runtime never checks. A registry entry
// with no `tools` array or no `protocol` is a perfectly ordinary response from
// a registry that models those as optional.
//
// This is a PAGE, so the throw took the whole view with it: the agent name,
// the trace timeline and the Back button all disappeared, leaving the user
// stranded with no way to navigate off the broken record.

import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { AgentDefinition, AgentMetrics } from '../../../types/agents';
import { AgentsProvider } from '../context/AgentsContext';
import { AgentDetailPage } from '../AgentDetailPage';

afterEach(cleanup);

function agent(over: Partial<AgentDefinition>): AgentDefinition {
  return {
    id: 'a1',
    name: 'Search Agent',
    status: 'healthy',
    protocol: 'ag-ui',
    model: 'claude-sonnet-4',
    tools: ['search', 'summarize'],
    guardrails: [],
    endpoint: 'https://example.invalid/agents/a1',
    ...over,
  } as AgentDefinition;
}

function renderPage(a: AgentDefinition, metrics?: AgentMetrics[]) {
  return render(
    <AgentsProvider agents={[a]} metrics={metrics ?? []}>
      <AgentDetailPage agentId="a1" onBack={() => {}} />
    </AgentsProvider>,
  );
}

describe('AgentDetailPage — malformed registry record', () => {
  it('renders the page when the record has no `tools` array', () => {
    renderPage(agent({ tools: undefined as unknown as string[] }));
    expect(screen.getByText('Search Agent')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });

  it('renders the page when the record has no `protocol`', () => {
    renderPage(agent({ protocol: undefined as unknown as AgentDefinition['protocol'] }));
    expect(screen.getByText('Search Agent')).toBeInTheDocument();
    // The escape hatch off a broken record is the point of this test.
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('renders the metrics block when the token counters are absent', () => {
    const metrics = [
      {
        agentId: 'a1',
        invocationsLast24h: 12,
        errorsLast24h: 0,
        avgLatencyMs: 120,
        p99LatencyMs: 400,
        guardrailBlocksLast24h: 0,
      } as unknown as AgentMetrics,
    ];
    renderPage(agent({}), metrics);
    expect(screen.getByText('Metrics (24h)')).toBeInTheDocument();
    // The counters that DID arrive still render — the absent ones degrade to a
    // dash rather than taking the block down.
    expect(screen.getByText('12')).toBeInTheDocument();
  });
});
