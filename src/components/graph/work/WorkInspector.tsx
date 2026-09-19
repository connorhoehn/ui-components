import { useEffect } from 'react';
import { Button } from '../../ui/Button';
import type { WorkGraphCapability, WorkGraphEdgeData, WorkGraphNodeData, WorkGraphSelection, WorkInspectorProps } from './types';

const CAPABILITY_LABEL: Record<WorkGraphCapability, string> = {
  message: 'Message', 'view-document': 'View document', 'edit-document': 'Edit document',
  'join-conversation': 'Join conversation', 'join-meeting': 'Join meeting',
  'observe-terminal': 'Observe terminal', 'control-terminal': 'Control terminal',
  'view-transcript': 'View transcript', 'view-run': 'View run', 'dispatch-run': 'Dispatch run',
};
const OPEN_CAPABILITIES = new Set<WorkGraphCapability>(['view-document', 'edit-document', 'join-conversation', 'join-meeting', 'observe-terminal', 'control-terminal', 'view-transcript', 'view-run']);

function findEntity(nodes: WorkGraphNodeData[], edges: WorkGraphEdgeData[], selection: WorkGraphSelection): WorkGraphNodeData | WorkGraphEdgeData | undefined {
  if (!selection) return undefined;
  return selection.kind === 'node' ? nodes.find((node) => node.id === selection.id) : edges.find((edge) => edge.id === selection.id);
}

function entityTitle(entity: WorkGraphNodeData | WorkGraphEdgeData): string {
  if ('kind' in entity) return entity.locked ? 'Restricted work item' : entity.title;
  return entity.label?.trim() || `${entity.relation} relationship`;
}

export function WorkInspector({ nodes, edges, selection, onSelectionChange, onOpen, onReference, onRequestCollaboration }: WorkInspectorProps) {
  const entity = findEntity(nodes, edges, selection);
  useEffect(() => {
    if (selection && !entity) onSelectionChange(null);
  }, [entity, onSelectionChange, selection]);

  if (!selection || !entity) {
    return <aside aria-label="Work details" className="rounded-lg border border-border bg-surface p-4"><p className="text-sm text-text-secondary">Select a work item or relationship to inspect it.</p></aside>;
  }

  const selectionValue: Exclude<WorkGraphSelection, null> = selection;
  const openCapability = entity.capabilities.find((capability) => OPEN_CAPABILITIES.has(capability));
  return (
    <aside aria-label="Work details" className="space-y-4 rounded-lg border border-border bg-surface p-4">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">{'kind' in entity ? entity.kind : 'Relationship'}</p>
        <h3 className="break-words text-base font-semibold text-text-primary">{entityTitle(entity)}</h3>
        <p className="text-sm text-text-secondary">{entity.status}</p>
        {'description' in entity && !entity.locked && entity.description ? <p className="mt-2 break-words text-sm text-text-secondary">{entity.description}</p> : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {openCapability && onOpen ? <Button size="sm" variant="secondary" onClick={() => onOpen(selectionValue)}>Open</Button> : null}
        {onReference ? <Button size="sm" variant="secondary" onClick={() => onReference(selectionValue)}>Reference</Button> : null}
      </div>
      {entity.capabilities.length > 0 && onRequestCollaboration ? (
        <div><h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary">Request collaboration</h4><div className="flex flex-wrap gap-2">{entity.capabilities.map((capability) => <Button key={capability} size="sm" variant="secondary" onClick={() => onRequestCollaboration(selectionValue, capability)}>{CAPABILITY_LABEL[capability]}</Button>)}</div></div>
      ) : null}
    </aside>
  );
}

export default WorkInspector;
