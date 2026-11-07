// Page specs — a page described as data: template → regions → sections → leaves.
//
// Every leaf names a library component by `kind`, so a page built from a spec
// cannot contain hand-rolled markup by construction. No slot takes a
// ReactNode: content slots take `SectionSpec[]` or `LeafSpec[]`. The one
// escape hatch is the `custom` leaf, which must say why (`reason`) and renders
// a `data-page-spec-custom` marker the DOM audit can count.
//
// Apps add their own kinds without `custom` by augmenting `PageSpecLeafKinds`
// and registering a component (`registerLeafKind` / `PageSpecProvider`).
import type { ReactNode } from 'react';
import type { ButtonProps, ButtonVariant } from '../../ui/Button';
import type { BreadcrumbItem } from '../Breadcrumbs';
import type { PageHeaderBack } from '../PageHeader';
import type { Density } from '../Density';
import type { PageGutter } from '../pageTemplate';
import type { DropdownMenuProps } from '../DropdownMenu';
import type { DataTableProps } from '../DataTable';
import type { StatCardProps } from '../StatCard';
import type { KPIGridColumns } from '../KPIGrid';
import type { StatStripItem, StatStripProps } from '../StatStrip';
import type { KeyValueProps } from '../KeyValue';
import type { StatusPillProps } from '../StatusPill';
import type { BadgeProps } from '../Badge';
import type { TextProps } from '../Text';
import type { MetaLineProps } from '../MetaLine';
import type { EmptyStateAction, EmptyStateProps } from '../EmptyState';
import type { BannerProps } from '../Banner';
import type { GroupedListProps } from '../GroupedList';
import type { ActionRowListProps } from '../../work/ActionRowList';
import type { TabsVariant } from '../Tabs';
import type { WorkActivityListProps } from '../../work/WorkActivityList';
import type { SearchInputProps } from '../SearchInput';
import type { InputType } from '../../forms/Input';
import type { SelectOption } from '../../forms/Select';
import type { CollectionToolbarProps } from '../CollectionToolbar';
import type { CollectionPageDetail } from '../CollectionPage';
import type { DashboardColumns } from '../DashboardPage';
import type { ListRail, ListRailLayoutProps } from '../../layout/ListRailLayout';

/** A list of leaves. `false`/`null`/`undefined` entries are skipped, so `cond && { kind: … }` works. */
export type LeafList = ReadonlyArray<LeafSpec | false | null | undefined>;
/** A list of sections. `false`/`null`/`undefined` entries are skipped. */
export type SectionList = ReadonlyArray<SectionSpec | false | null | undefined>;

// ── Leaves ────────────────────────────────────────────────────────────────

/** `Button`. `variant` is required: one primary action per region, never the default by accident. */
export interface ButtonLeaf extends Omit<ButtonProps, 'children' | 'variant' | 'ref' | 'style' | 'className'> {
  kind: 'button';
  label: string;
  variant: ButtonVariant;
}

/** `ToolbarGroup` of buttons and menus: related actions side by side. */
export interface ButtonGroupLeaf {
  kind: 'button-group';
  /** Names the group for screen readers. */
  label?: string;
  items: ReadonlyArray<ButtonLeaf | MenuLeaf>;
}

/** `DropdownMenu`. The trigger is a label, drawn by the menu's own trigger button. */
export interface MenuLeaf extends Omit<DropdownMenuProps, 'trigger' | 'className' | 'triggerClassName'> {
  kind: 'menu';
  trigger: string;
}

/** `DataTable`, striped unless `striped: false`. Use `tableLeaf<T>()` to type the rows. */
export interface TableLeaf<T = any> extends Omit<DataTableProps<T>, 'className'> {
  kind: 'table';
}

/** `KPIGrid` of `StatCard`s. */
export interface StatsLeaf {
  kind: 'stats';
  items: ReadonlyArray<Omit<StatCardProps, 'as' | 'style' | 'className'>>;
  columns?: KPIGridColumns;
  mdColumns?: KPIGridColumns;
  dense?: boolean;
}

/** `StatStrip`: a row of small stats in one card, where the numbers are context. */
export interface StatStripLeaf extends Omit<StatStripProps, 'className'> {
  kind: 'stat-strip';
}

/** `KeyValue`: labelled facts. */
export interface KeyValuesLeaf extends Omit<KeyValueProps, 'className'> {
  kind: 'key-values';
}

/** `StatusPill`. */
export interface StatusLeaf extends Omit<StatusPillProps, 'className' | 'icon'> {
  kind: 'status';
}

/** `Badge` (count, dot, pulse). */
export interface BadgeLeaf extends Omit<BadgeProps, 'className'> {
  kind: 'badge';
}

/** `Text`. */
export interface TextLeaf extends Omit<TextProps, 'children' | 'className' | 'onClick' | 'role'> {
  kind: 'text';
  text: string;
}

/** `MetaLine`: the dot-separated secondary line under a title. */
export interface MetaLeaf extends Omit<MetaLineProps, 'className' | 'items' | 'separator'> {
  kind: 'meta';
  items: ReadonlyArray<string>;
}

/** `EmptyState`. */
export interface EmptyLeaf extends Pick<EmptyStateProps, 'size' | 'layout' | 'align' | 'density' | 'tone' | 'actionsDirection'> {
  kind: 'empty';
  title: string;
  description?: string;
  /** The one action ("New connector"). */
  action?: ButtonLeaf;
  /** Several actions, as EmptyState data (links, copyable commands). */
  actions?: EmptyStateAction[];
  'data-testid'?: string;
}

/** `Banner`. */
export interface BannerLeaf extends Omit<BannerProps, 'children' | 'className' | 'style' | 'action' | 'icon' | 'meta'> {
  kind: 'banner';
  message?: string;
  action?: ButtonLeaf;
}

/** `GroupedList`: two-line rows under collapsible group headers. */
export interface GroupedListLeaf extends Omit<GroupedListProps, 'className'> {
  kind: 'list';
  variant: 'grouped';
}

/** `ActionRowList`: a short ruled list of things to open next. */
export interface ActionRowsLeaf extends Omit<ActionRowListProps, 'className' | 'footer'> {
  kind: 'list';
  variant: 'action-rows';
  /** "See all 11 work items →". */
  footer?: ButtonLeaf;
}

export type ListLeaf = GroupedListLeaf | ActionRowsLeaf;

interface FormFieldBase {
  /** Stable key; defaults to the label. */
  id?: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  'data-testid'?: string;
}

/** One field of a `form` leaf: `FormField` around a `forms/` control. */
export type FormFieldSpec = FormFieldBase & (
  | { control: 'input'; value: string; onChange: (value: string) => void; type?: InputType; placeholder?: string; name?: string }
  | { control: 'textarea'; value: string; onChange: (value: string) => void; rows?: number; placeholder?: string; name?: string }
  | { control: 'select'; value: string; onChange: (value: string) => void; options: SelectOption[]; placeholder?: string; searchable?: boolean; name?: string }
  | { control: 'number'; value: number | undefined; onChange: (value: number) => void; min?: number; max?: number; step?: number; unit?: string; placeholder?: string; name?: string }
  | { control: 'checkbox'; checked: boolean; onChange: (checked: boolean) => void }
  | { control: 'toggle'; checked: boolean; onChange: (checked: boolean) => void }
);

/** A stack of `FormField`s, each wrapping an `Input`/`Select`/`Textarea`/`NumberInput`/`Checkbox`/`Switch`. */
export interface FormLeaf {
  kind: 'form';
  fields: ReadonlyArray<FormFieldSpec | false | null | undefined>;
}

/** `Tabs` + `TabPanel`: one viewport with tabs instead of stacked cards. */
export interface TabsLeaf {
  kind: 'tabs';
  /** Names the tab list. */
  label: string;
  items: ReadonlyArray<{ id: string; label: string; badge?: number | string; disabled?: boolean; content: LeafList }>;
  /** Controlled tab. Uncontrolled (first enabled) when omitted. */
  value?: string;
  onValueChange?: (id: string) => void;
  variant?: TabsVariant;
  size?: 'sm' | 'md';
}

/** `TrendSparkline`: the library's light (inline SVG, no chart peer) chart. */
export interface ChartLeaf {
  kind: 'chart';
  type: 'sparkline';
  points: number[];
  /** What the line shows, for screen readers. */
  label: string;
  yMin?: number;
  yMax?: number;
  width?: number;
  height?: number;
  showFill?: boolean;
  showLastPoint?: boolean;
}

/** `WorkActivityList`: history, newest first. */
export interface ActivityLeaf extends Omit<WorkActivityListProps, 'className'> {
  kind: 'activity';
}

/** `SearchInput` (`collapsible` for a header search). */
export interface SearchLeaf extends Omit<SearchInputProps, 'className' | 'style' | 'inputClassName'> {
  kind: 'search';
}

/**
 * The audited escape hatch: anything a spec cannot express. Renders inside a
 * `data-page-spec-custom="<reason>"` marker so the audit can count and list
 * every one. Prefer registering a leaf kind.
 */
export interface CustomLeaf {
  kind: 'custom';
  render: () => ReactNode;
  /** Why no library leaf fits ("canvas editor", "third-party map"). Required. */
  reason: string;
}

export type BuiltinLeafSpec =
  | ButtonLeaf | ButtonGroupLeaf | MenuLeaf | TableLeaf | StatsLeaf | StatStripLeaf | KeyValuesLeaf
  | StatusLeaf | BadgeLeaf | TextLeaf | MetaLeaf | EmptyLeaf | BannerLeaf | ListLeaf | FormLeaf
  | TabsLeaf | ChartLeaf | ActivityLeaf | SearchLeaf | CustomLeaf;

export type BuiltinLeafKind = BuiltinLeafSpec['kind'];

/**
 * App-defined leaf kinds. Augment it to add one, then register its component:
 *
 *   declare module '@connorhoehnslalom/ui-components/shared' {
 *     interface PageSpecLeafKinds { 'cost-meter': { spent: number; budget: number } }
 *   }
 *   registerLeafKind('cost-meter', CostMeter);
 *
 * Each key becomes a `{ kind: key } & props` member of `LeafSpec`.
 */
export interface PageSpecLeafKinds {}

export type RegisteredLeafSpec = {
  [K in keyof PageSpecLeafKinds]: { kind: K } & PageSpecLeafKinds[K];
}[keyof PageSpecLeafKinds];

/** One leaf: exactly one library (or registered) component, picked by `kind`. */
export type LeafSpec = BuiltinLeafSpec | RegisteredLeafSpec;
export type LeafKind = LeafSpec['kind'];

// ── Sections ──────────────────────────────────────────────────────────────

/**
 * A titled block (`PageSection`); sections stack in a `SectionStack` with a
 * hairline between each. Untitled, the body renders as a plain `Stack`.
 */
export interface SectionSpec {
  id?: string;
  title?: string;
  description?: string;
  /** A count chip beside the title (hidden at zero). */
  count?: number;
  /** The section has nothing to show: one quiet line beside the title. */
  empty?: string;
  actions?: LeafList;
  body: LeafList;
  /** A hairline between the body's leaves. */
  divided?: boolean;
  /** Heading size. Default `md` (`sm` inside detail tabs). */
  size?: 'md' | 'sm';
}

// ── Pages ─────────────────────────────────────────────────────────────────

interface SpecHeader {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** The header's action row. */
  actions?: LeafList;
  /** Beside the title — a `status` leaf, usually. */
  badge?: LeafSpec;
  back?: PageHeaderBack;
  density?: Density;
  titleAs?: 'h1' | 'h2' | 'h3';
  /** Default `page` for every template. */
  gutter?: PageGutter;
  'data-testid'?: string;
}

/** `CollectionPage`. */
export interface CollectionPageSpec extends SpecHeader {
  template: 'collection';
  toolbar?: Omit<CollectionToolbarProps, 'children' | 'filterPanel' | 'placement'> & {
    filterPanel?: { content: LeafList; activeCount?: number; onClear?: () => void };
  };
  toolbarPlacement?: 'auto' | 'header' | 'band';
  /** The body as a striped `DataTable`; wins over `sections`. */
  table?: Omit<TableLeaf, 'kind'>;
  /** Any other body. */
  sections?: SectionList;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  empty?: { title: string; description?: string; action?: ButtonLeaf };
  /** A sections body has no rows. */
  isEmpty?: boolean;
  /** The selected row in a `SidePane`; `null` while nothing is selected. */
  detail?: (Omit<CollectionPageDetail, 'content' | 'footer' | 'trailing'> & { content: SectionList }) | null;
}

/** `MasterDetailPage`. */
export interface MasterDetailPageSpec extends SpecHeader {
  template: 'master-detail';
  list: Omit<ListRail, 'actions' | 'header' | 'body' | 'footer'> & {
    actions?: LeafList;
    /** Under the rail head: a `search` leaf, a filter menu. */
    header?: LeafList;
    /** The rows: a `list` leaf, or an `empty` leaf. */
    body: LeafList;
    footer?: LeafList;
  };
  /** The selected record. `null`/omitted: `emptyDetail` shows. */
  detail?: SectionList | null;
  emptyDetail?: LeafList;
  aside?: LeafList;
  footer?: LeafList;
  body?: 'scroll' | 'docked';
  dockedBody?: 'scroll' | 'fill';
  fold?: ListRailLayoutProps['fold'];
  railWidth?: ListRailLayoutProps['railWidth'];
}

/** `DetailPage`: header, then tabs for the record's facets. */
export interface DetailPageSpec {
  template: 'detail';
  title: string;
  badge?: LeafSpec;
  description?: string;
  /** The metadata line — a `meta` leaf. */
  meta?: LeafSpec;
  actions?: LeafList;
  breadcrumbs?: BreadcrumbItem[];
  titleAs?: 'h1' | 'h2' | 'h3';
  tabs?: ReadonlyArray<{ id: string; label: string; badge?: number | string; disabled?: boolean; content: SectionList }>;
  activeTab?: string;
  onTabChange?: (id: string) => void;
  /** The body when there are no tabs. */
  sections?: SectionList;
  aside?: LeafList;
  gutter?: PageGutter;
  'data-testid'?: string;
}

/** `DashboardPage`: a stat row, then a grid of titled panels. */
export interface DashboardPageSpec extends SpecHeader {
  template: 'dashboard';
  stats?: StatStripItem[];
  panels?: ReadonlyArray<{ id: string; title: string; action?: LeafList; span?: 1 | 2 | 3; content: LeafList }>;
  columns?: DashboardColumns;
}

/** `SettingsPage`: a section rail, one section body, a save bar while dirty. */
export interface SettingsPageSpec {
  template: 'settings';
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  sections: ReadonlyArray<{ id: string; label: string; description?: string; content: SectionList }>;
  activeSectionId?: string;
  onSectionChange?: (id: string) => void;
  dirty?: boolean;
  saveLabel?: string;
  cancelLabel?: string;
  onSave?: () => void;
  onCancel?: () => void;
  saving?: boolean;
  railWidth?: number;
  gutter?: PageGutter;
  'data-testid'?: string;
}

/** `PageFrame`: a form, an overview, anything no other template fits. */
export interface FramePageSpec extends SpecHeader {
  template: 'frame';
  sections: SectionList;
  trailControls?: LeafList;
  trailLink?: { label: string; href: string } | null;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  body?: 'scroll' | 'fill' | 'docked';
  dockedBody?: 'scroll' | 'fill';
  bodyGutter?: PageGutter;
  /** Docked under the body (a save bar). */
  footer?: LeafList;
}

/** A whole page as data, discriminated on `template`. */
export type PageSpec =
  | CollectionPageSpec | MasterDetailPageSpec | DetailPageSpec | DashboardPageSpec | SettingsPageSpec | FramePageSpec;

export type PageSpecTemplate = PageSpec['template'];
