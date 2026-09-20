import { Avatar } from '../../shared/Avatar';
import { Button } from '../../ui/Button';
import { cn } from '../../../lib/cn';
import { WorkStatus } from './WorkStatus';
import type {
  WorkGraphCapability,
  WorkGraphNodeData,
  WorkNodeProps,
} from './types';

const KIND_LABEL: Record<WorkGraphNodeData['kind'], string> = {
  project: 'Project',
  terminal: 'Terminal',
  agent: 'Agent',
  run: 'Run',
  document: 'Document',
  change: 'Change',
  conversation: 'Chat',
  meeting: 'Meeting',
  transcript: 'Transcript',
  task: 'Task',
};

// Keep this list deliberately narrow. A capability is an authorization to do
// one source action, not permission to open every related source in the graph.
const OPEN_CAPABILITY: Partial<Record<WorkGraphNodeData['kind'], WorkGraphCapability>> = {
  terminal: 'observe-terminal',
  document: 'view-document',
  conversation: 'join-conversation',
  meeting: 'join-meeting',
  transcript: 'view-transcript',
  run: 'view-run',
};

const OPEN_LABEL: Partial<Record<WorkGraphNodeData['kind'], string>> = {
  terminal: 'Observe',
  document: 'View',
  conversation: 'Open chat',
  meeting: 'Join',
  transcript: 'View',
  run: 'View',
};

function formatTimestamp(value: string | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function safeTitle(node: WorkGraphNodeData): string {
  // Locked nodes are already sanitized by the server. Never echo their title
  // (or description) as a tooltip: a UI blur is not an access-control check.
  return node.locked ? 'Restricted work item' : node.title.trim() || `${KIND_LABEL[node.kind]} (untitled)`;
}

export function WorkNode({ node, selected = false, sharingFresh = false, onSelect, onOpen }: WorkNodeProps) {
  const title = safeTitle(node);
  const capability = OPEN_CAPABILITY[node.kind];
  const canOpen = capability !== undefined && node.capabilities.includes(capability);
  const openLabel = OPEN_LABEL[node.kind] ?? 'Open';
  const updated = formatTimestamp(node.updatedAt);
  const started = formatTimestamp(node.startedAt);
  const ended = formatTimestamp(node.endedAt);

  const select = () => onSelect?.(node.id);

  return (
    <article
      role="group"
      tabIndex={0}
      aria-label={`${KIND_LABEL[node.kind]}: ${title}`}
      aria-current={selected ? 'true' : undefined}
      data-testid={`work-node-${node.id}`}
      data-kind={node.kind}
      data-locked={node.locked ? 'true' : 'false'}
      onClick={select}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          select();
        }
      }}
      className={cn(
        'flex min-w-0 flex-col gap-3 rounded-lg border bg-surface p-3 text-left transition-colors',
        selected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:bg-surface-hover',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
      )}
    >
      <div className="flex min-w-0 items-start gap-2">
        <Avatar
          name={node.locked ? 'Restricted work item' : title}
          {...(!node.locked && node.avatarUrl ? { src: node.avatarUrl } : {})}
          size={32}
        />
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
            {KIND_LABEL[node.kind]}
          </div>
          <h3 className="break-words line-clamp-2 text-sm font-semibold text-text-primary" data-testid="work-node-title">
            {title}
          </h3>
        </div>
        {selected && <span className="sr-only">Selected</span>}
      </div>

      {node.kind === 'conversation' && node.status === 'completed'
        ? <span role="status" className="text-xs font-medium text-text-secondary">Recent activity</span>
        : <WorkStatus status={node.status} sharingFresh={sharingFresh} />}

      {!node.locked && node.description && (
        <p className="break-words line-clamp-3 text-xs text-text-secondary">{node.description}</p>
      )}

      <dl className="grid min-w-0 gap-1 text-[11px] text-text-tertiary">
        {started && <div><dt className="inline font-medium">{node.kind === 'conversation' ? 'First activity: ' : 'Started: '}</dt><dd className="inline">{started}</dd></div>}
        <div><dt className="inline font-medium">{node.kind === 'conversation' ? 'Last activity: ' : 'Updated: '}</dt><dd className="inline">{updated ?? 'Unknown'}</dd></div>
        {ended && <div><dt className="inline font-medium">Ended: </dt><dd className="inline">{ended}</dd></div>}
      </dl>

      {canOpen && capability && (
        <Button
          size="sm"
          variant="secondary"
          disabled={!canOpen || !onOpen}
          data-capability={capability}
          aria-label={`${openLabel} ${KIND_LABEL[node.kind].toLowerCase()}`}
          onClick={(event) => {
            event.stopPropagation();
            if (canOpen) onOpen?.(node.id);
          }}
        >
          {openLabel}
        </Button>
      )}
    </article>
  );
}

export default WorkNode;
