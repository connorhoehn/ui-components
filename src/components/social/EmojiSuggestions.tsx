// EmojiSuggestions — the `:` autocomplete menu.
//
// Same imperative contract as MentionSuggestions: Tiptap's suggestion plugin
// mounts this through ReactRenderer and owns the keyboard while it is open,
// calling `onKeyDown` on the ref. Kept as its own component rather than a mode
// of the mention menu because the row is a different shape (glyph + code, no
// avatar, no presence) and merging them would mean a component that renders two
// unrelated things depending on a flag.

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { cn } from '../../lib/cn';
import type { EmojiShortcode } from './emojiShortcodes';

export interface EmojiSuggestionsProps {
  items: EmojiShortcode[];
  command: (item: { emoji: string }) => void;
}

export interface EmojiSuggestionsHandle {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export const EmojiSuggestions = forwardRef<EmojiSuggestionsHandle, EmojiSuggestionsProps>(
  function EmojiSuggestions({ items, command }, ref) {
    const [selected, setSelected] = useState(0);

    // A narrowing query can leave the cursor past the end of the list.
    useEffect(() => setSelected(0), [items]);

    const choose = (index: number) => {
      const item = items[index];
      if (item) command({ emoji: item.emoji });
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
        // Both commit, and both must report handled — otherwise Enter falls
        // through to the composer and sends a message containing ":fir".
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
        data-testid="emoji-suggestions"
        role="listbox"
        aria-label="Emoji"
        className="max-h-56 w-56 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg"
      >
        {items.map((item, i) => (
          <button
            key={item.code}
            type="button"
            role="option"
            aria-selected={i === selected}
            data-testid="emoji-option"
            // mousedown, not click: click fires after blur, and the blur
            // destroys the range the emoji replaces.
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
            <span aria-hidden className="text-base leading-none">{item.emoji}</span>
            <span className="truncate text-text-secondary">:{item.code}:</span>
          </button>
        ))}
      </div>
    );
  },
);

export default EmojiSuggestions;
