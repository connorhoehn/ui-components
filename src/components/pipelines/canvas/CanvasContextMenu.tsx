import { useCallback, useEffect } from 'react';
import { colors } from '../../../constants/styles';

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

  const menuItemStyle = useCallback(
    (color?: string) => ({
      display: 'block' as const,
      width: '100%',
      textAlign: 'left' as const,
      padding: '8px 12px',
      border: 'none',
      background: 'transparent',
      color: color ?? colors.textPrimary,
      fontSize: 13,
      cursor: 'pointer',
      borderRadius: 4,
      fontFamily: 'inherit',
    }),
    [],
  );

  return (
    <div
      data-testid="canvas-node-context-menu"
      role="menu"
      style={{
        position: 'fixed',
        top: nodeMenu.y,
        left: nodeMenu.x,
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 6,
        boxShadow: '0 8px 20px rgba(15, 23, 42, 0.16)',
        minWidth: 220,
        zIndex: 50,
        padding: 4,
        fontFamily: 'inherit',
      }}
    >
      <button
        type="button"
        role="menuitem"
        onClick={onFilterLog}
        data-testid="ctx-filter-log"
        style={menuItemStyle()}
      >
        🎯 Filter log to this node
      </button>
      <button
        type="button"
        role="menuitem"
        onClick={onCopyNodeId}
        data-testid="ctx-copy-id"
        style={menuItemStyle()}
      >
        📋 Copy node id
      </button>
      <button
        type="button"
        role="menuitem"
        onClick={onDuplicate}
        data-testid="ctx-duplicate"
        style={menuItemStyle()}
      >
        📑 Duplicate node
      </button>
      {showBreakpointOption ? (
        <button
          type="button"
          role="menuitem"
          onClick={onToggleBreakpoint}
          data-testid="ctx-toggle-breakpoint"
          style={menuItemStyle(
            breakpoints?.has(nodeMenu.nodeId) ? '#dc2626' : undefined,
          )}
        >
          {breakpoints?.has(nodeMenu.nodeId) ? '🔴 Remove Breakpoint' : '🔴 Toggle Breakpoint'}
        </button>
      ) : null}
    </div>
  );
}
