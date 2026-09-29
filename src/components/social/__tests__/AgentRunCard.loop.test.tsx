import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AgentRunCard, agentRunRefFromMetadata, describeAgentLoop, formatLoopClock, type AgentRunLoop } from '../AgentRunCard';
import type { LabStep } from '../ChatLabShell';
import { ChatPanel } from '../ChatPanel';

afterEach(() => { cleanup(); vi.useRealTimers(); });

const STEPS: LabStep[] = [
  { id: 's1', title: 'Read the call notes', kind: 'read', status: 'done' },
  { id: 's2', title: 'Write the haiku', kind: 'write', status: 'running' },
  { id: 's3', title: 'Post it', kind: 'post', status: 'pending' },
];

function card(loop: AgentRunLoop, extra: Partial<React.ComponentProps<typeof AgentRunCard>> = {}) {
  return <AgentRunCard runId="loop-1" instruction="write a haiku about this call" agentName="Agent" command="/agent" loop={loop} {...extra} />;
}

describe('AgentRunCard — agent loop', () => {
  it('Planning shows the elapsed clock and no steps, and the clock ticks', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-28T12:00:12Z'));
    render(card({ phase: 'planning', startedAt: '2026-09-28T12:00:00Z', steps: STEPS }));
    const root = screen.getByTestId('agent-run-card');
    expect(root.dataset.mode).toBe('loop');
    expect(root.dataset.phase).toBe('planning');
    expect(screen.getByTestId('agent-run-card-phase')).toHaveTextContent('Planning');
    expect(screen.getByTestId('agent-run-card-detail')).toHaveTextContent('Planning…');
    expect(screen.getByTestId('agent-run-card-clock')).toHaveTextContent('0:12');
    expect(screen.queryByTestId('agent-run-card-loop-steps')).toBeNull();
    // Not the pipeline's three beats.
    expect(screen.queryByTestId('agent-run-card-steps')).toBeNull();
    act(() => { vi.advanceTimersByTime(3000); });
    expect(screen.getByTestId('agent-run-card-clock')).toHaveTextContent('0:15');
  });

  it('falls back to the reported elapsedMs when there is no start time', () => {
    render(card({ phase: 'planning', elapsedMs: 75_000 }));
    expect(screen.getByTestId('agent-run-card-clock')).toHaveTextContent('1:15');
  });

  it('Running shows the step rail with the running one, the budget, and Open lab', () => {
    const onOpenLab = vi.fn();
    render(card({ phase: 'running', steps: STEPS, contextTokens: 42_000, contextBudgetTokens: 200_000 }, { onOpenLab }));
    expect(screen.getByTestId('agent-run-card-detail')).toHaveTextContent('Running step 2 of 3 — Write the haiku');
    const rail = screen.getByTestId('agent-run-card-loop-steps');
    expect(rail.className).toContain('flex-wrap');
    expect([...rail.querySelectorAll('li')].map((li) => li.dataset.state)).toEqual(['done', 'running', 'pending']);
    expect(screen.getByTestId('agent-run-card-budget')).toHaveTextContent('42k / 200k');
    fireEvent.click(screen.getByTestId('agent-run-card-open-lab'));
    expect(onOpenLab).toHaveBeenCalledWith('loop-1');
    // Clicking the action does not also toggle the card open.
    expect(screen.getByTestId('agent-run-card').dataset.expanded).toBeUndefined();
  });

  it('Done shows the outcome and stops the clock', () => {
    render(card({ phase: 'done', steps: STEPS.map((s) => ({ ...s, status: 'done' as const })), elapsedMs: 40_000, outcome: 'Posted the haiku to the conversation' }));
    expect(screen.getByTestId('agent-run-card-phase')).toHaveTextContent('Done');
    expect(screen.getByTestId('agent-run-card-detail')).toHaveTextContent('Posted the haiku to the conversation');
    expect(screen.queryByTestId('agent-run-card-clock')).toBeNull();
  });

  it('has a sentence for every phase', () => {
    expect(describeAgentLoop({ phase: 'starting' })).toBe('Starting the box…');
    expect(describeAgentLoop({ phase: 'waiting', steps: STEPS })).toBe('Waiting between turns · 1 of 3 steps done');
    expect(describeAgentLoop({ phase: 'done', steps: STEPS })).toBe('Done · 3 steps');
    expect(describeAgentLoop({ phase: 'failed' })).toBe('The loop failed.');
    expect(describeAgentLoop({ phase: 'stopped' })).toBe('Stopped');
    expect(describeAgentLoop({ phase: 'budget' })).toBe('Stopped at its context budget');
    expect(formatLoopClock(605_000)).toBe('10:05');
  });

  it('without a loop, keeps the pipeline card and offers no lab', () => {
    render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" onOpenLab={vi.fn()} status={{ phase: 'running' }} />);
    expect(screen.getByTestId('agent-run-card-steps')).toBeInTheDocument();
    expect(screen.getByTestId('agent-run-card').dataset.mode).toBeUndefined();
    expect(screen.queryByTestId('agent-run-card-open-lab')).toBeNull();
  });

  it('reads the lab mark off the message metadata', () => {
    expect(agentRunRefFromMetadata({ kind: 'agent-run', runId: 'r', lab: { mode: 'loop' } })?.lab).toBe(true);
    expect(agentRunRefFromMetadata({ kind: 'agent-run', runId: 'r' })?.lab).toBeUndefined();
  });
});

describe('ChatPanel — loop cards', () => {
  const messages = [
    { id: 'm1', userId: 'u1', displayName: 'Grace', content: '/agent write a haiku', timestamp: '2026-09-28T12:00:00Z', metadata: { kind: 'agent-run', runId: 'loop-1', command: '/agent', instruction: 'write a haiku', lab: true } },
    { id: 'm2', userId: 'u1', displayName: 'Grace', content: '/doc tidy', timestamp: '2026-09-28T12:01:00Z', metadata: { kind: 'agent-run', runId: 'doc-1', instruction: 'tidy' } },
  ];

  it('asks the host for each rendered card and offers Open lab only on loops', () => {
    const statusFor = vi.fn((runId: string): AgentRunLoop | undefined => (runId === 'loop-1' ? { phase: 'planning' } : undefined));
    const onOpenLab = vi.fn();
    render(<ChatPanel messages={messages as never} onSend={vi.fn()} agentLoopStatus={statusFor} onOpenLab={onOpenLab} />);
    const cards = screen.getAllByTestId('agent-run-card');
    const loopCard = cards.find((c) => c.dataset.runId === 'loop-1')!;
    const docCard = cards.find((c) => c.dataset.runId === 'doc-1')!;
    expect(loopCard.dataset.phase).toBe('planning');
    expect(docCard.dataset.mode).toBeUndefined();
    expect(statusFor).toHaveBeenCalledWith('loop-1');
    expect(screen.getAllByTestId('agent-run-card-open-lab')).toHaveLength(1);
    fireEvent.click(screen.getByTestId('agent-run-card-open-lab'));
    expect(onOpenLab).toHaveBeenCalledWith('loop-1');
  });
});
