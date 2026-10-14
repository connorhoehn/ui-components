// DocumentSuggestions — the `#` menu.
//
// The sibling of MentionSuggestions with the same contract: Tiptap's
// suggestion plugin mounts it through `ReactRenderer`, owns the keyboard while
// it is open, and calls `onKeyDown` on the ref. `@` finds a person, `#` finds
// a document — a reader of "see #Roadmap" gets a chip that opens it, not a
// title they have to go and search for.
//
// `panel` (2.390.0) draws the same menu as an "Add context" card — a title, a
// search field that mirrors what was typed after `#` (with a clear button),
// results grouped under their `group` heading with a glyph and a second line,
// and the keys at its foot (↑↓ Choose · ↵ Insert · esc Close). The typing still
// happens in the composer: the field is the query made visible, not a second
// input that would steal the caret.

import { forwardRef, useEffect, useImperativeHandle, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { CloseIcon, DocumentIcon, SearchIcon } from '../ui/Icons';

export interface DocumentCandidate {
  /** Stable identity — this is what travels in the message, not the label. */
  id: string;
  /** The document's title. */
  label: string;
  /** Shown under the title, e.g. the folder or who last edited it. */
  hint?: string;
  /** The document's own icon, when it has one; 📄 otherwise. */
  icon?: string;
  /** A drawn glyph for the row (wins over `icon`) — a person for a subject mask. Since 2.390.0. */
  glyph?: ReactNode;
  /**
   * The heading this row sits under in the `panel` menu ("MASKS IN THIS
   * PHOTO"). Consecutive rows with the same group share one heading; order is
   * the host's. Ignored by the plain menu. Since 2.390.0.
   */
  group?: string;
}

/** The "Add context" card form of the `#` menu (RichChatComposer `documentMenu`). */
export interface DocumentMenuPanel {
  /** The card's title. Default "Add context". */
  title?: string;
  /** Said when nothing matches. Default "Nothing matches". */
  emptyLabel?: string;
}

export interface DocumentSuggestionsProps {
  items: DocumentCandidate[];
  command: (item: { id: string; label: string }) => void;
  /** What was typed after `#` (the suggestion plugin passes it). */
  query?: string;
  /** Clears the typed query, leaving the `#` (the panel's ⓧ). */
  onClearQuery?: () => void;
  /** Draw as the "Add context" card. */
  panel?: DocumentMenuPanel;
}

export interface DocumentSuggestionsHandle {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export const DocumentSuggestions = forwardRef<DocumentSuggestionsHandle, DocumentSuggestionsProps>(
  function DocumentSuggestions({ items, command, query = '', onClearQuery, panel }, ref) {
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

    if (!panel) {
      if (items.length === 0) return null;
      return (
        <div
          data-testid="document-suggestions"
          role="listbox" data-ui-listbox="document-suggestions"
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
                {item.glyph ?? (item.icon || <DocumentIcon size={14} className="inline-block" />)}
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
    }

    const title = panel.title ?? 'Add context';
    return (
      <div
        data-testid="document-suggestions"
        data-variant="panel"
        className="flex w-[22.5rem] max-w-[calc(100vw-2rem)] flex-col rounded-xl border border-border bg-surface text-text-primary shadow-xl"
      >
        <div className="px-4 pb-2 pt-3 text-[15px] font-semibold text-text-primary" data-testid="document-suggestions-title">{title}</div>
        <div className="mx-3 flex h-9 items-center gap-2 rounded-md border border-border bg-surface-inset px-2.5 text-sm" data-testid="document-suggestions-search">
          <SearchIcon size={14} aria-hidden="true" className="shrink-0 text-text-tertiary" />
          <span className="min-w-0 flex-1 truncate text-text-primary" aria-live="polite">#{query}</span>
          {query && onClearQuery && (
            <button
              type="button"
              aria-label="Clear search"
              title="Clear search"
              data-testid="document-suggestions-clear"
              onMouseDown={(e) => { e.preventDefault(); onClearQuery(); }}
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-surface-emphasis text-text-secondary hover:text-text-primary"
            >
              <CloseIcon size={10} aria-hidden="true" />
            </button>
          )}
        </div>
        <div role="listbox" data-ui-listbox="document-suggestions" aria-label={title} className="mt-2 max-h-72 overflow-y-auto px-2 pb-1">
          {items.length === 0 && (
            <div className="px-2 py-3 text-sm text-text-secondary" data-testid="document-suggestions-empty">{panel.emptyLabel ?? 'Nothing matches'}</div>
          )}
          {items.map((item, i) => {
            const heading = item.group && item.group !== items[i - 1]?.group ? item.group : null;
            const active = i === selected;
            return (
              <div key={item.id}>
                {heading && (
                  <div role="presentation" className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary" data-testid="document-suggestions-group">{heading}</div>
                )}
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  data-testid="document-option"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    choose(i);
                  }}
                  onMouseEnter={() => setSelected(i)}
                  className={cn(
                    'mb-1 flex w-full items-center gap-3 rounded-md border px-3 py-1.5 text-left',
                    active ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-text-primary hover:bg-surface-hover',
                  )}
                >
                  <span aria-hidden="true" className={cn('flex w-6 shrink-0 justify-center leading-none', active ? 'text-on-primary' : 'text-text-secondary')}>
                    {item.glyph ?? (item.icon || <DocumentIcon size={18} />)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{item.label}</span>
                    {item.hint && (
                      <span className={cn('block truncate text-xs', active ? 'text-on-primary/80' : 'text-text-secondary')}>{item.hint}</span>
                    )}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-xs text-text-secondary" data-testid="document-suggestions-keys">
          <span><kbd className="font-sans">↑↓</kbd> Choose</span>
          <span><kbd className="font-sans">↵</kbd> Insert</span>
          <span><kbd className="font-sans">esc</kbd> Close</span>
        </div>
      </div>
    );
  },
);

export default DocumentSuggestions;
