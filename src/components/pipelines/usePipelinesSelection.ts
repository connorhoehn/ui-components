// src/components/pipelines/usePipelinesSelection.ts
//
// Hook managing multi-select state for the pipelines list: selected IDs set,
// shift-click range selection, select-all toggle, and clear.

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PipelineRow } from './PipelinesPage';

export interface UsePipelinesSelectionOptions {
  visibleRows: PipelineRow[];
  filteredIds: string[];
}

export interface UsePipelinesSelectionReturn {
  selectionMode: boolean;
  selected: Set<string>;
  allVisibleSelected: boolean;
  someVisibleSelected: boolean;
  selectAllRef: React.RefObject<HTMLInputElement | null>;
  handleToggleSelectMode: () => void;
  handleToggleSelect: (id: string, shiftKey?: boolean) => void;
  handleSelectAllFiltered: () => void;
  handleHeaderToggleAll: () => void;
  clearSelection: () => void;
  setSelectionMode: (v: boolean) => void;
}

export function usePipelinesSelection({
  visibleRows,
  filteredIds,
}: UsePipelinesSelectionOptions): UsePipelinesSelectionReturn {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const lastClickedIdxRef = useRef<number | null>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const clearSelection = useCallback(() => {
    setSelected(new Set());
  }, []);

  const handleToggleSelectMode = useCallback(() => {
    if (selectionMode) {
      clearSelection();
      setSelectionMode(false);
    } else {
      setSelectionMode(true);
    }
  }, [selectionMode, clearSelection]);

  const handleToggleSelect = useCallback(
    (id: string, shiftKey = false) => {
      const visible = visibleRows;
      const idx = visible.findIndex((r) => r.id === id);
      const anchorIdx = lastClickedIdxRef.current;
      if (idx !== -1) lastClickedIdxRef.current = idx;
      setSelected((prev) => {
        const next = new Set(prev);
        const turnOn = !next.has(id);
        if (shiftKey && anchorIdx != null && idx !== -1) {
          const lo = Math.min(anchorIdx, idx);
          const hi = Math.max(anchorIdx, idx);
          for (let i = lo; i <= hi; i++) {
            const r = visible[i];
            if (!r) continue;
            if (turnOn) next.add(r.id);
            else next.delete(r.id);
          }
        } else if (turnOn) {
          next.add(id);
        } else {
          next.delete(id);
        }
        return next;
      });
    },
    [visibleRows],
  );

  const handleSelectAllFiltered = useCallback(() => {
    setSelected(new Set(filteredIds));
  }, [filteredIds]);

  const allVisibleSelected =
    visibleRows.length > 0 && visibleRows.every((r) => selected.has(r.id));
  const someVisibleSelected =
    !allVisibleSelected && visibleRows.some((r) => selected.has(r.id));

  const handleHeaderToggleAll = useCallback(() => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        for (const r of visibleRows) next.delete(r.id);
      } else {
        for (const r of visibleRows) next.add(r.id);
      }
      return next;
    });
    if (!selectionMode) setSelectionMode(true);
  }, [allVisibleSelected, visibleRows, selectionMode]);

  // Wire indeterminate visual state on the master checkbox.
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someVisibleSelected;
    }
  }, [someVisibleSelected]);

  return {
    selectionMode,
    selected,
    allVisibleSelected,
    someVisibleSelected,
    selectAllRef,
    handleToggleSelectMode,
    handleToggleSelect,
    handleSelectAllFiltered,
    handleHeaderToggleAll,
    clearSelection,
    setSelectionMode,
  };
}
