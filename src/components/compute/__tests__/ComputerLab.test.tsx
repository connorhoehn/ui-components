import { useEffect } from 'react';
import { render, screen, within, fireEvent, act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComputeProvider } from '../context/ComputeContext';
import { ComputerLab } from '../components/ComputerLab';
import { fixtureComputers, fixtureRuntimeStatus } from '../fixtures/computeFixture';
import { DEFAULT_PANE_KINDS } from '../components/defaultPaneKinds';
import { DEFAULT_KEYMAP, TMUX_LEADER } from '../lib/keymap';
import type { PaneKind } from '../lib/paneKinds';
import type { ComputeClient } from '../lib/computeClient';

function stubClient(overrides: Partial<ComputeClient> = {}): ComputeClient {
  return {
    getStatus: async () => fixtureRuntimeStatus,
    listComputers: async () => fixtureComputers,
    createComputer: async (label) => ({ ...fixtureComputers[0]!, id: 'new', label: label ?? 'new' }),
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

function renderLab(props: Partial<React.ComponentProps<typeof ComputerLab>> = {}, client = stubClient()) {
  return render(
    <ComputeProvider client={client} canManage useFixtures={false} pollIntervalMs={0}>
      <ComputerLab open onClose={props.onClose ?? (() => {})} {...props} />
    </ComputeProvider>,
  );
}

/**
 * The top-bar summary reads "4 computers · 2 panes" as several text nodes, so
 * it is asserted on as one string. It also settles asynchronously — the first
 * paint has no panes because the fleet has not arrived yet — hence waitFor
 * rather than a bare read.
 */
async function summary(pattern?: RegExp): Promise<string> {
  const node = await screen.findByTestId('lab-summary');
  if (pattern) await waitFor(() => expect(node.textContent ?? '').toMatch(pattern));
  else await waitFor(() => expect(node.textContent ?? '').toMatch(/\d+ pane/));
  return node.textContent ?? '';
}

/** Fire one of the lab's chords on window, where the capture listener sits. */
function press(key: string, init: Partial<KeyboardEventInit> = {}) {
  act(() => {
    globalThis.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...init }));
  });
}

const cmd = (key: string) => press(key, { metaKey: true });
const cmdShift = (key: string) => press(key, { metaKey: true, shiftKey: true });

beforeEach(() => {
  globalThis.localStorage?.clear();
});

describe('ComputerLab', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <ComputeProvider client={stubClient()} useFixtures={false} pollIntervalMs={0}>
        <ComputerLab open={false} onClose={() => {}} />
      </ComputeProvider>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('seeds one pane from the fleet on open', async () => {
    renderLab();
    expect(await screen.findByRole('dialog', { name: 'Computer Lab' })).toBeTruthy();
    await summary(/1 pane$/);
  });

  it('splits and closes panes with plain command chords', async () => {
    renderLab();
    await summary(/1 pane$/);
    cmd('Enter');
    await summary(/2 panes$/);
    cmdShift('Enter');
    await summary(/3 panes$/);
    cmd('Backspace');
    await summary(/2 panes$/);
  });

  it('ignores a chord whose modifiers do not match exactly', async () => {
    renderLab();
    await summary(/1 pane$/);
    // Bare Enter is typing, not a split. A loose modifier match would open a
    // pane every time someone pressed return in a prompt.
    press('Enter');
    await summary(/1 pane$/);
  });

  it('shows a shortcut sheet generated from the live keymap', async () => {
    renderLab();
    await summary();
    cmd('/');
    const sheet = await screen.findByRole('dialog', { name: 'Keyboard shortcuts' });
    expect(within(sheet).getByText('⌘⇧→')).toBeTruthy();
    expect(within(sheet).getByText('Focus the pane to the right')).toBeTruthy();
    expect(within(sheet).getByText('⌘K')).toBeTruthy();
  });

  it('honours a host keymap instead of the defaults', async () => {
    const keymap = DEFAULT_KEYMAP.map((b) =>
      b.command === 'split-right' ? { ...b, key: 'd', shift: false, label: '⌘D' } : b,
    );
    renderLab({ keymap });
    await summary(/1 pane$/);
    cmd('Enter');
    await summary(/1 pane$/);
    cmd('d');
    await summary(/2 panes$/);
  });

  it('toggles broadcast, and the command line says how many panes it reaches', async () => {
    renderLab();
    await summary();
    cmd('Enter');
    await summary(/2 panes$/);
    expect(screen.getByText('▶ focused pane')).toBeTruthy();
    cmdShift('b');
    expect(await screen.findByText('▶▶ all panes')).toBeTruthy();
    expect(screen.getByText('2 targets')).toBeTruthy();
  });

  it('opens the fuzzy chooser and lists on-screen panes ahead of other computers', async () => {
    renderLab();
    await summary();
    cmd('k');
    const dialog = await screen.findByRole('dialog', { name: 'Jump to a computer or pane' });
    const options = within(dialog).getAllByRole('option');
    expect(within(options[0]!).getByText(/on screen/)).toBeTruthy();
    // Every other box in the fleet is offered as somewhere to go.
    expect(options.length).toBe(fixtureComputers.length);
  });

  it('filters the chooser by subsequence', async () => {
    renderLab();
    await summary();
    cmd('k');
    const dialog = await screen.findByRole('dialog', { name: 'Jump to a computer or pane' });
    fireEvent.change(within(dialog).getByLabelText('Filter computers and panes'), {
      target: { value: 'chrl' },
    });
    const options = within(dialog).getAllByRole('option');
    expect(options).toHaveLength(1);
    expect(within(options[0]!).getByText('demo-charlie')).toBeTruthy();
  });

  it('meters the shell budget, so the quota cannot surprise you', async () => {
    renderLab();
    await summary(/1 pane$/);
    // A new pane is a terminal, so it costs a slot the moment it opens —
    // that is the number the meter exists to make visible.
    expect(screen.getByLabelText(/1 of 8 open/)).toBeTruthy();
    // Switching it to the read-only tail hands the slot back.
    cmdShift('e');
    await waitFor(() => expect(screen.getByLabelText(/0 of 8 open/)).toBeTruthy());
  });

  it('supports an optional tmux leader alongside the direct chords', async () => {
    renderLab({ leader: TMUX_LEADER });
    await summary(/1 pane$/);

    // The prefix arms, and says so.
    press('b', { ctrlKey: true });
    expect(screen.getByTestId('leader-armed')).toBeTruthy();
    press('|');
    await summary(/2 panes$/);
    expect(screen.queryByTestId('leader-armed')).toBeNull();

    // Turning the leader on takes nothing away — the plain chord still works.
    cmd('Enter');
    await summary(/3 panes$/);
  });

  it('has no leader unless one is configured', async () => {
    renderLab();
    await summary(/1 pane$/);
    press('b', { ctrlKey: true });
    expect(screen.queryByTestId('leader-armed')).toBeNull();
    // The follow-up key is an ordinary keystroke, not a command.
    press('|');
    await summary(/1 pane$/);
  });

  it('leaves the mode on escape', async () => {
    const onClose = vi.fn();
    renderLab({ onClose });
    await summary();
    press('Escape');
    expect(onClose).toHaveBeenCalled();
  });

  it('lets a host register a pane kind of its own', async () => {
    // The extensibility contract: a kind the library knows nothing about gets
    // the same toggle order, quota accounting and broadcast plumbing as the
    // built-ins. Registering it first also makes it the default for new panes.
    const hostKind: PaneKind = {
      id: 'host-timeline',
      label: 'timeline',
      render: ({ computer }) => <div>custom:{computer.label}</div>,
    };
    render(
      <ComputeProvider client={stubClient()} canManage useFixtures={false} pollIntervalMs={0}
        paneKinds={[hostKind, ...DEFAULT_PANE_KINDS]}>
        <ComputerLab open onClose={() => {}} />
      </ComputeProvider>,
    );
    expect(await screen.findByText(/custom:/)).toBeTruthy();
  });

  it('cycles a pane through every registered kind', async () => {
    renderLab();
    await summary();
    // Built-ins are [shell, tail], so the cycle is shell -> tail -> shell.
    // Queried as a button because the label also appears in the status line.
    expect(await screen.findByRole('button', { name: 'shell' })).toBeTruthy();
    cmdShift('e');
    expect(await screen.findByRole('button', { name: 'tail' })).toBeTruthy();
    cmdShift('e');
    expect(await screen.findByRole('button', { name: 'shell' })).toBeTruthy();
  });

  it('moves the keyboard into the pane it just focused', async () => {
    // The border moving without the cursor following meant every keyboard
    // move had to be finished with a mouse click, which is the one thing
    // moving by keyboard exists to avoid.
    const focused: string[] = [];
    const kindFor = (id: string): PaneKind => ({
      id,
      label: id,
      render: ({ computer, registerPane }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          registerPane({ focus: () => focused.push(`${id}:${computer.label}`) });
          return () => registerPane(null);
        }, [registerPane, computer.label]);
        return <div>{computer.label}</div>;
      },
    });

    render(
      <ComputeProvider client={stubClient()} canManage useFixtures={false} pollIntervalMs={0}
        paneKinds={[kindFor('probe')]}>
        <ComputerLab open onClose={() => {}} />
      </ComputeProvider>,
    );
    await summary(/1 pane$/);
    await waitFor(() => expect(focused.length).toBeGreaterThan(0));

    focused.length = 0;
    cmd('Enter');
    await summary(/2 panes$/);
    // Splitting focuses the pane it just made — you split in order to use it.
    await waitFor(() => expect(focused.length).toBeGreaterThan(0));

    focused.length = 0;
    cmdShift('ArrowLeft');
    // And moving focus back moves the keyboard back with it.
    await waitFor(() => expect(focused.length).toBeGreaterThan(0));
  });

  it('does not steal the keyboard from an open dialog', async () => {
    // The chooser is a text field; yanking focus into a pane behind it would
    // make it impossible to type in.
    renderLab();
    await summary(/1 pane$/);
    cmd('k');
    const dialog = await screen.findByRole('dialog', { name: 'Jump to a computer or pane' });
    const field = within(dialog).getByLabelText('Filter computers and panes');
    await waitFor(() => expect(document.activeElement).toBe(field));
  });

  it('offers a way out when there is no fleet at all', async () => {
    renderLab({}, stubClient({ listComputers: async () => [] }));
    expect(await screen.findByText('No computers to lab')).toBeTruthy();
  });
});
