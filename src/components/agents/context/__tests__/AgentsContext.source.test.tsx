// Regression: AgentsProvider accepted `baseUrl` and threw it away.
//
// `baseUrl: _baseUrl` — the prop was destructured into a void binding, so a
// host that pointed the provider at a real registry got `fixtureAgents` and
// `fixtureMetrics` with no discriminator of any kind. AgentsDashboardPage
// rendered invented health counts and invocation totals in exactly the type it
// uses for live numbers. This is the same class of bug that was fixed in
// `useAgentMetrics` by adding `source: 'fixture' | 'remote'` — the provider
// just had no such tag at all.

import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { AgentsProvider, useAgentsContext } from '../AgentsContext';
import { AgentsDashboardPage } from '../../AgentsDashboardPage';
import { fixtureAgents, fixtureMetrics } from '../../fixtures/agentsFixture';
import type { AgentDefinition, AgentMetrics } from '../../../../types/agents';

const BASE = 'http://agents-api';

const REMOTE_AGENTS: AgentDefinition[] = [
  { ...fixtureAgents[0], id: 'remote-1', name: 'Remote One' },
];
const REMOTE_METRICS: AgentMetrics[] = [
  { ...fixtureMetrics[0], agentId: 'remote-1', avgLatencyMs: 7 },
];

function Readout() {
  const ctx = useAgentsContext();
  return (
    <div>
      <span data-testid="agents">{ctx.agents.map((a) => a.id).join(',')}</span>
      <span data-testid="metrics">{ctx.metrics.map((m) => m.agentId).join(',')}</span>
      <span data-testid="agents-source">{ctx.agentsSource}</span>
      <span data-testid="metrics-source">{ctx.metricsSource}</span>
      <span data-testid="error">{ctx.error ?? 'none'}</span>
      <button onClick={() => ctx.refreshAgents()}>Refresh</button>
    </div>
  );
}

/** Route by pathname so assertions never depend on the StrictMode call count. */
function stubApi(opts: { agentsOk?: boolean; metricsOk?: boolean } = {}) {
  const { agentsOk = true, metricsOk = true } = opts;
  const mock = vi.fn((url: string) => {
    if (url.endsWith('/agents/metrics')) {
      return Promise.resolve({
        ok: metricsOk, status: metricsOk ? 200 : 503,
        json: () => Promise.resolve(REMOTE_METRICS),
      } as unknown as Response);
    }
    if (url.endsWith('/agents')) {
      return Promise.resolve({
        ok: agentsOk, status: agentsOk ? 200 : 503,
        json: () => Promise.resolve(REMOTE_AGENTS),
      } as unknown as Response);
    }
    throw new Error(`unexpected fetch: ${url}`);
  });
  vi.stubGlobal('fetch', mock);
  return mock;
}

function urlsFor(mock: ReturnType<typeof stubApi>): string[] {
  return (mock.mock.calls as [string][]).map(([url]) => url);
}

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('AgentsProvider baseUrl wiring', () => {
  it('fetches both endpoints and reports source=remote', async () => {
    const mock = stubApi();
    render(<AgentsProvider baseUrl={BASE}><Readout /></AgentsProvider>);

    await waitFor(() => {
      expect(screen.getByTestId('agents-source')).toHaveTextContent('remote');
    });
    expect(screen.getByTestId('metrics-source')).toHaveTextContent('remote');
    expect(screen.getByTestId('agents')).toHaveTextContent('remote-1');
    expect(screen.getByTestId('metrics')).toHaveTextContent('remote-1');

    const urls = urlsFor(mock);
    expect(urls).toContain(`${BASE}/agents`);
    expect(urls).toContain(`${BASE}/agents/metrics`);
  });

  it('reports source=fixture and never fetches without a baseUrl', () => {
    const mock = stubApi();
    render(<AgentsProvider><Readout /></AgentsProvider>);

    expect(screen.getByTestId('agents-source')).toHaveTextContent('fixture');
    expect(screen.getByTestId('metrics-source')).toHaveTextContent('fixture');
    expect(mock).not.toHaveBeenCalled();
  });

  it('labels host-supplied props "provided", not "fixture"', () => {
    stubApi();
    render(
      <AgentsProvider agents={REMOTE_AGENTS} metrics={REMOTE_METRICS}>
        <Readout />
      </AgentsProvider>,
    );
    expect(screen.getByTestId('agents-source')).toHaveTextContent('provided');
    expect(screen.getByTestId('metrics-source')).toHaveTextContent('provided');
  });

  it('a prop wins over baseUrl and suppresses only that fetch', async () => {
    const mock = stubApi();
    render(
      <AgentsProvider baseUrl={BASE} agents={REMOTE_AGENTS}>
        <Readout />
      </AgentsProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('metrics-source')).toHaveTextContent('remote');
    });
    expect(screen.getByTestId('agents-source')).toHaveTextContent('provided');
    expect(urlsFor(mock)).not.toContain(`${BASE}/agents`);
    expect(urlsFor(mock)).toContain(`${BASE}/agents/metrics`);
  });

  it('a failed fetch keeps source=fixture and surfaces the error', async () => {
    stubApi({ agentsOk: false, metricsOk: false });
    render(<AgentsProvider baseUrl={BASE}><Readout /></AgentsProvider>);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('503');
    });
    // The whole point: the numbers on screen are still synthetic, and say so.
    expect(screen.getByTestId('agents-source')).toHaveTextContent('fixture');
    expect(screen.getByTestId('metrics-source')).toHaveTextContent('fixture');
    expect(screen.getByTestId('agents')).toHaveTextContent(fixtureAgents[0].id);
  });

  it('refreshAgents re-fetches when a baseUrl is configured', async () => {
    const mock = stubApi();
    render(<AgentsProvider baseUrl={BASE}><Readout /></AgentsProvider>);
    await waitFor(() => {
      expect(screen.getByTestId('agents-source')).toHaveTextContent('remote');
    });

    // Delta, not an absolute count — StrictMode double-mounts.
    const before = urlsFor(mock).filter((u) => u === `${BASE}/agents`).length;
    await act(async () => { screen.getByText('Refresh').click(); });
    await waitFor(() => {
      expect(urlsFor(mock).filter((u) => u === `${BASE}/agents`).length).toBe(before + 1);
    });
  });
});

// ---------------------------------------------------------------------------
// The discriminator has to reach the screen, or it is just a field nobody
// reads. AgentsDashboardPage derives every stat tile from `agents`/`metrics`.
// ---------------------------------------------------------------------------

describe('AgentsDashboardPage sample-data banner', () => {
  it('warns when the numbers are fixtures', () => {
    stubApi();
    render(<AgentsProvider><AgentsDashboardPage /></AgentsProvider>);
    expect(screen.getByTestId('agents-fixture-banner')).toHaveTextContent(/sample data/i);
  });

  it('says why when the registry is unreachable', async () => {
    stubApi({ agentsOk: false, metricsOk: false });
    render(<AgentsProvider baseUrl={BASE}><AgentsDashboardPage /></AgentsProvider>);
    await waitFor(() => {
      expect(screen.getByTestId('agents-fixture-banner')).toHaveTextContent(/could not be reached/i);
    });
  });

  it('is absent once real data has arrived', async () => {
    stubApi();
    render(<AgentsProvider baseUrl={BASE}><AgentsDashboardPage /></AgentsProvider>);
    await waitFor(() => {
      expect(screen.queryByTestId('agents-fixture-banner')).toBeNull();
    });
  });

  it('is absent for host-provided props', () => {
    stubApi();
    render(
      <AgentsProvider agents={REMOTE_AGENTS} metrics={REMOTE_METRICS}>
        <AgentsDashboardPage />
      </AgentsProvider>,
    );
    expect(screen.queryByTestId('agents-fixture-banner')).toBeNull();
  });
});
