// AddToChatDialog — Teams' "Add people", as a popover at the button that
// asked for it.
//
// Pick people from the directory, then say what they may read: nothing before
// now, the last N days, or everything. The choice is per add, not per person —
// Teams asks it once, and one answer for the batch is what people expect. The
// host does the adding; the popover reports what was asked and shows the
// server's refusal in place.

import { useEffect, useMemo, useState, type RefObject } from 'react';
import { PopoverForm, PopoverField } from '../shared/PopoverForm';
import SegmentedControl from '../shared/SegmentedControl';
import type { InlinePopoverPlacement } from '../shared/InlinePopover';
import SearchInput from '../shared/SearchInput';
import { Avatar } from '../shared/Avatar';
import { CloseIcon } from '../ui/Icons';
import { cn } from '../../lib/cn';
import type { MembershipHistory, MembershipHistoryMode } from './MembershipNotice';
import { DensityProvider } from '../shared/Density';

export interface AddToChatPerson {
  id: string;
  name: string;
  avatarUrl?: string;
  /** A second line — a title, an email, "already in 3 of your chats". */
  subtitle?: string;
}

export interface AddToChatDialogProps {
  open: boolean;
  /** "#design", "the chat with Carol" — the place they are being added to. */
  conversationName: string;
  /** Everyone who could be added — members already in are the host's to leave out. */
  people: readonly AddToChatPerson[];
  preselectedIds?: readonly string[];
  busy?: boolean;
  /** The control that opened it. The popover hangs off this; without it, it centres. */
  anchor?: RefObject<HTMLElement | null> | null;
  placement?: InlinePopoverPlacement;
  /** Resolves when the server has them; rejects with a reason to show. */
  onAdd: (userIds: string[], history: MembershipHistory) => Promise<void> | void;
  /**
   * Offer the Teams history choice. Off for a place whose policy decides
   * it — a room's members always get the room's past — and `onAdd` then
   * receives `{ mode: 'all' }`.
   */
  historyChoice?: boolean;
  onClose: () => void;
  'data-testid'?: string;
}

export const HISTORY_DAYS_DEFAULT = 7;
export const HISTORY_DAYS_MIN = 1;
export const HISTORY_DAYS_MAX = 3650;

const HISTORY_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Recent', value: 'days' },
  { label: 'All', value: 'all' },
];

const HISTORY_HINT: Record<MembershipHistoryMode, string> = {
  none: 'They see what is said from now on.',
  days: 'A recent stretch of the conversation.',
  all: 'Everything ever said here.',
};

export function AddToChatDialog({
  open,
  conversationName,
  people,
  preselectedIds = [],
  busy = false,
  anchor,
  placement = 'bottom-end',
  onAdd,
  onClose,
  'data-testid': testId = 'add-to-chat-dialog',
  historyChoice = true,
}: AddToChatDialogProps) {
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState<string[]>([...preselectedIds]);
  const [mode, setMode] = useState<MembershipHistoryMode>('none');
  const [days, setDays] = useState<number>(HISTORY_DAYS_DEFAULT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Re-seed each time it opens: a form that remembers last time's picks
  // adds the wrong people to the next chat.
  useEffect(() => {
    if (!open) return;
    setQuery('');
    setPicked([...preselectedIds]);
    setMode('none');
    setDays(HISTORY_DAYS_DEFAULT);
    setSaving(false);
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, preselectedIds.join('\n')]);

  const byId = useMemo(() => new Map(people.map((p) => [p.id, p])), [people]);
  const candidates = useMemo(() => {
    const q = query.trim().toLowerCase();
    return people.filter((p) => !q || p.name.toLowerCase().includes(q) || (p.subtitle ?? '').toLowerCase().includes(q));
  }, [people, query]);

  const toggle = (id: string) => setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const daysOk = Number.isInteger(days) && days >= HISTORY_DAYS_MIN && days <= HISTORY_DAYS_MAX;
  const inert = busy || saving;
  const canAdd = picked.length > 0 && (!historyChoice || mode !== 'days' || daysOk) && !inert;

  const add = async () => {
    if (!canAdd) return;
    setSaving(true);
    setError(null);
    try {
      await onAdd(picked, !historyChoice ? { mode: 'all' } : mode === 'days' ? { mode, days } : { mode });
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setSaving(false);
    }
  };

  return (
    <PopoverForm
      open={open}
      anchor={anchor}
      placement={placement}
      width="lg"
      title="Add people"
      subtitle={conversationName}
      submitLabel={picked.length > 1 ? `Add ${picked.length}` : 'Add'}
      submitTestId={`${testId}-add`}
      submitDisabled={!canAdd}
      busy={inert}
      error={error}
      onSubmit={() => void add()}
      onClose={onClose}
      data-testid={testId}
    >
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Enter a name"
        aria-label="Find people to add"
        className="w-full"
        data-testid={`${testId}-search`}
      />

      {picked.length > 0 && (
        <div className="flex flex-wrap gap-1" data-testid={`${testId}-picked`}>
          {picked.map((id) => {
            const p = byId.get(id);
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1 rounded-full bg-primary-bg py-0.5 pl-0.5 pr-1 text-[11px] text-primary-fg"
                data-testid={`${testId}-picked-${id}`}
              >
                <Avatar name={p?.name ?? id} src={p?.avatarUrl} size={16} />
                <span className="max-w-[9rem] truncate">{p?.name ?? id}</span>
                <button
                  data-ui-part=""
                  type="button"
                  aria-label={`Remove ${p?.name ?? id}`}
                  onClick={() => toggle(id)}
                  disabled={inert}
                  className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-none bg-transparent p-0 text-current hover:bg-black/10"
                  data-testid={`${testId}-unpick-${id}`}
                >
                  <CloseIcon size={9} />
                </button>
              </span>
            );
          })}
        </div>
      )}

      <ul
        role="listbox" data-ui-listbox="add-to-chat"
        aria-label="People"
        aria-multiselectable="true"
        className="m-0 max-h-44 list-none overflow-y-auto rounded-md border border-border p-0"
        data-testid={`${testId}-people`}
      >
        {candidates.length === 0 && (
          <li className="px-2.5 py-2 text-[11px] text-text-tertiary" data-testid={`${testId}-nobody`}>
            {people.length === 0 ? 'Everyone is already here.' : 'Nobody by that name.'}
          </li>
        )}
        {candidates.map((p) => {
          const on = picked.includes(p.id);
          return (
            <li key={p.id} role="option" aria-selected={on}>
              <button
                data-ui-part=""
                type="button"
                onClick={() => toggle(p.id)}
                disabled={inert}
                className={cn(
                  'flex w-full items-center gap-2 border-none bg-transparent px-2.5 py-1.5 text-left font-[inherit] text-[13px] hover:bg-surface-hover',
                  on && 'bg-surface-inset',
                )}
                data-testid={`${testId}-person-${p.id}`}
              >
                <Avatar name={p.name} src={p.avatarUrl} size={22} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate leading-tight text-text-primary">{p.name}</span>
                  {p.subtitle && <span className="block truncate text-[11px] leading-tight text-text-tertiary">{p.subtitle}</span>}
                </span>
                <span className={cn('text-[11px]', on ? 'text-primary' : 'text-transparent')} aria-hidden="true">✓</span>
              </button>
            </li>
          );
        })}
      </ul>

      {historyChoice && (
        <PopoverField
          label="Chat history"
          hint={mode === 'days' ? undefined : HISTORY_HINT[mode]}
          data-testid={`${testId}-history-field`}
        >
          <DensityProvider density="compact"><SegmentedControl
            fullWidth
            disabled={inert}
            aria-label="How much chat history they get"
            options={HISTORY_OPTIONS}
            value={mode}
            onChange={(v) => setMode(v as MembershipHistoryMode)}
            data-testid={`${testId}-history`}
          /></DensityProvider>
        </PopoverField>
      )}

      {historyChoice && mode === 'days' && (
        <div className="flex items-center gap-2 text-[11px] text-text-secondary">
          <span>The past</span>
          <input
            data-ui-part=""
            type="number"
            min={HISTORY_DAYS_MIN}
            max={HISTORY_DAYS_MAX}
            value={Number.isFinite(days) ? days : ''}
            disabled={inert}
            aria-label="Number of days of history"
            onChange={(e) => setDays(e.target.value === '' ? NaN : Number(e.target.value))}
            className={cn(
              'h-7 w-16 rounded-md border bg-surface px-2 text-[12px] text-text-primary',
              daysOk ? 'border-border' : 'border-danger-fg',
            )}
            data-testid={`${testId}-days`}
          />
          <span>days</span>
          {!daysOk && <span className="text-danger-fg">{HISTORY_DAYS_MIN}–{HISTORY_DAYS_MAX}</span>}
        </div>
      )}
    </PopoverForm>
  );
}

export default AddToChatDialog;
