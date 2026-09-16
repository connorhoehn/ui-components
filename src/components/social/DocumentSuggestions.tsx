// DocumentSuggestions — the `#` menu.
//
// The sibling of MentionSuggestions with the same contract: Tiptap's
// suggestion plugin mounts it through `ReactRenderer`, owns the keyboard while
// it is open, and calls `onKeyDown` on the ref. `@` finds a person, `#` finds
// a document — a reader of "see #Roadmap" gets a chip that opens it, not a
// title they have to go and search for.

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { cn } from '../../lib/cn';
import { DocumentIcon } from '../ui/Icons';

export interface DocumentCandidate {
  /** Stable identity — this is what travels in the message, not the label. */
  id: string;
  /** The document's title. */
  label: string;
  /** Shown under the title, e.g. the folder or who last edited it. */
  hint?: string;
  /** The document's own icon, when it has one; 📄 otherwise. */
  icon?: string;
}

export interface DocumentSuggestionsProps {
  items: DocumentCandidate[];
  command: (item: { id: string; label: string }) => void;
}

export interface DocumentSuggestionsHandle {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export const DocumentSuggestions = forwardRef<DocumentSuggestionsHandle, DocumentSuggestionsProps>(
  function DocumentSuggestions({ items, command }, ref) {
    const [selected, setSelected] = useState(0);

    // A narrowing query can leave the cursor past the end of the list.
    useEffect(() => setSelected(0), [items]);

    const choose = (index: number) => {
      const item = items[index];
      if (item) command({ id: item.id, label: item.label });
    };

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (items.length === 0) return false;
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
        // containing a half-typed "#Roa".
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
        data-testid="document-suggestions"
        role="listbox"
        aria-label="Documents"
        className="max-h-56 w-64 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg"
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="option"
            aria-selected={i === selected}
            data-testid="document-option"
            // mousedown, not click: click fires after blur, and the editor
            // losing focus first destroys the range the reference replaces.
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
            {/* The type's icon as given; a drawn glyph when there is none. */}
            <span aria-hidden="true" className={cn('w-6 shrink-0 text-center leading-none', item.icon ? 'text-base' : 'text-text-tertiary')}>
              {item.icon || <DocumentIcon size={14} className="inline-block" />}
            </span>
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

export default DocumentSuggestions;
