import { useEffect, useRef } from 'react';
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

const itemClass = (selected: boolean) => cn(
  'w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
  selected ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'border-border hover:bg-surface-hover',
);

export function WorkEntityList({ nodes, edges, selection, onSelectionChange, heading = 'Accessible work graph', groups, footer }: WorkEntityListProps) {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const selectedItem = useRef<HTMLButtonElement | null>(null);
  const selectionKey = selection ? `${selection.kind}:${selection.id}` : null;
  // Selecting on the canvas (or in the list) brings the item into the list's
  // own scroll view; `nearest` never scrolls the page when it is visible.
  useEffect(() => {
    if (selectionKey) selectedItem.current?.scrollIntoView?.({ block: 'nearest' });
  }, [selectionKey]);
  const nodeItem = (node: WorkGraphNodeData) => {
    const selected = isSelected(selection, 'node', node.id);
    return <li key={node.id}><button ref={selected ? selectedItem : undefined} type="button" aria-label={`Work item: ${nodeLabel(node)}`} aria-pressed={selected} aria-current={selected ? 'true' : undefined} data-selected={selected || undefined} onClick={() => onSelectionChange({ kind: 'node', id: node.id })} className={itemClass(selected)}><span className="block break-words font-medium text-text-primary">{nodeLabel(node)}</span><span className="text-xs text-text-tertiary">{node.kind === 'conversation' ? 'Chat · Recent activity' : `${node.kind} · ${node.status}`}</span></button></li>;
  };
  const sections = groups?.map((group) => ({ ...group, items: group.nodeIds.map((id) => nodeById.get(id)).filter((node): node is WorkGraphNodeData => !!node) })).filter((group) => group.items.length > 0);
  const empty = sections ? sections.length === 0 && edges.length === 0 : nodes.length === 0 && edges.length === 0;
  return (
    <section aria-labelledby="work-entity-list-heading" className="min-w-0 space-y-3">
      <h3 id="work-entity-list-heading" className="text-sm font-semibold text-text-primary">{heading}</h3>
      {empty ? (
        <p className="text-sm text-text-secondary">No shared work is available.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <h4 className="mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary">Items</h4>
            {sections
              ? sections.map((group) => (
                <section key={group.id} aria-label={group.title} className="mb-2" data-testid="work-entity-list-group">
                  <h5 className="mb-1 truncate text-xs font-semibold text-text-secondary">{group.title}{group.subtitle && <span className="font-normal text-text-tertiary"> · {group.subtitle}</span>}</h5>
                  <ul className="space-y-1">{group.items.map(nodeItem)}</ul>
                </section>
              ))
              : <ul className="space-y-1">{nodes.map(nodeItem)}</ul>}
          </div>
          <div>
            <h4 className="mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary">Relationships</h4>
            <ul className="space-y-1">
              {edges.map((edge) => {
                const selected = isSelected(selection, 'edge', edge.id);
                const label = edgeLabel(edge, nodeById);
                return <li key={edge.id}><button ref={selected ? selectedItem : undefined} type="button" aria-label={`Relationship: ${label}`} aria-pressed={selected} aria-current={selected ? 'true' : undefined} data-selected={selected || undefined} onClick={() => onSelectionChange({ kind: 'edge', id: edge.id })} className={itemClass(selected)}><span className="block break-words font-medium text-text-primary">{label}</span><span className="text-xs text-text-tertiary">{edge.relation} · {edge.status}</span></button></li>;
              })}
            </ul>
          </div>
        </div>
      )}
      {footer}
    </section>
  );
}

export default WorkEntityList;
