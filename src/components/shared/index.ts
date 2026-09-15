import '../../styles.css';

export * from '../ui/Button';
export * from '../ui/Card';
export * from '../ui/Table';
export * from '../ui/PageSection';
export * from '../ui/IconButton';
export * from '../ui/Icons';
export * from '../ui/Stack';
export * from '../ui/SelectableCard';

export { default as Banner } from './Banner';
export * from './Banner';
export * from './Chart';
export { default as Chip } from './Chip';
export * from './Chip';
export { default as CodeBlock } from './CodeBlock';
export * from './CodeBlock';
export { default as CodeEditor } from './CodeEditor';
export * from './CodeEditor';
export { default as CommandPalette } from './CommandPalette';
export * from './CommandPalette';
export { default as ConfirmDialog } from './ConfirmDialog';
export * from './ConfirmDialog';
export { default as DataTable } from './DataTable';
export * from './DataTable';
export { default as EmptyState } from './EmptyState';
export * from './EmptyState';
export { default as CapabilityDeniedFallback } from './CapabilityDeniedFallback';
export * from './CapabilityDeniedFallback';
export { default as ErrorState } from './ErrorState';
export * from './ErrorState';
export { default as TechnicalDetails } from './TechnicalDetails';
export * from './TechnicalDetails';
export { default as LoadingState } from './LoadingState';
export * from './LoadingState';
export { default as FormField } from './FormField';
export * from './FormField';
export * from './eventGlyphs';
export { default as EventRow } from './EventRow';
export * from './EventRow';
export { default as IconPicker } from './IconPicker';
export * from './IconPicker';
export { default as ImageLightbox } from './ImageLightbox';
export * from './ImageLightbox';
export { default as Modal } from './Modal';
export * from './Modal';
export { default as ShortcutsHelp } from './ShortcutsHelp';
export * from './ShortcutsHelp';
export { default as ScoreBarGauge } from './ScoreBarGauge';
export * from './ScoreBarGauge';
export { default as SkeletonCard } from './SkeletonCard';
export * from './SkeletonCard';
export { default as SkipLink } from './SkipLink';
export * from './SkipLink';
export { default as VisuallyHidden } from './VisuallyHidden';
export * from './VisuallyHidden';
export { default as LiveRegion } from './LiveRegion';
export * from './LiveRegion';
export { default as TrendSparkline } from './TrendSparkline';
export * from './TrendSparkline';
export { default as Sparkline } from './Sparkline';
export * from './Sparkline';
export { default as Switch } from './Switch';
export * from './Switch';
export { default as Tabs } from './Tabs';
export * from './Tabs';
export { default as TagEditor } from './TagEditor';
export * from './TagEditor';
// `export *` does not re-export a default, so the Toast component itself was
// unreachable from this barrel — only its types were. Additive fix.
export { default as Toast } from './Toast';
export * from './Toast';
export * from './ToastProvider';
export { default as UserPicker } from './UserPicker';
export * from './UserPicker';
// Panel docks (e.g. <CallSidePanel>) announce themselves to their body
// through this, so a body can drop its own header and fill the column.
export { DockedPanelProvider, useDockedPanel } from './DockedPanelContext';
export type { DockedPanelContextValue, DockedPanelProviderProps } from './DockedPanelContext';

// ── New primitives (2025-05) ──
export { default as StatCard } from './StatCard';
export { default as FollowBanner } from './FollowBanner';
export type { FollowBannerProps } from './FollowBanner';
export { default as SuggestionCard } from './SuggestionCard';
export { default as TaskComposer } from './TaskComposer';
export type { TaskComposerProps, ComposerSuggestion } from './TaskComposer';
export type { SuggestionCardProps } from './SuggestionCard';
export { default as ExpertCard } from './ExpertCard';
export type { ExpertCardProps, ExpertSkillMatch, ExpertEvidenceItem } from './ExpertCard';
export { default as ConsultCard } from './ConsultCard';
export type { ConsultCardProps } from './ConsultCard';
export { default as DiffViewer, parseUnifiedDiff } from './DiffViewer';
export type { DiffViewerProps, DiffAnnotation, DiffFile, DiffLine } from './DiffViewer';
export * from './StatCard';
export { default as KPIGrid } from './KPIGrid';
export * from './KPIGrid';
export { default as Spinner } from './Spinner';
export * from './Spinner';
export { default as ProgressBar } from './ProgressBar';
export * from './ProgressBar';
export { default as TitledFrame } from './TitledFrame';
export type { TitledFrameProps, TitledFrameTone } from './TitledFrame';
export { default as DotMeter } from './DotMeter';
export type { DotMeterProps, DotMeterTone } from './DotMeter';
export { default as StatusDot } from './StatusDot';
export * from './StatusDot';
export { default as PresenceDot } from './PresenceDot';
export * from './PresenceDot';
export { default as UserChip } from './UserChip';
export * from './UserChip';
export { default as FilterChip } from './FilterChip';
export * from './FilterChip';
export { default as SegmentedControl } from './SegmentedControl';
export * from './SegmentedControl';
export { default as PermissionDeniedCard } from './PermissionDeniedCard';
export * from './PermissionDeniedCard';
export { default as Avatar } from './Avatar';
export * from './Avatar';
export { default as EntityCell } from './EntityCell';
export * from './EntityCell';
export { default as Drawer } from './Drawer';
export * from './Drawer';
export { default as CollapsibleSection } from './CollapsibleSection';
export * from './CollapsibleSection';
export { default as SearchInput } from './SearchInput';
export * from './SearchInput';
export { default as InlineAlert } from './InlineAlert';
export * from './InlineAlert';
export { default as CardHeader } from './CardHeader';
export * from './CardHeader';
export { default as PageHeader } from './PageHeader';
export * from './PageHeader';
export * from './ThinkingDots';
export { default as TypingIndicator } from './TypingIndicator';
export * from './TypingIndicator';
export { default as ConnectionPill } from './ConnectionPill';
export * from './ConnectionPill';
export { default as LogStream, TerminalLog } from './LogStream';
export type { LogStreamProps, LogLine, LogLevel } from './LogStream';
export { default as ThumbnailCard } from './ThumbnailCard';
export type { ThumbnailCardProps } from './ThumbnailCard';
export { default as CatalogGrid } from './CatalogGrid';
export type { CatalogGridProps, CatalogGridColumns } from './CatalogGrid';
export { default as StackDiagram, LayerStack } from './StackDiagram';
export type {
  StackDiagramProps,
  StackLayerSpec,
  StackDiagramOrientation,
  StackDiagramConnector,
} from './StackDiagram';
export * from './ChatComposer';
export * from './MessageBubble';
export * from './ToolCallStrip';
export * from './ThinkingBlock';
export * from './QuickPromptGrid';
export * from './FollowUpChips';

// ── Shell composites (2026-05) ──
export { ChannelHeader } from './ChannelHeader';
export type { ChannelHeaderProps } from './ChannelHeader';
export { PresenceAvatars } from './PresenceAvatars';
export type {
  PresenceAvatarsProps,
  PresenceMode,
  PresenceUser as PresenceAvatarUser,
} from './PresenceAvatars';
import type { PresenceUser as PresenceAvatarUserAlias } from './PresenceAvatars';
/**
 * @deprecated Renamed to `PresenceAvatarUser` (the barrel-exported name for
 * the `PresenceAvatars` user shape). Import `PresenceAvatarUser` instead;
 * this back-compat alias will be removed in the next major.
 */
export type PresenceUser = PresenceAvatarUserAlias;
export { FileUploadDrop } from './FileUploadDrop';
export type { FileUploadDropProps } from './FileUploadDrop';
export { NotificationCenter } from './NotificationCenter';
export type { NotificationCenterProps, NotificationItem } from './NotificationCenter';
export { UserMenu } from './UserMenu';
export type { UserMenuProps, UserMenuUser, UserMenuItem } from './UserMenu';
export { Breadcrumbs } from './Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem, BreadcrumbOverflow } from './Breadcrumbs';

// ── Project-management components (2025-05) ──
export { ActivityFeed } from './ActivityFeed';
export type { ActivityFeedItem, ActivityFeedProps, ActivityKind } from './ActivityFeed';
export { ProjectCard } from './ProjectCard';
export type { ProjectCardProps, StatusColors } from './ProjectCard';
export { SubNavLayout, activeNavItemStyle } from './SubNavLayout';
export type { SubNavItem, SubNavLayoutProps } from './SubNavLayout';

// ── Deep application layout (2026-08) ──
// SubNavLayout tops out at two rails; NavRailStack takes an array, so a route
// that gains a nesting level adds an entry instead of a component.
export { NavRail, NavRailStack } from './NavRail';
export type {
  NavRailProps,
  NavRailItem,
  NavRailSpec,
  NavRailStackProps,
  NavRailMatch,
  NavRailTone,
} from './NavRail';
export { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarLabel } from './Toolbar';
export { SectionLabel } from './SectionLabel';
export type { SectionLabelProps } from './SectionLabel';
export type {
  ToolbarProps,
  ToolbarGroupProps,
  ToolbarSeparatorProps,
  ToolbarLabelProps,
  ToolbarTone,
} from './Toolbar';
export { WorkArea } from './WorkArea';
export type { WorkAreaProps, WorkAreaTone } from './WorkArea';

// ── Sidebar primitives (2026-05) ──
// Re-exported here as well as `src/index.ts` so apps importing from the
// shared subpath can find them in one place.
export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeColor } from './Badge';
export { default as InlinePlaceholder } from './InlinePlaceholder';
export type { InlinePlaceholderProps, InlinePlaceholderTone } from './InlinePlaceholder';
export { InlinePopover } from './InlinePopover';
export type { InlinePopoverProps, InlinePopoverPlacement } from './InlinePopover';
export { FloatingPanel, FLOATING_PANEL_ANCHORS, resolveAnchorPosition } from './FloatingPanel';
export type { FloatingPanelProps, FloatingPanelAnchor } from './FloatingPanel';
export { DropdownMenu } from './DropdownMenu';
export type { DropdownMenuProps, DropdownMenuSection, DropdownMenuItem } from './DropdownMenu';

// ── Status primitives (Phase 5) ──
// ChangeDiff imports `cn` and nothing else, but was reachable only from the
// root barrel — which statically needs seven @tiptap packages. Third instance
// of that defect after NodeCard (2.239.0) and Slider (2.241.0); its sibling
// DiffViewer was already exported here, which is what made the asymmetry
// visible.
export { ChangeDiff } from '../change-review/ChangeDiff';
export type { ChangeDiffProps, ChangeDiffPair } from '../change-review/ChangeDiff';

export { Link } from './Link';
export type { LinkProps } from './Link';

export { StatusPill } from './StatusPill';
export type { StatusPillProps, StatusPillState, StatusPillSize } from './StatusPill';

// NodeCard sits beside StatusPill because it is built out of it — the file is
// `pipelines/nodes/NodeCard.tsx` for historical reasons, but it imports only
// react, `cn`, `Card` and `StatusPill`, and nothing about it is specific to a
// pipeline.
//
// Until now it was reachable ONLY from the root barrel, and the root barrel
// statically needs seven @tiptap packages (see the `index` entry in
// `src/__tests__/packaging.test.ts`, and the note there about `./renderers`).
// So a consumer that wanted a graph node — the aws-agentcore portal's canary
// experiment nodes, seven of them, all hand-rolled out of raw divs — had to
// choose between installing a rich-text editor it never renders and not using
// the component. It chose the latter, which is how the gap ends up filed in
// that repo's ui-components-queue.md rather than fixed here.
//
// Exported from `/shared` rather than `/pipelines`: `/pipelines` is frozen
// public API (v2.33.0) and carries @xyflow/react + react-router as static
// peers, none of which a presentational card should cost. It adds no peer to
// `/shared` — StatusPill is already here and Card imports nothing.
export { NodeCard } from '../pipelines/nodes/NodeCard';
export type { NodeCardProps } from '../pipelines/nodes/NodeCard';

// Semantic tone scale — the library-wide branding surface. Components resolve
// tinted colours through these; consumers rebrand by overriding the matching
// CSS variables (--color-{tone}, -bg, -fg, -border).
export {
  TONES,
  TONE_SOFT,
  TONE_SOLID,
  TONE_SOLID_BG,
  TONE_BORDER,
  TONE_TEXT,
  TONE_BG,
  toneKey,
  toneVar,
  CODE_TONE_SOFT,
  CODE_TONE_SOLID,
  CODE_TONE_SOLID_BG,
  CODE_TONE_TEXT,
} from './tones';
export type { Tone, ToneOrAlias, SurfaceTone } from './tones';

// ── Metadata line + board lane (2026-09) ──
export { MetaLine } from './MetaLine';
export type { MetaLineProps, MetaLineSize, MetaLineTone } from './MetaLine';
export { BoardColumn } from './BoardColumn';
export type { BoardColumnProps } from './BoardColumn';
export { FormRow } from './FormRow';
export type { FormRowProps } from './FormRow';
export { DetailHeader } from './DetailHeader';
export type { DetailHeaderProps } from './DetailHeader';

// ── Form primitives, reachable from the `/shared` subpath ──
//
// These have existed in `components/forms` for a long time but were exported
// ONLY from the root entry. Every app page in the aws-agentcore portal imports
// from `@connorhoehnslalom/ui-components/shared` (140 import sites vs 0 on the
// root), so from those pages the library appeared to have no text input, no
// select and no checkbox — and each page hand-rolled a `const inputStyle:
// CSSProperties` instead. The controls were never missing; the door was.
//
// Re-exported, not moved: the root entry keeps its explicit exports, which
// take precedence over this star re-export, so nothing existing changes.
export { Input } from '../forms/Input';
export type { InputProps, InputSize, InputType } from '../forms/Input';
export { Select } from '../forms/Select';
export type { SelectProps, SelectSize, SelectOption, SelectOptionGroup } from '../forms/Select';
export { Textarea } from '../forms/Textarea';
export type { TextareaProps } from '../forms/Textarea';
export { NumberInput } from '../forms/NumberInput';
export type { NumberInputProps } from '../forms/NumberInput';
// Slider sits with its siblings above. Input, Select, Textarea and NumberInput
// all reach consumers through this barrel; Slider was reachable ONLY from the
// root, which statically needs seven @tiptap packages — so a consumer wanting a
// range control had to install a rich-text editor. It imports react and `cn`
// and nothing else, exactly like the rest of this group.
export { Slider } from '../forms/Slider';
export type { SliderProps } from '../forms/Slider';
export { Checkbox } from '../forms/Checkbox';
export type { CheckboxProps } from '../forms/Checkbox';
export { RadioGroup } from '../forms/RadioGroup';
export type { RadioGroupProps, RadioOption } from '../forms/RadioGroup';

// ── Review threads + context rail + compact stats (2026-09) ──
//
// The design-review (ADR) experience: a threaded agent/human discussion with
// inline HITL answers and artifacts, the sign-off panel that ratifies it, the
// split layout that gives it a context rail, and the compact stat strip.
export { ReviewThread, ArtifactTile, REVIEW_KIND_LABELS, REVIEW_KIND_TONES } from './ReviewThread';
export type { ReviewThreadProps, ReviewPostData, ReviewAuthorKind } from './ReviewThread';
export { RailLayout, RailSection } from './RailLayout';
export type { RailLayoutProps, RailSectionProps } from './RailLayout';
export { SignoffPanel } from './SignoffPanel';
export type { SignoffPanelProps, SignoffEntry } from './SignoffPanel';
export { StatStrip } from './StatStrip';
export type { StatStripProps, StatStripItem } from './StatStrip';

// ── Content segmentation (2026-09) ──
//
// Long detail surfaces had no horizontal rule at all — only the vertical
// ToolbarSeparator — so sections ran together and every drawer hand-rolled its
// own titled-block markup.
export { Divider } from './Divider';
export type { DividerProps, DividerSpacing } from './Divider';
export { DetailSection } from './DetailSection';
export type { DetailSectionProps } from './DetailSection';

// PersonHoverCard — the Outlook/Teams people card. Hover (or focus) a name to
// get who they are and what you can do about it.
export { PersonHoverCard } from './PersonHoverCard';
export type { PersonHoverCardProps, PersonCardData } from './PersonHoverCard';

// ── Master-detail, tree, workflow + wizard shells, markdown, tooltip (2026-09) ──
export { MasterDetail } from './MasterDetail';
export type { MasterDetailProps } from './MasterDetail';
export { TreeView } from './TreeView';
export type { TreeViewProps, TreeNode, TreeDropPosition } from './TreeView';
export { WorkflowStepper } from './WorkflowStepper';
export type { WorkflowStepperProps, WorkflowStep } from './WorkflowStepper';
export { Wizard } from './Wizard';
export type { WizardProps, WizardStep } from './Wizard';
export { MarkdownView } from './MarkdownView';
export type { MarkdownViewProps } from './MarkdownView';
export { Tooltip } from './Tooltip';
export type { TooltipProps, TooltipPlacement } from './Tooltip';
