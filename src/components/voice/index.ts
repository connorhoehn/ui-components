// `@connorhoehn/ui-components/voice` — the voice navigator's primitives
// (spec: aws-agentcore docs/voice-navigator-spec.md §5).
export { VoiceDock } from './VoiceDock';
export type { VoiceDockProps, VoiceDockSize, VoiceDockCardPlacement } from './VoiceDock';
export { VoiceActivityRing } from './VoiceActivityRing';
export type { VoiceActivityRingProps } from './VoiceActivityRing';
export { VoiceTurnStrip, VoiceConfirmCard } from './VoiceTurnStrip';
export type { VoiceTurnStripProps, VoiceTurnStripSize, VoiceConfirmCardProps, VoiceConfirmCardOptions } from './VoiceTurnStrip';
export { VoiceChoiceCard } from './VoiceChoiceCard';
export type { VoiceChoiceCardProps } from './VoiceChoiceCard';
export { VOICE_PHASES, VOICE_PHASE_LABEL, VOICE_NOTE_MAX, VOICE_CHOICE_MAX } from './voiceTypes';
export type {
  VoicePhase, VoicePending, VoicePendingChoice, VoiceChoiceCandidate, VoiceConfirmFields, VoiceConfirmResult, VoiceDecision, VoiceLine, VoiceBudget, VoiceToolCall, VoiceToolStatus, VoiceTurn,
} from './voiceTypes';
