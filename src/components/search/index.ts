// Search — the Search workspace's library pieces (2.400.0): the grouped,
// selectable Results list and the cited-record block under an assistant
// answer. Exported from the ROOT entry. Hosts own the query, the read model,
// selection state, URL state and navigation; these own presentation.
export { RecordResultList } from './RecordResultList';
export type { RecordResultListProps, RecordResultGroup } from './RecordResultList';
export { CitedRecordList, DEFAULT_CITED_SECTIONS } from './CitedRecordList';
// 2.405.2: a record graph as a collapsible card in a chat / answer view.
export { RecordGraphCard, recordGraphSummary } from './RecordGraphCard';
export type { RecordGraphCardProps } from './RecordGraphCard';
export type { CitedRecordListProps, CitedRecordItem, CitedRecordSection } from './CitedRecordList';
export {
  RecordMark,
  RecordStatus,
  recordResultKey,
  recordStatusTone,
  recordStatusLabel,
  RECORD_TYPE_LABELS,
} from './recordMarks';
export type { RecordResultItem, RecordResultType } from './recordMarks';
