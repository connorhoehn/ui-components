# SuggestionRow

Root import: `import { SuggestionRow } from '@connorhoehnslalom/ui-components'` (also `/shared`).

One option in an inline autocomplete list — a full-width row with a bold
primary line, a muted secondary line and an optional leading mark. Use it
inside a `role="listbox"` beside an `Input role="combobox"`; `CommandPalette`
is the modal equivalent and `SelectableCard` the tile.

`active` is the host's keyboard cursor (`aria-selected`), not hover state, so
arrow keys and the pointer never disagree about what Enter picks: pointer entry
calls `onHighlight` so the host moves its cursor, a click calls `onPick`. Give
each row an `id` and point the combobox's `aria-activedescendant` at the
active one. `GraphSearchBox` is the worked example.
