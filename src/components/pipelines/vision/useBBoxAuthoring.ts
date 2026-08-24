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

  // StrictMode safety: this used to run the mutator, both stack updates and
  // — worst of all — the `onChange` prop *inside* the `setBoxes` updater.
  // React double-invokes updaters in dev, so every box edit notified the host
  // twice (a host that POSTs annotations wrote the same edit twice) and
  // pushed two identical undo frames, so one Ctrl+Z appeared to do nothing.
  // `boxesRef` already tracks the latest boxes for the pointer handlers, so
  // read `prev` from it and keep the updater pure.
  const commit = useCallback(
    (mutator: (current: AuthoringBBox[]) => AuthoringBBox[]) => {
      const prev = boxesRef.current;
      const next = mutator(prev);
      // Keep the ref ahead of the next render so two commits in one tick
      // (a drag that resizes then relabels) chain rather than clobber.
      boxesRef.current = next;
      setUndoStack((stack) => {
        const pushed = [...stack, prev];
        if (pushed.length > HISTORY_LIMIT) pushed.shift();
        return pushed;
      });
      setRedoStack([]);
      setBoxes(next);
      onChange(next);
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

  // Same StrictMode fix as `commit`: no nested setState and no `onChange`
  // from inside a stack updater.
  const undo = useCallback(() => {
    if (undoStack.length === 0) return;
    const next = undoStack[undoStack.length - 1];
    const current = boxesRef.current;
    boxesRef.current = next;
    setRedoStack((redo) => [...redo, current]);
    setUndoStack((stack) => stack.slice(0, -1));
    setBoxes(next);
    onChange(next);
  }, [onChange, undoStack]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    const current = boxesRef.current;
    boxesRef.current = next;
    setUndoStack((undo) => {
      const pushed = [...undo, current];
      if (pushed.length > HISTORY_LIMIT) pushed.shift();
      return pushed;
    });
    setRedoStack((stack) => stack.slice(0, -1));
    setBoxes(next);
    onChange(next);
  }, [onChange, redoStack]);

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
