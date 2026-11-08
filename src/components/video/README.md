# Video — `@connorhoehn/ui-components/video`

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
} from '@connorhoehn/ui-components/video';
// also reachable from the root barrel.
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

**Stable API**, minor churn. The `VideoPlayer`, `VideoGrid`, `StreamVideo`,
`CallWidget`, `HangoutLayout`, and `RecordingPlayer` props are contracts for
consumer apps and must not change without a major version bump.

Composition: `<CallWidget>` is built from `<CallControls>`,
`<CallParticipantStrip>` and `<CallStatsOverlay>`; `<HangoutLayout>` is built
from `<HangoutGrid>`, `<HangoutSpotlight>` and the `useStableActiveSpeaker`
hysteresis hook.

## Persistent playback

`MediaPlaybackDock` is a nonshrinking shell footer composed from `Stack`, `Inline`, `IconButton`, `Button`, `Slider` and `Select`. Mount one outside the page scroll area. Pass a registered `PlaybackSource`; the host owns file authorization and queue selection. A source change or close stops the previous decoder. The dock owns seeking, volume, speed, errors and an expandable video surface. Set `autoPlay` only after a user action. Do not mount a second inline player for the same source. Storybook: Video/MediaPlaybackDock (idle, audio, narrow, missing video, persistent footer).

## Shared huddle device check

`createCallBlockHost` owns the start/join device dialog for every tenant. It uses
`AudioVideoSettingsForm layout="prejoin"`: a responsive preview and controls toolbar,
library device selects, and collapsible microphone, speaker and advanced settings.
`previewControls` supplies capture/effects actions below the preview. The ordinary
call-settings form keeps its stacked layout.

Provide realtime-modules' `useCallMediaEffects` with the other factory modules
to enable blur, backgrounds and appearance filters. Preview and outgoing video use
separate media engines with shared preferences; closing the dialog cannot end the
call's camera stream. Applications supply identity and page title through the host,
without defining tenant-specific copies of the dialog.
