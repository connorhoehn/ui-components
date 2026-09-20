import BaseNode, { type NodeExecutionState } from '../../pipelines/nodes/BaseNode';
import Chip from '../../shared/Chip';
import { IconButton } from '../../ui/IconButton';
import { ChatIcon } from '../../ui/Icons';
import { cn } from '../../../lib/cn';
import type { WorkActivityNodeDetail, WorkGraphNodeData, WorkGraphSelection } from './types';

const ICONS: Record<WorkGraphNodeData['kind'], string> = { project: '▱', terminal: '>_', agent: '✦', run: '▶', document: '▤', change: '⌘', conversation: '◌', meeting: '◎', transcript: '≡', task: '✓' };
const STATES: Record<WorkGraphNodeData['status'], NodeExecutionState> = { idle: 'idle', running: 'running', waiting: 'awaiting', completed: 'completed', error: 'failed', stopped: 'idle', stale: 'idle' };

export function WorkActivityNode({ node, detail, selected, selectedRevisionId, live, onSelect, onFeedback }: {
  node: WorkGraphNodeData;
  detail?: WorkActivityNodeDetail;
  selected: boolean;
  selectedRevisionId?: string;
  live: boolean;
  onSelect: (selection: WorkGraphSelection) => void;
  onFeedback?: (selection: Exclude<WorkGraphSelection, null>) => void;
}) {
  const restricted = node.locked || node.disclosure === 'existence';
  const visible = restricted ? undefined : detail;
  const revision = selectedRevisionId ? visible?.artifact?.revisions.find((item) => item.id === selectedRevisionId) : visible?.artifact?.revisions.at(-1);
  const pending = visible?.artifact?.pending;
  const title = node.locked ? 'Restricted work item' : node.title;
  const isFresh = live && visible?.fresh === true;
  const state = node.status === 'running' && !isFresh ? 'idle' : STATES[node.status];
  const target = { kind: 'node' as const, id: node.id, ...(revision ? { revisionId: revision.id } : {}) };
  return (
    <div
      className={cn('pointer-events-auto relative w-[200px]', visible?.emphasis === 'earlier' && '[&_[data-pipeline-node]]:border-border [&_[data-pipeline-node]]:bg-surface-inset', visible?.emphasis === 'input' && '[&_[data-pipeline-node]]:border-border-emphasis')}
      data-emphasis={visible?.emphasis ?? 'current'}
      onClick={() => onSelect(target)}
      onKeyDown={(event) => {
        if (event.target instanceof HTMLElement && event.target.dataset.pipelineNode && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault(); event.stopPropagation(); onSelect(target);
        }
      }}
    >
      <BaseNode icon={ICONS[node.kind]} subtitle={title} state={state} selected={selected} ariaLabel={`${title}, ${node.status}${node.status === 'running' && !isFresh ? ', updates delayed' : ''}`} body={
        <div className="space-y-2 text-xs">
          <p className="text-text-secondary">{node.status === 'running' && live && !isFresh ? 'Running · updates delayed' : node.status}</p>
          {visible?.attentionLabel && <p className="font-medium text-text-primary">{visible.attentionLabel}</p>}
          {revision && <div className="space-y-1"><div className="h-16 overflow-hidden rounded border border-border bg-surface-inset" aria-label={`${title} ${revision.label} preview`}>{revision.preview ?? <span className="flex h-full items-center justify-center text-text-secondary">Preview unavailable</span>}</div><span>{revision.label} available</span></div>}
          {pending && <p className={pending.status === 'failed' ? 'text-danger-fg' : 'text-info-fg'}>{pending.label} {pending.status === 'generating' ? 'generating' : 'generation failed'}</p>}
          {!!visible?.tools?.length && <div className="flex flex-wrap gap-1">{visible.tools.map((tool) => <Chip key={tool} size="xs">{tool}</Chip>)}</div>}
        </div>
      } />
      {!!visible?.feedbackCount && onFeedback && (!selectedRevisionId || revision) && <IconButton size="sm" className="nodrag nopan absolute -right-2 -top-2 h-7 w-7 rounded-full border border-border bg-surface" aria-label={`${visible.feedbackCount} comments on ${title}`} onClick={(event) => { event.stopPropagation(); onFeedback(target); }}><ChatIcon size={14} /><span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[10px] text-white">{visible.feedbackCount}</span></IconButton>}
    </div>
  );
}
