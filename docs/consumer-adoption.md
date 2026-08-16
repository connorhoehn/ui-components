# Consumer adoption guide

> Cheatsheet for picking the right `@connorhoehnslalom/ui-components` primitive for
> the page you're building. Pairs with the surfaces table in
> [`README.md`](../README.md) and the entry-points table in
> [`CLAUDE.md`](../CLAUDE.md).

The global rule (from `~/.claude/CLAUDE.md`):

> Frontend pages, demos, examples, or showcases are **not complete** unless
> they use ui-components shells/composites + `realtime-modules/client` hooks +
> the `integrations/realtime-modules` adapters where they fit. Never ship
> hand-rolled HTML/CSS/inline styles in any page or demo.

If a needed primitive doesn't exist, **stop and ship the primitive to
ui-components first**, then use it. Do not inline a one-off; the whole point
of the library is to absorb that complexity. See
[Missing primitive workflow](#missing-primitive-workflow) at the bottom.

---

## Composite index — the 12 you'll reach for first

These are the highest-leverage composites in the library. Reach for them
before reaching for `<div>`. All importable from the root unless noted.

| Composite | Use for | Subpath if needed |
|---|---|---|
| `AppShell` | The outer chrome of any logged-in app: sidebar + topbar + content area. | `/layout` |
| `AppLayout` | The room-shaped variant (rooms sidebar + presence + nested content). | `/layout` |
| `CollapsibleSidebar` | Standalone sidebar with persisted collapsed state. | `/layout` |
| `PageHeader` | Title + subtitle + actions + breadcrumbs strip at the top of any page. | `/shared` or root |
| `ChannelHeader` | Channel/room title bar with presence + actions for chat/hangout surfaces. | `/shared` or root |
| `ChatPanel` | Full chat surface: message list, composer, attachments, typing indicator. | `/social` or root |
| `PresenceAvatars` | Stacked overlapping avatars with overflow count + online ring. | `/shared` or root |
| `NotificationCenter` | Bell + flyout with unread count, list, mark-all-read. | `/shared` or root |
| `FileUploadDrop` | Drag-drop zone with file-type/size constraints and a progress list. | `/shared` or root |
| `HangoutLayout` | Auto/spotlight participant grid for a live call. | `/video` or root |
| `CallWidget` | Self-contained call surface (controls + tiles + chat). | `/video` or root |
| `CommandPalette` | Cmd-K command palette with registry hook + per-command hotkeys. | `/shared` or root |

For the full surface map (every export, stability rating, intended consumer)
see the **Surfaces** table in [README](../README.md#surfaces) and the entry-
points table in [CLAUDE.md](../CLAUDE.md).

---

## Decision tree — "I need…"

```
I need…
│
├── a chrome for the whole app
│   └── <AppShell> — pass `sidebar`, `topbar`, `commandPalette`, children.
│
├── a chrome for a hangout/room app (rooms sidebar visible)
│   └── <AppLayout> — adds the rooms section + presence rail.
│
├── a title row at the top of a page
│   └── <PageHeader> — title, subtitle, actions, breadcrumbs.
│
├── a title row above a channel/room
│   └── <ChannelHeader> — adds presence avatars + channel-specific actions.
│
├── breadcrumbs alone (no title bar)
│   └── <Breadcrumbs>
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
├── a data table (sortable rows)
│   └── <DataTable columns={...} rows={...} />
│
├── a tabs strip
│   └── <Tabs value={...} onChange={...} items={...} />
│
├── a typing indicator (3 bouncing dots)
│   └── <TypingIndicator users={['Alice', 'Bob']} />
│
├── an error/loading/empty state
│   ├── error  → <ErrorState>
│   ├── loading → <LoadingState>
│   └── empty  → <EmptyState>
│
├── a code block (syntax-highlit)
│   └── <CodeBlock language="ts" code={...} />
│
├── a documentation shell (sidebar + topnav + content)
│   └── <DocsShell> from /layout
│
└── a settings page (left rail of section links + right pane)
    └── <SettingsLayout> from /layout
```

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
import { PageHeader, Button } from '@connorhoehnslalom/ui-components';

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
import { PresenceAvatars } from '@connorhoehnslalom/ui-components';

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
import { ChatPanel } from '@connorhoehnslalom/ui-components';

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

1. Confirm the gap. Search the surfaces table in [README](../README.md), the
   entry-points table in [CLAUDE.md](../CLAUDE.md), and the
   `src/components/**` tree. Maybe it's there under a different name.

2. File a hub task in the `ui-components` queue describing:
   - the composite you need,
   - the props you'd want it to accept,
   - which consumer page it unblocks.

3. Pause the consumer-side work on this primitive. Pick up a different task
   while the primitive is shipped. (Per the global rule, do not inline a
   one-off "just for now" — there is no "for now.")

4. When the primitive lands in `ui-components`, bump your consumer pin and
   come back. The composite-first version is almost always smaller, more
   accessible, and easier to test.

---

## Versioning & compatibility

- Every release-worthy change bumps the package version (`patch` for
  bugfix/internal/tests, `minor` for additive public API, `major` for
  breaking). Consumers should pin against a specific version.
- Breaking changes to stable subpaths (`/`, `/shared`, `/layout`, `/social`,
  `/video`, `/identity`, `/hooks`, `/styles.css`,
  `/integrations/realtime-modules`) require a handoff to every consumer
  before landing.
- In-flux subpaths (`/doc-editor`, `/pipelines`, `/agents`, `/observability`,
  `/ingest`) may change shape between minors — pin to a minor and read the
  changelog before bumping.

---

## See also

- [`README.md`](../README.md) — surfaces table, install, dev loop.
- [`CLAUDE.md`](../CLAUDE.md) — full exports map, no-touch list, hard rules.
- [`docs/AUTONOMY_CHARTER.md`](AUTONOMY_CHARTER.md) — release-cadence and
  per-task LOC cap for autonomous contributors.
- [`docs/integrations-realtime-modules.md`](integrations-realtime-modules.md)
  — adapter prop-shape contract for the `/integrations/realtime-modules`
  subpath.
- [`ROADMAP.md`](../ROADMAP.md) — the 5-wave plan for current work.
