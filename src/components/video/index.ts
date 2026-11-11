export { VideoPlayer, formatClipTime } from './VideoPlayer';
export type { VideoPlayerProps, PlayerPhase, VideoChapter, VideoMarker } from './VideoPlayer';

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
export { CallTileRow } from './CallTileRow';
export type { CallTileRowProps } from './CallTileRow';

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
export { RecordingExpiryDialog, resolveExpiryChoice } from './RecordingExpiryDialog';
export type { RecordingExpiryDialogProps, RecordingExpiryChoice } from './RecordingExpiryDialog';
export type { RecordingRowProps, RecordingStatus } from './RecordingRow';

export { TranscriptPanel } from './TranscriptPanel';
export type { TranscriptPanelProps, TranscriptSegment, TranscriptStatus } from './TranscriptPanel';

export { SummaryPanel } from './SummaryPanel';
export type { SummaryPanelProps } from './SummaryPanel';

export { PiPButton } from './PiPButton';
export type { PiPButtonProps } from './PiPButton';

export { RosterPanel } from './RosterPanel';
export type { RosterPanelProps, RosterParticipant } from './RosterPanel';
export { orderRosterByHands } from './RosterPanel';

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

export { HuddleBar } from './HuddleBar';
export type { HuddleBarProps, HuddleBarMedia, HuddleBarPhase, HuddleBarLiveParticipant } from './HuddleBar';
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

export { default as MediaEffectsTray, splitEffectLabel } from './MediaEffectsTray';
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
  UsersIcon, PlayIcon, PauseIcon, PopOutIcon } from './MediaIcons';
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

// Which microphone, camera and speaker a call uses — the Devices tab of
// CallSettingsDialog. The host owns and applies the chosen ids.
export { DeviceSettingsPanel } from './DeviceSettingsPanel';
export type { DeviceSettingsPanelProps, DevicePreferences } from './DeviceSettingsPanel';
// Voicemail: record a message when nobody answers, and play one back from a
// protected source. Storage and endpoints are the host's.
export { VoicemailRecorder } from './VoicemailRecorder';
export type { VoicemailRecorderProps } from './VoicemailRecorder';
export { AuthedAudio } from './AuthedAudio';
export type { AuthedAudioProps } from './AuthedAudio';
// A call as a block in another layout (document gutter, chat canvas), and a
// themed audio player — the two pieces that used to be a clipped floating
// window and a native <audio controls>.
export { EmbeddedCallPanel } from './EmbeddedCallPanel';
export type { EmbeddedCallPanelProps } from './EmbeddedCallPanel';

export { RecordingChip, RECORDING_CHIP_TITLES } from './RecordingChip';
export type { RecordingChipProps, RecordingChipState } from './RecordingChip';
export { AudioPlayer, formatAudioTime } from './AudioPlayer';
export type { AudioPlayerProps, AudioPlayerController } from './AudioPlayer';
// One-line in-call notices with an inline action; the widget-scale answer to a page Banner.
export { CallNoticePill } from './CallNoticePill';
export type { CallNoticePillProps } from './CallNoticePill';
// The same notice at card scale, for the failure the pill cannot say in one
// truncating line: terminal, user-resolved, and owed an explanation.
export { CallInterruptedNotice } from './CallInterruptedNotice';
export type { CallInterruptedNoticeProps } from './CallInterruptedNotice';

// ── In-document calls (2.391.0) — SPEC docs/design/document-calls in realtime-examples ──
export { DeviceToggleSelect } from './DeviceToggleSelect';
export type { DeviceToggleSelectProps, DeviceOption, MediaPermission } from './DeviceToggleSelect';
export { AudioLevelMeter } from './AudioLevelMeter';
export type { AudioLevelMeterProps } from './AudioLevelMeter';
export { VolumeSlider } from './VolumeSlider';
export type { VolumeSliderProps } from './VolumeSlider';
export { MediaPrecheckRow } from './MediaPrecheckRow';
export type { MediaPrecheckRowProps } from './MediaPrecheckRow';
export { ReviewDocumentList } from './ReviewDocumentList';
export type { ReviewDocumentListProps, ReviewDocumentItem } from './ReviewDocumentList';
export { CollaboratorCheckList } from './CollaboratorCheckList';
export type { CollaboratorCheckListProps, CollaboratorRow } from './CollaboratorCheckList';
export { CallPeopleList, callPersonStatus } from './CallPeopleList';
export type { CallPeopleListProps, CallPerson, CallPersonStatus } from './CallPeopleList';
export { AudioVideoSettingsForm } from './AudioVideoSettingsForm';
export type { AudioVideoSettingsFormProps, AudioVideoSettings } from './AudioVideoSettingsForm';
export { CallSettingsDrawer, CallCaptionsSettings } from './CallSettingsDrawer';
export type {
  CallSettingsDrawerProps,
  CallSettingsDrawerTab,
  CallSettingsEffectsFooter,
  CallCaptionsSettingsProps,
} from './CallSettingsDrawer';
export { StartCallDrawer } from './StartCallDrawer';
export type { StartCallDrawerProps, StartCallPeople } from './StartCallDrawer';
export { CallDock, formatCallElapsed } from './CallDock';
export type { CallDockProps, CallDockParticipant, CallDockPhase, CallDockTileSize } from './CallDock';
export { IncomingCallPopover } from './IncomingCallPopover';
export type { IncomingCallPopoverProps } from './IncomingCallPopover';
export { DocumentCallPanel } from './DocumentCallPanel';
export type { DocumentCallPanelProps } from './DocumentCallPanel';
export type { CallTileParticipant } from './CallTileRow';
export { SpeakerIcon, MonitorIcon, ExpandIcon, PhoneCallIcon, SettingsGearIcon } from './MediaIcons';

// ── Meetings (2.458.0): the Teams-style meeting bar, consent notice, raised
// hands and the breakout Rooms pane. Bind to realtime-modules' useMeeting via
// integrations/realtime-modules (WrappedBreakoutRoomsPanel, meetingToolbarItems).
export { MeetingToolbar, MEETING_TOOLBAR_BUTTON, deviceMenuSections } from './MeetingToolbar';
export type { MeetingToolbarProps, MeetingToolbarItem } from './MeetingToolbar';
export { MeetingStatusCluster } from './MeetingStatusCluster';
export type { MeetingStatusClusterProps } from './MeetingStatusCluster';
export { RecordingConsentNotice, RECORDING_CONSENT_TITLES } from './RecordingConsentNotice';
export type { RecordingConsentNoticeProps, RecordingConsentKind } from './RecordingConsentNotice';
export { useConsentDismissal } from './RecordingConsentNotice';
export type { ConsentDismissal, UseConsentDismissalOptions } from './RecordingConsentNotice';
export { RaisedHandBadge, raisedHandLabel } from './RaisedHandBadge';
export type { RaisedHandBadgeProps } from './RaisedHandBadge';
export { BreakoutRoomsPanel } from './BreakoutRoomsPanel';
export type {
  BreakoutRoomsPanelProps,
  BreakoutRoomView,
  BreakoutPerson,
  BreakoutPanelMode,
  BreakoutPanelPhase,
} from './BreakoutRoomsPanel';
export { BreakoutRoomBanner, useCountdown } from './BreakoutRoomBanner';
export type { BreakoutRoomBannerProps } from './BreakoutRoomBanner';
export {
  MeetingHandIcon,
  MeetingReactIcon,
  MeetingRecordingIcon,
  MeetingViewIcon,
  MeetingNotesIcon,
  MeetingRoomsIcon,
  MeetingAppsIcon,
  MeetingShieldIcon,
  MeetingShareIcon,
} from './MeetingIcons';
export { MediaPlaybackDock, useMediaPlayback } from './MediaPlaybackDock';
export type { MediaPlaybackDockProps, PlaybackSource, MediaPlaybackState, MediaPlaybackHandle } from './MediaPlaybackDock';
