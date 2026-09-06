export { default as DocumentEditorPage } from './DocumentEditorPage';
export { default as DocumentListPage } from './DocumentListPage';
export { default as NewDocumentModal } from './NewDocumentModal';
export type { NewDocumentModalProps, DocumentShape } from './NewDocumentModal';
export { default as DocumentHeader } from './DocumentHeader';
export type { DocumentHeaderCallVariant } from './DocumentHeader';
export { default as EditorToolbar } from './EditorToolbar';
export { default as TiptapEditor } from './TiptapEditor';
export { default as useFollowCursor, clientIdForUser } from './useFollowCursor';
export type { UseFollowCursorOptions } from './useFollowCursor';
export { default as StandaloneTiptap } from './StandaloneTiptap';
export type {
  StandaloneTiptapProps,
  StandaloneTiptapUser,
  StandaloneTiptapBootstrapProps,
  StandaloneTiptapEscapeHatchProps,
} from './StandaloneTiptap';
export { default as SectionBlock } from './SectionBlock';
export { default as SectionList } from './SectionList';
export { default as SectionComments } from './SectionComments';
export { default as TableOfContents } from './TableOfContents';
export { default as AckMode } from './AckMode';
export { default as ReviewMode } from './ReviewMode';
export { default as ReviewProgress } from './ReviewProgress';
export { default as ReviewableItem } from './ReviewableItem';
export { default as ReaderMode } from './ReaderMode';
export { default as ChunkViewer } from './ChunkViewer';
export { default as DiffViewer } from './DiffViewer';
export { default as ActivityFeed } from './ActivityFeed';
export { default as AttachmentsPanel } from './AttachmentsPanel';
export { default as FollowModeBar } from './FollowModeBar';
export { default as ParticipantAvatars } from './ParticipantAvatars';
export { default as VersionHistoryPanel } from './VersionHistoryPanel';
export { default as VideoCallPanel } from './VideoCallPanel';
export { default as VideoHistoryPanel } from './VideoHistoryPanel';
export { default as TaskItemRow } from './TaskItemRow';
export { default as TaskList } from './TaskList';
export { default as MyMentionsPanel } from './MyMentionsPanel';
export { MentionDropdown } from './MentionDropdown';
export { useDocumentActions } from './useDocumentActions';
export { useSidebarPanels } from './useSidebarPanels';
export { getInitials, relativeTime, countAllComments } from './CommentThread';
export { KeyDecisionsCard, ActionItemsCard, SectionSummariesCard } from './ReaderSectionCard';
export { generateSummaryBullets, HeaderBanner, ExecutiveSummaryCard } from './ReaderSummary';

// ── Contextual task creator: utterance -> work item -> proposal -> acceptance ──
export { ProposalCard } from './ProposalCard';
export type {
  ProposalCardProps,
  ProposalCardStatus,
  ProposalApplyOutcome,
  ProposalConfidence,
  ProposalAttachState,
  ProposalKind,
} from './ProposalCard';
// The PRE-proposal half of that loop: a remark that has not been drafted yet.
// One row for placed and unplaced alike — splitting them is what dropped the
// draft action from document-level remarks once already. See WorkItemRow.
export { WorkItemRow } from './WorkItemRow';
export type { WorkItemRowProps, WorkItemCandidate } from './WorkItemRow';

export { default as CanvasDocumentView } from './CanvasDocumentView';
export type {
  CanvasDocumentViewProps,
  CanvasUnsupportedForm,
} from './CanvasDocumentView';

export { default as DocumentToolbar } from './DocumentToolbar';
export type { DocumentToolbarProps } from './DocumentToolbar';

export { default as DocumentGutter, stackOffsets } from './DocumentGutter';
export type { DocumentGutterProps, GutterItem } from './DocumentGutter';

// The gutter's counterpart for when the gutter is NOT there: the in-prose
// marks stay visible and open a card, so a hidden margin hides the threads
// without hiding the fact that a discussion happened.
export { default as CommentGhostPopover, replyLabel } from './CommentGhostPopover';
export type {
  CommentGhostPopoverProps,
  CommentGhostPopoverHandle,
  CommentGhostThread,
} from './CommentGhostPopover';

// Where a call's video lands inside a document — the drop target half of the
// dock. Was reachable only by deep import, which put hosts one refactor away
// from a broken path.
export { default as VideoDockSlot } from './VideoDockSlot';
export type { VideoDockSlotProps } from './VideoDockSlot';

// The single-thread renderer, for hosting one thread in a gutter card.
// SectionComments is the whole panel (header + composer + list); this is the
// piece a margin card actually wants.
export { default as CommentThreadNode } from './CommentThread';
export type { CommentThreadNodeProps } from './CommentThread';

export { DocumentRuler, PX_PER_INCH } from './DocumentRuler';
export type { DocumentRulerProps } from './DocumentRuler';

export { DocumentOutline } from './DocumentOutline';
export type { DocumentOutlineProps, OutlineEntry } from './DocumentOutline';
export { useDocumentOutline, readOutline } from './useDocumentOutline';
