// The Computer Lab demo's wire contract, as the library reads it: the
// `provisioning` status, a TodoWrite plan, a run held at a budget gate, a
// change posted for review, and a waiting box answered from its Agent pane.

import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ComputeProvider } from '../context/ComputeContext';
import { LabInstructContext, type LabInstructRoute } from '../context/LabInstructContext';
import { ComputerLab } from '../components/ComputerLab';
import { AgentPane, LogsPane, latestPlan, pendingQuestion, stepLevel, stepSource } from '../components/WorkspacePanes';
import { TailPane } from '../components/TailPane';
import { AGENT_PANE_KIND } from '../components/defaultPaneKinds';
import { fixtureComputers, fixtureProjects, fixtureRuntimeStatus } from '../fixtures/computeFixture';
import { ATTENTION_ORDER, byAttention, hasAgent, summarizeFleet } from '../lib/fleetSummary';
import { COMPUTE_STATUS, statusOf } from '../lib/status';
import { reduceTailFrame } from '../hooks/useComputeTail';
import type { TaskStep } from '../hooks/useComputeTask';
import type { ComputeClient } from '../lib/computeClient';
import type { Computer } from '../types';

const minting: Computer = {
  id: 'box-new',
  label: 'demo-echo',
  sessionId: 'demo-session-echo-000000000000000000000000',
  createdAt: '2026-10-07T00:00:00Z',
  status: 'provisioning',
};

function stubClient(overrides: Partial<ComputeClient> = {}, fleet: Computer[] = fixtureComputers): ComputeClient {
  return {
    getStatus: async () => fixtureRuntimeStatus,
    listComputers: async () => fleet,
    listProjects: async () => fixtureProjects,
    createComputer: async () => fixtureComputers[0]!,
    adoptComputer: async () => {},
    renameComputer: async () => {},
    removeComputer: async () => {},
    stopSession: async () => {},
    runTask: async () => {},
    runCommand: async () => {},
    getShellUrl: async () => ({ url: 'wss://example/shell' }),
    tail: (id: string) => ({ url: `/api/devbox/boxes/${id}/tail`, withCredentials: true, headers: {} }),
    ...overrides,
  };
}

const says = (text: string) => ({ type: 'assistant', message: { content: [{ type: 'text', text }] } });
const todo = (...items: [string, 'pending' | 'in_progress' | 'completed', string?][]) => ({
  type: 'assistant',
  message: {
    content: [{
      type: 'tool_use',
      name: 'TodoWrite',
      input: { todos: items.map(([content, status, activeForm]) => ({ content, status, ...(activeForm ? { activeForm } : {}) })) },
    }],
  },
});
const GATE = {
  type: 'gate_refused', status: 409, gate: 'envelope', confirmFlag: 'confirmOverEnvelope',
  error: 'over the sprint envelope', workItemId: 'wi-1', workItemTitle: 'Migrate sessions',
};
const DELIVERY = {
  type: 'delivery', title: 'Rate-limit POST /login', commitSha: '4f2c9a1e7b3d',
  prUrl: 'https://example.com/pull/42', prNumber: 42,
};

class FakeSource {
  static frames: object[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((m: { data: string }) => void) | null = null;
  onerror: (() => void) | null = null;
  closed = false;
  constructor() {
    setTimeout(() => {
      if (this.closed) return;
      this.onopen?.();
      for (const f of FakeSource.frames) this.onmessage?.({ data: JSON.stringify(f) });
    }, 0);
  }
  close() { this.closed = true; }
}

beforeEach(() => {
  globalThis.localStorage?.clear();
  FakeSource.frames = [];
  vi.stubGlobal('EventSource', FakeSource);
});
afterEach(() => vi.unstubAllGlobals());

describe('provisioning status', () => {
  it('has its own entry: info tone, pulsing, labelled provisioning', () => {
    expect(COMPUTE_STATUS.provisioning).toMatchObject({ tone: 'info', label: 'provisioning', pulse: true });
    expect(statusOf(minting)).toBe('provisioning');
  });

  it('sorts between running and idle, and is counted without being an agent', () => {
    expect(ATTENTION_ORDER.provisioning).toBeGreaterThan(ATTENTION_ORDER.running);
    expect(ATTENTION_ORDER.provisioning).toBeLessThan(ATTENTION_ORDER.idle);
    const fleet = [...fixtureComputers, minting, { ...minting, id: 'box-new-2' }];
    const summary = summarizeFleet(fleet);
    expect(summary.provisioning).toBe(2);
    expect(hasAgent(minting)).toBe(false);
    expect(summary.agents).toBe(fleet.filter(hasAgent).length);
    const sorted = [...fleet].sort(byAttention).map(statusOf);
    expect(sorted.indexOf('provisioning')).toBeGreaterThan(sorted.lastIndexOf('running'));
    expect(sorted.indexOf('provisioning')).toBeLessThan(sorted.indexOf('idle'));
  });

  it('shows a header pill only while some computer is provisioning', async () => {
    const fleet = [...fixtureComputers, minting];
    const { unmount } = render(
      <ComputeProvider client={stubClient({}, fleet)} useFixtures={false} pollIntervalMs={0}>
        <ComputerLab open variant="inline" appearance="workspace" onClose={() => {}} />
      </ComputeProvider>,
    );
    const pill = await screen.findByTestId('lab-pill-provisioning');
    expect(pill.textContent).toContain('1 provisioning');
    unmount();
    render(
      <ComputeProvider client={stubClient()} useFixtures={false} pollIntervalMs={0}>
        <ComputerLab open variant="inline" appearance="workspace" onClose={() => {}} />
      </ComputeProvider>,
    );
    await screen.findByTestId('lab-pill-running');
    expect(screen.queryByTestId('lab-pill-provisioning')).toBeNull();
  });
});

describe('reading the new frames', () => {
  it('carries a TodoWrite plan on its tool step', () => {
    const { steps } = reduceTailFrame(todo(['Read', 'completed'], ['Write', 'in_progress', 'Writing']));
    expect(steps).toHaveLength(1);
    expect(steps[0]).toMatchObject({ kind: 'tool', tool: 'TodoWrite', text: 'plan · 1 of 2 done' });
    expect(steps[0]!.plan).toEqual([
      { content: 'Read', status: 'completed' },
      { content: 'Write', status: 'in_progress', activeForm: 'Writing' },
    ]);
  });

  it('reads gate_refused as a warning step that names the gate and the flag', () => {
    const { steps, running } = reduceTailFrame(GATE);
    expect(running).toBe(false);
    expect(steps[0]).toMatchObject({ kind: 'gate', gate: { gate: 'envelope', confirmFlag: 'confirmOverEnvelope' } });
    expect(steps[0]!.text).toBe('Held at the envelope gate · over the sprint envelope · needs confirmOverEnvelope');
    expect(stepLevel({ ...steps[0]!, at: 0 })).toBe('warn');
    expect(stepSource({ ...steps[0]!, at: 0 })).toBe('gate');
  });

  it('reads delivery as a step with short sha and PR number', () => {
    const { steps } = reduceTailFrame(DELIVERY);
    expect(steps[0]).toMatchObject({ kind: 'delivery', delivery: { prNumber: 42, prUrl: 'https://example.com/pull/42' } });
    expect(steps[0]!.text).toBe('Change posted for review · Rate-limit POST /login · 4f2c9a1 · PR #42');
    expect(stepLevel({ ...steps[0]!, at: 0 })).toBe('info');
  });

  it('ignores a frame type it does not know', () => {
    expect(reduceTailFrame({ type: 'something_new', payload: 1 })).toEqual({ steps: [] });
  });

  it('takes the latest plan, replacing an earlier one outright', () => {
    const first = reduceTailFrame(todo(['A', 'in_progress'], ['B', 'pending'], ['C', 'pending'])).steps[0]!;
    const second = reduceTailFrame(todo(['A', 'completed'], ['D', 'in_progress'])).steps[0]!;
    const steps: TaskStep[] = [{ ...first, at: 1 }, { kind: 'tool', tool: 'Read', text: 'x', at: 2 }, { ...second, at: 3 }];
    expect(latestPlan(steps)?.map((i) => i.content)).toEqual(['A', 'D']);
    expect(latestPlan([])).toBeNull();
  });

  it('finds the pending question in the last words, and stops at a new prompt', () => {
    const steps: TaskStep[] = [
      { kind: 'meta', text: 'triage', at: 1 },
      { kind: 'text', text: 'Pin the clock?', at: 2 },
    ];
    expect(pendingQuestion(steps)).toBe('Pin the clock?');
    const withResult = [...steps, { kind: 'result' as const, text: '1 turns', summary: 'Want me to pin it?', at: 3 }];
    expect(pendingQuestion(withResult)).toBe('Want me to pin it?');
    expect(pendingQuestion([...steps, { kind: 'meta', text: 'yes, pin it', at: 4 }])).toBeNull();
  });
});

describe('AgentPane tells the run’s story', () => {
  it('draws the latest plan above the steps, and gate and delivery as their own rows', async () => {
    FakeSource.frames = [
      { type: 'task_started', prompt: 'rate limit' },
      todo(['Read the route', 'in_progress'], ['Old item', 'pending']),
      todo(['Read the route', 'completed'], ['Add limiter', 'in_progress', 'Adding the limiter'], ['Open PR', 'pending']),
      GATE,
      DELIVERY,
    ];
    render(
      <ComputeProvider client={stubClient()} useFixtures={false} pollIntervalMs={0}>
        <AgentPane computer={{ ...fixtureComputers[0]!, status: 'idle' }} />
      </ComputeProvider>,
    );
    const plan = await screen.findByTestId('agent-pane-plan');
    expect(within(plan).getByTestId('agent-pane-plan-tally').textContent).toBe('1 of 3 done');
    expect(within(plan).queryByText('Old item')).toBeNull();
    expect(within(plan).getByText('Adding the limiter')).toBeTruthy();
    const statuses = [...plan.querySelectorAll('[data-plan-status]')].map((n) => n.getAttribute('data-plan-status'));
    expect(statuses).toEqual(['completed', 'in_progress', 'pending']);
    // TodoWrite is the checklist, not a row in the log.
    expect(screen.queryByText('TodoWrite')).toBeNull();
    expect(screen.getByText('Held at the envelope gate')).toBeTruthy();
    expect(screen.getByText('needs confirmOverEnvelope')).toBeTruthy();
    expect(screen.getByText('Change posted for review')).toBeTruthy();
    expect(screen.getByText('4f2c9a1')).toBeTruthy();
    const link = screen.getByTestId('agent-pane-pr-link');
    expect(link.getAttribute('href')).toBe('https://example.com/pull/42');
    expect(link.textContent).toBe('PR #42');
    expect(screen.getByTestId('agent-pane-tally').textContent).toContain('held at a gate');
  });

  it('asks the pending question of a waiting box and replies as a resumed task', async () => {
    FakeSource.frames = [
      { type: 'task_started', prompt: 'triage' },
      says('Both flakes are clock-boundary. Want me to pin the clock?'),
      { type: 'devbox_end' },
    ];
    const runTask = vi.fn<ComputeClient['runTask']>(async () => {});
    const box = { ...fixtureComputers[1]!, status: 'waiting' as const };
    render(
      <ComputeProvider client={stubClient({ runTask })} useFixtures={false} pollIntervalMs={0}>
        <AgentPane computer={box} />
      </ComputeProvider>,
    );
    // The box's own currentTask shows until the tail replays; then the agent's words win.
    await waitFor(() => expect(screen.getByTestId('agent-pane-question-text').textContent)
      .toBe('Both flakes are clock-boundary. Want me to pin the clock?'));
    const reply = screen.getByTestId('agent-pane-reply');
    fireEvent.change(reply, { target: { value: 'Yes, pin it.' } });
    fireEvent.keyDown(reply, { key: 'Enter' });
    await waitFor(() => expect(runTask).toHaveBeenCalledTimes(1));
    expect(runTask.mock.calls[0]![0]).toBe(box.sessionId);
    expect(runTask.mock.calls[0]![1]).toEqual({ prompt: 'Yes, pin it.', resume: true });
    await waitFor(() => expect((screen.getByTestId('agent-pane-reply') as HTMLTextAreaElement).value).toBe(''));
  });

  it('falls back to the box’s current task as the question, and shows none when not waiting', async () => {
    const box = { ...fixtureComputers[1]!, status: 'waiting' as const };
    const { unmount } = render(
      <ComputeProvider client={stubClient()} useFixtures={false} pollIntervalMs={0}>
        <AgentPane computer={box} />
      </ComputeProvider>,
    );
    expect((await screen.findByTestId('agent-pane-question-text')).textContent).toBe(box.currentTask);
    unmount();
    render(
      <ComputeProvider client={stubClient()} useFixtures={false} pollIntervalMs={0}>
        <AgentPane computer={{ ...box, status: 'idle' }} />
      </ComputeProvider>,
    );
    await screen.findByTestId('agent-pane');
    expect(screen.queryByTestId('agent-pane-question')).toBeNull();
  });

  it('sends the reply through the lab’s instruction route when there is one, and keeps it on refusal', async () => {
    const runTask = vi.fn<ComputeClient['runTask']>(async () => {});
    const route = vi.fn<LabInstructRoute>(async () => ({ delivered: 0, detail: 'held at the envelope gate' }));
    const box = { ...fixtureComputers[1]!, status: 'waiting' as const };
    render(
      <ComputeProvider client={stubClient({ runTask })} useFixtures={false} pollIntervalMs={0}>
        <LabInstructContext.Provider value={route}>
          <AgentPane computer={box} />
        </LabInstructContext.Provider>
      </ComputeProvider>,
    );
    const reply = await screen.findByTestId('agent-pane-reply');
    fireEvent.change(reply, { target: { value: 'Go ahead' } });
    fireEvent.click(screen.getByTestId('agent-pane-reply-send'));
    await waitFor(() => expect(route).toHaveBeenCalledWith('Go ahead', [box]));
    expect(runTask).not.toHaveBeenCalled();
    expect((await screen.findByTestId('agent-pane-reply-error')).textContent).toContain('held at the envelope gate');
    expect((screen.getByTestId('agent-pane-reply') as HTMLTextAreaElement).value).toBe('Go ahead');
  });

  it('routes a reply through the host’s onInstruct inside a workspace lab', async () => {
    FakeSource.frames = [{ type: 'task_started', prompt: 'q' }, says('Which tool?')];
    const onInstruct = vi.fn(async () => ({ delivered: 1 }));
    const waiting = { ...fixtureComputers[1]!, status: 'waiting' as const };
    render(
      <ComputeProvider client={stubClient({}, [waiting])} useFixtures={false} pollIntervalMs={0} paneKinds={[AGENT_PANE_KIND]}>
        <ComputerLab open variant="inline" appearance="workspace" onClose={() => {}} onInstruct={onInstruct} />
      </ComputeProvider>,
    );
    const reply = await screen.findByTestId('agent-pane-reply');
    fireEvent.change(reply, { target: { value: 'Use dbmate' } });
    fireEvent.keyDown(reply, { key: 'Enter' });
    await waitFor(() => expect(onInstruct).toHaveBeenCalledWith({ text: 'Use dbmate', computers: [waiting], scope: 'focused' }));
  });
});

describe('Bot logs and classic tail read the new frames', () => {
  it('logs gate and delivery as readable lines and skips unknown frames', async () => {
    FakeSource.frames = [{ type: 'task_started', prompt: 'go' }, { type: 'mystery' }, GATE, DELIVERY];
    render(
      <ComputeProvider client={stubClient()} useFixtures={false} pollIntervalMs={0}>
        <LogsPane computer={fixtureComputers[0]!} />
      </ComputeProvider>,
    );
    expect(await screen.findByText(/Held at the envelope gate · over the sprint envelope/)).toBeTruthy();
    expect(screen.getByText(/Change posted for review · Rate-limit POST \/login · 4f2c9a1 · PR #42/)).toBeTruthy();
  });

  it('draws gate and delivery banners in the classic tail pane', async () => {
    FakeSource.frames = [GATE, DELIVERY, { type: 'mystery' }];
    render(
      <ComputeProvider client={stubClient()} useFixtures={false} pollIntervalMs={0}>
        <TailPane computer={fixtureComputers[0]!} />
      </ComputeProvider>,
    );
    const gate = await screen.findByTestId('tail-banner-gate');
    expect(gate.textContent).toContain('Held at the envelope gate');
    expect(gate.textContent).toContain('needs confirmOverEnvelope');
    const delivery = screen.getByTestId('tail-banner-delivery');
    expect(within(delivery).getByRole('link', { name: 'PR #42' }).getAttribute('href')).toBe('https://example.com/pull/42');
  });
});
