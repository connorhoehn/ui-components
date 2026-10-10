export { AppLayout } from './AppLayout';
export { CollapsibleSidebar } from './CollapsibleSidebar';
export { default as CollapsedIconStrip } from './CollapsedIconStrip';
export type { CollapsedIconStripProps, CollapsedIconStripSection } from './CollapsedIconStrip';
export { ConnectionStatus } from './ConnectionStatus';
export { ApiDegradedBanner } from './ApiDegradedBanner';
export { AppShell } from './AppShell';
export type { AppShellProps } from './AppShell';
export { TopNav, NavTabs } from './TopNav';
export type { TopNavProps, TopNavItem, NavTabsProps, NavTabsVariant } from './TopNav';
export { SettingsLayout } from './SettingsLayout';
export type { SettingsLayoutProps, SettingsSection } from './SettingsLayout';
export { DocsShell } from './DocsShell';
export type { DocsShellProps } from './DocsShell';
export { DocsSidebar } from './DocsSidebar';
export type {
  DocsSidebarProps,
  DocsSidebarSection,
  DocsSidebarGroup,
  DocsSidebarItem,
} from './DocsSidebar';
export { DocsTopNav } from './DocsTopNav';
export type { DocsTopNavProps } from './DocsTopNav';
export { ViewportFillRegion, fillHeight } from './ViewportFillRegion';
export type { ViewportFillRegionProps } from './ViewportFillRegion';
export { ExplorerLayout } from './ExplorerLayout';
export type { ExplorerLayoutProps } from './ExplorerLayout';
export { SplitPane } from './SplitPane';
export type { SplitPaneProps } from './SplitPane';
// The pane model (2.438.0): one right pane per page, one URL contract for its tabs.
export {
  SidePane, SidePaneProvider, SidePaneSplit, PaneHeader, useSidePane, useSidePaneHost,
  SIDE_PANE_BOUNDS, readSidePaneOpen, readSidePaneRatio, sidePaneFits, boundedSidePaneRatio,
} from './SidePane';
export type {
  SidePaneProps, SidePaneProviderProps, SidePaneSplitProps, SidePaneRegistration, SidePaneHostState, SidePaneBounds, PaneHeaderProps,
} from './SidePane';
export { usePaneState, readPaneState, writePaneState, visiblePaneTabs, parsePaneRecord, paneRecordKey } from './paneState';
export type { PaneTabSpec, PaneRecord, PaneState, PaneUrlOptions, UsePaneStateOptions, PaneStateControl } from './paneState';
// The list rail (2.438.0): a page's list as a flush rail beside the section rail.
export { ListRailLayout } from './ListRailLayout';
export type { ListRail, ListRailLayoutProps } from './ListRailLayout';
export { CanvasPaneLayout, canvasPaneGeometry, CANVAS_PANE_RAIL_PX } from './CanvasPaneLayout';
export { useCanvasPaneInset, CanvasPaneInsetContext } from './canvasPaneInset';
export type { CanvasPaneInset } from './canvasPaneInset';
export type { CanvasPaneLayoutProps, CanvasPaneGeometry, CanvasPaneGeometryOptions, CanvasPanePlacement } from './CanvasPaneLayout';
export { ContextColumn, CONTEXT_COLUMN_INSET_VAR } from './ContextColumn';
export type { ContextColumnProps, ContextColumnPanel, ContextColumnEntry, ContextColumnState } from './ContextColumn';
export { DockedAside, FloatingCard, PinnedSlot } from './DockedAside';
export type { DockedAsideProps, FloatingCardProps, PinnedSlotProps } from './DockedAside';

// Documents workspace foundation (2.362.0): the static right-hand workbench.
export { Workbench } from './Workbench';
export type { WorkbenchProps, WorkbenchTab } from './Workbench';
export { AgentTaskCard } from './AgentTaskCard';
export type { AgentTaskCardProps } from './AgentTaskCard';
export { MoreContextDisclosure } from './MoreContextDisclosure';
export type { MoreContextDisclosureProps, MoreContextItem } from './MoreContextDisclosure';

export { WorkspaceRail } from './WorkspaceRail';
export type { WorkspaceRailProps, WorkspaceRailBack } from './WorkspaceRail';
