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
import { mayTakeFocus } from './voiceFocus';
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

/** The card options a host may set on the card itself as well as on `pending`; the card prop wins. */
export type VoiceConfirmCardOptions = Pick<
  VoicePending,
  'noteDefault' | 'noteLabel' | 'noteMaxLength' | 'confirmLabel' | 'cancelLabel' | 'hideDecisionToggle' | 'clickOnly' | 'submitOnEnter'
>;

/** The Confirm button's text for the toggle's current choice. */
export function resolveConfirmLabel(label: VoicePending['confirmLabel'], decision: VoiceDecision): string {
  if (typeof label === 'function') return label(decision) || 'Confirm';
  return label ?? 'Confirm';
}

export interface VoiceConfirmCardProps extends VoiceConfirmCardOptions {
  pending: VoicePending;
  /** Handle Escape on the card itself. The dock turns this off: its popover already closes on Escape. Default true. */
  handleEscape?: boolean;
  /** A muted one-line note under Confirm / Cancel; overrides `pending.hint`. Nothing renders without one. */
  hint?: string;
  /**
   * Focus the card container when it mounts. Default true. Even then it never
   * takes focus from an input, textarea or contenteditable the person is in
   * (the live region announces the card instead), and it never focuses
   * Confirm: Enter confirms only while Confirm itself has focus.
   */
  autoFocus?: boolean;
  className?: string;
  'data-testid'?: string;
}

/**
 * The confirmation card: a title, optional detail, a note that can open pre-filled (`noteDefault`), renameable Confirm / Cancel, and an optional muted `hint` line.
 * With `pending.fields` it also shows an approve / reject toggle and a one-line note, and
 * Confirm calls back with `{ decision, note }` (note trimmed, capped at 200 characters).
 * `noteDefault` opens the note pre-filled and editable (the callback gets the edited text), with `noteLabel` and a `noteMaxLength` count;
 * `confirmLabel` / `cancelLabel` rename the buttons (`confirmLabel` may be a function of the toggle's choice, e.g. Approve / Reject), `hideDecisionToggle` drops the toggle, and `clickOnly` hints "Check it, then click <confirmLabel>; say cancel to drop it." and sets `data-click-only`.
 * A long title wraps to two lines, then ends with an ellipsis (its full text is the `title` attribute).
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
  hint: hintProp,
  noteDefault = pending.noteDefault,
  noteLabel = pending.noteLabel,
  noteMaxLength = pending.noteMaxLength,
  confirmLabel: confirmLabelProp = pending.confirmLabel,
  cancelLabel = pending.cancelLabel ?? 'Cancel',
  hideDecisionToggle = pending.hideDecisionToggle ?? false,
  clickOnly = pending.clickOnly ?? false,
  submitOnEnter = pending.submitOnEnter ?? false,
  className,
  'data-testid': testId = 'voice-confirm-card',
}: VoiceConfirmCardProps) {
  const hintId = useId();
  const noteLabelId = useId();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (autoFocus && mayTakeFocus(ref.current)) ref.current?.focus();
  }, [autoFocus]);
  // Filled after mount so screen readers announce it: a live region that
  // mounts already holding its text is often read by nobody.
  const [announcement, setAnnouncement] = useState('');
  useEffect(() => {
    setAnnouncement(`Confirmation needed: ${pending.title}`);
  }, [pending.title]);

  const { fields } = pending;
  const showNote = Boolean(fields) || noteDefault !== undefined;
  const showToggle = Boolean(fields) && !hideDecisionToggle;
  const maxLength = noteMaxLength && noteMaxLength > 0 ? Math.floor(noteMaxLength) : VOICE_NOTE_MAX;
  const [decision, setDecision] = useState<VoiceDecision>(fields?.decision ?? 'approve');
  const confirmLabel = resolveConfirmLabel(confirmLabelProp, decision);
  const hint = hintProp ?? pending.hint ?? (clickOnly ? `Check it, then click ${confirmLabel}; say cancel to drop it.` : undefined);
  // The card remounts per request, so a new request starts from its own default.
  const [note, setNote] = useState(() => (noteDefault ?? '').slice(0, maxLength));

  const confirm = () => {
    if (showNote) pending.onConfirm({ decision, note: note.trim().slice(0, maxLength).trim() });
    else pending.onConfirm();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Escape here is always from inside the card. Enter confirms only through
    // the focused Confirm button's own click — never from the card container,
    // so an Enter meant for something else cannot approve an action. The note
    // field's Enter does nothing unless `submitOnEnter` is set.
    if (e.key === 'Escape' && handleEscape) {
      e.stopPropagation();
      pending.onCancel();
    } else if (e.key === 'Enter' && showNote && e.target instanceof HTMLInputElement) {
      e.preventDefault();
      if (submitOnEnter) confirm();
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
      data-click-only={clickOnly ? '' : undefined}
      className={cn('rounded-md border border-solid border-warning/40 bg-surface p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary', className)}
    >
      {/* Two lines, then an ellipsis: never a hard cut, never a wall of text. */}
      <T size="sm" weight="semibold" tone="primary" as="p" clamp={2} data-testid={`${testId}-title`}>{pending.title}</T>
      {lines.length === 1 ? <T size="xs" tone="secondary" as="p">{lines[0]}</T> : null}
      {lines.length > 1 ? (
        <Stack as="ul" gap="xs" data-testid={`${testId}-detail`} className="m-0 list-none p-0">
          {lines.map((line, i) => (
            <T key={i} size="xs" tone="secondary" as="li">{line}</T>
          ))}
        </Stack>
      ) : null}
      {showNote ? (
        <Stack gap="xs">
          {showToggle ? (
            <SegmentedControl
              size="sm"
              tone="accent"
              aria-label="Decision"
              options={DECISION_OPTIONS}
              value={decision}
              onChange={(v) => setDecision(v as VoiceDecision)}
              data-testid={`${testId}-decision`}
            />
          ) : null}
          {noteLabel || noteMaxLength ? (
            <Inline gap="sm" justify="between" wrap={false}>
              {noteLabel ? (
                <T id={noteLabelId} size="xs" weight="medium" tone="secondary" data-testid={`${testId}-note-label`}>{noteLabel}</T>
              ) : <T aria-hidden="true">{''}</T>}
              {noteMaxLength ? (
                <T size="xs" tone="tertiary" tabular className="shrink-0" data-testid={`${testId}-note-count`}>{`${note.length}/${maxLength}`}</T>
              ) : null}
            </Inline>
          ) : null}
          <Input
            size="sm"
            value={note}
            maxLength={maxLength}
            placeholder={fields?.notePlaceholder ?? (fields ? 'Note (optional)' : undefined)}
            aria-label={noteLabel ? undefined : 'Note'}
            aria-labelledby={noteLabel ? noteLabelId : undefined}
            onChange={(e) => setNote(e.target.value)}
            data-testid={`${testId}-note`}
          />
        </Stack>
      ) : null}
      <Inline gap="sm" justify="end">
        <Button variant="secondary" size="sm" onClick={pending.onCancel} data-testid={`${testId}-cancel`}>{cancelLabel}</Button>
        <Button variant="primary" size="sm" onClick={confirm} aria-describedby={hint ? hintId : undefined} data-testid={`${testId}-confirm`}>{confirmLabel}</Button>
      </Inline>
      {hint ? <T size="xs" tone="secondary" as="p" id={hintId} clamp={2} data-testid={`${testId}-hint`}>{hint}</T> : null}
      <T className="sr-only" role="status" aria-live="polite" data-testid={`${testId}-announce`}>{announcement}</T>
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
