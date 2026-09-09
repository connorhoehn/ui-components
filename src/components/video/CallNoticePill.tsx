// CallNoticePill — something the person on a call must know, said in one line.
//
// A call widget is a few hundred pixels across; a page Banner dropped into it
// covers the person's own tile with a title, a paragraph and a button stack,
// which reads as a rendering fault rather than a notice. This is the same
// message at the widget's scale: one pill along the top edge, the action on
// the same line, nothing over the video that does not need to be.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface CallNoticePillProps {
  show: boolean;
  tone?: 'warning' | 'error' | 'info';
  /** The one sentence. */
  message: ReactNode;
  /** Small buttons, rendered inline after the message. */
  actions?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

const TONE: Record<NonNullable<CallNoticePillProps['tone']>, string> = {
  warning: 'bg-warning/95 text-white',
  error: 'bg-danger/95 text-white',
  info: 'bg-black/70 text-white',
};

export function CallNoticePill({ show, tone = 'warning', message, actions, className, 'data-testid': testId = 'call-notice' }: CallNoticePillProps) {
  if (!show) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      data-testid={testId}
      data-tone={tone}
      className={cn(
        'pointer-events-auto absolute left-1/2 top-3 z-30 flex max-w-[calc(100%-1rem)] -translate-x-1/2 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium shadow-lg',
        TONE[tone],
        className,
      )}
    >
      <span className="min-w-0 truncate">{message}</span>
      {actions && <span className="flex shrink-0 items-center gap-1">{actions}</span>}
    </div>
  );
}

export default CallNoticePill;
