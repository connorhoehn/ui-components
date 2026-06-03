import '../../styles.css';

export * from '../ui/Button';
export * from '../ui/Card';
export * from '../ui/Table';
export * from '../ui/PageSection';
export * from '../ui/IconButton';

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
export { default as ErrorState } from './ErrorState';
export * from './ErrorState';
export { default as LoadingState } from './LoadingState';
export * from './LoadingState';
export { default as FormField } from './FormField';
export * from './FormField';
export * from './eventGlyphs';
export * from './EventRow';
export * from './IconPicker';
export { default as Modal } from './Modal';
export * from './Modal';
export * from './ShortcutsHelp';
export { default as ScoreBarGauge } from './ScoreBarGauge';
export * from './ScoreBarGauge';
export { default as SkeletonCard } from './SkeletonCard';
export * from './SkeletonCard';
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
export * from './Toast';
export * from './ToastProvider';
export * from './UserPicker';

// ── New primitives (2025-05) ──
export { default as StatCard } from './StatCard';
export * from './StatCard';
export { default as KPIGrid } from './KPIGrid';
export * from './KPIGrid';
export { default as Spinner } from './Spinner';
export * from './Spinner';
export { default as ProgressBar } from './ProgressBar';
export * from './ProgressBar';
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
export type { PresenceAvatarsProps, PresenceUser as PresenceAvatarUser } from './PresenceAvatars';
export { FileUploadDrop } from './FileUploadDrop';
export type { FileUploadDropProps } from './FileUploadDrop';
export { NotificationCenter } from './NotificationCenter';
export type { NotificationCenterProps, NotificationItem } from './NotificationCenter';
export { UserMenu } from './UserMenu';
export type { UserMenuProps, UserMenuUser, UserMenuItem } from './UserMenu';
export { Breadcrumbs } from './Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs';

// ── Project-management components (2025-05) ──
export { ActivityFeed } from './ActivityFeed';
export type { ActivityFeedItem, ActivityFeedProps, ActivityKind } from './ActivityFeed';
export { ProjectCard } from './ProjectCard';
export type { ProjectCardProps, StatusColors } from './ProjectCard';
export { SubNavLayout } from './SubNavLayout';
export type { SubNavItem, SubNavLayoutProps } from './SubNavLayout';

// ── Sidebar primitives (2026-05) ──
// Re-exported here as well as `src/index.ts` so apps importing from the
// shared subpath can find them in one place.
export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeColor } from './Badge';
export { InlinePopover } from './InlinePopover';
export type { InlinePopoverProps, InlinePopoverPlacement } from './InlinePopover';
