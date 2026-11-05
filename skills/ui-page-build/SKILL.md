---
name: ui-page-build
description: Build or change any page, view, route, screen, panel, table or form in a frontend that uses @connorhoehnslalom/ui-components (also aliased as @connorhoehn/ui-components). Load before writing JSX: it picks the page template (PageFrame, CollectionPage, MasterDetailPage, DetailPage, DashboardPage, SettingsPage, SectionLayout), the components, tokens and realtime-modules hooks, enforces the portal density rules (one viewport, tabs instead of stacked cards, striped tables, separated groups, explicit Button variants), and ends with lint plus the ui-dom-audit check on the changed route.
---

Compose pages from the library. Never hand-roll a page, table, control or
section: the DOM audit cannot measure DOM the library did not render, and its
`element.unmarked` rule fails it.

## 0. Read the index first

Before writing JSX, read `node_modules/@connorhoehnslalom/ui-components/docs/COMPONENT_INDEX.md`
(or `llms.txt` beside it): every export, its subpath and purpose. Prop names
here are a starting point; the index and `dist/*.d.ts` are authoritative.

## 1. Pick the template by archetype

Every page starts from exactly one template (each emits
`data-page-template="<Name>"`). Import from
`@connorhoehnslalom/ui-components/shared` (or the root). Put it inside the
app's one `AppShell` (a root-only import: there is no `/layout` subpath); use
`AppShell layout="fill"` (no document scroll) so the template's body owns
scrolling.

| Archetype | Template | Not this |
| --- | --- | --- |
| A list of records (runs, users, files) | `CollectionPage` | A heading over a raw `<table>` |
| A list plus the selected record beside it (or an overview while nothing is selected) | `MasterDetailPage`; `body="docked"` when the overview or record docks a composer at the column bottom | Two hand-made columns, a drawer per row, a local `ListRailLayout` + `DockedColumn` shim |
| One record with several facets | `DetailPage` (DetailHeader + Tabs) | A stack of cards, one per facet |
| Numbers and summary panels | `DashboardPage` | A grid of hand-sized divs |
| Preferences grouped by topic | `SettingsPage` | One long form |
| Anything else (a canvas, an editor, a wizard) | `PageFrame` | A page-level `<div className="p-6">` |
| A section page whose trail carries controls, or whose composer docks at the bottom | `PageFrame` with `trailControls` / `collapsed` / `body="docked"` | A hand-made `ScopeHeader` + `DockedColumn` shim |
| The frame around the pages of a sectioned area (section rail, optional list rail) | `SectionLayout` (wraps the page; the page is one of the above, or `header` draws its column) | `SubNavLayout` + `ListRailLayout` + `ViewportFillRegion` + `DockedColumn` composed by hand |

Title level: every template's title is the page `h1` by default; pass
`titleAs="h2"` only when a host above it already draws the page heading.
Templates emit the DOM-audit markers themselves (`data-page-column`,
`data-page-trail`, `data-page-title`, `data-page-body`); never re-add them on
a page.

**Collection**

```tsx
import { CollectionPage, DataTable, Button } from '@connorhoehnslalom/ui-components/shared';

export function RunsPage({ runs, loading, error, query, setQuery, onOpen, onNew }: RunsPageProps) {
  return (
    <CollectionPage
      title="Runs"
      gutter="page"
      headerActions={<Button variant="primary" onClick={onNew}>New run</Button>}
      toolbar={{ label: 'Run controls', search: { value: query, onChange: setQuery, placeholder: 'Search runs' } }}
      loading={loading}
      error={error}
      empty={{ title: 'No runs yet' }}
      table={{
        data: runs,
        keyField: r => r.id,
        columns: [{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }],
        onRowClick: r => onOpen(r.id),
      }}
    />
  );
}
```

Pass the rows as `table` (DataTableProps): the template renders a striped
`DataTable`, its skeleton while `loading`, and `empty` when `data` is empty.
Use `children` (a `DataTable`, cards) only when the body is not one table,
with `isEmpty` for its empty state. `CollectionPage` is the one template whose
`gutter` defaults to `none`; new pages pass `gutter="page"`. Rows open a routed
record page (`onRowClick` navigates). A table with nothing to open declares
`staticRows="<reason>"`.

**Master-detail**

```tsx
import { MasterDetailPage, EmptyState } from '@connorhoehnslalom/ui-components/shared';

export function TeamsPage({ teams, selected, onSelect }: TeamsPageProps) {
  return (
    <MasterDetailPage
      title="Teams"
      list={{ label: 'Teams', title: 'Teams', count: teams.length, body: <TeamRail teams={teams} selected={selected} onSelect={onSelect} /> }}
      emptyDetail={<EmptyState title="Select a team" />}
    >
      {selected && <TeamDetail team={selected} />}
    </MasterDetailPage>
  );
}
```

Build the rail body from a library list (`GroupedList`, `RailNavList`), never `<ul>` + buttons.

A catalog that shows an overview while nothing is selected and docks that
overview's command composer at the column bottom takes `body="docked"`: the
overview goes in `emptyDetail` with its composer wrapped in `ColumnDock` (or
pass the composer as `footer`), exactly as with `PageFrame body="docked"`.
`dockedBody="fill"` makes the body a fixed frame for a conversation.

**Detail (tabs, not stacked cards)**

```tsx
import { DetailPage, PageSection, StatusPill, Button } from '@connorhoehnslalom/ui-components/shared';

export function RunPage({ run, tab, setTab, onRetry }: RunPageProps) {
  return (
    <DetailPage
      title={run.name}
      badge={<StatusPill state={run.tone} label={run.statusLabel} />}
      actions={<Button variant="secondary" onClick={onRetry}>Retry</Button>}
      activeTab={tab}
      onTabChange={setTab}
      tabs={[
        { id: 'overview', label: 'Overview', content: <PageSection title="Summary"><RunSummary run={run} /></PageSection> },
        { id: 'steps', label: 'Steps', content: <StepsTable steps={run.steps} /> },
        { id: 'logs', label: 'Logs', content: <RunLogs runId={run.id} /> },
      ]}
    />
  );
}
```

**Dashboard**

```tsx
import { DashboardPage } from '@connorhoehnslalom/ui-components/shared';

export function OverviewPage({ totals, spend, failures }: OverviewProps) {
  return (
    <DashboardPage
      title="Overview"
      stats={[{ label: 'Runs', value: totals.runs }, { label: 'Failed', value: totals.failed, tone: 'danger' }]}
      panels={[
        { id: 'spend', title: 'Spend', content: <SpendChart data={spend} /> },
        { id: 'failures', title: 'Recent failures', span: 2, content: <FailuresTable rows={failures} /> },
      ]}
    />
  );
}
```

**Settings**

```tsx
import { SettingsPage } from '@connorhoehnslalom/ui-components/shared';

export const AccountSettings = () => (
  <SettingsPage title="Settings" sections={[
    { id: 'profile', label: 'Profile', content: <ProfileForm /> },
    { id: 'notifications', label: 'Notifications', content: <NotificationForm /> },
  ]} />
);
```

**Anything else**

```tsx
import { PageFrame, Button } from '@connorhoehnslalom/ui-components/shared';

export function DiagramPage({ diagram, onShare }: DiagramPageProps) {
  return (
    <PageFrame title={diagram.name} actions={<Button variant="secondary" onClick={onShare}>Share</Button>} body="fill">
      <DiagramCanvas diagram={diagram} />
    </PageFrame>
  );
}
```

**Sectioned area**

```tsx
import { SectionLayout, GroupedList, Select, useRailFold } from '@connorhoehnslalom/ui-components/shared';
import { NavLink } from 'react-router';

export function ObservabilityRuns({ runs, current, onOpen, env, setEnv, trail, sectionItems, composer }: RunsSectionProps) {
  const rail = useRailFold({ storageKey: 'observability.section-rail' });
  const listRail = useRailFold({ storageKey: 'observability.list-rail' });
  return (
    <SectionLayout
      title="Observability" items={sectionItems}
      renderNavItem={(item, body) => <NavLink to={item.path}>{body}</NavLink>}
      railFold={{ folded: rail.folded, onToggle: rail.toggle }}
      list={{ label: 'runs', title: 'Runs', count: runs.length,
        body: <GroupedList groups={groups} rows={runs} currentId={current?.id} onOpenRow={r => onOpen(r.id)} /> }}
      listFold={{ folded: listRail.folded, onToggle: listRail.toggle }}
      header={{ breadcrumbs: trail, title: 'Runs',
        trailControls: <Select aria-label="Environment" size="sm" value={env} onChange={e => setEnv(e.target.value)} options={envs} /> }}
      footer={composer}
    >
      {current && <RunRecord run={current} />}
    </SectionLayout>
  );
}
```

Without `header`, pass a page template as the child (`<PageFrame>`,
`<DetailPage>`): it draws its own trail and title, and `body="docked"` on a
`PageFrame` gives it the column-bottom dock.

## 2. Density rules (the portal contract)

- **One viewport at rest.** The page fits the screen without scrolling past
  about two viewports, with at most four rows of top-level sections. More
  facets go into `DetailPage` tabs or a `MasterDetailPage`, never another card
  under the last one. Only one long flow may scroll (a collection's rows, a
  document, a transcript). Audit: `page.vertical-budget`.
- **No stacked cards.** Do not wrap every group in a `Card`. A `Card` in a
  `Card` is noise; use `frameless` props (`DataTable`, `StatStrip`) inside a
  framed host.
- **Tables are striped.** Use `DataTable` (or `Table` for a static grid); both
  stripe by default. Do not turn striping off, and never build a table from
  divs. Audit: `table.zebra`.
- **Separate groups.** Adjacent groups get a divider or the section gap:
  `SectionStack` around a page's sections, `PageSection divided`, `Divider`, or the template's own spacing. Never stack
  two groups flush. Audit: `section.separator`.
- **Section headers.** A titled page section is `PageSection title=…`; the
  header row of a card or panel is `CardHeader` (title, actions, the rule under
  it), or `PaneHeader` when the pane has tabs. Never hand-draw a `border-b`
  header band. (`PanelHeader` is internal and not exported.)
- **The frame owns the gutter.** Do not put `p-*`, `px-*` or `mx-*` on a page
  wrapper; the template applies the page gutter (`gutter="page"`, the default
  everywhere except `CollectionPage`, which needs it passed). Audit:
  `content.gutter`.
- **Buttons.** Always pass `variant` explicitly (`primary`, `secondary`,
  `ghost`, `danger`, `danger-solid`, `success`, `info`, `link`). One `primary`
  per view; everything else is `secondary` or `ghost`. Icon-only actions use
  `IconButton` with an `aria-label`.
- **Forms.** Controls come from the forms family: `Input`, `Select`,
  `Textarea`, `NumberInput`, `RadioGroup`, `Checkbox`, `Slider`, `ColorInput`
  (root-only), `Switch`, `SearchInput` (`ToggleField` on `/pipelines`), with
  `FormField` for label, help and error. Never a raw `<input>`, `<select>` or
  `<textarea>`.
- **States.** Empty, loading and error use `EmptyState`, `LoadingState`,
  `ErrorState` (on a collection, `CollectionPage`'s `loading`, `error`,
  `onRetry` and `empty` props). An empty `PageSection` takes its `empty` prop:
  one row, not a heading over a paragraph.

## 3. Tokens, classes and styles

- No `style={{...}}`. A value computed at runtime (a drag position, a chart
  colour from data) is the only exception, and it belongs in the library
  component, not the page.
- Tailwind v4 classes through the design tokens only: `text-text-primary`,
  `bg-surface`, `bg-surface-panel`, `border-border`, `rounded-*`, `shadow-*`.
  Never a raw palette class (`bg-blue-500`) or an arbitrary value
  (`bg-[#fafbfc]`, `p-[13px]`).
- Status colour goes through the seven tones (`neutral`, `success`, `warning`,
  `danger`, `info`, `caution`, `accent`) via a component's `tone` prop. Need a
  new colour? Queue a tone; do not define a palette.
- Compose class names with the app's `cn()`/`clsx` helper; do not concatenate
  strings with conditionals inline.
- The ESLint plugin enforces most of this:
  `@connorhoehnslalom/ui-components/eslint-plugin` (`no-raw-controls`,
  `no-inline-style`, `no-arbitrary-token-values`, `button-explicit-variant`,
  `no-hand-rolled-separators`). Do not disable its rules with comments.

## 4. Realtime features

Use `@connorhoehn/realtime-modules/client` hooks (`useChat`, `usePresence`,
`useCRDT`, `useReactions`, `useActivity`, `useFileUpload`, `useVideoHangout`,
`useNotifications`, `useCapability`, `useFeatureFlag`, `useChannel`) and pass
their returns to the wrapped components from
`@connorhoehnslalom/ui-components/integrations/realtime-modules`:

```tsx
import { useChat, usePresence } from '@connorhoehn/realtime-modules/client';
import { WrappedChatPanel } from '@connorhoehnslalom/ui-components/integrations/realtime-modules';

const chat = useChat(channelId);
const presence = usePresence(channelId);
return <WrappedChatPanel chat={chat} presence={presence} />;
```

Also `WrappedPresencePanel`, `WrappedActivityPanel`, `WrappedFileUploadDrop`, `WrappedNotificationCenter`,
`WrappedHangoutLayout`, `CapabilityBoundary`. Never map hook state into hand-made lists.

**Package scope.** The library is `@connorhoehnslalom/ui-components` (some
frontends alias it as `@connorhoehn/ui-components`). Its realtime peer is
`@connorhoehn/realtime-modules`, a different repo that was never renamed. Do
not "fix" either scope; there is no slalom-scoped realtime-modules package.

## 5. When you cannot find a component

1. Search the index: `grep -i "<word>" node_modules/@connorhoehnslalom/ui-components/docs/COMPONENT_INDEX.md`
   (try synonyms: "rail", "list", "pane", "strip", "pill", "toolbar").
2. Search the typed JSDoc: `grep -l "<word>" node_modules/@connorhoehnslalom/ui-components/dist/*.d.ts`,
   then read the matching interface. Many props are documented only there.
3. Still missing: compose the closest library components, and add a row to the
   consumer's queue doc (aws-agentcore: `docs/ui-components-queue.md`) naming
   the primitive, why it is needed and where it is used. The library ships it;
   the page adopts it.

Never hand-roll the missing piece with raw elements and Tailwind, and never
copy a library component's source into the app.

## 6. Finish: lint and audit the changed route

1. Run the consumer's checks (aws-agentcore: `npm --prefix portal run typecheck`
   and its ESLint run with the ui-components plugin). Zero new warnings.
2. Run the [`ui-dom-audit`](../ui-dom-audit/SKILL.md) skill on the exact
   route you changed, both themes and the narrow width:

   ```bash
   npm --prefix portal run audit:ui -- --tenant <tenant> --path /<exact/route> --themes light,dark --widths 1440,900
   ```

3. Fix every finding at its owner: a page composition fix in the page, a
   library defect queued (step 5). Do not add exclusions, raise thresholds or
   add `data-ui-*` markers by hand to quiet a rule. Report the route, states
   and widths you measured; a narrow sweep is not a clean application.
