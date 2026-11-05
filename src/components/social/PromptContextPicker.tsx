// PromptContextPicker — the "+" chip at the end of a composer's document row
// (realtime-examples WS-K, the All documents mockup). It opens a small search
// over the host's documents; each result toggles in the shared prompt context
// (`usePromptContext`), so the row's chips, this list and the page's own
// "Add / ✓ Added" buttons are one set.
//
// The host owns the search (the same server search as its results list); this
// only debounces it, shows what came back, and says so when nothing did.

import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { InlinePopover } from '../shared/InlinePopover';
import { SearchInput } from '../shared/SearchInput';
import { DocumentIcon, PlusIcon } from '../ui/Icons';
import { usePromptContext, PROMPT_CONTEXT_LIMIT, type PromptContextItem } from '../../hooks/usePromptContext';

export interface PromptContextPickerProps {
  /** The host's document search. An empty query may return recent documents. */
  search: (query: string) => Promise<readonly PromptContextItem[]> | readonly PromptContextItem[];
  /** The prompt-context scope (default 'documents'). */
  scope?: string;
  /** Accessible name of the "+" button. */
  label?: string;
  placeholder?: string;
  /** Milliseconds between the last keystroke and the search. */
  debounceMs?: number;
  'data-testid'?: string;
}

export function PromptContextPicker({
  search,
  scope = 'documents',
  label = 'Add a document to the prompt',
  placeholder = 'Search documents',
  debounceMs = 200,
  'data-testid': testId = 'prompt-context-picker',
}: PromptContextPickerProps) {
  const ctx = usePromptContext(scope);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<readonly PromptContextItem[]>([]);
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const searchRef = useRef(search);
  searchRef.current = search;

  useEffect(() => {
    if (!open) return undefined;
    let live = true;
    setState('loading');
    const timer = setTimeout(() => {
      Promise.resolve()
        .then(() => searchRef.current(query.trim()))
        .then((found) => { if (live) { setResults(found.slice(0, 20)); setState('idle'); setError(null); } })
        .catch((err: unknown) => { if (live) { setState('error'); setError(err instanceof Error && err.message ? err.message : 'Search failed'); } });
    }, query ? debounceMs : 0);
    return () => { live = false; clearTimeout(timer); };
  }, [open, query, debounceMs]);

  const full = ctx.items.length >= PROMPT_CONTEXT_LIMIT;

  return (
    <>
      <button
        data-ui-part=""
        ref={triggerRef}
        type="button"
        aria-label={label}
        title={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        data-testid={testId}
        className={cn(
          'inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-text-secondary',
          'hover:bg-surface-hover hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          open && 'bg-surface-hover text-text-primary',
        )}
      >
        <PlusIcon size={16} aria-hidden="true" />
      </button>
      <InlinePopover
        trigger={triggerRef}
        open={open}
        onClose={() => setOpen(false)}
        placement="bottom-start"
        aria-label={label}
        className="w-80 rounded-lg p-2"
        data-testid={`${testId}-popover`}
      >
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={placeholder}
          aria-label={placeholder}
          autoFocus
          size="sm"
        />
        <ul className="mt-2 max-h-72 overflow-y-auto" data-testid={`${testId}-results`}>
          {state === 'loading' && results.length === 0 && (
            <li className="px-2 py-2 text-sm text-text-tertiary">Searching…</li>
          )}
          {state === 'error' && (
            <li role="alert" className="px-2 py-2 text-sm text-danger-fg">{error}</li>
          )}
          {state === 'idle' && results.length === 0 && (
            <li className="px-2 py-2 text-sm text-text-tertiary">{query.trim() ? 'No documents match' : 'No documents yet'}</li>
          )}
          {results.map((item) => {
            const added = ctx.has(item.id);
            const disabled = !added && full;
            return (
              <li key={item.id}>
                <button
                  data-ui-part=""
                  type="button"
                  aria-pressed={added}
                  disabled={disabled}
                  title={disabled ? `A prompt takes at most ${PROMPT_CONTEXT_LIMIT} documents` : undefined}
                  onClick={() => ctx.toggle(item)}
                  data-testid={`${testId}-result`}
                  data-document-id={item.id}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-text-primary',
                    'hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
                  )}
                >
                  <DocumentIcon size={14} aria-hidden="true" className="shrink-0 text-text-secondary" />
                  <span className="min-w-0 flex-1 truncate">{item.title}</span>
                  <span className={cn('shrink-0 text-xs font-medium', added ? 'text-primary' : 'text-text-tertiary')}>
                    {added ? '✓ Added' : 'Add'}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </InlinePopover>
    </>
  );
}

export default PromptContextPicker;
