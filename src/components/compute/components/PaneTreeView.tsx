// Render a pane tree, with draggable dividers between siblings.
//
// Splits are flex containers and the ratio is a flex-basis percentage, so a
// resize is one number changing and the browser does the layout. The
// alternative — absolutely positioning every leaf from `layoutRects` — makes
// the divider maths the component's problem and breaks the moment a pane has
// a minimum size.

import { useCallback, useRef, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { MAX_RATIO, MIN_RATIO, type PaneLeaf, type PaneNode } from '../lib/paneTree';

export interface PaneTreeViewProps {
  node: PaneNode;
  activePaneId: string | null;
  /**
   * When set, only this pane renders — tmux's `resize-pane -Z`. The rest of
   * the tree stays mounted-in-state but unrendered, so unzooming restores the
   * exact layout rather than rebuilding a guess at it.
   */
  zoomedPaneId?: string | null;
  renderLeaf: (leaf: PaneLeaf) => ReactNode;
  onRatioChange: (splitId: string, ratio: number) => void;
  /**
   * Space between panes. `tight` (default) is the classic multiplexer's 4px
   * rule; `roomy` is 8px, for panes that are cards with their own borders.
   */
  gutter?: 'tight' | 'roomy';
  className?: string;
}

export function PaneTreeView({
  node,
  activePaneId,
  zoomedPaneId = null,
  renderLeaf,
  onRatioChange,
  gutter = 'tight',
  className,
}: PaneTreeViewProps) {
  if (zoomedPaneId) {
    const zoomed = findLeafIn(node, zoomedPaneId);
    if (zoomed) return <div className={cn('flex min-h-0 min-w-0', className)}>{renderLeaf(zoomed)}</div>;
  }
  return (
    <div className={cn('flex min-h-0 min-w-0', className)}>
      <TreeNode
        node={node}
        activePaneId={activePaneId}
        renderLeaf={renderLeaf}
        onRatioChange={onRatioChange}
        gutter={gutter}
      />
    </div>
  );
}

function findLeafIn(node: PaneNode, paneId: string): PaneLeaf | null {
  if (node.kind === 'leaf') return node.id === paneId ? node : null;
  return findLeafIn(node.a, paneId) ?? findLeafIn(node.b, paneId);
}

interface TreeNodeProps {
  node: PaneNode;
  activePaneId: string | null;
  renderLeaf: (leaf: PaneLeaf) => ReactNode;
  onRatioChange: (splitId: string, ratio: number) => void;
  gutter: 'tight' | 'roomy';
}

function TreeNode({ node, activePaneId, renderLeaf, onRatioChange, gutter }: TreeNodeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (node.kind !== 'split') return;
      const container = containerRef.current;
      if (!container) return;
      event.preventDefault();
      const horizontal = node.direction === 'row';

      const move = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const size = horizontal ? rect.width : rect.height;
        if (size <= 0) return;
        const offset = horizontal ? e.clientX - rect.left : e.clientY - rect.top;
        onRatioChange(node.id, Math.min(MAX_RATIO, Math.max(MIN_RATIO, offset / size)));
      };
      const stop = () => {
        globalThis.removeEventListener('pointermove', move);
        globalThis.removeEventListener('pointerup', stop);
        globalThis.removeEventListener('pointercancel', stop);
      };
      // On window, not the handle: a fast drag outruns a 6px-wide target, and
      // pointer capture on the handle would keep firing after the pane it
      // belongs to has been closed mid-drag.
      globalThis.addEventListener('pointermove', move);
      globalThis.addEventListener('pointerup', stop);
      globalThis.addEventListener('pointercancel', stop);
    },
    [node, onRatioChange],
  );

  const nudge = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (node.kind !== 'split') return;
      const horizontal = node.direction === 'row';
      const decrease = horizontal ? 'ArrowLeft' : 'ArrowUp';
      const increase = horizontal ? 'ArrowRight' : 'ArrowDown';
      if (event.key !== decrease && event.key !== increase) return;
      event.preventDefault();
      const step = event.shiftKey ? 0.1 : 0.02;
      onRatioChange(node.id, node.ratio + (event.key === increase ? step : -step));
    },
    [node, onRatioChange],
  );

  if (node.kind === 'leaf') {
    return <div className="flex-1 min-w-0 min-h-0 flex">{renderLeaf(node)}</div>;
  }

  const horizontal = node.direction === 'row';
  const percent = Math.round(node.ratio * 1000) / 10;

  return (
    <div
      ref={containerRef}
      className={cn('flex flex-1 min-w-0 min-h-0', horizontal ? 'flex-row' : 'flex-col')}
    >
      <div className="flex min-w-0 min-h-0" style={{ flexBasis: `${percent}%`, flexGrow: 0, flexShrink: 0 }}>
        <TreeNode node={node.a} activePaneId={activePaneId} renderLeaf={renderLeaf} onRatioChange={onRatioChange} gutter={gutter} />
      </div>

      <div
        role="separator"
        aria-orientation={horizontal ? 'vertical' : 'horizontal'}
        aria-label={`Resize ${horizontal ? 'columns' : 'rows'}`}
        aria-valuenow={percent}
        aria-valuemin={MIN_RATIO * 100}
        aria-valuemax={MAX_RATIO * 100}
        tabIndex={0}
        onPointerDown={startDrag}
        onKeyDown={nudge}
        className={cn(
          'shrink-0 bg-transparent hover:bg-code-blue/40 focus-visible:bg-code-blue/60 focus:outline-none transition-colors',
          // Wider hit area than visual weight: a 2px divider is honest about
          // the layout and impossible to grab.
          horizontal
            ? cn(gutter === 'roomy' ? 'w-2' : 'w-1', 'cursor-col-resize my-0.5')
            : cn(gutter === 'roomy' ? 'h-2' : 'h-1', 'cursor-row-resize mx-0.5'),
        )}
      />

      <div className="flex flex-1 min-w-0 min-h-0">
        <TreeNode node={node.b} activePaneId={activePaneId} renderLeaf={renderLeaf} onRatioChange={onRatioChange} gutter={gutter} />
      </div>
    </div>
  );
}
