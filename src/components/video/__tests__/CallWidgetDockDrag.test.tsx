import { vi } from 'vitest';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { CallWidget, CALL_DOCK_DRAG_TYPE } from '../CallWidget';
import type { CallDockDragPayload } from '../CallWidget';

// The DRAG SOURCE half of "contextual video": the floating call can be handed
// to the page (a gutter slot) instead of hovering over it. The drop half lives
// with the document chrome; the contract between them is the dataTransfer key
// asserted below, so these tests pin it deliberately.

const TARGETS = [
  { id: 'gutter-1', label: 'Beside “Rollout plan”' },
  { id: 'gutter-2', label: 'Beside “Risks”' },
];

function renderWidget(props: Partial<React.ComponentProps<typeof CallWidget>> = {}) {
  return render(
    <CallWidget
      state="active"
      mode="audio"
      participants={[]}
      dataAttrs={{ 'data-call-id': 'call-42' }}
      {...props}
    />,
  );
}

/** A dataTransfer stand-in — jsdom has no DragEvent plumbing of its own. */
function dragStartWith(el: Element) {
  const dataTransfer = {
    setData: vi.fn(),
    effectAllowed: 'none',
  };
  const event = createEvent.dragStart(el);
  Object.defineProperty(event, 'dataTransfer', { value: dataTransfer });
  fireEvent(el, event);
  return dataTransfer;
}

/** Grab `el` and move the pointer — the widget's existing free-drag gesture. */
function freeDrag(el: Element, dx: number, dy: number) {
  fireEvent.mouseDown(el, { clientX: 0, clientY: 0 });
  fireEvent.mouseMove(document, { clientX: dx, clientY: dy });
}

describe('CallWidget — page docking is opt-in', () => {
  // The regression guard: everything below is additive, and a host that never
  // heard of docking must get the widget it had before.
  it('renders no dock affordances without dockTargets', () => {
    renderWidget();
    expect(screen.queryByTestId('call-dock-drag-handle')).toBeNull();
    expect(screen.queryByTestId('call-dock-menu-button')).toBeNull();
  });

  it('still free-drags from the header without dockTargets', () => {
    renderWidget();
    const widget = screen.getByTestId('call-widget');
    expect(widget.style.transform).toBe('translate(0px, 0px)');

    freeDrag(screen.getByTestId('call-widget-title'), 40, 25);

    expect(widget.style.transform).toBe('translate(40px, 25px)');
    // And the snap-back affordance the offset unlocks is back too.
    expect(screen.getByLabelText('Snap back to corner')).toBeInTheDocument();
  });

  it('keeps free-dragging while dock targets exist but nothing is docked', () => {
    renderWidget({ dockTargets: TARGETS, activeDockId: null });
    const widget = screen.getByTestId('call-widget');

    freeDrag(screen.getByTestId('call-widget-title'), 30, 10);

    expect(widget.style.transform).toBe('translate(30px, 10px)');
  });
});

describe('CallWidget — dock drag source', () => {
  it('stamps the call under the dock mime key on dragstart', () => {
    renderWidget({ dockTargets: TARGETS });

    const dataTransfer = dragStartWith(screen.getByTestId('call-dock-drag-handle'));

    expect(dataTransfer.setData).toHaveBeenCalledTimes(1);
    const [key, raw] = dataTransfer.setData.mock.calls[0];
    expect(key).toBe('application/x-call-dock');
    expect(key).toBe(CALL_DOCK_DRAG_TYPE);
    expect(JSON.parse(raw) as CallDockDragPayload).toEqual({
      callId: 'call-42',
      fromDockId: null,
    });
    expect(dataTransfer.effectAllowed).toBe('move');
  });

  it('reports the slot it is leaving when already docked', () => {
    renderWidget({ dockTargets: TARGETS, activeDockId: 'gutter-1' });

    const dataTransfer = dragStartWith(screen.getByTestId('call-dock-drag-handle'));

    expect(JSON.parse(dataTransfer.setData.mock.calls[0][1]).fromDockId).toBe('gutter-1');
  });

  it('does not set the key when nothing offers a dock', () => {
    renderWidget();
    // No grip at all — the header is the only other candidate, and it must
    // stay an inert free-drag handle.
    const dataTransfer = dragStartWith(screen.getByTestId('call-widget-title'));
    expect(dataTransfer.setData).not.toHaveBeenCalled();
  });
});

describe('CallWidget — "Move to…" menu (the keyboard path)', () => {
  it('never offers a menu of destinations: the places are on the page', () => {
    renderWidget({ dockTargets: TARGETS, onDockTo: vi.fn() });
    expect(screen.queryByTestId('call-dock-menu-button')).toBeNull();
  });

  it('tells the page when a free-drag starts and ends', () => {
    const onDragStateChange = vi.fn();
    renderWidget({ dockTargets: TARGETS, onDockTo: vi.fn(), onDragStateChange });
    onDragStateChange.mockClear();
    freeDrag(screen.getByTestId('call-widget-title'), 40, 40);
    expect(onDragStateChange).toHaveBeenLastCalledWith(true);
    fireEvent.mouseUp(document);
    expect(onDragStateChange).toHaveBeenLastCalledWith(false);
  });

  it('does not free-drag while docked', () => {
    renderWidget({ dockTargets: TARGETS, activeDockId: 'gutter-1' });
    const widget = screen.getByTestId('call-widget');

    freeDrag(screen.getByTestId('call-widget-title'), 60, 60);

    // No offset transform at all — the slot owns the position now.
    expect(widget.style.transform).toBe('');
    expect(screen.queryByLabelText('Snap back to corner')).toBeNull();
  });

  it('drops the floating placement and stamps the slot it lives in', () => {
    renderWidget({ dockTargets: TARGETS, activeDockId: 'gutter-2' });
    const widget = screen.getByTestId('call-widget');

    expect(widget).toHaveAttribute('data-call-dock-id', 'gutter-2');
    expect(widget.className).toContain('relative');
    expect(widget.className).not.toContain('fixed');
  });

  it('free-drags again after popping out', () => {
    const { rerender } = renderWidget({ dockTargets: TARGETS, activeDockId: 'gutter-1' });

    rerender(
      <CallWidget
        state="active"
        mode="audio"
        participants={[]}
        dockTargets={TARGETS}
        activeDockId={null}
      />,
    );

    const widget = screen.getByTestId('call-widget');
    freeDrag(screen.getByTestId('call-widget-title'), 15, 5);
    expect(widget.style.transform).toBe('translate(15px, 5px)');
  });
});
