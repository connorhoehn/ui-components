# CitedRecordList

Root import: `import { CitedRecordList } from '@connorhoehnslalom/ui-components'`.

Use under an assistant answer to show the records it was built from:
"People in context" (avatar, name · role, one line), "Work to coordinate"
(kind mark, title, subtitle, status), then every record as a numbered source
chip, an optional "View these connections →" and a footnote. Each record
carries `n`, its number in the answer's numbered context; a row may cite
several sources through `citations` (default `[n]`), and every `[n]` links to
the record with that number.

`sections` chooses which types get a section and in what order (default
person, then work); other types appear only as sources. The host owns the
numbering, the hrefs, navigation (`onOpen`; citation links keep modified
clicks native) and the connections action. Renders nothing for an empty
`records` array.

Composes `Avatar`, `StatusDot`, `Chip`, `Button`, `IconButton`,
`Stack`/`Inline`; theme tokens only. Storybook: Search/CitedRecordList
(default, no work, dark).
