import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useLabLayout } from '../hooks/useLabLayout';

beforeEach(() => {
  // The layout persists, so without this every test inherits the last one's
  // windows and the assertions drift with test order.
  globalThis.localStorage?.clear();
});

function seeded() {
  const hook = renderHook(() => useLabLayout());
  act(() => hook.result.current.ensureSeeded('box-a', 'agent'));
  return hook;
}

describe('ensureSeeded', () => {
  it('opens one window with one pane', () => {
    const { result } = seeded();
    expect(result.current.windows).toHaveLength(1);
    expect(result.current.panes).toHaveLength(1);
    expect(result.current.activePaneId).toBe(result.current.panes[0]!.id);
  });

  it('does not add a second window on a re-open', () => {
    const { result } = seeded();
    act(() => result.current.ensureSeeded('box-b', 'agent'));
    expect(result.current.windows).toHaveLength(1);
  });

  it('is a no-op with no computer to bind to', () => {
    const { result } = renderHook(() => useLabLayout());
    act(() => result.current.ensureSeeded(null, 'agent'));
    expect(result.current.windows).toHaveLength(0);
  });
});

describe('split', () => {
  it('moves focus to the pane it just made', () => {
    const { result } = seeded();
    const before = result.current.activePaneId;
    act(() => result.current.split('row', 'box-b', 'agent'));
    expect(result.current.panes).toHaveLength(2);
    expect(result.current.activePaneId).not.toBe(before);
  });

  it('drops zoom, because a zoomed split is invisible', () => {
    const { result } = seeded();
    act(() => result.current.toggleZoom());
    expect(result.current.zoomedPaneId).not.toBeNull();
    act(() => result.current.split('row', 'box-b', 'agent'));
    expect(result.current.zoomedPaneId).toBeNull();
  });

  it('reports every computer bound to a pane, without duplicates', () => {
    const { result } = seeded();
    act(() => result.current.split('row', 'box-b', 'agent'));
    act(() => result.current.split('column', 'box-a', 'agent'));
    expect([...result.current.openComputerIds].sort()).toEqual(['box-a', 'box-b']);
  });
});

describe('closeActivePane', () => {
  it('removes the pane and focuses a survivor', () => {
    const { result } = seeded();
    act(() => result.current.split('row', 'box-b', 'agent'));
    act(() => result.current.closeActivePane());
    expect(result.current.panes).toHaveLength(1);
    expect(result.current.activePaneId).toBe(result.current.panes[0]!.id);
  });

  it('closes the window when the last pane goes', () => {
    const { result } = seeded();
    act(() => result.current.closeActivePane());
    expect(result.current.windows).toHaveLength(0);
    expect(result.current.activePaneId).toBeNull();
  });
});

describe('windows', () => {
  it('are independent pane sets', () => {
    const { result } = seeded();
    act(() => result.current.split('row', 'box-b', 'agent'));
    act(() => result.current.newWindow('box-c', 'agent'));
    expect(result.current.windows).toHaveLength(2);
    expect(result.current.panes).toHaveLength(1);
    act(() => result.current.selectWindow(result.current.windows[0]!.id));
    expect(result.current.panes).toHaveLength(2);
  });

  it('wrap when stepped past either end', () => {
    const { result } = seeded();
    act(() => result.current.newWindow('box-c', 'agent'));
    const [first, second] = result.current.windows;
    act(() => result.current.stepWindow(1));
    expect(result.current.activeWindow?.id).toBe(first!.id);
    act(() => result.current.stepWindow(-1));
    expect(result.current.activeWindow?.id).toBe(second!.id);
  });
});

describe('reconcile', () => {
  it('drops panes bound to a computer that no longer exists', () => {
    const { result } = seeded();
    act(() => result.current.split('row', 'box-b', 'agent'));
    act(() => result.current.reconcile(['box-a']));
    expect(result.current.panes.map((p) => p.computerId)).toEqual(['box-a']);
  });

  it('closes a window whose only pane is orphaned', () => {
    const { result } = seeded();
    act(() => result.current.reconcile(['box-z']));
    expect(result.current.windows).toHaveLength(0);
  });

  it('leaves a fully-live layout untouched', () => {
    const { result } = seeded();
    act(() => result.current.split('row', 'box-b', 'agent'));
    const before = result.current.panes.map((p) => p.id);
    act(() => result.current.reconcile(['box-a', 'box-b']));
    expect(result.current.panes.map((p) => p.id)).toEqual(before);
  });
});

describe('move', () => {
  it('walks to the pane in that direction and unzooms on the way', () => {
    const { result } = seeded();
    act(() => result.current.split('row', 'box-b', 'agent'));
    const right = result.current.activePaneId;
    act(() => result.current.toggleZoom());
    act(() => result.current.move('left'));
    expect(result.current.activePaneId).not.toBe(right);
    expect(result.current.zoomedPaneId).toBeNull();
  });

  it('stays put at the edge', () => {
    const { result } = seeded();
    act(() => result.current.split('row', 'box-b', 'agent'));
    act(() => result.current.move('right'));
    const at = result.current.activePaneId;
    act(() => result.current.move('right'));
    expect(result.current.activePaneId).toBe(at);
  });
});

describe('setPaneKind', () => {
  it('retargets a single pane to another registered kind', () => {
    const { result } = seeded();
    const paneId = result.current.panes[0]!.id;
    act(() => result.current.setPaneKind(paneId, 'shell'));
    expect(result.current.panes[0]!.kindId).toBe('shell');
  });

  it('accepts a kind id the built-ins do not define, since the registry is open', () => {
    const { result } = seeded();
    const paneId = result.current.panes[0]!.id;
    act(() => result.current.setPaneKind(paneId, 'host-run-timeline'));
    expect(result.current.panes[0]!.kindId).toBe('host-run-timeline');
  });
});
