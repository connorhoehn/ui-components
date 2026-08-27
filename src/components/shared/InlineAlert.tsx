// InlineAlert — compact contextual message (error/success/info/warning).
//
// Different from `Banner`: this is a small inline alert shown next to a
// form or action — e.g. "Sync failed: timeout" beside a Sync button. Uses
// a left accent border and tone-tinted background.

import React from 'react';
import { cn } from '../../lib/cn';
import type { SurfaceTone } from './tones';

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
}

const TONE_CLASSES: Record<InlineAlertTone, string> = {
  error:
    'bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]',
  success:
    'bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]',
  info:
    'bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]',
  warning:
    'bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]',
};

// One panel background for all four severities: the accent border and the
// text carry the severity, which is how a terminal signals it too.
const CODE_TONE_CLASSES: Record<InlineAlertTone, string> = {
  error: 'bg-code-surface border-code-red text-code-red',
  success: 'bg-code-surface border-code-green text-code-green',
  info: 'bg-code-surface border-code-blue text-code-blue',
  warning: 'bg-code-surface border-code-peach text-code-peach',
};

const PALETTE: Record<InlineAlertPalette, Record<InlineAlertTone, string>> = {
  surface: TONE_CLASSES,
  code: CODE_TONE_CLASSES,
};

function InlineAlert({ tone, palette = 'surface', children, onDismiss, className }: InlineAlertProps) {
  return (
    <div
      role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}
      aria-live={tone === 'error' || tone === 'warning' ? 'assertive' : 'polite'}
      className={cn(
        'flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm',
        (PALETTE[palette] ?? TONE_CLASSES)[tone],
        className,
      )}
    >
      <span className="flex-1">{children}</span>
      {onDismiss && (
        <button
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
