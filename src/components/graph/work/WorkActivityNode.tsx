import { Avatar } from '../../shared/Avatar';
import { IconButton } from '../../ui/IconButton';
import { ChatIcon } from '../../ui/Icons';
import { cn } from '../../../lib/cn';
import { workPauseLabel } from './WorkStatus';
import type { WorkActivityNodeDetail, WorkGraphNodeData, WorkGraphSelection } from './types';

const ICONS: Record<WorkGraphNodeData['kind'], string> = { project: '▱', terminal: '⌘', agent: '✦', run: '▶', document: '▤', change: '⌥', conversation: '◌', meeting: '◉', transcript: '▤', task: '☑' };

/**
 * The accent bar says what KIND of work this is — the one channel that never
 * moves. Status owns the dot and, when something is wrong or in flight, the
 * border. Keeping them apart is why a finished meeting still reads as a
 * meeting.
 */
const ACCENT: Record<WorkGraphNodeData['kind'], { bar: string; chip: string }> = {
  meeting: { bar: 'bg-cat-human', chip: 'bg-cat-human/10 text-cat-human' },
  conversation: { bar: 'bg-cat-human', chip: 'bg-cat-human/10 text-cat-human' },
  transcript: { bar: 'bg-cat-sink', chip: 'bg-cat-sink/10 text-cat-sink' },
  terminal: { bar: 'bg-cat-sink', chip: 'bg-cat-sink/10 text-cat-sink' },
  document: { bar: 'bg-cat-source', chip: 'bg-cat-source/10 text-cat-source' },
  project: { bar: 'bg-cat-source', chip: 'bg-cat-source/10 text-cat-source' },
  task: { bar: 'bg-cat-source', chip: 'bg-cat-source/10 text-cat-source' },
  run: { bar: 'bg-cat-ai', chip: 'bg-cat-ai/10 text-cat-ai' },
  agent: { bar: 'bg-cat-ai', chip: 'bg-cat-ai/10 text-cat-ai' },
  change: { bar: 'bg-cat-transform', chip: 'bg-cat-transform/10 text-cat-transform' },
};

/**
 * The host's preview is its own artwork at its own size. Give it the box and
 * let it scale into it: an SVG with a viewBox letterboxes itself, an image gets
 * object-contain, and plain markup simply fills. Cropping a slide to fit is the
 * one thing a thumbnail must never do.
 */
export const PREVIEW_FIT = 'flex items-center justify-center [&>*]:h-full [&>*]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full';

const DOT: Record<WorkGraphNodeData['status'], string> = {
  idle: 'bg-border-emphasis', running: 'bg-info', waiting: 'bg-caution',
  completed: 'bg-success', error: 'bg-danger', stopped: 'bg-border-emphasis', stale: 'bg-border-emphasis',
};

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
  const muted = visible?.emphasis === 'earlier' || visible?.emphasis === 'input';
  // A finished artifact with something to read is green; work in flight is
  // blue; a failed run is red. Everything else keeps the plain border.
  // ONE state, read by the card and by its accessible name alike: a revision
  // being generated (or one that failed) outranks the run's own status — a
  // card that shows "v5 generating" must not announce "completed".
  const generating = pending?.status === 'generating';
  const ready = !!visible?.artifact?.revisions.length && node.status !== 'running' && !generating;
  const accent = ACCENT[node.kind];
  const failed = node.status === 'error';
  const current = visible?.emphasis === 'current' || (!muted && node.status === 'running' && isFresh);
  const delayed = node.status === 'running' && live && !isFresh;
  // A waiting run says why (NFR #126): "Needs approval", "Paused at write".
  const paused = workPauseLabel(node.status, visible?.pause);
  const statusLine = delayed ? 'Running · updates delayed' : paused ?? node.status;
  // The delay is printed, not only announced: with host lines the card used
  // to show "Tests running" while its accessible name said "updates delayed".
  const lines = visible?.lines?.length ? (delayed ? [...visible.lines, 'Updates delayed'] : visible.lines) : [statusLine];
  const cardState = pending?.status === 'generating' ? `${pending.label} generating`
    : pending?.status === 'failed' ? `${pending.label} generation failed`
      : node.status === 'running' && !isFresh ? 'running, updates delayed'
        : paused ? `waiting, ${paused}` : node.status;
  const target = { kind: 'node' as const, id: node.id, ...(revision ? { revisionId: revision.id } : {}) };
  const select = () => onSelect(target);
  return (
    <div
      className="pointer-events-auto relative w-[200px]"
      data-emphasis={visible?.emphasis ?? 'current'}
      data-work-node={node.id}
      onClick={select}
    >
      <article
        role="button"
        tabIndex={0}
        aria-label={`${title}, ${cardState}`}
        aria-pressed={selected}
        data-work-card={node.id}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); } }}
        className={cn(
          'relative overflow-hidden rounded-lg border bg-surface text-left shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          failed ? 'border-danger' : current ? 'border-info' : ready ? 'border-success' : 'border-border',
          failed || current || ready ? 'border-2' : '',
          ready && 'bg-success-bg/40',
          muted && 'opacity-80',
          selected && 'ring-2 ring-primary/30',
        )}
      >
        <span aria-hidden="true" className={cn('absolute inset-y-0 left-0 w-[3px]', failed ? 'bg-danger' : ready ? 'bg-success' : current ? 'bg-info' : accent.bar)} />
        <header className="flex items-center gap-2 border-b border-border bg-surface-panel py-1.5 pl-3.5 pr-2.5">
          <span aria-hidden="true" className={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded text-[11px] leading-none', accent.chip)}>{ICONS[node.kind]}</span>
          <span title={title} className={cn('min-w-0 flex-1 truncate text-[12px] font-semibold', muted ? 'text-text-secondary' : 'text-text-primary')}>{title}</span>
          <span aria-hidden="true" className={cn('h-2 w-2 shrink-0 rounded-full', muted ? 'bg-border-emphasis' : DOT[node.status])} />
        </header>
        <div className={cn('space-y-1.5 py-2 pl-3.5 pr-2.5 text-[11px] leading-snug', muted ? 'text-text-tertiary' : 'text-text-secondary')}>
          {lines.map((line, index) => (
            <div key={`${index}-${line}`} className="flex items-start justify-between gap-1.5">
              <span className="min-w-0">{line}</span>
              {index === 0 && visible?.badge && (
                <span className={cn('shrink-0 rounded px-1.5 py-px text-[10px] font-semibold', node.status === 'running' ? 'border border-info-border text-info-fg' : 'bg-info-bg text-info-fg')}>{visible.badge}</span>
              )}
              {index === 0 && !visible?.badge && paused && line !== paused && (
                <span data-testid="work-card-pause" className="shrink-0 rounded bg-warning-bg px-1.5 py-px text-[10px] font-semibold text-warning-fg">{paused}</span>
              )}
            </div>
          ))}
          {!!visible?.participants?.length && (
            <div className="flex items-center gap-1.5">
              <span className="flex -space-x-1.5">
                {visible.participants.slice(0, 3).map((person) => <Avatar key={person.id} name={person.label} src={person.avatarUrl} size={18} className="ring-1 ring-surface" />)}
              </span>
              <span className="min-w-0 truncate text-[10px]">{visible.participants.map((person) => person.label).slice(0, 2).join(', ')}{visible.participants.length > 2 ? ` +${visible.participants.length - 2}` : ''}</span>
            </div>
          )}
          {visible?.excerpt && <p className={cn('text-[11px] italic', muted ? 'text-text-secondary' : 'text-text-primary')}>{`“${visible.excerpt}”`}</p>}
          {visible?.attentionLabel && <p className="font-medium text-text-primary">{visible.attentionLabel}</p>}
          {revision?.preview && (
            <div className={cn('aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface', PREVIEW_FIT)} aria-label={`${title} ${revision.label} preview`}>{revision.preview}</div>
          )}
          {!!visible?.artifact?.revisions.length && (
            <div className="flex flex-wrap items-center gap-1 text-[10px]" aria-label={`${title} revisions`}>
              {visible.artifact.revisions.map((item) => (
                <span key={item.id} className={cn('rounded px-1.5 py-0.5', item.id === revision?.id ? 'bg-info-bg font-medium text-info-fg' : 'text-text-tertiary')}>{item.label}</span>
              ))}
              {pending?.status === 'generating' && <span className="rounded px-1.5 py-0.5 text-info-fg">{pending.label} generating</span>}
            </div>
          )}
          {pending?.status === 'failed' && !visible?.lines?.length && <p className="text-danger-fg">{pending.label} generation failed</p>}
        </div>
        {visible?.footer && (
          <div className="flex items-center justify-between gap-2 border-t border-border py-1.5 pl-3.5 pr-2.5 text-[10px] text-text-tertiary">
            <span className="truncate">{visible.footer.label}</span>
            {visible.footer.note && <span className="shrink-0">{visible.footer.note}</span>}
          </div>
        )}
      </article>
      {/* The prototype hangs the run's tools off the card, not inside it: they
          belong to the attempt, and the card is the thing itself. */}
      {!!visible?.tools?.length && (
        <div className="flex flex-wrap items-center gap-1.5 pl-1 pt-1 text-[10px] text-text-tertiary">
          <span>Tools</span>
          {visible.tools.map((tool) => <span key={tool} className="rounded bg-surface-panel px-1.5 py-0.5 font-semibold text-text-secondary">{tool}</span>)}
        </div>
      )}
      {!!visible?.feedbackCount && onFeedback && (!selectedRevisionId || revision) && (
        <IconButton size="sm" className="nodrag nopan absolute -right-2 -top-3 h-7 w-7 rounded-full border border-border bg-surface shadow-sm" aria-label={`${visible.feedbackCount} comments on ${title}`} onClick={(event) => { event.stopPropagation(); onFeedback(target); }}>
          <ChatIcon size={14} />
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[10px] text-white">{visible.feedbackCount}</span>
        </IconButton>
      )}
    </div>
  );
}
