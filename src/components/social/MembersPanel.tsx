// MembersPanel — who is in this conversation, and the way to change it.
//
// Sits beside Files / Documents / Pinned. Owners add and remove; anyone may
// take themselves out. An open channel — one that gates nobody — says so and
// offers the first add, which is what turns it members-only.

import Chip from '../shared/Chip';
import { Avatar } from '../shared/Avatar';
import EmptyState from '../shared/EmptyState';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { CloseIcon, PlusIcon } from '../ui/Icons';
import { cn } from '../../lib/cn';
import { DensityProvider } from '../shared/Density';

export interface ChatMember {
  id: string;
  name: string;
  avatarUrl?: string;
  role: 'owner' | 'member';
  /** ISO. */
  addedAt?: string;
}

export interface MembersPanelProps {
  members: readonly ChatMember[];
  /** True when the channel gates nobody — everyone in the org can read it. */
  open?: boolean;
  /** The viewer may add and remove (an owner). */
  canManage?: boolean;
  currentUserId?: string;
  /**
   * "Add people". Receives the button that was pressed, so the host can open
   * an anchored form beside it rather than a centred modal.
   */
  onAdd?: (trigger?: HTMLElement) => void;
  onRemove?: (userId: string) => void;
  className?: string;
  'data-testid'?: string;
}

function formatAdded(iso: string | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `Added ${d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
}

export function MembersPanel({
  members,
  open = false,
  canManage = false,
  currentUserId,
  onAdd,
  onRemove,
  className,
  'data-testid': testId = 'members-panel',
}: MembersPanelProps) {
  const sorted = [...members].sort((a, b) => (a.role === b.role ? a.name.localeCompare(b.name) : a.role === 'owner' ? -1 : 1));
  return (
    <div className={cn('flex min-h-0 flex-col', className)} data-testid={testId} data-open={String(open)}>
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2">
        <span className="text-xs text-text-tertiary" data-testid={`${testId}-count`}>
          {open ? 'Open channel' : `${members.length} ${members.length === 1 ? 'member' : 'members'}`}
        </span>
        {onAdd && (
          <Button variant="secondary" size="sm" onClick={(e) => onAdd(e.currentTarget)} data-testid={`${testId}-add`}>
            <span className="inline-flex items-center gap-1"><PlusIcon size={12} /> Add people</span>
          </Button>
        )}
      </div>
      {open && members.length === 0 ? (
        <DensityProvider density="compact"><EmptyState
          title="Everyone can read this channel."
          body="Add people to make it members-only."
          // The empty state's action reports no element, so a host that
          // anchors gets undefined here and falls back to its centred form
          // rather than pointing a popover at nothing.
          {...(onAdd ? { actionLabel: 'Add people', onAction: () => onAdd() } : {})}
          testId={`${testId}-empty`}
        /></DensityProvider>
      ) : (
        <ul className="m-0 min-h-0 flex-1 list-none overflow-y-auto p-0" data-testid={`${testId}-list`}>
          {sorted.map((m) => {
            const isMe = m.id === currentUserId;
            const removable = !!onRemove && (canManage || isMe);
            return (
              <li key={m.id} className="flex items-center gap-2 px-3 py-2" data-testid={`${testId}-member-${m.id}`}>
                <Avatar name={m.name} src={m.avatarUrl} size={28} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-text-primary">
                    {m.name}{isMe && <span className="text-text-tertiary"> (you)</span>}
                  </span>
                  {m.addedAt && <span className="block truncate text-xs text-text-tertiary">{formatAdded(m.addedAt)}</span>}
                </span>
                {m.role === 'owner' && <Chip tone="neutral" size="xs" data-testid={`${testId}-owner-${m.id}`}>Owner</Chip>}
                {removable && (
                  <IconButton
                    aria-label={isMe ? 'Leave' : `Remove ${m.name}`}
                    title={isMe ? 'Leave' : 'Remove'}
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove?.(m.id)}
                    icon={<CloseIcon size={12} />}
                    data-testid={`${testId}-remove-${m.id}`}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MembersPanel;
