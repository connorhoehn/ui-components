import { useEffect } from 'react';
import { cn } from '../../../lib/cn';
import { handleRovingKeyDown } from '../../../lib/rovingFocus';

interface NodeContextMenuState {
  nodeId: string;
  x: number;
  y: number;
}

export interface CanvasContextMenuProps {
  nodeMenu: NodeContextMenuState;
  breakpoints?: Set<string>;
  showBreakpointOption: boolean;
  onFilterLog: () => void;
  onCopyNodeId: () => void;
  onDuplicate: () => void;
  onToggleBreakpoint: () => void;
  onDismiss: () => void;
}

export default function CanvasContextMenu({
  nodeMenu,
  breakpoints,
  showBreakpointOption,
  onFilterLog,
  onCopyNodeId,
  onDuplicate,
  onToggleBreakpoint,
  onDismiss,
}: CanvasContextMenuProps) {
  useEffect(() => {
    const onDocMouseDown = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-testid="canvas-node-context-menu"]')) return;
      onDismiss();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('mousedown', onDocMouseDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [onDismiss]);

  const menuItemBase = 'block w-full text-left px-3 py-2 border-none bg-transparent text-[13px] cursor-pointer rounded font-inherit';

  return (
    <div
      data-testid="canvas-node-context-menu"
      role="menu"
      aria-label="Node actions"
      // `role="menu"` promises ArrowUp/ArrowDown between items; without this
      // the role was a label with no behaviour behind it.
      onKeyDown={(e) =>
        handleRovingKeyDown(e, { itemSelector: '[role="menuitem"]', orientation: 'vertical' })
      }
      className="fixed bg-surface border border-border rounded-md shadow-[0_8px_20px_rgba(15,23,42,0.16)] min-w-[220px] z-50 p-1 font-inherit"
      style={{ top: nodeMenu.y, left: nodeMenu.x }}
    >
      <button
        type="button"
        role="menuitem"
        onClick={onFilterLog}
        data-testid="ctx-filter-log"
        className={cn(menuItemBase, 'text-text-primary')}
      >
        🎯 Filter log to this node
      </button>
      <button
        type="button"
        role="menuitem"
        onClick={onCopyNodeId}
        data-testid="ctx-copy-id"
        className={cn(menuItemBase, 'text-text-primary')}
      >
        📋 Copy node id
      </button>
      <button
        type="button"
        role="menuitem"
        onClick={onDuplicate}
        data-testid="ctx-duplicate"
        className={cn(menuItemBase, 'text-text-primary')}
      >
        📑 Duplicate node
      </button>
      {showBreakpointOption ? (
        <button
          type="button"
          role="menuitem"
          onClick={onToggleBreakpoint}
          data-testid="ctx-toggle-breakpoint"
          className={cn(
            menuItemBase,
            breakpoints?.has(nodeMenu.nodeId) ? 'text-danger-fg' : 'text-text-primary',
          )}
        >
          {breakpoints?.has(nodeMenu.nodeId) ? '🔴 Remove Breakpoint' : '🔴 Toggle Breakpoint'}
        </button>
      ) : null}
    </div>
  );
}
