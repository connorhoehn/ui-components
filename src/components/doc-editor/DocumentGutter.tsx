// src/components/doc-editor/DocumentGutter.tsx
//
// Comment threads in the margin, beside the text they refer to — the
// Google-Docs / Confluence gutter.
//
// ## Why this is not just "a list next to the page"
//
// A gutter thread means nothing unless it lines up with its anchor. Two
// threads anchored eight lines apart must not render on top of each other,
// and a thread whose anchor is off-screen must not be pinned to the top as if
// it belonged to the first paragraph. So this component's real job is
// COLLISION RESOLUTION: it takes desired offsets and produces actual ones.
//
// ## What it deliberately does not do
//
// It does not resolve anchors. Turning "this comment is about that sentence"
// into a pixel offset needs the live ProseMirror view, which belongs to the
// editor — so the caller passes `top` and this stays a pure function of its
// props. That split is what makes the stacking testable without mounting an
// editor.
//
// Anchors themselves should be Y.js relative positions, not offsets or
// character indexes: a collaborator typing above your comment must move it,
// not orphan it. `CommentData` has no anchor field yet, which is the gap
// between this component and a persisted gutter.

import { useMemo, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

/** A thread plus where it wants to sit, in pixels from the page top. */
export interface GutterItem {
  id: string;
  /** Desired vertical offset. Ties and near-ties are resolved by stacking. */
  top: number;
  /** True when the anchor is inside the current selection or hovered. */
  active?: boolean;
  /** Rendered inside the card — usually a CommentThread. */
  content: ReactNode;
}

export interface DocumentGutterProps {
  items: readonly GutterItem[];
  /** Minimum vertical gap between two cards. */
  gap?: number;
  /** Approximate rendered height of a card, used for collision spacing. */
  estimatedHeight?: number;
  onFocusItem?: (id: string) => void;
  emptyLabel?: string;
  'data-testid'?: string;
}

/**
 * Pushes overlapping cards down so each keeps `gap` clearance.
 *
 * Sorted first: input order is whatever the comment API returned, and
 * resolving collisions in that order would let an early thread anchored far
 * down the page push everything above it. Exported because the stacking rule
 * is the part worth testing directly.
 */
export function stackOffsets(
  items: readonly { id: string; top: number }[],
  estimatedHeight: number,
  gap: number,
): Map<string, number> {
  const sorted = [...items].sort((a, b) => a.top - b.top);
  const out = new Map<string, number>();
  let cursor = -Infinity;
  for (const item of sorted) {
    // Never pull a card ABOVE its anchor — only push down. A card sitting
    // higher than the text it refers to is worse than one sitting lower,
    // because it reads as belonging to the paragraph above.
    const top = Math.max(item.top, cursor);
    out.set(item.id, top);
    cursor = top + estimatedHeight + gap;
  }
  return out;
}

export default function DocumentGutter({
  items,
  gap = 12,
  estimatedHeight = 120,
  onFocusItem,
  emptyLabel = 'No comments yet',
  'data-testid': testId = 'document-gutter',
}: DocumentGutterProps) {
  const offsets = useMemo(
    () => stackOffsets(items, estimatedHeight, gap),
    [items, estimatedHeight, gap],
  );

  // The tallest card's bottom edge — otherwise the absolutely-positioned
  // cards have no container height and the last one is clipped.
  const height = useMemo(() => {
    let max = 0;
    for (const [, top] of offsets) max = Math.max(max, top + estimatedHeight);
    return max;
  }, [offsets, estimatedHeight]);

  if (items.length === 0) {
    return (
      <div data-testid={`${testId}-empty`} className="px-3 py-4 text-xs text-text-tertiary">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div data-testid={testId} className="relative w-[280px] shrink-0" style={{ height }}>
      {items.map((item) => (
        <div
          key={item.id}
          data-testid={`${testId}-item-${item.id}`}
          data-active={String(Boolean(item.active))}
          // Absolute, because the card's position is a function of its anchor
          // rather than of document order.
          className="absolute left-0 right-0"
          style={{ top: offsets.get(item.id) ?? item.top }}
        >
          <div
            role={onFocusItem ? 'button' : undefined}
            tabIndex={onFocusItem ? 0 : undefined}
            onClick={onFocusItem ? () => onFocusItem(item.id) : undefined}
            onKeyDown={
              onFocusItem
                ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onFocusItem(item.id); } }
                : undefined
            }
            className={cn(
              'rounded-lg border bg-surface p-2 text-left transition-shadow',
              // Chrome, not paper: the gutter sits OUTSIDE the sheet, so it is
              // themed and goes dark like the rest of the app.
              item.active
                ? 'border-primary shadow-md'
                : 'border-border shadow-sm hover:shadow-md',
              onFocusItem && 'cursor-pointer',
            )}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
