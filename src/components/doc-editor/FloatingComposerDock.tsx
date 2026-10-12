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
// ## Docked shape (2.376.0, card 2.377.0)
//
// A PINNED dock is part of the editor column, not a frame dropped onto it. It
// spans the column's content width — the same gutter the toolbar and the
// status bar sit in, `--dock-inset` (default 1rem, the `p-4` most hosts wrap
// their canvas in) — with no cap and no centring, and it keeps that same
// gutter below the composer. The composer is a flat card on the surface: a
// hairline border, the composer's own radius (`--composer-radius`) on all
// four corners, no drop shadow (`--composer-shadow` zeroed). A 768px pill
// centred in a 1300px column, floating on a shadow with grey under it, read
// as an embedded iframe; this reads as the editor's own chrome, on light and
// dark themes alike. `maxWidth` applies to the OVERLAY placement only.

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
/**
 * Written by a PINNED dock on its parent row: the height of what in that row
 * cannot scroll (siblings such as a call dock, the strip, the composer card,
 * the gutter). The row's cap is `max(var(--dock-max-height, 50%),
 * var(--dock-floor, 0px))`, so the composer is never cut off.
 */
const DOCK_FLOOR_VAR = '--dock-floor';

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

  // Pinned, the row that holds the dock caps itself at
  // `var(--dock-max-height, 50%)` of the surface — but never below
  // `--dock-floor`: the height of everything in that row that cannot scroll
  // (a host's call dock beside this one, the strip, the composer card and the
  // gutter under it). Without the floor a 175px call dock plus a 142px
  // expanded composer in a 272px cap (1280×720) squeezed the dock to 97px and
  // the card's toolbar row was cut off by the shell's overflow-hidden. With
  // it the row grows to hold them and the editor above gives up the height;
  // only what is above the composer (`above`) still scrolls within the cap.
  useLayoutEffect(() => {
    if (placement !== 'pinned') return;
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const measure = () => {
      let floor = 0;
      for (const child of Array.from(parent.children)) {
        if (child !== el && child instanceof HTMLElement) floor += child.offsetHeight;
      }
      const cs = getComputedStyle(el);
      floor += (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
      for (const part of Array.from(el.querySelectorAll<HTMLElement>('[data-dock-fixed]'))) floor += part.offsetHeight;
      const above = el.querySelector<HTMLElement>('[data-dock-above]');
      if (above) floor += parseFloat(getComputedStyle(above).marginBottom) || 0;
      parent.style.setProperty(DOCK_FLOOR_VAR, `${Math.ceil(floor)}px`);
    };
    measure();
    let ro: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      const observeAll = () => {
        ro!.disconnect();
        for (const child of Array.from(parent.children)) if (child !== el) ro!.observe(child);
        for (const part of Array.from(el.querySelectorAll('[data-dock-fixed]'))) ro!.observe(part);
      };
      observeAll();
      // A call dock that comes or goes beside the composer, or a strip that
      // appears, changes what the floor has to hold.
      if (typeof MutationObserver !== 'undefined') {
        mo = new MutationObserver(() => { observeAll(); measure(); });
        mo.observe(parent, { childList: true });
        mo.observe(el, { childList: true, subtree: true });
      }
    }
    return () => {
      ro?.disconnect();
      mo?.disconnect();
      parent.style.removeProperty(DOCK_FLOOR_VAR);
    };
  }, [placement]);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      data-floating-composer-dock
      data-testid={testId}
      data-placement={placement}
      className={cn(
        placement === 'pinned'
          ? // Capped by the row that pins it (`EditorShell`'s dock row, the
            // unframed PresentationEditor's): that row is at most
            // `var(--dock-max-height, 50%)` of the surface — never below
            // `--dock-floor` (see above) — so however much the dock carries
            // (a notice, a tall `above`) the canvas keeps the rest. The dock fills the row; what is above the composer
            // scrolls inside it; the composer itself never shrinks.
            // Sideways and below it sits in the column's gutter
            // (`--dock-inset`); no top padding — the gutter above is the
            // host's own, between its status bar and this.
            'relative flex max-h-full min-h-0 w-full min-w-0 shrink flex-col bg-workspace px-[var(--dock-inset,1rem)] pb-[var(--dock-inset,1rem)]'
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
        {above && <div className="mb-2 min-h-0 shrink overflow-y-auto" data-dock-above="" data-testid={`${testId}-above`}>{above}</div>}
        {strip && <div className="shrink-0" data-dock-fixed="" data-testid={`${testId}-strip`}>{strip}</div>}
        {/* With a strip on top the two read as one box: the composer's top
            corners square off to meet the strip's bottom edge. Pinned, the
            composer keeps its own radius and hairline and loses its shadow —
            a shadow is what made it float off the page instead of sitting on
            it. */}
        <div
          className={cn(
            'shrink-0 rounded-[var(--composer-radius,12px)]',
            placement === 'pinned' ? '[--composer-shadow:0_0_#0000]' : 'shadow-lg',
            strip && 'rounded-t-none [&_.chat-composer]:rounded-t-none',
          )}
          data-dock-fixed=""
          data-testid={`${testId}-composer`}
        >
          {composer}
        </div>
      </div>
    </div>
  );
}

export default FloatingComposerDock;
