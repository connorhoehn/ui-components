export { VideoPlayer } from './VideoPlayer';
export type { VideoPlayerProps, PlayerPhase } from './VideoPlayer';

export { VideoPlayerModal } from './VideoPlayerModal';
export type { VideoPlayerModalProps, VideoPlayerSource } from './VideoPlayerModal';

export { StatsCard } from './StatsCard';
export type { StatsCardProps, StreamMetrics } from './StatsCard';

export { NetworkQualityBadge } from './NetworkQualityBadge';
export type { NetworkQualityBadgeProps, NetworkQuality } from './NetworkQualityBadge';

export { VideoGrid } from './VideoGrid';
export type { VideoGridProps, Participant } from './VideoGrid';

export {
  ReactionOverlay,
  ReactionPicker,
  ReactionPickerButton,
  reactionEmojiName,
} from './ReactionOverlay';
export type {
  ReactionOverlayProps,
  ReactionPickerProps,
  ReactionPickerButtonProps,
  Reaction,
} from './ReactionOverlay';

export { PlaybackReactionsLayer } from './PlaybackReactionsLayer';
export type {
  PlaybackReactionsLayerProps,
  TimedReaction,
} from './PlaybackReactionsLayer';

export { StatusStrip } from './StatusStrip';
export type { StatusStripProps } from './StatusStrip';

export { ViewerCount, isKnownViewerCount } from './ViewerCount';
export type { ViewerCountProps } from './ViewerCount';

export { CallWidget } from './CallWidget';
// Card/column dimensions the widget sizes itself with — exported so a host
// can reserve space (or assert the contract) without re-deriving them.
export {
  CALL_CARD_WIDTH,
  CALL_STAGE_DOCKED_WIDTH,
  CALL_DOCK_ROW_HEIGHT,
} from './CallWidget';
// The dock drag contract. A host that wants to receive the widget has to read
// the SAME dataTransfer key and payload shape the widget writes, so both sides
// belong on the public surface — otherwise the receiver retypes it and drifts.
export { CALL_DOCK_DRAG_TYPE } from './CallWidget';
export type { CallWidgetProps, CallWidgetParticipant, CallWidgetState, CallMode, CallDockTarget, CallDockDragPayload } from './CallWidget';

export { CallControls } from './CallControls';
export type { CallControlsProps, CallControlsMode, CallControlsDensity } from './CallControls';

export { CallParticipantStrip } from './CallParticipantStrip';
export type {
  CallParticipantStripProps,
  CallStripParticipant,
} from './CallParticipantStrip';

export { CallStatsOverlay } from './CallStatsOverlay';
export type {
  CallStatsOverlayProps,
  CallStatsOverlayStats,
  CallStatsOverlayPosition,
} from './CallStatsOverlay';

export { ParticipantTile } from './ParticipantTile';
export type { ParticipantTileProps } from './ParticipantTile';

export { HangoutLayout } from './HangoutLayout';
export type { HangoutLayoutProps, HangoutLayoutParticipant, HangoutMode } from './HangoutLayout';

export { HangoutGrid, gridCols } from './HangoutGrid';
export type { HangoutGridProps } from './HangoutGrid';

export { HangoutSpotlight, useStableActiveSpeaker } from './HangoutSpotlight';
export type { HangoutSpotlightProps } from './HangoutSpotlight';

export { CallStartedBanner } from './CallStartedBanner';
export type { CallStartedBannerProps, CallStartedBannerMode, CallStartedBannerMedia } from './CallStartedBanner';

export { RecordingPlayer } from './RecordingPlayer';
export type { RecordingPlayerProps } from './RecordingPlayer';

export { RecordingList } from './RecordingList';
export type { RecordingListProps, RecordingListItem } from './RecordingList';

export { RecordingRow } from './RecordingRow';
export type { RecordingRowProps, RecordingStatus } from './RecordingRow';

export { TranscriptPanel } from './TranscriptPanel';
export type { TranscriptPanelProps, TranscriptSegment, TranscriptStatus } from './TranscriptPanel';

export { SummaryPanel } from './SummaryPanel';
export type { SummaryPanelProps } from './SummaryPanel';

export { PiPButton } from './PiPButton';
export type { PiPButtonProps } from './PiPButton';

export { RosterPanel } from './RosterPanel';
export type { RosterPanelProps, RosterParticipant } from './RosterPanel';

export { useMuteWhileTalking } from '../../lib/video/useMuteWhileTalking';
export { useTrackStateBump, streamHasUsableVideo } from '../../lib/video/useTrackStateBump';

export { StreamVideo } from './StreamVideo';
export type { StreamVideoProps, StreamVideoPlayState } from './StreamVideo';

export { AutoplayGate } from './AutoplayGate';
export type { AutoplayGateProps } from './AutoplayGate';

export { ExpandableCallWidget } from './ExpandableCallWidget';
export type {
  ExpandableCallWidgetProps,
  ExpandableCallWidgetHandle,
} from './ExpandableCallWidget';
// Canonical display-mode vocabulary shared by every call surface.
export {
  toCanonicalMode,
  toLegacyMode,
  modeFromMinimized,
} from './callWidgetMode';
export type {
  CallWidgetMode,
  LegacyCallWidgetMode,
  AnyCallWidgetMode,
} from './callWidgetMode';
export { useCallWidgetPersistence } from './useCallWidgetPersistence';
export type {
  PersistedWidgetState,
  PersistedWidgetMode,
  UseCallWidgetPersistenceOptions,
} from './useCallWidgetPersistence';

export { RemoteTileSlot } from './RemoteTileSlot';
export type { RemoteTileSlotProps } from './RemoteTileSlot';

export { CallingStatusPill } from './CallingStatusPill';
export type { CallingStatusPillProps } from './CallingStatusPill';

export { ReconnectingBanner } from './ReconnectingBanner';
export type { ReconnectingBannerProps } from './ReconnectingBanner';

export { MuteWhileTalkingToast } from './MuteWhileTalkingToast';
export type { MuteWhileTalkingToastProps } from './MuteWhileTalkingToast';

export { TranscriptOverlay } from './TranscriptOverlay';
export type { TranscriptOverlayProps, CaptionLine } from './TranscriptOverlay';

export { default as HangoutPreJoinShell } from './HangoutPreJoinShell';
export type {
  HangoutPreJoinShellProps,
  PreJoinPermission,
  PreJoinReadyState,
  PreJoinRosterEntry,
} from './HangoutPreJoinShell';

export { default as HangoutRoomHeader } from './HangoutRoomHeader';
export type {
  HangoutRoomHeaderProps,
  HangoutRoomHeaderRecording,
  HangoutPhase,
} from './HangoutRoomHeader';

export { default as CircularIconToggle } from './CircularIconToggle';
export type {
  CircularIconToggleProps,
  CircularIconToggleTone,
  CircularIconToggleSize,
} from './CircularIconToggle';

export { default as MediaControlsBar } from './MediaControlsBar';
export type { MediaControlsBarProps } from './MediaControlsBar';

export { CallSettingsDialog } from './CallSettingsDialog';
export type {
  CallSettingsDialogProps,
  CallSettingsTab,
} from './CallSettingsDialog';

export {
  CallSidePanel,
  CallSidePanelToggles,
  callSidePanelPlacement,
  callSidePanelToggleTestId,
  callSidePanelBodyTestId,
} from './CallSidePanel';
export type {
  CallSidePanelProps,
  CallSidePanelTab,
  CallSidePanelTogglesProps,
  CallSidePanelPlacement,
} from './CallSidePanel';

export { MediaEffectsPreviewPanel, guardedSelection } from './MediaEffectsPreviewPanel';
export type { MediaEffectsPreviewPanelProps } from './MediaEffectsPreviewPanel';

export { default as MediaEffectsTray } from './MediaEffectsTray';
export type {
  MediaEffectsTrayProps,
  MediaEffectsFilterOption,
  MediaEffectsBackgroundOption,
} from './MediaEffectsTray';

export {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  ScreenShareIcon,
  ScreenShareOffIcon,
  PhoneOffIcon,
  CaptionsIcon,
  ChatBubbleIcon,
  SparklesIcon,
  MoreHorizontalIcon,
  UserPlusIcon,
  UsersIcon,
} from './MediaIcons';
export type { IconProps } from './MediaIcons';

// StreamStage — the composed surface a stream or call is WATCHED on: video,
// identity badges, and chat rotating over the frame rather than beside it.
export { StreamStage, streamIsAudioOnly } from './StreamStage';
export type { StreamStageProps } from './StreamStage';
// The stage's state machine, exported on its own: a host that renders its own
// chrome around a stream still has to tell buffering from stalled from over,
// and re-deriving that is how the two drift apart.
export { streamStagePhase, stagePhaseIsLive, stagePhaseIsShowingLiveMedia } from './streamStagePhase';
export type { StreamStagePhase, StreamStagePhaseInput } from './streamStagePhase';
export { StreamAudioOnly } from './StreamAudioOnly';
export type { StreamAudioOnlyProps } from './StreamAudioOnly';
export { useHlsSource, hlsFailureText } from '../../lib/video/useHlsSource';
export type {
  UseHlsSourceState,
  UseHlsSourceOptions,
  HlsPhase,
  HlsFailure,
  HlsFailureKind,
} from '../../lib/video/useHlsSource';
export { useAudioLevel } from '../../lib/video/useAudioLevel';
export { StreamChatTicker } from './StreamChatTicker';
export type { StreamChatTickerProps, StreamChatMessage } from './StreamChatTicker';

// The other end of the watch surface: STARTING a broadcast deliberately,
// rather than a broadcast being the side effect of somebody starting a call.
// Ships inert — hosts gate it behind their own flag. See the file header.
export { GoLiveButton } from './GoLiveButton';
export type { GoLiveButtonProps } from './GoLiveButton';
