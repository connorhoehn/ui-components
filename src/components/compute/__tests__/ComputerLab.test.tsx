import { useEffect } from 'react';
import { render, screen, within, fireEvent, act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComputeProvider } from '../context/ComputeContext';
import { ComputerLab } from '../components/ComputerLab';
import { fixtureComputers, fixtureProjects, fixtureRuntimeStatus } from '../fixtures/computeFixture';
import { DEFAULT_PANE_KINDS } from '../components/defaultPaneKinds';
import { DEFAULT_KEYMAP, TMUX_LEADER } from '../lib/keymap';
import type { PaneKind } from '../lib/paneKinds';
import type { ComputeClient } from '../lib/computeClient';

function stubClient(overrides: Partial<ComputeClient> = {}): ComputeClient {
  return {
    getStatus: async () => fixtureRuntimeStatus,
    listComputers: async () => fixtureComputers,
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
    const dialog = await screen.findByRole('dialog', { name: 'Jump to a computer, pane or project' });
    const options = within(dialog).getAllByRole('option');
    expect(within(options[0]!).getByText(/on screen/)).toBeTruthy();
    // Every other box in the fleet is offered as somewhere to go.
    expect(options.length).toBe(fixtureComputers.length);
  });

  it('filters the chooser by subsequence', async () => {
    renderLab();
    await summary();
    cmd('k');
    const dialog = await screen.findByRole('dialog', { name: 'Jump to a computer, pane or project' });
    fireEvent.change(within(dialog).getByLabelText('Filter computers, panes and projects'), {
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
    const dialog = await screen.findByRole('dialog', { name: 'Jump to a computer, pane or project' });
    const field = within(dialog).getByLabelText('Filter computers, panes and projects');
    await waitFor(() => expect(document.activeElement).toBe(field));
  });

  it('finds projects in the chooser, but only once you search', async () => {
    render(
      <ComputeProvider client={stubClient()} canManage useFixtures={false} pollIntervalMs={0}
        computers={fixtureComputers} projects={fixtureProjects}>
        <ComputerLab open onClose={() => {}} />
      </ComputeProvider>,
    );
    await summary();
    cmd('k');
    const dialog = await screen.findByRole('dialog', { name: 'Jump to a computer, pane or project' });

    // Unprompted, projects stay out of the way — they would push the panes,
    // which are the cheap answer, below the fold.
    expect(within(dialog).queryByText('Auth migration')).toBeNull();

    fireEvent.change(within(dialog).getByLabelText('Filter computers, panes and projects'), {
      target: { value: 'auth' },
    });
    expect(await within(dialog).findByText('Auth migration')).toBeTruthy();
    // And it carries the cost centre with it, which is the point of jumping
    // to a project rather than to a box.
    expect(within(dialog).getByText(/412/)).toBeTruthy();
  });

  it('offers a way out when there is no fleet at all', async () => {
    renderLab({}, stubClient({ listComputers: async () => [] }));
    expect(await screen.findByText('No computers to lab')).toBeTruthy();
  });
});

// ─── Deep links ──────────────────────────────────────────────────────────────
//
// `focusComputerId` is how a link elsewhere in an app ("an agent is working
// this item — open its computer") lands somewhere useful. The behaviour worth
// pinning is that it places you once rather than pinning you there.
//
// Asserted through the composer placeholder, which already names the focused
// computer — a real thing a user reads, rather than a test id added to prove
// this one point.

describe('focusComputerId', () => {
  const placeholder = async () =>
    (await screen.findByPlaceholderText(/instruction for/)).getAttribute('placeholder') ?? '';

  it('seeds the first pane with the linked computer, not the first in the fleet', async () => {
    renderLab({ focusComputerId: fixtureComputers[2]!.id });
    await summary();
    await waitFor(async () =>
      expect(await placeholder()).toContain(fixtureComputers[2]!.label));
  });

  it('ignores an id the fleet does not have, rather than blanking the pane', async () => {
    // Usually means the fleet has not loaded yet. Clearing the pane on the way
    // to finding out is a worse answer than doing nothing.
    renderLab({ focusComputerId: 'not-a-computer' });
    await summary();
    await waitFor(async () =>
      expect(await placeholder()).toContain(fixtureComputers[0]!.label));
  });

  it('does not drag focus back after you move away from it', async () => {
    renderLab({ focusComputerId: fixtureComputers[1]!.id });
    await summary();
    await waitFor(async () =>
      expect(await placeholder()).toContain(fixtureComputers[1]!.label));

    // A split moves focus to the new pane and re-renders with the same prop
    // still set. A link that reasserted itself would yank focus back here, and
    // would keep doing it for as long as the URL stayed put.
    cmd('Enter');
    await summary(/2 panes$/);
    const after = await placeholder();

    // Give the effect every chance to fire again.
    await waitFor(async () => expect(await placeholder()).toBe(after));
  });
});

// ─── Variants ────────────────────────────────────────────────────────────────
//
// `inline` exists for a host that routes to the lab as a page rather than
// summoning it over one. The differences are small but each is load-bearing.

describe('variant', () => {
  it('overlay claims the viewport and tells assistive tech the page is inert', async () => {
    renderLab();
    await summary();
    const root = screen.getByRole('dialog', { name: 'Computer Lab' });
    expect(root).toHaveAttribute('aria-modal', 'true');
    expect(root.className).toContain('fixed');
  });

  it('inline fills its container and is NOT modal', async () => {
    // aria-modal here would be a lie: the host's nav is still on screen and
    // still reachable, so telling a screen reader the rest of the page is
    // inert would strand someone in the lab.
    renderLab({ variant: 'inline' });
    await summary();
    const root = screen.getByRole('region', { name: 'Computer Lab' });
    expect(root).not.toHaveAttribute('aria-modal');
    expect(root.className).not.toContain('fixed');
    expect(screen.queryByRole('dialog', { name: 'Computer Lab' })).toBeNull();
  });

  it('inline offers no exit — the host nav is the way out', async () => {
    renderLab({ variant: 'inline' });
    await summary();
    // A ✕ that leads nowhere is worse than no ✕.
    expect(screen.queryByTitle(/Leave the lab/)).toBeNull();
  });

  it('inline ignores the exit chord instead of calling onClose', async () => {
    const onClose = vi.fn();
    renderLab({ variant: 'inline', onClose });
    await summary();
    press('Escape');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('overlay still exits on the chord', async () => {
    const onClose = vi.fn();
    renderLab({ onClose });
    await summary();
    press('Escape');
    expect(onClose).toHaveBeenCalled();
  });
});

// ─── Chrome palette ──────────────────────────────────────────────────────────
//
// The lab's chrome has to be able to live in someone else's app. Forcing the
// terminal palette on a light host makes it read as an embedded widget rather
// than part of the page — the "feels like an iframe" problem this addresses.

describe('chrome', () => {
  const root = () => screen.getByRole('region', { name: 'Computer Lab' });

  it('inline defaults to the host palette', async () => {
    renderLab({ variant: 'inline' });
    await summary();
    expect(root().className).toContain('bg-surface');
    expect(root().className).not.toContain('bg-code-bg');
  });

  it('overlay defaults to the terminal palette', async () => {
    renderLab();
    await summary();
    const dialog = screen.getByRole('dialog', { name: 'Computer Lab' });
    expect(dialog.className).toContain('bg-code-bg');
  });

  it('the tone is overridable in both directions', async () => {
    const { unmount } = renderLab({ variant: 'inline', chrome: 'code' });
    await summary();
    expect(root().className).toContain('bg-code-bg');
    unmount();

    renderLab({ variant: 'inline', chrome: 'app' });
    await summary();
    expect(root().className).toContain('bg-surface');
  });

  it('does NOT remap the code palette on the root, so panes stay dark', async () => {
    // The remap is applied to the chrome containers rather than the root
    // precisely because custom properties inherit. On the root it would repaint
    // the terminals too, and a light terminal is not a terminal.
    renderLab({ variant: 'inline' });
    await summary();
    expect(root().style.getPropertyValue('--color-code-bg')).toBe('');
  });

  it('remaps the palette on the chrome containers', async () => {
    renderLab({ variant: 'inline' });
    await summary();
    const remapped = [...root().querySelectorAll<HTMLElement>('[style*="--color-code-bg"]')];
    // Top bar, rail, command line.
    expect(remapped.length).toBeGreaterThanOrEqual(3);
    expect(remapped[0]!.style.getPropertyValue('--color-code-bg')).toBe('var(--color-surface)');
  });

  it('does NOT remap the field the panes sit on', async () => {
    // The stronger form of the root invariant above, and the one that actually
    // protects the terminals now that the field carries a background of its
    // own. A pane's ancestors inside the lab are: root -> body row -> field.
    // None of the three may carry the remap, or every `text-code-*` inside a
    // pane — the status line, the frame title, the connecting strip — flips to
    // app tokens and the pane reads as two half-themed halves.
    renderLab({ variant: 'inline' });
    await summary();
    // Every pane frame paints `bg-terminal-bg` (TitledFrame's code tone).
    const panes = [...root().querySelectorAll<HTMLElement>('.bg-terminal-bg')];
    expect(panes.length).toBeGreaterThan(0);
    for (const pane of panes) {
      for (let node: HTMLElement | null = pane; node; node = node.parentElement) {
        expect(node.style.getPropertyValue('--color-code-bg')).toBe('');
        if (node === root()) break;
      }
    }
  });

  it('remaps the accents too, because in the chrome they are affordances', async () => {
    // The first pass left the accents alone on the reasoning that they carry
    // meaning. That holds inside a pane and does not hold in the chrome:
    // nothing up here reports a computer's state through them (the dots read
    // COMPUTE_STATUS.color, the chips take a design-system tone, both already
    // theme-aware). What they colour is `send`, `new`, the armed-broadcast
    // border and the selected window tab — and Catppuccin's pastels land under
    // 2:1 on light chrome. See lib/chromeTokens.
    renderLab({ variant: 'inline' });
    await summary();
    const bar = root().querySelector<HTMLElement>('[style*="--color-code-bg"]')!;
    expect(bar.style.getPropertyValue('--color-code-green')).toBe('var(--color-success)');
    expect(bar.style.getPropertyValue('--color-code-peach')).toBe('var(--color-caution)');
    expect(bar.style.getPropertyValue('--color-code-blue')).toBe('var(--color-info)');
  });

  it('gives an inline lab a containing block, so its dialogs land inside it', async () => {
    // Both dialogs are `absolute inset-0`. An overlay root is `fixed` and so
    // already a containing block; an inline root was not, so the chooser and
    // the shortcut sheet resolved against whatever ancestor of the HOST
    // happened to be positioned — in a real page, over the app's own nav.
    renderLab({ variant: 'inline' });
    await summary();
    expect(root().className).toContain('relative');
  });

  it('themes the chooser card with the host, but never its scrim', async () => {
    renderLab({ variant: 'inline' });
    await summary();
    cmd('k');
    const dialog = await screen.findByRole('dialog', { name: 'Jump to a computer, pane or project' });
    expect(dialog.style.getPropertyValue('--color-code-panel')).toBe('var(--color-surface-panel)');
    // The scrim covers the panes as well as the chrome. Remapped, it would be
    // a light film over a terminal, which dims nothing.
    const scrim = dialog.parentElement!;
    expect(scrim.style.getPropertyValue('--color-code-bg')).toBe('');
    expect(scrim.className).toContain('bg-code-bg/70');
  });

  it('leaves the chooser on the terminal palette for an overlay lab', async () => {
    renderLab({ variant: 'overlay' });
    await summary();
    cmd('k');
    const dialog = await screen.findByRole('dialog', { name: 'Jump to a computer, pane or project' });
    expect(dialog.style.getPropertyValue('--color-code-panel')).toBe('');
  });

  it('themes the shortcut sheet card with the host', async () => {
    renderLab({ variant: 'inline' });
    await summary();
    cmd('/');
    const sheet = await screen.findByRole('dialog', { name: 'Keyboard shortcuts' });
    const card = within(sheet).getByText('Keyboard shortcuts').closest('[style]') as HTMLElement;
    expect(card.style.getPropertyValue('--color-code-panel')).toBe('var(--color-surface-panel)');
  });
});

// ─── Watching a bot ──────────────────────────────────────────────────────────
//
// The scenario: a cron bot or the dispatcher picks up an idle computer and
// runs a task on it, and an SME wants to SEE that rather than drive it. The
// activity list is where that shows up, and the verb there is watch.

describe('watching from the activity list', () => {
  const busy = () => fixtureComputers.find((c) => c.status === 'running') ?? fixtureComputers[0]!;

  it('opens a tail pane, not another shell', async () => {
    renderLab();
    await summary(/1 pane$/);

    fireEvent.click(await screen.findByLabelText(`Watch ${busy().label}`));
    await summary(/2 panes$/);

    // A tail costs no shell against the runtime's quota of ten, which is the
    // whole reason watching is a different pane kind rather than a second
    // terminal.
    expect(screen.getByTestId('lab-summary').textContent).toMatch(/2 panes/);
  });

  it('reuses a tail already pointed at that computer', async () => {
    renderLab();
    await summary(/1 pane$/);
    const watch = await screen.findByLabelText(`Watch ${busy().label}`);

    fireEvent.click(watch);
    await summary(/2 panes$/);
    fireEvent.click(watch);

    // Clicking twice means "show me", not "show me twice".
    await summary(/2 panes$/);
  });

  it('offers watch only on the activity list, not the computers list', async () => {
    renderLab();
    await summary();
    // One control per activity row — the computers list above is where you go
    // to work in a box, and its click already retargets a terminal.
    const watches = screen.getAllByLabelText(/^Watch /);
    const running = fixtureComputers.filter(
      (c) => c.status === 'running' || c.status === 'waiting' || c.status === 'error',
    );
    expect(watches).toHaveLength(running.length);
  });
});
