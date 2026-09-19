import { vi } from 'vitest';
import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CallWidget } from '../CallWidget';
import FloatingDockBar from '../../doc-editor/FloatingDockBar';

// Floating calls use mouse dragging from both header and grip. Drive that
// gesture through the page's ghost target; native drag payload tests alone
// cannot prove that a user can reveal and reach the destination.

const TARGETS = [{ id: 'doc-dock', label: 'This document' }];

/** jsdom gives every element a zero rect; overlap tests need real numbers. */
function stubRect(el: Element, r: { left: number; top: number; width: number; height: number }) {
  const rect = { ...r, right: r.left + r.width, bottom: r.top + r.height, x: r.left, y: r.top };
  el.getBoundingClientRect = () => ({ ...rect, toJSON: () => rect }) as DOMRect;
}

/** A stand-in for the document's VideoDockSlot, at a known place on screen. */
function mountDock(rect: { left: number; top: number; width: number; height: number }) {
  const el = document.createElement('div');
  el.dataset.callDockTarget = 'doc-dock';
  document.body.appendChild(el);
  stubRect(el, rect);
  return el;
}

function renderWidget(onDockTo: (id: string | null) => void) {
  render(
    <CallWidget
      state="active"
      mode="audio"
      participants={[]}
      draggable
      dockTargets={TARGETS}
      activeDockId={null}
      onDockTo={onDockTo}
      dataAttrs={{ 'data-call-id': 'call-42' }}
    />,
  );
  return screen.getByTestId('call-widget');
}

/** Grab the header, move over `to`, release. The whole gesture, as a user does it. */
function dragBodyTo(widget: HTMLElement, overlap: { left: number; top: number }) {
  fireEvent.mouseDown(screen.getByTestId('call-widget-title'), { clientX: 0, clientY: 0 });
  stubRect(widget, { ...overlap, width: 240, height: 160 });
  fireEvent.mouseMove(document, { clientX: 300, clientY: 300 });
}

describe('CallWidget — docking by dragging the widget body', () => {
  afterEach(() => {
    document.querySelectorAll('[data-call-dock-target]').forEach((el) => el.remove());
  });

  it('reveals the bottom dock and lands there when dragged by the visible grip', () => {
    const onDockTo = vi.fn();
    function Page() {
      const [dragging, setDragging] = useState(false);
      return <>
        <CallWidget state="active" mode="audio" participants={[]}
          dockTargets={TARGETS} onDockTo={onDockTo} onDragStateChange={setDragging} />
        <FloatingDockBar docked={false} ghost={dragging} dockId="doc-dock">
          <div />
        </FloatingDockBar>
      </>;
    }
    render(<Page />);
    expect(screen.queryByTestId('floating-dock-bar-ghost')).toBeNull();
    const grip = screen.getByTestId('call-dock-drag-handle');
    expect(grip).not.toHaveAttribute('draggable', 'true');
    fireEvent.mouseDown(grip, { clientX: 10, clientY: 10 });
    const ghost = screen.getByTestId('floating-dock-bar-ghost');
    const target = ghost.querySelector('[data-call-dock-target]')!;
    stubRect(target, { left: 100, top: 500, width: 768, height: 112 });
    stubRect(screen.getByTestId('call-widget'), { left: 300, top: 350, width: 320, height: 288 });
    fireEvent.mouseMove(document, { clientX: 300, clientY: 350 });
    fireEvent.mouseUp(document);
    expect(onDockTo).toHaveBeenCalledWith('doc-dock');
    expect(screen.queryByTestId('floating-dock-bar-ghost')).toBeNull();
  });

  it('docks when released over a slot', () => {
    const onDockTo = vi.fn();
    const widget = renderWidget(onDockTo);
    mountDock({ left: 100, top: 100, width: 240, height: 160 });

    dragBodyTo(widget, { left: 100, top: 100 });
    fireEvent.mouseUp(document);

    expect(onDockTo).toHaveBeenCalledWith('doc-dock');
  });

  it('clears the free-drag offset on docking, so the widget is not pushed out of its new frame', () => {
    const widget = renderWidget(vi.fn());
    mountDock({ left: 100, top: 100, width: 240, height: 160 });

    dragBodyTo(widget, { left: 100, top: 100 });
    fireEvent.mouseUp(document);

    expect(widget.style.transform).toBe('translate(0px, 0px)');
  });

  it('lights the slot up while the widget covers it, and unlights it on release', () => {
    const widget = renderWidget(vi.fn());
    const dock = mountDock({ left: 100, top: 100, width: 240, height: 160 });

    dragBodyTo(widget, { left: 100, top: 100 });
    expect(dock.dataset.pointerOver).toBe('true');

    fireEvent.mouseUp(document);
    expect(dock.dataset.pointerOver).toBeUndefined();
  });

  // Docking relocates the call; it should take a deliberate move, not a widget
  // parked with one corner grazing the gutter.
  it('ignores a grazing overlap', () => {
    const onDockTo = vi.fn();
    const widget = renderWidget(onDockTo);
    mountDock({ left: 100, top: 100, width: 240, height: 160 });

    // 20x20 of a 240x160 slot — well under the quarter-area floor.
    dragBodyTo(widget, { left: 320, top: 240 });
    fireEvent.mouseUp(document);

    expect(onDockTo).not.toHaveBeenCalled();
  });

  it('leaves the widget free-dragging when it is released over nothing', () => {
    const onDockTo = vi.fn();
    const widget = renderWidget(onDockTo);
    mountDock({ left: 1000, top: 1000, width: 240, height: 160 });

    dragBodyTo(widget, { left: 0, top: 0 });
    fireEvent.mouseUp(document);

    expect(onDockTo).not.toHaveBeenCalled();
  });

  // A modal is a task you are doing; a call is a connection you must always be
  // able to end. The widget sat at z-9999 and Modal defaults to 10000, so ANY
  // dialog in the app buried the live call — "End call" was visible through
  // the scrim and refused every click, the backdrop taking them instead.
  it('docks above the modal layer', () => {
    const dock = renderWidget(() => {});
    const stacked = dock.closest('[class*="z-["]') ?? dock;
    const z = /z-\[(\d+)\]/.exec(stacked.className.toString());
    expect(z).not.toBeNull();
    expect(Number(z![1])).toBeGreaterThan(10000); // Modal's default backdrop
  });
});
