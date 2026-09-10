// CommandSuggestions — the `/` menu, and the argument menu that follows it.
//
// Same imperative contract as MentionSuggestions and EmojiSuggestions: Tiptap's
// suggestion plugin mounts this through ReactRenderer, owns the keyboard while
// it is open, and calls `onKeyDown` on the ref. One component serves two menus
// because the rows are the same shape — a token or glyph, a label, a hint on
// the right — and because the two menus are one gesture to the person typing:
// `/doc` picks the command, `Roadmap` picks what it acts on.
//
// ## Enter is only claimed when there is something to pick
//
// The other two menus return handled for Enter unconditionally, which is right
// for them: they close themselves the moment the query stops matching. This
// menu can be open with NOTHING in it — a `/` followed by letters no command
// starts with, or an argument search that came back empty — and a person who
// types `/shrug` and presses Enter must send the message, not watch Enter do
// nothing. So an empty list gives every key back to the editor.

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { cn } from '../../lib/cn';

/** One row. Both a command and a command's argument fit this shape. */
export interface CommandSuggestionItem {
  /** Stable key. For a command, its trigger. */
  id: string;
  /** The typed token, rendered in mono — `/doc`. */
  code?: string;
  /** A glyph rendered where the token would be, for argument rows. */
  icon?: string;
  label: string;
  /** A second clause on the right: what it needs, or where it lives. */
  hint?: string;
  /** The long form, shown under the list for the highlighted row only. */
  description?: string;
}

export interface CommandSuggestionsProps {
  items: CommandSuggestionItem[];
  command: (item: CommandSuggestionItem) => void;
  /** The listbox's accessible name. */
  label?: string;
}

export interface CommandSuggestionsHandle {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export const CommandSuggestions = forwardRef<CommandSuggestionsHandle, CommandSuggestionsProps>(
  function CommandSuggestions({ items, command, label = 'Commands' }, ref) {
    const [selected, setSelected] = useState(0);

    // A narrowing query can leave the cursor past the end of the list.
    useEffect(() => setSelected(0), [items]);

    const choose = (index: number) => {
      const item = items[index];
      if (item) command(item);
    };

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        // See the note at the top: an empty menu owns no keys.
        if (items.length === 0) return false;
        if (event.key === 'ArrowUp') {
          setSelected((i) => (i + items.length - 1) % items.length);
          return true;
        }
        if (event.key === 'ArrowDown') {
          setSelected((i) => (i + 1) % items.length);
          return true;
        }
        if (event.key === 'Enter' || event.key === 'Tab') {
          choose(selected);
          return true;
        }
        return false;
      },
    }));

    if (items.length === 0) return null;

    const description = items[selected]?.description;

    return (
      <div
        data-testid="command-suggestions"
        className="w-[26rem] max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-surface py-1 shadow-lg"
      >
        <div role="listbox" aria-label={label} className="max-h-56 overflow-y-auto">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={i === selected}
              data-testid="command-option"
              // mousedown, not click: click fires after blur, and the editor
              // losing focus first destroys the range the pick replaces.
              onMouseDown={(e) => {
                e.preventDefault();
                choose(i);
              }}
              onMouseEnter={() => setSelected(i)}
              className={cn(
                'flex w-full items-center gap-2 px-2 py-1 text-left text-sm',
                i === selected ? 'bg-surface-hover' : 'bg-transparent',
              )}
            >
              {item.code && (
                <span className="shrink-0 font-mono text-xs text-text-secondary">{item.code}</span>
              )}
              {!item.code && item.icon && (
                <span aria-hidden className="shrink-0 text-base leading-none">{item.icon}</span>
              )}
              <span className="min-w-0 flex-1 truncate text-text-primary">{item.label}</span>
              {item.hint && (
                <span className="shrink-0 max-w-[45%] truncate text-xs text-text-tertiary">{item.hint}</span>
              )}
            </button>
          ))}
        </div>
        {description && (
          <div
            data-testid="command-description"
            className="truncate border-t border-border px-2 pt-1 text-xs text-text-secondary"
          >
            {description}
          </div>
        )}
      </div>
    );
  },
);

export default CommandSuggestions;
