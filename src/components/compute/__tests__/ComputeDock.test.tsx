// ComputeDock — the chrome around the dock store.
//
// The store already has its own tests; these cover what only the component can
// get wrong: staying mounted across layout changes (a dropped socket is the
// bug the whole design exists to avoid), the four modes rendering the right
// shape, and the keyboard reaching the dock from inside a focused terminal.

import { useEffect } from 'react';
import { render, screen, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComputeDock } from '../components/ComputeDock';
import {
  openShell, closeShell, getDock, setMode, setDockVisible, focusShell,
} from '../lib/dockStore';
import { DOCK_STORAGE_KEY } from '../lib/storage';

// ShellTerminal owns a WebSocket and an xterm instance; neither belongs in a
// test of the chrome around it. The stub records the props that decide whether
// a socket is opened at all.
const mounted: string[] = [];
vi.mock('../components/ShellTerminal', () => ({
  ShellTerminal: ({ sessionId, shellId, autoConnect }: {
    sessionId: string; shellId?: string; autoConnect?: boolean;
  }) => {
    // Mounts, not renders — a remount is what drops the socket, and a rerender
    // is harmless. Recording in an effect is the only way to tell them apart.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => { mounted.push(`${shellId}`); }, [shellId]);
    return (
      <div
        data-testid={`term-${shellId}`}
        data-session={sessionId}
        data-autoconnect={String(!!autoConnect)}
      />
    );
  },
}));

function computer(n: number) {
  return { id: `c${n}`, label: `computer-${n}`, sessionId: `session-${'x'.repeat(30)}-${n}` };
}

beforeEach(() => {
  localStorage.removeItem(DOCK_STORAGE_KEY);
  mounted.length = 0;
  // The store is a module singleton, so each test has to put it back.
  for (const s of getDock().shells) closeShell(s.id);
});

afterEach(cleanup);

describe('ComputeDock', () => {
  it('renders nothing when hidden, and nothing when there are no shells', () => {
    const { container, rerender } = render(<ComputeDock />);
    expect(container).toBeEmptyDOMElement();

    act(() => { openShell(computer(1)); setDockVisible(false); });
    rerender(<ComputeDock />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows a tab per shell, with the active one marked', () => {
    act(() => { openShell(computer(1)); openShell(computer(2)); });
    render(<ComputeDock />);

    expect(screen.getByTitle(/computer-1 · ⌥1/)).toBeInTheDocument();
    const second = screen.getByTitle(/computer-2 · ⌥2/);
    // openShell focuses what it opened, so the second is current.
    expect(second).toHaveAttribute('aria-current', 'true');
  });

  it('keeps every terminal mounted in a tabbed layout — only visibility changes', () => {
    act(() => { openShell(computer(1)); openShell(computer(2)); });
    render(<ComputeDock />);

    // Both exist in the DOM. This is the load-bearing assertion: unmounting the
    // inactive tab would drop its socket and lose its scrollback.
    expect(screen.getAllByTestId(/^term-/)).toHaveLength(2);
  });

  it('only the visible pane auto-connects', () => {
    act(() => { openShell(computer(1)); openShell(computer(2)); });
    render(<ComputeDock />);

    const terms = screen.getAllByTestId(/^term-/);
    const connecting = terms.filter((t) => t.getAttribute('data-autoconnect') === 'true');
    // A hidden tab dialling out would burn one of the ten shells a runtime
    // allows on something nobody is looking at.
    expect(connecting).toHaveLength(1);
  });

  it('tiled layouts connect every pane, because every pane is on screen', () => {
    act(() => { openShell(computer(1)); openShell(computer(2)); setMode('grid'); });
    render(<ComputeDock />);

    const terms = screen.getAllByTestId(/^term-/);
    expect(terms.every((t) => t.getAttribute('data-autoconnect') === 'true')).toBe(true);
  });

  it('survives a layout change without remounting a terminal', () => {
    act(() => { openShell(computer(1)); });
    const { rerender } = render(<ComputeDock />);
    const before = mounted.length;

    act(() => { setMode('grid'); });
    rerender(<ComputeDock />);
    act(() => { setMode('stack'); });
    rerender(<ComputeDock />);

    // React keeps the element by key across the layout switch; a remount here
    // would mean a dropped socket on every mode toggle.
    expect(mounted.length).toBe(before);
  });

  it('floating mode renders the shared FloatingPanel, not a second drag implementation', () => {
    act(() => { openShell(computer(1)); setMode('floating'); });
    render(<ComputeDock />);
    expect(screen.getByTestId('compute-dock-floating')).toBeInTheDocument();
    expect(screen.queryByTestId('compute-dock')).not.toBeInTheDocument();
  });

  it('closing the last tab hides the dock', async () => {
    const user = userEvent.setup();
    act(() => { openShell(computer(1)); });
    render(<ComputeDock />);

    await user.click(screen.getByLabelText('Close computer-1'));
    expect(getDock().mode).toBe('hidden');
  });

  describe('keyboard', () => {
    it("⌘' hides a visible dock and shows a hidden one", async () => {
      const user = userEvent.setup();
      act(() => { openShell(computer(1)); });
      render(<ComputeDock />);
      expect(getDock().mode).not.toBe('hidden');

      await user.keyboard("{Meta>}'{/Meta}");
      expect(getDock().mode).toBe('hidden');

      await user.keyboard("{Meta>}'{/Meta}");
      expect(getDock().mode).not.toBe('hidden');
    });

    it('⌥2 jumps to the second tab', async () => {
      const user = userEvent.setup();
      act(() => { openShell(computer(1)); openShell(computer(2)); focusShell(getDock().shells[0]!.id); });
      render(<ComputeDock />);

      await user.keyboard('{Alt>}2{/Alt}');
      expect(getDock().activeId).toBe(getDock().shells[1]!.id);
    });

    it('does nothing for ⌥ digits while hidden', async () => {
      const user = userEvent.setup();
      act(() => { openShell(computer(1)); openShell(computer(2)); });
      const first = getDock().shells[0]!.id;
      act(() => { focusShell(first); setDockVisible(false); });
      render(<ComputeDock />);

      await user.keyboard('{Alt>}2{/Alt}');
      expect(getDock().activeId).toBe(first);
    });

    it('binds nothing when hotkeys are off', async () => {
      const user = userEvent.setup();
      act(() => { openShell(computer(1)); });
      render(<ComputeDock hotkeys={false} />);
      const mode = getDock().mode;

      await user.keyboard("{Meta>}'{/Meta}");
      expect(getDock().mode).toBe(mode);
    });
  });
});
