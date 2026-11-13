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
| Inline player | `VideoPlayer`, `StreamVideo`, `VideoSurface`, `VideoOverlayChip`, `AutoplayGate`, `RemoteTileSlot` |
| Tile grids | `VideoGrid`, `ParticipantTile`, `NetworkQualityBadge` |
| Hangout-room | `HangoutLayout`, `HangoutGrid`, `HangoutSpotlight`, `RosterPanel`, `ParticipantAccessBadge`, `useStableActiveSpeaker` |
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

## Publish control (view-only participants)

A host can stop someone publishing (camera, microphone, screen share) while
they stay in the call to watch and listen. The library draws both ends:

- **Who is view-only.** Set `access: 'view-only'` on the participant
  (`RosterParticipant`, `CallPerson`, `HangoutLayoutParticipant`,
  `CallStripParticipant`, `VideoGrid`'s `Participant`). `RosterPanel` shows a
  "View only" chip, `CallPeopleList` makes it the row's sub-status, and tiles
  (`ParticipantTile`, `CallTileRow`, `CallParticipantStrip`) show an eye named
  "View only". `ParticipantAccessBadge` is the mark on its own.
- **The host's per-row action.** `rowMenu(participant)` on `RosterPanel` and
  `CallPeopleList` returns `DropdownMenuSection[]` for that row's ⋯ menu
  ("Make view-only" / "Allow publishing"), as `TreeView` does.
- **Your own controls.** `audioDisabledReason`, `videoDisabledReason` and
  `screenShareDisabledReason` on `MediaControlsBar`, `CallControls` and
  `CallWidget` (with the `*Disabled` booleans beside them) disable a toggle
  and make the reason its tooltip and accessible description. `CallDock`
  takes `disabledReason` on `mic`, `camera` and `screenShare`
  (`DeviceToggleSelect` underneath). Every one of them behaves the same way:
  the control stays in the tab order (`aria-disabled`, a press does nothing),
  draws its focus ring, and shows the reason in the library `Tooltip` on
  hover AND on keyboard focus (never a native `title`, which a keyboard never
  sees). The ▾ device menus beside mic and camera stay usable.
- **Room for the row.** `RosterPanel` folds a row's "View only" chip to its
  eye whenever the label would cut the name (`accessBadge`, default `auto`);
  "(you)" is never dropped and a cut name shows in full on hover, so a
  narrow roster (`className="w-48"` beside the tiles) needs no forced widths.
- **The notice.** `CallNoticePill` wraps to two lines (`maxLines`) and past
  that puts the full text in a tooltip that hover and Tab both reach, so a
  host's reason can be passed as written.

```tsx
<RosterPanel
  participants={people.map((p) => ({ ...p, access: viewOnly.has(p.id) ? 'view-only' : undefined }))}
  rowMenu={(p) => (isHost && !p.isLocal
    ? [{ items: [p.access ? { label: 'Allow publishing', onSelect: () => grant(p.id) }
                          : { label: 'Make view-only', danger: true, onSelect: () => revoke(p.id) }] }]
    : null)}
/>
<CallWidget {...call} audioDisabledReason={revoked ? 'The host made you view-only' : undefined}
  videoDisabledReason={revoked ? 'The host made you view-only' : undefined}
  screenShareDisabledReason={revoked ? 'The host made you view-only' : undefined} />
```

## A video element a hook drives

`VideoSurface` is the frame for a `<video>` whose source a hook owns: a
publisher that assigns its captured camera to `srcObject` and never returns
the stream, or hls.js attaching a playlist. Pass the hook's ref as `videoRef`
and leave `stream` off; the surface then never reads or writes `srcObject` or
`src`, and the element stays mounted through every `state` (`ready`,
`loading`, `empty`, `error`). With `stream` it binds the stream itself, like
`StreamVideo`. Overlays go in `topLeft` / `topRight` / `bottomLeft` /
`bottomRight` / `center`; use `VideoOverlayChip` for a stat or phase readout
(with `details` it expands on press) and `NetworkQualityBadge` for signal
bars (`label` overrides its word). `mirrored` flips the picture, not the
overlays; with `controls` the bottom slots sit above the native control bar.

```tsx
const videoRef = useRef<HTMLVideoElement>(null);
const publisher = usePublisher({ videoRef });
<VideoSurface
  videoRef={videoRef}
  muted
  label="Camera preview"
  bottomLeft={<VideoOverlayChip mono details={counters}>{bitrate}</VideoOverlayChip>}
  topRight={<NetworkQualityBadge quality={quality} />}
/>
```

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

## Non-media roster entries, consent wording (2.526.0)

`RosterPanel` `extraEntries={[{ id, name, label: 'Assistant', status: 'listening' }]}` lists something that is not a participant (an assistant, a recorder) after the people, with a square mark instead of an avatar. It has no tile and is not counted unless `countExtraEntries`. `RecordingConsentNotice` takes `title`, `description`, `acknowledgeLabel` + `onAcknowledge` and `secondaryLabel` + `onSecondary` for a notice that is not the recording sentence.
