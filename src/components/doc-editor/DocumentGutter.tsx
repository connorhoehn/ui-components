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
// Anchors themselves are Y.js relative positions, not offsets or character
// indexes: a collaborator typing above your comment must move it, not orphan
// it. That used to be a wish written here — "`CommentData` has no anchor field
// yet, which is the gap between this component and a persisted gutter" — and it
// is no longer true. `adapters/tiptap/canvas/anchors.ts` in realtime-modules
// stores the relative position and `resolveAnchor` rebases it against the
// current document; the app's `useCanvasGutterItems` resolves it to a pixel
// offset with `coordsAtPos` and passes it here as `top`. A comment whose text
// was DELETED resolves to null and is reported as orphaned rather than
// positioned at 0, which is the case the offsets model could not express.
//
// None of that changes this component's contract: it still receives an offset
// and still refuses to invent one.

import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

/**
 * What kind of annotation a card holds.
 *
 * This component does not read it — stacking is the same arithmetic whatever
 * the card contains. It exists because the CONTROL that hides this column has
 * to name what it is hiding, and only the host knows: `content` is an opaque
 * ReactNode, so counting cards is the most the library can do on its own, and
 * counting is how a margin holding one proposed edit and no discussion came to
 * announce itself as "Comments 1".
 */
export type GutterItemKind = 'comment' | 'suggestion';

/** A thread plus where it wants to sit, in pixels from the page top. */
export interface GutterItem {
  id: string;
  /** Desired vertical offset. Ties and near-ties are resolved by stacking. */
  top: number;
  /** True when the anchor is inside the current selection or hovered. */
  active?: boolean;
  /** Rendered inside the card — usually a CommentThread. */
  content: ReactNode;
  /**
   * Defaults to `'comment'` — every caller that predates this field was
   * passing comment threads, so the unlabelled case keeps saying exactly what
   * it says today rather than degrading a true noun into a hedge. The cost is
   * that a NEW producer which forgets to label itself is counted as
   * discussion; labelling every producer is therefore part of adding one.
   */
  kind?: GutterItemKind;
}

export interface DocumentGutterProps {
  items: readonly GutterItem[];
  /**
   * Pinned to the TOP of the gutter, above the threads — a docked call, say.
   *
   * In normal flow rather than anchored, because it belongs to the document
   * as a whole and not to a line of it. That does push the thread cards down
   * by its height, which is the honest tradeoff: a call and a comment cannot
   * both own the same strip of margin, and Google Docs resolves it the same
   * way — and it does cost real precision now that the offsets ARE real
   * positions, because every card below the lead sits that much lower than the
   * line it annotates.
   */
  lead?: ReactNode;
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
  /**
   * Per-card height. A flat number is a fallback for the first paint only —
   * real thread cards differ by hundreds of pixels once replies exist, and a
   * single estimate makes tall cards overlap the one below.
   */
  height: number | ((id: string) => number),
  gap: number,
): Map<string, number> {
  const heightOf = typeof height === 'function' ? height : () => height;
  const sorted = [...items].sort((a, b) => a.top - b.top);
  const out = new Map<string, number>();
  let cursor = -Infinity;
  for (const item of sorted) {
    // Never pull a card ABOVE its anchor — only push down. A card sitting
    // higher than the text it refers to is worse than one sitting lower,
    // because it reads as belonging to the paragraph above.
    const top = Math.max(item.top, cursor);
    out.set(item.id, top);
    cursor = top + heightOf(item.id) + gap;
  }
  return out;
}

export default function DocumentGutter({
  items,
  lead,
  gap = 12,
  estimatedHeight = 120,
  onFocusItem,
  emptyLabel = 'No comments yet',
  'data-testid': testId = 'document-gutter',
}: DocumentGutterProps) {
  // Measured card heights, keyed by id. `estimatedHeight` is only the value
  // used on the very first paint, before anything has been measured — a real
  // thread card with two replies is several times taller than one without, so
  // stacking on a single estimate leaves tall cards overlapping their
  // neighbour. Observed rather than measured once, because a card grows when
  // a reply is posted or its text wraps differently.
  const [heights, setHeights] = useState<Record<string, number>>({});
  const nodes = useRef(new Map<string, HTMLDivElement>());

  useLayoutEffect(() => {
    const measure = () => {
      setHeights((prev) => {
        let changed = false;
        const next = { ...prev };
        for (const [id, el] of nodes.current) {
          const h = el.offsetHeight;
          // Sub-pixel churn would loop: only a real change counts.
          if (h > 0 && Math.abs((prev[id] ?? 0) - h) > 1) { next[id] = h; changed = true; }
        }
        return changed ? next : prev;
      });
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    for (const [, el] of nodes.current) ro.observe(el);
    return () => ro.disconnect();
  }, [items]);

  const offsets = useMemo(
    () => stackOffsets(items, (id) => heights[id] ?? estimatedHeight, gap),
    [items, heights, estimatedHeight, gap],
  );

  // The lowest card's bottom edge — otherwise the absolutely-positioned cards
  // have no container height and the last one is clipped.
  const height = useMemo(() => {
    let max = 0;
    for (const [id, top] of offsets) max = Math.max(max, top + (heights[id] ?? estimatedHeight));
    return max;
  }, [offsets, heights, estimatedHeight]);

  // A lead with no threads is still a gutter worth rendering: the call has to
  // live somewhere, and "no comments yet" is not a reason to drop it.
  if (items.length === 0) {
    return lead ? (
      <div data-testid={testId} className="w-[280px] shrink-0">
        <div data-testid={`${testId}-lead`}>{lead}</div>
      </div>
    ) : (
      <div data-testid={`${testId}-empty`} className="px-3 py-4 text-xs text-text-tertiary">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div data-testid={testId} className="w-[280px] shrink-0">
      {lead && <div data-testid={`${testId}-lead`} className="mb-3">{lead}</div>}
      {/* The card area reserves the height, not the column: with a lead
          pinned above, the column is lead + cards and only the card half is a
          function of the anchors. */}
      <div data-testid={`${testId}-cards`} className="relative" style={{ height }}>
      {items.map((item) => (
        <div
          key={item.id}
          data-testid={`${testId}-item-${item.id}`}
          data-active={String(Boolean(item.active))}
          // Absolute, because the card's position is a function of its anchor
          // rather than of document order.
          ref={(el) => {
            if (el) nodes.current.set(item.id, el);
            else nodes.current.delete(item.id);
          }}
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
    </div>
  );
}
