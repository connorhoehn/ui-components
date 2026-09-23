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

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type FloatingComposerDockWidth = 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export interface FloatingComposerDockProps {
  /** The composer — normally a `RichChatComposer` with `modeControl="compact"`. */
  composer: ReactNode;
  /** Above the composer — normally a `TaskStrip`. */
  strip?: ReactNode;
  /** Above the strip — a notice, a conversation preview. */
  above?: ReactNode;
  /** Widest the dock grows. Default `3xl` (768px), the prototype's measure. */
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

/** The custom property the dock writes on its parent. */
export const DOCK_HEIGHT_VAR = '--dock-height';

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

  useLayoutEffect(() => {
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
  }, []);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      data-testid={testId}
      className={cn(
        // `pointer-events-none` on the fade, `auto` on the dock itself: the
        // gradient must not swallow clicks on the page line it is fading.
        'pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-workspace via-workspace/85 to-transparent px-4 pb-3 pt-8',
        className,
      )}
    >
      <div className={cn('pointer-events-auto mx-auto flex w-full flex-col', WIDTH[maxWidth])}>
        {above && <div className="mb-2" data-testid={`${testId}-above`}>{above}</div>}
        {strip && <div data-testid={`${testId}-strip`}>{strip}</div>}
        {/* With a strip on top the two read as one box: the composer's top
            corners square off to meet the strip's bottom edge. */}
        <div className={cn('rounded-lg shadow-lg', strip && 'rounded-t-none [&_.chat-composer]:rounded-t-none')} data-testid={`${testId}-composer`}>{composer}</div>
      </div>
    </div>
  );
}

export default FloatingComposerDock;
