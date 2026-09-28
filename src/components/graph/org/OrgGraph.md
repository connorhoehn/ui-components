# OrgGraph

Root import: `import { OrgGraph } from '@connorhoehnslalom/ui-components'` (also `/graph`).

The organisation as a graph: `people` coloured by their `departments`,
`relationships` drawn by type (collaborates solid, mentors dashed, reports to
with an arrowhead, shared expertise amber). It fills its parent and measures
itself with a ResizeObserver, so give it a sized container.

- `layout`: `force` (default; d3-force, animated, departments pulled to their
  own cells) or `radial` (static rings, most influential in the centre).
- Selection: without `onToggleMultiSelect` a click toggles one person and calls
  `onPersonSelect(person | null)`; with it, the host owns `multiSelectIds`.
  `spotlightIds` highlights a set (e.g. people an answer cited).
- `focusIds` (2.403.0) narrows the drawing to those people plus their direct
  neighbours (`focusHops`, default 1) and the lines among them, and spotlights
  the focus set — "focused on Vera". Empty, or naming no one in `people`, draws
  the whole graph. The same subset is `focusOrgGraph(people, relationships,
  focusIds, { hops, minStrength, topK })` → `{ people, relationships }`, for a
  host that wants the counts or a "Show whole org" toggle; `topK` is the old
  Explore page's strongest-K-per-person edge cap.
- Framing (2.403.1): the forces scale to the drawn count and canvas
  (`forceParamsFor(count, width, height)` — link distance ~0.7·√(area / N),
  charge ∝ that spacing², a collide radius of node radius + the label band for
  sets of 40 or fewer, and x/y pulls weighted by the aspect ratio), so eleven
  people fill a wide canvas the way fifty-six do; 56 keeps the original tuning.
  Once the layout settles, and whenever the drawn set or canvas changes, the
  view is fitted to the drawn nodes and their labels (`fitTransform(bounds,
  size, padding, maxZoom)`, 32px padding, never past 125%) until the viewer
  pans or zooms; Fit to view re-fits. Zoom buttons and the wheel zoom about
  the canvas centre.
- Labels sit on a surface pill under the circle; in a drawing of more than 40
  people, dimmed (not highlighted) people drop their label. Sizing by
  connection count caps a focused person at their best-connected neighbour's
  size, since the focus is connected to everyone drawn; `showInfluence` still
  sizes by influence.
- `presenceFilter` (`office` | `remote` | `away`) dims non-matching people and
  adds the presence key to the legend.
- `showInfluence` sizes nodes by influence and shows it on the hover card; off
  (the default) sizes by connection count so a circle cannot leak the number.
- `legend` / `controls` (default true) toggle the legend and zoom cluster;
  `className`, `aria-label`, `data-testid` as usual.

Keyboard: every node is a tab stop; Enter/Space selects. Storybook:
Graph/OrgGraph (Default, Default (56), Radial, WithSelection, PresenceFilter,
FocusedOnOnePerson, Focused two people).
