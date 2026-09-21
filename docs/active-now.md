# Active Now presentation

`WorkGraph` from `@connorhoehnslalom/ui-components/graph` accepts an optional
`activity: WorkActivityPresentation`. Existing callers without it retain the v1
renderer and public callbacks. Application aliases may use the existing
`@connorhoehn/ui-components/graph` package name.

The activity renderer uses the pipeline `BaseNode` and `AnimatedEdge` presentation,
`TitledFrame` effort boundaries, a `WorkActivityHeader` panel row and a `WorkNodePane`
details column. It has no executor, transport, credentials, peer chat, model call, or
resource fetching. The host passes only viewer-authorized data and handles references
through the real conversation.

## Panel chrome

Set `activity.title` and the renderer draws its own header row — subtitle, plus expand,
pop-out and close controls wired to `onExpand`, `onPopOut` and `onClose`. The host owns
every one of those navigations. Leave `title` unset and the header is the host's, e.g.
`ChatSidePanelFrame`. `WorkActivityHeader` is exported for a host outside that frame.

## Time strip

One row: the range label ("9:30 – Now"), previous/next interval, a "Following now" toggle
that returns to live, and a 15/30/60-minute or full-day preset. Under it an hour ruler
computed from `bounds` in the host's timezone, the event dots from `events`, and the
two-handle `RangeSlider`. The ruler prints clock marks without the day period; announced
values keep it.

## Detail panes

Selecting a node opens `WorkNodePane` — the fourth column of the Social page. It is chrome
(title, `detail.subtitle`, close), a `detail.banner` state line, then whichever bodies the
host supplied data for, then one sticky "Reference in chat" button that carries the exact
revision and page on screen. There is no per-kind switch: an artifact pane is a node with
`detail.artifact`, a transcript pane one with `detail.transcript`, a run pane one with
`sections.inputs`/`sections.tools`, a terminal pane one with `sections.workItem`, and a
context pane one with only `sections.description`. A node the viewer may see only the
existence of gets chrome and an honest empty body.

`detail.transcript.ask` is a host callback. The graph renders the question and whatever the
host returns; it never calls a model, never caches an answer, and shows
`ask.unavailableLabel` rather than inventing one when `enabled` is false.

`activity.detailsPlacement` decides where the pane goes: `column` (a sibling column, the
default via `auto`), `overlay` (only when the pane is too narrow to split — `auto` picks it
under 820px), or `none` for a host that places `WorkNodePane` in its own four-column grid.
The canvas measures the narrower width and re-fits once when the pane opens or closes.

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
- `failedEdgeIds` / `edgeLabels`: an operation whose latest attempt failed draws in the
  danger tone with a "failed" pill. Only an edge the host names in `edgeLabels` gets a
  pill otherwise; provenance stays a plain line with a keyboard-only selection target.
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
updates do not trigger viewport fitting. A vertical chain taller than the canvas wraps
into a SECOND band of columns — never a third, which turns a chain into a staircase.
Automatic fit shows the whole shape down to a 40% floor: the detail pane, not the canvas,
is where text is read, and past that floor pan and effort focus take over. Invalid cycles
are reported; producers must validate causal DAGs before supplying the overview.

Canvas controls sit bottom-left (zoom in/out, "Fit graph") and the emphasis legend
bottom-right. The footer under the canvas counts parallel activities and offers
"← Earlier work"; with `onEarlier` the host shifts the window, without it the renderer
steps the current window back by its own duration.

`RangeSlider` is an additive root export. It uses two native, named range controls
with stable keyboard order and a single visual track.

## Explicit fixture host

Run `npm run demo -- --port 15185`, then open `/active-now.html`. This component
fixture has a fixed clock, sample slides, a "Run complete"/"Run failing" toggle, 2/3/5
activity counts and a 600/700/895px pane width. It does not
publish events, send messages, or demonstrate production permissions. Its
reference output only records the requested draft target for interaction checks.

Production integration and the real-source acceptance checklist belong to
`realtime-examples/docs/design/active-now-vertical-plan.md`.
