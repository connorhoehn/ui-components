// SignoffPanel — who has ratified a decision, and what it still needs.
//
// The ADR contract made visible: each steward's standing decision (approve /
// reject), progress toward the approval quorum, and the action buttons for
// the person looking at it. The panel renders state; WHETHER an approval is
// currently allowed is the caller's rule (enforced server-side) — pass
// `actions` only when the viewer may act.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Chip from './Chip';
import { Avatar } from './Avatar';

export interface SignoffEntry {
  name: string;
  /** e.g. 'owner', 'sme', 'org-leader' — shown as the chip's title. */
  role?: string;
  decision: 'approve' | 'reject';
  timeLabel?: string;
}

export interface SignoffPanelProps {
  variant?: 'card' | 'inline';
  signoffs: SignoffEntry[];
  /** Approvals needed to ratify. Default 2. */
  required?: number;
  /** Approve/Reject buttons etc. — render only for viewers who may act. */
  actions?: ReactNode;
  emptyHint?: string;
  className?: string;
  'data-testid'?: string;
}

export function SignoffPanel({
  variant = 'card',
  signoffs,
  required = 2,
  actions,
  emptyHint,
  className,
  'data-testid': testId,
}: SignoffPanelProps) {
  const approvals = signoffs.filter((s) => s.decision === 'approve').length;
  const hint = emptyHint ?? `none yet — ${required} approvals ratify the decision`;

  return (
    <div
      className={cn('flex flex-wrap items-center gap-3 border-border bg-surface py-3', variant === 'inline' ? 'border-t' : 'rounded-lg border px-4', className)}
      data-variant={variant}
      {...(testId ? { 'data-testid': testId } : {})}
    >
      <span className="text-xs font-semibold text-text-primary">Sign-offs</span>
      {signoffs.length === 0 ? (
        <span className="text-xs text-text-tertiary">{hint}</span>
      ) : (
        <>
          {signoffs.map((s) => (
            <span key={s.name} className="flex items-center gap-1.5" title={s.role ? `${s.name} · ${s.role}` : s.name}>
              <Avatar name={s.name} size={18} />
              <span className="text-xs text-text-secondary">{s.name}</span>
              <Chip tone={s.decision === 'approve' ? 'success' : 'danger'} size="xs">
                {s.decision === 'approve' ? '✓' : '✕'}
              </Chip>
            </span>
          ))}
          <span className="text-[11px] text-text-tertiary">{approvals}/{required} approvals</span>
        </>
      )}
      <div className="flex-1" />
      {actions}
    </div>
  );
}

export default SignoffPanel;
