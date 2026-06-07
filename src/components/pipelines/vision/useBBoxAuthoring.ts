// src/components/pipelines/vision/useBBoxAuthoring.ts
//
// Controlled-state hook for the BBoxAuthoringCanvas. Manages the
// authoritative boxes array with a bounded undo/redo stack and exposes
// named operations. The hook is intentionally "dumb" about rendering —
// it owns only state logic; pointer-event handling lives in the canvas.
//
// Undo stack limit: 50 frames (mirrors PipelineEditorContext).

import { useCallback, useRef, useState } from 'react';
import type { AuthoringBBox } from '../../../types/pipeline';

export type { AuthoringBBox };

export interface BBoxAuthoringActions {
  boxes: AuthoringBBox[];
  addBox: (box: AuthoringBBox) => void;
  moveBox: (id: string, x: number, y: number) => void;
  resizeBox: (id: string, x: number, y: number, width: number, height: number) => void;
  setLabel: (id: string, label: string) => void;
  deleteBox: (id: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

const HISTORY_LIMIT = 50;

/**
 * Controlled-state hook for bbox authoring. Caller passes an initial
 * `boxes` array and an `onChange` callback; every mutation commits to
 * the undo stack and calls `onChange` with the new array.
 */
export function useBBoxAuthoring(
  initialBoxes: AuthoringBBox[],
  onChange: (next: AuthoringBBox[]) => void,
): BBoxAuthoringActions {
  const [boxes, setBoxes] = useState<AuthoringBBox[]>(initialBoxes);
  const [undoStack, setUndoStack] = useState<AuthoringBBox[][]>([]);
  const [redoStack, setRedoStack] = useState<AuthoringBBox[][]>([]);

  // Keep a stable ref to the latest boxes so callbacks close over the ref
  // and avoid stale-closure issues with pointer events.
  const boxesRef = useRef(boxes);
  boxesRef.current = boxes;

  // ── commit ────────────────────────────────────────────────────────────

  const commit = useCallback(
    (mutator: (current: AuthoringBBox[]) => AuthoringBBox[]) => {
      setBoxes((prev) => {
        const next = mutator(prev);
        setUndoStack((stack) => {
          const pushed = [...stack, prev];
          if (pushed.length > HISTORY_LIMIT) pushed.shift();
          return pushed;
        });
        setRedoStack([]);
        onChange(next);
        return next;
      });
    },
    [onChange],
  );

  // ── named operations ──────────────────────────────────────────────────

  const addBox = useCallback(
    (box: AuthoringBBox) => {
      commit((prev) => [...prev, box]);
    },
    [commit],
  );

  const moveBox = useCallback(
    (id: string, x: number, y: number) => {
      commit((prev) =>
        prev.map((b) => (b.id === id ? { ...b, x, y } : b)),
      );
    },
    [commit],
  );

  const resizeBox = useCallback(
    (id: string, x: number, y: number, width: number, height: number) => {
      commit((prev) =>
        prev.map((b) => (b.id === id ? { ...b, x, y, width, height } : b)),
      );
    },
    [commit],
  );

  const setLabel = useCallback(
    (id: string, label: string) => {
      commit((prev) =>
        prev.map((b) => (b.id === id ? { ...b, label } : b)),
      );
    },
    [commit],
  );

  const deleteBox = useCallback(
    (id: string) => {
      commit((prev) => prev.filter((b) => b.id !== id));
    },
    [commit],
  );

  // ── undo / redo ───────────────────────────────────────────────────────

  const undo = useCallback(() => {
    setUndoStack((stack) => {
      if (stack.length === 0) return stack;
      const frame = stack[stack.length - 1];
      setRedoStack((redo) => [...redo, boxesRef.current]);
      const next = frame;
      setBoxes(next);
      onChange(next);
      return stack.slice(0, -1);
    });
  }, [onChange]);

  const redo = useCallback(() => {
    setRedoStack((stack) => {
      if (stack.length === 0) return stack;
      const frame = stack[stack.length - 1];
      setUndoStack((undo) => {
        const pushed = [...undo, boxesRef.current];
        if (pushed.length > HISTORY_LIMIT) pushed.shift();
        return pushed;
      });
      const next = frame;
      setBoxes(next);
      onChange(next);
      return stack.slice(0, -1);
    });
  }, [onChange]);

  return {
    boxes,
    addBox,
    moveBox,
    resizeBox,
    setLabel,
    deleteBox,
    undo,
    redo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
  };
}
