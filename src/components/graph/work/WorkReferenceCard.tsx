import { Button } from '../../ui/Button';
import type { WorkGraphCapability, WorkGraphSelection, WorkReferenceCardProps } from './types';

const OPEN_CAPABILITIES = new Set<WorkGraphCapability>([
  'view-document', 'edit-document', 'join-conversation', 'join-meeting',
  'observe-terminal', 'control-terminal', 'view-transcript', 'view-run',
]);

export function WorkReferenceCard({ target, state, node, edge, unavailableLabel, onSelect, onOpen }: WorkReferenceCardProps) {
  const resolved = target?.kind === 'node' ? node : target?.kind === 'edge' ? edge : undefined;
  if (state === 'loading') {
    return <article aria-label="Shared work reference" aria-busy="true" className="rounded-lg border border-border bg-surface p-3"><p role="status" className="text-sm text-text-secondary">Loading shared work…</p></article>;
  }
  if (state === 'unavailable' || !target || !resolved) {
    return <article aria-label="Shared work reference" className="rounded-lg border border-border bg-surface p-3"><p className="text-sm text-text-secondary">{unavailableLabel ?? 'This work item is unavailable.'}</p></article>;
  }

  const title = target.kind === 'node'
    ? (node?.locked ? 'Restricted work item' : node?.title)
    : edge?.label?.trim() || `${edge?.relation ?? 'Shared'} relationship`;
  const capabilities = target.kind === 'node' ? node?.capabilities ?? [] : edge?.capabilities ?? [];
  const canOpen = capabilities.some((capability) => OPEN_CAPABILITIES.has(capability));
  const selection: Exclude<WorkGraphSelection, null> = target;

  return (
    <article aria-label="Shared work reference" className="space-y-3 rounded-lg border border-border bg-surface p-3">
      <button
        data-ui-part=""
        type="button"
        aria-label={`Select reference: ${title}`}
        disabled={!onSelect}
        onClick={() => onSelect?.(selection)}
        className="block w-full rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-default"
      >
        <span className="block text-xs font-medium uppercase tracking-wide text-text-tertiary">{target.kind === 'node' ? node?.kind : 'Relationship'}</span>
        <span className="block break-words text-sm font-semibold text-text-primary">{title}</span>
        <span className="block text-xs text-text-secondary">{resolved.status}</span>
      </button>
      {canOpen && onOpen ? <Button size="sm" variant="secondary" onClick={() => onOpen(selection)}>Open shared work</Button> : null}
    </article>
  );
}

export default WorkReferenceCard;
