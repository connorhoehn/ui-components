// InlineAlert — compact contextual message (error/success/info/warning).
//
// Different from `Banner`: this is a small inline alert shown next to a
// form or action — e.g. "Sync failed: timeout" beside a Sync button. Uses
// a left accent border and tone-tinted background.

import React from 'react';
import { cn } from '../../lib/cn';
import { TONE_BORDER, TONE_SOFT, type SurfaceTone, type Tone } from './tones';

export type InlineAlertTone = 'error' | 'success' | 'info' | 'warning';

/**
 * `tone` already names the severity here, so the surface-family axis is
 * `palette` — same split as Chip. See `SurfaceTone` in tones.ts.
 */
export type InlineAlertPalette = SurfaceTone;

export interface InlineAlertProps {
  tone: InlineAlertTone;
  /**
   * Colour family. `surface` (default) follows the host theme; `code` paints
   * in the permanently-dark terminal palette, for alerts inside a log console
   * or debugger panel.
   */
  palette?: InlineAlertPalette;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
  /** Test hook, forwarded to the alert element itself — same as Chip. An
   *  alert is the thing a test most wants to assert on, and without this
   *  the caller had to wrap it in a div and assert on the wrapper. */
  'data-testid'?: string;
}

const TONE_KEY: Record<InlineAlertTone, Tone> = {
  error: 'danger', success: 'success', info: 'info', warning: 'warning',
};

// One panel background for all four severities: the accent border and the
// text carry the severity, which is how a terminal signals it too.
const CODE_TONE_CLASSES: Record<InlineAlertTone, string> = {
  error: 'bg-code-surface border-code-red text-code-red',
  success: 'bg-code-surface border-code-green text-code-green',
  info: 'bg-code-surface border-code-blue text-code-blue',
  warning: 'bg-code-surface border-code-peach text-code-peach',
};

function InlineAlert({
  tone,
  palette = 'surface',
  children,
  onDismiss,
  className,
  'data-testid': testId,
}: InlineAlertProps) {
  return (
    <div
      data-testid={testId}
      role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}
      aria-live={tone === 'error' || tone === 'warning' ? 'assertive' : 'polite'}
      className={cn(
        'flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm',
        palette === 'code' ? CODE_TONE_CLASSES[tone] : cn(TONE_SOFT[TONE_KEY[tone]], TONE_BORDER[TONE_KEY[tone]]),
        className,
      )}
    >
      <span className="flex-1">{children}</span>
      {onDismiss && (
        <button
          data-ui-part=""
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="flex-shrink-0 opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export { InlineAlert };
export default InlineAlert;
