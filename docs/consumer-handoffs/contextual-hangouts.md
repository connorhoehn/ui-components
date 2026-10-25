# Contextual hangout surfaces — 2.481.1

The AgentCore hangout page now owns its call stage, conversation and room layout
as separate tabs. These additive library APIs support that composition:

- `CallBlock placement="stage"` claims the single media outlet ahead of a
  composer or side pane. Its `CallDock layout="stage"` places responsive call
  controls below the participant grid; existing grid-only placement is unchanged.
- `useSidePaneHost().fits` exposes the measured split constraint so hosts can
  avoid opening a second panel that squeezes the primary content.
- `CollectionToolbar layout="cards"` aligns controls with cards; ordinary table
  toolbars keep their table inset.
- `NewHangoutRoomDialog` uses shared compact form controls, user-facing call
  settings and standard modal actions. Call rejoin forwards optional `audioOnly`
  through the pre-join gate (realtime-modules 0.138.0).

The shared `TableTh` now uses secondary text contrast. The new stylesheet token
`--color-on-danger` supplies the foreground for solid danger buttons: white in
the light theme, dark ink against the dark theme's lighter red. Consumers that
override `--color-danger` should also set this foreground when necessary.
This document is the handoff for the token and changelog edits.

The portable DOM audit adds a named card-toolbar profile, page-body gutters,
unique activity regions and painted combobox-frame measurements. Bottom-docked
composer whitespace is distinguished from blank bands between content blocks;
valid and deliberately broken fixtures cover the distinction.

Verification: 1,019 Vitest files / 11,214 tests passed (2 skipped), source/demo
typechecking and the library build passed. The audit mutation suite and skill
validator passed. The packed artifact is consumed by aws-agentcore's portal;
its local two-person media journey and scoped visual audit are recorded there.
These checks do not establish cloud media capacity or all-tenant UI acceptance.
