// The status bar under the page.
//
// Zoom and word count are STATUS, not formatting. They describe the document
// and the view of it rather than changing the selection, so they do not belong
// in a toolbar whose every other control acts on the text you have highlighted
// — that is why word processors put them along the bottom edge and leave the
// top bar to bold, italic and alignment.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

/**
 * The scales worth offering. The useful ones are few and the one that matters
 * is named: 100% is the printed size.
 */
export const ZOOM_STEPS = [0.5, 0.75, 0.9, 1, 1.25, 1.5, 2] as const;

/**
 * The select value that means "keep the sheet as wide as the space allows".
 *
 * A sentinel string rather than a number because fit width is not a scale, it
 * is a RULE about one: the resulting percentage changes when the window does,
 * when a rail opens, when the sidebar collapses. Storing the number it happens
 * to produce would freeze the answer and quietly stop fitting.
 */
export const ZOOM_FIT = 'fit';

/**
 * The page's zoom, handed to whatever surface offers it when the status bar is
 * off — the toolbar's ⋯ overflow on the documents page. The page still OWNS
 * the value (remembered per reader, fit width resolved against the rails); a
 * control only reads it and asks for a change.
 */
export interface DocumentZoomControl {
  /** The scale in force, fit width included — 1 is 100%. */
  zoom: number;
  /** True while the sheet tracks the workspace width rather than a fixed scale. */
  fitActive: boolean;
  /** The presets worth offering — `ZOOM_STEPS`. */
  steps: readonly number[];
  onZoomChange: (zoom: number) => void;
  /** Absent when the host cannot fit — then offer no Fit option. */
  onFitWidth?: () => void;
}

export interface DocumentStatusBarProps {
  /** Document length. Null when unknown — renders nothing rather than "0 words". */
  wordCount?: number | null;
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
  /**
   * True while the sheet is tracking the workspace width. The control then
   * reads "Fit width" rather than the percentage that rule currently produces
   * — the percentage is an output, and showing it as the selection invites the
   * reader to think they chose it.
   */
  fitActive?: boolean;
  /**
   * Offered only when the host can actually do it — it needs to know how much
   * room the sheet has, which this bar does not. Absent, no Fit option renders.
   */
  onFitWidth?: () => void;
  /** Anything else the host wants along the bar (a save state, a page count). */
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function DocumentStatusBar({
  wordCount = null,
  zoom = 1,
  onZoomChange,
  fitActive = false,
  onFitWidth,
  children,
  className,
  'data-testid': testId = 'document-status-bar',
}: DocumentStatusBarProps) {
  // A host-supplied scale outside the presets is still the truth about the
  // page; snapping it silently would misreport what the reader is seeing.
  //
  // Except under fit width, where the scale is an OUTPUT and not a choice.
  // Listing it added a phantom preset that appeared, moved and vanished as the
  // window was dragged — measured at one window width the menu read
  // "Fit width, 50%, 75%, 90%, 100%, 125%, 147%, 150%, 200%", and 147% was a
  // scale nobody had picked and could not pick again a moment later.
  const options =
    fitActive || ZOOM_STEPS.includes(zoom as (typeof ZOOM_STEPS)[number])
      ? ZOOM_STEPS
      : [...ZOOM_STEPS, zoom].sort((a, b) => a - b);

  return (
    <div
      data-testid={testId}
      className={cn(
        'flex items-center gap-3 border-t border-border bg-surface-panel px-3 py-1 text-xs text-text-tertiary',
        className,
      )}
    >
      {wordCount !== null && (
        <span data-testid={`${testId}-word-count`} className="tabular-nums">
          {wordCount === 1 ? '1 word' : `${wordCount.toLocaleString()} words`}
        </span>
      )}
      {children}
      {onZoomChange && (
        <select
          data-testid={`${testId}-zoom`}
          aria-label="Zoom"
          title="Zoom"
          value={fitActive ? ZOOM_FIT : String(zoom)}
          onChange={(ev) => {
            if (ev.target.value === ZOOM_FIT) onFitWidth?.();
            else onZoomChange(Number(ev.target.value));
          }}
          className="ml-auto h-6 cursor-pointer rounded border border-border bg-surface px-1 text-xs text-text-secondary"
        >
          {/* First, above the percentages, because it is the one option a
              reader picks by INTENT rather than by number — "make the page fill
              the window" is the question; 183% is only ever the answer. Every
              word processor with a page view offers it, and on a laptop it is
              the difference between reading a document and reading two thirds
              of one. */}
          {onFitWidth && <option value={ZOOM_FIT}>Fit width</option>}
          {options.map((z) => (
            <option key={z} value={String(z)}>{`${Math.round(z * 100)}%`}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default DocumentStatusBar;
