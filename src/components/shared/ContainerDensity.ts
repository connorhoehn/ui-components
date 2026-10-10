// ContainerDensity (2.440.0) — the ONE way a component learns how much room
// its container gives it, and the one rule that turns that room into a
// `Density`.
//
// Before this the library had four mechanisms that each measured and each
// decided: `Tabs overflowBelow` (its own ResizeObserver on its parent, a
// border-box width), `useMeasuredWidth` (a content-box ResizeObserver hook
// shared by the toolbars, the canvas pane and the time window), the
// composer's `responsive="pane"` (its own observer plus a `wide` breakpoint)
// and `useHeaderDensity` (a container height against 640px). They now share:
//
// - `containerDensity(size, compactBelow)` — the rule. A size under the
//   threshold is `compact`; an unmeasured size (`null`, or 0: a detached or
//   hidden subtree, jsdom) is `comfortable`, because a first paint that hides
//   controls and then shows them is worse than one frame of overflow.
// - `useContainerDensity({ compactBelow, of, axis, box })` — the measurement.
//   A callback ref (an element that mounts late is observed from its first
//   paint), one ResizeObserver, the element itself or its parent, width or
//   height, content box or border box. Returns the raw `size` and the
//   `density` the rule gives it.
//
// A ResizeObserver rather than a CSS container query: `container-type`
// applies layout containment, and a bar's popovers (a link popover, a
// dropdown) are `position: fixed` inside its box.
import { useCallback, useRef, useState, type MutableRefObject, type Ref } from 'react';
import type { Density } from './Density';

/** The library's container thresholds, in one place (px). */
export const CONTAINER_COMPACT_BELOW = {
  /** A composer's `wide` breakpoint: below it `responsive="pane"` is one row. */
  pane: 600,
  /** A plain page's header drops to compact below this container height. */
  header: 640,
} as const;

/** THE rule: `size` under `compactBelow` is compact; unmeasured (null / ≤ 0) or no threshold is comfortable. */
export function containerDensity(size: number | null | undefined, compactBelow: number | null | undefined): Density {
  if (!compactBelow || size == null || !(size > 0)) return 'comfortable';
  return size < compactBelow ? 'compact' : 'comfortable';
}

export interface ContainerDensityOptions<T extends HTMLElement> {
  /** The threshold for `density`. Omitted: `density` is always `comfortable` (the size is still measured). */
  compactBelow?: number | null;
  /** Measure the element itself (default) or its parent — the room it is given. */
  of?: 'self' | 'parent';
  /** Default `width`. */
  axis?: 'width' | 'height';
  /** `content` (default, the observer's content rect) or `border` (`getBoundingClientRect`). */
  box?: 'content' | 'border';
  /** Turn the observer off (nothing is measured; `size` holds its last value). Default true. */
  enabled?: boolean;
  /** Another ref that needs the same element (a roving-toolbar hook's, a forwarded ref). */
  forward?: Ref<T>;
}

export interface ContainerDensityState<T extends HTMLElement> {
  /** Attach to the element. Also fills `forward`. */
  ref: (el: T | null) => void;
  /** The measured size in px; `null` before the first measurement. */
  size: number | null;
  /** `containerDensity(size, compactBelow)`. */
  density: Density;
}

/** Measures an element (or its parent) and gives the density its room implies. */
export function useContainerDensity<T extends HTMLElement>(options: ContainerDensityOptions<T> = {}): ContainerDensityState<T> {
  const { compactBelow = null, of = 'self', axis = 'width', box = 'content', enabled = true, forward } = options;
  const [size, setSize] = useState<number | null>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const ref = useCallback((el: T | null) => {
    if (typeof forward === 'function') forward(el);
    else if (forward) (forward as MutableRefObject<T | null>).current = el;
    observer.current?.disconnect();
    observer.current = null;
    const target = el && of === 'parent' ? el.parentElement : el;
    if (!target || !enabled) return;
    const read = (rect: { width: number; height: number }) => (axis === 'height' ? rect.height : rect.width);
    if (box === 'border') {
      // The border box is read synchronously on attach — the first paint is
      // already the right one — and again on every resize; zero is "not laid
      // out" and leaves the last reading.
      const measure = () => {
        const v = read(target.getBoundingClientRect());
        if (v > 0) setSize(v);
      };
      measure();
      if (typeof ResizeObserver === 'undefined') return;
      const ro = new ResizeObserver(measure);
      ro.observe(target);
      observer.current = ro;
      return;
    }
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) setSize(read(rect));
    });
    ro.observe(target);
    observer.current = ro;
  }, [forward, of, axis, box, enabled]);
  return { ref, size, density: containerDensity(size, compactBelow) };
}
