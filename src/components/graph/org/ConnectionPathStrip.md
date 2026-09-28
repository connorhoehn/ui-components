# ConnectionPathStrip

Root import: `import { ConnectionPathStrip } from '@connorhoehnslalom/ui-components'`.

Draws a `path` from `findConnectionPath(people, relationships, fromId, toId)`
(breadth-first over every relationship type) as a band: "Directly connected" or
"Connected via N people", each hop with its relationship, the two ends in bold.
"Show path on graph" calls `onHighlightPath(ids)` when there is anyone between.
