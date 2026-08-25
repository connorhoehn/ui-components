import { fireEvent, render, screen } from '@testing-library/react';
import { FloatingPanel } from '../FloatingPanel';

// jsdom defaults: window.innerWidth = 1024, window.innerHeight = 768.
// getBoundingClientRect() returns all zeros, so the measured panel size is
// 0×0 — clamp bounds are therefore [16, 1008] horizontally and [16, 752]
// vertically in every test below.
const VW = 1024;
const VH = 768;
const MARGIN = 16;

function renderPanel(props: Partial<React.ComponentProps<typeof FloatingPanel>> = {}) {
  return render(
    <FloatingPanel open onClose={vi.fn()} title="Chat" {...props}>
      <div data-testid="panel-child">hello</div>
    </FloatingPanel>,
  );
}

function panelStyle(): CSSStyleDeclaration {
  return (screen.getByTestId('floating-panel') as HTMLElement).style;
}

function dragHeader(dx: number, dy: number, start = { x: 100, y: 100 }) {
  const header = screen.getByTestId('floating-panel-header');
  fireEvent.pointerDown(header, { clientX: start.x, clientY: start.y, pointerType: 'mouse', button: 0 });
  fireEvent.pointerMove(document, { clientX: start.x + dx, clientY: start.y + dy });
  fireEvent.pointerUp(document, { clientX: start.x + dx, clientY: start.y + dy });
}

describe('FloatingPanel', () => {
  beforeEach(() => {
    window.localStorage.clear();
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

  it('persists the position to localStorage on drag end when persistKey is set', () => {
    renderPanel({ persistKey: 'fp-test', defaultPosition: { x: 400, y: 300 } });
    dragHeader(-40, -60);
    const stored = JSON.parse(window.localStorage.getItem('fp-test')!);
    expect(stored).toEqual({ v: 1, x: 360, y: 240 });
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

  it('restores a persisted position on mount', () => {
    window.localStorage.setItem('fp-test', JSON.stringify({ v: 1, x: 222, y: 333 }));
    renderPanel({ persistKey: 'fp-test', defaultPosition: 'left-center' });
    expect(panelStyle().left).toBe('222px');
    expect(panelStyle().top).toBe('333px');
  });

  it('clamps a restored position back into the viewport', () => {
    // e.g. persisted on a bigger monitor, restored on a smaller one.
    window.localStorage.setItem('fp-test', JSON.stringify({ v: 1, x: 5000, y: 5000 }));
    renderPanel({ persistKey: 'fp-test' });
    expect(panelStyle().left).toBe(`${VW - MARGIN}px`);
    expect(panelStyle().top).toBe(`${VH - MARGIN}px`);
  });

  it('falls back to the anchor when the persisted value is malformed', () => {
    window.localStorage.setItem('fp-test', 'not json at all');
    renderPanel({ persistKey: 'fp-test', defaultPosition: 'left-center' });
    expect(panelStyle().left).toBe(`${MARGIN}px`);
  });

  it('falls back to the anchor on a storage version mismatch', () => {
    window.localStorage.setItem('fp-test', JSON.stringify({ v: 99, x: 222, y: 333 }));
    renderPanel({ persistKey: 'fp-test', defaultPosition: 'left-center' });
    expect(panelStyle().left).toBe(`${MARGIN}px`);
  });

  it('defaults to dark call-chrome styling and honors tone="light"', () => {
    const first = renderPanel();
    expect((screen.getByTestId('floating-panel') as HTMLElement).className).toContain('bg-surface-inverse');
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
});
