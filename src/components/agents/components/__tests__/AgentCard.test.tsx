import { render, screen, fireEvent } from '@testing-library/react';
import { AgentCard } from '../AgentCard';
import type { AgentDefinition, AgentMetrics } from '../../../../types/agents';

function makeAgent(overrides: Partial<AgentDefinition> = {}): AgentDefinition {
  return {
    id: 'agent-1',
    name: 'Test Agent',
    status: 'healthy',
    protocol: 'a2a',
    model: 'gpt-4',
    tools: [],
    guardrails: [],
    endpoint: 'http://localhost:1234',
    ...overrides,
  };
}

function makeMetrics(overrides: Partial<AgentMetrics> = {}): AgentMetrics {
  return {
    agentId: 'agent-1',
    invocationsTotal: 1000,
    invocationsLast24h: 42,
    errorsLast24h: 0,
    avgLatencyMs: 180,
    p99LatencyMs: 350,
    tokensInLast24h: 0,
    tokensOutLast24h: 0,
    guardrailBlocksLast24h: 0,
    asOf: new Date().toISOString(),
    ...overrides,
  };
}

describe('AgentCard', () => {
  it('renders name, id, protocol, and model', () => {
    render(<AgentCard agent={makeAgent({ name: 'Searcher', id: 'srch', model: 'gpt-4o' })} />);
    expect(screen.getByText('Searcher')).toBeInTheDocument();
    expect(screen.getByText('srch')).toBeInTheDocument();
    expect(screen.getByText('a2a')).toBeInTheDocument();
    expect(screen.getByText('gpt-4o')).toBeInTheDocument();
  });

  it('renders description when present', () => {
    render(<AgentCard agent={makeAgent({ description: 'Searches the docs' })} />);
    expect(screen.getByText('Searches the docs')).toBeInTheDocument();
  });

  it('healthy status renders success-tone pill with status label', () => {
    render(<AgentCard agent={makeAgent({ status: 'healthy' })} />);
    const pill = screen.getByText('healthy');
    expect(pill).toHaveClass('bg-success-bg');
    expect(pill).toHaveClass('text-success-fg');
  });

  it('offline status renders danger-tone pill', () => {
    render(<AgentCard agent={makeAgent({ status: 'offline' })} />);
    const pill = screen.getByText('offline');
    expect(pill).toHaveClass('bg-danger-bg');
    expect(pill).toHaveClass('text-danger-fg');
  });

  it('selected=true highlights the wrapper with the info-tone ring', () => {
    const { container } = render(<AgentCard agent={makeAgent()} selected />);
    expect(container.firstChild).toHaveClass('border-info');
  });

  it('selected=false uses the slate border', () => {
    const { container } = render(<AgentCard agent={makeAgent()} selected={false} />);
    expect(container.firstChild).toHaveClass('border-slate-200');
  });

  it('fires onClick when the card is clicked', () => {
    const onClick = vi.fn();
    const { container } = render(<AgentCard agent={makeAgent()} onClick={onClick} />);
    fireEvent.click(container.firstChild as HTMLElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('metrics prop wins over inline agent.invocationsLast24h / avgLatencyMs', () => {
    render(
      <AgentCard
        agent={makeAgent({ invocationsLast24h: 999, avgLatencyMs: 999 })}
        metrics={makeMetrics({ invocationsLast24h: 7, avgLatencyMs: 21 })}
      />,
    );
    expect(screen.getByText('7 inv/24h')).toBeInTheDocument();
    expect(screen.getByText('21ms avg')).toBeInTheDocument();
    expect(screen.queryByText('999 inv/24h')).not.toBeInTheDocument();
  });

  it('falls back to inline agent.invocationsLast24h / avgLatencyMs when metrics absent', () => {
    render(
      <AgentCard agent={makeAgent({ invocationsLast24h: 5, avgLatencyMs: 130 })} />,
    );
    expect(screen.getByText('5 inv/24h')).toBeInTheDocument();
    expect(screen.getByText('130ms avg')).toBeInTheDocument();
  });

  it('treats missing inline invocationsLast24h as 0 when only avgLatencyMs is set', () => {
    render(<AgentCard agent={makeAgent({ avgLatencyMs: 80 })} />);
    expect(screen.getByText('0 inv/24h')).toBeInTheDocument();
    expect(screen.getByText('80ms avg')).toBeInTheDocument();
  });

  it('omits the metrics row when neither metrics nor inline avgLatencyMs is provided', () => {
    render(<AgentCard agent={makeAgent()} />);
    expect(screen.queryByText(/inv\/24h/)).not.toBeInTheDocument();
    expect(screen.queryByText(/ms avg/)).not.toBeInTheDocument();
  });

  it('renders all tools when length ≤ 4', () => {
    render(<AgentCard agent={makeAgent({ tools: ['search', 'fetch', 'code', 'eval'] })} />);
    expect(screen.getByText('search')).toBeInTheDocument();
    expect(screen.getByText('fetch')).toBeInTheDocument();
    expect(screen.getByText('code')).toBeInTheDocument();
    expect(screen.getByText('eval')).toBeInTheDocument();
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it('truncates tools to first 4 with "+N" overflow when length > 4', () => {
    render(
      <AgentCard
        agent={makeAgent({ tools: ['a', 'b', 'c', 'd', 'e', 'f', 'g'] })}
      />,
    );
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('d')).toBeInTheDocument();
    expect(screen.queryByText('e')).not.toBeInTheDocument();
    expect(screen.getByText('+3')).toBeInTheDocument();
  });

  it('omits the tools row entirely when tools is empty', () => {
    const { container } = render(<AgentCard agent={makeAgent({ tools: [] })} />);
    expect(container.querySelectorAll('span.bg-slate-100')).toHaveLength(1); // protocol pill only
  });
});
