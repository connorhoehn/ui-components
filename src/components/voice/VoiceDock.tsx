// VoiceDock — the voice navigator's footer row.
//
// A HuddleBar-shaped row: the activity ring, the phase label (a polite live
// region), the last transcript line truncated, the budget meter (DotMeter,
// full scale = the held amount), the elapsed minutes, mute and hang-up. While
// `pending` is set the confirmation card opens as a popover above the row;
// `pendingChoice` opens the choice card the same way (compact at the footer size).
// `unavailable` shows the reason as the pill's title and disables Start.
//
// Two sizes. `panel` (the default) is the full row: a 36px ring, the phase
// pill, the last line at `sm`, a filled Start square. `footer` sits in an app
// footer beside HuddleBar's idle controls and takes their metrics: an 18px
// ring, the phase and the last line in the footer's label type (`T` xs), and
// Start / End as quiet ghost `Button size="sm"` controls with a 16px icon and
// a label ("Voice" / "End"), the same box as Huddle and Message. Only End
// keeps an accent while live (its icon in the danger ink); no vertical
// padding, so the dock is the control height.
//
// Spec: aws-agentcore docs/voice-navigator-spec.md §5.

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { Inline, Stack } from '../ui/Stack';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import DotMeter from '../shared/DotMeter';
import InlinePopover from '../shared/InlinePopover';
import { StatusPill, type StatusPillTone } from '../shared/StatusPill';
import { T } from '../shared/Text';
import { CaptionsIcon, MicIcon, MicOffIcon, PhoneOffIcon } from '../video/MediaIcons';
import { HistoryIcon } from '../ui/Icons';
import { VoiceActivityRing } from './VoiceActivityRing';
import { VoiceConfirmCard, VoiceTurnStrip } from './VoiceTurnStrip';
import { VoiceChoiceCard } from './VoiceChoiceCard';
import {
  VOICE_PHASE_LABEL,
  clampLevel,
  type VoiceBudget,
  type VoiceLine,
  type VoiceTurn,
  type VoicePending,
  type VoicePendingChoice,
  type VoicePhase,
} from './voiceTypes';

export interface VoiceDockProps {
  phase: VoicePhase;
  /** Microphone level, 0..1. */
  level: number;
  /** The assistant's audio level, 0..1. */
  outputLevel: number;
  elapsedSeconds?: number;
  budget?: VoiceBudget | null;
  /**
   * The action awaiting confirmation. The popover opens whenever this is set,
   * whatever `phase` is (the host's controller moves the phase to `confirming`,
   * but the card does not depend on it). If `pendingChoice` is also set, the
   * choice shows first and this opens once it clears.
   */
  pending?: VoicePending | null;
  /** An `ambiguous` result: the choice card opens as a popover above the row, whatever `phase` is. Takes precedence over `pending`. */
  pendingChoice?: VoicePendingChoice | null;
  lastLine?: VoiceLine | null;
  onStart?: () => void;
  onStop?: () => void;
  onMute?: () => void;
  muted?: boolean;
  /** Shown as the pill's title when `phase` is `unavailable`. */
  unavailableReason?: string;
  /** Drops the transcript line and the budget meter. */
  compact?: boolean;
  /**
   * `panel` (default): the full row, as on a reference sheet or a panel.
   * `footer`: matched to an app footer's quiet controls (HuddleBar's Huddle /
   * Message): `sm` ring, `T` xs labels, ghost icon+label Start / End, no
   * vertical padding. Since 2.510.1.
   */
  size?: VoiceDockSize;
  /** The Start control's label in the `footer` size. Default `'Voice'`. */
  startLabel?: string;
  /**
   * The CC control's state. When true the dock renders its `VoiceTurnStrip`
   * inline in a row above its own row (never a popover or dialog), at the strip's
   * `footer` scale in the `footer` size. Since 2.510.6.
   */
  transcriptOpen?: boolean;
  /** Renders the CC control, a quiet toggle (`aria-pressed` = `transcriptOpen`). */
  onToggleTranscript?: () => void;
  /** Renders a quiet "history" control at the same scale (the host opens its log view). */
  onOpenLog?: () => void;
  /** The turns the inline strip shows. */
  turns?: VoiceTurn[];
  /** The strip's "Keep transcripts on this device" switch (see `VoiceTurnStrip`). */
  keepTranscript?: boolean;
  onKeepTranscriptChange?: (on: boolean) => void;
  /**
   * One 600 ms motion-safe pulse on the start / stop control each time this
   * flips to true (e.g. when a card opens). The phase live region already
   * announces; this is the visual cue. Since 2.510.6.
   */
  pulse?: boolean;
  className?: string;
  /** The dock's root element. */
  ref?: React.Ref<HTMLDivElement>;
  'data-testid'?: string;
}

export type VoiceDockSize = 'footer' | 'panel';

const TONE: Record<VoicePhase, StatusPillTone> = {
  off: 'neutral',
  connecting: 'pending',
  listening: 'success',
  thinking: 'info',
  executing: 'info',
  speaking: 'success',
  confirming: 'warning',
  ended: 'neutral',
  unavailable: 'neutral',
};

function formatElapsed(total: number): string {
  const s = Math.max(0, Math.floor(total));
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

const PULSE_MS = 600;

const usd = (n: number) => `$${n.toFixed(2)}`;

export function VoiceDock({
  phase,
  level,
  outputLevel,
  elapsedSeconds,
  budget = null,
  pending = null,
  pendingChoice = null,
  lastLine = null,
  onStart,
  onStop,
  onMute,
  muted = false,
  unavailableReason,
  compact = false,
  size = 'panel',
  startLabel = 'Voice',
  transcriptOpen = false,
  onToggleTranscript,
  onOpenLog,
  turns = [],
  keepTranscript,
  onKeepTranscriptChange,
  pulse = false,
  className,
  ref,
  'data-testid': testId = 'voice-dock',
}: VoiceDockProps) {
  const [pulsing, setPulsing] = useState(false);
  useEffect(() => {
    if (!pulse) return undefined;
    setPulsing(true);
    const t = setTimeout(() => setPulsing(false), PULSE_MS);
    return () => clearTimeout(t);
  }, [pulse]);
  const pulseClass = pulsing ? 'motion-safe:animate-[pulse_600ms_ease-out_1]' : undefined;
  const rowRef = useRef<HTMLDivElement>(null);
  // The popover measures its anchor in a layout effect that runs before this
  // row's ref attaches, so it opens only after the first commit.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Stable, so React does not detach and re-attach it (which would leave the
  // popover's anchor null at the moment it measures).
  const setRefs = useCallback((el: HTMLDivElement | null) => {
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as { current: HTMLDivElement | null }).current = el;
  }, [ref]);
  const live = phase !== 'off' && phase !== 'ended' && phase !== 'unavailable';
  // Phase-independent: a card opens whenever its request is set. With both set,
  // the choice shows first and the confirmation after it.
  const showChoice = mounted && Boolean(pendingChoice);
  const showCard = mounted && Boolean(pending) && !pendingChoice;
  const pillTitle = phase === 'unavailable' ? unavailableReason : undefined;
  const label = VOICE_PHASE_LABEL[phase];
  const footer = size === 'footer';

  return (
    <Stack
      ref={setRefs}
      gap="none"
      className={cn('min-w-0', className)}
      data-testid={testId}
      data-phase={phase}
      data-size={size}
      data-voice-dock=""
    >
      {transcriptOpen ? (
        <div
          className={cn('min-w-0 border-0 border-b border-solid border-border', footer ? 'px-1 py-1' : 'px-2 py-1')}
          data-testid={`${testId}-transcript`}
        >
          <VoiceTurnStrip
            turns={turns}
            size={footer ? 'footer' : 'panel'}
            keepTranscript={keepTranscript}
            onKeepTranscriptChange={onKeepTranscriptChange}
            onOpenLog={onOpenLog}
            data-testid={`${testId}-strip`}
          />
        </div>
      ) : null}
    <Inline
      ref={rowRef}
      wrap={false}
      gap="sm"
      className={cn('min-w-0', footer ? 'px-1' : 'px-2 py-1')}
      data-testid={`${testId}-row`}
    >
      <VoiceActivityRing
        level={level}
        outputLevel={outputLevel}
        phase={phase}
        size={compact || footer ? 'sm' : 'md'}
        data-testid={`${testId}-ring`}
      />
      <T
        title={pillTitle}
        role="status"
        aria-live="polite"
        data-testid={`${testId}-phase`}
      >
        {footer
          ? <T size="xs" tone="secondary" className="whitespace-nowrap">{label}</T>
          : <StatusPill size="sm" tone={TONE[phase]} label={label} />}
      </T>
      {!compact && lastLine ? (
        <T
          size={footer ? 'xs' : 'sm'}
          tone={lastLine.role === 'you' ? 'secondary' : 'primary'}
          className="min-w-0 flex-1 truncate"
          title={lastLine.text}
          data-testid={`${testId}-last-line`}
          data-role={lastLine.role}
        >
          {lastLine.text}
        </T>
      ) : (
        <T className="min-w-0 flex-1" aria-hidden="true">{''}</T>
      )}
      {!compact && budget && live ? (
        <DotMeter
          value={budget.holdUsd > 0 ? budget.usedUsd / budget.holdUsd : 0}
          segments={5}
          showPercent={false}
          note={`${usd(budget.usedUsd)} of ${usd(budget.holdUsd)}`}
          tone="surface"
          data-testid={`${testId}-budget`}
        />
      ) : null}
      {live && elapsedSeconds !== undefined ? (
        <T size="xs" tone="tertiary" tabular data-testid={`${testId}-elapsed`}>{formatElapsed(elapsedSeconds)}</T>
      ) : null}
      {live && onMute ? (
        <IconButton
          aria-label={muted ? 'Unmute microphone' : 'Mute microphone'}
          aria-pressed={muted}
          size="sm"
          variant="ghost"
          icon={muted ? <MicOffIcon size={16} /> : <MicIcon size={16} />}
          onClick={onMute}
          data-testid={`${testId}-mute`}
        />
      ) : null}
      {onToggleTranscript ? (
        <IconButton
          aria-label={transcriptOpen ? 'Hide transcript' : 'Show transcript'}
          aria-pressed={transcriptOpen}
          size="sm"
          variant="ghost"
          icon={<CaptionsIcon size={16} />}
          onClick={onToggleTranscript}
          data-testid={`${testId}-cc`}
        />
      ) : null}
      {onOpenLog ? (
        <IconButton
          aria-label="Open voice history"
          size="sm"
          variant="ghost"
          icon={<HistoryIcon size={16} />}
          onClick={onOpenLog}
          data-testid={`${testId}-history`}
        />
      ) : null}
      {footer ? (
        live ? (
          <Button
            variant="ghost"
            size="sm"
            aria-label="End voice session"
            className={cn('gap-1.5', pulseClass)}
            data-pulse={pulsing ? '' : undefined}
            onClick={onStop}
            data-testid={`${testId}-stop`}
          >
            <PhoneOffIcon size={16} className="text-danger" />
            End
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            aria-label="Start voice session"
            className={cn('gap-1.5', pulseClass)}
            data-pulse={pulsing ? '' : undefined}
            disabled={phase === 'unavailable' || !onStart}
            title={pillTitle}
            onClick={onStart}
            data-testid={`${testId}-start`}
          >
            <MicIcon size={16} />
            {startLabel}
          </Button>
        )
      ) : live ? (
        <IconButton
          aria-label="End voice session"
          size="sm"
          variant="danger"
          className={pulseClass}
          data-pulse={pulsing ? '' : undefined}
          icon={<PhoneOffIcon size={16} />}
          onClick={onStop}
          data-testid={`${testId}-stop`}
        />
      ) : (
        <IconButton
          aria-label="Start voice session"
          size="sm"
          variant="primary"
          className={pulseClass}
          data-pulse={pulsing ? '' : undefined}
          icon={<MicIcon size={16} />}
          disabled={phase === 'unavailable' || !onStart}
          title={pillTitle}
          onClick={onStart}
          data-testid={`${testId}-start`}
        />
      )}
      {pending ? (
        <InlinePopover
          trigger={rowRef}
          open={showCard}
          onClose={pending.onCancel}
          placement="bottom-start"
          aria-label={`Confirm: ${pending.title}`}
          kind="voice-confirm"
          data-testid={`${testId}-pending`}
        >
          <VoiceConfirmCard pending={pending} handleEscape={false} />
        </InlinePopover>
      ) : null}
      {pendingChoice ? (
        <InlinePopover
          trigger={rowRef}
          open={showChoice}
          onClose={pendingChoice.onCancel}
          placement="bottom-start"
          aria-label={`Choose: ${pendingChoice.title}`}
          kind="voice-choice"
          data-testid={`${testId}-pending-choice`}
        >
          <VoiceChoiceCard choice={pendingChoice} handleEscape={false} compact={footer} />
        </InlinePopover>
      ) : null}
    </Inline>
    </Stack>
  );
}

export default VoiceDock;
