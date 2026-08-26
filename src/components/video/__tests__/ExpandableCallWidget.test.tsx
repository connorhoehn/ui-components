import { createRef } from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { ExpandableCallWidget, type ExpandableCallWidgetHandle } from '../ExpandableCallWidget';

// Stub setPointerCapture / releasePointerCapture — jsdom doesn't implement them.
beforeAll(() => {
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = vi.fn();
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = vi.fn();
  }
  if (!Element.prototype.requestFullscreen) {
    Element.prototype.requestFullscreen = vi.fn(() => Promise.resolve());
  }
});

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

// ---------------------------------------------------------------------------
// 1. Renders in default mini mode
// ---------------------------------------------------------------------------
describe('ExpandableCallWidget — 10 cases', () => {
  it('1. renders in default mini mode with children and controls', () => {
    render(
      <ExpandableCallWidget
        title="Test Call"
        controls={<button>Mute</button>}
      >
        <div data-testid="body-content">video content</div>
      </ExpandableCallWidget>,
    );

    const root = screen.getByTestId('body-content').closest('[data-call-widget-mode]') as HTMLElement;
    expect(root).toHaveAttribute('data-call-widget-mode', 'mini');
    expect(screen.getByTestId('body-content')).toBeInTheDocument();
    expect(screen.getByText('Mute')).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // 2. Mode buttons toggle modes
  // -------------------------------------------------------------------------
  it('2. window button flips mode to window; mini button reverses it', async () => {
    render(
      <ExpandableCallWidget title="Test Call">
        <div />
      </ExpandableCallWidget>,
    );

    const root = screen
      .getByTestId('call-widget-mode-mini')
      .closest('[data-call-widget-mode]') as HTMLElement;

    expect(root).toHaveAttribute('data-call-widget-mode', 'mini');

    await act(async () => {
      fireEvent.click(screen.getByTestId('call-widget-mode-window'));
    });
    expect(root).toHaveAttribute('data-call-widget-mode', 'window');

    await act(async () => {
      fireEvent.click(screen.getByTestId('call-widget-mode-mini'));
    });
    expect(root).toHaveAttribute('data-call-widget-mode', 'mini');
  });

  // -------------------------------------------------------------------------
  // 3. Fullscreen button calls requestFullscreen
  // -------------------------------------------------------------------------
  it('3. fullscreen button calls Element.prototype.requestFullscreen', async () => {
    const requestFs = vi.fn(() => Promise.resolve());
    Element.prototype.requestFullscreen = requestFs;

    render(
      <ExpandableCallWidget title="Test Call">
        <div />
      </ExpandableCallWidget>,
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('call-widget-mode-fullscreen'));
    });

    expect(requestFs).toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // 4. fullscreenchange with fullscreenElement=null returns to window
  // -------------------------------------------------------------------------
  it('4. fullscreenchange with fullscreenElement=null returns mode to window', async () => {
    const requestFs = vi.fn(() => Promise.resolve());
    Element.prototype.requestFullscreen = requestFs;

    render(
      <ExpandableCallWidget title="Test Call">
        <div />
      </ExpandableCallWidget>,
    );

    // Click fullscreen button — resolves the promise → fsActive = true
    await act(async () => {
      fireEvent.click(screen.getByTestId('call-widget-mode-fullscreen'));
    });

    const root = screen
      .getByTestId('call-widget-mode-mini')
      .closest('[data-call-widget-mode]') as HTMLElement;

    // Manually mark as fullscreen-active by setting fsActive state is
    // driven internally. We test the exit path: simulate browser-driven exit.
    Object.defineProperty(document, 'fullscreenElement', {
      get: () => null,
      configurable: true,
    });

    await act(async () => {
      document.dispatchEvent(new Event('fullscreenchange'));
    });

    // After browser-driven exit (fullscreenElement=null, not rootRef.current),
    // the handler sets fsActive=false and mode='window'.
    expect(root).toHaveAttribute('data-call-widget-mode', 'window');
  });

  // -------------------------------------------------------------------------
  // 5. onModeChange fires for each transition
  // -------------------------------------------------------------------------
  it('5. onModeChange fires for mini → window → mini transitions', async () => {
    const onModeChange = vi.fn();

    render(
      <ExpandableCallWidget title="Test Call" onModeChange={onModeChange}>
        <div />
      </ExpandableCallWidget>,
    );

    // Initial render fires once for 'mini'
    const callsAfterMount = onModeChange.mock.calls.length;

    await act(async () => {
      fireEvent.click(screen.getByTestId('call-widget-mode-window'));
    });
    expect(onModeChange).toHaveBeenCalledWith('window');

    await act(async () => {
      fireEvent.click(screen.getByTestId('call-widget-mode-mini'));
    });
    expect(onModeChange).toHaveBeenCalledWith('mini');

    // At least two transitions happened after mount.
    expect(onModeChange.mock.calls.length).toBeGreaterThan(callsAfterMount);
  });

  // -------------------------------------------------------------------------
  // 6. Persistence roundtrip via persistKey
  // -------------------------------------------------------------------------
  it('6. persistKey roundtrip: window mode persists and is restored on remount', async () => {
    vi.useFakeTimers();

    const { unmount } = render(
      <ExpandableCallWidget title="Test Call" persistKey="test-widget">
        <div />
      </ExpandableCallWidget>,
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('call-widget-mode-window'));
    });

    // Flush the 200ms debounce so localStorage is written.
    await act(async () => {
      vi.runAllTimers();
    });

    unmount();

    vi.useRealTimers();

    render(
      <ExpandableCallWidget title="Test Call" persistKey="test-widget">
        <div />
      </ExpandableCallWidget>,
    );

    const root = screen
      .getByTestId('call-widget-mode-mini')
      .closest('[data-call-widget-mode]') as HTMLElement;

    expect(root).toHaveAttribute('data-call-widget-mode', 'window');

    localStorage.removeItem('test-widget');
  });

  // -------------------------------------------------------------------------
  // 7. persistKey={undefined} → no localStorage I/O
  // -------------------------------------------------------------------------
  it('7. no persistKey — setItem is never called', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    vi.useFakeTimers();

    render(
      <ExpandableCallWidget title="Test Call">
        <div />
      </ExpandableCallWidget>,
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('call-widget-mode-window'));
    });

    await act(async () => {
      vi.runAllTimers();
    });

    vi.useRealTimers();

    expect(setItemSpy).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // 8. Resize handle drag changes width/height
  // -------------------------------------------------------------------------
  it('8. drag on resize handle updates widget width/height in style', async () => {
    render(
      <ExpandableCallWidget title="Test Call" defaultMode="window">
        <div />
      </ExpandableCallWidget>,
    );

    const root = screen
      .getByTestId('call-widget-resize-handle')
      .closest('[data-call-widget-mode]') as HTMLElement;

    const initialWidth = parseInt(root.style.width, 10);
    const initialHeight = parseInt(root.style.height, 10);

    const handle = screen.getByTestId('call-widget-resize-handle');

    await act(async () => {
      fireEvent.pointerDown(handle, { clientX: 100, clientY: 100, pointerId: 1 });
      fireEvent.pointerMove(handle, { clientX: 250, clientY: 200, pointerId: 1 });
      fireEvent.pointerUp(handle, { clientX: 250, clientY: 200, pointerId: 1 });
    });

    const newWidth = parseInt(root.style.width, 10);
    const newHeight = parseInt(root.style.height, 10);

    expect(newWidth).toBeGreaterThan(initialWidth);
    expect(newHeight).toBeGreaterThan(initialHeight);
  });

  // -------------------------------------------------------------------------
  // 9. apiRef setMode imperative API
  // -------------------------------------------------------------------------
  it('9. apiRef.current.setMode("window") flips data attr', async () => {
    const ref = createRef<ExpandableCallWidgetHandle>();

    render(
      <ExpandableCallWidget title="Test Call" apiRef={ref}>
        <div />
      </ExpandableCallWidget>,
    );

    const root = screen
      .getByTestId('call-widget-mode-mini')
      .closest('[data-call-widget-mode]') as HTMLElement;

    expect(root).toHaveAttribute('data-call-widget-mode', 'mini');

    await act(async () => {
      ref.current!.setMode('window');
    });

    expect(root).toHaveAttribute('data-call-widget-mode', 'window');
  });

  // -------------------------------------------------------------------------
  // 10. Header buttons don't trigger drag (CRITICAL bug guard)
  // -------------------------------------------------------------------------
  it('10. pointerdown on mode button inside header does NOT change widget position', async () => {
    render(
      <ExpandableCallWidget title="Test Call" defaultMode="window">
        <div />
      </ExpandableCallWidget>,
    );

    const root = screen
      .getByTestId('call-widget-resize-handle')
      .closest('[data-call-widget-mode]') as HTMLElement;

    const originalLeft = root.style.left;
    const originalTop = root.style.top;

    const windowBtn = screen.getByTestId('call-widget-mode-window');

    // Pointerdown directly on the window mode button (which is a <button>
    // inside the header) — should NOT initiate a drag.
    await act(async () => {
      fireEvent.pointerDown(windowBtn, { clientX: 50, clientY: 50, pointerId: 1 });
    });

    // Simulate pointer move that would move the widget if drag started.
    await act(async () => {
      fireEvent.pointerMove(windowBtn, { clientX: 300, clientY: 300, pointerId: 1 });
    });

    await act(async () => {
      fireEvent.pointerUp(windowBtn, { clientX: 300, clientY: 300, pointerId: 1 });
    });

    // Position must not have changed — drag was skipped for button targets.
    expect(root.style.left).toBe(originalLeft);
    expect(root.style.top).toBe(originalTop);
  });
});
