// Work — the Documents four-pane redesign's library pieces (2.385.0): the Work
// list column, the scope header, the detail column's meta bar and sections, and
// the Run draft panel. Exported from the ROOT entry. `@dnd-kit` (an optional
// peer) is reached only through GroupedList's lazily imported drag chunk, so
// importing anything here never requires it.
export { WorkListView, WorkListToolbar, toWorkListRows } from './WorkListView';
export type {
  WorkListPerson,
  WorkListChip,
  WorkListSignal,
  WorkListItem,
  WorkListGroup,
  WorkListToolbarProps,
  WorkListViewProps,
  ToWorkListRowsOptions,
} from './WorkListView';
export { ScopeHeader, formatSpend } from './ScopeHeader';
export type { ScopeHeaderProps, ScopeHeaderPeopleGroup, ScopeHeaderTab, ScopeHeaderProgress } from './ScopeHeader';
export { WorkItemMetaBar, WorkSearchPicker } from './WorkItemMetaBar';
export type { WorkItemMetaBarProps, WorkMetaOption, WorkPerson, WorkSearchPickerProps } from './WorkItemMetaBar';
export { OutcomeSection } from './OutcomeSection';
export type { OutcomeSectionProps } from './OutcomeSection';
export { ChecklistSection } from './ChecklistSection';
export type { ChecklistSectionProps, ChecklistItem } from './ChecklistSection';
export { LinkedItemsSection, DEFAULT_LINK_RELATIONS } from './LinkedItemsSection';
export type { LinkedItemsSectionProps, LinkedItem, LinkableDocument, LinkRelationOption } from './LinkedItemsSection';
export { CommentList } from './CommentList';
export type { CommentListProps, CommentListItem } from './CommentList';
export { RunDraftPanel, RUN_DRAFT_STATUS_LABELS } from './RunDraftPanel';
export type {
  RunDraftPanelProps,
  RunDraftStatus,
  RunDraftSelectField,
  RunDraftBudget,
  RunDraftTarget,
  RunEstimateConfidence,
} from './RunDraftPanel';
export { EstimateRow, formatEstimate, confidenceOf, confidenceNote } from './EstimateRow';
export type { EstimateRowProps, RunEstimate, RunEstimateUnit, RunEstimateConfidenceLevel } from './EstimateRow';
export { AccessNotice } from './AccessNotice';
export type { AccessNoticeProps, AccessNoticeTone, AccessNoticeAction } from './AccessNotice';
export { formatCompactAge } from './compactAge';
