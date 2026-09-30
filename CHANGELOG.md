# Changelog

All notable changes to `@connorhoehnslalom/ui-components` will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## 2.407.40

- **`RichChatComposer`: a failed send can say why (feat).** The alert on a rejected `onSend` was always "Unable to send. Your draft and attachments are saved. Try again." — an upload 500, a malformed upload URL and a closed socket read the same. Reject with the new `ComposerSendError` (exported from the root, `social` and `social/rich-composer`) and the alert shows its message ("Upload failed: HTTP 500. Your draft and attachments are saved."); any other rejection keeps the generic sentence, since an arbitrary `Error` message is not written for the person typing. Matched by `name` (`composerSendErrorReason`), so two copies of the module still agree. The alert gains `data-testid="<testId>-send-error"`. `ContextComposer` passes rejections through unchanged, so it gets this too. Test: `RichChatComposerPersistence.test.tsx`.

## 2.407.39

- **`RichChatComposer` / `ContextComposer`: no "Maximum update depth exceeded" under fast typing (fix).** Typing at delay 0 (Playwright `type()`) into a composer with a controlled draft — `ContextComposer` always drives its inner composer that way, and Agent is the default mode on document pages — threw from the editor's `onUpdate` after ~50 keys on a page heavy enough to re-render per key (realtime-examples' `/documents`); at 15 ms a key it did not. The cause was the draft-sync effect (`RichChatComposer.tsx`, deps `[editor, draft, onDraftChange]`): every key's sync commit ran it for the host's echo of the draft the composer had just published, and it re-set `empty`, the active command, `argumentEmpty` and the picked argument — state `onUpdate` had already set from the same text. Those setStates come from a sync commit's passive phase at Default priority, which React 19 counts as a nested update; the count resets only when that Default render runs, and it never did while the next key arrived first. Now the effect does nothing for its own echo on the same editor (it still runs for a new editor instance and for a genuinely external draft), and an external draft whose html already equals the editor's text no longer calls `setContent` — the editor keeps its caret and history, and an empty transaction lets the hidden-command plugin re-read the pick. The staged files are replaced only when the draft's files differ.
- Story: `Social/ContextComposer` → "Document — controlled draft, Agent" (host-held `draft` + `mode`, and a page body that re-renders per key). Tests: `ContextComposerFastTyping.test.tsx` (60 keys as discrete keydown events with only microtasks between them — throws without the fix; the draft equals the typed text; a same-text host draft keeps the caret) and `tests/storybook/composer-fast-typing.spec.ts` (`npm run test:e2e:storybook`: zero-delay `pressSequentially` into the controlled and the Document stories — no console/page error, the editor and the host draft hold the typed text).

## 2.407.37

- **`NotificationBell` (new, `shared` + root barrel):** the header's activity trigger — a bell with an unread count that opens the feed. `items: NotificationItem[]`, `unreadCount?` (default: items whose `read` is not `true`), `onItemClick?(item)` (the popover closes after it), `onMarkAllRead?`, `onClearAll?`, `label?` (default "Activity"), `placement?` (`InlinePopoverPlacement`, default `bottom-end`), `size?: 'sm' | 'md'` (`sm` = 28px, the header-control family; `md` = 32px), `className?`, `data-testid?` (default `notification-bell`; parts `-button`, `-badge`, `-popover`, `-center`, `-empty`). Composed from library parts only: `IconButton` + `BellIcon`, a `Badge` count at the button's top-right (hidden at 0, "99+" past 99), `InlinePopover` anchored to the button with the open state held inside (Esc and an outside click close it, focus returns to the button, a second click on the bell closes it), `NotificationCenter` inside with the three callbacks, and an `EmptyState` "Nothing new" when `items` is empty. The button is `aria-haspopup="dialog"` with `aria-expanded`, and its accessible name carries the count ("Activity, 3 unread"; the true count, not "99+") — the badge is `aria-hidden` so it is not announced twice. The popover is named by `label`.
- **`WrappedNotificationBell` (new, `integrations/realtime` + `integrations/realtime-modules`):** `NotificationBell` on a realtime-modules `useNotifications()` return, mirroring `WrappedNotificationCenter` — same adapter, same `notifications: RMUseNotificationsReturn` prop, same `onItemClick(item, entry)` (default `markAsRead(item.id)`; the entry carries the `channel` / `payload` a click navigates by), `markAllRead` / `clearAll` wired; the badge takes the hook's `unreadCount` unless `unreadCount` is passed. Every other `NotificationBellProps` passes through.
- **`BellIcon` (new glyph, beside `BellMutedIcon`):** a plain bell on the same `GlyphProps` contract.
- Story: `Shared/NotificationBell` (Empty, Three unread, 120 unread, Header size). Tests: `NotificationBell.test.tsx` (count, 99+ cap, explicit `unreadCount`, accessible name, open / Esc / focus return / outside click / toggle, callbacks, empty state, `sm` size), `WrappedNotificationBell.test.tsx` (hook count, default `markAsRead`, `(item, entry)` handoff, mark-all / clear-all, empty state).

## 2.407.36

- **`StackedRail` at 220px (`railWidth="xs"`): labels no longer lose their width to always-visible chrome.** A group heading's `actions` (a ⋯, icon buttons) are now revealed rather than always drawn: visually hidden (`sr-only` — no width, still a tab stop and in the accessibility tree, never `display:none`) until the heading strip is hovered, holds a `:focus-visible` element (Tab onto the heading, or into the actions; a mouse click on the heading does not pin them), has a menu open inside (`aria-expanded="true"`), or the group is current; always out on a touch screen (`@media (hover: none)`). `trailing` presence and the count never hide or shrink. `StackedRailGroup.current` (new) is derived when any row in the group, at any depth, is current, and can be set to force it; `STACKED_RAIL_GROUP_ACTIONS_CLASS` is exported. A heading followed by chrome drops its 14px right inset (`pr-0`) so the room goes to the label. Measured in the `Documents` story at 220px, label width before → after (at rest): "WORKSPACE DRAFTS" (presence + ⋯ + count) 78px ellipsized → 123px whole (128px available); a folded "AUTH MIGRATION" with presence 92px ellipsized → 103px whole; on hover the ⋯ returns and the drafts label ellipsizes to 92px.
- **The rail caption:** the count sits directly after the title ("DOCUMENTS 187"), and two or more `StackedRailAction`s fold into one ⋯ menu (`<testid>-actions-menu`, one item per action, `disabled` carried over) when the rail is under 240px — a container query on the caption row, so no width prop; `sm` and wider keep the inline 28px buttons, and a single action or a `ReactNode` is drawn as-is. Caption title before → after at 220px with a 3-digit count and three actions: 38px "DOCUM…" → 76px "DOCUMENTS" whole.
- **Full names in `title`:** every group heading (button or `h3`) and the caption carry `title` = the full label, so a truncated one reads whole on hover and to assistive tech; row labels always carried it.
- Story: `Documents` gains "Workspace drafts" (long label + presence + a ⋯) and a folded "Auth migration" with presence, and the caption a count of 187 with three actions. Tests: `StackedRail.test.tsx` (the reveal classes, the coarse-pointer rule, current-group derivation, `title` on headings and caption, the caption fold); `tests/storybook/stacked-rail-actions.spec.ts` (`npm run test:e2e:storybook`: at 220px the labels are not ellipsized at rest, the ⋯ is hidden until hover and until Tab onto the heading, presence stays, the caption reads "DOCUMENTS 187" whole with the three actions in the ⋯).

## 2.407.35

- **`AppShell`'s `<main>` is `min-w-0` (fix).** It is a `flex-1` item of the body row and had the automatic minimum width, which is its content's min-content — so one nowrap line anywhere in the page (a truncated list snippet, a `DocumentToolbar` that measures its own room, a composer row) made the whole page wider than the window. realtime-examples' Documents surfaces at 1280×720: `documentElement.scrollWidth` 1587 on the list and 1463 on an open page → 1280 on both; the page editor's toolbar now measures 978px of room and folds into ⋯ instead of reading the widened box. Truncation, toolbar folding and the docked composer all work inside the window-wide main now.
- Tests: `AppShell.test.tsx` (main carries `min-w-0` and `flex-1`).

## 2.407.34

- **`ProposedEditStrip` (new, `doc-editor` + root barrel):** an agent's pending edits to the open document, waiting on a human — "Proposed edit · Replace selection · Apply · Discard". `proposals: { id, kind: 'insert' | 'replace', anchor: { from, to } | 'cursor', content: { html?, text? }, summary?, status: 'streaming' | 'ready' | 'applying' | 'applied' | 'discarded' }[]`, `onApply(id)`, `onDiscard(id)`, optional `onRevise(id, instruction)` (a one-line inline field behind "Revise…", on ready proposals), `onApplyAll` / `onDiscardAll` (shown when more than one proposal is ready / pending), `title`, `data-testid` (default `proposed-edit-strip`; parts `-title`, `-item` with `data-status` + `data-proposal-id`, `-placement`, `-summary`, `-preview`, `-streaming`, `-apply`, `-discard`, `-revise`, `-revise-input`, `-revise-send`, `-applied`, `-apply-all`, `-discard-all`). `streaming` draws `ThinkingDots` + "Drafting…", Apply off, Discard reads Cancel; `applying` turns both off ("Applying…"); `applied` is a success chip; `discarded` is not drawn, and a strip with nothing to draw renders null. Purely presentational: the host performs Apply through its own editor. `proposedEditPreview(content)` (text, or html without markup) and `proposedEditPlacement(edit)` ("Replace selection", "Insert at cursor", …) are exported. First consumers: OrgIQ's assessment document dock and realtime-examples' `/documents` (agent mode on by default).
- **`EditorShell.proposal` (new slot):** drawn between the scrolling surface and the `footer` dock, in the dock's `--dock-inset` gutter, capped at 40% of the surface (scrolls past that), never inside the composer — which collapses when idle — so a pending edit stays in view while the page scrolls above it. Test id `<data-testid>-proposal`. Story: `DocEditor/EditorShell` › Page With Proposed Edits (two proposals, one ready and one streaming); `DocEditor/ProposedEditStrip` (Ready, Streaming, Several).
- Tests: `ProposedEditStrip.test.tsx` (shape, every status, the callbacks, Revise, Apply all / Discard all, test-id pass-through, the shell slot's position).

## 2.407.33

- **`StackedRail` rows are the Org rail's row (`SubNavLayout`, /iq/library), not RailNavList's.** Measured on the reference at 1672×941: a 220px rail of `block px-[14px] py-2 border-l-[3px]` rows, 13px/500, 36px tall, the current row a 3px primary edge over the tint. `STACKED_RAIL_ROW_CLASS` is now that row: a 3px left edge (transparent; `border-l-primary` when current) + 14px side inset, 8px + a 20px line + 8px = 36px (`RAIL_ROW_PAD_Y`, `RAIL_ROW_PITCH`), no radius, no gap between rows; group headings, the caption (`h-9`) and the empty-group line share the pitch and the inset. The 2.407.32 gutter model rides on top unchanged: an 18px cell per level, the caret in the first step. Measured in the `Documents` story beside a 220px `SubNavLayout`: pitch 32 → 36 (rows, headings, caption; row-to-row 36); level-0 leaf text 10 → 17 (SubNavLayout 17); caret 10 → 17; every heading label 28 → 35; leaves by level 17 / 35 / 53. The current row now always wears the 3px primary edge; `currentStyle` defaults to `tint` (edge + `RAIL_CURRENT_FILL`, the reference) and `weight` draws it semibold instead of tinted (was: `weight` default, semibold; `tint` added a 10% fill). `RailNavList` keeps its 32px views list (a deliberate, documented exception with its own consumers); it no longer shares a class with StackedRail.
- **`StackedRailRow.trailing` (new):** a node after `meta` at the row's right edge — a small presence stack, a status — in a `shrink-0 h-5` slot, so it never moves the text column or the 36px pitch (realtime-examples' `/documents` lost per-document presence avatars when it moved to StackedRail; they had fallen back to the folder heading). Story: `Documents` (Runbooks: an age + a 20px avatar stack).
- **`ExplorerLayout` / `WorkspaceRail` `railWidth="xs"` (new) = 220px**, the Org rail's width (SubNavLayout's default), one step under `sm` (240px), so both apps' documents rails can sit at it. Story: `Layout/ExplorerLayout` › Rail width xs, beside a SubNavLayout (both measure 220px).
- Tests: `StackedRail.test.tsx` (SubNavLayout row classes, 36px, current edge, `trailing` after `meta` with the same classes and text column), `StackedRailGeometry.test.tsx` (17px inset), `ExplorerLayout.test.tsx` (`xs`); `tests/storybook/stacked-rail-geometry.spec.ts` now asserts the 36px pitch against SubNavLayout, the trailing slot, and the xs width.

## 2.407.32

- **`StackedRail` geometry (fix, completes 2.407.30): one gutter model for headings and rows.** Every row and heading starts at `RailNavList`'s 10px row inset (the row class is now exactly `RAIL_NAV_ITEM_CLASS` at every depth — the `pl-*` table is gone) and draws a run of 18px gutter cells before its text: one per nesting level, one for a caret; headings always draw one cell (the caret, or an empty cell when they do not collapse), and so does the rail caption. Three faults, reported from realtime-examples' `/documents` against the Org `/iq/library` rail: (1) a collapsible heading's caret sat right of its rows' text — rows under a group with any nested row reserved a caret slot, so level-0 text was at 34 while the caret was at 10; (2) rows added a 14px caret slot plus the 10px flex gap (24px) on top of the 18px/level `pl-*` padding, so no leaf's text was in its level's column and no caret in a leaf's text column — beside a level without the slot a step read as ~34px; (3) a non-collapsible heading ("VIEWS") dropped the caret column, putting its label 22px left of the collapsible labels. Measured in the `Documents` story (x from the rail's left edge), before → after: heading caret 10 → 10; collapsible heading label 32 → 28; VIEWS label 10 → 28; level-0 leaf text 34 → 10 (RailNavList 10); level-1 leaf 52 → 28; level-2 leaf 70 → 46; level-1 caret 28 → 28 (= level-1 leaf text); rows 32px unchanged. The empty-group line sits at the level-0 text column (was 34px).
- Tests: `StackedRailGeometry.test.tsx` (inset, caret column = row-text column, one 18px step per level with the caret in the first step, one heading-label x) and `tests/storybook/stacked-rail-geometry.spec.ts` (`npm run test:e2e:storybook`, ±1px, row height = RailNavList's). The `Documents` story opens three levels.

## 2.407.31

- `OrgGraph.pruneToFocus` (new, default `true` = unchanged): `false` draws every person in `people` and uses `focusIds` only to centre the automatic fit and keep the focus whole. For a host that has already chosen the drawn set itself — OrgIQ's Search people view builds and counts its own neighbourhood; passing `focusIds` so the fit centres on the selection made the library trim 3 of 11 people the counter and the person card still named (journey walk, 2026-09-29). Tests on the radial fixtures.

## 2.407.30

- **`StackedRail` (new, `shared` + root barrel):** the concise stacking left menu for trees — the Org tenant's second-rail family (`ExplorerLayout` + `RailSection` + `RailNavList`) generalised to nested rows: an 11px caps caption (`RAIL_GROUP_LABEL`) with optional count and 28px actions; groups with a plain count, collapse, a `trailing` presence slot and `actions`; rows that are `RailNavList` rows by construction (its row class: 13px/500, 32px, no gap; `STACKED_RAIL_ROW_CLASS` exported), with `children` indented 18px per level behind a disclosure caret, a right `meta` that is a count or an age (`RAIL_ITEM_COUNT`, 12px), an optional small `icon` (default none), `pending`/`disabled`/`disabledReason`, a hover- and focus-revealed `menu` slot, roving-tabindex keyboard navigation (Up/Down, Left/Right, Enter/Space), caller `testId` on groups and rows (falling back to `<listTestId>-group-<id>` / `<listTestId>-row-<id>`), and complete drag pass-through (`draggable`, the six drag events, arbitrary `data-*`) on rows and group headers. First consumers: the documents rails of OrgIQ's assessment workspace and realtime-examples' `/documents`, which drew a wide card panel with icons, ages and avatars beside the Org rail (rail parity goal, 2026-09-29). Story: `Documents` beside a `RailNavList`, and `Catalog`.
- `RailNavList`/`railType`: the stale "34px" row comments now say 32px.

## 2.407.29

- **`RecordGraph` automatic fit on a short canvas (fix, completes 2.407.28).** The readable selection view is now placed directly — the selection centred in the canvas, then the nearest offset inside the 16px margins that clears every overlay rectangle (selected records only; the ladder's whole-graph → neighbourhood → focus placement and the all-nodes overlay shift never landed it), the zoom stepping by 0.01 from the selection's canvas fit down to the readable zoom (0.02 steps missed the 1160 × 333 connections canvas, where 0.74 overflows by a pixel and 0.73 fits), with a pixel of slack inside the margin so a fit is never exactly on it. Journey walks, 2026-09-29: Force opened at 62% (names 8.1px) while 73% with the three selected records whole and clear of the legend and controls existed.
- **`OrgGraph` automatic fit frames again when the simulation ends (fix).** It framed once when the layout had visibly settled (alpha under `SETTLED_ALPHA`) and not again; nodes still drift a little until d3's end, and a selected person framed at the first moment ended 40–60px past the canvas edge in 3 of 26 opens of a two-person focus (member people walk, 2026-09-29). The end framing is a no-op when nothing moved and never runs once the viewer has panned or zoomed.

## 2.407.28

- **`RecordGraph` automatic fit on a short canvas: the readable selection view is searched against the canvas, not the clear area (fix).** 2.407.23's rule compared the selection's fit inside the clear area, which reserves the legend's and the controls' whole bottom band, so on the 1160 × 333 connections canvas (answer strip and call row open) the selection "fitted" only at 0.6 and rung (b) still framed the neighbourhood at 0.62 — names 8.1px — while a 0.74–0.8 view with the three records whole (16px margin, ring and avatar included) and clear of both overlay rectangles existed (journey walks, 2026-09-29). Candidate zooms now run from the selection's canvas fit down to the readable zoom; each is placed by the ladder, shifted clear of the overlays with the selection kept whole, and the first whose selected records are inside the margin and under no overlay is taken; otherwise the ladder is unchanged. Test on that canvas in `recordGraphLayout.test.ts`; the 418/369/209px whole-selection contract in `RecordGraph.test.tsx` still holds.

## 2.407.27

- `useDocumentComments` transport seam (new): `baseUrl`, `commentsPath` and `fetcher` options so a host can route document comments through its own BFF (OrgIQ calls platform-api with the BFF-held document grant, never a platform token in the browser), plus `addDocumentComment` and document-wide (`scope: 'document'`) as well as anchored comments in one hook. `useDocumentReviews` still needs the same seam. First consumer: the OrgIQ assessment workspace Comments tab.
- Note: **2.407.25 and 2.407.26 are version-only bumps with no source change** — their release commits were cut before this seam had merged (a release chain ran on past a rebase conflict and a failed fast-forward); treat both as identical to 2.407.24.

## 2.407.24

- **Every button renders semibold — a visual change for every consumer (fix).** `Button` was meant to be semibold (600) but rendered at the inherited 400 in every variant and size: tailwind-merge files an unlabelled `font-[inherit]` under font-*weight*, while Tailwind v4 compiles it to `font-family: inherit`, so `cn()` dropped `font-semibold` in favour of it. `cn` (`src/lib/cn.ts`) now files `font-[inherit]` as a font-family class, so a weight next to it survives everywhere in the library — any `cn('font-medium …', 'font-[inherit]')` call site now renders its weight too. New `BUTTON_WEIGHT` (`'font-semibold'`) is the one button weight: `Button` (all variants, `link` included), `DropdownMenu` triggers (all trigger variants; `secondary` was `font-medium`), `RichChatComposer`'s Send, split-send caret, Commands trigger and Context button, `ContextComposer`'s Workflow trigger, and `DeviceToggleSelect` use it. `font-medium`/`font-normal` overrides on library `Button`s were removed (`CallDock` People/Documents/Leave controls, `CallSettingsDrawer`, `StartCallDrawer`, `IncomingCallPopover`, `CallPeopleList`, `VolumeSlider`, `AudioVideoSettingsForm`, `FollowBanner`, `WorkspaceDocumentHeader`, `DocumentTypesPage`, and the `work/*` link buttons). Tabs are unchanged. Hosts that pass their own `font-*` class to `Button` still win. `ButtonWeight.test.tsx` (every tone × variant × size) and a `UI/Button › WeightGrid` story.

## 2.407.23

- **`RecordGraph` automatic fit: a readable selection beats an unreadable neighbourhood (fix).** Rung (b) framed the selection's neighbourhood whenever it fitted at or above 0.6, even between 0.6 and the readable zoom (0.68) — on the 1160 × 335 connections canvas (answer strip and a call row open) that drew names at 8.1px while the three selected records fitted whole at 0.8 (search journey walk, 2026-09-29). Rung (c)'s zoom is now computed first, and when the neighbourhood would frame below the readable zoom but the selection frames readably, the selection-centred fit is taken. A neighbourhood that frames readably is taken as before. Tests in `recordGraphLayout.test.ts`.

## 2.407.22

- `integrations/realtime`: `createConversationCallDock({ conversationCallDockProps, useAudioVideoSettings })` and `IncomingCallToast` (new) — the conversation-call pair every page with a composer needs (an initiative, a search selection, a document): the dock takes realtime-modules' `conversationCallDockProps` mapping and adds video tiles, active-speaker detection, a notice line and its own device-settings dialog, rendering nothing while idle or ringing; the toast is the ring with Accept / Decline. Mirror-typed with a compile-time check against realtime-modules' real types, no runtime import of the package (`scopeAgnosticPackaging`); `integrations/realtime-modules` exports the canonically bound `ConversationCallDock`. Storybook story + 9 tests. First consumer: OrgIQ's initiative and Search pages (`portal/src/lib/conversationCall.tsx`).

## 2.407.21

- `CanvasDocumentView.renderFrame` (new): `(frame: { toolbar, ruler, surface }) => ReactNode` hands the toolbar (with its find row) and the ruler to the host — an `EditorShell` `toolbar` slot — instead of drawing them inside the scroller; `toolbar` is null when read-only; default layout unchanged. A ruler placed outside the scroller can sit a scrollbar-width off the sheet.
- `integrations/realtime`: `createCanvasDocumentPane({ useGateway, useYjsDoc, useCanvasDocument })` (new) — the one canvas document assembly both apps used to compose by hand: shared extension list (`buildCanvasDocumentExtensions`, wrapping `Image` with the authenticated node view), recovery and its notices (`useCanvasRecovery`, encode/decode helpers), save-state line (`canvasDocumentSaveState`), wire-error alert, beforeunload guard, awareness identity, image provider and insert-image modal, loading / "migration incomplete" states, `canEditCanvasGrant`; no runtime import of realtime-modules (pinned by `scopeAgnosticPackaging`). `integrations/realtime-modules` exports a bound `CanvasDocumentPane` for the canonical scope. First consumer: the OrgIQ assessment workspace (`docs/assessment-documents-parity-goal.md` backlog 1–2).

## 2.407.20

**`integrations/realtime` (new entry): the realtime integrations without a hard-coded install scope (fix for re-scoped consumers).** `integrations/realtime-modules` imports `@connorhoehn/realtime-modules/client`, `/client/video`, `/client/hangout-rooms` and `/call` by name at module top level, so an app that installs the library as `@connorhoehnslalom/realtime-modules` (aws-agentcore) could not resolve the entry, and any page importing even a pure adapter (`adaptPresenceRoster`, `WrappedChatPanel`) crashed.

- **`@connorhoehnslalom/ui-components/integrations/realtime`** never imports realtime-modules at runtime (types only, erased at build). It exports every pure adapter, mirror type and props-driven wrapper of the old entry unchanged, plus the hook-bound integrations as factories over an injected `RealtimeClientModules` bag — `{ useCapabilities, useRoomOccupancy, useLVSHangout, useLVSSubscriber, useLVSLiveHls, useLVSViewerCount, lobbyForChannel }`:
  - `createRealtimeIntegrations(modules)` returns `{ HangoutRoomRow, HangoutRoomsSection, WrappedHangoutRoomsList, RealtimeCapabilityProvider, conversationFeaturesFor, WrappedStreamStage, WrappedLVSHangoutLayout }` with the same props and test ids as today's exports. Call it once at module scope.
  - `<RealtimeIntegrationsProvider modules={…}>` + `useRealtimeIntegrations()` inject once per tree (bound once per `modules` object).
  - Per-component factories (`createWrappedStreamStage`, `createHangoutRoomRow`, …) for an app that wants one.
  - Recipe: `createRealtimeIntegrations({ ...client, ...video, ...hangoutRooms, ...call })` with the four namespaces imported from your install — see the README.
- **`integrations/realtime-modules` is unchanged for canonical installs** (realtime-examples): same exports, now implemented as those factories applied to the canonical imports; it also re-exports the injection API. `CapabilityGate` / `useRealtimeCapabilities` read one shared context, so a provider from either entry feeds a gate from either.
- Guarded by a packaging test that walks every chunk reachable from `dist/integrations/realtime.{js,cjs}` and fails on any `@connorhoehn/realtime-modules` import.

## 2.407.19

- `ScopeHeader variant="inline"`: the collapsed "Filters ▾" toggle carries the 1px `border-border` and `px-2.5` of a `DropdownMenu` default trigger, so it matches the bordered 28px triggers it stands in for (journey walk, 2026-09-29: "no border, while the inline buttons it replaces have a 1px border").

## 2.407.18

Type audit, second pass — the composer strip, the 36px header actions and the tab rows. **Visual change for every consumer.**

- **The docked composer strip is on one type step, 12px** (`text-xs`, the `Button sm` label and the compact Send's step). The mode label, the format glyphs (B / I / …) and the muted "/ commands" drew 15px in the expanded card beside the 66×24 Send's 12px, on every `ContextComposer` surface. 12px is the step the idle row already uses (mode pill and Send) — the small social row the user prefers — so the expanded card now matches it instead of the other way round; 15px is not on the type scale (railType 11/12/13, Tailwind 12/14/16…). The boxes are unchanged (36px format buttons), and the typed text and inline command chips stay 15px/24px: they are the message, not controls.
- **`DropdownMenu` default trigger is the `Button sm` box** (`h-6.5`, 26px, `px-2`): a menu in a toolbar row is as tall as the buttons beside it. It grew from padding + content (22px with a 14px label, 26px with an 18px glyph). The composer's mode menu no longer overrides the padding. A trigger that wants its own box still passes `h-*` in `triggerClassName` (Filmstrip's thumbnail menu passes `h-auto`).
- **The 36px header actions are 14px**, the `Button md` step at the same 36px height: `DropdownMenu` `primary` / `secondary` triggers, `FilePickerButton`, `AttachToggle md`, `SearchInput md` and `DocumentToolbar`'s roomy buttons (all 15px, off the scale).
- **`ConversationSurface` tabs are `Tabs md` (14px)** — the one tab-row step, shared with the section band's `NavTabs` and `EditorShell` (2.407.13). They were `sm` (12px) beside the header's now 20px name. `ChannelHeader`'s doc names `size="md"`.

## 2.407.17

- **`ScopeHeader variant="inline"`: the crumbs are exactly whole beside a long title (fix).** 2.407.15 made the title give up width first with `shrink-[100]`, but a flex shrink phase hands every item its proportional share — "Search" lost 0.23px and rendered as "Sear…" at device-pixel-ratio 2. The title is now `flex-1 min-w-[12rem]` (basis 0, grow 1): it takes what the trail has left after the crumbs and truncates inside it, and the crumbs enter no shrink phase until the title is at its 12rem floor. Measured at DPR 2 across 1672/1536/1280 for a short and a 170-character title: every crumb's box equals its text width.

## 2.407.16

- `Panel.docked` and `VersionHistoryPanel.docked` (new): render inline where the panel is placed, filling its parent, instead of fixed to the right edge of the window — for a panel that IS a view (an `EditorShell` Versions tab) rather than one that slides over the page; `width` is ignored when docked. Default unchanged. First consumer: the OrgIQ assessment workspace's Versions tab, whose panel opened over the whole window.

## 2.407.15

- **`ScopeHeader variant="inline"`: a long title truncates, the crumbs stay whole, and the title's length never collapses the controls (fix).** Three defects from the search-workspace journey walks (2026-09-29): (1) 2.407.10's `max-w-[50%]` capped the title at half the *trail*, which is `flex-auto` and carries the row's slack — "Who can help finish Auth Mig…" was cut at 261 of 302px with 168px empty beside it. (2) The trail's basis was its content, so a paragraph-length title widened it and squeezed the controls out of the row with room to spare (a fresh load at 1536 collapsed them with ~230px free). (3) The collapsed "Filters ▾" toggle was an 18px 14px/400 borderless text button beside 28px 13px/500 menu triggers. Now the trail is `flex-1` (basis 0: it takes the free space and its content cannot reach the tabs or controls), the title gives up width FIRST (`shrink-[100]` against the crumbs' `shrink`) down to its `min-w-[12rem]` floor — the reverse of 2.406.4's order, so "Org › Search › Auth Migration ›" stays whole ahead of a long title and the crumbs fold to "…" only once the title is at its floor — and the toggle is `h-7 px-2` on `RAIL_ITEM_TEXT` (13px/500). Measured against the portal at 1672/1536/1280: title whole at 302px, crumbs 80px whole at every width, controls inline at 1672 for a 170-character prompt.
- `ScopeHeader.titleHint` (inline variant): the h1's `title` attribute, default `title`. A host that shows a cut-down title (a prompt's first sentence) passes the whole text so hovering reads all of it.

## 2.407.14

Type & control audit (realtime-examples `scripts/dev/type-audit.mjs`: every nav route at 1280×720 and 1640×960, light and dark). **Visual change for every consumer.**

- **`Button` is one box per size.** `sm` 26px, `md` 36px, `lg` 40px tall (`h-6.5` / `h-9` / `h-10`), `inline-flex` with the label and any icon centred and a size gap (`gap-1.5` / `gap-2`). The height used to grow from padding + content, so one size drew three boxes: a bordered `sm` was 26px beside a borderless `primary` `sm` at 24px, and an icon in the label pushed a button to 30px next to 26px neighbours in the same header (Call / Transcribe vs Sign Out; Save vs New slide; Download .pptx vs Present). Padding is horizontal only now.
- `Button` carries `data-variant` and `data-size` (no `data-size` on `variant="link"`), so an audit or a host can group buttons without parsing classes.
- `ChannelHeader`: the conversation name is on the page-title step, `text-xl` (20px) — it was 15px, smaller than the app's 16px brand and off the type scale. `small` stays 13px.
- `SectionLabel case="upper"` is 11px (was 10px): the same caps step as `RAIL_GROUP_LABEL` and every other caps label, so a screen has one caps-label size.
- `EmptyState`: the default title is `text-lg` (18px, was 17px), the `lg` details title `text-xl` (20px, was 19px), and the default description and details body `text-sm` (14px, were 15px) — all on the scale.
- `PipelinesListView`: the page title is `PageHeader` `md` (20px) like every other page; it was the only 28px `lg` title.
- `AttachToggle` `md`: `px-3.5`, the padding of the header actions it sits beside (`FilePickerButton`, `DropdownMenu` secondary) — it was 12px against their 14px at the same 36px height.
- `DocumentResultList` summary: `text-sm` (14px, was 14.5px). `DocumentRuler` labels: 10px (was 9px, under the micro step).

## 2.407.13

- **One type scale on the Documents surface (visual change).** The Documents explorer drew 15px beside the Workspace `NavRail`'s 13px railType scale. New rail forms, all composing `railType`: `TreeView size="rail"` (md's row — tint, 18px indent, ⋯ over the meta — with `RAIL_ITEM_TEXT` 13px/500 titles on the 36px pitch and `RAIL_ITEM_COUNT` 12px meta) and `ConversationShelf size="rail"` (13px/500 labels on 36px rows). `WorkspaceRail heading="label"` ("DOCUMENTS 180") is now the rail group label — `RAIL_GROUP_LABEL` 11px semibold caps in secondary ink with a plain `RAIL_GROUP_COUNT` — instead of a 15px heading with a count chip (its only consumer is the realtime-examples Documents explorer).
- `Breadcrumbs size="sm"`: the 13px meta step on every crumb, separator and ellipsis (`md`, default, is 14px). A class on the nav never reached the crumbs inside it.
- `EditorShell` head on the library's steps: the tabs are `Tabs size="md"` (14px/500 — the section band's `NavTabs` size) instead of a 15px override; the folder path and crumbs are `Breadcrumbs size="sm"` (13px, the "Saved …" line's step) — they measured 14px while the shell asked for 13px/12px. The title is unchanged (20px bold, the mockup's).
- `WorkspaceDocumentHeader lifecycleUnavailableReason`: for a document with no review status the caller can read. No pill, no banner; the review actions show as one disabled "Submit for review" whose tooltip is the reason. Ignored while the server offers actions.
- Story *Layout/ExplorerLayout — Documents surface — one type scale* (light and dark); tests in `railType.test.tsx`, `EditorShell.test.tsx`, `DocumentHeaderActions.test.tsx`.

## 2.407.12

- `ContextComposer` / `RichChatComposer` idle row: the mode pill, the "Write a message…" placeholder, the context chip and Send sit on one centred line again. The collapsed row (`data-collapsed="true"`) shared the narrow single row's `items-end`, with the pill and chip pulled down by `mb-1.5 self-end` — offsets tuned in 2.384.4 for the 2rem single-row input. In a docked card (every `ContextComposer`, since 2.407.0) `.uic-composer-docked-input` wins that cascade (a 2.5rem box with 0.5rem padding), so the placeholder's line sat 20px above the row's foot, Send 18px and the pill 16px: measured in the ContextComposer stories, conversation idle (42px row, centre 234) placeholder 234 / Send 236 / pill 238; document idle (before 2.407.8) placeholder 218 / Send 214 / pill 222 / chip 220.8, and after 2.407.9 placeholder 218 / Send 220 / pill 222 / chip 220.8. 2.407.8 and 2.407.9 moved Send's size, which reshuffled the offsets, but the text was off since 2.407.0. The idle row is now `flex items-center` (the narrow row that grows with a draft keeps `items-end`) and the pill and chip carry no vertical offsets, so each item is centred on the row whatever its height: every centre is 234 (conversation) and 218 (document), light and dark, at 42px. The placeholder was never restyled: it is the empty paragraph's `::before` inside the editor's own text box, 15px / 24px like the typed text. The input box carries `data-testid="<testid>-input-box"`; the row body carries `data-idle-row`.
- New alignment tests. `ContextComposerIdleRow.test.tsx` pins the DOM shape: the idle row is `flex items-center`, the pill, chip, text box and Send's toolbar are its direct items with no `self-*` / vertical-margin classes, the placeholder paragraph sits inside the editor's text box with no text-size or leading class, and no `is-empty::before` rule in `styles.css` sets a font size or line height. `tests/storybook/composer-idle-row.spec.ts`, run by the new `npm run test:e2e:storybook` (`playwright.storybook.config.ts`, starts Storybook on :6006 or reuses it; `STORYBOOK_PORT` overrides), measures the Conversation and Document stories in light and dark: pill, placeholder, chip and Send centres within 1px of each other and of the row's, the row 42px, the placeholder's computed font size / line height / family equal to the typed text's, and after focusing and typing one character the text line moves 0px (in the page and inside its text box). Across all 29 idle rows in the composer, chat and editor stories every centre is within 1px of its row's.

## 2.407.11

- `ContextComposer`: four host slots, passed straight to `RichChatComposer` — `submitLead` (a select beside Send, e.g. "Draft only ⌄"), `modeRowEnd` (a scope switch at the card's mode-row end), `referencesAction` (an "add another" control after the chips) and `referenceDrop` (the card as a drop target for a host payload). The first three render only on the expanded card, so the idle row stays the one 42 px line; `referenceDrop` works on the idle row too. They let the realtime-examples All documents, presentation and pipelines composers move onto `ContextComposer` without a `RichChatComposer` of their own.

## 2.407.10

- `ScopeHeader variant="inline"`: one type scale across the row. The crumbs (links, buttons, plain labels) and the folded "…" drew 14px/400 in tertiary ink beside 14px/500 tabs, while the app's rails use 13px/500; they now use `RAIL_ITEM_TEXT` (13px, 500, 20px line) in `text-text-secondary` (hover → `text-text-primary`), and the "›" separators are 13px `text-text-tertiary`. The title (18px/600 at `titleSize="md"`, 20px/700 at `lg`) and the tabs are unchanged. The button crumb inherits only the font family now (`[font-family:inherit]`; `font-[inherit]` was merged away with the weight).
- `ScopeHeader variant="inline"`: a paragraph-length title never draws over the crumbs. With a whole prompt as the title (~1350px), the crumb list shrank to nothing while its first crumb (`shrink-0`) overflowed it and painted under the start of the title. The crumb list is now `min-w-0 overflow-hidden` (each crumb still `truncate`; a folded trail still removes its hidden crumbs from the DOM), and the title is `min-w-0 max-w-[50%] truncate` — at most half the row, full text in its `title` attribute — instead of `min-w-[12rem]`, so the crumbs and the right cluster keep their space. The controls' collapse arithmetic still counts the title at 12rem, so the collapse thresholds are unchanged. New story *Inline: paragraph-length title never covers the crumbs*.

## 2.407.9

- `RichChatComposer` / `ContextComposer`: the shared Send goes the small way. 2.407.8 made the split Send and the plain Send one size by taking the docked card's large button (`h-9 px-4 text-[15px]`, 93×36, idle rows 50 px); the size people prefer is the social row's small, collapsed one. Both now use the compact size on every context — docked: `inline-flex items-center gap-1 px-2.5 py-1 text-xs` with a 12 px arrow (the basic box's paper plane 12 px); the caret half `px-1.5 py-1 text-xs`. Measured in *Send — one size on every context*: the conversation's and the document's idle rows are both 42 px, and every Send (idle and expanded, both contexts) is 66×24. The chat-column and menu-row Sends are unchanged; the round prompt-card Send is unchanged. The 2.407.8 footer floor (`--dock-floor`) is unchanged: the 1280×720 story still gives the row 299 px with the expanded card fully inside.

## 2.407.8

- `RichChatComposer` / `ContextComposer`: Send is one size on every context. With `sendOptions` + `onSendOption` (a conversation context always passes them) the split Send stayed `px-2.5 py-1 text-xs` (50×24) whatever `docked` said, while the plain docked Send is `h-9 px-4 text-[15px]` with an arrow (93×36) — so a conversation's idle row measured 42 px and a document's 50 px, and the expanded cards' Sends differed. The split's primary half now takes the same size and content as the plain Send (docked: `h-9 px-4 text-[15px]` + arrow; menu row: `px-3 py-1.5 text-sm` + →; otherwise unchanged), and the caret is as tall (`h-9` docked). Measured in the new story *Send — one size on every context*: both idle rows 50 px, every Send 93×36.
- `FloatingComposerDock` (pinned) / `EditorShell` / `PresentationEditor`: the composer is never cut off by a call dock above it in the footer. The footer row capped at `var(--dock-max-height, 50%)` (272 px of a 543 px surface at 1280×720); a host's footer `<>{callDock}{composer}</>` kept the call dock's full height and squeezed the dock (`shrink`, `max-h-full`) around a `shrink-0` card, so the card's toolbar row overflowed into the shell's `overflow-hidden`. A pinned dock now writes `--dock-floor` on its row — the height of what in the row cannot scroll (its siblings, the strip, the composer card, the gutter; not `above`) — and the row caps at `max(var(--dock-max-height, 50%), var(--dock-floor, 0px))`: the editor above shrinks instead. `above` still scrolls within the cap. (The floor is written on the dock's parent, so the dock must be a direct child of the footer row, as `ContextComposer` and `FloatingComposerDock` are.) New story *Page — expanded under a call dock (1280×720)*: before, row 272 px and the card's bottom 12 px below the surface; after, row 299 px, card fully inside.

## 2.407.7

- `CallDock`: a clock tick no longer re-renders the tiles. The host re-renders the dock once a second for `elapsedMs`; before, every tick re-rendered every dock tile (`DockTile` was not memoised and got fresh participant objects and click closures each render — 1 196 tile renders in 300 s on a 4-person group DM). Now the meta line ("4 people · 09:41") is its own memoised `CallDockMeta`, the tile row sits behind a memoised `CallDockTiles` (participants, local id, active speaker, followed person, reconnecting, size, title), and each `DockTile` is `React.memo` with a per-tile comparison: its own `speaking` / `highlighted` flags, size, click handler and a shallow compare of its participant row — so a host that rebuilds equal participant rows every render still renders no tile, a new active speaker re-renders only the two tiles whose ring changes, and a changed person re-renders only their tile. `onTileClick` is held in a ref (an inline handler neither breaks the memo nor goes stale). `CallTileRow variant="dock"` passes `onParticipantClick` straight to the tile instead of a per-render closure. A host's `videoElement` / `audioElement` must keep their identity across renders for the tile memo to hold (a memoised element does). Test-only `setCallDockRenderProbe` in `callDockRenderProbe.ts` (not in the barrel) counts meta and tile renders. New story `FourPeopleTalking` (four simulated Web Audio voices, the clock ticking, a hold toggle).
- `useActiveSpeaker`: a hold, so four people talking at once no longer move the speaking ring on every 200 ms poll. New options `holdMs` (default 600) and `marginDb` (default 3): the active speaker changes only when a different participant has been the loudest on every poll for ≥ `holdMs` and, on each of those polls, louder than the current speaker by more than `marginDb` (a current speaker under `threshold` counts as silent). Silence is held the same way (the ring clears after `holdMs` of nobody above `threshold`); the first speaker after silence takes the ring at once. `holdMs: 0` is the previous behaviour (the loudest voice on every poll).

## 2.407.6

- `ScopeHeader variant="inline"`: a re-expand no longer undoes itself. On 2.407.5 the collapsed row did re-derive its wanted width and go inline when the row widened, but the first inline layout was judged in the same frame: a 1.25px "overflow" on a 1208px row that the parts fit with ~45px to spare collapsed it again and recorded the collapse at the current width, so it never retried there, and every further widening (1800, 2000) repeated the flip. Now: (1) hysteresis both ways — the controls leave the row only when the row's wanted width (or a box's own overflow, or the trail's shortfall below its minimum) is more than 2px over, the same 2px the way back needs; a sub-2px deficit is layout noise, never a collapse. (2) The frame in which the controls were just put back is not judged: the check waits for the next animation frame (or the next row resize). The row's `ResizeObserver` is created once for the row's life instead of on every state change, which delivered an initial observation in that same frame. (3) A collapse is recorded only when it happens (so never under the margin), and the recorded width is cleared once an inline layout measures as fitting on a settled frame. (4) One sum: the collapse check and the re-expand both read `inlineRowWanted`, and `inlineRowDeficit(row, trail)` is now `inlineRowWanted(row, trail, <controls' natural width>) − row.clientWidth`. Before, the collapse took the largest of five estimates and remembered `width + need` as the wanted width, and two of them counted differently: `inlineRowDeficit` measured the trail by its box, which is `flex-auto` and carries the row's slack (so a fitting row "wanted" its own width), and the crumbs' sub-pixel shortfall (an integer `scrollWidth` against a fractional rect, up to ~0.5px per crumb) was counted as its own collapse trigger at 0.5px. That is how the portal recorded 1209.25 (1208 + 1.25) where the parts sum to 1151–1163. A crumb cut by a sub-pixel alone no longer collapses the controls (2.407.4 did); a real squeeze shows up in the row's wanted width. Fresh loads are unchanged.

## 2.407.5

- `ScopeHeader variant="inline"`: the controls come back when the row widens again. The rule now holds in both directions, on load and on every row resize: inline whenever the row's wanted width fits with 2px to spare, collapsed otherwise. Before, the expand threshold was fixed once, at the moment of collapse, as the width plus `max(overflow, deficit, …)` **plus** the trail's shortfall below its minimum — a shortfall the row deficit already counts — and it was never re-derived, because while collapsed the controls are not in the row to measure. A collapse at a width that squeezed the trail (1672 → 1000 in the tests) asked for ~1350px of row, so "Filters ▾" stayed until a reload. Now the controls' natural width is remembered from the last inline measurement (and the row's wanted width from the last over-full one), and on every resize the collapsed row re-derives its wanted width with the controls put back — new `inlineRowWanted(row, trail, controlsWidth)`, exported from `ScopeHeader.tsx` for tests: the trail's content (every crumb whole, the title at its 12rem floor — not the trail's `flex-auto` slack), the tabs, the other right-hand items (the ⋯ once, "Filters ▾" never), gaps and padding. When no inline measurement exists (the first render already under `controlsCollapseAt`), an `invisible`, `inert`, `aria-hidden`, zero-size clipped copy of the controls (`data-scope-controls-ghost`) is drawn for one layout pass to measure them, then removed. A trail folded to "…" records its unfolded width on `data-full-width` so the hidden crumbs still count. Never oscillates: no expand at or under the width that last collapsed. `controlsCollapseAt` is now a floor on top of the measurement (above it the controls must also fit), not a replacement for it. The collapsed toggle carries `data-scope-controls-toggle`; the right cluster is `relative`. Found on the portal's scoped search: after 1600 or below, widening back to 1672 left the header collapsed at 1440, 1536, 1600 and 1672. Measured on that fixture (crumbs 219 + "›" 14 + title 192, tabs 280, chips 321, ⋯ 32, gaps 44, padding 48 = 1150px wanted), a fresh load at 1600 (row 1136) and 1536 is correctly collapsed — the ~250px free there is the collapsed row's slack, not inline room — and from a 1616px viewport it is inline.

## 2.407.4

- `ScopeHeader variant="inline"`: the controls collapse instead of wrapping. The controls cluster is `flex-nowrap whitespace-nowrap` and its items (and a wrapper's items, e.g. the host's `Inline` of chips) are `shrink-0` with `whitespace-nowrap` on every descendant — a chip, a menu trigger or a link keeps one line at its natural width — so an over-full cluster overflows its `min-w-0 overflow-hidden` box and the collapse fires (was `[&>*]:min-w-0 [&>*]:shrink`: the chips shrank by wrapping to two lines, nothing overflowed, and the row stayed `data-controls="inline"` down to ~1440). The collapse check also fires when the right cluster's `scrollWidth > clientWidth`, when any crumb is cut below its natural width inside its cap (measured with `getBoundingClientRect`, so a sub-pixel shortfall counts), or when the row's content at its wanted width — the trail with every crumb whole and the title ≥ 12rem, the tabs, the right cluster's items at natural width, gaps and padding — exceeds the row (new `inlineRowDeficit(row, trail)`, exported from `ScopeHeader.tsx` for tests, not from the barrel); the expand threshold keeps 2px of slack. Found on the portal's scoped search: at 1536 and 1600 the chips wrapped 2px above the 48px band and the crumbs read "Org › Sear… › Design System A…".
- `ScopeHeader variant="inline"` collapsed: the right cluster is `shrink-0` (was `min-w-0 shrink-[100]`, which pushed the ⋯ 21px past the row's right padding at 1280) and the ⋯ trigger `shrink-0`. The "Filters ▾" popover is a vertical `Stack` (`<testid>-controls-stack`) of full-width rows, `min-w-[16rem]`, nothing in it wrapping; a single host wrapper `<div>` with several children is flattened (`display: contents`) so each control is its own row (was one squeezed horizontal line: the scope chip a four-line blob, "+ Filter" and "Relevance ▾" on two lines). The last crumb's cap is 15rem (was 14rem).
- `recordGraphViewport` `auto`: the whole-graph fit wins within the new `RECORD_GRAPH_READABLE_TOLERANCE` (0.02) of `readableZoom` — Hierarchy with 3 selected on the full 1160×583 canvas fits whole at 0.694 and now opens there instead of the selection-centred 0.8 frame (the rung-(b) "neighbourhood is a fit-all" check uses the same threshold). New option `overlays` (`{ legend, controls }` boxes, as given to `recordGraphInset`; `RecordGraph` passes them): on a canvas whose clear height is ≥ `RECORD_GRAPH_SHORT_FIT_CLEAR_HEIGHT` (300px), every selection-centred view is shifted — nearest pans first, up to the overlay's size plus one node, along an axis where the drawing runs past the clear area — so no record sits under the legend or the controls while the selected boxes stay whole inside the canvas (the org graph's `clearOfOverlays`). A record pushed past the canvas edge is allowed; short canvases keep the 2.403.8 rule. `recordGraphOverlayRects(size, overlays)` is exported from `recordGraphLayout` (not yet from the graph barrel). Found on the org-leader walk: "Segmentation blueprint" opened under the Fit / Full-screen buttons.

## 2.407.3

- `ScopeHeader variant="inline"`: a squeeze order, so the controls give way before the title. (a) The right cluster is `min-w-0 shrink-[100]` and the trail `flex-auto` (was `flex-1`, basis 0 — the trail took whatever the shrink-0 tabs and controls left, 0px crumbs and a 77px title at 1280); the controls box is `min-w-0 overflow-hidden` with its items `min-w-0 shrink`. When the controls' content no longer fits that box, or the trail is under its minimum (first crumb whole + "…" + a 48px last crumb + the title's 12rem), or the row is under the new `controlsCollapseAt` (px), the controls leave the row: with the new `controlsMenu` (the controls as `DropdownMenuSection[]`, same `onSelect`s) they join the ⋯ menu as a "Filters" section (the first section's label defaults to `controlsLabel`, default "Filters"); without it the `controls` node itself moves into an `InlinePopover` behind one "Filters ▾" button (`<testid>-controls-toggle`, panel `<testid>-controls-popover`). They come back once the row regains the width they needed (measured at collapse; a ResizeObserver on the row). (b) The crumbs then truncate and fold to "…" as in 2.407.1. (c) The title is `min-w-[12rem]` (was `min-w-0`) and the first crumb's `<li>` `shrink-0`. The tabs stay `shrink-0`. The row carries `data-controls="inline" | "collapsed"`. `inlineTrailMinimum(trail)` is exported from `ScopeHeader.tsx` for tests (not from the barrel). Found on the portal's scoped search: at 1536 the crumbs read "O… › … › Design Syste…" and the title "component contrac…"; at 1280 the crumbs were 0px and the title "compo…".
- `recordGraphViewport` `auto` with a focus: rung (b) (the selection + neighbours at ≥ 0.6) is skipped when that frame would hold the whole graph below `readableZoom` (0.7) — with a selection, a fit-all is taken only at ≥ 0.7, in every layout, and the selection-centred rung (c) frames instead. Radial's compact short-canvas rings (2.407.1) made the neighbourhood of 3 selected people span all 25 records on 1160×374, so Radial opened at 0.65 (names 8.4px) where Force opened selection-centred; it now opens at 0.8. The below-0.7 whole-graph zooms (0.25, and 0.1 on a short canvas) remain for no selection and for Fit to view.
- `RichChatComposer` `/` menu: Enter on a typed-out command that takes an `argument` (`/agent`) accepts it — inserting `/agent ` and opening the argument list — instead of sending the bare trigger (which earned "Choose an available agent after /agent.", dropped focus and left a stray "/agent"). Tab and click were already right. A typed-out command with no argument still sends on Enter. `CommandSuggestionItem.takesArgument` marks such rows. Escape still closes the list, and Enter with no list open sends.

## 2.407.2

- `ContextComposer`: a composer with exactly one offered mode (the preset's, or the `modes` prop's) names the mode as a static label instead of a one-item `Mode ⌄` menu — a call chat or a document's chat (`modes={['chat']}`) reads "Chat", and a search (Agent only) reads "Agent". Idle and expanded it is a `<span data-testid="<composerTestId>-mode-pill" data-single-mode="true">` with the mode's glyph and name (expanded: the menu trigger's typography, name in `<composerTestId>-mode-label`); no chevron, no menu, no `⌥1` badge, and nothing to switch to. With the docked card, page actions (`onMakeDeck`, `moreActions`) move to the strip's `⋯`. Two or more modes are unchanged. Backed by a new `RichChatComposer` prop `singleModeLabel` (default false, so `AgentComposerDock` and other `RichChatComposer` hosts keep the one-item menu).
- `ContextComposer`: `privacy?: 'visible' | 'hidden'`, `onPrivacyChange?`, `privacyLabels?` — passed straight to `RichChatComposer`, so the eye toggle renders on the strip where it always has (only when `onPrivacyChange` is passed) and the sent message carries `privacy`. For private vs shared questions (the transcript's Ask column).
- `ContextComposer`: `onSearchDocuments` (the `#` picker) was already a pass-through in every context; now covered by a test per context kind, including a transcript-style chat-only conversation.

## 2.407.1

- `ScopeHeader variant="inline"`: the row never wraps or grows. The crumbs are drawn by the inline trail itself (no longer `Breadcrumbs`, whose `<li>` let a label wrap): each crumb is `truncate whitespace-nowrap` with a cap (`max-w-[10rem]`, the last crumb `max-w-[14rem]`) and its full label as `title`; the crumb list is `shrink-[100]` against the title's `shrink`, so the crumbs give up width before the title; and when a crumb is squeezed below its cap anyway the middle collapses to "…" (first and last kept, the hidden labels in its `title`, `data-collapsed="true"` on the nav) before the title loses more. The right cluster (tabs, controls) stays `shrink-0`. Found on the portal's scoped search: "Org › Search › Design System API" with three tabs, four chips and a link wrapped the last crumb onto three lines (58px inside the 48px row) and cut the title to "component c…". Each crumb carries `data-testid="<testid>-crumb"`; the "…" is `<testid>-crumbs-more`.
- `FilterChip` forwards `aria-label` and `title` to its `<button>`. The portal passed `aria-label="In: Design System API. Search entire workspace"` and the button's accessible name was just its visible label — the props were not declared, so they were dropped by the destructure.
- `layoutRecordGraph` Radial: a set too big to fit at the readable zoom gets rings shaped to the canvas (`RecordRadialRings.shaped`), not the natural 128px step. From 0.7 down, the outer ring's bounds are the canvas's clear area at that zoom (less the padding and the legend and controls as `recordGraphInset` reserves them, for the legend of the types present), with the fewest rings whose perimeters hold everyone, packed without overlaps; the largest zoom that places everyone wins (binary-searched). On the 1098×270 answer card, 64 records with no selection opened at the 0.25 floor with 10 outside and 4 under the legend and controls; they now fit whole above 0.25. Sets that fit at 0.7 are unchanged. `recordRadialRings` now returns the plan the layout actually uses and takes an optional `legendLabels`.
- `recordGraphViewport`: on a short canvas (clear height under `RECORD_GRAPH_SHORT_FIT_CLEAR_HEIGHT`, 300px) with nothing selected, the whole-graph fit (`mode: 'all'` at a floor ≤ 0.25, and `auto` with no focus) may go below 0.25 as far as `RECORD_GRAPH_FIT_ALL_SHORT_MIN_ZOOM` (0.1), so every record is visible. With a selection the 0.25 floor and centre-on-the-selection are unchanged. The two constants are exported from `recordGraphLayout` (not yet from the graph barrel).

## 2.407.0

- New composite **`ContextComposer`** (`…/social/rich-composer` static; lazy on the root barrel like `AgentComposerDock`): one composer for every place people write, generalised from `AgentComposerDock` + `RichChatComposer`. Idle it is one line — mode pill, context chip, placeholder, Send; the caret, words, a staged file, a command, a status or a forced `expanded` bring the full `Agent ⌄` card with the editor strip (B, I, code, link, list, quote, emoji, attach │ Workflow ⌄, `/ commands`); empty and blurred it folds back. Host rows it cannot see — `reply` (a `QuoteBlock`), `above`, `offline`, `modelUnavailable`, `strip` / `task` (a `TaskStrip`) — force the card. `dock` renders the call shelf flush above the composer (testid `<data-testid>-dock-slot`; does not force the card). `replacement` renders instead of the composer (a comment reply field) and keeps the rows. Agent and Terminal paint the console surface once expanded, the idle row stays plain; `console={false}` keeps the ordinary surface. `working` drifts the console faster.
- The context model: `context: ComposerContext` = `{ kind: 'conversation' | 'document' | 'work-item' | 'diagram' | 'initiative' | 'search', id, title }` (+ `dm?` on a conversation), and the pure **`composerContextPreset(context, wiring?)`** → `{ modes, defaultMode, disabledModes, modeUnavailableReasons, modePlaceholders, chipLabel, regionLabel, features }`. A feature renders only if the context allows it AND the host passed its callback: a conversation has Chat + Agent, no chip, no Workflow ⌄, no page actions, and send options / Share a document (`onShareDocument`) / offline notice / reply; a document has Chat, Agent and Terminal (off with a reason until `onShellCommand`), the page chip (removable with `onRemoveContext`), Workflow ⌄ with the `/workflow` command and argument picker (Send reads "Prepare run"), Make a deck (`onMakeDeck`) and `moreActions` under `Agent ⌄`, attachments in Chat only; a work item is a document with the chip "This work item"; a diagram starts in Chat with Agent off and its reason (`agentUnavailableReason` to reword); an initiative is Agent with Chat off unless `chatAvailable`; a search is Agent only. `modes` / `disabledModes` override the preset. `onSend(message, { mode, context, author })` — `author` from `identity`. Also exported: `COMPOSER_CONTEXT_KINDS`, `COMPOSER_CONTEXT_REASONS`, types `ComposerContext`, `ComposerContextKind`, `ComposerContextFeatures`, `ComposerContextPreset`, `ComposerContextWiring`, `ComposerIdentity`, `ContextComposerProps`, `ContextComposerSendContext`, `ComposerWorkflow`, `ComposerReply`, `ComposerTaskReport`.
- New **`identityDisplayName(claims)`**: the local participant's name from identity — `displayName` first (aws-agentcore BFF tokens), then `given_name` + `family_name` (Cognito and the gateway's `SKIP_AUTH` bypass), then `name`, then the email's local part.
- `RichChatComposer` `expanded?: boolean`: with `collapseWhenIdle`, forces the full card (host content above the composer); absent/false is the idle rule unchanged; no effect without `collapseWhenIdle`. `collapseWhenIdle` is now tested with `modeControl="menu"` + `toolbar="editor"` (pill, chips and Send on one row; the mode menu opening does not collapse it).
- **Deprecated:** `AgentComposerDock` — now a thin preset over `ContextComposer` (no idle collapse, no console, its own defaults) with its full API, look and test ids (`<id>-dock-slot`, `<id>-workflow`); every existing test passes unchanged. Move to `ContextComposer` with `context.kind` `'initiative'` / `'search'`. The realtime-examples wrappers it supersedes (`DocumentComposerDock`, `RichChatSurface`, `ChatColumnSurface`) live in that repo and are deleted there after migration.
- Storybook: Social/ContextComposer — every context kind idle and expanded, light and dark, with and without `dock`; reply / notice / task strip; Interactive.

## 2.406.3

- `RecordGraph` / `recordGraphViewport` `mode: 'auto'` with no drawn `focusKeys` is now the whole-graph fit, down to `RECORD_GRAPH_FIT_ALL_MIN_ZOOM` (0.25), legend and zoom-cluster corners reserved — the same view Fit to view lands on. Before, with nothing to centre on, it fell through to the 0.8 floor: the member search journey's `RecordGraphCard` (59 records, no selection, 1098×270) opened with 12 of 18 drawn records inside and six under the legend and zoom cluster. Mirrors the `OrgGraph` no-focus Radial rule (2.405.1). With focus keys the 2.403.8 ladder is unchanged. New option `fitAllMinZoom` (default `RECORD_GRAPH_FIT_ALL_MIN_ZOOM`).
- `RecordGraphCard` "Expand ⌄" / "Open graph ↗" and `CitedRecordList` "View these connections →" keep their icon on the same line: each is `inline-flex items-center whitespace-nowrap shrink-0`. The cause was not wrapping text — Tailwind's preflight makes `svg` `display: block`, so inside a non-flex button the icon took its own line. The card's summary is `flex-1 min-w-0 truncate`, so a narrow header truncates the summary rather than squeezing the actions.

## 2.406.2

- `RecordGraphCard`: the marks strip (`-marks`) and each mark are now `relative`. Each mark carries an `sr-only` label, which is absolutely positioned; with no positioned ancestor the labels were placed against the page body, escaping the host's scroll container — in the portal's Search transcript the document grew to 1575px in a 941px window and wheeling over the header scrolled the whole workspace. `RecordResultList` and `CitedRecordList` were audited and hold no `sr-only` text.

## 2.406.1

- `AgentComposerDock` `dock?: ReactNode`: pinned to the composer's top edge inside the dock frame, full width of the composer card — the in-call shelf (`CallDock`) on initiative and document pages. Placed like `ChatPanel.dock` (`shrink-0`, flush on the composer) so a shelf looks the same over either composer; testid `<data-testid>-dock-slot`; absent, no element. Not `FloatingComposerDock.above` (shrinks, scrolls, gap) nor `strip` (squares the composer's top corners); it rides in the dock's composer row.
- `AgentComposerDock` `modes?: readonly ComposerMode[]`, passed to `RichChatComposer`: a mode left out is absent (no row, shortcut or trigger); `disabledModes` still shows an offered mode off with its reason. When `modes` is given and `disabledModes` is not, nothing is disabled by default (the Chat/Terminal default-off applies only without `modes`), so `modes={['terminal']}` alone is a working Terminal. Existing callers (no `modes`) are unchanged.
- Storybook: Social/AgentComposerDock "With a docked call shelf", "Terminal only".

## 2.406.0

- `DocumentActivityCard` and `DocumentChip` take `unavailable?: 'gone' | 'forbidden'`: the card/chip stays as a record of the share but renders muted (dashed border, tertiary text), says "No longer available" (`gone`, the document was deleted) or "You don’t have access" (`forbidden`), and offers no way in — the card drops its Open button and live-editor faces, the chip is disabled. New attributes `data-unavailable`, testids `…-unavailable`. `ChatPanel` gains `documentUnavailable?: (documentId) => DocumentUnavailableReason | undefined`, asked per card and per `#` chip. Exported `DocumentUnavailableReason`, `documentUnavailableLabel()`. Why: a DM kept a live Open onto a document that platform-api answered 404 for, and opening it showed an empty pane.

## 2.405.2

- `ScopeHeader` `variant="inline"`: one row, at most 48px (`h-12`) — the crumbs, then the title as the trail's emphasised last segment (`Org › Search › **People & connections**`; an `h1` with `aria-current="page"`, 18px semibold, or 20px bold at `titleSize="lg"`; the crumbs before it are all links, `lastIsCurrent={false}`), then, right-aligned on the same row, the `tabs` (`activeTab`, `onTabChange`, `tabSize`, counts and dots as in `default`; `Tabs indicator="bar"` filling the row's height so the selected bar sits on the host's bottom rule) and after them `controls` / `link` / `menu`. `description`, `status`, `progress`, `spentUsd`, `stats` and `people` are not drawn in this variant. New testids `…-trail`, `…-tabs`. `default` and `crumbs` are unchanged (their tab items now come from a shared `scopeTabItems` helper; same output). Why: the Search workspace spent four rows (crumbs, title, search field, chips) before its tabs; the graph gets that height.
- New `RecordGraphCard` (search, root export) and `recordGraphSummary(records, connections)`: a record graph as a card in a chat / Answer view. Collapsed: a graph glyph, the title (default "Connections"), the summary (default "N records · M connections"; edges to records not held are not counted), up to six `RecordMark`s of the selection or the best-connected records (+N), "Expand ⌄" and "Open graph ↗" (`onOpen`). Expanded: "Collapse ⌃" and a `RecordGraph` (`focusKeys` = the selection) in a `height`px canvas (default 320). With no connections: "No recorded connections", no Expand, no marks. `expanded` and `selectedKeys` are each controlled or held by the card. Props: `records`, `edges`, `selectedKeys?`, `title?`, `summary?`, `expanded?`, `onToggleExpanded?`, `onOpen?`, `onSelectionChange?`, `onOpenRecord?`, `onAskSelection?`, `height?`, `className?`, `data-testid?`.
- `RecordGraph` `onAskSelection` is optional: omitted, the "Ask about selection →" button is not drawn. Existing callers are unchanged.
- `GraphIcon` (three joined nodes) in `ui/Icons` — internal for now, not on the root barrel.
- Storybook: Work/ScopeHeader "Inline: crumbs + title + tabs + controls"; Search/RecordGraphCard (collapsed, expanded, with a selection, no connections).

## 2.405.1

- `OrgGraph` Radial with no focus opens with every ring in view. The member search journey: the whole org (56 people, no focus, no selection) in Radial on a 1160 × ~400 canvas opened at the 0.9 floor with 29 of 56 inside and the zoom cluster over two people. The automatic fit for `layout: 'radial'` with no `focusIds` now frames the whole drawn set like Fit to view (down to `ORG_FIT_ALL_MIN_ZOOM`, 0.3), legend column and zoom-cluster corner reserved; Fit to view lands on the same view. A focused Radial and Force keep the readability floor (`minFitZoom`).
- `OrgGraph`: when the automatic fit stops at the floor and the drawing overflows, an overflowing axis with a focus is centred on the focus (clamped to the drawing's ends; was start-aligned), and the view is then panned — nearest first, within the overlays' size plus a node box — so no node sits under the legend column, the zoom cluster or a `fitInset` card, keeping the focus whole in the canvas. Nodes beyond the canvas edge are allowed. Where no pan in reach is clear (a whole org's rings, focused, at 0.9) the pan with the fewest nodes under an overlay is used. Force at open is unchanged when nothing was under an overlay.
- New pure helpers in `graph/org/fitTransform.ts` (not on the barrel): `orgGraphViewport` (OrgGraph's whole framing rule), `orgNodeBoxes`, `orgOverlayRects`, `nodesUnderOverlays`, `clearOfOverlays`, `toScreen`, `ScreenRect`, `OrgGraphViewportArgs`.

## 2.405.0

- `ChatLabShell` `variant?: 'column' | 'pane'` (default `'column'`, unchanged). `'pane'` lays the lab out for a 400–560px side pane beside a conversation that stays on screen: the status line takes two rows (dot + status · model chip with the controls; `42k / 200k` meter · turns · title), the step rail wraps instead of scrolling sideways, and `onBackToChat` reads **Close** (testid `…-back` unchanged; Escape still closes). The root carries `data-variant`, the status line `data-layout="stacked" | "row"`. New type `ChatLabShellVariant`. Why: a host that swapped the chat column for the lab hid a docked call shelf and every realtime update for the planner's 20–40 s.
- `AgentRunCard` shows an agent LOOP live: `loop?: AgentRunLoop` (`phase` — the lab's eight words, `startedAt` / `elapsedMs`, `steps: LabStep[]`, `contextTokens` / `contextBudgetTokens`, `outcome`) and `onOpenLab?: (runId) => void` ("Open lab"). With `loop` the card replaces the pipeline's three beats with the phase chip, a sentence ("Planning…", "Running step 2 of 4 — Write the haiku", the outcome), a clock that ticks once a second from `startedAt` while busy, the budget meter, and — once there is a plan — a wrapping step rail with the running step marked (`data-mode="loop"`, `…-loop`, `…-loop-steps`, `…-clock`, `…-open-lab`). Every existing prop works as before; without `loop` nothing changes. New exports `describeAgentLoop`, `formatLoopClock`, types `AgentRunLoop`, `AgentRunLoopPhase`.
- `agentRunRefFromMetadata` returns `lab: true` for a message whose metadata carries `lab` (an `/agent` card).
- `ChatPanel` `agentLoopStatus?: (runId) => AgentRunLoop | undefined` and `onOpenLab?: (runId) => void`, passed to every run card it renders (thread and local); "Open lab" is offered for a card marked `lab` or one the host reports a loop for.
- Storybook: ChatLabShell pane at 420 / 520 in light and dark, planning, column, pill; AgentRunCard "Agent loop" for every phase and a 267px column.

## 2.404.1

- `RecordGraph` "Fit to view" shows everything on a short canvas. The member search journey: with the conversation expanded (canvas 1160 × 209), 25 records and three selected, Fit to view went to the 0.4 floor and Force showed 22 of 25 — three records clipped at the top with 45px of empty canvas below, because the 2.403.8 focus offset was applied although the 184px drawing fitted — and Radial 17 of 25 (1.17× the canvas height at 0.4). `recordGraphViewport` `mode: 'all'` now uses the whole drawing's own zoom whenever it fits the clear area at or above the floor and centres it there, never applying the focus; only a drawing that does not fit even at the floor centres on the selection, as before. Still idempotent across presses.
  - `RECORD_GRAPH_FIT_ALL_MIN_ZOOM` is 0.25 (was 0.4); it no longer equals `RECORD_GRAPH_FOCUS_MIN_ZOOM` (0.4), which is unchanged.
- `recordGraphInset`: on a short canvas (clear height under 260px) where the legend's and controls' bottom bands would together take more than 40% of the clear height, the legend is reserved along the left edge and the controls along the right, so no height is lost; where those columns would take more than 60% of the width, a single bottom band as tall as the taller corner clears both. 418px and 369px canvases are unchanged (one 48px bottom band).
- `RecordGraph` keeps the selection clear of the legend and controls in every fit. The org-leader journey: at 209px the automatic fit put the selected Vera Green's name (Hierarchy) or role line (Force) under the legend, because the selection fit sized to the canvas less 16px rather than to the clear area. The selection fit (rung (c), `fitToFocus()`) now sizes to the clear area and keeps the selected boxes there first; only a selection that cannot fit there falls back to 16px inside the canvas, then its circles. At 369px the selection fit is correspondingly a little smaller (e.g. a 442-flow-px selection: 0.65, was 0.76).

## 2.404.0

- `CallDock` controls fit a narrow column (A12). The controls group was one non-wrapping `shrink-0` line, so with a chat side pane open (~650px) mic ▾ … Leave ran past the dock's edge and Leave was clipped. The group now shrinks to the header's width and wraps onto further right-aligned lines (labels still collapse to icons below 860px first); `extras` render as `display: contents`, so each host control wraps on its own; settings, pop-out and Leave travel as one unshrinkable unit (`call-dock-end`), so Leave is always visible and always last. No viewport widths are assumed — only the dock's own `@container`.
- `CallDock` `phase: 'calling'` (A11): the caller's side of a ring before anyone answers. The meta reads "Calling <name>…" from the new `callingTo?: string` prop (else "Calling…"), with no clock and no people count; mic and camera stay usable (mute before they answer); Share is disabled with "You can share once someone joins"; People and Documents as usual; Leave reads "Cancel" (testid `call-dock-leave` unchanged) and never opens the host's "Others stay on" confirm. `CallDockPhase` gains `'calling'` — hosts that switch exhaustively on it need a case.
- Storybook: CallDock "Conversation chat column 640" / "520" (light and dark, full extras), "Calling" / "Calling dark".

## 2.403.8

- `RecordGraph` never clips the selection. The member search journey: with three people selected on the 25-record graph, the 209px canvas (conversation expanded) kept the 0.8 floor and cut Vera Green off at the bottom edge, and "Fit to view" (80% → 50%) still left her outside; Radial opened at 80% with 17 of 25 whenever the drawing's fit-all was below 0.7. `recordGraphViewport` now fits the selection at min(0.8, the zoom at which its full boxes — selection ring included — fit the canvas with a 16px margin), down to a hard minimum of 0.4, below which its circles are kept whole as before. Only the selection is guaranteed; neighbours are centred into view when they fit at that zoom.
- `RecordGraph` automatic fit is a ladder: (a) the whole graph at ≥ 0.7; else (b) the selection + 1-hop neighbours when they fit at ≥ 0.6; else (c) the selection per the rule above.
- `RecordGraph` "Fit to view" frames the whole graph at any zoom ≥ 0.4 and is idempotent: a second press re-fits the same view instead of toggling to the 80% selection view (the org-leader journey: from Force at 70% with all 25 inside, the press dropped to 23 of 25, Hierarchy to 12). Where 0.4 still cannot show everything it centres on the selection. `fitAll()` is the same fit; `fitToFocus()` keeps its meaning and is the way to the selection view.
  - New in `recordGraphLayout.ts`: `RECORD_GRAPH_NEIGHBOURHOOD_ZOOM` (0.6), `RECORD_GRAPH_FOCUS_MIN_ZOOM` (0.4). Not added to the `/graph` barrel.
  - `RecordGraphViewportOptions` gains `neighbourhoodZoom` and `focusMinZoom`. `mode: 'all'` with `focusKeys` centres an overflowing axis on the focus rather than top-left aligning.
  - `RECORD_GRAPH_FIT_ALL_MIN_ZOOM` is 0.4 (was 0.5), equal to `RECORD_GRAPH_FOCUS_MIN_ZOOM`.

## 2.403.7

- `RecordGraph` automatic fit: everything when it is readable, else the focus. Two journey walkers disagreed on the opening view of 25 records · 56 connections with three people selected on a 1160 × 418 canvas: the fit centred on the selection at the 0.8 floor, so Force opened with 23 of 25 records on the canvas, Radial 17 (the drawing 117% of the canvas height) and Hierarchy 9 (524px empty on the left), while "Fit to view" showed all 25 at 70% / 55% / 67%. On open, on a new drawing and on a resize the view now shows the whole graph when it fits at `RECORD_GRAPH_READABLE_ZOOM` (0.7, names ≈ 9px) or above, and only otherwise centres on the focus at the 0.8 floor as before. "Fit to view", `fitToFocus()` and `fitAll()` are unchanged.
  - New in `recordGraphLayout.ts`: `RECORD_GRAPH_READABLE_ZOOM` (0.7), `recordRadialRings(count, width, height)` and its `RecordRadialRings` type. Not added to the `/graph` barrel.
  - `recordGraphViewport` takes `mode: 'auto'` and an optional `readableZoom`.
- `RecordGraph` Radial is compact. The rings were a fixed 128 × 307px step, so 25 records drew two rings 616 flow px tall. Ring spacing now starts from the node box and shrinks only until the outer ring's ellipse fits the canvas at 0.7 (the fewest rings that hold everyone, filled in proportion to their perimeters, the most connected record at the centre); where squeezed rings would stack boxes, a record moves to the nearest free spot inside the outer ring, so none overlap. Past ~30 records on the search canvas the natural spacing returns and the fit falls back to the focus.
- `RecordGraph` Hierarchy is centred and fits. The column block is centred on x = 0; the gaps between columns scale with the canvas width and the column count (squeezed to fit at 0.7, or widened up to twice to fill the canvas at 100% when there are few), rows are sized to the canvas at 0.7 (row gap 12–20px), and tall ranks still wrap.
- `RecordGraph` Force keeps its shaping; a packed set up to 15% taller than the area readable at 0.7 closes its rows up to fit, never into a new box overlap (the 25-record fixture was 505 flow px tall against 473).
- Storybook: "25 records, all layouts".

## 2.403.6

- `RecordGraph`: the canvas minimum height is 160px (was 256px). A host pane that shrinks — the Search page with its assistant conversation expanded left a 258px pane — no longer overflows by the difference and hides the legend and zoom controls under whatever sits below; the fit re-runs at the new size.

## 2.403.5

Three residues from the portal's search-journey audit, plus two from the org-leader walk.

- `RecordGraph` focus margin. With three people selected at the 0.8 floor, the answer strip took the canvas from 418 to 369px and the fit top-aligned a selection it could not fit, so Vera Green's node box ended 7px below the canvas. When the focus's boxes do not fit the clear area, the fit now keeps them 16px inside the canvas; when they are taller than that, it keeps the selected avatar circles whole (16px clear), as close to centred on the selection as that allows.
- `RecordGraph` legend and controls keep-out. The bottom-left legend and the bottom-right zoom cluster covered unselected records (one under the legend in Force; one under each in Radial). The fit now reserves both corners the way `OrgGraph` does (`reserveCorner`, mirrored for the left corner) — along the bottom on the search canvas — so a drawing that fits never sits under either overlay.
  - New in `recordGraphLayout.ts`: `recordGraphInset(size, { legend, controls })`, `recordGraphLegendSize(labels, canvasWidth)`, `RECORD_GRAPH_CONTROLS_SIZE` (212 × 48) and `RECORD_GRAPH_FIT_ALL_MIN_ZOOM` (0.5). Not added to the `/graph` barrel.
  - `recordGraphViewport` takes an optional `inset` (`FitInset`); `padding` is at least 16.
- `RecordGraph` "Fit to view" frames the whole graph. The second press and `ref.fitAll()` may now zoom below the 0.8 floor, down to 0.5, like `OrgGraph`'s `fitAll`; the automatic fit keeps the floor.
- `RecordGraph` Force layout fills a wide canvas. 25 records on 1160 × 418 drew 82% of the width and 117% of the height. The x/y pulls now go as aspect² once the set packs the canvas (aspect¹ for a sparse set, so a dozen still read at 100%), the simulation starts from an ellipse of the canvas's shape, and a collide-only pass ends it; collide is half the box + 20 (was + 16, which let diagonal neighbours overlap a box corner). The same 25 records now span ~99% × 97%.
- `OrgGraph` Radial fits a whole org. `?type=person` Radial opened at 90% with 17 of 56 people on the canvas, and "Fit to view" stopped at 50% with 39. The rings were fixed circles 130–680px apart. They are now ellipses shaped to the clear area and spaced from the head count (`orgRadialRings` in `useForceLayout.ts`, not on the barrel): the fewest rings that fit the shorter half-dimension at the automatic floor, or when none can, the least spacing that holds everyone, with people spread over the rings in proportion to their perimeters. 56 people on 1160 × 400 now fit whole at Fit to view, near Force's zoom.
- `ORG_FIT_ALL_MIN_ZOOM` is 0.3 (was 0.5), the pan/zoom's own minimum, so "Fit to view" / `fitAll()` can always show everyone.

## 2.403.4

- `RecordGraph` keeps the selection in view when its canvas changes size. In the portal, the answer strip opening under the canvas took it from 418 to 369px (256px expanded) without a re-fit, so a selected person was clipped at the top edge, and "Fit to view" did nothing at the zoom floor.
  - The view re-fits when the canvas is resized (a `ResizeObserver` on the canvas, one fit per animation frame), as well as when the drawing changes. A selection click still never moves it.
  - At the floor, the fit keeps the focus whole. When `focusKeys` and their neighbours cannot fit, the view centres, per axis, on the largest of the whole graph, the neighbourhood and the focus itself that fits. If even the focus overflows, it aligns the focus's top-left.
  - "Fit to view" re-centres on the focus. Pressed again while already there (or with no `focusKeys`), it frames the whole graph: centred when it fits, top-left aligned when it overflows.
  - New `ref` prop with a `RecordGraphHandle` (`fitToFocus()`, `fitAll()`), so a host can re-fit after a layout change the graph cannot observe.
  - New pure `recordGraphViewport(positions, { width, height }, { mode, focusKeys, fitKeys, padding?, minZoom?, maxZoom? })` → `RecordGraphViewport | null` computes the fit. It is exported from `recordGraphLayout.ts`, and its types are exported from `/graph`.
  - The initial fit no longer goes through xyflow's `fitView` prop (it could land after, and overwrite, the focus fit). xyflow's `fitView` remains only as the fallback for an unmeasured canvas.
- `RECORD_GRAPH_MIN_FIT_ZOOM` is 0.8 (was 0.7), so names draw at ≥ 10.4px and edge labels at ≥ 8.8px (were 9.1 / 7.7px). Layouts are sized for the new floor, and a graph that overflows pans, with the focus kept in view.
- Edge labels no longer cross node names.
  - A label draws at rest only on edges that touch a selected or focused record. Other labels appear on hover over the edge, which has a 12px invisible hit line. With nothing selected or focused, a graph of ≤ 16 edges still labels every edge.
  - Node names and status lines sit on a `bg-surface` pill, so a crossing edge or edge label passes under the text.
- Story "25 records, strip opens" toggles a 50px strip under a 1160px canvas and drives the handle.
- `OrgGraph` can show the whole org. At the 1.1 floor a 1160 × ~400 canvas held only 35 of 56 people (Force) and 12 of 56 (Radial), and "Fit to view" could not go lower.
  - `ORG_FIT_MIN_ZOOM` is 0.9 (was 1.1), so first names draw at 9px on their pills. Only the automatic fit uses it; the layout is sized for it. New `minFitZoom?: number` lets a host tune it.
  - "Fit to view", and `fitAll()` on the new `ref` handle (`OrgGraphHandle`), fit the whole drawn set with no readability floor, down to the new `ORG_FIT_ALL_MIN_ZOOM` (0.5). The view stays in that mode across resizes until a pan, a zoom or a new drawn set.
- `OrgGraph`'s zoom controls no longer sit on people. While `controls` is on, the fit keeps the cluster's corner clear (new `ORG_CONTROLS_SIZE`, 172 × 48 with margins). It reserves the bottom or the right edge, whichever costs the smaller share of the clear area (the bottom on a 1160 × 400 canvas), unless `fitInset` already covers the corner.

## 2.403.3

- `RecordGraph` reads at a search page's density. 25 records and 56 connections on a 1160 × 418 canvas used to fit at 46% (Force, 5–6px labels), 26% (Radial) and 15% (Hierarchy, one column).
  - Nodes are 140 × 104 (`RECORD_GRAPH_NODE_WIDTH/HEIGHT`, were 180 × 116).
  - Layouts are sized to the measured canvas. `layoutRecordGraph(records, edges, layout, { width, height }?)` takes the canvas to fill.
  - Force uses the new exported `recordForceParams(count, width, height)` → `RecordForceParams`. Link distance is `clamp(0.75·√(area/N), 130, 240)` over the canvas at the fit floor; charge scales with that spacing²; collide follows the node box. The x/y pulls are weighted by the aspect ratio, and the simulation runs in a space where the box is square, so boxes clear each other on both axes.
  - Radial rings are ellipses shaped to the canvas and filled by arc length.
  - Hierarchy ranks by longest path from the roots, with cycles broken where they close. When nothing forms a directed chain it falls back to columns by type (person → initiative → work/decision/knowledge/asset). A rank taller than the canvas wraps into side-by-side columns, and each column is ordered by its predecessors.
  - The fit never goes below `RECORD_GRAPH_MIN_FIT_ZOOM` (0.7) nor above `RECORD_GRAPH_MAX_FIT_ZOOM` (1). A larger graph overflows and the viewer pans.
  - New `focusKeys?: readonly string[]` (usually the selection) frames those records and their direct neighbours first (`recordGraphFitKeys(recordKeys, edges, focusKeys)`). "Fit to view" frames the whole graph. The view re-fits when the drawing changes, not on a selection click.
  - Story "Search result (25 records)".
- `OrgGraph` fits a whole org readably.
  - The fit never zooms below the new `ORG_FIT_MIN_ZOOM` (1.1, so the 10px first names draw at 11px). A set that does not fit overflows the canvas and the viewer pans; `fitTransform` start-aligns an overflowing axis instead of centring it.
  - The forces are laid out for the clear area at that zoom.
  - Department cells come from the new `orgDepartmentCells(names, width, height)`, a grid shaped to the canvas (six departments are 3 × 2 at 16:9 and 4 + 2 on a 3:1 strip).
  - `forceParamsFor`'s > 40-people branch weights the x/y pulls by aspect ÷ 16:9 (0.1 / 0.1 at 16:9), so 56 people span a 1160 × 360 strip instead of a square in its middle.
  - Story "Default (56)" renders in a 1160 × 360 frame.
- Keep-outs for overlays on the org graph.
  - `OrgGraph` gains `fitInset?: FitInset` (`{ left?, right?, top?, bottom? }`, screen px). The layout is sized to, and the fit centred in, the canvas less the insets. A host overlaying a person card passes its width as `right`.
  - `left` defaults to the new `ORG_LEGEND_INSET` (200) while `legend` is on.
  - `fitTransform(bounds, size, padding, maxZoom, minZoom?, inset?)` takes the insets.
  - `OrgGraphLegend` is an opaque `bg-surface` panel with a hairline border and a fixed 176px width. It no longer rests at 20% opacity over the nodes; at rest it still shows only its first rows.
  - Story "Focused, card inset".

## 2.403.2

- `CallDock`: the header wraps instead of overlapping. The title block was `flex-1` (a 0 basis), so the row never wrapped; once title + meta + controls outgrew the dock — the conversation shelf in a 1280×720 window's chat column (~904px) carrying the host's `extras` — the controls painted over the conversation name and the "N people · mm:ss" clock. The title block is now `flex-auto` (sized by its content), the header row `flex-wrap`, and the controls `ml-auto`, so the controls take their own right-aligned line when they do not fit and the one-line layout is unchanged when they do. The title and meta keep their natural width (2.394.0). New testids `call-dock-header` and `call-dock-controls`. Stories `ConversationChatColumn904` (+ Dark); test.

## 2.403.1

- `OrgGraph` lays out and frames whatever set it draws. A focused set (e.g. one person and ten neighbours) no longer collapses into a ~300px blob with labels stacked on each other in the middle of a wide canvas.
- Forces scale to the drawn count and canvas via the new exported pure `forceParamsFor(count, width, height)` → `OrgForceParams`: link distance `clamp(0.7·√(area/N), 60, 240)`, charge `−clamp(spacing²/70, 150, 1500)`. For N ≤ 40, links are softer (stiffness 0.03), collide is node radius + the 18px label band, and the department pulls are weighted by the aspect ratio, so a wide canvas gets a wide layout. At 56 people on a typical canvas the numbers stay at the old tuning: link ~80, charge ~−200, stiffness 0.3, x/y 0.1, collide radius + 6.
- `useForceLayout` takes optional `nodeRadiusOf` (so collide uses the drawn radius) and returns `isSettled` (alpha < 0.05).
- The viewport fits the drawn nodes and their labels once the layout settles, and again when the drawn set or canvas changes, until the viewer pans or zooms. This uses the new exported pure `fitTransform(bounds, size, padding, maxZoom, minZoom?)` → `ViewTransform` (types `FitBounds`, `ViewTransform`), with 32px padding and a 125% cap. "Fit to view" re-fits instead of resetting to 100%. Zoom buttons and the wheel now zoom about the canvas centre.
- Labels sit on a surface pill below the circle. With more than 40 drawn, dimmed people drop their label. When sizing by connection count, a focused person is capped at their best-connected neighbour's size; `showInfluence` still sizes by influence.
- Stories: "Default (56)" and "Focused, two people".
- `RichChatComposer` (menu mode) / `AgentComposerDock`: words typed after an argument pick (`/agent` → "Advisor") now land on the command's line and `onSend` carries `command.argument`. The hidden-command decoration used to cover the whole line when nothing followed the pick, leaving a paragraph with no rendered content; the browser could not place the caret in it and typed a NEW paragraph ahead of the command (`<p>Find…</p><p>/agent Advisor </p>`), so the command was lost. The trailing space now stays rendered until something is typed after it; Backspace at the caret still removes the whole command.
- `RichChatComposer` gains `inputLabel` — the editor's `aria-label` (the contenteditable is `role="textbox"` + `aria-multiline="true"`); a change applies to the living editor. `AgentComposerDock` passes `inputLabel` through, default "Message".

## 2.403.0

- Add `AgentComposerDock` — the agent composer a page docks under its content, as one composite: `ComposerDockPlacementContext` pinned → `FloatingComposerDock` → `RichChatComposer` with the initiative composer's preset (`modeControl="menu"`, `layout="auto"`, `toolbar` editor|compact and `density` comfortable|compact from `presentation`, mode shortcuts and triggers, `backdropTone="none"`, attachments on) and a `Workflow ⌄` menu whose pick seeds the draft with `/<id> ` and remounts the editor. The host passes words and callbacks: `placeholder`/`modePlaceholders`, `references`/`onRemoveReference`, `commands`, `workflows` (disabled rows carry a reason), `onWorkflow`, `disabledModes`/`modeUnavailableReasons` (Chat and Terminal off with reasons by default), `draft`/`onDraftChange` or `defaultDraft` + `draftKey`, `onSend(message, { mode })` (receives what was typed — the Agent mode's `/agent ` prefix removed and `command` re-matched; `false` keeps the draft), `onSearchDocuments`/`documentMenu`/`onSearchPeople`, `composerRef`, and the usual composer pass-throughs. Static on `…/social/rich-composer`; on the root barrel behind `React.lazy` so the root entry gains no static optional peer. Also `composerDraftOf(text)` (both entries). Docs, stories, tests.
- `OrgGraph`: `focusIds?: ReadonlySet<string> | string[]` (+ `focusHops`, default 1) narrows the drawing to the focus set and its direct neighbours and spotlights the focus set; empty or unknown focus draws the whole graph. The subset is the exported pure `focusOrgGraph(people, relationships, focusIds, { hops, minStrength, topK })` → `{ people, relationships }` (`topK` is the old Explore page's strongest-K-per-person cap). Story "Focused on one person".
- `RecordGraph` no longer draws a cloud of unconnected records: when the filtered records have no connections among them it shows `emptyLabel` (default "No recorded connections — search, or select related records") under the toolbar. `showIsolated` restores the old drawing. Stories Unconnected, ShowIsolated.

## 2.402.0

- Add a `search/` domain on the root entry. `RecordResultList` draws a search workspace's Results tab: typed org records grouped by type with counts and "See all N →", checkbox selection (`recordResultKey` = `${type}:${id}`), avatar or kind mark, matched-term highlights, a subtitle · match-reason meta line, toned status dots, and a chevron or labelled open link; loading/error/empty states, footer and hint. `CitedRecordList` draws the records under an assistant answer: "People in context", "Work to coordinate", numbered citations that open their source, numbered source chips, and "View these connections →". Helpers `recordStatusTone`, `recordStatusLabel`, `RecordMark`, `RecordStatus`, `RECORD_TYPE_LABELS`, `DEFAULT_CITED_SECTIONS`. Docs, stories and interaction tests.
- Add `Highlight` (and `highlightSegments`) to `shared/`: case-insensitive whole-term `<mark>`ing in theme tokens, longest term first.
- Add `RecordGraph` to `graph/` (root and `/graph`): a typed record graph on `@xyflow/react` — avatar nodes (initials, photo or kind glyph, selection ring + check), curved labelled edges with arrowheads (related edges dashed), a toolbar (Force / Radial / Hierarchy, type filter, counts, Open record, Clear, Ask about selection), a type legend and `CanvasZoomControls` + full screen. Props match the aws-agentcore portal's `SearchConnections` one-to-one, plus `typeLabels`. Pure helpers `filterRecordGraph`, `layoutRecordGraph`, `recordGraphKey`, `RECORD_GRAPH_TYPES`, `RECORD_GRAPH_NODE_WIDTH/HEIGHT` and types `RecordGraphRecord`, `RecordGraphEdge`, `RecordGraphType`, `RecordGraphLayout`.
- Port the portal's org graph into `graph/org/`: `OrgGraph` (d3-force or radial, departments, relationship line styles, legend, hover card, multi-select, spotlight, presence filter; zoom now via `CanvasZoomControls`), `OrgGraphLegend`, `GraphSearchBox`, `DepartmentChips`, `DepartmentInsightStrip`, `ConnectionPathStrip`, `PersonDetailCard`, `useForceLayout`, and the pure helpers (`findConnectionPath`, `searchGraph`, `departmentInsight`, `orgInsight`, `indexBusFactorFindings`, `findingForSkill`, `rareSkillFindingsUrl`, `nodeRadius`, `degreeMap`, `maxDegree`, `parseFocusIds`, …). The org `GraphPerson` is exported as `OrgGraphPerson` (PeopleGraph owns `GraphPerson`). App state moved out: `showInfluence` replaces session reads, `PersonDetailCard` takes `person`/`evidence`/`loading`/`error` instead of fetching, and `DepartmentInsightStrip` takes `findingHref`/`onNavigate` instead of a router `Link`. See `graph/org/README.md`.
- Add list-row primitives `SuggestionRow` (combobox option row) and `MeterRow` (label + trailing meter) to `shared/`.
- New runtime dependency `d3-force` (externalised; `@types/d3-force` dev).

## 2.401.0

- `CallSidePanelToggles` and `ReactionPickerButton`: `tone?: 'chrome' | 'surface'`. `chrome` (default, unchanged) is the round translucent-white control of the dark call chrome; `surface` is a 32px outline button that follows the page theme, for `CallDock`'s header — the conversation call shelf carries both in its `extras`, where the chrome buttons were white on white. Both stamp `data-tone`. The `CallDock › Conversation` stories now use the real controls.
- `VideoDockSlot`: `compact?: boolean` draws the empty-slot drop prompt as a one-line 40px dashed strip instead of the 16:9 box (`data-compact="true"`), for a slot whose docked content is a shelf rather than a stage. Story `Empty — compact strip (chat shelf)`.

## 2.400.0

- Add `ChatPanel.dock?: ReactNode`, a slot pinned to the composer's top edge (between the thread / typing row and the composer, `shrink-0`, `data-testid="chat-panel-dock-slot"`) for the in-call shelf of the call a conversation is on (document-calls mockup 02). New story `Social/ConversationSurface › CallDockedAboveComposer`.
- `CallDock`: `documents` and `onOpenDocuments` are optional — without them the document chips and the Documents button are not rendered (a conversation call has no review documents). New `extras?: ReactNode`, rendered in the controls row before the settings gear (`data-testid="call-dock-extras"`), for host controls such as a reactions trigger, a recording chip or side-panel toggles. No visual change for existing document-call callers. New stories `Conversation` / `ConversationDark`.

## 2.399.0

- Add `WorkTableView`, the full-width grouped-table counterpart to `WorkListView`, with shared toolbar/filter controls, owner avatars, optional completion controls, and honest loading/error states. Includes Storybook variants, component documentation, and interaction tests.
- Add optional `RailNavList.currentStyle="tint"` and per-item `onNavigate` for selected-view styling and client-side routing without losing native modified-click behavior.

## 2.398.0

- **Rail type scale, one step smaller (visual change for every consumer).** The shared `railType` scale that every navigation rail draws from (shell rail, `NavRail`, module sub-navs, `WorkspaceRail`, `RailNavList`, `GroupedList rowStyle="plain"`, rail section headers) is now 13px/500 items on a 36px pitch, 12px item counts and a 12px caption; group headings stay 11px caps. 2.397.0 had unified the rails on the explorer's 15px/40px scale; the user preferred the smaller one. `RAIL_ROW_PITCH` is 36.

## [2.397.4] — 2026-09-25

### Changed (visual)
- `RailSection` (RailLayout): the section title draws the shared rail group label (`RAIL_GROUP_LABEL`,
  11px semibold caps, secondary ink) instead of 10px tertiary — the one rail heading 2.397.0 missed
  (the assessment Workspace explorer's "VIEWS" sat beside 11px group headings).

## [2.397.2] — 2026-09-25

### Added
- `CallDock`: `error.title` and `error.retryLabel`. The banner read "Lost the call — <message>" with
  "Rejoin" for every error, including a join that never connected; a host can now say
  "Couldn't join the call — …" with "Try again". Stories `JoinFailed` / `JoinFailedDark`.

## [2.397.1] — 2026-09-25

### Changed
- `CallActivityCard` now has three states a reader can tell apart. Live: a pulsing green dot (still under `prefers-reduced-motion`), "Live · 3:12" counting up on the reader's clock from the new `startedAt`, the people in it, and Join. Ended: "Call ended · 24s" with who was there; pulse, clock and Join gone. New `outcome` (`cancelled` / `declined` / `no-answer`) reads "Missed call" / "Declined" / "No answer". New `recordingId` + `onOpenRecording` link the recording. Stored cards with no `startedAt` render as ended with their duration.
- `ChatPanel` reads `startedAt`, `outcome` and `recordingId` from call metadata and passes `onOpenRecording` to the call card.

## [2.397.0] — 2026-09-25

One type scale for every navigation rail. **Visual change for every consumer** (realtime-examples
included) — intended, not opt-in: the shell rail and the explorer rail beside it drew two scales
(13px items in 36px rows, 10px bold group headings, 9px bordered count pills — against 15px items on a
40px pitch, 11px caps labels and plain counts), and nothing tied them together.

### Added
- `railType` (from `…/shared`): the constants every rail now composes — `RAIL_ITEM_TEXT` (15px/500,
  22px line), `RAIL_ROW_PAD_Y` / `RAIL_ROW_PITCH` (40px rows), `RAIL_ITEM_COUNT` (13px muted tabular),
  `RAIL_GROUP_LABEL` + `RAIL_GROUP_LABEL_INK` (11px semibold caps, letter-spaced), `RAIL_GROUP_COUNT`
  (11px plain count), `RAIL_GROUP_PAD_Y`, `RAIL_CAPTION` (13px caps), `RAIL_CURRENT_FILL` (primary at 8%),
  and `RailCaretIcon` (the 14px disclosure caret). Values are the Initiatives v2 explorer rail's.

### Changed (visual)
- `SubNavLayout`: items 13px → 15px/500 on 40px rows, primary ink (inherits from the link); item counts
  plain 13px instead of a 10px pill; hints 10px → 12px; group headings 10px bold `▾` → 11px semibold caps
  with the SVG caret on a 40px row; group counts plain 11px at the right edge instead of a 9px pill;
  `groupScrollAfter` caps at 40px per row.
- `activeNavItemClassName` / `inactiveNavItemClassName` / `activeNavItemStyle`: 40px rows, primary ink,
  inactive items gain a hover fill, and the current item fills with `bg-primary/8` (was `bg-surface-hover`,
  i.e. it looked hovered) — the same mark GroupedList puts on its current rail row.
- `NavRail`: both sizes draw the shared scale (`size` is now layout only — flush vs inset); badges are the
  plain item count; group headings as SubNavLayout; the surface tone's current fill is `bg-primary/8`.
- `GroupedList` `rowStyle="plain"` is a rail row at any `size`: shared 40px pitch, 15px/500 titles and the
  3px-bar current row (sm plain rows were 14px/36px). `groupHeading="label"` headings and counts come from
  the shared tokens (same values as before). Ruled lists keep their `size` scale — they are work lists.
- `RailNavList`: 15px/500 (was 400) from the shared item token, 34px pitch (was 33px) — the views list stays
  tighter than rows, as drawn in the mockup.
- `RailSectionHeader`: label ink `text-text-secondary` (was tertiary) with the shared caret; `count` is the
  shared plain group count (`data-shape="plain"`), no longer a bordered pill.
- `WorkspaceRail` `heading="caption"` reads `RAIL_CAPTION` (unchanged values).
- Story `Layout/ExplorerLayout › Initiative overview v2 — shell rail beside the explorer rail`: a
  SubNavLayout shell rail beside the Initiatives explorer rail, both on the one scale.

## [2.396.1] — 2026-09-25

### Changed
- Toolchain: TypeScript 5.9.3 → 7.0.2 (the native compiler; `npm run lint` over src + demo drops to ~5s).
  TS 7 ships no JavaScript Compiler API, so: vite-plugin-dts 4 → 5 (`rollupTypes` → `bundleTypes`) with
  `@typescript/typescript6` for its JS API and `@microsoft/api-extractor` declared directly; api-extractor
  analyses with its own bundled TypeScript (TS 7 has no `lib.*.d.ts`); every script runs `node scripts/tsc.mjs`
  so a TypeScript-6 `.bin/tsc` symlink can never stand in for the real compiler; `export-ambiguity.test.ts`
  runs the tsc CLI instead of the removed API. Consumers are not moved onto TS 7 — the declaration rollup
  is still analysed by TypeScript 5.9.
- Published `.d.ts`: no export added or lost on any entry. `social/rich-composer` and
  `integrations/realtime-modules` are now emitted at their exports-map path directly (the orphan top-level
  `dist/rich-composer.d.ts` / `dist/realtime-modules.d.ts` copies are gone). Each entry carries
  `Window.__pipelineEditor?: unknown` (the dev-only bridge; typed `unknown` so it names no module-local type).
- `encodeFrame` / `encodeResize` (`/compute`) return `Uint8Array<ArrayBuffer>`, which `WebSocket.send`
  accepts under TS 7's DOM lib.

### Fixed
- `PresentationView` no-access test passes the required revision/slide props (lint was red on main).

## 2.396.0

- **Tabs** (`underline`): `indicator="bar"` draws the selected-tab bar above the row's rule so a following pane can no longer paint over half of it; `indicatorWeight` 2 | 3.
- **ScopeHeader**: the tab rule can be inset to the content edge rather than spanning the pane.
- **Chip**: `outline="soft"` — tone border and text over the tone's pale fill; `size="lg"`.
- **PageSection**: `countTone="primary"` for a pale-indigo count pill.
- Story `Layout/ExplorerLayout › Initiative overview v2` updated to the 23:25 mockup.

## [2.395.3] — 2026-09-25

### Fixed
- `CallTileRow` `dock` (and so `CallDock`): the followed person's accent ring, and the green speaking
  ring, are drawn INSIDE the tile as an inset overlay above the video. The outer ring + offset was clipped
  by the row's overflow and never showed (lane D A-13, mockup 02). Stories `Video/CallTileRow`
  DockHighlightAtRowEdges (+Dark): the ring on the first tile and on the last of a scrolling row.
- Face effects: RM ≥ 0.97.4 sends each sprite's emoji in `icon` with a plain label. The Wrapped effects
  adapters forward `icon`, the grid tile draws it (the old emoji-in-label parsing stays as a fallback),
  and the strip pill prefixes it. Story `CallSettingsDrawer` EffectsRmFaceLabels uses the new shape.

## [2.395.2] — 2026-09-25

### Added
- `CallPeopleList`: `state: 'notified'` — an invitee who was offline and got a notification instead of a
  ring reads "Offline · notified" (muted, dimmed row, no mic), in the not-in-call group of the precedence
  (SPEC §2.6, mockup 06, lane D A-12). Stories `DocumentCallPanel` WithNotifiedInvitee (+Dark) and the
  Pieces gallery row.

## [2.395.1] — 2026-09-25

### Fixed
- `CanvasDocumentView` `belowRuler` is sticky: it starts just under the ruler and, as the page scrolls,
  pins under the toolbar (the toolbar's height is published on the workspace as `--uic-canvas-toolbar-h`),
  on an opaque workspace strip. Follow mode moves the viewport for you and the follow bar is the way out,
  so it no longer scrolls away (A-10 follow-up). Stories `Doc-Editor/CanvasDocumentView`
  FollowBarPinnedWhileScrolling (+Dark).

## [2.395.0] — 2026-09-25

Document calls, lane D requests A-8 to A-11.

### Added
- `CanvasDocumentView` `belowRuler` (A-10): a slot between the ruler and the sheet, across the editor
  column — where the in-call follow bar sits in mockups 02/03b/04/06.
- `IncomingCallPopover` `initialFocus: 'join' | 'close'` (A-9, default `join`): focus lands on Join call
  (or Switch), so the × carries no focus ring (05/05b).
- `ContextColumn` `reserveOverlayInset` (A-11, default on): while open it publishes its width as
  `--uic-context-column-inset` (`CONTEXT_COLUMN_INSET_VAR`) on <html>; `ToastProvider` and
  `ChatBubbleStack` offset their right edge by it, so toasts no longer cover a drawer's Done/Apply.
- `splitEffectLabel` (A-8): RM face-sprite labels ("🕶️ Sunglasses") become a glyph tile and a caption in
  the Effects grid's icon row (Sunglasses · Dog ears · More), driven by the controller's `faceSprites`.

### Changed
- Call settings match mockups 03b/04 at 1672 × 941 (the drawer is 892px tall there): preview 338/156 (A&V)
  and 338/161 (Effects), effect thumbnails 101/50, tighter face-effects row, compact Advanced — both tabs
  fit without scrolling.
- Stories: `Doc-Editor/CanvasDocumentView` FollowBarBelowRuler(+Dark), `Layout/ContextColumn`
  ToastsClearOfColumn(+Dark), `CallSettingsDrawer` EffectsRmFaceLabels(+Dark), `IncomingCallPopover`
  FocusOnClose.

## [2.394.0] — 2026-09-25

### Added
- `DocumentResultList`: a per-row trailing slot — `DocumentResultItem.trailing` or the list's
  `rowTrailing(item)` (wins when non-null) — drawn at the row's right before Add and ⋯, outside the open
  target, row height unchanged. For `CallPresenceIndicator` on documents with a live call (lane D A-7).
- Story `Shared/DocumentResultList` RowInACall (+Dark).

### Fixed
- `CallDock`: the title and "4 people · 09:41" keep their natural width (the title caps at 45% of the dock
  and truncates only past that); only the document chips shrink, and they fold away below a 1240px content
  width — where they would truncate — leaving the Documents button's count (mockup 02). Stories
  `CallDock` EditorColumn780 (+Dark) and EditorColumn1240.

## [2.393.1] — 2026-09-25

### Fixed
- `ActionRowList` toned rows paint the tone's pale `--color-{tone}-callout` surface (the one `Banner
  layout="callout"` uses since 2.389.4), not the generic `-bg`. A host that pushes `--color-warning-bg`
  saturated for pills (#fef3c7) no longer turns "Needs attention" into a solid yellow slab — the row
  stays the mockup's cream (#fff8eb). Applies to every tone.

### Added
- Tokens `--color-caution-callout(-border)` and `--color-accent-callout(-border)` (light + dark), so the
  callout surface covers all six tones.
- `Chip outline`: 1px tone border + tone text on a faint surface wash instead of the soft `-bg` fill —
  for a tag on an already-tinted row. The `Initiative overview v2` story's "Blocked" chip uses it
  (`tone="danger"`), matching the v2 mockup.

## [2.393.0] — 2026-09-25

### Added
- `FollowModeBar` / `FollowBanner`: `autoStopScope` (a ref to the editor) — follow then ends only when the
  follower scrolls or types INSIDE it (wheel / touchmove / keydown), so a click on the call dock, the
  toolbar or a side panel keeps following (SPEC §2.2 row 13, lane D A-5). `autoStop={false}` turns the
  auto-unlock off (`autoStopOnInteract` still works). The shared logic is exported as `useFollowAutoStop`.
  Unscoped behaviour is unchanged (any mousedown/keydown/wheel in the window).
- Stories: `Doc editor/FollowModeBar` ScopedAutoStop(+Dark), `Shared/FollowBanner` AutoStopOff.

### Changed
- `StartCallDrawer` vertical rhythm matches mockup 01 at 1672 × 941 (drawer 892px tall): 32px document
  rows, 39px collaborator rows, a 38px Video | Audio switch, a 48px message box, a 32px pre-check row and a
  tighter header/footer — the pre-check row is on screen without scrolling. `SegmentedControl
  tone="accent"` segments are 30px; `MediaPrecheckRow` toggles are 32px. Document-call drawer stories now
  frame the true 892px column.

## [2.392.1] — 2026-09-25

Document calls, matched to the mockups where they and the SPEC disagreed.

### Changed
- `StartCallDrawer`: Video | Audio uses `SegmentedControl tone="accent"` (soft brand fill on the chosen
  segment, mockup 01). Every review document may show its × (the host passes `removable`).
- `CallDock` / `CallTileRow` `dock`: a camera-off tile is the mockup's grey (`--color-video-tile-off`,
  theme-invariant) with a darker initials circle; live tiles stay on the dark video tile.
- `AudioVideoSettingsForm`, the Effects face select and `CallCaptionsSettings` use `Select chevron="custom"`
  — no native arrow (03b, 04).
- `DocumentCallPanel`: Present stays live while someone else presents when `canPresent` (titled
  "Take over from Alice"); `CallPeopleList` gives your own row a ⋯ menu (`onOpenSelfSettings` →
  "Call settings", `onLeave` → "Leave call") (06).

### Added
- `SegmentedControl tone="accent"`; `Select chevron="custom"`; `--color-video-tile-off`.
- Stories: `Shared/SegmentedControl` Accent(+Dark), `Forms/Select` CustomChevron(+Dark),
  `DocumentCallPanel` PresentBlocked; existing document-call stories updated.

### Fixed
- The export-surface snapshot now lists the 2.391.0 exports.

## [2.392.0] — 2026-09-24

The Initiatives v2 library batch (agentcore
`docs/design/initiative-overview-v2-mockup.png`). Every prop is additive and
every default renders as before. Composed end to end in Storybook as
`Layout/ExplorerLayout › Initiative overview v2`, measured at 1642×958 against
the mockup (rail 264px, 22px/600 title, 32px avatars, 15px tabs, one
dot-separated stats line with a 150px bar, row cells aligned down the list,
46px row pitch).

### Added
- `RailNavList` (`/shared`) — a rail's scope list ("All initiatives / My
  initiatives / Sprints"): 15px items, no chrome, links or buttons, the current
  one `aria-current="page"`, optional muted `count`, disabled items keep their
  reason as the tooltip. Types `RailNavListProps`, `RailNavListItem`.
- `ActionRowPerson` (`/work`) — the 28px avatar + name cell for an
  `ActionRowList` column. Types `ActionRowPersonProps`, `ActionRowColumn`,
  `ActionRowTone`.
- `ExplorerLayout railWidth="ms"` / `WorkspaceRail width="ms"` — 264px.
- `ExplorerLayout railHeading="caption"` / `WorkspaceRail heading="caption"` —
  the 56px header row with a 13px letter-spaced uppercase title ("INITIATIVES 11").
- `GroupedList groupCountAlign="end"` (the group count at the header's right
  edge, "IN PROGRESS … 9") and `rowStyle="plain"` (no row rules, 40px pitch at
  `md` — a title-only list).
- `ScopeHeader peopleStyle="inline"` — its own row under the description:
  muted label, then a 32px `Avatar` and name per person, groups ruled apart.
  `tabSize="md"` (15px tabs at any title size, 8px padding, 28px gaps, count
  10px after its label) and `tabSize="sm"`; `descriptionSize="sm"` (15px/22px).
- `StatStrip variant="line"` — one unboxed line, clusters separated by a muted
  "•", a cluster's `progress` drawn as a 150px bar inline after its label.
- `PageSection count` (a neutral chip after the title, 0 shows "0") and
  `size="md"` (16px semibold h2, 8px to content, actions centred on the title);
  `data-testid`.
- `ActionRowList columns` (fixed-width fact columns declared once on the list,
  filled per item by `cells`, ruled apart, aligned down the list), `tone`
  (row tint; a toned list drops the grey rules), `accent="bar"` (3px tone bar
  on the left), `action` (a worded "Open →" in place of the chevron), and per
  item `leading` (a chip before the title), `tone`, `accent`, `action`. The
  row is still one target. Descriptions keep working beside columns, so the
  2.390.0 arrangement (title + description + text meta) stays reachable.

### Changed
- `ScopeHeader description` renders with `white-space: pre-line`: a "\n" in
  the text is now a line break (it collapsed to a space before).

## [2.391.0] — 2026-09-24

In-document calls (realtime-examples `docs/design/document-calls/SPEC.md` §3,
mockups 01–06). Everything is additive.

### Added
- **Composites** (`/video`): `StartCallDrawer` (01), `CallDock` (02, + `formatCallElapsed`),
  `CallSettingsDrawer` with `CallCaptionsSettings` (03b/04), `AudioVideoSettingsForm` (03b),
  `IncomingCallPopover` with `compact` / `busy` (05/05b), `DocumentCallPanel` (06). Pure props in,
  callbacks out; the PLAN §7 test ids are on the elements.
- **Leaves**: `EditableHeading` (`/shared`); `DeviceToggleSelect` (+ `MediaPermission`, `DeviceOption`),
  `AudioLevelMeter`, `VolumeSlider`, `MediaPrecheckRow`, `ReviewDocumentList`, `CollaboratorCheckList`,
  `CallPeopleList` (+ `callPersonStatus`) (`/video`).
- **Adapter**: `WrappedAudioVideoSettingsForm` bound structurally to RM `useMediaDevices` +
  `useAudioVideoSettings`; `mediaEffectsChangeCount(controller)` for the Effects footer.
- Icons: `SpeakerIcon`, `MonitorIcon`, `ExpandIcon`, `PhoneCallIcon`; `SettingsGearIcon` now exported.

### Changed (additive props)
- `FollowBanner` / `FollowModeBar`: `location` (" · Session flow") and `appearance="bar"` (the in-call
  follow bar with "Stop following"); `FollowModeBar` gets `data-testid` (default `follow-bar`).
- `CallTileRow`: `highlightedId` (accent ring for the followed person), `variant="dock"` with
  `tileHeight`, `overflow` (`collapse` → `+N` tile past `maxVisible`, or `scroll`), and per-tile
  `cameraOff` / `audioElement` so a camera-off person's audio keeps playing.
- `MediaEffectsTray`: `layout="grid"` (thumbnail grid in the page theme, `columns`, `thumbnailStream` /
  `thumbnailSrc`, filter `cssFilter`, "More...", `onSelectCustomBackground`, `backgroundsUnsupported`).
- `MediaEffectsPreviewPanel`: `variant="surface"` ("Preview · Only you", hint, grid tray) and
  `showFooter`. The Wrapped effects adapters pass these through and forward `cssFilter`.
- `ContextColumn` panels: `chrome: 'bare'` (no tab row) and `width: 'drawer' | 'drawer-wide'`
  (340→380px / 360→400px at ≥1440px).
- `Drawer`: a docked drawer never outgrows its column (`max-w-full`); `headerClassName`,
  `titleClassName`, `footerClassName`, `closeTestId`.

### Stories
- `Video/Document calls/*` (CallDock, CallSettingsDrawer, StartCallDrawer, IncomingCallPopover,
  DocumentCallPanel, Pieces), `Video/CallTileRow`, `Shared/FollowBanner`, `Shared/EditableHeading`,
  `Doc editor/FollowModeBar`, `Layout/ContextColumn`; new variants in `Shared/Drawer`,
  `Video/MediaEffectsTray`, `Video/MediaEffectsPreviewPanel`, `Video/MediaIcons` — light and dark.

## [2.390.4] — 2026-09-25

### Changed
- `DropdownMenuItem disabled` finishes the contract 2.390.3 started. The
  `disabledReason` is now the row's visible secondary line (it replaces
  `description` while disabled), still its tooltip, and its
  `aria-describedby` — the label alone is the accessible name. The row
  stays focusable with `aria-disabled="true"`; click, Enter and Space never
  run `onSelect`, and a disabled `submenu` row does not open. The same holds
  for `checked` (menuitemcheckbox) rows and rows inside a flyout.

### Fixed
- Arrow/Home/End navigation in `DropdownMenu` stepped over
  `menuitemcheckbox` rows; they are in the cycle now.

## [2.390.1] — 2026-09-25

### Removed
- The `./photo-editor` subpath (PhotoCompareCanvas, PhotoEditorShell,
  PhotoEditorTopBar, PhotoFilmstrip, the edit-op model and WebGL2 adjust
  renderer, 2.389.9–2.389.14). It was built for the wrong project. The
  composer's prompt card (`toolbar="prompt"`, `documentMenu`, `modeRowStart`,
  `sendShortcut`, `defaultCommand`) stays: 2.390.0's `basic` preset builds on it.

## [2.390.0] — 2026-09-25

The Initiatives redesign's library batch (agentcore
`docs/design/initiative-{overview,work,mine-empty}-mockup.png`). Every prop is
additive and every default renders exactly as before. Composed end to end in
Storybook as `Layout/ExplorerLayout › Initiative overview | Initiative work
item | Initiatives mine empty`, checked at 1642×958 against the mockups.

### Added
- `ScopeHeader titleSize="lg"` (28px bold h1), `description` (the summary line
  under the title), `peopleStyle="names"` ("Nora DaSilva · Owner   Layla
  Hassan, Eli Garcia · SMEs" instead of avatar groups), `linkStyle="button"`
  (an outlined "Repository ↗") and `statsPlacement="below"` (the stats on
  their own 15px line — the condensed header over a work item).
- `ExternalLinkIcon` — ↗ with no box (`PopOutIcon` is the boxed one).
- `ExplorerLayout paneFooter` — a non-scrolling band under the pane only (a
  docked composer), `railBack` ("‹ Initiatives" above "Work 11") and
  `railCountStyle`; underneath, `WorkspaceRail back` / `countStyle="plain"`
  and the `WorkspaceRailBack` type.
- `GroupedList groupCountStyle="plain"` — "In progress 9" without the chip.
- `WorkListView toolbarLayout="inline"` (search + filter on one row, sort
  below), `sortStyle="menu"` ("By priority ⌄"), `metaStyle="text"` ("Bug · Eli
  Garcia · 2 points", no avatar or chips), `pointsLabel="points"`,
  `signalDisplay="meta"` (the signal's words without the leading dot), and
  pass-through `currentStyle` / `groupCountStyle`; `WorkListItem.kindLabel`
  and `WorkListItem.tag` (a toned chip at the row end, "Blocked"); the
  `WorkListMetaStyle` type. `WorkListToolbar` takes the same two toolbar props.
- `Banner` (callout) `accent="bar"` (3px tone bar on the left), `meta` (a
  third line — "Blocked · Eli Garcia · 2 points") and `size="lg"` (17px title
  over a 15px body, the action level with the title).
- `StatStrip variant="inline"` ("**18** / 52 points delivered | **2** agents
  running | **$1.73** spent of $95 allocated", dividers, no card, a rule under)
  and `StatStripItem.progress` (a bar under the cluster; nothing drawn without
  a max above zero).
- **`ActionRowList`** (work/, root export) — a short ruled list where each row
  is one button or link: title, one-line description, right-aligned meta, a
  chevron, then a footer ("Plan next", "See all 11 work items →"). Disabled
  rows keep a reason; an empty list shows `emptyLabel` or nothing.
- `KeyValue` `items[].action` (a control at the row end), `items[].muted`
  (tertiary value for an absence) and `divided` (ruled 15px rows — "Complete
  the brief").
- `EmptyState align="start"`, `size="lg"` (24px bold), `actionsDirection="row"`,
  `EmptyStateAction.variant="link"` and `details` (a ruled "How this view
  works" block with its own action); the `EmptyStateDetails` type.
- `DetailSection` (heading) `size="lg"` (19px section heading) and
  `description`; `OutcomeSection size="lg"` passes it through with a 15px body.
- `ComposerReference.marker="dot"` — a brand dot instead of the document glyph.
- `WorkItemMetaBar flags` (toned read-only tags after the status),
  `layout="divided"` (status · flags · owner · points · priority, ruled, 15px)
  and `priorityStyle="tag"` ("High priority"); the `WorkMetaFlag` type.
- `Disclosure hint` (muted text after the summary) and `size="lg"` (a
  19px heading summary — "› Run setup   SME or release manager required to
  dispatch"). `Disclosure` / `DisclosureProps` are now exported from `/shared`
  as well as the root.
- `RichChatComposer toolbar="basic"` — the docked card as a light prompt box:
  B, I, code, link, attach, a divider, then `toolbarExtras`; lists, quote and
  strikethrough under the mode menu → Formatting; the mode as a boxed picker
  without a glyph, the input in a bordered well, no rule over the strip. (Not
  `prompt`: 2.389.11 took that name for the photo editor's command card.)
- `RichChatComposer referencesPlacement="start"` — the draft's chips right
  after the mode menu ("Agent ⌄ · ● Observability Platform ×") instead of at
  the row's end.
- `SendIcon` (a paper plane) — the `basic` box's Send leads with it.

### Fixed
- `EmptyState` action buttons rendered at weight 400: `font-[inherit]` read as
  a font weight to tailwind-merge and dropped `font-semibold`. Now
  `[font-family:inherit]`.
- `WorkspaceRail` actions keep their own width — a full-width control (a
  `Select`) in `actions` squeezed the title to nothing.
- `EditorShell variant="work-item" titleSize="lg"` sits the meta bar 4px
  closer to the title.

## [2.389.12] — 2026-09-25

### Added
- `RichChatComposer defaultCommand` — the prompt card shows that command's chip on a
  draft that names none; switching from the chip writes the new trigger in.

## [2.389.11] — 2026-09-25

### Added
- `RichChatComposer toolbar="prompt"` — the docked card as a written prompt (the
  photo editor's assistant): no formatting strip; its foot is `/ Commands` (a
  menu of the host's commands), `# Context` (opens the `#` menu at the caret),
  `toolbarExtras` (a mic), the send key and a round Send. A bare command
  (`/adjust`) hides from the text and shows as a chip whose ▾ switches command.
- `RichChatComposer documentMenu` — the `#` menu as an "Add context" card: title,
  the typed query in a search field with clear, rows grouped by the candidate's
  new `group` with a `glyph` and hint, and ↑↓ Choose · ↵ Insert · esc Close.
- `RichChatComposer modeRowStart` (a host mode select at the head of the docked
  card) and `sendShortcut="mod-enter"` (⌘/Ctrl+Enter sends, Enter is a newline).
- `PersonIcon`, `ArrowUpIcon`.

## [2.389.7] — 2026-09-25

### Added
- `NewDocumentModal initialShape` — the blank picked on open ("New ▾ → Diagram").

### Changed
- `DropdownMenu triggerVariant="primary" | "secondary"` and `FilePickerButton`
  are 36px (the All documents header); `DocumentResultList`'s ⋯ shows on hover
  or focus only, rows are 10px taller-padded instead of 12.

## [2.389.6] — 2026-09-25

The realtime-examples All documents page (documents-detail lane L2).

### Added
- **DocumentResultList** — search results as rows: kind mark, bold title, a
  one-line summary, folder · age; Add/Added toggle and ⋯ menu outside the open
  target; roving tab stop (arrows/Home/End, Enter opens); the current row is
  tinted with a left bar; rows drag the prompt-context payload.
- **AttachToggle** (`aria-pressed` "⊕ Add" / "✓ Added"), **FilePickerButton**.
- Icons: `UploadIcon`, `CheckIcon`, `PlusCircleIcon`, `SlidersIcon`.
- `FileKindMark variant="app"` (a deck is the red "P" slide tile),
  `SearchInput size="lg"` (44px) + `onKeyDown`, `DropdownMenu triggerVariant`
  (`primary` / `secondary` / `link`), `FilterPopover icon` + `size="lg"` icon trigger.

## [2.389.4] — 2026-09-24

Guide-record polish against the Distillation mockup. Defaults for other
callers are unchanged except where noted.

### Changed
- **Banner** `layout="callout"` paints a new pale callout surface —
  `--color-{success,warning,danger,info}-callout` and `-callout-border`
  (light and dark in `styles.css`) — instead of the tone's `-bg`/`-border`.
  A host that pushes `-bg` saturated so pills read at a glance (the portal's
  `#fef3c7` / `#fbbf24`) turned the paragraph-wide warning callout into a
  yellow slab; the mockup's is cream (`#fff8eb`, border `#f5d9a8`). The root
  now inks `text-text-primary`. `inline`/`stacked` banners are untouched.
  Override the new tokens to re-tone callouts without touching pills. New
  story `Shared/Banner › Callout tones`.
- **RailSectionHeader** `count` is a small rounded bordered pill — the
  sub-nav's count shape (`border-border bg-surface text-text-tertiary`) —
  instead of a borderless soft neutral chip, which on a panel-coloured rail
  read as plain text. Same test id and `aria-label`. New story
  `Social/RailSectionHeader › With count on rail`.
- **ExplorerLayout** `paneHeader` spans the pane only, not pane + aside. The
  aside is now a full-height column beside it, so a `ScopeHeader
  variant="crumbs"` band's hung controls (All repositories · Open Library)
  can no longer land on a `ContextColumn`'s tab row. No consumer change:
  same prop, same test ids (`-pane-column` now holds the band and the pane).
- **ScopeHeader** `variant="crumbs"` hangs its controls 10px past the band
  (was 14px), so they stay inside an `EditorShell` head's 12px top padding
  and never reach a long title; the title sits 4px lower. New story
  `Layout/ExplorerLayout › Guide record sources open` (measured: controls
  end 24px left of the aside and 2px above the title).

## [2.389.1] — 2026-09-24

### Fixed
- **RichChatComposer** no longer loops ("Maximum update depth exceeded") in a
  box whose width comes from its children — an `auto` grid column, an
  inline-block. The size class keys off the composer's own width, and there
  that width depends on the size class: with a long placeholder the medium
  layout measured 323px (reads as narrow) and the narrow one-row layout 413px
  (reads as medium), so the every-commit re-measure flipped between them
  forever. The composer now records what each class measured in the current
  space; when a class re-measures the same width and the class it points at
  has already bounced back, it keeps the layout on screen (the box is sized
  to it, so it fits). A changed measurement — a real resize — clears the
  record. The ResizeObserver now reads the border box, as the layout effect
  does, so the two readings of one layout agree. New story
  `Social/RichChatComposer › Content-sized container`.

## [2.389.0] — 2026-09-24

The Distillation guide-record redesign's library pieces. Every prop is
additive; existing callers render exactly as before.

### Added
- **WarningIcon** (`ui/Icons`, root + `/shared`) — a triangle with an
  exclamation mark, stroke on `currentColor` like `InfoIcon`.
- **Banner** `icon?: ReactNode | true` — a leading glyph; `true` draws the
  tone's default (warning triangle for `warning`/`error`, info circle for
  `info`, check for `success`) in the tone's solid ink. And
  `layout: 'callout'` — a full-width notice in a document body: icon · title
  over body · trailing action, vertically centred; title in primary ink, body
  in secondary, only the icon carries the tone. Role/live region unchanged
  (`alert` for warning/error).
- **EditorShell** (`/doc-editor`) `titleSize?: 'md' | 'lg'` — `lg` is a
  record headline, 26px semibold. `tabsTrailing?: ReactNode` — at the right
  end of the tab row, above the underline ("Sources 4"), testid
  `<id>-tabs-trailing`.
- **ExplorerLayout** `paneHeader?: ReactNode` — a non-scrolling band right of
  the rail, above the pane and the aside (testid `<id>-pane-header`). Unlike
  `header` it does not span the rail.
- **ScopeHeader** `variant?: 'default' | 'crumbs'` — `crumbs` is the crumb
  line only (no h1, stats, people or tabs), with `controls` / `link` / `menu`
  hung on the right between the crumb and the headline that follows. `title`
  is now optional (not drawn by `crumbs`).
- **GroupedList** `groupHeading?: 'title' | 'label'` — `label` renders group
  headers as 11px uppercase section labels with a plain muted count
  ("RECENTLY UPDATED 4"). `currentStyle?: 'tint' | 'bar'` — `bar` adds a 2px
  inset primary bar to the current row at `sm` too.
- **SourceCard / SourceList** `meta?: string` — a quiet line under the title
  that replaces the age. `layout?: 'card' | 'row'` — `row` makes the whole row
  one control (button with `onOpen`, link with `href`; accessible name = the
  title), the kind mark in a 32px bordered tile, a 13px medium title, a 12px
  tertiary meta line and an aria-hidden trailing chevron. `SourceList`
  forwards `layout` (and draws a rule above and below a `row` list).
- **ComposerReference** `menu?: readonly DropdownMenuSection[]` +
  `menuLabel?: string` — the chip becomes a `DropdownMenu` trigger (glyph ·
  label · chevron, square corners) and draws no remove button even when
  `onRemove` is passed. Works in `RichChatComposer`'s `modeControl="menu"`
  row, the compact row, and the idle one-row composer.
- **RailSectionHeader** `count?: number` — a neutral chip at the right of the
  heading, shown for any number (0 included), collapsed or not.

### Notes
- An icon inside `Button variant="link"` needs `className="inline-flex
  items-center gap-1"`: preflight makes `svg` block-level, so the arrow of
  "View run →" otherwise drops to its own line.
- Stories: `Layout/ExplorerLayout › GuideRecord` composes the whole record;
  per-component stories for each addition.

## [2.388.2] — 2026-09-24

### Fixed
- **TypedNodeCanvas** re-fits when the canvas itself changes size — a details
  pane opening beside it (`CanvasPaneLayout`), a column widening — as long as
  the reader has not zoomed or panned. `fitView` on mount only fit the first
  size, so a pane that opened a frame later left the graph at 100% running off
  the new edge (distillation Activity's tier graph lost its Library node under
  the run inspector). A zoom or drag by the reader pins their view; **Fit**
  re-arms the auto-fit. Resizes under 8px are ignored.
- The export-surface snapshot records `WorkOmittedGroup`, which 2.388.1
  shipped without recording.

## [2.388.0] — 2026-09-24

The Distillation redesign's library pieces (Knowledge / Review / Activity).

### Added
- **ProcedureSteps** (`Work/ProcedureSteps`, root) — a procedure's ordered
  steps, drawn once. Without a `status` a step shows its number in a soft disc;
  with one it shows the outcome (done ✓, failed !, pending ○, skipped dashed ○,
  worded for a screen reader via `PROCEDURE_STEP_STATUS_LABELS`) and keeps the
  number as text beside the title, plus an optional `note` ("Not reached in
  this run."). `numbered`, `size: 'sm' | 'md'`, `onSelectStep`, `emptyLabel`.
- **KeyValue** (`Shared/KeyValue`, root + `/shared`) — labelled facts as a real
  `<dl>`: `items: { label, value, mono?, title? }[]`, `layout: 'row' | 'stack' |
  'grid'` (default `row`), `labelWidth` (row, default `w-28`). The upstream of
  the portal's local `KeyValue` (queue row 57).
- **TypedNodeCanvas** (`/graph`, root) — an xyflow canvas of host-drawn typed
  nodes (`renderNode`): `ltr` rank layout (or `manual` / per-node `x`,`y`),
  handles chosen from where the ends sit, tone-coloured smooth-step edges with
  `label` / `detail` / a selectable job `marker`, a moving dot only for
  `animated` edges and never under reduced motion, zoom controls and a
  `caption`, keyboard-selectable nodes (Tab, Enter/Space, arrows/Home/End), and
  `listFallback` — the list equivalent with every node, edge and selection.
  `layoutTypedNodes` / `rankTypedNodes` are exported. Closes queue rows 23/26/32.
- **CanvasZoomControls** (`/graph`, root) — the standalone "− 100% + ⛶"
  cluster: `zoom`, `onZoomIn`, `onZoomOut`, `onFit`, `minZoom` / `maxZoom`
  disable the buttons at the limits.
- **SourceCard / SourceList** (`Work/SourceCard`, root) — evidence rows: kind
  mark, title (button with `onOpen`, link with `href`), "9h ago"
  (`formatSourceAge`; nothing for a bad timestamp), two-line excerpt, `current`
  marker. `SourceList` takes `items`, `emptyLabel` and a shared `onOpen`.
- **StatStrip** — `connectors?: { label, tone? }[]` draws a labelled arrow
  between neighbouring clusters (a tier flow) in place of the divider;
  `StatStripItem.status?: { label, tone? }` adds a dot + worded health line;
  `StatStripItem.title` is a native tooltip (queue row 39). Stories added.
- **ScopeHeader** — `tabs[].dot?: 'warning' | 'danger' | 'info' | true` (an
  attention dot with an accessible name) and a `controls` slot (a repository
  selector) before the link.
- **MarkdownView** — `scale?: 'sm' | 'md' | 'lg'` (queue row 43). `md` (default)
  is the unchanged rendering; `sm` steps headings to 17/15/14/13px over a 13px
  body; `lg` is a 15px body with 24/20px headings.

### Fixed
- The export-surface snapshot records names earlier releases shipped
  unrecorded (`CanvasPaneLayout`, `NoAccessState`, `CommentReplyComposer`, …).

## [2.387.1] — 2026-09-24

### Changed
- **CollapsedIconStrip** — `onExpand` is optional. Without it the strip keeps its header row but shows no
  expand button, for surfaces that no longer have an expanded sidebar to open.

## [2.387.0] — 2026-09-23

### Added
- **WorkActivityList** (`Work/WorkActivityList`) — a work item's history,
  newest first: status changes, agent runs, estimates and comments, one line
  each with who and when, optionally linking to the run or PR. Static, unlike
  the rotating `ActivityFeed` ticker. Sorts its own events; an unparseable
  time sorts last and prints no time. Loading, empty and error states.
- **RunDraftPanel** — `confidence.basis: 'prior'`: a range the host stands
  behind without history (a per-model-tier bracket) is shown with zero runs
  and noted "Low confidence · No prior runs", instead of being replaced by
  "No prior runs". The default (`'runs'`) is unchanged.
- **RunDraftPanel** — `budget` also accepts `{ unit: 'usd', usd, onChange,
  hint? }`, a dollar cap the host enforces (e.g. a dispatch route's per-run
  cap). The token budget is unchanged and remains the default.
  `RunDraftTokenBudget` / `RunDraftUsdBudget` are exported.

### Fixed
- The export-surface snapshot records names earlier releases shipped
  unrecorded (`WorkListFilters`, `COMMENT_MARGIN_STORAGE_KEY`,
  `readCommentMarginPreference`, `useCommentMarginPreference`), so
  `export-surface.test.ts` is green again.

## [2.386.11] — 2026-09-23

### Fixed
- **CanvasDocumentView** — under the card toolbar the ruler row drops its own 12px top padding; the
  card's 8px of workspace is the gap, so the sheet starts where the Folders mockup's does.

## [2.386.10] — 2026-09-23

### Added
- **`useCommentMarginPreference`** (`/doc-editor`) — a page's comment margin, remembered per browser,
  CLOSED until the reader opens it (the Folders mockup shows "Comments 3" and no margin). An explicit
  stored choice ('1' / '0') always wins; `show()` opens it when a thread is opened. Same storage key the
  gateway host used (`doc-editor:canvas:gutter-visible`).

## [2.386.3] — 2026-09-23

### Changed (the Folders mockup, pass 2)
- **SearchInput `size="md"`** — a 36px field, 15px text, 18px glass.
- **Chip `size="md"`** — `leading-4`, so a count pill no longer grows a 32px tree row to 36px.
- **WorkspaceRail** — the prominent heading's count is the `md` pill.
- **ContextColumn** — the folded strip is 48px wide with 32px buttons, 20px glyphs, and a full-width rule under the expand chevron.

## [2.386.1] — 2026-09-23

### Added (the Folders mockup's explorer and rails)
- **TreeView `size="md"`** — 15px titles on 32px rows, an 18px indent step, a
  selected row in the brand tint with brand ink, and the row ⋯ laid over the
  meta on hover instead of reserving an empty slot.
- **FileKindMark `variant="glyph"`** — the tree mark: no box, an 18px glyph in
  neutral ink; a deck as three coloured bars, a diagram as two linked nodes.
- **Chip `size="md"`** — the 12px count pill beside a 15px tree row.
- **ConversationShelf `size="md"`** — 15px labels, 18px icons, 36px rows.
- **WorkspaceRail / ExplorerLayout width `ml`** — 320px.
- **CollapsedIconStrip** — `active` (tinted square + 3px brand bar),
  `headerHeight` (the menu button in the header row), section handlers optional.
- **AppShell `sidebarFullHeight`** — the sidebar runs the window height and the
  header row starts beside it.

### Changed
- **ContextColumn** — a panel with `entries: []` puts nothing on the folded strip.

## [2.385.9] — 2026-09-23

### Fixed
- **WorkNodePane** — the pane's ways out ("Open presentation" and the host's
  detail actions such as "Open presentation at v1" / "Open run") live in the
  pane's fixed footer beside "Reference in chat", not at the end of the
  scrolling body. At 1280x720 the deck's preview, slide picker and sources
  pushed "Open presentation" under the footer. "Open presentation" is now the
  footer's primary button; the footer carries `<testid>-footer`.

## [2.385.8] — 2026-09-23

### Fixed
- **EditorShell** — the kind mark and the title no longer split across rows in
  a narrow editor column (~500 px, the Work view at 1280x720). They sit in one
  non-wrapping group (`editor-shell-title-group`, `flex min-w-0 max-w-full
  flex-initial flex-nowrap`) whose title truncates; only the status pill and
  folder path wrap to the next row when there is no room. Wide layouts are
  unchanged (same 8px gaps, pill right after the title). The star button is
  part of the group and no longer shrinks.

## [2.385.7] — 2026-09-23

Closes the library-side gaps between the live Documents page editor and the
Release plan mockup (1672x941).

### Changed
- **Page typography** (`.doc-page .ProseMirror`, both paginated and not): body
  16px/24px with 8px between paragraphs; H1 36px/44px bold, 4px below; H2
  22px/28px bold, 20px above / 8px below; H3 18px/24px; list items 4px apart;
  table cells `6px 12px`, tables and images 12px out. The paragraph directly
  under the document's opening title (`> h1:first-child + p`) is its byline:
  17px in `--color-paper-ink-muted`. The sheet's vertical padding is 48px
  (paginated; `py-8 sm:py-10 lg:py-12` unpaginated), was 105.6px / 96px.
- **Pagination grid**: `--doc-line` is 24px (was 26.4px), and heights/margins
  snap to a new 4px `--doc-grid` (`DOC_GRID`, `flowCanvasPages({ grid })`)
  instead of a whole line. `DOC_CONTENT_TOP` (= every page's margin) is 48px.
  Since pages got margins every block is pushed whole, so the 26.4px row was
  only costing space; the flow still scores 0 bisected seams and 0 margin
  invasions in the seams simulation.
- **`DocumentToolbar` `size="auto"` fits by measurement**: every group stays
  on the bar while the row has room, and only what does not fit goes behind
  ⋯ (clear, align/spacing, rule/table, indent, colour, image, task list,
  strike/code, then the style selects). `data-size` and
  `useDocumentToolbarSize()` still report the breakpoint. The image button is
  its own group, next to the link.
- **`EditorShell` title row**: the file-kind mark is 32px (`FileKindMark`
  gains `size="xl"`), and the editable title no longer holds `min-w-[10rem]`,
  so the status pill sits right after a short title.

### Added
- `RichChatComposer` `toolbar="editor"`: B, I, code, link, bulleted list,
  quote, attach, a divider, then `toolbarExtras`; strikethrough and numbered
  list under `?` → Formatting.
- `RichChatComposer` `moreActions` / `moreActionsLabel`: a ⋯ menu before
  `submitLead` and Send for actions on the attached thing (page actions).
- `InlineEditableText` `fitContent`: the editing input sizes to its value.

## [2.385.6] — 2026-09-23

### Added
- `CodeBlock` `theme="console"` — the theme-invariant `--color-code-*` surface
  (bg `code-bg`, text `code-text`, syntax colours from the code family) for a
  block inside a permanently-dark console. `theme="dark"` paints the inverse
  surface, which flips to #f8fafc in dark mode and read as a light slab inside
  the pipeline editor's Live output drawer. Contrast test pins every console
  colour at >= 4.5:1 on `code-bg`.

## [2.385.5] — 2026-09-23

### Added
- `WorkEntityList` `statusLabelOf` — a status word in place of a node's raw
  status; `WorkActivityGraph` passes `workPauseLabel` over the activity's
  details, so the Activity list (the narrow panel's view) reads
  "run · Paused at write" / "run · Needs approval" like the card and pane
  (NFR #126).

## [2.385.4] — 2026-09-23

### Changed

- **Lifecycle status in sentence case** — `DocumentLifecyclePill` and the header's status pill
  read "Draft", "In review", "Changes requested", "Approved", "Finalized" (were lower case); the
  legacy-claim banner and `DocumentReviewPanel`'s review-state chip ("Pending", "Changes
  requested") follow suit. Matches the Documents mockups.
- **`RichChatComposer` menu mode hides the command the chip names** — with `modeControl="menu"`
  and a picked argument ("/workflow ⟡ presentation-deck"), the command line is hidden in the
  input by a ProseMirror decoration (`data-command-prefix="inline"` for a prefix on the
  instruction's line, `"block"` for a host-written command paragraph) so only the chip and the
  instruction show. The draft is not rewritten: `draft.html`, `onDraftChange` and the sent `text`
  still carry `/workflow <id>`, so hosts that parse the command are unaffected. The caret is kept
  after the hidden text, and Backspace there removes the whole command (and the chip). Other mode
  controls, and a command with no picked argument, show the typed text as before.
- **`EditorShell` title sizes to its words** — the title (and the editable title) no longer
  `flex-1 basis-0` when there is no `path`, so the status pill sits right beside it instead of at
  the row's far end; a long title still truncates.

---

## [2.385.3] — 2026-09-23

### Added

- **`DocumentLinkClick`** (`./diagram`, beside the other page-body extensions) — a plain click on
  a link to another document in the app opens it through the host's router (`onOpen(path)`)
  instead of the Link mark's `window.open(href, '_blank')`. The host says which hrefs are its own
  (`resolve`, default: same-origin `/documents/<id>…` via `sameOriginDocumentPath`); every other
  link, and any modified or middle click, keeps the Link mark's behaviour. A `handleClick` prop at
  priority 1001, above Link's 1000. For the Documents folders mockup's "Sources: Release plan ·
  Auth architecture" line (realtime-examples R5).

---

## [2.385.2] — 2026-09-23

### Added
- `workPauseLabel(status, pause)` and `WorkActivityNodeDetail.pause` (graph/work,
  NFR #126): a waiting run says why — "Needs approval" for an approval gate,
  "Paused at <step>" for a breakpoint — as the card's status line or, beside a
  host line, a warning chip; the card's accessible name carries it too. The
  words match `AgentRunCard` / `RunSummaryPanel` and the breakpoint overlay.
  Ignored unless the node is `waiting`.

## [2.385.1] — 2026-09-23

### Added

- **`WorkspaceDocumentHeader` `actionsLayout="menu"`** (`variant="actions"` only). The Documents
  mockups' editor head is "Share · (i) · ⋯": the owner line ("Owned by …"), the mode ("Editing"
  with its reason), My items and the lifecycle actions (Submit for review, Take ownership, …) move
  into the ⋯ menu as its first sections, with the same confirmation dialogs. The row keeps the
  room / call pill, the share status and ⋯; the comment chip is dropped because the shell's
  Comments tab carries the count. The default `cluster` layout is unchanged.
- **`DOCUMENT_MODE_LABELS`** — the mode pill's words per mode, for a surface that states the
  mode without the pill.

---

## [2.385.0] — 2026-09-23

### Added

The library half of the Documents four-pane redesign (realtime-examples
`docs/design/documents-detail/PLAN.md`, WS-A), plus the folders view's pieces. New components
live in `src/components/work/` and are exported from the root. Stories: `Work/*`, including two
composed screens (`Work/Documents detail view`, `Work/Documents folders view`) built only from
these parts.

- **`WorkListView`** (+ `WorkListToolbar`, `toWorkListRows`). The Work column: "Work 11", +,
  collapse, search, sort `Select`, `FilterPopover`, and `GroupedList` groups by status. A row has a
  checkbox (never nested in the row button), the owner avatar and "5 pts · Layla Hassan", toned
  chips ("Bug"), and a status dot in place of the checkbox for a running agent (a named button when
  it has `onClick`) or an item awaiting review. Loading, error with Retry, empty, and no-match
  states. Reordering is off while a query filters the list. `chrome="embedded"` drops the title row
  for a host that titles the rail itself.
- **`GroupedList`**: `row.leading`, `row.meta`, and `onReorder(rowId, toGroupId, index)` with
  `canReorder` / `reorderLabel`. Alt+↑/↓ moves a row within its group; Alt+←/→ moves it to the end
  of the previous or next group. Each move is announced politely. Pointer drag goes through
  `@dnd-kit`, reached only by a dynamic import of `GroupedListSortable`, so the root entry never
  requires the optional peer. Without the peer, the list is keyboard-only rather than broken. Output
  without these props is unchanged.
- **`ScopeHeader`**: a breadcrumb, the title with a `StatusPill`, "18 / 52 points delivered · $1.46
  spent", labelled `PresenceAvatars` groups, an optional link, a ⋯ menu, and tabs with counts.
  Nothing is drawn without data: progress needs a total above zero, and spend is a typed number.
- **`WorkItemMetaBar`** (+ `WorkSearchPicker`): status, points, owner (a people picker over
  `onSearchPeople`) and priority. Each field has a `readOnlyReason` and a `pending` state, and the
  honest empty values are "No status", "— pts", "Unassigned" and "No priority".
- **`OutcomeSection`**, **`ChecklistSection`**, **`LinkedItemsSection`** and **`CommentList`**, each
  on `DetailSection`. They cover editing the text in place; the checklist's toggle, add, edit,
  remove, move and per-item pending; links with a kind mark, a status pill and an "Add link" picker;
  and read-only notes showing the name, the role (only when there is one), the relative time and
  "View all".
- **`RunDraftPanel`** (+ `EstimateRow`, `AccessNotice`). The panel has a header with the state and
  a collapse control, the workflow target, `Select` rows, and cost and duration estimates. It also
  holds the enforced token budget with a derived "≈ $x at <model> prices" line, an "Advanced"
  `Disclosure`, the access notice, and Save and Dispatch with visible disabled reasons, a verbatim
  error, the "Nothing runs until you authorize it." footnote, and a `live` slot for the
  `AgentTaskCard` after dispatch.
  - There is no free-text money. Estimates arrive typed: `{kind:'range', low, high, unit:'usd'|'ms'}
    | {kind:'none', reason} | {kind:'loading'}`.
  - A range with a sample size of 0 is replaced by "No prior runs".
  - Confidence reads from the sample size.
- **`formatCompactAge`**: "now", "6m", "6h", "1d", "3w", then a short date, for the explorer's
  right-hand age on file rows. It returns `undefined` for a missing or unparseable time.
- **Slots on existing composites**, all additive:
  - `ExplorerLayout.header` spans the rail, the pane and the aside.
  - `ExplorerLayout` / `WorkspaceRail` gain `railWidth`/`width` `'lg'` (368px),
    `railCount`/`count`, and `railHeading`/`heading` `'prominent'`, an 18px title with a count.
  - `EditorShell` gains `subtitle`, `metaBar` (between the title and the tabs), `crumbsTrailing` (a
    type chip and an id beside the crumbs) and `path` (the folder path inline after the status
    pill, every segment a link).
  - `Breadcrumbs.lastIsCurrent`.
  - `Select variant="ghost"`: a right-aligned value with no box, for label/value rows.
  - `CommandPaletteHint` `label` and `size="md"`: the top bar's "⌘K Search" trigger. No separate
    `SearchTrigger` was added, because this already opened the palette and owned the hotkey.
  - `ComposerCommand.icon`.
- **Icons**: `InfoIcon`, `ArrowRightIcon`, `PeopleIcon`, `GripIcon`, `FilterIcon`.

### Changed

- **`RichChatComposer` with `modeControl="menu"`** now names an active command as a chip on its own
  line under the mode row, "/workflow ⟡ migration-plan", instead of the tinted strip across the
  card's top. The picked argument's icon and label replace the command's own label while the label
  is intact in the draft. The chip keeps the same `role="status"` and test id. Other mode controls
  keep the strip.

## [2.384.4] — 2026-09-23

### Fixed
- **RichChatComposer, one-row layout:** the message line sat 5.5 px above the mode chip and Send (measured: text centre 822.5, controls 828) and the bar was 42 px tall where its controls need 32. In the single-row body the editor is now a 2rem box with the padding that centres one line in it, so the text lines up with the chip and Send at every line count and the bar is 34 px.

## [2.384.3] — 2026-09-23

### Fixed

- **`ChatPanel`: a viewport-filling chat column no longer scrolls the page.** The read receipts'
  visually-hidden reader list is `position: absolute`, and the transcript scroller
  (`chat-panel-messages`) was not positioned, so the span's containing block was the wrapper
  outside the scroller: it escaped the scroller's clip and sat at its unscrolled static position,
  8 px below a 1640×960 viewport and 280 px below a 1280×720 one. The scroller is now `relative`,
  the containing block for everything absolutely positioned in the transcript.

## [2.384.2] — 2026-09-23

### Added

- **`CommentIcon`.** A speech bubble with two lines of text: comments ON something, beside
  `ChatIcon`'s plain bubble for a conversation. The documents rail folds the workbench's Comments
  entry next to the Conversation panel, so the two needed different glyphs; `QuoteIcon` was tried
  and reads as "55" at 14px.

## [2.384.1] — 2026-09-23

### Fixed

- **The Sources slide is a slide of the deck, everywhere.** The renderer appends a Sources slide
  after the spec's own, and the revision's `slideCount`, the `.pptx`, the run card and the reading
  view all counted it — the editor did not: "Slide 1 of 4" beside a Details panel saying "5 slides",
  and a reader's "Slide 5" that the editor's filmstrip had no thumb for. One rule now: a preview
  slide the host marks `generated: true` (`PresentationPreviewSlide.generated`, with its `title`)
  is a real slide the editor shows and counts but cannot change. `Filmstrip generatedItems`
  renders it after the deck's own slides, numbered on, selectable, with a lock and "Generated"
  in place of the drag handle and ⋯ menu (`data-generated`, `<prefix>-generated-<id>`,
  `<prefix>-generated-list`); the stage shows the renderer's picture with a one-line note
  (`<prefix>-generated-note`) and no form; the pager, ←/→/Home/End, Present's `slideIndex`,
  `onSelectedSlideChange` and the read-only view all step over the whole deck; the footer's
  `slideCount` is the whole deck and `selectedGeneratedSlide` names the generated slide on the
  stage (`selectedSlide` is undefined then, so a host dock can scope to the deck). A stale render
  of a slide that is no longer in the deck is not a locked thumb — only what the host marked.
  Adding a slide while the generated one is on the stage inserts after the last of the deck's own.
  The slide-cap meter still counts the deck's own slides — the cap is on what can be authored.

### Added

- **`ContextColumn` panel `entries`.** A tabbed panel (a workbench: task, comments, details) can
  list its parts, and the collapsed strip shows one icon per entry in place of the panel's icon,
  each with its own `badge`; pressing one opens the column to that panel and reports the entry
  (`onActivate(panelId, entryId)`; `<testid>-entry-<panel>-<entry>`,
  `<testid>-badge-<panel>-<entry>`). The open tab row is unchanged. This is the documents
  mockups' thin right rail: the page keeps the width until a comment or a task asks for the column.

## [2.384.0] — 2026-09-23

### Fixed

- **`FilterPopover` paints.** The panel was an `InlineMenu` — `position: absolute` in place — and
  `PipelinesListView`'s toolbar is a `Toolbar` row whose `children` slot is `overflow-x: auto`, so the
  open panel was clipped to the row's 39px: layout said visible, the screenshot showed nothing, and a
  hit-test at its centre landed on a list row. It is now an `InlinePopover`, the same machinery as
  `DropdownMenu`'s ⋯ menu: portalled to `document.body`, positioned from the button's rect, flipped
  above the button when there is no room below and slid back on screen at the viewport edges,
  focus-trapped (Tab cycles, focus returns to the button on close), `role="dialog"` with the
  `panelLabel` name, dismissed by outside click, Escape or tab-out. The API is unchanged; the
  `top-*` placements resolve to their `bottom-*` counterpart and let the flip decide. Test ids and
  the controlled `open` / `onOpenChange` behave as before.

### Added

- **`PipelinesListView` `frame?: 'card' | 'none'`.** `card` draws the mockup's frame — one border
  and radius around the toolbar and the groups, the toolbar ruled off from the list — with the header
  and the docked composer outside it. Default `none`, the current look. `data-frame` on the root and
  the `-frame` test id on the wrapper. Story `Pipelines/List/PipelinesListView › Framed`.

## [2.383.2] — 2026-09-23

### Fixed

- **`SlidesToolbar` is one row at every width.** The deck editor's toolbar wrapped to two rows
  (58px) in a 1280px window: the "Text style comes from the theme" note was shown by the WINDOW's
  width (`xl:`) rather than the bar's, and the row was `flex-wrap`. It now measures its own box,
  the way `DocumentToolbar` does (the shared `useMeasuredWidth`, a ResizeObserver, `null` = wide),
  and picks a layout from `SLIDES_TOOLBAR_BREAKPOINTS` (narrow < 600 ≤ medium < 900 ≤ wide,
  content-box px): at medium, Insert, Theme and the note move behind a `⋯` menu (the note as its
  heading — a sentence, not a row); at narrow, Layout and the chart's Bar/Line switch join them as
  checked rows. New slide, Undo/Redo, `end` and Present never leave the bar. `size` prop
  (`'auto' | 'wide' | 'medium' | 'narrow'`), `data-size` on the bar, `slidesToolbarSize` and
  `SlidesToolbarSize` are exported; the `-more` / `-more-menu` test ids address the menu, and the
  layout / insert / theme / chart-kind rows keep their ids wherever they render.

## [2.383.1] — 2026-09-23

### Changed

- **pipelines: a refused run or step offers no Retry/Resume.** A failure the platform classifies `Refused`
  (`errorCategory`), or marks `retryability: 'terminal'`, or spells `<step> <code>: <reason>` with one of
  `constraint-not-met` / `forbidden` / `revision-conflict` / `invalid-request` (a row written before the
  category existed), is a decision about inputs the run already holds — retrying or resuming re-runs the same
  step over the same recorded proposal and refuses the same way. So `PipelineRunReplayPage` renders NONE of
  "↻ Retry from failure" (header), "↻ Resume from here" (failure banner) or the per-step buttons for it —
  absent, not disabled — and `StepThread` drops both of its buttons even when the host passes both callbacks.
  The banner is titled `Refused (<code>):` with the message verbatim (`data-testid="refused-banner"`,
  `refused-reason`), the header carries a `Not retryable` chip (`refused-not-retryable`) whose title says why,
  the category chip takes `errorCategoryTone` instead of always danger, and the step's error section becomes
  `Refused (<code>):` on a caution surface (`step-refused-<stepId>`, `step-refused-reason-<stepId>`). Re-run
  (a new run from the original trigger) stays. `403 Forbidden` mid-sentence is an outage, not a refusal, and
  keeps every button. New `utils/runRefusal.ts` — `REFUSAL_CODES`, `refusalCodeOf`, `runRefusal`,
  `stepRefusal`, `refusalNotRetryableReason`, types `RefusalCode` / `RunRefusal` — is exported from
  `@connorhoehn/ui-components/pipelines` so a host gates its own affordances the same way. Tests:
  `runRefusal.test.ts`, `StepThread.refused.test.tsx`, `PipelineRunReplayPage.refused.test.tsx`.

### Fixed

- **pipelines: `usePendingApprovals`' console line names the URL it fetched.** On a failed load it logged
  `/api/observability/dashboard?include=pendingApprovals failed:` — a URL the hook has never fetched — and
  sent whoever read the console to the wrong endpoint. It now reads `usePendingApprovals: /api/pipelines/approvals
  answered 500` (the status the endpoint actually answered with) or `… answered nothing (request failed)` when
  the request failed at the transport. The user-facing banner is unchanged. Test:
  `usePendingApprovals.log.test.tsx`.

## [2.383.0] — 2026-09-23

### Added

- **`RichChatComposer toolbar="compact"`.** The editor's docked card strip is B, I, link, bulleted
  list, attach (when attachments are on) and the muted `/ commands` — no separators, the mockup's
  set; strikethrough, code, numbered list and quote move under `?` → Formatting, the menu the card
  already keeps its keyboard hints in, not a second `⋯` beside the first. The default `full` strip
  (the chat column's) is unchanged, every control stays the 28px box, and below wide both presets
  fold exactly as before. `ComposerToolbarPreset` is exported.

### Changed

- **Paper follows the theme.** `--color-paper-*` now flips in `[data-theme="dark"]`: the sheet is
  `#1e293b` with `#f1f5f9` ink (muted `#cbd5e1`, subtle `#94a3b8`, border `#334155`, hover
  `#293548`) — the whole family together, ink paired with surface as before. `CanvasDocumentView`'s
  sheet, `DocumentRuler`'s text column, a host's `.ProseMirror` paint, blockquotes, rules and code
  blocks all take the tokens, so they follow with no per-site change. `@media print` puts the light
  family back under both roots, so a dark-mode "Print to PDF" is still ink on white. `DocumentRuler`'s
  margins are `bg-workspace` (the desk), not `surface-inset`, which was 5/255 off white paper and
  3/255 off the dark sheet. This reverses the 2.35x-era "the doc body will always be white" call on
  the strength of the 2026-09-23 page-editor mockups; `darkTokens.test.ts` now pins the flip and
  the print reset. Stories: `Doc-Editor/CanvasDocumentView` → PaperLight / PaperDark,
  `Social/RichChatComposer` → CompactStrip.

## [2.382.0] — 2026-09-23

### Changed

- **doc-editor: `DocumentToolbar` keeps ONE row at every width.** It measures its own box and takes controls
  off the bar in a fixed order instead of wrapping: `wide` (≥ 1240px of bar) is the old bar; `medium` keeps
  the style selects, B/I/U, bullet/numbered and link and moves strike, inline code, the task list, the colour
  palettes, alignment, spacing, inserts and clear-formatting behind a `⋯` group; `narrow` folds the three
  selects into one `Style ▾` panel. New `size` prop (`auto` | `wide` | `medium` | `narrow`), `data-size` on
  the bar, and `useDocumentToolbarSize()` for whatever a host renders into `actions` — the page's Comment
  button becomes an icon beside the presence avatars below `wide`. `documentToolbarSize()` and
  `DOCUMENT_TOOLBAR_BREAKPOINTS` are exported. Measured: at a 1280px window the page editor's toolbar took
  three rows and left ~200px of paper. Tests and a `DocEditor/DocumentToolbar` story.
- **doc-editor: `EditorShell`'s toolbar row sits in the dock's gutter.** `px-[var(--dock-inset,1rem)]`
  instead of `px-3`, so a toolbar's first control and the pinned composer's edge fall on the same line — the
  deck page measured a 4px offset between the slide tools and the agent composer.
- **tokens: primary fills are readable in both themes.** Light `--color-primary` is `#5a61ff` (was `#646cff`:
  white on it measured 4.09:1, under WCAG AA's 4.5:1; the new value is 4.58:1, the nearest same-hue step).
  New `--color-on-primary` — white in light, the light text ink in dark, because the dark primary `#8b91ff`
  is a pastel that white cannot be read on (2.8:1) while dark ink can (6.5:1). `Button variant="primary"`
  and every `bg-primary` fill in the doc editor, composer, social, ingest, doc-types, shared and observability
  components paint `text-on-primary`; nothing paints `text-white` on `bg-primary` there. A contrast test pins
  the pair in both themes. `lightTheme.primary` follows.
- **shared: `UserChip` takes `labelClassName`** — classes on the name label alone, so a narrow table column
  can keep the avatar (`labelClassName="hidden @2xl:inline"`) while the name stays the chip's tooltip.

## [2.381.0] — 2026-09-23

### Added

- **work-activity: `WorkNodePane` takes `live`.** With the canvas's own liveness, a running node whose source
  lease has lapsed reads "· updates delayed" in the pane's subtitle (`data-delayed="true"`) exactly as its card's
  accessible name did — the pane, the place that is supposed to say more, said only "Running".

### Fixed

- **work-activity: the card prints the delay it announces.** With host lines, a card said "Tests running" while its
  accessible name said "running, updates delayed"; it now adds an "Updates delayed" line.
- **work-activity: pane chips stay inside the pane.** Inputs, tools and citations render as a chip whose label
  truncates (`max-w-full` + `truncate`); a deck edit's input titled by its instruction ran 80 px past the pane's edge.
- **work-activity: a banner that only repeats the pane's title goes, or its one fact moves up.** "WORK-144" in blue
  under "WORK-144" is gone; "Release plan / Release plan · rev 6 · 09:08" becomes the fact line alone.
- **work-activity: the header's view note is whole or absent.** The views row is a `@container`; the note shows
  from `@lg` (32 rem) — in a 370 px panel it used to truncate to "Sh…".

## [2.380.0] — 2026-09-23

### Added

- **`GroupedList` (`shared`) — a directory of two-line rows under collapsible group headers.** The
  pipelines page groups its work by what it produces ("Documents & presentations · 5"); `TreeView` is a
  one-line, drag-to-reorder tree of things that contain each other, and the wrong shape for that. Each
  group is a `<section>` with a `<button aria-expanded>` header (caret, folder mark, title, count `Chip`);
  each row is an `<li>` whose primary `<button>` opens it — a leading kind mark, title + pill on line one,
  a `subline` on line two that swaps to `hoverSubline` on hover / focus / `current` (the description at
  rest, the route when you look), an always-visible `trailing` slot, a `hoverActions` slot, and a ⋯
  `DropdownMenu` from `rowMenu(row)` (the `TreeView` pattern: ⋯, right-click, Shift+F10). One roving tab
  stop across headers and visible rows; arrows / Home / End walk them, ArrowLeft collapses (and lands on
  the header), ArrowRight opens or steps in. `current` tints the row and wears its hover line. Open
  state is uncontrolled (`defaultOpen`), controlled (`openGroups` + `onToggleGroup`) or remembered
  (`storageKey`).
- **`FilterPopover` (`shared`).** A "Filter" `Button` with a funnel, a count badge when `activeCount > 0`,
  opening an `InlineMenu` (`role="dialog"`) around the caller's `FilterChip` groups, with an optional
  "Clear filters" row. One toolbar line however many filter groups there are.
- **`FileKindMark` kinds `agent` · `experiment` · `call` · `conversation` · `media` · `workflow`**
  (sparkle, flask, phone, chat bubble, image, branch) and `variant="plain"` — the glyph alone in the
  secondary ink, no tinted box, for a dense list.
- **`StatusPill` `meta`, `variant="text"`, `state="danger"`.** `meta` is the quieter clause after the
  label ("Failed · 10h ago"), tertiary ink, normal weight. `text` is dot + coloured label with no box.
  `danger` spells `error` in the tone vocabulary (`StatusPillTone`); `StatusPillState` is unchanged, so
  a `Record<StatusPillState, …>` elsewhere does not grow a key. `tone` is accepted as the name of
  `state`, so realtime-modules 0.88.0's `statusPillFor(summary)` → `{ tone, label, meta? }` spreads
  straight in: `<StatusPill variant="text" {...statusPillFor(summary)} />`.
- **`PageHeader` `size="lg"`** — a 28px directory title for a page that is the list.
- **`PipelinesListView` (`./pipelines`) — the pipelines page body, presentational.** `PageHeader` (`lg`) with
  the count chip and ⋯ / Templates / Start from blank, a `Toolbar` with `SearchInput`, `FilterPopover`
  and the "Group: Work type ▾" `Select`, the `GroupedList` of rows, loading / empty / no-match /
  error states, and a `footer` slot that pins a `FloatingComposerDock` column-wide (the
  `ComposerDockPlacementContext` = `pinned` card of 2.377.0, `--dock-inset` zeroed). Rows are built by the
  exported `toGroupedRows(entries, groupBy, options)`; the pill by `statusPillFor(entry, now)` → `{ tone, label, meta? }` (failed →
  danger "Failed · 10h ago", partial → warning "1 of 5 failed · 29m ago", live → info, else the
  definition status). The vocabulary the platform and the host spell the same way ships beside it:
  `WorkType`, `PipelineKind`, `KIND_MARK`, `KIND_WORK_TYPE`, `WORK_TYPE_LABEL/ORDER`,
  `PipelineRunRollup`, `PipelinesListEntry`, `PipelinesGroupBy`, `groupEntries`, `matchesQuery`,
  `relativeAgo`, `routeLine`.

## [2.379.1] — 2026-09-23

### Added

- **pipelines: `ErrorCategory` gains `Refused`; `PipelineRunError.retryability`.** A step that looked at the
  request and said no (the platform's `constraint-not-met`, `forbidden`, `revision-conflict`, `invalid-request`)
  is classified `Refused`, retryability `terminal` — a decision about inputs the run already has, so retrying or
  resuming decides the same way. `RunsTable` shortens it to "Refused"; `ErrorOverlay`, `errorCategoryTone` and
  the attempts tone map paint it caution, not danger: nothing broke. The host's run page hides retry and resume.

## [2.379.1] — 2026-09-23

### Added

- **pipelines: `ErrorCategory` gains `Refused`; `PipelineRunError.retryability`.** A step that looked at the
  request and said no (the platform's `constraint-not-met`, `forbidden`, `revision-conflict`, `invalid-request`)
  is classified `Refused`, retryability `terminal` — a decision about inputs the run already has, so retrying or
  resuming decides the same way. `RunsTable` shortens it to "Refused"; `ErrorOverlay` and `errorCategoryTone`
  paint it caution, not danger: nothing broke. The host's run page hides retry and resume for it.

## [2.379.0] — 2026-09-23

### Fixed

- **The activity grid is not a white box in dark mode.** `ACTIVITY_RIPPLE_GRID` is a `lightMode`
  preset, and that shader branch paints an opaque white ground — on a dark page the canvas was a
  white rectangle with a grid in it. `WorkActivityCanvas` now resolves the theme it is inside
  (`useResolvedBackdropTone`: `data-theme` up the tree, else the system preference) and wears the
  new `ACTIVITY_RIPPLE_GRID_DARK` under `dark`: the additive branch, dim grey lines on a transparent
  ground, same cells, ripple and edge fade. The canvas reports which with `data-backdrop-ink`.

## [2.378.0] — 2026-09-23

### Fixed

- **The activity grid is not a white box in dark mode.** `ACTIVITY_RIPPLE_GRID` is a `lightMode`
  preset, and that shader branch paints an opaque white ground — on a dark page the canvas was a
  white rectangle with a grid in it. `WorkActivityCanvas` now resolves the theme it is inside
  (`useResolvedBackdropTone`: `data-theme` up the tree, else the system preference) and wears the
  new `ACTIVITY_RIPPLE_GRID_DARK` under `dark`: the additive branch, dim grey lines on a transparent
  ground, same cells, ripple and edge fade. The canvas reports which with `data-backdrop-ink`.

### Changed

- **The docked composer is a card, not a row.** `FloatingComposerDock` pinned keeps the column's
  gutter below the composer too (`pb-[var(--dock-inset,1rem)]`) and the composer keeps its own
  radius on all four corners: a flat card with a hairline border, no shadow, edges on the toolbar's
  and the status bar's, a visible margin above the window's bottom. (2.376.0 squared the bottom
  corners and ran the row to the edge; the row's bottom was clipped and its type was mixed.)
- **`RichChatComposer modeControl="menu"`.** The mode as one dropdown (`✦ Agent ▾`) with the current
  `⌥n` chip beside it and the other modes, their shortcuts and any reason they are off inside the
  menu; the draft's references sit at the row's END (a document chip on the right); hints stay in
  the `?` menu; a host with slash commands gets a muted `/ commands` where the toolbar ends
  (`…-commands-hint`); the mode label, the submit lead, the Send button (`Run agent →`) and the
  reference chip use the editor's type (14px / 12px chip) instead of the chat column's 12px / 11px.
  `ComposerReferences size="sm"` is the 12px chip.
- **The console paints its own ink.** `.uic-chat-console` now sets `color` and `caret-color` from
  its own `--color-text-primary`, and a selection inside it is the console wash. The typed text
  (`.chat-composer .ProseMirror` inherits its colour), its caret and any bare span used to take the
  PAGE's ink — near-black on the near-black sky of a light app. Graphite tertiary and disabled ink
  lifted to `#c4c6cb` / `#9ea0a7` (were 4.2:1 and 2.8:1 under the inset glass);
  `consoleContrast.test.ts` holds every console text token at ≥ 4.5:1 (disabled ≥ 3:1) against both
  ends of each sky, bare and under the inset glass.

## [2.377.0] — 2026-09-23

### Fixed

- **`RippleGridBackground` fills its section instead of pooling in the middle.** The canvas
  always covered its box (absolute `inset-0`, ResizeObserver, DPR-scaled), but the shader's fade
  and vignette were measured ReactBits-style on the SHORT axis — radius 1 was the corners of a
  square and an oval two-thirds of the way across a 3:2 panel, so the Active Now activity grid
  read as a grey blob centred in a white box. Both are now measured against the section itself
  (0 at the centre, 1 at the corners, any aspect), and a new `edgeFade` prop (0..1, default 1 =
  the full ReactBits fade) says how much of that fade to apply. `ACTIVITY_RIPPLE_GRID` sets
  `edgeFade: 0.35`: the grid reaches every side, dimming about a third toward the corners.
  Tests cover the section-relative shader, the uniform and its clamp, the canvas backing store
  at `devicePixelRatio`, and re-measuring through a ResizeObserver while the loop is parked;
  `drawnParticles` (area-bounded particle count) is now tested too. Story
  `Backgrounds/ActivityGridFillsItsSection` shows wide, tall and the old oval side by side.

## [2.376.0] — 2026-09-23

### Changed

- **`FloatingComposerDock` pinned is the column's own chrome, not a card.** Inside `EditorShell`
  (and the unframed `PresentationEditor`) the dock now spans the editor column's content width in
  the same gutter the host wraps its toolbar and status bar in (`--dock-inset`, default `1rem`,
  exported as `DOCK_INSET_VAR`): no `maxWidth` cap, no centring, no shadow, no padding under the
  composer. The composer's bottom edge is the column's bottom edge, so only its top corners are
  rounded — `--composer-radius` still sets how much; `--composer-shadow` is zeroed for it. A 768 px
  pill floating on a drop shadow in the middle of a 1300 px column, with grey under it, read as an
  embedded iframe. `maxWidth` now applies to the OVERLAY placement only.
- **`RichChatComposer collapseWhenIdle`: the idle row wears the surface it sits on.** In Agent or
  Terminal the one-row idle composer is plain (`bg-surface`, no `data-console`, no sky); the console
  surface arrives with the caret. Inside a `ChatColumnBackdrop` that is already painting its sky
  the row keeps the inherited tint, as before.


## [2.374.1] — 2026-09-23

### Fixed

- `WorkActivityGraph`: the automatic list also applies when the host draws the node pane itself (`detailsPlacement: 'none'`, as Active Now does) — any valid node selection over an unreadable fit.

## [2.374.0] — 2026-09-23

### Added

- `PresentationView` `subtitle` — a line under the title (the deck's own heading where it differs from the document name).

### Fixed

- `WorkActivityGraph`: the accessible list no longer draws over the canvas footer and zoom controls in a short panel. With a node's pane open and the fitted graph below the readable zoom, the canvas region shows the list (canvas stays mounted underneath; "Show the graph" returns it). In a panel under 720 px the toggled list takes the canvas region instead of a 240 px row below it.
- `WorkNodePane`: a banner description that only repeats the pane title or subtitle is dropped ("v4 ready" no longer echoes the deck name).

## [2.373.6] — 2026-09-23

### Fixed

- `WorkActivityCanvas` asks for a 160 px floor (`min-h-40`) instead of 320 px. In a
  short panel (the Active Now column at a 1280×577 viewport) the 320 px minimum
  overflowed its parent and scrolled the whole page.

## [2.373.5] — 2026-09-23

### Added

- `PresentationView` `autoFocus`: takes keyboard focus when shown so ← / → page at once (the deck editor's Present opened a view whose arrow keys did nothing until clicked). Off by default.

## [2.373.4] — 2026-09-23

### Fixed

- `RichChatComposer` (`collapseWhenIdle`): opening a menu from the composer (the deck dock's "Deck actions", the `?` menu) collapsed it at once — the menu renders in a portal and focuses its first item, which is outside the composer in the DOM, so the blur handler decided "focus left", collapsed, and unmounted the menu it had just opened. The "left" decision now waits one task and is cancelled by a focus React delivers from the composer's own tree (portals included). Consumers asserting a synchronous collapse on blur need one tick.

## [2.373.3] — 2026-09-23

### Fixed

- `RichChatComposer` (`collapseWhenIdle`): pressing a control that unmounts on press (the status line's × or action) left focus on `<body>` with no blur event, so the composer kept `focusWithin` and the idle dock came back 69 px tall with the suggestion chips under the pointer. A post-commit check resets focus state when focus is no longer inside; suggestion chips never show on the one-row idle composer.
- The status line's × and action are 24 × 24 px targets (were 16 × 12), row height unchanged.

## [2.373.2] — 2026-09-23

### Fixed

- **`RichChatComposer collapseWhenIdle`** — references (a "Reference in chat"
  chip, the deck's slide reference) were hidden until the input was focused.
  They are part of the draft: the idle row now shows them beside the mode pill,
  one line, truncated, removable. An attachment, words in the box or a pending
  command still keep the full composer.
- **`WorkActivityNode`** — the card's accessible name came from the run status
  ("completed") while the card showed "v5 generating". One state feeds both: a
  generating (or failed) pending revision outranks the run's status, and a card
  with a revision in flight no longer takes the green "ready" border.
- **`StepThread`** — a step whose node is not in the loaded definition is
  titled by its step id instead of "unknown".

---

## [2.373.1] — 2026-09-23

### Changed — `EditorShell` byline beside the title in a short window

Under 640 px of window height (a 1280×720 laptop window has a 577 px viewport)
the byline (participants, meta, save state) sits on the title's row instead of
under it, capped at half the row and not wrapping — ~26 px back for the canvas.
With `RichChatComposer collapseWhenIdle` the deck stage at 1280×577 goes
287 → ≥ 300 px tall.

---

## [2.373.0] — 2026-09-23

### Added — `RichChatComposer collapseWhenIdle`: one row while idle

An empty composer with the caret elsewhere (and no status, process, staged file,
command or notice) is ONE row: a compact mode pill, the input and Send. The
toolbar, status line, mode row, references, `submitLead` and `?` menu return the
moment the caret enters the input or the box holds words. Expanding is one
re-layout; the returning rows fade up with opacity/transform only
(`composerReveal`, `motion-safe`). Pressing the pill or Send does not expand
mid-click — only focus in the INPUT does; the pill's click puts the caret there.
The editor element is never remounted. Off by default. `data-collapsed` on the
root for hosts and tests.

---

## [2.372.4] — 2026-09-23

### Fixed — 300 px holds with someone else on the deck

- A participant in the `EditorShell` byline (22 px avatars) made the header 6 px taller and the
  1280×720 stage 294 px. The framed `PresentationEditor` surface pads `pt-1.5 pb-2 gap-1.5` (was
  `pt-2 pb-3 gap-2`) and the pinned dock `pt-1 pb-1.5`: stage 545×306 with a participant showing,
  composer pinned (Playwright, audit deck).

## [2.372.3] — 2026-09-23

### Fixed — suggestion chips never slide under the pointer

- `RichChatComposer`'s focus-only suggestion row renders ABOVE the input. A bottom-pinned dock grows
  upward, so the row appearing on focus now moves the rows above it and leaves the input under the
  pointer that pressed it. Below the input (2.372.0–1) the chips slid in under that pointer and,
  live, the click that focused the input ran a suggestion.
- `PresentationView` (the reader) shows more than five revisions as one `Select`, newest first,
  like the editor, instead of a row of v1…v15 segments.

## [2.372.2] — 2026-09-23

### Fixed
- `WorkNodePane` no longer prints a detail line the pane already says: a line identical to, or (8+ characters) contained in, the banner, the description, the subtitle or the excerpt is skipped, as is a repeated line. WORK-144 showed "Gateway · Coverage checks" twice.

## [2.372.1] — 2026-09-23

### Fixed — measured live at 1280×720: the stage is 300 px

- The pinned dock's height cap lives on the row that pins it (`EditorShell`'s dock row, the
  unframed `PresentationEditor`'s new `-dock-row`), so the percentage resolves against the surface;
  the dock fills that row (`max-h-full`). 2.372.0 capped the dock at half of its own auto-height
  row and the composer overflowed it.
- Framed `PresentationEditor` uses the inline deck title / subtitle fields (one 27 px line instead
  of two labelled inputs, 58 px). The revision `Select` is content-width. Stage floor 20rem; the
  framed surface's floor is 14rem.
- `EditorShell` hides the breadcrumbs on a window under 640 px tall (the title stays; the explorer
  shows where the file lives).

Measured (Playwright, audit deck, workbench collapsed): viewport 1280×720 — stage 534×300, dock
150, composer pinned at the bottom; viewport 1280×577 (a 1280×720 window) — stage ≈338×190, whole
slide in view (was 6–58 px of a clipped stage).

## [2.372.0] — 2026-09-23

### Changed — a deck editor keeps its stage at 720 px tall

- `RichChatComposer` `density="compact"`: references share the mode row, the hints row folds into
  `?` at every width, fewer rows of chrome. `status` is one line above the input (text, tone, one
  action such as Undo, dismiss) so a host needs no banner over its dock. `suggestions` +
  `onSuggestion`: a chip row only while the input is empty and focused (wide), or a section of the
  `?` menu (medium/narrow). `modeRowEnd` puts a control (a scope switch) at the end of the compact
  mode row. New type `ComposerStatus`.
- `FloatingComposerDock` pinned: capped at `var(--dock-max-height, 50%)` of its surface; what is
  above the composer scrolls inside the cap and the composer never shrinks; tighter padding.
- `PresentationEditor`: from `md` up the main column is a size container and the stage is as wide as
  the column allows but no taller than it (`100cqh`, 24rem floor); the filmstrip and the notes
  scroll in their own columns instead of squeezing the stage. Framed (EditorShell), the
  previous / position / next row rides the deck line. More than five revisions render as one
  `Select` (newest first, "· latest") instead of a row of segmented tabs.

### Fixed — presence hover card clipped at a pane edge

- `PresenceAvatars`' follow card is collision-aware: centred under the avatar, then shifted to
  stay 8 px inside the nearest clipping ancestor (or the viewport), and flipped above when there is
  no room below. `clippingBounds(el)` is exported from the module for reuse.

## [2.371.1] — 2026-09-23

### Fixed — composer placeholder follows its prop

- `RichChatComposer` redecorated its placeholder only on a mode change, so a host that
  changed the text (the deck dock's "Tell the agent what to change on slide 3…" as the stage
  moves) kept showing the first one. It now redecorates when the text changes too.

## [2.371.0] — 2026-09-23

### Added — who is on which slide

- `Filmstrip` takes `slideViewers` (slide id → `PresenceUser[]`): the other people whose
  selected slide it is show as small avatars in the thumbnail's top-left corner (the ⋯ menu
  keeps the top-right), and the marker is named for screen readers ("Frank Davis is on this
  slide"). `SlideRowProps.viewers` / `SlideListItem.viewers` carry it through both lists.
- `PresentationEditor` passes `slideViewers` through, and takes `selectSlideRequest`
  (`{ slideId, key }`) to put a slide on the stage from outside — jump to or follow a
  participant. Acted on once per `key`; an id not in the deck is ignored.

## [2.370.0] — 2026-09-22

### Fixed — one star field per region in the DM compose area

- `RichChatComposer` in Agent/Terminal inside a painting `ChatColumnBackdrop`
  no longer starts its own particle field. It keeps its console tokens, border
  and a `bg-surface-inset` tint, and the column's field shows through. The
  composer reports `data-console-sky="own" | "inherited"`. `ChatColumnBackdrop`
  publishes `ConsoleSurfaceContext` (`{ painting, working }`, exported with
  `useEnclosingConsoleSurface`) for this.

### Added — `working` on the composer

- `RichChatComposer` takes `working?: boolean`. It is the standalone-dock
  equivalent of the column's working density: 180 points instead of 120, a
  per-area cap of 30 instead of 22, a quicker drift and larger points. When the
  prop is unset, it follows an enclosing `ChatColumnBackdrop`. Reduced motion
  still parks the field. Stamped as `data-working="true"`.

## [2.369.4] — 2026-09-22

### Fixed — a work-activity pane shows the card's own body

- `WorkNodePane` renders the node detail's `excerpt` (quoted) and `lines` under
  the banner. A composer edit's instruction, scope and `v6 → v7` were on the
  card and nowhere in the pane. A line the banner already says is not repeated;
  artifact, transcript and compute panes keep their own inspectors.

## [2.369.3] — 2026-09-22

### Fixed — the composer placeholder disappeared (2.369.2 regression)

The one-line placeholder used `overflow: hidden` on a zero-height float, which
clipped it away entirely. It now clips on x only (`overflow-x: clip`), so the
ellipsis works and the text shows. Verified live at 572px and 360px.

---

## [2.369.2] — 2026-09-22

### Fixed — adaptive composer polish (found live)

- A long placeholder in a narrow composer wrapped to a second line painted
  past the input and clipped mid-word; it is now one ellipsised line.
  The full text is the empty input's tooltip. Seen with a diagram's
  disabled-reason placeholder drawn over the hint row.
- `COMPOSER_BREAKPOINTS.wide` is 600 (was 560): a ~560px dock is medium, so
  its hints fold into `?`.
- The `⋯` overflow and `?` hints triggers drew the DropdownMenu's default
  border; they now match the borderless toolbar buttons beside them.

---

## [2.369.1] — 2026-09-22

### Fixed
- **A popover never covers a pinned composer dock.** `FloatingComposerDock` marks its visible column
  `data-uic-keepout="bottom"`; `InlinePopover` treats the top of any keep-out surface below its anchor
  as the bottom of the screen, so a filmstrip row's ⋯ menu near the foot of the deck editor flips up
  (or slides up) instead of opening over the composer. Menus opened from inside the dock are unaffected.
  New export `popoverFloor`, `POPOVER_KEEPOUT_ATTR`.
- **Submenu rows run their action under a real pointer.** A submenu is portalled on its own, so the
  parent popover's outside-click handler saw its mousedown as "outside", closed, and unmounted the
  submenu before the click landed — "Revise one part → Bullet 2" did nothing in the browser (jsdom
  tests passed because `fireEvent.click` sends no mousedown). Popovers now carry their open order and
  ignore a mousedown inside one opened later.

## [2.369.0] — 2026-09-22

### Added — `RichChatComposer` adapts to the box it is dropped into

All back-compatible; a host that passes none of the new props gets the adaptive
behaviour with the same API.

- **Size classes from its own width** (ResizeObserver on the composer, not a
  window media query; not `container-type` either, which would make the
  composer the containing block for its `position: fixed` emoji picker and
  link dialog). `COMPOSER_BREAKPOINTS = { narrow: 380, wide: 560 }`,
  `composerSizeFor(width)`, stamped as `data-composer-size`.
  - wide (≥ 560): full toolbar and hint row, as before.
  - medium (380–559): hints fold into a `?` menu; strikethrough, code, lists
    and quote fold into a `⋯` overflow menu (previously they were dropped).
  - narrow (< 380): input and Send share one row, the toolbar sits behind an
    `Aa` toggle, the mode switch is always the compact `1 2 3` pill.
  - `layout?: 'auto' | 'wide' | 'medium' | 'narrow'` overrides the measurement.
- **Auto-grow cap**: `maxInputHeight?: number | string` →
  `--composer-input-max`; default `min(14rem, 40dvh)` (was a fixed 12rem).
- **Shape that drops in anywhere**: radius is `var(--composer-radius, 12px)` —
  the composer's own default, never the host's `--radius-*` (a host with 0 or
  no radius tokens still gets a rounded composer). `radius?: 'none' | 'sm' |
  'md' | 'lg' | 'xl'` overrides both. Soft shadow on a light page, none on a
  dark one (hairline border only); `--composer-shadow` overrides.
  `FloatingComposerDock`'s card follows the same radius.
- **Graphite console tone**: `backdropTone?: 'auto' | 'night' | 'graphite' |
  'none'` (default `auto`). `auto` = the nearest `data-backdrop-tone` ancestor,
  else the nearest `data-theme` (light → graphite, dark → night), else
  `prefers-color-scheme`. Graphite is a neutral dark grey ground with zinc,
  lower-contrast stars and neutral console ink (tertiary ink ≥ 5:1). Stamped as
  `data-backdrop-tone`. `none` keeps the ordinary surface in Agent/Terminal.
- `ChatColumnBackdrop` takes the same `tone` prop (default `auto`) and stamps
  its resolved tone so a composer inside inherits it.
- `ParticlesBackground`: `tone?: 'night' | 'graphite'` and `density?: number`
  (drawn particles per 10,000 px², a free per-frame cap — no GL rebuild on
  resize). The composer uses 22, the column 10/14.
- New exports: `resolveBackdropTone`, `useResolvedBackdropTone`,
  `GRAPHITE_PARTICLE_COLORS`, `drawnParticles`, `BackdropTone`,
  `ResolvedBackdropTone` (shared); `COMPOSER_BREAKPOINTS`, `composerSizeFor`,
  `ComposerSize`, `ComposerRadius` (social/rich-composer).

---

## [2.368.1] — 2026-09-22

### Fixed — `ViewportFillRegion` re-measures when something above it appears late

The region measured its height on mount and on window resize only. A banner
that mounts after a fetch (the API-degraded banner) pushed the region down
without resizing the window, so the region overflowed the window by the
banner's height, the page scrolled, and the composer pinned at the bottom of
the documents editor sat below the fold. It now also re-measures when its
parent or the body resizes (ResizeObserver). Editor handoff WS2 follow-up.

---

## [2.368.0] — 2026-09-22

### Changed — presentation editor: the composer is always on screen (editor handoff WS3)

- `PresentationEditor` without `renderFrame` is now its own viewport-height
  frame: deck line and `SlidesToolbar` on top, one scrolling region
  (filmstrip, stage, speaker notes, sources, slide details), and the footer
  as the column's last row in normal flow (`ComposerDockPlacementContext`
  `pinned`, as `EditorShell` places it since 2.365.0). Nothing scrolls under,
  over or below the composer. With `renderFrame` the footer goes to the
  frame's footer slot as before.
- The built-in agent box is one opaque card inside the dock: the agent's
  answer (wrapping), the This slide / Whole deck scope with the suggestion
  chips, then the input — nothing from the page shows through it.
- `SlidesToolbar`: New slide and Present no longer wrap their label under the
  icon in a narrow toolbar.
- `Filmstrip`: a thumbnail with no render shows its title once (on the card),
  not twice.
## [2.367.1] — 2026-09-22

### Fixed

- `TreeView` rows are `relative`: the `sr-only` hover meta (2.365.0) is
  absolutely positioned and escaped the tree's scroll box, so a long tree
  stretched the document and the whole window scrolled.
- `EditorShell` title takes the row's remaining width (basis 0, 10rem
  floor), so the kind mark and a long title share a line and the pills wrap
  instead.

## [2.367.0] — 2026-09-22

### Added

- `EditorShell` `onParticipantClick` / `onFollowParticipant` /
  `followingParticipantId`, passed to the byline's `PresenceAvatars`, so the
  shell keeps the old header's jump-to and follow-a-collaborator avatars.

## [2.366.0] — 2026-09-22

- The sectioned document editor is deprecated (see commit 35d2105c).

## [2.365.0] — 2026-09-22

### Changed — the composer is the editor column's last row (editor handoff WS1)

- `EditorShell` renders `footer` as a pinned, normal-flow last row after the
  scroller (`editor-shell-dock`), inside `ComposerDockPlacementContext="pinned"`.
  The scroller is the only thing that scrolls and its box ends at the dock's
  top edge; nothing renders below the dock and inline popovers are clipped
  above it. The scroller no longer pads by `--dock-height`.
- `FloatingComposerDock` reads `ComposerDockPlacementContext`: `overlay`
  (default, unchanged outside a shell) or `pinned` (no absolute positioning,
  no fade, no `--dock-height`).
- `EditorShell`'s title row wraps instead of collapsing the title to a sliver
  when pills crowd it.
- `EditorShell` frame mode: the workbench sits beside the pane from `lg` and
  stacks ABOVE it below that — never below the composer.
- `ExplorerLayout` gains `asidePlacement: 'stack' | 'beside'` (default
  `stack`, unchanged). `beside` keeps the aside to the right at every width.
- `TreeView` `hoverMeta` is `sr-only` until hover/focus instead of
  `opacity-0`, so hidden meta no longer takes width and titles stop truncating
  early.

## [2.364.0] — 2026-09-22

### Added — the presentation editor surface (editor handoff WS3)

`PresentationEditor` is recomposed around four new pieces, exported from
`./doc-editor` (and the root) for hosts that compose their own surface:

- **`Filmstrip`** (+ `FilmstripThumb`): numbered 16:9 thumbnails from the
  platform-rendered slide SVGs (no second renderer), selection
  (`aria-current`), ↑/↓ to move the selection and Alt+↑/↓ to move the slide,
  drag reorder through the existing lazy `SortableSlideList`, a hover/focus ⋯
  menu (Move up / Move down / Duplicate / Delete slide) and a dashed "Add
  slide" card. `generatingSlideIds` dims a thumb under a quiet `Generating…`
  (`aria-busy`); an id not in the deck shows as a placeholder card at the
  end. The uncited ("No source") and "Edited by agent" markers stay.
- **`SlideStage`**: the selected slide on a centred 16:9 frame (lifted from
  `PresentationView`), with a `Generating…` line over the last render.
- **`SpeakerNotes`**: the slide's `notes` under the stage, capped at the
  generator's 2000 characters with a counter; emptied writes `undefined`.
- **`SlidesToolbar`**: New slide, Layout, Insert (chart / quote / image /
  two-column slide after this one), Theme, Bar/Line on a chart slide,
  Undo/Redo, Present. No bold/italic/font: a DeckSpec has no rich text, and
  the toolbar says "Text style comes from the theme" instead of showing dead
  buttons.

`PresentationEditor` new props (all optional; existing props unchanged):

- `generatingSlideIds` — `useDeckReviseStatus(documentId).generatingSlideIds`.
  The built-in agent box also marks the slide it is editing.
- `footer` — a node or `(ctx) => node` (`PresentationFooterContext`: selected
  slide/index, slide count, `selectSlide`, `markChanged`). Replaces the
  built-in agent box; this is where a host mounts its composer dock.
- `renderFrame(parts)` — hands `{ toolbar, actions, surface, footer }` to a
  frame such as `EditorShell` instead of stacking them. Without `footer`, the
  built-in agent box arrives docked in a `FloatingComposerDock`.
- `onSelectedSlideChange(slideId, index)`.
- `onOpenPresentationView` is now called with `{ slideId, slideIndex }` (still
  assignable from `() => void`).

### Changed

- The agent summary wraps instead of truncating to one line, so a warning
  appended to it is readable on a narrow stage.
- Undo/Redo (⌘Z / ⇧⌘Z outside a text field) over the editor's own edits;
  keystrokes within 800ms fold into one step, and a spec replaced from
  outside (revision switch, agent edit) drops the history.
- Theme moved from the deck line to the toolbar; the Layout select and the
  list rail's up/down/duplicate/delete buttons moved into the toolbar and the
  thumbnail ⋯ menu. `SlideRow`/`SlideList` are still exported unchanged.
- `SlideForm` `showNotes` (default true); the editor turns it off because
  the notes have their own pane.
- `SlideList`/`SortableSlideList` accept `rowComponent` and `listClassName`.

## [2.363.0] — 2026-09-22

### Added — the page editor inside `EditorShell` (editor handoff WS2)

- **`WorkspaceDocumentHeader` `variant="actions"`**: only the right-hand
  cluster (ownership + Share, comment count, who is here with follow/jump,
  the Editing/Review/Read pill, My Items, the room pill, lifecycle actions and
  the ⋯ menu, with their confirm dialogs), for `EditorShell`'s `headActions`
  while the shell owns the title, status pill and save state. `bar` (default)
  is unchanged.
- **`WorkspaceDocumentHeaderNotices`** (`./doc-editor`): the header's two
  banners (a refused lifecycle change, a legacy "final" claim) on their own,
  so an `actions` host can put them full width at the top of the surface. The
  `bar` header renders them through it, so the markup is the same.
- **`DocumentLifecyclePill`** (`./doc-editor`): the header's lifecycle
  `StatusPill` ("draft", "in review") for a host's own title row.
- **`CanvasDocumentView` `fitHeight="parent"`**: fill the host's box instead of
  measuring to the bottom of the window. Inside `EditorShell` the scroller
  pads by the floating composer's `--dock-height`, so the workspace — and its
  sticky status bar — now end above the dock instead of running under it.
  Default `viewport` is unchanged.

## [2.362.0] — 2026-09-22

### Added — Documents workspace foundation (editor handoff WS0)

The primitives the Documents editor handoff needs, so the page editor and the
presentation editor can share one shell, one workbench and one floating
composer. All additive; every existing prop keeps its behaviour.

- **`EditorShell`** (`./doc-editor`): crumbs, title row (optional in-place
  title edit, star toggle, status pill, `PresenceAvatars`, meta, save state,
  head actions), an Editor / Comments / Versions / History tab row
  (`DEFAULT_EDITOR_SHELL_TABS`, host-controlled), a toolbar slot, the surface
  as the active tabpanel on the grey workspace, and a `footer` slot the dock
  floats in. Optional `explorer` and `workbench` columns give the whole
  explorer | editor | workbench frame from one component.
- **`FloatingComposerDock`** (`./doc-editor`): the composer (and a task strip
  above it) floating over the bottom of the surface behind a fade. It writes
  its height to `--dock-height` on its parent (`DOCK_HEIGHT_VAR`) so the
  surface can scroll its last line clear of it.
- **`Workbench`**, **`AgentTaskCard`**, **`MoreContextDisclosure`** (root /
  layout): the static right column — kind mark, title, close, "Current task",
  underline tabs (Comments / Activity / Details, controlled or not), a "More
  context" disclosure and pinned footer actions.
- **`TaskStrip`** (`./shared`): the 30px line above the composer — label ·
  phase, Pause / Resume / Stop / Open run / Hide rendered only for the handlers
  passed. **Phase only**: a bar and a percentage appear only when the host
  passes a real `percent`; nothing is invented. `AgentTaskStatus` is shared
  with `AgentTaskCard`.
- **`FileKindMark`** (`./shared`): page / presentation / recording /
  transcript / diagram / folder glyph on tone tokens; decorative unless given
  a `label`.
- **`TreeView`**: `TreeNode.hoverMeta` (a version or size shown only on hover
  or focus, still in the accessible name), `TreeNode.icon`, and `rowMenu` — a
  ⋯ `DropdownMenu` (`role="menu"`) per row, opened by the button, a
  right-click, or Shift+F10 / the context-menu key on the focused row. Only the
  focused row's ⋯ is in the tab order. `rowMenuLabel` names the button.
- **`RichChatComposer`**:
  - `modeControl="compact"` — the mode's name, `1 2 3` toggle buttons
    (`aria-pressed`, `aria-keyshortcuts`) and the current `⌥n`, instead of
    three large tabs. Default `'tabs'` is unchanged.
  - `modeShortcuts` — Option-1/2/3 switch Chat / Agent / Terminal, bound on
    the composer root (focus outside the composer: nothing happens) and read
    from `event.code` so the Mac Option characters are never typed.
  - `modeTriggers` — a draft that is exactly `>` switches to Terminal, exactly
    `/run ` to Agent; the prefix is consumed. Prefixes are configurable;
    `matchesModeTrigger` is exported.
  - `disabledModes` + `modeUnavailableReasons` — a mode the host cannot serve
    (Terminal with no run attached) is disabled, and a shortcut or trigger
    aimed at it shows the reason and leaves the typed text alone.
  - `modeHints` (per-mode hint rows), `submitLabel` (per mode or one for all)
    and `submitLead` (a model/skill picker slot before Send).
  - Keyboard switches move focus to the new mode's input.

Stories: `Layout/Workbench`, `DocEditor/EditorShell` (page and framed
presentation variants), `Shared/TaskStrip`, `Shared/FileKindMark`,
`Shared/TreeView › HoverMetaAndRowMenu`, `Social/RichChatComposer ›
CompactModes`.

## [2.361.1] — 2026-09-22

### Fixed

- `PresentationEditor` (agent layout): the theme Select stretched across the
  deck line; it is now the compact `pill` Select.

## [2.361.0] — 2026-09-22

### Added — `PresentationEditor`: an agent box under the stage (`onInstruct`)

The editor was a stack of forms: deck title/subtitle/theme fields on top and a
462-line slide form under the preview. With the new `onInstruct` prop the
editor is driven by asking instead:

- **The chat's own composer, pinned to Agent mode**, sits under the stage
  (`RichChatComposer` with the particle backdrop), with a "This slide / Whole
  deck" scope, optional suggestion chips (`instructHints`), Send off and a
  "Agent is editing slide N…" process line while the host works, and the
  returned `summary` shown as one line. Slides named in `changedSlideIds` are
  marked "Edited by agent" in the rail until the next instruction.
  `onUndoInstruct` puts an Undo button on that line.
- **The slide form folds into a collapsed "Edit slide details" `Disclosure`.**
  Citations stay outside the fold as a compact chip row with "+ Add source"
  (`SlideSources compact`), because Save depends on them.
- **The deck fields are one line**: title and subtitle edit in place
  (new `InlineEditableText` primitive), theme is a small `Select`.

The composer is lazy-loaded (its tiptap mention peers are optional), like
`SortableSlideList`. Without `onInstruct` the editor is unchanged.

### Added

- `InlineEditableText` (forms) — text that edits in place on click.
- `RichChatComposer` `fixedMode` — pins a mode with no switch and sends the
  text as typed (no `/agent` prefix).
- `SlideSources` `compact`, `SlideForm` `showSources`, `SlideRow`/`SlideListItem` `changed`.

### Fixed

- `RichChatComposer` crashed ("Cannot read properties of null (reading
  'nodes')") when lazy-loaded behind a `Suspense` boundary: its effects read a
  tiptap editor that had already been destroyed. Both effects now skip a
  destroyed editor.

## [2.357.0] — 2026-09-22

### Fixed — `MessageRow`/`ChatPanel`: a card body collapsed to ~18px inside an own message

An own (`mine`) message renders its content in a shrink-to-fit tinted bubble
(`max-w-[85%]`, no intrinsic width of its own). That's fine for text, but
`ChatPanel` also renders CARDS in that same slot — `AgentRunCard` (which uses
a `@container` query, so its intrinsic inline size is 0 with nothing else
constraining it) and the document/deck preview cards — and inside a
shrink-to-fit bubble those collapse to ~40px, with the card itself down to
~18px: its chips wrapped letter-by-letter ("t h e") in a sliver on the right.
Reported from the host app: a `/doc` suggestion card and a failed `/deck`
card, both rendered on the viewer's own message.

- **`MessageRow` gains `contentLayout?: 'inline' | 'block'`** (default
  `'inline'`, byte-identical to before). `'block'` drops the shrink-to-fit
  bubble's `max-w-[85%]`/padding/tint in favor of a full-width-up-to-a-cap
  span (`w-full max-w-[36rem]`), still right-aligned on a `mine` row via the
  column's `items-end` rather than `text-align`. No-op on a non-`mine` row,
  which never had the shrink-to-fit bubble to begin with.
- **`ChatPanel` passes `'block'` on every branch whose body is a card**: the
  local (`/doc`) message's `AgentRunCard`, and the timeline message's
  `agentRef`/`recordingRef`/`callRef`/`docRef` cards and plain attachments
  (`files.length > 0`) — a new `hasCardBody` alongside the existing `isCard`
  (which also gates edit/delete/forward and deliberately has a different
  shape: it excludes attachments and includes `membershipRef`, whose branch
  never reaches a `<MessageRow>`).

### Fixed — components that only worked with this library's providers/env now work with props alone

2.356.0 fixed this for `UserPicker`. This release does the same for the rest
of the surfaces a consumer-audit found still (a) calling
`useIdentityContext()`/`usePresenceContext()` unconditionally — throwing at
mount for a host that runs its own identity/presence providers instead of
this library's — and/or (b) reading `import.meta.env.VITE_*` inlined at THIS
library's own build time, which is always `''` in a published build no
matter what a consumer's `.env` sets.

- **Switched to the non-throwing `useOptionalIdentityContext`/
  `useOptionalPresenceContext`**, with explicit override props/options that
  win when given: `useDocumentEditorState`/`DocumentEditorPage` (`idToken`),
  `AppLayout` (`identity`, `presenceUsers`), `MappingReviewPage`,
  `IngestDashboard`, `IngestItemDrawer`, `SourceDetailPage`,
  `MappingRuleEditor` (`idToken`/`baseUrl`), `TemplatesModal`/`PipelinesPage`
  (`userId`, plus `idToken`/`baseUrl` for the trigger-run request),
  `PipelineMetrics`, `useTriggerRun`, `usePipelineMetrics`
  (`idToken`/`baseUrl`). A host that mounts neither provider and passes no
  props now renders with safe fallbacks (`''`/`null`/`[]`/a no-op
  `onSignOut`) instead of crashing at mount; a host that mounts the
  providers and passes nothing keeps byte-identical behavior.
- **Same fix for the transitive hooks these pages actually depend on** —
  `useIngestSources`, `useIngestItems`, `useMappingReviewQueue`,
  `usePipelineDefs`, `useSourceSloMetrics` (and `SourceSloPanel`, which owns
  it) — all of which also called `useIdentityContext()` unconditionally and
  would otherwise have kept the pages above from actually rendering
  provider-free despite the page-level fix.
- **`setApiBaseUrl`/`getApiBaseUrl`** (new root exports, `./lib/apiBaseUrl`):
  generalises the document-type adapter's 2.352.0
  `setDocumentTypeApiBaseUrl`/`getDocumentTypeApiBaseUrl` (kept as aliases)
  into one shared runtime resolver used by every surface above. Resolution
  order: an explicit `baseUrl` prop/option → the module override (`setApiBaseUrl`)
  → a runtime `globalThis.__UI_COMPONENTS_ENV__` escape hatch (for a host
  that injects env at runtime rather than at this library's build time) →
  this library's own build-time `VITE_SOCIAL_API_URL`/`VITE_PLATFORM_API_URL`
  last, effectively always `''` in a published build.
- **Left deliberately unfixed** (out of this pass — none throw without a
  provider, or they're a different pattern): the identity-admin/ingest-audit/
  sync-conflicts/DLQ hooks still calling `useIdentityContext()` unconditionally
  (`useIdentityResource`, `useIdentityDiagnostics`, `useIdentityMfaAdmin`,
  `useIdentityAdmin`, `useSyncConflicts`, `useIdentityAudit`, `useIngestAudit`,
  `useIdentityPools`, `useDocTypeProposals`, `useIngestDLQ`); and the wider set
  of baked-in `VITE_*` reads outside this pass's surfaces (`useRooms`,
  `useApiHealth`, `useAuth`, `useGroups`, `useLikes`, `useComments`,
  `useFriends`, `usePosts`, `useSocialProfile`, `useTypedDocuments`,
  `config/gateway.ts`, `utils/socialApi.ts`, `PipelineRunsContext`,
  `EventStreamContext`, `pipelineStorageRemote`, `usePipelineModuleDashboard`,
  `TriggerConfig`, `EventsPage`, `identityApi`, `pipelineBreakpointPatch`).
- Export snapshot regenerated: `+setApiBaseUrl`, `+getApiBaseUrl`.

## [2.344.0] — 2026-09-21

### Added — `PresentationEditor`: the writing end of the deck generator

`PresentationView` (2.342.0) reads a generated deck. This edits one. The thing
being edited is a `DeckSpec` — the same contract `renderPptx` validates and
renders — so every control writes one field of it and nothing else.

- **`PresentationEditor` (root export and `./doc-editor`).** Controlled `spec`
  + `onChange`. Left, a slide rail of thumbnails with reorder / add / duplicate
  / delete and a layout picker; centre, the generator's own SVG of the selected
  slide over an inline form for the fields that layout reads (bullets as a list
  editor, two columns, a chart's series as a `Table`, quote, notes); across the
  top, revision tabs, `Save as v(n+1)`, `Download .pptx` and
  `Open in presentation view`. `←`/`→` change slide, `⌘S` saves. `readOnly`
  hands over to `PresentationView` rather than greying out a form.
- **Every slide cites at least one source, and the editor says so.** That is
  the generator's rule, not a preference — an uncited slide is rejected
  server-side — so an uncited slide is marked in the rail, warned about in its
  own form, and Save is disabled until it is fixed. Sources are picked through
  the host's `onSearchSources`, which is the Documents explorer's own search,
  so what a person picks is what the generator can cite.
- **The preview is the generator's, not a second renderer.** The centre pane
  shows what `renderSlideSvg` produced, reached through `onRequestPreview`
  (the host debounces). While a re-render is in flight the previous image
  stays up: typing a title fires a request per keystroke, and a stage that
  blanks on each one is unusable.
- **Drag comes from `@dnd-kit`, loaded lazily.** Those are OPTIONAL peers, and
  `PresentationEditor` is a ROOT export — a static import would have made three
  uninstalled packages a load-time failure for every consumer of the library,
  not just one subpath. `SortableSlideList` is reached through `React.lazy`, so
  `dist/index.js` carries no `@dnd-kit` import at all. Move-up / move-down
  buttons are on every row regardless and are the reorder path for keyboards.
- **`deckSpec.ts`** mirrors the platform's contract (types, caps,
  `uncitedSlideIds`, and the pure spec edits `moveSlide` / `addSlide` /
  `duplicateSlide` / `removeSlide` / `withLayoutDefaults`), all exported.

### Added — `DocumentShape` gains `'presentation'`

`NewDocumentModal` offers **Presentation** beside Page / Sections / Diagram,
with a "Start from" select — Blank, From a transcript, From a project
document — fed by the host's `recordings` and `onSearchDocuments`. Choosing a
derived deck requires naming its source (Create stays disabled otherwise), and
submitting calls the new `onCreateFromFixture({ from, sourceId?, title,
description? })` so the host can create the row and ask the generator for a v1
in one step. Without that prop a presentation falls back to an ordinary
`onCreate`. A deck has no document type, like a whiteboard.

### Added — `Avatar` takes a `glyph` or an `icon`

Not every avatar-shaped thing is a person. A channel's `#` now renders through
`Avatar` — same circle, same derived colour, same overlap rules — instead of a
hand-rolled `<span className="rounded-full …">` beside the real ones. A loaded
image still wins; a failed one falls back to the glyph rather than to initials.

---

## [2.343.0] — 2026-09-21

### Added — WebGL backdrops: `ParticlesBackground`, `RippleGridBackground`, `ChatColumnBackdrop`

Knock-offs of ReactBits' `Particles` and `RippleGrid` backgrounds, ported off
`ogl` onto raw WebGL — **no new dependency**. The shaders are theirs, verbatim
but for a precision qualifier; everything around them is this library's.

- **`ParticlesBackground` (root export).** A drifting point cloud on the
  near-black radial gradient: positions sampled uniformly in a sphere, a
  per-particle sine drift, soft-edged discs (or hard, via `alphaParticles`), a
  slow whole-cloud rotation and an optional lean toward the pointer. Same props
  and defaults as ReactBits', plus `active` (a 250ms crossfade in and out, no
  layout change) and `seed`/`fallbackIntensity` for the fallback.
- **`RippleGridBackground` (root export)** and the `ACTIVITY_RIPPLE_GRID`
  preset. A full-screen quad whose lattice ripples outward from the centre,
  bends toward the smoothed pointer, glows, and vignettes off at the edges.
  `lightMode` inverts it to coloured lines on a light ground.
- **`ChatColumnBackdrop` (root export).** Wrap the message list + composer:
  `mode` of `agent`/`terminal` crossfades the WHOLE column onto the star field
  and flips its chrome to the night palette, and `working` makes the field
  denser, quicker and pointer-aware. The dark half is two class hooks — the
  documented `data-theme="dark"` subtree switch plus a new `.uic-chat-console`
  block that re-points the surface tokens to transparent/alpha-over-dark so the
  field reads through the panels — rather than a second set of classes on every
  composite in the column.
- **`useWebGLCanvas` (root export)**, with `createWebGLContext`,
  `compileProgram` and `createArrayBuffer`. One hook owning the part every
  shader background gets wrong: WebGL2→WebGL1→`experimental-webgl` creation,
  drawing-buffer sizing from the measured box × DPR through a ResizeObserver, a
  rAF loop that STOPS when `active` goes false / an IntersectionObserver says
  the element left the viewport / `document.hidden`, `webglcontextlost` +
  `webglcontextrestored`, and `prefers-reduced-motion` → exactly one static
  frame.

### Changed

- **`WorkActivityCanvas` gains `background?: 'ripple-grid' | 'plain'`,
  defaulting to `'ripple-grid'`** (on `WorkGraphProps`, so it flows through
  `WorkGraph`). The ripple grid REPLACES React Flow's dot `Background` rather
  than layering over it, and sits behind the nodes with no pointer events.
- **`ChatLabShell` and `WorkComputePane` now wear `ParticlesBackground` while
  working.** The CSS `RisingParticles` is unchanged and still exported — it is
  now the reduced-motion / no-WebGL fallback `ParticlesBackground` falls through
  to on its own, so no host has to wire it. Test ids under those surfaces move
  from `…-particles-layer` to `…-particles-fallback-layer` where the CSS field
  is what actually paints.
- **`RichChatComposer` in `agent`/`terminal` mode sits on the console
  surface** — the particle backdrop, `data-theme="dark"`, `.uic-chat-console`,
  and an indigo ring on the mode segment. `chat` mode renders byte-identical to
  before, and a host that never wires `onModeChange` sees no change at all.

### Fixed

- **Export snapshot drift**: `PresentationView` shipped in 2.342.0 without
  landing in `export-surface.snapshot.ts`. Regenerated.

---

## [2.341.0] — 2026-09-21

### Added — `./graph` (Active Now): the compute-session detail pane

- **`WorkComputePane`, reached through `WorkActivityNodeDetail.compute`.** A
  work-graph node whose provenance is an agent loop is a machine, not a
  document: it has a model, a context budget it is spending, money it has
  spent, an environment it runs as, a plan it is working through, a live tail,
  files it has written and a real PTY. `WorkNodePane` hands the body to this
  pane whenever the host attaches `compute`; everything around it — the header,
  the close button, the "Reference in chat" footer, the sources and work-item
  sections — is unchanged, and absent `compute` no existing pane renders one
  byte differently.
  - Session card (the banner slot, derived when the host authors none), owner
    row with a status pill, `>_ Open shell` and an overflow menu, the REAL
    `PaneStatusLine` gauges over a mapped `Computer`, and a four-cell metric
    grid (Model · Cost · Context · Environment) for the two numbers a status
    line cannot label.
  - Tabs `Activity | Shell | Workspace`: the live tail as a `LogStream` with
    mock frames flagged, the lazy `ShellTerminal` (through `ChatLabTerminal`)
    once a URL is minted with the terminal digest until then, and the plan,
    the artifacts and the work item.
  - Nothing is invented: a run that reported no cost shows `—`, a session with
    no box has no Shell tab at all, and an empty plan says so.
- **New types:** `WorkComputeDetail`, `WorkComputeStatus`, `WorkComputeStep`,
  `WorkComputeEvent`, `WorkComputeArtifact`, `WorkComputeTerminalLine`,
  `WorkActivityPanelView`.
- **`WorkActivityHeader` gains a body switch** — `view`, `onViewChange`,
  `viewNote` render a segmented `Activity | Computer Lab` on a second row with
  the host's own clause beside it. Without `onViewChange` the header is
  unchanged.

### Added — `./shared`: `RisingParticles`

- **The backdrop a surface wears while it is working.** Four parallax layers of
  a star field rising over a dark radial gradient, because an agent shell that
  is thinking and one that has stopped are otherwise the same dark rectangle,
  and a corner spinner is too small to answer that from across a desk.
  - Fields are GENERATED from `seed` by a deterministic PRNG rather than shipped
    as a wall of coordinates: the same seed is the same sky every time, two
    panes are different skies, and the bundle carries an algorithm.
  - `intensity` scales the point counts; `prefers-reduced-motion` keeps the sky
    and stops the movement; the backdrop is `pointer-events: none`, sits behind
    the children in an isolated stacking context, and crossfades over 250ms, so
    nothing above it moves when the state flips.
- **Applied** to `ChatLabShell` (stream body + prompt while the loop is
  mid-turn), `WorkComputePane` (terminal digest, Activity and Shell tabs) and
  the compute surface's `TailPane` / `ShellTerminal` chrome while the box's
  registry status is `running`.
- **`LogStream` gains `tone: 'transparent'`** — light-on-dark text with no
  background, so a log over the working backdrop does not hide it.

### Added — `./social/rich-composer`: composer modes

- **`RichChatComposer` becomes the one box for talking, delegating and
  running**, all additive and all controlled:
  - `processes` — a one-line status strip above the editor naming what is
    already running.
  - `mode` / `onModeChange` — a segmented `Chat | Agent | Terminal` switch.
    Wiring `onModeChange` is the whole opt-in.
  - `modePlaceholders` — per-mode placeholder; the defaults say what Enter will
    do, which is the thing that changes.
  - `hints` / `onQuickOpen` — the `/` · `>_` · `⌘K` row under the editor.
  - `sendOptions` / `onSendOption` — a split Send whose primary press still
    does exactly what it did.
  - `onShellCommand` — terminal mode turns the editor into a single-line
    monospace prompt with ↑/↓ history. The rich editor stays MOUNTED, so the
    half-written message survives the round trip.
  - Agent mode composes `/agent <text>` through the host's existing command
    path, and the message carries `mode`.
- **The default render is unchanged**: with none of these props there is no
  process line, no switch, no hints row and no split Send, and the message
  carries no `mode` key. Pinned by a test.

---

## [2.337.0] — 2026-09-21

### Fixed — `./graph` (Active Now)

- **Context no longer folds itself at two efforts.** A per-effort height test
  was folding sources behind a "+ 2 sources" chip whenever one effort was
  taller than the pane, which is most of the time. Crowding (three efforts or
  more) still folds up front; otherwise context stays open until the fitted
  view would drop under 40%, where the cards stop being readable anyway. An
  explicit fold or unfold in `view.expandedSourceEfforts` always wins.
- **A relationship that continues in the next column enters from the side.**
  Entering from the top after crossing a column drew the edge back up and over
  the frame — visible on Transcript → Generate presentation in the folded state.
- **Artifact previews scale instead of cropping.** The thumbnail was clipping
  the host's slide (a cut eyebrow, a lost right edge). Both the card thumbnail
  and the pane's slide preview now give the preview a fixed-aspect box to fit
  into.
- **Two inputs that read the same stay two inputs.** `WorkNodePane` keyed its
  input chips by label, so a host with two "Release plan" rows had to
  de-duplicate them to avoid a collision.

### Changed

- `WorkActivityPaneSections.inputs` accepts `WorkActivityReference` objects as
  well as strings, so an input can carry the id that tells it apart.
- Frame chrome matches the prototype: a lighter title dot and a subtler dashed
  border.

## [2.336.0] — 2026-09-21

### Changed — `./graph` (Active Now)

- **The node card is rebuilt to the approved anatomy.** It no longer borrows
  the pipeline `BaseNode`, whose execution-state palette painted a finished
  meeting green and gave every card the same chrome. Now: a coloured accent bar
  down the left for the KIND of work (meeting rose, transcript/terminal blue,
  document/task teal, run violet), a grey header band with a tinted kind icon,
  the title and a status dot, body lines from `detail.lines`, `badge` as a pill,
  `excerpt` in quotes, the artifact's own thumbnail and revision chips, and a
  footer only when the host supplies one. Border colour is reserved for what is
  happening — blue for the current step, red for a failed run, green for an
  artifact with a revision ready to read.
- **A run's tools hang below its card**, where they belong to the attempt rather
  than to the thing itself.
- **The card invents nothing it was not given.** No default `Ready` badge, no
  `Updated …` footer on every node, and no "Preview unavailable" frame where the
  host passed no preview.

### Fixed — `./graph` (Active Now)

- **Effort frames no longer swallow clicks, and their own buttons work again.**
  React Flow marks nodes `pointer-events: none` when nothing is selectable, and
  the frame never re-enabled them — so "Sources" and "Focus" were dead in a real
  browser while passing every test that clicks them synthetically. The frame is
  now explicitly inert with `pointer-events: auto` on its controls.
- **The whole card is one hit target.** Header, body and footer all select;
  activation moved onto the card element itself, which now carries
  `role="button"`, `aria-pressed` and stable `data-work-node` /
  `data-work-card` attributes so a host or a test can address a card without
  depending on DOM order — React Flow reorders nodes when one is selected, which
  is what made "click the 4th node" flaky.

- **A chain with no context beside it wraps into a second column** when it is
  taller than the canvas, instead of shrinking five cards to an unreadable
  ribbon. The two-column grid already covered efforts that declare
  `contextNodeIds`; this is the same rule for the ones that do not.

### Added — `./graph`

- **`WorkActivityNodeDetail.participants`** — `Array<{ id; label; avatarUrl? }>`,
  rendered as an avatar row with an honest "+N" overflow.

### Added — demo

- A "Single column chain" shape in the Active Now fixture: five chained cards
  with no declared context, beside a two-card effort — the shape a real host
  sends, and the one the context grid does not cover.

## [2.335.0] — 2026-09-21

### Fixed — `./graph` (Active Now)

- **The time ruler stops at the clock, not at the end of the day.** With real
  day bounds (a New York day is 04:00Z to 04:00Z) the strip drew the whole
  24 hours: "Now" sat on midnight, the marks were spaced for a day nobody had
  worked yet, and the range label read against the wrong extent. When the
  query is live — `temporalMode: 'recent'` or a following window — the ruler,
  the event dots and the slider now run `bounds.start` to `min(bounds.end,
  now)`, and "Now" carries the real time. A stale window is clamped into that
  extent rather than rendering past its right edge.
- **Hour marks print as a clock face.** A plain 24-hour `h:mm` in the host's
  timezone — no day period, no padded hour — so "2:00, 8:00, 2:00" cannot
  happen again. Spacing adapts to the extent: half-hourly up to 2 hours,
  hourly to 6, two-hourly to 12, three-hourly beyond.

### Added — `./graph`

- **`activity.now`** — the wall clock in epoch milliseconds. Omit it and the
  strip follows the live window, or the browser clock when it is not.

## [2.334.0] — 2026-09-21

### Changed — `./graph` (Active Now)

- **Efforts sit side by side, newest first, and the canvas scales to hold
  them.** Two parallel activities stayed parallel only until the pane got
  narrow, and then stacked — which is the one thing that cannot help, since
  wrapping trades width for height. They now wrap onto a second line only when
  that buys a materially bigger view.
- **Inside an effort the layout is the work's own grid:** every step of the
  chain is a row down the right column, and the context that step was given
  sits in the left column beside it. An effort with no declared
  `contextNodeIds` stays one column of rows.
- **Relationships are orthogonal and hug the grid.** Nodes now carry four
  fixed anchors and the layout names the one each edge uses, so a
  context-to-step edge goes across and a chain edge goes straight down. Edges
  no longer detour around the card they are pointing at.
- **Fit fills the canvas.** The view is centred with a margin instead of being
  drawn small in the top-left corner; the "fit once per structural change"
  rule is unchanged.
- **The operation pill is legible over its own edge** — solid surface, a
  coloured border and a shadow, above the path rather than under it.

### Added — demo

- A `530px pane` width in the Active Now fixture, next to 600/700/895.

## [2.333.0] — 2026-09-21

### Added — `./graph` (Active Now)

- **The activity panel now draws its own chrome.** `activity.title`,
  `subtitle`, `expanded`, `onExpand`, `onPopOut` and `onClose` render a
  `WorkActivityHeader` row — the host still owns every navigation. Hosts that
  already sit inside `ChatSidePanelFrame` leave `title` unset and get the
  frame's header as before; `WorkActivityHeader` is exported for the ones that
  do not.
- **Per-kind detail panes.** Selecting a node opens `WorkNodePane`: chrome, a
  `detail.banner` state line, and whichever bodies the host supplied data for —
  artifact revisions with a slide navigator and "Sources used", a transcript
  with an `Ask` tab, a run's inputs and tools, a terminal's work item, or a
  plain context paragraph. One sticky "Reference in chat" button carries the
  exact revision and page on screen. The Ask exchange is entirely a host
  callback: the graph renders the question and whatever comes back, shows
  `ask.unavailableLabel` when it is disabled, and never calls a model.
- **`activity.detailsPlacement`** — `column` (the default via `auto`),
  `overlay` (what `auto` picks under 820px, where a column would squeeze the
  canvas under 480px), or `none` for a host that places `WorkNodePane` in its
  own grid. The canvas measures the narrower width and re-fits once.
- **Node cards carry the host's own wording.** `lines`, `badge`, `excerpt` and
  `footer` on `WorkActivityNodeDetail`, plus a revision-tab row and a taller
  thumbnail on artifact cards, and `subtitle` on `WorkActivityEffort` for the
  line under a frame title.
- **`failedEdgeIds` and `edgeLabels`.** A failed operation draws in the danger
  tone with a "failed" pill; only an edge the host names gets a pill otherwise.
- **Canvas controls and a footer.** Zoom and "Fit graph" bottom-left, the
  emphasis legend bottom-right, and a footer counting parallel activities with
  an "← Earlier work" step (`activity.onEarlier`, or a default window step).

### Changed — `./graph` (Active Now)

- **The time strip reads as a clock.** Range label, prev/next, a "Following
  now" toggle, a 15/30/60/full-day preset, and an hour ruler computed from
  `bounds` in the host's timezone. Ruler and range labels drop the day period;
  announced values keep it.
- **A finished step no longer shouts louder than a running one.** Only work in
  flight and work that failed get a coloured card.
- **A vertical chain taller than the canvas wraps into a second band of
  columns** instead of running off the bottom — never a third band. The
  automatic fit now goes down to 40% rather than stopping at 100%: the detail
  pane, not the canvas, is where text is read.
- The effort-focus `Select` above the canvas is gone; focus is the frame's own
  "Focus" button and the footer's "← All activities".

## [2.330.0] — 2026-09-18

### Fixed — `./social`

- **The composer toolbar measures itself without needing the rendering
  pipeline.** The callback ref runs before layout, so the width it reads can
  be 0, and the correction afterwards arrived only through ResizeObserver —
  whose callbacks are delivered on the rendering pipeline. A tab that is not
  rendering (backgrounded, or driven by automation) never receives them, and
  the toolbar sat on its "unmeasured" reading forever, keeping every control
  at any width. A layout effect now reads the post-layout width synchronously,
  which needs no pipeline; the observer remains for later resizes.

---

## [2.329.0] — 2026-09-18

### Fixed — `./social`

- **The composer toolbar's width measurement never ran.** 2.327.0 attached the
  ResizeObserver in a mount effect with `[]` deps, and the toolbar row is not
  in the DOM at that point — the composer renders it once Tiptap has an
  editor. The ref read `null`, the effect returned, and nothing re-attached
  it, so no control was ever dropped: measured live at a 234px row, eleven
  controls with the last painting past the composer's own border. It is a
  callback ref now, attaching whenever the node appears, and it measures
  synchronously so a composer that mounts narrow is never painted wide first.
  A zero width reads as "no layout yet" rather than "very narrow".

---

## [2.328.0] — 2026-09-18

### Fixed — `./social`

- **Toolbar buttons are `shrink-0`.** Without it the flex row squeezed every
  control to 21px against a 28px box rather than dropping any — nothing
  overflowed and nothing was hidden, the whole toolbar just became smaller
  than a hurried cursor can hit. Thresholds recalibrated against the measured
  widths.

---

## [2.327.0] — 2026-09-18

### Fixed — `./social`

- **The composer toolbar no longer pushes Send out of the composer.** The row
  is flex with the format group left and Send pushed right by `ml-auto`; the
  group had no `min-w-0`, so its automatic minimum size — eleven buttons —
  stopped it shrinking and the overflow escaped. Measured in a 339px composer:
  Send rendered at x 741–791 while the composer ended at 727, sitting 65px
  outside its own border on top of the pane beside it. The group now shrinks
  and sheds its least-load-bearing controls in order (strikethrough and code
  first, then the list controls), and Send is `shrink-0` and always present.
  The buttons are `shrink-0` too: without that the row squeezed every control
  to 21px against a 28px box rather than dropping any, which is under the size
  a hurried cursor can hit.
  Clipping was not an option for Send, and a scroll container was not an
  option for the group — the emoji popover opens from inside it.

### Added — `./shared`, `./social`

- **`ChannelHeader` takes `onRename`:** double-click the title and the heading
  becomes a field in place. Enter commits, Escape abandons, blur commits. In
  place rather than in a dialog — the thing being renamed is right there and
  it is one field, and a centred modal makes you look away from the title to
  type its new value. `ConversationSurface` forwards it. Omit it for a viewer
  who may not rename, so the affordance does not exist where the action would
  be refused.

---

## [2.326.0] — 2026-09-18

### Added — `./social`, `./ui`

- **Custom sections on the conversation rail.** `ConversationItem.section` is
  a heading the reader filed the row under — the Slack/Teams idea of naming
  your own groups. Sections render between Pinned and the built-in Channels /
  Direct messages, ordered by NAME rather than recency: a filing system whose
  drawers move around defeats the point of having made one. A pin still
  outranks a section — "keep this in reach" is a stronger statement than "file
  this under Work", and a pinned row pulled down into a section is a pin that
  stopped working. A blank section counts as none.
- **`onSetSection`** on `ConversationRail` / `ConversationList`: "Move to
  section…" in the row menu, reading "Move from <name>…" for a row already
  filed. Offered on every row when given, unlike Rename — filing is the
  reader's own arrangement of their own rail and needs nobody's permission.
- **`FolderIcon`**, for that menu row.

---

## [2.325.0] — 2026-09-18

### Added — `./social`

- **`ConversationRail` / `ConversationList` take `onRename` and `canRename`.**
  The Teams/Slack "Rename channel" row in each conversation's ⋯ menu. Offered
  per row rather than per list because renaming is a permission — only a
  room's owner may — and a menu row that cannot do what it says is worse than
  an absent one. `canRename` lets the host answer per row; a DM will typically
  answer false, since it has no name of its own and is named by the people in
  it.

---

## [2.324.0] — 2026-09-17

### Changed — `./social`

- **An empty Documents tab is ONE answer, not two.** The create rows sat
  above the list in both states, so an empty tab announced the blankness
  twice: two start links in the top-left, and an empty state explaining the
  same nothing from the middle of the pane, with a field of dead space
  between them. Empty now folds both ways to start into the empty state
  itself; once there is a list, the rows go back above it — by then the
  question is "which document", not "how do I begin". Same testids in both
  layouts.

### Added — `./social`

- **`ChatSidePanel` takes `subtitle` and `actions`.** Both already existed on
  `ChatSidePanelFrame` and stopped there. A panel beside a conversation gets
  its context free — the thread is right there — but one that takes the whole
  pane does not, and a bare document title over a full-width canvas reads as a
  separate place the app navigated to rather than something open inside a
  channel. `subtitle` is where the host says which conversation it belongs to;
  `actions` is where the way back goes.

---

## [2.323.0] — 2026-09-17

### Added — `./social`

- **`ConversationSurface` forwards `onCreateWhiteboard`.** 2.322.0 gave
  `ChannelDocumentsPanel` the handler but stopped there, and no page reaches
  that panel directly — every one of them goes through the surface. So the
  affordance existed and could not be wired to anything. The surface now
  passes it down, and a test fails if that line is ever dropped again.

---

## [2.322.0] — 2026-09-17

### Added — `./social`, `./ui`

- **A conversation can start a WHITEBOARD, not only a document.**
  `ChannelDocumentsPanel` takes `onCreateWhiteboard` beside `onCreate`. The
  product has had two authoring surfaces for a while — a page you write down,
  and an infinite canvas you draw on with others in real time — and a
  conversation's Documents tab could only ever start the first, so the canvas
  was unreachable from the place people actually decide to sketch something.
  Either affordance can be offered alone, both, or neither.
- **`WhiteboardIcon`** — a board with a shape and a connector. Deliberately not
  the document glyph with something added: the two sit next to each other and
  have to be told apart at a glance.

---

## [2.319.0] — 2026-09-17

### Changed — `./video`

- **`HangoutPreJoinShell` is tighter, and its controls no longer sit on the
  subject's face.** Three things were costing the surface its space and its
  point:

  - The heading was a full-width **centred row above everything**, so a line of
    text bought ~90px of vertical space and left both columns stranded in air.
    It now sits at the top of the side column, left-aligned, costing no
    vertical space of its own — the stage starts at the top of the surface.
  - The control bar was pinned **bottom-centre on the preview**, which is
    exactly where a face is when somebody frames themselves normally. It is a
    vertical rail on the **right edge** now: still on the preview, because the
    controls belong to it, but on the empty part of almost every webcam shot.
  - Container and cards tightened — `max-w-6xl`→`5xl`, gaps `6`→`4`/`3`,
    padding `py-6`→`py-4` and cards `p-4`→`p-3`, side column `80/96`→`72/80`.

  No API change; every `data-testid` is unchanged.

---

## [2.318.0] — 2026-09-17

### Fixed — `./social`

- **An attachment nobody can open is no longer rendered as a control.**
  `AttachmentBubble` drew a `<button>` either way, with `onClick` merely
  undefined when no `onOpen` was given — so an attachment announced "Download
  report.pdf, button", took a tab stop, and did nothing when pressed. The file
  variant also kept its hover highlight, which is an affordance promising the
  same thing.

  Every attachment in the consuming product was in that state, because no host
  passes `onOpen`. Same rule `MessageActionBar` states for Forward and Pin: a
  control the product will not honour is not rendered disabled, it is not
  rendered. The frame is still drawn — it holds the picture — as plain content
  rather than a button, and the name and size still identify the file. Pass
  `onOpen` and it becomes a real control again.

## [2.317.0] — 2026-09-17

### Changed — `./shared`

- **BREAKING (ARIA only): `SegmentedControl` is a `radiogroup`.** Every caller
  uses it for ONE choice out of a few — Public/Private,
  Editing/Suggesting/Viewing, Ring me/Do not disturb — but it announced as a
  `group` of independent `aria-pressed` toggles: "Public, pressed", then
  "Private, not pressed", with nothing saying they are one question, and a tab
  stop for every option.

  Now `role="radiogroup"` with `role="radio"` options and `aria-checked`, one
  tab stop **on the chosen option** (so Tab lands on the current answer), and
  arrow keys that move AND choose — which is what a segmented control looks
  like it does. Up/Down work as well as Left/Right, Home/End jump to the ends,
  and both edges wrap. Disabled ignores the arrows.

  No prop changes. Tests that queried the segments with
  `getByRole('button')` or asserted `aria-pressed` need
  `getByRole('radio')` / `aria-checked`; the two in this repo are updated.

## [2.316.0] — 2026-09-17

### Added — `./shared`

- **`useRovingToolbar`** — the toolbar keyboard contract as a hook, for an
  element that already exists and already has its own classes, data attributes
  and layout. `RovingToolbar` is now a thin wrapper over it.

### Fixed — `./doc-editor`

- **`DocumentToolbar` behaves like the toolbar it says it is.** It has carried
  `role="toolbar"` since it was written while having 22 tab stops inside it and
  arrow keys that did nothing — a declared role is a promise about the
  keyboard, and a reader told "toolbar" reaches for the arrows. It adopts the
  hook, so the promise is kept without a wrapper element. The three native
  `<select>`s keep their own tab stops and their own arrow keys, which is what
  stepping a select's value means there.

### Fixed — `./shared`

- **A roving toolbar no longer swallows a nested widget's keys.** An open menu
  usually renders inside the toolbar it belongs to and its items are buttons
  too, so they were being collected as toolbar controls: Home/End moved
  toolbar focus and closed the menu mid-keystroke. Controls inside a `menu`,
  `listbox`, `dialog`, `menubar` or `grid` are no longer the toolbar's, and
  the bar acts only when focus is on one of its own. Caught by
  `DocumentToolbar`'s alignment menu the moment the hook was attached.

## [2.315.0] — 2026-09-17

### Added — `./shared`

- **`SegmentedControl` accepts `aria-labelledby`.** It already warned in its
  own docs that `role="group"` with no name announces as a bare "group" — a
  reader arriving at Public / Private is told two unrelated toggle buttons
  rather than one setting with two values — but it offered only `aria-label`,
  which means retyping wording that is already on screen and can drift from
  it. Inside a form the name should come from the visible label: pass the
  `labelId` a `FormField` hands its render prop, the same wiring `Switch`
  already takes.

## [2.314.0] — 2026-09-17

### Added — `./shared`

- **`RovingToolbar`** — a group of related controls that costs ONE tab stop.
  A row of icon buttons is the easiest thing to build and one of the easiest
  to make unusable: every button is focusable, so every button is a tab stop.
  Implements the WAI-ARIA toolbar pattern — one stop, arrow keys within,
  Home/End, wrapping, cross-axis keys left alone so the page still scrolls.

  It reads its rendered buttons from the DOM rather than taking a list of
  descriptors, because real toolbars have conditional children, wrapper spans
  holding popovers, separators and self-disabling buttons; a descriptor API
  would make every caller flatten all of that. Disabled controls are skipped,
  and the tab stop survives controls disappearing. The index is derived from
  `document.activeElement` on each keypress rather than held in state, so a
  HELD arrow key cannot outrun a re-render.

### Changed — `./social`

- **The chat composer's format bar is one tab stop.** Measured on the product's
  own `#general`: 14 stops between entering the composer and leaving it, 11 of
  them Bold/Italic/Quote and friends — on every chat surface, the embedded
  document and in-call ones included. Send stays OUTSIDE the group: it is the
  primary action, not a formatting control, and people reach for it with Tab.

- **`MessageActionBar` now uses `RovingToolbar`** instead of its own copy of
  the same logic, shipped one version earlier. Behaviour is unchanged (its
  tests, including the held-key and disappearing-control cases, pass against
  both). Two implementations of a keyboard pattern is precisely how one of
  them drifts out of reach.

## [2.313.0] — 2026-09-17

### Fixed — `./social`

- **`MessageActionBar`'s arrow keys advance once per press when the key is
  held.** The roving index was read from state, so two keydowns in the same
  tick — which is what key repeat is — both computed from the pre-render value
  and landed on the same control: holding the arrow key moved one step and
  stopped. Confirmed in a browser, not just in theory. The index is now kept
  in a ref as well as state: state renders the `tabIndex`, the ref computes
  the next one.

## [2.312.0] — 2026-09-17

### Changed — `./social`

- **`MessageActionBar` is one tab stop, not eight.** Every control sat in the
  sequential tab order, which made the bar reachable and the transcript
  untraversable: measured on a seeded `#general`, 7 messages x 8 controls =
  56 presses to reach the composer, and a hundred-message channel would be
  eight hundred. It is a WAI-ARIA toolbar now — `role="toolbar"`, one control
  in the tab order, arrow keys between them, Home/End to the ends, wrapping at
  both edges. Up and down are left alone so the page still scrolls. Clicking
  or focusing a control makes it the stop, so tabbing back in returns you
  where you were. The tab stop survives controls disappearing (a message that
  loses its Pin must not leave the index past the end, which would drop the
  whole bar out of the tab order).

  No API change: the props are identical and every control still clicks
  through to the same handler.

## [2.311.0] — 2026-09-17

### Added — `./shared`

- **`InlineAlert` forwards `data-testid` to the alert element itself.** An
  alert is the element a test most wants to assert on — it carries both the
  role and the message — and there was no way to address one. Callers had to
  wrap it in a div and assert on the wrapper, which puts the testid on a
  different element than the `role="alert"`. Declared the same way `Chip`
  does it.

## [2.310.0] — 2026-09-17

### Fixed — `./social`

- **The chat composer is no longer a white slab in dark mode.** A host may
  paint `.ProseMirror` as paper — a white sheet with fixed dark ink — so a
  document's prose keeps its own surface when the app goes dark. That is right
  for a document and wrong for a message box, and every `.ProseMirror` on the
  page inherits it: the composer sat bright white at the foot of a dark
  conversation while its own shell was correctly themed.
- `.chat-composer .ProseMirror` is two classes to the host rule's one, so it
  wins wherever it lands in the cascade. Transparent rather than a colour of its
  own — the shell around it is already themed, and painting the inner box a
  second time is how the two drift apart. The placeholder takes the theme too.

---

## [2.309.0] — 2026-09-17

### Fixed — `./shared`

- **`ThinkingDots` stops injecting a `<style>` block and inline styles.** It
  built every dot with a `style` object and shipped its own `<style>` element
  for the keyframes — so each indicator on screen put another copy of the same
  rule in the DOM, and the CSS text turned up inside the element's own
  `textContent`: a typing indicator read as *"@keyframes thinkDot { … } Bob
  Martinez is typing…"*. The keyframes live in `styles.css` with every other
  one, and the dots are Tailwind classes.
- **The animation respects `prefers-reduced-motion`.** An indicator that never
  stops is exactly the motion that setting is for; the dots stay at their
  dimmed rest state so the meaning survives.

### Removed — `./shared`

- **`ThinkingDots.color` and `TypingIndicator.color`.** The prop took an
  arbitrary CSS string and could only ever be applied as an inline style, which
  is banned here. The dots take `currentColor` now — `TypingIndicator` already
  set a text colour on the span around them, so they match the words beside
  them without a second source of truth. Nothing passed either prop.

---

## [2.308.0] — 2026-09-17

### Added — `./social`

- **`ChatPanel.onCopyLink`** — "Copy link to message". `MessageActionBar` has
  offered the control since it was written and `ChatPanel` never passed the
  prop, so no host could reach it, while the app has honoured
  `?jump=<messageId>` links all along. Another pair of finished halves that had
  never been connected.
- **The host builds the link, not the panel.** A link needs a route and the
  library has no router. Omit the prop and the control does not render, which is
  the rule every other action on that bar follows — a Copy link that copies
  nothing is worse than no Copy link.
- Withheld on activity notices, which have no words of their own to link to —
  the same reason they take no reactions and cannot be forwarded.

---

## [2.307.0] — 2026-09-17

### Changed — `./shared`

- **`FormField layout="inline"` is a settings row, not a flex line.** It laid
  out label → control → hint, which put the sentence explaining a setting on
  the far side of the switch from the words it explains: "Record my DM calls
  [switch] Both people must turn this on" reads as three unrelated fragments.
  The label and its hint are now one block and the control goes to the end of
  the row, which is where a settings toggle sits everywhere else. Every caller
  of this layout is a switch with something to explain, so none needed to
  change.
- A long hint wraps inside its block instead of pushing the control off the end.

---

## [2.306.0] — 2026-09-17

### Changed — `./social`

- **A post with no replies no longer carries its own "Reply" underneath.**
  It was revealed on hover — and so is the message action bar, by the same
  gesture, with a Reply of its own. Hovering an ordinary message therefore
  offered Reply twice: an arrow in the toolbar and a word below. The toolbar's
  is the one that generalises (every message has it, threaded or not), so the
  duplicate goes.
- **A thread that HAS replies keeps its foot Reply, permanently.** There it is
  a different act — "add to this thread", under the last reply — and it cannot
  be reached from the root's hover bar.

---

## [2.305.0] — 2026-09-17

### Fixed — `./social`

- **You can react with something other than the quick three.**
  `MessageActionBar` has offered a "More reactions" control all along and
  `ChatPanel` never wired it, so no host could reach it — three emoji were the
  entire vocabulary a reader had, where Teams lets you answer with any of them.
  The picker is `ReactionPickerPopover`, already built and until now reachable
  only from the composer.
- **Owned by the panel, not handed to the host.** Picking an emoji is the same
  act as pressing one of the quick three: it ends in `onToggleReaction`, which
  every host already supplies, so this needs no host change at all. One picker
  for the whole transcript, anchored at whichever button was pressed, rather
  than a 64-emoji grid mounted per row.
- **The built-in composer's emoji button is a drawn glyph**, not 🙂 — missed by
  the earlier sweep because it lives in `ChatPanel`'s own fallback composer
  rather than in `RichChatComposer`.

---

## [2.304.0] — 2026-09-17

### Added — `./social`

- **`TeamChannelTree.filter`** — so a channel inside a team can be found by
  typing its name. A rail that filtered only its flat rows left every team
  channel unreachable by search: typing "standups" returned nothing while
  #Standups sat one fold away, which is exactly the case search exists for —
  reaching a conversation you are *not* already looking at.
- A team whose own NAME matches keeps all its channels (you asked for the
  team); any other shows only the channels that match, and a team with neither
  drops out.
- **The filter's expansion does not disturb the reader's.** A team is shown
  open because it is an ANSWER, so this short-circuits above the stored
  expansion rather than writing to it — clearing the box restores exactly the
  tree that was there before.

---

## [2.303.0] — 2026-09-17

### Added — `./hangout`

- **`InviteCandidateList.confirmCountLabel`** — the counted form of the confirm
  button, for a verb the default does not fit. `<verb> N people` is English for
  "Invite" and "Call", which is why it was written that way, and stopped being
  English the moment a host passed a verb wanting a preposition: the New chat
  picker read **"Start chat 2 people"**. The grammar belongs to the caller's
  verb and the caller is the only thing that knows it.

### Fixed — `./social`

- **The last two emoji in the chat surfaces' chrome are drawn glyphs.** The
  side-panel registry's 🧩 and the Mentions empty state's `@` — the second not
  an emoji but a text character standing in for an icon, and a different weight
  from every other empty state's mark.

---

## [2.302.0] — 2026-09-17

### Added — `./social`

- **"Sent" — the other half of the read-receipt pair.** A message nobody had
  opened yet showed no status at all, so "delivered, unread" and "never left"
  looked identical, which is precisely the window where a sender wants to know.
  Teams draws both halves; this draws the first one under the same single
  message the "Seen" line uses.
- Still **never "Seen by 0"** — the reason the line used to say nothing. A count
  of nobody turns every unanswered message into a small notice about being
  ignored. "Sent" is a claim about delivery instead, and it is true by
  construction: the line only ever anchors to a message the gateway handed
  back, never to a local row still in flight.
- **Only for hosts that wire receipts.** `readReceipts` being absent is now
  distinguished from its being an empty array: a host that passes nothing gets
  nothing. `readReceiptsEnabled` could not carry this, defaulting to `true` —
  its absence looks like consent — and without the split, an in-call chat that
  supplies `currentUserId` and no receipts would grow a status line it never
  asked for.

---

## [2.301.0] — 2026-09-17

### Fixed — `./shared`

- **A popover with no room below it flips above its trigger instead of sliding
  over it.** The correction pass only ever measured the PANEL, which is enough
  to push it back on screen and not enough to decide it belongs on the other
  side of the anchor — so a picker opened from a control at the foot of the
  window (the chat composer's "Share a document") was slid up until it fitted
  and landed on top of the composer that opened it. It now takes the other side
  when there is room there, which is what every popover library does and what a
  reader expects. Sliding remains the fallback for when neither side has room,
  because overlapping the trigger beats hanging off the screen.

  No API change: `placement` still names the PREFERRED side, and a panel that
  fits below is untouched.

---

## [2.300.0] — 2026-09-16

### Changed — `./social`

- **`ChatPanel`'s `onForwardMessage` hands back the Forward button** as a
  second argument, and `MessageActionBar`'s `onForward` does the same. Picking
  a destination is a small act started from one message's hover bar, and the
  picker that served it was a centred card over a dimmed page — nowhere near
  the words it was about. Only the panel knows which of a transcript's many
  Forward buttons was pressed, so it says, and the host anchors its popover
  there. Additive for TypeScript: a handler that takes the message alone is
  still assignable.
- **`MessageActionBar`'s internal button helper takes the click event.** The
  alternative was a second, hand-rolled button beside the shared one for
  Forward's sake, which would have duplicated both the class string and the
  focus-ring that keeps the bar reachable without a pointer — the shape that
  leaves one of two copies keyboard-dead. The other seven controls ignore the
  argument and are unchanged.

### Changed — `./shared`

- **`PopoverForm` accepts `submitSlot={false}`** for a body that IS the commit
  — a destination picker's rows forward on click, so a confirm button beside
  them would have no state to act on. The footer keeps Cancel, which is the
  way out a popover still owes anyone who opened it by accident.

### Added — `./shared`

- **`SearchIcon`** — the magnifier `SearchInput` already drew inline in its own
  gutter, lifted out so the empty state that follows a fruitless search can use
  it too. That empty state had been reaching for the 🔍 emoji, which ignores
  `currentColor` and so stayed bright on chrome that had gone muted, in a shape
  set by the platform's font rather than this design's.

## [2.299.0] — 2026-09-16

### Added — `./social`

- **`NewChatDialog`** — "New chat" as a popover at the + that asked for it.
  It was a centred modal over a dimmed page while "Create a channel", one
  section away in the same rail, was already anchored and compact: two adjacent
  acts that felt like they belonged to different applications. Starting a chat
  is the smaller of the two and has no business dimming the room. The people
  list is the same `InviteCandidateList` the call invite uses, through its
  render-prop seam — rows in the popover body, its own confirm in the shell's
  footer, so the count stays on the button.

### Changed — `./shared`, `./hangout`

- **`PopoverForm` takes a `submitSlot`** — a confirm control to render instead
  of the shell's own button, for a form whose body already owns the decision. A
  people picker knows how many are selected; the shell cannot learn that
  without the caller lifting selection out of the component that manages it.
- **`InviteCandidateList`'s confirm derives its testid** from the list's own
  when the host supplies one, so a "New chat" popover stops emitting a control
  named after calling. Unchanged (`invite-to-call-confirm`) when it does not.

### Fixed — `./social`

- **A pinned team or channel wears its pin next to its name.** The pin sat
  after a `flex-1` label, so the label ate the free width and pushed the pin to
  the far end of the row — and since the + and ⋯ out there stay hidden until
  hover, at rest it read as a stray glyph floating in whitespace rather than a
  mark on the name. Name and pin now travel together; mention dots and unread
  counts stay at the row's end, where a count belongs.

---

## [2.298.0] — 2026-09-16

### Fixed — `./social`

- **A pinned entry is stamped with when the message was SENT, not when it was
  pinned.** `PinnedMessagesPanel` had only `pinnedAt` to show, so a message
  sent at 19:27 and pinned at 20:53 read as 19:27 in the transcript and 20:53
  in the Pinned panel — one message wearing two times, and the panel showing
  the one a reader cannot match against anything. A pinned entry is a handle on
  a message and the next move is to go find it, so the stamp is now `sentAt`,
  which is what the transcript shows. Teams and Slack both do this, and put the
  pinning act in the byline — where `pinned by …` already was.
- The pinning time is not thrown away: when the two differ the hover reads
  "Sent … · pinned …".

### Added — `./social`

- **`PinnedMessageItem.sentAt`**, optional. Pins written before the gateway
  denormalised it have none and fall back to `pinnedAt` rather than losing
  their stamp.

---

## [2.297.0] — 2026-09-16

### Fixed — `./doc-editor`

- **The margin toggle no longer calls a suggestion a comment.** The canvas
  gutter holds two things — comment threads and proposed edits — and
  `CanvasDocumentView` measured it with `gutterItems.length`, handing the total
  to `DocumentToolbar` under the name `commentCount`. So a document where an
  agent had left one suggestion and nobody had left a thread put "Comments 1"
  on the bar, with an accessible name of "Hide comments (1)", over an empty
  comments table. The reader goes looking for a discussion that was never had.

  The count was never the wrong half — "there are N things in the margin" is
  the useful signal and it stays a single total. The noun was. `GutterItem`
  now carries a `kind` (`'comment' | 'suggestion'`), the view tallies by it,
  and the toggle names what it is actually hiding: **Comments** for threads
  alone, **Suggestions** for proposed edits alone, and **Markup** for a margin
  holding both. Markup is Word's word for exactly this mixture — its Review tab
  hides and shows comments and tracked changes together under Show Markup —
  and it is borrowed only for the mixed case, because a specific true noun
  beats a general one. The accessible name is derived from the visible one
  rather than written a second time, so the two cannot drift.

- **`kind` is optional and defaults to `'comment'`**, so no caller breaks: every
  host passing gutter items before this was passing threads, and hedging their
  true label into a general one to accommodate a field they do not set would be
  a worse outcome than the bug. A host that renders anything else in the margin
  must label it.

- `DocumentToolbar` takes a new `suggestionCount` beside `commentCount`, and
  offers the toggle whenever EITHER is non-zero — gating on the comment count
  alone left a margin of nothing but agent edits with no way to put it away.
  `commentCount` keeps meaning what its name says.

---

## [2.296.0] — 2026-09-16

### Fixed — `./social`

- **A quote no longer claims the id of the message it quotes.** `QuoteBlock`
  rendered `data-message-id={quote.messageId}` on its own container, but that
  attribute is how a ROW says which message it is, and it is what every jump in
  the app selects on. So `[data-message-id="X"]` matched both X and every quote
  OF X, and whichever came first in the document won the scroll. Harmless while
  the original sits above its replies; wrong the moment the target has scrolled
  out of the loaded window — which is precisely when somebody presses a quote.
  The reference now spells itself `data-quoted-message-id`.

  **Breaking only for a host that selected a quote by `data-message-id`**,
  which was selecting on a collision. A host that scoped its jump to rows (by
  pairing the attribute with `[data-testid="chat-message"]`, as this library's
  own tests had to) can drop that workaround.

---

## [2.295.0] — 2026-09-16

### Fixed — `./social`

- **The document glyph is drawn, not borrowed.** 📄 was the last emoji left in
  the chat surfaces' chrome: on the run card's document row, the run summary's,
  the composer's generic file tile, and as the fallback wherever a document has
  no icon of its own. Same two problems as the composer emoji before it — a
  colour emoji ignores `currentColor`, so it stayed bright beside muted text and
  did not dim with the row it belongs to; and its shape is the platform's, not
  this design's.
- A type's OWN icon is still rendered exactly as given. That is data — the
  identity somebody chose for that kind of document — and the split is
  deliberate: only the fallback, which means "no icon chosen", became a glyph,
  the way a missing avatar falls back to initials rather than to a random face.

---

## [2.294.0] — 2026-09-16

### Added — `./video`

- **`CallInterruptedNotice`, for the call that stopped and will not start
  itself again.** `CallNoticePill` is one truncating line, and that is the
  right shape for "Reconnecting…" — transient, self-resolving, not worth
  covering a tile for. Hosts were using it for terminal failure too, where
  every one of those properties is false: the call is gone until someone acts,
  there are two actions with different consequences, and the person cannot
  choose between them without knowing what happened. The pill could only ever
  say "Call disconnected", because a second sentence hits its own `truncate`
  and gets clipped — which is worse than absent, since a half-sentence about a
  broken call reads as a second bug.

  So this is the same notice at card scale: a centred card over the stage the
  way Teams and Zoom both stage this, with a title, one line of cause, and the
  actions underneath. It is `role="alert"`, not the pill's `role="status"` — a
  polite region is queued behind whatever the screen reader is already saying
  and may be dropped entirely, which turns a dead call into silence. Not
  `alertdialog`: that contract obliges us to trap focus, and taking the control
  bar away from someone who only wanted to hang up is the wrong trade.

  Copy is consumer-supplied. "The call failed" is several different sentences
  depending on what the host actually knows — exhausted ICE retries, a revoked
  token, a room closed underneath you — and baking one of them in makes the
  other two lie. The card paints in `--color-call-chrome` rather than the host
  theme, because the stage it sits on is dark in both.

---

## [2.293.0] — 2026-09-16

### Fixed — `./social`

- **The composer toolbar and the message hover bar draw their controls now.**
  🔗 ❝ 🙂 📎 in `RichChatComposer` and 😀 ↩ 🔗 in `MessageActionBar` were the
  last emoji left sitting under and over every message on every chat surface,
  and two separate things were wrong with them. A colour emoji does not take
  `currentColor`: it stays bright on a muted toolbar, ignores the hover, active
  and disabled states of the button around it, and does not invert for dark
  mode — so it reads as a sticker stuck onto a control rather than as the
  control. And the glyphs are font-dependent. ❝ and ↩ sit in the
  U+2190–U+27BF range, which renders as a *text* glyph on one platform and a
  *colour* one on another unless a U+FE0E variation selector forces it — the
  same trap 2.289.1 hit with U+21AA on Forward and the disclosure triangle hit
  with U+25B6. They are stroke icons on `currentColor` now, sized to the
  buttons that already exist rather than to themselves: 16px in the composer's
  `h-7` toolbar, 14px in the action bar so they weigh the same as the
  `ForwardIcon` and `PinIcon` already beside them. Every `aria-label`, `title`
  and `data-testid` is unchanged — the icons are `aria-hidden` and the button
  is still what carries the name.
- **The reactions themselves are untouched.** 👍 🎉 ❤️ on a message are the
  character a person chose to send — content, not chrome — so only the button
  that OPENS the picker became an icon. The quick row is still the emoji.

### Added — `./shared`

- **`LinkIcon`, `QuoteIcon`, `SmileyIcon` and `ReplyIcon`** in `ui/Icons`,
  drawn to the set's existing convention (16px default, `0 0 16` viewBox,
  1.5 stroke on `currentColor`). `ReplyIcon` is deliberately `ForwardIcon`
  mirrored: `MessageActionBar`'s own note says reply and forward are the same
  gesture pointed different ways, and two arrows that disagreed about their
  weight would say the opposite. `PaperclipIcon` already existed and is reused
  rather than redrawn.

---

## [2.292.0] — 2026-09-16

### Fixed — `./social`

- **A conversation row says which day it means.** `ConversationList` stamped
  every row with a bare `HH:MM`, which is right in a transcript — a day
  separator sits above it — and wrong in a rail, where nothing does. A channel
  nobody had touched since Sunday read as `21:52` tonight, and when the hour
  was later than the current one, as the future. Rows now carry the time for
  today, the word for yesterday, a short weekday inside the week, and a date
  beyond it. The stamp is a `<time>` with the ISO instant and the full local
  date and time as its `title`, so the exact moment is one hover away and a
  screen reader is not left with four digits. The label still changes only at
  midnight, so a row does not rerender because time passed.

### Added — `./social`

- **`conversationStamp(iso, now?)`**, the rule above, exported from
  `dayBoundary` beside `dayLabel`. It is the same rule an activity feed needs,
  so hosts can stop keeping a copy of it.

---

## [2.291.0] — 2026-09-16

### Added — `./social`

- **`forwardOriginLabel`, `forwardAttributionLine` and `withoutForwardAttribution`
  are exported.** 2.290.0 shipped the de-duplication but kept its helpers
  private, so a host had no way to compose a forwarded body with the same
  sentence the panel strips — and a host keeping its own copy of the wording
  loses the de-duplication the moment either side is reworded. The exports make
  the agreement between the two enforceable instead of coincidental.

### Fixed — `./social`

- **The de-duplication now fires on rich bodies too.** It previously declined
  on any message carrying `metadata.html`, which excluded exactly the case it
  was written for: a forward carries no html until someone edits it, and the
  edit path re-encodes the whole body. The question is now asked of what is
  actually rendered. On the rich path the line is taken off the parsed DOM, not
  the markup string — the first text node must itself begin with the whole
  line, so an attribution spelled across inline elements declines rather than
  being half-eaten, and a body that would be left empty is left alone. Removal
  only; `MessageBody`'s allow-list sanitizer still runs downstream. Both the
  html and the plain-text fallback lose the line together, so a client that
  renders the text does not show the sentence the marker is already showing.

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
