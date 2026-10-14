// MentionSuggestions — the @ menu.
//
// Split out from RichChatComposer because Tiptap's suggestion plugin mounts it
// through `ReactRenderer` and drives it imperatively: the plugin owns the
// keyboard while the menu is open and calls `onKeyDown` on the ref. That is a
// different contract from an ordinary React child, and mixing it into the
// composer would hide the fact that arrow keys and Enter are NOT handled by the
// composer's own keymap while this is up.

import { Fragment, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from '../shared/Avatar';

export interface MentionCandidate {
  /** Stable identity — this is what travels in the message, not the label. */
  id: string;
  label: string;
  avatarUrl?: string;
  color?: string;
  /** Shown under the name, e.g. a role or team. */
  hint?: string;
  /**
   * False when the composer knows the chat's members and this person is not
   * one: the row lists under "Not in this chat" and picking it offers to add
   * them rather than mentioning someone who could not read the message.
   */
  member?: boolean;
}

export interface MentionSuggestionsProps {
  items: MentionCandidate[];
  command: (item: { id: string; label: string }) => void;
  /** Picked a non-member: no mention is inserted; the host opens its add flow. */
  onPickNonMember?: (userId: string) => void;
}

export interface MentionSuggestionsHandle {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export const MentionSuggestions = forwardRef<MentionSuggestionsHandle, MentionSuggestionsProps>(
  function MentionSuggestions({ items, command, onPickNonMember }, ref) {
    const [selected, setSelected] = useState(0);

    // Members first, then the people who are not in this chat: the order the
    // keyboard walks and the order the list shows.
    const members = items.filter((i) => i.member !== false);
    const outsiders = items.filter((i) => i.member === false);
    const ordered = [...members, ...outsiders];

    // A narrowing query can leave the cursor past the end of the list.
    useEffect(() => setSelected(0), [items]);

    const choose = (index: number) => {
      const item = ordered[index];
      if (!item) return;
      if (item.member === false) { onPickNonMember?.(item.id); return; }
      command({ id: item.id, label: item.label });
    };

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === 'ArrowUp') {
          setSelected((i) => (i + ordered.length - 1) % ordered.length);
          return true;
        }
        if (event.key === 'ArrowDown') {
          setSelected((i) => (i + 1) % ordered.length);
          return true;
        }
        // Enter and Tab both commit, and BOTH must report handled — returning
        // false would let the composer's Enter fall through and send a message
        // containing a half-typed "@no".
        if (event.key === 'Enter' || event.key === 'Tab') {
          choose(selected);
          return true;
        }
        return false;
      },
    }));

    if (items.length === 0) return null;

    return (
      <div
        data-testid="mention-suggestions"
        role="listbox" data-ui-listbox="mention-suggestions"
        aria-label="People"
        className="max-h-56 w-64 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg"
      >
        {ordered.map((item, i) => (
          <Fragment key={item.id}>
            {i === members.length && outsiders.length > 0 && (
              <div
                className="mt-1 border-t border-border px-2 pb-0.5 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary"
                data-testid="mention-non-members-heading"
              >
                Not in this chat
              </div>
            )}
            <button
              type="button"
              role="option"
              aria-selected={i === selected}
              data-testid={item.member === false ? 'mention-option-non-member' : 'mention-option'}
              data-user-id={item.id}
              // mousedown, not click: click fires after blur, and the editor
              // losing focus first destroys the range the mention replaces.
              onMouseDown={(e) => {
                e.preventDefault();
                choose(i);
              }}
              onMouseEnter={() => setSelected(i)}
              className={cn(
                'flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm',
                i === selected ? 'bg-surface-hover' : 'bg-transparent',
              )}
            >
              <Avatar name={item.label} src={item.avatarUrl} color={item.color} size={24} />
              <span className="min-w-0 flex-1">
                <span className={cn('block truncate', item.member === false ? 'text-text-secondary' : 'text-text-primary')}>{item.label}</span>
                {item.hint && (
                  <span className="block truncate text-xs text-text-tertiary">{item.hint}</span>
                )}
              </span>
              {item.member === false && (
                <span className="shrink-0 text-xs text-primary" data-testid="mention-add-hint">Add to chat</span>
              )}
            </button>
          </Fragment>
        ))}
      </div>
    );
  },
);

export default MentionSuggestions;
