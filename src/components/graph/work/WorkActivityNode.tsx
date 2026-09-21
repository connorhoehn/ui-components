import BaseNode, { type NodeExecutionState } from '../../pipelines/nodes/BaseNode';
import Chip from '../../shared/Chip';
import { IconButton } from '../../ui/IconButton';
import { ChatIcon } from '../../ui/Icons';
import { cn } from '../../../lib/cn';
import type { WorkActivityNodeDetail, WorkGraphNodeData, WorkGraphSelection } from './types';

const ICONS: Record<WorkGraphNodeData['kind'], string> = { project: '▱', terminal: '>_', agent: '✦', run: '▶', document: '▤', change: '⌘', conversation: '◌', meeting: '◎', transcript: '≡', task: '✓' };
// Only work in flight and work that failed earn a coloured card. Everything
// else stays neutral, so a finished step does not shout louder than the run
// that is still going.
const STATES: Record<WorkGraphNodeData['status'], NodeExecutionState> = { idle: 'idle', running: 'running', waiting: 'awaiting', completed: 'idle', error: 'failed', stopped: 'idle', stale: 'idle' };

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
  const muted = visible?.emphasis === 'earlier' || visible?.emphasis === 'input';
  const statusLine = node.status === 'running' && live && !isFresh ? 'Running · updates delayed' : node.status;
  const lines = visible?.lines?.length ? visible.lines : [statusLine];
  const target = { kind: 'node' as const, id: node.id, ...(revision ? { revisionId: revision.id } : {}) };
  return (
    <div
      className={cn(
        'pointer-events-auto relative w-[200px]',
        visible?.emphasis === 'earlier' && 'opacity-70 [&_[data-pipeline-node]]:border-border [&_[data-pipeline-node]]:bg-surface-inset',
        visible?.emphasis === 'input' && '[&_[data-pipeline-node]]:border-border-emphasis',
      )}
      data-emphasis={visible?.emphasis ?? 'current'}
      onClick={() => onSelect(target)}
      onKeyDown={(event) => {
        if (event.target instanceof HTMLElement && event.target.dataset.pipelineNode && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault(); event.stopPropagation(); onSelect(target);
        }
      }}
    >
      <BaseNode icon={ICONS[node.kind]} subtitle={title} state={state} selected={selected} ariaLabel={`${title}, ${node.status}${node.status === 'running' && !isFresh ? ', updates delayed' : ''}`} body={
        <div className="space-y-1.5 text-[10px] leading-snug">
          {lines.map((line, index) => (
            <div key={`${index}-${line}`} className="flex items-start justify-between gap-1.5">
              <span className={muted ? 'text-text-tertiary' : 'text-text-secondary'}>{line}</span>
              {index === 0 && visible?.badge && <Chip size="xs" tone={node.status === 'error' ? 'danger' : node.status === 'running' ? 'info' : 'neutral'} className="shrink-0">{visible.badge}</Chip>}
            </div>
          ))}
          {visible?.excerpt && <p className="text-[10px] italic text-text-primary">{`“${visible.excerpt}”`}</p>}
          {visible?.attentionLabel && <p className="font-medium text-text-primary">{visible.attentionLabel}</p>}
          {revision && (
            <div className="space-y-1">
              <div className="h-[88px] overflow-hidden rounded border border-border bg-surface-inset" aria-label={`${title} ${revision.label} preview`}>
                {revision.preview ?? <span className="flex h-full items-center justify-center text-text-secondary">Preview unavailable</span>}
              </div>
              <div className="flex flex-wrap items-center gap-1 text-[10px]" aria-label={`${title} revisions`}>
                {visible?.artifact?.revisions.map((item) => (
                  <span key={item.id} className={cn('rounded-sm px-1.5 py-0.5', item.id === revision.id ? 'bg-info-bg text-info-fg' : 'bg-surface-inset text-text-tertiary')}>{item.label}</span>
                ))}
                {pending?.status === 'generating' && <span className="rounded-sm bg-info-bg px-1.5 py-0.5 text-info-fg">{pending.label} generating</span>}
              </div>
            </div>
          )}
          {pending?.status === 'failed' && !visible?.lines?.length && <p className="text-danger-fg">{pending.label} generation failed</p>}
          {!!visible?.tools?.length && (
            <div className="flex flex-wrap items-center gap-1 pt-0.5 text-[10px] text-text-tertiary">
              <span>Tools</span>
              {visible.tools.map((tool) => <Chip key={tool} size="xs">{tool}</Chip>)}
            </div>
          )}
        </div>
      } footer={visible?.footer && (
        <div className="flex items-center justify-between gap-2 text-[10px] text-text-tertiary">
          <span className="truncate">{visible.footer.label}</span>
          {visible.footer.note && <span className="shrink-0">{visible.footer.note}</span>}
        </div>
      )} />
      {!!visible?.feedbackCount && onFeedback && (!selectedRevisionId || revision) && <IconButton size="sm" className="nodrag nopan absolute -right-2 -top-2 h-7 w-7 rounded-full border border-border bg-surface" aria-label={`${visible.feedbackCount} comments on ${title}`} onClick={(event) => { event.stopPropagation(); onFeedback(target); }}><ChatIcon size={14} /><span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[10px] text-white">{visible.feedbackCount}</span></IconButton>}
    </div>
  );
}
