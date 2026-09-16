# Changelog

All notable changes to `@connorhoehnslalom/ui-components` will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [2.290.0] — 2026-09-16

### Changed — `./social`

- **A forwarded message says where it came from once.** The marker and the
  body were both saying it. The body keeps the sentence on the wire, because
  an old build, a notification preview and the conversation-list preview have
  no access to the metadata and would otherwise say nothing about whose words
  these are — so the panel strips it at RENDER time and lets the marker carry
  the origin instead. It strips only the exact line this message's own
  metadata would have produced, never a pattern: a person can type "Forwarded
  from…" themselves, and a forward of a forward keeps the inner one as the
  body's own words. Where it declines — the attribution is the whole body, or
  the message renders from `metadata.html` — the marker stays a bare badge, so
  the two halves can never both say it.

- **`AgentRunCard` is width-aware of itself.** The same card sits in a
  document's ~267px conversation and in a wide chat column; at the narrow end
  a progress row, an instruction, a status chip, a disclosure, two decision
  buttons and two links were competing for one line, leaving "1 …" and a pair
  of bare words. It is a `@container` now: the links drop below `@md` (the
  disclosure already offers both routes, so nothing becomes unreachable), the
  instruction takes a full line, and the decision buttons never shrink or
  hide, because they are the only part of the card asking for an action.

- **"run" and "document" became "Open run" and "Open document"**, underlined
  at rest. They were bare nouns styled as text that only underlined on hover —
  they did not say what they did, did not look like controls, and gave a
  screen-reader user a one-word name with no verb.

---

## [2.289.1] — 2026-09-16

### Fixed — `./social`, `./ui`

- **Forward's arrow was rendering as an emoji.** U+21AA has an emoji
  presentation and macOS picks it by default, so both the action-bar control
  and the "Forwarded" marker wore a full-colour ↪️ in a grey box among thin
  stroked glyphs. `ForwardIcon` joins the set. The lesson is worth keeping: a
  character looking like plain text in an editor says nothing about how a
  platform will draw it, which is why a glyph beats an arrow character here.

---

## [2.289.0] — 2026-09-16

### Added — `./social`

- **`ChatPanel.onForwardMessage`** — Forward, in the message's action menu.
  Teams has it; this had no way to move a message to another conversation
  except copying the words by hand and losing who said them. Absent, nothing
  renders and existing callers are unchanged. It is withheld from the rows
  that are records rather than somebody's words — a notice is not a thing you
  can relocate — for the same reason Reply and Pin already are.

---

## [2.288.0] — 2026-09-16

### Changed — `./doc-editor`

- **A suggestion an agent drafted is attributed to the PERSON who asked for
  it.** The card said "Haiku", which names the engine that ran rather than the
  person to talk to about the change — in a document with several
  collaborators, the least useful name available. It reads "Eve (powered by
  Haiku)" now, laid out by rank: the person on the author row, the model muted
  underneath. The person's name is the only thing that clips, and it clips in
  CSS with the full string still in the DOM, so a reader gets all of it and a
  hover gives it back. The model can never be what survives a narrow gutter.
  No new prop — the card splits the author string hosts already pass, because
  a prop would leave every host saying the wrong name until it re-pinned.

---

## [2.287.3] — 2026-09-16

### Fixed — `./video`

- A second `RecordingRow` test still asserted on the emoji removed in 2.287.2.

---

## [2.287.2] — 2026-09-16

### Changed — `./video`

- **A recording row's participant count no longer wears an emoji.** "4 👥" was
  a count with a picture of an icon beside it, and `UsersIcon` was already in
  the set. The badge gained a real title, so the count says what it counts.

---

## [2.287.1] — 2026-09-16

### Changed — `./social`

- **A post with no replies reveals its Reply on hover or focus** rather than
  wearing one permanently — Teams shows the reply and reaction affordances
  when you hover a message, and a Reply under every row is noise. Same gesture
  the message action bar already uses, and focus reveals it too, since a
  control that exists only under a pointer is unreachable by keyboard. A
  thread that already HAS replies keeps its Reply: there it labels a structure
  already on screen rather than advertising a hypothetical one.

---

## [2.287.0] — 2026-09-16

### Added — `./social`

- **`FeedRow`** — the row grammar four panels and a consuming page were each
  drawing by hand. It was a private `DigestRow` inside `ChannelViews`, used by
  Mentions / Files / Pinned / Documents, while the app's Activity feed mirrored
  it in a page. Leading slot, title with an optional right-aligned timestamp,
  meta line, optional trailing actions, the row as the jump. **Two lines,
  structurally**: `title` and `meta` are strings rather than nodes, and both
  truncate, so nothing a caller passes can produce a third. `leading` is always
  a sibling of the jump — a link's accessible name replaces its contents, so a
  badge nested inside it is silent, which is how `ChannelMentionsPanel`'s
  unread dot had come to be labelled for nobody.
- **`ChatPanel.unreadFrom`** — the "New" line across the transcript, where you
  had read up to. The boundary is captured on mount rather than tracked: every
  host advances the cursor a second after the panel opens, so reading the prop
  live would delete the line while the reader was scrolling toward it. A
  cursor that moves BACKWARDS is adopted, since only "Mark as unread" can do
  that and moving the line is its whole purpose.

---

## [2.286.1] — 2026-09-16

### Changed — `./social`

- **The pin was an emoji too.** The message action bar's pin, the "Pinned"
  badge and a recording card's pinned marker were all 📌, in files that had
  `PinIcon` imported nearby.

---

## [2.286.0] — 2026-09-16

### Changed — `./social`, `./layout`, `./ui`

- **Emoji standing in for icons are gone from the chrome.** A conversation
  header's call buttons were a telephone receiver and a movie camera: full
  colour cartoon stickers among thin monochrome glyphs, ignoring the theme
  entirely — a dark emoji on dark chrome stays dark — and drawn differently on
  every platform. The operator has objected to this twice. `ConversationSurface`
  and `ChannelViews` take `PhoneIcon` / `VideoCallIcon`, and the app shell's
  own controls take glyphs too.

  The message action bar's pin, the "Pinned" badge and a recording card's
  pinned marker were the same bug one layer in — a 📌 where `PinIcon` had
  existed all along.

  **Reactions keep their emoji**, because there the emoji IS the content rather
  than a picture of a control. That is the line: a 👍 you chose is data; a 📞
  drawn on a button is a missing icon.

### Added — `./ui`

- `MoonIcon`, `SunIcon`, `MenuIcon`, `TranscribeIcon`, `BranchIcon`,
  `ChartIcon`, `CodeIcon`, `PuzzleIcon`, `RepeatIcon`, `PaperclipIcon`,
  `EyeIcon`, and `PhoneIcon` / `VideoCallIcon` now exported from the root
  barrel. `TranscribeIcon` is deliberately not `MicIcon` — that name belongs
  to the call CONTROL in `video/MediaIcons`, and two of them would trip the
  export-ambiguity guard.

---

## [2.285.0] — 2026-09-16

### Added — `./social`

- **`ChatPanel.readReceipts` / `readReceiptsEnabled`** — the "Seen" line.
  Backed by realtime-modules 0.50.0, whose receipt is a CURSOR per person per
  channel rather than a row per message: "has Carol seen message M" is
  `readAt >= M.timestamp`, and when a specific message was read is a question
  the model cannot answer and the UI does not pretend to.

  It renders under the viewer's own most recent message and nowhere else. A
  tick beside forty messages is noise; one line saying how far your words got
  is the information. Two people: "Seen". More: "Seen by 3" with up to three
  avatars, names in a title and in a visually-hidden tail. Nobody yet: nothing
  at all, because an empty state here is silence. Receipts off (the server
  keeps none in an open or large channel): nothing ever, not even a greyed
  hint — a channel without receipts should look like one that never had them.

  Not a live region. The line sits in a list that is already
  `aria-live="off"`, so it is in reading order at the foot of your message but
  never pushed: cursors move several times a minute in a busy chat, and each
  move would interrupt whatever is being read to announce a number that
  changed by one.

---

## [2.284.0] — 2026-09-16

### Added — `./social`

- **Every rail section folds away.** Pinned, Channels, Direct messages and
  Teams are one shared heading component, and none of them collapsed; Teams
  and Slack fold all of them and remember it. `RailSectionHeader` takes
  `collapsed` / `onToggleCollapse` / `controls`, `ConversationList` and
  `ConversationRail` take `collapsedSections` / `onToggleSection` keyed by
  section name, and `TeamChannelTree` folds its whole tree. Controlled, so the
  host can persist it — a fold that springs back open on reload is a fold
  nobody uses twice.

  Three details worth knowing. **A collapsed section shows its unread count**,
  which is what makes folding safe to use rather than a way to miss things.
  **The `+` on a folded section opens it first, then acts** — creating a
  channel into a hidden section otherwise leaves the new row out of sight and
  the click reads as having done nothing. And **hidden rows leave the keyboard
  rotation entirely**: the roving cursor is derived from the same expression
  that decides what renders, so a folded section can never hold focus on
  something invisible.

  The pre-existing per-section "Show N more" cap was renamed from
  `expandedSections` to `uncappedSections` internally — two different ideas
  that both sounded like "expanded". Neither resets the other.

---

## [2.283.0] — 2026-09-16

### Added — `./social`

- **`TeamChannelTree` favourites.** The flat Channels and Direct messages rows
  could be pinned and lifted into a Pinned group; a team and its channels
  could not be favourited at all. `TeamTreeItem.pinned` / `onTogglePinTeam`
  and `TeamChannelItem.pinned` / `onTogglePinChannel` fix that, with the same
  pin glyph the flat rows use so one visual language means one thing in both
  halves of the rail. Pinned sort first, stably, at both levels.

  A pinned channel stays inside its team. The tree is a hierarchy, and
  lifting a channel out of it into a flat group inside the tree would be a
  second, contradictory structure — the rail's Pinned group is the host's
  business, not this component's.

### Changed — `./social`

- **The last message no longer sits flush against the composer.** It ended
  with its reactions and its Reply control touching the input's top edge;
  Teams and Slack both leave a clear band there. Not decoration — the newest
  message is the one you are reading while you type a reply, and a line of
  text hard against a focused input reads as part of the input.
- **A threaded channel's posts are separated rather than grouped.** With the
  foot Reply control under every root, consecutive posts from one person
  stopped collapsing into a run — correctly, since a post in a channel is a
  thread starter and Teams keeps consecutive posts separate for that reason.
  But our rows did not LOOK like separate posts, so the repetition read as
  noise rather than as structure. Threaded mode now gives each post air and a
  hairline, borrowed from the day separator's own vocabulary. The flat path is
  untouched: a DM is a conversation, not a list of posts.

---

## [2.282.0] — 2026-09-16

### Changed — `./social`

- **Consecutive messages from one person collapse into a run.** Every row
  repeated the author's name and avatar, so five messages from one person was
  five avatars and five names down the left — the single biggest reason a busy
  channel read as dense noise here and as a conversation in Teams. The first
  message in a run keeps its author and timestamp; the rest are bare lines
  aligned under it. Five minutes ends a run, and so does a different author, a
  day divider, an edited message (the "(edited)" marker lives on the meta line
  a continued row drops), and anything that is a record rather than somebody's
  words — a card, a notice, a membership line, a deleted row. Inside a thread
  a reply continues another reply and never the root, because the root is the
  post and the replies are answers to it. `MessageRow` has supported this all
  along via `hideAuthor`; nothing ever passed it.

### Added — `./social`

- **A persistent Reply control at the foot of every thread** (`threaded` with
  `onReply`). Starting a reply was hover-only: you had to find the ↩ in the
  action bar that appears when the pointer is over a row. Hover-only means
  most people never discover that a channel is threaded at all, and keep
  posting top-level messages — the flat river threading exists to fix. It sits
  under a root with no replies too, since that is the post a first reply has
  to start from, and it reports the thread's ROOT like every other reply path.
  Quiet at rest, clearer on hover and focus, and named per thread ("Reply to
  Carol") so a screen-reader user moving by control does not meet fifty
  identical "Reply" buttons.

---

## [2.281.1] — 2026-09-16

### Added — `./social`

- **`ChatPanel.alignOwnMessages`** (default true, so nothing changes for
  existing callers). A channel wants it false: Teams left-aligns every post in
  a channel, author and avatar and all, and only a 1:1 chat puts yours on the
  right. With `threaded` on, the right-aligned treatment actively fights the
  thread — the rail marking "these replies belong to that post" runs down the
  far left while your own reply sits at the far right, and the two stop
  looking related. Alignment only; ownership still decides Edit and Delete.

---

## [2.281.0] — 2026-09-16

### Added — `./social`

- **`ChatPanel.threaded`**: replies nest under the message they answer, one
  level deep, the way a Teams channel works. Every message was a peer in one
  flat river, and "reply" only drew a quote of the parent inline — so three
  people answering three different things read as six unrelated lines.

  A thread sits in the river at its ROOT's position, and a new reply does NOT
  drag the whole thread to the bottom: an old conversation that gets a new
  answer stays where it was. That is the point of threading, and it is the
  thing a future reader will "fix" by sorting on the newest reply, so the
  warning lives on the grouping function.

  Replying to a reply reports the ROOT, so the next message joins the same
  thread instead of starting a nested one. Past three replies the tail folds
  behind an "N more replies" control carrying the hidden repliers' avatars.
  The quote block is suppressed when it points at the thread's own root — that
  row is directly above under the same rail — and kept when it points at a
  sibling, where with one indent level it is the only thing saying which of
  several answers is being answered.

  Off by default: the other surfaces that use this component are not channels.

---

## [2.280.0] — 2026-09-16

### Added — `./video`

- **`EmbeddedCallPanel.aside`**: a side panel beside the stage. A call has two
  shapes in a host app — a floating widget and a block docked inside somebody
  else's column — and only the first one could reach the call's Chat, People,
  Effects and Devices. Docked inside a conversation, the call offered mic,
  camera, share, react and leave, and nothing else; the destinations came back
  only by popping the call out, which is the wrong way round for a call that
  lives inside a chat. The slot takes the same `CallSidePanel` the widget
  uses. It sits beside the stage on a wide container and stacks under it on a
  narrow one — a container query, so it answers to the column it is docked in
  rather than to the viewport — and scrolls inside itself rather than growing
  the panel. Omitted, the rendered output is unchanged.

---

## [2.279.1] — 2026-09-16

### Fixed — `./video`

- **A `devices` side-panel tab drew as the letters "DE".** `CallSidePanel`
  falls back to the first two characters of a tab's label when it has no icon,
  and the well-known set had no entry for devices — so the call's new device
  picker sat in the control bar as text between five glyphs. It gets
  `SettingsGearIcon` now, like the other well-known ids.

---

## [2.279.0] — 2026-09-16

### Changed — `./video`

- **`HangoutPreJoinShell` redesigned as a Teams/Zoom green room.** The old
  screen said the same sentence three times — a modal title, the shell's own
  header, and the right rail all naming the channel and repeating "Everyone in
  #X will be told" — around a ~200px preview, with the mic and camera as two
  loose circles floating below the frame and no way to choose a microphone,
  speaker or camera at all. That last one is the main thing a pre-join screen
  is for.

  Now: one heading block (optional `eyebrow`, the channel name, ONE subtitle),
  a hero 16:9 stage with the mic/camera/gear controls riding on the preview
  itself, and a right column carrying who is already here, the primary Join
  and a quiet Cancel. The component's own `<header>` is gone.

  New props, all optional and additive: `eyebrow`, `devicesSlot` (given = the
  stage bar gets a gear that swaps the roster card for the host's device
  pickers), `devicesOpen` / `onToggleDevices` for a controlled panel, and
  `secondaryActions` for Teams' "other join options" row. Every existing prop
  keeps its name and meaning, and every existing testid still resolves.

  The shell stays a controlled-render shell: it does not call `getUserMedia`
  and does not enumerate devices. `DeviceSettingsPanel` is what hosts put in
  `devicesSlot`.

### Added — `./video`

- **`SettingsGearIcon`** in `MediaIcons`, so the gear is shared rather than
  redefined per surface.

---

## [2.278.2] — 2026-09-16

### Changed — `./social`

- **`MembersPanel.onAdd` receives the button that was pressed**, so a host can
  open its people picker beside it instead of centred. The empty state's
  action has no element to give and passes `undefined`, which hosts should
  read as "fall back to centred" rather than pointing a popover at nothing.

---

## [2.278.1] — 2026-09-16

### Added — `./social`

- **`ConversationList.onStartCall`** puts "Call" and "Video call" in a
  conversation row's ⋯ menu. A conversation you can open is one you can call
  into, and making people open it first to find the call button is a step for
  nothing. `ConversationRail` forwards it, along with `sectionActions`.

### Added — `./ui`

- **`PhoneIcon`, `VideoCallIcon`**. Named apart from `video/MediaIcons`'
  `VideoIcon`, which is a call CONTROL rather than a "start one" glyph.

---

## [2.278.0] — 2026-09-16

### Added — `./shared`

- **`PopoverForm` + `PopoverField`**: a compact form that opens AT the control
  that asked for it. The alternative, and what this replaces at three call
  sites, is a centred modal — a dimmed screen and a 480px slab to collect
  three fields, which loses the context you were pointing at. The shell owns
  the chrome (header, reserved error line, footer, submit-on-Enter,
  Escape-to-close) so every one of these reads the same; callers bring only
  their fields. Falls back to a narrow centred overlay only when the host has
  nothing to anchor to.

### Added — `./social`

- **`RailSectionHeader`**: the one heading row every rail section uses, with
  its create action ON the heading. Each section had been growing its own
  heading inline at its own inset, and a rail whose four headings sit at three
  different left edges reads as broken even when each section is fine.
  "Add channel" behind a ⋯ that only appears on hover is an action people
  report as missing.
- **`ActivePeopleGrid`**: who is around, as bubble avatars, four per row.
- **`ConversationList.sectionActions`**, keyed by section name.
- **`ConversationRail.collapsible` / `collapsed` / `onToggleCollapse`**: a 56px
  icon strip, with the shelf still pickable. The rail does not remember the
  state; the host does.

### Fixed — `./shared`

- **`InlinePopover` keeps its panel on screen.** A 380px form hanging off a row
  near the bottom of a rail ran past the fold with its buttons below it. The
  correction runs once per anchor-derived position — measuring and correcting
  on every render is an infinite loop, and in jsdom (every rect zero) it is an
  immediate one.
- **`ConversationRail.beforeList`** now shares the `px-2` inset of the shelf
  above it and the list below it.

### Changed — `./shared`, `./social`

- **`SegmentedControl`** gains `disabled`, `fullWidth` and `data-testid`. A
  two-value choice as segments is about a third of the height of two stacked
  radio rows, which is what makes these forms fit in a popover.
- **`ConversationShelf`** renders its icon in a fixed 16px box so every label
  starts at the same x, and the fallback is a neutral dot rather than a
  bullet. Emoji are discouraged in the prop docs: they do not take the theme's
  colour.
- **`TeamChannelTree`**: a "Teams" heading with a +, and a visible + per team
  row; both hand the button back for anchoring. The heading sits outside
  `role="tree"` — a stray `<div>` in there announces as a phantom item.

---

## [2.277.2] — 2026-09-16

### Fixed — `./shared`

- **`KPIGrid`'s `mdColumns` step (2.275.0) could never reach `columns` above
  768px**: the component emitted `sm:grid-cols-{columns}` alongside
  `md:grid-cols-{mdColumns}` whenever `mdColumns` was set, and Tailwind's
  declaration order (not specificity) makes `md:` win over `sm:` at every
  width ≥768px — so a grid asking for `columns={4} mdColumns={2}` was
  visually capped at 2 columns from 768px all the way up, with the 4-column
  step unreachable at any viewport width. Measured in a consumer at a 1430px
  container: computed `gridTemplateColumns` came back as two columns instead
  of four. Fixed by suppressing the `sm:` class when `mdColumns` is set and
  emitting `md:grid-cols-{mdColumns}` then `lg:grid-cols-{columns}` instead,
  so the grid steps 1 → `mdColumns` (768px) → `columns` (1024px) as the prop
  doc always described. The no-`mdColumns` path (`sm:grid-cols-{columns}`
  only) is byte-for-byte unchanged. Pinned class-string assertions added to
  `KPIGrid.test.tsx` for both modes.

## [2.275.1] — 2026-09-16

### Fixed — `./shared`

- **Packaging fix for 2.275.0**: `activeNavItemClassName` / `inactiveNavItemClassName`
  (added to `SubNavLayout.tsx`, documented in the `renderNavItem` doc comment,
  and covered by `SubNavLayout.test.tsx`) were never re-exported from
  `src/components/shared/index.ts` — the barrel kept its old `{ SubNavLayout,
  activeNavItemStyle }` line — so neither constant reached `dist/shared.cjs`,
  `dist/shared.js`, or the root bundle. `SubNavLayout.test.tsx` passed anyway
  because it imports the component file directly rather than the barrel, so
  the gap shipped undetected. A consumer following the shipped doc comment
  got an import error. Both constants are now re-exported from the barrel and
  verified in `dist/shared.d.ts` / `dist/index.d.ts`. Added
  `src/components/shared/__tests__/index.exports.test.ts`, an export-surface
  test that imports the barrel itself (not the component file) and asserts
  `SubNavLayout`, `activeNavItemStyle`, `activeNavItemClassName`, and
  `inactiveNavItemClassName` are all defined, so this class of defect fails a
  test instead of shipping. Audited the other five items in 2.275.0
  (`DataTable` keyboard rows + search fallback, `FormField.labelId`,
  `Toolbar`'s `wrap`, `KPIGrid.mdColumns`, `ToolCallPill.title`) against the
  built package — all five reach the public entry correctly; only
  `SubNavLayout`'s two constants were affected.

## [2.275.0] — 2026-09-16

### Added — `./shared`

- **`DataTable` keyboard-reachable rows**: when `onRowClick` is set, each body
  `<tr>` gets `tabIndex={0}`, a visible focus ring (`focus-visible:ring-2
  ring-inset ring-primary`), `aria-rowindex` (header counts as ARIA row 1, so
  the first body row is `2`), and Enter/Space now activates `onRowClick` the
  same as a click. A table with no `onRowClick` is unchanged — no tab stop is
  added for a row with nothing to activate. Consumer gap: "Keyboard-reachable
  DataTable rows" in `docs/ui-components-queue.md`.
- **`DataTable` search fallback for render-only columns**: when `searchable`
  and a column has neither a primitive `row[key]` value nor `getFilterText`,
  the search box now falls back to the column's rendered cell text (walked
  cheaply via a small ReactNode → text helper, no `react-dom/server`) instead
  of silently matching nothing. If the column also has no `render`, it falls
  back to `String(value ?? '')` — today's behaviour — plus a one-time (per
  column, dev-only) `console.warn` naming the column, since at that point the
  column genuinely cannot be searched. Consumer gap: "DataTable search over
  rows whose display values live in render functions."
- **`SubNavLayout`**: exports `activeNavItemClassName` /
  `inactiveNavItemClassName`, className-based equivalents of the existing
  `activeNavItemStyle` export, documented beside it and in the `renderNavItem`
  prop's doc comment. A `renderNavItem` router integration (e.g. React Router
  `NavLink`) can now match the composite's default look via
  `className={({isActive}) => isActive ? activeNavItemClassName :
  inactiveNavItemClassName}` instead of hand-computing an inline `style`
  object, which the component-discipline audit bans. Consumer gap: queue
  row 32.
- **`FormField`**: `labelId` no longer leaks into the DOM when a consumer
  spreads the render-prop wiring bag onto a native control (the documented
  `<Input {...p} .../>` pattern) — it is now a non-enumerable property on the
  wiring object, so `{...p}`/`Object.keys(p)` omit it while `p.labelId` still
  works for a control (e.g. `Switch`) that needs `aria-labelledby` instead of
  `htmlFor`. Previously every page using that pattern logged "React does not
  recognize the `labelId` prop" on load. Consumer gap: queue row 20.
- **`Toolbar`**: the `end` slot now honours the existing `wrap` prop — the row
  itself gains `flex-wrap` (previously only the `children` slot did), so at
  narrow widths `end` drops to a line of its own instead of overflowing past
  the toolbar's right edge with no way to reach it. `end`'s left padding
  (assumes sharing a line with `children`) is dropped when wrapped. No change
  when `wrap` is unset. Consumer gap: queue row 63.
- **`KPIGrid`**: `mdColumns?: 1 | 2 | 3 | 4` adds an `md:grid-cols-N` step
  between the `sm` breakpoint (`columns`) and whatever wider layout follows —
  for a grid nested inside a rail, where a laptop-width `md` view is much
  narrower than a full-width page at the same viewport size. Undefined (the
  default) emits no `md:` class, so the 640–1279px band renders identically
  to today. Consumer gap: queue row 64.
- **`ToolCallPill`**: optional `title?: string`, rendered as the pill's
  native `title` (tooltip) attribute — for a friendly display `name` ("searched
  knowledge base") that still needs the raw tool id reachable on hover.
  Undefined (the default) renders no `title`, same as today. Consumer gap:
  queue row 65.

## [2.273.1] — 2026-09-16

### Changed — `./shared`

- **`Text` (alias `T`)**: widened `as` to `'span' | 'div' | 'p' | 'li'`
  (list-item captions/labels can now use the primitive instead of a bare
  `<li>`), and now accepts and forwards `aria-hidden` (`boolean | 'true' |
  'false'`), `onClick`, `data-testid`, and `id`. Defaults unchanged.

## [2.273.0] — 2026-09-15

### Added — `./shared`

- **`Text` (alias `T`)** — a styled text primitive (`Inline` in `as="span"`
  mode) so a page needing an occasional small caption or muted label has a
  real composite to reach for instead of a bare `<span style={{...}}>`.
  Several downstream consumers had already hand-rolled the identical
  three-line shim around `Inline` for this exact reason. `as?: 'span' | 'div'
  | 'p'` (default `'span'`), `className`, `title`, `wrap`, `role`,
  `aria-label`.
- **`SubNavLayout`**: `railLabel?: string` — sets `aria-label` on the primary
  rail's `<nav>` (undefined by default, matching today's markup) for pages
  that need to distinguish it from other nav landmarks.
- **`SubNavLayout`**: `contentAs?: 'main' | 'section' | 'div'` (default
  `'main'`, today's markup) and `contentLabel?: string`. A page that already
  sits inside its shell's own `<main id="main-content">` was getting a
  second, nested `<main>` from the content pane — a real if minor
  screen-reader navigation defect on every nested-rail page (Observability,
  Ingest, Identity, Distillation). Pass `contentAs="section"` with
  `contentLabel` set so the region still has a name.
- **`ChannelHeader`**: `as?: 'div' | 'header'` (default `'div'`) — lets a host
  using this bar as its own page header render it as a `banner` landmark.
- **`Chip`**: `href?: string` + `external?: boolean` — renders as an `<a
  href>` with the same classes instead of a `<span>`, with
  `rel="noopener noreferrer"` always applied and `target="_blank"` when
  `external` is set (same shape as `Link`'s prop of the same name), for a
  chip that is also a link rather than a static label.
- **`LogStream`**: `tone?: 'code' | 'surface'` (default `'code'`, today's
  permanently-dark console). `'surface'` follows the host theme instead
  (`bg-surface-inset text-text-primary`), for a log panel embedded in an
  otherwise light-themed page rather than a terminal pane.

### Fixed — `./compute`

- **`MachinePresenceMenu`'s trigger chip showed `· 0` for a connected-idle
  machine.** A zero next to a static dot reads as broken rather than as "no
  sessions" — the dot's tone and the trigger's `title` already say
  "connected". The chip text now drops the count entirely when it is zero
  (`⌂ demo-macbook`, not `⌂ demo-macbook · 0`).

## [2.120.3] — 2026-09-02

### Fixed — `./diagram`

- **2.120.2's retry stopped one look too early.** Instrumenting a real document
  showed the actual mechanism: the first `updateScene` DOES take (`scene: 5`
  immediately after) and Excalidraw then replaces the scene while finishing its
  own mount, so the next look finds `scene: 0` again. A second apply sticks. The
  loop no longer treats *writing* as success — `hydratedRef` is set only by the
  branch that OBSERVES elements already on the canvas, so hydration ends when
  the scene has actually survived a look, not when we last called into the API.

---

## [2.120.2] — 2026-09-02

### Fixed — `./diagram`

- **A diagram opened cold showed an empty canvas, forever.** Hydration was one
  attempt behind a ref, and two unordered events had to line up for it: the
  shared scene arrives when the server snapshot lands (after the provider hands
  over its empty Y.Doc), and `<Excalidraw>` initialises its own empty scene
  while it mounts — the `excalidrawAPI` callback fires in the middle of that, so
  an `updateScene` on the first tick can be overwritten by an initialisation
  still finishing. The single attempt burned its one chance either way, and only
  a further remote CHANGE could repair it — which a document whose diagram is
  already complete never produces. Hydration is now stated as the invariant it
  is (*the canvas shows what the shared scene holds*) and re-checked on a
  bounded backoff to ~5s, stopping at the first success.

---

## [2.120.1] — 2026-09-02

### Fixed — `./diagram`

- **The diagram node view painted during React's render phase.** ProseMirror
  builds node views from inside `EditorView`'s construction and `@tiptap/react`
  constructs the view from inside React's own work, so the `root.render()` in
  the node view's constructor was a nested update during a render — React
  reported *"Render methods should be a pure function of props and state"* on
  every page holding a diagram. Paints are now deferred by one microtask and
  coalesced, so a transaction that calls `update()` twice mounts one canvas.

---

## [2.120.0] — 2026-09-02

### Added — a diagram as a block INSIDE a canvas document (`./diagram`)

- **`DiagramMacro`** — the Tiptap extension that makes a `macro:diagram` fence
  draw. It registers a node view on the existing `macro` node rather than
  adding a node of its own, and that is the load-bearing choice: a dedicated
  node type would emit ProseMirror JSON that a client without this extension
  has no schema entry for, and `Node.fromJSON` throws rather than degrades. As
  an ordinary macro the block survives such a client as a YAML fence — the
  property `MACRO-MARKDOWN.md` calls the most important one a shared document
  format has — and `pmModel.ts` needed no change at all.
- **The persisted form is a REFERENCE, not the picture.** The body is one key,
  `id: <uuid>`; the elements stay in the page's Y.Doc under
  `excalidraw:<id>`, where `ExcalidrawYjsBinding` already puts them. Embedding
  the scene would push a multi-kilobyte JSON blob through a CRDT TEXT node on
  every stroke and character-merge it between two people drawing at once. The
  argument is written out in `src/components/diagram/macro.ts`; the round trip
  is proven in realtime-modules' `diagram-macro-roundtrip.test.ts`.
- **`insertDiagram(id?)`** command, `newDiagramId`, `readDiagramId`,
  `diagramMacroText`, `DIAGRAM_MACRO_NAME`.
- **Read-only is enforced, not hidden.** `editable=false` puts Excalidraw in
  `viewModeEnabled`, drops every local write before `commitLocal`, and removes
  the block's `Remove` control. The flag is read from the live
  `EditorView.editable` and re-broadcast by a plugin view when it flips, so
  locking a page reaches a diagram already on screen.

### Changed

- **`DiagramBlockRenderer` no longer registers a section renderer.** It took
  `SectionRendererProps` and called `registerRenderer` from a
  `registerDiagramBlock()` nothing ever invoked — an orphan aimed at the
  LEGACY sectioned-document registry, which already ships a `diagram` section
  type of its own. The registration is deleted rather than wired (a second
  diagram block on a surface being retired is not the fix), and the component
  now takes the props a diagram needs and is mounted by the canvas node view.
  `registerDiagramBlock` and `DIAGRAM_BLOCK_TYPE` are gone.

### Fixed — packaging

- **Rollup externals do not cover subpaths, and three were missing.**
  `@tiptap/pm/state` and `react-dom/client` fell through the list, so the
  first build of the node view inlined prosemirror-model/-transform/-state
  AND all of react-dom + scheduler into `dist/diagram.js` — 3.5KB → 770KB,
  and a second ProseMirror in every consuming app. Now 7.9KB with both
  external. `@tiptap/core`, `@tiptap/pm` and their subpaths are externalised
  and declared as optional peers.

---

## [2.117.1] — 2026-08-31

### Fixed — `/compute`

- **`ShellTerminal` owned more than one socket.** `connect()` is reachable
  from four places — the header button, the `autoConnect` effect, the
  imperative handle and the reconnect ladder — and it awaits a URL mint in
  the middle, so two calls overlap easily. The second simply overwrote
  `wsRef`: the first socket stayed OPEN and unreferenced, still writing its
  output into the terminal the second one now owned, and still holding one of
  the ten shell slots the runtime allows, for as long as the pane lived. A
  connect now closes any previous socket first, with its handlers detached so
  the discarded socket's `onclose` cannot re-enter the reconnect ladder.
- **Frames could reach a disposed terminal.** Unmount closed the socket but
  left `onmessage` attached, and a closing socket still dispatches whatever
  was already queued — into a terminal `dispose()` had just torn down. The
  unmount path now goes through the same handler-detaching teardown.
- **The header `connect` button stayed armed while connecting.** The
  chrome-less strip already hid itself during a mint; the header did not, so
  every extra click across the await opened another socket. It now disables
  and reads `connecting`.

### Fixed — demo

- `ComputerLabDemo`'s fixture client still took `createComputer(label: string)`
  after 089e51a widened the real client to `createComputer(input?:
  CreateComputerInput)` for project cost centres. `npm run lint` had been red
  on main since; the fixture now takes the input object and carries
  `projectId` through.

### Internal

- `ShellTerminal` gains its first test file (5 tests) — socket ownership
  across overlapping connects, discarded-socket silence, no reconnect from a
  deliberate replacement, and unmount teardown. Tests 5,570 → 5,575.

---

## 2.116.0 — 2026-08-26

### Added — collaborative diagramming (`./diagram` subpath)

- **`CollaborativeExcalidraw`** — an Excalidraw canvas that absorbs its own
  setup. Two modes, mirroring `StandaloneTiptap`: **bootstrap**
  (`gatewayUrl` / `diagramId` / `authToken` — the component builds the socket,
  the Y.Doc and the provider) and **hosted** (`ydoc` / `awareness` — it binds
  into a document the caller already owns). Callers never hand-wire a provider
  stack.
- **`DiagramBlockRenderer` + `registerDiagramBlock()`** — the same component as
  a BLOCK on a page. The existing `SectionRendererProps` contract already
  supplies the page's `ydoc`, `provider`, `section.id`, `editable` and `user`,
  so hosting a diagram as a macro needs no new host interface. `section.id`
  namespaces the Y.Doc root type and the awareness pointers, so several
  diagrams on one page share one document and one socket without colliding.
  Registration is an explicit call, never an import side effect.
- **`useResolvedTheme`** — reads the live `[data-theme]` attribute off the DOM.
  Excalidraw renders to a canvas and takes an explicit `theme` prop, so this is
  one of the few components that must actually know the theme. It still does
  not call `useColorScheme()`: the app stamps `data-theme` without mounting
  `ColorSchemeProvider`, so that hook would report 'light' forever and the
  canvas would float light on a dark page.

### Bundle

`@excalidraw/excalidraw` (~1.9MB) is an **optional peer** and is externalised.
It is imported by exactly one module, which sits behind a `React.lazy`
boundary — `dist/diagram.js` is 3.6KB and the lazy chunk 2.4KB. Its stylesheet
is externalised too, so it does not weld ~100KB of editor CSS into the
always-loaded `ui-components.css`.


## [Unreleased]

## [2.115.0] — 2026-08-26

New subpath: `@connorhoehnslalom/ui-components/compute` — microVM developer
boxes, and a tmux-shaped multiplexer for working across a fleet of them.
Tests 5,416 → 5,442.

### Added — `/compute`, and the Computer Lab in particular

A *computer* is one agent-runtime session: its own microVM with a persistent
workspace. One at a time it is a page; several at a time it is a multiplexer.

`ComputerLab` is that multiplexer, and it exists for a shape of work the
single-box view cannot express: ad-hoc and keyboard-driven, not a queue of
predefined tasks — several boxes open, most of them being read, typing at
whichever one has stopped. Windows hold a tree of split panes, a leader key
(**⌃B**, tmux's default and for tmux's reason) drives the layout, and every
pane carries a status line answering the questions you ask about a box you are
*not* looking at: model, last cost, turns, and how long before it stops.

The one thing tmux does not have to invent is **broadcast** — one instruction
to every pane at once. `synchronize-panes` for shells is the same idea as
sending a prompt to five agents, and it is the reason to be in this mode.

**Pane kinds are a registry, not an enumeration.** Two ship by default. A
`shell` pane is a real terminal and is what a new pane opens as, because
running commands is the point of the surface; it holds one of the runtime's
ten shell slots (`MAX_SHELLS` stops at eight), which is what the top bar
meters. A `tail` pane is read-only and free — an SSE stream of whatever is
running on the box, including runs nobody in this browser started — which is
the one thing a terminal cannot do. A host registers its own kind — a run
timeline, a workspace tree, a diff — and it gets the same toggle order, quota
accounting and broadcast plumbing, with `quota` and `inputSuffix` declared on
the kind rather than branched on in the component. A kind id the current
registry no longer knows falls back rather than rendering a blank pane.

There is deliberately no third thing that takes typed input. An earlier draft
had a pane with its own prompt box, which taught you that Enter means newline
and rebuilt a shell badly; input belongs in a terminal, and the tail pane
being read-only is what keeps that honest.

`fixtures/mockShell.ts` speaks the shell protocol back at `ShellTerminal` and
simulates a devbox behind it, so the demo and the Storybook story have live
terminals with no runtime at all. It installs by swapping `globalThis.WebSocket`
for a subclass that claims only `mock-shell:` URLs and delegates everything
else.

Also exported: `LabRail`, `LabChooser` (subsequence jump across on-screen panes
and the rest of the fleet), `PaneTreeView`, `PaneStatusLine`, `ShellTerminal`,
`AgentPane`, the `ComputeProvider`/`ComputeClient` seam, the `useComputeFleet` /
`useComputeTask` / `useComputeTail` / `useLabLayout` hooks, and the pure pane-tree, pane-kind,
shell-protocol, workspace-tree, storage and dock-store modules.

Directional pane movement (`neighborPane`) is computed from pane **geometry**,
not tree structure. "The pane to my right" is frequently a cousin several
levels up, and a sibling-only implementation silently gets that wrong; the tree
is laid out into rectangles first and the question is then asked of those.

`COMPUTE_STORAGE_KEYS` / `clearComputeStorage()` enumerate and clear every
`localStorage` key the module owns, so a host clearing state on a tenant switch
cannot silently drift when a key is renamed here.

### Added — two `shared/` primitives

- **`TitledFrame`** — a bordered box whose title interrupts the top border,
  the tmux pane convention. It exists because a stack of panes needs each one
  labelled without spending a row of height per pane; sitting the title *in*
  the border costs nothing. `active` draws the focused border.
- **`DotMeter`** — a discrete meter drawn as filled and hollow dots. A
  continuous bar reads as "roughly half"; ten dots read as "five of ten",
  which is what a budget or a quota actually is. Carries a `note` slot for the
  reset time, the field that makes a quota actionable at all.

### Changed

- `@xterm/xterm` and `@xterm/addon-fit` are new **optional** peer dependencies,
  needed only by `ShellTerminal` and so by any `shell` pane. Everything else in
  `/compute` works without them installed. They are externalised from the
  build, held as devDependencies here so the repo typechecks against the real
  declarations, and stubbed for Vitest (`src/test-stubs/xterm-stub.ts`) —
  xterm paints to a canvas and does nothing useful under jsdom.

## [2.111.1] — 2026-08-26

### Fixed
- Dark mode: four components paired `bg-surface-inverse` with a hardcoded
  `text-white`, so their labels were white-on-near-white once
  `--color-surface-inverse` flips to `#f8fafc`. They now use
  `text-text-inverse`, which flips with the surface.
  Only `AgentDirectory` is exported; the three pipelines components
  (`StepTimeline`, `ExecutionLog`, `ExecutionTimeline`) are internal, so
  the consumer-visible part of this release is the AgentDirectory chips.

## [2.108.0] — 2026-08-25

Follow-up to the 2.107 dock: it worked, but the composition still read as
broken. Three layout bugs and a size bump. Tests 5,315 → 5,325.

### Fixed — the docked call card no longer has a dead band in it

The video column stopped at its intrinsic height (stage + duration +
controls) while the panel column ran on to its own content height, so with
Chat open the card showed a large empty dark region to the LEFT of the
lower half of the chat. Both columns now take **one** height —
`CALL_DOCK_ROW_HEIGHT` on the row they share — and each absorbs its own
slack internally: the video stage grows (so the self-view gets bigger, not
the void under the controls), and on the panel side the message list is
the flexible region, with the composer on the bottom edge.

### Fixed — one header per region

The dock's tab bar already says "Chat"; `ChatPanel` said "Chat (20)" again
~40px below it. `ChatPanel` gained `showHeader` and `fill`, and
`CallSidePanel` now announces itself through the new
`DockedPanelContext` — so a panel body **inside a dock** drops its own
heading and stretches to the column, while the same component used
standalone (the DMs page, `PanelsView`, `WrappedChatPanel`, the hook
demos) is byte-for-byte unchanged. Both props override the context in
either direction.

The empty strip between the tab bar and the first message went with it:
that was the dock header's `py-3` stacked on the chat card's own
`mt-4` + border + padding.

### Changed — the widget is bigger

It was a 320px card with a 320px dock bolted to it. Now:

| | before | after |
| --- | --- | --- |
| card, dock closed | 320px | **380px** (`CALL_CARD_WIDTH`) |
| video column, dock open | 320px (pinned) | **480px** (`CALL_STAGE_DOCKED_WIDTH`) |
| card, dock open | 640 × 393 | **800 × 515** |

Still a floating widget, not a takeover: 832 × 549 including its margin
fits a 1280 × 800 laptop screen with room to spare. The viewport-filling
layout stays `ExpandableCallWidget`'s job.

### Notes for consumers

Nothing to pass — a `<ChatPanel>` handed to `sidePanelTabs[].content`
adapts on its own. Hosts that hand-rolled the opt-out (a wrapper that
strips the header, a fixed-height chat body) should drop it. The
dimension constants are exported from `/video` for hosts that reserve
space, and `useDockedPanel()` from `/shared` for bodies that want the same
adaptation.

## [2.107.0] — 2026-08-25

Two product complaints, both real gaps. Tests 5,271 → 5,315.

### Added — the in-call side panel is now DOCKED to the call

In-call chat used to render in a free-floating `FloatingPanel` that drifted
anywhere on screen, visually unrelated to the call window it belonged to.
Google Meet, Zoom and Teams all attach chat/people/captions to the right
edge of the call surface so the two move, resize and close together;
Slack huddles do the same.

`CallSidePanel` is now that dock. It grew a tabbed API — `tabs`,
`activeTab`, `onTabChange`, `mode` — holding **one** open destination at a
time (Chat / People / Captions are mutually exclusive in every product
that does this well). `CallSidePanelToggles` renders the control-bar
buttons that pick which. The pre-2.107 single-panel props (`open`,
`onClose`, `title`, `children`) still work unchanged as a one-tab dock.

Placement follows the widget's canonical display mode:

| mode | placement | why |
| --- | --- | --- |
| `window` | docked right column (`w-80`) | Meet / Zoom / Teams |
| `fullscreen` | docked right column (`w-96`) | same, more room |
| `mini` | full-bleed overlay sheet | 320px cannot be split; Meet and Teams both cover the stage at this size |

Both call widgets wire it for you — pass `sidePanelTabs` +
`activeSidePanelTab` and the toggles appear in the control row, the panel
appears in the dock, and because both live inside the widget's own
transformed root, **the panel travels with the widget when dragged**.
`<CallWidget>` *widens* (its 320px stage has no width to give up) and
suppresses the dock in `mini`, where the collapsed pill has no stage;
`<ExpandableCallWidget>` *splits* (the stage keeps `flex-1`).

### Added — audition camera effects privately before publishing them

The Effects tab applied every click LIVE: clicking "Sunglasses" instantly
broadcast sunglasses to everyone in the meeting. New
`MediaEffectsPreviewPanel` follows the Microsoft Teams "Video effects"
model — a large self-view fed by a draft-only `previewTrack`, an in-words
privacy line ("Nobody else in the call can see these effects until you
choose Apply"), the same filter/background/face-FX trays writing the
draft, and an explicit **Apply** that stays disabled until the draft
differs from live. Applying is the only thing peers ever see.

`WrappedMediaEffectsPreviewPanel`
(`/integrations/realtime-modules`) owns the session lifecycle against the
realtime-modules controller contract: `beginPreview()` on open,
`applyPreview()` on Apply, `cancelPreview()` on dismiss, close **and
unmount** — so abandoning the surface can never publish.

Two safety properties are enforced in code and bite-verified in tests:
selection callbacks are wrapped in `guardedSelection()` and refuse to run
outside a preview session, and Apply is inert unless `isDirty`.

### Changed

- `CallSettingsDialog` gained `showPreview` (default `true`). Pass `false`
  when the tab body brings its own larger preview.
- New `UsersIcon` in `MediaIcons` — a roster glyph distinct from
  `UserPlusIcon` ("invite someone" vs "show who is here").

## [2.98.0] — 2026-08-25

Four hunts. Tests 4,978 → 5,102.

### Fixed — one Escape closed every open overlay

The best find of the round, and one nobody had named. Every overlay bound
Escape on `window` — the *last* node in the propagation path — so a single
keystroke ran **every** open overlay's handler. Summon the command palette
over a settings drawer, press Escape, and both close: the drawer's unsaved
edits go with it. Two components had tried to defend with
`e.stopPropagation()`, which cannot work here — same-node listeners need
`stopImmediatePropagation`, and even that hands the win to whichever layer
registered *first*, i.e. the bottom one. A new internal `lib/overlayStack.ts`
gives Escape to the top layer only; seven overlays adopted it.

### Fixed — focus stranded by overlays

- `IngestItemDrawer` declared `aria-modal="true"` while Tab walked into the
  table behind it; focus never entered and closing lost it entirely.
- `FieldTypesPage`'s **destructive** delete confirm was a bare portal: no
  role, no accessible name, no Escape, no focus move. Rebuilt on `Modal`.
- `ExecutionLog` and `ErrorOverlay` rendered full-viewport scrims that focus
  never reached.
- `FieldTypesPage`'s wizard advanced by unmounting the button just pressed
  ("Next →" becomes "Save"), dropping focus to `<body>`.
- **15 async results were announced to nobody** — a dead agent stream, a
  recording that won't load, and five ingest load-failure banners sitting
  three lines from an action-failure banner that already had `role="alert"`.

### Fixed — crashes that blank a page (5)

Weighted by blast radius, and the worst is unrecoverable by the user:

- **`handleCompatibility`** throws on a `node.type` outside `NodeType` — a
  pipeline stored by another build. `PipelineEditorPage` calls
  `validatePipeline` from a render `useMemo`, so **the entire editor blanks,
  leaving no canvas on which to find or delete the offending node.**
- **`runHistory` / `PipelineRunsContext`** are the two untrusted doors into
  the runs map — one casting raw `localStorage`, the other taking a host poll
  directly. Every runs surface then does `Object.values(r.steps)` during
  render, so **one stored run from an older build blanks the whole page and
  takes the other 49 runs, the filter bar and the header with it.** The
  malformed run is now normalised and rendered, not dropped.
- `ReviewMode` and `ReviewableItem` throw on a review status a peer on
  another build wrote through the CRDT — inside `sections.map`, so every
  other section and all comment threads disappear.
- `AgentDetailPage` throws on a host-registry record, and the Back button
  goes with it — the user is stranded on a broken record.

### Fixed — an outage rendering as a fact about the user's data

- `SocialPanel`'s connection tabs read "No followers yet" / "Followers (0)"
  when the graph load had 500'd, with the error banner sitting *underneath* a
  panel still asserting the fact. Counts now show "—", not a fabricated 0.
- `SocialTabContent` rendered a failed `GET /api/rooms` as "Channels 0 / No
  channels yet".
- `useFriends`, `usePosts` and `useRooms` each had one `error` written by
  both reads and writes, so a rejected first post in an empty room replaced
  "No posts yet" with "Couldn't load posts". Each gains an additive
  `loadError`, matching `useGroups`' precedent.
- `useChat`'s history mapper dropped `id`, the only key the live branch
  dedupes on, so a reconnect replay rendered messages twice.
- "Load earlier" yanked the view back to the bottom: auto-scroll keyed on
  `posts.length`, and `loadMore` appends older posts to a newest-first list.

### Fixed — controls that looked live and were not

`AgentCard` and `ProjectCard` rendered as `<button>` with a pointer cursor
and hover lift even with no `onClick` — a read-only 20-agent dashboard was 20
tab stops that announce as buttons and swallow every click. A
`ParticipantAvatar` was a button labelled "Jump to Alice Anderson" with
nothing behind it, while the Follow action *in the same tooltip* was already
gated. `CallWidget`'s minimized pill claimed `role="button"` and answered
neither click nor Enter, pinning the user to it.

### Changed — the webhook trigger says it isn't wired

`TriggerConfig` handed the user a webhook URL, a Copy button and a signing
secret for a relay that doesn't forward anything: a correctly-signed POST got
202 and started nothing. The services seam already existed
(`webhookRelay: { enabled, publicUrlBase }`) and the panel already computed
`relayActive` — it just never read it in the JSX. Undeclared or disabled now
shows a warning and no URL, no Copy, no secret. **Behaviour change on a
frozen barrel:** a host with a real relay must declare `{ enabled: true }`.

### Added

`ErrorBoundary` is exported from the root barrel. It lives in
`components/misc/`, which is neither re-exported nor an `exports` subpath, so
it had **no consumer-reachable import path at all** — it reached `dist` only
through `integrations/realtime-modules`, which resolves to an unpublished
peer. That is the same reachability gap #1021 closed for
layout/social/video/identity, left open on the one component whose entire job
is to stop a bad row from blanking a page.

### Note on verification

Three of four sites I flagged as inert were **already fixed** — and four of
those six had no test that could tell. Neutering each guard failed nothing.
This is the second round where "revert the fix and nothing fails" exposed a
hole, so it is worth stating as a rule: a fix whose behaviour no test covers
is indistinguishable from no fix. Those five now have tests, each confirmed
failing against the neutered version.

Three tests written this round passed against unfixed code and were
strengthened rather than kept, including one whose premise the agent
retracted outright after the revert step disproved it.

## [2.97.0] — 2026-08-24

Four audits were cut short by a session limit before any of them committed.
This is the salvaged work, re-verified — see the note at the end, which
matters more than the list.

### Fixed — controls that looked live and were not

- **A failed pipeline node showed a Retry pill that did nothing.** `BaseNode`
  guards on `typeof onRetry === 'function'`, and `useRetryFromStep` — a frozen
  export — returns a resolving **no-op** when no `PipelineRunsProvider` is in
  scope, deliberately, so isolated renders don't throw. A no-op is still a
  function, so the guard passed and the pill rendered. Clicking it did nothing,
  silently, forever. New `useRetryFromStepIfWired` returns `undefined` when
  nothing is wired; it is **not** re-exported from the barrel, so the frozen
  surface is unchanged.
- `AgentsProvider` accepted a `baseUrl` and ignored it, serving fixtures with
  no discriminator — an operator read invented agent health as their fleet's.
  The dashboard now says so plainly.
- `useGroups` never fetched on mount, so `GroupPanel` always read "No groups
  yet". It now hydrates, with a monotonic request id (**not** a shared boolean
  ref — that pattern has caused three separate bugs here), and distinguishes a
  failed load from a failed mutation: a rejected "create group" must not blank
  a list that loaded perfectly well.

### Fixed — crashes on data the component didn't expect

A library's props cross a trust boundary. The types are erased at runtime, and
these all took down more than themselves:

- `DataTable` threw on `data`/`columns` being `undefined` — a host mid-fetch
  destroyed the page, not just the table. Now renders its empty state.
- `StatusPill` threw on a run state outside its union. It is the
  most-instantiated status component in the library and almost always sits in
  a table cell, so one unrecognised job state took the whole table down. It now
  degrades its **styling** and keeps the real value in the label and
  `data-state` — an unknown status stays legible and reportable.
- `ConnectionPill` threw on an unrecognised socket state, taking down the app
  shell header exactly when the user most needed to see the connection state.
- `Avatar` threw on `name: null` — a user who never set a display name. Passing
  `initials` did not rescue it, because `nameToColor(name)` runs first.
- `PermissionDeniedCard` threw on the browser's own `PermissionState` of
  `'prompt'`, which its narrower union omits — it indexed a copy map to
  `undefined` and then **called** it.
- `LineChart` threw on `{label, data: null}`, which a metrics API returns
  routinely for a series with no samples in the window. It merges during the
  *parent's* render, so the throw blanked the whole dashboard row.

### Note — how this was verified

Two of the four agents died **before** their revert-and-verify pass, so their
fixes arrived unproven. That matters more than any single fix here:

- The 14 crash tests are self-verifying — they were written before the
  implementations and observed failing against unfixed source, then passing.
- Reverting `useGroups` fails 5 tests. Confirmed.
- **Reverting the retry-pill fix failed nothing at all.** The behaviour had no
  test; neutering `useRetryFromStepIfWired` back into a no-op left the suite
  green. A test now pins it, and was confirmed to fail against the neutered
  version before being kept. This is exactly the hole the revert step exists
  to find, and it only surfaced because the step was run.

## [2.96.0] — 2026-08-24

Six parallel efforts. **~60 bugs.** Tests 4,749 → 4,883.

### Fixed — subscriptions that were never opened

`pipelines/context/EventStreamContext.tsx`'s `subscribeToRun`,
`subscribeToAll` and `subscribeToApprovals` returned `() => {}`. The comment
claimed "WebSocketEventAdapter provides real subscriptions" — it cannot, the
adapter is a *sibling hook*, never a wrapper, so nothing ever replaced the
stub. `usePipelineRunChannelSubscription` had **zero callers**. The
run-scoped and approvals channels were subscribed by nothing; only AppLayout's
firehose was live. Now an explicit `channelTransport` seam with refcounted
channels, warning once in dev when unwired rather than pretending.

### Fixed — invented data presented as measurements

- `observability/DashboardPage` invented per-node CPU (`10 + i*4`), a sine-wave
  history and `status: 'healthy'` under a **"live data"** header, so the grid
  stayed all-healthy straight through an incident.
- One "live" pill on `MetricTimeSeriesPanel` vouched for ten charts, six of
  which always plot seeded LCG noise — operators read invented step-duration
  p99, cluster CPU/memory and approval latency as measurements. Per-card
  `sample` chips now.
- `PHASE1_ACTIVE_RUNS = []` rendered "Active runs (0)" directly beneath a live
  "Active now: 7".

### Fixed — quietly wrong numbers (16)

The ones a user would act on:

- **`identity/shared/FormField`: `Number('')` is `0`.** Backspacing the 8 out
  of "Minimum Length" emitted `onChange(0)`, and saving mid-edit persisted
  `minLength: 0` — **any password accepted**.
- **`shared/DataTable`'s default comparator stringified every cell**, so a
  numeric column sorted `1, 10, 100, 2, 9` and a `Date` column sorted by
  weekday *name*.
- **Success rate divided by total runs, including unfinished ones.** 8
  completed + 2 running rendered "8/10 (80%)" in amber above "0 failed"; 5 runs
  all awaiting approval rendered **"0/5 (0%)" in danger red** — a 100% failure
  rate with zero failures.
- **`p95` returned the slowest run.** `floor(len*p)` is one rank too high at
  whole-number ranks, which the 10/50 range buttons produce directly.
- **A task due today showed the overdue badge.** `dueDate` is a bare
  `YYYY-MM-DD` parsed as UTC midnight, so west of Greenwich `"2026-08-16"`
  also rendered as "Due: Aug 15". Both editor and reader carried their own
  copy, so switching modes hid it. Fixed once, in `src/lib/dateOnly.ts`.
- A DLQ depth badge printed the *loaded* count, so a 4,312-message queue read
  "100" — a queue depth that was a function of how many times you'd clicked.
- Step tree sorted unfinished steps above finished ones, so the step an
  operator was waiting on rendered first and jumped down on completion.

### Fixed — ingest, typed-documents (8)

A third instance of the resurrected-cancel-ref pattern, in `useIngestItems`:
switching the status filter left the previous filter's request live, so its
rows could be written into a table whose header said something else — and the
operator hit Retry/Skip on rows they had just filtered away. Also: `showWhen`
was evaluated one hop deep, so with A→B→C, hiding B left C on screen **and in
the submitted payload**, keyed to a condition on a field that was never sent.

### Fixed — agents, social (13)

- **A stream that ended without a terminal event never settled.** A proxy
  timeout just closes the socket; the assistant bubble kept its blinking
  cursor and the composer stayed disabled **until reload**. A tool call
  stranded mid-run is now marked `error`, never `completed` — claiming success
  for a result we never received would be inventing one.
- **Posting a reply made every comment vanish**: `createComment` set the same
  `loading` flag `CommentThread` uses to swap the list for "Loading comments…".
- Optimistic like rollback lived inside the `!res.ok` branch, which a
  *rejected* fetch never reaches — offline, the heart filled, the count
  incremented, nothing saved and nothing corrected it.
- `PostFeed` now resets on `roomId` change rather than requiring the caller to
  pass a `key`: the requirement was invisible at the call site and the failure
  silent and data-corrupting.

### Fixed — theme

**A nested `ThemeProvider` silently replaced the outer theme.** Both write the
same properties to `document.documentElement`, and React flushes child effects
before parent effects, so the outer write landed last — `useTheme()` returned
the inner tokens while every utility rendered the outer ones. Worse, the inner
provider's cleanup removed names the outer had set, and the outer has no reason
to re-render, so closing a themed preview pane stripped the app's branding
permanently. It cannot be fixed in this shape (`:root` holds one value per
property), so a nested provider now declines to write and says why in dev.

### Fixed — the static-style guard could be evaded by naming a variable

`check-static-styles.mjs` grepped for the literal `style={{`. Hoisting the
identical object to a const — `style={codeBlockStyle}` — sidestepped it
entirely, as did the `styles.row` namespace variant. The whole
`document-workspace` demo, `ThemingPage` (with a hard-coded `#1e293b`),
`QuickStartPage`, `SimulationControls`, the videohangout demo and two shared
demo components were built that way while the guard reported green and
`CLAUDE.md` recorded demo eradication as **complete**. Same failure shape as
`check-hex-colors` missing every directional form: the guard matched a
spelling, not the thing it was meant to prevent.

All 11 files are now converted — `SegmentedControl`, `Chip`, `Card`,
`ChatComposer`, `EmptyState`, `CodeBlock`, `IconButton`, `Button` — with
nothing allowlisted and no new primitive. Visual baselines were reviewed
individually and updated; the two shared demo components appear on every page,
which is why 33 routes moved.

### Added

`AgentMetricsSource` is now exported (mirroring `AgentRegistrySource`), plus
additive `actionError`/`clearActionError` on `useSyncConflicts`, `readOnly` on
`MappingRuleEditorProps`, `referenceOptionsLoading` on `TypedDocumentFormProps`,
`source` on `useAgentMetrics`, and `activeRuns` on the observability dashboard.

### Known gaps, flagged not fixed

`useGroups` has no mount-time fetch at all, so `GroupPanel` always reads "No
groups yet". `AgentsProvider` accepts a `baseUrl` and ignores it, serving
fixtures with no discriminator. `FieldTypesPage` discards its entire Step 2 on
save. `ImageLineageGraph` discards its `useNodesState` setter, so "Show all" is
a no-op and an async-fed canvas renders permanently blank. `useWebhookTriggers`
hands the user a webhook URL and signing secret for a relay that isn't wired.

## [2.95.0] — 2026-08-24

Four parallel efforts. **19 bugs**, plus the whole suite now runs under
React StrictMode. Tests 4,666 → 4,736.

### The suite runs under StrictMode

`configure({ reactStrictMode: true })` in `src/test-setup.ts`. RTL's
`renderHook` is built on `render`, so one flip covers hooks and components
alike — which was the deciding factor, since three of last release's
confirmed double-invocation bugs were hook-side. **87 tests across 33 files
failed** on the flip. Triaged individually: **5 were real bugs**, the other
83 were assertion churn.

The churn is worth describing, because "double the expected number" would
have been the wrong fix in every case: 42 tests looked up
`fetchMock.mock.calls[1]`, encoding "index 0 is the mount fetch" — now
selected by method/URL rather than re-hardcoded at `[2]`. 20 asserted
absolute poll counts — now deltas ("one interval adds exactly one fetch"),
a number identical with or without StrictMode, which is what makes it the
right expectation. 21 were append-only recorder fixtures, now keyed maps.

**One documented opt-out**, in `RecordingPlayer`'s hls.js block: the
component loads its engine with `import(/* @vite-ignore */ 'hls.js')`, and
that pragma stops vitest routing the specifier through `vi.mock`, so the test
file and the component don't reliably share a module instance. Verified this
is a test-infrastructure artifact and not the component: instrumenting the
effect shows both passes take the hls branch with a live video ref, pass 1
correctly bails on its own cancelled flag, and pass 2 runs through to engine
construction.

### Fixed — real bugs the StrictMode flip caught immediately

- **Fabricated data replaced real data.** `useSyncConflicts` reset a shared
  cancel ref to `false` at the top of each effect run, undoing the previous
  cleanup's cancellation. `refresh` is memoised on `idToken`, so after a token
  refresh the *old* token's request could still write — and both its 404 and
  its failure branches swap in `buildMockConflicts()`. The Sync Conflicts page
  silently replaced real conflicts with **fabricated rows**, and the operator
  then resolved and discarded against conflicts that don't exist.
- `useIngestSources` had the same resurrected flag: last-to-resolve won
  regardless of last-to-be-issued, so the list could be overwritten by a
  response fetched under the previous token.
- `useCallWidgetPersistence` marked a write pending on its *first* run, so any
  mount/unmount inside the debounce window persisted a value the user never
  produced — including re-creating a key the corrupt-JSON path had just
  deliberately removed.
- `useImageLineage`'s cache didn't dedupe concurrent callers, despite its
  header promising exactly that.
- `useApiHealth` could let a superseded `/health` sample mis-colour the
  degraded banner.

Three of these are the same anti-pattern `usePipelineMetrics` already warns
about in a comment. Nothing enforced it; now something does.

### Fixed — a failure that renders as an answer (6 bugs)

- **`getPipelineRun` conflated "not found" with "request failed"**, so a dead
  API rendered "Run not available — it may have been trimmed from history."
  The user is told their run was garbage-collected when the server is simply
  down. Now rejects for transport/5xx/401, resolves `null` only for a real
  404, and both callers gained real error branches — `PipelineRunReplayPage`
  offers a Retry; `PendingApprovalsPage` warns per card rather than falling
  through to "upstream steps haven't produced reviewable output yet", which an
  approver would act on.
- `usePendingApprovals`' "no endpoint" `null` also swallowed
  `TypeError: Failed to fetch`, rendering **"No pending approvals"** while runs
  sat blocked.
- `savePipeline` resolved whether or not the PUT landed: `dirty` cleared, the
  editor flashed **"Saved"**, and the user closed the tab believing the
  pipeline was on the server when it was localStorage-only.
- `publishPipeline` returned `null` for both "no such pipeline" and "publish
  failed", so the editor fired a green **"Pipeline published"** over a
  still-Draft pipeline.
- `useIngestItems` / `useIngestSources` wrote action failures into the *list
  loader's* error, so one rejected Skip hid a correctly-loaded table behind
  "Failed to load ingest items."
- `TypedDocumentForm`'s `coerceSingle` treated un-coercible as empty, silently
  stripping a bad optional number while the form said "✓ Saved".

`ObservabilityContext` now sends credentials without a hard `IdentityProvider`
dependency (new `useOptionalIdentityContext`), distinguishes 401/403 from
unreachable, and the pill reads "not authorized — fixture" instead of a muted
"fixture" whose tooltip blamed the backend.

### Fixed — collaboration (4 bugs)

- **Departing clients lingered in the participant list.** The awareness sender
  is debounced 50ms, and `destroy()` only cleared local state, so the "I've
  left" broadcast was scheduled *after* the channel unsubscribe — and on page
  unload never ran at all. Close a document and your avatar stayed in every
  colleague's list until timeout, or forever.
- **Presence was never attached to a section.** The awareness updaters were
  stable, but the *object* holding them was a fresh literal each render, and
  it sits in a 500ms auto-focus effect's dependency array — so a live session
  cleared and restarted that timer forever. No avatar on any section card, and
  follow-mode had nothing to aim at.
- **Duplicate sections were never repaired.** `dedupeSectionsById` ran only on
  the `synced` edge — before the other client's copy merged in. Two people
  opening the same new templated document saw every section listed twice,
  permanently, while the design comment claimed this pass healed the race.
- `itemErrors` (added in v2.93.0) is finally rendered: a section whose items
  failed to load no longer shows the same empty state as one with none.

### Fixed — resource leaks in video

- **A stranded screen capture kept Chrome's sharing bar up for the tab's
  lifetime.** `isScreenSharing` only flips true *after* `getDisplayMedia`
  resolves, so a second click during the OS picker acquired a second capture
  and orphaned the first — unreachable by any UI. Worse, the `ended` handler
  read the current ref, so "Stop sharing" on the stale bar killed the **live**
  share.
- **A detached `<audio>` kept playing.** The branch split deliberately never
  renders `<audio>` and `<StreamVideo>` together to avoid double playback, but
  React only *detaches* the node and a detached element with a live
  `srcObject` keeps producing sound — so a participant turning their camera on
  became audible twice for the rest of the call.
- The hls.js engine was keyed to render identity via an `onError` prop in its
  deps, so a parent mirroring `onTimeUpdate` rebuilt the decoder several times
  a second and the recording never advanced.

### Added

`StandaloneTiptap` gains opt-in `requireSync`. Bootstrap mode mounts before
any server snapshot arrives, so a user can type into what looks like an empty
document and have the server's content merge *around* their text. Opt-in
rather than default because a gateway that sends no snapshot for a brand-new
document never fires `synced`, and an unconditional gate would hang the editor
forever. `onFragmentReady` respects it too — seeding an unsynced doc is the
same corruption by another route.

Also additive: `useOptionalIdentityContext`, `ObservabilityProvider`
`authToken`/`fetchImpl`/`credentials`, `ObservabilityValue.unauthorized`,
`PipelineEditorContextValue.publishError`/`clearPublishError`/`publishedAt`,
`actionError` on the two ingest hooks.

### Packaging

The packed-tarball consumer check found that `optional: true` on the peer deps
is partly a lie: with them absent, **8 of 13 subpaths fail to import**, because
`shared/Chart.tsx` imports recharts at module scope and is `export *`'d from
the barrel. Not changed here — moving Chart out is breaking and needs a
consumer handoff — but the per-entry-point peer surface is now pinned by a
test tracking **static** and **dynamic** imports separately, since only the
static kind breaks the import itself.

## [2.94.0] — 2026-08-24

### Fixed — form labels outside `pipelines/`

The v2.89.0 `ConfigField` migration fixed 106 fields, but only inside
`pipelines/nodes/`. The same defect was live across `identity/`, `ingest/`,
`doc-types/`, `field-types/`, `social/`, `agents/`, `doc-editor/` and
`typed-documents/`: a caption rendered as a `<span>` — not even a `<label>`,
so `htmlFor` was never on the table — or a `<label>` with no `htmlFor`
wrapping no control. Either way the input announced as a bare "edit text"
with no name.

`FieldTypesPage` had the sharper version: its "Label is required" validation
message was plain text with nothing pointing at it, so a rejected field name
was announced **nowhere**. A screen-reader user pressing Next got silence and
no indication why the wizard didn't advance.

Adds `identity/shared/FilterField.tsx` for the repeated filter-control shape.

### Note on how this landed

The agent doing this work stalled before committing, so the source changes
were finished but its wizard test was mid-write. Completing it turned up
three things worth recording, because each one would have made the test lie:
the page opens on a saved-types list, so the wizard needs "+ New" clicked
first; Next is `disabled` until a field type is chosen, so the empty-name
error is only reachable as pick-type-**then**-advance; and the final
assertion was wrapped in `if (alert)`, which passes when the error is
announced nowhere — precisely the bug it exists to catch. It now asserts
unconditionally, and reverting the two source files fails all three tests.

## [2.93.0] — 2026-08-24

Four parallel efforts: a StrictMode hunt, an `api/` + `observability` audit,
the three deferred design items, and one loose end from v2.92.0.

### Fixed — controls that did nothing, or lied

`observability/` was reported to have `console.log` dead buttons. That report
was stale, but four controls were inert or actively misleading:

- **The time-range select on `MetricTimeSeriesPanel` was worse than inert** —
  it re-captioned all ten chart cards "Last 7d" while the plotted points
  stayed byte-identical. An operator reads a different question answered by
  the same data.
- `EventsPage`'s time-range select wrote a filter `visibleEvents` never read:
  "Last 15m" left hour-old rows on screen and the "N / M events" counter never
  moved. It now filters on a new `receivedAt` epoch stamp — `timestamp` is a
  clock string with no date, so it could not be compared at all.
- The refresh-interval select polled nothing: "Refresh: 5s" re-polled never,
  and "Off" kept hammering at 10s (measured: **7 polls in 60s** with the
  control set to Off).
- `DashboardKPIStrip` hard-coded its deltas, so every operator watching live
  bridge metrics saw the same invented `▲ 12%` under a real number, forever.
  Now host-supplied.

Unwired selects hide rather than render dead, following the file's own
existing `onResetZoom`/`onExportCsv` contract.

### Fixed — StrictMode / double-invocation (12 sites)

Two are **production-shaped**, not dev-only:

- `PipelineRunsContext` claimed its guard ref *before* a cancellable fetch, so
  on any same-fiber effect re-run (Suspense retry, Offscreen re-show, or
  `pipelineId` cycling A→undefined→A, which the editor's own load effect
  produces) the first pass started and cancelled the fetch and the second
  bailed on the ref. Run history never seeded — no error, no retry, just "no
  runs yet" for a pipeline that has them.
- `useVisionResults` / `useJudgmentResults` read *and rebuilt* a position index
  inside their `setRecords` updater, so the second pass read what the first
  wrote and a brand-new step looked like it sat at position 0. **With two
  concurrent vision/judge steps, the second silently overwrote the first's
  row.**

Dev-only but visible in demo and Storybook: `commit` pushed two undo frames
per edit (one Ctrl+Z looked dead) and returned its value unreliably;
`undo`/`redo` pushed two frames onto the opposite stack; `duplicateNodes`
returned 2N ids for N nodes, half pointing at clones never committed — and
callers select the returned ids, so duplicating could select a phantom node.
`useBBoxAuthoring` fired the host's `onChange` from inside an updater, so a
host that POSTs annotations wrote every edit twice.

**The suite does not run StrictMode** (`test-setup.ts` installs jsdom
polyfills only), so none of these was catchable by the existing 4,587 tests.
The new tests opt in per-file. Flipping it globally is its own task — expect
assertion churn on every mock call-count, most of it not real bugs.

### Fixed — retry that answered 401

`api/pipelineRetry.ts`'s `retryFromNode` was the only client in `src/api/`
omitting `credentials: 'include'`; its own sibling `forceFail` sends it. On a
cookie-auth deployment "Retry from this node" failed while Force-fail and
Resume on the same page worked.

### Fixed — the three deferred design items

- **Node layout is no longer lost on reload.** Drags wrote to localStorage
  only, so an arranged layout survived in one browser and nowhere else. Moves
  now mark the pipeline dirty and ride the existing debounced autosave —
  rejected a second position-only debouncer, which would have duplicated the
  coalescing and raced the autosave over one record. Reusing the autosave
  inherited its gaps, so this also adds a teardown flush (the debounce window
  was a data-loss window) and a real failure path.
  *Premise correction:* the feared "write per drag frame" doesn't exist —
  `PipelineCanvas` already filters to `dragging === false`. The real burst is
  Shift+Arrow key repeat.
- **`retryFromStep` reports its failure.** Not by rejecting — every call site
  is a bare `onClick`, so rejecting would convert each into an unhandled
  rejection. The reason surfaces through additive `retryError`, with a
  discriminator so "nothing to retry" reads differently from "the server
  refused".
- **`DiagnosticsPage`'s DLQ Redrive/Purge surface failures**, following the
  v2.91.0 sibling pattern rather than inventing a new one. A failed purge was
  completely silent — the admin believes the queue was purged when it wasn't.

### Fixed — a failed document section no longer reads as an empty one

`useDocumentItems`' per-section `catch` returned `[]`, which was the only
signal the caller got, so a section whose fetch failed looked exactly like a
section with no items. Adds `itemErrors` (additive). Note: no doc-editor
surface renders it yet, so this is fixed in state and not yet on screen.

### Added (all additive, no signature breaks)

`PipelineEditorValue.saveError` / `clearSaveError`,
`PipelineRunsValue.retryError` / `clearRetryError`,
`UseDocumentItemsReturn.itemErrors`, four optional props on
`MetricTimeSeriesPanelProps`, `runsTodayDelta`/`failed24hDelta` +
exported `KPIDelta` on `DashboardKPIStripProps`, optional
`EventItem.receivedAt`, an optional options arg on `usePipelineMetrics`.

### Audited clean

Five of six `src/api/` modules (query building skips undefined, encodes keys
and values, joins arrays; every file checks `res.ok`; the `runId`→`id`
mapping round-trips). Thirteen observability components including the
Live/Paused toggle, which genuinely gates both polls.

### Known gaps, flagged not fixed

`getPipelineRun` returns `null` for a transport failure as well as a 404, so
a dead API renders "Run not available — it may have been trimmed from
history"; fixing it needs `.catch` handling in two pages that have none.
`ObservabilityContext` sends neither `Authorization` nor `credentials` while
its sibling sends a bearer token to the same origin — if that endpoint is
protected, the dashboard pins to "fixture" forever.

## [2.92.0] — 2026-08-24

Three parallel hunts. **43 bugs.** Tests 4,304 → 4,584.

### Fixed — keyboard access (33 bugs across 31 files)

Two independent agents hit the same defect in unrelated files last release,
so it got a dedicated sweep. It was systemic.

- **25 controls had no keyboard path at all** — `onClick` on a `div`/`span`
  with no role, no `tabIndex`, no key handler. `video/TranscriptPanel.tsx`
  was the worst: `role="button"` **and** `tabIndex={0}` and no key handler,
  so you could Tab onto a transcript segment, see it focused, press Enter
  and have nothing happen — the video only ever seeked on mouse click.
  `pipelines/RunsTable.tsx`'s "View →" was a bare `<span>` inside a
  `stopPropagation` cell: a link-looking thing that did nothing for anyone.
- **6 handled Enter but not Space** on `role="button"`, so Space scrolled the
  page instead of activating.
- **4 affordances existed only on hover.** `renderers/tasks/TasksReaderRenderer`
  was not CSS hover but a conditional *render* on mouse state — there was no
  DOM node to Tab to, so a keyboard user could never mark an item acked or
  rejected. `doc-editor/ParticipantAvatars` hid Follow inside a
  mouse-only tooltip.
- **3 stranded focus on collapse** (`SidebarSection`, `shared/CollapsibleSection`,
  `SubNavLayout`) — focus drops to `<body>` and a keyboard user restarts
  their Tab walk from the top of the page.

`onActivationKey` was promoted from module-private in `CollapsibleSidebar` to
`src/lib/activationKey.ts` (not barrel-exported — no public API change).

### Fixed — failures that rendered as success (5 bugs)

Out of 243 `catch` blocks read, five hid a failure behind a normal-looking
result:

- `api/pipelineRuns.ts` resolved `{ runs: [] }` on its own failure, so a
  down/500ing endpoint rendered **"No runs yet. Trigger this pipeline to see
  history here."** `PipelineRunsPanel`'s error banner was unreachable code,
  and `PipelineRunsContext`'s localStorage fallback lived in a `.catch`
  nothing could trigger.
- `hooks/useFriends.ts` never checked `res.ok`, so a 401/500 with a JSON body
  gave `{followers: undefined} ?? []` — the Followers/Following tabs said you
  follow nobody, with no error and no retry.
- `hooks/useGroups.ts` `inviteUser` resolved on failure, and both invite forms
  `await` then clear the field: a rejected invite was pixel-identical to an
  accepted one.
- `typed-documents/TypedDocumentsPage.tsx` resolved `[refTypeId, []]`, so the
  reference picker rendered **disabled** under "No referenceable documents yet
  for this type" — the user is told the documents don't exist and cannot
  create the link. Adds optional `referenceOptionsErrors` to
  `TypedDocumentForm`.
- `pipelines/PipelineRunReplayPage.tsx` "↻ Re-run" was `console.error`-only:
  the click did nothing at all, so the user clicks again.

### Fixed — pipelines persistence and run state (5 bugs)

- **A read mutated data.** Every write-through cache write in
  `persistence/pipelineStorageRemote.ts` went through the *local*
  `savePipeline`, which bumps `version` and re-stamps `updatedAt`. Opening a
  pipeline you never touched returned it a version ahead and re-dated it;
  saving bumped twice and mutated the editor's live React state object; and
  publishing cached the definition one version ahead, so
  `version !== publishedVersion` read as "unpublished changes" immediately
  after a successful publish.
- `PipelineRunsContext` — a poll in flight when the terminal event landed
  rewound a `completed` run to `running`; the visualiser spins forever on a
  finished run. The existing comment claimed this was handled.
- `usePendingApprovals` replaced its map wholesale, silently discarding an
  approval that arrived while the page was loading — the run stays blocked on
  an approval invisible in both the panel and the badge.
- `PipelineEditorContext`'s load promise had no `.catch`, so an expired
  session (401/403) rejected unhandled and left the page on "Loading
  pipeline…" forever, with no error and no retry, even with a good cached
  copy present.
- `duplicatePipeline` let a clone inherit the source's `publishedSnapshot`.

### Fixed — `AgentCard` content drifted to the middle of the card

Caught by a visual baseline, not a unit test. Swapping the card `div` for a
`<button>` for keyboard access changed its layout: in the dashboard grid the
card stretches to the tallest card in its row, and Chrome vertically
**centers** a `<button>`'s content when the button is taller than it —
which `display: block` does not prevent. Now `flex flex-col`.

### Demo

`mockMfaUsers` gained `poolId`. `MfaManagementPage` hides its "Filter by
pool" control when no row supplies one, so the demo had been rendering a page
that could not demonstrate its own filter.

### Audited clean

`validation/validatePipeline.ts` (886 lines, zero prior tests — 42 cases
across every check and all 10 advisory lints, no defects found),
`detectCycles`, `handleCompatibility`, `runHistory`, `EventStreamContext`,
`WebSocketEventAdapter`. Retracted with reasons: storage-quota guards and
date/JSON formatting fallbacks returning neutral values (there `[]` and `''`
genuinely *are* the answer), `role="tab"`/`role="menuitem"` on real buttons,
and proper `aria-activedescendant` listboxes.

## [2.91.0] — 2026-08-24

Depth audit of `identity/` — 4,734 LOC across 34 files with 10 test files,
the weakest ratio in the repo, and it holds the auth flows.

### Fixed — MFA codes submitted more than once

`identity/shared/CodeInput.tsx`. The file's own comment already documented
this bug as fixed. It had been fixed only for the typing path — the only
path the tests covered.

- **Retype (the damaging one).** Editing a digit of an already-complete code
  never returned it to an incomplete state, so the submit effect fired once
  **per keystroke** with a half-updated code. Typing a fresh code over an old
  one sent six verification attempts — `211111`, `221111`, `222111`, …
  `222222` — five of them garbage. The flow that hits it is the ordinary one:
  first attempt fails, the authenticator rolls over, the user types the new
  code over the old digits. Identity servers rate-limit and lock accounts on
  failed MFA attempts, so one honest retry could burn a user's whole budget.
- **Paste.** A full paste ran a stray `setTimeout(onComplete, 0)` on top of
  the completion effect, so a TOTP pasted from a password manager verified
  twice and the second attempt failed on a single-use code — the user sees
  "invalid code" after pasting a correct one. The timer was untracked, so it
  also fired after `onComplete` had navigated away and unmounted.

### Fixed — destructive actions swallowed server failures (6 pages)

The state reset lived in `finally`, so a **rejected** delete closed the
dialog exactly like a successful one: no message, no `role="alert"`, and the
row still sitting there. Every pre-existing delete test used
`mockResolvedValue`, so the rejection path was never exercised at all. Fixed
in `UserListPage`, `GroupListPage`, `PoolListPage`, `ApplicationListPage`,
`EmailTemplateListPage` (delete + test-send) and `MfaDashboardPage` (remove +
rename) — the dialog now closes on success only and shows the reason inline.

`MfaDashboardPage` is the sharpest case: a user who believes they removed
their last MFA device, and didn't, thinks MFA is off until the next sign-in
demands it.

### Fixed — dead pool filter

`MfaManagementPage.tsx` wrote `selectedPool` from the Select and read it
nowhere. An admin picking a pool saw every user in every tenant, in what
reads as a filtered adoption view.

### Added

`MfaManagementPageProps.users[].poolId` (optional, non-breaking) — rows
cannot be filtered without it. The control now hides itself when no row
supplies one, rather than rendering a dropdown that cannot work.

### Audited clean

`IdentityContext` (a plain context — no token lifecycle or refresh timers at
all), `DiagnosticsPage` auto-refresh (already stabilised via
`useEventCallback`), and the six `*FormPage` components (host-owned `error`
prop rendered in a Banner — a coherent contract, not a swallow). The
index-shift pattern that caused data loss in `ingest/MappingRuleEditor` does
**not** exist here: every confirm/edit/rename state is keyed by string
entity id, so no destructive action can retarget after a reorder.

### Known gap

`DiagnosticsPage`'s DLQ Redrive/Purge are bare pass-throughs with no error
surface on the page, so a failed purge is still silent. Fixing it means
designing an error region for that page rather than the mechanical change
the other six took.

## [2.90.1] — 2026-08-24

**Fixed** — `npm run build` now works inside a git worktree. It was the only
script that didn't, because it named `./node_modules/vite/bin/vite.js` as a
filesystem path and a worktree has no `node_modules` of its own; `test` and
`lint` were unaffected since Node's resolver walks up to the repo root for
module specifiers, but a literal path never gets that. Agents doing the work
live in worktrees, so this silently removed the build from their gate.
`scripts/vite-build.mjs` resolves the manifest instead. Verified in both a
normal checkout and a worktree with no `node_modules`.

## [2.90.0] — 2026-08-24

Four parallel audits of areas the coverage numbers said were already
covered. **15 bugs**, ~1,100 new test lines, `4,159 → 4,288` tests.

The theme: a test file existing says nothing about which surface it covers.
Every area below had tests. They covered rendering and click callbacks, and
the bugs were all one layer down — in collapse mechanics, timers, focus,
async ordering and registration.

### Fixed — data loss and runaway requests

- **Autosave silently dropped an edit made during a save**
  (`pipelines/context/PipelineEditorContext.tsx`). The debounced save
  resolved with an unconditional `setDirty(false)`, so persisting version A
  cleared dirty even though the user had already typed B. The autosave
  effect's cleanup then fired on the `dirty` transition and killed B's
  pending timer, so **B was never written at all**. The editor read "saved"
  while the last edit existed only in memory, and was lost on reload. Fixed
  across autosave, `save` and `publish`.
- **Request storm against a failing endpoint**
  (`pipelines/judge/JudgmentResultViewer.tsx`). The lazy-load effect bailed
  only on `lazyText !== null`, but a rejection leaves it null, and
  `lazyLoading` was in the deps — so the true→false flip re-fetched, forever.
  Measured **13,259 calls in a 100ms window**: the panel strobes between
  spinner and error and pegs a core.
- **A new section's items vanished** (`hooks/useDocumentItems.ts`). Keyed on
  a section-id list that grows while mounted, overlapping batches replaced
  the whole map instead of merging, and a per-section catch swallowed
  failures into `[]` so a stale batch always resolved and always won.
- **Phantom call broadcast to every collaborator** (`hooks/useVideoCall.ts`).
  `joinSession` absorbs its own failures into `error` state and resolves
  normally, so `startCall`'s bare `await` fell through to the CRDT meta
  write: you saw an error locally, everyone else saw a live call nobody was
  in and couldn't join. The comment above that `await` already claimed this
  was prevented.
- **Reader crashed the whole document on an unrecognised item status**
  (`renderers/tasks/TasksReaderRenderer.tsx`), and — separately — silently
  **dropped** such items, since three status groups were three positive
  filters and anything matching none vanished with no error. Malformed
  `links` metadata blanked the link-block renderers the same way.

### Fixed — keyboard and screen-reader access

- **Collapsed sidebar sections stayed fully reachable.** Collapse only set
  `max-height: 0`, so screen-reader users still heard every row of a
  "collapsed" section and Tab still walked into them. Now `inert` +
  `aria-hidden`, keeping the height transition.
- **Disclosure headers announced nothing** — a `role="button"` div with no
  `aria-expanded` and no `aria-controls`. Now real buttons inside named
  `<section>` regions.
- **Space was dead** on every `role="button"` row (sidebar items, "+ New",
  "See all", notification banners): Enter was handled, Space scrolled the
  page instead.
- **Focus was stranded on collapse** in two places — inside the hidden
  subtree in `CollapsibleSidebar`, and on `<body>` in `AppLayout`, which
  swaps the sidebar for `CollapsedIconStrip` and unmounts the focused
  control. A keyboard user silently restarts their Tab walk from the top of
  the page. `AppLayout` now hands focus to the counterpart control in
  whichever chrome mounted, in both directions.
- **The app menu had no way out** but re-clicking the trigger — Escape and
  click-outside now close it and restore focus.
- **Only the first reconnect-exhaustion ever toasted** (de-duped on the error
  code, not the occurrence), and the toast's "Reconnect" button called a
  **stale `onReconnect`** — it outlives the render that queued it, and the
  prop is normally an inline arrow. Now via `useEventCallback`.

### Fixed — theming

`DecisionsReaderRenderer` group headers and the `TasksReaderRenderer`
due-date pill used raw palette hexes while the badges beside them used tone
tokens, so overriding `--color-warning-fg` re-toned half the component.

### Changed

- `useClickOutside` accepts `RefObject<T | null>` — its old signature
  rejected every ref a component can actually create under React 19 types,
  including the hook's own JSDoc example. Source-compatible widening.

### Tests

`renderers/` 10 → 13 files (134 → 201 tests), `AppLayout` 16 → 61,
`CollapsibleSidebar` 26 → 39.

Two of the new suites exist because the old ones **passed against the bug**:
`registry.test.ts` registers its own fakes and never imports the barrel, so
it was green against a completely empty registry — precisely the
`sideEffects: false` failure mode. And the per-renderer suites test each
half against a hand-typed fixture, so a metadata rename left both green
while every real document showed its empty state; the new round-trip drives
the editor and renders the reader from what it emitted.

Every behavioural fix was verified by reverting it and confirming the new
test fails. That step earned its keep three times this release: two theming
tests matched on `#` and JSDOM normalises to `rgb()`, and one storm test
damped 13k calls to 2 because `mockRejectedValue` reuses a single Error
instance and `waitFor` nests its own `act`. All three passed against
unfixed code before the revert step caught them.

## [2.89.0] — 2026-08-24

### Node config panel accessibility (106 fields across 30 panels)

`ConfigField` renders the label for every node config panel in
`/pipelines`, and its `<label>` had neither an `htmlFor` nor a wrapped
control — so it labelled **nothing**. A screen reader landing on a pipeline
node's inputs announced "edit text" / "spin button" with no name at all, and
the help and error text underneath was equally unreachable. Roughly 40% of
panels had papered over it with an `aria-label` on the control.

Those compensating labels turned out to be a second bug rather than a fix:

- `MemoryConfig` announced five controls with *different words* than the
  label beside them — "Memory mode" next to a label reading "Mode". No
  sighted user could see the name being read aloud, so nobody could report
  the mismatch.
- `GraphQueryConfig` and `KnowledgeBaseConfig` hardcoded "Graph ID" and
  "Knowledge base ID", but the visible label comes from the host's
  `nodeVocabulary`. A host that relabelled the field got two contradictory
  names for one input.
- Five existing tests queried the invisible `aria-label` rather than the
  visible one, so they would have kept passing if the visible label were
  deleted outright. They now assert the accessible name the label produces.

**Fixed** — 106 fields wired across all 30 panels: 85 through
`controlId`/`render` so the `htmlFor` association is real and
`describedById` reaches the help text, and 21 as `role="group"` where the
field holds a radio set, a chip editor, a button row, or two boxes that are
one value. `htmlFor` pointing at a `<div>` associates nothing — browsers,
screen readers and `getByLabelText` all ignore it. Two controls that had no
name whatsoever gained one (`ApprovalConfig`'s timeout amount,
`JoinConfig`'s "N" box).

### Added — `labelId` in `ConfigField`'s render wiring

Grouped fields need to name themselves, and the only tool available was an
`aria-label` repeating the label text — a copy that drifts the moment
someone edits the label, and that is wrong on arrival when the label comes
from `nodeVocabulary`. `ConfigField`'s render prop now hands out `labelId`
alongside `controlId` and `describedById`, so a group points at the real
label element with `aria-labelledby`. All 19 in-scope groups use it; the
aria-hidden required marker is dropped by accessible-name computation, so
the names are unchanged.

`CropConfig` is the one documented exemption — its canvas is a *sibling* of
the `ConfigField`, so the group is the field's parent and the id is out of
scope. It names itself from the same exported constant the label renders.

### Tests

`configFieldWiring.test.tsx` (37) and `image-config-a11y.test.tsx` (19)
query by visible label text and assert the control comes back, which only
passes if the association actually resolves — asserting the attribute exists
would prove nothing, since an id pointing at no element still "has an id".
A source guard rejects a literal `aria-label` on any group inside a
`ConfigField` render prop: the behavioural tests pass either way, so they
cannot catch the drift that started all this.

## [2.88.0] — 2026-08-24

Three bugs in three days shared one root cause, so this release goes after
the **class** rather than another instance.

### Added

- **`useEventCallback`** (exported from `/hooks`) — a callback whose identity
  never changes but which always invokes the latest function. Use it when a
  callback prop needs to go in a dependency array. Plain `useCallback` is
  still correct for a callback handed to a memoised child; that one *should*
  change when its inputs do.

### Fixed — the same bug, found by hunting for it

A targeted search for "timer effect whose dependency array contains a
callback prop" over the whole tree returned five sites. Three were real:

- **`DiagnosticsPage`'s "Auto-refresh (10s)" never refreshed.** The interval
  depended on `onRefresh`, a **required** prop that callers pass inline — so
  every parent render tore the interval down and started a new one. Worse,
  `onRefresh` fetches, and fetching re-renders the parent, so the clock reset
  on its own results. On a page whose entire purpose is live diagnostics,
  with a checkbox advertising the behaviour in its own UI.
- **`FollowModeBar`** defers registering its interaction listeners behind a
  timer; an unstable `onStopFollow` restarted that timer every render, so the
  listeners never registered and follow-mode never auto-unlocked.
- **`PipelinesBulkActionBar`** defers registering click-outside handlers for
  both tag popovers the same way — so neither could be dismissed by clicking
  away.

`CallStartedBanner` (the first instance, v2.83.0) is retrofitted onto the
shared helper rather than keeping its hand-rolled ref.

### A note on the test

The first version of the `DiagnosticsPage` regression test **passed against
the bug**, because its final `advanceTimersByTime(10_000)` let the
freshly-created interval fire once. It now re-renders every 4s for 40s and
never lets 10s elapse without a re-render in between, so the buggy version
records exactly zero ticks. Caught by running it against the reverted fix —
which is the only reason to bother doing that.

## [2.87.0] — 2026-08-24

### Fixed

- **Editing your own social profile wiped what you typed.** `ProfileCard`
  seeds four form fields from its `user` prop and had a reset effect keyed on
  `[user]` — the **object**. `publicProfileToUserProfile` builds a fresh
  object on every call, so the effect fired on essentially every parent
  render and overwrote display name, bio, avatar URL and visibility with the
  server's values, mid-edit, with no warning. Now keyed on `user.id`, which
  preserves the intent — switching to a different profile still resets the
  form — while leaving an in-progress edit alone. Reported by the v2.85.0
  performance audit, which correctly declined to fix it there because it
  changes behaviour. The regression test types into the field, re-renders
  twice with a new-but-equal profile object, and asserts the text survives;
  verified to fail against the `[user]` dependency.

This is the third instance of the same root cause in three days —
`CallStartedBanner` (v2.83.0) and `WrappedActivityPanel` (v2.85.0) were both
an unstable identity in an effect's dependency array. The other two silently
disabled a timer; this one silently destroyed user input.

## [2.86.0] — 2026-08-24

An accessibility audit going deeper than the earlier surface sweep (which
had already taken unlabelled icon buttons and keyboard-unreachable click
targets to zero). +49 tests.

### Fixed — overlays that trapped nothing

- **`Drawer` had no focus trap and no focus restore.** Tab off the last
  control walked into the page *behind* the drawer; closing it dropped focus
  on `<body>`, so the next Tab restarted from the top of the document.
- **`VideoPlayerModal` declared `role="dialog" aria-modal="true"` with no
  focus management whatsoever** — focus never entered it, never cycled, and
  never came back.
- **`ImageLightbox`** restored focus but did not trap it, so Tab landed on
  controls behind a fully opaque overlay: focus visible to nobody.
- **`Modal` used `aria-label={title}`**, so a modal rendering its own heading
  had no accessible name — `CommandPalette` and `NewDocumentModal` both
  announced as a bare "dialog". Same for `InlinePopover`'s `role="dialog"`.

`Modal` and `InlinePopover` were already exemplary (trap + restore + Esc) and
were deliberately left alone rather than churned onto the new shared
`src/lib/focusTrap.ts`.

### Fixed — composite roles that promised a keyboard contract they did not implement

Each of these set `tablist`/`radiogroup`/`menu` and implemented none of the
expected keys, with every item its own Tab stop: `PipelineRunReplayPage`,
`SocialPanel` (both its tablist and its radiogroup), `RunsFilterBar`,
`CanvasContextMenu`, `EditorOverflowMenu`. Two were worse than incomplete —
`PoolScopedLayout` had `role="tab"` children with **no `tablist` owner at
all**, and `LoginPage` put `role="tablist"` on a `<nav>`, which replaces the
navigation landmark so the element announced as neither. New helper
`src/lib/rovingFocus.ts` uses manual activation, so arrows move focus and
native Enter/Space activates — clicking behaves exactly as before.

### Fixed — ARIA that actively misled

- **`ScatterPathPicker` declared `role="listbox"` over plain `<button>`s**, so
  a screen reader announced "Available output paths, list box" containing
  **zero items**, and selection (a background tint and ring) was never
  conveyed. Now an honest labelled group with `aria-pressed`.
- **`QuickInsertPopover`** moved a highlight with the arrow keys while focus
  stayed in the search box and nothing linked them, so arrowing the list
  announced **nothing**. Now a proper combobox.
- **`Toast` carried `role="alert"` *and* `aria-live="polite"`** — conflicting,
  with unspecified precedence. Now `role="status"` for info/success and
  `role="alert"` for warning/error, matching what `Banner` already did.

### Fixed — form semantics on the primitives everything else uses

- **`invalid` was styling only on `Input`, `Select` and `Textarea`**: a red
  border and nothing in the accessibility tree. These back every form in the
  library, so a rejected field looked wrong and announced as fine. Now sets
  `aria-invalid`, with an explicit caller value still winning.
- **`NumberInput` silently dropped `id`, `name`, `required` and every
  `aria-*`** because its props were a closed interface — so any
  `<label htmlFor>` aimed at one pointed at nothing.
- `FormField`'s `required` asterisk is now `aria-hidden` with the state
  exposed programmatically; `NewDocumentModal` and `CookbooksModal` gained
  real label association.

### Partly fixed — the largest finding, migration owed

`ConfigField`'s `<label>` had no `htmlFor` and did not wrap its control, so
**it labelled nothing**. That wrapper backs **117 fields** across the node
config panels, and roughly 60% of those controls pass no `aria-label` of
their own — they announce as a bare "edit text" or "spin button", with help
and error text unreachable via `aria-describedby`. Opt-in `controlId` /
`render({ controlId, describedById })` wiring is in place with one panel
migrated as a worked example. A blanket `role="group" aria-labelledby`
fallback was tried and **rejected**: it double-announces the name in the
~40% of panels that already label their control, and broke 9 existing tests
for exactly that reason. The remaining ~116 call sites are per-panel work.

## [2.85.0] — 2026-08-24

A render-performance audit. All 12 changes are behaviour-preserving — except
one, which turned out to fix a user-visible bug.

### Fixed — a bug the perf audit found

- **`WrappedActivityPanel` stopped the activity feed rotating entirely.** It
  built `items` with an inline `adaptActivityEvents(...)` call, so the array
  had a fresh identity every render — and `ActivityFeed`'s rotation-timer
  effect keys on `items`. Any parent re-rendering faster than `rotateMs`
  (4200ms default) restarted the timer before it could fire, so the feed
  never advanced. Exactly the same shape as the `CallStartedBanner` bug in
  v2.83.0: an unstable identity in a timer effect's dependencies.

### Fixed — measured render waste

- **Two context providers rebuilt their `value` inline** (`ThemeContext`,
  `AgentsContext`). Context propagation bypasses `React.memo`, so *every*
  consumer re-rendered whenever anything above the provider did. Measured
  with a memoised consumer and a render counter: **6 consumer renders across
  5 unrelated ancestor renders → 1**. Bites on any router transition in a
  host app.
- **`ReactionOverlay` re-rendered at 2 Hz for the entire duration of every
  call.** Its 500ms expiry sweep returned `prev.filter(...)` unconditionally,
  and `filter` always allocates a new array. Measured with `<Profiler>`:
  **22 commits in the first 10s → 5, then flat**; with no reactions on
  screen it now commits never.
- **The repo's only `React.memo` was a no-op.** `VisionNode` passed
  `footerInfo` as an inline object and `onRetry` as an inline arrow, so
  `memo(VisionResponseFooter)` never skipped a single render. React Flow
  re-renders every custom node on pan, zoom and selection, so this cost on
  every canvas interaction.
- **`EditorTopBar` ran the full graph validator in its render body** — cycle
  detection and handle-compatibility across every node and edge — and it
  re-renders on every WebSocket step event during a live run. A 40-node
  pipeline emitting 200 events revalidated 200 times.
- **`EntityTable` discarded its callers' memoisation** (regression from the
  v2.72.0 façade, mine): it rebuilt `dtColumns` inline, and `columns` is a
  dependency of both of `DataTable`'s `filtered` and `sorted` memos — so the
  entire dataset was re-filtered and re-sorted on every render, including
  every keystroke in the table search. All seven identity admin pages
  already memoise their columns; the façade threw that away one level down.
- Also: `PipelineCanvas` rebuilt every node's `data` on each replay tick
  (the sibling edge effect 20 lines below already did this correctly),
  `CodeBlock` re-ran a three-regex highlighter just to toggle its copy
  button, `AgentFlowCanvas` had a `[]` default literal defeating two layout
  memos (one O(edges×agents)), `TabbedEventLog` made six passes over 200
  entries per render, and `useActiveSpeaker` allocated a `Float32Array` per
  participant per 200ms tick — GC churn its sibling `useMuteWhileTalking`
  already avoids.

### Deliberately not changed

`PresenceContext`/`WebSocketContext`/`IdentityContext` take `value` as a
prop — stability belongs to the host. `useActiveSpeaker`'s effect deps
rebuild the whole AudioContext graph when any participant field changes;
keying on IDs + stream identity would fix it but risks a stale analyser on
a real stream swap. `useLatestStepForNode` rescans all runs per node per
event and needs a per-node selector, not a narrower dep array. Several
components (`EventRow`, `ParticipantTile`, `TaskItemRow`) would need
call-site changes to benefit from `memo`, and they are stable public
exports. Two further real bugs were reported but not fixed because the fix
changes behaviour: `SocialPanel` resets form state from its `user` prop
with no guard, clobbering what the user has typed.

## [2.84.0] — 2026-08-24

The README is the library's front door, and it was misinforming people.

### Fixed

- **The README's quick-start advertised three exports that do not exist.**
  `TipTapEditor` (the export is `TiptapEditor`), `PipelineEditor` (it is
  `PipelineEditorPage`) and `ObservabilityDashboard` (it is `DashboardPage`).
  A consumer copy-pasting the first code sample got three import errors.
- **It claimed to be published**, and pinned `2.19.0` (we are at 2.84.0).
  Nothing is published — both scopes still 404 and every consumer is on a
  `file:`/git-SHA pin (hub #1493). That is now stated up front rather than
  discovered at `npm install`.
- **Its stability table contradicted CLAUDE.md**, the source of truth:
  `/pipelines` and `/doc-editor` were listed **In-flux** when both have had
  frozen APIs since 2026-06-10, and `/agents` likewise. Someone reading the
  README would have assumed those surfaces could churn under them.
- Consumer list named `websocket-gateway`, which has been renamed to
  `realtime-examples`. Test/story counts were off by ~2× and ~5×.

### Added

- **`npm run lint:readme`** — checks every
  `import { … } from '@connorhoehnslalom/ui-components…'` in the README
  against the barrel that subpath actually maps to, following `export *`
  re-exports one level. Verified to fail on the real `TipTapEditor` typo.
  Docs drift silently; this is the cheapest place to stop it.
- **`description`, `keywords` and `homepage` in `package.json`** — all were
  absent, so the package would publish with no registry description and no
  search terms.

### Not done — needs your decision

- **There is no `license` field and no LICENSE file**, and the package is not
  marked `private`. For a package slated to publish (#1493) that is a real
  blocker: many organisations' dependency scanners reject unlicensed
  packages outright, and consumers have no stated terms. Choosing a licence
  is an owner decision, so this is reported rather than guessed at.

## [2.83.1] — 2026-08-24

### Fixed

- **Storybook and the demo server could not build in a git worktree.** Both
  configs aliased the `@connorhoehn/realtime-modules` peer dep at its TS
  source (it ships a CJS dist whose named exports Rollup cannot see), but
  each hardcoded where `node_modules` lives — `.storybook/main.ts` via
  `process.cwd()`, `demo/vite.config.ts` via `<configdir>/../node_modules`.
  A worktree has no `node_modules` of its own, so both resolved to a path
  that does not exist and the build failed with an opaque
  `UNLOADABLE_DEPENDENCY`. **Four separate agent runs hit this**, each
  papering over it with a throwaway symlink.
  Both now use `scripts/resolve-realtime-modules.mjs`, which walks up from
  the calling config file. That is correct in a normal checkout and in a
  worktree, because worktrees live under `<repo>/.claude/worktrees/` — so
  walking up reaches the real checkout's `node_modules`. Verified by
  building Storybook from a worktree containing no `node_modules` at all.
  - Known limit, and deliberate: a worktree created *outside* the repo still
    cannot resolve it, since there is nothing to walk up to. The helper
    falls back to the conventional path so the error names something a human
    recognises. Run `npm install` in such a worktree.

## [2.83.0] — 2026-08-24

Closes the three lifecycle items v2.82.0 deferred. Each was deferred as
"needs a decision", but on inspection the existing behaviour is clearly
unintended in all three, so the decision is just to fix them.

### Fixed

- **`CallStartedBanner` never auto-expired for most callers.** `onDismiss`
  was an effect dependency, and callers almost always pass an inline arrow —
  a new identity every parent render tore down the 30s timer and started it
  again. In any UI that re-renders at least once per `autoExpireSec` (a live
  call: presence updates, an elapsed ticker) the banner simply stayed up
  forever. The callback now lives in a ref so the timer depends only on the
  duration. The regression test re-renders five times across the window with
  a fresh arrow each time and asserts exactly one dismissal.
- **`useCallWidgetPersistence` threw away the position you just set.** Its
  debounce cleanup discarded any pending write on unmount, so a widget
  dragged within `debounceMs` (200ms) of the call closing never had the new
  position saved — defeating the point of a persistence hook. It now flushes
  on unmount, and on key change so the old key keeps its final value. The
  pending-write flag is tracked separately from the timer handle, because
  cleanups run in effect-definition order and the debounce cleanup clears
  the handle first.
  - The existing test asserting the *old* behaviour ("does not call setItem
    when unmounted") was inverted rather than deleted: that assertion was
    pinning the bug. It now also asserts the flush happens exactly once, so
    a flush plus a late timer can't double-write.
- **`useYjsDoc` removed a listener that was never registered.** The mount
  effect registered `'synced'` with its own arrow; the doc-rebuild effect
  called `off('synced', …)` passing its *own* hoisted declaration — a
  different function object — so the removal was a no-op. Masked today only
  because `provider.destroy()` runs immediately after and drops all
  observers; a real leak the moment that stops being true. All effects now
  share one stable `handleSynced`, so `on`/`off` always pair.

Both new behavioural fixes were verified to fail against the pre-fix code
before being kept.

## [2.82.0] — 2026-08-23

A resource-leak and effect-cleanup audit — the failure class our test suite
structurally cannot see, because vitest unmounts everything immediately and
Playwright reloads between tests. A leak here only shows up in a long-lived
consumer app.

### Fixed — confirmed leaks

- **`useAuth` leaked an immortal token-refresh chain.** `scheduleTokenRefresh()`
  is assigned from three async Cognito callbacks, but the only cleanup belonged
  to the session-restore effect. A timer scheduled *after* that cleanup ran was
  owned by nobody — and firing it scheduled the next one. Mount a `useAuth`
  consumer, let `getSession` reach the network, navigate away before it
  resolves, and you get a chain refreshing tokens and writing `localStorage`
  for the life of the tab, with a fresh independent chain per race.
- **`WrappedReactionsOverlay` never expired reactions in a burst.** The expiry
  timer was tied to the effect's lifecycle, so React ran its cleanup when the
  *next* reaction arrived — cancelling the previous reaction's still-pending
  expiry. Any burst faster than `ttlMs` left every reaction but the last on
  screen for the life of the mount. Each reaction now owns its handle.
- **`usePipelineMetrics` could spawn a duplicate immortal poll with a stale
  token.** Its `mountedRef` was shared across effect runs and reset to `true`
  on each, so when `idToken` refreshed mid-flight the old fetch's `.finally()`
  scheduled into a closure the new `stopPolling()` could not reach.
- **`CanvasCursorBoard`** created one untracked 1s timer per trail particle on
  every (deliberately un-throttled) mousemove — a fast drag at unmount
  stranded hundreds of detached nodes.
- **`useTrackStateBump`** re-derived its track list at cleanup time, so a track
  added and removed via `addtrack`/`removetrack` kept all three listeners,
  pinning an unmounted fiber.
- **`useAgUiStream` had no `useEffect` at all** — unmounting mid-stream left the
  SSE read loop running against a live connection.
- Plus async effects writing state after unmount (`PipelineRunsContext`,
  `SourceDetailPage` — which also fixes older responses overwriting newer ones
  when switching sources quickly, `AdjustLayerSliderPanel`), and ~15 callback
  timers never cleared, including the `PipelineRunReplayPage` resume toast
  scheduled immediately before the `navigate()` that unmounts the page.

### Fixed — a StrictMode double-submit of single-use codes

- **`CodeInput` submitted a completed TOTP twice.** `setTimeout(() =>
  onComplete(code), 0)` sat *inside* a `setValues` updater, and React
  deliberately double-invokes updaters in StrictMode to surface impurity — so
  the deferred submit was scheduled twice. Because a TOTP is single-use, the
  second attempt failed and the user saw "invalid code" on a **correct** entry.
  Completion now fires from an effect with a ref guard making it exactly-once,
  surviving inline-arrow `onComplete` identities, and re-arming when the code
  is corrected. The stray timer is gone entirely. Tests run inside
  `<StrictMode>` — the configuration that reproduced it — and were verified to
  fail against the original implementation.

### Verified clean, left alone

All 8 `URL.createObjectURL` sites revoke correctly, and every `ResizeObserver`
/`IntersectionObserver` disconnects. The shared module-level `AudioContext` in
`useActiveSpeaker`/`useMuteWhileTalking` is a documented deliberate singleton
(Chrome warns past ~6 contexts, hard-limits near 25) and both effects do
disconnect their per-participant nodes.

### Reported, not fixed — need a decision

- `CallStartedBanner` depends on `onDismiss`, so a caller passing an inline
  arrow restarts the auto-dismiss timer every parent render and the banner
  never expires. The cleanup is correct; the dependency is the bug.
- `useCallWidgetPersistence` discards its pending debounced write on unmount,
  so a position changed within 200ms of closing is never persisted.
- `useYjsDoc` calls `provider.off('synced', …)` with a different function
  identity than it registered — currently harmless only because
  `provider.destroy()` drops all observers.

## [2.81.0] — 2026-08-23

Console-hygiene pass, closing out the stub audit.

### Fixed

- **The doc-editor reassigned the host application's global `console.warn`.**
  `TiptapEditor.tsx` replaced `console.warn` at **module import** — not on
  mount — permanently and without ever restoring it, in order to swallow one
  Tiptap `extension-collaboration` compat warning. Any app that merely
  imported the doc-editor barrel had its console wrapped by us, for the
  lifetime of the page, silently dropping any warning whose first argument
  mentioned that string. A library has no business doing that to its host.
  It was also **unnecessary**: `StarterKit.configure({ history: false })` is
  the documented fix for that warning and is already applied. With the patch
  removed, the editor mounts with a real `Y.Doc`, `Awareness` and the
  `Collaboration` extension across 301 doc-editor tests and emits nothing.
  Pinned by a test asserting that importing the module — and the barrel —
  leaves `console.warn` identical; verified to fail with the patch restored.

### Changed

- **`useCollaborativeDoc().loadFromMarkdown` is now marked
  `@deprecated / NOT IMPLEMENTED` in its type.** It is part of the published
  return shape of a public hook, and its signature — `(markdown: string) =>
  void` — gave a consumer no hint that calling it logs a warning and does
  **nothing** to the document. Removing it would be breaking, so instead the
  interface now says so plainly, and the JSDoc ships in `dist/hooks.d.ts`
  where a consumer's editor will surface it before they call it. The warning
  is namespaced so it is attributable, and the test now also pins that the
  call leaves the document unchanged rather than partially loading.

### Audit note

The remaining 24 `console.warn` calls in `src/` were reviewed and left: all
sit on genuine error or degraded paths (failed clipboard writes, localStorage
quota, fetch failures, unhandled stream events) and are consistently
namespaced. Zero `console.log` remain.

## [2.80.0] — 2026-08-23

Continues the stub audit: the last dead affordance is now live.

### Fixed

- **`ConfigPanel`'s Runs tab rendered a hardcoded `"No runs yet."` for every
  node, always** — in the **frozen** `/pipelines` barrel — even though the
  run data it needed was already reachable from that same barrel. A tab that
  can only ever be empty is worse than no tab: it actively tells the user
  there is no run history when there may well be one. It now shows the
  selected node's latest step execution: status pill, duration, relative
  start time, the error as a `role="alert"` when the step failed, and the
  output rendered as formatted JSON.
  - Safe by construction: `useLatestStepForNode` reads `PipelineRunsContext`
    directly and returns `null` when no provider is mounted, so a bare editor
    falls back to exactly the empty state it showed before. That fallback is
    pinned by a test.
  - The status→tone map is typed `Record<StepStatus, StatusPillState>`, so
    adding a status to the union becomes a compile error here rather than a
    silently unstyled pill.
  - This is a rendering change only; no export or prop signature moved, so
    the barrel's frozen API is untouched.

### Audit note (no change)

- `HangoutGrid`'s `"paginate beyond 16 — TODO"` was checked and is **not** a
  data-loss bug: rows are computed as `ceil(count / cols)`, so every
  participant renders. The TODO is about tile size at high counts, not
  dropped participants.

## [2.79.0] — 2026-08-23

A stub audit. Most of what it found was already honestly labelled (the
in-flux `/observability` fixtures, the renderers' documented v1 stubs). Two
things were not, and both were misleading consumers rather than merely
unfinished.

### Fixed

- **`ShortcutsHelp` taught users dozens of shortcuts that do not exist.** Its
  header explained why: it mirrored the shortcut map in *PIPELINES_PLAN.md* —
  the design, not the code. Of its five sections only **Pipeline Editor** was
  actually implemented. `PipelineRunReplayPage` and `EventsPage` have **no key
  handling whatsoever**, so the Replay Viewer and Event Stream sections were
  entirely fictional; the Global section advertised a ⌘K palette that is never
  mounted and `g p`/`g o` sequences for which no handler exists anywhere. Worst
  of all, the List view advertised four shortcuts it did not have **while
  omitting the three it did** (`Esc`, `⌘A`, `Delete`).
  Unwired rows are now flagged `planned` and render dimmed, struck through and
  tagged, so the panel documents intent without claiming it works; the three
  real list-view shortcuts are listed for the first time. A test pins that ⌘K
  is marked planned while the editor's `⌘S` — which genuinely is wired — is
  not, so this cannot degrade into a blanket disclaimer.
- **`useAgentRegistry` served synthetic agents with no way to tell.** `/agents`
  is documented as a **stable** API, but the hook seeds state from
  `fixtureAgents` and *keeps* them both when no `baseUrl` is configured and
  when a fetch fails — so a consumer whose backend was down rendered
  plausible-looking fake agents beside an error. It now returns a
  `source: 'fixture' | 'remote'` discriminator, mirroring the pattern
  `usePipelineMetrics` already uses in the *in-flux* `/observability` barrel.
  Additive; `AgentRegistrySource` is exported.

### Audit notes (no change made)

- `ConflictsPage` (`/ingest`, stable) renders mock conflicts because
  `/api/sync/conflicts` does not exist — but it says so in a visible banner,
  which is the honest form of this.
- `ConfigPanel`'s **Runs** tab is hardcoded `"No runs yet."` regardless of
  actual runs, in the **frozen** `/pipelines` barrel. Wiring it to the run
  data that already lives in that barrel is a real change and needs its own
  decision.
- `CodeEditor.language` is accepted and discarded — but its JSDoc says so
  plainly ("purely cosmetic / no-op"), so it is documented, not deceptive.
- `useKeyboardShortcuts` is exported from `/hooks` with **zero** consumers
  anywhere in the repo — plausibly deliberate public API, worth confirming.
- `useWebhookTriggers` is a self-described dormant subscriber (the gateway
  bridge is unwired), and `HangoutGrid` silently caps at 16 participants.

## [2.78.0] — 2026-08-23

Three more parallel agents: API ergonomics, testability seams, and a
definitive answer on the last open bundle question. Plus a hole found in
one of this repo's own guards.

### Fixed

- **The hex-colour guard had a hole, and the v2.64.0 "zero remaining" claim
  was wrong.** `check-hex-colors.mjs` required the hex to follow the utility
  prefix *directly*, so every directional form — `border-l-[#22c55e]`,
  `border-b-[#3b82f6]`, `border-t-[#…]` — sailed straight past while the
  guard reported a clean zero. **19 escapees** across 10 files, including
  four in `Toast.tsx`. The regex now allows the directional/sub-property
  segment (`t/r/b/l/x/y/s/e`, `ring-offset`) and adds the missing
  `placeholder-` prefix; all 19 are converted to tone tokens. The sibling
  tones test was hardened the same way — it already covered `border-l` but
  not `border-x/y/s/e`, `divide-x/y`, `ring-offset` or `placeholder`. No
  live escapees there, but it was the same latent shape.

### Added

- **`className` on six video overlays** — `VideoGrid`, `StatusStrip`,
  `StatsCard`, `NetworkQualityBadge`, `ReactionOverlay`, `ReactionPicker`.
  They accepted `style` but not `className`, so every caller needed a
  wrapper `<div>` purely to set a width (inline styles being banned in
  stories and demos by our own guard). Composed through `cn()` last, so a
  caller's class **wins** its Tailwind group — which is what the tests pin,
  rather than mere string presence. `style` is now `@deprecated`.
  `CallStatsOverlay` already had `className` and `HangoutSpotlight` already
  plumbed `speakerHysteresisMs`; no redundant props were added.
- **`TranscriptOverlay` accepts `now?: number`.** Opacity is
  `1 - age/fadeAfterMs`, so any fixture with a fixed ISO timestamp is years
  old at render time and every line clamped to the 0.35 floor — the fade was
  untestable and unstorieable. Follows the existing repo convention
  (`RunFilterCriteria.now` in `runsUtils.ts`) rather than inventing a new
  clock prop.
- **Initial-state props so multi-state components can be rendered directly**
  instead of only reached by clicking: `LoginPage.defaultTab`,
  `MfaVerifyPage.defaultMode`, `MfaSetupPage.initialStep` (+
  `initialSetupResult`, `initialDeviceName` — the scan step is gated on the
  setup payload, so one prop alone renders an empty card),
  `IdentityAdminLayout.defaultSidebarOpen`, and `AppLayout.defaultSidebarOpen`.
  All seed `useState` only — the component still owns the state afterwards,
  so these are additive, not a controlled-component redesign. `defaultTab` is
  ignored when the matching capability flag is off, so it can never render a
  form the host disabled. `SettingsLayout` already supported this and was
  left alone.

### Investigated — DO NOT DECLARE `sideEffects`

Settled empirically with a **webpack** consumer (webpack honours
`sideEffects` far more aggressively than esbuild), building and *executing*
the bundles rather than inferring:

- With `"sideEffects": false`, `getFieldTypes()` returns `[]` and
  `getRenderer('rich-text','reader')` returns `null` — the renderer registry
  is completely dead, the `('*','*')` wildcard included. **Every broken
  build reported `compiled successfully`.**
- The prize is **953 bytes raw / 241 gzipped (~2.6%)** on a `Chip`-only
  bundle.
- The array form is not salvageable. `src/renderers/index.ts` is the
  library's only production module-level side effect, and in `dist` its
  registrations land in a **content-hashed** chunk that `vite.config.ts`
  never names (`manualChunks` is unset) — so any whitelist entry is an
  emergent artifact, not a contract. Only the *conjunction* of
  `**/renderers-*.js` and `**/index.js` restores correctness, and flagging
  `**/index.js` forfeits most of the tree-shaking the field was meant to buy.
- Nothing in the gate could catch a regression: vitest doesn't bundle, the
  build is rollup, and Playwright runs the vite demo. It would surface only
  as an empty type picker in a downstream webpack app.

Recorded in `docs/bundle-side-effects.md`, with the structural unblock: make
registration lazy and idempotent inside `registry.ts` so the library has no
module-level side effects, after which `["**/*.css"]` becomes safe. That
touches the no-touch list and needs a handoff.

## [2.77.0] — 2026-08-23

### Fixed

- **`ActivityPanel` spun forever when unconfigured.** `loading` initialises
  to `true`, and the hydrate effect early-returned on `!idToken || !baseUrl`
  *before* clearing it — so with no `VITE_SOCIAL_API_URL` (the default; there
  is no `.env`) or no signed-in user, the panel showed a spinner that never
  resolved, with no way out. It now resolves to the empty state. Found by the
  coverage pass, which pinned the broken behaviour rather than silently
  changing it; both regression tests are verified to fail without the fix.

### Changed

- **Config files use `import.meta.dirname` instead of `__dirname`** (40
  occurrences across `vite.config.ts`, `demo/vite.config.ts`,
  `vitest.config.ts`). Vite 8 warns on every command that `__dirname` is
  unsupported by `configLoader: 'native'`, which is planned to become the
  default in a future major. Free to adopt: vite 8 already floors Node at
  `^20.19.0 || >=22.12.0`, above `import.meta.dirname`'s 20.11 requirement.
  Deliberately **not** declared in `engines` — that field is consumer-facing,
  and this is a build-time floor the shipped bundles do not impose. Recorded
  in CLAUDE.md instead.

## [2.76.0] — 2026-08-23

A parallel-agent upgrade round: three dependency majors evaluated in isolated
worktrees, two shipped, one rejected with a root cause — plus the coverage
work that ran alongside, which found a **data-loss bug**.

### Fixed

- **`MappingRuleEditor` silently destroyed a rule.** `deleteRule` cleared the
  edit state only when the deleted index *was* the edited index. Deleting a
  row **above** the one being edited shifted every later row down while
  `editingIdx` stayed put, so `saveEdit`'s `updated[editingIdx] = draft`
  wrote the pending draft over a **different** rule. Editing `B` in
  `[A,B,C]`, deleting `A`, then saving produced `[B,B]` — `C` destroyed and
  `B` duplicated, with no error. `moveUp`/`moveDown` always re-pointed
  `editingIdx`; delete was the odd one out. Fixed, with a regression test
  verified to fail (`['b','b']`) without the fix.
- **`NodesPage` had a `= {}` default on its destructured props** (introduced
  in v2.72.0, mine), which collapses Storybook's `typeof` arg inference to
  `never`. React always passes a props object, so the default was redundant.
- **A fake `declare module 'reactflow'` was living in `declarations.d.ts`.**
  `reactflow` is not a dependency at all — this library uses `@xyflow/react`
  — but one vestigial type-only import in `validate-handles.ts` kept the
  hand-written shim alive. Repointed and deleted; typecheck stays clean,
  proving the shim was never needed. (It would have been *published* to
  consumers under vite-plugin-dts 5, colliding with their real reactflow
  types.)

### Changed

- **`react-router` peer widened to `^7.0.0 || ^8.0.0`** (dev dependency now
  8.3.0). Zero source changes were required — the library only uses
  `BrowserRouter`/`Routes`/`Route`/`Link`/`Navigate`/`Outlet`/`useNavigate`/
  `useParams`/`useSearchParams`/`useLocation`, none of which v8 breaks. The
  range is **strictly additive**, so no consumer install that is valid today
  becomes invalid, and **no charter handoff is required**. This matters:
  react-router 8 requires `react >=19.2.7`, and two of the three consumers
  (`event-catalog`, `vnl-ads`) are still on React 18 — forcing `^8.0.0`
  would have hard-broken them at install time. Verified by running the full
  gate against **both** majors, and by consumer-tarball checks under each.
  - Caveat: v8 is ESM-only with no `require` condition. This library still
    ships `.cjs` bundles that `require("react-router")`, which resolve via
    `module-sync` on Node ≥22.12. A consumer on older Node or a CJS bundler
    that ignores `module-sync` should stay on v7 — which the widened range
    keeps available.
  - Noted separately: `event-catalog` and `vnl-ads` are on React 18 while
    this library already declares `react: ^19.0.0`, so they are *already*
    out of compliance with the current peer set, independent of this change.

### Added

- **Storybook coverage for the four thin areas** — 82 story files, ~420
  stories: `identity` 0 → 24, `video` 4 → 34, `observability` 2 → 17,
  `ingest` 0 → 13. All 30 identity components turned out to be fully
  prop-driven (no hooks, fetch or router), so they needed no mocking;
  ingest's hooks call bare `fetch` with no injectable seam, so those stories
  carry a local URL-keyed mock backend with ok/error/pending modes.
- **296 tests** across `social`, `ingest`, `observability`, `ui`, `layout`
  and `doc-types`, targeting logic that can actually break — the dashboard's
  alert arithmetic (queue depth is `>50`, not `>=`; failure rate needs a
  5-item sample before dividing), `formatMs` boundaries (`0` → `"0 ms"` but
  `null`/`NaN`/`Infinity` → em-dash), and the guard that stops a background
  error from wiping visible data. Suite: 3,661 → **3,962**.
- **A packaging guard for the shape of the shipped `.d.ts`.** The existing
  test only checked that `types` targets exist. It could not see the failure
  mode found while evaluating vite-plugin-dts 5: a build that stays exit-0
  and green while emitting an unbundled `dist/src/**` tree and no
  `dist/index.d.ts` at all. Now asserts bundle count, rollup size, and the
  absence of `dist/src/`.

### Not taken (deliberately)

- **`vite-plugin-dts` 5 — root-caused and rejected.** v5 renamed
  `rollupTypes` → `bundleTypes` and **silently ignores the old key**, which
  is the whole "successful build, zero `.d.ts`" symptom. Even with the key
  corrected it is unshippable: `bundleTypes` forces `copyDtsFiles`, which
  harvests every ambient `declare module`/`declare global` block and appends
  them to **all** entries. No option suppresses it — `exclude` drops the
  file from the type program, and `beforeWriteFile` runs after the harvest.
  v4.5.4 runs fine on vite 8 with byte-identical output, so there is nothing
  to gain.
- **`typescript` 7.0.2 — evaluated in full, held.** It is clean for this
  repo: **zero** new type errors, zero test changes, and a typecheck that
  drops **30.2s → 2.0s** (verified non-vacuous by injecting a deliberate
  error and by diffing `--listFiles`: 1,239 files under both). It also does
  not change the shipped types — declaration emit and the api-extractor
  rollup produce a **byte-identical** `dist/index.d.ts`, and consumers are
  not forced onto TS7. It is held anyway because the *toolchain around it*
  fails silently in three ways: `vite-plugin-dts@4` crashes outright on TS7,
  forcing the rejected v5; and `@typescript/typescript6` pulls
  `@typescript/old@npm:typescript@6.0.3`, which declares `bin.tsc` and
  **overwrites the root `tsc` symlink** — so which compiler the gate runs is
  decided by npm install order, with no signal. Buying a faster local
  typecheck is not worth a CI that can silently validate against the wrong
  compiler. The work is preserved on `upgrade/typescript-7`.


### vite 8 (build-tool cluster)

The build-tool cluster moves to vite 8. This swaps the bundler underneath
every shipped artifact — vite 8 uses **rolldown**, not rollup — so the
verification below is about equivalence of output, not just a green gate.

### Changed

- **`vite` 7.3.6 → 8.2.2** and **`@vitejs/plugin-react` 5.2.0 → 6.1.0**.
  These are one job: plugin-react 6's peer is `vite@^8`. `@tailwindcss/vite`
  (`^5||^6||^7||^8`), `vitest` 4.1.11 (`^6||^7||^8`) and `@storybook/react-vite`
  all deduped onto vite 8 with no peer conflicts and no config changes.

  Output was checked for equivalence rather than assumed:

  - All 14 `.d.ts` entry bundles are **byte-identical** to the vite 7 build.
  - All 14 entries export the **same symbol set** in both ESM and CJS
    (366 from the root, 132 from `/pipelines`, …), and every one loads
    under plain node.
  - `dist/ui-components.css` has the same 90 `--color-*` tokens, 1657
    selectors and 38 keyframes; it differs only in minifier ordering and a
    stray `/*$vite$:1*/` marker rolldown leaves on the end (a CSS comment —
    inert, but it is new).

### Not taken (deliberately)

- **`vite-plugin-dts` stays at 4.5.4** — it works fine on vite 8 and its
  output is byte-identical, so there is nothing to gain and a real
  regression to avoid. v5 is a thin wrapper over `unplugin-dts`, and:
  - It **renamed `rollupTypes` → `bundleTypes`** and *silently ignores* the
    old key. That is the "v5 emits no types" symptom recorded under 2.73.3:
    with the key ignored it emits an unbundled `dist/src/**` tree and **no**
    `dist/*.d.ts` at all, so every `exports` `types` target 404s — while the
    build reports success.
  - Even with the key renamed, `bundleTypes` forces `copyDtsFiles`, which
    makes unplugin-dts harvest every ambient `declare module` / `declare
    global` block in the project and append it to **every** rolled-up entry.
    That would have shipped `src/declarations.d.ts`'s `declare module
    'reactflow'` stub — a module augmentation that collides with a
    consumer's real reactflow types — plus a `declare global` block
    referencing a `DevEditorBridge` type that is not in the bundle, so all
    14 `.d.ts` files fail under `skipLibCheck: false`. There is no option to
    suppress it (`exclude` drops the file from the type program instead, and
    `beforeWriteFile` runs after the harvest).

### Known warnings (not errors)

- Vite 8 warns that `__dirname` in `vite.config.ts`, `demo/vite.config.ts`
  and `vitest.config.ts` is unsupported by `configLoader: 'native'`, which
  is planned to become the default in a *future* major. Current default
  still supports it; the fix when it lands is `import.meta.dirname`.
- Rolldown's `EMPTY_IMPORT_META` warning on `ScatterPathPicker.tsx`. It
  constant-folds `import.meta.env?.VITE_SOCIAL_API_URL` to `""`. Vite 7 also
  substituted `import.meta.env` with `{}` at build time, so the expression
  already evaluated to `""` — the emitted URL is unchanged.


## [2.75.1] / [2.75.0] / [2.74.0] — 2026-08-23

Shipped from a parallel session; entries reconstructed here so the release
history stays complete.

### Added

- **In-row "add people" button on `CallWidget`**, plus a share link in the
  invite dialog, and `onOpenAddParticipant` so a host with its own invite
  surface can take over the flow instead of the built-in inline picker.
- **`UserPlusIcon`** exported from the shared media-icon set.

### Fixed

- `onOpenAddParticipant` was not actually forwarded through to the controls.

## [2.73.3] — 2026-08-23

Dependency majors, taken only where they cannot reach consumers. One of
them uncovered a shipping bug.

### Fixed

- **`ajv` was an undeclared direct dependency.**
  `pipelines/persistence/pipelineStorage.ts` imports it to validate
  persisted pipelines at runtime, but it appeared in no `dependencies`,
  `devDependencies` or `peerDependencies` — it only ever resolved because
  `vite-plugin-dts@4` happened to pull it in transitively. The build broke
  the instant that transitive provider changed, which is how it surfaced.
  Now a declared `dependency` and externalised alongside the other three.

### Changed

- `@testing-library/jest-dom` 6 → **7** and `jsdom` 28 → **29**. Test-only,
  whole suite green.

### Not taken (deliberately)

- **`vite-plugin-dts` 5 silently stops emitting types.** With v5 the build
  reports success while producing **zero** `.d.ts` files — no error, no
  warning. Installing its newly-peer `@microsoft/api-extractor` did not
  help. Reverted to 4.5.4. The packaging test caught the missing types,
  which is exactly what it exists for.
- **`@vitejs/plugin-react` 6 requires `vite@^8`** — it cannot be taken
  independently, so it belongs to the vite-8 decision below.
- Left for an explicit call, all consumer-visible or large:
  `vite` 7 → 8 (anchors the build-tool cluster; tailwind and vitest already
  accept 8), `react-router` 7 → 8 (a declared **peer** — bumping the range
  is consumer-visible), `typescript` 5.9 → 7.0 (the Go compiler rewrite).

## [2.73.2] — 2026-08-23

Shipped from a parallel session; entry reconstructed here so the release
history stays complete.

### Added

- **`CallWidget` gains a `controlsExtras` slot.** The docked widget had no
  extension point, so a consumer could not offer the same action in both
  chromes — `MediaControlsBar` (expanded) had extras, the docked widget had
  nothing. Also forwards `controlsExtras` to the active view.
- **`useToastOptional`** — for components that want to notify but must still
  mount where no provider exists (a widget reused inside a panel, or
  rendered bare in a test). Callers use `toast?.(…)` instead of crashing the
  subtree.

## [2.73.1] — 2026-08-22

Dependency hygiene. Every in-range update applied; **0 vulnerabilities**
(the residual esbuild advisory cleared with vite 7.3.6).

### Removed

- **`@tiptap/extension-collaboration-cursor` — a dead dependency pinned to a
  deprecated release.** npm reported it oddly (`Current 3.0.0, Latest
  2.26.2`) because tiptap published a 3.0.0 by accident and deprecated it:
  *"There are no breaking changes in this package, we meant to release
  2.5.0."* Nothing in `src/` or `demo/` ever imported it, so rather than
  downgrade onto the 2.x line it is removed outright, along with its stale
  entry in vite's externals list.

### Changed

- **`amazon-cognito-identity-js` now typechecks against the real package.**
  It is a peer dependency that was never installed locally; `useAuth` — a
  **public** export from `…/hooks` — resolved its six imports through a
  hand-written 34-line ambient module shim in `declarations.d.ts`. Our gate
  therefore validated the hook against our own approximation of the API, not
  the API. It is now a devDependency and the shim is deleted; the real types
  typecheck clean, so the shim was accurate — but future edits are now
  actually checked. Consumers are unaffected (it stays a peer dep, and stays
  externalised).
- In-range bumps: playwright 1.62.1, storybook 10.5.10, tiptap 3.30.2,
  recharts 3.10.1, vite 7.3.6, vitest 4.1.11, react 19.2.8, xyflow 12.11.3,
  tailwind 4.3.3, yjs 13.6.32, hls.js 1.7.1.

### Fixed

- **A flaky e2e test I introduced in v2.71.2.** `simulated participants churn
  over time` asserted the count changes within 20s, but the demo's churn is
  a ~40% join / ~30% leave roll every 5s — unreliable by construction, and
  it failed under full-suite load while passing in isolation. Replaced with
  the invariant the simulation actually maintains (count stays within its
  designed 3–9 bounds across many ticks).

### Note

The playwright bump moved the pinned chromium build, so `npx playwright
install chromium` was required — exactly the drift CLAUDE.md documents.

## [2.73.0] — 2026-08-22

A bundle-weight bug that penalised every consumer, plus the last a11y gaps.

### Fixed

- **`cmdk` was bundled instead of externalised — importing `Chip` cost 64KB.**
  All three runtime `dependencies` are meant to be external (npm installs
  them for the consumer); `clsx` and `tailwind-merge` were, `cmdk` was not.
  It therefore inlined into a shared chunk that *every* entry pulled, so the
  smallest primitives dragged in the whole command-palette fuzzy-matching
  library. Measured with a scratch consumer bundle: **importing `Chip` drops
  from 49.2KB to 4.8KB minified (−90%)**. No consumer action needed — `cmdk`
  is already a declared dependency, so it resolves from `node_modules`, and
  only loads for the two components that use it (`CommandPalette`,
  `ReactionPickerPopover`).
- **Keyboard access for `GroupPanel`'s clickable rows.** The group row and
  the per-group room rows were `<div onClick>` with `cursor-pointer` and no
  role, tabIndex or key handler — visible affordances that keyboard users
  could not reach at all. They now follow the `SidebarRow` house pattern
  (`role="button"` + `tabIndex` + `aria-pressed` + Enter/Space).
- **Three icon-only buttons in `FieldDefinitionEditor`** (move up, move down,
  remove) had no accessible name. They now carry field-scoped `aria-label`s.
  `src/components` is now at **zero** unlabelled icon-only buttons and zero
  keyboard-inaccessible click targets (the two remaining `<div onClick>` are
  `stopPropagation` event boundaries, not controls).

### Added

- **Packaging guard: every runtime dependency must be externalised.** The
  existing test asserted the converse (everything externalised is declared);
  nothing caught a declared dependency being silently inlined. This is the
  test that would have caught `cmdk`.

### Changed

- `EntityTable` dropped off the static-styles allowlist — the v2.72.0 façade
  rewrite removed its last inline style.

## [2.72.1] — 2026-08-21

Closes the last measured unit-test gaps (24 tests; suite now 3,646). The
"renderers 8/26" audit figure turned out to count metadata files — every
renderer family was already tested; the real gaps were the plumbing:

### Added

- **`renderers/registry` tests**: the four-step fallback chain
  (`type:mode` → `type:*` → `*:mode` → `*:*`), null/undefined section
  types, and user-defined field types delegating to their base
  `rendererType`.
- **`decisions/approvalSync` tests**: terminal-status mapping, document-id
  URL parsing, bearer-token POST shape, the no-documentId skip, and the
  never-throws guarantee (HTTP failures and network errors both surface
  as `{ok:false}`).
- **`lib/documentTypeApiAdapter` tests**: renderer-id → API field-kind
  translation with the unknown-renderer text fallback, and the sync
  lifecycle — create remembers the server id, update of a never-synced
  type falls back to create, a 404 on update re-creates the row, delete
  of a never-synced type is a clean no-op.
- **`ColorSchemeProvider` tests**: light default, toggle persistence to
  localStorage + `data-theme`, restore-on-mount, garbage tolerance.

## [2.72.0] — 2026-08-21

The three structural items from the audit, executed non-breaking.

### Changed

- **Observability graduation prep — no button is a no-op anymore.** The five
  `console.log` stubs became optional host callbacks: `MetricTimeSeriesPanel`
  gains `onResetZoom?`/`onExportCsv?`, `NodesPage` gains `onAddLatency?`/
  `onKillNode?`/`onTransferResource?` — each control renders only when the
  host wires it. `NodesPage` also gains a `nodes?` prop (fixture-derived set
  remains the fallback so the demo route is never blank). The barrel stays
  **in-flux**: graduation waits on a real consumer and the real
  `ClusterDashboard` type from distributed-core.
- **`EntityTable` is now a façade over `DataTable`.** Identity's table kept
  its public API, Card frame and emoji empty state, but delegates sorting,
  skeleton rows and action cells to shared `DataTable` — one table
  implementation instead of two that could drift. `DataTable` gains an
  additive `frameless` prop so composites can supply their own frame.
- **`IdentityFormField` delegates presentation to `shared/FormField`.**
  Same value-coercing API; the label/hint/error rendering and — new for
  identity — the aria wiring (`aria-describedby` linking errors/help to the
  input, `aria-invalid`) come from the shared wrapper. Identity forms adopt
  the library-standard field look (visual snaps re-baselined: /identity/login,
  /identity/mfa-setup). The checkbox branch keeps its wrapping-label markup.

### Added

- Contract tests (11) pinning all three: aria linkage, façade sorting/empty/
  actions behavior, and hidden-until-wired observability actions.

## [2.71.2] — 2026-08-21

Journey round two (e2e 193 → 206), plus the reset bug from round one fixed.

### Fixed

- **Call-widget demo: simulation Reset now resets the call state.** The
  simulator's Reset only rewound its own timeline, leaving the widget
  mid-call; the demo now mirrors reset into its dispatch (the `'reset'`
  case existed but nothing ever fired it). Pinned by a journey test.

### Added

- `hook-demos-2` journeys: auto-fired reactions land AND a clicked emoji
  fires through `useReactions`; `CapabilityBoundary` swaps to the denied
  fallback when a capability toggles off and restores on re-enable, with
  the pulse-loading state covered; activity events stream in order; the
  file-upload drop zone mounts with its input wired.
- `streaming-hangout-journeys`: video-streaming stats render and simulated
  participants churn; the hangout rooms list renders seeded rooms and a
  join reports its slug to the host; the wrapped-components comparison
  mounts both chat panels (raw + adapter); the video-hangout layout mounts.

## [2.71.1] — 2026-08-21

**User-journey e2e coverage** (22 new tests, suite now 193): the audit found
the interactive flows were smoke-tested only — mounted, screenshotted, never
driven. Five journey specs now exercise the shipped components end-to-end:

- `identity-journeys`: sign-in submits credentials, error banner toggles,
  the sign-in-only variant hides Register, MFA 6-digit entry auto-verifies,
  consent lists human-readable scope descriptions, and the full admin demo
  navigates dashboard → pools → (View) → users → audit via the real sidebar.
- `document-workspace`: section structure renders, collapsed sections
  toggle, the simulated collaborator (Alice) joins and streams edits.
- `agents-invoke`: a prompt sent into `AgentInvokePage` streams the
  scripted AG-UI answer with its `query_knowledge_base` tool call; the
  simulated/live mode banner toggles.
- `hook-demos`: mock-mode chat receives timer messages AND echoes a sent
  message back through `useChat` into the panel; presence roster joins.
- `call-widget-journey`: the auto-played call lifecycle goes active with a
  ticking `data-call-duration` timer (the testid contract from v2.67.0),
  speaking state surfaces, and the scripted call ends back to idle at 4×.

Also noted: the call demo's simulation Reset leaves the widget's call state
active (timeline-only reset) — recorded, not fixed, since the scripted
end-of-call covers the journey.

## [2.71.0] — 2026-08-21

Audit-round follow-through: the two biggest untested surfaces get suites,
and the dependency vulnerabilities are cleared.

### Added

- **Identity tests (23)**: admin form pages pin their exact submit
  payloads (user/pool/group/application/email-template), list pages pin
  the two-step ConfirmDialog delete flow, AuditPage pins the
  datetime→epoch query conversion and point-in-time replay, and the OIDC
  auth screens (login/consent/MFA verify/logout/error) are covered.
- **`TypedDocumentForm` tests (13)**: widget mapping per field kind,
  submit coercion (numbers, native booleans, empty-optional dropping),
  required/regex/min-max/requireTrue validation, `showWhen` visibility
  (hidden fields drop from the payload), unlimited-cardinality add/remove
  and number coercion, reset-on-success, error surfacing.
- **`FieldTypesPage` tests (5)**: two-step wizard gating, localStorage
  persistence across remount, disabled coming-soon primitive types.
- **`src/api/` tests (11)**: URL/param assembly and error surfacing for
  retry/force-fail/audit/DLQ/runs/resume — including DLQ's deliberate
  503→empty tolerance, `searchAudit`'s required-filter guard, and the
  backend `runId` → frontend `id` boundary mapping.

### Fixed

- **`npm audit`: 6 high-severity vulnerabilities cleared** (brace-expansion,
  fast-uri, nanoid, postcss) via lockfile-only upgrades. One low remains
  (esbuild dev-server file read, Windows-only, nested under vite — waits
  on a vite bump).

## [2.70.0] — 2026-08-21

The `forms/` primitives — the most-copied components since the control
migration — close their own coverage gaps.

### Added

- **Tests for `Input`, `Select`, `Textarea`, `RadioGroup`, `JsonPathInput`**
  (22 tests): the widened date/datetime-local type union, Select's disabled
  placeholder + `groups`/optgroup rendering, RadioGroup's shared name and
  selection reporting, JsonPathInput's sample-pill paste and
  `enforcePrefix` blur validation. Every forms primitive now has direct
  unit tests.
- **Stories for `Checkbox`, `Slider`, `ColorInput`**: Checkbox ships a
  working select-all/indeterminate example (the pattern the pipelines list
  surfaces use), Slider a formatted-readout temperature example. Every
  forms primitive now has a story.

## [2.69.0] — 2026-08-21

**Every `shared/` component now has a story** (hub #1059 closed). The last
32 landed: the 24 primitives that gained tests in v2.68.0, plus `Chart`
(all three chart kinds), `CodeEditor` (variable pills, read-only),
`PermissionDeniedCard` (camera/mic/screen states), `ScoreBarGauge`,
`ShortcutsHelp`, `StatCard` (delta + sparkline, inverted-tone failures
card), `TrendSparkline`, and `UserPicker` — the last driven by mocked
`PresenceProvider`/`IdentityProvider` values, the same no-runtime pattern
as the Wrapped* integration stories. Stories use tone/token classes only
(the tones test scans them), and `build-storybook` passes.

## [2.68.0] — 2026-08-21

**Every `shared/` component now has tests.** The 26 that had none —
including several with real behavioral surface — gained 101 tests
(constitution principle 2: tests for every exported primitive).

### Added

- Tests for: `Drawer` (portal dialog, Escape/backdrop close, focus move,
  width), `ToastProvider` (queue, per-type auto-dismiss durations,
  stacking, custom duration, hook guard), `SubNavLayout` (flat + grouped
  collapsible rails, action vs link items, `renderNavItem` delegation,
  secondary rail), `InlinePopover` (outside-dismiss vs inside clicks,
  Escape, fixed positioning), `ActivityFeed` (rotation pool, stagger-safe
  fake timers, kindColors override), `ProjectCard`, `CollapsibleSection`
  (localStorage persistence beats defaultOpen), `ChatComposer`
  (Enter/Shift+Enter, whitespace guard), `SearchInput`, `FilterChip`,
  `SegmentedControl`, `MessageBubble`, `ProgressBar` (clamping,
  divide-by-zero max), `StatusPill` (tone classes, ping halo), `PageHeader`,
  `InlineAlert` (alert vs status roles), `ThinkingBlock`, `ThinkingDots`,
  `ToolCallStrip`, `QuickPromptGrid`, `CatalogGrid`, `EntityCell`,
  `CardHeader`, `FollowUpChips`, `StatusDot`, `Spinner`.

### Docs

- CLAUDE.md coverage sections trued up: the "large untested exports"
  (`CallWidget`/`AppLayout`/`CollapsibleSidebar`) have been tested for a
  while; the story gap recounted at 32 `shared/` components (was stated
  as "51 components, 7 stories").

## [2.67.0] — 2026-08-21

### Fixed

- **Call-timer testids on both widget chromes** (parallel session): the e2e
  Hangout page-object reads `[data-testid=call-timer]` /
  `[data-call-duration]` but no element carried them. `CallWidget`'s two
  duration spans now stamp both; `ExpandableCallWidget` gains
  `durationSeconds` and renders the timer in its expanded header.
  `formatDuration` exported for reuse.

## [2.66.0] — 2026-08-21

### Fixed

- **F5: `spotlightContentLabel` attributes screen share to the sharer**
  (parallel session) — the spotlight label named the wrong participant.

## [2.65.0] — 2026-08-21

### Added

- **`ActiveCallBanner`** (`/hangout`): non-modal "call in progress — join?"
  affordance for lobbies the user wasn't invited to (sibling of
  `ResumeCallDialog` in the F3 discovery journey). Live-dot, participant
  count, elapsed ticker, avatar chips, Join/Not-now. Token classes only;
  6 tests. (Landed in a parallel session under this same version.)

The theming audit reaches JS constants: hex strings in color maps, chart
palettes and SVG strokes now resolve through the token system.

### Fixed

- **`StepTimeline` carried a second 40-entry node-type palette** that
  disagreed with the canvas (llm was blue in the timeline, violet on the
  canvas — the banned second-`Record` failure). It now colors bars by the
  same category channel the canvas uses (`--color-cat-*` via
  `NODE_CATEGORIES`), and its legend lists the six categories.

### Changed

- **~430 JS-constant hexes converted to `var(--color-*)` strings** across
  status maps (`ReviewMode`, `DocumentListPage`, `ChunkViewer`,
  `NetworkQualityBadge`, `PipelineMetrics` cost/latency thresholds…), chart
  palettes (`Chart`'s series palette, axis/grid strokes, tooltip chrome)
  and SVG strokes (`AnimatedEdge`, `AgentFlowCanvas`). CSS vars resolve in
  inline styles and SVG attributes, so these now re-tone with the theme.
- **User-distinguishing colors deliberately stay hex data**: `Avatar`'s
  palette, awareness/presence fixtures, collaboration-sim users, and code
  samples that teach passing a user color. The mechanical pass initially
  converted 35+ of these; the visual suite caught a corrupted ThemingPage
  doc sample and all were reverted from git history. Hexes that are *data*
  (manipulated as strings, sent over the wire, hash-picked per user) must
  not become var strings — there is no automated guard for this
  distinction, so it lives here and in CLAUDE.md.
- 23 unit-test assertions updated from pinned hexes to the var strings.

## [2.64.0] — 2026-08-21

**Hex burn-down complete, same day the ratchet was created.** The 844
baselined arbitrary-value hex utilities are gone; `lint:hex-colors` is now
a plain zero-tolerance rule with an empty baseline.

### Added

- **`--color-code-*` token family** (Catppuccin Mocha): bg, panel, surface,
  border, raised, text, subtle, comment, muted, red, green, blue, yellow,
  peach, mauve. The dark language of the pipeline debugger, log consoles
  and syntax-highlighted code blocks — previously ~150 per-file hexes —
  is now re-themeable like everything else.
- **`--color-video-*` tokens** (`video-stage`, `video-tile`): the near-black
  video letterbox and tile placeholder, previously three slightly-different
  ad hoc darks (#0f0f0f / #1a1a2e / #0a1020).

### Changed

- **~760 hex utilities converted by nearest tone/role** per the CLAUDE.md
  mapping table: the gray/slate text ladder onto `text-text-{primary,
  secondary,tertiary}`, semantic shades onto their tone roles, run-state
  dots onto `--color-state-*` (BaseNode's pending dot was literally the
  `state-pending` value), light-on-dark shades onto the code family.
  12 visual e2e baselines shifted — each diff reviewed (localized label/
  chip re-tonings) and regenerated; the other 52 pages were pixel-stable.
- 13 unit tests that pinned old hex class strings now assert the token
  classes.

## [2.63.0] — 2026-08-21

The tones rule gets its missing enforcement half: arbitrary-value hex
utilities (`bg-[#2563eb]`) sailed past the palette-name scan — ~950 of them
had accumulated, including Button's off-brand primary fixed in v2.61.0.

### Changed

- **665 hex utilities converted to token classes, mechanically and
  pixel-identically:** every `prefix-[#hex]` whose hex exactly equals a
  token's current value became that token's class (`text-[#0f172a]` →
  `text-text-primary`, `border-[#e2e8f0]` → `border-border`,
  `bg-[#fef2f2]` → `bg-danger-bg`, …) across `src/components`, `src/theme`,
  `src/renderers` and `demo/src`. All 64 visual e2e baselines pass
  unchanged, which is the proof of the "pixel-identical" claim.

### Added

- **`npm run lint:hex-colors`** (`scripts/check-hex-colors.mjs`): ratchet
  guard over the 844 remaining hex utilities in 143 files — the ones whose
  hex matches no token and needs judgment (nearest-tone mapping per the
  CLAUDE.md table, with eyes on the rendering change). New hexes fail;
  burn-down must lower the baseline. No new entries allowed — if the scale
  can't express a colour, add a tone.

## [2.62.0] — 2026-08-21

**The hand-rolled control migration is complete.** Every area of
`src/components` now builds its form controls from the `forms/` primitives,
and the ratchet guard covers the whole tree.

### Added

- **`ColorInput` primitive** (forms + root export): wrapper over
  `<input type="color">`, shipped because `CanvasCursorBoard` was the one
  place hand-rolling a color swatch.
- **`Select` gains `groups`** (`SelectOptionGroup[]`, rendered as
  `<optgroup>`): `FieldTypesPage`'s Drupal-style grouped type picker needed
  it, and the primitive ships first.

### Changed

- **Converted to forms primitives:** ingest (8 files — mapping rule editor,
  source detail, audit/sync/items/SLO/review/conflicts), social (7 —
  GroupPanel, SocialPanel, RoomList, PostFeed, CommentThread, ChatRoom,
  ChatPanel internals; public props untouched), doc-editor (8 — TaskItemRow's
  pill selects keep their runtime-derived colors via class overrides,
  AttachmentsPanel, NewDocumentModal, SectionComments, SectionBlock,
  ReviewableItem, DocumentHeader, CommentThread), observability (3), agents
  (3), collaboration (CanvasCursorBoard now uses `Slider` + `ColorInput`;
  SharedTextEditor's format picker), video (RecordingPlayer's speed select;
  its seek/volume ranges stay raw as media chrome), field-types (1).
- **`lint:node-controls` now guards ALL of `src/components`** (was
  `pipelines/` only). 27 files / 37 raw elements remain, every one a
  documented justified exception — the forms/shared primitives themselves,
  hidden inputs, OTP digit boxes, media scrubbers, dev inspectors.
- Visual e2e baselines regenerated for the v2.61.0 Button re-toning; the
  visual spec now blanks `<video>` surfaces (live frames made
  `/workflows/video-streaming` flaky by nature).

## [2.61.0] — 2026-08-21

The control migration crosses into its next areas: identity, typed-documents
and doc-types are now raw-control free (the survey's three biggest fronts
after pipelines), and `Button` finally wears the brand.

### Fixed

- **`Button` variants are token-mapped, not hex-literal.** Every variant was
  hardcoded (`bg-[#2563eb]` etc.), invisible to the tones guard because
  arbitrary-value utilities aren't palette names. Consequences fixed: the
  `primary` variant was blue-600 — visibly not `--color-primary` — and no
  variant re-toned when a consumer overrode the variables. Variants now use
  `bg-primary`/`surface`/`danger` tokens. **Visual change:** primary buttons
  shift from blue-600 to the brand primary everywhere.

### Changed

- **Identity is raw-control free.** `IdentityFormField` keeps its public API
  but is rebuilt on `Input`/`Textarea`/`Select`/`Checkbox` (its bare controls
  carried a literal `border-[#e2e8f0]`); `AuditPage`, `MfaManagementPage`,
  `DiagnosticsPage` and the five admin form pages drop their hand-rolled
  controls and per-page `inputClass` constants. Remaining raw elements are
  justified: `LoginPage`'s `type="hidden"` and `CodeInput`'s digit boxes
  (the primitive itself).
- **`TypedDocumentForm` (the single biggest offender, 15 controls) renders
  every widget branch with the forms primitives**, and its hexes
  (`text-[#dc2626]`, `border-[#cbd5e1]`, …) become tokens. The hand-rolled
  add/remove/submit buttons are now `Button`. `TypedDocumentsPage`'s
  display-mode picker converts too; its hidden file-upload input is a
  justified invisible trigger.
- **doc-types converted:** `DocumentTypeWizard` (7 controls),
  `FieldDefinitionEditor` (inline rename expressed as an `Input` with
  chrome-stripping overrides; the type pill select re-toned from purple
  hexes to `accent` tokens), `CookbooksModal` search.

### Added

- `InputType` accepts `date`, `datetime-local` and `time` — AuditPage's
  filters and TypedDocumentForm's date widget needed them, and the primitive
  ships first.
- `Checkbox` accepts `id` and `name` for label association and form posts.

## [2.60.0] — 2026-08-20

Reachability follow-up to v2.53.0–v2.59.0: the primitives added during the
control migration are now exported, not just used internally.

### Added

- **Root exports:** `Checkbox` and `Slider` join the other form primitives
  on the root index — they were shipped, tested and used across the
  pipelines surfaces but unreachable to consumers.
- **`/pipelines` barrel exports the panel-building primitives:**
  `ConfigField`, `ConfigSection`, `NodeConfigShell`, `ToggleField`,
  `SamplePills`, `SourceImagePathField`. A host adding its own node type
  (the `nodeVocabulary`/`modelOptions` extension story) can now compose its
  config panel from the same parts the built-in panels use, instead of
  hand-rolling — which is how this whole migration started. Additive.

### Docs

- `CLAUDE.md` gains the 2026-08-20 hand-rolled-control survey: `pipelines/`
  done; per-area counts for the remaining trees (identity 11, ingest 8,
  doc-editor 8, social 7, …) so the next front is measured, not guessed.

## [2.59.0] — 2026-08-20

The control migration extended beyond the node panels: the pipelines list
surfaces (runs, DLQ, filter bars, pages) now use the composites too, and the
one missing primitive they needed ships with it.

### Added

- **`Checkbox`** (`forms/`) — with declarative `indeterminate`. The library
  shipped `Switch` and `RadioGroup` but no checkbox, so eleven call sites
  across the pipelines list surfaces hand-rolled
  `<input type="checkbox" className="w-3.5 h-3.5 accent-primary">` — the
  select-all headers additionally reaching into a ref to set
  `indeterminate`, since HTML only exposes the mixed state imperatively.
  A checkbox is *not* a Switch: a switch flips a setting; a checkbox marks
  selection and supports "some but not all". `onClick`/`onKeyDown`
  pass-throughs cover row-embedded usage (stopPropagation, shift-range
  selection). 5 tests.

### Changed

- **Converted to composites (11 files):** `RunsTable`, `PipelinesFilterBar`
  (which now takes `someVisibleSelected` instead of a `selectAllRef` — the
  ref plumbing existed only to set `indeterminate`), `DLQInspector` (its
  select-all also *gains* an indeterminate state it never had),
  `RunsFilterBar`, `DLQEntryCard`, `PipelineCard`, `PipelineRunsPanel`,
  `PipelineRunReplayPage`, `PipelineRunsPage`, `PipelinesPage`,
  `TemplatesModal`, `ExecutorLog`, `PendingApprovalsPage`,
  `PipelineEditorPage`.
- **`lint:node-controls` scope widened** from `pipelines/nodes/` to all of
  `pipelines/`. The node panels stay at zero; the 8 files still carrying a
  raw element are a *justified* baseline, each with its reason in the
  script — terminal-styled dev inspectors, an invisible a11y range over the
  custom replay timeline, an invisible test hook, in-canvas/inline editors.
  Justified exceptions are not unconverted debt, and the guard's pass
  message now says which it is.

## [2.58.0] — 2026-08-20

Audit round: the demo's static inline styles are gone, and the showcase
pages now demo the library's real components instead of fakes.

### Fixed

- **`DataDisplayPage` showcased chips, sparklines and skeletons using
  hand-rolled fakes.** `DemoChip` carried its own hex palette — a second
  `Record<color, hex>` that duplicated and disagreed with the tone scale,
  the exact drift rule 2 of the tones section exists to prevent —
  `DemoSparkline` reimplemented `Sparkline`, and `SkeletonRect`
  reimplemented `SkeletonCard`. A showcase that renders a fake of the
  component it documents teaches the copy-paster the wrong thing twice.
  All three now render the real composites.
- **`Sparkline`'s default stroke was `#646cff`** — Vite-template indigo,
  not this library's primary, and invisible to the tones guard because it
  is a string value rather than a utility class. Now
  `var(--color-primary)`, so it follows the host's brand.
- **`RealTimeEditingPage` and `InvokeDemo`** carried private hex palettes
  (architecture-diagram tints, a green/orange mode banner); both now use
  the tone tokens (`TONE_BG`/`TONE_BORDER`, `bg-success-bg` /
  `bg-caution-bg`, `toneVar`).

### Changed

- **`SkeletonCard` gains `rounded?: 'md' | 'lg' | 'full'`** — the
  avatar-placeholder (circle) case is what forced `DataDisplayPage` to
  hand-roll its own skeleton rect. Additive; default unchanged.
- **`lint:static-styles` now scans `demo/src` too, string-aware.** A naive
  grep said 46 demo files used `style={{}}`; the real number was 9 — pages
  like `LayoutPage` and `PatternsPage` only *display* inline-style JSX
  inside `code={\`...\`}` template literals. Occurrences inside strings
  no longer count, in either tree (which also retired one stale `src`
  allowlist entry). The 8 remaining demo files are allowlisted with
  per-line justifications; every one is runtime-derived only (cursor
  positions, per-datum colors, `toneVar`).

### Docs

- `CLAUDE.md` refreshed against measurements: demo static eradication
  complete; `src` inline-style count 131 → 97; the zero-test folders
  (`collaboration/`, `misc/`, `doc-types/`) are filled and no longer
  listed as gaps.

## [2.57.0] — 2026-08-20

**Hand-rolled-control migration complete. 28 files / 112 controls → 0 / 0.**

`npm run lint:node-controls` is now a plain rule rather than a ratchet: no
raw `<input>`/`<select>`/`<textarea>` anywhere under `pipelines/nodes/`. The
baseline is empty and must stay that way — if a panel needs something the
composites can't express, add the primitive to `forms/` and use it, the way
`Slider` and `ToggleField` were added during this migration.

### Added

- **`Slider`** (`forms/`) — range input with a built-in value readout
  (`readout` takes `false` or a formatter). Three panels each had their own
  `<input type="range">` with the readout stuck somewhere different. The
  readout is part of the component because a slider without numeric feedback
  is unusable at any real scale — "somewhere around the middle" is not a
  temperature.

### Changed

- **Converted (final batch):** `ApprovalConfig`, `CropConfig`,
  `TransformConfig`, `ScatterConfig`, `LLMConfig`, `AdjustLayerConfig`,
  `AdjustLayerSliderPanel`, `ForkConfig`.
- The copy-pasted `inputCls`/`labelCls`/`helpCls` constants are gone from
  every node panel but one, where a single local `helpCls` still styles
  italic caption text that isn't a form field.

### Fixed

- **`TransformConfig`'s "Preview" was two permanently disabled textareas**
  captioned "(preview not yet available)". They read as input fields the
  user had somehow failed to enable, rather than as a feature that doesn't
  exist yet. Replaced with the shipped `EmptyState`, which says so plainly.
  (Same class of dead UI as the `ConditionConfig` button removed in v2.53.0.)

### Tests

- `Slider` (6), `ToggleField` (4).

### Migration total

Across v2.52.0–v2.57.0: **112 hand-rolled controls removed**, 4 duplicate
`inputCls` definitions collapsed, `SamplePills` de-duplicated from 17 copies,
`SourceImagePathField` from 13, two hand-built tag editors replaced with the
shipped `TagEditor`, three new primitives added (`SourceImagePathField`,
`ToggleField`, `Slider`), and four pieces of dead UI removed.

## [2.56.0] — 2026-08-20

Hand-rolled-control migration, batch 4. **14 files / 51 controls → 8 / 21.**

### Changed

- **Converted:** `ActionConfig` (the worst offender at 9),
  `TransformGeoConfig`, `EditPromptConfig`, `VariationConfig`,
  `TriggerConfig`, `RetryPolicyEditor`.
- **`ActionConfig`'s "Retry up to N times" no longer nests a number input
  inside a radio `<label>`.** A control inside a label steals clicks meant
  for the option, so tabbing to the count and clicking it re-selected the
  radio. The count is now a separate field that appears when Retry is
  chosen, matching how `JoinConfig` handles `n_of_m`.
- **Image-edit model lists** (`image:edit`) moved onto the `modelOptions`
  seam, the last hardcoded lists in the node panels.

### Note on `border-[#dc2626]`

`TriggerConfig` styled its own invalid state with a raw hex, in three
places, rather than the `invalid` prop the `Input`/`Select` composites
already carry. That is the same class of drift as the `ConfigField` hexes
fixed in v2.55.0: arbitrary-value hexes are invisible to the tones guard,
which scans for palette *utility* classes. Converting the controls removed
all three.

## [2.55.0] — 2026-08-20

Hand-rolled-control migration, batch 3. **21 files / 88 controls → 14 / 51.**

### Added

- **`ToggleField`** (`pipelines/nodes/shared`) — a boolean setting with the
  control beside its label and help underneath. `ConfigField` stacks the
  label *above* the control, which is right for a text field and wrong for a
  toggle, so every panel needing one dropped out of the pattern and
  hand-rolled `<label><input type="checkbox">` instead — eight times across
  seven panels, each with its own `accent-primary w-3.5 h-3.5`. Built on the
  library's own `<Switch>`.

### Changed

- **Converted:** `VisionConfig`, `VisionClassifyConfig`,
  `VisionDescribeConfig`, `VisionExtractTextConfig`, `ResizeConfig`,
  `FormatConvertConfig`, `WatermarkConfig`.
  `VisionClassifyConfig`'s label list was a second hand-built copy of the tag
  editor already replaced in `VisionTagConfig`; both now use `<TagEditor>`.
  `VisionConfig` carried its own inlined suggestion-pill list — not even the
  `SamplePills` copy the other panels shared.
- **Vision model lists** moved onto the `modelOptions` seam
  (`image:vision`, `image:vision-analyze`, `image:vision-ocr`).
- **`FormatConvertConfig` now disables Quality when Lossless is on** and says
  so, rather than leaving an editable field whose value is discarded.

### Fixed

- **`ConfigField` errors are now announced.** The base wrapper every panel
  routes through rendered its error as a plain `<div>`, so a validation
  message was silent to a screen reader unless the individual panel had
  hand-rolled its own `role="alert"` — which only `VisionConfig` did.
- **`ConfigField` used raw hexes** (`text-[#dc2626]`) for its required marker
  and error text. Arbitrary-value hexes slip past the tones guard, which
  scans for palette *utility* classes. Now `text-danger-fg`.

## [2.54.0] — 2026-08-18

Hand-rolled-control migration, batch 2. **22 files / 94 controls → 21 / 88.**

### Fixed

- **Five vision panels imported a context-variable picker they never
  rendered.** `VisionConfig`, `VisionTagConfig`, `VisionDescribeConfig`,
  `VisionClassifyConfig` and `VisionExtractTextConfig` each imported
  `ContextVariablePicker` and destructured `paths`/`unresolved` from
  `useUpstreamContext`, then never used any of it — invisible because
  `tsc` isn't configured to flag unused locals.

  Checked against the executor before deciding what to do with it, and the
  answer was *not* "render the missing picker": `visionHandlerFactory`
  passes `systemPrompt` through **verbatim**
  (`buildSystemPrompt: (data) => data.systemPrompt ?? ''`), so a
  `{{context.*}}` token in a vision prompt reaches the model as literal
  text. Rendering the picker would have invited authors to insert tokens
  that never resolve. The dead code is removed and `VisionTagConfig` now
  says so in its help text instead.

### Changed

- **`VisionTagConfig` converted.** Its candidate-tag editor was hand-built
  — chip list, input, Add button, Enter handling — when the library already
  ships `<TagEditor>`, which is exactly that component. Wired with
  `lowercase={false}`, because candidate tags are a controlled vocabulary
  handed to the model and "Golden Retriever" has to survive as written.
  Its hardcoded model list now comes from `modelOptions['image:vision']`.

### Tests

- `VisionTagConfig` (10), covering the TagEditor integration, tag-case
  preservation, and the model seam.

## [2.53.0] — 2026-08-18

Hand-rolled-control migration, batch 1 of the debt recorded in v2.52.0,
plus a ratchet so it can only go one way.

### Added

- **`SourceImagePathField`** (`pipelines/nodes/shared`) — the "which image
  does this step operate on?" JSONPath field, with its upstream-ref
  suggestion pills. Thirteen image panels each rendered their own, and the
  copies had already diverged on whether the path is monospaced.
- **`npm run lint:node-controls`** — a ratchet over raw
  `<input>`/`<select>`/`<textarea>` under `pipelines/nodes/`. Files not on
  the baseline must have zero; a file above its baseline fails; and a file
  *below* its baseline also fails, asking you to lower the number, so the
  ratchet tightens instead of quietly going slack. Verified by mutation in
  both directions.

### Changed

- **`NumberInput` can express "unset".** `value` now accepts `undefined`
  (rendering an empty field), and a new opt-in `onClear` makes a field
  clearable. Before this, an optional numeric setting could be typed into
  but never emptied again — deleting the text silently left the old value,
  because `''` doesn't parse to a number. `onChange` keeps its
  `(value: number) => void` signature so no existing caller breaks.
  `GenerateConfig`'s seed was shipped with exactly this bug in v2.51.0 and
  is fixed here.
- **Converted to `ConfigField` + composites:** `SharpenConfig`,
  `DimensionsConfig`, `UpscaleConfig`, `AdjustBwConfig`, `JoinConfig`
  (raw radios → `RadioGroup`), `ForkConfig`, `ConditionConfig`.
  **28 files / 112 controls → 22 files / 94.**

### Fixed

- **`ConditionConfig` had a dead button.** A primary-styled "▶ Preview with
  sample context" sat at the bottom of the panel with an empty `onClick` —
  a Phase 1 stub that was never wired up. It looked like a real action and
  did nothing whatsoever when clicked. Removed rather than left advertising
  a feature that does not exist.

### Tests

- `NumberInput` (13) and `SamplePills` (5). The `forms/` primitives — the
  very composites every panel is supposed to use — had **no tests at all**
  before this.

## [2.52.0] — 2026-08-18

### Added

- **`SamplePills`** (`pipelines/nodes/shared`) — the one-click suggestion row
  under a path input. It existed as a private copy in **seventeen** config
  panels, byte-identical apart from formatting: seventeen chances to drift and
  no single place to fix a bug. Now exported once, with tests.

  It also renders **nothing** when there are no samples. Every inlined copy
  returned an empty flex wrapper whose `mt-1.5` showed as a stray gap under
  any input with no upstream suggestions to offer.

### Audit note — hand-rolled controls

Counted while auditing, and recorded here so the number is honest rather
than rediscovered: **28 files under `pipelines/nodes/` still hand-roll 112
raw `<input>`/`<select>`/`<textarea>` controls** instead of using
`ConfigField` + `Input`/`Select`/`Textarea`/`NumberInput`.

They share a copy-pasted `inputCls` constant which has already diverged into
**4 different definitions** across 17 files — so the same field renders
differently depending on which panel you open, and all four hardcode
`bg-white` rather than a surface token. This is the Chip/Badge tone
divergence from v2.39.0 repeating in a different guise.

`GenerateConfig` and `LLMConfig`'s selects were converted in v2.51.0; the
remaining files are being worked through in batches.

## [2.51.0] — 2026-08-18

Finishes the vendor-neutrality pass across the whole pipelines node surface,
and de-hand-rolls the two panels that were still doing their own controls.

### Added

- **`modelOptions` on the editor services seam** (+ `useModelOptions` and
  `useModelOptionsResolver`). Model lists were hardcoded in two panels — an
  AWS-only pair of image model ids in `GenerateConfig`, and a
  provider-keyed chat model map in `LLMConfig`. Both go stale the moment a
  host runs a different deployment or a provider ships a new tier. Hosts now
  replace any group (`image:generate`, `llm:<provider>`) without restating
  the rest; the shipped lists remain as defaults so the editor works unwired.

  An explicitly empty list is honoured rather than treated as "unset" —
  "this host runs no image models" is a real answer.

### Changed

- **`GenerateConfig` no longer hand-rolls its controls.** It rendered raw
  `<textarea>`, `<select>` and `<input type="number">` styled by three shared
  class-string constants, instead of the
  `ConfigField`/`Textarea`/`Select`/`NumberInput` composites every other
  panel uses — the exact drift the library exists to prevent. It also now
  defaults the selection to the *first offered* model rather than a
  hardcoded id, which with a host-supplied list may not be in the list at all.
- **`LLMConfig`'s two `<select>`s** likewise become the `Select` composite,
  dropping a raw `bg-[#f9fafb]` hex along the way, and gain the `aria-label`s
  that made them testable.
- **`docsContent.tsx` no longer names a backend** for the agent,
  knowledge-base, graph-query, memory, guardrail and image-generate nodes.
  The one remaining mention is deliberate: `provider: 'bedrock'` is a frozen
  field *value* that literally means AWS Bedrock, so documenting it as such
  is correct.

### Tests

- The vendor scan now walks **every** `.tsx` under `pipelines/nodes/`
  (~78 files) instead of a hand-listed three, so a new panel is covered the
  day it lands rather than the day someone remembers to add it. Three files
  are allowlisted where the vendor name is a genuine data *value*, and a
  "guards the guard" case fails if the walk ever stops finding files.
- `modelOptions` (11) — defaults, host replacement, per-group isolation,
  empty-list semantics, and the provider-switch path, which has to read the
  **incoming** provider's list to decide whether the current model survives.
  `LLMConfig` had no tests at all before this.

## [2.50.0] — 2026-08-18

Vendor neutrality, and the memory node's editor/executor contract.

### Added

- **`nodeVocabulary` on the editor services seam.** The library ships
  vendor-neutral copy for node config fields; a host that IS running a
  specific backend supplies its own wording per node type and per field
  (`labels` / `help` / `placeholders`) and gets the vendor-accurate UI it
  wants. New `useNodeVocabulary(nodeType)` hook; it reads the context
  directly, so panels stay renderable with no services provider mounted.

  This follows the same reasoning as the existing `executableNodeTypes`:
  which backend stands behind a node type is a property of the **host's
  deployment**, not of the component library. Baking a vendor's name into a
  shared primitive makes the library wrong for every host that uses a
  different one, and it can't be corrected without a breaking change to a
  frozen surface.

### Changed

- **`KnowledgeBaseConfig`, `GraphQueryConfig` and `MemoryConfig` no longer
  name a vendor.** "Bedrock Knowledge Base" → "knowledge base", "Neptune
  cluster/graph" → "graph", "openCypher query" → "Graph query", "AgentCore
  Memory" → "memory". All of it is overridable through `nodeVocabulary`.
  A test scans these panels' non-comment source for vendor terms so the
  neutrality can't quietly regress.

### Fixed

- **The memory node's advertised output didn't match what runs.**
  `contextContributions` described a memory node as contributing
  `steps.<id>.output` — an **array**, "Records read from memory". The
  handler returns an **object**, and the recalled value sits at `.value`,
  which the picker never offered at all. A downstream author could not
  select the thing they had just stored, and anything they did select was
  silently empty at run time. Read and write now advertise their real,
  separate shapes (`value`/`found`/`key` vs `written`/`key`).

### Tests

- `nodeVocabulary` (10) — neutral defaults, host overrides, per-field
  fallback, and no-provider rendering.
- **Bidirectional contract for the memory node** (8 here, 12 in
  platform-api). Both repos assert against one shared fixture, in both
  directions: that the config shape the panel produces is exactly what the
  handler reads, and that every path the picker advertises actually exists
  in the handler's output. A one-directional test passes while the two
  halves disagree — and that failure shows up as silently wrong data at run
  time rather than as a build error.

## [2.49.0] — 2026-08-18

Group C node configuration: the two nodes whose panels read
"coming in Phase C".

### Added

- **`KnowledgeBaseConfig`** — configuration for the `knowledge-base` node
  (RAG retrieval from a Bedrock Knowledge Base): knowledge base id, query
  template, top-K, score threshold, output key and retry policy. The query
  template gets the upstream-context picker and the unresolved-path warning,
  because a typo'd `{{context.*}}` path there silently embeds and searches for
  the literal text of the template.
- **`GraphQueryConfig`** — configuration for the `graph-query` node (Neptune
  openCypher): graph id, query, bind parameters, timeout, output key and retry
  policy. Parameters are edited as rows rather than a raw JSON blob — a
  malformed blob is only discovered at run time, and a user who cannot add a
  parameter row will interpolate values into the query string instead, which
  is how you get an injection into a graph database. For the same reason the
  context picker appends to a parameter value rather than to the query.

Both are wired into `ConfigPanel` and removed from
`NODE_TYPES_WITHOUT_CONFIG`, which is now down to five inert node types
(`agent`, `mcp-tool`, `guardrail`, `policy`, `ag-ui-output`).

### Fixed

- **A colliding parameter rename silently destroyed a binding.**
  `GraphQueryConfig` stores parameters as a `Record<string, string>`, so
  renaming row `b` to `a` overwrote `a`'s value *and* dropped a row, with no
  indication. The rename is now refused with an explanation. (Caught writing
  the test for a duplicate-name warning that, it turned out, could never
  fire — a `Record` cannot hold duplicates.)

### Tests

- `KnowledgeBaseConfig` (9), `GraphQueryConfig` (12), including the boundary
  cases where a falsy check would be wrong: `topK` at 1 and 100, and a
  `scoreThreshold` of `0`, which means "keep everything" rather than "unset".

### Consumer note

The matching executor support for the `memory` node (v2.48.0) ships in
`platform-api` under `src/pipeline/memory/` — see its
`docs/memory-PROVISIONING.md`. `knowledge-base` and `graph-query` still have
no executor handler, so those nodes configure but do not yet run.

## [2.48.0] — 2026-08-18

Group B node configuration, and two canvas bugs the new e2e coverage exposed.

### Added

- **`MemoryConfig`** — configuration panel for the `memory` node (AgentCore
  Memory read/write): mode, scope, namespace, key expression, value field and
  output key, with the upstream-context variable picker wired in so key and
  value expressions can be built from what actually reaches the node.
- **`PipelineCanvas` refits on resize.** The canvas is a `flex-1` column
  between the palette and the config panel, so it is resized constantly —
  opening the config pane, collapsing the palette, resizing the window. The
  `fitView` prop only fits once, on init, so the viewport kept a fit computed
  for a width that no longer existed. A `ResizeObserver` now refits, but only
  while the viewport is still the one the editor chose: once the user pans or
  zooms it is theirs, tracked via `onMoveStart` (React Flow passes a null
  event for programmatic moves, so a non-null event is a real gesture).

### Fixed

- **`image-source` and `image:save` config panels were unreachable.** Both
  components existed and were complete, but `ConfigPanel` still mapped their
  node types to `PlaceholderConfig`, so selecting either node showed
  "coming soon" instead of the panel that was already shipped. Wired both and
  removed them from `NODE_TYPES_WITHOUT_CONFIG`.
- **Half the pipeline graph was invisible.** React Flow's default `minZoom` is
  `0.5` and `fitView` will not zoom out past the flow's `minZoom`. A pipeline
  is far wider than the canvas column at 0.5, so the fit silently *clamped*
  rather than fitting — and because the ReactFlow root is `overflow: hidden`,
  the overflow was clipped with no scrollbar and no indication anything was
  missing. Six of the seeded demo's twelve nodes were off-screen; the editor
  read as broken. `minZoom` is now `0.1` with matching `fitViewOptions`.
- **`useUpstreamContext` threw outside `PipelineEditorProvider`.** It called
  `usePipelineEditor()`, which throws when no provider is mounted, so any
  config panel using the context picker could not render in a test, a story,
  or a standalone settings view. It now reads the context object directly and
  treats "no editor" as "no upstream context to offer", matching the existing
  precedent in `PipelineRunsContext`.
- **The pipeline-editor demo reseeded on every visit.** `useDemoPipelineId`
  looked for a pipeline named `'Content Moderation'` while
  `createDemoPipeline` names its result `'Document Summary Pipeline (Demo)'`.
  The lookup never hit, so each visit wrote another identical pipeline to
  localStorage.

### Tests

- `MemoryConfig` (6), `PipelineCanvas` fit configuration (4).
- `tests/e2e/pipeline-demo.spec.ts` rewritten against the real editor — the
  old spec asserted against the removed mock simulation. It now covers the
  seeded graph rendering, palette search, **drag-and-drop from the palette
  onto the canvas**, node selection opening the real config panel, the
  no-clipping invariant above, and seed reuse across visits.

## [2.46.0] — 2026-08-18

Docs-shell layout and navigation, all four reported from using the demo.

### Fixed

- **`/workflows` rendered a blank page.** `PagesOverviewPage` looked up the nav
  section by `id === 'pages'`, which the IA restructure renamed to
  `'workflows'`. The lookup returned `undefined` and the component
  `return null`ed. It now resolves `'workflows'` (falling back to `'pages'`) and
  renders a visible message instead of nothing if neither is found, so a future
  rename degrades to a list rather than an empty screen. 26 cards render again.

- **The page stretched to the height of the nav.** `DocsShell` used
  `min-h-screen`, so nothing was height-bounded: `overflow-y-auto` on `<main>`
  never engaged and a tall sidebar dragged the whole document down with it. The
  shell now owns the viewport (`h-screen` + `overflow-hidden`) and the sidebar,
  main pane and right rail each scroll independently. Verified in-browser:
  document height now equals viewport height.

- **Navigation left you mid-page.** With `<main>` as the scroll container rather
  than the window, the browser's own scroll restoration no longer applies, so
  following a nav link kept the previous page's scroll offset. `DocsShell` takes
  a `scrollResetKey` (pass the pathname) and returns the content pane to the top.

- **Nav groups repeated their own item.** A one-item group whose label matched
  the item rendered the same words twice in a row — "Social & Chat" as a header
  above "Social & Chat" as the link. Eight groups were shaped that way. The
  header is now omitted when it carries no information; multi-item groups and
  differing labels are untouched.

### Changed

- The demo sidebar starts with only the active section expanded
  (`defaultCollapsedSections`), so the nav no longer buries the item you clicked.


## [2.45.2] — 2026-08-17

Two instances of the same root cause: `useState(() => derive(props))` runs once
per mount, but both components stay mounted while the prop they derive from
changes.

### Fixed

- **Attachments leaked between documents.** `AttachmentsPanel` seeded its list
  with a lazy initialiser, and `EditorModeSwitch` keeps the panel mounted while
  `documentId` changes. So switching documents kept showing the previous
  document's attachments — and because `persist` writes to the *current*
  document's storage key, adding a file to document B wrote document A's list
  into B's storage. Confirmed by test: B's key ended up holding
  `['a-spec.pdf', 'b-new.pdf']`.

  The list now reloads when `documentId` changes, and the mutators read from
  storage rather than from state, so a write can never be based on another
  document's list (or a stale copy from another tab).

- **Config panels kept the previously selected node's UI state.** `ConfigPanel`
  renders `<Config data={node.data} …/>` — same component type, same tree
  position — so React reuses the instance across node selections.
  `ApprovalConfig` infers its time unit once from `data.timeoutMs`: select a
  node stored in hours, then one stored in minutes, and the second rendered
  "0 hours" for a 5-minute timeout. Nudging that 0 to 1 wrote 3,600,000 —
  silently changing the node from 5 minutes to 1 hour.

  Fixed at the dispatch site rather than per panel: the config is now keyed by
  node id, so selecting a different node resets local UI state in **every**
  panel. Six config panels hold prop-seeded state.

### Checked and found correct

- Focus timers in `CommentThread` and `SectionComments` — event handlers with
  optional chaining, and React nulls refs on unmount.
- Lazy initialisers elsewhere (`NodePalette` recents, `SourcesPage`,
  `PipelineRunsPage` selection, `ResumeCallDialog`) — seeded from constants or
  storage that is not prop-scoped, so they do not go stale.


## [2.45.1] — 2026-08-17

### Fixed

- **Review items could be acknowledged or rejected more than once.**
  `ReviewableItem` defers `onAck`/`onReject` by 150ms so the pulse animation
  can play, but nothing guarded that window: the buttons stayed live, so a
  double click sent two acks for the same item. Confirmed by test — three
  clicks produced three `onAck` calls.
- **The deferred submit outlived the row.** The timer was never cleared, so a
  review list that re-rendered or unmounted mid-animation still fired
  `onAck`/`onReject` against an item the user could no longer see.

  Both fixed with an in-flight flag plus timer cleanup. The action buttons now
  disable during the window and carry a visible affordance, rather than looking
  live while silently ignoring clicks.

### Checked and found correct

Recorded so the next pass doesn't re-investigate:

- The document-events `unsubscribe` on disconnect — `useWebSocket.sendMessage`
  no-ops unless `readyState === OPEN`.
- Focus timers in `CommentThread` and `SectionComments` — they are in event
  handlers and use optional chaining, and React nulls refs on unmount, so
  `?.focus()` is already a safe no-op.
- `DocumentEditorPage`'s video-host attach interval — correctly cleared, with a
  2s stop timer that is also cleared.
- `VideoCallPanel`'s `srcObject` effects and its call-state transition effect.


## [2.45.0] — 2026-08-17

### Fixed

- **New documents could end up with every section duplicated.** The
  auto-populate effect guards on `meta.templateApplied` and
  `sections.length === 0`, but neither is a lock: `templateApplied` is a Y.Map
  key (last-write-wins, not compare-and-set), and both clients read an empty
  section list before either has written. Two people opening the same new
  document at once therefore both applied the template, and `addSection` pushes
  onto the shared Y.Array with no dedupe — so the document got two of
  everything, with different random UUIDs so nothing could tell them apart
  afterwards.

  Fixed by making the operation **idempotent** rather than trying to make it
  exclusive, which CRDTs do not offer:
  - `templateSectionId(documentId, fieldName)` derives a stable id, so
    concurrent appliers produce the *same* ids.
  - `dedupeSectionsById(ydoc)` keeps the first occurrence of each id and runs on
    every client after sync. Post-merge Y.Array order is identical everywhere,
    so "keep the first" is convergent — each client computes the same deletions
    with no coordination, and nothing is lost to a double delete.

  The repair pass also heals documents that were already duplicated.

- **Follow-mode scheduled scroll/highlight timers it never cancelled.** The
  effect re-runs on every `participants` change — constant in a live session —
  so an uncancelled scroll kept firing after the user stopped following or left
  the page.
- Removed a dead loop in the same effect that iterated every peer's awareness
  state and did nothing with it, on every participants change.
- `NewDocumentModal`'s focus timer is cleared on close; an uncancelled one lands
  on a hidden input and steals focus back.

### Added

- `src/hooks/templateSections.ts` with 9 tests, including one that reproduces
  the duplication with two synced `Y.Doc`s and one that shows both clients
  converging on a single copy after an independent repair.


## [2.44.2] — 2026-08-17

Lifecycle bugs in the two areas with the most reported trouble. Both files were
among the largest with **no tests at all**.

### Fixed — doc-editor

- **Ghost cursors.** `TiptapEditor` published the local caret into awareness on
  every selection change, tagged with `sectionId`, but unmount only removed the
  `selectionUpdate` listener — it never cleared the `cursor` field. The caret
  survived pointing into a section that no longer existed, and peers kept
  drawing it until awareness timed out, or indefinitely if the author simply
  stopped moving. Cleanup now clears the field, and only that field, since
  awareness is shared with identity/presence.
- **Carets filtered against a stale section.** `updateCursors` read `sectionId`
  but omitted it from its dependency list, so after a section id change the
  filter compared against the id the callback was created with.
- **Carets positioned against the wrong element.** The overlay received
  `editorAreaRef.current` read during render, which is null on the first pass;
  `getCoords` then fell back to `view.dom`, offsetting every remote caret until
  an unrelated re-render happened to pick up the node. Now a callback ref into
  state.

### Fixed — hangout

- **Screen share that could never be stopped.** `startScreenShare` awaits
  `getDisplayMedia`, which stays pending while the OS window-picker is open —
  easily long enough for the user to leave the call. Nothing guarded the
  resolution, so the stream was assigned to a ref after teardown had already
  run: the capture stayed live with no UI left to stop it, and the browser kept
  showing the "sharing your screen" indicator. Both awaits in the callback now
  check a component-lifetime mount flag and release the stream.

### Added

- `TiptapEditor.awareness.test.tsx` (4 cases) and
  `useHangoutEmbed.test.ts` (5 cases) — the first tests either file has had.
  Both were written to fail against the old code first.


## [2.44.1] — 2026-08-17

### Fixed

- **A document editor no longer pulls in a video-broadcast SDK.**
  `useHangoutEmbed` statically imported `amazon-ivs-web-broadcast`, which put it
  in the module graph of anything reaching that hook — including
  `…/doc-editor`, because `DocumentEditorPage` imports `VideoCallPanel`, which
  imports the hook. The panel is only *rendered* behind
  `state.showVideoCall`, but a static import is paid regardless.

  The SDK is now dynamically imported (memoized at module scope, mirroring how
  `RecordingPlayer` loads `hls.js`), and the type-only imports are `import
  type` so they erase at compile time. `dist/doc-editor.js` no longer
  references the SDK at all; it is isolated in its own lazily-loaded chunk.

  This also resolves the 2.40.1 **Known** issue: `import
  '@connorhoehnslalom/ui-components/doc-editor'` previously failed under Node
  ESM because the SDK is CommonJS-only. **All 12 export subpaths now import
  cleanly under Node ESM** (was 11 of 12), verified against a packed tarball.

  `stopScreenShare` became `async` as a result — it awaits the SDK before
  constructing a `LocalStageStream`.


## [2.44.0] — 2026-08-17

### Added

- **`executableNodeTypes` on `PipelineEditorServices`** — the host declares
  which node types its executor can actually run, and the palette and node
  cards mark the rest as **preview**.

  The palette ships more node types than any given backend implements: a survey
  against platform-api found **11 of 37 with no discoverable handler** (`agent`,
  `approval`, `policy`, `guardrail`, `graph-query`, `ag-ui-output`, `mcp-tool`,
  `knowledge-base`, and the control-flow trio `condition`/`fork`/`join`). An
  author could drag one on, wire it up, and get a pipeline that silently never
  ran that step.

  The library deliberately does **not** hardcode the set. Which types execute is
  a property of the *host's deployment*, not of a component library, and a baked
  guess goes stale the moment a handler ships — so it is a seam, not a list.
  Omit the field and nothing is marked (pre-2.44 behaviour).

  Marking informs rather than blocks: a preview type is still draggable, and the
  tooltip states the consequence ("the step will not run") rather than just
  labelling it. An empty array means *nothing* executes, which is distinct from
  omitting the field.

- `useIsNodeTypeExecutable()` exported from `…/pipelines`.
- `BaseNode` takes an optional `nodeType` so a placed card can mark itself —
  more important than the palette entry, since by then the author has already
  committed to the node.


## [2.43.0] — 2026-08-17

Node-editor authoring for LLM and vision workflows now reflects the real graph.

### Fixed

- **The LLM prompt editor offered four invented context paths.** `LLMConfig`
  shipped a hardcoded `VARIABLES` list (`context.doc.body`, `context.doc.title`,
  `context.trigger.userId`, `context.steps`) and a `SAMPLE_CONTEXT` of
  lorem-ipsum, regardless of what was upstream. Authoring against
  `trigger → transform → llm` still suggested `context.doc.body`, which no step
  writes. The panel looked capable while its context awareness was fiction, and
  a template referencing a non-existent path failed at run time with no
  authoring-time signal.

- **18 image/vision panels hardcoded fake JSONPath image refs** —
  `$.steps.upload.output.imageId`, `$.steps.crop.output.imageId`,
  `$.steps.visionAnalyze.output.extracted.regions[0].bbox` — naming nodes that
  need not exist in the user's graph. Picking one produced a reference that
  silently resolved to nothing.

Both now derive from the node's actual position in the graph.

### Added

- `context/upstreamContext.ts` — pure, no React, 28 tests:
  - `upstreamNodeIds` — strict ancestors, nearest first, cycle-safe
  - `contextContributions` — what each node type writes into context, honouring
    `outputKey` when set
  - `availableContextPaths` — every `{{context.*}}` path reachable at a node
  - `availableImageRefs` — upstream image producers as JSONPath, plus the
    always-present `$.trigger.imageRef` and a scatter parent when one is upstream
  - `unresolvedTemplatePaths` — **the authoring-time signal that was missing**:
    paths a template references that nothing upstream provides. Accepts leaves
    under an available object, since payload shape is caller-defined.
- `useUpstreamContext(nodeId)` / `useUpstreamImageRefs(nodeId)` — bind the above
  to the live editor graph.
- `ContextVariablePicker` — insertable pills tinted by value kind, an
  unresolved-path warning, and a "where each value comes from" disclosure that
  can reveal the producing node. Shared rather than inlined, since LLM, vision
  and transform panels all author templates.
- `ConfigPanel` now passes `nodeId` to every config panel; without it a panel
  can only guess at its context.


## [2.42.0] — 2026-08-17

### Added

- **Four neutral-role tokens**, completing the ramp so the greys have somewhere
  semantic to live:
  - `--color-border-subtle` (#f1f5f9) — hairline divider inside a card
  - `--color-surface-emphasis` (#e2e8f0) — stronger inset than surface-hover
  - `--color-surface-inverse` (#0f172a) + `--color-text-inverse` (#f8fafc) —
    dark surfaces (code blocks, terminals) and their text

### Changed

- **The last 248 grey palette occurrences are tokens.** `src/` and `demo/src`
  now contain **zero** raw Tailwind palette colours of any family, hue or grey.
  Combined with 2.40.0's 510 and the earlier 712 exact-match greys, ~1,470
  hardcoded colours are gone.

  `text-slate-700/800` collapse onto `text-text-primary`: usage analysis showed
  they are headings (h1/h3), labels and emphasis spans, so the darkest text role
  is the correct home. Two shades becoming one is intentional — fewer variants,
  one ramp.


## [2.41.0] — 2026-08-17

### Fixed

- **`ThemeProvider` did nothing.** It wrote only `--ui-*` custom properties,
  which no Tailwind utility reads, so `<ThemeProvider theme={{ primary: 'red' }}>`
  was silently inert — while `ThemingPage` documented it as *the* theming API
  with copy-paste samples. It now also writes the real `--color-*` / `--radius-*`
  tokens for every key with a semantic counterpart (see `THEME_TOKEN_ALIASES`),
  and still writes `--ui-*` so existing `cssVar()` callers keep working.

- **The light preset was a stale fork of the palette** — a sixth colour system.
  Six of ten mapped colours disagreed with `src/styles.css` (`primary` #3b82f6
  vs #646cff, `success` #10b981 vs #16a34a, `warning`, `info`, `textPrimary`,
  `textSecondary`). That only became dangerous once the provider started
  writing real tokens: mounting `<ThemeProvider>` with no overrides would have
  silently rebranded the app. `lightTheme` now mirrors the stylesheet, and a
  test pins it.

- **The documented `mode` prop does not exist.** Every `ThemingPage` sample used
  `<ThemeProvider mode="light">`; the prop is `preset`. Copy-pasting the docs
  produced a no-op. Fixed, and the page now documents the tone-override path.

### Added

- **`tones` prop** — the recommended rebrand path, matching what every tinted
  surface actually reads:

  ```tsx
  <ThemeProvider tones={{ accent: { base: '#0d9488', bg: '#f0fdfa' } }}>
  ```

  Omitted roles keep their default. Equivalent to overriding
  `--color-accent{,-bg,-fg,-border}` in CSS.
- `toneCssVarName`, `THEME_TOKEN_ALIASES`, `ToneRole`, `ToneOverride` exported
  from `…/theme`.
- `ThemingPage` gained a "Rebranding a tone" section covering both the plain-CSS
  and the runtime route.

### Known

- `preset="dark"` is **partial**: it re-tones text/surface/border and the
  semantic colours, but the token set has no dark-specific palette, so surfaces
  are not fully dark-mode-ready. Documented as a starting point rather than
  presented as finished.


## [2.40.1] — 2026-08-17

Packaging fixes. Nothing in this release is visible in-repo — all four bugs
were found by packing a tarball and installing it into a scratch project, the
way a consumer actually gets the library. In-repo everything resolved from
devDependencies, which is exactly why they survived this long.

### Fixed

- **`import … from '@connorhoehnslalom/ui-components'` crashed at runtime.**
  The root bundle statically imports `amazon-cognito-identity-js`, which was
  externalised in `vite.config.ts` but never declared, so a consumer got
  `ERR_MODULE_NOT_FOUND` on the root import. Eight undeclared runtime deps in
  total: that one, `amazon-ivs-web-broadcast`, `hls.js`, and six `@tiptap/*`
  extensions (only `@tiptap/react` had been declared).

- **Every consumer's `tsc` failed on the root import.** `dist/index.d.ts`,
  `dist/hooks.d.ts` and `dist/doc-editor.d.ts` import `y-protocols/awareness`
  and `lib0/observable`; neither package was declared, so consumers got TS2307
  regardless of which symbol they imported. Both are now peers.

- **13 of 15 export subpaths could not be `require`d.** Each declared only
  `types` and `import`, so CJS consumers and older bundler/Jest setups could
  reach nothing but the root — even though the build ships a `.cjs` for every
  subpath. All 13 now declare `require`.

- Added `./package.json` to `exports`; build tooling and version probes read it.

`peerDependencies` went from 8 entries to 19. The ones a consumer can skip
when they don't use that surface are marked optional in
`peerDependenciesMeta`, so they are discoverable without being mandatory.

### Added

- `src/__tests__/packaging.test.ts` — a guard for all of the above: every
  runtime import in `dist/` and every type import in `dist/**.d.ts` must be
  declared, every export subpath must ship `types`/`import`/`require` and each
  target must exist on disk, and `./package.json` must be exported.

### Known

- `import '@connorhoehnslalom/ui-components/doc-editor'` fails under **Node**
  ESM because `amazon-ivs-web-broadcast` is CommonJS-only with no `module`
  field. Bundlers handle the interop and the demo's production build succeeds,
  so this affects Node-side smoke tests, not browser consumers.
- `/doc-editor` pulling in a video-broadcast SDK at all is a chunking smell
  (`VideoCallPanel` → `useHangoutEmbed`), pre-existing and untouched here.


## [2.40.0] — 2026-08-17

### Changed

- **Every raw Tailwind palette colour in the codebase is now a tone token.**
  354 occurrences across the 91 baselined files in `src/components`, plus
  `src/renderers`, `src/integrations`, all `.stories.tsx`, and 155 more in
  `demo/src`. Converted by family→tone and shade→role: green/emerald→success,
  red/rose→danger, amber/yellow→warning, blue/sky→info, indigo→primary,
  orange→caution, purple/violet→accent.

  Scope went past `bg`/`text`/`border` to `ring`, `fill`, `stroke`, `divide`,
  `outline`, `accent`, single-side borders and gradient stops — a focus ring
  and an SVG fill are semantic choices too, and `ring-blue-500` appeared 21
  times.

  `src/` and `demo/src` now contain **zero** raw palette colours, so
  overriding a tone's four CSS variables re-themes the whole library and every
  demo.

- The tone guard is now **zero tolerance**: the 91-file baseline and
  `scripts/tone-palette.allowlist.txt` are deleted, and it scans all of `src/`
  including stories.

- ~30 test assertions pinned raw palette classes — they were locking in the
  drift they should have caught. They now assert tone classes, and their titles
  say "success tone" instead of "emerald".


## [2.39.0] — 2026-08-17

### Added

- **A single semantic tone scale — the library's branding scheme.**
  Seven tones (`neutral`, `success`, `warning`, `danger`, `info`, `caution`,
  `accent`), each with four roles: `--color-{tone}`, `-bg`, `-fg`, `-border`.
  A consumer rebrands a tone by overriding four CSS variables and every
  surface in the library follows. New `src/components/shared/tones.ts` is the
  one place that maps tones to classes, exported from `…/shared`
  (`TONE_SOFT`, `TONE_SOLID`, `TONE_SOLID_BG`, `TONE_BORDER`, `TONE_TEXT`,
  `TONE_BG`, `toneKey`, `toneVar`, `Tone`, `TONES`).
- `Avatar` gains `initials` — it derived them from `name`, turning a canonical
  "AS" into "As", which forced callers holding real initials to hand-roll the
  circle.
- `AvatarGroup` gains `items` (per-person name/initials/color/src) and
  `total`. It only accepted `names: string[]` and hashed every colour, so
  presence UIs with per-user brand colours could not use it at all.
- `ViewerCount` gains `className`; `style` is deprecated.
- `Chip` gains the `accent` tone; `purple` is deprecated but still compiles.

### Fixed

- **Three components each carried their own colour palette and they
  disagreed.** Chip's success was `green-50`/`green-600`, Badge's was
  `emerald-100`/`emerald-700`, and StackDiagram had a third set — so the same
  semantic state rendered in different hues depending on which component you
  used. All three now resolve through `tones.ts`.

  All three shift appearance slightly, Chip included. Chip's literals looked
  like an exact match for the tokens (`green-50`/`green-600` vs
  `--color-success-bg: #f0fdf4` / `--color-success-fg: #16a34a`) — but those
  hex values are the Tailwind **v3** palette, and v4 defines `green-600` as
  `oklch(62.7% .194 149.214)`, which renders a few sRGB units off the hex.
  So the old classes and the tokens were never the same colour. Badge and
  StackDiagram change more, since their palettes differed outright.
- **The demo forked the design tokens.** `demo/src/App.css` held a verbatim
  copy of the `@theme` block that had drifted 26 tokens behind — including
  every `--color-cat-*` and `--font-code`, so components using those rendered
  unstyled in the demo while looking correct in Storybook. It now imports
  `src/styles.css`, which is also the documented consumer on-ramp.

### Known

- `src/theme/` (`ThemeProvider`) injects `--ui-*` variables that no Tailwind
  utility reads, and its preset values disagree with the `@theme` tokens. It
  is a disconnected fourth colour system; reconciling it is open work.


## [2.38.1] — 2026-08-16

Internal only — no public API change. Every npm script in the repo now
passes; before this, three of them did not.

### Fixed

- **`npm run lint:static-styles` passes again** (was exiting 1). 42 files
  had drifted past the allowlist, so the guard against inline-style
  regressions was permanently red and therefore ignored. Triaged all 42
  against `TAILWIND_MIGRATION.md`: **converted 23**, allowlisted 19 that
  are genuinely runtime-derived (each with an inline note saying why).
  The conversions include 17 React Flow `<Handle>` port overrides, now
  `!bottom-2 !top-auto` / `!top-[75%]` — matching the `!top-[60%]` already
  used by the older nodes; the `!` is what beats React Flow's own
  stylesheet. Verified in `dist/ui-components.css` that these emit
  `top:75%!important`, the same shape as the pre-existing rule.
  Two bugs in the checker itself also fixed: it matched non-source files
  (a JSX sample in a README counted as a violation), and its allowlist
  parser broke on trailing `# why` comments.

- **`npm run build-storybook` passes again** (was failing outright on
  `"useRoomOccupancy" is not exported by …/dist/client/hangout-rooms`).
  realtime-modules ships a CJS dist whose named exports Rollup can't see.
  `.storybook/main.ts` now aliases the package to its TS source, the same
  workaround `demo/vite.config.ts` uses, merged onto the inherited root
  aliases so `@` and `@schemas` keep working.

### Added

- `hls.js` and `amazon-ivs-web-broadcast` as devDependencies. Both were
  undeclared optional deps that `RecordingPlayer` and `useHangoutEmbed`
  reach for, which meant 4 demo routes could not run locally. With them
  installed the **e2e suite is 100 passed / 0 skipped** (was 96/4), and
  the demo production build works for the first time. Both remain
  `external` in the lib build — verified absent from `dist/index.js` and
  `dist/video.js`, so the shipped bundle is unchanged.

## [2.38.0] — 2026-08-16

### Added

- **`ChatMessage` is now exported from `…/hooks`.** The type appears in
  `ChatPanel`'s public props but no barrel re-exported it, so consumers
  could not name it (`src/hooks/index.ts` exported only the `useChat`
  value). Additive — no existing import changes.

### Fixed

- **`npm run lint` now typechecks `demo/` as well as `src/`.** The root
  `tsconfig.json` includes only `src`, so nothing ever ran
  `demo/tsconfig.json`. The gate reported 0 errors while the demo app had
  5 real type errors, one of which broke a route at runtime. Five fixes
  landed with the gate change:
  - `hook-capability-integration` named-imported `Switch` from a deep
    `@/components/shared/Switch` path, but `Switch.tsx` only has a default
    export — `/workflows/hook-capability` rendered a blank page. Now
    imports from the `…/shared` barrel.
  - `hook-hangoutrooms-integration`'s mock `subscribeRoomsIndex` emitted
    `RoomOccupancy[]`; the real adapter delivers one room per call. The
    mock now fans the snapshot out row by row.
  - `wrapped-components` imported the previously unexported `ChatMessage`.
  - `CallWidgetPage` and `call-widget-live` called `useRef()` with no
    argument (required under the React 19 types).

- **Demo e2e suite restored: 96 passing, 4 skipped, 0 failing** (was 67
  passing / 23 failing / 11 skipped). The failures were stale specs, not
  product regressions — see the spec files for per-case notes:
  - Four specs still targeted the pre-restructure demo IA (`/demo/*`,
    `/pages/*`); repointed at the canonical `/workflows/*` and
    `/components/*` routes.
  - `catalog` and `pipeline-demo` locators hit strict-mode violations
    because the docs sidebar repeats the catalog's filter-chip labels;
    scoped to the main region. `Runs` became a `role=tab`, not a button.
  - `shared-demo` now covers `/components/feedback`. Its modal/toast/banner
    *interaction* cases are not ported: that page renders hand-rolled
    preview `div`s instead of mounting the real components.
  - Retired the `SKIP_RM` skips — realtime-modules resolves again, so the
    seven hook-integration routes are smoke-tested for real.
  - Dropped the phantom `/workflows/pipeline-runs` entry: `PipelineRunsPage`
    is exported but the demo app never routed it.

## [2.37.0] — 2026-06-11

### Fixed

- **`image-source` is now reachable from the trigger.** The node was a
  pure source (no input handle), so `trigger → image-source` couldn't be
  drawn and the executor (which only traverses from the trigger) marked
  image-source — and everything downstream — as `skipped`. But the
  backend handler + executor have always supported `trigger →
  image-source` (its default `mode:'trigger'` reads `$.trigger.imageRef`;
  `VisionPipelineE2E` wires `trigger → image-source` via `targetHandle:
  'in'` and passes). The UI contradicted the tested contract. Added the
  `'in'` target handle to `ImageSourceNode` and set
  `INPUT_HANDLES['image-source'] = ['in']` in handleCompatibility, so
  `trigger → image-source → …` pipelines build and run. No executor
  change — purely aligning the node UI with the backend.

## [2.36.0] — 2026-06-11

### Added

- **Two new pipeline image node types — `image:dimensions` and
  `image:upscale`** (additive; mirrors the existing Sharp/generative
  image nodes). Both ship a canvas node + config panel, register in
  `nodeTypes`, the node category map, the palette, the editor
  default-data factory, the config-panel dispatch / docs, the step-timeline
  colour maps, and the handle-compatibility table.
  - **`image:dimensions`** (category `transform`, icon `📐`). Reads a
    source image and emits dimension data
    (`width`/`height`/`aspectRatio`/`genWidth`/`genHeight`) into context —
    it does **not** output an image. Handles: image-in `in`, data-out
    `out`, error `error`. Node data:
    `{ type, sourceImagePath?, maxEdge? }` (maxEdge default 1024). Wire its
    `out` into `image:generate`'s width/height.
  - **`image:upscale`** (category `ai`, icon `⤢`). Super-resolves a source
    image via a self-hosted x4 upscaler and outputs a new image. Handles:
    image-in `in`, image-out `out`, error `error`. Node data:
    `{ type, sourceImagePath?, prompt?, maxEdge? }` (maxEdge default 1024).
  - New barrel exports: `DimensionsNode`, `UpscaleNode`, `DimensionsConfig`
    (+ `DimensionsConfigProps`), `UpscaleConfig` (+ `UpscaleConfigProps`).

## [2.35.0] — 2026-06-10

### Added

- **`DropdownMenu` — generic trigger + dropdown menu composite**
  (`/shared` + root, additive; hub#1498). UserMenu's dropdown surface
  minus the identity coupling: arbitrary trigger content, sectioned
  items (`sections: [{ label?, items: [{ icon?, label, active?,
  danger?, onSelect }] }]`) with uppercase headings, active-item
  highlighting, and `align: 'start' | 'end'`. `align="end"` anchors the
  panel's top-right corner to the trigger's bottom-right so app-level
  hamburger menus at the viewport's right edge don't overflow. Built on
  InlinePopover (portal, outside-click + Escape dismiss, focus
  capture/restore, Tab cycling) and adds `role="menu"`/`menuitem`
  semantics plus ArrowUp/ArrowDown/Home/End focus movement. New
  exports: `DropdownMenu`, `DropdownMenuProps`, `DropdownMenuSection`,
  `DropdownMenuItem`. 11 tests + Storybook story.
- **`InlinePopover` `placement: 'bottom-end'`** (additive). Anchors the
  panel's top-RIGHT corner to the trigger's bottom-right (existing
  placements: `bottom-start`, `right`). Used by `DropdownMenu`
  `align="end"`.

## [2.34.0] — 2026-06-10

### Added

- **`PipelineNodeRuntimeProvider` — host-injection seam for live node
  state** (`/pipelines`, additive). Node components (VisionNode,
  GenerateNode, LLMNode, …) read live execution state via
  `useLatestStepForNode(nodeId)` / `useRetryFromStep()`, which until now
  only consulted the bundled `PipelineRunsProvider` — a provider that
  hard-requires this library's WebSocketProvider + the
  `VITE_SOCIAL_API_URL` HTTP seam. Host apps that maintain their own
  runs store (websocket-gateway) can't mount it, so every
  ui-components-imported node rendered `liveStep = null` there — dark
  thumbnails and streaming footers. This is the gateway image-node
  live-state gap introduced when the nodes moved into ui-components in
  Phase 2b/2c. Hosts now mount
  `<PipelineNodeRuntimeProvider value={{ getLatestStepForNode, retryFromStep? }}>`
  around the canvas; when the seam is in scope the node-facing hooks
  read IT instead of the bundled runs store (bundled provider, if also
  mounted, is ignored for these two hooks). Contract: re-create
  `getLatestStepForNode` (new function identity) whenever the host
  store changes — consumers memoize on the identity. `retryFromStep`
  is optional (sync or async; normalized to a Promise); when omitted
  the bundled handler / no-op fallback applies as before. New exports:
  `PipelineNodeRuntimeProvider`, `usePipelineNodeRuntime`,
  `PipelineNodeRuntimeValue`, `PipelineNodeRuntimeProviderProps`.
  Absent the seam, behavior is byte-identical to 2.33.x (regression
  tests cover both paths; 11 new tests).

## [2.33.1] — 2026-06-10

### Fixed

- **`PresenceMode` now exported from `./shared` and root** (hub #1494).
  The `shared` barrel exported `PresenceAvatarsProps` (which references
  `PresenceMode` via its `mode` prop) without exporting `PresenceMode`
  itself, so the 2.33.0 d.ts rollup emitted it as
  `declare type PresenceMode = …` (declared-but-not-exported) and
  consumers couldn't import it. Source-barrel bug, not a
  vite-plugin-dts artifact. Found by websocket-gateway's 2.33.0 bump
  (gateway commit `18c47e2` carries the downstream workaround).
- **Deprecated `PresenceUser` back-compat alias** for
  `PresenceAvatarUser` re-added to `./shared` and root
  (`export type PresenceUser = PresenceAvatarUser`, tagged
  `@deprecated`). The barrel has renamed `PresenceAvatars`' user shape
  to `PresenceAvatarUser` since 2026-05-21, but earlier d.ts shapes
  still let consumers import `PresenceUser`; 2.33.0's rollup broke
  those imports with no alias. Migrate to `PresenceAvatarUser` — the
  alias goes away in the next major.

## [2.33.0] — 2026-06-10

### Added

- **`/pipelines` + `/doc-editor` graduate to stable / API-frozen**
  (hub #1062 + #1066). Both barrels' public surfaces (everything their
  `index.ts` files export) are now frozen: breaking changes require a
  major bump + consumer handoff per the charter. Internal,
  non-barrel modules (pipelines `chaos/`/`dev/`/`replay/`/persistence
  internals; doc-editor `useDocumentEditorState`/`EditorModeSwitch`/
  `EditorSidebarManager`) stay private and may change freely. Full
  enumeration in `CLAUDE.md` → "API freeze" section.
- **Pipelines test floor** (was 1 test / 91 files at audit time):
  behavior tests for `PipelineEditorPage` (full provider-stack mount:
  stale-URL redirect, top-bar/palette/canvas composition, Cmd+S save
  toast, draft-run gating, single-trigger palette invariant),
  `PipelineEditorContext` (load, node/edge mutations, duplicate,
  undo/redo history, dirty tracking, save seam, drag repositioning,
  metadata-off-history contract) and `EventStreamContext` (typed +
  wildcard fan-out, `(runId, stepId, seq)` envelope dedupe, unsubscribe,
  throwing-handler isolation). 24 new tests across 3 files; the page
  test mounts the real xyflow canvas.
- **Doc-editor test floor**: `DocumentEditorPage` composition tests
  running the real Yjs stack (Y.Doc + GatewayProvider over a stub
  gateway): page frame + header mode switcher + empty state, mode
  switching, demo-load markdown → Y.Doc → SectionList/Tiptap rendering,
  and meta propagation into the header title. 4 new tests;
  `StandaloneTiptap` and 21 other doc-editor suites already existed.
- **Pipeline node visual system** (gateway node-visuals audit
  2026-06-10). `BaseNode` gains an optional `category` prop
  (`source | transform | ai | control | sink | human`) rendering a
  3px category-colored left accent bar + a shaped icon chip (circle =
  source, rounded square = transform/sink, diamond = control, violet
  gradient = ai, pill = human); execution state keeps sole ownership
  of border/background. New `nodes/categories.ts` registry
  (`NODE_CATEGORIES`, `categoryFor()`) maps all 35 node types; every
  node component now passes its category, and `NodePalette` derives
  its section grouping + accent dots from the same map (exported
  `PALETTE_ITEMS` shape unchanged, `PaletteItem` gains optional
  `nodeCategory`). Six `--color-cat-*` theme tokens added.
- **Payload-typed edges + ports.** `AnimatedEdge` data gains optional
  `payload: 'image' | 'text' | 'data' | 'control'` and `volume`
  (fan-out multiplicity): image edges render 2.5px with violet idle
  tint and an SMIL `animateMotion` "packet" dot while active; control
  edges render dotted 1.5px; `volume ≥ 2` scales width
  `min(4, base + log2(n))` and renders an `×N` midpoint pill. New
  `nodes/shared/ports.ts` (`PORT_CLS`, `portCls()`) styles `<Handle>`
  elements by payload (image = violet square, error = red, control =
  amber); all node handles adopted. `AnimatedEdge` + types now
  exported from the `/pipelines` barrel. All animation respects
  reduced motion.
- **Generative image visuals.** New `GenerativeImagePreview`
  (`/image` + root): indeterminate shimmer + elapsed-time chip while
  `synthesizing` (deliberately no fake percent — no progress event
  exists on the wire), blur-up reveal on completion. New
  `ImageLightbox` (`/shared` + root): full-screen viewer with
  keyboard nav + wraparound. New `NodeThumbStrip` (`/pipelines`):
  ≤4 thumbs + `+N` overflow, click-to-lightbox, React-Flow-safe
  propagation guards. Adopted by Generate/Variation/EditPrompt
  (synthesizing → reveal → full multi-image strip, no longer just
  `images[0]`), Save (saved-artifact strip), Vision (input thumb now
  opens the lightbox instead of inline resize), ImageSource (prefers
  the run-injected image over design-time config; click-to-lightbox).

### Notes

- The four "missing" Wrapped* stories (hub #989 — `WrappedActivityPanel`,
  `WrappedReactionsOverlay`, `WrappedFileUploadDrop`,
  `WrappedHangoutLayout`) shipped earlier in commit 597d440; this
  release closes the tracking item and corrects the stale coverage
  notes in `CLAUDE.md`.

## [2.32.0] — 2026-06-10

### Added

- **Root-export reachability gap closed** (hub #1021 + #1058): the root
  entry (`@connorhoehnslalom/ui-components`) now re-exports the full public
  surfaces of `layout/` (AppShell, AppLayout, CollapsibleSidebar,
  SettingsLayout, TopNav, DocsShell, …), `social/` (ChatPanel, PostFeed,
  ReactionsBar, PresencePanel, ActivityPanel, …) and `video/`
  (HangoutLayout, VideoGrid, VideoPlayer, CallWidget, RecordingList,
  TranscriptPanel, …) alongside the existing shared/sidebar/hangout
  exports. `import { AppShell, ChatPanel, HangoutLayout } from
  '@connorhoehnslalom/ui-components'` now works. Subpath imports (`/social`,
  `/video`, `/identity`, …) are unchanged; note `layout/` has no
  subpath — root is its only import path.

  Name collisions keep the pre-existing root symbol canonical; the
  newcomer is aliased at root and unaliased on its subpath:
  social `CommentThread` → `CommentThreadPanel`, video `Participant` →
  `VideoParticipant`, identity `FormField`/`FormFieldProps` →
  `IdentityFormField`/`IdentityFormFieldProps`, identity `AuditPage` →
  `IdentityAuditPage`.

## [2.31.0] — 2026-06-08

### Added

- **`<PresenceAvatars>` gains 4 additive props** so it covers the
  real-time-collab feature surface that downstream consumers (notably
  websocket-gateway's doc-editor `DocumentListPage`) were rolling by
  hand. The hand-rolled versions can now be retired in favour of the
  composite without losing UX.

  New `PresenceUser` fields (all optional):
  - `color?: string` — overrides the auto-computed avatar background.
    Use to match a CRDT cursor color so the same identity stays
    visually consistent across cursor, selection halo, and avatar.
  - `idle?: boolean` — present but away. Dims the avatar
    (alpha-blends `color` to `#RRGGBB99` when in hex form, or drops
    opacity to 0.6 as a fallback) and flips the status dot from
    green → amber. Takes precedence over `online` for dot color.
  - `mode?: 'editor' | 'reviewer' | 'reader'` — renders a small
    badge on the upper-right of the avatar (pencil / check / eye).
    `aria-label` carries the human-readable verb ("Editing" /
    "Reviewing" / "Viewing"). Composite badge sizes scale with the
    avatar `size`.

  New `PresenceAvatarsProps` field:
  - `onUserClick?: (id: string) => void` — per-user click. When
    set, each avatar renders as a `<button>` (focusable + keyboard +
    screen-reader accessible); when omitted, items stay as `<div>`
    (back-compat with consumers that want a static row). Click
    `event.stopPropagation()` is fired so parent click handlers
    don't fire when an avatar is clicked.

  New e2e selectors: `data-presence-idle="true"` and
  `data-presence-mode="<mode>"` on each avatar wrapper;
  `data-testid="presence-mode-badge"` on the badge itself.

  Title text composition: `<name> — Away` when idle (wins);
  `<name> — <mode label>` when mode set; `<name>` otherwise.

  Behaviour fully backward-compatible: every new field is optional
  and existing consumers (no color, no idle, no mode, no
  onUserClick) get identical rendering. 19 new test cases
  (27/27 PresenceAvatars green; full library suite 2885/2886
  passing — 1 pre-existing skip).

  Closes the operator-weigh-in question from 2026-06-07 on whether
  to swap WSG's hand-rolled `PresenceAvatars` (115 LOC of inline-
  styled tinted-circle code in `DocumentListPage.tsx`). With this
  release the swap becomes a straight pass-through with no feature
  loss.

## [2.30.0] — 2026-06-07

### Changed

- **`<WrappedLVSHangoutLayout>` adopts ui-components composites for tile
  rendering.** The hand-rolled inline `<video>` elements that the adapter
  used to project `HangoutParticipant` into `HangoutLayoutParticipant`
  are replaced with the proper composites:

  - Remote camera tiles render via `<RemoteTileSlot>`. Inherits the
    avatar fallback, `useTrackStateBump` live-tracking, AND the
    audio-from-t=0 hidden `<audio>` binding shipped in 2.29.0 — so
    every wrapper consumer gets bug class #3 closed automatically.
  - Screen tiles (both local and remote) render via `<StreamVideo>`.
    Inherits the proper `srcObject` lifecycle, `addtrack`/`removetrack`
    rebind that fixes the "audio first, video never paints" bug
    class, and autoplay-rejection callback wiring.
  - Local camera tiles STAY inline as `<LocalCameraTile>`. The local
    user needs mirrored preview (`scale-x-[-1]`) and `muted` (to
    prevent feedback), neither of which fits `<RemoteTileSlot>`'s
    remote-tile semantics. Encapsulated as a file-private component
    rather than reopening the public composite.
  - Removed the `avatarUrl()` stub that always returned `undefined`
    — dead code, the Avatar component's initials fallback covers
    the no-URL case already.

  Behaviour change: REMOTE TILES NOW PLAY AUDIO during the cold-WHEP
  window (avatar fallback rendering). Before this release, a consumer
  that adopted `<WrappedLVSHangoutLayout>` would silently rediscover
  bug class #3 — the inline `<video>` only attached `srcObject` when
  a stream existed, but during the 5-15s pre-first-video-frame window
  with a video-track-muted=true stream, that translated to a `<div>`
  placeholder rendering with no media binding. Now the hidden `<audio>`
  inside `<RemoteTileSlot>` carries the audio track immediately.

  3 new test cases pin the contract: remote tile uses
  `<RemoteTileSlot>` (with the `remote-tile-hidden-audio` testid
  asserting the binding present); local tile is inline and does NOT
  render `<RemoteTileSlot>` testids; local-no-stream falls to the
  inline avatar tile (testid `local-camera-avatar`) not the remote
  branch. 12/12 wrapper tests green, 2866/2867 library total green
  (1 pre-existing skip).

  The MediaStream shim in the wrapper's test file also gained
  `EventTarget` (`addEventListener`/`removeEventListener`/
  `dispatchEvent`) so `useTrackStateBump` and `StreamVideo`'s
  mutation-rebind paths can run without TypeErrors during the test
  environment's mount.

## [2.29.0] — 2026-06-07

### Added

- **`<RemoteTileSlot>` audio-from-t=0**. The avatar fallback branch
  (no usable video) now renders a hidden `<audio>` bound to the same
  `MediaStream`, so the inbound audio track plays the moment its RTP
  arrives — independent of whether a `<video>` element is currently
  decoding frames. Closes bug class #3 ("~10s silence before audio
  plays") at the SHARED layer rather than letting each consumer
  rediscover the fix.

  Upstream of websocket-gateway commit `a923d6b` (introduced
  `RemoteAudioAttachment` inline in `HangoutOverlay`). With this
  release, every `<RemoteTileSlot>` consumer (current: WSG
  HangoutOverlay; future: VideoCallPanel, HangoutDemoPage,
  anything new) inherits the fix without per-consumer wiring.

  Important guard: the hidden `<audio>` is rendered ONLY in the
  avatar branch. When `<RemoteTileSlot>` is showing `<StreamVideo>`,
  the video element handles audio playback natively — adding a
  second `<audio>` bound to the same MediaStream's audio track
  would risk playback duplication in some browsers. The test suite
  pins this invariant (`renders <StreamVideo> branch (no avatar, no
  hidden audio)`).

  Pure backward-compatible: `RemoteTileSlotProps` is unchanged.
  9 new test cases (`RemoteTileSlot.test.tsx` — new file): avatar
  branch + audio binding under no-stream / camera-off / cold-WHEP
  conditions, no-binding guard for the video branch, rebind-on-
  stream-change, cleanup-on-stream-undef, display-name preservation,
  avatarSize prop. 9/9 green.

## [2.28.0] — 2026-06-07

### Added

- **`<HangoutPreJoinShell>` identity tile for the camera-off path.** New
  optional `localIdentity?: { displayName: string; avatarSrc?: string }`
  prop. When provided AND the user toggles the camera off pre-join
  (`videoEnabled=false` + `permission='granted'`), the preview tile
  renders a Meet/Teams-style identity card: large `<Avatar>` (size 96)
  + display name + "Camera off" subtitle. Avatar falls back to initials
  when `avatarSrc` is absent. Backward-compatible — consumers that
  don't pass `localIdentity` see the existing bare "Camera off" text,
  so existing call sites (websocket-gateway `HangoutRoom.tsx:195`) are
  unaffected until they opt in.

  Closes the audit gap flagged by the operator on 2026-06-04: when the
  gateway wires PreJoin into a real route, users who toggle cam off
  pre-join were seeing bare slate text instead of an identity tile,
  inconsistent with every modern conferencing UI.

  6 new test cases (`HangoutPreJoinShell.test.tsx`): identity-tile
  render path, legacy text-fallback path, no-tile-when-camera-on,
  avatarSrc → `<img>`, no-src → initials, identity-tile suppression
  in non-granted permission states. 23/23 total green.



## [2.26.0] — 2026-06-04

### Added

- **Screen-share auto-promotion in `<HangoutLayout>` / `<HangoutSpotlight>`**.
  `HangoutLayoutParticipant` gains an optional `screenElement?: ReactNode`
  slot. When ANY participant (remote or local) supplies it,
  `<HangoutLayout>` auto-flips to spotlight mode and `<HangoutSpotlight>`
  promotes the screen-share into the main slot. The sharer's CAMERA tile
  stays visible in the filmstrip — you still see the person while they're
  presenting. An explicit `spotlightContent` prop still wins (consumers
  rendering REC indicators / pinned-tile UI are unaffected). With
  multiple concurrent screen-shares (rare, but possible during a hand-off)
  the first remote sharer is promoted; a local share loses to any remote
  one. The spotlight wrapper's `data-spotlight-type` / `data-spotlight-user`
  attributes reflect the screen vs camera state so e2e specs can target
  without reading `srcObject`.

- **`<WrappedLVSHangoutLayout>` now projects `HangoutParticipant.screenStream`
  into `screenElement`** so consumers of the LVS adapter get
  screen-share spotlight promotion for free. The pre-2.26.0 behaviour
  (drop `screenStream`) is gone — this was the known follow-up flagged
  in the 2.24.0 changelog. Screen `<video>` is `object-contain` (no
  crop), never mirrored, and `muted` for local shares to prevent echo
  on system-audio shares.

### Notes

- New tests: +5 (`HangoutSpotlight` — remote auto-promote, sharer-camera
  stays in filmstrip, local auto-promote, explicit-content override,
  multi-sharer tie-break), +2 (`HangoutLayout` — auto-flip on remote
  screenElement, auto-flip on local screenElement), +2
  (`WrappedLVSHangoutLayout` — remote `screenStream` projection, local
  `screenStream` projection). Full suite 2247 tests pass, `tsc --noEmit`
  clean. No breaking changes — `screenElement` is optional everywhere.

## [2.25.0] — 2026-06-04

### Added

- **`<MediaControlsBar>`** (`/video`). Bottom control bar for an active
  hangout call: round mic / camera / screen-share toggles plus the
  red Leave button. Built on the new `<CircularIconToggle>` +
  `MediaIcons`. Per the gateway-locked boundary, this is the
  composite that owns the Leave-call affordance — sister composites
  (`<WrappedLVSHangoutLayout>`, `<HangoutRoomHeader>`) deliberately
  do not render Leave. Screen-share is opt-in: omit
  `onToggleScreenShare` and the third toggle is not rendered. An
  `extras` slot sits between the screen-share toggle and Leave for
  things like raise-hand / captions / settings.

- **`<HangoutRoomHeader>`** (`/video`). Top bar for an active hangout
  call. Renders the channel name, a subtitle, an optional inline
  `RecordingPill` (Chip uppercase + danger dot when active), an
  optional elapsed-time chip (clock-icon + tabular-nums), an optional
  right-side `PhaseChip` (idle / joining / joined / reconnecting /
  ended / failed), and an actions slot for consumer-supplied controls
  (Debug button, etc.). Like its sibling composites, Leave is NOT on
  this header — it lives on `<MediaControlsBar>`.

- **`<CircularIconToggle>`** (`/video`). Round on/off button primitive
  used by `<HangoutPreJoinShell>`, `<MediaControlsBar>`, and any other
  Meet-style media toggle surface. Consumer-supplied `iconOn` / `iconOff`
  pair; state reflected via `aria-pressed`; visual flips between an
  active soft-slate palette and an off red-soft palette (or
  neutral-soft via `offTone="neutral"` for non-media toggles like
  screen-share).

- **`MediaIcons`** (`/video`). Small set of stroke-based SVG primitives
  (`MicIcon`, `MicOffIcon`, `VideoIcon`, `VideoOffIcon`,
  `ScreenShareIcon`, `ScreenShareOffIcon`, `PhoneOffIcon`,
  `MoreHorizontalIcon`). Pure SVG — no external icon-pack dep added
  to the library. Each accepts a `size` prop (default 20) and
  passes through all standard SVG props; color inherits via
  `currentColor`. The set is intentionally narrow (only icons the
  hangout composites use); add new ones as composites require them.

### Changed

- **`<HangoutPreJoinShell>`** now uses `<CircularIconToggle>` + the
  new `MediaIcons` instead of its inline `ToggleButton` + handcrafted
  Mic / Cam SVGs. Public props unchanged.

### Notes

- New tests: 5 (`CircularIconToggle`) + 8 (`HangoutRoomHeader`) + 7
  (`MediaControlsBar`) — full suite 2238 tests pass, `tsc --noEmit`
  clean.

## [2.24.0] — 2026-06-04

### Added

- **`<HangoutPreJoinShell>`** (`/video`). Google Meet-style "green
  room" composite for the hangout pre-join flow. Channel-name header,
  live camera preview tile, mic/cam circular toggles, ready-state
  roster (with `live` / `connecting` chip per participant), and the
  Join button. Consumer-provides the `previewStream`, `permission`
  state, audio/video toggle handlers, and an `onJoin({ audio, video })`
  callback — the shell owns no media APIs itself. Permission failures
  render the new `<PermissionDeniedCard>` inline with a `Try again`
  affordance wired to `onRetryPermission`. The roster auto-truncates to
  8 entries with a `+N more` overflow chip; `readyLoading` swaps the
  roster for a `Checking room…` spinner. Used by the `websocket-gateway`
  hangout app per the gateway-locked contract finalized 2026-06-03.

- **`<WrappedLVSHangoutLayout>`** (`/integrations/realtime-modules`).
  Drop-in adapter that connects `useLVSHangout` from
  `@connorhoehnslalom/realtime-modules/client/video` to `<HangoutLayout>`.
  Per the gateway-locked boundary decisions, the wrapper:
  - exposes connection state via an `overlay({ connectionState, error,
    participantCount, remoteCount })` render-prop slot — consumers
    supply their own reconnecting / failed / empty backdrops;
  - forwards a consumer `spotlightContent` slot for REC indicators,
    pinned-tile UI, or recording badges (the wrapper does NOT
    subscribe to recording lifecycle);
  - takes an async `getStageToken` callback mirroring the SDK
    `getAuthToken` pattern so token renewal stays consumer-managed;
  - does NOT render a Leave button — leave affordance lives on the
    sibling `<MediaControlsBar>` composite (coming next).

  Maps `HangoutParticipant.streams[]` to per-tile `videoElement`s with
  `srcObject` binding via ref; `isLocal` tiles get muted + mirrored.
  Screenshare promotion (`screenStream` → spotlight) is a known
  follow-up that requires extending `HangoutLayoutParticipant` +
  `HangoutGrid/Spotlight` render paths.

- **`<PermissionDeniedCard>`** (`/shared`). New fallback primitive for
  media-device permission failures. Props: `kind: 'camera' | 'microphone'
  | 'screen'`, `state: 'denied' | 'blocked' | 'no-device' | 'unavailable'`,
  optional `message`, `onRetry`, `retryLabel`, `icon`. Default copy is
  keyed on `state`; default per-kind SVG is provided. Used by
  `<HangoutPreJoinShell>` but exported standalone for any consumer that
  needs to surface a getUserMedia rejection.

### Notes

- New tests: 7 (`PermissionDeniedCard`) + 16
  (`HangoutPreJoinShell`) + 7 (`WrappedLVSHangoutLayout`) — full suite
  2218 tests pass, `tsc --noEmit` clean. `@connorhoehnslalom/realtime-modules`
  is consumed via the existing peer-dep + `file:` pin; no new runtime
  deps.

### Added

- **`<CallControls>` + `<CallParticipantStrip>` + `<CallStatsOverlay>`**
  (`/video`). Extracted from the 1009-LOC `<CallWidget>` monolith so
  consumers can compose alternative call surfaces (PiP-only viewer,
  dialer modal, screen-share kiosk header, diagnostics-on-tile overlay)
  without re-wiring the full widget shell. `<CallControls>` is the
  pure-presentational bottom bar (mute / camera / screen-share /
  upgrade / add-participant picker / end-call) — caller owns the
  toggle state. `<CallParticipantStrip>` is the compact avatar roster
  used by audio-only mode, with `maxVisible` collapsing into a `+N`
  chip. `<CallStatsOverlay>` is the optional network-quality /
  bitrate / latency / packet-loss diagnostics dock, with a built-in
  empty-state gate (renders `null` when no metric is set). `CallWidget`
  now composes the three pieces internally and is down to 825 LOC;
  render output, props, and behaviour are unchanged for every existing
  consumer. New per-piece tests (47) cover toggle wiring, picker
  dedupe, avatar overflow, empty-stats gating, and corner positioning.
  Refs hub#1205.

- **`<HangoutGrid>` + `<HangoutSpotlight>`** (`/video`). Extracted
  from `<HangoutLayout>` as standalone presentational primitives so
  consumers can build alternative call surfaces (PiP-only viewer, a
  screen-share kiosk, a moderator panel) without recomposing the
  hangout shell. `<HangoutGrid>` owns the auto-grid sizing rules and
  local-PiP-vs-inline placement (`gridCols` helper also exported).
  `<HangoutSpotlight>` owns the spotlight slot resolution
  (`spotlightContent` > stable active speaker > first remote) and
  the filmstrip; `useStableActiveSpeaker` hysteresis hook is exported
  too. `<HangoutLayout>` now dispatches to one or the other based on
  `mode` / `spotlightContent` / participant count. Render output
  unchanged. Refs hub#1224.

- **`<AutoplayGate>` + `playState` tracking on `<StreamVideo>`**
  (`/video`). Chrome and Safari silently reject non-muted autoplay on
  remote tiles when a user joins a call from a background tab
  (notification click, hash-link) — the user sees a permanently black
  tile and has no recovery affordance. `<StreamVideo>` gains an
  optional `onPlayStateChange?: (state: 'playing' | 'paused-by-autoplay'
  | 'ended') => void` prop that fires `paused-by-autoplay` when
  `play()` rejects with `NotAllowedError`. New `<AutoplayGate>`
  composite wraps `<StreamVideo>` and, on rejection, overlays a single
  tap-to-unmute chip. On click it unmutes the wrapped tile, plays it,
  AND walks `document.querySelectorAll('video')` calling `play()` on
  every paused tile — one user gesture clears every blocked remote at
  once. SSR-safe. Refs gateway hub#1257.

- **`<MessageRow>` + `<MessageGroup>`** (`/social`). Extracted from
  `ChatPanel` as standalone presentational primitives so consumers can
  build alternate chat layouts (thread panel, dense feed, search-result
  card) without recomposing the row. `<MessageRow>` accepts a
  `ReactNode` content slot (mentions, inline media), an optional
  `footer` slot (e.g. a `<ReactionsBar>` per message), `hideAvatar` /
  `hideAuthor` toggles for use inside a group, and a `mine` flag
  surfaced as `data-mine` for styling hooks. `<MessageGroup>` stacks
  consecutive messages from the same author and renders avatar +
  author label only on the first row. ChatPanel now composes
  `<MessageRow>` directly; render output is unchanged. The
  `formatChatTime(iso)` helper is also exported. Refs hub#985.

- **`<ReactionsBar>` + `<ReactionPickerPopover>`** (`/social`). Chip bar
  showing existing reactions with counts (mine highlighted via
  `aria-pressed`) plus an "add reaction" trigger that opens a cmdk-driven
  popover with a default 64-emoji 8×8 grid, search input, Escape-to-close,
  and click-outside dismissal. Replaces the gateway's hand-rolled trigger
  UI that previously paired with `<WrappedReactionsOverlay>`'s floating
  animation. `DEFAULT_PICKER_EMOJIS` is also exported for consumers that
  want to build their own bar. Refs hub#988.
- **Global test setup** now polyfills no-op `ResizeObserver` +
  `Element.prototype.scrollIntoView` so any future cmdk consumer's tests
  work without copy-pasting the polyfill. `CommandPalette.test.tsx`'s
  local polyfill is still in place and harmless.

- **`<RecordingRow>`** (`/video`). Extracted from `<RecordingList>` as a
  standalone, presentational primitive so consumers can build custom
  recordings layouts without rebuilding the row. Adds a `status?:
  'ready' | 'processing' | 'failed'` field (with badge), an `actions?`
  slot for per-row buttons, and full keyboard support (Enter/Space
  activate, focus-visible ring). `<RecordingList>` now composes it
  internally and gains an optional `renderActions?: (item) => ReactNode`
  prop. `RecordingListItem.status` is forwarded to each row. Refs hub#987.

### Changed

- `<RecordingList>` rows now render as `<div role="button">` instead of
  `<button>`. This is required for the new `actions` slot (button-in-
  button is invalid HTML). Behavior is preserved: rows are still
  keyboard-activatable, `aria-pressed` still reflects selection, and the
  `data-testid="recording-row"` + `data-recording-id` attributes are
  unchanged. Selection ring class moved from generic `ring-2` to the
  more specific `ring-[var(--color-primary)]/40` token.

## [2.14.0] — 2026-05-31

### Added

- **`<ConnectionPill>`** (`/shared`). Canonical 5-state connection-status
  pill (idle/connecting/connected/reconnecting/disconnected) with `compact`
  + `withLabel` variants, `aria-live="polite"` for transition announcements,
  and per-state `labels` override for localisation. Promoted from
  `layout/ConnectionStatus` so chat, gateway sidebar, and admin shells all
  share one source. Refs hub#984.
- **`<DocsShell>` + `<DocsSidebar>` + `<DocsTopNav>`** (`/layout`). Trio of
  documentation-shell primitives: collapsible-section sidebar with
  active-route highlight, sticky topnav with brand + search-hotkey slot,
  and a composition shell with optional TOC right-rail. The demo's hand-
  rolled `shell/Sidebar.tsx` + `shell/TopNav.tsx` (245 LOC of inline-styled
  divs) drop out entirely; `shell/DocsLayout.tsx` is now a thin adapter
  that maps the demo's `navigationTree` to library props and plugs in
  react-router's `<Link>` via `renderLink`. Refs hub#1018.

### Changed

- `layout/ConnectionStatus` now re-exports the new `<ConnectionPill>` and
  is marked `@deprecated`. Scheduled for removal in 2.15.

### Migrated

- `demo/src/demos/social-panel/ChatMessages.tsx` typing-indicator block
  now uses the shared `<TypingIndicator>` primitive — the inline
  `@keyframes typingBounce` injection and three hand-rolled animated
  `<span>` dots are gone. Refs hub#1034.

## [2.13.0] — 2026-05-30

### Added

- **`<LogStream>` / `<TerminalLog>`** (`/shared`). Monospace terminal-style
  log panel with timestamp/level/source columns, follow-tail autoscroll,
  jump-to-live pill when the user has scrolled up, a line-count chip in
  the header, and an optional Clear button. Composes `<Card>` +
  `<CardHeader>` — no inline styles. Exposes `role="log"` with
  `aria-live="polite"` by default. Refs hub#1020.
- **`<ThumbnailCard>` + `<CatalogGrid>`** (`/shared`). Catalog/gallery
  card with hover lift, tonal category chip, thumbnail-image or
  icon-fallback, and an optional top-right badge. Renders as `<a>`,
  `<button>`, or static `<div>` based on props. Companion `<CatalogGrid>`
  standardises the responsive 1/2/3/4/5-column tile layout used by
  component galleries and demo catalogs. Unblocks Wave 2 audience-first
  landing (#1060). Refs hub#1019.
- **`<StackDiagram>` / `<LayerStack>`** (`/shared`). Data-driven layered
  architecture diagram for docs/showcase pages. Layers render as tonal
  boxes connected by arrow, line, or no connector; vertical or
  horizontal orientation. Tones match `<Chip>` (primary/success/
  warning/danger/info/caution/purple/neutral). Refs hub#1038.
- **`<SettingsLayout>`** (`/layout`). Section-rail + content + sticky-
  save-bar shell for identity/admin settings pages. Sections are
  data-driven; rail supports controlled and uncontrolled active-section
  state. Save bar appears only when `dirty` and exposes Save/Cancel
  slots with saving state and an optional meta slot for dirty-field
  count. Refs hub#1044.

### Wave 1 status

- Atoms shipped: TypingIndicator, Tabs, ErrorState/LoadingState,
  PresenceDot/UserChip.
- Composites shipped: DataTable, TopNav/NavTabs, CodeBlock, StatCard
  (with delta/sparkline), KPIGrid.
- Domain primitives shipped: HealthGrid/HealthCell, AlertList/AlertItem,
  CodeBlock, LogStream (this release), ThumbnailCard/CatalogGrid (this
  release), StackDiagram (this release), SettingsLayout (this release).
- Still open: hub#1018 DocsShell trio, #1040 CommandPalette wrapper,
  #984 ConnectionPill canonical, #985 MessageRow/MessageGroup, #982
  ChatPanel avatar slot, #987 RecordingRow/List, #988 ReactionsBar,
  #1057 CapabilityDeniedFallback, #1061 ReconnectingShim, #986
  WrappedConnectionPill.

## [2.12.0]

### Added

- Root barrel (`src/index.ts`) now re-exports `./components/layout`, so
  `AppShell`, `AppLayout`, `CollapsibleSidebar`, `ConnectionStatus`,
  `ApiDegradedBanner`, and `CollapsedIconStrip` are reachable via
  `import { ... } from '@connorhoehnslalom/ui-components'` (previously only
  available through deep imports under `…/components/layout`). Additive;
  no name collisions with shared/sidebar/hangout barrels. Refs hub#1021.
- Root barrel now re-exports `./components/social`, `./components/video`,
  and `./components/identity`. Consumers can `import { ChatPanel, ChatRoom,
  RoomList, PostFeed, GroupPanel, PresencePanel, ActivityPanel, SocialPanel,
  VideoPlayer, VideoGrid, CallWidget, HangoutLayout, RosterPanel,
  StreamVideo, RecordingPlayer, TranscriptOverlay, LoginPage, LogoutPage,
  MfaSetupPage, MfaVerifyPage, MfaDashboardPage, ConsentPage, ErrorPage,
  IdentityAdminLayout, PoolScopedLayout, EntityTable, CodeInput,
  QrCodeDisplay, StatusBadge, ... } from '@connorhoehnslalom/ui-components'`
  directly without subpath imports. Existing subpath imports continue to
  work. The `/agents` domain remains subpath-only pending its stable
  graduation (hub#1069). Refs hub#1058, resolves blocker #34 via operator
  option B (handoff #365).

### Changed (root-barrel disambiguators — non-breaking)

- Six names exist in both the new domain barrels and pre-existing root
  exports. To keep the pre-existing root contract stable, the new-domain
  variants are root-re-exported under disambiguated aliases. The original
  names continue to resolve to the pre-existing canonical source. Both
  variants remain reachable via their subpath imports.
  - `CommentThread` (root) → `./types` interface (unchanged).
    New: root-only alias `CommentThreadPanel` for `./components/social/CommentThread.tsx`.
  - `Participant` (root) → `./types` interface (unchanged).
    New: root-only alias `VideoParticipant` for `./components/video/VideoGrid.tsx` `Participant`.
  - `MfaDevice` (root) → `./types/identity` interface (unchanged).
    The identity `auth/MfaDashboardPage.tsx` ships its own page-local
    `MfaDevice` shape — kept subpath-only; not re-aliased.
  - `FormField` / `FormFieldProps` (root) → `./components/shared/FormField`
    (unchanged). New: root-only aliases `IdentityFormField` and
    `IdentityFormFieldProps` for the identity-flavoured variant.
  - `AuditPage` (root) → `./api/pipelineAudit` interface (unchanged).
    New: root-only alias `IdentityAuditPage` for the identity admin
    component.

## [2.9.1] — 2026-05-28

### Fixed

- `dist/` now committed against the git tag so consumers installing via
  `github:connorhoehnslalom/ui-components#v2.9.1` get a tarball with
  compiled artifacts present. Prior tag `v2.0.0` shipped without `dist/`
  in the tree, forcing consumers to run `prepare` (which fails in
  containers without a build toolchain). The `prepare` script is guarded
  with `test -f dist/index.js || …` so no rebuild attempt happens on
  consumer install when `dist/` is present.

No source/API changes — patch-only release for tag installability.
