// ActivityResumeChip — "Create artwork · Completed · 2m ago" as one compact
// button, for a page the user returns to after a workflow ran there.
//
// A docked prompt deck is scoped to the context that raised it, so leaving a
// page drops its card. Coming back should not silently re-raise it either: the
// page shows this chip (in its header actions, or above its composer), and a
// click asks the host to re-populate the deck with that run's next step.

import { cn } from '../../lib/cn';
import { TONE_SOLID_BG, toneKey, type ToneOrAlias } from './tones';

export interface ActivityResumeChipProps {
  /** What ran ("Create artwork"). */
  label: string;
  /** Where it stands ("Completed", "Waiting for review"). */
  status: string;
  /** Colour of the status dot. Default `neutral`. */
  tone?: ToneOrAlias;
  /** When it last changed (ISO string, epoch ms or Date): drawn as "2m ago". */
  at?: string | number | Date;
  /** Clock for the relative time; tests pin it. Default `Date.now()`. */
  now?: number;
  /** Re-populate the page's deck with this activity's next step. */
  onResume: () => void;
  /** Accessible name. Default "Resume <label> · <status>". */
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

/** "just now", "5m ago", "3h ago", "2d ago", else the date. */
export function activityAge(at: string | number | Date, now = Date.now()): string {
  const t = at instanceof Date ? at.getTime() : typeof at === 'number' ? at : Date.parse(at);
  if (!Number.isFinite(t)) return '';
  const d = Math.max(0, now - t);
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  if (d < 604_800_000) return `${Math.floor(d / 86_400_000)}d ago`;
  return new Date(t).toLocaleDateString();
}

export function ActivityResumeChip({ label, status, tone = 'neutral', at, now, onResume, 'aria-label': ariaLabel, className, 'data-testid': testId = 'activity-resume-chip' }: ActivityResumeChipProps) {
  const age = at != null ? activityAge(at, now) : '';
  return (
    <button
      type="button"
      onClick={onResume}
      aria-label={ariaLabel ?? `Resume ${label} · ${status}${age ? ` · ${age}` : ''}`}
      title={`${label} · ${status}${age ? ` · ${age}` : ''}`}
      data-testid={testId}
      data-activity-resume=""
      className={cn(
        'inline-flex h-7 max-w-full min-w-0 items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 text-xs text-text-secondary',
        'transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer',
        className,
      )}
    >
      <span aria-hidden className={cn('h-2 w-2 shrink-0 rounded-full', TONE_SOLID_BG[toneKey(tone)])} />
      <span className="min-w-0 truncate font-medium text-text-primary">{label}</span>
      <span aria-hidden className="text-text-tertiary">·</span>
      <span className="shrink-0">{status}</span>
      {age && <><span aria-hidden className="text-text-tertiary">·</span><span className="shrink-0 text-text-tertiary">{age}</span></>}
    </button>
  );
}

export default ActivityResumeChip;
