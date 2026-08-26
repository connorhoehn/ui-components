// ViewportFillRegion — a region that ends where the window ends.
//
// Why this exists: an app shell built on `min-height: 100vh` lets the
// document grow, so a `h-full`/`flex-1` child has no definite height to
// resolve against. A chat thread dropped into one of those shells stops
// scrolling internally and instead pushes the page taller than the window —
// the composer walks off the bottom of the screen and the "scrollable"
// message list reports scrollHeight === clientHeight.
//
// Measuring the region's own distance from the top of the document and
// subtracting it from the viewport gives a definite height without
// converting the whole shell to `height: 100vh; overflow: hidden` (which
// would change scrolling for every other page in the app).
//
// The height is computed, so it is a dynamic inline style by necessity —
// there is no static class that knows where on the page this lands.

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

export interface ViewportFillRegionProps {
  /** Space to leave between the region's bottom edge and the window bottom. */
  bottomGap?: number;
  /** Floor for the computed height, so the region never collapses. */
  minHeight?: number;
  className?: string;
  children: React.ReactNode;
  'data-testid'?: string;
}

/**
 * Height the region should take: everything from its own top edge down to
 * the bottom of the window, minus `bottomGap`, never below `minHeight`.
 * Exported for testing — the arithmetic is the whole component.
 */
export function fillHeight(
  offsetTop: number,
  viewportHeight: number,
  bottomGap: number,
  minHeight: number,
): number {
  return Math.max(minHeight, viewportHeight - offsetTop - bottomGap);
}

export function ViewportFillRegion({
  bottomGap = 0,
  minHeight = 240,
  className,
  children,
  'data-testid': testId,
}: ViewportFillRegionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    // Distance from the TOP OF THE DOCUMENT, not the viewport: while the
    // page is still overflowing (the very state this fixes) the two differ
    // by the current scroll, and using the viewport-relative number would
    // make the height jitter as the reader scrolls.
    const offsetTop = el.getBoundingClientRect().top + window.scrollY;
    setHeight(fillHeight(offsetTop, window.innerHeight, bottomGap, minHeight));
  }, [bottomGap, minHeight]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Chrome above the region (banners, tab bars) can settle a frame late.
    const raf = window.requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  return (
    <div
      ref={ref}
      data-testid={testId}
      className={cn('min-h-0', className)}
      style={height === null ? undefined : { height, maxHeight: height }}
    >
      {children}
    </div>
  );
}

export default ViewportFillRegion;
