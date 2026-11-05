// RecordingConsentNotice — "Recording and transcription. Started by X. By
// attending this meeting, you agree to being included. Privacy policy." The
// card every participant sees once when recording or transcription starts,
// dismissible, anchored over the stage. A pill (CallNoticePill) is too small
// for a consent sentence and a link.

import { useCallback, useEffect, useState } from 'react';
import { cn } from '../../lib/cn';
import { T } from '../shared/Text';
import { IconButton } from '../ui/IconButton';
import { CloseIcon } from '../ui/Icons';
import { Link } from '../shared/Link';
import { MeetingRecordingIcon } from './MeetingIcons';

export type RecordingConsentKind = 'recording' | 'transcription' | 'both';

export interface RecordingConsentNoticeProps {
  open: boolean;
  kind: RecordingConsentKind;
  /** Who started it. Omitted: the sentence says "Started." without a name. */
  startedBy?: string;
  privacyHref?: string;
  privacyLabel?: string;
  onDismiss: () => void;
  /**
   * `overlay` (default) floats over the stage; `inline` sits in the flow;
   * `line` is one compact text line (a red dot, "Recording · by attending you
   * agree to be included", the dismiss inline) that truncates rather than
   * wraps, for a call's stage header row (2.480.2).
   */
  placement?: 'overlay' | 'inline' | 'line';
  className?: string;
  'data-testid'?: string;
}

export const RECORDING_CONSENT_TITLES: Record<RecordingConsentKind, string> = {
  recording: 'Recording',
  transcription: 'Transcription',
  both: 'Recording and transcription',
};

export function RecordingConsentNotice({
  open,
  kind,
  startedBy,
  privacyHref,
  privacyLabel = 'Privacy policy',
  onDismiss,
  placement = 'overlay',
  className,
  'data-testid': testId = 'recording-consent',
}: RecordingConsentNoticeProps) {
  if (!open) return null;
  const title = RECORDING_CONSENT_TITLES[kind];
  if (placement === 'line') {
    const sentence = `${title}${startedBy ? ` by ${startedBy}` : ''} · by attending you agree to be included`;
    return (
      <div role="status" aria-live="polite" aria-label={title} data-testid={testId} data-kind={kind} data-placement="line"
        title={sentence}
        className={cn('flex h-8 min-w-0 items-center gap-1.5', className)}>
        <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-danger" />
        <T size="xs" tone="secondary" className="min-w-0 truncate">{sentence}</T>
        {privacyHref && (
          <T size="xs" className="shrink-0">
            <Link href={privacyHref} external className="text-primary-fg underline" data-testid={`${testId}-privacy`}>
              {privacyLabel}
            </Link>
          </T>
        )}
        <IconButton aria-label="Dismiss recording note" variant="ghost" size="sm" icon={<CloseIcon />} onClick={onDismiss}
          className="h-6 w-6 shrink-0" data-testid={`${testId}-dismiss`} />
      </div>
    );
  }
  return (
    <section
      data-ui-part=""
      role="status"
      aria-live="polite"
      aria-label={title}
      data-testid={testId}
      data-kind={kind}
      className={cn(
        'w-[min(30rem,calc(100%-2rem))] rounded-lg border border-border bg-surface p-4 shadow-lg',
        placement === 'overlay' && 'absolute left-1/2 top-3 z-30 -translate-x-1/2',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <MeetingRecordingIcon aria-hidden size={16} className="mt-0.5 shrink-0 text-text-primary" />
        <div className="min-w-0 flex-1">
          <T as="p" size="sm" weight="semibold">{title}</T>
          <T as="p" size="sm" tone="secondary" className="mt-1 block">
            {startedBy ? `Started by ${startedBy}. ` : 'Started. '}
            By attending this meeting, you agree to being included.
            {privacyHref && (
              <>
                {' '}
                <Link href={privacyHref} external className="text-primary-fg underline" data-testid={`${testId}-privacy`}>
                  {privacyLabel}
                </Link>
              </>
            )}
          </T>
        </div>
        <IconButton aria-label="Dismiss" variant="ghost" size="sm" icon={<CloseIcon />} onClick={onDismiss} data-testid={`${testId}-dismiss`} />
      </div>
    </section>
  );
}

// ── Remembered dismissal (2.462.0) ──────────────────────────────────────────

const DISMISSAL_PREFIX = 'ui-components:consent-dismissed:';
/** Dismissals this page has seen, for when storage is blocked or throws. */
const dismissedInMemory = new Set<string>();

function storageFor(kind: 'session' | 'local'): Storage | null {
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function readDismissed(key: string, kind: 'session' | 'local'): boolean {
  if (dismissedInMemory.has(key)) return true;
  try {
    return storageFor(kind)?.getItem(DISMISSAL_PREFIX + key) === '1';
  } catch {
    return false;
  }
}

export interface UseConsentDismissalOptions {
  /**
   * `session` (default): remembered for this tab, so a reload or a hop
   * between pages of the same meeting does not show the card again, and a
   * new tab does. `local`: remembered on this device.
   */
  storage?: 'session' | 'local';
}

export interface ConsentDismissal {
  /** True once this key was dismissed (here, or earlier in the remembered scope). */
  dismissed: boolean;
  dismiss(): void;
  /** Forget the dismissal (tests, a "show again" control). */
  reset(): void;
}

/**
 * Remember that someone dismissed `RecordingConsentNotice` for one recording.
 * Key it by meeting AND recording session (`${meetingId}:${recordingId}`), so
 * a recording that stops and starts again asks again. A null key is never
 * dismissed. Storage failures (private mode, blocked site data) fall back to
 * memory for the life of the page.
 *
 *   const consent = useConsentDismissal(recording ? `${meetingId}:${recording.id}` : null);
 *   <RecordingConsentNotice open={!!recording && !consent.dismissed} onDismiss={consent.dismiss} … />
 */
export function useConsentDismissal(key: string | null, opts: UseConsentDismissalOptions = {}): ConsentDismissal {
  const kind = opts.storage ?? 'session';
  const [dismissed, setDismissed] = useState(() => (key ? readDismissed(key, kind) : false));
  useEffect(() => {
    setDismissed(key ? readDismissed(key, kind) : false);
  }, [key, kind]);
  const dismiss = useCallback(() => {
    if (!key) return;
    dismissedInMemory.add(key);
    try {
      storageFor(kind)?.setItem(DISMISSAL_PREFIX + key, '1');
    } catch {
      // Memory still holds it for this page.
    }
    setDismissed(true);
  }, [key, kind]);
  const reset = useCallback(() => {
    if (!key) return;
    dismissedInMemory.delete(key);
    try {
      storageFor(kind)?.removeItem(DISMISSAL_PREFIX + key);
    } catch {
      // Nothing stored to remove.
    }
    setDismissed(false);
  }, [key, kind]);
  return { dismissed, dismiss, reset };
}
