// DockedAside — a column docked beside a page's text: a comment thread, a
// work-items list. It reserves its width in the flow (the page reflows around
// it), tops out at the viewport so its body scrolls rather than the page, and
// can start lower than the row it sits in, level with the thing it is about.
//
// The numbers — width, the offset, the height cap — are the panel's own
// geometry and live here, so a page never writes them as inline styles.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { CloseIcon } from '../ui/Icons';

export interface DockedAsideProps {
  children: ReactNode;
  /** Width in px. Default 420. */
  width?: number;
  /** Start this many px below the row's top — level with the section it belongs to. */
  offsetTop?: number;
  /** Height cap. Default `calc(100vh - 180px)`: below the app chrome and the document header. */
  maxHeight?: string;
  /** With a title, the aside draws its own header row (and a close, when `onClose` is given). */
  title?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  /** Padding around the body. Default `md`; `none` when the content brings its own. */
  bodyPadding?: 'none' | 'md';
  className?: string;
  'data-testid'?: string;
}

export function DockedAside({
  children,
  width = 420,
  offsetTop,
  maxHeight = 'calc(100vh - 180px)',
  title,
  onClose,
  closeLabel = 'Close',
  bodyPadding = 'md',
  className,
  'data-testid': testId = 'docked-aside',
}: DockedAsideProps) {
  return (
    <aside
      data-testid={testId}
      className={cn('flex shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-surface-panel', className)}
      style={{ width, marginTop: offsetTop, maxHeight }}
    >
      {(title !== undefined || onClose) && (
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3.5 py-3" data-testid={`${testId}-header`}>
          <div className="min-w-0 flex-1 truncate text-[13px] font-semibold text-text-secondary">{title}</div>
          {onClose && <IconButton aria-label={closeLabel} title={closeLabel} variant="ghost" size="sm" icon={<CloseIcon size={14} />} onClick={onClose} data-testid={`${testId}-close`} />}
        </div>
      )}
      <div className={cn('min-h-0 flex-1 overflow-y-auto', bodyPadding === 'md' && 'px-3 py-3.5')} data-testid={`${testId}-body`}>
        {children}
      </div>
    </aside>
  );
}

export interface FloatingCardProps {
  children: ReactNode;
  /** Which corner of the viewport it sits in. Default bottom-right. */
  corner?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Width in px. Default 160. */
  width?: number;
  /** Height cap in px; the card scrolls past it. Default 280. */
  maxHeight?: number;
  className?: string;
  'data-testid'?: string;
}

const CORNER: Record<NonNullable<FloatingCardProps['corner']>, string> = {
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
};

/** A small card pinned to a corner of the viewport — a table of contents, a mini-map. */
export function FloatingCard({
  children,
  corner = 'bottom-right',
  width = 160,
  maxHeight = 280,
  className,
  'data-testid': testId = 'floating-card',
}: FloatingCardProps) {
  return (
    <div
      data-testid={testId}
      data-corner={corner}
      className={cn('fixed z-30 overflow-y-auto rounded-[10px] border border-border bg-surface px-3 py-2.5 shadow-lg', CORNER[corner], className)}
      style={{ width, maxHeight }}
    >
      {children}
    </div>
  );
}

export interface PinnedSlotProps {
  /** The slot's width, reserved in the flow whether or not it is pinned. */
  width: number;
  /** Pinned: the inner slot leaves the flow and sits fixed at `top`/`left`; the spacer keeps the width. */
  pinned: boolean;
  top?: number;
  left?: number;
  /** The inner slot's id — for content that portals itself in. */
  slotId?: string;
  /** The spacer, so a host can measure where the slot sits in the flow. */
  spacerRef?: React.Ref<HTMLDivElement>;
  children?: ReactNode;
  'data-testid'?: string;
}

/**
 * A column that scrolls with the page until the page scrolls past it, then
 * stays put — a video panel beside the text. The host decides WHEN (it
 * watches the scroll); this owns HOW, so the fixed geometry is not a page's
 * inline style.
 */
export function PinnedSlot({ width, pinned, top, left, slotId, spacerRef, children, 'data-testid': testId = 'pinned-slot' }: PinnedSlotProps) {
  return (
    <div ref={spacerRef} className="shrink-0" style={{ width }} data-testid={testId}>
      <div
        id={slotId}
        className={cn(pinned && 'fixed z-30')}
        style={pinned ? { top, left, width } : undefined}
        data-pinned={pinned ? 'true' : 'false'}
      >
        {children}
      </div>
    </div>
  );
}

export default DockedAside;
