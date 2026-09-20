import { cn } from '../../../lib/cn';
import type { WorkEntityListProps, WorkGraphEdgeData, WorkGraphNodeData, WorkGraphSelection } from './types';

function isSelected(selection: WorkGraphSelection, kind: 'node' | 'edge', id: string): boolean {
  return selection?.kind === kind && selection.id === id;
}

function nodeLabel(node: WorkGraphNodeData): string {
  return node.locked ? 'Restricted work item' : (node.title.trim() || 'Untitled work item');
}

function edgeLabel(edge: WorkGraphEdgeData, nodes: ReadonlyMap<string, WorkGraphNodeData>): string {
  const from = nodes.get(edge.fromId);
  const to = nodes.get(edge.toId);
  const fromLabel = from ? nodeLabel(from) : 'Unavailable item';
  const toLabel = to ? nodeLabel(to) : 'Unavailable item';
  return edge.label?.trim() || `${fromLabel} ${edge.relation} ${toLabel}`;
}

export function WorkEntityList({ nodes, edges, selection, onSelectionChange, heading = 'Accessible work graph' }: WorkEntityListProps) {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  return (
    <section aria-labelledby="work-entity-list-heading" className="min-w-0 space-y-3">
      <h3 id="work-entity-list-heading" className="text-sm font-semibold text-text-primary">{heading}</h3>
      {nodes.length === 0 && edges.length === 0 ? (
        <p className="text-sm text-text-secondary">No shared work is available.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <h4 className="mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary">Items</h4>
            <ul className="space-y-1">
              {nodes.map((node) => {
                const selected = isSelected(selection, 'node', node.id);
                return <li key={node.id}><button type="button" aria-label={`Work item: ${nodeLabel(node)}`} aria-pressed={selected} onClick={() => onSelectionChange({ kind: 'node', id: node.id })} className={cn('w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50', selected ? 'border-primary bg-primary/5' : 'border-border hover:bg-surface-hover')}><span className="block break-words font-medium text-text-primary">{nodeLabel(node)}</span><span className="text-xs text-text-tertiary">{node.kind === 'conversation' ? 'Chat · Recent activity' : `${node.kind} · ${node.status}`}</span></button></li>;
              })}
            </ul>
          </div>
          <div>
            <h4 className="mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary">Relationships</h4>
            <ul className="space-y-1">
              {edges.map((edge) => {
                const selected = isSelected(selection, 'edge', edge.id);
                const label = edgeLabel(edge, nodeById);
                return <li key={edge.id}><button type="button" aria-label={`Relationship: ${label}`} aria-pressed={selected} onClick={() => onSelectionChange({ kind: 'edge', id: edge.id })} className={cn('w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50', selected ? 'border-primary bg-primary/5' : 'border-border hover:bg-surface-hover')}><span className="block break-words font-medium text-text-primary">{label}</span><span className="text-xs text-text-tertiary">{edge.relation} · {edge.status}</span></button></li>;
              })}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export default WorkEntityList;
