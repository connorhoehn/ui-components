# TakeRow

Root import: `import { TakeRow } from '@connorhoehn/ui-components'` (also `/shared`).

One take in a list of takes (music, a voice line, a sound effect): its `play`
control, its `title` with `tags` (a "Proposed" or "Passes" pill), one muted
`meta` line of what it measured, an optional `detail` line (what was heard,
clamped to two lines) and its `actions` at the end. `selected` draws the
proposed or chosen take on the primary surface. Stack rows with a small gap;
on a narrow container the actions wrap under the text.
