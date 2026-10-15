// AccessNotice — a quiet row explaining why the viewer cannot do something
// here, with an optional way to fix it ("Edit access required · Request
// access →").
//
// It is a note, not an alert: the viewer did nothing wrong, and screen readers
// should not interrupt for it. The host derives it from real policy (the
// document write-policy and grant); the action is omitted when no flow exists
// rather than pointing at a button that goes nowhere.

import type { ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '../../lib/cn';
import { StatusDot } from '../shared/StatusDot';
import { Link } from '../shared/Link';
import { Button } from '../ui/Button';
import { ArrowRightIcon } from '../ui/Icons';

export type AccessNoticeTone = 'warning' | 'info' | 'danger';

export interface AccessNoticeAction {
  label: string;
  onClick?: () => void;
  /** Renders a real link instead of a button. */
  href?: string;
}

export interface AccessNoticeProps {
  tone?: AccessNoticeTone;
  title: string;
  body?: ReactNode;
  action?: AccessNoticeAction | null;
  className?: string;
  'data-testid'?: string;
}

const DOT: Record<AccessNoticeTone, string> = {
  warning: 'var(--color-warning)',
  info: 'var(--color-info)',
  danger: 'var(--color-danger)',
};

export function AccessNotice({
  tone = 'warning',
  title,
  body,
  action,
  className,
  'data-testid': testId,
}: AccessNoticeProps) {
  const titleId = useId();
  const actionContent = action ? (
    <span className="inline-flex items-center gap-1">
      {action.label}
      <ArrowRightIcon size={14} />
    </span>
  ) : null;

  return (
    <div
      role="note"
      aria-labelledby={titleId}
      data-tone={tone}
      data-testid={testId}
      className={cn('flex items-start gap-2.5 py-3 text-sm', className)}
    >
      <StatusDot color={DOT[tone]} size="sm" className="mt-1.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <div id={titleId} className="font-semibold text-text-primary">
          {title}
        </div>
        {body != null && <div className="mt-0.5 text-[12px] text-text-secondary">{body}</div>}
      </div>
      {action &&
        (action.href ? (
          <Link href={action.href} onClick={action.onClick} className="shrink-0 text-sm font-medium">
            {actionContent}
          </Link>
        ) : (
          <Button variant="link" onClick={action.onClick} className="shrink-0 text-sm">
            {actionContent}
          </Button>
        ))}
    </div>
  );
}

export default AccessNotice;
