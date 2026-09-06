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

export interface DocumentStatusBarProps {
  /** Document length. Null when unknown — renders nothing rather than "0 words". */
  wordCount?: number | null;
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
  /** Anything else the host wants along the bar (a save state, a page count). */
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function DocumentStatusBar({
  wordCount = null,
  zoom = 1,
  onZoomChange,
  children,
  className,
  'data-testid': testId = 'document-status-bar',
}: DocumentStatusBarProps) {
  // A host-supplied scale outside the presets is still the truth about the
  // page; snapping it silently would misreport what the reader is seeing.
  const options = ZOOM_STEPS.includes(zoom as (typeof ZOOM_STEPS)[number])
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
          value={String(zoom)}
          onChange={(ev) => onZoomChange(Number(ev.target.value))}
          className="ml-auto h-6 cursor-pointer rounded border border-border bg-surface px-1 text-xs text-text-secondary"
        >
          {options.map((z) => (
            <option key={z} value={String(z)}>{`${Math.round(z * 100)}%`}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default DocumentStatusBar;
