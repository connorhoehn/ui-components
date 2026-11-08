// VoiceDock — the voice navigator's footer row.
//
// A HuddleBar-shaped row: the activity ring, the phase label (a polite live
// region), the last transcript line truncated, the budget meter (DotMeter,
// full scale = the held amount), the elapsed minutes, mute and hang-up. While
// `pending` is set the confirmation card opens as a popover above the row.
// `unavailable` shows the reason as the pill's title and disables Start.
//
// Spec: aws-agentcore docs/voice-navigator-spec.md §5.

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { Inline } from '../ui/Stack';
import { IconButton } from '../ui/IconButton';
import DotMeter from '../shared/DotMeter';
import InlinePopover from '../shared/InlinePopover';
import { StatusPill, type StatusPillTone } from '../shared/StatusPill';
import { T } from '../shared/Text';
import { MicIcon, MicOffIcon, PhoneOffIcon } from '../video/MediaIcons';
import { VoiceActivityRing } from './VoiceActivityRing';
import { VoiceConfirmCard } from './VoiceTurnStrip';
import {
  VOICE_PHASE_LABEL,
  clampLevel,
  type VoiceBudget,
  type VoiceLine,
  type VoicePending,
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
  pending?: VoicePending | null;
  lastLine?: VoiceLine | null;
  onStart?: () => void;
  onStop?: () => void;
  onMute?: () => void;
  muted?: boolean;
  /** Shown as the pill's title when `phase` is `unavailable`. */
  unavailableReason?: string;
  /** Drops the transcript line and the budget meter. */
  compact?: boolean;
  className?: string;
  /** The dock's root element. */
  ref?: React.Ref<HTMLDivElement>;
  'data-testid'?: string;
}

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

const usd = (n: number) => `$${n.toFixed(2)}`;

export function VoiceDock({
  phase,
  level,
  outputLevel,
  elapsedSeconds,
  budget = null,
  pending = null,
  lastLine = null,
  onStart,
  onStop,
  onMute,
  muted = false,
  unavailableReason,
  compact = false,
  className,
  ref,
  'data-testid': testId = 'voice-dock',
}: VoiceDockProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  // The popover measures its anchor in a layout effect that runs before this
  // row's ref attaches, so it opens only after the first commit.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Stable, so React does not detach and re-attach it (which would leave the
  // popover's anchor null at the moment it measures).
  const setRefs = useCallback((el: HTMLDivElement | null) => {
    rowRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as { current: HTMLDivElement | null }).current = el;
  }, [ref]);
  const live = phase !== 'off' && phase !== 'ended' && phase !== 'unavailable';
  const showCard = mounted && Boolean(pending) && phase === 'confirming';
  const pillTitle = phase === 'unavailable' ? unavailableReason : undefined;
  const label = VOICE_PHASE_LABEL[phase];

  return (
    <Inline
      ref={setRefs}
      wrap={false}
      gap="sm"
      className={cn('min-w-0 px-2 py-1', className)}
      data-testid={testId}
      data-phase={phase}
      data-voice-dock=""
    >
      <VoiceActivityRing
        level={level}
        outputLevel={outputLevel}
        phase={phase}
        size={compact ? 'sm' : 'md'}
        data-testid={`${testId}-ring`}
      />
      <T
        title={pillTitle}
        data-testid={`${testId}-phase`}
      >
        <StatusPill size="sm" tone={TONE[phase]} label={label} />
      </T>
      {!compact && lastLine ? (
        <T
          size="sm"
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
      {live ? (
        <IconButton
          aria-label="End voice session"
          size="sm"
          variant="danger"
          icon={<PhoneOffIcon size={16} />}
          onClick={onStop}
          data-testid={`${testId}-stop`}
        />
      ) : (
        <IconButton
          aria-label="Start voice session"
          size="sm"
          variant="primary"
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
    </Inline>
  );
}

export default VoiceDock;
