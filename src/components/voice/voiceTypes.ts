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

export type VoiceDecision = 'approve' | 'reject';

/** What the confirm callback carries when the card has `fields`. */
export interface VoiceConfirmResult {
  decision: VoiceDecision;
  /** Trimmed and capped at VOICE_NOTE_MAX characters; may be empty. */
  note: string;
}

/** Longest note the confirm card passes on. */
export const VOICE_NOTE_MAX = 200;

/** Turns the confirm card into a decision: an approve / reject toggle and a one-line note. */
export interface VoiceConfirmFields {
  /** The toggle's starting value. Default `approve`. */
  decision?: VoiceDecision;
  /** Placeholder for the note input. Default "Note (optional)". */
  notePlaceholder?: string;
}

export interface VoicePending {
  title: string;
  /** One line of text, or a list of lines (an estimate, the fields a create will set). */
  detail?: string | string[];
  /** With `fields` set, an approve / reject toggle and a note input show. */
  fields?: VoiceConfirmFields;
  /** Called with `{ decision, note }` when `fields` is set, and with no argument otherwise. */
  onConfirm: (result?: VoiceConfirmResult) => void;
  onCancel: () => void;
}

/** One candidate of an `ambiguous` result. */
export interface VoiceChoiceCandidate {
  title: string;
  /** The secondary line: a role, a date, a parent. */
  subtitle?: string;
  /** A small chip: "person", "initiative". */
  kind?: string;
  /** Where choosing it goes; shown as the row's title attribute and `data-href`. The host navigates. */
  href?: string;
}

/** The `ambiguous` payload as the dock shows it: up to ten candidates the user answers by voice or click. */
export interface VoicePendingChoice {
  /** The question: "Which Alpha?" */
  title: string;
  /** At most VOICE_CHOICE_MAX rows are shown. */
  candidates: VoiceChoiceCandidate[];
  /** 1-based. The host sets it when the voice says "the second one"; the card then chooses that row. */
  ordinal?: number;
  /** Zero-based index into `candidates`. */
  onChoose: (index: number) => void;
  onCancel: () => void;
}

/** Most candidates a choice card shows. */
export const VOICE_CHOICE_MAX = 10;

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
