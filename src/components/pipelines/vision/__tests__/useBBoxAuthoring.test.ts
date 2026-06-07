// src/components/pipelines/vision/__tests__/useBBoxAuthoring.test.ts
//
// Pure-hook tests for useBBoxAuthoring state transitions + undo/redo.

import { describe, it, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useBBoxAuthoring } from '../useBBoxAuthoring';
import type { AuthoringBBox } from '../../../../types/pipeline';

// ── Fixtures ──────────────────────────────────────────────────────────

function box(id: string, overrides?: Partial<AuthoringBBox>): AuthoringBBox {
  return { id, x: 10, y: 10, width: 100, height: 80, ...overrides };
}

// ── Tests ──────────────────────────────────────────────────────────────

describe('useBBoxAuthoring — initial state', () => {
  it('returns the initial boxes unchanged', () => {
    const initial = [box('a'), box('b')];
    const { result } = renderHook(() =>
      useBBoxAuthoring(initial, vi.fn()),
    );
    expect(result.current.boxes).toEqual(initial);
  });

  it('canUndo and canRedo are both false initially', () => {
    const { result } = renderHook(() =>
      useBBoxAuthoring([], vi.fn()),
    );
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });
});

describe('useBBoxAuthoring — addBox', () => {
  it('appends a box and fires onChange', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useBBoxAuthoring([], onChange));

    act(() => {
      result.current.addBox(box('new-1'));
    });

    expect(result.current.boxes).toHaveLength(1);
    expect(result.current.boxes[0].id).toBe('new-1');
    expect(onChange).toHaveBeenCalledWith([box('new-1')]);
  });

  it('canUndo becomes true after addBox', () => {
    const { result } = renderHook(() => useBBoxAuthoring([], vi.fn()));
    act(() => { result.current.addBox(box('x')); });
    expect(result.current.canUndo).toBe(true);
  });

  it('multiple addBox calls accumulate on the stack', () => {
    const { result } = renderHook(() => useBBoxAuthoring([], vi.fn()));
    act(() => { result.current.addBox(box('a')); });
    act(() => { result.current.addBox(box('b')); });
    expect(result.current.boxes).toHaveLength(2);
  });
});

describe('useBBoxAuthoring — moveBox', () => {
  it('updates x/y of the target box', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useBBoxAuthoring([box('a', { x: 0, y: 0 })], onChange),
    );

    act(() => { result.current.moveBox('a', 50, 75); });

    expect(result.current.boxes[0].x).toBe(50);
    expect(result.current.boxes[0].y).toBe(75);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([expect.objectContaining({ id: 'a', x: 50, y: 75 })]),
    );
  });

  it('leaves other boxes untouched', () => {
    const { result } = renderHook(() =>
      useBBoxAuthoring([box('a'), box('b', { x: 200, y: 200 })], vi.fn()),
    );
    act(() => { result.current.moveBox('a', 5, 5); });
    expect(result.current.boxes.find((b) => b.id === 'b')?.x).toBe(200);
  });
});

describe('useBBoxAuthoring — resizeBox', () => {
  it('updates x/y/width/height of the target box', () => {
    const { result } = renderHook(() =>
      useBBoxAuthoring([box('r')], vi.fn()),
    );
    act(() => { result.current.resizeBox('r', 5, 10, 300, 200); });
    const updated = result.current.boxes[0];
    expect(updated).toMatchObject({ x: 5, y: 10, width: 300, height: 200 });
  });
});

describe('useBBoxAuthoring — setLabel', () => {
  it('updates the label of the target box', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useBBoxAuthoring([box('lbl', { label: '' })], onChange),
    );
    act(() => { result.current.setLabel('lbl', 'face'); });
    expect(result.current.boxes[0].label).toBe('face');
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([expect.objectContaining({ label: 'face' })]),
    );
  });
});

describe('useBBoxAuthoring — deleteBox', () => {
  it('removes the box by id', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useBBoxAuthoring([box('del'), box('keep')], onChange),
    );
    act(() => { result.current.deleteBox('del'); });
    expect(result.current.boxes).toHaveLength(1);
    expect(result.current.boxes[0].id).toBe('keep');
    expect(onChange).toHaveBeenLastCalledWith([box('keep')]);
  });

  it('calling deleteBox on unknown id is a no-op', () => {
    const { result } = renderHook(() =>
      useBBoxAuthoring([box('a')], vi.fn()),
    );
    act(() => { result.current.deleteBox('nonexistent'); });
    expect(result.current.boxes).toHaveLength(1);
  });
});

describe('useBBoxAuthoring — undo/redo', () => {
  it('undo restores the previous state', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useBBoxAuthoring([], onChange));

    act(() => { result.current.addBox(box('a')); });
    expect(result.current.boxes).toHaveLength(1);

    act(() => { result.current.undo(); });
    expect(result.current.boxes).toHaveLength(0);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(true);
    // onChange was called with the reverted state
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('redo re-applies the undone action', () => {
    const { result } = renderHook(() => useBBoxAuthoring([], vi.fn()));

    act(() => { result.current.addBox(box('a')); });
    act(() => { result.current.undo(); });
    act(() => { result.current.redo(); });

    expect(result.current.boxes).toHaveLength(1);
    expect(result.current.boxes[0].id).toBe('a');
    expect(result.current.canRedo).toBe(false);
  });

  it('new mutation after undo clears redo stack', () => {
    const { result } = renderHook(() => useBBoxAuthoring([], vi.fn()));

    act(() => { result.current.addBox(box('a')); });
    act(() => { result.current.undo(); });
    expect(result.current.canRedo).toBe(true);

    act(() => { result.current.addBox(box('b')); });
    expect(result.current.canRedo).toBe(false);
  });

  it('multi-step undo/redo chain works correctly', () => {
    const { result } = renderHook(() => useBBoxAuthoring([], vi.fn()));

    act(() => { result.current.addBox(box('step1')); });
    act(() => { result.current.addBox(box('step2')); });
    act(() => { result.current.addBox(box('step3')); });

    // Undo 2 steps
    act(() => { result.current.undo(); });
    act(() => { result.current.undo(); });
    expect(result.current.boxes).toHaveLength(1);
    expect(result.current.boxes[0].id).toBe('step1');

    // Redo 1
    act(() => { result.current.redo(); });
    expect(result.current.boxes).toHaveLength(2);
    expect(result.current.boxes[1].id).toBe('step2');
  });

  it('undo on empty stack is a no-op', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useBBoxAuthoring([], onChange));
    act(() => { result.current.undo(); });
    expect(onChange).not.toHaveBeenCalled();
    expect(result.current.boxes).toHaveLength(0);
  });

  it('redo on empty stack is a no-op', () => {
    const { result } = renderHook(() => useBBoxAuthoring([], vi.fn()));
    act(() => { result.current.addBox(box('x')); });
    // No undo was done so redo stack is empty
    act(() => { result.current.redo(); });
    expect(result.current.boxes).toHaveLength(1);
  });
});
