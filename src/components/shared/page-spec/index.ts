// Page specs: a page as data (template → regions → sections → leaves).
export { PageFromSpec, definePage, tableLeaf } from './PageFromSpec';
export type { PageFromSpecProps } from './PageFromSpec';
export { SpecLeaf, renderLeaf, renderLeaves, renderSection, renderSections } from './render';
export type { RenderSectionOptions } from './render';
export { PageSpecProvider, registerLeafKind, isBuiltinLeafKind } from './registry';
export type { PageSpecProviderProps, PageSpecLeafComponent, PageSpecLeafMap } from './registry';
export type {
  PageSpec, PageSpecTemplate, CollectionPageSpec, MasterDetailPageSpec, DetailPageSpec, DashboardPageSpec, SettingsPageSpec, FramePageSpec,
  SectionSpec, SectionList, LeafSpec, LeafList, LeafKind, BuiltinLeafSpec, BuiltinLeafKind, RegisteredLeafSpec, PageSpecLeafKinds,
  ButtonLeaf, ButtonGroupLeaf, MenuLeaf, TableLeaf, StatsLeaf, StatStripLeaf, KeyValuesLeaf, StatusLeaf, BadgeLeaf, TextLeaf, MetaLeaf,
  EmptyLeaf, BannerLeaf, ListLeaf, GroupedListLeaf, ActionRowsLeaf, FormLeaf, FormFieldSpec, TabsLeaf, ChartLeaf, ActivityLeaf,
  SearchLeaf, CustomLeaf,
} from './types';
