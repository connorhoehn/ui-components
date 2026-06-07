# Changelog

All notable changes to `@connorhoehn/ui-components` will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

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
  `@connorhoehn/realtime-modules/client/video` to `<HangoutLayout>`.
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
  2218 tests pass, `tsc --noEmit` clean. `@connorhoehn/realtime-modules`
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
  `import { ... } from '@connorhoehn/ui-components'` (previously only
  available through deep imports under `…/components/layout`). Additive;
  no name collisions with shared/sidebar/hangout barrels. Refs hub#1021.
- Root barrel now re-exports `./components/social`, `./components/video`,
  and `./components/identity`. Consumers can `import { ChatPanel, ChatRoom,
  RoomList, PostFeed, GroupPanel, PresencePanel, ActivityPanel, SocialPanel,
  VideoPlayer, VideoGrid, CallWidget, HangoutLayout, RosterPanel,
  StreamVideo, RecordingPlayer, TranscriptOverlay, LoginPage, LogoutPage,
  MfaSetupPage, MfaVerifyPage, MfaDashboardPage, ConsentPage, ErrorPage,
  IdentityAdminLayout, PoolScopedLayout, EntityTable, CodeInput,
  QrCodeDisplay, StatusBadge, ... } from '@connorhoehn/ui-components'`
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
