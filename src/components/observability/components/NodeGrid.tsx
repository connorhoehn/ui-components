// frontend/src/components/observability/components/NodeGrid.tsx
//
// Flex-wrap grid of NodeGridTile. Renders per-node summaries in a 16px-gap
// grid. Empty state: "No nodes connected".

import NodeGridTile, { type NodeSummary } from './NodeGridTile';
import { cn } from '../../../lib/cn';

export interface NodeGridProps {
  nodes: NodeSummary[];
  onSelect?: (id: string) => void;
  selectedId?: string;
}

function NodeGrid({ nodes, onSelect, selectedId }: NodeGridProps) {
  if (!nodes || nodes.length === 0) {
    return (
      <div
        data-testid="node-grid-empty"
        className={cn('p-6 text-center text-text-tertiary text-[13px] font-[inherit]')}
      >
        No nodes connected
      </div>
    );
  }

  return (
    <div
      data-testid="node-grid"
      className={cn('flex flex-wrap gap-4 font-[inherit]')}
    >
      {nodes.map((node) => (
        <NodeGridTile
          key={node.id}
          node={node}
          selected={selectedId === node.id}
          onClick={onSelect ? () => onSelect(node.id) : undefined}
        />
      ))}
    </div>
  );
}

export default NodeGrid;
