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
that returns to live, and a 15/30/60-minute or full-day preset. Under it an hour ruler,
the event dots from `events`, and the two-handle `RangeSlider`.

A day's `bounds` run to midnight, but nobody has worked the rest of it yet. While the
query is live — `temporalMode: 'recent'`, or a following window — the ruler, the dots and
the slider all run `bounds.start` to `min(bounds.end, now)`, and the right-hand label
carries the real time. Pass `activity.now` to control that clock; without it the strip
follows the live window, or the browser clock when it is not. A window that sits outside
the extent is clamped into it rather than drawn past the edge.

Marks print as a clock face: a plain 24-hour `h:mm` in the `timezone` prop, no day period
and no padded hour. Spacing adapts to the extent — half-hourly up to 2 hours, hourly to 6,
two-hourly to 12, three-hourly beyond. Announced values keep the locale's full wording.

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
  The card invents nothing: no badge without `badge`, no footer without `footer`,
  no participants without `participants`, and no thumbnail frame when the
  revision carries no `preview`. A preview that is there gets a fixed-aspect box
  to scale into — an SVG with a viewBox letterboxes itself, an image gets
  `object-contain` — because cropping a slide to fit is the one thing a
  thumbnail must never do.
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

## The card

One anatomy for every kind. A coloured bar down the left says what KIND of work
this is — meeting, transcript, document, task, run, terminal — and never moves.
Status owns the dot in the header and, when something is in flight or wrong, the
border: blue for the current step, red for a failed run, green for an artifact
with a revision ready to read. A run's tools hang below the card, because they
belong to the attempt rather than to the thing itself.

The whole card is one hit target — header, body and footer all select it — and it
carries `role="button"`, `aria-pressed`, and stable `data-work-node` /
`data-work-card` hooks for hosts and tests. Effort frames are scenery:
`pointer-events: none` on the frame, `auto` on its own Sources/Focus controls, so
a frame can never swallow a click meant for a card.

## Layout and inspection

The inspector and accessible alternate list start closed. Canonical node and edge
selection opens details. Escape/Close restores focus to the initiating control.
Two compact efforts pack horizontally where space permits. Context stays open
until keeping it open would make the view unreadable: three efforts or more fold
it up front, and so does a pane too small to fit the cards above 40%. Height
alone never folds it — a fold the viewer did not ask for hides work. An explicit
fold or unfold lives in `view.expandedSourceEfforts` and always wins. Focus restores that effort's
sources and All activities restores the prior overview viewport.

Inside an effort the layout is a grid that mirrors the work: every step of the chain is a
ROW down the right column, and the context that step was given sits in the LEFT column
beside it — "Planning sync | Transcript", "Project documents | Generate presentation",
"— | Sprint review". An effort with no declared `contextNodeIds` is one column of rows.
Relationships are orthogonal: anything continuing sideways enters the next card from its
side, and only a straight drop enters from the top — entering from the top after crossing
a column is what draws a loop back over the frame. Label lanes
between rows are reserved for the operations the host actually labels.

Parallel work reads as parallel: efforts sit side by side, newest first, and the canvas
scales down to hold them. They wrap onto a second line only when that buys a materially
bigger view — wrapping trades width for height, so it can never rescue a row that is
merely too tall. Node measurements reserve full card height. Status updates do not trigger
viewport fitting; the fit runs once per structural change and centres the work in the
canvas rather than parking it in a corner, down to a 40% floor — the detail pane, not the
canvas, is where text is read. Invalid cycles are reported; producers must validate causal
DAGs before supplying the overview.

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
