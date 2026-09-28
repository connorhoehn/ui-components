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
- `presenceFilter` (`office` | `remote` | `away`) dims non-matching people and
  adds the presence key to the legend.
- `showInfluence` sizes nodes by influence and shows it on the hover card; off
  (the default) sizes by connection count so a circle cannot leak the number.
- `legend` / `controls` (default true) toggle the legend and zoom cluster;
  `className`, `aria-label`, `data-testid` as usual.

Keyboard: every node is a tab stop; Enter/Space selects. Storybook:
Graph/OrgGraph (Default, Radial, WithSelection, PresenceFilter).
