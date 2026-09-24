// How much of a canvas a CanvasPaneLayout's pane covers, for the canvas inside
// it. A column pane shrinks the canvas, so it covers nothing; an overlay lies
// on the canvas's right edge, and a canvas that pans to a selected item must
// pan it into the part the reader can still see (realtime-examples NFR #173:
// at 1280×720 the selected card was centred on the full width and sat half
// under the pane).

import { createContext, useContext } from 'react';

export interface CanvasPaneInset {
  /** Pixels of the canvas's right edge that the pane lies over. */
  right: number;
}

const NO_INSET: CanvasPaneInset = { right: 0 };

export const CanvasPaneInsetContext = createContext<CanvasPaneInset>(NO_INSET);

/** The part of this canvas a surrounding pane covers; zero outside a CanvasPaneLayout. */
export function useCanvasPaneInset(): CanvasPaneInset {
  return useContext(CanvasPaneInsetContext);
}
