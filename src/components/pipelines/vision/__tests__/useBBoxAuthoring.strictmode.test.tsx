// vision/__tests__/useBBoxAuthoring.strictmode.test.tsx
//
// `commit`/`undo`/`redo` used to do all their work inside the `setBoxes` /
// `setUndoStack` updaters — including calling the `onChange` prop. React
// double-invokes updaters under StrictMode, so the host was notified twice per
// edit (a host that persists annotations wrote the same edit twice) and two
// identical undo frames were pushed, making one Ctrl+Z a no-op.
//
// `renderHook` does not wrap in StrictMode by default, so pass it explicitly.

import { describe, it, expect, vi } from 'vitest';
import { StrictMode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { useBBoxAuthoring } from '../useBBoxAuthoring';
import type { AuthoringBBox } from '../../../../types/pipeline';

function box(id: string, overrides?: Partial<AuthoringBBox>): AuthoringBBox {
  return { id, x: 10, y: 10, width: 100, height: 80, ...overrides };
}

function renderStrict(initial: AuthoringBBox[], onChange: (n: AuthoringBBox[]) => void) {
  return renderHook(() => useBBoxAuthoring(initial, onChange), { wrapper: StrictMode });
}

describe('useBBoxAuthoring under StrictMode', () => {
  it('notifies onChange exactly once per edit', () => {
    const onChange = vi.fn();
    const { result } = renderStrict([box('a')], onChange);

    act(() => {
      result.current.addBox(box('b'));
    });

    // Pre-fix: 2 — `onChange(next)` lived inside the setBoxes updater.
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith([box('a'), box('b')]);
  });

  it('pushes one undo frame per edit, so a single undo reverts it', () => {
    const onChange = vi.fn();
    const { result } = renderStrict([box('a')], onChange);

    act(() => {
      result.current.addBox(box('b'));
    });
    expect(result.current.boxes).toHaveLength(2);

    act(() => {
      result.current.undo();
    });
    // Pre-fix the duplicated frame meant this first undo restored a snapshot
    // that still had both boxes, and canUndo stayed true.
    expect(result.current.boxes).toEqual([box('a')]);
    expect(result.current.canUndo).toBe(false);
  });

  it('undo pushes one redo frame, so a single redo reapplies the edit', () => {
    const onChange = vi.fn();
    const { result } = renderStrict([box('a')], onChange);

    act(() => {
      result.current.addBox(box('b'));
    });
    act(() => {
      result.current.undo();
    });
    act(() => {
      result.current.redo();
    });

    expect(result.current.boxes).toHaveLength(2);
    expect(result.current.canRedo).toBe(false);
  });
});
