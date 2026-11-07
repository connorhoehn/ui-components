# Page specs

A page spec describes a page as data: a **template**, its **regions** (header
actions, toolbar, list rail, tabs, panels, footer), the **sections** in each
region, and the **leaves** in each section. `<PageFromSpec spec={…} />`
renders it through the matching page template, and every leaf is one library
component picked by `kind`. A page built this way cannot contain a raw `<div>`,
`<button>` or `<table>`: no slot accepts JSX.

Import everything from `@connorhoehnslalom/ui-components/shared`.

```tsx
import { PageFromSpec, definePage } from '@connorhoehnslalom/ui-components/shared';

export function RunsPage({ runs, query, setQuery, onOpen, onNew }: RunsPageProps) {
  return (
    <PageFromSpec spec={definePage({
      template: 'collection',
      title: 'Runs',
      actions: [{ kind: 'button', variant: 'primary', label: 'New run', onClick: onNew }],
      toolbar: { label: 'Run controls', search: { value: query, onChange: setQuery, placeholder: 'Search runs' } },
      table: {
        data: runs,
        keyField: (r: Run) => r.id,
        columns: [{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }],
        onRowClick: (r: Run) => onOpen(r.id),
      },
      empty: { title: 'No runs yet' },
    })} />
  );
}
```

`definePage(spec)` returns the spec unchanged; it exists so an authored spec
is checked against `PageSpec` where it is written. Every list slot skips
`false`, `null` and `undefined`, so `cond && { kind: … }` works.

## Templates

`PageSpec` is a union on `template`. Each variant mirrors its template's props;
the template owns every layout rule (one viewport, the collapsed search in the
header, counts and pagers hidden when empty, tabs rather than stacked cards).
`gutter` defaults to `page` on every template, including `collection`.

| `template` | Renders | Content slots |
|---|---|---|
| `collection` | `CollectionPage` | `actions: LeafList`, `toolbar` (CollectionToolbar data; `filterPanel.content: LeafList`), `table` (DataTableProps, striped), `sections`, `empty: { title, description?, action?: ButtonLeaf }`, `detail: { title, …SidePane, content: SectionList } \| null` |
| `master-detail` | `MasterDetailPage` | `actions`, `list: { label, title?, count?, actions?, header?, body, footer? }` (all `LeafList`), `detail: SectionList \| null`, `emptyDetail`, `aside`, `footer` |
| `detail` | `DetailPage` | `badge: LeafSpec`, `meta: LeafSpec` (a `meta` leaf), `actions`, `tabs: { id, label, badge?, content: SectionList }[]`, or `sections` when untabbed, `aside` |
| `dashboard` | `DashboardPage` | `actions`, `stats: StatStripItem[]`, `panels: { id, title, span?, action?: LeafList, content: LeafList }[]`, `columns` |
| `settings` | `SettingsPage` | `sections: { id, label, description?, content: SectionList }[]`, plus `dirty`, `onSave`, `onCancel`, `saving` |
| `frame` | `PageFrame` | `actions`, `trailControls`, `sections`, `footer`, plus `body: 'scroll' \| 'fill' \| 'docked'` |

The shared header fields are `title`, `description`, `breadcrumbs`, `badge`
(a leaf), `back`, `density` and `titleAs`.

## Sections

```ts
interface SectionSpec {
  id?: string; title?: string; description?: string; count?: number;
  empty?: string;          // one quiet line beside the title instead of a body
  actions?: LeafList; body: LeafList;
  divided?: boolean;       // a hairline between the body's leaves
  size?: 'md' | 'sm';      // default md; sm inside detail tabs, settings and side panes
}
```

A region's sections render in a `SectionStack` (a hairline between each). A
titled section is a `PageSection`; an untitled one is a `Stack` of its leaves
(a compact `SectionStack` when `divided`).

## Leaf kinds

Each kind maps to exactly one component. `className` and `style` are never
accepted; labels are strings.

| `kind` | Component | Fields |
|---|---|---|
| `button` | `Button` | `label`, **`variant` (required)**, plus Button props (`size`, `onClick`, `disabled`, `type`, `tone`, `fullWidth`, `aria-*`) |
| `button-group` | `ToolbarGroup` | `label?` (group name), `items: (ButtonLeaf \| MenuLeaf)[]` |
| `menu` | `DropdownMenu` | `trigger` (label), `sections`, `triggerLabel`, `triggerVariant`, `align`, … |
| `table` | `DataTable` (striped) | DataTableProps: `data`, `columns`, `keyField`, `onRowClick` or `staticRows`, `pageSize`, `loading`, … Use `tableLeaf<Row>({…})` to type the rows |
| `stats` | `KPIGrid` of `StatCard` | `items: StatCardProps[]`, `columns`, `mdColumns`, `dense` |
| `stat-strip` | `StatStrip` | `items`, `variant`, `size`, `frameless`, `connectors` |
| `key-values` | `KeyValue` | `items`, `layout`, `divided`, `labelWidth` |
| `status` | `StatusPill` | `label`, `tone`/`state`, `size`, `variant`, `meta` |
| `badge` | `Badge` | `variant` (`count`/`dot`/`pulse`), `value`, `color`, `aria-label` |
| `text` | `Text` | `text`, `size`, `weight`, `tone`, `as`, `wrap`, `tabular` |
| `meta` | `MetaLine` | `items: string[]`, `size`, `tone` |
| `empty` | `EmptyState` | `title`, `description`, `action?: ButtonLeaf`, `actions` (EmptyState data), `size`, `layout`, `align` |
| `banner` | `Banner` | `variant`, `title`, `message`, `action?: ButtonLeaf`, `onDismiss`, `layout`, `accent` |
| `list` + `variant: 'grouped'` | `GroupedList` | `groups`, `rows`, `onOpenRow`, `currentId`, `rowMenu`, … |
| `list` + `variant: 'action-rows'` | `ActionRowList` | `items`, `onOpen`, `columns`, `striped`, `footer?: ButtonLeaf`, `aria-label` |
| `form` | `Stack` of `FormField`s | `fields: FormFieldSpec[]` (below) |
| `tabs` | `Tabs` + `TabPanel` | `label`, `items: { id, label, badge?, disabled?, content: LeafList }[]`, `value`/`onValueChange` (optional), `variant`, `size` |
| `chart` + `type: 'sparkline'` | `TrendSparkline` | `points`, `label` (accessible name), `yMin`, `yMax`, `width`, `height`, `showFill`, `showLastPoint` |
| `activity` | `WorkActivityList` | `events`, `title`, `limit`, `group`, `loading`, `error` |
| `search` | `SearchInput` | `value`, `onChange`, `placeholder`, `aria-label`, `collapsible` (header search), `size` |
| `custom` | anything | `render: () => ReactNode`, **`reason` (required)** |

Form fields share `label`, `hint`, `error`, `required`, `disabled`, and pick a
control:

| `control` | Component | Value |
|---|---|---|
| `input` | `Input` | `value: string`, `onChange(value)`, `type`, `placeholder` |
| `textarea` | `Textarea` | `value: string`, `onChange(value)`, `rows` |
| `select` | `Select` | `value: string`, `onChange(value)`, `options`, `searchable` |
| `number` | `NumberInput` | `value: number \| undefined`, `onChange(value)`, `min`, `max`, `step`, `unit` |
| `checkbox` | `Checkbox` | `checked`, `onChange(checked)` |
| `toggle` | `Switch` | `checked`, `onChange(checked)` |

The chart kind is the sparkline only: the full charts (`LineChart`, `BarChart`)
need the optional `recharts` peer, so use them through a registered kind.

## Markers

- The template root carries `data-page-spec="<template>"` beside its own
  `data-page-template`.
- Each leaf carries `data-spec-leaf="<kind>"`: on the component itself when it
  forwards attributes (`button`, `text`, `form`), otherwise on a
  `display: contents` wrapper (marked `data-ui-part`) that takes no box.
- A `custom` leaf's wrapper also carries `data-page-spec-custom="<reason>"`,
  so an audit can list every escape hatch on a page.

## Your own leaf kinds

Prefer a registered kind to `custom`. Declare its props on
`PageSpecLeafKinds`, then provide the component; the kind is then a typed
member of `LeafSpec`.

```tsx
declare module '@connorhoehnslalom/ui-components/shared' {
  interface PageSpecLeafKinds {
    'cost-meter': { spent: number; budget: number };
  }
}

// Globally (returns an unregister function)…
registerLeafKind('cost-meter', CostMeter);
// …or for a subtree, which wins over the global registry.
<PageSpecProvider leaves={{ 'cost-meter': CostMeter }}>…</PageSpecProvider>
```

The component receives the leaf's fields plus `kind` and `data-spec-leaf`;
put `data-spec-leaf` on its root. Built-in kinds cannot be replaced (both
calls throw). An unregistered kind renders nothing and logs an error.

## Composing

`renderLeaf(leaf)`, `renderLeaves(list)`, `renderSection(section)` and
`renderSections(list)` return elements for a JSX page that wants spec
leaves inside a hand-composed template; `<SpecLeaf leaf={…} />` is the
component form. Use the JSX templates directly only for what a spec cannot
express.
