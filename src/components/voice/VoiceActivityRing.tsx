// VoiceActivityRing — the "it is active" visualization for a voice session.
//
// An SVG ring, no inline styles. Listening: the stroke width follows the
// microphone `level`. Speaking: an outer halo follows `outputLevel` and pulses.
// Thinking / executing / connecting: a partial arc rotates. Off, ended and
// unavailable: a still, dim ring (unavailable adds a slash). The ring is
// `aria-hidden`; the phase label next to it carries the state.

import { cn } from '../../lib/cn';
import { clampLevel, type VoicePhase } from './voiceTypes';

export interface VoiceActivityRingProps {
  /** Microphone level, 0..1 (clamped). */
  level?: number;
  /** The assistant's audio level, 0..1 (clamped). */
  outputLevel?: number;
  phase: VoicePhase;
  size?: 'sm' | 'md';
  /** Accessible name when the ring is used alone; it stays `aria-hidden` inside the dock. */
  label?: string;
  className?: string;
  'data-testid'?: string;
}

const SIZE = { sm: 'size-6', md: 'size-9' } as const;

const COLOR: Record<VoicePhase, string> = {
  off: 'text-text-tertiary opacity-50',
  connecting: 'text-info',
  listening: 'text-success',
  thinking: 'text-info',
  executing: 'text-info',
  speaking: 'text-primary',
  confirming: 'text-warning',
  ended: 'text-text-tertiary opacity-50',
  unavailable: 'text-text-tertiary opacity-50',
};

export function VoiceActivityRing({
  level = 0,
  outputLevel = 0,
  phase,
  size = 'md',
  label,
  className,
  'data-testid': testId,
}: VoiceActivityRingProps) {
  const inLevel = clampLevel(level);
  const outLevel = clampLevel(outputLevel);
  const spinning = phase === 'thinking' || phase === 'executing' || phase === 'connecting';
  // Stroke width in viewBox units: 1.5 at silence, up to 5 at full level.
  const strokeWidth = phase === 'listening' ? 1.5 + inLevel * 3.5 : 2;
  const haloOpacity = phase === 'speaking' ? 0.25 + outLevel * 0.6 : 0;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      data-testid={testId}
      data-phase={phase}
      data-level={inLevel.toFixed(2)}
      data-output-level={outLevel.toFixed(2)}
      data-label={label}
      className={cn(
        'shrink-0',
        SIZE[size],
        COLOR[phase],
        spinning && 'motion-safe:animate-spin',
        className,
      )}
    >
      {phase === 'speaking' && (
        <circle
          cx="12" cy="12" r="11" strokeWidth={1}
          strokeOpacity={haloOpacity}
          className="motion-safe:animate-pulse"
          data-part="halo"
        />
      )}
      <circle
        cx="12" cy="12" r="8"
        strokeWidth={strokeWidth}
        strokeDasharray={spinning ? '30 21' : undefined}
        strokeOpacity={phase === 'off' || phase === 'ended' || phase === 'unavailable' ? 0.6 : 1}
        data-part="ring"
      />
      {phase === 'unavailable' && <line x1="6" y1="18" x2="18" y2="6" strokeWidth={2} />}
    </svg>
  );
}

export default VoiceActivityRing;
