// AddPeoplePicker — modal people picker for a membership list: search, toggle
// people into a selection, see them as removable chips, confirm once. The
// library's `NewConversationPanel` starts a DM and `UserPicker` owns its own
// backend; this takes the candidate list from the host and hands back ids.

import { useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';
import Modal from '../shared/Modal';
import { Avatar } from '../shared/Avatar';
import { SearchInput } from '../shared/SearchInput';
import { cn } from '../../lib/cn';

export interface AddPeoplePickerCandidate {
  userId: string;
  displayName: string;
  /** Role, email or team — a second line under the name. */
  subtitle?: string;
}

export interface AddPeoplePickerProps {
  open: boolean;
  onClose: () => void;
  candidates: readonly AddPeoplePickerCandidate[];
  onAdd: (userIds: string[]) => void | Promise<void>;
  title?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  /** Confirm button label; the count is appended. */
  confirmLabel?: string;
  busy?: boolean;
  /** A refusal from the server, shown in place. */
  error?: string | null;
  'data-testid'?: string;
}

export function AddPeoplePicker({
  open, onClose, candidates, onAdd, title = 'Add people', searchPlaceholder = 'Find a person',
  emptyMessage = 'No one left to add.', confirmLabel = 'Add', busy = false, error = null, 'data-testid': testId = 'add-people',
}: AddPeoplePickerProps) {
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState<string[]>([]);

  // A fresh open starts clean; an added person leaving the candidate list drops from the selection.
  useEffect(() => { if (!open) { setQuery(''); setPicked([]); } }, [open]);
  // Return the SAME array when nothing was dropped so React bails out; a fresh array every time
  // turned each parent render (new-but-equal candidates) into an extra state update and commit.
  useEffect(() => {
    setPicked((p) => {
      const next = p.filter((id) => candidates.some((c) => c.userId === id));
      return next.length === p.length ? p : next;
    });
  }, [candidates]);

  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () => candidates.filter((c) => !q || c.displayName.toLowerCase().includes(q) || (c.subtitle ?? '').toLowerCase().includes(q)),
    [candidates, q],
  );
  const nameOf = (id: string) => candidates.find((c) => c.userId === id)?.displayName ?? id;
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth={560}
      footer={(
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" disabled={picked.length === 0 || busy} onClick={() => { void onAdd(picked); }} data-testid={`${testId}-confirm`}>
            {picked.length ? `${confirmLabel} ${picked.length}` : confirmLabel}
          </Button>
        </>
      )}
    >
      <div className="flex flex-col gap-3" data-testid={testId}>
        <SearchInput value={query} onChange={setQuery} placeholder={searchPlaceholder} data-testid={`${testId}-search`} />
        {picked.length > 0 && (
          <div className="flex flex-wrap gap-1" data-testid={`${testId}-selected`}>
            {picked.map((id) => <Chip key={id} size="sm" tone="accent" onRemove={() => toggle(id)}>{nameOf(id)}</Chip>)}
          </div>
        )}
        {shown.length === 0 ? (
          <p className="m-0 py-4 text-center text-[13px] text-text-tertiary">{candidates.length === 0 ? emptyMessage : 'No one matches.'}</p>
        ) : (
          <ul className="m-0 flex max-h-72 list-none flex-col gap-0.5 overflow-y-auto p-0" aria-label="People" data-testid={`${testId}-list`}>
            {shown.map((c) => {
              const on = picked.includes(c.userId);
              return (
                <li key={c.userId}>
                  <button
                    data-ui-part=""
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(c.userId)}
                    data-testid={`${testId}-person`}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-md border-0 px-2 py-1.5 text-left',
                      on ? 'bg-primary-bg' : 'bg-transparent hover:bg-surface-hover',
                    )}
                  >
                    <Avatar name={c.displayName} size={28} />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-[13px] font-medium text-text-primary">{c.displayName}</span>
                      {c.subtitle && <span className="truncate text-[11px] text-text-tertiary">{c.subtitle}</span>}
                    </span>
                    <span aria-hidden className="text-[12px] text-primary-fg">{on ? '✓' : ''}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {error && <p className="m-0 text-[12px] text-danger" role="alert">{error}</p>}
      </div>
    </Modal>
  );
}

export default AddPeoplePicker;
