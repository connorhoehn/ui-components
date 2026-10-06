// Windows and panes for the lab multiplexer, persisted across reloads.
//
// The shape is tmux's: a session holds numbered *windows*, each window holds
// a tree of *panes*. Keeping windows rather than one flat pane set is what
// lets you park a four-pane investigation on window 2 and go do something
// else on window 1 without tearing it down.

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  closePane,
  countPanes,
  cyclePane,
  findLeaf,
  listLeaves,
  makeLeaf,
  neighborPane,
  setRatio,
  arrangePanes,
  splitPane,
  updateLeaf,
  type Direction,
  type PaneArrangement,
  type PaneNode,
  type SplitDirection,
} from '../lib/paneTree';
import { LAB_LAYOUT_STORAGE_KEY } from '../lib/storage';

export interface LabWindow {
  id: string;
  /** Display name. Defaults to the window's index. */
  name?: string;
  root: PaneNode;
}

interface LabLayout {
  windows: LabWindow[];
  activeWindowId: string | null;
  activePaneId: string | null;
  zoomedPaneId: string | null;
}

/** Counter-based ids: `Date.now()` collides when two panes open in one tick. */
let sequence = 0;
const nextId = (prefix: string) => `${prefix}-${(sequence += 1).toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

function load(): LabLayout {
  const empty: LabLayout = { windows: [], activeWindowId: null, activePaneId: null, zoomedPaneId: null };
  try {
    const raw = globalThis.localStorage?.getItem(LAB_LAYOUT_STORAGE_KEY);
    if (!raw) return empty;
    const saved = JSON.parse(raw) as LabLayout;
    if (!Array.isArray(saved.windows)) return empty;
    return { ...empty, ...saved, zoomedPaneId: null };
  } catch {
    return empty;
  }
}

export interface UseLabLayoutResult {
  windows: LabWindow[];
  activeWindow: LabWindow | null;
  activePaneId: string | null;
  zoomedPaneId: string | null;
  /** Panes in the active window, in layout order. */
  panes: ReturnType<typeof listLeaves>;
  /** Every computer bound to a pane in the active window. */
  openComputerIds: string[];
  focusPane: (paneId: string) => void;
  split: (direction: SplitDirection, computerId: string, kindId: string) => void;
  closeActivePane: () => void;
  setPaneComputer: (paneId: string, computerId: string) => void;
  setPaneKind: (paneId: string, kindId: string) => void;
  resize: (splitId: string, ratio: number) => void;
  move: (direction: Direction) => void;
  cycle: (delta: number) => void;
  toggleZoom: () => void;
  /** Re-flow the active window's panes — see `arrangePanes`. Drops zoom. */
  arrange: (arrangement: PaneArrangement) => void;
  newWindow: (computerId: string, kindId: string) => void;
  closeWindow: (windowId: string) => void;
  selectWindow: (windowId: string) => void;
  stepWindow: (delta: number) => void;
  /** Seed the first window when the lab opens with nothing in it. */
  ensureSeeded: (computerId: string | null, kindId: string) => void;
  /** Drop panes bound to computers that no longer exist. */
  reconcile: (liveComputerIds: readonly string[]) => void;
}

export function useLabLayout(): UseLabLayoutResult {
  const [layout, setLayout] = useState<LabLayout>(load);

  useEffect(() => {
    try {
      globalThis.localStorage?.setItem(LAB_LAYOUT_STORAGE_KEY, JSON.stringify(layout));
    } catch {
      /* private mode or quota — the layout still works, it just forgets */
    }
  }, [layout]);

  const activeWindow = useMemo(
    () => layout.windows.find((w) => w.id === layout.activeWindowId) ?? layout.windows[0] ?? null,
    [layout.windows, layout.activeWindowId],
  );

  const panes = useMemo(() => (activeWindow ? listLeaves(activeWindow.root) : []), [activeWindow]);
  const openComputerIds = useMemo(() => [...new Set(panes.map((p) => p.computerId))], [panes]);

  /** Rewrite the active window's tree. Every pane mutation goes through here. */
  const mapActive = useCallback(
    (fn: (root: PaneNode) => PaneNode, after?: (root: PaneNode) => Partial<LabLayout>) => {
      setLayout((prev) => {
        const target = prev.windows.find((w) => w.id === prev.activeWindowId) ?? prev.windows[0];
        if (!target) return prev;
        const root = fn(target.root);
        return {
          ...prev,
          windows: prev.windows.map((w) => (w.id === target.id ? { ...w, root } : w)),
          ...(after?.(root) ?? {}),
        };
      });
    },
    [],
  );

  const focusPane = useCallback((paneId: string) => {
    setLayout((prev) => ({ ...prev, activePaneId: paneId }));
  }, []);

  const split = useCallback(
    (direction: SplitDirection, computerId: string, kindId: string) => {
      const leaf = makeLeaf(nextId('pane'), computerId, kindId);
      mapActive(
        (root) => {
          const target = layout.activePaneId && findLeaf(root, layout.activePaneId)
            ? layout.activePaneId
            : listLeaves(root)[0]?.id;
          if (!target) return root;
          return splitPane(root, target, direction, leaf, nextId('split'));
        },
        // Focus follows the new pane — you split in order to use the thing you
        // just made, and zoom is dropped because a zoomed split is invisible.
        () => ({ activePaneId: leaf.id, zoomedPaneId: null }),
      );
    },
    [mapActive, layout.activePaneId],
  );

  const closeActivePane = useCallback(() => {
    setLayout((prev) => {
      const target = prev.windows.find((w) => w.id === prev.activeWindowId) ?? prev.windows[0];
      if (!target || !prev.activePaneId) return prev;

      // Closing the last pane closes the window: a window with no panes has
      // nothing to draw and no way back into it.
      if (countPanes(target.root) <= 1) {
        const windows = prev.windows.filter((w) => w.id !== target.id);
        const next = windows[0] ?? null;
        return {
          windows,
          activeWindowId: next?.id ?? null,
          activePaneId: next ? (listLeaves(next.root)[0]?.id ?? null) : null,
          zoomedPaneId: null,
        };
      }

      const root = closePane(target.root, prev.activePaneId);
      const remaining = listLeaves(root);
      return {
        ...prev,
        windows: prev.windows.map((w) => (w.id === target.id ? { ...w, root } : w)),
        activePaneId: remaining[remaining.length - 1]?.id ?? null,
        zoomedPaneId: null,
      };
    });
  }, []);

  const setPaneComputer = useCallback(
    (paneId: string, computerId: string) => mapActive((root) => updateLeaf(root, paneId, { computerId })),
    [mapActive],
  );

  const setPaneKind = useCallback(
    (paneId: string, kindId: string) => mapActive((root) => updateLeaf(root, paneId, { kindId })),
    [mapActive],
  );

  const resize = useCallback(
    (splitId: string, ratio: number) => mapActive((root) => setRatio(root, splitId, ratio)),
    [mapActive],
  );

  const move = useCallback(
    (direction: Direction) => {
      setLayout((prev) => {
        const target = prev.windows.find((w) => w.id === prev.activeWindowId) ?? prev.windows[0];
        if (!target || !prev.activePaneId) return prev;
        const next = neighborPane(target.root, prev.activePaneId, direction);
        // Moving while zoomed unzooms: the pane you asked for is not on
        // screen, and silently doing nothing reads as a dead key.
        return next ? { ...prev, activePaneId: next, zoomedPaneId: null } : prev;
      });
    },
    [],
  );

  const cycle = useCallback((delta: number) => {
    setLayout((prev) => {
      const target = prev.windows.find((w) => w.id === prev.activeWindowId) ?? prev.windows[0];
      if (!target || !prev.activePaneId) return prev;
      const next = cyclePane(target.root, prev.activePaneId, delta);
      return next ? { ...prev, activePaneId: next, zoomedPaneId: null } : prev;
    });
  }, []);

  const toggleZoom = useCallback(() => {
    setLayout((prev) => ({
      ...prev,
      zoomedPaneId: prev.zoomedPaneId ? null : prev.activePaneId,
    }));
  }, []);

  const arrange = useCallback(
    (arrangement: PaneArrangement) => mapActive(
      (root) => arrangePanes(root, arrangement, () => nextId('split')),
      () => ({ zoomedPaneId: null }),
    ),
    [mapActive],
  );

  const newWindow = useCallback((computerId: string, kindId: string) => {
    const leaf = makeLeaf(nextId('pane'), computerId, kindId);
    const window: LabWindow = { id: nextId('win'), root: leaf };
    setLayout((prev) => ({
      windows: [...prev.windows, window],
      activeWindowId: window.id,
      activePaneId: leaf.id,
      zoomedPaneId: null,
    }));
  }, []);

  const closeWindow = useCallback((windowId: string) => {
    setLayout((prev) => {
      const windows = prev.windows.filter((w) => w.id !== windowId);
      if (prev.activeWindowId !== windowId) return { ...prev, windows };
      const next = windows[0] ?? null;
      return {
        windows,
        activeWindowId: next?.id ?? null,
        activePaneId: next ? (listLeaves(next.root)[0]?.id ?? null) : null,
        zoomedPaneId: null,
      };
    });
  }, []);

  const selectWindow = useCallback((windowId: string) => {
    setLayout((prev) => {
      const target = prev.windows.find((w) => w.id === windowId);
      if (!target) return prev;
      return {
        ...prev,
        activeWindowId: windowId,
        activePaneId: listLeaves(target.root)[0]?.id ?? null,
        zoomedPaneId: null,
      };
    });
  }, []);

  const stepWindow = useCallback((delta: number) => {
    setLayout((prev) => {
      if (prev.windows.length < 2) return prev;
      const index = prev.windows.findIndex((w) => w.id === prev.activeWindowId);
      const next = prev.windows[(index + delta + prev.windows.length) % prev.windows.length];
      if (!next) return prev;
      return {
        ...prev,
        activeWindowId: next.id,
        activePaneId: listLeaves(next.root)[0]?.id ?? null,
        zoomedPaneId: null,
      };
    });
  }, []);

  const ensureSeeded = useCallback((computerId: string | null, kindId: string) => {
    if (!computerId) return;
    setLayout((prev) => {
      if (prev.windows.length > 0) {
        // Windows exist but nothing is focused — happens after a reload.
        if (prev.activePaneId) return prev;
        const target = prev.windows.find((w) => w.id === prev.activeWindowId) ?? prev.windows[0];
        if (!target) return prev;
        return { ...prev, activeWindowId: target.id, activePaneId: listLeaves(target.root)[0]?.id ?? null };
      }
      const leaf = makeLeaf(nextId('pane'), computerId, kindId);
      const window: LabWindow = { id: nextId('win'), root: leaf };
      return { windows: [window], activeWindowId: window.id, activePaneId: leaf.id, zoomedPaneId: null };
    });
  }, []);

  const reconcile = useCallback((liveComputerIds: readonly string[]) => {
    const live = new Set(liveComputerIds);
    setLayout((prev) => {
      let changed = false;
      const windows: LabWindow[] = [];
      for (const window of prev.windows) {
        let root: PaneNode = window.root;
        for (const leaf of listLeaves(window.root)) {
          if (live.has(leaf.computerId)) continue;
          changed = true;
          // A pane bound to a deleted box can never render anything. Dropping
          // it is less confusing than leaving a permanently-broken frame.
          root = countPanes(root) <= 1 ? root : closePane(root, leaf.id);
        }
        if (countPanes(root) === 1 && !live.has(listLeaves(root)[0]!.computerId)) {
          changed = true;
          continue;
        }
        windows.push(root === window.root ? window : { ...window, root });
      }
      if (!changed) return prev;
      const stillActive = windows.find((w) => w.id === prev.activeWindowId) ?? windows[0] ?? null;
      const panesLeft = stillActive ? listLeaves(stillActive.root) : [];
      return {
        windows,
        activeWindowId: stillActive?.id ?? null,
        activePaneId: panesLeft.some((p) => p.id === prev.activePaneId)
          ? prev.activePaneId
          : (panesLeft[0]?.id ?? null),
        zoomedPaneId: null,
      };
    });
  }, []);

  return {
    windows: layout.windows,
    activeWindow,
    activePaneId: layout.activePaneId,
    zoomedPaneId: layout.zoomedPaneId,
    panes,
    openComputerIds,
    focusPane,
    split,
    closeActivePane,
    setPaneComputer,
    setPaneKind,
    resize,
    move,
    cycle,
    toggleZoom,
    arrange,
    newWindow,
    closeWindow,
    selectWindow,
    stepWindow,
    ensureSeeded,
    reconcile,
  };
}
