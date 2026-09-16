// AddToChatDialog — Teams' "Add people" for a chat or channel.
//
// Pick people from the directory, then say what they may read: nothing
// before now, the last N days, or everything. The choice is per add, not per
// person — Teams asks it once, and one answer for the batch is what people
// expect. The host does the adding; the dialog reports what was asked and
// shows the server's refusal in place.

import { useEffect, useMemo, useState } from 'react';
import Modal from '../shared/Modal';
import SearchInput from '../shared/SearchInput';
import Chip from '../shared/Chip';
import { Avatar } from '../shared/Avatar';
import FormField from '../shared/FormField';
import { ChoiceList, ChoiceRow } from '../shared/ChoiceList';
import { Button } from '../ui/Button';
import { CloseIcon } from '../ui/Icons';
import { cn } from '../../lib/cn';
import type { MembershipHistory, MembershipHistoryMode } from './MembershipNotice';

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

const HISTORY_CHOICES: ReadonlyArray<{ mode: MembershipHistoryMode; title: string; description: string }> = [
  { mode: 'none', title: "Don't include chat history", description: 'They see what is said from now on' },
  { mode: 'days', title: 'Include history from the past days', description: 'A recent stretch of the conversation' },
  { mode: 'all', title: 'Include all chat history', description: 'Everything ever said here' },
];

export const HISTORY_DAYS_DEFAULT = 7;
export const HISTORY_DAYS_MIN = 1;
export const HISTORY_DAYS_MAX = 3650;

export function AddToChatDialog({
  open,
  conversationName,
  people,
  preselectedIds = [],
  busy = false,
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

  // Re-seed each time it opens: a dialog that remembers last time's picks
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
  const canAdd = picked.length > 0 && (mode !== 'days' || daysOk) && !inert;

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
    <Modal
      open={open}
      onClose={onClose}
      title={`Add people to ${conversationName}`}
      maxWidth={520}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={inert} data-testid={`${testId}-cancel`}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={() => void add()} disabled={!canAdd} data-testid={`${testId}-add`}>
            {saving ? 'Adding…' : picked.length > 1 ? `Add ${picked.length} people` : 'Add'}
          </Button>
        </>
      }
    >
      <div className="flex min-h-[26rem] flex-col gap-3 text-sm" data-testid={testId}>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Enter a name"
          autoFocus
          aria-label="Find people to add"
          data-testid={`${testId}-search`}
        />

        {picked.length > 0 && (
          <div className="flex flex-wrap gap-1.5" data-testid={`${testId}-picked`}>
            {picked.map((id) => {
              const p = byId.get(id);
              return (
                <Chip key={id} tone="info" size="sm" className="rounded-full pr-1" data-testid={`${testId}-picked-${id}`}>
                  <span className="inline-flex items-center gap-1">
                    <Avatar name={p?.name ?? id} src={p?.avatarUrl} size={16} />
                    {p?.name ?? id}
                    <button
                      type="button"
                      aria-label={`Remove ${p?.name ?? id}`}
                      onClick={() => toggle(id)}
                      disabled={inert}
                      className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full border-none bg-transparent text-current hover:bg-black/10"
                      data-testid={`${testId}-unpick-${id}`}
                    >
                      <CloseIcon size={10} />
                    </button>
                  </span>
                </Chip>
              );
            })}
          </div>
        )}

        <ul
          role="listbox"
          aria-label="People"
          aria-multiselectable="true"
          className="m-0 max-h-48 list-none overflow-y-auto rounded-md border border-border p-0"
          data-testid={`${testId}-people`}
        >
          {candidates.length === 0 && (
            <li className="px-3 py-3 text-xs text-text-tertiary" data-testid={`${testId}-nobody`}>
              {people.length === 0 ? 'Everyone is already here.' : 'Nobody by that name.'}
            </li>
          )}
          {candidates.map((p) => {
            const on = picked.includes(p.id);
            return (
              <li key={p.id} role="option" aria-selected={on}>
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  disabled={inert}
                  className={cn(
                    'flex w-full items-center gap-2 border-none bg-transparent px-3 py-2 text-left font-[inherit] hover:bg-surface-hover',
                    on && 'bg-surface-inset',
                  )}
                  data-testid={`${testId}-person-${p.id}`}
                >
                  <Avatar name={p.name} src={p.avatarUrl} size={24} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-text-primary">{p.name}</span>
                    {p.subtitle && <span className="block truncate text-xs text-text-tertiary">{p.subtitle}</span>}
                  </span>
                  <span className={cn('text-xs', on ? 'text-primary' : 'text-transparent')} aria-hidden="true">✓</span>
                </button>
              </li>
            );
          })}
        </ul>

        {historyChoice && (<>
          <div className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">Chat history</div>
          <ChoiceList data-testid={`${testId}-history`}>
            {HISTORY_CHOICES.map((c) => (
              <ChoiceRow
                key={c.mode}
                title={c.mode === 'days' && mode === 'days' ? `Include history from the past ${days || HISTORY_DAYS_DEFAULT} days` : c.title}
                description={c.description}
                selected={mode === c.mode}
                onSelect={() => setMode(c.mode)}
                disabled={inert}
                data-testid={`${testId}-history-${c.mode}`}
              />
            ))}
          </ChoiceList>
          {/* Reserved height: the number field appears without moving the footer. */}
          <div className="min-h-[3.75rem]">
            {mode === 'days' && (
              <FormField label="Number of days" {...(daysOk ? {} : { error: `Between ${HISTORY_DAYS_MIN} and ${HISTORY_DAYS_MAX}.` })}>
                {(wiring) => (
                  <input
                    {...wiring}
                    type="number"
                    min={HISTORY_DAYS_MIN}
                    max={HISTORY_DAYS_MAX}
                    value={Number.isFinite(days) ? days : ''}
                    onChange={(e) => setDays(e.target.value === '' ? NaN : Number(e.target.value))}
                    className="w-24 rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
                    data-testid={`${testId}-days`}
                  />
                )}
              </FormField>
            )}
          </div>
        </>)}
        {error && <p className="m-0 text-xs text-danger-fg" role="alert" data-testid={`${testId}-error`}>{error}</p>}
      </div>
    </Modal>
  );
}

export default AddToChatDialog;
