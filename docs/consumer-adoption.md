# Consumer adoption guide

> Cheatsheet for picking the right `@connorhoehnslalom/ui-components` primitive for
> the page you're building. Every exported component, with its import path,
> is in [`COMPONENT_INDEX.md`](COMPONENT_INDEX.md) (generated, never stale);
> the surfaces table is in [`README.md`](../README.md#surfaces). Both ship in
> the package, so an agent working in a consumer repo can read them from
> `node_modules/@connorhoehnslalom/ui-components/`.

The rule of thumb: build pages from the library's shells and composites,
the `realtime-modules/client` hooks, and the `integrations/realtime-modules`
adapters where they fit, rather than hand-rolled HTML, CSS or inline styles.

If a needed primitive doesn't exist, add it to ui-components and then use it
instead of inlining a one-off; the point of the library is to absorb that
complexity. See [Missing primitive workflow](#missing-primitive-workflow) at
the bottom.

**Import paths.** Import from the subpath that
[`COMPONENT_INDEX.md`](COMPONENT_INDEX.md) names for each component, usually
`/shared`. Since 2.506.0 the layout components (`AppShell`,
`CollapsibleSidebar`, `DocsShell`, `SettingsLayout`) are on `/shared` too;
only `AppLayout` is root-only. There is no `/layout` subpath.

---

## Step 1 — pick the page archetype

Almost every routed page is one of these. Start from the template, not from
a `<div>`: the template owns the header, gutters, width, section spacing and
the empty/loading states, so the page supplies only data and handlers. The
[canonical choices](COMPONENT_INDEX.md#canonical-choices) table at the top of
the index has the "don't use for" notes for each.

| The page is… | Use | Notes |
|---|---|---|
| any page at all | `PageFrame` | The outer frame; every template below is built on it. Use it directly only when no archetype fits. |
| a list / collection of things | `CollectionPage` | Title + `CollectionToolbar` (search, filters, summary, refresh) + your `DataTable` or card grid. |
| a list with a detail panel beside it | `MasterDetailPage` | Selection on the left, the selected record on the right, narrow-screen fallback included. If each row opens its own route instead, use `CollectionPage` + `DetailPage`. |
| one record's detail | `DetailPage` | Title/status/actions header, then **tabs** for the record's facets. Use `DetailSection` inside a tab; don't stack a column of `Card`s. |
| a dashboard | `DashboardPage` (`/shared`) | KPI row (`KPIGrid` / `StatCard`) + panel grid. The `/observability` `DashboardPage` is the cluster dashboard, a different component. |
| settings | `SettingsPage` | Section rail + settings rows; `SettingsLayout` is the lower-level shell. |
| documentation | `DocsShell` | Sidebar + top nav + content. |

The whole app sits in one `<AppShell>` (pass `layout="fill"` when the content
must fill the viewport, as canvases, chat and editors do). Pages render inside
it; a page never renders its own shell.

## Step 2 — pick the pieces inside the page

```
Inside the page I need…
│
├── a title row
│   ├── page title → <PageHeader> (templates render it for you)
│   ├── above a channel/room → <ChannelHeader> (presence avatars + actions)
│   └── breadcrumbs alone → <Breadcrumbs>
│
├── sections and separators
│   ├── a titled section of a page → <PageSection> (size lg/md/sm)
│   ├── a titled block in a drawer / detail tab → <DetailSection> (`first` on the first one)
│   └── a hairline between blocks → <Divider> (optional `label`)
│
├── tabular data
│   ├── almost always → <DataTable columns={...} data={...} keyField="id" />
│   ├── custom cell layout DataTable can't express → Table / TableHead / TableBody / TableRow / TableTh / TableTd
│   └── identity admin (users, groups, roles) → <EntityTable>
│
├── a tabs strip → <Tabs value={...} onChange={...} items={...} />
│
├── buttons → <Button variant="primary|secondary|ghost|danger|…">, always with an explicit variant;
│             icon-only → <IconButton aria-label=…>
│
├── form controls → Input, Select, Textarea, NumberInput, RadioGroup, Checkbox,
│                   Slider, ColorInput, Switch, inside <FormField> for label/help/error
│
├── an error/loading/empty state
│   ├── error  → <ErrorState>
│   ├── loading → <LoadingState>
│   └── empty  → <EmptyState>
│
├── a chat surface (messages + composer)
│   ├── with hook wiring (useChat + usePresence from realtime-modules)
│   │   └── <WrappedChatPanel chat={useChat(channel)} presence={usePresence(channel)} />
│   └── pure / your own state
│       └── <ChatPanel messages={...} onSend={...} />
│
├── a presence rail (who's here)
│   ├── with hook wiring (usePresence from realtime-modules)
│   │   └── <WrappedPresencePanel presence={usePresence(channel)} />
│   ├── just stacked avatars
│   │   └── <PresenceAvatars users={...} maxVisible={5} />
│   └── one user dot
│       └── <PresenceDot status="online" />
│
├── a notification bell + flyout
│   ├── with hook wiring (useNotifications)
│   │   └── <WrappedNotificationCenter notifications={useNotifications()} />
│   └── pure
│       └── <NotificationCenter ... />
│
├── a file upload zone
│   ├── with hook wiring (useFileUpload)
│   │   └── <WrappedFileUploadDrop fileUpload={useFileUpload(channel)} />
│   └── pure
│       └── <FileUploadDrop onFiles={...} />
│
├── a video call surface
│   ├── full call widget (chat + controls + tiles)
│   │   └── <CallWidget ... />
│   ├── participant grid only (no chat)
│   │   └── <HangoutLayout participants={...} localParticipant={...} />
│   ├── with hook wiring (useVideoHangout)
│   │   └── <WrappedHangoutLayout hangout={useVideoHangout(channel)} localClientId={...} />
│   └── a single tile
│       └── <ParticipantTile participant={...} />
│
├── a rooms sidebar (hangout rooms)
│   └── <HangoutRoomsSection rooms={useHangoutRooms()} occupancyFor={...} />
│
├── a command palette (Cmd-K)
│   ├── shell-level (one provider, many pages register commands)
│   │   ├── Wrap once: <CommandPaletteProvider commands={...}>
│   │   ├── Mount once: <AppShell commandPalette={<CommandPalette />} />
│   │   └── Per page: useRegisterCommand({ id, label, run, hotkey? })
│   └── standalone (no shell)
│       └── <CommandPaletteProvider> + <CommandPalette /> + <CommandPaletteHint />
│
├── a connection status pill
│   ├── with hook wiring (useGateway or useWebSocket)
│   │   └── <WrappedConnectionPill ... />
│   └── pure
│       └── <ConnectionPill state="online" />
│
├── a typing indicator (3 bouncing dots)
│   └── <TypingIndicator users={['Alice', 'Bob']} />
│
├── a code block (syntax-highlit)
│   └── <CodeBlock language="ts" code={...} />
│
└── anything else
    └── search COMPONENT_INDEX.md by job before writing markup
```

Hook-wired components come from
`@connorhoehnslalom/ui-components/integrations/realtime-modules`; everything
else in the tree imports from the subpath the index names (usually `/shared`).

## Composite index — the 12 you'll reach for first

The highest-leverage composites below the page templates. Import each from
its subpath; the root works too but pulls every optional peer into the bundle.

| Composite | Use for | Also on subpath |
|---|---|---|
| `AppShell` | The outer chrome of any logged-in app: sidebar + topbar + content area. | `/shared` |
| `AppLayout` | The room-shaped variant (rooms sidebar + presence + nested content). | none (root-only) |
| `CollapsibleSidebar` | Standalone sidebar with persisted collapsed state. | `/shared` |
| `PageHeader` | Title + subtitle + actions + breadcrumbs strip at the top of any page. | `/shared` |
| `ChannelHeader` | Channel/room title bar with presence + actions for chat/hangout surfaces. | `/shared` |
| `ChatPanel` | Full chat surface: message list, composer, attachments, typing indicator. | `/social` |
| `PresenceAvatars` | Stacked overlapping avatars with overflow count + online ring. | `/shared` |
| `NotificationCenter` | Bell + flyout with unread count, list, mark-all-read. | `/shared` |
| `FileUploadDrop` | Drag-drop zone with file-type/size constraints and a progress list. | `/shared` |
| `HangoutLayout` | Auto/spotlight participant grid for a live call. | `/video` |
| `CallWidget` | Self-contained call surface (controls + tiles + chat). | `/video` |
| `CommandPalette` | Cmd-K command palette with registry hook + per-command hotkeys. | `/shared` |

For every other export see [`COMPONENT_INDEX.md`](COMPONENT_INDEX.md).
---

## Before / after — three real refactors

Real examples from the rule above. Each "before" is the kind of hand-rolled
JSX consumer codebases tend to accumulate; each "after" is the canonical
ui-components-first replacement.

### 1. Page header

Hand-rolled page headers are the single most common violation: a `<div>`
with a flex row, an `<h1>` with inline font sizing, maybe a subtitle below,
and a button on the right. We saw this pattern get refactored in commit
`f264d3c` ("PageHeader swap") on the websocket-gateway side — same swap
applies anywhere.

**Before** (hand-rolled, inline styles):

```tsx
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
  <div>
    <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Sessions</h1>
    <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>
      Active and recent video sessions across the workspace.
    </p>
  </div>
  <button onClick={onNewSession} style={{ background: '#3b82f6', color: '#fff', padding: '8px 14px', borderRadius: 6 }}>
    New session
  </button>
</div>
```

**After** (ui-components composites + Tailwind tokens):

```tsx
import { PageHeader, Button } from '@connorhoehnslalom/ui-components/shared';

<PageHeader
  title="Sessions"
  subtitle="Active and recent video sessions across the workspace."
  actions={
    <Button variant="primary" onClick={onNewSession}>
      New session
    </Button>
  }
/>
```

Why it matters: theme tokens automatically follow the workspace's color
scheme, the spacing matches every other page in the app, and a future
change to "page header layout" lands in one place instead of N.

---

### 2. Presence avatars

Hand-rolled avatar circles show up next: a flex row with N `<div>` circles
sized in pixels and colored from initials. They never quite match — and
they break when the third user has the same initial as the first.

**Before:**

```tsx
<div style={{ display: 'flex', marginLeft: 8 }}>
  {users.slice(0, 5).map((u, i) => (
    <div
      key={u.id}
      style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: ['#3b82f6', '#22c55e', '#f59e0b', '#ec4899', '#a855f7'][i % 5],
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        marginLeft: i === 0 ? 0 : -8,
        border: '2px solid white',
      }}
    >
      {u.name.charAt(0)}
    </div>
  ))}
  {users.length > 5 && (
    <span style={{ marginLeft: 8, color: '#64748b', fontSize: 12 }}>
      +{users.length - 5}
    </span>
  )}
</div>
```

**After:**

```tsx
import { PresenceAvatars } from '@connorhoehnslalom/ui-components/shared';

<PresenceAvatars users={users} maxVisible={5} size={24} />
```

What you get for free: avatar fallback (initials → color hash → image URL
when present), the online ring derived from `users[i].online`, accessible
labels, and `+N` overflow with consistent spacing.

If the page wires `usePresence(channel)` from realtime-modules, prefer the
adapter — `<WrappedPresencePanel presence={usePresence(channel)} />` — so
the prop translation lives in one place.

---

### 3. Chat row composer

Hand-rolled chat surfaces have the worst per-page churn: every page rebuilds
the message list, the composer, the typing indicator, the optimistic-send
ordering. The library has a single component for it.

**Before** (a paragraph of message rows + a textarea):

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  {messages.map((m) => (
    <div key={m.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <div style={avatarStyle}>{m.author.charAt(0)}</div>
      <div>
        <strong style={{ fontSize: 13 }}>{m.author}</strong>
        <p style={{ margin: 0, fontSize: 14 }}>{m.body}</p>
      </div>
    </div>
  ))}
</div>
<form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
  <textarea
    value={draft}
    onChange={(e) => setDraft(e.target.value)}
    style={{ flex: 1, padding: 8, border: '1px solid #cbd5e1', borderRadius: 6 }}
  />
  <button type="submit" style={primaryButtonStyle}>Send</button>
</form>
```

**After** (pure):

```tsx
import { ChatPanel } from '@connorhoehnslalom/ui-components/social';

<ChatPanel
  messages={messages}
  currentUserId={meId}
  onSend={handleSend}
/>
```

**After** (with realtime-modules hooks):

```tsx
import { WrappedChatPanel } from '@connorhoehnslalom/ui-components/integrations/realtime-modules';
import { useChat, usePresence } from '@connorhoehn/realtime-modules/client';

<WrappedChatPanel
  chat={useChat(channel)}
  presence={usePresence(channel)}
/>
```

The adapter handles the `message → content` field rename, derives the
typing indicator from the presence roster, and adds keyboard / a11y polish
the hand-rolled version doesn't get.

---

## When in doubt: prefer the adapter, then the pure composite, then ship a new primitive

A short hierarchy, in priority order:

1. **Use the realtime-modules adapter** if you're wiring a realtime hook
   (`useChat`, `usePresence`, `useReactions`, `useFileUpload`,
   `useVideoHangout`, `useNotifications`, `useHangoutRooms`, etc.). The
   adapter handles the prop-shape translation so consumer pages don't
   re-implement it.

2. **Use the pure composite** if you have your own state source (mocks,
   tests, server-rendered snapshot, or a non-realtime-modules backend).
   Pass props directly.

3. **Use a smaller atom** if you only need one piece — `PresenceDot`
   instead of `PresenceAvatars`, `Avatar` instead of either, `Button`
   instead of a styled `<button>`.

4. **Ship a new primitive** if none of the above fit. See below.

---

## Missing primitive workflow

If you find yourself thinking *"there's no `<X>` for this; I'll just inline
it here"* — **stop**. The hand-rolled version solves the problem once;
adding `<X>` to ui-components solves it forever, for every consumer.

1. Confirm the gap. Search [`COMPONENT_INDEX.md`](COMPONENT_INDEX.md) by
   job (it lists every exported component, grouped), then the surfaces table
   in [README](../README.md#surfaces). Maybe it's there under a different name.

2. Raise it with the ui-components maintainers (an issue or a handoff note)
   describing:
   - the composite you need,
   - the props you'd want it to accept,
   - which consumer page it unblocks.

3. Pause the consumer-side work on this primitive until it ships. Avoid
   inlining a one-off "just for now"; it tends to stay.

4. When the primitive lands in `ui-components`, bump your consumer pin and
   come back. The composite-first version is almost always smaller, more
   accessible, and easier to test.

---

## Versioning & compatibility

- Every release-worthy change bumps the package version (`patch` for
  bugfix/internal/tests, `minor` for additive public API, `major` for
  breaking). Consumers should pin against a specific version.
- Breaking changes to stable subpaths (`/`, `/shared`, `/social`, `/video`,
  `/identity`, `/hooks`, `/styles.css`, `/integrations/realtime`,
  `/integrations/realtime-modules`) require a handoff to every consumer
  before landing. (There is no `/layout` subpath; layout
  components are on `/shared`, except root-only `AppLayout`.)
- `/doc-editor` and `/pipelines` are frozen public API (since 2026-06-10):
  breaking changes need a major bump and a consumer handoff.
- In-flux subpaths (`/compute`, `/observability`, `/ingest`) may change shape
  between minors — pin to a minor and read the changelog before bumping.

---

## See also

- [`COMPONENT_INDEX.md`](COMPONENT_INDEX.md) — every exported component,
  grouped by job, with its import path and Storybook id.
- [`README.md`](../README.md) — surfaces table, install, dev loop.
- [`patterns/`](../patterns/README.md) — integration patterns (WebSocket
  provider, auth, theming, custom renderers).
- [`docs/integrations-realtime-modules.md`](integrations-realtime-modules.md)
  — adapter prop-shape contract for the `/integrations/realtime-modules`
  subpath.
- `skills/ui-page-build/SKILL.md` and `skills/ui-dom-audit/SKILL.md` in the
  package — building a page from the templates, and auditing the result.
- Maintainer docs (repo only, not in the package):
  [`CLAUDE.md`](https://github.com/connorhoehnslalom/ui-components/blob/main/CLAUDE.md) (exports map, no-touch list, hard
  rules) and [`CONTRIBUTING.md`](https://github.com/connorhoehnslalom/ui-components/blob/main/CONTRIBUTING.md).

## Collection and composer inheritance

Use `DensityProvider density="compact"` around the real application shell,
not only test fixtures. Button, IconButton, Input, Select, SearchInput,
DropdownMenu and FilterChip inherit density when size is omitted. Explicit
sizes remain available for intentional exceptions and use the same metrics.

`CollectionPage` owns title/toolbar/content spacing. Pass search state,
filters, summary, notices and actions through its `toolbar` prop. It uses
`CollectionToolbar`, which can also be used by reusable domain collections.
Actions are named icon buttons with tooltips; filter fields live in one
popover; long explanatory notices live behind an information button. Keep
blocking errors and action-required warnings visible in page content.

```tsx
<CollectionPage title="Runs" toolbar={{
  label: 'Run filters',
  search: { value: query, onChange: setQuery, 'aria-label': 'Search runs' },
  summary: `${rows.length} runs`,
  onRefresh: refresh,
  refreshing: loading,
}}>
  <DataTable data={rows} columns={columns} keyField="id" />
</CollectionPage>
```

### Search lives in the header; empty collections draw no result chrome (2.503.0)

- **Search is collapsed by default.** `CollectionToolbar` draws its search as
  a search icon that expands on click or `/` and folds away on Escape/blur
  while empty (`SearchInput collapsible`). It sits at the row's trailing end
  with the filters, never as a full-width bar. Opt out with
  `search: { collapsible: false }` only when searching IS the page's task.
- **The toolbar goes in the header.** `CollectionPage` hosts a toolbar's
  search, filters and count in the header actions row, before
  `headerActions`, whenever nothing in it needs a full row (no `selection`,
  no `children`). Do not render a search band between the header and the
  collection; `toolbarPlacement="band"` is the explicit exception.
- **Count and pagination only when there are results — on every page.** Pass
  `resultCount` with `summary` so "0 of 0 artworks" never draws; the library
  pagers (`DataTable pageSize`, `ChangeReviewList`, `DocumentListPage`)
  render only when there is more than one page. With zero items the empty
  state replaces count, pager and search band. Never hand-roll a count
  `<p>`. The DOM audit enforces this as `collection.empty-chrome`.

A simple `DataTable searchable` uses CollectionToolbar internally. Do not add
another search toolbar above it. Consumers own fetching, permission checks,
row schemas, filtering and navigation; the library owns visual policy.

`ComposerSurface` owns the full-width shelf background, insets, particle
motion and readable composer width. Wrap the whole composer shelf, including
any dock content; nested surfaces reuse their ancestor without doubling the
background. `ChatPanel contentAlign="start"` aligns a conversation from the
top when a separate page composer owns the input; the default is end-aligned.
Do not reproduce these rules with selectors targeting test IDs.

Shared geometry tokens: `--ui-control-sm/md/lg`, `--ui-page-gutter`,
`--ui-content-gutter`, `--ui-section-gap`, `--ui-table-inset`,
`--ui-table-row`, and `--ui-composer-max-width`. Change their defaults in the
library rather than repeating page-specific padding and control heights.

## Side panes are a glance, not a document

A `SidePane` (the right inspector) that stacks every facet of a record
becomes a long scroll. Split facets into the pane's own tabs (`tabs`, `value`,
`onValueChange`; `PaneHeader` draws them) — for a work item, Definition and
Activity — and give each tab one heading, not a heading plus a flag that
repeats it.

`WorkActivityList` is compact by default: consecutive identical events
collapse into one row with a count (`group`, default on; pass a key function
or `false`), events flagged `lowSignal` or matched by `isLowSignal` stay hidden
behind "Show all events" (`defaultShowAll` to start expanded), only `limit`
rows (5) show before "Show N more" (`limit={null}` for all), and a relative
time equal to the row above is not repeated (`repeatTimes` to print it).

The DOM audit's `pane.vertical-budget` rule flags a `[data-ui-pane]` whose
content exceeds 2.5 times its visible height, or that lists four or more
consecutive identical rows.

