# Search

Import these components from `@connorhoehnslalom/ui-components`.

- [`RecordResultList`](./RecordResultList.md): the Results tab — typed records grouped by type with counts, See all, selection, highlights, status and open actions.
- [`CitedRecordList`](./CitedRecordList.md): the records under an assistant answer — people, work to coordinate, numbered sources.
- [`RecordGraphCard`](./RecordGraphCard.md): the record graph as a card in a chat / answer view — a one-row summary that expands inline to `RecordGraph` and opens the host's full Connections view.
- Helpers: `RecordResultItem` (the shared record shape), `recordResultKey` (`${type}:${id}` selection key), `recordStatusTone` / `recordStatusLabel`, `RecordMark`, `RecordStatus`, `RECORD_TYPE_LABELS`.

Matched-term marking is the shared `Highlight` primitive. Pair with
`ExplorerLayout`, `RailSection` + `RailNavList` for the SEARCH / SAVED / RECENT
rail, `SearchInput`, `FilterChip`, and `Tabs`. Hosts own the query, the read
model, selection, URL state and navigation; components own presentation.
Stories and tests live beside each component.
