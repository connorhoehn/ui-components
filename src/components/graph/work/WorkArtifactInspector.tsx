import { useId } from 'react';
import { Tabs, TabPanel } from '../../shared/Tabs';
import { Button } from '../../ui/Button';
import type { WorkActivityNodeDetail, WorkGraphNodeData, WorkGraphSelection } from './types';

export function WorkArtifactInspector({ node, artifact, selection, onSelectionChange, onOpen, onReference }: {
  node: WorkGraphNodeData;
  artifact: NonNullable<WorkActivityNodeDetail['artifact']>;
  selection: Extract<WorkGraphSelection, { kind: 'node' }>;
  onSelectionChange: (selection: WorkGraphSelection) => void;
  onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
  onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
}) {
  const tabsId = useId();
  const revision = selection.revisionId ? artifact.revisions.find((item) => item.id === selection.revisionId) : artifact.revisions.at(-1);
  const target = { ...selection, revisionId: revision?.id, anchorId: revision?.anchorId };
  const canOpen = node.capabilities.includes('view-document') || node.capabilities.includes('edit-document');
  return (
    <div className="space-y-4 p-3">
      {artifact.revisions.length > 0 && <Tabs idPrefix={tabsId} aria-label="Available revisions" variant="segmented" size="sm" items={artifact.revisions.map((item) => ({ id: item.id, label: item.label }))} value={revision?.id ?? ''} onValueChange={(revisionId) => onSelectionChange({ kind: 'node', id: node.id, revisionId })} />}
      {artifact.pending && <p role="status" className="text-sm text-text-secondary">{artifact.pending.label} {artifact.pending.status === 'generating' ? 'is generating. You can review available revisions.' : 'could not be generated.'}{artifact.pending.message ? ` ${artifact.pending.message}` : ''}</p>}
      {revision ? <TabPanel idPrefix={tabsId} id={revision.id} when={revision.id} className="space-y-2"><div aria-label={`${revision.label} preview`} className="aspect-video overflow-hidden rounded border border-border bg-surface-inset">{revision.preview ?? <span className="flex h-full items-center justify-center text-sm text-text-secondary">Preview unavailable</span>}</div><p className="text-xs text-text-secondary">{revision.anchorLabel ?? revision.label}</p></TabPanel> : <p className="text-sm text-text-secondary">{selection.revisionId ? 'The selected revision is unavailable.' : 'No revision is available yet.'}</p>}
      <div className="flex flex-wrap gap-2">
        {canOpen && onOpen && revision && <Button size="sm" variant="secondary" onClick={() => onOpen(target)}>Open presentation</Button>}
        {onReference && revision && <Button size="sm" variant="secondary" onClick={() => onReference(target)}>Reference in chat</Button>}
      </div>
    </div>
  );
}
