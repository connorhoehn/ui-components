// src/components/pipelines/vision/__tests__/BBoxAuthoringCanvas.test.tsx
//
// Component-level tests for BBoxAuthoringCanvas.
//
// pointer-down + pointer-move + pointer-up sequences simulate drag gestures.
// jsdom doesn't support getBoundingClientRect() natively so we mock it to
// return a 200x200 rect starting at (0, 0).

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BBoxAuthoringCanvas } from '../BBoxAuthoringCanvas';
import type { AuthoringBBox } from '../../../../types/pipeline';

// ── jsdom getBoundingClientRect stub ─────────────────────────────────

beforeEach(() => {
  // All elements report a 200×200 rect at origin for simplicity.
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
    left: 0, top: 0,
    width: 200, height: 200,
    right: 200, bottom: 200,
    x: 0, y: 0,
    toJSON: () => ({}),
  } as DOMRect);

  // setPointerCapture is not implemented in jsdom.
  Element.prototype.setPointerCapture = vi.fn();
});

// ── Helpers ───────────────────────────────────────────────────────────

function box(id: string, overrides?: Partial<AuthoringBBox>): AuthoringBBox {
  return { id, x: 10, y: 10, width: 100, height: 80, label: 'test', ...overrides };
}

type PointerOpts = { clientX: number; clientY: number; pointerId?: number };

function pdown(el: Element, opts: PointerOpts) {
  fireEvent.pointerDown(el, { button: 0, ...opts, pointerId: opts.pointerId ?? 1 });
}

function pmove(el: Element, opts: PointerOpts) {
  fireEvent.pointerMove(el, { ...opts, pointerId: opts.pointerId ?? 1 });
}

function pup(el: Element, opts: PointerOpts) {
  fireEvent.pointerUp(el, { ...opts, pointerId: opts.pointerId ?? 1 });
}

// ── Render tests ──────────────────────────────────────────────────────

describe('BBoxAuthoringCanvas — render', () => {
  it('renders with zero boxes and no crash', () => {
    const { container } = render(
      <BBoxAuthoringCanvas
        imageUrl="https://example.com/img.jpg"
        imageWidth={800}
        imageHeight={600}
        boxes={[]}
        onChange={vi.fn()}
      />,
    );
    expect(container.querySelector('img')).not.toBeNull();
  });

  it('renders provided boxes with their labels', () => {
    render(
      <BBoxAuthoringCanvas
        imageUrl="https://example.com/img.jpg"
        imageWidth={800}
        imageHeight={600}
        boxes={[box('a', { label: 'face' }), box('b', { label: 'badge' })]}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText('face')).toBeInTheDocument();
    expect(screen.getByText('badge')).toBeInTheDocument();
  });

  it('shows "Unlabeled" for boxes without a label', () => {
    render(
      <BBoxAuthoringCanvas
        imageUrl=""
        imageWidth={200}
        imageHeight={200}
        boxes={[{ id: 'no-label', x: 5, y: 5, width: 50, height: 50 }]}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText('Unlabeled')).toBeInTheDocument();
  });

  it('does not render corner handles in readOnly mode', () => {
    const { container } = render(
      <BBoxAuthoringCanvas
        imageUrl=""
        imageWidth={200}
        imageHeight={200}
        boxes={[box('a')]}
        onChange={vi.fn()}
        readOnly
      />,
    );
    const handles = container.querySelectorAll('[aria-label^="Resize"]');
    expect(handles.length).toBe(0);
  });
});

// ── Drag-to-create tests ───────────────────────────────────────────────

describe('BBoxAuthoringCanvas — drag to create box', () => {
  it('calls onChange with a new box after pointer-down + move + up on empty area', () => {
    const onChange = vi.fn();
    const { container } = render(
      <BBoxAuthoringCanvas
        imageUrl=""
        imageWidth={200}
        imageHeight={200}
        boxes={[]}
        onChange={onChange}
      />,
    );

    // The overlay div is the second child of the container's first div.
    const overlay = container.querySelector('[aria-label="Bounding box authoring canvas"] div') as HTMLDivElement;
    expect(overlay).not.toBeNull();

    // Drag from (20,20) to (100,100) — in container px, maps 1:1 to image px since
    // the mock rect is 200x200 and imageWidth/imageHeight are both 200.
    pdown(overlay, { clientX: 20, clientY: 20 });
    pmove(overlay, { clientX: 100, clientY: 100 });
    pup(overlay, { clientX: 100, clientY: 100 });

    expect(onChange).toHaveBeenCalledTimes(1);
    const [newBoxes] = onChange.mock.calls[0] as [AuthoringBBox[]];
    expect(newBoxes).toHaveLength(1);
    const created = newBoxes[0];
    expect(created.x).toBeCloseTo(20);
    expect(created.y).toBeCloseTo(20);
    expect(created.width).toBeCloseTo(80);
    expect(created.height).toBeCloseTo(80);
    expect(created.id).toBeDefined();
  });

  it('does not fire onChange for a tiny click (< 4px)', () => {
    const onChange = vi.fn();
    const { container } = render(
      <BBoxAuthoringCanvas
        imageUrl=""
        imageWidth={200}
        imageHeight={200}
        boxes={[]}
        onChange={onChange}
      />,
    );
    const overlay = container.querySelector('[aria-label="Bounding box authoring canvas"] div') as HTMLDivElement;
    pdown(overlay, { clientX: 50, clientY: 50 });
    pmove(overlay, { clientX: 52, clientY: 52 });
    pup(overlay, { clientX: 52, clientY: 52 });
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ── Move tests ────────────────────────────────────────────────────────

describe('BBoxAuthoringCanvas — move box', () => {
  it('calls onChange with updated x/y when dragging inside an existing box', () => {
    const onChange = vi.fn();
    // Box occupies image px (50,50) → (150,130) in a 200x200 image.
    const existingBox: AuthoringBBox = { id: 'mv', x: 50, y: 50, width: 100, height: 80 };
    const { container } = render(
      <BBoxAuthoringCanvas
        imageUrl=""
        imageWidth={200}
        imageHeight={200}
        boxes={[existingBox]}
        onChange={onChange}
      />,
    );
    // Container px == image px (200x200 both ways).
    // Click inside the box at (80,80), drag to (110,110).
    const overlay = container.querySelector('[aria-label="Bounding box authoring canvas"] div') as HTMLDivElement;
    pdown(overlay, { clientX: 80, clientY: 80 });
    pmove(overlay, { clientX: 110, clientY: 110 });
    pup(overlay, { clientX: 110, clientY: 110 });

    expect(onChange).toHaveBeenCalledTimes(1);
    const [moved] = onChange.mock.calls[0] as [AuthoringBBox[]];
    const mv = moved.find((b) => b.id === 'mv');
    // offset at click was (80-50, 80-50) = (30,30), drag to (110,110)
    // new position: (110-30, 110-30) = (80,80)
    expect(mv?.x).toBeCloseTo(80);
    expect(mv?.y).toBeCloseTo(80);
  });
});

// ── Delete tests ──────────────────────────────────────────────────────

describe('BBoxAuthoringCanvas — delete box', () => {
  it('calls onChange without the box after Delete key on label button', () => {
    const onChange = vi.fn();
    render(
      <BBoxAuthoringCanvas
        imageUrl=""
        imageWidth={200}
        imageHeight={200}
        boxes={[box('del', { label: 'remove me' })]}
        onChange={onChange}
      />,
    );
    const labelBtn = screen.getByText('remove me');
    fireEvent.keyDown(labelBtn, { key: 'Delete' });

    expect(onChange).toHaveBeenCalledTimes(1);
    const [next] = onChange.mock.calls[0] as [AuthoringBBox[]];
    expect(next).toHaveLength(0);
  });

  it('calls onChange without the box after right-click on label button', () => {
    const onChange = vi.fn();
    render(
      <BBoxAuthoringCanvas
        imageUrl=""
        imageWidth={200}
        imageHeight={200}
        boxes={[box('ctx', { label: 'ctx box' })]}
        onChange={onChange}
      />,
    );
    const labelBtn = screen.getByText('ctx box');
    fireEvent.contextMenu(labelBtn);

    expect(onChange).toHaveBeenCalledTimes(1);
    const [next] = onChange.mock.calls[0] as [AuthoringBBox[]];
    expect(next).toHaveLength(0);
  });
});

// ── Label-edit tests ──────────────────────────────────────────────────

describe('BBoxAuthoringCanvas — inline label edit', () => {
  it('double-click on label shows an input', () => {
    const { container } = render(
      <BBoxAuthoringCanvas
        imageUrl=""
        imageWidth={200}
        imageHeight={200}
        boxes={[box('lbl', { label: 'original' })]}
        onChange={vi.fn()}
      />,
    );
    const labelBtn = screen.getByText('original');
    fireEvent.doubleClick(labelBtn);
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe('original');
  });

  it('typing in the input and pressing Enter fires onChange', () => {
    const onChange = vi.fn();
    const { container } = render(
      <BBoxAuthoringCanvas
        imageUrl=""
        imageWidth={200}
        imageHeight={200}
        boxes={[box('lbl2', { label: 'old' })]}
        onChange={onChange}
      />,
    );
    fireEvent.doubleClick(screen.getByText('old'));
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'new label' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).toHaveBeenCalledTimes(1);
    const [next] = onChange.mock.calls[0] as [AuthoringBBox[]];
    expect(next[0].label).toBe('new label');
  });
});

// ── readOnly tests ────────────────────────────────────────────────────

describe('BBoxAuthoringCanvas — readOnly', () => {
  it('drag does not fire onChange in readOnly mode', () => {
    const onChange = vi.fn();
    const { container } = render(
      <BBoxAuthoringCanvas
        imageUrl=""
        imageWidth={200}
        imageHeight={200}
        boxes={[]}
        onChange={onChange}
        readOnly
      />,
    );
    const overlay = container.querySelector('[aria-label="Bounding box authoring canvas"] div') as HTMLDivElement;
    // onPointerDown is undefined in readOnly, so no event handlers are attached
    pdown(overlay, { clientX: 10, clientY: 10 });
    pmove(overlay, { clientX: 80, clientY: 80 });
    pup(overlay, { clientX: 80, clientY: 80 });
    expect(onChange).not.toHaveBeenCalled();
  });
});
