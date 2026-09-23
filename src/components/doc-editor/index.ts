export { default as DocumentEditorPage } from './DocumentEditorPage';
export { default as DocumentListPage } from './DocumentListPage';
export { default as NewDocumentModal } from './NewDocumentModal';
export type { NewDocumentModalProps, DocumentShape } from './NewDocumentModal';
export { default as DocumentHeader } from './DocumentHeader';
export type { DocumentHeaderCallVariant, DocumentHeaderProps, LifecycleErrorView } from './DocumentHeader';
export type { WorkspaceDocumentHeaderProps } from './WorkspaceDocumentHeader';
export { WorkspaceDocumentHeaderNotices, DocumentLifecyclePill } from './WorkspaceDocumentHeader';
export type { WorkspaceDocumentHeaderNoticesProps } from './WorkspaceDocumentHeader';
export { DocumentSaveStatus } from './DocumentSaveStatus';
export type { DocumentSaveState } from './DocumentSaveStatus';
export type { DocumentLifecycleStatus, LifecycleAction, LifecycleFailureKind, LegacyFinalClaim } from './documentLifecycleTypes';
export { default as EditorToolbar } from './EditorToolbar';
export { default as TiptapEditor } from './TiptapEditor';
// Line spacing, in grid rows rather than in em — `TiptapEditor` registers it,
// so a host gets the command for free; exported for the rare consumer building
// its own editor on this paper.
export {
  CanvasLineSpacing,
  LINE_SPACINGS,
  LINE_SPACING_LABELS,
  isLineSpacing,
  parseLineSpacing,
  lineSpacingAttributes,
} from './canvasLineSpacing';
export type { LineSpacing, CanvasLineSpacingOptions } from './canvasLineSpacing';
// List markers — registered by `TiptapEditor`; the toolbar's list menus set them. Since 2.386.5.
export {
  CanvasListStyle,
  BULLET_STYLES,
  NUMBER_STYLES,
  MULTILEVEL_STYLES,
  LIST_STYLE_LABELS,
  parseListStyle,
  listTypeFor,
} from './canvasListStyle';
export type { ListStyle, BulletStyle, NumberStyle, MultilevelStyle } from './canvasListStyle';
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
export { useDocumentActions, canvasFragmentToMarkdown } from './useDocumentActions';

// ── Document shape: legacy sections vs. canvas page ──
//
// The one gate. A host that derives anything from `sections` needs this, and
// needs it to be the SCHEMA VERSION rather than `sections.length === 0` — a
// converted document keeps its section array, frozen, so the length check reads
// a page as legacy and operates on pre-conversion content.
export {
  CANVAS_SCHEMA_VERSION,
  CANVAS_BODY_KEY,
  isCanvasDocument,
  readSchemaVersion,
  canvasBody,
  useIsCanvasDocument,
} from './canvas/documentShape';
// "Take me to that", on either shape: a section element on a legacy document,
// a `data-comment-id` highlight on a page.
export { findDocumentTarget, scrollToDocumentTarget } from './canvas/scrollToDocumentTarget';
export type { DocumentTarget } from './canvas/scrollToDocumentTarget';
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

export { default as DocumentToolbar, useDocumentToolbarSize, documentToolbarSize, DOCUMENT_TOOLBAR_BREAKPOINTS } from './DocumentToolbar';
export type { DocumentToolbarProps, DocumentToolbarSize } from './DocumentToolbar';

export { default as DocumentGutter, stackOffsets } from './DocumentGutter';
export type { DocumentGutterProps, GutterItem, GutterItemKind } from './DocumentGutter';

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
export { default as FloatingDockBar } from './FloatingDockBar';
export type { FloatingDockBarProps } from './FloatingDockBar';

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

export { useCommentMarginPreference, readCommentMarginPreference, COMMENT_MARGIN_STORAGE_KEY } from './useCommentMarginPreference';
export type { CommentMarginPreference, CommentMarginPreferenceOptions } from './useCommentMarginPreference';
export { DocumentStatusBar, ZOOM_STEPS, ZOOM_FIT } from './DocumentStatusBar';
export type { DocumentStatusBarProps, DocumentZoomControl } from './DocumentStatusBar';

export { DocumentModePill, DOCUMENT_MODE_LABELS } from './DocumentModePill';
export type { DocumentModePillProps, DocumentModePillMode } from './DocumentModePill';
export { DocumentOwnership } from './DocumentOwnership';
export type { DocumentOwnershipProps, DocumentPerson } from './DocumentOwnership';
export { DocumentShareDialog, SHARE_ROLES } from './DocumentShareDialog';
export type { DocumentShareDialogProps, ShareEntry, ShareRole, GeneralAccess } from './DocumentShareDialog';

export { default as DocumentFindBar } from './DocumentFindBar';
export type { DocumentFindBarProps } from './DocumentFindBar';
export { findMatches, nextMatchIndex } from './findMatches';
export type { FindMatch } from './findMatches';

// Google Docs' Editing / Suggesting / Viewing. Suggesting is a sub-state of
// the editor surface, not a fourth view mode — a host that already has view
// modes composes the two axes rather than adding one.
export { SuggestionModeControl, SUGGESTION_AUTHORING_MODES } from './SuggestionModeControl';
export type { SuggestionModeControlProps, SuggestionAuthoringMode } from './SuggestionModeControl';
export { SuggestionCard } from './SuggestionCard';
export type { SuggestionCardProps, SuggestionCardKind } from './SuggestionCard';
export { SuggestionReviewList } from './SuggestionReviewList';
export type { SuggestionReviewListProps } from './SuggestionReviewList';

export { DocumentImageProvider, AuthenticatedDocumentImageView, createAuthenticatedDocumentImage } from './AuthenticatedDocumentImage';
export type { DocumentImageProviderProps, DocumentImageLoader } from './AuthenticatedDocumentImage';
// Dependency injection keeps document uploads usable without optional media peers.
export { useDocumentImageUpload, acceptsDocumentImage, MAX_IMAGE_BYTES, MAX_ATTACHMENT_BYTES } from '../../integrations/realtime-modules/useDocumentImageUpload';
export type { DocumentImageUpload, DocumentFileUploadHook, DocumentUploadCompletion, UploadedDocumentFile } from '../../integrations/realtime-modules/useDocumentImageUpload';
export { DocumentReviewPanel } from './DocumentReviewPanel';
export type { DocumentReviewEntry, DocumentReviewPanelProps } from './DocumentReviewPanel';

// The Documents workspace chrome (2.362.0): one shell for every file kind,
// and the composer dock that floats over its surface.
export { EditorShell, DEFAULT_EDITOR_SHELL_TABS } from './EditorShell';
export type { EditorShellProps, EditorShellTab } from './EditorShell';
export { FloatingComposerDock, DOCK_HEIGHT_VAR, DOCK_INSET_VAR, ComposerDockPlacementContext } from './FloatingComposerDock';
export type { FloatingComposerDockProps, FloatingComposerDockWidth, ComposerDockPlacement } from './FloatingComposerDock';

// The reading end of the presentation generator: a rendered deck, read-only.
export { PresentationView } from './PresentationView';
export type { PresentationViewProps, PresentationRevision, PresentationSlide } from './PresentationView';

// The writing end of the same document type. See presentation/index.ts for
// why the sortable rail is not named there.
export * from './presentation';
