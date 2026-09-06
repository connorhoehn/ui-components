// Who a document belongs to, and who is on it.
//
// A document header that shows only a status pill answers "what state is this
// in" and leaves "whose is it" unanswered — which is the first thing anyone
// opening someone else's page wants to know, and the thing that decides
// whether they may edit it. Ownership belongs beside the status, not buried in
// a menu or inferred from the activity feed.
//
// Deliberately READ-ONLY here. Changing who may see a document is a different,
// heavier action with consequences outside the page, so it lives behind the
// Share control rather than being editable inline.

import Avatar from '../shared/Avatar';
import { cn } from '../../lib/cn';

export interface DocumentPerson {
  userId: string;
  displayName: string;
  avatarUrl?: string;
}

export interface DocumentOwnershipProps {
  /** The document's owner. Omit while it is still loading — renders nothing. */
  owner?: DocumentPerson | null;
  /**
   * Everyone else with access, owner excluded. Shown as stacked avatars, so
   * the answer to "who else is on this" costs no reading.
   */
  collaborators?: readonly DocumentPerson[];
  /** How many avatars before the rest become a +N. Default 3. */
  maxAvatars?: number;
  /** Opens the share surface. Omit and no Share control is offered. */
  onShare?: () => void;
  className?: string;
  'data-testid'?: string;
}

export function DocumentOwnership({
  owner,
  collaborators = [],
  maxAvatars = 3,
  onShare,
  className,
  'data-testid': testId = 'document-ownership',
}: DocumentOwnershipProps) {
  if (!owner) return null;

  const shown = collaborators.slice(0, maxAvatars);
  const overflow = collaborators.length - shown.length;

  return (
    <span data-testid={testId} className={cn('inline-flex items-center gap-2', className)}>
      <span className="inline-flex items-center gap-1.5">
        <Avatar name={owner.displayName} size={20} {...(owner.avatarUrl ? { src: owner.avatarUrl } : {})} />
        {/* "Owned by" rather than a bare name: a name alone next to a status
            pill reads as "who last touched it", which is a different fact. */}
        <span className="text-xs text-text-secondary" data-testid={`${testId}-owner`}>
          Owned by <span className="font-medium text-text-primary">{owner.displayName}</span>
        </span>
      </span>

      {shown.length > 0 && (
        <span className="inline-flex items-center" data-testid={`${testId}-collaborators`}>
          {shown.map((p, i) => (
            <span
              key={p.userId}
              // Overlapped, in reading order, so the group reads as one object.
              className={cn('inline-flex rounded-full ring-2 ring-surface', i > 0 && '-ml-1.5')}
              title={p.displayName}
            >
              <Avatar name={p.displayName} size={20} {...(p.avatarUrl ? { src: p.avatarUrl } : {})} />
            </span>
          ))}
          {overflow > 0 && (
            <span
              data-testid={`${testId}-overflow`}
              title={collaborators.slice(maxAvatars).map((p) => p.displayName).join(', ')}
              className="-ml-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-surface-inset px-1 text-[10px] font-semibold text-text-secondary ring-2 ring-surface"
            >
              +{overflow}
            </span>
          )}
        </span>
      )}

      {onShare && (
        <button
          type="button"
          onClick={onShare}
          data-testid={`${testId}-share`}
          className="rounded border border-border px-2 py-0.5 text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary"
        >
          Share
        </button>
      )}
    </span>
  );
}

export default DocumentOwnership;
