// MentionSuggestions — the @ menu.
//
// Split out from RichChatComposer because Tiptap's suggestion plugin mounts it
// through `ReactRenderer` and drives it imperatively: the plugin owns the
// keyboard while the menu is open and calls `onKeyDown` on the ref. That is a
// different contract from an ordinary React child, and mixing it into the
// composer would hide the fact that arrow keys and Enter are NOT handled by the
// composer's own keymap while this is up.

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
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
}

export interface MentionSuggestionsProps {
  items: MentionCandidate[];
  command: (item: { id: string; label: string }) => void;
}

export interface MentionSuggestionsHandle {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export const MentionSuggestions = forwardRef<MentionSuggestionsHandle, MentionSuggestionsProps>(
  function MentionSuggestions({ items, command }, ref) {
    const [selected, setSelected] = useState(0);

    // A narrowing query can leave the cursor past the end of the list.
    useEffect(() => setSelected(0), [items]);

    const choose = (index: number) => {
      const item = items[index];
      if (item) command({ id: item.id, label: item.label });
    };

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === 'ArrowUp') {
          setSelected((i) => (i + items.length - 1) % items.length);
          return true;
        }
        if (event.key === 'ArrowDown') {
          setSelected((i) => (i + 1) % items.length);
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
        role="listbox"
        aria-label="People"
        className="max-h-56 w-64 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg"
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="option"
            aria-selected={i === selected}
            data-testid="mention-option"
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
              <span className="block truncate text-text-primary">{item.label}</span>
              {item.hint && (
                <span className="block truncate text-xs text-text-tertiary">{item.hint}</span>
              )}
            </span>
          </button>
        ))}
      </div>
    );
  },
);

export default MentionSuggestions;
