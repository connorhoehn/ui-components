# Video — `@connorhoehnslalom/ui-components/video`

WebRTC + recording + hangout composites for real-time call surfaces.
Largest domain after pipelines. The `/video-ivs` subpath ships the
AWS IVS-specific implementation behind the same primitives.

Subpath import:

```tsx
import {
  VideoPlayer,
  VideoGrid,
  CallWidget,
  HangoutLayout,
  StreamVideo,
  RecordingPlayer,
} from '@connorhoehnslalom/ui-components/video';
// also reachable from the root barrel since 2.12.0.
```

## Surfaces

| Surface | Primary composites |
|---|---|
| Inline player | `VideoPlayer`, `StreamVideo`, `AutoplayGate`, `RemoteTileSlot` |
| Tile grids | `VideoGrid`, `ParticipantTile`, `NetworkQualityBadge` |
| Hangout-room | `HangoutLayout`, `HangoutGrid`, `HangoutSpotlight`, `RosterPanel`, `useStableActiveSpeaker` |
| Call widget | `CallWidget`, `CallControls`, `CallParticipantStrip`, `CallStatsOverlay`, `MuteWhileTalkingToast` |
| Recordings | `RecordingPlayer`, `RecordingList`, `RecordingRow`, `TranscriptOverlay` |
| Lifecycle banners | `CallStartedBanner`, `CallingStatusPill`, `ReconnectingBanner`, `PiPButton` |
| Meetings (Teams-style) | `MeetingToolbar`, `MeetingStatusCluster`, `RecordingConsentNotice`, `RaisedHandBadge`, `BreakoutRoomsPanel`, `BreakoutRoomBanner`, `Meeting*Icon`; bound to realtime-modules `useMeeting` by `WrappedBreakoutRoomsPanel` |
| Misc | `ReactionOverlay`, `StatsCard`, `StatusStrip` |

## Stability

**Stable API**, minor churn. On the charter §1 no-touch list. The
`VideoPlayer`, `VideoGrid`, `StreamVideo`, `CallWidget`, `HangoutLayout`,
and `RecordingPlayer` props are contracts for `websocket-gateway` and
must not change without a handoff.

Recent splits (Wave 1, May 2026):

- `<CallWidget>` 1009 LOC → composes `<CallControls>` +
  `<CallParticipantStrip>` + `<CallStatsOverlay>` (#1205). Public API
  unchanged.
- `<HangoutLayout>` → composes `<HangoutGrid>` + `<HangoutSpotlight>`
  + `useStableActiveSpeaker` hysteresis hook (#1224). Public API
  unchanged.

## Tests

- `RecordingPlayer` 17 cases (#1222, May 2026).
- `<CallControls>` / `<CallParticipantStrip>` / `<CallStatsOverlay>`
  — 47 cases combined (#1205).
- Coverage still light for the older composites; tracked under #1051.

## See also

- [`../../../docs/AUTONOMY_CHARTER.md`](../../../docs/AUTONOMY_CHARTER.md)
  §1 — `/video` stable-exports list.
- Wave 5 `/video-ivs` graduation is not yet filed.

## Persistent playback (2.491.0)

`MediaPlaybackDock` is a nonshrinking shell footer composed from `Stack`, `Inline`, `IconButton`, `Button`, `Slider` and `Select`. Mount one outside the page scroll area. Pass a registered `PlaybackSource`; the host owns file authorization and queue selection. A source change or close stops the previous decoder. The dock owns seeking, volume, speed, errors and an expandable video surface. Set `autoPlay` only after a user action. Do not mount a second inline player for the same source. Storybook: Video/MediaPlaybackDock (idle, audio, narrow, missing video, persistent footer).

## Shared huddle device check (2.492.0)

`createCallBlockHost` owns the start/join device dialog for every tenant. It uses
`AudioVideoSettingsForm layout="prejoin"`: a responsive preview and controls toolbar,
library device selects, and collapsible microphone, speaker and advanced settings.
`previewControls` supplies capture/effects actions below the preview. The ordinary
call-settings form keeps its stacked layout.

Provide realtime-modules 0.141's `useCallMediaEffects` with the other factory modules
to enable blur, backgrounds and appearance filters. Preview and outgoing video use
separate media engines with shared preferences; closing the dialog cannot end the
call's camera stream. Applications supply identity and page title through the host,
without defining tenant-specific copies of the dialog.
