# PersonDetailCard

Root import: `import { PersonDetailCard } from '@connorhoehn/ui-components'`.

A person's card, floating top-right over the graph by default (`className`
overrides): title and department, skills, up to eight strongest connections as
`MeterRow`s (click → `onFocusPerson(id)`), up to six evidence documents, and an
ask button (`onAsk(id)`, label via `askLabel`).

Data in: `person` (`PersonDetail`), `evidence` (`PersonEvidenceDocument[]`),
`loading`, `error`. The shapes match the portal's `/api/graph/people/:id` and
`/evidence` reads, but the card fetches nothing. `showInfluence` adds influence
and scored-at to the meta line — leadership-analytics roles only.
`formatTime(iso)` formats evidence timestamps (default "3h ago" / a date).

Overlaying it on an `OrgGraph`: pass the card's width plus its offset as
`fitInset={{ right: … }}` (e.g. 320 for a 300px card 12px from the edge) so no
person or line is drawn under it (2.403.2).
