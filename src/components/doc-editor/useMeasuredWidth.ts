// The width of a toolbar's OWN box, so it can pick a one-row layout.
//
// A ResizeObserver rather than a CSS container query: `container-type`
// applies layout containment, and a bar's popovers (the link popover, a
// dropdown) are `position: fixed` inside its box. A callback ref, so a bar
// that mounts after its editor boots is observed from its first paint.
//
// `null` until the first measurement — a caller treats that as its widest
// layout: a first paint that hides controls and then shows them is worse than
// one frame of overflow. jsdom never fires the observer, so tests and stories
// pass a fixed size instead of relying on this.
//
// Shared by `DocumentToolbar` and `SlidesToolbar`; one mechanism, one set of
// caveats. Since 2.440.0 it is `useContainerDensity` (shared/ContainerDensity)
// read for its content-box width — the library's one measuring primitive.

import type { Ref } from 'react';
import { useContainerDensity } from '../shared/ContainerDensity';

export interface MeasuredWidth<T extends HTMLElement> {
  /** Attach to the element to measure. Also fills `forward`. */
  ref: (el: T | null) => void;
  /** Content-box width in px; `null` before the first measurement. */
  width: number | null;
}

/**
 * Measures an element's content-box width. `forward` is another ref (a
 * roving-toolbar hook's, say) that needs the same element.
 */
export function useMeasuredWidth<T extends HTMLElement>(forward?: Ref<T>): MeasuredWidth<T> {
  const { ref, size } = useContainerDensity<T>(forward ? { forward } : {});
  return { ref, width: size };
}

export default useMeasuredWidth;
