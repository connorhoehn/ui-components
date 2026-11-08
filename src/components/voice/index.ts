// `@connorhoehn/ui-components/voice` — the voice navigator's primitives
// (spec: aws-agentcore docs/voice-navigator-spec.md §5).
export { VoiceDock } from './VoiceDock';
export type { VoiceDockProps } from './VoiceDock';
export { VoiceActivityRing } from './VoiceActivityRing';
export type { VoiceActivityRingProps } from './VoiceActivityRing';
export { VoiceTurnStrip, VoiceConfirmCard } from './VoiceTurnStrip';
export type { VoiceTurnStripProps, VoiceConfirmCardProps } from './VoiceTurnStrip';
export { VOICE_PHASES, VOICE_PHASE_LABEL } from './voiceTypes';
export type {
  VoicePhase, VoicePending, VoiceLine, VoiceBudget, VoiceToolCall, VoiceToolStatus, VoiceTurn,
} from './voiceTypes';
