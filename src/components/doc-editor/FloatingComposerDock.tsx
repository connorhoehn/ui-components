// FloatingComposerDock — the Chat/Agent/Terminal composer floating at the
// bottom of an editor surface, with the agent's task strip sitting on top of
// it, over a fade so the page scrolls away underneath instead of being cut.
//
// ## It floats; the page keeps its canvas
//
// The handoff is explicit that the composer "does not replace the page
// canvas". So the dock is absolutely positioned over the bottom of its
// positioned parent (`EditorShell`'s surface region, or any `relative` box),
// and the surface pads its scroll area by the dock's height so the last line
// of the page can still be scrolled above it.
//
// ## `--dock-height`
//
// The height is not a constant — the strip comes and goes, a reference chip
// row adds a line, a long draft grows the editor. The dock measures itself and
// writes `--dock-height` on its PARENT element, which is where a sibling
// scroller can read it (`pb-[var(--dock-height,0px)]`). Removed on unmount so
// a surface without a dock pads nothing.
//
// ## Docked shape (2.376.0)
//
// A PINNED dock is part of the editor column, not a card dropped onto it. It
// spans the column's content width — the same gutter the toolbar and the
// status bar sit in, `--dock-inset` (default 1rem, the `p-4` most hosts wrap
// their canvas in) — with no cap, no centering, no shadow, and no padding
// below the composer: the composer's bottom edge IS the column's bottom edge,
// so only its top corners are rounded (`--composer-radius` still sets how
// much). A 768px pill centred in a 1300px column, floating on a drop shadow
// with grey under it, read as an embedded frame; this reads as the editor's
// own chrome. `maxWidth` applies to the OVERLAY placement only.

import { createContext, useContext, useLayoutEffect, useRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type FloatingComposerDockWidth = 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export interface FloatingComposerDockProps {
  /** The composer — normally a `RichChatComposer` with `modeControl="compact"`. */
  composer: ReactNode;
  /** Above the composer — normally a `TaskStrip`. */
  strip?: ReactNode;
  /** Above the strip — a notice, a conversation preview. */
  above?: ReactNode;
  /**
   * Widest an OVERLAY dock grows. Default `3xl` (768px), the prototype's
   * measure. A pinned dock (inside `EditorShell`) ignores it and spans its
   * column's content width.
   */
  maxWidth?: FloatingComposerDockWidth;
  /** Accessible name of the region. Default "Composer". */
  label?: string;
  className?: string;
  'data-testid'?: string;
}

const WIDTH: Record<FloatingComposerDockWidth, string> = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
};

/**
 * Where a dock sits. `overlay` (the default, outside a shell) floats over the
 * bottom of its positioned parent with a fade and writes `--dock-height` for
 * the content to pad by. `pinned` is a normal-flow last row: the content's
 * scroll box ENDS at the dock's top edge, so nothing in the content can scroll
 * under it or be drawn over it. `EditorShell` pins every dock it hosts
 * (2.365.0) — a host cannot opt a shell's composer back into overlapping.
 */
export type ComposerDockPlacement = 'overlay' | 'pinned';
export const ComposerDockPlacementContext = createContext<ComposerDockPlacement>('overlay');

/** The custom property the dock writes on its parent. */
export const DOCK_HEIGHT_VAR = '--dock-height';
/**
 * The pinned dock's horizontal gutter, read from any ancestor. Default `1rem`
 * — match it to whatever the host wraps its toolbar and status bar in, and
 * the dock's edges line up with theirs.
 */
export const DOCK_INSET_VAR = '--dock-inset';

export function FloatingComposerDock({
  composer,
  strip,
  above,
  maxWidth = '3xl',
  label = 'Composer',
  className,
  'data-testid': testId = 'floating-composer-dock',
}: FloatingComposerDockProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const placement = useContext(ComposerDockPlacementContext);

  useLayoutEffect(() => {
    if (placement !== 'overlay') return;
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const write = (h: number) => parent.style.setProperty(DOCK_HEIGHT_VAR, `${Math.ceil(h)}px`);
    write(el.getBoundingClientRect().height);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(([entry]) => {
        if (entry) write(entry.target.getBoundingClientRect().height);
      });
      ro.observe(el);
    }
    return () => {
      ro?.disconnect();
      parent.style.removeProperty(DOCK_HEIGHT_VAR);
    };
  }, [placement]);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      data-testid={testId}
      data-placement={placement}
      className={cn(
        placement === 'pinned'
          ? // Capped by the row that pins it (`EditorShell`'s dock row, the
            // unframed PresentationEditor's): that row is at most
            // `var(--dock-max-height, 50%)` of the surface, so however much the
            // dock carries (a notice, a strip, a tall draft) the canvas keeps
            // the rest. The dock fills the row; what is above the composer
            // scrolls inside it; the composer itself never shrinks.
            // Sideways it sits in the column's gutter (`--dock-inset`) and
            // nothing else: no top padding (the gutter above is the host's),
            // none below (the composer ends where the column does).
            'relative flex max-h-full min-h-0 w-full min-w-0 shrink flex-col bg-workspace px-[var(--dock-inset,1rem)]'
          : // `pointer-events-none` on the fade, `auto` on the dock itself: the
            // gradient must not swallow clicks on the page line it is fading.
            'pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-workspace via-workspace/85 to-transparent px-4 pb-3 pt-8',
        className,
      )}
    >
      {/* A keep-out for popovers: a menu opened above the dock (a filmstrip
          row's ⋯) flips up rather than covering the composer. Pinned, it is
          the column's full content width; floating, a centred column capped
          by `maxWidth`. */}
      <div
        data-uic-keepout="bottom"
        className={cn('pointer-events-auto flex min-h-0 w-full min-w-0 flex-col', placement === 'pinned' ? 'max-w-none' : ['mx-auto', WIDTH[maxWidth]])}
      >
        {above && <div className="mb-2 min-h-0 shrink overflow-y-auto" data-testid={`${testId}-above`}>{above}</div>}
        {strip && <div className="shrink-0" data-testid={`${testId}-strip`}>{strip}</div>}
        {/* With a strip on top the two read as one box: the composer's top
            corners square off to meet the strip's bottom edge. Pinned, the
            bottom corners square off too — the composer is docked to the
            column's edge — and its shadow goes: a shadow is what made it look
            like a card on the page. `--composer-radius` still shapes the top. */}
        <div
          className={cn(
            'shrink-0 rounded-[var(--composer-radius,12px)]',
            placement === 'pinned'
              ? 'rounded-b-none [--composer-shadow:0_0_#0000] [&_.chat-composer]:rounded-b-none'
              : 'shadow-lg',
            strip && 'rounded-t-none [&_.chat-composer]:rounded-t-none',
          )}
          data-testid={`${testId}-composer`}
        >
          {composer}
        </div>
      </div>
    </div>
  );
}

export default FloatingComposerDock;
