# GraphSearchBox

Root import: `import { GraphSearchBox } from '@connorhoehn/ui-components'`.

Find a person (name, title, department) or a skill in `people`. Up to six
people then four skills (most-held first) appear as `SuggestionRow`s; arrows
move, Enter picks, Escape clears, and a query with no match says so.
`onPickPerson(id)` for a person; `onPickSkill(skill, personIds)` for a skill.
Matching is `searchGraph` (two-character minimum).
