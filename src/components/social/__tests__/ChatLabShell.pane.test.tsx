import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChatLabShell, type LabStep } from '../ChatLabShell';

afterEach(cleanup);

const STEPS: LabStep[] = [
  { id: 's1', title: 'Draft the agenda', kind: 'agenda', status: 'done' },
  { id: 's2', title: 'Build the deck', kind: 'deck', status: 'running' },
  { id: 's3', title: 'Review', kind: 'review', status: 'pending' },
];

function renderShell(variant?: 'column' | 'pane') {
  const props = {
    title: 'write a haiku about this call',
    status: 'running' as const,
    model: 'us.anthropic.claude-sonnet-5-20260514-v1:0',
    contextBudgetTokens: 200_000,
    contextTokens: 42_000,
    iterations: 3,
    steps: STEPS,
    events: [],
    onInstruct: vi.fn(),
    onStop: vi.fn(),
    onBackToChat: vi.fn(),
    onOpenRun: vi.fn(),
    onOpenGraph: vi.fn(),
    shell: { sessionId: 'box-1', onRequestShell: vi.fn() },
    headerAccessory: <span data-testid="viewers">2 watching</span>,
    ...(variant ? { variant } : {}),
  };
  return { props, ...render(<ChatLabShell {...props} />) };
}

describe('ChatLabShell variant="pane"', () => {
  it('stacks the status line into where-it-is and what-it-spent rows', () => {
    renderShell('pane');
    const root = screen.getByTestId('chat-lab-shell');
    expect(root.dataset.variant).toBe('pane');
    const status = screen.getByTestId('chat-lab-shell-status');
    expect(status.dataset.layout).toBe('stacked');
    expect(status.className).toContain('flex-col');
    const where = screen.getByTestId('chat-lab-shell-status-where');
    const spend = screen.getByTestId('chat-lab-shell-status-spend');
    expect(where).toContainElement(screen.getByTestId('chat-lab-shell-status-label'));
    expect(where).toContainElement(screen.getByTestId('chat-lab-shell-model'));
    expect(where.className).toContain('flex-wrap');
    expect(spend).toContainElement(screen.getByTestId('chat-lab-shell-budget'));
    expect(spend).toContainElement(screen.getByTestId('chat-lab-shell-budget-meter'));
    expect(spend).toContainElement(screen.getByTestId('chat-lab-shell-iterations'));
    expect(spend.className).toContain('flex-wrap');
    expect(screen.getByTestId('chat-lab-shell-budget')).toHaveTextContent('42k / 200k');
  });

  it('wraps the step rail instead of scrolling it sideways', () => {
    renderShell('pane');
    const rail = screen.getByTestId('chat-lab-shell-steps');
    expect(rail.className).toContain('flex-wrap');
    expect(rail.className).not.toContain('overflow-x-auto');
    expect(screen.getAllByTestId('chat-lab-shell-step').map((li) => li.dataset.state)).toEqual(['done', 'running', 'pending']);
  });

  it('keeps every control, and reads Close rather than Back to chat', () => {
    const { props } = renderShell('pane');
    for (const id of ['open-graph', 'open-run', 'stop', 'back', 'prompt', 'send', 'stream', 'header-accessory', 'prompt-row']) {
      expect(screen.getByTestId(`chat-lab-shell-${id}`)).toBeInTheDocument();
    }
    expect(screen.getByRole('tab', { name: 'Stream' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Terminal' })).toBeInTheDocument();
    const close = screen.getByTestId('chat-lab-shell-back');
    expect(close).toHaveTextContent('Close');
    expect(screen.queryByText('Back to chat')).toBeNull();
    fireEvent.click(close);
    expect(props.onBackToChat).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(screen.getByTestId('chat-lab-shell-stream'), { key: 'Escape' });
    expect(props.onBackToChat).toHaveBeenCalledTimes(2);
  });

  it('leaves the column variant exactly as it was', () => {
    renderShell();
    expect(screen.getByTestId('chat-lab-shell').dataset.variant).toBe('column');
    expect(screen.getByTestId('chat-lab-shell-status').dataset.layout).toBe('row');
    expect(screen.queryByTestId('chat-lab-shell-status-where')).toBeNull();
    expect(screen.getByTestId('chat-lab-shell-steps').className).toContain('overflow-x-auto');
    expect(screen.getByTestId('chat-lab-shell-back')).toHaveTextContent('Back to chat');
  });
});
