import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ChatLabShell,
  ChatLabPill,
  formatTokens,
  type LabEvent,
  type LabStatus,
  type LabStep,
} from '../ChatLabShell';

afterEach(cleanup);

const STEPS: LabStep[] = [
  { id: 's1', title: 'Draft the agenda', kind: 'agenda', status: 'done', iterations: 2 },
  { id: 's2', title: 'Build the deck', kind: 'deck', status: 'running', iterations: 1 },
  { id: 's3', title: 'Review', kind: 'review', status: 'pending' },
];

const EVENTS: LabEvent[] = [
  { id: 'e1', at: '2026-09-21T10:48:21.024Z', kind: 'command', text: '/meeting /agenda create a meeting' },
  { id: 'e2', at: '2026-09-21T10:48:23.000Z', kind: 'tool', text: 'Read package.json', detail: '{"file":"package.json"}' },
  { id: 'e3', at: '2026-09-21T10:48:25.000Z', kind: 'text', text: 'Reading the board', mock: true },
];

function renderShell(overrides: Partial<React.ComponentProps<typeof ChatLabShell>> = {}) {
  const props = {
    title: 'create a meeting with the X team',
    status: 'running' as LabStatus,
    model: 'us.anthropic.claude-sonnet-5-20260514-v1:0',
    contextBudgetTokens: 200_000,
    contextTokens: 42_000,
    iterations: 3,
    steps: STEPS,
    events: EVENTS,
    onBackToChat: vi.fn(),
    ...overrides,
  };
  return { props, ...render(<ChatLabShell {...props} />) };
}

describe('formatTokens', () => {
  it('reads as a budget rather than a raw count', () => {
    expect(formatTokens(999)).toBe('999');
    expect(formatTokens(1_500)).toBe('1.5k');
    expect(formatTokens(200_000)).toBe('200k');
    expect(formatTokens(1_200_000)).toBe('1.2M');
  });
});

describe('ChatLabShell', () => {
  it('renders every status with its own word and dot', () => {
    const cases: Array<[LabStatus, string]> = [
      ['planning', 'Planning'],
      ['starting', 'Starting'],
      ['running', 'Running'],
      ['waiting', 'Waiting'],
      ['done', 'Done'],
      ['failed', 'Failed'],
      ['stopped', 'Stopped'],
      ['budget', 'Budget spent'],
    ];
    for (const [status, label] of cases) {
      cleanup();
      renderShell({ status });
      expect(screen.getByTestId('chat-lab-shell').dataset.status).toBe(status);
      expect(screen.getByTestId('chat-lab-shell-status-label')).toHaveTextContent(label);
      expect(screen.getByTestId('chat-lab-shell-status-dot')).toBeTruthy();
    }
  });

  it('shows the model short, the budget as k, the turns and the steps', () => {
    renderShell();
    expect(screen.getByTestId('chat-lab-shell-model')).toHaveTextContent('claude-sonnet-5');
    expect(screen.getByTestId('chat-lab-shell-budget')).toHaveTextContent('42k / 200k');
    expect(screen.getByTestId('chat-lab-shell-budget-meter').getAttribute('aria-valuenow')).toBe('21');
    expect(screen.getByTestId('chat-lab-shell-iterations')).toHaveTextContent('3 turns');
    const states = screen.getAllByTestId('chat-lab-shell-step').map((li) => li.dataset.state);
    expect(states).toEqual(['done', 'running', 'pending']);
  });

  it('collapses a tool event behind a disclosure and flags mock output', () => {
    renderShell();
    expect(screen.queryByTestId('chat-lab-shell-detail')).toBeNull();
    fireEvent.click(screen.getByTestId('chat-lab-shell-detail-toggle'));
    expect(screen.getByTestId('chat-lab-shell-detail')).toHaveTextContent('package.json');
    expect(screen.getByTestId('chat-lab-shell-mock')).toHaveTextContent('mock');
  });

  it('disables the prompt while the loop is mid-turn and opens it when it waits', () => {
    const { rerender, props } = renderShell({ status: 'running', onInstruct: vi.fn() });
    expect((screen.getByTestId('chat-lab-shell-prompt') as HTMLInputElement).disabled).toBe(true);
    rerender(<ChatLabShell {...props} status="waiting" />);
    expect((screen.getByTestId('chat-lab-shell-prompt') as HTMLInputElement).disabled).toBe(false);
  });

  it('sends the instruction on Enter and clears the line', () => {
    const onInstruct = vi.fn();
    renderShell({ status: 'waiting', onInstruct });
    const input = screen.getByTestId('chat-lab-shell-prompt') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'also add the budget slide' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onInstruct).toHaveBeenCalledWith('also add the budget slide');
    expect(input.value).toBe('');
  });

  it('hands the column back on Escape from anywhere in the shell', () => {
    const onBackToChat = vi.fn();
    renderShell({ onBackToChat });
    fireEvent.keyDown(screen.getByTestId('chat-lab-shell-stream'), { key: 'Escape' });
    expect(onBackToChat).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('chat-lab-shell-back'));
    expect(onBackToChat).toHaveBeenCalledTimes(2);
  });

  it('has no Terminal tab without a box, and offers to connect one that has no URL yet', () => {
    const { rerender, props } = renderShell();
    expect(screen.queryByRole('tab', { name: 'Terminal' })).toBeNull();

    const onRequestShell = vi.fn();
    rerender(<ChatLabShell {...props} shell={{ sessionId: 'sess-1', onRequestShell }} />);
    const tab = screen.getByRole('tab', { name: 'Terminal' });
    fireEvent.click(tab);
    fireEvent.click(screen.getByTestId('chat-lab-shell-connect-terminal'));
    expect(onRequestShell).toHaveBeenCalledTimes(1);
  });

  it('says so when the planner did not answer', () => {
    renderShell({ planSource: 'fallback' });
    expect(screen.getByTestId('chat-lab-shell-notice')).toHaveTextContent('Planner unavailable · single step');
    cleanup();
    renderShell({ notice: 'Mock runtime' });
    expect(screen.getByTestId('chat-lab-shell-notice')).toHaveTextContent('Mock runtime');
  });

  it('stops the run', () => {
    const onStop = vi.fn();
    renderShell({ onStop });
    fireEvent.click(screen.getByTestId('chat-lab-shell-stop'));
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  // The working state, said by the surface itself: a shell that is thinking
  // and a shell that has stopped are otherwise the same dark rectangle.
  it('rises a star field under the output while the loop is mid-turn', () => {
    const { rerender, props } = renderShell({ status: 'running' });
    expect(screen.getByTestId('chat-lab-shell-particles-backdrop')).toBeInTheDocument();
    // jsdom has no WebGL, so what actually paints here is the CSS fallback the
    // GL backdrop falls through to — four parallax layers, same as it ever was.
    expect(screen.getAllByTestId('chat-lab-shell-particles-fallback-layer')).toHaveLength(4);

    rerender(<ChatLabShell {...props} status="done" />);
    // Held for the crossfade, but already on its way out.
    expect(screen.getByTestId('chat-lab-shell-particles-backdrop').className).toContain('opacity-0');
  });
});

describe('ChatLabPill', () => {
  it('keeps the loop reachable in one line', () => {
    const onOpen = vi.fn();
    render(
      <ChatLabPill status="running" contextTokens={42_000} contextBudgetTokens={200_000} onOpen={onOpen} />,
    );
    const pill = screen.getByTestId('chat-lab-pill');
    expect(pill).toHaveTextContent('Agent loop · running · 42k/200k');
    expect(pill).toHaveTextContent('Open');
    fireEvent.click(pill);
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});
