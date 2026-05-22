// InlineAlert — compact contextual message (error/success/info/warning).
//
// Different from `Banner`: this is a small inline alert shown next to a
// form or action — e.g. "Sync failed: timeout" beside a Sync button. Uses
// a left accent border and tone-tinted background.

import React from 'react';
import { cn } from '../../lib/cn';

export type InlineAlertTone = 'error' | 'success' | 'info' | 'warning';

export interface InlineAlertProps {
  tone: InlineAlertTone;
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

function InlineAlert({ tone, children, onDismiss, className }: InlineAlertProps) {
  return (
    <div
      role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}
      aria-live={tone === 'error' || tone === 'warning' ? 'assertive' : 'polite'}
      className={cn(
        'flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm',
        TONE_CLASSES[tone],
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
