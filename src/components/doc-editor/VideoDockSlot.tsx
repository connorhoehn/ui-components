// src/components/doc-editor/VideoDockSlot.tsx
//
// The place a call's video LANDS when you pull it into a document — the
// gutter's video slot, as opposed to a widget floating over the page.
//
// ## Why this holds nothing of its own
//
// The real video element belongs to whoever owns the peer connection: moving
// it between a floating widget and this slot must not unmount it, or the
// track is torn down and re-negotiated and the call visibly blinks. So the
// caller keeps the widget mounted somewhere stable and PORTALS it in as
// `children`. This component contributes a box, a border and a control — it
// never renders video itself and knows nothing about rooms or providers.
//
// ## Why "empty" is two different states
//
// A document with no call must show NOTHING. An always-present empty box is a
// permanent advertisement for a feature that isn't running, and readers who
// never make calls would pay for it on every page. The dashed affordance only
// appears once the caller says a call actually exists and is dockable
// (`canAccept`), which is the only moment "drop video here" is true.
//
// ## What it deliberately does not do
//
// No drag SOURCE. Making the floating widget draggable — setting the drag
// image, the payload, the pointer semantics — belongs to the widget, and
// splitting it across two components would put half a DnD implementation
// here. This side only reacts to a drag that is already in flight.

import { useCallback, useState, type DragEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';

export interface VideoDockSlotProps {
  /** True when the caller has portaled the live widget into `children`. */
  docked: boolean;
  /**
   * True when a call exists and could be moved here. Gates BOTH the dashed
   * affordance and the drag-over feedback: a slot that cannot take the video
   * must not light up under a drag and promise otherwise.
   */
  canAccept: boolean;
  /** Names the region for screen readers and labels the dashed prompt. */
  label?: string;
  /** Prompt text inside the empty affordance. */
  hint?: string;
  /** Accessible name for the undock control. */
  undockLabel?: string;
  /** Fires when the undock / pop-out control is used. Omit to hide it. */
  onRequestUndock?: () => void;
  /** Called after the internal drag-over state updates, with the raw event. */
  onDragOver?: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (e: DragEvent<HTMLDivElement>) => void;
  /** Called on drop. The payload is the caller's — this component reads none of it. */
  onDrop?: (e: DragEvent<HTMLDivElement>) => void;
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

/** Pop-out glyph: a small frame escaping a larger one. */
function PopOutIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6.5 2.75H3A1.25 1.25 0 0 0 1.75 4v8A1.25 1.25 0 0 0 3 13.25h8A1.25 1.25 0 0 0 12.25 12V8.5" strokeLinecap="round" />
      <path d="M9.5 1.75h4.75V6.5M14 2 7.75 8.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VideoDockSlot({
  docked,
  canAccept,
  label = 'Video dock',
  hint = 'Drop the call here to read alongside it',
  undockLabel = 'Pop video back out',
  onRequestUndock,
  onDragOver,
  onDragLeave,
  onDrop,
  className,
  children,
  'data-testid': testId = 'video-dock-slot',
}: VideoDockSlotProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    // Without preventDefault the browser refuses the drop outright and `drop`
    // never fires — the default action for a dragged item is "reject".
    e.preventDefault();
    if (canAccept) setDragOver(true);
    onDragOver?.(e);
  }, [canAccept, onDragOver]);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    // dragleave also fires when the pointer crosses onto a CHILD of the slot,
    // which would strobe the highlight the whole time the cursor is inside.
    // relatedTarget is where the pointer went; if that is still inside us,
    // the drag never actually left.
    const next = e.relatedTarget;
    if (next instanceof Node && e.currentTarget.contains(next)) return;
    setDragOver(false);
    onDragLeave?.(e);
  }, [onDragLeave]);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (!canAccept) return;
    onDrop?.(e);
  }, [canAccept, onDrop]);

  // Nothing to host and nothing that could arrive: render no box at all.
  if (!docked && !canAccept) return null;

  return (
    <div
      data-testid={testId}
      data-docked={String(docked)}
      data-drag-over={String(dragOver)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'w-full overflow-hidden rounded-lg border transition-colors duration-150',
        // Chrome, not paper. The dock sits beside the sheet, so it themes with
        // the app and goes dark; paper tokens here would leave a white card
        // glowing in the gutter of a dark page.
        'bg-surface',
        dragOver ? 'border-primary' : 'border-border',
        className,
      )}
    >
      {docked ? (
        <>
          <div className="flex items-center justify-between gap-2 border-b border-border px-2 py-1">
            <span className="truncate text-xs font-medium text-text-secondary">{label}</span>
            {onRequestUndock && (
              <IconButton
                aria-label={undockLabel}
                size="sm"
                onClick={onRequestUndock}
                data-testid={`${testId}-undock`}
                icon={<PopOutIcon />}
              />
            )}
          </div>
          {/* Fixed aspect so the page does not reflow as the widget's own
              layout settles — a gutter that jumps mid-sentence is worse than
              one that reserves slightly the wrong height. */}
          <div data-testid={`${testId}-content`} className="aspect-video w-full">
            {children}
          </div>
        </>
      ) : (
        <div
          role="region"
          aria-label={label}
          data-testid={`${testId}-dropzone`}
          className={cn(
            'flex aspect-video w-full flex-col items-center justify-center gap-1',
            'rounded-lg border-2 border-dashed px-3 text-center',
            dragOver ? 'border-primary bg-surface-hover' : 'border-border',
          )}
        >
          <span className="text-xs font-medium text-text-secondary">{label}</span>
          <span className="text-xs text-text-tertiary">{hint}</span>
        </div>
      )}
    </div>
  );
}
