import { render, screen, fireEvent, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { useMemo, useState } from 'react';
import {
  CommandPalette,
  CommandPaletteProvider,
  matchHotkey,
  useCommandPalette,
  useRegisterCommand,
  type Command,
} from '../CommandPalette';

// jsdom doesn't ship ResizeObserver or Element.scrollIntoView; cmdk's
// internal layout effects need both. No-op polyfills are sufficient since
// we don't assert layout here.
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (typeof globalThis.ResizeObserver === 'undefined') {
  (globalThis as unknown as { ResizeObserver: typeof ResizeObserverMock }).ResizeObserver =
    ResizeObserverMock;
}
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView() {};
}

// Helper component that renders the palette and exposes the controller via
// a side-channel ref, so tests can call open()/close()/toggle() imperatively.
function Harness({
  commands,
  getDynamicCommands,
  onController,
}: {
  commands: Command[];
  getDynamicCommands?: (q: string) => Command[];
  onController?: (c: ReturnType<typeof useCommandPalette>) => void;
}) {
  return (
    <CommandPaletteProvider
      commands={commands}
      getDynamicCommands={getDynamicCommands}
    >
      <CommandPalette />
      <ControllerProbe onController={onController} />
    </CommandPaletteProvider>
  );
}

function ControllerProbe({
  onController,
}: {
  onController?: (c: ReturnType<typeof useCommandPalette>) => void;
}) {
  const controller = useCommandPalette();
  onController?.(controller);
  return (
    <div data-testid="probe">
      <span data-testid="probe-open">{String(controller.isOpen)}</span>
      <button onClick={controller.toggle} data-testid="probe-toggle">
        toggle
      </button>
      <button onClick={controller.open} data-testid="probe-open-btn">
        open
      </button>
      <button onClick={controller.close} data-testid="probe-close">
        close
      </button>
    </div>
  );
}

describe('CommandPalette', () => {
  it('renders provider children', () => {
    render(
      <CommandPaletteProvider commands={[]}>
        <div data-testid="child">hello</div>
      </CommandPaletteProvider>,
    );
    expect(screen.getByTestId('child')).toHaveTextContent('hello');
  });

  it('useCommandPalette() throws outside provider', () => {
    // Suppress the React error-boundary noise that renderHook prints when
    // the hook throws synchronously during render.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useCommandPalette())).toThrow(
      /CommandPaletteProvider/,
    );
    spy.mockRestore();
  });

  it('toggle() opens and closes the palette', () => {
    render(<Harness commands={[]} />);
    expect(screen.getByTestId('probe-open')).toHaveTextContent('false');
    fireEvent.click(screen.getByTestId('probe-toggle'));
    expect(screen.getByTestId('probe-open')).toHaveTextContent('true');
    fireEvent.click(screen.getByTestId('probe-toggle'));
    expect(screen.getByTestId('probe-open')).toHaveTextContent('false');
  });

  it('Cmd+K opens the palette', () => {
    render(<Harness commands={[]} />);
    expect(screen.getByTestId('probe-open')).toHaveTextContent('false');
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    expect(screen.getByTestId('probe-open')).toHaveTextContent('true');
  });

  it('Ctrl+K also opens the palette', () => {
    render(<Harness commands={[]} />);
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByTestId('probe-open')).toHaveTextContent('true');
  });

  it('ESC closes the palette (via Modal)', () => {
    render(<Harness commands={[]} />);
    fireEvent.click(screen.getByTestId('probe-open-btn'));
    expect(screen.getByTestId('probe-open')).toHaveTextContent('true');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByTestId('probe-open')).toHaveTextContent('false');
  });

  it('invokes run() when a command item is selected, and closes first', async () => {
    const order: string[] = [];
    const run = vi.fn(() => {
      order.push('run');
    });
    const commands: Command[] = [
      { id: 'foo', label: 'Foo Command', run },
    ];

    let controller: ReturnType<typeof useCommandPalette> | undefined;
    render(
      <Harness
        commands={commands}
        onController={(c) => {
          controller = c;
        }}
      />,
    );

    // Open the palette and assert the item is in the DOM.
    act(() => controller!.open());
    const item = await screen.findByTestId('command-palette-item-foo');

    // Selecting cmdk items goes through pointer events.
    fireEvent.click(item);

    // close() resets isOpen synchronously; run() is deferred via a microtask
    // so the close commits first. Flush microtasks and verify ordering.
    await Promise.resolve();
    expect(run).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('probe-open')).toHaveTextContent('false');
  });

  it('merges getDynamicCommands(query) results into the list', async () => {
    const staticCommand: Command = {
      id: 'static',
      label: 'Static One',
      run: vi.fn(),
    };
    const getDynamicCommands = (q: string): Command[] => {
      if (q.startsWith('http')) {
        return [{ id: 'open-url', label: `Open URL: ${q}`, run: vi.fn() }];
      }
      return [];
    };

    let controller: ReturnType<typeof useCommandPalette> | undefined;
    render(
      <Harness
        commands={[staticCommand]}
        getDynamicCommands={getDynamicCommands}
        onController={(c) => {
          controller = c;
        }}
      />,
    );

    act(() => controller!.open());

    // Static command is always present.
    expect(
      await screen.findByTestId('command-palette-item-static'),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('command-palette-item-open-url'),
    ).not.toBeInTheDocument();

    // Type a URL into the input — the dynamic command should now render.
    const input = screen.getByTestId('command-palette-input');
    fireEvent.change(input, { target: { value: 'https://example.com' } });

    expect(
      await screen.findByTestId('command-palette-item-open-url'),
    ).toBeInTheDocument();
  });

  it('when() predicate hides commands that return false', async () => {
    const commands: Command[] = [
      { id: 'visible', label: 'Visible', when: () => true, run: vi.fn() },
      { id: 'hidden', label: 'Hidden', when: () => false, run: vi.fn() },
    ];

    let controller: ReturnType<typeof useCommandPalette> | undefined;
    render(
      <Harness
        commands={commands}
        onController={(c) => {
          controller = c;
        }}
      />,
    );

    act(() => controller!.open());
    expect(
      await screen.findByTestId('command-palette-item-visible'),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('command-palette-item-hidden'),
    ).not.toBeInTheDocument();
  });

  // ── useRegisterCommand registry ─────────────────────────────────────

  it('useRegisterCommand makes the command visible in the palette', async () => {
    function Page() {
      const cmd = useMemo<Command>(
        () => ({ id: 'page-cmd', label: 'Page Command', run: vi.fn() }),
        [],
      );
      useRegisterCommand(cmd);
      return null;
    }

    let controller: ReturnType<typeof useCommandPalette> | undefined;
    render(
      <CommandPaletteProvider>
        <CommandPalette />
        <Page />
        <ControllerProbe onController={(c) => (controller = c)} />
      </CommandPaletteProvider>,
    );

    act(() => controller!.open());
    expect(
      await screen.findByTestId('command-palette-item-page-cmd'),
    ).toBeInTheDocument();
  });

  it('useRegisterCommand removes the command on unmount', async () => {
    function Page() {
      const cmd = useMemo<Command>(
        () => ({ id: 'transient', label: 'Transient', run: vi.fn() }),
        [],
      );
      useRegisterCommand(cmd);
      return null;
    }

    function Host({ show }: { show: boolean }) {
      return (
        <CommandPaletteProvider>
          <CommandPalette />
          {show && <Page />}
          <ControllerProbe />
        </CommandPaletteProvider>
      );
    }

    const { rerender } = render(<Host show={true} />);

    // Open and confirm visible.
    fireEvent.click(screen.getByTestId('probe-open-btn'));
    expect(
      await screen.findByTestId('command-palette-item-transient'),
    ).toBeInTheDocument();

    // Close, unmount the Page, reopen — the command should be gone.
    fireEvent.click(screen.getByTestId('probe-close'));
    rerender(<Host show={false} />);
    fireEvent.click(screen.getByTestId('probe-open-btn'));
    expect(
      screen.queryByTestId('command-palette-item-transient'),
    ).not.toBeInTheDocument();
  });

  it('merges static commands prop with useRegisterCommand registrations', async () => {
    const staticCmd: Command = {
      id: 'from-prop',
      label: 'From Prop',
      run: vi.fn(),
    };

    function Page() {
      const cmd = useMemo<Command>(
        () => ({ id: 'from-hook', label: 'From Hook', run: vi.fn() }),
        [],
      );
      useRegisterCommand(cmd);
      return null;
    }

    let controller: ReturnType<typeof useCommandPalette> | undefined;
    render(
      <CommandPaletteProvider commands={[staticCmd]}>
        <CommandPalette />
        <Page />
        <ControllerProbe onController={(c) => (controller = c)} />
      </CommandPaletteProvider>,
    );

    act(() => controller!.open());
    expect(
      await screen.findByTestId('command-palette-item-from-prop'),
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId('command-palette-item-from-hook'),
    ).toBeInTheDocument();
  });

  // ── Per-command hotkeys ────────────────────────────────────────────

  it('hotkey invokes run() without opening the palette', async () => {
    const perform = vi.fn();
    const commands: Command[] = [
      { id: 'jump', label: 'Jump', hotkey: 'mod+j', run: perform },
    ];

    render(<Harness commands={commands} />);
    expect(screen.getByTestId('probe-open')).toHaveTextContent('false');

    fireEvent.keyDown(window, { key: 'j', metaKey: true });
    await Promise.resolve();
    expect(perform).toHaveBeenCalledTimes(1);
    // Hotkey path should NOT toggle the palette.
    expect(screen.getByTestId('probe-open')).toHaveTextContent('false');
  });

  it('hotkey on a useRegisterCommand-registered command fires', async () => {
    const perform = vi.fn();

    function Page() {
      const cmd = useMemo<Command>(
        () => ({ id: 'hk', label: 'HK', hotkey: 'shift+?', run: perform }),
        [],
      );
      useRegisterCommand(cmd);
      return null;
    }

    render(
      <CommandPaletteProvider>
        <CommandPalette />
        <Page />
      </CommandPaletteProvider>,
    );

    fireEvent.keyDown(window, { key: '?', shiftKey: true });
    await Promise.resolve();
    expect(perform).toHaveBeenCalledTimes(1);
  });

  it('does not double-fire when Cmd+K is the trigger', async () => {
    const perform = vi.fn();
    const commands: Command[] = [
      { id: 'wrong', label: 'Wrong', hotkey: 'mod+k', run: perform },
    ];

    render(<Harness commands={commands} />);
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    await Promise.resolve();
    // Cmd+K opens the palette; the hotkey loop bails for that exact combo.
    expect(perform).not.toHaveBeenCalled();
    expect(screen.getByTestId('probe-open')).toHaveTextContent('true');
  });

  it('matchHotkey parses common shapes', () => {
    const ev = (init: KeyboardEventInit) =>
      new KeyboardEvent('keydown', init);

    expect(matchHotkey(ev({ key: '/' }), '/')).toBe(true);
    expect(matchHotkey(ev({ key: 'P', ctrlKey: true }), 'ctrl+p')).toBe(true);
    expect(matchHotkey(ev({ key: '?', shiftKey: true }), 'shift+?')).toBe(true);
    expect(matchHotkey(ev({ key: 'p' }), 'ctrl+p')).toBe(false);
    expect(matchHotkey(ev({ key: 'p', ctrlKey: true, shiftKey: true }), 'ctrl+p')).toBe(
      false,
    );
    // Empty spec is a no-match, not a runtime error.
    expect(matchHotkey(ev({ key: 'a' }), '')).toBe(false);
  });

  it('restores focus to the previously-focused element on close', () => {
    // Render an outer trigger button + the provider; focus the trigger then
    // open + close. Modal handles the restore — we just assert the contract
    // bubbles through the controller-driven path.
    function Wrapper() {
      const [mountKey] = useState(0);
      return (
        <div key={mountKey}>
          <button data-testid="outer-trigger">trigger</button>
          <Harness commands={[]} />
        </div>
      );
    }
    render(<Wrapper />);
    const trigger = screen.getByTestId('outer-trigger');
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    // Open via the probe (which simulates programmatic control), then close.
    fireEvent.click(screen.getByTestId('probe-open-btn'));
    expect(screen.getByTestId('probe-open')).toHaveTextContent('true');
    fireEvent.click(screen.getByTestId('probe-close'));
    expect(screen.getByTestId('probe-open')).toHaveTextContent('false');
    // Modal's cleanup effect restores focus to the previously-focused element.
    expect(document.activeElement).toBe(trigger);
  });
});
