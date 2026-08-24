import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { AgentInvokePage } from '../AgentInvokePage';
import { AgentsProvider } from '../context/AgentsContext';
import type { AgentDefinition } from '../../../types/agents';

afterEach(cleanup);

function makeAgent(overrides: Partial<AgentDefinition> = {}): AgentDefinition {
  return {
    id: 'agent-1',
    name: 'Researcher',
    status: 'healthy',
    protocol: 'a2a',
    model: 'gpt-4o',
    tools: [],
    guardrails: [],
    endpoint: 'http://localhost:1234',
    ...overrides,
  };
}

const agents = [
  makeAgent(),
  makeAgent({ id: 'agent-2', name: 'Summariser', model: 'claude-3' }),
];

function renderPage() {
  return render(
    <AgentsProvider agents={agents}>
      <AgentInvokePage />
    </AgentsProvider>,
  );
}

describe('AgentInvokePage — agent rail keyboard access', () => {
  // REGRESSION: each agent row in the left rail was a plain <div> with onClick.
  // It had no role and was not in the tab order, so a keyboard user could not
  // switch agents at all.
  it('renders every agent row as a focusable button', () => {
    renderPage();

    const row = screen.getByRole('button', { name: /Summariser/ });
    expect(row.tagName).toBe('BUTTON');
    expect(row).toHaveAttribute('type', 'button');

    // A <div> row cannot take focus; a <button> can.
    row.focus();
    expect(row).toHaveFocus();
  });

  it('activating a row selects that agent', () => {
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: /Summariser/ }));

    const selected = screen.getByRole('button', { name: /Summariser/ });
    expect(selected.className).toContain('border-l-primary');
  });
});
