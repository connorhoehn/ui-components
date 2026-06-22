# Roadmap — @connorhoehnslalom/ui-components

This document captures the active 5-wave plan adopted on 2026-05-30 (see
`docs/AUTONOMY_CHARTER.md` and agent-hub task #1071). Earlier
phase-tracked work (T-W3a / S1–S3 / Storybook 10 setup) has been
incorporated into the wave plan.

Current version: **2.19.0**.

---

## Wave 0 — Charter + reachability ✅ COMPLETE

Foundational work so later waves can run without re-deciding policy on
every task.

- **#1028 — adopt `docs/AUTONOMY_CHARTER.md`** ✅ (commits `0f4527b`, `5c10e5b`).
  Codifies no-touch list, version-bump rules, daily cap, pre-commit
  gates, and consumer notification protocol.
- **#1021 — root re-export `/layout`** ✅ (commit `4276bfe`, v2.12.0).
  `AppShell`, `AppLayout`, `CollapsibleSidebar`, `ConnectionStatus`,
  `ApiDegradedBanner`, `CollapsedIconStrip` now reachable from root.
- **#1058 — root re-export `/social`, `/video`, `/identity`** ✅
  (commit `4d156e5`, v2.12.0). Includes disambiguator aliases
  (`CommentThreadPanel`, `VideoParticipant`, `IdentityFormField`,
  `IdentityFormFieldProps`, `IdentityAuditPage`).

The `/agents`, `/pipelines`, `/doc-editor`, `/observability`, `/ingest`
sub-paths remain subpath-only pending Wave 5 graduation.

---

## Wave 1 — Ship missing primitives (largely shipped)

Library-side primitives that consumer apps and the demo were hand-rolling.
Wave 1 unblocks the inline-style eradication in Waves 2 and 3.

Shipped:

- `<CodeBlock>` (#1017), `<DocsShell>` + `<DocsSidebar>` + `<DocsTopNav>` (#1018)
- `<LogStream>` / `<TerminalLog>` (#1020)
- `<ThumbnailCard>` + `<CatalogGrid>` (#1019)
- `<DataTable>` (#1026), `<Tabs>` (#1036), `<StatCard>` + sparkline (#1142)
- `<AlertList>` + `<AlertItem>` (#1023), `<HealthGrid>` + `<HealthCell>` (#1025)
- `<KPIGrid>` (#1030), `<StackDiagram>` (#1038), `<SettingsLayout>` (#1044)
- `<TypingIndicator>`, `<ErrorState>` / `<LoadingState>`, `<PresenceDot>` / `<UserChip>`
- `<ConnectionPill>` canonical (#984), `<TopNav>` + `<NavTabs>` (#983)
- `<MessageRow>` + `<MessageGroup>` (#985), `ChatPanel` avatar slot (#982)
- `<ReactionsBar>` + `<ReactionPickerPopover>` (#988)
- `<RecordingRow>` + `<RecordingList>` actions slot (#987)
- `<AutoplayGate>` + `<StreamVideo>` playState (#1296)
- `<HangoutGrid>` + `<HangoutSpotlight>` (#1224)
- `<CallControls>` + `<CallParticipantStrip>` + `<CallStatsOverlay>` (#1205)
- `<ReconnectingShim>` + `<NetworkErrorBoundary>` (#1061), opt-in shim wrap (#1191)
- `<CommandPalette>` registry hook + per-command hotkeys + AppShell slot (#1312)
- `<StandaloneTiptap>` self-bootstrapping TipTap (#1066)

Remaining open Wave-1 items live under hub batch task **#1194** (Wrapped*
primitives — `WrappedConnectionPill`, `CapabilityDeniedFallback`,
`WrappedActivityPanel`, `WrappedNotificationCenter`, plus
hook-activity/notifications/capability demos).

---

## Wave 2 — Demo information architecture

Re-pillar the demo around audience-first surfaces ("Build a Chat", "Build
a Call", "Build a Doc", "Build a Pipeline", "Build an Admin Console")
backed by Wave 1 primitives.

Shipped:

- #1031 nav re-pillar
- #1033 Shell Composites showcase
- #1070 Cmd-K global search over the full nav tree

Open:

- #1060 audience-first landing page rebuild (P2)
- #1049 per-hook MDX-style docs for top 15 hooks (P2)
- #1039 VideoPage showcase expansion (RecordingPlayer, RecordingList,
  PiPButton, RosterPanel, ParticipantTile, etc.) (P3)
- #1056 showcase pages for Pipelines, Doc-Editor, Observability, Ingest (P3)
- #1064 Integrations adapter showcase (`WrappedChatPanel` etc.) (P3)

---

## Wave 3 — Demo eradication + adapter migration

Eliminate inline `style={{}}` in `demo/src/**` and replace hand-rolled
hook glue with the `integrations/realtime-modules` adapter layer.

Current inline-style counts (audited 2026-05-31):

- `src/**` — 98 files (down from 122 since wave start)
- `demo/**` — 56 files (down from 69; some files now adapter-backed)

Shipped:

- #1192 batched hook-integration refactors (chat, presence, reactions,
  file-upload, hangout) — `<WrappedChatPanel>` etc. replace inline glue
- `WrappedHangoutRoomsList` (#7343f0c) + hook-hangoutrooms demo

Open:

- #1045 wave 1 — shell + docs pages (15 files) (P3)
- #1193 batch waves 2+3 — supersedes #1050/#1055 (~28 files) (P3)
- #1067 overview/landing pages + ButtonsPage / CollaborationPage (P4)
- #1068 `WrappedCRDTBinding` + hook-crdt-integration demo (P4)

Classification rules (`A` / `B` / `C`) live in `TAILWIND_MIGRATION.md`.
When a violator needs a library-side primitive that doesn't exist yet,
**stop**, file the primitive task in Wave 1, then resume.

---

## Wave 4 — Tests, docs, stories

Tests for every exported primitive (constitution principle 2) and docs
for the public surface.

Coverage gaps (audit #5, 2026-05-30):

- Zero-test folders: `collaboration/` (8 components),
  `doc-editor/` (33), `doc-types/` (5), `misc/` (8)
- Lowest ratio: `pipelines/` 1/91
- Large untested exports — `CallWidget` 1009 LOC, `AppLayout` 837,
  `CollapsibleSidebar` 454 — tracked under #1041 (already split:
  `#1204` AppLayout ✅, `#1205` CallWidget ✅, `#1222` RecordingPlayer ✅)

Open:

- #1051 tests for `collaboration/`, `doc-editor/`, `doc-types/`, `misc/` (P3)
- #1054 `CONTRIBUTING.md` + per-domain READMEs (P3)
- #989 Storybook stories for the `Wrapped*` integration layer (P4)
- #990 consumer-adoption guide (P4)
- #1059 Storybook coverage gap for the 51 `shared/` components (7 today)

---

## Wave 5 — Graduate in-flux modules to stable

Each in-flux subpath has a graduation task. Done = stable API + tests +
Wave 3 inline-style cleanup + handoff to consumers.

- **`/doc-editor` (#1066)** — `<StandaloneTiptap>` shipped (v2.19.0).
  Remaining: Tailwind wave 3 conversion + full domain test coverage
  (overlaps Wave 3 + Wave 4).
- **`/pipelines` (#1062)** — extract `<PipelineCanvasShell>` for reuse;
  finish Tailwind wave 3 over the 91 pipeline files. P3 open.
- **`/agents` (#1069)** — ship `<AgentDirectory>` + `<ConversationHistory>`
  composites, freeze AG-UI v0.1.x event types as stable exports, notify
  `websocket-gateway` and `event-catalog`. P4 open.
- `/observability` and `/ingest` — graduation tasks not yet filed; will
  follow after Wave 3 reduces inline-style debt in those domains.

---

## Version cadence

Per `docs/AUTONOMY_CHARTER.md` §2:

- **patch** — bug fixes, internal refactors, new tests/stories/docs.
- **minor** — new public exports, new optional props on stable
  components, new sub-paths.
- **major** — any breaking change. Requires migration note in
  `CHANGELOG.md` and handoffs to all consumers before merge.

Recent minor releases:

| Version | Highlight |
|---|---|
| 2.19.0 | `<StandaloneTiptap>` self-bootstrapping editor (#1066) |
| 2.18.0 | `<CallControls>` + `<CallParticipantStrip>` + `<CallStatsOverlay>` (#1205) |
| 2.17.0 | `<HangoutGrid>` + `<HangoutSpotlight>` (#1224) |
| 2.16.0 | `<AutoplayGate>` + `<StreamVideo>` playState (#1296) |
| 2.15.0 | `ChatPanel` avatar slot (#982) |
| 2.14.0 | `<ConnectionPill>` + DocsShell trio (#984, #1018) |
| 2.13.0 | `<LogStream>`, `<ThumbnailCard>`, `<StackDiagram>`, `<SettingsLayout>` |
| 2.12.0 | Root re-exports `/layout` + `/social` + `/video` + `/identity` (Wave 0) |

A major bump is gated on a real consumer-visible breaking change. None
is currently planned.
