// VoiceTurnStrip — what was said and what ran.
//
// A short transcript: the last `maxVisible` turns with their tool calls
// (running / done / refused / failed), and, when `pending` is set, the
// confirmation card with Confirm and Cancel. Escape cancels and Enter confirms
// while the card has focus.

import { useEffect, useRef, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { Stack, Inline } from '../ui/Stack';
import { StatusPill, type StatusPillTone } from '../shared/StatusPill';
import { T } from '../shared/Text';
import type { VoicePending, VoiceToolStatus, VoiceTurn } from './voiceTypes';

const TOOL_TONE: Record<VoiceToolStatus, StatusPillTone> = {
  running: 'info',
  done: 'success',
  refused: 'warning',
  failed: 'danger',
};

export interface VoiceConfirmCardProps {
  pending: VoicePending;
  /** Handle Escape on the card itself. The dock turns this off: its popover already closes on Escape. Default true. */
  handleEscape?: boolean;
  /** Focus the card when it mounts. Default true. */
  autoFocus?: boolean;
  className?: string;
  'data-testid'?: string;
}

/** The confirmation card: a title, optional detail, Confirm and Cancel. */
export function VoiceConfirmCard({
  pending,
  handleEscape = true,
  autoFocus = true,
  className,
  'data-testid': testId = 'voice-confirm-card',
}: VoiceConfirmCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && handleEscape) {
      e.stopPropagation();
      pending.onCancel();
    } else if (e.key === 'Enter' && e.target === e.currentTarget) {
      e.preventDefault();
      pending.onConfirm();
    }
  };

  return (
    <Stack
      ref={ref}
      gap="sm"
      tabIndex={0}
      role="group"
      aria-label={`Confirm: ${pending.title}`}
      onKeyDown={onKeyDown}
      data-testid={testId}
      className={cn('rounded-md border border-solid border-warning/40 bg-surface p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary', className)}
    >
      <T size="sm" weight="semibold" tone="primary" as="p">{pending.title}</T>
      {pending.detail ? <T size="xs" tone="secondary" as="p">{pending.detail}</T> : null}
      <Inline gap="sm" justify="end">
        <Button variant="secondary" size="sm" onClick={pending.onCancel} data-testid={`${testId}-cancel`}>Cancel</Button>
        <Button variant="primary" size="sm" onClick={pending.onConfirm} data-testid={`${testId}-confirm`}>Confirm</Button>
      </Inline>
    </Stack>
  );
}

export interface VoiceTurnStripProps {
  turns: VoiceTurn[];
  /** Show only the last N turns. Default 4. */
  maxVisible?: number;
  onClear?: () => void;
  /** The action awaiting confirmation; renders the confirmation card under the turns. */
  pending?: VoicePending | null;
  className?: string;
  'data-testid'?: string;
}

function formatAt(at: number | string): string {
  if (typeof at === 'string') return at;
  const d = new Date(at);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function VoiceTurnStrip({
  turns,
  maxVisible = 4,
  onClear,
  pending = null,
  className,
  'data-testid': testId = 'voice-turn-strip',
}: VoiceTurnStripProps) {
  const visible = maxVisible > 0 ? turns.slice(-maxVisible) : turns;
  return (
    <Stack gap="sm" className={cn('min-w-0', className)} data-testid={testId}>
      {visible.length === 0 && !pending ? (
        <T size="xs" tone="tertiary" data-testid={`${testId}-empty`}>Nothing said yet.</T>
      ) : null}
      {visible.map((turn) => (
        <Stack key={turn.id} gap="xs" data-testid={`${testId}-turn-${turn.id}`} data-role={turn.role}>
          <Inline gap="sm">
            <T size="xs" weight="semibold" tone={turn.role === 'you' ? 'secondary' : 'primary'}>
              {turn.role === 'you' ? 'You' : 'Assistant'}
            </T>
            <T size="xs" tone="tertiary" tabular>{formatAt(turn.at)}</T>
          </Inline>
          <T size="sm" tone="primary" as="p" wrap>{turn.text}</T>
          {turn.toolCalls?.map((call, i) => (
            <Inline key={`${call.name}-${i}`} gap="sm" data-testid={`${testId}-tool-${turn.id}-${i}`} data-status={call.status}>
              <StatusPill size="sm" tone={TOOL_TONE[call.status]} label={call.status} />
              <T size="xs" weight="medium" tone="secondary">{call.name}</T>
              <T size="xs" tone="tertiary">{call.summary}</T>
            </Inline>
          ))}
        </Stack>
      ))}
      {pending ? <VoiceConfirmCard pending={pending} /> : null}
      {onClear && turns.length > 0 ? (
        <Inline justify="end">
          <Button variant="ghost" size="sm" onClick={onClear} data-testid={`${testId}-clear`}>Clear</Button>
        </Inline>
      ) : null}
    </Stack>
  );
}

export default VoiceTurnStrip;
