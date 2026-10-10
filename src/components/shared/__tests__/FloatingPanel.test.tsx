import { act, fireEvent, render, screen } from '@testing-library/react';
import { FloatingPanel, resolveAnchorPosition } from '../FloatingPanel';

// jsdom defaults: window.innerWidth = 1024, window.innerHeight = 768.
// getBoundingClientRect() returns all zeros, so the measured panel size is
// 0×0 — clamp bounds are therefore [16, 1008] horizontally and [16, 752]
// vertically in every test below, and the six anchors resolve to:
//
//   top-left      (  16,  16)      top-right     (1008,  16)
//   left-center   (  16, 384)      right-center  (1008, 384)
//   bottom-left   (  16, 752)      bottom-right  (1008, 752)
const VW = 1024;
const VH = 768;
const MARGIN = 16;

function setViewport(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', { value: width, writable: true, configurable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, writable: true, configurable: true });
}

function renderPanel(props: Partial<React.ComponentProps<typeof FloatingPanel>> = {}) {
  return render(
    <FloatingPanel open onClose={vi.fn()} title="Chat" {...props}>
      <div data-testid="panel-child">hello</div>
    </FloatingPanel>,
  );
}

function panelStyle(testId = 'floating-panel'): CSSStyleDeclaration {
  return (screen.getByTestId(testId) as HTMLElement).style;
}

function dragHeader(dx: number, dy: number, start = { x: 100, y: 100 }) {
  const header = screen.getByTestId('floating-panel-header');
  fireEvent.pointerDown(header, { clientX: start.x, clientY: start.y, pointerType: 'mouse', button: 0 });
  fireEvent.pointerMove(document, { clientX: start.x + dx, clientY: start.y + dy });
  fireEvent.pointerUp(document, { clientX: start.x + dx, clientY: start.y + dy });
}

/** Drag without releasing, so the armed snap zone can be inspected. */
function dragHeaderTo(dx: number, dy: number, start = { x: 100, y: 100 }) {
  const header = screen.getByTestId('floating-panel-header');
  fireEvent.pointerDown(header, { clientX: start.x, clientY: start.y, pointerType: 'mouse', button: 0 });
  fireEvent.pointerMove(document, { clientX: start.x + dx, clientY: start.y + dy });
}

function releaseDrag() {
  fireEvent.pointerUp(document);
}

describe('FloatingPanel', () => {
  beforeEach(() => {
    window.localStorage.clear();
    setViewport(VW, VH);
  });

  it('renders null when open is false', () => {
    const { container } = render(
      <FloatingPanel open={false} onClose={vi.fn()} title="Chat">
        <div>hidden</div>
      </FloatingPanel>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders title, children, and the default testid when open', () => {
    renderPanel();
    expect(screen.getByTestId('floating-panel')).toBeInTheDocument();
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByTestId('panel-child')).toBeInTheDocument();
  });

  it('fires onClose from the ✕ button', () => {
    const onClose = vi.fn();
    renderPanel({ onClose });
    fireEvent.click(screen.getByTestId('floating-panel-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('anchors right-center by default', () => {
    renderPanel();
    // width 0 in jsdom → x = innerWidth - 0 - margin.
    expect(panelStyle().left).toBe(`${VW - MARGIN}px`);
    expect(panelStyle().top).toBe(`${VH / 2}px`);
  });

  it('anchors left-center when requested', () => {
    renderPanel({ defaultPosition: 'left-center' });
    expect(panelStyle().left).toBe(`${MARGIN}px`);
    expect(panelStyle().top).toBe(`${VH / 2}px`);
  });

  it.each([
    ['top-left', 16, 16],
    ['top-right', 1008, 16],
    ['left-center', 16, 384],
    ['right-center', 1008, 384],
    ['bottom-left', 16, 752],
    ['bottom-right', 1008, 752],
  ] as const)('places the panel at the %s anchor', (anchor, x, y) => {
    renderPanel({ defaultPosition: anchor });
    expect(panelStyle().left).toBe(`${x}px`);
    expect(panelStyle().top).toBe(`${y}px`);
  });

  it('honors an explicit {x, y} defaultPosition (clamped)', () => {
    renderPanel({ defaultPosition: { x: 200, y: 300 } });
    expect(panelStyle().left).toBe('200px');
    expect(panelStyle().top).toBe('300px');
  });

  it('clamps an offscreen {x, y} defaultPosition into the viewport', () => {
    renderPanel({ defaultPosition: { x: -500, y: 99_999 } });
    expect(panelStyle().left).toBe(`${MARGIN}px`);
    expect(panelStyle().top).toBe(`${VH - MARGIN}px`);
  });

  it('drag on the header moves the panel by the pointer delta', () => {
    renderPanel({ defaultPosition: { x: 400, y: 300 } });
    dragHeader(-40, -60);
    expect(panelStyle().left).toBe('360px');
    expect(panelStyle().top).toBe('240px');
  });

  it('clamps the position while dragging', () => {
    renderPanel({ defaultPosition: { x: 400, y: 300 } });
    dragHeader(-2000, -2000);
    expect(panelStyle().left).toBe(`${MARGIN}px`);
    expect(panelStyle().top).toBe(`${MARGIN}px`);
  });

  it('a pointer-down on the close button does not start a drag', () => {
    renderPanel({ defaultPosition: { x: 400, y: 300 } });
    const close = screen.getByTestId('floating-panel-close');
    fireEvent.pointerDown(close, { clientX: 100, clientY: 100, pointerType: 'mouse', button: 0 });
    fireEvent.pointerMove(document, { clientX: 50, clientY: 50 });
    fireEvent.pointerUp(document);
    expect(panelStyle().left).toBe('400px');
    expect(panelStyle().top).toBe('300px');
  });

  it('does not touch localStorage when persistKey is omitted', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    try {
      renderPanel({ defaultPosition: { x: 400, y: 300 } });
      dragHeader(-40, -60);
      expect(setItem).not.toHaveBeenCalled();
    } finally {
      setItem.mockRestore();
    }
  });

  it('falls back to the anchor when the persisted value is malformed', () => {
    window.localStorage.setItem('fp-test', 'not json at all');
    renderPanel({ persistKey: 'fp-test', defaultPosition: 'left-center' });
    expect(panelStyle().left).toBe(`${MARGIN}px`);
  });

  it('falls back to the anchor on an unknown storage version', () => {
    window.localStorage.setItem('fp-test', JSON.stringify({ v: 99, anchor: 'top-left', dx: 0, dy: 0 }));
    renderPanel({ persistKey: 'fp-test', defaultPosition: 'left-center' });
    expect(panelStyle().left).toBe(`${MARGIN}px`);
  });

  it('falls back to the anchor when the persisted anchor name is unknown', () => {
    window.localStorage.setItem('fp-test', JSON.stringify({ v: 2, anchor: 'middle-of-nowhere', dx: 0, dy: 0 }));
    renderPanel({ persistKey: 'fp-test', defaultPosition: 'left-center' });
    expect(panelStyle().left).toBe(`${MARGIN}px`);
  });

  it('defaults to dark call-chrome styling and honors tone="light"', () => {
    const first = renderPanel();
    // `bg-call-chrome`, NOT `bg-surface-inverse`. This assertion used to
    // pin the bug in place: surface-inverse FLIPS with the theme, so under
    // [data-theme="dark"] it resolved to #f8fafc and this permanently-dark
    // panel — whose children are all `text-white/80` — went white-on-white.
    // The invariant token resolves to the same #0f172a surface-inverse gave
    // in light mode, so the rendered result is unchanged there.
    expect((screen.getByTestId('floating-panel') as HTMLElement).className).toContain('bg-call-chrome');
    first.unmount();

    renderPanel({ tone: 'light' });
    expect((screen.getByTestId('floating-panel') as HTMLElement).className).toContain('bg-surface-panel');
  });

  it('applies width/height/z-index class defaults and overrides', () => {
    const first = renderPanel();
    const root = screen.getByTestId('floating-panel') as HTMLElement;
    expect(root.className).toContain('w-80');
    expect(root.className).toContain('h-[28rem]');
    expect(root.className).toContain('z-[9999]');
    first.unmount();

    renderPanel({ widthClassName: 'w-96', heightClassName: 'h-64', zIndexClassName: 'z-40' });
    const overridden = screen.getByTestId('floating-panel') as HTMLElement;
    expect(overridden.className).toContain('w-96');
    expect(overridden.className).toContain('h-64');
    expect(overridden.className).toContain('z-40');
  });

  it('exposes a fill-height body slot for hosted tools', () => {
    renderPanel();
    const body = screen.getByTestId('floating-panel-body') as HTMLElement;
    expect(body.className).toContain('min-h-0');
    expect(body.className).toContain('flex-1');
    expect(body.className).toContain('overflow-hidden');
    expect(body.contains(screen.getByTestId('panel-child'))).toBe(true);
  });

  // -------------------------------------------------------------------------
  // Snap zones
  // -------------------------------------------------------------------------
  describe('snap zones', () => {
    it('arms the nearest anchor and shows a drop target while dragging', () => {
      renderPanel({ defaultPosition: { x: 400, y: 300 } });
      // (400,300) → (30,30): within 24px of top-left (16,16) on both axes.
      dragHeaderTo(-370, -270);

      const target = screen.getByTestId('floating-panel-snap-target');
      expect(target).toHaveAttribute('data-anchor', 'top-left');
      expect(target.style.left).toBe('16px');
      expect(target.style.top).toBe('16px');
      expect(screen.getByTestId('floating-panel')).toHaveAttribute('data-snap-armed', 'top-left');

      releaseDrag();
    });

    it('snaps to the armed anchor on release', () => {
      renderPanel({ defaultPosition: { x: 400, y: 300 } });
      dragHeaderTo(-370, -270);
      expect(panelStyle().left).toBe('30px');
      releaseDrag();

      expect(panelStyle().left).toBe('16px');
      expect(panelStyle().top).toBe('16px');
      // Drop target is gone once the drag settles.
      expect(screen.queryByTestId('floating-panel-snap-target')).toBeNull();
    });

    it('arms an edge-midpoint anchor, not just corners', () => {
      renderPanel({ defaultPosition: { x: 400, y: 300 } });
      // (400,300) → (30,390): within 24px of left-center (16,384).
      dragHeaderTo(-370, 90);
      expect(screen.getByTestId('floating-panel-snap-target')).toHaveAttribute('data-anchor', 'left-center');
      releaseDrag();
      expect(panelStyle().left).toBe('16px');
      expect(panelStyle().top).toBe('384px');
    });

    it('applies a brief transition while snapping, then clears it', () => {
      vi.useFakeTimers();
      try {
        renderPanel({ defaultPosition: { x: 400, y: 300 } });
        dragHeaderTo(-370, -270);
        act(() => { releaseDrag(); });

        const root = screen.getByTestId('floating-panel') as HTMLElement;
        expect(root).toHaveAttribute('data-snapping', 'true');
        expect(root.className).toContain('transition-[left,top]');

        act(() => { vi.advanceTimersByTime(200); });
        expect(root).not.toHaveAttribute('data-snapping');
        expect(root.className).not.toContain('transition-[left,top]');
      } finally {
        vi.useRealTimers();
      }
    });

    it('does not arm anything outside the threshold', () => {
      renderPanel({ defaultPosition: { x: 400, y: 300 } });
      // (400,300) → (100,100): 84px from top-left, well outside 24.
      dragHeaderTo(-300, -200);
      expect(screen.queryByTestId('floating-panel-snap-target')).toBeNull();
      releaseDrag();
      expect(panelStyle().left).toBe('100px');
      expect(panelStyle().top).toBe('100px');
    });

    it('honors a widened snapThreshold', () => {
      renderPanel({ defaultPosition: { x: 400, y: 300 }, snapThreshold: 120 });
      dragHeaderTo(-300, -200); // (100,100), 84px from top-left
      expect(screen.getByTestId('floating-panel-snap-target')).toHaveAttribute('data-anchor', 'top-left');
      releaseDrag();
      expect(panelStyle().left).toBe('16px');
    });

    it('snapEnabled={false} restores free drag', () => {
      renderPanel({ defaultPosition: { x: 400, y: 300 }, snapEnabled: false });
      dragHeaderTo(-370, -270);
      expect(screen.queryByTestId('floating-panel-snap-target')).toBeNull();
      releaseDrag();
      expect(panelStyle().left).toBe('30px');
      expect(panelStyle().top).toBe('30px');
    });

    it('snapAnchors restricts which zones participate', () => {
      renderPanel({ defaultPosition: { x: 400, y: 300 }, snapAnchors: ['bottom-right'] });
      dragHeaderTo(-370, -270); // hugging top-left, which is not on the list
      expect(screen.queryByTestId('floating-panel-snap-target')).toBeNull();
      releaseDrag();
      expect(panelStyle().left).toBe('30px');
    });

    it('fires onSnap with the resolved anchor', () => {
      const onSnap = vi.fn();
      renderPanel({ defaultPosition: { x: 400, y: 300 }, onSnap });
      dragHeader(-370, -270);
      expect(onSnap).toHaveBeenCalledTimes(1);
      expect(onSnap).toHaveBeenCalledWith('top-left');
    });

    it('does not fire onSnap for a free drag', () => {
      const onSnap = vi.fn();
      renderPanel({ defaultPosition: { x: 400, y: 300 }, onSnap });
      dragHeader(-300, -200);
      expect(onSnap).not.toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------------------------
  // Anchor-based persistence
  // -------------------------------------------------------------------------
  describe('anchor persistence', () => {
    it('persists a snapped drag as the anchor with a zero offset', () => {
      renderPanel({ persistKey: 'fp-test', defaultPosition: { x: 400, y: 300 } });
      dragHeader(-370, -270);
      expect(JSON.parse(window.localStorage.getItem('fp-test')!))
        .toEqual({ v: 2, anchor: 'top-left', dx: 0, dy: 0 });
    });

    it('persists a free drag as the NEAREST anchor plus an offset', () => {
      renderPanel({ persistKey: 'fp-test', defaultPosition: { x: 400, y: 300 } });
      dragHeader(-40, -60); // → (360, 240); nearest anchor is left-center (16, 384)
      expect(JSON.parse(window.localStorage.getItem('fp-test')!))
        .toEqual({ v: 2, anchor: 'left-center', dx: 344, dy: -144 });
    });

    it('restores an anchored position on mount', () => {
      window.localStorage.setItem('fp-test', JSON.stringify({ v: 2, anchor: 'bottom-left', dx: 4, dy: -10 }));
      renderPanel({ persistKey: 'fp-test', defaultPosition: 'right-center' });
      expect(panelStyle().left).toBe('20px');
      expect(panelStyle().top).toBe('742px');
    });

    // THE point of anchor persistence: the stored anchor re-resolves
    // against whatever viewport exists NOW. Raw pixels would leave the
    // panel stranded mid-screen on a bigger display (and off-screen on a
    // smaller one).
    it('re-resolves the anchor against a LARGER viewport than the one it was saved on', () => {
      window.localStorage.setItem('fp-test', JSON.stringify({ v: 2, anchor: 'right-center', dx: 0, dy: 0 }));
      setViewport(1600, 1200);
      renderPanel({ persistKey: 'fp-test' });
      // Raw-pixel persistence would have parked this at 1008/384 — adrift
      // in the middle of a 1600px-wide screen instead of hugging the edge.
      expect(panelStyle().left).toBe('1584px');
      expect(panelStyle().top).toBe('600px');
    });

    it('re-resolves the anchor against a SMALLER viewport', () => {
      window.localStorage.setItem('fp-test', JSON.stringify({ v: 2, anchor: 'bottom-right', dx: 0, dy: 0 }));
      setViewport(640, 480);
      renderPanel({ persistKey: 'fp-test' });
      expect(panelStyle().left).toBe('624px');
      expect(panelStyle().top).toBe('464px');
    });

    it('clamps a restored anchor+offset fully on-screen', () => {
      window.localStorage.setItem('fp-test', JSON.stringify({ v: 2, anchor: 'top-left', dx: 9000, dy: 9000 }));
      renderPanel({ persistKey: 'fp-test' });
      expect(panelStyle().left).toBe(`${VW - MARGIN}px`);
      expect(panelStyle().top).toBe(`${VH - MARGIN}px`);
    });

    it('migrates a v1 raw-pixel payload instead of discarding it', () => {
      // v1 wrote raw viewport coordinates. (900, 700) is hugging the
      // bottom-right; the migration must keep the panel there, not fall
      // back to the default anchor.
      window.localStorage.setItem('fp-test', JSON.stringify({ v: 1, x: 900, y: 700 }));
      renderPanel({ persistKey: 'fp-test', defaultPosition: 'left-center' });

      expect(panelStyle().left).toBe('900px');
      expect(panelStyle().top).toBe('700px');
      // …and it is rewritten in place, so the next session is anchored.
      expect(JSON.parse(window.localStorage.getItem('fp-test')!))
        .toEqual({ v: 2, anchor: 'bottom-right', dx: -108, dy: -52 });
    });

    it('clamps a v1 payload saved on a bigger display before migrating it', () => {
      window.localStorage.setItem('fp-test', JSON.stringify({ v: 1, x: 5000, y: 5000 }));
      renderPanel({ persistKey: 'fp-test' });
      expect(panelStyle().left).toBe(`${VW - MARGIN}px`);
      expect(panelStyle().top).toBe(`${VH - MARGIN}px`);
      expect(JSON.parse(window.localStorage.getItem('fp-test')!))
        .toEqual({ v: 2, anchor: 'bottom-right', dx: 0, dy: 0 });
    });

    it('resolveAnchorPosition is exported and matches the rendered placement', () => {
      expect(resolveAnchorPosition('bottom-right', 0, 0)).toEqual({ x: 1008, y: 752 });
      expect(resolveAnchorPosition('top-left', 0, 0)).toEqual({ x: 16, y: 16 });
      // Panel size participates: a 300×200 panel sits 300px further left.
      expect(resolveAnchorPosition('bottom-right', 300, 200)).toEqual({ x: 708, y: 552 });
    });
  });

  // -------------------------------------------------------------------------
  // Focus to front
  // -------------------------------------------------------------------------
  describe('focus to front', () => {
    function renderTwo() {
      return render(
        <>
          <FloatingPanel open onClose={vi.fn()} title="Chat" data-testid="panel-a">
            <div />
          </FloatingPanel>
          <FloatingPanel open onClose={vi.fn()} title="Transcript" data-testid="panel-b">
            <div />
          </FloatingPanel>
        </>,
      );
    }

    it('leaves the z-index to the class until a panel is interacted with', () => {
      renderTwo();
      expect(panelStyle('panel-a').zIndex).toBe('');
      expect(panelStyle('panel-b').zIndex).toBe('');
    });

    it('raises the clicked panel above its sibling', () => {
      renderTwo();
      fireEvent.pointerDown(screen.getByTestId('panel-a'));
      fireEvent.pointerDown(screen.getByTestId('panel-b'));

      const a = Number(panelStyle('panel-a').zIndex);
      const b = Number(panelStyle('panel-b').zIndex);
      expect(b).toBeGreaterThan(a);

      // Clicking A again puts it back on top.
      fireEvent.pointerDown(screen.getByTestId('panel-a'));
      expect(Number(panelStyle('panel-a').zIndex)).toBeGreaterThan(b);
    });

    it('raises on keyboard focus, not only on pointer input', () => {
      renderTwo();
      fireEvent.pointerDown(screen.getByTestId('panel-b'));
      const before = Number(panelStyle('panel-b').zIndex);

      fireEvent.focus(screen.getByTestId('panel-a'));
      expect(Number(panelStyle('panel-a').zIndex)).toBeGreaterThan(before);
    });

    it('starting a drag raises the panel too', () => {
      renderTwo();
      fireEvent.pointerDown(screen.getByTestId('panel-b'));
      const before = Number(panelStyle('panel-b').zIndex);

      const headerA = screen.getAllByTestId('floating-panel-header')[0]!;
      fireEvent.pointerDown(headerA, { clientX: 100, clientY: 100, pointerType: 'mouse', button: 0 });
      fireEvent.pointerUp(document);
      expect(Number(panelStyle('panel-a').zIndex)).toBeGreaterThan(before);
    });

    it('a repeated click on the already-top panel does not keep bumping z', () => {
      renderTwo();
      fireEvent.pointerDown(screen.getByTestId('panel-a'));
      const first = panelStyle('panel-a').zIndex;
      fireEvent.pointerDown(screen.getByTestId('panel-a'));
      expect(panelStyle('panel-a').zIndex).toBe(first);
    });

    it('raises above baseZIndex when one is supplied', () => {
      render(
        <FloatingPanel open onClose={vi.fn()} title="Chat" baseZIndex={40} zIndexClassName="z-40">
          <div />
        </FloatingPanel>,
      );
      fireEvent.pointerDown(screen.getByTestId('floating-panel'));
      expect(Number(panelStyle().zIndex)).toBeGreaterThan(40);
      expect(Number(panelStyle().zIndex)).toBeLessThan(9999);
    });
  });

  // -------------------------------------------------------------------------
  // Accessibility
  // -------------------------------------------------------------------------
  describe('accessibility', () => {
    it('announces the drag handle as a labelled button', () => {
      renderPanel();
      const header = screen.getByTestId('floating-panel-header');
      expect(header).toHaveAttribute('role', 'button');
      expect(header).toHaveAttribute('aria-label', 'Move Chat panel');
      expect(header).toHaveAttribute('tabindex', '0');
    });

    it('nudges the panel with the arrow keys and persists the result', () => {
      renderPanel({ persistKey: 'fp-test', defaultPosition: { x: 400, y: 300 } });
      const header = screen.getByTestId('floating-panel-header');
      fireEvent.keyDown(header, { key: 'ArrowRight' });
      expect(panelStyle().left).toBe('412px');
      fireEvent.keyDown(header, { key: 'ArrowUp', shiftKey: true });
      expect(panelStyle().top).toBe('299px');
      expect(JSON.parse(window.localStorage.getItem('fp-test')!).v).toBe(2);
    });

    it('does not trap focus: Escape is not swallowed and focus can leave', () => {
      const onClose = vi.fn();
      render(
        <>
          <button data-testid="outside">outside</button>
          <FloatingPanel open onClose={onClose} title="Chat">
            <button data-testid="inside">inside</button>
          </FloatingPanel>
        </>,
      );

      const escapeOnDocument = vi.fn();
      document.addEventListener('keydown', escapeOnDocument);
      try {
        const inside = screen.getByTestId('inside');
        inside.focus();
        expect(document.activeElement).toBe(inside);

        // Escape bubbles to the document — the host owns the close
        // gesture — and the panel does not close itself or re-grab focus.
        fireEvent.keyDown(inside, { key: 'Escape' });
        expect(escapeOnDocument).toHaveBeenCalledTimes(1);
        expect(onClose).not.toHaveBeenCalled();

        const outside = screen.getByTestId('outside');
        outside.focus();
        expect(document.activeElement).toBe(outside);
      } finally {
        document.removeEventListener('keydown', escapeOnDocument);
      }
    });
  });
});

describe('FloatingPanel viewport resize', () => {
  beforeEach(() => {
    window.localStorage.clear();
    setViewport(VW, VH);
  });

  it('re-clamps a default point into a smaller window', () => {
    renderPanel({ defaultPosition: { x: 100, y: 700 } });
    expect(panelStyle().top).toBe('700px');
    act(() => { setViewport(VW, 400); window.dispatchEvent(new Event('resize')); });
    expect(panelStyle().top).toBe('384px');
  });

  it('re-resolves an anchor placement until the panel has been moved', () => {
    renderPanel({ defaultPosition: 'bottom-right' });
    expect(panelStyle().top).toBe(`${VH - MARGIN}px`);
    act(() => { setViewport(800, 500); window.dispatchEvent(new Event('resize')); });
    expect(panelStyle().top).toBe(`${500 - MARGIN}px`);
    expect(panelStyle().left).toBe(`${800 - MARGIN}px`);
  });

  it('only clamps, not re-anchors, after the person dragged it', () => {
    renderPanel({ defaultPosition: 'top-left', snapEnabled: false });
    dragHeader(0, 300);
    expect(panelStyle().top).toBe('316px');
    act(() => { setViewport(VW, 600); window.dispatchEvent(new Event('resize')); });
    expect(panelStyle().top).toBe('316px');
    act(() => { setViewport(VW, 200); window.dispatchEvent(new Event('resize')); });
    expect(panelStyle().top).toBe('184px');
  });
});
