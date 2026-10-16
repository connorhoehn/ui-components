// RecordingConsentNotice — "Recording and transcription. Started by X. By
// attending this meeting, you agree to being included. Privacy policy." The
// card every participant sees once when recording or transcription starts,
// dismissible, anchored over the stage. A pill (CallNoticePill) is too small
// for a consent sentence and a link.

import { cn } from '../../lib/cn';
import { T } from '../shared/Text';
import { IconButton } from '../ui/IconButton';

export type RecordingConsentKind = 'recording' | 'transcription' | 'both';

export interface RecordingConsentNoticeProps {
  open: boolean;
  kind: RecordingConsentKind;
  /** Who started it. Omitted: the sentence says "Started." without a name. */
  startedBy?: string;
  privacyHref?: string;
  privacyLabel?: string;
  onDismiss: () => void;
  /** `overlay` (default) floats over the stage; `inline` sits in the flow. */
  placement?: 'overlay' | 'inline';
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
  return (
    <section
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
        <span aria-hidden className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 border-text-primary">
          <span className="h-2 w-2 rounded-full bg-text-primary" />
        </span>
        <div className="min-w-0 flex-1">
          <T as="p" size="sm" weight="semibold">{title}</T>
          <T as="p" size="sm" tone="secondary" className="mt-1 block">
            {startedBy ? `Started by ${startedBy}. ` : 'Started. '}
            By attending this meeting, you agree to being included.
            {privacyHref && (
              <>
                {' '}
                <a href={privacyHref} target="_blank" rel="noreferrer" className="text-accent underline" data-testid={`${testId}-privacy`}>
                  {privacyLabel}
                </a>
              </>
            )}
          </T>
        </div>
        <IconButton aria-label="Dismiss" variant="ghost" size="sm" onClick={onDismiss} data-testid={`${testId}-dismiss`}>
          <span aria-hidden className="text-lg leading-none">×</span>
        </IconButton>
      </div>
    </section>
  );
}
