// JobToast — the visual of a keyed job toast (ToastProvider's `toastJob`):
// title, a state chip, optional detail, an optional progress bar, an optional
// link (`onNavigate` routes it in a SPA), and the same close button as Toast. Render through `useToast().toastJob`.

import type { MouseEvent } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/cn';
import Chip from './Chip';
import { ProgressBar } from './ProgressBar';
import { T } from './Text';
import { Inline, Stack } from '../ui/Stack';
import type { ToneOrAlias } from './tones';

export type JobToastState = 'queued' | 'running' | 'done' | 'failed';

export interface JobToastProps {
  /** The toast's own element id (not the job id). */
  id: string;
  title: string;
  state: JobToastState;
  detail?: string;
  /** 0-100. Shown as a bar while the job is queued or running. */
  progress?: number;
  href?: string;
  /** Link text. Default "View". */
  hrefLabel?: string;
  /**
   * Called when the link is activated (click or keyboard), with the href and the event.
   * The link then does not navigate itself (the event is default-prevented), so a SPA
   * host can route without a page reload. Without it the link is a plain anchor.
   */
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
  exiting?: boolean;
  onDismiss: (id: string) => void;
  onHoverChange?: (hovering: boolean) => void;
}

const STATE_LABEL: Record<JobToastState, string> = {
  queued: 'Queued',
  running: 'Running',
  done: 'Done',
  failed: 'Failed',
};

const STATE_TONE: Record<JobToastState, ToneOrAlias> = {
  queued: 'neutral',
  running: 'info',
  done: 'success',
  failed: 'danger',
};

const ACCENT_BORDER: Record<JobToastState, string> = {
  queued: 'border-l-border',
  running: 'border-l-info',
  done: 'border-l-success',
  failed: 'border-l-danger',
};

export function JobToast({
  id, title, state, detail, progress, href, hrefLabel = 'View', onNavigate, exiting, onDismiss, onHoverChange,
}: JobToastProps) {
  const reduceMotion = usePrefersReducedMotion();
  const animationClass = reduceMotion
    ? 'animate-none'
    : exiting
      ? 'animate-[toast-fade-out_160ms_ease-in_forwards]'
      : 'animate-[toast-slide-in_200ms_ease-out]';
  const active = state === 'queued' || state === 'running';

  return (
    <Stack
      gap="sm"
      role={state === 'failed' ? 'alert' : 'status'}
      data-testid={`job-toast-${id}`}
      data-job-state={state}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={cn(
        'bg-surface border border-border border-l-[3px] rounded-lg shadow-md',
        'px-4 py-3 min-w-[260px] max-w-[360px]',
        ACCENT_BORDER[state],
        animationClass,
        reduceMotion && exiting && 'opacity-0',
      )}
    >
      <Inline wrap={false} align="start" justify="between" gap="md">
        <T as="span" size="sm" weight="medium" tone="primary" className="flex-1" data-testid="job-toast-title">
          {title}
        </T>
        <Inline wrap={false} gap="sm" className="shrink-0">
          <Chip tone={STATE_TONE[state]} size="xs" data-testid="job-toast-state">{STATE_LABEL[state]}</Chip>
          <button
            data-ui-part=""
            data-testid="job-toast-close"
            onClick={() => onDismiss(id)}
            aria-label="Dismiss notification"
            className="text-base text-text-tertiary bg-transparent border-none cursor-pointer px-1 py-0 leading-none"
          >
            &times;
          </button>
        </Inline>
      </Inline>
      {detail && (
        <T as="span" size="xs" tone="secondary" data-testid="job-toast-detail">{detail}</T>
      )}
      {active && typeof progress === 'number' && (
        <ProgressBar
          value={Math.max(0, Math.min(100, progress))}
          size="sm"
          showRatio={false}
          data-testid="job-toast-progress"
          aria-label={`${title} progress`}
        />
      )}
      {href && (
        <a
          href={href}
          onClick={onNavigate ? (e) => { e.preventDefault(); onNavigate(href, e); } : undefined}
          data-testid="job-toast-link"
          className="text-xs font-semibold text-primary no-underline hover:underline self-start"
        >
          {hrefLabel}
        </a>
      )}
    </Stack>
  );
}

export default JobToast;
