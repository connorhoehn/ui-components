// src/components/shared/RunProgressPanel.tsx
//
// A running job's progress, in place: what is happening in one sentence, how
// long it has run and roughly how long is left, a progress bar, and the two
// things a reader can do about it while it runs (Refresh status, Cancel job).
// Cancel confirms in place (`ConfirmButton`, `data-action-kind="cancel"`); no
// dialog opens. A "Non-blocking" chip says the reader can keep working.
//
// This is the panel the Storymaker concepts (§5) draw inside a run card, and
// what `WrappedPipelineRun` renders for a run that is working. It replaces a
// centred EmptyState ("Drawing…") with something that says how far along it is.
//
// Elapsed is either given (`elapsedMs`) or counted live from `startedAt` while
// `state` is `running` or `queued` (one tick a second). Remaining is the host's
// estimate; it is shown with a "~" because it is one.
//
// Markers: `data-run-progress`, `data-run-state` (`queued` / `running` /
// `done` / `failed` / `cancelled`).

import { useEffect, useId, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Stack, Inline } from '../ui/Stack';
import { Text } from './Text';
import Chip from './Chip';
import { Tooltip } from './Tooltip';
import { KeyValue, type KeyValueItem } from './KeyValue';
import { ProgressBar } from './ProgressBar';
import { ConfirmButton } from './ConfirmButton';

export type RunProgressState = 'queued' | 'running' | 'done' | 'failed' | 'cancelled';

export interface RunProgressPanelProps {
  /** What is running, as a heading: "Generating 3D mesh". */
  title: ReactNode;
  /** One sentence: "Meshy is generating a stylized mesh from the approved concept. You can continue working while this runs." */
  description?: ReactNode;
  /** Default `running`. Cancel shows only while `queued` or `running`. */
  state?: RunProgressState;
  /** 0–100. Omit while the provider reports no percentage: the bar is then left out, not faked. */
  progress?: number;
  /** Elapsed time, when the host already knows it. Wins over `startedAt`. */
  elapsedMs?: number;
  /** When the job started (ISO string or epoch ms): elapsed is counted live from it while the job runs. */
  startedAt?: string | number;
  /** The host's estimate of the time left. Shown as "~1m 45s". */
  remainingMs?: number;
  /** "Refresh status": re-read the provider. Omit to leave the button out. */
  onRefresh?: () => void;
  /** Default "Refresh status". */
  refreshLabel?: string;
  /** "Cancel job": confirmed in place. A returned promise keeps it busy. Omit to leave it out. */
  onCancel?: () => void | Promise<unknown>;
  /** Default "Cancel job". */
  cancelLabel?: string;
  /** Default "Cancel this job?". */
  cancelQuestion?: string;
  /** Show the "Non-blocking" chip. Default true. */
  nonBlocking?: boolean;
  /** The chip's tooltip. Default "You can keep working while this runs." */
  nonBlockingHint?: string;
  /** More facts beside Elapsed and Est. remaining ("Attempt 2 of 3"). */
  facts?: KeyValueItem[];
  /** Draw the panel on its own card surface. Default true; false when it sits inside a card already. */
  framed?: boolean;
  /** Clock source for the live elapsed count; for tests. Default `Date.now`. */
  now?: () => number;
  className?: string;
  'data-testid'?: string;
}

/** "42s", "3m 42s", "1h 05m": the run-length format the progress panel and run cards use. */
export function formatRunDuration(ms: number | undefined): string {
  if (ms == null || !Number.isFinite(ms) || ms < 0) return '—';
  const total = Math.round(ms / 1000);
  if (total < 60) return `${total}s`;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
  return `${m}m ${s}s`;
}

const startMs = (v: string | number | undefined): number | undefined => {
  if (v == null) return undefined;
  const t = typeof v === 'number' ? v : Date.parse(v);
  return Number.isFinite(t) ? t : undefined;
};

const STATE_LABEL: Record<RunProgressState, string> = {
  queued: 'Queued',
  running: 'Running',
  done: 'Done',
  failed: 'Failed',
  cancelled: 'Cancelled',
};

export function RunProgressPanel({
  title,
  description,
  state = 'running',
  progress,
  elapsedMs,
  startedAt,
  remainingMs,
  onRefresh,
  refreshLabel = 'Refresh status',
  onCancel,
  cancelLabel = 'Cancel job',
  cancelQuestion = 'Cancel this job?',
  nonBlocking = true,
  nonBlockingHint = 'You can keep working while this runs.',
  facts = [],
  framed = true,
  now = Date.now,
  className,
  'data-testid': testId = 'run-progress-panel',
}: RunProgressPanelProps) {
  const headingId = useId();
  const live = state === 'running' || state === 'queued';
  const started = startMs(startedAt);
  const [clock, setClock] = useState(() => now());
  useEffect(() => {
    if (!live || elapsedMs != null || started == null) return undefined;
    setClock(now());
    const timer = setInterval(() => setClock(now()), 1000);
    return () => clearInterval(timer);
  }, [live, elapsedMs, started, now]);
  const elapsed = elapsedMs ?? (started != null ? Math.max(0, clock - started) : undefined);

  const items: KeyValueItem[] = [
    ...(elapsed != null ? [{ label: 'Elapsed', value: formatRunDuration(elapsed) }] : []),
    ...(live && remainingMs != null ? [{ label: 'Est. remaining', value: `~${formatRunDuration(remainingMs)}` }] : []),
    ...facts,
  ];
  const pct = progress == null ? undefined : Math.max(0, Math.min(100, progress));

  const body = (
    <Stack gap="md">
      <Inline gap="sm" align="center" justify="between" wrap>
        <Text as="span" size="sm" weight="semibold" tone="primary">
          <span id={headingId} data-ui-part="">{title}</span>
        </Text>
        <Inline gap="xs" align="center">
          {!live && <Chip size="sm" tone={state === 'done' ? 'success' : state === 'failed' ? 'danger' : 'neutral'}>{STATE_LABEL[state]}</Chip>}
          {nonBlocking && live && (
            <Tooltip content={nonBlockingHint}>
              <Chip size="sm" tone="info" title={nonBlockingHint} data-testid={`${testId}-non-blocking`}>Non-blocking</Chip>
            </Tooltip>
          )}
        </Inline>
      </Inline>
      {description != null && <Text as="p" size="sm" tone="secondary" wrap>{description}</Text>}
      {items.length > 0 && <KeyValue items={items} layout="grid" data-testid={`${testId}-facts`} />}
      {pct != null && (
        <ProgressBar
          value={pct}
          size="md"
          completeTone="success"
          label={state === 'queued' ? 'Waiting to start' : 'Progress'}
          showRatio={false}
          aria-label={`${typeof title === 'string' ? title : 'Job'}: ${Math.round(pct)}%`}
          data-testid={`${testId}-bar`}
        />
      )}
      {(onRefresh || (onCancel && live)) && (
        <Inline gap="sm" align="center" wrap>
          {onRefresh && (
            <Button variant="secondary" size="sm" onClick={onRefresh} data-testid={`${testId}-refresh`}>{refreshLabel}</Button>
          )}
          {onCancel && live && (
            <ConfirmButton
              label={cancelLabel}
              question={cancelQuestion}
              confirmLabel={cancelLabel}
              cancelLabel="Keep running"
              tone="destructive"
              actionKind="cancel"
              onConfirm={onCancel}
              data-testid={`${testId}-cancel`}
            />
          )}
        </Inline>
      )}
    </Stack>
  );

  return (
    <section
      aria-labelledby={headingId}
      aria-busy={live || undefined}
      data-run-progress=""
      data-run-state={state}
      data-testid={testId}
      className={cn('min-w-0', className)}
    >
      {framed ? <Card padding="md">{body}</Card> : body}
    </section>
  );
}

export default RunProgressPanel;
