// The document's own structure, as a way to move around it.
//
// A long document is navigated by its headings or not at all: scrolling 7000
// pixels to find the section you were reading is not navigation. This is the
// same idea as a word processor's outline pane — the headings, in order,
// indented by level, with the one you are currently inside marked.
//
// It renders entries and reports clicks. It does not know what an entry
// points AT, because that differs by document shape: a section document has
// element ids, and a canvas has ProseMirror positions with no ids in the DOM
// at all. Whoever owns the document owns the scrolling.

import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon } from '../ui/Icons';

export interface OutlineEntry {
  /** Opaque to this component — an element id, a position, whatever the host resolves. */
  id: string;
  text: string;
  /** 1-6. Drives indentation only; the list is flat and in document order. */
  level: number;
}

export interface DocumentOutlineProps {
  entries: readonly OutlineEntry[];
  /** The same section order as a compact previous/contents/next control. */
  presentation?: 'outline' | 'controls';
  onContents?: () => void;
  /** Short contents label for a document's crowded status bar. */
  compact?: boolean;
  /** The entry the reader is currently inside, if the host tracks it. */
  activeId?: string | null;
  onSelect?: (id: string) => void;
  /** Shown when the document has no headings yet. */
  emptyLabel?: string;
  /** Keep long headings readable in a vertical reading pane. */
  wrap?: boolean;
  className?: string;
  'data-testid'?: string;
  /** Label the navigation for non-document readers such as a review page. */
  'aria-label'?: string;
}

/**
 * Indentation per level, relative to the shallowest heading PRESENT.
 *
 * A document whose top heading is an h2 should not sit permanently indented
 * because an h1 exists in the abstract — the outline describes this document,
 * not the schema.
 */
function indentFor(level: number, minLevel: number): number {
  return Math.min(level - minLevel, 3) * 12;
}

export function DocumentOutline({
  entries,
  presentation = 'outline',
  onContents,
  compact = false,
  activeId,
  onSelect,
  emptyLabel = 'Headings you add will appear here',
  className,
  wrap = false,
  'data-testid': testId = 'document-outline',
  'aria-label': ariaLabel = 'Document outline',
}: DocumentOutlineProps) {
  const minLevel = entries.length > 0 ? Math.min(...entries.map((e) => e.level)) : 1;
  if (presentation === 'controls') {
    const index = entries.findIndex(entry => entry.id === activeId);
    const previous = entries[index - 1];
    const next = entries[index + 1];
    return <nav aria-label={ariaLabel} data-testid={testId} className={cn('flex min-w-0 items-center justify-center gap-1', className)}>
      <IconButton size="sm" variant="ghost" aria-label="Previous section" title={previous ? previous.text : 'At the first section'}
        disabled={!previous} onClick={() => previous && onSelect?.(previous.id)} icon={<ChevronIcon dir="up" size={16} />} data-testid={`${testId}-previous`} />
      <Button size="sm" variant="ghost" onClick={onContents} aria-label="Back to contents" data-testid={`${testId}-contents`}>
        {compact ? 'Contents' : 'Back to contents'}
      </Button>
      <span className="shrink-0 text-xs tabular-nums text-text-secondary" aria-live="polite" aria-label={index < 0 ? 'Contents' : `Section ${index + 1} of ${entries.length}`}>
        {index < 0 ? `— / ${entries.length}` : `${index + 1} / ${entries.length}`}
      </span>
      <IconButton size="sm" variant="ghost" aria-label="Next section" title={next ? next.text : 'At the last section'}
        disabled={!next} onClick={() => next && onSelect?.(next.id)} icon={<ChevronIcon dir="down" size={16} />} data-testid={`${testId}-next`} />
    </nav>;
  }


  return (
    <nav
      data-testid={testId}
      aria-label={ariaLabel}
      className={cn('flex flex-col gap-0.5 text-sm', className)}
    >
      {entries.length === 0 ? (
        <p data-testid={`${testId}-empty`} className="px-2 py-1.5 text-xs text-text-tertiary">
          {emptyLabel}
        </p>
      ) : (
        entries.map((entry) => {
          const active = !!activeId && entry.id === activeId;
          return (
            <button
              key={entry.id}
              type="button"
              data-testid={`${testId}-entry`}
              data-level={entry.level}
              data-active={active ? 'true' : 'false'}
              aria-current={active ? 'location' : undefined}
              onClick={() => onSelect?.(entry.id)}
              style={{ paddingLeft: 12 + indentFor(entry.level, minLevel) }}
              className={cn(
                'rounded py-1 pr-3 text-left transition-colors',
                wrap ? 'whitespace-normal break-words' : 'truncate',
                'hover:bg-surface-hover',
                active ? 'bg-surface-inset font-medium text-text-primary' : 'text-text-secondary',
              )}
              // An outline entry is a whole heading on one line; the full text
              // is worth having on hover when it is clipped.
              title={entry.text}
            >
              {entry.text || 'Untitled heading'}
            </button>
          );
        })
      )}
    </nav>
  );
}

export default DocumentOutline;
