// Shared types for the voice navigator primitives (spec: aws-agentcore
// docs/voice-navigator-spec.md §5).

export type VoicePhase =
  | 'off'
  | 'connecting'
  | 'listening'
  | 'thinking'
  | 'executing'
  | 'speaking'
  | 'confirming'
  | 'ended'
  | 'unavailable';

export const VOICE_PHASES: readonly VoicePhase[] = [
  'off', 'connecting', 'listening', 'thinking', 'executing', 'speaking', 'confirming', 'ended', 'unavailable',
];

/** Visible label per phase; also the live-region text. */
export const VOICE_PHASE_LABEL: Record<VoicePhase, string> = {
  off: 'Voice off',
  connecting: 'Connecting',
  listening: 'Listening',
  thinking: 'Thinking',
  executing: 'Working',
  speaking: 'Speaking',
  confirming: 'Confirm',
  ended: 'Ended',
  unavailable: 'Unavailable',
};

export interface VoicePending {
  title: string;
  detail?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface VoiceLine {
  role: 'you' | 'assistant';
  text: string;
}

export interface VoiceBudget {
  /** Spent so far in this session. */
  usedUsd: number;
  /** The amount held (reserved) for the session; the meter's full scale. */
  holdUsd: number;
}

export type VoiceToolStatus = 'running' | 'done' | 'refused' | 'failed';

export interface VoiceToolCall {
  name: string;
  status: VoiceToolStatus;
  summary: string;
}

export interface VoiceTurn {
  id: string;
  role: 'you' | 'assistant';
  text: string;
  /** Epoch milliseconds, or a ready-made label. */
  at: number | string;
  toolCalls?: VoiceToolCall[];
}

/** Clamp to 0..1; NaN and non-numbers read as 0. */
export function clampLevel(n: number): number {
  if (typeof n !== 'number' || Number.isNaN(n)) return 0;
  return Math.min(1, Math.max(0, n));
}
