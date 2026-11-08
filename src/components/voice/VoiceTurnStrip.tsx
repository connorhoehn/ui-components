// VoiceTurnStrip — what was said and what ran.
//
// A short transcript: the last `maxVisible` turns with their tool calls
// (running / done / refused / failed), and, when `pending` is set, the
// confirmation card with Confirm and Cancel (or, when `pendingChoice` is set, the
// choice card for an ambiguous result). Escape cancels and Enter confirms
// while the card has focus.

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { Stack, Inline } from '../ui/Stack';
import { Input } from '../forms/Input';
import Switch from '../shared/Switch';
import { HistoryIcon } from '../ui/Icons';
import { SegmentedControl } from '../shared/SegmentedControl';
import { StatusPill, type StatusPillTone } from '../shared/StatusPill';
import { T } from '../shared/Text';
import { VoiceChoiceCard } from './VoiceChoiceCard';
import {
  VOICE_NOTE_MAX,
  type VoiceDecision,
  type VoicePending,
  type VoicePendingChoice,
  type VoiceToolStatus,
  type VoiceTurn,
} from './voiceTypes';

const DECISION_OPTIONS = [
  { label: 'Approve', value: 'approve' },
  { label: 'Reject', value: 'reject' },
];

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

/**
 * The confirmation card: a title, optional detail (a line or a list), Confirm and Cancel.
 * With `pending.fields` it also shows an approve / reject toggle and a one-line note, and
 * Confirm calls back with `{ decision, note }` (note trimmed, capped at 200 characters).
 * Remounts per request (`pending.requestId`, else `title`), so the note and toggle reset.
 */
export function VoiceConfirmCard(props: VoiceConfirmCardProps) {
  const { pending } = props;
  return <VoiceConfirmCardBody key={pending.requestId ?? pending.title} {...props} />;
}

function VoiceConfirmCardBody({
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

  const { fields } = pending;
  const [decision, setDecision] = useState<VoiceDecision>(fields?.decision ?? 'approve');
  const [note, setNote] = useState('');

  const confirm = () => {
    if (fields) pending.onConfirm({ decision, note: note.trim().slice(0, VOICE_NOTE_MAX).trim() });
    else pending.onConfirm();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && handleEscape) {
      e.stopPropagation();
      pending.onCancel();
    } else if (e.key === 'Enter' && (e.target === e.currentTarget || (fields && e.target instanceof HTMLInputElement))) {
      e.preventDefault();
      confirm();
    }
  };

  const lines = Array.isArray(pending.detail) ? pending.detail.filter(Boolean) : pending.detail ? [pending.detail] : [];

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
      {lines.length === 1 ? <T size="xs" tone="secondary" as="p">{lines[0]}</T> : null}
      {lines.length > 1 ? (
        <Stack as="ul" gap="xs" data-testid={`${testId}-detail`} className="m-0 list-none p-0">
          {lines.map((line, i) => (
            <T key={i} size="xs" tone="secondary" as="li">{line}</T>
          ))}
        </Stack>
      ) : null}
      {fields ? (
        <Stack gap="xs">
          <SegmentedControl
            size="sm"
            tone="accent"
            aria-label="Decision"
            options={DECISION_OPTIONS}
            value={decision}
            onChange={(v) => setDecision(v as VoiceDecision)}
            data-testid={`${testId}-decision`}
          />
          <Input
            size="sm"
            value={note}
            maxLength={VOICE_NOTE_MAX}
            placeholder={fields.notePlaceholder ?? 'Note (optional)'}
            aria-label="Note"
            onChange={(e) => setNote(e.target.value)}
            data-testid={`${testId}-note`}
          />
        </Stack>
      ) : null}
      <Inline gap="sm" justify="end">
        <Button variant="secondary" size="sm" onClick={pending.onCancel} data-testid={`${testId}-cancel`}>Cancel</Button>
        <Button variant="primary" size="sm" onClick={confirm} data-testid={`${testId}-confirm`}>Confirm</Button>
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
  /** An `ambiguous` result awaiting an answer; renders the choice card under the turns. */
  pendingChoice?: VoicePendingChoice | null;
  /**
   * `panel` (default): two-line turns at `sm`. `footer`: one 28px row per turn
   * at `T` xs, all turns kept, the list showing three rows and scrolling the rest.
   * Since 2.510.6.
   */
  size?: VoiceTurnStripSize;
  /** The "Keep transcripts on this device" switch's state. The switch renders when `onKeepTranscriptChange` is set. */
  keepTranscript?: boolean;
  onKeepTranscriptChange?: (on: boolean) => void;
  /** Renders a quiet "History" control (the host opens its log view). */
  onOpenLog?: () => void;
  className?: string;
  'data-testid'?: string;
}

export type VoiceTurnStripSize = 'footer' | 'panel';

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
  pendingChoice = null,
  size = 'panel',
  keepTranscript = false,
  onKeepTranscriptChange,
  onOpenLog,
  className,
  'data-testid': testId = 'voice-turn-strip',
}: VoiceTurnStripProps) {
  const footer = size === 'footer';
  const keepId = useId();
  const visible = !footer && maxVisible > 0 ? turns.slice(-maxVisible) : turns;
  const extras = onKeepTranscriptChange || onOpenLog ? (
    <Inline gap="sm" justify="between" className="min-h-7" data-testid={`${testId}-extras`}>
      {onKeepTranscriptChange ? (
        <Inline gap="sm">
          <Switch
            size="sm"
            checked={keepTranscript}
            onChange={onKeepTranscriptChange}
            aria-labelledby={keepId}
            data-testid={`${testId}-keep`}
          />
          <T id={keepId} size="xs" tone="secondary">Keep transcripts on this device</T>
        </Inline>
      ) : <span />}
      {onOpenLog ? (
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          onClick={onOpenLog}
          data-testid={`${testId}-log`}
        >
          <HistoryIcon size={16} />
          History
        </Button>
      ) : null}
    </Inline>
  ) : null;
  if (footer) {
    return (
      <Stack gap="xs" className={cn('min-w-0', className)} data-testid={testId} data-size="footer">
        {visible.length === 0 && !pending && !pendingChoice ? (
          <T size="xs" tone="tertiary" className="min-h-7 leading-7" data-testid={`${testId}-empty`}>Nothing said yet.</T>
        ) : null}
        {visible.length > 0 ? (
          <Stack gap="none" className="max-h-21 overflow-y-auto" data-testid={`${testId}-list`}>
            {visible.map((turn) => (
              <Inline
                key={turn.id}
                wrap={false}
                gap="sm"
                className="h-7 min-w-0 shrink-0"
                data-testid={`${testId}-turn-${turn.id}`}
                data-role={turn.role}
              >
                <T size="xs" weight="semibold" tone={turn.role === 'you' ? 'secondary' : 'primary'} className="shrink-0">
                  {turn.role === 'you' ? 'You' : 'Assistant'}
                </T>
                <T size="xs" tone="primary" className="min-w-0 flex-1 truncate" title={turn.text}>{turn.text}</T>
                {turn.toolCalls?.map((call, i) => (
                  <Inline key={`${call.name}-${i}`} gap="xs" className="shrink-0" data-testid={`${testId}-tool-${turn.id}-${i}`} data-status={call.status}>
                    <StatusPill size="sm" tone={TOOL_TONE[call.status]} label={call.status} />
                    <T size="xs" tone="secondary">{call.name}</T>
                  </Inline>
                ))}
                <T size="xs" tone="tertiary" tabular className="shrink-0">{formatAt(turn.at)}</T>
              </Inline>
            ))}
          </Stack>
        ) : null}
        {pending ? <VoiceConfirmCard pending={pending} /> : null}
        {pendingChoice ? <VoiceChoiceCard choice={pendingChoice} compact /> : null}
        {extras}
        {onClear && turns.length > 0 ? (
          <Inline justify="end">
            <Button variant="ghost" size="sm" onClick={onClear} data-testid={`${testId}-clear`}>Clear</Button>
          </Inline>
        ) : null}
      </Stack>
    );
  }
  return (
    <Stack gap="sm" className={cn('min-w-0', className)} data-testid={testId}>
      {visible.length === 0 && !pending && !pendingChoice ? (
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
      {pendingChoice ? <VoiceChoiceCard choice={pendingChoice} /> : null}
      {extras}
      {onClear && turns.length > 0 ? (
        <Inline justify="end">
          <Button variant="ghost" size="sm" onClick={onClear} data-testid={`${testId}-clear`}>Clear</Button>
        </Inline>
      ) : null}
    </Stack>
  );
}

export default VoiceTurnStrip;
