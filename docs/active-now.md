# Active Now presentation

`WorkGraph` from `@connorhoehnslalom/ui-components/graph` accepts an optional
`activity: WorkActivityPresentation`. Existing callers without it retain the v1
renderer and public callbacks. Application aliases may use the existing
`@connorhoehn/ui-components/graph` package name.

The activity renderer uses the pipeline `BaseNode` and `AnimatedEdge` presentation,
`TitledFrame` effort boundaries, and `ChatSidePanelFrame` inspector. It has no
executor, transport, credentials, peer chat, or resource fetching. The host passes
only viewer-authorized data and handles references through the real conversation.

## Controlled inputs

- `efforts`: explicit stable source-backed membership. A canonical input can occur
  in several efforts without merging their frames. `nodeIds`/`edgeIds` contain
  canonical IDs; generated React Flow instance IDs are never returned to the host.
- `details`: optional emphasis, fresh-process evidence, tool annotations, human
  attention label, authorized feedback count, and artifact revisions. The host
  resolves protected preview content. Never pass an unsanitized source object.
- `activeEdgeIds`: explicit operation evidence. An edge also needs running status,
  no end time, and a following-live query to animate. Reduced motion is handled by
  the existing pipeline edge. A running neighbor does not activate its edges.
- `window`, `bounds`, `temporalMode`: UTC epoch milliseconds from the host's IANA
  day-window calculation. The UI never assumes 24-hour days. `recent` identifies
  latest-state data when historical reconstruction is not available.
- `view`: effort focus, expanded sources, saved overview viewport and initialization
  state. Store these alongside the existing selection/viewport per viewer, org,
  person, day, and timezone. Preserve them through split/full transitions.
- `onFeedback` / `onReference`: attach or reveal context in the real left chat;
  never send automatically. Node selections may contain an immutable `revisionId`
  and `anchorId`. Negotiate the upgraded reference contract before persisting these
  fields; strict v1 wire readers do not accept them.

Pending artifact revisions are separate from available revisions. They cannot be
selected or opened. If a selected revision disappears, the inspector shows it as
unavailable instead of substituting another version. The host must remove revoked
nodes, edges, revisions, previews, tools, counts, and attention data promptly.

## Layout and inspection

The inspector and accessible alternate list start closed. Canonical node and edge
selection opens details. Escape/Close restores focus to the initiating control.
Two compact efforts pack horizontally where space permits; crowded or tall views
fold earlier context behind a source disclosure. Focus restores that effort's
sources and All activities restores the prior overview viewport.

Node measurements reserve full card height and relationship-label lanes. Status
updates do not trigger viewport fitting. Automatic fit keeps a minimum 100% scale;
large graphs remain reachable through pan, focus and the activity selector rather
than reducing labels to unreadable text. Invalid cycles are reported; producers
must validate causal DAGs before supplying the overview.

`RangeSlider` is an additive root export. It uses two native, named range controls
with stable keyboard order and a single visual track.

## Explicit fixture host

Run `npm run demo -- --port 15185`, then open `/active-now.html`. This component
fixture has a fixed clock, sample slides, and 2/3/5 activity controls. It does not
publish events, send messages, or demonstrate production permissions. Its
reference output only records the requested draft target for interaction checks.

Production integration and the real-source acceptance checklist belong to
`realtime-examples/docs/design/active-now-vertical-plan.md`.
