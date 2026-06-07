import { render, screen, fireEvent } from '@testing-library/react';
import { AgentDirectory } from '../AgentDirectory';
import type { AgentDefinition } from '../../../../types/agents';

function a(
  id: string,
  name: string,
  status: AgentDefinition['status'] = 'healthy',
  extra: Partial<AgentDefinition> = {},
): AgentDefinition {
  return {
    id,
    name,
    status,
    protocol: 'direct',
    model: 'sonnet',
    tools: [],
    guardrails: [],
    endpoint: 'https://example.test',
    ...extra,
  };
}

describe('AgentDirectory', () => {
  it('renders one card per agent and a search input', () => {
    render(
      <AgentDirectory
        agents={[a('a1', 'Alpha'), a('a2', 'Beta'), a('a3', 'Gamma')]}
      />,
    );
    expect(screen.getByLabelText('Search agents')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
  });

  it('filters by query against name, id, and description', () => {
    render(
      <AgentDirectory
        agents={[
          a('alpha-bot', 'Alpha'),
          a('beta-id', 'Beta', 'healthy', { description: 'specialized planner' }),
          a('gamma', 'Gamma'),
        ]}
      />,
    );
    const search = screen.getByLabelText('Search agents');

    fireEvent.change(search, { target: { value: 'planner' } });
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.queryByText('Gamma')).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: 'alpha' } });
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
  });

  it('toggles a status filter and clears it when re-clicked', () => {
    render(
      <AgentDirectory
        agents={[
          a('a1', 'Alpha', 'healthy'),
          a('a2', 'Beta', 'degraded'),
          a('a3', 'Gamma', 'offline'),
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'degraded' }));
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.queryByText('Gamma')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'degraded' }));
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
  });

  it('shows the empty state when filters exclude everything', () => {
    render(
      <AgentDirectory
        agents={[a('a1', 'Alpha', 'offline')]}
        emptyMessage="No matches"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'healthy' }));
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });

  it('calls onSelect with the chosen agent', () => {
    const onSelect = vi.fn();
    render(
      <AgentDirectory
        agents={[a('a1', 'Alpha'), a('a2', 'Beta')]}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByText('Beta'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0].id).toBe('a2');
  });

  it('restricts the filter chip row to the provided filters prop', () => {
    render(
      <AgentDirectory
        agents={[a('a1', 'Alpha', 'healthy')]}
        filters={['healthy', 'offline']}
      />,
    );
    expect(screen.getByRole('button', { name: 'healthy' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'offline' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'degraded' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'deploying' })).not.toBeInTheDocument();
  });
});
