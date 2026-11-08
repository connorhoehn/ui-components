import { render, screen, act, cleanup, fireEvent } from '@testing-library/react';
import { ComputeDock } from '../components/ComputeDock';
import { CommandOutputPane } from '../components/CommandOutputPane';
import {
  openShell, openOutputTab, closeShell, getDock, MAX_SHELLS,
} from '../lib/dockStore';
import { DOCK_STORAGE_KEY } from '../lib/storage';

vi.mock('../components/ShellTerminal', () => ({
  ShellTerminal: ({ shellId }: { shellId?: string }) => <div data-testid={`term-${shellId}`} />,
}));

const run = (over: Partial<Parameters<typeof openOutputTab>[0]> = {}) => ({
  id: 'out-1', label: 'npm test', command: 'npm test',
  lines: [{ id: '1', message: 'ok' }], running: true, ...over,
});

beforeEach(() => {
  localStorage.removeItem(DOCK_STORAGE_KEY);
  for (const s of getDock().shells) closeShell(s.id);
});
afterEach(cleanup);

describe('openOutputTab', () => {
  it('focuses and updates the existing tab for the same id', () => {
    openOutputTab(run());
    openShell({ id: 'c1', label: 'c1', sessionId: 's'.repeat(33) });
    expect(getDock().activeId).not.toBe('output:out-1');
    const res = openOutputTab(run({ running: false, exitCode: 2, lines: [{ id: '1', message: 'a' }, { id: '2', message: 'b' }] }));
    expect(res).toEqual({ ok: true, id: 'output:out-1' });
    expect(getDock().shells.filter((s) => s.kind === 'output')).toHaveLength(1);
    expect(getDock().activeId).toBe('output:out-1');
    expect(getDock().shells.find((s) => s.id === 'output:out-1')?.output).toMatchObject({ running: false, exitCode: 2 });
  });

  it('shares the tab quota with shells', () => {
    for (let i = 0; i < MAX_SHELLS - 1; i++) openShell({ id: `c${i}`, label: `c${i}`, sessionId: `${'s'.repeat(33)}${i}` });
    expect(openOutputTab(run()).ok).toBe(true);
    expect(openOutputTab(run({ id: 'out-2' }))).toEqual({ ok: false, reason: 'at-capacity' });
    expect(getDock().shells).toHaveLength(MAX_SHELLS);
  });

  it('is not persisted', () => {
    openOutputTab(run());
    expect(JSON.parse(localStorage.getItem(DOCK_STORAGE_KEY) ?? '{}').shells).toEqual([]);
  });

  it('renders in the dock as an output pane, not a terminal', () => {
    act(() => { openOutputTab(run()); });
    render(<ComputeDock hotkeys={false} reconcile={false} />);
    expect(screen.getByTestId('command-output-output:out-1')).toBeInTheDocument();
    expect(screen.queryByTestId('term-output:out-1')).toBeNull();
  });
});

describe('output tab id space', () => {
  it('never matches a shell lookup, even when ids and session ids coincide', () => {
    const sid = 's'.repeat(33);
    openShell({ id: 'c1', label: 'c1', sessionId: sid });
    const shellId = getDock().shells[0]!.id;
    openOutputTab(run({ id: shellId }));
    expect(getDock().shells).toHaveLength(2);
    const outId = getDock().shells.find((s) => s.kind === 'output')!.id;
    expect(outId).not.toBe(shellId);
    openOutputTab(run({ id: shellId, label: 'again' }));
    expect(getDock().shells.find((s) => s.id === shellId)?.label).toBe('c1');
    // an output tab has sessionId '' and is not found by openShell
    openShell({ id: 'c2', label: 'c2', sessionId: '' });
    expect(getDock().shells.filter((s) => s.kind === 'output')).toHaveLength(1);
    expect(getDock().shells.filter((s) => s.kind !== 'output')).toHaveLength(2);
  });
});

describe('CommandOutputPane', () => {
  it('shows the command, the exit code, and the Open shell action', () => {
    const onOpenShell = vi.fn();
    render(<CommandOutputPane command="npm test" lines={[]} exitCode={1} onOpenShell={onOpenShell} />);
    expect(screen.getByText('$ npm test')).toBeInTheDocument();
    expect(screen.getByTestId('command-output-exit')).toHaveTextContent('exit 1');
    fireEvent.click(screen.getByTestId('command-output-open-shell'));
    expect(onOpenShell).toHaveBeenCalledOnce();
  });

  it('shows a running indicator and no exit code while running', () => {
    render(<CommandOutputPane command="npm test" lines={[]} running />);
    expect(screen.getByTestId('command-output-running')).toBeInTheDocument();
    expect(screen.queryByTestId('command-output-exit')).toBeNull();
    expect(screen.queryByTestId('command-output-open-shell')).toBeNull();
  });
});
