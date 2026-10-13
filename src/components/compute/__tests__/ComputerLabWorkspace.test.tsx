import { render, screen, within, fireEvent, waitFor, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComputeProvider } from '../context/ComputeContext';
import { ComputerLab, type LabInstruction } from '../components/ComputerLab';
import { fixtureComputers, fixtureProjects, fixtureRuntimeStatus } from '../fixtures/computeFixture';
import { DEFAULT_PANE_KINDS, SHELL_PANE_KIND, LOGS_PANE_KIND, AGENT_PANE_KIND } from '../components/defaultPaneKinds';
import { defaultKindFor, kindsFor, nextKind } from '../lib/paneKinds';
import { arrangePanes, listLeaves, makeLeaf, splitPane, type PaneNode } from '../lib/paneTree';
import { hasAgent, matchesQuery, summarizeFleet } from '../lib/fleetSummary';
import { groupQuickLine } from '../components/LabFleetRail';
import { byteRate, currentRun, elapsed, formatRate, stepLevel, stepSource } from '../components/WorkspacePanes';
import type { ComputeClient } from '../lib/computeClient';
import type { Computer } from '../types';
import type { TaskStep } from '../hooks/useComputeTask';

const laptop: Computer = {
  id: 'local:mac',
  label: 'demo-macbook',
  sessionId: 'local-machine-no-agentcore-session-mac',
  createdAt: '2026-10-01T00:00:00Z',
  status: 'idle',
  kind: 'local',
};

const failing: Computer = {
  id: 'box-err',
  label: 'rachel-scratch',
  sessionId: 'sess-err-0000000000000000000000000000000001',
  createdAt: '2026-10-01T00:00:00Z',
  status: 'error',
  currentTask: 'Compare the deployed schema',
};

const fleet: Computer[] = [...fixtureComputers, failing, laptop];

function stubClient(overrides: Partial<ComputeClient> = {}): ComputeClient {
  return {
    getStatus: async () => fixtureRuntimeStatus,
    listComputers: async () => fleet,
    listProjects: async () => fixtureProjects,
    createComputer: async (input) => ({ ...fixtureComputers[0]!, id: 'new', label: input?.label ?? 'new' }),
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

function renderWorkspace(
  props: Partial<React.ComponentProps<typeof ComputerLab>> = {},
  client = stubClient(),
  canManage = true,
) {
  return render(
    <ComputeProvider client={client} canManage={canManage} useFixtures={false} pollIntervalMs={0}>
      <ComputerLab open variant="inline" appearance="workspace" onClose={() => {}} {...props} />
    </ComputeProvider>,
  );
}

async function rail() {
  return screen.findByTestId('lab-fleet-rail');
}

async function rows(label: 'computers' | 'agents') {
  const list = await screen.findByRole('listbox', { name: label });
  return within(list).queryAllByRole('option');
}

beforeEach(() => {
  globalThis.localStorage?.clear();
});

describe('fleet summary', () => {
  it('counts pills and agents from the same statuses the rail paints', () => {
    const s = summarizeFleet(fleet);
    expect(s.computers).toBe(fleet.length);
    expect(s.needsYou).toBe(fleet.filter((c) => c.status === 'waiting').length);
    expect(s.running).toBe(fleet.filter((c) => c.status === 'running').length);
    expect(s.error).toBe(1);
    expect(s.agents).toBe(fleet.filter(hasAgent).length);
    // An idle box with nothing on it is a computer, not an agent.
    expect(hasAgent(laptop)).toBe(false);
  });

  it('matches every word of a query across name, project and task', () => {
    expect(matchesQuery(failing, 'rachel schema')).toBe(true);
    expect(matchesQuery(failing, 'rachel kubernetes')).toBe(false);
    expect(matchesQuery(failing, '  ')).toBe(true);
  });

  it('writes a group quick-line with only the clauses it knows', () => {
    expect(groupQuickLine({ budgetUsd: 95, spentUsd: 0.46, liveSpendUsd: 0, botCount: 5 }, 6))
      .toBe('6 computers · $0.46 / $95 · 5 bots');
    expect(groupQuickLine({ liveSpendUsd: 0, botCount: 2 }, 5)).toBe('5 computers · 2 bots');
    expect(groupQuickLine({ liveSpendUsd: 1.5 }, 1)).toBe('1 computer · $1.50');
  });
});

describe('pane kinds', () => {
  it('never hands a laptop a terminal', () => {
    expect(defaultKindFor(DEFAULT_PANE_KINDS, laptop)?.id).not.toBe('shell');
    expect(kindsFor(DEFAULT_PANE_KINDS, laptop).map((k) => k.id)).not.toContain('shell');
    expect(defaultKindFor(DEFAULT_PANE_KINDS, fixtureComputers[0])?.id).toBe('shell');
    // Cycling on a laptop skips the terminal too.
    const seen = new Set<string>();
    let id = kindsFor(DEFAULT_PANE_KINDS, laptop)[0]!.id;
    for (let i = 0; i < 6; i += 1) { seen.add(id); id = nextKind(DEFAULT_PANE_KINDS, id, laptop)!.id; }
    expect(seen.has('shell')).toBe(false);
  });

  it('names the workspace kinds the way the header reads them', () => {
    expect([SHELL_PANE_KIND, LOGS_PANE_KIND, AGENT_PANE_KIND].map((k) => k.title)).toEqual(['Shell', 'Bot logs', 'Agent']);
  });
});

describe('arrangePanes', () => {
  let n = 0;
  const id = () => `s${(n += 1)}`;
  const three = (): PaneNode => {
    let root: PaneNode = makeLeaf('a', 'c1', 'shell');
    root = splitPane(root, 'a', 'row', makeLeaf('b', 'c2', 'logs'), 'x1');
    return splitPane(root, 'b', 'row', makeLeaf('c', 'c3', 'agent'), 'x2');
  };

  it('keeps every pane, in order, under each arrangement', () => {
    for (const mode of ['rows', 'columns', 'main'] as const) {
      expect(listLeaves(arrangePanes(three(), mode, id)).map((l) => l.id)).toEqual(['a', 'b', 'c']);
    }
  });

  it('gives the first pane the left half and stacks the rest in main', () => {
    const root = arrangePanes(three(), 'main', id);
    expect(root.kind === 'split' && root.direction).toBe('row');
    expect(root.kind === 'split' && root.ratio).toBe(0.5);
    expect(root.kind === 'split' && root.b.kind === 'split' && root.b.direction).toBe('column');
  });

  it('divides a list evenly', () => {
    const root = arrangePanes(three(), 'rows', id);
    expect(root.kind === 'split' && root.direction).toBe('column');
    expect(root.kind === 'split' && root.ratio).toBeCloseTo(1 / 3);
  });

  it('leaves a single pane alone', () => {
    const leaf = makeLeaf('a', 'c', 'shell');
    expect(arrangePanes(leaf, 'main', id)).toBe(leaf);
  });
});

describe('log and agent readings of the tail', () => {
  const step = (kind: TaskStep['kind'], text: string, at: number, extra: Partial<TaskStep> = {}): TaskStep => ({ kind, text, at, ...extra });

  it('measures the byte rate over the trailing window only', () => {
    const steps = [step('text', 'x'.repeat(5000), 0), step('text', 'y'.repeat(2048), 95_000)];
    expect(byteRate(steps, 100_000)).toBeCloseTo(204.8);
    expect(formatRate(2458)).toBe('2.4 KB/s');
    expect(formatRate(12)).toBe('12 B/s');
  });

  it('reads levels and sources a log reader expects', () => {
    expect(stepLevel(step('error', 'boom', 0))).toBe('error');
    expect(stepLevel(step('text', 'retrying the upload', 0))).toBe('warn');
    expect(stepLevel(step('tool', 'src/a.ts', 0, { tool: 'read_file' }))).toBe('info');
    expect(stepSource(step('tool', 'src/a.ts', 0, { tool: 'read_file' }))).toBe('read_file');
    expect(stepSource(step('job', 'nightly', 0, { jobKind: 'devbox:task' }))).toBe('devbox:task');
  });

  it('shows only the run in front of you', () => {
    const steps = [step('job', 'old', 1), step('tool', 'a', 2), step('job', 'new', 3), step('tool', 'b', 4)];
    expect(currentRun(steps).map((s) => s.text)).toEqual(['new', 'b']);
    expect(elapsed(252_000)).toBe('4:12');
    expect(elapsed(3_729_000)).toBe('1:02:09');
  });
});

describe('ComputerLab appearance="workspace"', () => {
  it('heads the lab with honest counts, status pills, + Computer and Keys', async () => {
    renderWorkspace();
    const s = summarizeFleet(fleet);
    const summary = await screen.findByTestId('lab-summary');
    await waitFor(() => expect(summary.textContent).toContain(`${s.computers} computers · ${s.agents} agents`));
    expect(screen.getByTestId('lab-pill-waiting').textContent).toContain(`${s.needsYou} need`);
    expect(screen.getByTestId('lab-pill-running').textContent).toContain(`${s.running} running`);
    expect(screen.getByTestId('lab-pill-error').textContent).toContain('1 error');
    // A pill is a filter control: its label is on the 12px control step, not the 11px badge step (2.441.0).
    expect(screen.getByTestId('lab-pill-running').firstElementChild?.className).toContain('text-[12px]');
    expect(screen.getByTestId('lab-create')).toBeTruthy();
    fireEvent.click(screen.getByTestId('lab-keys'));
    expect(await screen.findByRole('dialog', { name: 'Keyboard shortcuts' })).toBeTruthy();
  });

  it('hides + Computer from a viewer who cannot provision', async () => {
    renderWorkspace({}, stubClient(), false);
    await screen.findByTestId('lab-summary');
    expect(screen.queryByTestId('lab-create')).toBeNull();
  });

  it('numbers the directory, groups it by project, and keeps the number in the Agents tab', async () => {
    renderWorkspace();
    await rail();
    await waitFor(async () => expect(await rows('computers')).toHaveLength(fleet.length));
    const groups = screen.getAllByTestId('lab-fleet-group').map((g) => g.textContent ?? '');
    expect(groups.some((g) => g.includes('Auth migration'))).toBe(true);
    expect(groups.some((g) => g.includes('Unassigned'))).toBe(true);
    const bravoRow = (await rows('computers')).find((r) => r.textContent?.includes('demo-bravo'))!;
    const number = bravoRow.textContent!.match(/^\d+/)![0];

    fireEvent.click(screen.getByRole('tab', { name: /Agents/ }));
    const agentRows = await rows('agents');
    expect(agentRows).toHaveLength(fleet.filter(hasAgent).length);
    // Most-wanting first: the box waiting on an answer leads.
    expect(agentRows[0]!.textContent).toContain('demo-bravo');
    expect(agentRows[0]!.textContent).toMatch(new RegExp(`^${number}`));
  });

  it('draws a paired laptop with a laptop glyph, not a status dot', async () => {
    renderWorkspace();
    await rail();
    const row = await waitFor(async () => {
      const found = (await rows('computers')).find((r) => r.textContent?.includes('demo-macbook'));
      expect(found).toBeTruthy();
      return found!;
    });
    expect(within(row).getByLabelText(/laptop/)).toBeTruthy();
  });

  it('filters the rail from a status pill and from the search', async () => {
    renderWorkspace();
    await rail();
    await waitFor(async () => expect(await rows('computers')).toHaveLength(fleet.length));
    fireEvent.click(screen.getByTestId('lab-pill-error'));
    await waitFor(async () => expect((await rows('computers')).map((r) => r.textContent)).toEqual([expect.stringContaining('rachel-scratch')]));
    fireEvent.click(screen.getByTestId('lab-pill-error'));
    fireEvent.change(screen.getByPlaceholderText('Find computer or agent…'), { target: { value: 'charlie' } });
    await waitFor(async () => expect(await rows('computers')).toHaveLength(1));
  });

  it('switches a pane kind from its header menu', async () => {
    renderWorkspace();
    const trigger = await screen.findByTestId('lab-pane-kind');
    await waitFor(() => expect(trigger.textContent).toContain('Shell'));
    fireEvent.click(trigger);
    fireEvent.click(await screen.findByRole('menuitem', { name: /Bot logs/ }));
    await waitFor(() => expect(screen.getByTestId('lab-pane-kind').textContent).toContain('Bot logs'));
    expect(await screen.findByTestId('logs-pane')).toBeTruthy();
  });

  it('arranges and counts panes from the toolbar', async () => {
    renderWorkspace();
    await screen.findByTestId('lab-pane-toolbar');
    await waitFor(() => expect(screen.getAllByTestId('lab-pane')).toHaveLength(1));
    fireEvent.click(screen.getByTestId('lab-add-pane'));
    fireEvent.click(screen.getByTestId('lab-add-pane'));
    await waitFor(() => expect(screen.getAllByTestId('lab-pane')).toHaveLength(3));
    expect(screen.getByTestId('lab-panes-menu').textContent).toContain('3 panes');
    expect(screen.getByTestId('lab-shell-count').textContent).toBe('3 / 8 shells');
    fireEvent.click(screen.getByTestId('lab-arrange-main'));
    fireEvent.click(screen.getByTestId('lab-zoom'));
    await waitFor(() => expect(screen.getAllByTestId('lab-pane')).toHaveLength(1));
  });

  it('nudges the focused computer, then the whole fleet, through the host route', async () => {
    const onInstruct = vi.fn(async (i: LabInstruction) => ({ delivered: i.computers.length }));
    renderWorkspace({ onInstruct });
    await waitFor(() => expect(screen.getAllByTestId('lab-pane')).toHaveLength(1));
    const box = screen.getByRole('textbox', { name: 'Instruction' });
    fireEvent.change(box, { target: { value: 'Report status and blockers' } });
    fireEvent.keyDown(box, { key: 'Enter' });
    await waitFor(() => expect(onInstruct).toHaveBeenCalledTimes(1));
    expect(onInstruct.mock.calls[0]![0].scope).toBe('focused');
    expect(onInstruct.mock.calls[0]![0].computers).toHaveLength(1);
    expect(screen.getByTestId('lab-instruction-caption').textContent).toContain('Agent instruction · 1 target');

    fireEvent.click(screen.getByTestId('lab-instruct-scope'));
    fireEvent.click(await screen.findByRole('menuitem', { name: new RegExp(`All computers · ${fleet.length}`) }));
    await waitFor(() => expect(screen.getByTestId('lab-instruction-caption').textContent).toContain(`${fleet.length} targets`));
    fireEvent.change(box, { target: { value: 'Report status and blockers' } });
    fireEvent.keyDown(box, { key: 'Enter' });
    await waitFor(() => expect(onInstruct).toHaveBeenCalledTimes(2));
    expect(onInstruct.mock.calls[1]![0].computers).toHaveLength(fleet.length);
  });

  it('keeps the text when the host refuses it', async () => {
    const onInstruct = vi.fn(async () => { throw new Error('over the sprint envelope'); });
    renderWorkspace({ onInstruct });
    await waitFor(() => expect(screen.getAllByTestId('lab-pane')).toHaveLength(1));
    const box = screen.getByRole('textbox', { name: 'Instruction' }) as HTMLTextAreaElement;
    fireEvent.change(box, { target: { value: 'try again' } });
    await act(async () => { fireEvent.keyDown(box, { key: 'Enter' }); });
    await waitFor(() => expect(onInstruct).toHaveBeenCalled());
    expect(box.value).toBe('try again');
  });

  it('runs a nudge as a resumed agent task when the host gives no route, skipping laptops', async () => {
    const runTask = vi.fn<ComputeClient['runTask']>(async () => {});
    renderWorkspace({}, stubClient({ runTask }));
    await waitFor(() => expect(screen.getAllByTestId('lab-pane')).toHaveLength(1));
    fireEvent.click(screen.getByTestId('lab-instruct-scope'));
    fireEvent.click(await screen.findByRole('menuitem', { name: /All computers/ }));
    const box = screen.getByRole('textbox', { name: 'Instruction' });
    fireEvent.change(box, { target: { value: 'status?' } });
    fireEvent.keyDown(box, { key: 'Enter' });
    await waitFor(() => expect(runTask).toHaveBeenCalledTimes(fleet.length - 1));
    expect(runTask.mock.calls[0]![1]).toEqual({ prompt: 'status?', resume: true });
  });
});

describe('AgentPane over a replayed tail', () => {
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

  it('stamps each step with its frame time, not the moment the buffer arrived', async () => {
    const { AgentPane } = await import('../components/WorkspacePanes');
    const t0 = new Date(2026, 9, 6, 8, 8, 41).getTime();
    FakeSource.frames = [
      { type: 'task_started', prompt: 'logout', ts: new Date(t0).toISOString() },
      { type: 'assistant', message: { content: [{ type: 'tool_use', name: 'Read', input: { file_path: 'src/auth/session.ts' } }] }, ts: new Date(t0 + 12_000).toISOString() },
    ];
    vi.stubGlobal('EventSource', FakeSource);
    try {
      render(
        <ComputeProvider client={stubClient()} useFixtures={false} pollIntervalMs={0}>
          <AgentPane computer={{ ...fixtureComputers[0]!, status: 'idle' }} />
        </ComputeProvider>,
      );
      expect(await screen.findByText('08:08:53')).toBeTruthy();
      expect(screen.getAllByText('src/auth/session.ts')).toHaveLength(1);
      expect(screen.getByText('08:08:53')).toBeTruthy();
      expect(screen.getByText('08:08:41')).toBeTruthy();
    } finally {
      vi.unstubAllGlobals();
    }
  });
});

describe('ComputerLab appearance="workspace" empty fleet', () => {
  it('says there are no computers, and how to get one, on an empty fleet with no filter', async () => {
    renderWorkspace({}, stubClient({ listComputers: async () => [] }));
    const empty = await screen.findByTestId('lab-fleet-empty');
    expect(empty.textContent).toContain('No computers in the lab');
    expect(empty.textContent).toContain('Start a computer');
    expect(screen.queryByText('Nothing matches.')).toBeNull();
    expect(screen.getByTestId('lab-fleet-empty-create')).toBeTruthy();
  });

  it('tells a viewer who cannot provision that nothing is shared, with no create button', async () => {
    renderWorkspace({}, stubClient({ listComputers: async () => [] }), false);
    const empty = await screen.findByTestId('lab-fleet-empty');
    expect(empty.textContent).toContain('Nothing in the fleet is shared with you yet.');
    expect(screen.queryByTestId('lab-fleet-empty-create')).toBeNull();
  });

  it('says "Nothing matches." only when a search hides computers that exist', async () => {
    renderWorkspace();
    await rail();
    await waitFor(async () => expect((await rows('computers')).length).toBeGreaterThan(0));
    expect(screen.queryByTestId('lab-fleet-empty')).toBeNull();
    fireEvent.change(screen.getByPlaceholderText('Find computer or agent…'), { target: { value: 'zzz-no-such-box' } });
    expect(await screen.findByText('Nothing matches.')).toBeTruthy();
    expect(screen.queryByTestId('lab-fleet-empty')).toBeNull();
  });
});


describe('lab chrome on the type scale (2.441.3)', () => {
  // Flagged on /admin/devbox: 11px row meta, a 12.5px mono label, a 9px glyph
  // inside the fleet rail's buttons, and a monospace instruction textarea.
  it('draws the fleet rail on the 14/12 scale and the instruction bar in the page face', async () => {
    renderWorkspace();
    const fleet = await rail();
    expect(fleet.innerHTML).not.toMatch(/text-\[(9|10|11|12\.5|13)px\]/);
    const bar = await screen.findByTestId('lab-instruction-bar');
    const area = bar.querySelector('textarea')!;
    expect(area.className).not.toContain('font-mono');
    expect(area.className).toContain('font-[inherit]');
  });
});
