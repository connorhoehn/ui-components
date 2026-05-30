# Changelog

All notable changes to `@connorhoehn/ui-components` will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

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
